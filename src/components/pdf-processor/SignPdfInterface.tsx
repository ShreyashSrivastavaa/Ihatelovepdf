'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  PenLine,
  Type,
  Upload,
  Calendar,
  Trash2,
  Copy,
  RotateCw,
  Plus,
  Check,
  X,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  Download,
  Loader2,
  Undo2,
  Eraser,
  Sparkles,
  FileCheck,
} from 'lucide-react';
import { signPdf, SignaturePlacement } from '../../lib/operations/sign';
import { createPdfBlob } from '../../lib/pdf-processor';

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

export interface SignPdfInterfaceProps {
  file: File;
  onDone?: (blob: Blob) => void;
  isProcessing?: boolean;
}

interface SavedSignatureItem {
  id: string;
  dataUrl: string;
  type: 'draw' | 'type' | 'upload' | 'stamp';
  title: string;
  width: number;
  height: number;
}

interface PageMeta {
  pageNumber: number;
  width: number;
  height: number;
  rotation: number;
}

const INK_COLORS = [
  { label: 'Black', value: '#0f172a' },
  { label: 'Navy Blue', value: '#1e3a8a' },
  { label: 'Royal Blue', value: '#2563eb' },
  { label: 'Crimson', value: '#dc2626' },
  { label: 'Emerald', value: '#059669' },
];

const CURSIVE_FONTS = [
  { id: 'Caveat', name: 'Caveat', fontString: '600 38px "Caveat", cursive' },
  { id: 'Dancing Script', name: 'Dancing Script', fontString: '600 36px "Dancing Script", cursive' },
  { id: 'Great Vibes', name: 'Great Vibes', fontString: '400 42px "Great Vibes", cursive' },
  { id: 'Pacifico', name: 'Pacifico', fontString: '400 32px "Pacifico", cursive' },
  { id: 'Sacramento', name: 'Sacramento', fontString: '400 42px "Sacramento", cursive' },
];

export default function SignPdfInterface({
  file,
  onDone,
  isProcessing: externalProcessing = false,
}: SignPdfInterfaceProps) {
  // Load Google Fonts for handwriting styles
  useEffect(() => {
    const linkId = 'google-fonts-signatures';
    if (!document.getElementById(linkId)) {
      const link = document.createElement('link');
      link.id = linkId;
      link.rel = 'stylesheet';
      link.href =
        'https://fonts.googleapis.com/css2?family=Caveat:wght@600&family=Dancing+Script:wght@600&family=Great+Vibes&family=Pacifico&family=Sacramento&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  // PDF.js State
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [pdfDocument, setPdfDocument] = useState<any>(null);
  const [pages, setPages] = useState<PageMeta[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [scale, setScale] = useState<number>(1.0);
  const [isLoadingPdf, setIsLoadingPdf] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Placements & Saved signatures
  const [placements, setPlacements] = useState<SignaturePlacement[]>([]);
  const [savedSignatures, setSavedSignatures] = useState<SavedSignatureItem[]>([]);
  const [selectedPlacementId, setSelectedPlacementId] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalTab, setModalTab] = useState<'draw' | 'type' | 'upload' | 'stamp'>('draw');

  // Drawing Pad State
  const drawCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [drawColor, setDrawColor] = useState<string>(INK_COLORS[1].value); // Default Navy Blue
  const [drawThickness, setDrawThickness] = useState<number>(3);
  const [hasDrawnStroke, setHasDrawnStroke] = useState<boolean>(false);
  const strokeHistoryRef = useRef<ImageData[]>([]);

  // Typing Signature State
  const [typedName, setTypedName] = useState<string>('');
  const [typedFont, setTypedFont] = useState<string>(CURSIVE_FONTS[0].id);
  const [typedColor, setTypedColor] = useState<string>(INK_COLORS[1].value);

  // Upload Signature State
  const [uploadedDataUrl, setUploadedDataUrl] = useState<string | null>(null);
  const [removeWhiteBg, setRemoveWhiteBg] = useState<boolean>(true);

  // Stamp State
  const [stampType, setStampType] = useState<'date' | 'approved' | 'verified' | 'custom'>('date');
  const [customStampText, setCustomStampText] = useState<string>('APPROVED & SIGNED');
  const [stampColor, setStampColor] = useState<string>(INK_COLORS[0].value);

  // Export State
  const [isExporting, setIsExporting] = useState<boolean>(false);

  // Canvas Refs
  const pageCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const activeRenderTaskRef = useRef<{ cancel: () => void; promise: Promise<unknown> } | null>(null);
  const pageContainerRef = useRef<HTMLDivElement | null>(null);

  // Load PDF Document
  useEffect(() => {
    let isCancelled = false;
    async function loadPdf() {
      setIsLoadingPdf(true);
      setLoadError(null);
      try {
        const pdfjs = await getPdfJs();
        const arrayBuffer = await file.arrayBuffer();
        const doc = await pdfjs.getDocument({ data: arrayBuffer }).promise;
        if (isCancelled) return;

        setPdfDocument(doc);
        const metaList: PageMeta[] = [];
        for (let i = 1; i <= doc.numPages; i++) {
          const page = await doc.getPage(i);
          const vp = page.getViewport({ scale: 1.0 });
          metaList.push({
            pageNumber: i,
            width: vp.width,
            height: vp.height,
            rotation: page.rotate || 0,
          });
        }
        if (isCancelled) return;
        setPages(metaList);
        setCurrentPageIndex(0);

        // Responsive initial scale based on container width
        const defaultWidth = metaList[0]?.width || 595;
        const availableWidth = Math.min(window.innerWidth - 80, 800);
        const autoScale = Math.min(1.2, Math.max(0.6, availableWidth / defaultWidth));
        setScale(autoScale);
      } catch (err) {
        if (!isCancelled) {
          console.error('Failed to load PDF in SignPdfInterface:', err);
          setLoadError(err instanceof Error ? err.message : 'Could not load PDF document.');
        }
      } finally {
        if (!isCancelled) setIsLoadingPdf(false);
      }
    }
    loadPdf();
    return () => {
      isCancelled = true;
    };
  }, [file]);

  // Render Current Page onto Canvas
  useEffect(() => {
    if (!pdfDocument || pages.length === 0) return;
    let isCancelled = false;

    async function renderPage() {
      try {
        const page = await pdfDocument.getPage(currentPageIndex + 1);
        if (activeRenderTaskRef.current) {
          try {
            activeRenderTaskRef.current.cancel();
          } catch {
            // ignore
          }
        }

        const viewport = page.getViewport({ scale });
        const canvas = pageCanvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const renderTask = page.render({
          canvasContext: ctx,
          viewport,
        });
        activeRenderTaskRef.current = renderTask;

        await renderTask.promise;
      } catch (err: unknown) {
        const errorName = err && typeof err === 'object' && 'name' in err ? (err as { name: string }).name : '';
        if (!isCancelled && errorName !== 'RenderingCancelledException') {
          console.warn('Page rendering interrupted:', err);
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
  }, [pdfDocument, currentPageIndex, scale, pages]);

  // Handle Draw Pad canvas initialization
  useEffect(() => {
    if (isModalOpen && modalTab === 'draw' && drawCanvasRef.current) {
      const canvas = drawCanvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx && strokeHistoryRef.current.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        strokeHistoryRef.current = [ctx.getImageData(0, 0, canvas.width, canvas.height)];
      }
    }
  }, [isModalOpen, modalTab]);

  // Drawing Pad Handlers
  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.setPointerCapture(e.pointerId);
    setIsDrawing(true);
    setHasDrawnStroke(true);

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = drawColor;
    ctx.lineWidth = drawThickness;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };

  const drawStroke = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = drawCanvasRef.current;
    if (canvas) {
      canvas.releasePointerCapture(e.pointerId);
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.closePath();
        strokeHistoryRef.current.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
      }
    }
    setIsDrawing(false);
  };

  const clearDrawing = () => {
    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    strokeHistoryRef.current = [ctx.getImageData(0, 0, canvas.width, canvas.height)];
    setHasDrawnStroke(false);
  };

  const undoDrawing = () => {
    if (strokeHistoryRef.current.length <= 1) {
      clearDrawing();
      return;
    }
    strokeHistoryRef.current.pop(); // Remove current
    const previous = strokeHistoryRef.current[strokeHistoryRef.current.length - 1];
    const canvas = drawCanvasRef.current;
    if (!canvas || !previous) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.putImageData(previous, 0, 0);
      setHasDrawnStroke(strokeHistoryRef.current.length > 1);
    }
  };

  // Crop non-transparent bounds of canvas image
  const cropCanvasSignature = (canvas: HTMLCanvasElement): string => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return canvas.toDataURL('image/png');

    const w = canvas.width;
    const h = canvas.height;
    const imgData = ctx.getImageData(0, 0, w, h);
    const data = imgData.data;

    let minX = w;
    let minY = h;
    let maxX = 0;
    let maxY = 0;
    let hasPixels = false;

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const alpha = data[(y * w + x) * 4 + 3];
        if (alpha > 10) {
          hasPixels = true;
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    if (!hasPixels) return canvas.toDataURL('image/png');

    // Add 12px padding
    const pad = 12;
    const cropX = Math.max(0, minX - pad);
    const cropY = Math.max(0, minY - pad);
    const cropW = Math.min(w - cropX, maxX - minX + pad * 2);
    const cropH = Math.min(h - cropY, maxY - minY + pad * 2);

    const croppedCanvas = document.createElement('canvas');
    croppedCanvas.width = cropW;
    croppedCanvas.height = cropH;
    const cCtx = croppedCanvas.getContext('2d');
    if (!cCtx) return canvas.toDataURL('image/png');

    cCtx.drawImage(canvas, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);
    return croppedCanvas.toDataURL('image/png');
  };

  // Save Drawn Signature
  const handleSaveDrawn = () => {
    const canvas = drawCanvasRef.current;
    if (!canvas || !hasDrawnStroke) return;

    const dataUrl = cropCanvasSignature(canvas);
    const newSig: SavedSignatureItem = {
      id: `sig_${Date.now()}`,
      dataUrl,
      type: 'draw',
      title: 'Drawn Signature',
      width: 160,
      height: 60,
    };

    setSavedSignatures((prev) => [newSig, ...prev]);
    placeSignatureOnCurrentPage(newSig);
    setIsModalOpen(false);
    clearDrawing();
  };

  // Generate Typed Signature PNG
  const handleSaveTyped = () => {
    if (!typedName.trim()) return;

    const offscreen = document.createElement('canvas');
    offscreen.width = 600;
    offscreen.height = 200;
    const ctx = offscreen.getContext('2d');
    if (!ctx) return;

    const selected = CURSIVE_FONTS.find((f) => f.id === typedFont) || CURSIVE_FONTS[0];
    ctx.font = selected.fontString;
    ctx.fillStyle = typedColor;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText(typedName.trim(), 300, 100);

    const dataUrl = cropCanvasSignature(offscreen);
    const newSig: SavedSignatureItem = {
      id: `sig_${Date.now()}`,
      dataUrl,
      type: 'type',
      title: `Typed (${typedName.trim()})`,
      width: 180,
      height: 60,
    };

    setSavedSignatures((prev) => [newSig, ...prev]);
    placeSignatureOnCurrentPage(newSig);
    setIsModalOpen(false);
  };

  // Handle Upload Image & Transparent Background Removal
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (loadEvt) => {
      const result = loadEvt.target?.result as string;
      if (!result) return;

      const img = new Image();
      img.onload = () => {
        const offscreen = document.createElement('canvas');
        offscreen.width = img.width;
        offscreen.height = img.height;
        const ctx = offscreen.getContext('2d');
        if (!ctx) return;

        ctx.drawImage(img, 0, 0);

        if (removeWhiteBg) {
          const imgData = ctx.getImageData(0, 0, offscreen.width, offscreen.height);
          const data = imgData.data;
          // Set near-white pixels (e.g. paper scan background) to transparent
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            if (r > 220 && g > 220 && b > 220) {
              data[i + 3] = 0; // Alpha = 0
            }
          }
          ctx.putImageData(imgData, 0, 0);
        }

        const cropped = cropCanvasSignature(offscreen);
        setUploadedDataUrl(cropped);
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  };

  const handleSaveUploaded = () => {
    if (!uploadedDataUrl) return;

    const newSig: SavedSignatureItem = {
      id: `sig_${Date.now()}`,
      dataUrl: uploadedDataUrl,
      type: 'upload',
      title: 'Uploaded Signature',
      width: 160,
      height: 60,
    };

    setSavedSignatures((prev) => [newSig, ...prev]);
    placeSignatureOnCurrentPage(newSig);
    setIsModalOpen(false);
    setUploadedDataUrl(null);
  };

  // Generate Stamp PNG (Date, Approved, Verified)
  const handleSaveStamp = () => {
    const offscreen = document.createElement('canvas');
    offscreen.width = 400;
    offscreen.height = 120;
    const ctx = offscreen.getContext('2d');
    if (!ctx) return;

    let text = '';
    let subtext = '';

    if (stampType === 'date') {
      const today = new Date();
      text = today.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
      });
      subtext = 'DATE SIGNED';
    } else if (stampType === 'approved') {
      text = '✓ APPROVED';
      subtext = new Date().toISOString().split('T')[0];
    } else if (stampType === 'verified') {
      text = '★ VERIFIED';
      subtext = 'AUTHENTICATED';
    } else {
      text = customStampText.toUpperCase();
      subtext = new Date().toISOString().split('T')[0];
    }

    // Draw rounded border stamp
    ctx.strokeStyle = stampColor;
    ctx.lineWidth = 4;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.beginPath();
    ctx.roundRect(10, 10, 380, 100, 12);
    ctx.fill();
    ctx.stroke();

    // Inner dashed line
    ctx.lineWidth = 1.5;
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.roundRect(16, 16, 368, 88, 8);
    ctx.stroke();
    ctx.setLineDash([]);

    // Text
    ctx.fillStyle = stampColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText(text, 200, 50);

    if (subtext) {
      ctx.font = '600 13px sans-serif';
      ctx.fillText(subtext, 200, 78);
    }

    const dataUrl = cropCanvasSignature(offscreen);
    const newSig: SavedSignatureItem = {
      id: `stamp_${Date.now()}`,
      dataUrl,
      type: 'stamp',
      title: text,
      width: 150,
      height: 50,
    };

    setSavedSignatures((prev) => [newSig, ...prev]);
    placeSignatureOnCurrentPage(newSig);
    setIsModalOpen(false);
  };

  // Place signature onto current page at default centered position
  const placeSignatureOnCurrentPage = (item: SavedSignatureItem) => {
    const currentPage = pages[currentPageIndex] || { width: 595, height: 842 };
    const defaultX = Math.max(20, (currentPage.width - item.width) / 2);
    const defaultY = Math.max(40, currentPage.height - item.height - 120);

    const newPlacement: SignaturePlacement = {
      id: `placement_${Date.now()}`,
      pageIndex: currentPageIndex,
      x: defaultX,
      y: defaultY,
      width: item.width,
      height: item.height,
      rotation: 0,
      opacity: 1,
      dataUrl: item.dataUrl,
      type: item.type === 'stamp' ? 'stamp' : 'signature',
      title: item.title,
    };

    setPlacements((prev) => [...prev, newPlacement]);
    setSelectedPlacementId(newPlacement.id);
  };

  // Dragging and Resizing Logic
  const activePlacementRef = useRef<{
    id: string;
    action: 'move' | 'resize';
    startX: number;
    startY: number;
    initX: number;
    initY: number;
    initW: number;
    initH: number;
  } | null>(null);

  const handlePointerDown = (
    e: React.PointerEvent,
    id: string,
    action: 'move' | 'resize'
  ) => {
    e.stopPropagation();
    const target = placements.find((p) => p.id === id);
    if (!target) return;

    setSelectedPlacementId(id);
    activePlacementRef.current = {
      id,
      action,
      startX: e.clientX,
      startY: e.clientY,
      initX: target.x,
      initY: target.y,
      initW: target.width,
      initH: target.height,
    };

    const handlePointerMove = (moveEvt: PointerEvent) => {
      if (!activePlacementRef.current) return;
      const { id, action, startX, startY, initX, initY, initW, initH } =
        activePlacementRef.current;

      const deltaX = (moveEvt.clientX - startX) / scale;
      const deltaY = (moveEvt.clientY - startY) / scale;

      setPlacements((prev) =>
        prev.map((p) => {
          if (p.id !== id) return p;

          if (action === 'move') {
            return {
              ...p,
              x: Math.max(0, initX + deltaX),
              y: Math.max(0, initY + deltaY),
            };
          } else if (action === 'resize') {
            const aspect = initW / initH;
            const newW = Math.max(40, initW + deltaX);
            const newH = Math.max(20, newW / aspect);
            return {
              ...p,
              width: newW,
              height: newH,
            };
          }
          return p;
        })
      );
    };

    const handlePointerUp = () => {
      activePlacementRef.current = null;
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  // Rotation & Action Helpers
  const rotateSelectedPlacement = () => {
    if (!selectedPlacementId) return;
    setPlacements((prev) =>
      prev.map((p) =>
        p.id === selectedPlacementId
          ? { ...p, rotation: ((p.rotation || 0) + 90) % 360 }
          : p
      )
    );
  };

  const deleteSelectedPlacement = () => {
    if (!selectedPlacementId) return;
    setPlacements((prev) => prev.filter((p) => p.id !== selectedPlacementId));
    setSelectedPlacementId(null);
  };

  const duplicateSelectedPlacement = () => {
    const target = placements.find((p) => p.id === selectedPlacementId);
    if (!target) return;
    const duplicated: SignaturePlacement = {
      ...target,
      id: `placement_${Date.now()}`,
      x: target.x + 20,
      y: target.y + 20,
    };
    setPlacements((prev) => [...prev, duplicated]);
    setSelectedPlacementId(duplicated.id);
  };

  const copyPlacementToAllPages = () => {
    const target = placements.find((p) => p.id === selectedPlacementId);
    if (!target) return;

    const newCopies: SignaturePlacement[] = [];
    for (let i = 0; i < pages.length; i++) {
      if (i === target.pageIndex) continue;
      newCopies.push({
        ...target,
        id: `placement_${Date.now()}_page_${i}`,
        pageIndex: i,
      });
    }
    setPlacements((prev) => [...prev, ...newCopies]);
  };

  // Current page placements
  const currentPagePlacements = useMemo(
    () => placements.filter((p) => p.pageIndex === currentPageIndex),
    [placements, currentPageIndex]
  );

  // Final Export Action
  const handleExport = async () => {
    if (placements.length === 0) {
      alert('Please place at least one signature on the document before downloading.');
      return;
    }

    setIsExporting(true);
    try {
      const signedBytes = await signPdf(file, placements);
      const blob = createPdfBlob(signedBytes);
      if (onDone) {
        onDone(blob);
      } else {
        const outName = `${file.name.replace(/\.[^/.]+$/, '')}_signed.pdf`;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = outName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 5000);
      }
    } catch (err) {
      console.error('Failed to sign and export PDF:', err);
      alert('Failed to sign PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl shadow-xl overflow-hidden text-[var(--tx)]">
      {/* Top Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 border-b border-[var(--border)] bg-[var(--bg-2)]/60">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center text-[var(--accent)] shadow-xs">
            <PenLine className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold flex items-center gap-2">
              <span>Sign PDF Document</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] font-semibold">
                {placements.length} {placements.length === 1 ? 'stamp placed' : 'stamps placed'}
              </span>
            </h2>
            <p className="text-xs text-[var(--tx-3)] truncate max-w-xs sm:max-w-md">{file.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setModalTab('draw');
              setIsModalOpen(true);
            }}
            className="btn-primary inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white shadow-sm cursor-pointer transition-all hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4" />
            <span>Create Signature</span>
          </button>

          <button
            type="button"
            onClick={handleExport}
            disabled={isExporting || externalProcessing || placements.length === 0}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            <span>Sign & Download</span>
          </button>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="flex flex-col lg:flex-row min-h-[640px]">
        {/* Left Sidebar: Saved Signatures & Quick Stamps */}
        <div className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-[var(--border)] p-4 bg-[var(--bg)] flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[var(--tx-2)] uppercase tracking-wider">
              Signature Library
            </span>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="text-xs text-[var(--accent)] font-semibold hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>

          {/* List of Created Signatures */}
          <div className="flex-1 overflow-y-auto space-y-2.5 max-h-[320px] lg:max-h-none">
            {savedSignatures.length === 0 ? (
              <div className="p-4 rounded-xl border border-dashed border-[var(--border)] text-center text-xs text-[var(--tx-3)] space-y-2">
                <PenLine className="w-6 h-6 mx-auto text-[var(--tx-3)] opacity-60" />
                <p>No signatures yet.</p>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="px-3 py-1 rounded-lg bg-[var(--accent-soft)] text-[var(--accent)] font-semibold"
                >
                  Create Your First
                </button>
              </div>
            ) : (
              savedSignatures.map((sig) => (
                <div
                  key={sig.id}
                  className="group relative p-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--accent)] hover:shadow-sm transition-all"
                >
                  <div className="h-16 flex items-center justify-center p-1 bg-white rounded-lg border border-slate-100 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={sig.dataUrl} alt={sig.title} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[11px] font-medium text-[var(--tx-2)] truncate max-w-[120px]">
                      {sig.title}
                    </span>
                    <button
                      type="button"
                      onClick={() => placeSignatureOnCurrentPage(sig)}
                      className="px-2 py-1 rounded-lg text-[10px] font-bold bg-[var(--accent-soft)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-colors"
                      title="Place on current page"
                    >
                      + Place
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Quick Date Stamp Shortcuts */}
          <div className="pt-3 border-t border-[var(--border)] space-y-2">
            <span className="text-[11px] font-bold text-[var(--tx-3)] uppercase tracking-wider">
              Quick Annotations
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setModalTab('stamp');
                  setStampType('date');
                  setIsModalOpen(true);
                }}
                className="p-2 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--accent)] text-xs text-[var(--tx)] flex items-center justify-center gap-1 font-medium transition-all"
              >
                <Calendar className="w-3.5 h-3.5 text-blue-500" />
                <span>Date Stamp</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setModalTab('stamp');
                  setStampType('approved');
                  setIsModalOpen(true);
                }}
                className="p-2 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--accent)] text-xs text-[var(--tx)] flex items-center justify-center gap-1 font-medium transition-all"
              >
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>Approved</span>
              </button>
            </div>
          </div>
        </div>

        {/* Center: PDF Canvas Viewer */}
        <div className="flex-1 flex flex-col bg-slate-900/10 dark:bg-slate-950/40 relative min-h-[500px]">
          {/* Zoom and Page Navigation Bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between gap-3 px-4 py-2 bg-[var(--bg-card)]/90 backdrop-blur-md border-b border-[var(--border)]">
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={currentPageIndex <= 0}
                onClick={() => setCurrentPageIndex((prev) => Math.max(0, prev - 1))}
                className="p-1.5 rounded-lg border border-[var(--border)] hover:bg-[var(--bg-2)] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                title="Previous Page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-semibold text-[var(--tx)]">
                Page {currentPageIndex + 1} of {pages.length || 1}
              </span>
              <button
                type="button"
                disabled={currentPageIndex >= pages.length - 1}
                onClick={() => setCurrentPageIndex((prev) => Math.min(pages.length - 1, prev + 1))}
                className="p-1.5 rounded-lg border border-[var(--border)] hover:bg-[var(--bg-2)] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                title="Next Page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setScale((s) => Math.max(0.4, Number((s - 0.15).toFixed(2))))}
                className="p-1.5 rounded-lg border border-[var(--border)] hover:bg-[var(--bg-2)] cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-mono font-semibold px-2">{Math.round(scale * 100)}%</span>
              <button
                type="button"
                onClick={() => setScale((s) => Math.min(2.5, Number((s + 0.15).toFixed(2))))}
                className="p-1.5 rounded-lg border border-[var(--border)] hover:bg-[var(--bg-2)] cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setScale(1.0)}
                className="px-2 py-1 rounded-lg border border-[var(--border)] text-[11px] font-medium hover:bg-[var(--bg-2)] cursor-pointer"
              >
                100%
              </button>
            </div>
          </div>

          {/* Main Scrollable Canvas Area */}
          <div
            ref={pageContainerRef}
            onClick={() => setSelectedPlacementId(null)}
            className="flex-1 overflow-auto p-6 flex items-center justify-center relative select-none"
          >
            {isLoadingPdf ? (
              <div className="flex flex-col items-center gap-3 text-[var(--tx-3)]">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--accent)]" />
                <span className="text-xs font-medium">Rendering PDF pages...</span>
              </div>
            ) : loadError ? (
              <div className="p-6 text-center text-red-500 max-w-sm">
                <p className="text-sm font-semibold">{loadError}</p>
              </div>
            ) : (
              <div
                className="relative bg-white shadow-2xl rounded-sm transition-all"
                style={{
                  width: (pages[currentPageIndex]?.width || 595) * scale,
                  height: (pages[currentPageIndex]?.height || 842) * scale,
                }}
              >
                {/* PDF Page Canvas */}
                <canvas ref={pageCanvasRef} className="block w-full h-full pointer-events-none" />

                {/* Overlaid Placed Signatures */}
                {currentPagePlacements.map((placement) => {
                  const isSelected = placement.id === selectedPlacementId;
                  const left = placement.x * scale;
                  const top = placement.y * scale;
                  const width = placement.width * scale;
                  const height = placement.height * scale;
                  const rotation = placement.rotation || 0;

                  return (
                    <div
                      key={placement.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPlacementId(placement.id);
                      }}
                      onPointerDown={(e) => handlePointerDown(e, placement.id, 'move')}
                      style={{
                        position: 'absolute',
                        left: `${left}px`,
                        top: `${top}px`,
                        width: `${width}px`,
                        height: `${height}px`,
                        transform: `rotate(${rotation}deg)`,
                        transformOrigin: 'center center',
                        cursor: 'move',
                      }}
                      className={`group ${
                        isSelected
                          ? 'ring-2 ring-blue-500 ring-offset-2 z-30 shadow-lg'
                          : 'hover:ring-1 hover:ring-blue-400 z-20'
                      }`}
                    >
                      {/* Image Content */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={placement.dataUrl}
                        alt={placement.title || 'Signature'}
                        className="w-full h-full object-contain pointer-events-none"
                      />

                      {/* Floating Toolbar on Selected Item */}
                      {isSelected && (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2 py-1 rounded-xl bg-slate-900 text-white shadow-xl text-xs z-40 whitespace-nowrap"
                        >
                          <button
                            type="button"
                            onClick={rotateSelectedPlacement}
                            className="p-1 rounded hover:bg-slate-800 cursor-pointer"
                            title="Rotate 90°"
                          >
                            <RotateCw className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={duplicateSelectedPlacement}
                            className="p-1 rounded hover:bg-slate-800 cursor-pointer"
                            title="Duplicate"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={copyPlacementToAllPages}
                            className="px-1.5 py-0.5 rounded text-[10px] bg-blue-600 hover:bg-blue-700 cursor-pointer font-semibold"
                            title="Copy to all pages"
                          >
                            All Pages
                          </button>
                          <button
                            type="button"
                            onClick={deleteSelectedPlacement}
                            className="p-1 rounded hover:bg-red-600 cursor-pointer text-red-300 hover:text-white"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}

                      {/* Resize Handle (Bottom-Right) */}
                      {isSelected && (
                        <div
                          onPointerDown={(e) => handlePointerDown(e, placement.id, 'resize')}
                          className="absolute -bottom-1.5 -right-1.5 w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow-md cursor-se-resize z-40 hover:scale-125 transition-transform"
                          title="Resize Signature"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Signature Creator Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-xl bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-[var(--border)] bg-[var(--bg-2)]/60">
              <h3 className="text-base font-bold flex items-center gap-2">
                <PenLine className="w-5 h-5 text-[var(--accent)]" />
                <span>Create Electronic Signature</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-[var(--tx-3)] hover:text-[var(--tx)] hover:bg-[var(--bg-card)] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="grid grid-cols-4 border-b border-[var(--border)] bg-[var(--bg)] text-xs font-semibold">
              <button
                type="button"
                onClick={() => setModalTab('draw')}
                className={`py-3 flex items-center justify-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
                  modalTab === 'draw'
                    ? 'border-[var(--accent)] text-[var(--accent)] bg-[var(--accent-soft)]'
                    : 'border-transparent text-[var(--tx-2)] hover:text-[var(--tx)]'
                }`}
              >
                <PenLine className="w-4 h-4" />
                <span>Draw</span>
              </button>

              <button
                type="button"
                onClick={() => setModalTab('type')}
                className={`py-3 flex items-center justify-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
                  modalTab === 'type'
                    ? 'border-[var(--accent)] text-[var(--accent)] bg-[var(--accent-soft)]'
                    : 'border-transparent text-[var(--tx-2)] hover:text-[var(--tx)]'
                }`}
              >
                <Type className="w-4 h-4" />
                <span>Type</span>
              </button>

              <button
                type="button"
                onClick={() => setModalTab('upload')}
                className={`py-3 flex items-center justify-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
                  modalTab === 'upload'
                    ? 'border-[var(--accent)] text-[var(--accent)] bg-[var(--accent-soft)]'
                    : 'border-transparent text-[var(--tx-2)] hover:text-[var(--tx)]'
                }`}
              >
                <Upload className="w-4 h-4" />
                <span>Upload</span>
              </button>

              <button
                type="button"
                onClick={() => setModalTab('stamp')}
                className={`py-3 flex items-center justify-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
                  modalTab === 'stamp'
                    ? 'border-[var(--accent)] text-[var(--accent)] bg-[var(--accent-soft)]'
                    : 'border-transparent text-[var(--tx-2)] hover:text-[var(--tx)]'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Stamps</span>
              </button>
            </div>

            {/* Modal Tab Content */}
            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              {/* TAB 1: DRAW */}
              {modalTab === 'draw' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[var(--tx-3)]">Draw your signature with mouse or touch</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={undoDrawing}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg border border-[var(--border)] hover:bg-[var(--bg-2)] cursor-pointer"
                      >
                        <Undo2 className="w-3.5 h-3.5" />
                        <span>Undo</span>
                      </button>
                      <button
                        type="button"
                        onClick={clearDrawing}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg border border-[var(--border)] text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 cursor-pointer"
                      >
                        <Eraser className="w-3.5 h-3.5" />
                        <span>Clear</span>
                      </button>
                    </div>
                  </div>

                  {/* Draw Canvas Area */}
                  <div className="relative border-2 border-dashed border-[var(--border)] bg-white rounded-xl overflow-hidden shadow-inner h-52 touch-none">
                    <canvas
                      ref={drawCanvasRef}
                      width={520}
                      height={208}
                      onPointerDown={startDrawing}
                      onPointerMove={drawStroke}
                      onPointerUp={stopDrawing}
                      onPointerLeave={stopDrawing}
                      className="w-full h-full cursor-crosshair block"
                    />
                    {!hasDrawnStroke && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-slate-400 text-sm font-medium">
                        Sign here...
                      </div>
                    )}
                  </div>

                  {/* Pen Options (Color & Thickness) */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-[var(--tx-2)]">Color:</span>
                      <div className="flex items-center gap-1.5">
                        {INK_COLORS.map((c) => (
                          <button
                            key={c.value}
                            type="button"
                            onClick={() => setDrawColor(c.value)}
                            style={{ backgroundColor: c.value }}
                            className={`w-6 h-6 rounded-full border-2 transition-transform cursor-pointer ${
                              drawColor === c.value ? 'scale-125 border-white shadow-md' : 'border-transparent'
                            }`}
                            title={c.label}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-[var(--tx-2)]">Pen:</span>
                      {[
                        { label: 'Fine', size: 2 },
                        { label: 'Medium', size: 3.5 },
                        { label: 'Thick', size: 5 },
                      ].map((th) => (
                        <button
                          key={th.size}
                          type="button"
                          onClick={() => setDrawThickness(th.size)}
                          className={`px-2.5 py-1 text-xs rounded-lg border font-medium cursor-pointer ${
                            drawThickness === th.size
                              ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)] font-bold'
                              : 'border-[var(--border)] text-[var(--tx-2)] hover:bg-[var(--bg-2)]'
                          }`}
                        >
                          {th.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: TYPE */}
              {modalTab === 'type' && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[var(--tx)]">Enter Full Name or Initials</label>
                    <input
                      type="text"
                      value={typedName}
                      onChange={(e) => setTypedName(e.target.value)}
                      placeholder="e.g. Johnathan Doe"
                      className="input-modern w-full text-base font-semibold"
                      autoFocus
                    />
                  </div>

                  {/* Ink Color Selector */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[var(--tx-2)]">Signature Color:</span>
                    <div className="flex items-center gap-1.5">
                      {INK_COLORS.map((c) => (
                        <button
                          key={c.value}
                          type="button"
                          onClick={() => setTypedColor(c.value)}
                          style={{ backgroundColor: c.value }}
                          className={`w-6 h-6 rounded-full border-2 transition-transform cursor-pointer ${
                            typedColor === c.value ? 'scale-125 border-white shadow-md' : 'border-transparent'
                          }`}
                          title={c.label}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Handwriting Font Previews */}
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-semibold text-[var(--tx-2)]">Choose Cursive Style:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {CURSIVE_FONTS.map((font) => (
                        <button
                          key={font.id}
                          type="button"
                          onClick={() => setTypedFont(font.id)}
                          style={{ color: typedColor }}
                          className={`p-3 rounded-xl border text-center transition-all cursor-pointer bg-white ${
                            typedFont === font.id
                              ? 'border-[var(--accent)] ring-2 ring-[var(--accent)]/30 shadow-sm'
                              : 'border-[var(--border)] hover:border-slate-400'
                          }`}
                        >
                          <span
                            style={{
                              fontFamily: `"${font.name}", cursive`,
                              fontSize: '28px',
                              lineHeight: '1.2',
                            }}
                            className="block truncate"
                          >
                            {typedName.trim() || 'Signature'}
                          </span>
                          <span className="text-[10px] text-slate-400 font-sans block mt-1">{font.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: UPLOAD */}
              {modalTab === 'upload' && (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-[var(--border)] rounded-2xl p-6 text-center space-y-3 bg-[var(--bg-2)]/50">
                    <Upload className="w-10 h-10 mx-auto text-[var(--accent)]" />
                    <div>
                      <p className="text-sm font-bold">Upload Signature Image</p>
                      <p className="text-xs text-[var(--tx-3)]">PNG or JPG of your handwritten signature</p>
                    </div>
                    <label className="inline-block px-4 py-2 rounded-xl bg-[var(--accent)] text-white text-xs font-semibold cursor-pointer shadow-sm hover:scale-105 transition-transform">
                      <span>Browse Image</span>
                      <input type="file" accept="image/png,image/jpeg,image/jpg" onChange={handleFileUpload} className="hidden" />
                    </label>
                  </div>

                  {uploadedDataUrl && (
                    <div className="p-3 rounded-xl border border-[var(--border)] bg-white space-y-2">
                      <span className="text-xs font-bold text-slate-600 block">Preview:</span>
                      <div className="h-24 flex items-center justify-center p-2 bg-slate-50 rounded border border-slate-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={uploadedDataUrl} alt="Uploaded" className="max-h-full object-contain" />
                      </div>
                      <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer pt-1">
                        <input
                          type="checkbox"
                          checked={removeWhiteBg}
                          onChange={(e) => setRemoveWhiteBg(e.target.checked)}
                          className="rounded text-blue-600"
                        />
                        <span>Auto-remove white background paper tint</span>
                      </label>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: STAMPS */}
              {modalTab === 'stamp' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'date', label: 'Date Stamp', icon: Calendar },
                      { id: 'approved', label: 'Approved Stamp', icon: Check },
                      { id: 'verified', label: 'Verified Stamp', icon: Sparkles },
                      { id: 'custom', label: 'Custom Badge', icon: FileCheck },
                    ].map((s) => {
                      const Icon = s.icon;
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setStampType(s.id as typeof stampType)}
                          className={`p-3 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                            stampType === s.id
                              ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]'
                              : 'border-[var(--border)] text-[var(--tx-2)] hover:bg-[var(--bg-2)]'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{s.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {stampType === 'custom' && (
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[var(--tx-2)]">Badge Text</label>
                      <input
                        type="text"
                        value={customStampText}
                        onChange={(e) => setCustomStampText(e.target.value)}
                        className="input-modern w-full text-xs font-bold uppercase"
                      />
                    </div>
                  )}

                  {/* Stamp Color */}
                  <div className="flex items-center gap-2 pt-2">
                    <span className="text-xs font-semibold text-[var(--tx-2)]">Stamp Color:</span>
                    <div className="flex items-center gap-1.5">
                      {INK_COLORS.map((c) => (
                        <button
                          key={c.value}
                          type="button"
                          onClick={() => setStampColor(c.value)}
                          style={{ backgroundColor: c.value }}
                          className={`w-6 h-6 rounded-full border-2 transition-transform cursor-pointer ${
                            stampColor === c.value ? 'scale-125 border-white shadow-md' : 'border-transparent'
                          }`}
                          title={c.label}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-4 border-t border-[var(--border)] bg-[var(--bg-2)]/60">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold border border-[var(--border)] text-[var(--tx-2)] hover:bg-[var(--bg)] cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  if (modalTab === 'draw') handleSaveDrawn();
                  else if (modalTab === 'type') handleSaveTyped();
                  else if (modalTab === 'upload') handleSaveUploaded();
                  else if (modalTab === 'stamp') handleSaveStamp();
                }}
                disabled={
                  (modalTab === 'draw' && !hasDrawnStroke) ||
                  (modalTab === 'type' && !typedName.trim()) ||
                  (modalTab === 'upload' && !uploadedDataUrl)
                }
                className="btn-primary inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-white shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Check className="w-4 h-4" />
                <span>Save & Place on PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
