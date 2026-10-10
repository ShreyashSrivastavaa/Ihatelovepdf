'use client';

import React from 'react';
import Script from 'next/script';
import type { OperationContent } from '../i18n/dictionaries/operation-types';
import { OPERATIONS_CATALOG } from '../i18n/operations-catalog';
import { ICON_MAP } from './ToolSwitcher';
import ToolFirstVisitBanner from './ToolFirstVisitBanner';
import OperationToolSwitcherClient from './OperationToolSwitcherClient';
import RelatedToolsClient from './RelatedToolsClient';
import FaqSection from './faq-section';
import NetworkActivityMonitor from './NetworkActivityMonitor';
import { CheckCircle2, ShieldCheck, Sparkles, HelpCircle, Wrench, ChevronDown } from 'lucide-react';

interface ToolPageLayoutProps {
  operation: OperationContent;
  children: React.ReactNode;
}

export default function ToolPageLayout({ operation, children }: ToolPageLayoutProps) {
  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(null);
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
  const toolUrl = `https://www.ihatelovepdf.com/${operation.slug}`;

  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.ihatelovepdf.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'All PDF Tools',
        item: 'https://www.ihatelovepdf.com/tools',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: toolName,
        item: toolUrl,
      },
    ],
  };

  const softwareApplicationStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: toolName,
    description: toolDescription,
    applicationCategory: 'Utility',
    operatingSystem: 'Any (Web-based)',
    browserRequirements: 'Requires a modern web browser with JavaScript enabled',
    offers: {
      '@type': 'Offer',
      price: 0,
      priceCurrency: 'USD',
    },
    url: toolUrl,
    featureList: operation.hero.bulletPoints,
  };

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
                <span>Runs in Your Browser &bull; No Server Uploads</span>
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

        {/* 4. HOW TO USE SECTION */}
        <section className="surface-card p-6 sm:p-8 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--tx)] flex items-center gap-2">
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

        {/* 5. WHY USE I HATE LOVE PDF */}
        <section className="pt-6 border-t border-[var(--border)] space-y-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold tracking-tight text-[var(--tx)]">
              Why use I Hate Love PDF
            </h2>
            <p className="text-sm text-[var(--tx-2)]">
              Fast, private, and lightweight document utilities built directly for your browser.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="surface-card p-5 space-y-2 hover:border-[var(--accent-border)] transition-colors">
              <div className="h-9 w-9 rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center font-bold text-sm">
                Free
              </div>
              <h3 className="text-sm font-bold text-[var(--tx)]">100% Free</h3>
              <p className="text-xs text-[var(--tx-2)] leading-relaxed">
                Zero paywalls, no monthly subscription fees, and no artificial limits on document processing.
              </p>
            </div>
            <div className="surface-card p-5 space-y-2 hover:border-[var(--accent-border)] transition-colors">
              <div className="h-9 w-9 rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-[var(--tx)]">Completely Private</h3>
              <p className="text-xs text-[var(--tx-2)] leading-relaxed">
                Documents stay in your browser RAM. Your private files are never uploaded to any remote server.
              </p>
            </div>
            <div className="surface-card p-5 space-y-2 hover:border-[var(--accent-border)] transition-colors">
              <div className="h-9 w-9 rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center font-bold text-sm">
                Zero
              </div>
              <h3 className="text-sm font-bold text-[var(--tx)]">No Signup Needed</h3>
              <p className="text-xs text-[var(--tx-2)] leading-relaxed">
                No email registration, passwords, or captchas required. Complete your document tasks immediately.
              </p>
            </div>
            <div className="surface-card p-5 space-y-2 hover:border-[var(--accent-border)] transition-colors">
              <div className="h-9 w-9 rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center font-bold text-sm">
                Clean
              </div>
              <h3 className="text-sm font-bold text-[var(--tx)]">No Watermarks</h3>
              <p className="text-xs text-[var(--tx-2)] leading-relaxed">
                Downloaded documents are 100% clean and professional. We never stamp logos or promotional text.
              </p>
            </div>
            <div className="surface-card p-5 space-y-2 hover:border-[var(--accent-border)] transition-colors">
              <div className="h-9 w-9 rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center font-bold text-sm">
                Mobile
              </div>
              <h3 className="text-sm font-bold text-[var(--tx)]">Works on Mobile</h3>
              <p className="text-xs text-[var(--tx-2)] leading-relaxed">
                Responsive touch controls designed for phones, tablets, and laptops without installing any apps.
              </p>
            </div>
          </div>
        </section>

        {/* 6. TOOL BENEFITS SECTION */}
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

        {/* 7. USE CASES SECTION */}
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

        {/* 8. RELATED TOOLS CROSS-SELL */}
        <RelatedToolsClient currentMode={operation.mode} />

        {/* 9. TOOL-SPECIFIC FAQ ACCORDION */}
        {operation.faqs && operation.faqs.length > 0 ? (
          <section className="surface-card p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--tx)] flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-[var(--accent)]" />
                Frequently Asked Questions about {toolName}
              </h2>
              <p className="text-xs sm:text-sm text-[var(--tx-2)]">
                Everything you need to know about processing files with {toolName} on I Hate Love PDF.
              </p>
            </div>
            <div className="space-y-3 pt-2">
              {operation.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={`${operation.slug}-faq-${idx}`}
                    className="border border-[var(--border)] rounded-2xl overflow-hidden transition-colors bg-[var(--bg-card)]"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full text-left p-4 sm:p-5 flex justify-between items-center gap-4 font-semibold text-sm sm:text-base text-[var(--tx)] hover:bg-[var(--bg-subtle)] transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 text-[var(--tx-3)] transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[var(--accent)]' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-[var(--tx-2)] leading-relaxed border-t border-[var(--border)] pt-3">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ) : (
          <FaqSection />
        )}

        {/* JSON-LD STRUCTURED DATA */}
        <Script
          id={`schema-howto-${operation.key}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToStructuredData) }}
        />
        <Script
          id={`schema-software-${operation.key}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationStructuredData) }}
        />
        <Script
          id={`schema-breadcrumb-${operation.key}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
        />
        {faqStructuredData && (
          <Script
            id={`schema-faq-${operation.key}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
          />
        )}
      </div>
    </div>
  );
}
