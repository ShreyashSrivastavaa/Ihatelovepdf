"use client";

import Link from "next/link";
import { Heart, Sparkles, ShieldCheck, Leaf, Coffee, ExternalLink } from "lucide-react";
import { useDictionary } from "../i18n/LocaleProvider";

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
    <div className="min-h-screen bg-[var(--bg-main)] relative text-[var(--text-main)]">
      <div className="container mx-auto px-4 py-12 sm:py-16 max-w-4xl space-y-12">
        {/* Hero section */}
        <section className="text-center space-y-3.5 max-w-2xl mx-auto">
          <div className="flex items-center justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--brand)]/20 bg-[var(--brand-soft)] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--brand)]">
              <Leaf className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{cleanEyebrow}</span>
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-balance leading-tight">{hero.title}</h1>
          <p className="text-base sm:text-lg text-[var(--text-muted)] text-balance leading-relaxed">
            {hero.subtitle}
          </p>
          <p className="pt-1 text-xs text-[var(--text-muted)] italic">
            {hero.highlight}
          </p>
        </section>

        {/* 3-column reasons with clean icons */}
        <section className="space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-center tracking-tight text-[var(--text-main)]">{reasons.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {reasons.cards.map((card, idx) => {
              const IconComp = REASON_ICONS[idx % REASON_ICONS.length] || Sparkles;
              const colorClass = REASON_COLORS[idx % REASON_COLORS.length];
              return (
                <div key={card.title} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6 text-center space-y-2.5 hover:border-[var(--brand)] transition-colors">
                  <div className={`mx-auto flex h-10 w-10 items-center justify-center rounded-xl border ${colorClass}`}>
                    <IconComp className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-[var(--text-main)]">{card.title}</h3>
                  <p className="text-[var(--text-muted)] text-xs leading-relaxed">{card.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Buy Me a Coffee & Buy Me a Chai section */}
        <section className="text-center rounded-2xl border border-[var(--border)] p-6 sm:p-10 space-y-4 bg-[var(--card)]">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-xs font-semibold text-amber-600 dark:text-amber-400">
            <Coffee className="h-3.5 w-3.5" />
            <span>Support The Project</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--text-main)]">
            Support Independent Development
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-lg mx-auto leading-relaxed">
            I Hate Love PDF is 100% free, private, and runs directly inside your web browser. Built and maintained by Shreyash Srivastava. Your support keeps the platform free, fast, and accessible to everyone worldwide.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://buymeacoffee.com/shreyashsrivastavaa"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-[#FFDD00] hover:bg-[#ffea40] text-neutral-900 font-bold text-sm shadow-sm transition-all cursor-pointer"
            >
              <Coffee className="h-4.5 w-4.5 text-neutral-900 stroke-[2.2]" />
              <span>Buy me a coffee</span>
              <ExternalLink className="h-3.5 w-3.5 text-neutral-800" />
            </a>

            <a
              href="https://buymeachai.in/shreyashsrivastava"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-sm shadow-sm transition-all cursor-pointer"
            >
              <Coffee className="h-4.5 w-4.5 text-white stroke-[2.2]" />
              <span>Buy me a chai (UPI / Cards)</span>
              <ExternalLink className="h-3.5 w-3.5 text-white/90" />
            </a>
          </div>
        </section>

        {/* Support Our Other Products Spotlight */}
        <section className="rounded-2xl border border-[var(--border)] p-6 sm:p-8 space-y-5 bg-[var(--card)]">
          <div className="text-center space-y-1.5 max-w-lg mx-auto">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--brand)] block">
              Developer Ecosystem
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-main)]">
              Explore Our Other Platforms
            </h2>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Check out our companion platforms built for developers, computer science students, and distributed system architects:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            <a
              href="https://gitfc.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl border border-[var(--border)] bg-[var(--subtle)] hover:border-amber-500/50 transition-all space-y-1.5 group"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs sm:text-sm text-[var(--text-main)] group-hover:text-amber-500 transition-colors">
                  GitFC ⚽
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-md bg-amber-500/10 text-amber-500 font-bold">
                  EA FC Cards
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed line-clamp-2">
                Turn your GitHub into an authentic EA FC card with OVR ratings and radar stats.
              </p>
              <span className="text-xs font-medium text-amber-500 flex items-center gap-1 pt-0.5">
                <span>Visit gitfc.vercel.app</span>
                <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
              </span>
            </a>

            <a
              href="https://www.snapdevcode.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl border border-[var(--border)] bg-[var(--subtle)] hover:border-cyan-500/50 transition-all space-y-1.5 group"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs sm:text-sm text-[var(--text-main)] group-hover:text-cyan-500 transition-colors">
                  SnapDevCode
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-500 font-bold">
                  OA Suite &amp; DSA
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed line-clamp-2">
                4,200+ Company Online Assessment questions, Gemini AI vision extractor, and DSA visualizers.
              </p>
              <span className="text-xs font-medium text-cyan-500 flex items-center gap-1 pt-0.5">
                <span>Visit snapdevcode.com</span>
                <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
              </span>
            </a>

            <a
              href="https://systemdesign.website/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl border border-[var(--border)] bg-[var(--subtle)] hover:border-sky-500/50 transition-all space-y-1.5 group"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs sm:text-sm text-[var(--text-main)] group-hover:text-sky-500 transition-colors">
                  SystemDesign.website
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-md bg-sky-500/10 text-sky-500 font-bold">
                  HLD Masterclass
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed line-clamp-2">
                61+ interactive modules mastering microservices, sharding, caching, and cloud architecture.
              </p>
              <span className="text-xs font-medium text-sky-500 flex items-center gap-1 pt-0.5">
                <span>Visit systemdesign.website</span>
                <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
              </span>
            </a>
          </div>

          <div className="text-center pt-1">
            <Link
              href="/products"
              className="text-xs font-semibold text-[var(--brand)] hover:underline inline-flex items-center gap-1"
            >
              <span>View full product ecosystem details</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </section>

        {/* Transparency - simple list */}
        <section id="support-transparency" className="max-w-2xl mx-auto space-y-4">
          <h2 className="text-lg sm:text-xl font-bold mb-4 text-center text-[var(--text-main)]">{transparency.title}</h2>
          <ul className="space-y-2.5">
            {transparency.items.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="text-[var(--brand)] font-bold">•</span>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">{item}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ - minimal */}
        <section className="max-w-2xl mx-auto space-y-4">
          <h2 className="text-lg sm:text-xl font-bold mb-4 text-center text-[var(--text-main)]">{faq.title}</h2>
          <div className="space-y-2.5">
            {faq.entries.map(({ question, answer }) => (
              <details key={question} className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                <summary className="cursor-pointer text-xs sm:text-sm font-semibold text-[var(--text-main)]">
                  {question}
                </summary>
                <p className="mt-2 text-xs text-[var(--text-muted)] leading-relaxed">{answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Closing - warm and simple */}
        <section className="text-center space-y-3 pt-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-main)]">{closing.title}</h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-lg mx-auto leading-relaxed">
            {closing.description}
          </p>
          {closing.ctaLabel && closing.ctaHref ? (
            closing.ctaHref.startsWith("/") ? (
              <Link
                href={closing.ctaHref}
                className="inline-flex items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--card)] hover:border-[var(--brand)] px-4 py-2 text-xs font-medium text-[var(--text-main)] transition-colors"
              >
                {closing.ctaLabel}
              </Link>
            ) : (
              <a
                href={closing.ctaHref}
                className="inline-flex items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--card)] hover:border-[var(--brand)] px-4 py-2 text-xs font-medium text-[var(--text-main)] transition-colors"
              >
                {closing.ctaLabel}
              </a>
            )
          ) : null}
        </section>

        {legalNotice ? (
          <section className="max-w-2xl mx-auto text-left text-xs text-[var(--text-muted)] leading-relaxed border-t border-[var(--border)] pt-5">
            <h3 className="text-xs font-bold uppercase tracking-wider mb-2 text-[var(--text-muted)]">
              {legalNotice.title}
            </h3>
            <ul className="space-y-1.5 text-[11px]">
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