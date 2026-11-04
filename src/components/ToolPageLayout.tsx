'use client';

import React from 'react';
import Link from 'next/link';
import type { OperationContent } from '../i18n/dictionaries/operation-types';
import type { Locale } from '../i18n/config';
import { OPERATIONS_CATALOG } from '../i18n/operations-catalog';
import { ICON_MAP } from './ToolSwitcher';
import ToolFirstVisitBanner from './ToolFirstVisitBanner';
import OperationToolSwitcherClient from './OperationToolSwitcherClient';
import RelatedToolsClient from './RelatedToolsClient';
import FaqSection from './faq-section';
import NetworkActivityMonitor from './NetworkActivityMonitor';
import { QuickAnswerBox } from './QuickAnswerBox';
import { ToolComparisonTable } from './ToolComparisonTable';
import { useLocale } from '../i18n/LocaleProvider';
import { getOperationPath } from '../i18n/routing';
import { CheckCircle2, ShieldCheck, Sparkles, HelpCircle, Wrench, ChevronDown, ChevronRight, ArrowRight, BookOpen } from 'lucide-react';

const BREADCRUMB_HOME_LABELS: Record<Locale, string> = {
  en: 'Home',
  es: 'Inicio',
  pt: 'Início',
  de: 'Startseite',
  fr: 'Accueil',
  it: 'Home',
  ro: 'Acasă',
  ru: 'Главная',
  hu: 'Kezdőlap',
};

const BREADCRUMB_TOOLS_LABELS: Record<Locale, string> = {
  en: 'All Tools',
  es: 'Herramientas',
  pt: 'Ferramentas',
  de: 'Werkzeuge',
  fr: 'Outils',
  it: 'Strumenti',
  ro: 'Instrumente',
  ru: 'Инструменты',
  hu: 'Eszközök',
};

const RELATED_RESOURCES_MAP: Record<string, Array<{ title: string; href: string; type: 'Guide' | 'Article'; desc: string }>> = {
  merge: [
    { title: 'Merge PDF Without Uploading to Cloud Servers', href: '/merge-pdf-without-uploading', type: 'Guide', desc: 'Why in-browser RAM merging protects your sensitive financial & personal documents.' },
    { title: 'Is It Safe to Merge PDF Online?', href: '/is-it-safe-to-merge-pdf-online', type: 'Article', desc: 'The technical security facts about cloud uploads vs client-side WebAssembly.' },
    { title: 'How to Merge PDF Files for Free', href: '/guides/how-to-merge-pdf-files', type: 'Guide', desc: 'Step-by-step tutorial on combining reports, invoices, and forms in browser.' },
  ],
  compress: [
    { title: 'Free PDF Tools With No Watermark', href: '/pdf-tools-no-watermark', type: 'Article', desc: 'Why ihatelovepdf will never watermark your compressed documents.' },
    { title: 'Compress PDF Without Losing Quality', href: '/guides/how-to-compress-pdf-without-losing-quality', type: 'Guide', desc: 'Optimize DPI, downsample high-res photos, and maintain crisp text.' },
    { title: 'Compress PDF to Under 100KB Step by Step', href: '/blog/how-to-compress-pdf-to-under-100kb', type: 'Article', desc: 'Practical tips for government, university, and job application size limits.' },
  ],
  split: [
    { title: 'How to Split a PDF by Pages', href: '/guides/how-to-split-pdf-pages', type: 'Guide', desc: 'Extract custom page ranges and burst documents into separate single pages.' },
    { title: 'Split a PDF Document Online Free', href: '/blog/how-to-split-a-pdf-by-pages', type: 'Article', desc: 'Separate multi-page contracts and invoices in seconds without signups.' },
  ],
  editPdf: [
    { title: 'How to Edit a PDF Resume or CV Free', href: '/edit-pdf-for-resume', type: 'Guide', desc: 'Update dates, fix typos, and tweak career details without paying for Adobe Acrobat.' },
    { title: 'Free PDF Tools With No Watermark', href: '/pdf-tools-no-watermark', type: 'Article', desc: 'Clean, professional PDF edits with zero promotional branding.' },
  ],
  redact: [
    { title: 'How to Redact a PDF for Free', href: '/guides/how-to-redact-pdf-free', type: 'Guide', desc: 'Permanently remove personal data, SSNs, and account numbers from documents.' },
    { title: 'Permanently Redact PDF Online Without Cloud Storage', href: '/blog/how-to-permanently-redact-sensitive-pdf-data', type: 'Article', desc: 'Understand the difference between visual blackouts and permanent vector sanitization.' },
  ],
  signPdf: [
    { title: 'How to Sign a PDF on Mobile Free', href: '/blog/how-to-sign-a-pdf-on-mobile', type: 'Article', desc: 'Create and stamp valid electronic signatures right on your smartphone touchscreen.' },
    { title: 'Fill and Sign Interactive PDF Forms', href: '/fill-pdf-form', type: 'Guide', desc: 'Complete form fields and apply your signature directly in your browser.' },
  ],
  extractText: [
    { title: 'How to OCR a Scanned PDF Offline', href: '/guides/how-to-ocr-scanned-pdf-offline', type: 'Guide', desc: 'Extract editable text from scanned documents using local browser models.' },
    { title: 'Extract Scanned PDF Text Online Free', href: '/blog/how-to-convert-scanned-pdf-to-text', type: 'Article', desc: 'Copy tables and text from read-only PDF pages without retyping.' },
  ],
  pdfToImages: [
    { title: 'How to Convert PDF to JPG on Phone', href: '/blog/how-to-convert-pdf-to-jpg-on-phone', type: 'Article', desc: 'Export high-resolution JPG or PNG images from PDF pages without watermarks.' },
  ],
  imagesToPdf: [
    { title: 'How to Convert Images to PDF', href: '/guides/how-to-convert-images-to-pdf', type: 'Guide', desc: 'Turn photos, scans, and screenshot collections into a single organized PDF document.' },
  ],
  pdfToWord: [
    { title: 'How to Convert PDF to Word for Free', href: '/guides/how-to-convert-pdf-to-word-free', type: 'Guide', desc: 'Convert read-only documents into fully editable Microsoft Word (.docx) files.' },
  ],
  fillPdfForm: [
    { title: 'Fill PDF Forms Without Adobe Acrobat', href: '/blog/how-to-fill-pdf-forms-without-adobe-acrobat', type: 'Article', desc: 'Type into form fields, checkboxes, and radio buttons with zero subscription fees.' },
  ],
};

const DEFAULT_RELATED_RESOURCES = [
  { title: 'Explore All 37 Free PDF Tools', href: '/tools', type: 'Guide' as const, desc: 'Browse the full suite of client-side PDF utilities with zero file uploads.' },
  { title: 'Merge PDF Without Uploading', href: '/merge-pdf-without-uploading', type: 'Guide' as const, desc: 'Why in-browser RAM merging protects your sensitive documents.' },
  { title: 'Free PDF Tools With No Watermark', href: '/pdf-tools-no-watermark', type: 'Guide' as const, desc: 'Clean, watermark-free PDF exports with zero subscriptions.' },
  { title: 'Offline PDF Processing Architecture', href: '/offline-pdf-tools', type: 'Article' as const, desc: 'How in-browser PDF manipulation protects your privacy and document security.' },
];

interface ToolPageLayoutProps {
  operation: OperationContent;
  children: React.ReactNode;
}

export default function ToolPageLayout({ operation, children }: ToolPageLayoutProps) {
  const IconComponent = ICON_MAP[operation.mode] ?? Wrench;

  const howToStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: operation.howTo.title,
    description: operation.meta.description || operation.hero.description,
    step: operation.howTo.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.length > 80 ? `${operation.howTo.title} - ${index + 1}` : step,
      text: step,
    })),
  };

  const toolName = OPERATIONS_CATALOG[operation.key]?.label || operation.hero.title;
  const toolDescription = operation.meta.description || operation.hero.description;
  const locale = useLocale();
  const relativeOpPath = getOperationPath(locale, operation.key);
  const cleanOpPath = relativeOpPath === '/' ? '' : relativeOpPath.replace(/\/$/, '');
  const toolUrl = `https://www.ihatelovepdf.com${cleanOpPath.startsWith('/') ? cleanOpPath : '/' + cleanOpPath}`;

  const homePath = locale === 'en' ? '/' : `/${locale}`;
  const homeUrl = `https://www.ihatelovepdf.com${homePath === '/' ? '' : homePath}`;
  const toolsPath = locale === 'en' ? '/tools' : `/${locale}/tools`;
  const toolsUrl = `https://www.ihatelovepdf.com${toolsPath}`;
  const homeLabel = BREADCRUMB_HOME_LABELS[locale] || 'Home';
  const toolsLabel = BREADCRUMB_TOOLS_LABELS[locale] || 'All Tools';
  const localizedToolLabel = operation.hero.title || toolName;

  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: homeLabel,
        item: homeUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: toolsLabel,
        item: toolsUrl,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: localizedToolLabel,
        item: toolUrl,
      },
    ],
  };

  const softwareApplicationStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `${localizedToolLabel} | ihatelovepdf`,
    description: toolDescription,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any (Web-based, Windows, macOS, Linux, iOS, Android)',
    browserRequirements: 'Requires a modern web browser with JavaScript enabled',
    offers: {
      '@type': 'Offer',
      price: 0,
      priceCurrency: 'USD',
    },
    url: toolUrl,
    featureList: operation.hero.bulletPoints,
  };

  const relatedResources =
    RELATED_RESOURCES_MAP[operation.key] ||
    RELATED_RESOURCES_MAP[operation.slug] ||
    DEFAULT_RELATED_RESOURCES;

  const faqStructuredData =
    operation.faqs && operation.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: operation.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-150">
      <div className="mx-auto max-w-[1080px] px-4 sm:px-6 py-8 sm:py-10 space-y-8 sm:space-y-10">
        
        {/* 1. TOOL HEADER & PRIVACY BANNER */}
        <section className="space-y-4 max-w-4xl">
          {/* First-time privacy notice strip */}
          <ToolFirstVisitBanner />

          {/* Visible Semantic Breadcrumbs for UX and SEO */}
          <nav aria-label="Breadcrumb" className="text-xs text-[var(--text-muted)] flex items-center gap-1.5 flex-wrap pt-1">
            <Link href={homePath} className="hover:text-[var(--text-main)] transition-colors">
              {homeLabel}
            </Link>
            <ChevronRight className="h-3 w-3 text-[var(--border)] shrink-0" />
            <Link href={toolsPath} className="hover:text-[var(--text-main)] transition-colors">
              {toolsLabel}
            </Link>
            <ChevronRight className="h-3 w-3 text-[var(--border)] shrink-0" />
            <span className="text-[var(--text-main)] font-semibold truncate max-w-[240px] sm:max-w-none" aria-current="page">
              {localizedToolLabel}
            </span>
          </nav>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-1">
            <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl bg-[var(--brand-soft)] text-[var(--brand)] border border-[var(--brand)]/20 shadow-xs">
              <IconComponent className="h-6 w-6 sm:h-7 sm:w-7 stroke-[1.75]" />
            </div>
            
            <div className="space-y-1 flex-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
                <span>Runs in Your Browser &bull; No Server Uploads</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-main)] leading-[1.15]">
                {operation.hero.title}
              </h1>
            </div>
          </div>

          <p className="text-base sm:text-lg text-[var(--text-muted)] max-w-2xl leading-relaxed">
            {operation.hero.description}
          </p>

          <div className="pt-0.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
            {operation.hero.bulletPoints.map((point) => (
              <div
                key={point}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--card)] text-xs font-medium text-[var(--text-main)] hover:border-[var(--brand)]/30 transition-colors"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-[var(--brand)] shrink-0" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 2. CATEGORIZED TOOL SWITCHER */}
        <section>
          <OperationToolSwitcherClient activeKey={operation.mode} />
        </section>

        {/* 2.5 VERIFIABLE ZERO-NETWORK PRIVACY MONITOR */}
        <div className="w-full">
          <NetworkActivityMonitor />
        </div>

        {/* 3. CENTERPIECE WORKFLOW REGION */}
        <section className="relative">
          {children}
        </section>

        {/* 3.5 QUICK ANSWER-FIRST DEFINITION (FOR GEO & FEATURED SNIPPETS) */}
        <QuickAnswerBox
          operationKey={operation.key}
          toolName={toolName}
          locale={locale}
        />

        {/* 4. HOW TO USE SECTION */}
        <section className="p-6 sm:p-7 rounded-2xl border border-[var(--border)] bg-[var(--card)] space-y-5">
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[var(--text-main)] flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-[var(--brand)]" />
            {operation.howTo.title}
          </h2>
          <ol className="space-y-3.5">
            {operation.howTo.steps.map((step, index) => (
              <li key={`${operation.slug}-step-${index}`} className="flex items-start gap-3 text-sm text-[var(--text-muted)]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--brand-soft)] text-xs font-bold text-[var(--brand)] border border-[var(--brand)]/20">
                  {index + 1}
                </span>
                <span className="pt-0.5 leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
          {operation.howTo.note && (
            <p className="mt-4 text-xs text-[var(--text-muted)] italic border-t border-[var(--border)] pt-3.5">
              {operation.howTo.note}
            </p>
          )}
        </section>

        {/* 5. WHY USE I HATE LOVE PDF */}
        <section className="pt-6 border-t border-[var(--border)] space-y-6">
          <div className="text-center space-y-1.5 max-w-xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-main)]">
              Why use I Hate Love PDF
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)]">
              Fast, private, and lightweight document utilities built directly for your browser.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div className="p-4 sm:p-5 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-1.5 hover:border-[var(--brand)]/30 transition-colors">
              <div className="h-7 w-7 rounded-lg bg-[var(--brand-soft)] text-[var(--brand)] flex items-center justify-center font-bold text-xs">
                Free
              </div>
              <h3 className="text-sm font-semibold text-[var(--text-main)]">100% Free</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Zero paywalls, no monthly subscription fees, and no artificial limits on document processing.
              </p>
            </div>
            <div className="p-4 sm:p-5 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-1.5 hover:border-[var(--brand)]/30 transition-colors">
              <div className="h-7 w-7 rounded-lg bg-[var(--brand-soft)] text-[var(--brand)] flex items-center justify-center">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-semibold text-[var(--text-main)]">Completely Private</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Documents stay in your browser RAM. Your private files are never uploaded to any remote server.
              </p>
            </div>
            <div className="p-4 sm:p-5 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-1.5 hover:border-[var(--brand)]/30 transition-colors">
              <div className="h-7 w-7 rounded-lg bg-[var(--brand-soft)] text-[var(--brand)] flex items-center justify-center font-bold text-xs">
                Zero
              </div>
              <h3 className="text-sm font-semibold text-[var(--text-main)]">No Signup Needed</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                No email registration, passwords, or captchas required. Complete your document tasks immediately.
              </p>
            </div>
            <div className="p-4 sm:p-5 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-1.5 hover:border-[var(--brand)]/30 transition-colors">
              <div className="h-7 w-7 rounded-lg bg-[var(--brand-soft)] text-[var(--brand)] flex items-center justify-center font-bold text-xs">
                Clean
              </div>
              <h3 className="text-sm font-semibold text-[var(--text-main)]">No Watermarks</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Downloaded documents are 100% clean and professional. We never stamp logos or promotional text.
              </p>
            </div>
            <div className="p-4 sm:p-5 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-1.5 hover:border-[var(--brand)]/30 transition-colors">
              <div className="h-7 w-7 rounded-lg bg-[var(--brand-soft)] text-[var(--brand)] flex items-center justify-center font-bold text-xs">
                Mobile
              </div>
              <h3 className="text-sm font-semibold text-[var(--text-main)]">Works on Mobile</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Responsive touch controls designed for phones, tablets, and laptops without installing any apps.
              </p>
            </div>
          </div>
        </section>

        {/* 6. TOOL BENEFITS SECTION */}
        <section className="pt-6 border-t border-[var(--border)] space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-center text-[var(--text-main)]">
            {operation.benefitsTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {operation.benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="p-5 sm:p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2 hover:border-[var(--brand)]/30 transition-colors"
              >
                <h3 className="text-sm sm:text-base font-semibold text-[var(--text-main)] flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[var(--accent)] shrink-0" />
                  {benefit.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. USE CASES SECTION */}
        <section className="pt-6 border-t border-[var(--border)] space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-center text-[var(--text-main)]">
            {operation.useCasesTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {operation.useCases.map((useCase) => (
              <div key={useCase} className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--border-hover)] transition-colors">
                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed flex items-start gap-2">
                  <span className="text-[var(--brand)] font-bold">&bull;</span>
                  {useCase}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 7.5 FACTUAL ARCHITECTURAL COMPARISON (GEO & COMPETITOR CONTRAST) */}
        <ToolComparisonTable
          toolName={toolName}
          locale={locale}
        />

        {/* 8. RELATED TOOLS CROSS-SELL */}
        <RelatedToolsClient currentMode={operation.mode} />

        {/* 9. TOOL-SPECIFIC FAQ ACCORDION */}
        {operation.faqs && operation.faqs.length > 0 ? (
          <section className="p-6 sm:p-7 rounded-2xl border border-[var(--border)] bg-[var(--card)] space-y-5">
            <div className="space-y-1">
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[var(--text-main)] flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-[var(--brand)]" />
                Frequently Asked Questions about {toolName}
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-muted)]">
                Everything you need to know about processing files with {toolName} on I Hate Love PDF.
              </p>
            </div>
            <div className="space-y-2.5 pt-1">
              {operation.faqs.map((faq, idx) => (
                <details
                  key={`${operation.slug}-faq-${idx}`}
                  className="group border border-[var(--border)] rounded-xl overflow-hidden transition-colors bg-[var(--card)]"
                >
                  <summary className="w-full text-left p-3.5 sm:p-4 flex justify-between items-center gap-4 font-semibold text-xs sm:text-sm text-[var(--text-main)] hover:bg-[var(--subtle)] transition-colors cursor-pointer list-none select-none [&::-webkit-details-marker]:hidden">
                    <span>{faq.question}</span>
                    <ChevronDown className="h-4 w-4 shrink-0 text-[var(--text-muted)] transition-transform duration-150 group-open:rotate-180 group-open:text-[var(--brand)]" />
                  </summary>
                  <div className="px-3.5 pb-3.5 sm:px-4 sm:pb-4 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed border-t border-[var(--border)] pt-2.5">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>
        ) : (
          <FaqSection />
        )}

        {/* 10. RELATED GUIDES & DOCUMENTATION */}
        <section className="pt-6 border-t border-[var(--border)] space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[var(--text-main)] flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-[var(--brand)]" />
              Related Guides &amp; Tutorials
            </h2>
            <Link href="/guides" className="text-xs text-[var(--brand)] hover:underline font-semibold flex items-center gap-1">
              <span>All Guides</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {relatedResources.map((res) => (
              <Link
                key={res.href}
                href={res.href}
                className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--brand)] hover:shadow-xs transition-all group flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand)] bg-[var(--brand-soft)] px-2 py-0.5 rounded-md border border-[var(--brand)]/20">
                      {res.type}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-[var(--text-muted)] group-hover:text-[var(--brand)] group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <h3 className="font-semibold text-xs sm:text-sm text-[var(--text-main)] group-hover:text-[var(--brand)] transition-colors">
                    {res.title}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    {res.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* JSON-LD STRUCTURED DATA */}
        <script
          id={`schema-howto-${operation.key}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToStructuredData) }}
        />
        <script
          id={`schema-software-${operation.key}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationStructuredData) }}
        />
        <script
          id={`schema-breadcrumb-${operation.key}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
        />
        {faqStructuredData && (
          <script
            id={`schema-faq-${operation.key}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
          />
        )}
      </div>
    </div>
  );
}
