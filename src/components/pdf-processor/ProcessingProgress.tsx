"use client";

import React from 'react';
import { Loader2, XCircle, CheckCircle2 } from 'lucide-react';

interface ProcessingProgressProps {
  status: 'idle' | 'processing' | 'success' | 'error';
  currentPage?: number;
  totalPages?: number;
  percentage?: number;
  statusMessage?: string;
  onCancel?: () => void;
}

export default function ProcessingProgress({
  status,
  currentPage,
  totalPages,
  percentage,
  statusMessage = "Processing your file locally...",
  onCancel,
}: ProcessingProgressProps) {
  if (status === 'idle') return null;

  const calculatedPercentage = 
    typeof percentage === 'number' 
      ? Math.min(100, Math.max(0, percentage))
      : currentPage && totalPages && totalPages > 0
      ? Math.min(100, Math.round((currentPage / totalPages) * 100))
      : undefined;

  return (
    <div
      role="progressbar"
      aria-valuenow={calculatedPercentage ?? 0}
      aria-valuemin={0}
      aria-valuemax={100}
      className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 space-y-3.5 shadow-sm animate-in fade-in duration-200"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          {status === 'processing' ? (
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent-border)]">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          ) : (
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[var(--success-soft)] text-[var(--success)] border border-[var(--success-border)]">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          )}

          <div className="min-w-0">
            <p className="font-bold text-xs sm:text-sm text-[var(--tx)] truncate">
              {statusMessage}
            </p>
            {currentPage && totalPages ? (
              <p className="text-[11px] text-[var(--tx-3)] font-medium">
                Page {currentPage} of {totalPages} ({calculatedPercentage}%)
              </p>
            ) : calculatedPercentage !== undefined ? (
              <p className="text-[11px] text-[var(--tx-3)] font-medium">
                {calculatedPercentage}% complete
              </p>
            ) : null}
          </div>
        </div>

        {status === 'processing' && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] text-xs font-semibold text-[var(--tx-2)] hover:text-[var(--err)] hover:bg-[var(--err-soft)] transition-colors cursor-pointer"
          >
            <XCircle className="h-3.5 w-3.5" />
            <span>Cancel</span>
          </button>
        )}
      </div>

      {/* Progress Bar Track */}
      <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--bg-subtle)] border border-[var(--border)]">
        {calculatedPercentage !== undefined ? (
          <div
            className="h-full bg-[var(--accent)] transition-all duration-300 ease-out rounded-full"
            style={{ width: `${calculatedPercentage}%` }}
          />
        ) : (
          <div className="h-full w-1/3 bg-[var(--accent)] rounded-full animate-indeterminate" />
        )}
      </div>
    </div>
  );
}
