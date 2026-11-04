import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { ShieldCheck, CheckCircle2, ArrowRight, Lock, Zap, Sparkles } from 'lucide-react';
import { METADATA_BASE, SHARED_ICONS, SHARED_OPEN_GRAPH, SHARED_TWITTER } from '../../../lib/metadata-shared';
import { SITE_URL } from '../../../lib/site';

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: 'iLovePDF Alternative, Free and Private',
  description: 'Looking for an honest iLovePDF alternative? Discover why I Hate Love PDF is completely free, runs locally in your browser, and never uploads files.',
  alternates: {
    canonical: `${SITE_URL}/ilovepdf-alternative/`,
  },
  icons: SHARED_ICONS,
  openGraph: {
    ...SHARED_OPEN_GRAPH,
    title: 'iLovePDF Alternative: 100% Free, Private, No Uploads',
    description: 'Looking for an honest iLovePDF alternative? Discover why I Hate Love PDF is completely free, runs locally in your browser, and never uploads files.',
    url: `${SITE_URL}/ilovepdf-alternative/`,
  },
  twitter: SHARED_TWITTER,
};

const comparisonPoints = [
  {
    feature: 'File Privacy & Security',
    ilovepdf: 'Files are uploaded to external cloud servers and stored temporarily before deletion.',
    ourSite: 'Zero server uploads. Everything runs locally in your browser RAM using client-side JavaScript.',
    winner: 'I Hate Love PDF',
  },
  {
    feature: 'Pricing & Usage Limits',
    ilovepdf: 'Freemium model with task caps, file size limits, and a monthly paid subscription.',
    ourSite: '100% free with unlimited tasks, no subscriptions, and zero paywalls.',
    winner: 'I Hate Love PDF',
  },
  {
    feature: 'Account Registration',
    ilovepdf: 'Requires signups for advanced features and batch processing.',
    ourSite: 'Zero signup needed. Open the page and process your files immediately.',
    winner: 'I Hate Love PDF',
  },
  {
    feature: 'Processing Speed',
    ilovepdf: 'Subject to internet upload speed, cloud queuing, and download lag.',
    ourSite: 'Instant local execution powered by your own computer CPU and GPU.',
    winner: 'I Hate Love PDF',
  },
  {
    feature: 'Office Document Conversions (Word, Excel, PowerPoint)',
    ilovepdf: 'Converts documents via remote cloud server clusters with data retention risks.',
    ourSite: 'Native in-browser conversion: PDF to Word (.docx), PDF to Excel (.xlsx), and PowerPoint with zero server uploads.',
    winner: 'I Hate Love PDF',
  },
  {
    feature: 'Advertisements & Popups',
    ilovepdf: 'Heavy banner advertising, upsell modals, and subscription countdowns.',
    ourSite: 'Ad-light, clean interface funded by voluntary Buy Me a Coffee tips.',
    winner: 'I Hate Love PDF',
  },
];

export default function ILovePdfAlternativePage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Why should I switch from iLovePDF to I Hate Love PDF?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The biggest reason is file privacy. iLovePDF requires you to upload personal documents to their cloud servers. I Hate Love PDF processes everything inside your browser RAM, so your files never leave your device.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is I Hate Love PDF completely free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Every tool is 100% free with no monthly subscription fees, credit card requirements, or daily task restrictions.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are my files uploaded to your servers when I merge or compress?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. All PDF operations run locally in your web browser using client-side JavaScript. No document data is transmitted over the network.',
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--brand)]/20 bg-[var(--brand-soft)] text-xs font-semibold text-[var(--brand)]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Honest Comparison</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-main)] leading-tight">
            The Free, Private Alternative to iLovePDF
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed">
            iLovePDF is a well-known PDF suite, but uploading confidential financial records and medical reports to third-party servers is a privacy risk. Here is how I Hate Love PDF compares.
          </p>
        </div>

        {/* Quick Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2">
            <div className="h-9 w-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Lock className="h-4 w-4" />
            </div>
            <h2 className="text-base font-bold text-[var(--text-main)]">Zero Cloud Uploads</h2>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Your files are parsed and compiled in your local browser tab. No server logs, no cloud storage, and zero exposure.
            </p>
          </div>
          <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2">
            <div className="h-9 w-9 rounded-lg bg-[var(--brand-soft)] border border-[var(--brand)]/20 text-[var(--brand)] flex items-center justify-center">
              <Zap className="h-4 w-4" />
            </div>
            <h2 className="text-base font-bold text-[var(--text-main)]">No Daily Task Limits</h2>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Process as many files as you need without hitting artificial free-tier paywalls or being asked to buy a pro license.
            </p>
          </div>
          <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2">
            <div className="h-9 w-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <h2 className="text-base font-bold text-[var(--text-main)]">No Signups or Tracking</h2>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              We never ask for your email address, name, or phone number. Complete your PDF tasks immediately with zero friction.
            </p>
          </div>
        </div>

        {/* Detailed Comparison Table */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-main)] text-center">
            Side-by-Side Comparison: iLovePDF vs I Hate Love PDF
          </h2>
          <div className="overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--card)]">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--subtle)] text-[var(--text-main)]">
                  <th className="p-3.5 font-semibold">Feature</th>
                  <th className="p-3.5 font-semibold">iLovePDF</th>
                  <th className="p-3.5 font-semibold text-[var(--brand)]">I Hate Love PDF</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {comparisonPoints.map((point) => (
                  <tr key={point.feature} className="hover:bg-[var(--subtle)] transition-colors">
                    <td className="p-3.5 font-medium text-[var(--text-main)] align-top">{point.feature}</td>
                    <td className="p-3.5 text-[var(--text-muted)] align-top">{point.ilovepdf}</td>
                    <td className="p-3.5 text-[var(--text-main)] align-top font-medium">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{point.ourSite}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Honest Breakdown */}
        <section className="p-6 sm:p-7 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-4 leading-relaxed text-xs sm:text-sm text-[var(--text-muted)]">
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[var(--text-main)]">
            When Should You Use Each Service?
          </h2>
          <p>
            We believe in honest recommendations. iLovePDF is a large company with massive cloud infrastructure. If you need complex enterprise integrations or server-side OCR on hundreds of scanned microfilms, their paid service has dedicated server horsepower.
          </p>
          <p>
            However, for everyday tasks like merging agreements, compressing presentations, splitting contracts, redacting personal records, signing NDAs, and converting images, I Hate Love PDF is the superior choice. You skip the queue, save your mobile bandwidth, avoid intrusive marketing emails, and keep your confidential data strictly in your hands.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              href="/tools"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[var(--brand)] text-white font-medium text-xs sm:text-sm hover:opacity-95 transition-opacity"
            >
              <span>Explore All 35+ Tools</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/merge"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--subtle)] font-medium text-xs sm:text-sm text-[var(--text-main)] hover:border-[var(--brand)] transition-colors"
            >
              <span>Try Merge PDF Online</span>
            </Link>
          </div>
        </section>

        <Script
          id="schema-faq-ilovepdf"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </div>
    </div>
  );
}
