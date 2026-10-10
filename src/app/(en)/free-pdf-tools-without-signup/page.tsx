import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { ShieldCheck, ArrowRight, Lock, Zap, FileText } from 'lucide-react';
import { METADATA_BASE, SHARED_ICONS, SHARED_OPEN_GRAPH, SHARED_TWITTER } from '../../../lib/metadata-shared';
import { SITE_URL } from '../../../lib/site';

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: 'Free PDF Tools Without Signup: No Email, No Watermark',
  description: 'Use 35+ free PDF tools online without creating an account or entering your email. Merge, split, compress, sign, and edit PDFs with zero signup.',
  alternates: {
    canonical: `${SITE_URL}/free-pdf-tools-without-signup/`,
  },
  icons: SHARED_ICONS,
  openGraph: {
    ...SHARED_OPEN_GRAPH,
    title: 'Free PDF Tools Without Signup: No Email, No Watermark',
    description: 'Use 35+ free PDF tools online without creating an account or entering your email. Merge, split, compress, sign, and edit PDFs with zero signup.',
    url: `${SITE_URL}/free-pdf-tools-without-signup/`,
  },
  twitter: SHARED_TWITTER,
};

export default function FreePdfToolsWithoutSignupPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Why do most PDF websites force you to sign up?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most websites demand signups to capture your email address for sales newsletters, track your document habits, and upsell you to monthly paid plans. I Hate Love PDF does not require any account.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I need to enter a credit card or start a trial?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. All 35+ tools on I Hate Love PDF are completely free and available to use without entering any payment or contact details.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are my converted documents stamped with watermarks?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Downloaded files are clean and unaltered. We never stamp logos or promotional text on your files.',
        },
      },
    ],
  };

  const toolHighlights = [
    { name: 'Merge PDF', href: '/merge-pdf', desc: 'Combine multiple documents into one without account registration.' },
    { name: 'Compress PDF', href: '/compress-pdf', desc: 'Reduce file size by up to 90% without entering an email address.' },
    { name: 'Split PDF', href: '/split-pdf', desc: 'Extract pages and split documents with zero signups or queues.' },
    { name: 'Sign PDF', href: '/sign-pdf', desc: 'Draw or type legal electronic signatures directly in your browser.' },
    { name: 'Redact PDF', href: '/redact-pdf', desc: 'Permanently erase private numbers and confidential data.' },
    { name: 'Fill PDF Form', href: '/fill-pdf-form', desc: 'Complete interactive AcroForms or type text anywhere on pages.' },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--tx)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--success-border)] bg-[var(--success-soft)] text-xs font-semibold text-[var(--tx)]">
            <ShieldCheck className="h-4 w-4 text-[var(--success)]" />
            <span>Zero Signup Required</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--tx)] leading-tight">
            Free PDF Tools Without Signup or Email
          </h1>
          <p className="text-base sm:text-lg text-[var(--tx-2)] max-w-2xl mx-auto leading-relaxed">
            Need to process a PDF right now without creating an account or subscribing to newsletters? Here is why I Hate Love PDF requires zero signup.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="surface-card p-6 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center">
              <Zap className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-bold text-[var(--tx)]">Instant Processing</h2>
            <p className="text-sm text-[var(--tx-2)] leading-relaxed">
              No verification emails, no password resets, and no login forms. Drag your files and get your results in seconds.
            </p>
          </div>
          <div className="surface-card p-6 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-[var(--success-soft)] text-[var(--success)] flex items-center justify-center">
              <Lock className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-bold text-[var(--tx)]">Zero Ingestion Tracking</h2>
            <p className="text-sm text-[var(--tx-2)] leading-relaxed">
              Because all calculations execute locally in your browser memory, we do not log your identity or your files.
            </p>
          </div>
          <div className="surface-card p-6 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center">
              <FileText className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-bold text-[var(--tx)]">Clean Watermark-Free Files</h2>
            <p className="text-sm text-[var(--tx-2)] leading-relaxed">
              Many free tools stamp promotional logos on documents unless you register. Our tool never alters your documents.
            </p>
          </div>
        </div>

        {/* Featured Tools Grid */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-[var(--tx)] text-center">
            Popular Tools You Can Use Immediately
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {toolHighlights.map((tool) => (
              <Link
                key={tool.name}
                href={tool.href}
                className="surface-card p-5 space-y-2 hover:border-[var(--accent-border)] transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-[var(--tx)] group-hover:text-[var(--accent)] transition-colors">
                    {tool.name}
                  </h3>
                  <ArrowRight className="h-4 w-4 text-[var(--tx-3)] group-hover:text-[var(--accent)] transition-colors" />
                </div>
                <p className="text-xs text-[var(--tx-2)] leading-relaxed">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="surface-card p-6 sm:p-8 space-y-6 leading-relaxed text-[var(--tx-2)]">
          <h2 className="text-2xl font-bold tracking-tight text-[var(--tx)]">
            Why We Do Not Ask for Your Email
          </h2>
          <p>
            When you need to compress an urgent tax filing or sign an NDA before a deadline, you should not have to waste five minutes creating a password and confirming an email link.
          </p>
          <p>
            We built I Hate Love PDF with modern browser capabilities. Because client-side JavaScript handles the file processing directly on your device, we have zero cloud server costs for handling file storage. That means we have no reason to harvest email addresses or push expensive subscription upsells.
          </p>
          <div className="pt-4 flex flex-wrap gap-4">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--accent)] text-white font-semibold text-sm hover:opacity-95 transition-opacity"
            >
              <span>View All 35+ Tools</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <Script
          id="schema-faq-nosignup"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </div>
    </div>
  );
}
