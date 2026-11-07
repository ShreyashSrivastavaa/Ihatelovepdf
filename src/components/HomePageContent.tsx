import React from 'react';
import Image from 'next/image';
import type { Dictionary } from '../i18n/dictionaries/dictionary-types';
import { TOOL_DESCRIPTIONS } from './ToolSwitcher';
import { OPERATIONS_CATALOG } from '../i18n/operations-catalog';
import FaqSection from './faq-section';
import DynamicPdfProcessor from './DynamicPdfProcessor';
import HomeToolsExplorer, { type ToolExplorerItem } from './HomeToolsExplorer';
import { Lock, Zap, ShieldCheck, Upload } from 'lucide-react';

interface HomePageContentProps {
  dictionary: Dictionary;
}

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

const KEYWORD_PILLS_MAP: Record<string, string[]> = {
  en: ['No Watermark', 'No Sign-Up', 'Zero Uploads', 'Runs in Browser', 'Unlimited'],
  es: ['Sin Marcas de Agua', 'Sin Registro', 'Sin Subir Archivos', 'En tu Navegador', 'Ilimitado'],
  pt: ['Sem Marca d\'Água', 'Sem Cadastro', 'Zero Uploads', 'No Navegador', 'Ilimitado'],
  de: ['Ohne Wasserzeichen', 'Ohne Registrierung', 'Kein Server-Upload', 'Im Browser', 'Unbegrenzt'],
  fr: ['Sans Filigrane', 'Sans Inscription', 'Zéro Téléversement', 'Dans le Navigateur', 'Illimité'],
  it: ['Senza Filigrana', 'Senza Registrazione', 'Zero Upload', 'Nel Browser', 'Illimitato'],
  ro: ['Fără Filigran', 'Fără Înregistrare', 'Fără Încărcare', 'În Browser', 'Nelimitat'],
  ru: ['Без водяных знаков', 'Без регистрации', 'Без загрузки', 'В браузере', 'Без ограничений'],
  hu: ['Vízjel nélkül', 'Regisztráció nélkül', 'Feltöltés nélkül', 'Böngészőben fut', 'Korlátlan'],
};

export function HomePageContent({ dictionary }: HomePageContentProps) {
  const { routes, components } = dictionary;

  // Prepare serializable tool items for the client explorer
  const operationKeys = Object.keys(routes.operations);

  const allTools: ToolExplorerItem[] = operationKeys.map((key) => {
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

  return (
    <div className="w-full">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-8 md:py-16">
        
        {/* 1. HERO SECTION: Minimal, text-first, utilitarian */}
        <section className="text-center pt-2 sm:pt-6 lg:pt-12 mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Image
              src="/images/stickers/ihatelove.png"
              alt="ihatelovepdf"
              width={48}
              height={48}
              className="object-contain w-9 h-9 sm:w-12 sm:h-12"
              unoptimized
            />
          </div>

          <h1 className="text-[clamp(1.85rem,6vw,3.25rem)] font-black text-primary tracking-tight mb-2 leading-tight px-4">
            ihatelovepdf
          </h1>

          <p className="text-secondary text-[clamp(0.95rem,2.5vw,1.125rem)] max-w-xl mx-auto px-4 leading-relaxed">
            {dictionary.pages.home.hero.subtitle || "Free PDF tools that run entirely in your browser."}
          </p>

          <p className="text-xs text-secondary/80 mt-2 font-medium tracking-wide px-4">
            {(KEYWORD_PILLS_MAP[dictionary.locale] || KEYWORD_PILLS_MAP['en']).join(' · ')}
          </p>
        </section>

        {/* 2. TOOLS EXPLORER (Toolbar, Filters & Grid) */}
        <HomeToolsExplorer tools={allTools} />

        {/* 3. QUICK IN-BROWSER PROCESSOR CONTAINER */}
        <section id="processor-main" className="mb-14 md:mb-20">
          <div className="border border-border rounded-[12px] bg-main p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-border">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-primary tracking-tight">
                  Quick In-Browser Processor
                </h3>
                <p className="text-xs sm:text-sm text-secondary mt-0.5">
                  Drop your files here to start working directly, or choose from any tool above.
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-alt text-xs font-medium text-secondary">
                <Upload className="w-3.5 h-3.5 text-brand" />
                <span>Runs 100% locally</span>
              </div>
            </div>

            <div className="pt-6">
              <DynamicPdfProcessor />
            </div>
          </div>
        </section>

        {/* 4. VALUE PROPOSITION: Understated 3-column cards */}
        <section className="mb-14 md:mb-20 border-t border-border pt-12">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl font-bold tracking-tight text-primary">
              Why ihatelovepdf?
            </h2>
            <p className="text-sm text-secondary mt-1">
              A toolkit built for privacy, simplicity, and speed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="p-6 border border-border rounded-[12px] bg-main hover:border-hover transition-colors">
              <div className="w-8 h-8 rounded-lg bg-alt border border-border flex items-center justify-center text-primary mb-3">
                <Lock className="w-4 h-4 text-brand" />
              </div>
              <h3 className="text-sm font-bold text-primary mb-1">100% Client-Side Privacy</h3>
              <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                Your PDF files never leave your computer. All processing happens entirely within your browser memory via WebAssembly.
              </p>
            </div>

            <div className="p-6 border border-border rounded-[12px] bg-main hover:border-hover transition-colors">
              <div className="w-8 h-8 rounded-lg bg-alt border border-border flex items-center justify-center text-primary mb-3">
                <Zap className="w-4 h-4 text-accent" />
              </div>
              <h3 className="text-sm font-bold text-primary mb-1">Zero Paywalls or Limits</h3>
              <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                No subscription upsells, no document caps, and no email sign-ups. Free tools meant to get out of your way.
              </p>
            </div>

            <div className="p-6 border border-border rounded-[12px] bg-main hover:border-hover transition-colors">
              <div className="w-8 h-8 rounded-lg bg-alt border border-border flex items-center justify-center text-primary mb-3">
                <ShieldCheck className="w-4 h-4 text-success" />
              </div>
              <h3 className="text-sm font-bold text-primary mb-1">Instant &amp; In-Browser</h3>
              <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                No waiting in upload queues. Keeps working without an internet connection once the page has loaded.
              </p>
            </div>
          </div>
        </section>

        {/* 5. FAQ ACCORDION */}
        <section className="border-t border-border pt-10">
          <FaqSection />
        </section>

      </div>
    </div>
  );
}
