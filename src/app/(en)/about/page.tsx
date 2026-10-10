import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { ShieldCheck, Cpu, Lock, Award, CheckCircle2, FileCheck, Code2, ExternalLink, HelpCircle, User } from 'lucide-react';
import { METADATA_BASE, SHARED_ICONS, SHARED_OPEN_GRAPH, SHARED_TWITTER } from '../../../lib/metadata-shared';
import { SITE_URL } from '../../../lib/site';

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: 'About I Hate Love PDF: Built & Owned by Shreyash Srivastava',
  description: 'I Hate Love PDF is built and owned by Shreyash Srivastava, a full stack and backend developer from India. Learn about our private in-browser PDF tools.',
  alternates: {
    canonical: `${SITE_URL}/about/`,
  },
  icons: SHARED_ICONS,
  openGraph: {
    ...SHARED_OPEN_GRAPH,
    title: 'About I Hate Love PDF: Built & Owned by Shreyash Srivastava',
    description: 'I Hate Love PDF is built and owned by Shreyash Srivastava, a full stack and backend developer from India. Learn about our private in-browser PDF tools.',
    url: `${SITE_URL}/about/`,
  },
  twitter: SHARED_TWITTER,
};

export default function AboutPage() {
  const aboutSchemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://www.shreyashsrivastava.in/#person',
        name: 'Shreyash Srivastava',
        jobTitle: 'Founder and developer of I Hate Love PDF',
        url: 'https://www.shreyashsrivastava.in/',
        image: `${SITE_URL}/apple-icon.png`,
        description: 'Full stack and backend developer from India. Creator, founder, and sole maintainer of I Hate Love PDF.',
        sameAs: [
          'https://www.shreyashsrivastava.in/',
          'https://github.com/ShreyashSrivastavaa',
          'https://www.linkedin.com/in/shreyashsrivastavaa',
        ],
        worksFor: {
          '@id': `${SITE_URL}/#organization`,
        },
      },
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'I Hate Love PDF',
        url: SITE_URL,
        logo: `${SITE_URL}/apple-icon.png`,
        founder: {
          '@id': 'https://www.shreyashsrivastava.in/#person',
        },
        sameAs: [
          'https://github.com/ShreyashSrivastavaa',
          'https://www.linkedin.com/in/shreyashsrivastavaa',
          'https://buymeacoffee.com/shreyashsrivastavaa',
        ],
      },
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/about/#webpage`,
        url: `${SITE_URL}/about/`,
        name: 'About I Hate Love PDF',
        about: {
          '@id': 'https://www.shreyashsrivastava.in/#person',
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/about/#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Who owns I Hate Love PDF?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'I Hate Love PDF is owned and built by Shreyash Srivastava. Portfolio: https://www.shreyashsrivastava.in/',
            },
          },
          {
            '@type': 'Question',
            name: 'Why was I Hate Love PDF created?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'I Hate Love PDF was built to provide a clean, private, and unlimited alternative to crowded cloud PDF websites that force users to upload personal documents and pay for subscriptions.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do files leave my browser when using I Hate Love PDF?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. All PDF processing happens directly in your device browser RAM using client-side WebAssembly and JavaScript. Zero files are uploaded to any server.',
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--tx)]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16 space-y-12">
        {/* Header */}
        <section className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--success-border)] bg-[var(--success-soft)] text-xs font-semibold text-[var(--tx)]">
            <ShieldCheck className="h-4 w-4 text-[var(--success)]" />
            <span>100% In-Browser &bull; Zero Server Uploads</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            About I Hate Love PDF
          </h1>
          <p className="text-base sm:text-lg text-[var(--tx-2)] max-w-2xl mx-auto leading-relaxed">
            I Hate Love PDF is built and owned by Shreyash Srivastava, a full stack and backend developer from India.
          </p>
        </section>

        {/* Founder & Owner Profile Card */}
        <section className="surface-card p-6 sm:p-8 rounded-2xl border border-[var(--accent-border)] bg-[var(--bg-card)] space-y-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Founder Avatar Placeholder */}
            <div className="relative h-24 w-24 sm:h-28 sm:w-28 shrink-0 rounded-2xl bg-[var(--accent-soft)] border-2 border-[var(--accent)] flex flex-col items-center justify-center text-[var(--accent)] shadow-sm">
              <User className="h-12 w-12" />
              <span className="text-[10px] font-bold uppercase tracking-wider mt-1">Shreyash</span>
            </div>

            <div className="space-y-3 text-center sm:text-left flex-1">
              <div>
                <h2 className="text-2xl font-bold text-[var(--tx)]">Shreyash Srivastava</h2>
                <p className="text-sm font-semibold text-[var(--accent)]">
                  Founder & Developer of I Hate Love PDF
                </p>
              </div>

              <p className="text-sm text-[var(--tx-2)] leading-relaxed">
                Hi, I am Shreyash Srivastava, a full stack and backend developer from India. I engineered and maintain I Hate Love PDF as an independent, privacy-first web utility. I was frustrated by legacy PDF websites that force users to upload confidential tax forms and legal contracts to remote cloud servers, gate basic features behind expensive subscriptions, and spam users with invasive banner ads.
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs font-semibold">
                <a
                  href="https://www.shreyashsrivastava.in/"
                  target="_blank"
                  rel="me author noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--accent)] text-white hover:opacity-95 transition-opacity"
                >
                  <span>Portfolio</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <a
                  href="https://github.com/ShreyashSrivastavaa"
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[var(--border)] surface-card text-[var(--tx)] hover:border-[var(--accent-border)] transition-colors"
                >
                  <span>GitHub</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/shreyashsrivastavaa"
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[var(--border)] surface-card text-[var(--tx)] hover:border-[var(--accent-border)] transition-colors"
                >
                  <span>LinkedIn</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Why We Built This */}
        <section className="surface-card p-6 sm:p-8 space-y-4 rounded-2xl">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Lock className="h-5 w-5 text-[var(--accent)]" />
            Why We Built I Hate Love PDF
          </h2>
          <p className="text-sm text-[var(--tx-2)] leading-relaxed">
            Most online PDF tools make you upload contracts, bank statements, or tax documents to remote servers you know nothing about. Even if they promise to delete files later, your documents still travel over the internet and sit on someone else&apos;s computer.
          </p>
          <p className="text-sm text-[var(--tx-2)] leading-relaxed">
            <strong>We built I Hate Love PDF so you never have to make that trade-off.</strong> Every tool runs right in your browser on your own machine. Your files never touch our servers, and we never see what is inside them.
          </p>
        </section>

        {/* 4 Pillars */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="surface-card p-6 space-y-2 rounded-2xl">
            <div className="h-10 w-10 rounded-xl bg-[var(--accent-soft)] border border-[var(--accent-border)] flex items-center justify-center text-[var(--accent)] font-bold mb-3">
              <Cpu className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold">Zero Server Uploads</h3>
            <p className="text-xs text-[var(--tx-2)] leading-relaxed">
              Your files stay in your computer memory. If you disconnect your internet after the page opens, every tool still works offline.
            </p>
          </div>

          <div className="surface-card p-6 space-y-2 rounded-2xl">
            <div className="h-10 w-10 rounded-xl bg-[var(--accent-soft)] border border-[var(--accent-border)] flex items-center justify-center text-[var(--accent)] font-bold mb-3">
              <Award className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold">Zero Watermarks</h3>
            <p className="text-xs text-[var(--tx-2)] leading-relaxed">
              No watermarks on your finished files, ever. You get clean, original documents without branding stamped across them.
            </p>
          </div>

          <div className="surface-card p-6 space-y-2 rounded-2xl">
            <div className="h-10 w-10 rounded-xl bg-[var(--accent-soft)] border border-[var(--accent-border)] flex items-center justify-center text-[var(--accent)] font-bold mb-3">
              <FileCheck className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold">No Artificial Limits</h3>
            <p className="text-xs text-[var(--tx-2)] leading-relaxed">
              Because we do not run expensive cloud processing servers, we do not set arbitrary limits like 10MB caps or daily task quotas.
            </p>
          </div>

          <div className="surface-card p-6 space-y-2 rounded-2xl">
            <div className="h-10 w-10 rounded-xl bg-[var(--accent-soft)] border border-[var(--accent-border)] flex items-center justify-center text-[var(--accent)] font-bold mb-3">
              <Code2 className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold">Built with Open Source</h3>
            <p className="text-xs text-[var(--tx-2)] leading-relaxed">
              Built on reliable open source projects including <code className="text-xs bg-[var(--bg-subtle)] px-1 py-0.5 rounded">pdf-lib</code>, <code className="text-xs bg-[var(--bg-subtle)] px-1 py-0.5 rounded">PDF.js</code>, and <code className="text-xs bg-[var(--bg-subtle)] px-1 py-0.5 rounded">Tesseract.js</code>.
            </p>
          </div>
        </section>

        {/* Ownership FAQ Section */}
        <section className="surface-card p-6 sm:p-8 space-y-4 rounded-2xl">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-[var(--accent)]" />
            Frequently Asked Questions About Ownership
          </h2>
          <div className="border border-[var(--border)] rounded-xl p-5 bg-[var(--bg-card)] space-y-2">
            <h3 className="font-bold text-sm sm:text-base text-[var(--tx)]">Who owns I Hate Love PDF?</h3>
            <p className="text-xs sm:text-sm text-[var(--tx-2)] leading-relaxed">
              I Hate Love PDF is owned and built by Shreyash Srivastava. Portfolio:{' '}
              <a
                href="https://www.shreyashsrivastava.in/"
                target="_blank"
                rel="me author noopener noreferrer"
                className="text-[var(--accent)] underline font-semibold"
              >
                https://www.shreyashsrivastava.in/
              </a>
            </p>
          </div>
        </section>

        {/* Explore CTA */}
        <section className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold">
          <Link
            href="/tools"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[var(--accent)] text-white hover:opacity-95 transition-opacity"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>Explore All 35+ Tools</span>
          </Link>
          <Link
            href="/buy-me-a-coffee"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-[var(--border)] surface-card text-[var(--tx)] hover:border-[var(--accent-border)] transition-colors"
          >
            <span>Support via Buy Me a Coffee</span>
          </Link>
        </section>

        <Script
          id="schema-about-graph"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchemaGraph) }}
        />
      </div>
    </div>
  );
}
