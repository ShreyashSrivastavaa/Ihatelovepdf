'use client';

import { useState, useEffect } from 'react';
import { Copy, Check, Download, Search, FileText, Hash, BookOpen } from 'lucide-react';
import { extractPdfText } from '../../lib/operations/text-extract';
import type { ExtractedTextResult } from '../../lib/pdf-operations';
import { downloadBlob } from '../../lib/download-helper';

interface TextExtractionViewerProps {
  result?: ExtractedTextResult;
  file?: File;
  fileName?: string;
}

export default function TextExtractionViewer({ result: initialResult, file, fileName }: TextExtractionViewerProps) {
  const [result, setResult] = useState<ExtractedTextResult>(
    initialResult || {
      fullText: '',
      pageTexts: [],
      pageCount: 0,
      wordCount: 0,
      characterCount: 0,
      linesCount: 0,
    }
  );
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPage, setSelectedPage] = useState<number | 'all'>('all');

  useEffect(() => {
    if (file) {
      extractPdfText(file).then((res) => {
        setResult(res);
      }).catch(console.error);
    } else if (initialResult) {
      setResult(initialResult);
    }
  }, [file, initialResult]);

  const resolvedFileName = fileName || file?.name || 'document';
  const baseName = resolvedFileName.replace(/\.pdf$/i, '');

  const handleCopy = async () => {
    const textToCopy =
      selectedPage === 'all'
        ? result.fullText
        : result.pageTexts[selectedPage - 1] || '';

    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = async (format: 'txt' | 'json' | 'md') => {
    let content = '';
    let mimeType = 'text/plain';
    let ext = 'txt';

    if (format === 'txt') {
      content = result.fullText;
      mimeType = 'text/plain;charset=utf-8';
      ext = 'txt';
    } else if (format === 'json') {
      content = JSON.stringify(
        {
          fileName: `${baseName}.pdf`,
          pageCount: result.pageCount,
          wordCount: result.wordCount,
          characterCount: result.characterCount,
          pages: result.pageTexts.map((text, idx) => ({ pageNumber: idx + 1, text })),
        },
        null,
        2
      );
      mimeType = 'application/json;charset=utf-8';
      ext = 'json';
    } else if (format === 'md') {
      content = `# Extracted Text: ${baseName}\n\n` +
        result.pageTexts
          .map((text, idx) => `## Page ${idx + 1}\n\n${text}`)
          .join('\n\n---\n\n');
      mimeType = 'text/markdown;charset=utf-8';
      ext = 'md';
    }

    const blob = new Blob([content], { type: mimeType });
    await downloadBlob(blob, `${baseName}_extracted.${ext}`);
  };

  const displayedText =
    selectedPage === 'all'
      ? result.fullText
      : result.pageTexts[selectedPage - 1] || '';

  return (
    <div className="surface-card rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 sm:p-7 space-y-6 shadow-sm animate-fade-in">
      {/* Top Header & Stat Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
        <div>
          <h3 className="text-lg font-bold text-[var(--tx)] flex items-center gap-2">
            <FileText className="h-5 w-5 text-[var(--accent)]" />
            Extracted Plain Text
          </h3>
          <p className="text-xs text-[var(--tx-2)] mt-0.5">
            100% client-side text extraction with structure and line preservation.
          </p>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] text-xs font-semibold text-[var(--tx)]">
            <BookOpen className="h-3.5 w-3.5 text-[var(--accent)]" />
            {result.pageCount} Pages
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] text-xs font-semibold text-[var(--tx)]">
            <Hash className="h-3.5 w-3.5 text-[var(--accent)]" />
            {result.wordCount.toLocaleString()} Words
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] text-xs font-semibold text-[var(--tx-2)]">
            {result.characterCount.toLocaleString()} Chars
          </span>
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--tx-3)]" />
          <input
            type="text"
            placeholder="Search within text..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[var(--tx)] placeholder:text-[var(--tx-3)] focus:outline-none focus:border-[var(--accent)] transition-colors"
          />
        </div>

        {/* Page Filter Tabs */}
        {result.pageCount > 1 && (
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-md">
            <button
              type="button"
              onClick={() => setSelectedPage('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 ${
                selectedPage === 'all'
                  ? 'bg-[var(--accent)] text-white'
                  : 'bg-[var(--bg-subtle)] text-[var(--tx-2)] hover:text-[var(--tx)]'
              }`}
            >
              All Pages
            </button>
            {Array.from({ length: result.pageCount }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setSelectedPage(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 ${
                  selectedPage === p
                    ? 'bg-[var(--accent)] text-white'
                    : 'bg-[var(--bg-subtle)] text-[var(--tx-2)] hover:text-[var(--tx)]'
                }`}
              >
                P. {p}
              </button>
            ))}
          </div>
        )}

        {/* Export Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--bg)] hover:bg-[var(--accent-soft)] hover:border-[var(--accent-border)] hover:text-[var(--accent)] text-xs font-semibold text-[var(--tx)] transition-all cursor-pointer shadow-xs"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>

          <button
            type="button"
            onClick={() => handleDownload('txt')}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-semibold transition-all cursor-pointer shadow-xs"
            title="Download TXT"
          >
            <Download className="h-3.5 w-3.5" />
            <span>TXT</span>
          </button>

          <button
            type="button"
            onClick={() => handleDownload('json')}
            className="inline-flex items-center gap-1.5 px-2.5 py-2 rounded-xl border border-[var(--border)] bg-[var(--bg)] hover:bg-[var(--bg-subtle)] text-xs font-semibold text-[var(--tx-2)] transition-colors cursor-pointer"
            title="Download JSON"
          >
            <span>JSON</span>
          </button>

          <button
            type="button"
            onClick={() => handleDownload('md')}
            className="inline-flex items-center gap-1.5 px-2.5 py-2 rounded-xl border border-[var(--border)] bg-[var(--bg)] hover:bg-[var(--bg-subtle)] text-xs font-semibold text-[var(--tx-2)] transition-colors cursor-pointer"
            title="Download Markdown"
          >
            <span>MD</span>
          </button>
        </div>
      </div>

      {/* Main Text Content Box */}
      <div className="relative">
        <textarea
          readOnly
          value={displayedText}
          rows={16}
          className="w-full font-mono text-xs leading-relaxed p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[var(--tx)] resize-y focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-all select-text"
        />
      </div>
    </div>
  );
}
