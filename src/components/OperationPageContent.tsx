'use client';

import dynamic from 'next/dynamic';
import ToolPageLayout from './ToolPageLayout';
import type { OperationContent } from '../i18n/dictionaries/operation-types';

const LazyPDFProcessor = dynamic(() => import('./pdf-processor'), {
  ssr: false,
  loading: () => (
    <div className="w-full min-h-[400px] rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 flex flex-col items-center justify-center space-y-4 select-none animate-pulse">
      <div className="h-12 w-12 rounded-xl bg-[var(--brand-soft)]" />
      <div className="h-4 w-52 rounded-md bg-[var(--subtle)]" />
      <div className="h-3 w-72 rounded-md bg-[var(--subtle)]" />
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
