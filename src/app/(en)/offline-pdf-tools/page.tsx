import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { ArrowRight, WifiOff, Cpu, Lock } from 'lucide-react';
import { METADATA_BASE, SHARED_ICONS } from '../../../lib/metadata-shared';
import { SITE_URL } from '../../../lib/site';

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: 'Offline PDF Tools: Process PDFs in Browser Without Internet | ihatelovepdf',
  description: 'Process PDFs locally in your browser even without internet access. Client-side tools that work offline with zero server data transfer.',
  alternates: {
    canonical: `${SITE_URL}/offline-pdf-tools`,
  },
  icons: SHARED_ICONS,
  openGraph: {
    siteName: 'ihatelovepdf',
    title: 'Offline PDF Tools: Process PDFs in Browser Without Internet | ihatelovepdf',
    description: 'Process PDFs locally in your browser even without internet access. Client-side tools that work offline with zero server data transfer.',
    url: `${SITE_URL}/offline-pdf-tools`,
    type: 'website',
    images: [{ url: `${SITE_URL}/og-images/og-image-en.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Offline PDF Tools: Process PDFs in Browser Without Internet | ihatelovepdf',
    description: 'Process PDFs locally in your browser even without internet access. Client-side tools that work offline with zero server data transfer.',
    creator: '@YesShrey',
    site: '@YesShrey',
    images: [`${SITE_URL}/og-images/og-image-en.png`],
  },
};

export default function OfflinePdfToolsPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Can I really use I Hate Love PDF offline?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Once the web application is loaded in your browser tab, all core processing libraries run locally on your device. You can disconnect your Wi-Fi and still merge, split, compress, and edit documents.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do PDF tools work without internet access?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Modern web standards like client-side JavaScript engines and HTML5 canvas allow complex software to run directly inside web browsers. Your device CPU and GPU handle the document parsing and rendering.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why is offline processing safer for corporate compliance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Because files never travel over the network, offline client-side processing eliminates data-in-transit interception, third-party cloud data leaks, and compliance violations under GDPR and HIPAA.',
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--brand)]/20 bg-[var(--brand-soft)] text-xs font-semibold text-[var(--brand)]">
            <WifiOff className="h-3.5 w-3.5" />
            <span>Zero Network Reliance</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-main)] leading-tight">
            PDF Tools That Work Offline in Your Browser
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed">
            Discover how client-side technology allows you to merge, compress, split, and edit PDF documents without uploading a single byte to the internet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2">
            <div className="h-9 w-9 rounded-lg bg-[var(--brand-soft)] border border-[var(--brand)]/20 text-[var(--brand)] flex items-center justify-center">
              <Cpu className="h-4 w-4" />
            </div>
            <h2 className="text-base font-bold text-[var(--text-main)]">Powered by Your Device</h2>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Calculations are performed by your laptop or phone processor rather than congested remote cloud servers.
            </p>
          </div>
          <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2">
            <div className="h-9 w-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Lock className="h-4 w-4" />
            </div>
            <h2 className="text-base font-bold text-[var(--text-main)]">Complete Data Isolation</h2>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Ideal for sensitive medical, legal, and financial files where security policies prohibit external file uploads.
            </p>
          </div>
          <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2">
            <div className="h-9 w-9 rounded-lg bg-[var(--brand-soft)] border border-[var(--brand)]/20 text-[var(--brand)] flex items-center justify-center">
              <WifiOff className="h-4 w-4" />
            </div>
            <h2 className="text-base font-bold text-[var(--text-main)]">Works on Airplanes &amp; Transit</h2>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Once loaded, you can disconnect your connection or turn on airplane mode and continue organizing files without interruption.
            </p>
          </div>
        </div>

        <section className="p-6 sm:p-7 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-4 leading-relaxed text-xs sm:text-sm text-[var(--text-muted)]">
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[var(--text-main)]">
            How Client-Side PDF Processing Works
          </h2>
          <p>
            Traditional PDF websites act as file relays: you select a file on your computer, your browser uploads it over the internet to their web server, their server processes the file using command-line utilities, and you wait to download the output.
          </p>
          <p>
            I Hate Love PDF uses a modern architecture built on open-source libraries like pdf-lib, PDF.js, and docx. When you visit a tool page, the processing code is compiled into your browser memory. When you select a document, it is read into an ArrayBuffer in your browser tab. All page manipulation, compression, and PDF to Word conversions happen right there on your CPU.
          </p>
          <p>
            You can verify this yourself anytime: open your browser developer tools (F12), check the Network tab, and process a document. You will see zero file upload requests.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              href="/merge"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[var(--brand)] text-white font-medium text-xs sm:text-sm hover:opacity-95 transition-opacity"
            >
              <span>Test Merge PDF Offline</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--subtle)] font-medium text-xs sm:text-sm text-[var(--text-main)] hover:border-[var(--brand)] transition-colors"
            >
              <span>Browse All Offline Tools</span>
            </Link>
          </div>
        </section>

        <Script
          id="schema-faq-offline"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </div>
    </div>
  );
}
