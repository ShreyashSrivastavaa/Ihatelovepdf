'use client';

import React, { useState } from 'react';
import { FilePlus2, Minus, Plus, FileText, CheckCircle2, Sparkles, Layout } from 'lucide-react';
import type { BlankPdfPageSize, BlankPdfOrientation } from '../../lib/operations/converters';

export interface CreateBlankPdfInterfaceProps {
  initialPageCount?: number;
  initialPageSize?: BlankPdfPageSize;
  initialOrientation?: BlankPdfOrientation;
  isProcessing?: boolean;
  onGenerate: (options: {
    pageCount: number;
    pageSize: BlankPdfPageSize;
    orientation: BlankPdfOrientation;
  }) => void;
}

const PAGE_SIZES: Array<{
  id: BlankPdfPageSize;
  name: string;
  dimensions: string;
  description: string;
}> = [
  { id: 'a4', name: 'A4', dimensions: '210 × 297 mm', description: 'Standard Document (ISO 216)' },
  { id: 'letter', name: 'Letter', dimensions: '8.5 × 11 in', description: 'US Standard Format' },
  { id: 'legal', name: 'Legal', dimensions: '8.5 × 14 in', description: 'Legal & Agreement Format' },
  { id: 'a3', name: 'A3', dimensions: '297 × 420 mm', description: 'Large Format (2× A4)' },
  { id: 'a5', name: 'A5', dimensions: '148 × 210 mm', description: 'Pocket / Booklet (0.5× A4)' },
];

const PRESETS = [1, 2, 5, 10, 25, 50, 100, 500];

export default function CreateBlankPdfInterface({
  initialPageCount = 1,
  initialPageSize = 'a4',
  initialOrientation = 'portrait',
  isProcessing = false,
  onGenerate,
}: CreateBlankPdfInterfaceProps) {
  const [pageCount, setPageCount] = useState<number>(initialPageCount);
  const [inputValue, setInputValue] = useState<string>(String(initialPageCount));
  const [pageSize, setPageSize] = useState<BlankPdfPageSize>(initialPageSize);
  const [orientation, setOrientation] = useState<BlankPdfOrientation>(initialOrientation);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleInputChange = (raw: string) => {
    setInputValue(raw);
    if (raw.trim() === '') {
      setErrorMsg('Page count must be at least 1');
      return;
    }
    const val = Number(raw);
    if (isNaN(val) || !Number.isInteger(val)) {
      setErrorMsg('Please enter a valid whole number');
    } else if (val < 1) {
      setErrorMsg('Page count must be at least 1');
    } else if (val > 500) {
      setErrorMsg('Maximum 500 pages allowed');
    } else {
      setErrorMsg(null);
      setPageCount(val);
    }
  };

  const handleBlur = () => {
    if (inputValue.trim() === '' || isNaN(Number(inputValue)) || Number(inputValue) < 1) {
      setInputValue('1');
      setPageCount(1);
      setErrorMsg(null);
    } else if (Number(inputValue) > 500) {
      setInputValue('500');
      setPageCount(500);
      setErrorMsg(null);
    } else {
      const sanitized = Math.floor(Number(inputValue));
      setInputValue(String(sanitized));
      setPageCount(sanitized);
      setErrorMsg(null);
    }
  };

  const adjustCount = (delta: number) => {
    const next = Math.min(500, Math.max(1, pageCount + delta));
    setPageCount(next);
    setInputValue(String(next));
    setErrorMsg(null);
  };

  const selectPreset = (num: number) => {
    setPageCount(num);
    setInputValue(String(num));
    setErrorMsg(null);
  };

  const handleCreate = () => {
    let finalCount = pageCount;
    if (inputValue.trim() === '' || isNaN(Number(inputValue)) || Number(inputValue) < 1) {
      finalCount = 1;
    } else if (Number(inputValue) > 500) {
      finalCount = 500;
    } else {
      finalCount = Math.floor(Number(inputValue));
    }
    setPageCount(finalCount);
    setInputValue(String(finalCount));
    setErrorMsg(null);

    onGenerate({
      pageCount: finalCount,
      pageSize,
      orientation,
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* 1. Header Card */}
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)] shadow-xs">
            <FilePlus2 className="h-6 w-6 stroke-[2.2]" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--tx)] tracking-tight">
              Create Blank PDF
            </h2>
            <p className="text-xs sm:text-sm text-[var(--tx-2)] mt-0.5">
              Create a blank PDF document with the number of pages you need.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Section: Number of Pages */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--tx-2)]">
              Number of Blank Pages
            </label>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* Stepper Input */}
              <div className="inline-flex items-center rounded-2xl border-2 border-[var(--border)] bg-[var(--bg)] p-1.5 shadow-xs focus-within:border-[var(--accent)] transition-colors">
                <button
                  type="button"
                  onClick={() => adjustCount(-1)}
                  disabled={pageCount <= 1 || isProcessing}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--bg-card)] text-[var(--tx)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)] disabled:opacity-30 disabled:hover:bg-[var(--bg-card)] disabled:hover:text-[var(--tx)] transition-all"
                  aria-label="Decrease page count"
                >
                  <Minus className="h-4 w-4" />
                </button>

                <input
                  type="number"
                  min="1"
                  max="500"
                  value={inputValue}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onBlur={handleBlur}
                  disabled={isProcessing}
                  className="w-20 sm:w-24 text-center font-mono text-lg font-bold bg-transparent text-[var(--tx)] focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  aria-label="Page count number"
                />

                <button
                  type="button"
                  onClick={() => adjustCount(1)}
                  disabled={pageCount >= 500 || isProcessing}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--bg-card)] text-[var(--tx)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)] disabled:opacity-30 disabled:hover:bg-[var(--bg-card)] disabled:hover:text-[var(--tx)] transition-all"
                  aria-label="Increase page count"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              {/* Preset pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                {PRESETS.map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => selectPreset(num)}
                    disabled={isProcessing}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      pageCount === num && !errorMsg
                        ? 'bg-[var(--accent)] text-white shadow-xs'
                        : 'bg-[var(--bg-subtle)] text-[var(--tx-2)] hover:text-[var(--tx)] hover:bg-[var(--bg-hover)] border border-[var(--border)]'
                    }`}
                  >
                    {num} {num === 1 ? 'page' : 'pages'}
                  </button>
                ))}
              </div>
            </div>

            {errorMsg && (
              <p className="text-xs font-medium text-[var(--error)] flex items-center gap-1.5 mt-1">
                <span>⚠</span> {errorMsg}
              </p>
            )}
          </div>

          {/* Section: Page Size */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--tx-2)]">
              Page Size
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {PAGE_SIZES.map((size) => {
                const isSelected = pageSize === size.id;
                return (
                  <button
                    key={size.id}
                    type="button"
                    onClick={() => setPageSize(size.id)}
                    disabled={isProcessing}
                    className={`flex flex-col text-left p-3 rounded-2xl border-2 transition-all ${
                      isSelected
                        ? 'border-[var(--accent)] bg-[var(--accent-soft)]/40 shadow-xs'
                        : 'border-[var(--border)] bg-[var(--bg)] hover:border-[var(--border-strong)]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-bold ${isSelected ? 'text-[var(--accent)]' : 'text-[var(--tx)]'}`}>
                        {size.name}
                      </span>
                      {isSelected && (
                        <CheckCircle2 className="h-4 w-4 text-[var(--accent)] fill-[var(--accent-soft)]" />
                      )}
                    </div>
                    <span className="text-[11px] text-[var(--tx-3)] font-mono mt-1">
                      {size.dimensions}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section: Page Orientation */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--tx-2)]">
              Orientation
            </label>

            <div className="grid grid-cols-2 gap-3 max-w-md">
              <button
                type="button"
                onClick={() => setOrientation('portrait')}
                disabled={isProcessing}
                className={`flex items-center gap-3 p-3.5 rounded-2xl border-2 transition-all ${
                  orientation === 'portrait'
                    ? 'border-[var(--accent)] bg-[var(--accent-soft)]/40 shadow-xs'
                    : 'border-[var(--border)] bg-[var(--bg)] hover:border-[var(--border-strong)]'
                }`}
              >
                <div className={`h-9 w-7 rounded-md border-2 flex items-center justify-center ${
                  orientation === 'portrait' ? 'border-[var(--accent)] bg-white' : 'border-[var(--tx-3)]'
                }`}>
                  <FileText className={`h-4 w-4 ${orientation === 'portrait' ? 'text-[var(--accent)]' : 'text-[var(--tx-3)]'}`} />
                </div>
                <div className="text-left">
                  <span className={`block text-sm font-bold ${orientation === 'portrait' ? 'text-[var(--accent)]' : 'text-[var(--tx)]'}`}>
                    Portrait
                  </span>
                  <span className="text-[11px] text-[var(--tx-3)]">
                    Vertical (Tall)
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setOrientation('landscape')}
                disabled={isProcessing}
                className={`flex items-center gap-3 p-3.5 rounded-2xl border-2 transition-all ${
                  orientation === 'landscape'
                    ? 'border-[var(--accent)] bg-[var(--accent-soft)]/40 shadow-xs'
                    : 'border-[var(--border)] bg-[var(--bg)] hover:border-[var(--border-strong)]'
                }`}
              >
                <div className={`h-7 w-9 rounded-md border-2 flex items-center justify-center ${
                  orientation === 'landscape' ? 'border-[var(--accent)] bg-white' : 'border-[var(--tx-3)]'
                }`}>
                  <Layout className={`h-4 w-4 ${orientation === 'landscape' ? 'text-[var(--accent)]' : 'text-[var(--tx-3)]'}`} />
                </div>
                <div className="text-left">
                  <span className={`block text-sm font-bold ${orientation === 'landscape' ? 'text-[var(--accent)]' : 'text-[var(--tx)]'}`}>
                    Landscape
                  </span>
                  <span className="text-[11px] text-[var(--tx-3)]">
                    Horizontal (Wide)
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Section: Summary Card & Action Button */}
          <div className="pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="text-xs text-[var(--tx-2)]">
              <span className="font-semibold text-[var(--tx)]">Summary: </span>
              {pageCount} blank {pageCount === 1 ? 'page' : 'pages'} • {pageSize.toUpperCase()} •{' '}
              {orientation === 'portrait' ? 'Portrait' : 'Landscape'}
            </div>

            <button
              type="button"
              onClick={handleCreate}
              disabled={Boolean(errorMsg) || isProcessing}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl text-sm font-bold text-white bg-[var(--accent)] hover:bg-[var(--accent-hover)] shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.98]"
            >
              {isProcessing ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Generating Blank PDF...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Create Blank PDF</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
