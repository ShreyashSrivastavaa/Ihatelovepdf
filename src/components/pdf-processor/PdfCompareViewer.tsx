'use client';

import { useState, useRef, useEffect } from 'react';
import { Upload, ChevronLeft, ChevronRight, SplitSquareVertical } from 'lucide-react';

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

export default function PdfCompareViewer() {
  const [fileA, setFileA] = useState<File | null>(null);
  const [fileB, setFileB] = useState<File | null>(null);
  const [pageA, setPageA] = useState(1);
  const [pageB, setPageB] = useState(1);
  const [totalPagesA, setTotalPagesA] = useState(1);
  const [totalPagesB, setTotalPagesB] = useState(1);
  const [syncScroll, setSyncScroll] = useState(true);

  const canvasRefA = useRef<HTMLCanvasElement>(null);
  const canvasRefB = useRef<HTMLCanvasElement>(null);

  const renderDoc = async (
    file: File,
    pageNum: number,
    canvas: HTMLCanvasElement,
    setTotal: (n: number) => void
  ) => {
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

      setTotal(doc.numPages);
      const page = await doc.getPage(Math.min(pageNum, doc.numPages));
      const vp = page.getViewport({ scale: 1.2 });

      canvas.width = vp.width;
      canvas.height = vp.height;
      const ctx = canvas.getContext('2d')!;

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, vp.width, vp.height);

      await page.render({ canvasContext: ctx, viewport: vp, canvas } as Parameters<typeof page.render>[0]).promise;
    } catch (err) {
      console.error('Render error:', err);
    }
  };

  useEffect(() => {
    if (fileA && canvasRefA.current) {
      renderDoc(fileA, pageA, canvasRefA.current, setTotalPagesA);
    }
  }, [fileA, pageA]);

  useEffect(() => {
    if (fileB && canvasRefB.current) {
      renderDoc(fileB, pageB, canvasRefB.current, setTotalPagesB);
    }
  }, [fileB, pageB]);

  const handleNextPage = () => {
    if (syncScroll) {
      setPageA((p) => Math.min(totalPagesA, p + 1));
      setPageB((p) => Math.min(totalPagesB, p + 1));
    }
  };

  const handlePrevPage = () => {
    if (syncScroll) {
      setPageA((p) => Math.max(1, p - 1));
      setPageB((p) => Math.max(1, p - 1));
    }
  };

  return (
    <div className="surface-card rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 sm:p-7 space-y-6 shadow-sm animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
        <div>
          <h3 className="text-lg font-bold text-[var(--tx)] flex items-center gap-2">
            <SplitSquareVertical className="h-5 w-5 text-[var(--accent)]" />
            Side-by-Side PDF Diff Comparator
          </h3>
          <p className="text-xs text-[var(--tx-2)] mt-0.5">
            Compare two PDF revisions pure client-side with synchronized page navigation.
          </p>
        </div>

        {/* Sync Toggle */}
        <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[var(--tx)] bg-[var(--bg-subtle)] px-3 py-1.5 rounded-xl border border-[var(--border)]">
          <input
            type="checkbox"
            checked={syncScroll}
            onChange={(e) => setSyncScroll(e.target.checked)}
            className="rounded text-[var(--accent)] focus:ring-0"
          />
          <span>Sync Page Navigation</span>
        </label>
      </div>

      {/* Dual Document Viewport */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Document A */}
        <div className="space-y-3 flex flex-col items-center">
          <div className="flex items-center justify-between w-full">
            <span className="text-xs font-bold text-[var(--tx)] flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              Document A {fileA ? `(${fileA.name})` : ''}
            </span>
            {fileA && (
              <span className="text-xs text-[var(--tx-3)] font-mono">
                P. {pageA}/{totalPagesA}
              </span>
            )}
          </div>

          {!fileA ? (
            <label className="w-full h-80 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[var(--border)] hover:border-[var(--accent-border)] bg-[var(--bg)] cursor-pointer transition-colors p-6 text-center space-y-2">
              <Upload className="h-8 w-8 text-[var(--accent)]" />
              <span className="text-xs font-bold text-[var(--tx)]">Upload Original (PDF A)</span>
              <span className="text-[11px] text-[var(--tx-3)]">Click or drop document here</span>
              <input
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) setFileA(e.target.files[0]);
                }}
              />
            </label>
          ) : (
            <div className="w-full border border-[var(--border)] rounded-xl overflow-hidden shadow-sm bg-neutral-900/5 max-h-[500px] overflow-auto flex justify-center p-2">
              <canvas ref={canvasRefA} className="max-w-full h-auto shadow-sm" />
            </div>
          )}
        </div>

        {/* Document B */}
        <div className="space-y-3 flex flex-col items-center">
          <div className="flex items-center justify-between w-full">
            <span className="text-xs font-bold text-[var(--tx)] flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Document B {fileB ? `(${fileB.name})` : ''}
            </span>
            {fileB && (
              <span className="text-xs text-[var(--tx-3)] font-mono">
                P. {pageB}/{totalPagesB}
              </span>
            )}
          </div>

          {!fileB ? (
            <label className="w-full h-80 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[var(--border)] hover:border-[var(--accent-border)] bg-[var(--bg)] cursor-pointer transition-colors p-6 text-center space-y-2">
              <Upload className="h-8 w-8 text-[var(--accent)]" />
              <span className="text-xs font-bold text-[var(--tx)]">Upload Revision (PDF B)</span>
              <span className="text-[11px] text-[var(--tx-3)]">Click or drop revised file here</span>
              <input
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) setFileB(e.target.files[0]);
                }}
              />
            </label>
          ) : (
            <div className="w-full border border-[var(--border)] rounded-xl overflow-hidden shadow-sm bg-neutral-900/5 max-h-[500px] overflow-auto flex justify-center p-2">
              <canvas ref={canvasRefB} className="max-w-full h-auto shadow-sm" />
            </div>
          )}
        </div>
      </div>

      {/* Synchronized Pagination Controls */}
      {fileA && fileB && (
        <div className="flex items-center justify-center gap-4 pt-4 border-t border-[var(--border)]">
          <button
            type="button"
            onClick={handlePrevPage}
            disabled={pageA <= 1 && pageB <= 1}
            className="px-4 py-2 rounded-xl border border-[var(--border)] bg-[var(--bg)] hover:bg-[var(--bg-subtle)] disabled:opacity-40 text-xs font-bold text-[var(--tx)] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous Page</span>
          </button>

          <span className="text-xs font-mono text-[var(--tx-2)]">
            Page {pageA} (A) &bull; Page {pageB} (B)
          </span>

          <button
            type="button"
            onClick={handleNextPage}
            disabled={pageA >= totalPagesA && pageB >= totalPagesB}
            className="px-4 py-2 rounded-xl border border-[var(--border)] bg-[var(--bg)] hover:bg-[var(--bg-subtle)] disabled:opacity-40 text-xs font-bold text-[var(--tx)] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Next Page</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
