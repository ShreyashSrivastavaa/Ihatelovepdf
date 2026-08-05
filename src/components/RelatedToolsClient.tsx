'use client';

import Link from "next/link";
import { ArrowRight } from "lucide-react";
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

export default function RelatedToolsClient({ currentMode }: { currentMode: string }) {
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

      {/* Share prompt after related tools */}
      <div className="pt-2">
        <ShareButton variant="banner" />
      </div>
    </section>
  );
}
