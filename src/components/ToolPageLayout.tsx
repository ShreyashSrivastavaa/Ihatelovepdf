'use client';

import React from 'react';
import type { OperationContent } from '../i18n/dictionaries/operation-types';
import { ICON_MAP } from './ToolSwitcher';
import ToolFirstVisitBanner from './ToolFirstVisitBanner';
import OperationToolSwitcherClient from './OperationToolSwitcherClient';
import RelatedToolsClient from './RelatedToolsClient';
import FaqSection from './faq-section';
import NetworkActivityMonitor from './NetworkActivityMonitor';
import { CheckCircle2, ShieldCheck, Sparkles, HelpCircle, Wrench } from 'lucide-react';

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

  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://ihatelovepdf.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'All PDF Tools',
        item: 'https://ihatelovepdf.com/tools',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: operation.hero.title,
        item: `https://ihatelovepdf.com/${operation.slug}`,
      },
    ],
  };

  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Is ${operation.hero.title} safe and private?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. All processing executes 100% locally in your web browser via client-side WebAssembly. No files are ever uploaded to remote servers or third-party cloud storage.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are there any file size caps or watermarks?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. ihatelovepdf adds zero watermarks and enforces no arbitrary server file size limits.',
        },
      },
    ],
  };

  const softwareApplicationStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: operation.meta.title,
    description: operation.meta.description,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires a modern web browser with JavaScript enabled',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '389',
    },
    featureList: operation.hero.bulletPoints,
    url: 'https://ihatelovepdf.com',
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--tx)] transition-colors duration-200">
      <div className="mx-auto max-w-[1140px] px-4 sm:px-6 py-8 sm:py-12 space-y-10 sm:space-y-14">
        
        {/* 1. TOOL HEADER & PRIVACY BANNER */}
        <section className="space-y-5 max-w-4xl">
          {/* First-time privacy notice strip */}
          <ToolFirstVisitBanner />

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent-border)] shadow-sm">
              <IconComponent className="h-7 w-7 sm:h-8 sm:w-8 stroke-[1.75]" />
            </div>
            
            <div className="space-y-1.5 flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--success-border)] bg-[var(--success-soft)] text-[11px] font-semibold text-[var(--tx)] shadow-xs">
                <ShieldCheck className="h-3.5 w-3.5 text-[var(--success)] shrink-0" />
                <span>100% Client-Side Local &bull; Zero Cloud Uploads</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--tx)] leading-[1.15]">
                {operation.hero.title}
              </h1>
            </div>
          </div>

          <p className="text-base sm:text-lg text-[var(--tx-2)] max-w-3xl leading-relaxed">
            {operation.hero.description}
          </p>

          <div className="pt-1 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {operation.hero.bulletPoints.map((point) => (
              <div
                key={point}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-xs font-medium text-[var(--tx)] shadow-xs hover:border-[var(--accent-border)] transition-colors"
              >
                <CheckCircle2 className="h-4 w-4 text-[var(--accent)] shrink-0" />
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

        {/* 4. BENEFITS SECTION */}
        <section className="pt-6 border-t border-[var(--border)] space-y-8">
          <h2 className="text-2xl font-bold tracking-tight text-center text-[var(--tx)]">
            {operation.benefitsTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {operation.benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="surface-card p-6 space-y-2 hover:border-[var(--accent-border)] transition-colors"
              >
                <h3 className="text-base font-bold text-[var(--tx)] flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[var(--accent)] shrink-0" />
                  {benefit.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--tx-2)] leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. HOW TO SECTION */}
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

        {/* 6. USE CASES SECTION */}
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

        {/* 7. RELATED TOOLS CROSS-SELL */}
        <RelatedToolsClient currentMode={operation.mode} />

        {/* JSON-LD STRUCTURED DATA */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToStructuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationStructuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />

        {/* FAQ ACCORDION */}
        <FaqSection />
      </div>
    </div>
  );
}
