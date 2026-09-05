'use client';

import React from 'react';
import { Loader2, AlertCircle, X, Download, ExternalLink, FileText } from 'lucide-react';
import { LatexPreviewStatus } from '../hooks/useLatexPreview';

export interface ResumePreviewProps {
  status: LatexPreviewStatus;
  pdfUrl: string | null;
  lastSuccessfulPdfUrl: string | null;
  errorMessage: string | null;
  hasEverCompiled: boolean;
  onDismissError?: () => void;
  templateName?: string;
  className?: string;
}

export default function ResumePreview({
  status,
  pdfUrl,
  lastSuccessfulPdfUrl,
  errorMessage,
  hasEverCompiled,
  onDismissError,
  templateName = 'Resume Template',
  className = '',
}: ResumePreviewProps) {
  const activeUrl = pdfUrl || lastSuccessfulPdfUrl;

  const handleDownload = () => {
    if (!activeUrl) return;
    const a = document.createElement('a');
    a.href = activeUrl;
    a.download = `${templateName.toLowerCase().replace(/\s+/g, '-')}-resume.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleOpenNewTab = () => {
    if (!activeUrl) return;
    window.open(activeUrl, '_blank');
  };

  return (
    <div
      className={`relative flex flex-col h-full w-full bg-slate-900/60 border border-slate-700/60 rounded-xl overflow-hidden shadow-2xl backdrop-blur-md ${className}`}
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700/50 bg-slate-800/60 text-slate-200">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-blue-400" />
          <span className="font-semibold text-sm tracking-wide">{templateName}</span>
          {status === 'compiling' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30 animate-pulse">
              <Loader2 className="w-3 h-3 animate-spin" />
              Compiling...
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {activeUrl && (
            <>
              <button
                type="button"
                onClick={handleOpenNewTab}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-700/50 transition-colors"
                title="Open in new window"
                aria-label="Open in new window"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                Download PDF
              </button>
            </>
          )}
        </div>
      </div>

      {/* Dismissible Inline Error Banner */}
      {status === 'error' && errorMessage && (
        <div className="absolute top-14 left-4 right-4 z-30 flex items-start gap-3 p-3.5 rounded-lg bg-red-950/90 border border-red-500/50 text-red-200 shadow-xl backdrop-blur-sm animate-in fade-in slide-in-from-top-2 duration-200">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div className="flex-1 text-xs leading-relaxed">
            <span className="font-semibold block text-red-300">Compilation Alert</span>
            {errorMessage}
          </div>
          {onDismissError && (
            <button
              type="button"
              onClick={onDismissError}
              className="p-1 rounded text-red-400 hover:text-red-100 hover:bg-red-800/40 transition"
              aria-label="Dismiss alert"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* Main Preview Canvas / Container */}
      <div className="relative flex-1 w-full bg-slate-950 flex items-center justify-center overflow-hidden">
        {/* State 1: First ever compile (No previous successful PDF) */}
        {!hasEverCompiled && status === 'compiling' && (
          <div className="flex flex-col items-center justify-center p-8 max-w-sm text-center">
            <div className="relative w-16 h-16 mb-4 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-blue-500/20 animate-ping" />
              <div className="w-12 h-12 rounded-full border-2 border-blue-500 border-t-transparent animate-spin flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-400" />
              </div>
            </div>
            <h4 className="text-base font-semibold text-slate-100 mb-1">
              Initializing LaTeX Engine...
            </h4>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              WASM compiler warming up & typesetting vector document. This initial pass takes a few seconds.
            </p>

            {/* Skeleton document representation */}
            <div className="w-64 h-80 rounded-lg bg-slate-900 border border-slate-800 p-5 flex flex-col gap-3 shadow-inner">
              <div className="w-32 h-4 rounded bg-slate-800 animate-pulse mx-auto" />
              <div className="w-48 h-2 rounded bg-slate-800/60 animate-pulse mx-auto" />
              <div className="w-full h-px bg-slate-800 my-1" />
              <div className="w-20 h-2.5 rounded bg-slate-800 animate-pulse" />
              <div className="w-full h-2 rounded bg-slate-800/50 animate-pulse" />
              <div className="w-5/6 h-2 rounded bg-slate-800/50 animate-pulse" />
              <div className="w-4/6 h-2 rounded bg-slate-800/50 animate-pulse" />
              <div className="w-24 h-2.5 rounded bg-slate-800 animate-pulse mt-2" />
              <div className="w-full h-2 rounded bg-slate-800/50 animate-pulse" />
              <div className="w-5/6 h-2 rounded bg-slate-800/50 animate-pulse" />
            </div>
          </div>
        )}

        {/* State 2: Idle & not yet compiled */}
        {!hasEverCompiled && status === 'idle' && (
          <div className="flex flex-col items-center justify-center p-8 text-center text-slate-400">
            <FileText className="w-12 h-12 text-slate-600 mb-3" />
            <p className="text-sm font-medium text-slate-300">No template preview ready</p>
            <p className="text-xs text-slate-500 mt-1">Select a template or start editing to see live output.</p>
          </div>
        )}

        {/* State 3: Active PDF Viewer (iframe with previous/current PDF visible) */}
        {activeUrl && (
          <div className="relative w-full h-full flex items-center justify-center">
            <iframe
              src={`${activeUrl}#toolbar=0&navpanes=0&scrollbar=1`}
              title="LaTeX Live Resume Preview"
              className="w-full h-full border-0 bg-slate-900"
            />

            {/* In-flight recompilation overlay indicator (non-destructive) */}
            {status === 'compiling' && (
              <div className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 shadow-lg backdrop-blur-md text-xs font-medium text-slate-200 animate-pulse">
                <Loader2 className="w-3.5 h-3.5 text-blue-400 animate-spin" />
                Updating preview...
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
