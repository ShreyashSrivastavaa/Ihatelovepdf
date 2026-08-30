'use client';

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useDictionary } from "../i18n/LocaleProvider";
import { ShareButton } from "./ShareButton";

// Maps operations to contextually relevant next-action tools
const RELATED_TOOLS: Record<string, string[]> = {
  merge: ["compress", "split", "reorder", "watermark"],
  compress: ["merge", "split", "pdfToImages", "rotate"],
  split: ["merge", "extract", "compress", "reorder"],
  extract: ["merge", "compress", "extractText", "pageNumbers"],
  crop: ["rotate", "extract", "compress", "reorder"],
  rotate: ["crop", "extract", "reorder", "compress"],
  reorder: ["merge", "split", "pageNumbers", "compress"],
  pdfToImages: ["compress", "merge", "imagesToPdf", "pdfToZip"],
  imagesToPdf: ["compress", "merge", "pdfToImages", "rotate"],
  watermark: ["pageNumbers", "headersFooters", "decrypt", "compress"],
  pageNumbers: ["headersFooters", "watermark", "reorder", "compress"],
  headersFooters: ["pageNumbers", "watermark", "compress", "merge"],
  extractText: ["ocr", "pdfToExcel", "markdownToPdf", "compress"],
  invertColors: ["crop", "rotate", "extractText", "compress"],
  redact: ["decrypt", "ocr", "extractText", "compress"],
  compare: ["redact", "extractText", "merge", "compress"],
  decrypt: ["compress", "extractText", "merge", "watermark"],
  ocr: ["extractText", "pdfToExcel", "scanToPdf", "compress"],
  scanToPdf: ["ocr", "compress", "crop", "imagesToPdf"],
  markdownToPdf: ["htmlToPdf", "csvToPdf", "createPdf", "compress"],
  htmlToPdf: ["markdownToPdf", "pdfToHtml", "createPdf", "compress"],
  csvToPdf: ["excelToPdf", "pdfToExcel", "markdownToPdf", "compress"],
  createPdf: ["markdownToPdf", "htmlToPdf", "pageNumbers", "watermark"],
  excelToPdf: ["pdfToExcel", "csvToPdf", "compress", "merge"],
  pdfToExcel: ["excelToPdf", "csvToPdf", "extractText", "compress"],
  powerpointToPdf: ["pdfToPowerpoint", "pdfToImages", "compress", "merge"],
  pdfToPowerpoint: ["powerpointToPdf", "pdfToImages", "compress", "extract"],
  pdfToHtml: ["htmlToPdf", "extractText", "pdfToEpub", "compress"],
  pdfToEpub: ["ebookToPdf", "extractText", "invertColors", "compress"],
  ebookToPdf: ["pdfToEpub", "invertColors", "compress", "pageNumbers"],
  p2pShare: ["compress", "watermark", "decrypt", "merge"],
  whiteboard: ["editPdf", "scanToPdf", "compress", "merge"],
  gstInvoice: ["posBilling", "createPdf", "compress", "watermark"],
  posBilling: ["gstInvoice", "createPdf", "compress", "scanToPdf"],
};

export default function RelatedToolsClient({ currentMode }: { currentMode: string }) {
  const dictionary = useDictionary();
  const relatedKeys =
    RELATED_TOOLS[currentMode] ??
    ['compress', 'merge', 'watermark', 'pageNumbers'].filter((k) => k !== currentMode);

  if (relatedKeys.length === 0) return null;

  return (
    <section className="pt-8 border-t border-[var(--border)] space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight text-[var(--tx)]">
          What do you need next?
        </h2>
        <span className="text-xs text-[var(--tx-3)] font-medium hidden sm:inline">
          Explore all free &amp; private client-side PDF tools
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {relatedKeys.slice(0, 4).map((key) => {
          const op = dictionary.operations[key as keyof typeof dictionary.operations];
          const footerLabel =
            dictionary.components.footer.operations[
              key as keyof typeof dictionary.components.footer.operations
            ];
          const href =
            dictionary.routes.operations[
              key as keyof typeof dictionary.routes.operations
            ];
          if (!op || !href) return null;

          return (
            <Link
              key={key}
              href={href}
              prefetch={true}
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
