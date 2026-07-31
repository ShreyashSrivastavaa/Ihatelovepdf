import PDFProcessor from "./pdf-processor";
import type { Dictionary } from "../i18n/dictionaries/dictionary-types";
import { ShieldCheck, Zap, Laptop, Lock, CheckCircle2 } from "lucide-react";
import FaqSection from "./faq-section";
import QuickToolSelector, { type QuickToolLink } from "./QuickToolSelector";

export function HomePageContent({ dictionary }: { dictionary: Dictionary }) {
  const {
    pages: { home },
    routes,
  } = dictionary;

  const toolQuickLinks: QuickToolLink[] = [
    { key: "merge", label: dictionary.components.footer.operations.merge, href: routes.operations.merge },
    { key: "compress", label: dictionary.components.footer.operations.compress, href: routes.operations.compress },
    { key: "split", label: dictionary.components.footer.operations.split, href: routes.operations.split },
    { key: "extract", label: dictionary.components.footer.operations.extract, href: routes.operations.extract },
    { key: "crop", label: dictionary.components.footer.operations.crop, href: routes.operations.crop },
    { key: "rotate", label: dictionary.components.footer.operations.rotate, href: routes.operations.rotate },
    { key: "reorder", label: dictionary.components.footer.operations.reorder, href: routes.operations.reorder },
    { key: "pdfToImages", label: dictionary.components.footer.operations.pdfToImages, href: routes.operations.pdfToImages },
    { key: "imagesToPdf", label: dictionary.components.footer.operations.imagesToPdf, href: routes.operations.imagesToPdf },
  ];

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
          <div className="pt-2 flex flex-wrap justify-center gap-2">
            {home.hero.badges.map((badge) => (
              <span 
                key={badge} 
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border border-[var(--border)] bg-[var(--bg-card)] text-xs font-medium text-[var(--tx-2)] shadow-xs"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-[var(--accent)]" />
                {badge}
              </span>
            ))}
          </div>
        </section>

        {/* QUICK TOOL SELECTOR COMPONENT */}
        <QuickToolSelector links={toolQuickLinks} />

        {/* CENTERPIECE PDF PROCESSOR UI CONTAINER */}
        <section className="relative">
          <PDFProcessor />
        </section>

        {/* WHY PDFHELP / VALUE PROPOSITION */}
        <section className="py-8 border-t border-[var(--border)]">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--tx)]">
              {home.why.title}
            </h2>
            <p className="text-sm text-[var(--tx-2)]">
              Designed for professionals who demand total data sovereignty, zero speed bottlenecks, and privacy guarantees.
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

        {/* HOW IT WORKS / PIPELINE */}
        <section className="py-8 border-t border-[var(--border)] space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--tx)]">
              How Local Processing Works
            </h2>
            <p className="text-sm text-[var(--tx-2)]">
              Three simple steps executed entirely inside your modern Web browser engine.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative">
            <div className="surface-card p-6 space-y-3 relative">
              <span className="text-xs font-mono font-bold text-[var(--accent)] bg-[var(--accent-soft)] px-2.5 py-1 rounded-md border border-[var(--accent-border)] inline-block">
                01
              </span>
              <h3 className="text-base font-bold text-[var(--tx)]">Drag & Drop Files</h3>
              <p className="text-xs sm:text-sm text-[var(--tx-2)] leading-relaxed">
                Drop your PDF or image files into the upload box. Your browser loads the file into local memory space.
              </p>
            </div>

            <div className="surface-card p-6 space-y-3 relative">
              <span className="text-xs font-mono font-bold text-[var(--accent)] bg-[var(--accent-soft)] px-2.5 py-1 rounded-md border border-[var(--accent-border)] inline-block">
                02
              </span>
              <h3 className="text-base font-bold text-[var(--tx)]">Local Web Workers</h3>
              <p className="text-xs sm:text-sm text-[var(--tx-2)] leading-relaxed">
                Background JavaScript Web Workers process, merge, split, or compress your files directly on your CPU.
              </p>
            </div>

            <div className="surface-card p-6 space-y-3 relative">
              <span className="text-xs font-mono font-bold text-[var(--success)] bg-[var(--success-soft)] px-2.5 py-1 rounded-md border border-[var(--success-border)] inline-block">
                03
              </span>
              <h3 className="text-base font-bold text-[var(--tx)]">Instant Download</h3>
              <p className="text-xs sm:text-sm text-[var(--tx-2)] leading-relaxed">
                Save your finished document instantly to your disk. No wait times, no bandwidth caps, zero tracking.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="pt-8 border-t border-[var(--border)]">
          <FaqSection />
        </section>

      </div>
    </div>
  );
}
