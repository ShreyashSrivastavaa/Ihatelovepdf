'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Pencil,
  Highlighter,
  Eraser,
  Square,
  Circle,
  ArrowUpRight,
  Minus,
  Type,
  Undo2,
  Redo2,
  Trash2,
  Download,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Check,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { convertImagesToPdf } from '../../lib/pdf-operations';
import { createPdfBlob } from '../../lib/pdf-processor';

type ToolType = 'pen' | 'highlighter' | 'eraser' | 'rect' | 'circle' | 'arrow' | 'line' | 'text';
type PaperGridType = 'plain' | 'grid' | 'dots' | 'lines';

interface Point {
  x: number;
  y: number;
}

interface Stroke {
  id: string;
  tool: ToolType;
  points: Point[];
  color: string;
  size: number;
  opacity: number;
  text?: string;
  startPoint?: Point;
  endPoint?: Point;
}

interface PdfWhiteboardInterfaceProps {
  file?: File | null;
  onDone?: (blob: Blob) => void;
  onGenerated?: (blob: Blob) => void;
}

type PdfJsModule = typeof import('pdfjs-dist/legacy/build/pdf');
let pdfjsLibPromise: Promise<PdfJsModule> | null = null;

async function getPdfJs(): Promise<PdfJsModule> {
  if (typeof window === 'undefined') throw new Error('Browser required');
  if (!pdfjsLibPromise) {
    pdfjsLibPromise = import('pdfjs-dist/legacy/build/pdf').then((m) => {
      if (!m.GlobalWorkerOptions.workerSrc) {
        m.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
      }
      return m;
    });
  }
  return pdfjsLibPromise;
}

const PRESET_COLORS = [
  '#E24A24', // Theme Brand Accent
  '#2563EB', // Blue
  '#059669', // Green
  '#7C3AED', // Purple
  '#D97706', // Amber
  '#DC2626', // Red
  '#0F172A', // Dark Slate
  '#FFFFFF', // White
];

export default function PdfWhiteboardInterface({ file, onDone, onGenerated }: PdfWhiteboardInterfaceProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentTool, setCurrentTool] = useState<ToolType>('pen');
  const [color, setColor] = useState('#E24A24');
  const [brushSize, setBrushSize] = useState(3);
  const [paperGrid, setPaperGrid] = useState<PaperGridType>('plain');
  const [isDrawing, setIsDrawing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [textInputPos, setTextInputPos] = useState<Point | null>(null);
  const [textContent, setTextContent] = useState('');
  const [zoomLevel, setZoomLevel] = useState(1);

  // Per-page stroke history map: { [pageNum]: Stroke[] }
  const [pageStrokes, setPageStrokes] = useState<Record<number, Stroke[]>>({});
  // Per-page undo/redo stack
  const [undoStack, setUndoStack] = useState<Record<number, Stroke[][]>>({});
  const [redoStack, setRedoStack] = useState<Record<number, Stroke[][]>>({});

  const containerRef = useRef<HTMLDivElement>(null);
  const pdfCanvasRef = useRef<HTMLCanvasElement>(null);
  const drawCanvasRef = useRef<HTMLCanvasElement>(null);
  const currentStrokeRef = useRef<Stroke | null>(null);
  const activeRenderTaskRef = useRef<{ cancel: () => void; promise: Promise<unknown> } | null>(null);

  // Dimensions state
  const [canvasDimensions, setCanvasDimensions] = useState({ width: 800, height: 1100 });

  // 1. Render PDF Page Base Layer
  useEffect(() => {
    let isCancelled = false;

    async function renderPage() {
      if (!file || (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf'))) {
        // Standby blank whiteboard mode
        setTotalPages(1);
        const width = 850;
        const height = 1100;
        setCanvasDimensions({ width, height });

        const pdfCanvas = pdfCanvasRef.current;
        if (pdfCanvas) {
          pdfCanvas.width = width;
          pdfCanvas.height = height;
          const ctx = pdfCanvas.getContext('2d');
          if (ctx) {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, width, height);
          }
        }
        return;
      }

      // Cancel and wait for prior render to finish
      if (activeRenderTaskRef.current) {
        try {
          activeRenderTaskRef.current.cancel();
          await activeRenderTaskRef.current.promise.catch(() => {});
        } catch {
          // ignore
        }
      }
      if (isCancelled) return;

      try {
        const pdfjs = await getPdfJs();
        const arrayBuffer = await file.arrayBuffer();
        const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
        const doc = await pdfjs.getDocument({
          data: arrayBuffer,
          cMapUrl: `${baseUrl}/cmaps/`,
          cMapPacked: true,
          standardFontDataUrl: `${baseUrl}/standard_fonts/`,
        }).promise;

        if (isCancelled) return;
        setTotalPages(doc.numPages);
        const page = await doc.getPage(currentPage);
        if (isCancelled) return;

        const vp = page.getViewport({ scale: 1.5 });
        setCanvasDimensions({ width: vp.width, height: vp.height });

        const pdfCanvas = pdfCanvasRef.current;
        if (!pdfCanvas) return;

        const ctx = pdfCanvas.getContext('2d');
        if (!ctx) return;

        if (activeRenderTaskRef.current) {
          try {
            activeRenderTaskRef.current.cancel();
            await activeRenderTaskRef.current.promise.catch(() => {});
          } catch {
            // ignore
          }
        }
        if (isCancelled) return;

        pdfCanvas.width = vp.width;
        pdfCanvas.height = vp.height;

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, vp.width, vp.height);

        const renderTask = page.render({ canvasContext: ctx, viewport: vp, canvas: pdfCanvas } as Parameters<typeof page.render>[0]);
        activeRenderTaskRef.current = renderTask;

        try {
          await renderTask.promise;
        } finally {
          if (activeRenderTaskRef.current === renderTask) {
            activeRenderTaskRef.current = null;
          }
        }
      } catch (err: unknown) {
        const errorName = err && typeof err === 'object' && 'name' in err ? (err as { name: string }).name : '';
        if (!isCancelled && errorName !== 'RenderingCancelledException') {
          console.error('Failed to render PDF page on whiteboard:', err);
        }
      }
    }

    renderPage();

    return () => {
      isCancelled = true;
      if (activeRenderTaskRef.current) {
        try {
          activeRenderTaskRef.current.cancel();
        } catch {
          // ignore
        }
      }
    };
  }, [file, currentPage]);

  // 2. Redraw drawing canvas whenever page strokes change
  const redrawDrawingCanvas = useCallback(() => {
    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvasDimensions.width;
    canvas.height = canvasDimensions.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw optional paper grid if blank
    if (!file && paperGrid !== 'plain') {
      ctx.save();
      ctx.strokeStyle = '#e2e8f0';
      ctx.fillStyle = '#cbd5e1';
      ctx.lineWidth = 1;

      if (paperGrid === 'grid') {
        const step = 25;
        for (let x = 0; x < canvas.width; x += step) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += step) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }
      } else if (paperGrid === 'dots') {
        const step = 20;
        for (let x = step; x < canvas.width; x += step) {
          for (let y = step; y < canvas.height; y += step) {
            ctx.beginPath();
            ctx.arc(x, y, 1.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      } else if (paperGrid === 'lines') {
        const step = 28;
        for (let y = 50; y < canvas.height; y += step) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }
      }
      ctx.restore();
    }

    const strokes = pageStrokes[currentPage] || [];

    for (const stroke of strokes) {
      ctx.save();
      ctx.strokeStyle = stroke.color;
      ctx.fillStyle = stroke.color;
      ctx.lineWidth = stroke.size;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.globalAlpha = stroke.opacity;

      if (stroke.tool === 'eraser') {
        ctx.globalCompositeOperation = 'destination-out';
      } else if (stroke.tool === 'highlighter') {
        ctx.globalCompositeOperation = 'source-over';
      } else {
        ctx.globalCompositeOperation = 'source-over';
      }

      if (stroke.tool === 'pen' || stroke.tool === 'highlighter' || stroke.tool === 'eraser') {
        if (stroke.points.length > 1) {
          ctx.beginPath();
          ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
          for (let i = 1; i < stroke.points.length; i++) {
            ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
          }
          ctx.stroke();
        } else if (stroke.points.length === 1) {
          ctx.beginPath();
          ctx.arc(stroke.points[0].x, stroke.points[0].y, stroke.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (stroke.tool === 'rect' && stroke.startPoint && stroke.endPoint) {
        const x = Math.min(stroke.startPoint.x, stroke.endPoint.x);
        const y = Math.min(stroke.startPoint.y, stroke.endPoint.y);
        const w = Math.abs(stroke.endPoint.x - stroke.startPoint.x);
        const h = Math.abs(stroke.endPoint.y - stroke.startPoint.y);
        ctx.strokeRect(x, y, w, h);
      } else if (stroke.tool === 'circle' && stroke.startPoint && stroke.endPoint) {
        const rx = Math.abs(stroke.endPoint.x - stroke.startPoint.x) / 2;
        const ry = Math.abs(stroke.endPoint.y - stroke.startPoint.y) / 2;
        const cx = Math.min(stroke.startPoint.x, stroke.endPoint.x) + rx;
        const cy = Math.min(stroke.startPoint.y, stroke.endPoint.y) + ry;
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
        ctx.stroke();
      } else if (stroke.tool === 'line' && stroke.startPoint && stroke.endPoint) {
        ctx.beginPath();
        ctx.moveTo(stroke.startPoint.x, stroke.startPoint.y);
        ctx.lineTo(stroke.endPoint.x, stroke.endPoint.y);
        ctx.stroke();
      } else if (stroke.tool === 'arrow' && stroke.startPoint && stroke.endPoint) {
        const fromX = stroke.startPoint.x;
        const fromY = stroke.startPoint.y;
        const toX = stroke.endPoint.x;
        const toY = stroke.endPoint.y;
        const headlen = Math.max(12, stroke.size * 3);
        const dx = toX - fromX;
        const dy = toY - fromY;
        const angle = Math.atan2(dy, dx);

        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(toX, toY);
        ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
        ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
        ctx.closePath();
        ctx.fill();
      } else if (stroke.tool === 'text' && stroke.text && stroke.startPoint) {
        ctx.font = `bold ${stroke.size * 5 + 12}px sans-serif`;
        ctx.fillText(stroke.text, stroke.startPoint.x, stroke.startPoint.y);
      }

      ctx.restore();
    }
  }, [canvasDimensions, currentPage, pageStrokes, paperGrid, file]);

  useEffect(() => {
    redrawDrawingCanvas();
  }, [redrawDrawingCanvas]);

  // Pointer position relative to canvas coordinate space
  const getCanvasPoint = (e: React.PointerEvent<HTMLCanvasElement>): Point => {
    const canvas = drawCanvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const pt = getCanvasPoint(e);

    if (currentTool === 'text') {
      setTextInputPos(pt);
      setTextContent('');
      return;
    }

    setIsDrawing(true);
    const newStroke: Stroke = {
      id: Math.random().toString(36).slice(2, 9),
      tool: currentTool,
      points: [pt],
      color,
      size: currentTool === 'highlighter' ? brushSize * 4 + 10 : currentTool === 'eraser' ? brushSize * 3 + 12 : brushSize,
      opacity: currentTool === 'highlighter' ? 0.35 : 1.0,
      startPoint: pt,
      endPoint: pt,
    };

    currentStrokeRef.current = newStroke;

    // Push state to undo stack
    const currentList = pageStrokes[currentPage] || [];
    setUndoStack((prev) => ({
      ...prev,
      [currentPage]: [...(prev[currentPage] || []), currentList],
    }));
    setRedoStack((prev) => ({
      ...prev,
      [currentPage]: [],
    }));
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentStrokeRef.current) return;
    const pt = getCanvasPoint(e);
    const stroke = currentStrokeRef.current;

    if (stroke.tool === 'pen' || stroke.tool === 'highlighter' || stroke.tool === 'eraser') {
      stroke.points.push(pt);
    } else {
      stroke.endPoint = pt;
    }

    // Live intermediate rendering
    setPageStrokes((prev) => ({
      ...prev,
      [currentPage]: [...(prev[currentPage] || []).filter((s) => s.id !== stroke.id), { ...stroke }],
    }));
  };

  const handlePointerUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    currentStrokeRef.current = null;
  };

  // Undo / Redo handlers
  const handleUndo = () => {
    const history = undoStack[currentPage] || [];
    if (history.length === 0) return;

    const previousState = history[history.length - 1];
    const currentState = pageStrokes[currentPage] || [];

    setUndoStack((prev) => ({
      ...prev,
      [currentPage]: history.slice(0, -1),
    }));

    setRedoStack((prev) => ({
      ...prev,
      [currentPage]: [...(prev[currentPage] || []), currentState],
    }));

    setPageStrokes((prev) => ({
      ...prev,
      [currentPage]: previousState,
    }));
  };

  const handleRedo = () => {
    const future = redoStack[currentPage] || [];
    if (future.length === 0) return;

    const nextState = future[future.length - 1];
    const currentState = pageStrokes[currentPage] || [];

    setRedoStack((prev) => ({
      ...prev,
      [currentPage]: future.slice(0, -1),
    }));

    setUndoStack((prev) => ({
      ...prev,
      [currentPage]: [...(prev[currentPage] || []), currentState],
    }));

    setPageStrokes((prev) => ({
      ...prev,
      [currentPage]: nextState,
    }));
  };

  const handleClearPage = () => {
    const currentState = pageStrokes[currentPage] || [];
    if (currentState.length === 0) return;

    setUndoStack((prev) => ({
      ...prev,
      [currentPage]: [...(prev[currentPage] || []), currentState],
    }));
    setRedoStack((prev) => ({
      ...prev,
      [currentPage]: [],
    }));
    setPageStrokes((prev) => ({
      ...prev,
      [currentPage]: [],
    }));
  };

  const handleAddText = () => {
    if (!textInputPos || !textContent.trim()) {
      setTextInputPos(null);
      return;
    }

    const stroke: Stroke = {
      id: Math.random().toString(36).slice(2, 9),
      tool: 'text',
      points: [textInputPos],
      color,
      size: brushSize,
      opacity: 1,
      text: textContent.trim(),
      startPoint: textInputPos,
    };

    setPageStrokes((prev) => ({
      ...prev,
      [currentPage]: [...(prev[currentPage] || []), stroke],
    }));

    setTextInputPos(null);
    setTextContent('');
  };

  // 3. Export all annotated pages to a burned PDF
  const handleExportPdf = async () => {
    setIsExporting(true);
    try {
      const generatedFiles: File[] = [];

      for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
        // Create an offscreen composite canvas for each page
        const compositeCanvas = document.createElement('canvas');
        compositeCanvas.width = canvasDimensions.width;
        compositeCanvas.height = canvasDimensions.height;
        const compCtx = compositeCanvas.getContext('2d')!;

        // Fill background
        compCtx.fillStyle = '#ffffff';
        compCtx.fillRect(0, 0, compositeCanvas.width, compositeCanvas.height);

        // Render PDF base page if file exists
        if (file) {
          const pdfjs = await getPdfJs();
          const arrayBuffer = await file.arrayBuffer();
          const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
          const doc = await pdfjs.getDocument({
            data: arrayBuffer,
            cMapUrl: `${baseUrl}/cmaps/`,
            cMapPacked: true,
            standardFontDataUrl: `${baseUrl}/standard_fonts/`,
          }).promise;
          const pdfPage = await doc.getPage(pageNum);
          const vp = pdfPage.getViewport({ scale: 1.5 });
          await pdfPage.render({ canvasContext: compCtx, viewport: vp, canvas: compositeCanvas } as Parameters<typeof pdfPage.render>[0]).promise;
        }

        // Render strokes for this page
        const strokes = pageStrokes[pageNum] || [];
        for (const stroke of strokes) {
          compCtx.save();
          compCtx.strokeStyle = stroke.color;
          compCtx.fillStyle = stroke.color;
          compCtx.lineWidth = stroke.size;
          compCtx.lineCap = 'round';
          compCtx.lineJoin = 'round';
          compCtx.globalAlpha = stroke.opacity;

          if (stroke.tool === 'eraser') {
            compCtx.globalCompositeOperation = 'destination-out';
          } else {
            compCtx.globalCompositeOperation = 'source-over';
          }

          if (stroke.tool === 'pen' || stroke.tool === 'highlighter' || stroke.tool === 'eraser') {
            if (stroke.points.length > 1) {
              compCtx.beginPath();
              compCtx.moveTo(stroke.points[0].x, stroke.points[0].y);
              for (let i = 1; i < stroke.points.length; i++) {
                compCtx.lineTo(stroke.points[i].x, stroke.points[i].y);
              }
              compCtx.stroke();
            } else if (stroke.points.length === 1) {
              compCtx.beginPath();
              compCtx.arc(stroke.points[0].x, stroke.points[0].y, stroke.size / 2, 0, Math.PI * 2);
              compCtx.fill();
            }
          } else if (stroke.tool === 'rect' && stroke.startPoint && stroke.endPoint) {
            const x = Math.min(stroke.startPoint.x, stroke.endPoint.x);
            const y = Math.min(stroke.startPoint.y, stroke.endPoint.y);
            const w = Math.abs(stroke.endPoint.x - stroke.startPoint.x);
            const h = Math.abs(stroke.endPoint.y - stroke.startPoint.y);
            compCtx.strokeRect(x, y, w, h);
          } else if (stroke.tool === 'circle' && stroke.startPoint && stroke.endPoint) {
            const rx = Math.abs(stroke.endPoint.x - stroke.startPoint.x) / 2;
            const ry = Math.abs(stroke.endPoint.y - stroke.startPoint.y) / 2;
            const cx = Math.min(stroke.startPoint.x, stroke.endPoint.x) + rx;
            const cy = Math.min(stroke.startPoint.y, stroke.endPoint.y) + ry;
            compCtx.beginPath();
            compCtx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
            compCtx.stroke();
          } else if (stroke.tool === 'line' && stroke.startPoint && stroke.endPoint) {
            compCtx.beginPath();
            compCtx.moveTo(stroke.startPoint.x, stroke.startPoint.y);
            compCtx.lineTo(stroke.endPoint.x, stroke.endPoint.y);
            compCtx.stroke();
          } else if (stroke.tool === 'arrow' && stroke.startPoint && stroke.endPoint) {
            const fromX = stroke.startPoint.x;
            const fromY = stroke.startPoint.y;
            const toX = stroke.endPoint.x;
            const toY = stroke.endPoint.y;
            const headlen = Math.max(12, stroke.size * 3);
            const dx = toX - fromX;
            const dy = toY - fromY;
            const angle = Math.atan2(dy, dx);

            compCtx.beginPath();
            compCtx.moveTo(fromX, fromY);
            compCtx.lineTo(toX, toY);
            compCtx.stroke();

            compCtx.beginPath();
            compCtx.moveTo(toX, toY);
            compCtx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
            compCtx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
            compCtx.closePath();
            compCtx.fill();
          } else if (stroke.tool === 'text' && stroke.text && stroke.startPoint) {
            compCtx.font = `bold ${stroke.size * 5 + 12}px sans-serif`;
            compCtx.fillText(stroke.text, stroke.startPoint.x, stroke.startPoint.y);
          }

          compCtx.restore();
        }

        // Convert composite page canvas to blob
        const dataUrl = compositeCanvas.toDataURL('image/jpeg', 0.95);
        const res = await fetch(dataUrl);
        const blob = await res.blob();
        generatedFiles.push(new File([blob], `whiteboard_page_${pageNum}.jpg`, { type: 'image/jpeg' }));
      }

      // Convert page images back into a clean PDF
      const pdfBytes = await convertImagesToPdf(generatedFiles, { pageSize: 'a4', imageFit: 'contain' });
      const finalPdfBlob = createPdfBlob(pdfBytes);

      if (onDone) {
        onDone(finalPdfBlob);
      } else if (onGenerated) {
        onGenerated(finalPdfBlob);
      } else {
        const url = URL.createObjectURL(finalPdfBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file ? `${file.name.replace(/\.[^/.]+$/, '')}_whiteboard.pdf` : `whiteboard_${Date.now()}.pdf`;
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error('Failed to export whiteboard PDF:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="surface-card rounded-2xl sm:rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-4 sm:p-6 lg:p-7 space-y-5 shadow-sm animate-fade-in select-none">
      {/* Top Header & Export Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-[var(--tx)] flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[var(--accent)]" />
            PDF Visual Whiteboard &amp; Annotator
          </h3>
          <p className="text-xs text-[var(--tx-2)] mt-0.5">
            {file ? `Annotating: ${file.name} (${totalPages} pages)` : 'Interactive visual sketch canvas. Upload a PDF or sketch on a blank whiteboard.'}
          </p>
        </div>

        {/* Page Nav & Export Action */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          {totalPages > 1 && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] text-xs font-semibold text-[var(--tx)]">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage <= 1}
                className="p-1 rounded hover:bg-[var(--border)] disabled:opacity-30 cursor-pointer"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <span className="min-w-[60px] text-center font-mono">
                {currentPage} / {totalPages}
              </span>
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage >= totalPages}
                className="p-1 rounded hover:bg-[var(--border)] disabled:opacity-30 cursor-pointer"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={handleExportPdf}
            disabled={isExporting}
            className="btn-primary py-2.5 px-4 rounded-xl font-bold text-white text-xs shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer disabled:opacity-50 min-h-[38px]"
          >
            <Download className="h-4 w-4" />
            <span>{isExporting ? 'Exporting PDF...' : 'Export Marked PDF'}</span>
          </button>
        </div>
      </div>

      {/* Floating Toolbar & Tool Selectors */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2.5 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border)] shadow-xs">
        {/* Tool Buttons */}
        <div className="flex items-center gap-1 flex-wrap">
          {[
            { id: 'pen', label: 'Pen', icon: Pencil },
            { id: 'highlighter', label: 'Highlighter', icon: Highlighter },
            { id: 'eraser', label: 'Eraser', icon: Eraser },
            { id: 'rect', label: 'Rectangle', icon: Square },
            { id: 'circle', label: 'Circle', icon: Circle },
            { id: 'arrow', label: 'Arrow', icon: ArrowUpRight },
            { id: 'line', label: 'Line', icon: Minus },
            { id: 'text', label: 'Text', icon: Type },
          ].map((t) => {
            const Icon = t.icon;
            const isActive = currentTool === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setCurrentTool(t.id as ToolType)}
                title={t.label}
                className={`p-2 rounded-xl flex items-center gap-1.5 text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[var(--accent)] text-white shadow-xs'
                    : 'text-[var(--tx-2)] hover:text-[var(--tx)] hover:bg-[var(--border)]'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden md:inline">{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Color Palette & Brush Size */}
        <div className="flex items-center gap-3 flex-wrap">
          {currentTool !== 'eraser' && (
            <div className="flex items-center gap-1.5">
              {PRESET_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`h-6 w-6 rounded-full border border-black/20 shadow-xs transition-transform cursor-pointer flex items-center justify-center ${
                    color === c ? 'scale-125 ring-2 ring-[var(--accent)] ring-offset-1' : 'hover:scale-110'
                  }`}
                  style={{ backgroundColor: c }}
                >
                  {color === c && <Check className={`h-3 w-3 ${c === '#FFFFFF' ? 'text-black' : 'text-white'}`} />}
                </button>
              ))}
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-6 w-7 rounded-lg border border-[var(--border)] bg-transparent cursor-pointer ml-1"
                title="Custom Color"
              />
            </div>
          )}

          {/* Stroke Width Slider */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[var(--tx-3)] font-mono">{brushSize}px</span>
            <input
              type="range"
              min={1}
              max={24}
              value={brushSize}
              onChange={(e) => setBrushSize(parseInt(e.target.value, 10))}
              className="w-16 sm:w-20 h-1.5 bg-neutral-300 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-[var(--accent)]"
            />
          </div>

          {/* Paper Style (if blank) */}
          {!file && (
            <div className="flex items-center gap-1 border-l border-[var(--border)] pl-2">
              {(['plain', 'grid', 'dots', 'lines'] as PaperGridType[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPaperGrid(p)}
                  className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase transition-colors cursor-pointer ${
                    paperGrid === p ? 'bg-[var(--accent)] text-white' : 'text-[var(--tx-3)] hover:text-[var(--tx)]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          {/* Undo / Redo / Clear */}
          <div className="flex items-center gap-1 border-l border-[var(--border)] pl-2">
            <button
              type="button"
              onClick={handleUndo}
              disabled={(undoStack[currentPage] || []).length === 0}
              title="Undo"
              className="p-1.5 rounded-lg hover:bg-[var(--border)] text-[var(--tx-2)] disabled:opacity-30 cursor-pointer"
            >
              <Undo2 className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleRedo}
              disabled={(redoStack[currentPage] || []).length === 0}
              title="Redo"
              className="p-1.5 rounded-lg hover:bg-[var(--border)] text-[var(--tx-2)] disabled:opacity-30 cursor-pointer"
            >
              <Redo2 className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleClearPage}
              title="Clear Page"
              className="p-1.5 rounded-lg hover:bg-rose-500/20 text-rose-500 cursor-pointer"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center gap-1 border-l border-[var(--border)] pl-2">
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.max(0.5, Number((z - 0.25).toFixed(2))))}
              disabled={zoomLevel <= 0.5}
              title="Zoom Out"
              className="p-1.5 rounded-lg hover:bg-[var(--border)] text-[var(--tx-2)] disabled:opacity-30 cursor-pointer"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setZoomLevel(1)}
              title="Reset Zoom"
              className="px-1.5 py-0.5 rounded text-[11px] font-mono text-[var(--tx-3)] hover:text-[var(--tx)] cursor-pointer"
            >
              {Math.round(zoomLevel * 100)}%
            </button>
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.min(2.5, Number((z + 0.25).toFixed(2))))}
              disabled={zoomLevel >= 2.5}
              title="Zoom In"
              className="p-1.5 rounded-lg hover:bg-[var(--border)] text-[var(--tx-2)] disabled:opacity-30 cursor-pointer"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Canvas Viewport Container */}
      <div
        ref={containerRef}
        className="relative w-full rounded-2xl sm:rounded-3xl bg-neutral-900 border border-[var(--border)] overflow-auto p-4 sm:p-8 flex items-center justify-center min-h-[500px] max-h-[750px] shadow-inner"
      >
        <div
          className="relative bg-white rounded-lg shadow-2xl overflow-hidden touch-none"
          style={{
            width: `${canvasDimensions.width * zoomLevel}px`,
            height: `${canvasDimensions.height * zoomLevel}px`,
            maxWidth: '100%',
            aspectRatio: `${canvasDimensions.width} / ${canvasDimensions.height}`,
          }}
        >
          {/* Base PDF Canvas Layer */}
          <canvas
            ref={pdfCanvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
          />

          {/* Interactive Drawing Canvas Layer */}
          <canvas
            ref={drawCanvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            className={`absolute inset-0 w-full h-full ${
              currentTool === 'text' ? 'cursor-text' : currentTool === 'eraser' ? 'cursor-cell' : 'cursor-crosshair'
            }`}
          />

          {/* Text Insertion Modal Popover */}
          {textInputPos && (
            <div
              className="absolute z-30 p-2.5 rounded-xl bg-white border border-slate-300 shadow-xl space-y-2"
              style={{
                left: `${(textInputPos.x / canvasDimensions.width) * 100}%`,
                top: `${(textInputPos.y / canvasDimensions.height) * 100}%`,
              }}
            >
              <input
                type="text"
                autoFocus
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddText();
                  if (e.key === 'Escape') setTextInputPos(null);
                }}
                placeholder="Type text annotation..."
                className="px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg text-black font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              />
              <div className="flex items-center justify-end gap-1.5">
                <button
                  type="button"
                  onClick={() => setTextInputPos(null)}
                  className="px-2 py-1 text-[11px] text-slate-500 hover:text-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddText}
                  className="px-3 py-1 rounded-lg bg-[var(--accent)] text-white text-[11px] font-bold cursor-pointer"
                >
                  Place
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
