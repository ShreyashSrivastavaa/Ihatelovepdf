'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Lock,
  Zap,
  Sparkles,
  ChevronDown,
  UserCheck,
  FileCheck2,
} from 'lucide-react';
import { SEARCH_INTENT_DATA, type SearchIntentSlug } from '../../app/_data/search-intent-data';
import { SITE_URL } from '../../lib/site';

interface SearchIntentPageContentProps {
  slug: SearchIntentSlug;
  locale: string;
}

const BREADCRUMB_HOME_LABELS: Record<string, string> = {
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

const BREADCRUMB_SECURITY_LABELS: Record<string, string> = {
  en: 'Security & Guides',
  es: 'Seguridad y Guías',
  pt: 'Segurança e Guias',
  de: 'Sicherheit & Anleitungen',
  fr: 'Sécurité et Guides',
  it: 'Sicurezza e Guide',
  ro: 'Securitate și Ghiduri',
  ru: 'Безопасность и статьи',
  hu: 'Biztonság és Útmutatók',
};

const KEYWORD_PILLS: Record<string, string[]> = {
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

export function SearchIntentPageContent({ slug, locale }: SearchIntentPageContentProps) {
  const data = SEARCH_INTENT_DATA[slug][locale] || SEARCH_INTENT_DATA[slug]['en'];
  const homeLabel = BREADCRUMB_HOME_LABELS[locale] || 'Home';
  const securityLabel = BREADCRUMB_SECURITY_LABELS[locale] || 'Security & Guides';
  const homePath = locale === 'en' ? '/' : `/${locale}`;
  const currentPath = locale === 'en' ? `/${slug}` : `/${locale}/${slug}`;
  const canonicalUrl = `${SITE_URL}${currentPath}`;
  const pills = KEYWORD_PILLS[locale] || KEYWORD_PILLS['en'];

  // Tool destination link
  let toolHref = locale === 'en' ? '/merge' : `/${locale}/unir`;
  if (data.primaryToolKey === 'editPdf') {
    toolHref = locale === 'en' ? '/edit-pdf' : `/${locale}/editar-pdf`;
  } else if (data.primaryToolKey === 'all') {
    toolHref = locale === 'en' ? '/tools' : `/${locale}/tools`;
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: homeLabel,
        item: `${SITE_URL}${homePath === '/' ? '' : homePath}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: securityLabel,
        item: canonicalUrl,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: data.h1,
        item: canonicalUrl,
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.h1,
    description: data.description,
    url: canonicalUrl,
    datePublished: '2026-03-01T00:00:00+00:00',
    dateModified: '2026-11-05T00:00:00+00:00',
    author: {
      '@type': 'Person',
      name: 'Shreyash Srivastava',
      url: 'https://github.com/shreyashsng',
      jobTitle: 'Founder & Software Engineer',
    },
    publisher: {
      '@type': 'Organization',
      name: 'ihatelovepdf',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/icon.png`,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
        {/* 1. VISIBLE BREADCRUMBS */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
          <Link href={homePath} className="hover:text-[var(--brand)] transition-colors">
            {homeLabel}
          </Link>
          <span>/</span>
          <span>{securityLabel}</span>
          <span>/</span>
          <span className="text-[var(--text-main)] font-medium truncate max-w-[200px] sm:max-w-xs">
            {data.h1}
          </span>
        </nav>

        {/* 2. HEADER */}
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{data.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-main)] tracking-tight leading-tight">
            {data.h1}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--text-muted)] pt-1 border-b border-[var(--border)] pb-4">
            <div className="inline-flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-[var(--brand)]" />
              <span>Written by Shreyash Srivastava</span>
            </div>
            <span>•</span>
            <span>Last updated: November 2026</span>
            <span>•</span>
            <div className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>Verified Client-Side WebAssembly</span>
            </div>
          </div>
        </header>

        {/* 3. DIRECT ANSWER / SUMMARY BOX WITH KEYWORD PILLS */}
        <div className="p-5 sm:p-6 rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-soft)] space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-[var(--brand)] font-semibold text-sm">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>Quick Answer</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {pills.map((pill, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[var(--card)] text-[var(--text-muted)] border border-[var(--border)]"
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>
          <p className="text-sm sm:text-base text-[var(--text-main)] leading-relaxed font-normal">
            {data.directAnswer}
          </p>
        </div>

        {/* 4. CONTENT SECTIONS */}
        <div className="space-y-6">
          {data.sections.map((section, idx) => (
            <section
              key={idx}
              className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] space-y-3"
            >
              <h2 className="text-lg sm:text-xl font-bold text-[var(--text-main)]">
                {section.title}
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                {section.description}
              </p>
              {section.points && section.points.length > 0 && (
                <ul className="space-y-2 pt-2">
                  {section.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2 text-xs sm:text-sm text-[var(--text-main)]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* 5. PRIVACY PILLARS */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-1.5">
            <div className="flex items-center gap-2 text-[var(--brand)] font-semibold text-sm">
              <Lock className="w-4 h-4" />
              <span>Zero Network Footprint</span>
            </div>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Open your browser Network tab to verify: exactly 0 file bytes are sent to remote servers.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-1.5">
            <div className="flex items-center gap-2 text-[var(--brand)] font-semibold text-sm">
              <Zap className="w-4 h-4" />
              <span>No Cloud Queue</span>
            </div>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Execution is instant, powered by your device CPU and WebAssembly memory.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-1.5">
            <div className="flex items-center gap-2 text-[var(--brand)] font-semibold text-sm">
              <Sparkles className="w-4 h-4" />
              <span>Zero Watermarks</span>
            </div>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Documents remain 100% clean and pristine with no promotional logos or trial watermarks.
            </p>
          </div>
        </section>

        {/* 6. FAQS */}
        {data.faqs.length > 0 && (
          <section className="space-y-4 pt-2">
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-main)]">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {data.faqs.map((faq, idx) => (
                <details
                  key={idx}
                  className="group rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 open:bg-[var(--card)] transition-colors"
                >
                  <summary className="flex cursor-pointer items-center justify-between font-semibold text-sm sm:text-base text-[var(--text-main)] select-none">
                    <span>{faq.question}</span>
                    <ChevronDown className="h-4 w-4 shrink-0 text-[var(--text-muted)] transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* 7. INTERACTIVE TOOL CALL TO ACTION */}
        <div className="p-6 sm:p-8 rounded-2xl border border-[var(--brand-border)] bg-[var(--card)] text-center space-y-3">
          <h3 className="text-lg sm:text-xl font-bold text-[var(--text-main)]">
            Ready to process your files securely?
          </h3>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-lg mx-auto">
            Try the {data.primaryToolName} directly in your browser. No sign-up required, runs in your browser, and your documents never leave your device.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link
              href={toolHref}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--brand)] text-white text-xs sm:text-sm font-semibold hover:opacity-95 transition-opacity"
            >
              <span>Launch {data.primaryToolName}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={locale === 'en' ? '/tools' : `/${locale}/tools`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--text-main)] text-xs sm:text-sm font-semibold hover:bg-[var(--bg-subtle)] transition-colors"
            >
              <span>Explore All 37 Tools</span>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
