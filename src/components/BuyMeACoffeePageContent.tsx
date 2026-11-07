'use client';

import React from 'react';
import Link from 'next/link';
import { Coffee, ShieldCheck, Heart, Sparkles, ExternalLink, ArrowRight } from 'lucide-react';

export function BuyMeACoffeePageContent() {
  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16 space-y-10">
        {/* HERO SECTION */}
        <section className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-xs font-semibold text-amber-600 dark:text-amber-400">
            <Coffee className="h-3.5 w-3.5" />
            <span>Support Independent Development</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-main)] leading-tight">
            Buy Me a Coffee
          </h1>

          <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
            I Hate Love PDF is free, private, and runs directly inside your web browser. The project is designed, built, and maintained by Shreyash Srivastava. Your tips and coffees keep the servers running, tools accessible to everyone, and the site free and ad-light.
          </p>

          {/* LARGE PRIMARY CALL TO ACTION BUTTON */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://buymeacoffee.com/shreyashsrivastavaa"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-[#FFDD00] hover:bg-[#ffea40] text-neutral-900 font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              <Coffee className="h-4.5 w-4.5 text-neutral-900 stroke-[2.2]" />
              <span>Buy me a coffee</span>
              <ExternalLink className="h-3.5 w-3.5 text-neutral-800" />
            </a>

            <Link
              href="/buy-me-a-chai"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-orange-500/30 bg-orange-500/10 hover:bg-orange-500/20 text-orange-600 dark:text-orange-400 font-semibold text-xs sm:text-sm transition-colors"
            >
              <Coffee className="h-4 w-4" />
              <span>Support via UPI / Buy Me a Chai</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            <Link
              href="/tools"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--brand)] text-[var(--text-main)] font-semibold text-xs sm:text-sm transition-colors"
            >
              <span>Explore all free tools</span>
              <ArrowRight className="h-3.5 w-3.5 text-[var(--text-muted)]" />
            </Link>
          </div>
        </section>

        {/* WHY SUPPORT / VALUE PROPOSITION */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          <div className="p-5 sm:p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] text-center space-y-2.5">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="h-5 w-5 stroke-[2]" />
            </div>
            <h2 className="text-sm sm:text-base font-bold text-[var(--text-main)]">100% Private, In-Browser</h2>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Your sensitive files never upload to remote cloud servers. All conversions, compressions, and edits happen directly in your browser memory.
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] text-center space-y-2.5">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Sparkles className="h-5 w-5 stroke-[2]" />
            </div>
            <h2 className="text-sm sm:text-base font-bold text-[var(--text-main)]">No Paywalls, No Watermarks</h2>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              No daily file limits, no forced email registrations, and no ugly watermarks stamped across your exported PDFs.
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] text-center space-y-2.5">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--brand)]/20 bg-[var(--brand-soft)] text-[var(--brand)]">
              <Heart className="h-5 w-5 stroke-[2]" />
            </div>
            <h2 className="text-sm sm:text-base font-bold text-[var(--text-main)]">Built for You</h2>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Maintained with care by an independent software engineer. Every coffee directly funds hosting, domain costs, and new tool development.
            </p>
          </div>
        </section>

        {/* CREATOR SECTION */}
        <section className="rounded-xl border border-[var(--border)] p-6 sm:p-7 bg-[var(--card)] space-y-3.5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--brand)] block">
                The Developer Behind The Platform
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-[var(--text-main)] mt-0.5">
                Shreyash Srivastava
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Founder and developer of I Hate Love PDF
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href="https://www.shreyashsrivastava.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--subtle)] text-xs font-medium text-[var(--text-main)] hover:border-[var(--brand)] transition-colors"
              >
                <span>Portfolio</span>
                <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href="https://github.com/ShreyashSrivastavaa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--subtle)] text-xs font-medium text-[var(--text-main)] hover:border-[var(--brand)] transition-colors"
              >
                <span>GitHub</span>
                <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href="https://www.linkedin.com/in/shreyashsrivastavaa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--subtle)] text-xs font-medium text-[var(--text-main)] hover:border-[var(--brand)] transition-colors"
              >
                <span>LinkedIn</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed pt-3 border-t border-[var(--border)]">
            I built I Hate Love PDF after growing frustrated with mainstream PDF websites that charge recurring subscriptions, limit file sizes, bombard users with ads, and force sensitive personal documents onto third party servers. Here, everything runs on your device, completely free.
          </p>
        </section>

        {/* FAQ SECTION */}
        <section className="space-y-3 max-w-2xl mx-auto">
          <h2 className="text-lg sm:text-xl font-bold text-center text-[var(--text-main)]">
            Frequently Asked Questions
          </h2>

          <div className="space-y-2.5">
            <details className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
              <summary className="cursor-pointer text-xs sm:text-sm font-semibold text-[var(--text-main)]">
                Is I Hate Love PDF really free to use?
              </summary>
              <p className="mt-2 text-xs text-[var(--text-muted)] leading-relaxed">
                Yes. Every single tool on the site is 100% free with no hidden charges, trial periods, or mandatory payments.
              </p>
            </details>

            <details className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
              <summary className="cursor-pointer text-xs sm:text-sm font-semibold text-[var(--text-main)]">
                Why should I buy a coffee?
              </summary>
              <p className="mt-2 text-xs text-[var(--text-muted)] leading-relaxed">
                Your tips help cover ongoing domain registration, fast edge CDN distribution, and the continuous time spent implementing new tools and optimizations.
              </p>
            </details>

            <details className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
              <summary className="cursor-pointer text-xs sm:text-sm font-semibold text-[var(--text-main)]">
                Do I need a Buy Me a Coffee account to tip?
              </summary>
              <p className="mt-2 text-xs text-[var(--text-muted)] leading-relaxed">
                No account is required. You can support the project using credit card, debit card, Apple Pay, Google Pay, or local payment methods in seconds.
              </p>
            </details>
            <details className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
              <summary className="cursor-pointer text-xs sm:text-sm font-semibold text-[var(--text-main)]">
                Can I tip using UPI (Google Pay, PhonePe, Paytm)?
              </summary>
              <p className="mt-2 text-xs text-[var(--text-muted)] leading-relaxed">
                Yes! If you prefer using UPI or Indian payment methods, you can support via our <Link href="/buy-me-a-chai" className="text-[var(--brand)] underline">Buy Me a Chai</Link> page directly at <a href="https://buymeachai.in/shreyashsrivastava" target="_blank" rel="noopener noreferrer" className="text-[var(--brand)] underline">buymeachai.in/shreyashsrivastava</a>.
              </p>
            </details>
          </div>
        </section>

        {/* SECONDARY BOTTOM CTA */}
        <section className="text-center pt-6 border-t border-[var(--border)] space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-[var(--text-main)]">
            Ready to show your appreciation?
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://buymeacoffee.com/shreyashsrivastavaa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FFDD00] hover:bg-[#ffea40] text-neutral-900 font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
            >
              <Coffee className="h-4 w-4 text-neutral-900" />
              <span>Support on Buy Me a Coffee</span>
            </a>
            <a
              href="https://buymeachai.in/shreyashsrivastava"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
            >
              <Coffee className="h-4 w-4 text-white" />
              <span>Support on Buy Me a Chai (UPI)</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
