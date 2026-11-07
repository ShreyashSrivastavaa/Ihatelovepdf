import React, { useState } from 'react';
import { Download, Archive, RotateCcw, Copy, Check, Sparkles, FileText, CheckCircle2, ArrowRight, SlidersHorizontal, Eye, Coffee } from 'lucide-react';
import { downloadBlob, openBlobInNewTab, isIOS } from '../../lib/download-helper';

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

  const handleDownloadPrimary = async () => {
    if (onDownloadPrimary) {
      onDownloadPrimary();
    } else if (primaryDownloadBlob) {
      await downloadBlob(primaryDownloadBlob, primaryFileName);
    }
  };

  const handlePreviewPrimary = () => {
    if (primaryDownloadBlob) {
      openBlobInNewTab(primaryDownloadBlob, primaryFileName);
    }
  };

  const handleDownloadSingleFile = async (fileItem: OutputFileItem) => {
    if (fileItem.blob) {
      await downloadBlob(fileItem.blob, fileItem.name);
    } else if (fileItem.url) {
      const a = document.createElement('a');
      a.href = fileItem.url;
      a.download = fileItem.name;
      a.rel = 'noopener noreferrer';
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
      className="rounded-2xl border border-emerald-500/20 bg-[var(--card)] p-5 sm:p-7 space-y-5 animate-in fade-in duration-150"
    >
      {/* 1. SUCCESS HEADER & SUMMARY BADGE */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="h-5 w-5 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-[var(--text-main)] tracking-tight">
              {title}
            </h3>
            <p className="text-xs text-[var(--text-muted)]">
              {summaryText || "Your files were safely transformed entirely in your browser."}
            </p>
          </div>
        </div>

        {/* Dynamic Metric Badges */}
        <div className="flex flex-wrap items-center gap-2 self-stretch sm:self-auto">
          {savingsPct !== null && savingsPct > 0 && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold">
              <Sparkles className="h-3 w-3" />
              {savingsPct}% Smaller
            </span>
          )}
          {pageCount && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg border border-[var(--border)] bg-[var(--subtle)] text-xs font-medium text-[var(--text-main)]">
              {pageCount} {pageCount === 1 ? 'page' : 'pages'}
            </span>
          )}
          {wordCount !== undefined && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg border border-[var(--border)] bg-[var(--subtle)] text-xs font-medium text-[var(--text-main)]">
              {wordCount.toLocaleString()} words
            </span>
          )}
        </div>
      </div>

      {/* 2. BEFORE / AFTER COMPARISON CARD (For Compression & Size Changing Tools) */}
      {beforeSizeBytes && afterSizeBytes && (
        <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--subtle)] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider block">
                Original Size
              </span>
              <span className={`text-xs sm:text-sm font-medium text-[var(--text-muted)] ${beforeSizeBytes > afterSizeBytes ? 'line-through' : ''}`}>
                {formatBytes(beforeSizeBytes)}
              </span>
            </div>
            <ArrowRight className="h-3.5 w-3.5 text-[var(--brand)]" />
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 tracking-wider block">
                Result Size
              </span>
              <span className="text-sm sm:text-base font-bold text-[var(--text-main)]">
                {formatBytes(afterSizeBytes)}
              </span>
            </div>
          </div>

          <div className="text-right">
            {beforeSizeBytes > afterSizeBytes ? (
              <>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 block">
                  Saved {formatBytes(beforeSizeBytes - afterSizeBytes)}
                </span>
                <span className="text-[10px] text-[var(--text-muted)]">100% loss-free compression</span>
              </>
            ) : (
              <>
                <span className="text-xs font-semibold text-[var(--brand)] block">
                  {afterSizeBytes === beforeSizeBytes ? 'Exact Size Preserved' : `ZIP Overhead: +${formatBytes(afterSizeBytes - beforeSizeBytes)}`}
                </span>
                <span className="text-[10px] text-[var(--text-muted)]">Original bytes preserved</span>
              </>
            )}
          </div>
        </div>
      )}

      {/* 3. INLINE TEXT VIEWER & ONE-CLICK COPY (For Text Extraction & Markdown) */}
      {textContent && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[var(--text-main)] uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-[var(--brand)]" />
              Extracted Text Result
            </span>
            <button
              type="button"
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border border-[var(--border)] bg-[var(--subtle)] text-[var(--text-main)] hover:border-[var(--brand)] transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">Copied!</span>
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
            className="w-full p-3 rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--text-main)] font-mono text-xs leading-relaxed focus:outline-none scrollbar-thin resize-y"
          />
        </div>
      )}

      {/* 4. IMAGE GALLERY PREVIEWS & MULTI-FILE LIST */}
      {outputFiles && outputFiles.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[var(--text-main)] uppercase tracking-wider">
              {outputFiles.every((f) => /\.(png|jpe?g|webp|bmp)$/i.test(f.name))
                ? `Generated Images (${outputFiles.length})`
                : `Output Files (${outputFiles.length})`}
            </span>
            {onDownloadZip && outputFiles.length > 1 && (
              <button
                type="button"
                onClick={onDownloadZip}
                className="py-1.5 px-3 rounded-lg text-xs font-semibold bg-[var(--brand)] text-white flex items-center gap-1.5 cursor-pointer hover:opacity-95 transition-opacity"
              >
                <Archive className="h-3.5 w-3.5" />
                <span>Download All as ZIP</span>
              </button>
            )}
          </div>

          {/* If outputs are image files, show visual thumbnail grid */}
          {outputFiles.every((f) => /\.(png|jpe?g|webp|bmp)$/i.test(f.name)) ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {outputFiles.map((file, idx) => {
                const imgUrl = file.blob ? URL.createObjectURL(file.blob) : file.url;
                return (
                  <div
                    key={file.name + idx}
                    className="flex flex-col justify-between p-2.5 rounded-xl border border-[var(--border)] bg-[var(--subtle)] hover:border-[var(--brand)] transition-colors space-y-2 group"
                  >
                    {/* Thumbnail preview */}
                    <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden bg-neutral-900/5 border border-[var(--border)] flex items-center justify-center">
                      {imgUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={imgUrl}
                          alt={file.name}
                          className="w-full h-full object-contain p-1"
                        />
                      ) : (
                        <FileText className="h-7 w-7 text-[var(--text-muted)]" />
                      )}
                    </div>

                    <div className="space-y-0.5">
                      <p className="text-xs font-semibold text-[var(--text-main)] truncate" title={file.name}>
                        {file.name}
                      </p>
                      {file.sizeBytes && (
                        <p className="text-[10px] text-[var(--text-muted)]">{formatBytes(file.sizeBytes)}</p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDownloadSingleFile(file)}
                      className="w-full py-1.5 px-2 rounded-lg bg-[var(--brand)] hover:opacity-95 text-white text-xs font-medium flex items-center justify-center gap-1 cursor-pointer transition-opacity"
                    >
                      <Download className="h-3 w-3" />
                      <span>Download</span>
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1 scrollbar-thin">
              {outputFiles.map((file, idx) => (
                <div
                  key={file.name + idx}
                  className="flex items-center justify-between p-2.5 rounded-lg border border-[var(--border)] bg-[var(--subtle)] text-xs"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <FileText className="h-3.5 w-3.5 text-[var(--brand)] shrink-0" />
                    <span className="font-semibold text-[var(--text-main)] truncate">{file.name}</span>
                    {file.sizeBytes && (
                      <span className="text-[var(--text-muted)] text-[11px]">({formatBytes(file.sizeBytes)})</span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDownloadSingleFile(file)}
                    className="p-1 rounded-md text-[var(--brand)] hover:bg-[var(--brand-soft)] transition-colors cursor-pointer"
                    title={`Download ${file.name}`}
                  >
                    <Download className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 5. PRIMARY ACTIONS BAR */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-1">
        {(onDownloadPrimary || primaryDownloadBlob) && (
          <button
            type="button"
            onClick={handleDownloadPrimary}
            className="flex-1 py-3 px-5 rounded-xl font-semibold bg-[var(--brand)] text-white text-sm flex items-center justify-center gap-2 cursor-pointer hover:opacity-95 transition-opacity"
          >
            <Download className="h-4 w-4" />
            <span>{isIOS() ? `Save / Share ${primaryFileName}` : `Download ${primaryFileName}`}</span>
            {afterSizeBytes && (
              <span className="text-xs font-normal opacity-80">({formatBytes(afterSizeBytes)})</span>
            )}
          </button>
        )}

        {primaryDownloadBlob && (
          <button
            type="button"
            onClick={handlePreviewPrimary}
            className="py-3 px-4 rounded-xl font-medium border border-[var(--border)] bg-[var(--subtle)] text-[var(--text-main)] text-xs sm:text-sm flex items-center justify-center gap-1.5 hover:border-[var(--brand)] transition-colors cursor-pointer"
            title="Open and preview in browser"
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Open PDF</span>
          </button>
        )}

        {onEditOptions && (
          <button
            type="button"
            onClick={onEditOptions}
            className="py-3 px-4 rounded-xl font-medium border border-[var(--border)] bg-[var(--subtle)] text-[var(--text-main)] text-xs sm:text-sm flex items-center justify-center gap-1.5 hover:border-[var(--brand)] transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>Make Changes</span>
          </button>
        )}

        <button
          type="button"
          onClick={onStartOver}
          className="py-3 px-4 rounded-xl font-medium border border-[var(--border)] bg-[var(--subtle)] text-[var(--text-main)] text-xs sm:text-sm flex items-center justify-center gap-1.5 hover:border-[var(--brand)] transition-colors cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Process Another File</span>
        </button>
      </div>

      {/* Non-intrusive Buy Me a Coffee Tip Bar */}
      <div className="pt-3 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-[var(--text-muted)]">
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Coffee className="h-3 w-3" />
          </span>
          <span>Found this useful? Tips keep this tool free, private, and ad-light.</span>
        </div>
        <div className="flex items-center gap-2 font-semibold text-xs shrink-0">
          <a
            href="https://buymeacoffee.com/shreyashsrivastavaa"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 hover:underline transition-colors"
          >
            <span>Coffee</span>
            <span>&rarr;</span>
          </a>
          <span className="text-[var(--text-muted)]">·</span>
          <a
            href="https://buymeachai.in/shreyashsrivastava"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-orange-600 dark:text-orange-400 hover:underline transition-colors"
          >
            <span>Chai (UPI)</span>
            <span>&rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
}
