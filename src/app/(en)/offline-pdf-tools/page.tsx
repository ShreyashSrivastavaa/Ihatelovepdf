import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { ArrowRight, WifiOff, Cpu, Lock } from 'lucide-react';
import { METADATA_BASE, SHARED_ICONS, SHARED_OPEN_GRAPH, SHARED_TWITTER } from '../../../lib/metadata-shared';
import { SITE_URL } from '../../../lib/site';

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: 'Offline PDF Tools: Process PDFs in Browser Without Internet',
  description: 'Process PDFs locally in your browser even without internet access. Client-side tools that work offline with zero server data transfer.',
  alternates: {
    canonical: `${SITE_URL}/offline-pdf-tools/`,
  },
  icons: SHARED_ICONS,
  openGraph: {
    ...SHARED_OPEN_GRAPH,
    title: 'Offline PDF Tools: Process PDFs in Browser Without Internet',
    description: 'Process PDFs locally in your browser even without internet access. Client-side tools that work offline with zero server data transfer.',
    url: `${SITE_URL}/offline-pdf-tools/`,
  },
  twitter: SHARED_TWITTER,
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
          text: 'Modern web standards like WebAssembly and HTML5 canvas allow complex software to run directly inside web browsers. Your device CPU and GPU handle the document parsing and rendering.',
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
    <div className="min-h-screen bg-[var(--bg)] text-[var(--tx)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--accent-border)] bg-[var(--accent-soft)] text-xs font-semibold text-[var(--accent)]">
            <WifiOff className="h-4 w-4" />
            <span>Zero Network Reliance</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--tx)] leading-tight">
            PDF Tools That Work Offline in Your Browser
          </h1>
          <p className="text-base sm:text-lg text-[var(--tx-2)] max-w-2xl mx-auto leading-relaxed">
            Discover how client-side technology allows you to merge, compress, split, and edit PDF documents without uploading a single byte to the internet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="surface-card p-6 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center">
              <Cpu className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-bold text-[var(--tx)]">Powered by Your Device</h2>
            <p className="text-sm text-[var(--tx-2)] leading-relaxed">
              Calculations are performed by your laptop or phone processor rather than congested remote cloud servers.
            </p>
          </div>
          <div className="surface-card p-6 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-[var(--success-soft)] text-[var(--success)] flex items-center justify-center">
              <Lock className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-bold text-[var(--tx)]">Complete Data Isolation</h2>
            <p className="text-sm text-[var(--tx-2)] leading-relaxed">
              Ideal for sensitive medical, legal, and financial files where security policies prohibit external file uploads.
            </p>
          </div>
          <div className="surface-card p-6 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center">
              <WifiOff className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-bold text-[var(--tx)]">Works on Airplanes & Transit</h2>
            <p className="text-sm text-[var(--tx-2)] leading-relaxed">
              Once loaded, you can disconnect your connection or turn on airplane mode and continue organizing files without interruption.
            </p>
          </div>
        </div>

        <section className="surface-card p-6 sm:p-8 space-y-6 leading-relaxed text-[var(--tx-2)]">
          <h2 className="text-2xl font-bold tracking-tight text-[var(--tx)]">
            How Client-Side PDF Processing Works
          </h2>
          <p>
            Traditional PDF websites act as file relays: you select a file on your computer, your browser uploads it over the internet to their web server, their server processes the file using command-line utilities, and you wait to download the output.
          </p>
          <p>
            I Hate Love PDF uses a modern architecture built on open-source libraries like pdf-lib and PDF.js. When you visit a tool page, the processing code is compiled into your browser memory. When you select a document, it is read into an ArrayBuffer in your browser tab. All page manipulation, compression, and watermarking happen right there on your CPU.
          </p>
          <p>
            You can verify this yourself anytime: open your browser developer tools (F12), check the Network tab, and process a document. You will see zero file upload requests.
          </p>
          <div className="pt-4 flex flex-wrap gap-4">
            <Link
              href="/merge-pdf"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--accent)] text-white font-semibold text-sm hover:opacity-95 transition-opacity"
            >
              <span>Test Merge PDF Offline</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--border)] surface-card font-semibold text-sm text-[var(--tx)] hover:border-[var(--accent-border)] transition-colors"
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
