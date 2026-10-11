import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { ShieldCheck, CheckCircle2, ArrowRight, Lock, Zap, Sparkles } from 'lucide-react';
import { METADATA_BASE, SHARED_ICONS, SHARED_OPEN_GRAPH, SHARED_TWITTER } from '../../../lib/metadata-shared';
import { SITE_URL } from '../../../lib/site';

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: 'Smallpdf Alternative, Free and No Limits',
  description: 'Tired of Smallpdf daily limits and paywalls? Try I Hate Love PDF for unlimited, free client-side PDF processing without uploading documents.',
  alternates: {
    canonical: `${SITE_URL}/smallpdf-alternative/`,
  },
  icons: SHARED_ICONS,
  openGraph: {
    ...SHARED_OPEN_GRAPH,
    title: 'Smallpdf Alternative: Truly Free, Unlimited, No Paywall',
    description: 'Tired of Smallpdf daily limits and paywalls? Try I Hate Love PDF for unlimited, free client-side PDF processing without uploading documents.',
    url: `${SITE_URL}/smallpdf-alternative/`,
  },
  twitter: SHARED_TWITTER,
};

const comparisonPoints = [
  {
    feature: 'Free Tier Restrictions',
    smallpdf: 'Limits users to 1 or 2 tasks per 24 hours before locking the screen with a paywall modal.',
    ourSite: 'Unlimited tasks 24/7. No daily counters, no lockouts, and no subscriptions.',
  },
  {
    feature: 'Document Confidentiality',
    smallpdf: 'Transmits documents to cloud servers for remote conversion and storage.',
    ourSite: 'Zero server uploads. Your PDF remains strictly in your local device memory.',
  },
  {
    feature: 'Registration & Credit Cards',
    smallpdf: 'Pushes users toward 7-day trials that automatically convert to costly recurring billing.',
    ourSite: 'No account registration, no credit cards, and no surprise charges ever.',
  },
  {
    feature: 'Mobile Accessibility',
    smallpdf: 'Frequently nags mobile visitors to download their native app from the app store.',
    ourSite: 'Full-featured touch interface running directly in your mobile web browser.',
  },
];

export default function SmallpdfAlternativePage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Why do users search for Smallpdf alternatives?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Smallpdf strictly caps free users at one or two actions per day before demanding a paid monthly subscription. Users switch to I Hate Love PDF for unrestricted free access.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does I Hate Love PDF require a credit card or trial?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. There are no trials, no payment forms, and no hidden subscriptions. It is completely free for everyone.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I compress and merge large files without hitting a limit?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Processing speed depends only on your device memory. You can process large files without artificial server limits.',
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--tx)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--accent-border)] bg-[var(--accent-soft)] text-xs font-semibold text-[var(--accent)]">
            <Sparkles className="h-4 w-4" />
            <span>Honest Comparison</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--tx)] leading-tight">
            The Truly Free Alternative to Smallpdf
          </h1>
          <p className="text-base sm:text-lg text-[var(--tx-2)] max-w-2xl mx-auto leading-relaxed">
            Hit Smallpdf daily task limit? I Hate Love PDF provides fast, private, and unlimited PDF utilities without subscription paywalls.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="surface-card p-6 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center">
              <Zap className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-bold text-[var(--tx)]">No Daily Task Caps</h2>
            <p className="text-sm text-[var(--tx-2)] leading-relaxed">
              Unlike Smallpdf one-task limit, you can merge, compress, rotate, and edit as many files as you need each day.
            </p>
          </div>
          <div className="surface-card p-6 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-[var(--success-soft)] text-[var(--success)] flex items-center justify-center">
              <Lock className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-bold text-[var(--tx)]">Private In-Browser Engine</h2>
            <p className="text-sm text-[var(--tx-2)] leading-relaxed">
              Your confidential contracts, tax returns, and bank statements are never transmitted to third-party cloud servers.
            </p>
          </div>
          <div className="surface-card p-6 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-[var(--success-soft)] text-[var(--success)] flex items-center justify-center">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-bold text-[var(--tx)]">Zero Paywalls</h2>
            <p className="text-sm text-[var(--tx-2)] leading-relaxed">
              No countdown timers, deceptive trial traps, or unexpected credit card billing. The tool stays free forever.
            </p>
          </div>
        </div>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-[var(--tx)] text-center">
            Smallpdf vs I Hate Love PDF: Core Differences
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-[var(--border)] surface-card">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--tx)]">
                  <th className="p-4 font-bold">Criteria</th>
                  <th className="p-4 font-bold">Smallpdf</th>
                  <th className="p-4 font-bold text-[var(--accent)]">I Hate Love PDF</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {comparisonPoints.map((point) => (
                  <tr key={point.feature} className="hover:bg-[var(--bg-card)] transition-colors">
                    <td className="p-4 font-semibold text-[var(--tx)] align-top">{point.feature}</td>
                    <td className="p-4 text-[var(--tx-2)] align-top">{point.smallpdf}</td>
                    <td className="p-4 text-[var(--tx)] align-top font-medium">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[var(--success)] shrink-0 mt-0.5" />
                        <span>{point.ourSite}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="surface-card p-6 sm:p-8 space-y-6 leading-relaxed text-[var(--tx-2)]">
          <h2 className="text-2xl font-bold tracking-tight text-[var(--tx)]">
            A Better Workflow for Students, Freelancers, and Small Teams
          </h2>
          <p>
            When you just need to reduce a resume under 200KB or combine two scanned receipts, getting blocked by a subscription modal is frustrating.
          </p>
          <p>
            I Hate Love PDF was engineered by Shreyash Srivastava to solve this exact problem: a fast, privacy-first alternative that respects your time and your data. It runs directly inside modern web browsers without server uploads, so you can finish your work in seconds.
          </p>
          <div className="pt-4 flex flex-wrap gap-4">
            <Link
              href="/compress"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--accent)] text-white font-semibold text-sm hover:opacity-95 transition-opacity"
            >
              <span>Compress PDF Without Limits</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--border)] surface-card font-semibold text-sm text-[var(--tx)] hover:border-[var(--accent-border)] transition-colors"
            >
              <span>Browse All Tools</span>
            </Link>
          </div>
        </section>

        <Script
          id="schema-faq-smallpdf"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </div>
    </div>
  );
}
