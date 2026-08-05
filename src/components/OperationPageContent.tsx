import PDFProcessor from "./pdf-processor";
import FaqSection from "./faq-section";
import type { OperationContent } from "../i18n/dictionaries/operation-types";
import { CheckCircle2, ShieldCheck, HelpCircle, Sparkles, ArrowRight } from "lucide-react";
import OperationToolSwitcherClient from "./OperationToolSwitcherClient";
import Link from "next/link";
import { useDictionary } from "../i18n/LocaleProvider";
import { ShareButton } from "./ShareButton";

// Maps each operation to 4 contextually relevant next-action tools
const RELATED_TOOLS: Record<string, string[]> = {
  merge:       ["compress", "split", "reorder", "extract"],
  compress:    ["merge", "split", "pdfToImages", "rotate"],
  split:       ["merge", "extract", "compress", "reorder"],
  extract:     ["merge", "compress", "reorder", "rotate"],
  crop:        ["rotate", "extract", "compress", "reorder"],
  rotate:      ["crop", "extract", "reorder", "compress"],
  reorder:     ["merge", "split", "extract", "compress"],
  pdfToImages: ["compress", "merge", "imagesToPdf", "split"],
  imagesToPdf: ["compress", "merge", "pdfToImages", "rotate"],
};

function RelatedToolsSection({ currentMode }: { currentMode: string }) {
  const dictionary = useDictionary();
  const relatedKeys = RELATED_TOOLS[currentMode] ?? [];

  if (relatedKeys.length === 0) return null;

  return (
    <section className="pt-8 border-t border-[var(--border)] space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight text-[var(--tx)]">
          What do you need next?
        </h2>
        <span className="text-xs text-[var(--tx-3)] font-medium hidden sm:inline">
          More free tools
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {relatedKeys.map((key) => {
          const op = dictionary.operations[key as keyof typeof dictionary.operations];
          const footerLabel = dictionary.components.footer.operations[key as keyof typeof dictionary.components.footer.operations];
          const href = dictionary.routes.operations[key as keyof typeof dictionary.routes.operations];
          if (!op || !href) return null;

          return (
            <Link
              key={key}
              href={href}
              id={`related-tool-${key}`}
              className="group surface-card p-4 space-y-2 hover:border-[var(--accent-border)] hover:shadow-sm transition-all duration-200 flex flex-col"
            >
              <span className="text-sm font-semibold text-[var(--tx)] group-hover:text-[var(--accent)] transition-colors leading-tight">
                {footerLabel}
              </span>
              <p className="text-xs text-[var(--tx-3)] leading-relaxed line-clamp-2 flex-1">
                {op.hero.description}
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                Open tool <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          );
        })}
      </div>

      {/* Share prompt after related tools — contextually placed */}
      <div className="pt-2">
        <ShareButton variant="banner" />
      </div>
    </section>
  );
}

export function OperationPageContent({
  operation,
}: {
  operation: OperationContent;
}) {
  const howToStructuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: operation.howTo.title,
    description: operation.hero.description,
    step: operation.howTo.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.length > 80 ? `${operation.howTo.title} - ${index + 1}` : step,
      text: step,
    })),
  };

  const webApplicationStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `${operation.hero.title} — ihatelovepdf`,
    description: operation.hero.description,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires a modern web browser with JavaScript enabled",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: operation.hero.bulletPoints,
    url: `https://ihatelovepdf.com`,
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--tx)]">
      <div className="mx-auto max-w-[1140px] px-4 sm:px-6 py-10 sm:py-14 space-y-12 sm:space-y-16">
        
        {/* HERO HEADER */}
        <section className="space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--success-border)] bg-[var(--success-soft)] text-xs font-medium text-[var(--tx)] shadow-xs">
            <ShieldCheck className="h-3.5 w-3.5 text-[var(--success)] shrink-0" />
            <span>100% Client-Side Local Processing &bull; Zero Cloud Uploads</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--tx)] leading-[1.15]">
            {operation.hero.title}
          </h1>

          <p className="text-base sm:text-lg text-[var(--tx-2)] max-w-3xl leading-relaxed">
            {operation.hero.description}
          </p>

          <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {operation.hero.bulletPoints.map((point) => (
              <div
                key={point}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-xs font-medium text-[var(--tx)] shadow-xs"
              >
                <CheckCircle2 className="h-4 w-4 text-[var(--accent)] shrink-0" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </section>

        {/* TOOL SWITCHER */}
        <section>
          <OperationToolSwitcherClient activeKey={operation.mode} />
        </section>

        {/* CENTERPIECE PROCESSOR */}
        <section className="relative">
          <PDFProcessor initialMode={operation.mode} />
        </section>

        {/* BENEFITS SECTION */}
        <section className="pt-6 border-t border-[var(--border)] space-y-8">
          <h2 className="text-2xl font-bold tracking-tight text-center text-[var(--tx)]">
            {operation.benefitsTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {operation.benefits.map((benefit) => (
              <div key={benefit.title} className="surface-card p-6 space-y-2 hover:border-[var(--accent-border)] transition-colors">
                <h3 className="text-base font-bold text-[var(--tx)] flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[var(--accent)] shrink-0" />
                  {benefit.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--tx-2)] leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* HOW TO SECTION */}
        <section className="surface-card p-6 sm:p-8 space-y-6">
          <h2 className="text-xl font-bold tracking-tight text-[var(--tx)] flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-[var(--accent)]" />
            {operation.howTo.title}
          </h2>
          <ol className="space-y-4">
            {operation.howTo.steps.map((step, index) => (
              <li key={`${operation.slug}-step-${index}`} className="flex items-start gap-3 text-sm text-[var(--tx-2)]">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-xs font-bold text-[var(--accent)] border border-[var(--accent-border)]">
                  {index + 1}
                </span>
                <span className="pt-0.5 leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
          {operation.howTo.note && (
            <p className="mt-4 text-xs text-[var(--tx-3)] italic border-t border-[var(--border)] pt-4">
              {operation.howTo.note}
            </p>
          )}
        </section>

        {/* USE CASES SECTION */}
        <section className="pt-6 border-t border-[var(--border)] space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-center text-[var(--tx)]">
            {operation.useCasesTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {operation.useCases.map((useCase) => (
              <div key={useCase} className="surface-card p-5 hover:border-[var(--border-hover)] transition-colors">
                <p className="text-xs sm:text-sm text-[var(--tx-2)] leading-relaxed flex items-start gap-2">
                  <span className="text-[var(--accent)] font-bold">&bull;</span>
                  {useCase}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* RELATED TOOLS CROSS-SELL */}
        <RelatedToolsSection currentMode={operation.mode} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToStructuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationStructuredData) }}
        />

        <FaqSection />
      </div>
    </div>
  );
}
