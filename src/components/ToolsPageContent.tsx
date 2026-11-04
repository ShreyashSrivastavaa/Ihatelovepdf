'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { useDictionary } from '../i18n/LocaleProvider';
import type { Dictionary } from '../i18n/dictionaries/dictionary-types';
import HomeToolsExplorer, { type ToolExplorerItem } from './HomeToolsExplorer';
import { TOOL_DESCRIPTIONS } from './ToolSwitcher';
import { OPERATIONS_CATALOG } from '../i18n/operations-catalog';
import FaqSection from './faq-section';

const CATEGORY_MAP: Record<string, string[]> = {
  Organize: ['merge', 'split', 'compress', 'extract', 'crop', 'rotate', 'reorder', 'pdfToZip'],
  Optimize: ['compress', 'crop', 'invertColors'],
  Convert: [
    'pdfToWord',
    'wordToPdf',
    'imagesToPdf',
    'pdfToImages',
    'excelToPdf',
    'pdfToExcel',
    'powerpointToPdf',
    'pdfToPowerpoint',
    'htmlToPdf',
    'pdfToHtml',
    'markdownToPdf',
    'csvToPdf',
    'pdfToEpub',
    'ebookToPdf',
  ],
  Edit: ['editPdf', 'fillPdfForm', 'watermark', 'pageNumbers', 'headersFooters'],
  Security: ['signPdf', 'redact', 'compare'],
  'AI-Powered': ['extractText', 'latexResume'],
  Workflows: ['scanToPdf', 'whiteboard', 'createPdf', 'gstInvoice', 'posBilling'],
};

const TOOL_BADGES: Record<string, string> = {
  extractText: 'AI · BYOK',
  latexResume: 'CLIENT-SIDE',
  merge: 'POPULAR',
  compress: 'POPULAR',
  split: 'POPULAR',
  pdfToWord: 'POPULAR',
  signPdf: 'SECURITY',
  redact: 'PRIVACY',
  scanToPdf: 'CAMERA',
  gstInvoice: 'BUSINESS',
  posBilling: 'RECEIPT',
};

export function ToolsPageContent({ dictionary: propDictionary }: { dictionary?: Dictionary } = {}) {
  const contextDictionary = useDictionary();
  const dictionary = propDictionary || contextDictionary;
  const { routes, components } = dictionary;

  const allTools: ToolExplorerItem[] = useMemo(() => {
    const operationKeys = Object.keys(routes.operations);

    return operationKeys.map((key) => {
      const name =
        components.footer.operations[key as keyof typeof components.footer.operations] ||
        OPERATIONS_CATALOG[key as keyof typeof OPERATIONS_CATALOG]?.label ||
        key;
      const description =
        TOOL_DESCRIPTIONS[key] ||
        OPERATIONS_CATALOG[key as keyof typeof OPERATIONS_CATALOG]?.description ||
        'Free, private client-side PDF utility';
      const href = routes.operations[key as keyof typeof routes.operations] || `/${key}`;
      const badge = TOOL_BADGES[key];

      let category = 'Other';
      for (const [catName, keys] of Object.entries(CATEGORY_MAP)) {
        if (keys.includes(key)) {
          category = catName;
          break;
        }
      }

      return {
        key,
        name,
        description,
        href,
        category,
        badge,
      };
    });
  }, [routes.operations, components.footer.operations]);

  return (
    <div className="w-full">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-8 md:py-16">
        
        {/* Utilitarian Header */}
        <section className="text-center pt-2 sm:pt-6 lg:pt-10 mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Image
              src="/images/stickers/ihatelove.png"
              alt="ihatelovepdf"
              width={40}
              height={40}
              className="object-contain w-9 h-9 sm:w-10 sm:h-10"
              unoptimized
            />
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-primary tracking-tight mb-2">
            All PDF Tools
          </h1>

          <p className="text-secondary text-base md:text-lg max-w-xl mx-auto">
            Browse all 36 free PDF tools. Everything runs locally in your browser with zero server uploads.
          </p>

          <p className="text-xs text-secondary/70 mt-2">
            100% Client-Side · Private &amp; Secure · Free Forever
          </p>
        </section>

        {/* Tools Explorer */}
        <HomeToolsExplorer tools={allTools} />

        {/* FAQ Section */}
        <section className="border-t border-border pt-10 mt-12">
          <FaqSection />
        </section>

      </div>
    </div>
  );
}
