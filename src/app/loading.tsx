import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-[65vh] w-full flex flex-col items-center justify-center p-6 space-y-6 animate-pulse">
      {/* Skeleton Header Badge */}
      <div className="h-7 w-48 rounded-full bg-[var(--border)] opacity-60" />

      {/* Skeleton Title & Subtitle */}
      <div className="space-y-3 text-center max-w-lg w-full flex flex-col items-center">
        <div className="h-10 w-3/4 rounded-xl bg-[var(--border)] opacity-80" />
        <div className="h-4 w-1/2 rounded-lg bg-[var(--border)] opacity-50" />
      </div>

      {/* Skeleton Dropzone / Main UI container */}
      <div className="w-full max-w-2xl h-64 rounded-3xl border-2 border-dashed border-[var(--border)] bg-[var(--bg-card)]/50 flex flex-col items-center justify-center space-y-4">
        <div className="h-12 w-12 rounded-2xl bg-[var(--border)] opacity-60" />
        <div className="h-4 w-40 rounded-lg bg-[var(--border)] opacity-50" />
      </div>

      {/* Loading Indicator */}
      <div className="flex items-center gap-2 text-xs text-[var(--tx-3)] font-mono font-medium">
        <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-ping" />
        <span>Loading tool environment...</span>
      </div>
    </div>
  );
}
