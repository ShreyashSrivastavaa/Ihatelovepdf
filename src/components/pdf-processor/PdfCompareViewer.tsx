'use client';

import { useState, useRef, useEffect } from 'react';
import { Upload, ChevronLeft, ChevronRight, SplitSquareVertical, Link2, Unlink2 } from 'lucide-react';

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

  // Synchronized pagination helpers
  const handleNextBoth = () => {
    setPageA((p) => Math.min(totalPagesA, p + 1));
    setPageB((p) => Math.min(totalPagesB, p + 1));
  };

  const handlePrevBoth = () => {
    setPageA((p) => Math.max(1, p - 1));
    setPageB((p) => Math.max(1, p - 1));
  };

  // Single page pagination handlers (independent)
  const handlePrevA = () => setPageA((p) => Math.max(1, p - 1));
  const handleNextA = () => setPageA((p) => Math.min(totalPagesA, p + 1));
  const handlePrevB = () => setPageB((p) => Math.max(1, p - 1));
  const handleNextB = () => setPageB((p) => Math.min(totalPagesB, p + 1));

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
            Compare two PDF revisions side-by-side with independent or synchronized page navigation.
          </p>
        </div>

        {/* Sync Toggle */}
        <button
          type="button"
          onClick={() => setSyncScroll(!syncScroll)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
            syncScroll
              ? 'bg-[var(--accent)] text-white border-transparent shadow-xs'
              : 'bg-[var(--bg-subtle)] text-[var(--tx-2)] border-[var(--border)] hover:text-[var(--tx)]'
          }`}
          title="Toggle synchronized page navigation"
        >
          {syncScroll ? <Link2 className="h-3.5 w-3.5" /> : <Unlink2 className="h-3.5 w-3.5" />}
          <span>{syncScroll ? 'Sync Pages: ON' : 'Sync Pages: OFF (Single Mode)'}</span>
        </button>
      </div>

      {/* Dual Document Viewport */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Document A */}
        <div className="space-y-3 flex flex-col items-center">
          <div className="flex items-center justify-between w-full gap-2">
            <span className="text-xs font-bold text-[var(--tx)] flex items-center gap-1.5 truncate max-w-[200px] sm:max-w-xs">
              <span className="h-2 w-2 rounded-full bg-blue-500 shrink-0" />
              <span className="truncate">Document A {fileA ? `(${fileA.name})` : ''}</span>
            </span>

            {/* Individual Page Controls for Document A in Header */}
            {fileA && (
              <div className="flex items-center gap-1 bg-[var(--bg-subtle)] px-2 py-1 rounded-xl border border-[var(--border)] shrink-0">
                <button
                  type="button"
                  onClick={handlePrevA}
                  disabled={pageA <= 1}
                  className="p-1 rounded-lg hover:bg-[var(--bg)] disabled:opacity-30 text-[var(--tx)] transition-colors cursor-pointer disabled:cursor-not-allowed"
                  title="Document A: Previous Page (Single)"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </button>
                <select
                  value={pageA}
                  onChange={(e) => setPageA(Number(e.target.value))}
                  className="text-xs font-mono font-semibold bg-transparent text-[var(--tx)] focus:outline-hidden cursor-pointer px-1"
                  title="Select Page for Document A"
                >
                  {Array.from({ length: totalPagesA }, (_, i) => i + 1).map((p) => (
                    <option key={p} value={p} className="bg-[var(--bg)] text-[var(--tx)]">
                      P. {p}/{totalPagesA}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={handleNextA}
                  disabled={pageA >= totalPagesA}
                  className="p-1 rounded-lg hover:bg-[var(--bg)] disabled:opacity-30 text-[var(--tx)] transition-colors cursor-pointer disabled:cursor-not-allowed"
                  title="Document A: Next Page (Single)"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
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
            <div className="w-full space-y-2">
              <div className="w-full border border-[var(--border)] rounded-xl overflow-hidden shadow-sm bg-neutral-900/5 max-h-[500px] overflow-auto flex justify-center p-2">
                <canvas ref={canvasRefA} className="max-w-full h-auto shadow-sm" />
              </div>

              {/* Document A Single Page Footer Control */}
              <div className="flex items-center justify-between w-full px-3 py-1.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)] text-xs">
                <button
                  type="button"
                  onClick={handlePrevA}
                  disabled={pageA <= 1}
                  className="px-2.5 py-1 rounded-lg bg-[var(--bg)] hover:bg-[var(--bg-card)] border border-[var(--border)] disabled:opacity-30 text-[var(--tx)] font-semibold flex items-center gap-1 transition-colors cursor-pointer disabled:cursor-not-allowed shadow-2xs"
                  title="Previous page for Document A only"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                  <span>Prev Page</span>
                </button>
                <span className="font-semibold text-[var(--tx-2)] font-mono text-[11px]">
                  Document A: Page {pageA} of {totalPagesA}
                </span>
                <button
                  type="button"
                  onClick={handleNextA}
                  disabled={pageA >= totalPagesA}
                  className="px-2.5 py-1 rounded-lg bg-[var(--bg)] hover:bg-[var(--bg-card)] border border-[var(--border)] disabled:opacity-30 text-[var(--tx)] font-semibold flex items-center gap-1 transition-colors cursor-pointer disabled:cursor-not-allowed shadow-2xs"
                  title="Next page for Document A only"
                >
                  <span>Next Page</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Document B */}
        <div className="space-y-3 flex flex-col items-center">
          <div className="flex items-center justify-between w-full gap-2">
            <span className="text-xs font-bold text-[var(--tx)] flex items-center gap-1.5 truncate max-w-[200px] sm:max-w-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
              <span className="truncate">Document B {fileB ? `(${fileB.name})` : ''}</span>
            </span>

            {/* Individual Page Controls for Document B in Header */}
            {fileB && (
              <div className="flex items-center gap-1 bg-[var(--bg-subtle)] px-2 py-1 rounded-xl border border-[var(--border)] shrink-0">
                <button
                  type="button"
                  onClick={handlePrevB}
                  disabled={pageB <= 1}
                  className="p-1 rounded-lg hover:bg-[var(--bg)] disabled:opacity-30 text-[var(--tx)] transition-colors cursor-pointer disabled:cursor-not-allowed"
                  title="Document B: Previous Page (Single)"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </button>
                <select
                  value={pageB}
                  onChange={(e) => setPageB(Number(e.target.value))}
                  className="text-xs font-mono font-semibold bg-transparent text-[var(--tx)] focus:outline-hidden cursor-pointer px-1"
                  title="Select Page for Document B"
                >
                  {Array.from({ length: totalPagesB }, (_, i) => i + 1).map((p) => (
                    <option key={p} value={p} className="bg-[var(--bg)] text-[var(--tx)]">
                      P. {p}/{totalPagesB}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={handleNextB}
                  disabled={pageB >= totalPagesB}
                  className="p-1 rounded-lg hover:bg-[var(--bg)] disabled:opacity-30 text-[var(--tx)] transition-colors cursor-pointer disabled:cursor-not-allowed"
                  title="Document B: Next Page (Single)"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
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
            <div className="w-full space-y-2">
              <div className="w-full border border-[var(--border)] rounded-xl overflow-hidden shadow-sm bg-neutral-900/5 max-h-[500px] overflow-auto flex justify-center p-2">
                <canvas ref={canvasRefB} className="max-w-full h-auto shadow-sm" />
              </div>

              {/* Document B Single Page Footer Control */}
              <div className="flex items-center justify-between w-full px-3 py-1.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)] text-xs">
                <button
                  type="button"
                  onClick={handlePrevB}
                  disabled={pageB <= 1}
                  className="px-2.5 py-1 rounded-lg bg-[var(--bg)] hover:bg-[var(--bg-card)] border border-[var(--border)] disabled:opacity-30 text-[var(--tx)] font-semibold flex items-center gap-1 transition-colors cursor-pointer disabled:cursor-not-allowed shadow-2xs"
                  title="Previous page for Document B only"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                  <span>Prev Page</span>
                </button>
                <span className="font-semibold text-[var(--tx-2)] font-mono text-[11px]">
                  Document B: Page {pageB} of {totalPagesB}
                </span>
                <button
                  type="button"
                  onClick={handleNextB}
                  disabled={pageB >= totalPagesB}
                  className="px-2.5 py-1 rounded-lg bg-[var(--bg)] hover:bg-[var(--bg-card)] border border-[var(--border)] disabled:opacity-30 text-[var(--tx)] font-semibold flex items-center gap-1 transition-colors cursor-pointer disabled:cursor-not-allowed shadow-2xs"
                  title="Next page for Document B only"
                >
                  <span>Next Page</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Global Pagination Bar: Single A, Synchronized Both, and Single B */}
      {fileA && fileB && (
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[var(--border)]">
          {/* Doc A Single Quick Controls */}
          <div className="flex items-center gap-1.5 bg-[var(--bg-subtle)] px-3 py-1.5 rounded-xl border border-[var(--border)]">
            <span className="h-2 w-2 rounded-full bg-blue-500 shrink-0" />
            <span className="text-xs font-bold text-[var(--tx)] mr-1">Doc A:</span>
            <button
              type="button"
              onClick={handlePrevA}
              disabled={pageA <= 1}
              className="p-1 rounded-lg hover:bg-[var(--bg)] disabled:opacity-30 text-[var(--tx)] transition-colors cursor-pointer disabled:cursor-not-allowed"
              title="Turn Document A to previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-xs font-mono font-semibold text-[var(--tx)] px-1">
              {pageA} / {totalPagesA}
            </span>
            <button
              type="button"
              onClick={handleNextA}
              disabled={pageA >= totalPagesA}
              className="p-1 rounded-lg hover:bg-[var(--bg)] disabled:opacity-30 text-[var(--tx)] transition-colors cursor-pointer disabled:cursor-not-allowed"
              title="Turn Document A to next page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Synchronized Both Navigation */}
          <div className="flex items-center gap-2 bg-[var(--bg)] px-3 py-1.5 rounded-xl border border-[var(--border)] shadow-xs mx-auto">
            <button
              type="button"
              onClick={handlePrevBoth}
              disabled={pageA <= 1 && pageB <= 1}
              className="px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)] disabled:opacity-30 text-xs font-bold text-[var(--tx)] flex items-center gap-1 transition-colors cursor-pointer disabled:cursor-not-allowed"
              title="Turn both documents to previous page"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Both Prev</span>
            </button>

            <button
              type="button"
              onClick={() => setSyncScroll(!syncScroll)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                syncScroll
                  ? 'bg-[var(--accent)] text-white border-transparent'
                  : 'bg-[var(--bg-subtle)] text-[var(--tx-2)] border-[var(--border)] hover:text-[var(--tx)]'
              }`}
              title="Toggle Synchronized Page Scrolling"
            >
              {syncScroll ? <Link2 className="h-3.5 w-3.5" /> : <Unlink2 className="h-3.5 w-3.5" />}
              <span>{syncScroll ? 'Sync: ON' : 'Sync: OFF'}</span>
            </button>

            <button
              type="button"
              onClick={handleNextBoth}
              disabled={pageA >= totalPagesA && pageB >= totalPagesB}
              className="px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)] disabled:opacity-30 text-xs font-bold text-[var(--tx)] flex items-center gap-1 transition-colors cursor-pointer disabled:cursor-not-allowed"
              title="Turn both documents to next page"
            >
              <span>Both Next</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Doc B Single Quick Controls */}
          <div className="flex items-center gap-1.5 bg-[var(--bg-subtle)] px-3 py-1.5 rounded-xl border border-[var(--border)]">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
            <span className="text-xs font-bold text-[var(--tx)] mr-1">Doc B:</span>
            <button
              type="button"
              onClick={handlePrevB}
              disabled={pageB <= 1}
              className="p-1 rounded-lg hover:bg-[var(--bg)] disabled:opacity-30 text-[var(--tx)] transition-colors cursor-pointer disabled:cursor-not-allowed"
              title="Turn Document B to previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-xs font-mono font-semibold text-[var(--tx)] px-1">
              {pageB} / {totalPagesB}
            </span>
            <button
              type="button"
              onClick={handleNextB}
              disabled={pageB >= totalPagesB}
              className="p-1 rounded-lg hover:bg-[var(--bg)] disabled:opacity-30 text-[var(--tx)] transition-colors cursor-pointer disabled:cursor-not-allowed"
              title="Turn Document B to next page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
