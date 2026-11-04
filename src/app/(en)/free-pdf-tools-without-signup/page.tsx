import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { ShieldCheck, ArrowRight, Lock, Zap, FileText } from 'lucide-react';
import { METADATA_BASE, SHARED_ICONS } from '../../../lib/metadata-shared';
import { SITE_URL } from '../../../lib/site';

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: 'Free PDF Tools Without Signup: No Email, No Watermark | ihatelovepdf',
  description: 'Use 35+ free PDF tools online without creating an account or entering your email. Merge, split, compress, sign, and edit PDFs with zero signup.',
  alternates: {
    canonical: `${SITE_URL}/free-pdf-tools-without-signup`,
  },
  icons: SHARED_ICONS,
  openGraph: {
    siteName: 'ihatelovepdf',
    title: 'Free PDF Tools Without Signup: No Email, No Watermark | ihatelovepdf',
    description: 'Use 35+ free PDF tools online without creating an account or entering your email. Merge, split, compress, sign, and edit PDFs with zero signup.',
    url: `${SITE_URL}/free-pdf-tools-without-signup`,
    type: 'website',
    images: [{ url: `${SITE_URL}/og-images/og-image-en.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free PDF Tools Without Signup: No Email, No Watermark | ihatelovepdf',
    description: 'Use 35+ free PDF tools online without creating an account or entering your email. Merge, split, compress, sign, and edit PDFs with zero signup.',
    creator: '@YesShrey',
    site: '@YesShrey',
    images: [`${SITE_URL}/og-images/og-image-en.png`],
  },
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
    { name: 'Merge PDF', href: '/merge', desc: 'Combine multiple documents into one without account registration.' },
    { name: 'Compress PDF', href: '/compress', desc: 'Reduce file size by up to 90% without entering an email address.' },
    { name: 'Split PDF', href: '/split', desc: 'Extract pages and split documents with zero signups or queues.' },
    { name: 'Sign PDF', href: '/sign-pdf', desc: 'Draw or type legal electronic signatures directly in your browser.' },
    { name: 'Redact PDF', href: '/redact', desc: 'Permanently erase private numbers and confidential data.' },
    { name: 'Fill PDF Form', href: '/fill-pdf-form', desc: 'Complete interactive AcroForms or type text anywhere on pages.' },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Zero Signup Required</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-main)] leading-tight">
            Free PDF Tools Without Signup or Email
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed">
            Need to process a PDF right now without creating an account or subscribing to newsletters? Here is why I Hate Love PDF requires zero signup.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2">
            <div className="h-9 w-9 rounded-lg bg-[var(--brand-soft)] border border-[var(--brand)]/20 text-[var(--brand)] flex items-center justify-center">
              <Zap className="h-4 w-4" />
            </div>
            <h2 className="text-base font-bold text-[var(--text-main)]">Instant Processing</h2>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              No verification emails, no password resets, and no login forms. Drag your files and get your results in seconds.
            </p>
          </div>
          <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2">
            <div className="h-9 w-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Lock className="h-4 w-4" />
            </div>
            <h2 className="text-base font-bold text-[var(--text-main)]">Zero Ingestion Tracking</h2>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Because all calculations execute locally in your browser memory, we do not log your identity or your files.
            </p>
          </div>
          <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2">
            <div className="h-9 w-9 rounded-lg bg-[var(--brand-soft)] border border-[var(--brand)]/20 text-[var(--brand)] flex items-center justify-center">
              <FileText className="h-4 w-4" />
            </div>
            <h2 className="text-base font-bold text-[var(--text-main)]">Clean Watermark-Free Files</h2>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Many free tools stamp promotional logos on documents unless you register. Our tool never alters your documents.
            </p>
          </div>
        </div>

        {/* Featured Tools Grid */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-main)] text-center">
            Popular Tools You Can Use Immediately
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
            {toolHighlights.map((tool) => (
              <Link
                key={tool.name}
                href={tool.href}
                className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-1.5 hover:border-[var(--brand)] transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-xs sm:text-sm text-[var(--text-main)] group-hover:text-[var(--brand)] transition-colors">
                    {tool.name}
                  </h3>
                  <ArrowRight className="h-3.5 w-3.5 text-[var(--text-muted)] group-hover:text-[var(--brand)] transition-colors" />
                </div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="p-6 sm:p-7 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-4 leading-relaxed text-xs sm:text-sm text-[var(--text-muted)]">
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[var(--text-main)]">
            Why We Do Not Ask for Your Email
          </h2>
          <p>
            When you need to compress an urgent tax filing or sign an NDA before a deadline, you should not have to waste five minutes creating a password and confirming an email link.
          </p>
          <p>
            We built I Hate Love PDF with modern browser capabilities. Because client-side JavaScript handles the file processing directly on your device, we have zero cloud server costs for handling file storage. That means we have no reason to harvest email addresses or push expensive subscription upsells.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              href="/tools"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[var(--brand)] text-white font-medium text-xs sm:text-sm hover:opacity-95 transition-opacity"
            >
              <span>View All 35+ Tools</span>
              <ArrowRight className="h-3.5 w-3.5" />
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
