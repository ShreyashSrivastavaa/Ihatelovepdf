import type { Metadata } from 'next';
import { ShieldCheck, Cpu, Lock, Award, HeartHandshake, CheckCircle2, FileCheck, Code2 } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About ihatelovepdf | Private Browser PDF Tools',
  description:
    'Learn about ihatelovepdf.com, our privacy model, our open source engine, and why we built a browser PDF suite where your files never leave your device.',
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
            <span>Processed entirely in your browser</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            About ihatelovepdf
          </h1>
          <p className="text-base sm:text-lg text-[var(--tx-2)] max-w-2xl mx-auto leading-relaxed">
            Fast, private PDF tools that run entirely inside your browser without watermarks. No server uploads, no accounts, and no tracking.
          </p>
        </section>

        {/* Why We Exist */}
        <section className="surface-card p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Lock className="h-5 w-5 text-[var(--accent)]" />
            Why We Built ihatelovepdf
          </h2>
          <p className="text-sm text-[var(--tx-2)] leading-relaxed">
            Most online PDF tools make you upload contracts, bank statements, or tax documents to remote servers you know nothing about. Even if they promise to delete files later, your documents still travel over the internet and sit on someone else&apos;s computer.
          </p>
          <p className="text-sm text-[var(--tx-2)] leading-relaxed">
            <strong>We built ihatelovepdf so you do not have to make that trade-off.</strong> Every tool runs right in your browser on your own machine. Your files never touch our servers, and we never see what is inside them.
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
              Your files stay in your computer memory. If you disconnect your internet after the page opens, every tool still works offline.
            </p>
          </div>

          <div className="surface-card p-6 space-y-2">
            <div className="h-10 w-10 rounded-xl bg-[var(--accent-soft)] border border-[var(--accent-border)] flex items-center justify-center text-[var(--accent)] font-bold mb-3">
              <Award className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold">Zero Watermarks</h3>
            <p className="text-xs text-[var(--tx-2)] leading-relaxed">
              No watermarks on your finished files, ever. You get clean, original documents without branding stamped across them.
            </p>
          </div>

          <div className="surface-card p-6 space-y-2">
            <div className="h-10 w-10 rounded-xl bg-[var(--accent-soft)] border border-[var(--accent-border)] flex items-center justify-center text-[var(--accent)] font-bold mb-3">
              <FileCheck className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold">No Artificial Limits</h3>
            <p className="text-xs text-[var(--tx-2)] leading-relaxed">
              Because we do not run expensive cloud processing servers, we do not set arbitrary limits like 10MB caps or daily task quotas. You can process files as large as your computer can handle.
            </p>
          </div>

          <div className="surface-card p-6 space-y-2">
            <div className="h-10 w-10 rounded-xl bg-[var(--accent-soft)] border border-[var(--accent-border)] flex items-center justify-center text-[var(--accent)] font-bold mb-3">
              <Code2 className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold">Built with Open Source</h3>
            <p className="text-xs text-[var(--tx-2)] leading-relaxed">
              Built on reliable open source projects including <code className="text-xs bg-[var(--bg-subtle)] px-1 py-0.5 rounded">pdf-lib</code>, <code className="text-xs bg-[var(--bg-subtle)] px-1 py-0.5 rounded">PDF.js</code>, and <code className="text-xs bg-[var(--bg-subtle)] px-1 py-0.5 rounded">Tesseract.js</code>.
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
            ihatelovepdf is an independent project created and maintained by <strong>Shreyash Srivastava</strong>. I built it as a clean, private alternative to crowded PDF websites that push ads, track users, and force you to upload personal documents to remote cloud servers.
          </p>
          <div className="pt-1 flex flex-wrap items-center gap-2.5 text-xs font-semibold">
            <a
              href="https://linkedin.com/in/shreyashsrivastavaa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--accent-border)] hover:text-[var(--accent)] text-[var(--tx)] transition-colors"
            >
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/ShreyashSrivastavaa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--accent-border)] hover:text-[var(--accent)] text-[var(--tx)] transition-colors"
            >
              <span>GitHub</span>
            </a>
            <a
              href="https://x.com/YesShrey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--accent-border)] hover:text-[var(--accent)] text-[var(--tx)] transition-colors"
            >
              <span>Twitter/X</span>
            </a>
            <a
              href="https://shreyashsrivastava.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--accent-border)] hover:text-[var(--accent)] text-[var(--tx)] transition-colors"
            >
              <span>Personal Site</span>
            </a>
          </div>

          <div className="pt-3 flex flex-wrap items-center gap-4 text-xs font-semibold border-t border-[var(--border)]">
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
