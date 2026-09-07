"use client";

import dynamic from "next/dynamic";

const LazyPDFProcessor = dynamic(() => import("./pdf-processor"), {
  ssr: false,
  loading: () => (
    <div className="w-full min-h-[380px] rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-8 flex flex-col items-center justify-center space-y-4 shadow-xs select-none">
      <div className="h-12 w-12 rounded-2xl bg-[var(--accent-soft)] animate-pulse" />
      <div className="h-4 w-48 rounded-md bg-[var(--bg-subtle)] animate-pulse" />
      <div className="h-3 w-72 rounded-md bg-[var(--bg-subtle)] animate-pulse" />
    </div>
  ),
});

export default function DynamicPdfProcessor() {
  return <LazyPDFProcessor />;
}
