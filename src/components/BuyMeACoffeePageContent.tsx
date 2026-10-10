'use client';

import React from 'react';
import Link from 'next/link';
import { Coffee, ShieldCheck, Heart, Sparkles, ExternalLink, ArrowRight } from 'lucide-react';

export function BuyMeACoffeePageContent() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--tx)]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-20 space-y-12">
        {/* HERO SECTION */}
        <section className="text-center space-y-6 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-xs font-semibold text-amber-500 shadow-xs">
            <Coffee className="h-4 w-4" />
            <span>Support Independent Development</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[var(--tx)] leading-tight">
            Buy Me a Coffee
          </h1>

          <p className="text-base sm:text-lg text-[var(--tx-2)] leading-relaxed">
            I Hate Love PDF is free, private, and runs directly inside your web browser. The project is designed, built, and maintained by Shreyash Srivastava. Your tips and coffees keep the servers running, tools accessible to everyone, and the site free and ad-light.
          </p>

          {/* LARGE PRIMARY CALL TO ACTION BUTTON */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://buymeacoffee.com/shreyashsrivastavaa"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#FFDD00] hover:bg-[#ffea40] text-neutral-900 font-extrabold text-base shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <Coffee className="h-5 w-5 text-neutral-900 stroke-[2.2]" />
              <span>Buy me a coffee</span>
              <ExternalLink className="h-4 w-4 text-neutral-800" />
            </a>

            <Link
              href="/tools"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] hover:bg-[var(--bg-subtle)] text-[var(--tx)] font-semibold text-sm transition-all shadow-xs"
            >
              <span>Explore all free tools</span>
              <ArrowRight className="h-4 w-4 text-[var(--tx-3)]" />
            </Link>
          </div>
        </section>

        {/* WHY SUPPORT / VALUE PROPOSITION */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="surface-card p-6 sm:p-7 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] text-center space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-500 shadow-xs">
              <ShieldCheck className="h-6 w-6 stroke-[2]" />
            </div>
            <h2 className="text-base font-bold text-[var(--tx)]">100% Private, In-Browser</h2>
            <p className="text-xs sm:text-sm text-[var(--tx-2)] leading-relaxed">
              Your sensitive files never upload to remote cloud servers. All conversions, compressions, and edits happen directly in your browser memory.
            </p>
          </div>

          <div className="surface-card p-6 sm:p-7 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] text-center space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10 text-amber-500 shadow-xs">
              <Sparkles className="h-6 w-6 stroke-[2]" />
            </div>
            <h2 className="text-base font-bold text-[var(--tx)]">No Paywalls, No Watermarks</h2>
            <p className="text-xs sm:text-sm text-[var(--tx-2)] leading-relaxed">
              No daily file limits, no forced email registrations, and no ugly watermarks stamped across your exported PDFs.
            </p>
          </div>

          <div className="surface-card p-6 sm:p-7 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] text-center space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-rose-500/20 bg-rose-500/10 text-rose-500 shadow-xs">
              <Heart className="h-6 w-6 stroke-[2]" />
            </div>
            <h2 className="text-base font-bold text-[var(--tx)]">Built for You</h2>
            <p className="text-xs sm:text-sm text-[var(--tx-2)] leading-relaxed">
              Maintained with care by an independent software engineer. Every coffee directly funds hosting, domain costs, and new tool development.
            </p>
          </div>
        </section>

        {/* CREATOR SECTION */}
        <section className="surface-card rounded-3xl border border-[var(--border)] p-6 sm:p-8 bg-[var(--bg-card)] space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent)] block">
                The Developer Behind The Platform
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--tx)] mt-1">
                Shreyash Srivastava
              </h2>
              <p className="text-xs sm:text-sm text-[var(--tx-2)] mt-0.5">
                Founder and developer of I Hate Love PDF
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href="https://www.shreyashsrivastava.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] text-xs font-medium text-[var(--tx)] hover:border-[var(--accent-border)] hover:text-[var(--accent)] transition-colors"
              >
                <span>Portfolio</span>
                <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href="https://github.com/ShreyashSrivastavaa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] text-xs font-medium text-[var(--tx)] hover:border-[var(--accent-border)] hover:text-[var(--accent)] transition-colors"
              >
                <span>GitHub</span>
                <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href="https://www.linkedin.com/in/shreyashsrivastavaa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] text-xs font-medium text-[var(--tx)] hover:border-[var(--accent-border)] hover:text-[var(--accent)] transition-colors"
              >
                <span>LinkedIn</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[var(--tx-2)] leading-relaxed pt-2 border-t border-[var(--border)]">
            I built I Hate Love PDF after growing frustrated with mainstream PDF websites that charge recurring subscriptions, limit file sizes, bombard users with ads, and force sensitive personal documents onto third party servers. Here, everything runs on your device, completely free.
          </p>
        </section>

        {/* FAQ SECTION */}
        <section className="space-y-4 max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-center text-[var(--tx)]">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            <details className="surface-card p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-card)]">
              <summary className="cursor-pointer text-sm font-semibold text-[var(--tx)]">
                Is I Hate Love PDF really free to use?
              </summary>
              <p className="mt-2 text-xs sm:text-sm text-[var(--tx-2)] leading-relaxed">
                Yes. Every single tool on the site is 100% free with no hidden charges, trial periods, or mandatory payments.
              </p>
            </details>

            <details className="surface-card p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-card)]">
              <summary className="cursor-pointer text-sm font-semibold text-[var(--tx)]">
                Why should I buy a coffee?
              </summary>
              <p className="mt-2 text-xs sm:text-sm text-[var(--tx-2)] leading-relaxed">
                Your tips help cover ongoing domain registration, fast edge CDN distribution, and the continuous time spent implementing new tools and optimizations.
              </p>
            </details>

            <details className="surface-card p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-card)]">
              <summary className="cursor-pointer text-sm font-semibold text-[var(--tx)]">
                Do I need a Buy Me a Coffee account to tip?
              </summary>
              <p className="mt-2 text-xs sm:text-sm text-[var(--tx-2)] leading-relaxed">
                No account is required. You can support the project using credit card, debit card, Apple Pay, Google Pay, or local payment methods in seconds.
              </p>
            </details>
          </div>
        </section>

        {/* SECONDARY BOTTOM CTA */}
        <section className="text-center pt-6 border-t border-[var(--border)] space-y-4">
          <h2 className="text-lg font-bold text-[var(--tx)]">
            Ready to show your appreciation?
          </h2>
          <a
            href="https://buymeacoffee.com/shreyashsrivastavaa"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-[#FFDD00] hover:bg-[#ffea40] text-neutral-900 font-bold text-sm shadow-md transition-all cursor-pointer"
          >
            <Coffee className="h-4 w-4 text-neutral-900" />
            <span>Support Shreyash on Buy Me a Coffee</span>
          </a>
        </section>
      </div>
    </div>
  );
}
