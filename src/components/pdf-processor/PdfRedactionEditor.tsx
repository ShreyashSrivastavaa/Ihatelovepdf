'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { ShieldAlert, Trash2, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { redactPdf, type RedactionBox } from '../../lib/operations/redact';
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

interface PdfRedactionEditorProps {
  file: File;
  onDone?: (blob: Blob) => void;
  onBurnRedactions?: (blob: Blob) => void;
}

export default function PdfRedactionEditor({ file, onDone, onBurnRedactions }: PdfRedactionEditorProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [redactions, setRedactions] = useState<RedactionBox[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
  const [currentRect, setCurrentRect] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const [colorMode, setColorMode] = useState<'black' | 'white'>('black');
  const [isProcessing, setIsProcessing] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load PDF and render current page
  const renderPage = useCallback(async (pageNum: number) => {
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

      setTotalPages(doc.numPages);
      const page = await doc.getPage(pageNum);
      const vp = page.getViewport({ scale: 1.5 });

      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = vp.width;
      canvas.height = vp.height;
      const ctx = canvas.getContext('2d')!;

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, vp.width, vp.height);

      await page.render({ canvasContext: ctx, viewport: vp, canvas } as Parameters<typeof page.render>[0]).promise;
    } catch (err) {
      console.error('Failed to render page for redaction:', err);
    }
  }, [file]);

  useEffect(() => {
    renderPage(currentPage);
  }, [currentPage, renderPage]);

  // Canvas Drawing Handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const y = ((e.clientY - rect.top) / rect.height) * canvas.height;

    setIsDrawing(true);
    setStartPos({ x, y });
    setCurrentRect(null);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !startPos) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const curX = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const curY = ((e.clientY - rect.top) / rect.height) * canvas.height;

    const x = Math.min(startPos.x, curX);
    const y = Math.min(startPos.y, curY);
    const w = Math.abs(curX - startPos.x);
    const h = Math.abs(curY - startPos.y);

    setCurrentRect({ x, y, w, h });
  };

  const handleMouseUp = () => {
    if (isDrawing && currentRect && currentRect.w > 5 && currentRect.h > 5 && canvasRef.current) {
      const canvas = canvasRef.current;
      // Convert to normalized coordinates (0 to 1) with top-left origin
      const normalizedBox: RedactionBox = {
        pageNumber: currentPage,
        x: currentRect.x / canvas.width,
        y: currentRect.y / canvas.height,
        width: currentRect.w / canvas.width,
        height: currentRect.h / canvas.height,
        color: colorMode,
        isNormalized: true,
        isTopLeftOrigin: true,
      };

      setRedactions((prev) => [...prev, normalizedBox]);
    }
    setIsDrawing(false);
    setStartPos(null);
    setCurrentRect(null);
  };

  const removeRedaction = (index: number) => {
    setRedactions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleApplyRedactions = async () => {
    if (redactions.length === 0) return;
    setIsProcessing(true);
    try {
      const bytes = await redactPdf(file, redactions);
      const blob = createPdfBlob(bytes);
      if (onBurnRedactions) {
        onBurnRedactions(blob);
      } else if (onDone) {
        onDone(blob);
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.name.replace(/\.pdf$/i, '_redacted.pdf');
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error('Redaction failed:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const currentPageRedactions = redactions.filter((r) => r.pageNumber === currentPage);

  return (
    <div className="surface-card rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 sm:p-7 space-y-6 shadow-sm animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
        <div>
          <h3 className="text-lg font-bold text-[var(--tx)] flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-rose-500" />
            Visual PDF Redaction Studio
          </h3>
          <p className="text-xs text-[var(--tx-2)] mt-0.5">
            Permanently black out or white out sensitive data. Opaque solid vectors are burned directly into the PDF.
          </p>
        </div>

        {/* Color Mode Selector */}
        <div className="flex items-center gap-2 bg-[var(--bg-subtle)] p-1 rounded-xl border border-[var(--border)] shrink-0">
          <button
            type="button"
            onClick={() => setColorMode('black')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              colorMode === 'black'
                ? 'bg-black text-white shadow-xs'
                : 'text-[var(--tx-2)] hover:text-[var(--tx)]'
            }`}
          >
            <span className="h-2.5 w-2.5 rounded-full bg-black border border-white/30" />
            Blackout
          </button>
          <button
            type="button"
            onClick={() => setColorMode('white')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              colorMode === 'white'
                ? 'bg-white text-gray-900 shadow-xs border border-gray-200'
                : 'text-[var(--tx-2)] hover:text-[var(--tx)]'
            }`}
          >
            <span className="h-2.5 w-2.5 rounded-full bg-white border border-gray-400" />
            Whiteout
          </button>
        </div>
      </div>

      {/* Main Canvas & Sidebar Container */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Canvas Workspace (Col 1-3) */}
        <div className="lg:col-span-3 flex flex-col items-center space-y-4">
          {/* Pagination Controls */}
          <div className="flex items-center justify-between w-full max-w-md px-2">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg)] hover:bg-[var(--bg-subtle)] disabled:opacity-40 disabled:cursor-not-allowed text-[var(--tx)] transition-colors cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-xs font-semibold text-[var(--tx)]">
              Page {currentPage} of {totalPages}
            </span>
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="p-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg)] hover:bg-[var(--bg-subtle)] disabled:opacity-40 disabled:cursor-not-allowed text-[var(--tx)] transition-colors cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Canvas Wrapper */}
          <div
            ref={containerRef}
            className="relative border border-[var(--border)] rounded-xl overflow-hidden shadow-md bg-neutral-900/5 cursor-crosshair max-w-full max-h-[600px] overflow-auto select-none"
          >
            <canvas
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              className="block max-w-full h-auto"
            />

            {/* Render Existing Redactions for Current Page */}
            {currentPageRedactions.map((box, idx) => (
              <div
                key={idx}
                className="absolute pointer-events-none transition-all"
                style={{
                  left: `${box.x * 100}%`,
                  top: `${box.y * 100}%`,
                  width: `${box.width * 100}%`,
                  height: `${box.height * 100}%`,
                  backgroundColor: box.color === 'white' ? '#ffffff' : '#000000',
                  boxShadow: '0 0 0 1px rgba(239, 68, 68, 0.6)',
                }}
              />
            ))}

            {/* Currently Drafting Rect */}
            {currentRect && canvasRef.current && (
              <div
                className="absolute pointer-events-none border-2 border-dashed border-rose-500 bg-rose-500/20"
                style={{
                  left: `${(currentRect.x / canvasRef.current.width) * 100}%`,
                  top: `${(currentRect.y / canvasRef.current.height) * 100}%`,
                  width: `${(currentRect.w / canvasRef.current.width) * 100}%`,
                  height: `${(currentRect.h / canvasRef.current.height) * 100}%`,
                }}
              />
            )}
          </div>
          <p className="text-[11px] text-[var(--tx-3)] text-center">
            Click and drag on the page above to draw redaction boxes.
          </p>
        </div>

        {/* Sidebar Redactions List & Actions (Col 4) */}
        <div className="lg:col-span-1 space-y-4 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[var(--border)] lg:pl-6 pt-4 lg:pt-0">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-[var(--tx)] uppercase tracking-wider">
                Redactions ({redactions.length})
              </h4>
              {redactions.length > 0 && (
                <button
                  type="button"
                  onClick={() => setRedactions([])}
                  className="text-[11px] text-rose-500 hover:underline cursor-pointer"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Redaction Items */}
            <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
              {redactions.length === 0 ? (
                <div className="p-4 rounded-xl border border-dashed border-[var(--border)] text-center space-y-1">
                  <ShieldAlert className="h-6 w-6 text-[var(--tx-3)] mx-auto opacity-50" />
                  <p className="text-xs text-[var(--tx-3)]">No redactions drawn yet.</p>
                </div>
              ) : (
                redactions.map((box, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="h-3 w-3 rounded-full border border-black/20 shrink-0"
                        style={{ backgroundColor: box.color === 'white' ? '#fff' : '#000' }}
                      />
                      <span className="font-medium text-[var(--tx)]">Page {box.pageNumber}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeRedaction(index)}
                      className="text-rose-500 hover:text-rose-600 p-1 rounded-md hover:bg-rose-500/10 transition-colors cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Apply Button */}
          <div className="pt-4 border-t border-[var(--border)]">
            <button
              type="button"
              disabled={redactions.length === 0 || isProcessing}
              onClick={handleApplyRedactions}
              className="w-full py-3 px-4 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="h-4 w-4" />
              <span>{isProcessing ? 'Burning Redactions...' : 'Apply & Download PDF'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
