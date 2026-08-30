import PDFProcessor from "./pdf-processor";
import type { Dictionary } from "../i18n/dictionaries/dictionary-types";
import { ShieldCheck, Zap, Laptop, Lock, CheckCircle2 } from "lucide-react";
import FaqSection from "./faq-section";
import ToolSwitcher, { type ToolLink } from "./ToolSwitcher";

export function HomePageContent({ dictionary }: { dictionary: Dictionary }) {
  const {
    pages: { home },
    routes,
  } = dictionary;

  const tools: ToolLink[] = Object.keys(routes.operations).map((key) => ({
    key,
    label:
      dictionary.components.footer.operations[
        key as keyof typeof dictionary.components.footer.operations
      ] || key,
    href: routes.operations[key as keyof typeof routes.operations],
  }));

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--tx)]">
      <div className="mx-auto max-w-[1140px] px-4 sm:px-6 py-10 sm:py-16 space-y-16 sm:space-y-20">
        {/* HERO SECTION */}
        <section className="text-center space-y-6 max-w-4xl mx-auto">
          {/* Privacy Anchor Banner */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--success-border)] bg-[var(--success-soft)] text-xs sm:text-sm font-medium text-[var(--tx)] shadow-xs animate-fade-in">
            <ShieldCheck className="h-4 w-4 text-[var(--success)] shrink-0" />
            <span>Your files never leave your browser &bull; 100% Client-Side</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--tx)] leading-[1.1]">
            {home.hero.title}
          </h1>

          <p className="text-lg sm:text-xl text-[var(--tx-2)] max-w-2.5xl mx-auto font-normal leading-relaxed">
            {home.hero.subtitle}
          </p>

          {/* Badges Pill Bar */}
          <div className="pt-2 grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-2">
            {home.hero.badges.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md border border-[var(--border)] bg-[var(--bg-card)] text-xs font-medium text-[var(--tx-2)] shadow-xs"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-[var(--accent)]" />
                {badge}
              </span>
            ))}
          </div>
        </section>

        {/* TOOL SWITCHER (45+ Tools) */}
        <section className="max-w-4xl mx-auto">
          <ToolSwitcher tools={tools} activeKey="merge" />
        </section>

        {/* CENTERPIECE PDF PROCESSOR UI CONTAINER */}
        <section className="relative">
          <PDFProcessor />
        </section>

        {/* WHY ihatelovepdf / VALUE PROPOSITION */}
        <section className="py-8 border-t border-[var(--border)]">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--tx)]">
              {home.why.title}
            </h2>
            <p className="text-sm text-[var(--tx-2)]">
              Designed for professionals who demand total data sovereignty, zero speed bottlenecks, and privacy guarantees across all {tools.length}+ client-side PDF tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {home.why.cards.map((card, idx) => {
              const icons = [Lock, Zap, Laptop];
              const CardIcon = icons[idx % icons.length];
              return (
                <div
                  key={card.title}
                  className="surface-card p-6 sm:p-8 space-y-4 hover:border-[var(--accent-border)] transition-all duration-200"
                >
                  <div className="h-10 w-10 rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center border border-[var(--accent-border)]">
                    <CardIcon className="h-5 w-5 stroke-[1.75]" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--tx)]">{card.title}</h3>
                  <p className="text-sm text-[var(--tx-2)] leading-relaxed">{card.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQ ACCORDION */}
        <section className="py-8 border-t border-[var(--border)]">
          <FaqSection />
        </section>
      </div>
    </div>
  );
}
