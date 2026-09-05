'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Trash2,
  Download,
  ChevronLeft,
  ChevronRight,
  Info,
  Loader2,
  Lock,
} from 'lucide-react';
import {
  redactPdfWithDiagnostics,
  type RedactionBox,
} from '../../lib/operations/redact';
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
  const [redactionMode, setRedactionMode] = useState<'true' | 'vector'>('true');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState<string>('');

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

  // Coordinate helper: maps pointer to normalized 0-to-1 coordinates within canvas bounds
  const getNormalizedPos = (e: React.PointerEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return null;
    const rawX = (e.clientX - rect.left) / rect.width;
    const rawY = (e.clientY - rect.top) / rect.height;
    return {
      x: Math.max(0, Math.min(1, rawX)),
      y: Math.max(0, Math.min(1, rawY)),
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    const pos = getNormalizedPos(e);
    if (!pos) return;
    setIsDrawing(true);
    setStartPos(pos);
    setCurrentRect(null);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDrawing || !startPos) return;
    const pos = getNormalizedPos(e);
    if (!pos) return;

    const x = Math.min(startPos.x, pos.x);
    const y = Math.min(startPos.y, pos.y);
    const w = Math.abs(pos.x - startPos.x);
    const h = Math.abs(pos.y - startPos.y);

    setCurrentRect({ x, y, w, h });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    if (isDrawing && currentRect && currentRect.w > 0.005 && currentRect.h > 0.005) {
      // Store normalized (0-1) coordinates
      const normalizedBox: RedactionBox = {
        pageNumber: currentPage,
        x: currentRect.x,
        y: currentRect.y,
        width: currentRect.w,
        height: currentRect.h,
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
    setProcessingStatus('Preparing document redaction...');
    try {
      let rasterizedPages: Record<number, Uint8Array> | undefined = undefined;

      if (redactionMode === 'true') {
        rasterizedPages = {};
        const pdfjs = await getPdfJs();
        const arrayBuffer = await file.arrayBuffer();
        const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
        const doc = await pdfjs.getDocument({
          data: arrayBuffer,
          cMapUrl: `${baseUrl}/cmaps/`,
          cMapPacked: true,
          standardFontDataUrl: `${baseUrl}/standard_fonts/`,
        }).promise;

        const uniquePages = Array.from(new Set(redactions.map((r) => r.pageNumber ?? 1)));

        for (let i = 0; i < uniquePages.length; i++) {
          const pageNum = uniquePages[i];
          setProcessingStatus(`True Redaction: rasterizing page ${pageNum} of ${totalPages}...`);
          const page = await doc.getPage(pageNum);
          const vp = page.getViewport({ scale: 2.0 });

          const offscreen = document.createElement('canvas');
          offscreen.width = Math.round(vp.width);
          offscreen.height = Math.round(vp.height);
          const ctx = offscreen.getContext('2d');
          if (!ctx) continue;

          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, offscreen.width, offscreen.height);

          await page.render({
            canvasContext: ctx,
            viewport: vp,
            canvas: offscreen,
          } as Parameters<typeof page.render>[0]).promise;

          // Burn all redactions for this page directly onto the canvas pixels
          const pageRedacts = redactions.filter((r) => (r.pageNumber ?? 1) === pageNum);
          for (const box of pageRedacts) {
            const bx = box.x * offscreen.width;
            const by = box.y * offscreen.height;
            const bw = box.width * offscreen.width;
            const bh = box.height * offscreen.height;
            ctx.fillStyle = box.color === 'white' ? '#ffffff' : '#000000';
            ctx.fillRect(bx, by, bw, bh);
          }

          const blob = await new Promise<Blob | null>((resolve) => offscreen.toBlob(resolve, 'image/png'));
          if (blob) {
            rasterizedPages[pageNum] = new Uint8Array(await blob.arrayBuffer());
          }
        }
      }

      setProcessingStatus('Assembling sanitized PDF document...');
      const result = await redactPdfWithDiagnostics(file, redactions, {
        mode: redactionMode,
        purgeMetadata: true,
        rasterizedPages,
      });

      const blob = createPdfBlob(result.pdfBytes);
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
      setProcessingStatus('');
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
            Permanently black out or white out sensitive data with zero-leakage forensic rasterization.
          </p>
        </div>

        {/* Controls: Redaction Security Level & Color Mode */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 bg-[var(--bg-subtle)] p-1 rounded-xl border border-[var(--border)] shrink-0">
            <button
              type="button"
              onClick={() => setRedactionMode('true')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                redactionMode === 'true'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-[var(--tx-2)] hover:text-[var(--tx)]'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>True Redaction (Zero Leakage)</span>
            </button>
            <button
              type="button"
              onClick={() => setRedactionMode('vector')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                redactionMode === 'vector'
                  ? 'bg-[var(--accent)] text-white shadow-xs'
                  : 'text-[var(--tx-2)] hover:text-[var(--tx)]'
              }`}
            >
              <span>Vector Box Only</span>
            </button>
          </div>

          <div className="flex items-center gap-1 bg-[var(--bg-subtle)] p-1 rounded-xl border border-[var(--border)] shrink-0">
            <button
              type="button"
              onClick={() => setColorMode('black')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
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
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
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
      </div>

      {/* Security Status Banner */}
      <div
        className={`p-3.5 rounded-xl border text-xs flex items-start gap-2.5 transition-all ${
          redactionMode === 'true'
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
            : 'bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300'
        }`}
      >
        {redactionMode === 'true' ? (
          <>
            <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-emerald-500" />
            <div className="space-y-0.5 leading-relaxed">
              <strong className="font-bold flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                Zero-Leakage True Redaction Active
              </strong>
              <p>
                Redacted pages are transformed into high-resolution pixel layers with your redactions permanently burned in.
                All underlying text operators, font tables, and document metadata are deleted with zero leakage. Un-redacted pages remain pure vector PDF.
              </p>
            </div>
          </>
        ) : (
          <>
            <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
            <div className="space-y-0.5 leading-relaxed">
              <strong className="font-bold">Vector Box Overlay Mode</strong>
              <p>
                Draws solid vector rectangles and purges interactive annotations. Note that underlying text in the stream may remain searchable outside the visual box.
              </p>
            </div>
          </>
        )}
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

          {/* Outer Scroll Area */}
          <div
            ref={containerRef}
            className="w-full max-h-[650px] overflow-auto p-4 flex justify-center bg-neutral-900/5 dark:bg-neutral-950/40 rounded-xl border border-[var(--border)] select-none"
          >
            {/* Page-Sized Relative Wrapper: wraps canvas tightly so percentages match canvas exactly */}
            <div
              className="relative shadow-xl rounded-sm cursor-crosshair"
              style={{ width: 'fit-content', height: 'fit-content' }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
            >
              <canvas
                ref={canvasRef}
                className="block max-w-full h-auto pointer-events-none"
              />

              {/* Render Existing Redactions for Current Page */}
              {currentPageRedactions.map((box, idx) => (
                <div
                  key={idx}
                  className="absolute pointer-events-none transition-all z-10"
                  style={{
                    left: `${box.x * 100}%`,
                    top: `${box.y * 100}%`,
                    width: `${box.width * 100}%`,
                    height: `${box.height * 100}%`,
                    backgroundColor: box.color === 'white' ? '#ffffff' : '#000000',
                    boxShadow: '0 0 0 1.5px rgba(239, 68, 68, 0.8)',
                  }}
                />
              ))}

              {/* Currently Drafting Rect */}
              {currentRect && (
                <div
                  className="absolute pointer-events-none border-2 border-dashed border-rose-500 bg-rose-500/25 z-20"
                  style={{
                    left: `${currentRect.x * 100}%`,
                    top: `${currentRect.y * 100}%`,
                    width: `${currentRect.w * 100}%`,
                    height: `${currentRect.h * 100}%`,
                  }}
                />
              )}
            </div>
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
          <div className="pt-4 border-t border-[var(--border)] space-y-2">
            {processingStatus && (
              <p className="text-[11px] text-[var(--tx-2)] text-center flex items-center justify-center gap-1.5 animate-pulse">
                <Loader2 className="w-3 h-3 animate-spin text-emerald-500" />
                <span>{processingStatus}</span>
              </p>
            )}
            <button
              type="button"
              disabled={redactions.length === 0 || isProcessing}
              onClick={handleApplyRedactions}
              className="w-full py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
              <span>{isProcessing ? 'Burning Redactions...' : 'Apply & Download PDF'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
