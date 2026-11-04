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
      className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-4 py-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-xs text-[var(--text-main)] transition-all duration-300 animate-in fade-in"
    >
      <div className="flex items-center gap-2.5">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
          <ShieldCheck className="h-3.5 w-3.5" />
        </div>
        <div>
          <p className="font-semibold text-[var(--text-main)] flex items-center gap-2">
            <span>Runs 100% locally in your browser</span>
            <span className="inline-flex items-center px-1.5 py-0.2 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
              Private
            </span>
          </p>
          <p className="text-[var(--text-muted)] text-[11px] leading-snug">
            Your files are processed directly on your device inside your browser. No files are ever uploaded to remote servers.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss privacy notice"
          className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--subtle)] transition-colors cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
