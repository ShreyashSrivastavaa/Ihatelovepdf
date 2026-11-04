'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Lock,
  Zap,
  Sparkles,
  ChevronDown,
  UserCheck,
} from 'lucide-react';
import { COMPARISONS_DATA, type ComparisonPageType } from '../../app/_data/comparisons-data';
import { SITE_URL } from '../../lib/site';

interface ComparisonPageContentProps {
  pageType: ComparisonPageType;
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

const BREADCRUMB_COMPARISONS_LABELS: Record<string, string> = {
  en: 'Comparisons',
  es: 'Comparativas',
  pt: 'Comparações',
  de: 'Vergleiche',
  fr: 'Comparatifs',
  it: 'Confronti',
  ro: 'Comparații',
  ru: 'Сравнения',
  hu: 'Összehasonlítások',
};

export function ComparisonPageContent({ pageType, locale }: ComparisonPageContentProps) {
  const data = COMPARISONS_DATA[pageType][locale] || COMPARISONS_DATA[pageType]['en'];
  const homeLabel = BREADCRUMB_HOME_LABELS[locale] || 'Home';
  const comparisonsLabel = BREADCRUMB_COMPARISONS_LABELS[locale] || 'Comparisons';
  const homePath = locale === 'en' ? '/' : `/${locale}`;
  const currentPath = locale === 'en' ? `/${pageType}-alternative` : `/${locale}/${pageType}-alternative`;
  const canonicalUrl = `${SITE_URL}${currentPath}`;

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
        name: comparisonsLabel,
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
          <span>{comparisonsLabel}</span>
          <span>/</span>
          <span className="text-[var(--text-main)] font-medium truncate max-w-[200px] sm:max-w-xs">
            {data.competitorName}
          </span>
        </nav>

        {/* 2. HEADER */}
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
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
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Sourced & Verifiable Facts</span>
            </div>
          </div>
        </header>

        {/* 3. DIRECT ANSWER / SUMMARY BOX */}
        <div className="p-5 sm:p-6 rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-soft)] space-y-3">
          <div className="flex items-center gap-2 text-[var(--brand)] font-semibold text-sm">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Executive Summary</span>
          </div>
          <p className="text-sm sm:text-base text-[var(--text-main)] leading-relaxed font-normal">
            {data.directAnswer}
          </p>
        </div>

        {/* 4. COMPARISON MATRIX TABLE */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-main)]">
              Feature & Architecture Comparison
            </h2>
            <span className="text-xs text-[var(--text-muted)] hidden sm:inline">
              Factual & Sourced Breakdown
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[var(--bg-subtle)] text-[var(--text-main)] font-semibold border-b border-[var(--border)]">
                <tr>
                  <th className="p-3 sm:p-4 w-1/4">Feature</th>
                  <th className="p-3 sm:p-4 w-1/3 text-rose-600 dark:text-rose-400">
                    {data.competitorName}
                  </th>
                  <th className="p-3 sm:p-4 w-1/3 text-emerald-600 dark:text-emerald-400">
                    ihatelovepdf
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {data.rows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[var(--bg-subtle)]/50 transition-colors">
                    <td className="p-3 sm:p-4 font-semibold text-[var(--text-main)] align-top">
                      <div>{row.feature}</div>
                      {row.status === 'USER_CONFIRMATION_REQUIRED' && (
                        <span className="inline-flex items-center gap-1 mt-1 text-[10px] text-amber-600 dark:text-amber-400 font-medium bg-amber-500/10 px-1.5 py-0.5 rounded">
                          <AlertCircle className="w-2.5 h-2.5" /> Confirming
                        </span>
                      )}
                    </td>
                    <td className="p-3 sm:p-4 text-[var(--text-muted)] align-top leading-relaxed">
                      {row.competitor}
                      {row.source && (
                        <div className="text-[10px] text-[var(--text-muted)]/70 mt-1 italic">
                          Source: {row.source}
                        </div>
                      )}
                    </td>
                    <td className="p-3 sm:p-4 text-[var(--text-main)] font-medium align-top leading-relaxed bg-emerald-500/5">
                      <div className="inline-flex items-start gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{row.ourSite}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 5. PRIVACY PILLARS */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-1.5">
            <div className="flex items-center gap-2 text-[var(--brand)] font-semibold text-sm">
              <Lock className="w-4 h-4" />
              <span>Zero Server Uploads</span>
            </div>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Files are processed inside your browser RAM using WebAssembly. No documents ever touch an external server.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-1.5">
            <div className="flex items-center gap-2 text-[var(--brand)] font-semibold text-sm">
              <Zap className="w-4 h-4" />
              <span>Instant Local Speed</span>
            </div>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              No cloud queue, no bandwidth throttle, and no waiting for gigabyte uploads.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-1.5">
            <div className="flex items-center gap-2 text-[var(--brand)] font-semibold text-sm">
              <Sparkles className="w-4 h-4" />
              <span>Zero Watermarks</span>
            </div>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Outputs are clean and professional with no branding, watermarks, or hidden paywalls.
            </p>
          </div>
        </section>

        {/* 6. VISIBLE DETAILS FAQS */}
        {data.faqs.length > 0 && (
          <section className="space-y-4 pt-4">
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

        {/* 7. EXPLORE TOOLS CTA */}
        <div className="p-6 sm:p-8 rounded-2xl border border-[var(--border)] bg-[var(--card)] text-center space-y-3">
          <h3 className="text-lg sm:text-xl font-bold text-[var(--text-main)]">
            Ready to process your PDF privately?
          </h3>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-lg mx-auto">
            Choose from 37 free tools. No sign-up required, works offline, and your files never leave your device.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link
              href={locale === 'en' ? '/merge' : `/${locale}/unir`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--brand)] text-white text-xs sm:text-sm font-semibold hover:opacity-95 transition-opacity"
            >
              <span>Try Merge PDF</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={locale === 'en' ? '/tools' : `/${locale}/tools`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--text-main)] text-xs sm:text-sm font-semibold hover:bg-[var(--bg-subtle)] transition-colors"
            >
              <span>Browse All 37 Tools</span>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
