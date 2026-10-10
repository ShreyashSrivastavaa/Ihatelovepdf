'use client';

import dynamic from 'next/dynamic';
import ToolPageLayout from './ToolPageLayout';
import type { OperationContent } from '../i18n/dictionaries/operation-types';

const LazyPDFProcessor = dynamic(() => import('./pdf-processor'), {
  ssr: false,
  loading: () => (
    <div className="w-full min-h-[420px] rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-8 flex flex-col items-center justify-center space-y-4 shadow-sm select-none animate-pulse">
      <div className="h-14 w-14 rounded-2xl bg-[var(--accent-soft)]" />
      <div className="h-5 w-56 rounded-lg bg-[var(--bg-subtle)]" />
      <div className="h-3 w-80 rounded-md bg-[var(--bg-subtle)]" />
    </div>
  ),
});

export function OperationPageContent({
  operation,
}: {
  operation: OperationContent;
}) {
  return (
    <ToolPageLayout operation={operation}>
      <LazyPDFProcessor initialMode={operation.mode} />
    </ToolPageLayout>
  );
}
