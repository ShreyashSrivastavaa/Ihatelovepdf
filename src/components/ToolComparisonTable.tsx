import React from 'react';
import { CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

interface ToolComparisonTableProps {
  toolName?: string;
  locale?: string;
}

export function ToolComparisonTable({ toolName = 'ihatelovepdf', locale = 'en' }: ToolComparisonTableProps) {
  const comparisonRows = [
    {
      feature: 'Processing Location',
      ihatelovepdf: 'Local Browser Memory (0 uploads)',
      ilovepdf: 'External Cloud Servers',
      smallpdf: 'External Cloud Servers',
      adobe: 'Adobe Document Cloud',
      highlight: true,
    },
    {
      feature: 'Daily Free Usage Limit',
      ihatelovepdf: 'Unlimited 24/7 (No quotas)',
      ilovepdf: '2–3 tasks per day',
      smallpdf: '1–2 tasks per 24 hours',
      adobe: '1–2 free trials, then paywall',
      highlight: true,
    },
    {
      feature: 'File Size Caps',
      ihatelovepdf: 'Device RAM Only (No artificial cap)',
      ilovepdf: '15 MB – 25 MB on free tier',
      smallpdf: '15 MB – 50 MB on free tier',
      adobe: '100 MB (Login required)',
      highlight: false,
    },
    {
      feature: 'Document Privacy & Retention',
      ihatelovepdf: '100% Private (Zero server storage)',
      ilovepdf: 'Stored on cloud servers for 2 hours',
      smallpdf: 'Stored on cloud servers for 1 hour',
      adobe: 'Stored on Adobe Cloud servers',
      highlight: true,
    },
    {
      feature: 'Pricing & Subscription',
      ihatelovepdf: '100% Free Forever ($0)',
      ilovepdf: 'Freemium ($7 – $10 / month)',
      smallpdf: 'Freemium ($9 – $12 / month)',
      adobe: 'Subscription ($13 – $20 / month)',
      highlight: true,
    },
    {
      feature: 'Account Registration',
      ihatelovepdf: 'Never Required (Zero signups)',
      ilovepdf: 'Required for batch operations',
      smallpdf: 'Required after daily limit',
      adobe: 'Required to download files',
      highlight: false,
    },
  ];

  return (
    <section
      data-locale={locale}
      className="p-6 sm:p-7 rounded-2xl border border-[var(--border)] bg-[var(--card)] space-y-4"
    >
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
          <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
          <span>Factual Architecture Comparison</span>
        </div>
        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[var(--text-main)]">
          Why Professionals Choose {toolName} on ihatelovepdf Over Cloud Tools
        </h2>
        <p className="text-xs sm:text-sm text-[var(--text-muted)]">
          An honest, transparent comparison of file privacy, daily task limits, and pricing against cloud services like iLovePDF, Smallpdf, and Adobe.
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] bg-[var(--subtle)] text-[var(--text-main)]">
              <th className="p-3 sm:p-3.5 font-semibold">Feature / Metric</th>
              <th className="p-3 sm:p-3.5 font-semibold text-[var(--brand)] bg-[var(--brand-soft)]/50">
                <div className="flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5" />
                  <span>ihatelovepdf</span>
                </div>
              </th>
              <th className="p-3 sm:p-3.5 font-semibold text-[var(--text-muted)]">iLovePDF</th>
              <th className="p-3 sm:p-3.5 font-semibold text-[var(--text-muted)]">Smallpdf</th>
              <th className="p-3 sm:p-3.5 font-semibold text-[var(--text-muted)]">Adobe Acrobat</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {comparisonRows.map((row) => (
              <tr key={row.feature} className="hover:bg-[var(--subtle)]/60 transition-colors">
                <td className="p-3 sm:p-3.5 font-medium text-[var(--text-main)] align-top whitespace-nowrap">
                  {row.feature}
                </td>
                <td className="p-3 sm:p-3.5 text-[var(--text-main)] font-semibold align-top bg-[var(--brand-soft)]/30">
                  <div className="flex items-start gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{row.ihatelovepdf}</span>
                  </div>
                </td>
                <td className="p-3 sm:p-3.5 text-[var(--text-muted)] align-top">{row.ilovepdf}</td>
                <td className="p-3 sm:p-3.5 text-[var(--text-muted)] align-top">{row.smallpdf}</td>
                <td className="p-3 sm:p-3.5 text-[var(--text-muted)] align-top">{row.adobe}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

