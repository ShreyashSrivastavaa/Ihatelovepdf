import React, { useState } from 'react';
import { Download, Archive, RotateCcw, Copy, Check, Sparkles, FileText, CheckCircle2, ArrowRight, SlidersHorizontal } from 'lucide-react';

export interface OutputFileItem {
  name: string;
  blob?: Blob;
  url?: string;
  sizeBytes?: number;
}

interface ResultPanelProps {
  title?: string;
  summaryText?: string;
  beforeSizeBytes?: number;
  afterSizeBytes?: number;
  wordCount?: number;
  pageCount?: number;
  outputFiles?: OutputFileItem[];
  primaryDownloadBlob?: Blob;
  primaryFileName?: string;
  textContent?: string;
  onDownloadPrimary?: () => void;
  onDownloadZip?: () => void;
  onEditOptions?: () => void;
  onStartOver: () => void;
}

function formatBytes(bytes: number): string {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export default function ResultPanel({
  title = "Processing Complete!",
  summaryText,
  beforeSizeBytes,
  afterSizeBytes,
  wordCount,
  pageCount,
  outputFiles,
  primaryDownloadBlob,
  primaryFileName = "processed_document.pdf",
  textContent,
  onDownloadPrimary,
  onDownloadZip,
  onEditOptions,
  onStartOver,
}: ResultPanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyText = async () => {
    if (!textContent) return;
    try {
      await navigator.clipboard.writeText(textContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleDownloadPrimary = () => {
    if (onDownloadPrimary) {
      onDownloadPrimary();
    } else if (primaryDownloadBlob) {
      const url = URL.createObjectURL(primaryDownloadBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = primaryFileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleDownloadSingleFile = (fileItem: OutputFileItem) => {
    if (fileItem.blob) {
      const url = URL.createObjectURL(fileItem.blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileItem.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else if (fileItem.url) {
      const a = document.createElement('a');
      a.href = fileItem.url;
      a.download = fileItem.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  // Compression savings calculation
  const savingsPct =
    beforeSizeBytes && afterSizeBytes && beforeSizeBytes > 0
      ? Math.max(0, Math.round(((beforeSizeBytes - afterSizeBytes) / beforeSizeBytes) * 100))
      : null;

  return (
    <div
      role="region"
      aria-label="Processing result"
      className="rounded-3xl border border-[var(--success-border)] bg-[var(--bg-card)] p-6 sm:p-8 space-y-6 shadow-lg animate-in fade-in zoom-in-95 duration-300"
    >
      {/* 1. SUCCESS HEADER & SUMMARY BADGE */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--success-soft)] text-[var(--success)] border border-[var(--success-border)] shadow-xs">
            <CheckCircle2 className="h-6 w-6 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--tx)] tracking-tight">
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-[var(--tx-2)]">
              {summaryText || "Your files were safely transformed entirely in your browser."}
            </p>
          </div>
        </div>

        {/* Dynamic Metric Badges */}
        <div className="flex flex-wrap items-center gap-2 self-stretch sm:self-auto">
          {savingsPct !== null && savingsPct > 0 && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[var(--success)] text-white text-xs font-bold shadow-xs">
              <Sparkles className="h-3.5 w-3.5" />
              {savingsPct}% Smaller
            </span>
          )}
          {pageCount && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] text-xs font-semibold text-[var(--tx)]">
              {pageCount} {pageCount === 1 ? 'page' : 'pages'}
            </span>
          )}
          {wordCount !== undefined && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] text-xs font-semibold text-[var(--tx)]">
              {wordCount.toLocaleString()} words
            </span>
          )}
        </div>
      </div>

      {/* 2. BEFORE / AFTER COMPARISON CARD (For Compression & Size Changing Tools) */}
      {beforeSizeBytes && afterSizeBytes && (
        <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)]/50 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-[var(--tx-3)] tracking-wider block">
                Original Size
              </span>
              <span className={`text-sm sm:text-base font-semibold text-[var(--tx-2)] ${beforeSizeBytes > afterSizeBytes ? 'line-through' : ''}`}>
                {formatBytes(beforeSizeBytes)}
              </span>
            </div>
            <ArrowRight className="h-4 w-4 text-[var(--accent)]" />
            <div>
              <span className="text-[10px] uppercase font-bold text-[var(--success)] tracking-wider block">
                Result Size
              </span>
              <span className="text-base sm:text-lg font-black text-[var(--tx)]">
                {formatBytes(afterSizeBytes)}
              </span>
            </div>
          </div>

          <div className="text-right">
            {beforeSizeBytes > afterSizeBytes ? (
              <>
                <span className="text-xs font-bold text-[var(--success)] block">
                  Saved {formatBytes(beforeSizeBytes - afterSizeBytes)}
                </span>
                <span className="text-[11px] text-[var(--tx-3)]">100% loss-free compression</span>
              </>
            ) : (
              <>
                <span className="text-xs font-bold text-[var(--accent)] block">
                  {afterSizeBytes === beforeSizeBytes ? 'Exact Size Preserved' : `ZIP Overhead: +${formatBytes(afterSizeBytes - beforeSizeBytes)}`}
                </span>
                <span className="text-[11px] text-[var(--tx-3)]">Original bytes preserved</span>
              </>
            )}
          </div>
        </div>
      )}

      {/* 3. INLINE TEXT VIEWER & ONE-CLICK COPY (For Text Extraction & Markdown) */}
      {textContent && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[var(--tx)] uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-[var(--accent)]" />
              Extracted Text Result
            </span>
            <button
              type="button"
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold border border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--tx)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)] transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-[var(--success)]" />
                  <span className="text-[var(--success)]">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy to Clipboard</span>
                </>
              )}
            </button>
          </div>

          <textarea
            readOnly
            rows={8}
            value={textContent}
            className="w-full p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg)] text-[var(--tx)] font-mono text-xs leading-relaxed focus:outline-none scrollbar-thin resize-y"
          />
        </div>
      )}

      {/* 4. IMAGE GALLERY PREVIEWS & MULTI-FILE LIST */}
      {outputFiles && outputFiles.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[var(--tx)] uppercase tracking-wider">
              {outputFiles.every((f) => /\.(png|jpe?g|webp|bmp)$/i.test(f.name))
                ? `Generated Images (${outputFiles.length})`
                : `Output Files (${outputFiles.length})`}
            </span>
            {onDownloadZip && outputFiles.length > 1 && (
              <button
                type="button"
                onClick={onDownloadZip}
                className="btn-primary py-1.5 px-3 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Archive className="h-3.5 w-3.5" />
                <span>Download All as ZIP</span>
              </button>
            )}
          </div>

          {/* If outputs are image files, show visual thumbnail grid */}
          {outputFiles.every((f) => /\.(png|jpe?g|webp|bmp)$/i.test(f.name)) ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {outputFiles.map((file, idx) => {
                const imgUrl = file.blob ? URL.createObjectURL(file.blob) : file.url;
                return (
                  <div
                    key={file.name + idx}
                    className="flex flex-col justify-between p-2.5 rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)]/40 hover:border-[var(--accent-border)] transition-all space-y-2 group shadow-xs"
                  >
                    {/* Thumbnail preview */}
                    <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-neutral-900/5 border border-[var(--border)] flex items-center justify-center">
                      {imgUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={imgUrl}
                          alt={file.name}
                          className="w-full h-full object-contain p-1"
                        />
                      ) : (
                        <FileText className="h-8 w-8 text-[var(--tx-3)]" />
                      )}
                    </div>

                    <div className="space-y-1">
                      <p className="text-[11px] font-bold text-[var(--tx)] truncate" title={file.name}>
                        {file.name}
                      </p>
                      {file.sizeBytes && (
                        <p className="text-[10px] text-[var(--tx-3)]">{formatBytes(file.sizeBytes)}</p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDownloadSingleFile(file)}
                      className="w-full py-1.5 px-2 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer transition-colors shadow-xs"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="max-h-48 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
              {outputFiles.map((file, idx) => (
                <div
                  key={file.name + idx}
                  className="flex items-center justify-between p-3 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)]/40 text-xs"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <FileText className="h-4 w-4 text-[var(--accent)] shrink-0" />
                    <span className="font-semibold text-[var(--tx)] truncate">{file.name}</span>
                    {file.sizeBytes && (
                      <span className="text-[var(--tx-3)]">({formatBytes(file.sizeBytes)})</span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDownloadSingleFile(file)}
                    className="p-1.5 rounded-lg text-[var(--accent)] hover:bg-[var(--accent-soft)] transition-colors cursor-pointer"
                    title={`Download ${file.name}`}
                  >
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 5. PRIMARY ACTIONS BAR */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
        {(onDownloadPrimary || primaryDownloadBlob) && (
          <button
            type="button"
            onClick={handleDownloadPrimary}
            className="btn-primary flex-1 py-3.5 px-6 rounded-2xl font-bold text-white text-base shadow-md flex items-center justify-center gap-2 cursor-pointer hover:shadow-lg transition-all duration-200"
          >
            <Download className="h-5 w-5" />
            <span>Download {primaryFileName}</span>
            {afterSizeBytes && (
              <span className="text-xs font-medium opacity-80">({formatBytes(afterSizeBytes)})</span>
            )}
          </button>
        )}

        {onEditOptions && (
          <button
            type="button"
            onClick={onEditOptions}
            className="py-3.5 px-5 rounded-2xl font-semibold border border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--tx)] text-sm flex items-center justify-center gap-2 hover:bg-[var(--border)] hover:text-[var(--accent)] transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Make Changes</span>
          </button>
        )}

        <button
          type="button"
          onClick={onStartOver}
          className="py-3.5 px-6 rounded-2xl font-semibold border border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--tx)] text-sm flex items-center justify-center gap-2 hover:bg-[var(--border)] transition-colors cursor-pointer"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Process Another File</span>
        </button>
      </div>
    </div>
  );
}
