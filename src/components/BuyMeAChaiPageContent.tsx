'use client';

import React from 'react';
import Link from 'next/link';
import { Coffee, ShieldCheck, Heart, ExternalLink, ArrowRight, Zap, Smartphone } from 'lucide-react';

export function BuyMeAChaiPageContent() {
  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16 space-y-10">
        {/* HERO SECTION */}
        <section className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-xs font-semibold text-orange-600 dark:text-orange-400">
            <Coffee className="h-3.5 w-3.5" />
            <span>Support via UPI &amp; Cards</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-main)] leading-tight">
            Buy Me a Chai
          </h1>

          <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
            I Hate Love PDF is free, private, and processes your documents directly inside your web browser. Built and maintained by Shreyash Srivastava. Supporting with a warm cup of chai keeps the platform completely free, ultra-fast, and accessible to everyone.
          </p>

          {/* LARGE PRIMARY CALL TO ACTION BUTTON */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://buymeachai.in/shreyashsrivastava"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              <Coffee className="h-4.5 w-4.5 text-white stroke-[2.2]" />
              <span>Buy me a chai on buymeachai.in</span>
              <ExternalLink className="h-3.5 w-3.5 text-white/90" />
            </a>

            <Link
              href="/buy-me-a-coffee"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--brand)] text-[var(--text-main)] font-semibold text-xs sm:text-sm transition-colors"
            >
              <span>Prefer international cards? Buy Me a Coffee</span>
              <ArrowRight className="h-3.5 w-3.5 text-[var(--text-muted)]" />
            </Link>
          </div>

          {/* UPI & PAYMENT BADGE */}
          <div className="pt-1 flex items-center justify-center gap-2 text-xs text-[var(--text-muted)]">
            <Smartphone className="h-3.5 w-3.5 text-orange-500" />
            <span>Supports UPI (Google Pay, PhonePe, Paytm, BHIM), Indian Cards &amp; Net Banking</span>
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
              Your sensitive documents never leave your computer or phone. All operations run directly in your browser memory.
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] text-center space-y-2.5">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Zap className="h-5 w-5 stroke-[2]" />
            </div>
            <h2 className="text-sm sm:text-base font-bold text-[var(--text-main)]">Instant UPI Checkout</h2>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Scan with any UPI application or use your Indian debit and credit cards without complex overseas conversion fees.
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] text-center space-y-2.5">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--brand)]/20 bg-[var(--brand-soft)] text-[var(--brand)]">
              <Heart className="h-5 w-5 stroke-[2]" />
            </div>
            <h2 className="text-sm sm:text-base font-bold text-[var(--text-main)]">Independent Developer</h2>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Built and maintained with care by Shreyash Srivastava. Every contribution directly funds domain hosting, CDN, and ongoing feature development.
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
            I built I Hate Love PDF to provide a transparent, private alternative to mainstream PDF editors that lock basic functions behind paywalls and upload personal files to third-party clouds. Your support directly sustains this independent vision.
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
                What is Buy Me a Chai?
              </summary>
              <p className="mt-2 text-xs text-[var(--text-muted)] leading-relaxed">
                Buy Me a Chai (buymeachai.in) is a creator tipping platform built for seamless contributions using Indian payment methods such as UPI, RuPay, and domestic debit and credit cards.
              </p>
            </details>

            <details className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
              <summary className="cursor-pointer text-xs sm:text-sm font-semibold text-[var(--text-main)]">
                Which payment apps can I use?
              </summary>
              <p className="mt-2 text-xs text-[var(--text-muted)] leading-relaxed">
                You can use any UPI app, including Google Pay, PhonePe, Paytm, BHIM, Cred, Amazon Pay, or any bank UPI handle, as well as cards and net banking.
              </p>
            </details>

            <details className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
              <summary className="cursor-pointer text-xs sm:text-sm font-semibold text-[var(--text-main)]">
                How is payment security handled?
              </summary>
              <p className="mt-2 text-xs text-[var(--text-muted)] leading-relaxed">
                All contributions are handled externally and securely by Buy Me a Chai (buymeachai.in). ihatelovepdf never receives, processes, or sees your payment details or financial information.
              </p>
            </details>

            <details className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
              <summary className="cursor-pointer text-xs sm:text-sm font-semibold text-[var(--text-main)]">
                Can international users support via Buy Me a Chai?
              </summary>
              <p className="mt-2 text-xs text-[var(--text-muted)] leading-relaxed">
                If your card is accepted, you can contribute directly. Alternatively, international supporters can visit our <Link href="/buy-me-a-coffee" className="text-[var(--brand)] underline">Buy Me a Coffee</Link> page, which accepts international credit cards, Apple Pay, and Google Pay worldwide.
              </p>
            </details>
          </div>
        </section>

        {/* SECONDARY BOTTOM CTA */}
        <section className="text-center pt-6 border-t border-[var(--border)] space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-[var(--text-main)]">
            Ready to show your appreciation?
          </h2>
          <a
            href="https://buymeachai.in/shreyashsrivastava"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
          >
            <Coffee className="h-4 w-4 text-white" />
            <span>Support Shreyash on Buy Me a Chai</span>
          </a>
        </section>
      </div>
    </div>
  );
}

