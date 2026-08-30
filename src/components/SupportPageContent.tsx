"use client";

import Link from "next/link";
import { Heart, Sparkles, ShieldCheck, Leaf } from "lucide-react";
import { useDictionary } from "../i18n/LocaleProvider";
import DonationWidget from "./DonationWidget";

const REASON_ICONS = [Heart, Sparkles, ShieldCheck];
const REASON_COLORS = [
  "text-rose-500 bg-rose-500/10 border-rose-500/20",
  "text-amber-500 bg-amber-500/10 border-amber-500/20",
  "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
];

export function SupportPageContent() {
  const dictionary = useDictionary();
  const {
    pages: { support },
  } = dictionary;
  const { hero, reasons, transparency, faq, closing, legalNotice } = support;

  const cleanEyebrow = hero.eyebrow ? hero.eyebrow.replace(/^[^\w\d\s\u00C0-\u024F\u0400-\u04FF]+\s*/, "") : "Independent Open Source Project";

  return (
    <div className="min-h-screen bg-[var(--bg)] relative text-[var(--tx)]">
      <div className="container mx-auto px-4 py-12 sm:py-16 max-w-4xl space-y-16">
        {/* Hero section */}
        <section className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="flex items-center justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-border)] bg-[var(--accent-soft)] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
              <Leaf className="h-3.5 w-3.5 text-emerald-500" />
              <span>{cleanEyebrow}</span>
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-balance leading-tight">{hero.title}</h1>
          <p className="text-base sm:text-lg text-[var(--tx-2)] text-balance leading-relaxed">
            {hero.subtitle}
          </p>
          <p className="pt-2 text-xs sm:text-sm text-[var(--tx-3)] italic">
            {hero.highlight}
          </p>
        </section>

        {/* 3-column reasons with clean icons */}
        <section className="space-y-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center tracking-tight">{reasons.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reasons.cards.map((card, idx) => {
              const IconComp = REASON_ICONS[idx % REASON_ICONS.length] || Sparkles;
              const colorClass = REASON_COLORS[idx % REASON_COLORS.length];
              return (
                <div key={card.title} className="surface-card rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 sm:p-7 text-center space-y-3 hover:border-[var(--accent-border)] transition-all">
                  <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border shadow-xs ${colorClass}`}>
                    <IconComp className="h-7 w-7" />
                  </div>
                  <h3 className="text-base font-bold text-[var(--tx)]">{card.title}</h3>
                  <p className="text-[var(--tx-2)] text-xs sm:text-sm leading-relaxed">{card.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Donation Widget section */}
        <section className="my-20">
          <DonationWidget />
        </section>

        {/* Transparency - simple list */}
  <section id="support-transparency" className="my-20 max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-6 text-center">{transparency.title}</h2>
          <ul className="space-y-3">
            {transparency.items.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="text-[var(--accent)] mt-1">•</span>
                <p className="text-sm text-[var(--tx-2)] leading-relaxed">{item}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ - minimal */}
        <section className="my-20 max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-6 text-center">{faq.title}</h2>
          <div className="space-y-4">
            {faq.entries.map(({ question, answer }) => (
              <details key={question} className="surface-card p-5 rounded-lg">
                <summary className="cursor-pointer text-sm font-semibold text-[var(--tx)]">
                  {question}
                </summary>
                <p className="mt-3 text-sm text-[var(--tx-2)] leading-relaxed">{answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Closing - warm and simple */}
        <section className="my-20 text-center">
          <h2 className="text-2xl font-semibold mb-4">{closing.title}</h2>
          <p className="text-[var(--tx-2)] max-w-xl mx-auto leading-relaxed mb-6">
            {closing.description}
          </p>
          {closing.ctaLabel && closing.ctaHref ? (
            closing.ctaHref.startsWith("/") ? (
              <Link
                href={closing.ctaHref}
                className="inline-flex items-center justify-center rounded-md border border-[var(--ui)] px-5 py-2 text-sm font-medium transition hover:bg-[var(--ui)]/30"
              >
                {closing.ctaLabel}
              </Link>
            ) : (
              <a
                href={closing.ctaHref}
                className="inline-flex items-center justify-center rounded-md border border-[var(--ui)] px-5 py-2 text-sm font-medium transition hover:bg-[var(--ui)]/30"
              >
                {closing.ctaLabel}
              </a>
            )
          ) : null}
        </section>

        {legalNotice ? (
          <section className="mt-16 max-w-2xl mx-auto text-left text-xs text-[var(--tx-3)] leading-relaxed border-t border-[var(--ui)]/60 pt-6">
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] mb-3 text-[var(--tx-3)]">
              {legalNotice.title}
            </h3>
            <ul className="space-y-2">
              {legalNotice.points.map((point) => (
                <li key={point}>• {point}</li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </div>
  );
}