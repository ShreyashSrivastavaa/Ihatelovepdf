"use client";

import React, { useEffect, useState } from 'react';
import { Loader2, ArrowRight } from 'lucide-react';

interface StickyActionBarProps {
  buttonLabel: string;
  isProcessing: boolean;
  disabled?: boolean;
  fileCount: number;
  totalSizeLabel?: string;
  onClick: () => void;
  targetRef?: React.RefObject<HTMLDivElement | null>;
}

export default function StickyActionBar({
  buttonLabel,
  isProcessing,
  disabled = false,
  fileCount,
  totalSizeLabel,
  onClick,
  targetRef,
}: StickyActionBarProps) {
  const [isScrolledPast, setIsScrolledPast] = useState(false);

  useEffect(() => {
    if (!targetRef?.current) {
      // If no ref provided, always enable sticky bar when files exist
      setIsScrolledPast(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When normal in-page button is visible, don't show sticky bar
        setIsScrolledPast(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const currentElem = targetRef.current;
    observer.observe(currentElem);

    return () => {
      observer.disconnect();
    };
  }, [targetRef]);

  if (!isScrolledPast || fileCount === 0) {
    return null;
  }

  return (
    <div
      role="region"
      aria-label="Process action bar"
      className="fixed bottom-0 left-0 right-0 z-40 p-3 sm:p-4 bg-[var(--bg)]/90 backdrop-blur-xl border-t border-[var(--border)] shadow-2xl transition-all duration-300 animate-in slide-in-from-bottom-3"
    >
      <div className="mx-auto max-w-[1140px] px-4 flex items-center justify-between gap-4">
        <div className="hidden sm:flex items-center gap-2 text-xs text-[var(--tx-2)]">
          <span className="font-bold text-[var(--tx)]">{fileCount} {fileCount === 1 ? 'file' : 'files'}</span>
          {totalSizeLabel && (
            <>
              <span>&bull;</span>
              <span>{totalSizeLabel}</span>
            </>
          )}
          <span>&bull;</span>
          <span className="text-[var(--success)] font-medium">Ready to process</span>
        </div>

        <button
          type="button"
          onClick={onClick}
          disabled={disabled || isProcessing}
          className="btn-primary w-full sm:w-auto ml-auto px-8 py-3.5 rounded-xl font-bold text-white shadow-lg text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <span>{buttonLabel}</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
