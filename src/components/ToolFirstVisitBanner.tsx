'use client';

import { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';

export default function ToolFirstVisitBanner() {
  const [isDismissed, setIsDismissed] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem('ihatelovepdf_first_visit_dismissed');
      setIsDismissed(dismissed === 'true');
    } catch {
      setIsDismissed(false);
    }
  }, []);

  const handleDismiss = () => {
    try {
      localStorage.setItem('ihatelovepdf_first_visit_dismissed', 'true');
    } catch {
      // Ignore localStorage errors
    }
    setIsDismissed(true);
  };

  if (isDismissed !== false) {
    return null;
  }

  return (
    <div
      role="region"
      aria-label="Privacy notice"
      className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-4 py-3 rounded-2xl border border-[var(--success-border)] bg-[var(--success-soft)] text-xs text-[var(--tx)] shadow-xs transition-all duration-300 animate-in fade-in slide-in-from-top-2"
    >
      <div className="flex items-center gap-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-[var(--success)] text-white shadow-xs">
          <ShieldCheck className="h-4 w-4" />
        </div>
        <div>
          <p className="font-bold text-[var(--tx)] flex items-center gap-1.5">
            <span>Runs 100% locally in your browser</span>
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-full bg-[var(--success)]/20 text-[var(--success)] text-[10px] font-extrabold uppercase tracking-wider">
              Private
            </span>
          </p>
          <p className="text-[var(--tx-2)] text-[11px] leading-snug">
            Your files are processed directly on your device via client-side WebAssembly &amp; Web Workers. No files are ever uploaded to remote servers.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss privacy notice"
          className="p-1 rounded-lg text-[var(--tx-3)] hover:text-[var(--tx)] hover:bg-[var(--bg-subtle)] transition-colors cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
