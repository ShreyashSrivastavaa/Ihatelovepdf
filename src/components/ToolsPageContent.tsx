'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { useDictionary, useLocale } from '../i18n/LocaleProvider';
import type { Locale } from '../i18n/config';
import type { Dictionary } from '../i18n/dictionaries/dictionary-types';
import HomeToolsExplorer, { type ToolExplorerItem } from './HomeToolsExplorer';
import { TOOL_DESCRIPTIONS } from './ToolSwitcher';
import { OPERATIONS_CATALOG } from '../i18n/operations-catalog';
import FaqSection from './faq-section';

import Link from 'next/link';
import { ShieldCheck, Lock, Sparkles, FileText, ArrowRight } from 'lucide-react';

const TOOLS_PAGE_STRINGS: Record<Locale, { title: string; subtitle: string; badge: string }> = {
  en: {
    title: 'All PDF Tools',
    subtitle: 'Browse all 37 free PDF tools. Everything runs locally in your browser with zero server uploads.',
    badge: '100% Client-Side · Private & Secure · Free Forever',
  },
  es: {
    title: 'Todas las Herramientas PDF',
    subtitle: 'Explora las 37 herramientas gratuitas. Todo se procesa localmente en tu navegador sin subir archivos.',
    badge: '100% en el Navegador · Privado y Seguro · Siempre Gratis',
  },
  pt: {
    title: 'Todas as Ferramentas de PDF',
    subtitle: 'Navegue por todas as 37 ferramentas gratuitas. Tudo roda localmente no navegador sem envio de arquivos.',
    badge: '100% no Navegador · Privado e Seguro · Sempre Grátis',
  },
  de: {
    title: 'Alle PDF-Tools',
    subtitle: 'Entdecken Sie alle 37 kostenlosen PDF-Tools. Alles läuft lokal im Browser ohne Server-Uploads.',
    badge: '100% im Browser · Privat & Sicher · Für immer kostenlos',
  },
  it: {
    title: 'Tutti gli Strumenti PDF',
    subtitle: 'Esplora tutti i 37 strumenti PDF gratuiti. Tutto funziona localmente nel browser senza caricamenti.',
    badge: '100% nel Browser · Privato e Sicuro · Sempre Gratuito',
  },
  fr: {
    title: 'Tous les Outils PDF',
    subtitle: 'Découvrez les 37 outils PDF gratuits. Tout s’exécute localement dans le navigateur sans téléversement.',
    badge: '100% dans le Navigateur · Privé et Sécurisé · Gratuit pour toujours',
  },
  ro: {
    title: 'Toate Instrumentele PDF',
    subtitle: 'Descoperă toate cele 37 de instrumente PDF gratuite. Totul rulează local în browser fără încărcări.',
    badge: '100% în Browser · Privat și Sigur · Gratuit pentru totdeauna',
  },
  ru: {
    title: 'Все инструменты PDF',
    subtitle: 'Ознакомьтесь со всеми 37 бесплатными инструментами PDF. Все работает локально в браузере без загрузок на сервер.',
    badge: '100% в браузере · Конфиденциально и безопасно · Навсегда бесплатно',
  },
  hu: {
    title: 'Minden PDF Eszköz',
    subtitle: 'Böngésszen mind a 37 ingyenes PDF-eszköz között. Minden helyben fut a böngészőben szerverfeltöltés nélkül.',
    badge: '100% a böngészőben · Privát és biztonságos · Örökké ingyenes',
  },
};

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
  const currentLocale = useLocale();
  const locale = currentLocale;
  const dictionary = propDictionary || contextDictionary;
  const { routes, components } = dictionary;
  const pageStrings = TOOLS_PAGE_STRINGS[currentLocale] || TOOLS_PAGE_STRINGS.en;

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
  }, [routes, components]);

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
            {pageStrings.title}
          </h1>

          <p className="text-secondary text-base md:text-lg max-w-xl mx-auto">
            {pageStrings.subtitle}
          </p>

          <p className="text-xs text-secondary/70 mt-2">
            {pageStrings.badge}
          </p>
        </section>

        {/* Tools Explorer */}
        <HomeToolsExplorer tools={allTools} />

        {/* High-Intent Privacy & Architecture Guides */}
        <section className="border-t border-border pt-10 mt-12 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-primary tracking-tight">
              Privacy Architecture & Specialized Guides
            </h2>
            <Link
              href={locale === 'en' ? '/guides' : `/${locale}/guides`}
              className="text-xs font-semibold text-brand hover:underline inline-flex items-center gap-1"
            >
              <span>View All Guides</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Link
              href={locale === 'en' ? '/merge-pdf-without-uploading' : `/${locale}/merge-pdf-without-uploading`}
              className="p-4 rounded-xl border border-border bg-card hover:border-brand/40 transition-colors group flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Zero Uploads</span>
                </div>
                <h3 className="text-sm font-bold text-primary group-hover:text-brand transition-colors">
                  Merge Without Uploading
                </h3>
                <p className="text-xs text-secondary leading-relaxed">
                  How in-browser RAM merging guarantees your documents never leave your computer.
                </p>
              </div>
            </Link>

            <Link
              href={locale === 'en' ? '/pdf-tools-no-watermark' : `/${locale}/pdf-tools-no-watermark`}
              className="p-4 rounded-xl border border-border bg-card hover:border-brand/40 transition-colors group flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Clean Exports</span>
                </div>
                <h3 className="text-sm font-bold text-primary group-hover:text-brand transition-colors">
                  PDF Tools No Watermark
                </h3>
                <p className="text-xs text-secondary leading-relaxed">
                  Why ihatelovepdf will never stamp promotional branding or logos on your files.
                </p>
              </div>
            </Link>

            <Link
              href={locale === 'en' ? '/edit-pdf-for-resume' : `/${locale}/edit-pdf-for-resume`}
              className="p-4 rounded-xl border border-border bg-card hover:border-brand/40 transition-colors group flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Career & CV</span>
                </div>
                <h3 className="text-sm font-bold text-primary group-hover:text-brand transition-colors">
                  Edit Resume PDF Free
                </h3>
                <p className="text-xs text-secondary leading-relaxed">
                  Update job history, dates, and contact info without paying Adobe subscription fees.
                </p>
              </div>
            </Link>

            <Link
              href={locale === 'en' ? '/is-it-safe-to-merge-pdf-online' : `/${locale}/is-it-safe-to-merge-pdf-online`}
              className="p-4 rounded-xl border border-border bg-card hover:border-brand/40 transition-colors group flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Security Facts</span>
                </div>
                <h3 className="text-sm font-bold text-primary group-hover:text-brand transition-colors">
                  Is Online Merging Safe?
                </h3>
                <p className="text-xs text-secondary leading-relaxed">
                  Understand the true risks of cloud uploads vs local client-side WebAssembly execution.
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="border-t border-border pt-10 mt-12">
          <FaqSection />
        </section>

      </div>
    </div>
  );
}
