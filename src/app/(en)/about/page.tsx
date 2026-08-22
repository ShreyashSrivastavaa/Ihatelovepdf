import type { Metadata } from 'next';
import { ShieldCheck, Cpu, Lock, Award, HeartHandshake, CheckCircle2, FileCheck, Code2 } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About ihatelovepdf | 100% Client-Side Private PDF Toolkit',
  description:
    'Learn about ihatelovepdf.com: our mission, zero-server upload privacy architecture, open-source engine, and the team behind the browser-first PDF suite.',
  alternates: {
    canonical: 'https://ihatelovepdf.com/about/',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--tx)]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16 space-y-12">
        {/* Header */}
        <section className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--success-border)] bg-[var(--success-soft)] text-xs font-semibold text-[var(--tx)]">
            <ShieldCheck className="h-4 w-4 text-[var(--success)]" />
            <span>100% Client-Side Processing Guarantee</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            About ihatelovepdf
          </h1>
          <p className="text-base sm:text-lg text-[var(--tx-2)] max-w-2xl mx-auto leading-relaxed">
            The private, fast, and watermark-free PDF suite engineered to run entirely inside your browser. No server uploads. No accounts. No tracking.
          </p>
        </section>

        {/* Why We Exist */}
        <section className="surface-card p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Lock className="h-5 w-5 text-[var(--accent)]" />
            Why We Built ihatelovepdf
          </h2>
          <p className="text-sm text-[var(--tx-2)] leading-relaxed">
            Most popular online PDF tools require you to upload your sensitive contracts, financial statements, medical records, and personal IDs to unknown remote cloud servers. Even when services claim to delete files after a few hours, your confidential data is transmitted across the internet and processed on third-party infrastructure.
          </p>
          <p className="text-sm text-[var(--tx-2)] leading-relaxed">
            <strong>ihatelovepdf was created to end this compromise.</strong> By leveraging modern WebAssembly (WASM), Web Workers, and client-side JavaScript rendering engines, every single tool executes 100% locally on your machine. Your documents never touch our servers or any cloud database.
          </p>
        </section>

        {/* The 4 Pillars */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="surface-card p-6 space-y-2">
            <div className="h-10 w-10 rounded-xl bg-[var(--accent-soft)] border border-[var(--accent-border)] flex items-center justify-center text-[var(--accent)] font-bold mb-3">
              <Cpu className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold">Zero Server Uploads</h3>
            <p className="text-xs text-[var(--tx-2)] leading-relaxed">
              Files stay strictly in your device memory. Disconnect your Wi-Fi after the page loads and all 46 tools continue working flawlessly offline.
            </p>
          </div>

          <div className="surface-card p-6 space-y-2">
            <div className="h-10 w-10 rounded-xl bg-[var(--accent-soft)] border border-[var(--accent-border)] flex items-center justify-center text-[var(--accent)] font-bold mb-3">
              <Award className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold">Zero Watermarks</h3>
            <p className="text-xs text-[var(--tx-2)] leading-relaxed">
              We never hold your documents hostage or stamp intrusive watermarks on your output files. Clean, professional results every time.
            </p>
          </div>

          <div className="surface-card p-6 space-y-2">
            <div className="h-10 w-10 rounded-xl bg-[var(--accent-soft)] border border-[var(--accent-border)] flex items-center justify-center text-[var(--accent)] font-bold mb-3">
              <FileCheck className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold">No Artificial File Caps</h3>
            <p className="text-xs text-[var(--tx-2)] leading-relaxed">
              Without cloud server processing costs, there are no arbitrary 10MB or 2-task daily limits. Process documents as large as your device hardware allows.
            </p>
          </div>

          <div className="surface-card p-6 space-y-2">
            <div className="h-10 w-10 rounded-xl bg-[var(--accent-soft)] border border-[var(--accent-border)] flex items-center justify-center text-[var(--accent)] font-bold mb-3">
              <Code2 className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold">Open-Source Powered</h3>
            <p className="text-xs text-[var(--tx-2)] leading-relaxed">
              Built on battle-tested, peer-reviewed open-source libraries including <code className="text-xs bg-[var(--bg-subtle)] px-1 py-0.5 rounded">pdf-lib</code>, <code className="text-xs bg-[var(--bg-subtle)] px-1 py-0.5 rounded">PDF.js</code>, and <code className="text-xs bg-[var(--bg-subtle)] px-1 py-0.5 rounded">Tesseract.js</code>.
            </p>
          </div>
        </section>

        {/* Creator & Attribution */}
        <section className="surface-card p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <HeartHandshake className="h-5 w-5 text-[var(--accent)]" />
            About the Creator & Maintainers
          </h2>
          <p className="text-sm text-[var(--tx-2)] leading-relaxed">
            ihatelovepdf was created by <strong>Shreyash Srivastava</strong> (UTS, Sydney, Australia) as an open, privacy-preserving alternative to ad-heavy, cloud-dependent PDF portals.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white transition-colors"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Explore All 46 Tools</span>
            </Link>
            <Link
              href="/privacy"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[var(--border)] bg-[var(--bg)] hover:bg-[var(--bg-subtle)] text-[var(--tx)] transition-colors"
            >
              <span>Read Privacy Policy</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
