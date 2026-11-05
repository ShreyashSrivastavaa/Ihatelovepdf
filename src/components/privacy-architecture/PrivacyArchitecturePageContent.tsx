'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  Terminal,
  FileCheck2,
  ChevronDown,
  ArrowRight,
  UserCheck,
} from 'lucide-react';
import { SITE_URL } from '../../lib/site';

interface PrivacyArchitecturePageContentProps {
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
  en: 'Security Architecture',
  es: 'Arquitectura de Seguridad',
  pt: 'Arquitetura de Segurança',
  de: 'Sicherheits-Architektur',
  fr: 'Architecture de Sécurité',
  it: 'Architettura di Sicurezza',
  ro: 'Arhitectură de Securitate',
  ru: 'Архитектура безопасности',
  hu: 'Biztonsági Architektúra',
};

export function PrivacyArchitecturePageContent({ locale }: PrivacyArchitecturePageContentProps) {
  const homeLabel = BREADCRUMB_HOME_LABELS[locale] || 'Home';
  const securityLabel = BREADCRUMB_SECURITY_LABELS[locale] || 'Security Architecture';
  const homePath = locale === 'en' ? '/' : `/${locale}`;
  const canonicalPath = locale === 'en' ? '/privacy-architecture' : `/${locale}/privacy-architecture`;
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;

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
    ],
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Verify Zero Server Uploads in Your Browser Network Tab',
    description: 'Step-by-step instructions to independently verify that no file data is transmitted to external servers while using ihatelovepdf.',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Open Developer Tools',
        text: 'Press F12 (or right-click anywhere on the webpage and select "Inspect") to open your browser developer tools.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Switch to the Network Tab',
        text: 'Click on the "Network" tab in the developer tools header. Optionally click the "Fetch/XHR" filter.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Drop and Process a PDF Document',
        text: 'Drag and drop any PDF file into ihatelovepdf and click Merge, Compress, or Split.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Verify Zero Outbound Data Bytes',
        text: 'Inspect the network log table. Observe that 0 bytes of document payloads or POST requests are transmitted.',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How does in-browser PDF processing work without a backend server?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Modern web browsers execute WebAssembly (Wasm) and typed ArrayBuffers directly inside a sandboxed virtual machine. When you load ihatelovepdf, the compiled WebAssembly bytecode and PDF manipulation libraries (PDF-lib, PDF.js) execute locally on your device CPU.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why is zero-upload privacy superior to "files deleted after 1 hour"?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Services that promise "files deleted after 1 hour" still require full transmission across the public internet, storage on third-party cloud disk volumes, and potential exposure to server logs, government subpoenas, or security vulnerabilities. With ihatelovepdf, files never leave your device memory in the first place.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are documents ever uploaded or sent to external servers?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Your documents are processed on your device and are never sent to our servers. All parsing, compression, merging, and rendering operations execute locally inside your browser via WebAssembly.',
        },
      },
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How Our Zero-Upload Privacy Model Works (Technical Explainer)',
    description: 'Deep dive into client-side WebAssembly PDF processing and step-by-step instructions to verify zero outbound network transmission in browser DevTools.',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
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
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
          <Link href={homePath} className="hover:text-[var(--brand)] transition-colors">
            {homeLabel}
          </Link>
          <span>/</span>
          <span className="text-[var(--text-main)] font-medium">
            {securityLabel}
          </span>
        </nav>

        {/* Header */}
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Technical Whitepaper & Verification Guide</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--text-main)] tracking-tight leading-tight">
            How Our Zero-Upload Privacy Model Works
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
              <span>Verifiable in Browser Network Tab</span>
            </div>
          </div>
        </header>

        {/* Executive Summary Box */}
        <div className="p-5 sm:p-6 rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-soft)] space-y-3">
          <div className="flex items-center gap-2 text-[var(--brand)] font-semibold text-sm">
            <Lock className="w-4 h-4 shrink-0" />
            <span>Core Engineering Principle</span>
          </div>
          <p className="text-sm sm:text-base text-[var(--text-main)] leading-relaxed font-normal">
            At ihatelovepdf, we do not ask you to trust a &ldquo;Privacy Policy&rdquo; or a promise that &ldquo;files are deleted after 1 hour.&rdquo; Instead, we engineered a system where our servers <strong>physically cannot access your documents</strong>. All PDF parsing, compression, splitting, and rendering takes place inside your browser&apos;s sandboxed WebAssembly runtime.
          </p>
        </div>

        {/* Technical Architecture Deep Dive */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-main)]">
            1. The Client-Side WebAssembly Architecture
          </h2>
          <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] space-y-4 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
            <p>
              Traditional PDF websites rely on a 1990s server-centric model: the user uploads a document via an HTTP POST request, a cloud server (usually a headless Linux container running Ghostscript, Poppler, or Python) processes the bytes, saves the result to an Amazon S3 bucket, and returns a download URL.
            </p>
            <p>
              In ihatelovepdf, the application binaries (compiled to WebAssembly and Web Workers) are downloaded to your browser once. When you drag and drop a PDF file:
            </p>
            <ul className="space-y-2.5 pt-1 text-[var(--text-main)]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Local ArrayBuffer Loading:</strong> The file is read directly from your local file system into browser memory via the HTML5 File API.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Web Worker Offloading:</strong> Computation is delegated to dedicated background Web Workers, keeping the UI responsive while utilizing all available CPU cores.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Zero Outbound Transmission:</strong> Document byte arrays are mutated in RAM and exported directly to your browser&apos;s Blob storage for instant download.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Independent DevTools Verification Tutorial */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-[var(--brand)]" />
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-main)]">
              2. How to Independently Verify Zero Uploads (DevTools Tutorial)
            </h2>
          </div>

          <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] space-y-4">
            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
              You can verify our privacy claims on your own computer in under 15 seconds. Follow these steps in Google Chrome, Mozilla Firefox, Microsoft Edge, or Apple Safari:
            </p>

            <ol className="space-y-3 text-xs sm:text-sm text-[var(--text-main)]">
              <li className="p-3 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] space-y-1">
                <div className="font-bold flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[var(--brand)] text-white text-[11px] flex items-center justify-center font-bold">1</span>
                  <span>Open Developer Tools</span>
                </div>
                <p className="text-[var(--text-muted)] pl-7">
                  Press <kbd className="px-1.5 py-0.5 rounded bg-[var(--card)] border border-[var(--border)] font-mono text-[10px]">F12</kbd> (or <kbd className="px-1.5 py-0.5 rounded bg-[var(--card)] border border-[var(--border)] font-mono text-[10px]">Ctrl+Shift+I</kbd> on Windows/Linux, <kbd className="px-1.5 py-0.5 rounded bg-[var(--card)] border border-[var(--border)] font-mono text-[10px]">Cmd+Option+I</kbd> on macOS).
                </p>
              </li>

              <li className="p-3 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] space-y-1">
                <div className="font-bold flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[var(--brand)] text-white text-[11px] flex items-center justify-center font-bold">2</span>
                  <span>Navigate to the &ldquo;Network&rdquo; Tab</span>
                </div>
                <p className="text-[var(--text-muted)] pl-7">
                  Click on the <strong>Network</strong> tab in the DevTools toolbar. Filter by <strong>Fetch/XHR</strong> to observe API calls.
                </p>
              </li>

              <li className="p-3 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] space-y-1">
                <div className="font-bold flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[var(--brand)] text-white text-[11px] flex items-center justify-center font-bold">3</span>
                  <span>Process Any PDF File</span>
                </div>
                <p className="text-[var(--text-muted)] pl-7">
                  Select or drag a 10MB PDF into the <Link href="/merge" className="text-[var(--brand)] underline">Merge</Link> or <Link href="/compress" className="text-[var(--brand)] underline">Compress</Link> tool and click process.
                </p>
              </li>

              <li className="p-3 rounded-xl border border-[var(--border)] bg-[var(--card)] border-emerald-500/30 bg-emerald-500/5 space-y-1">
                <div className="font-bold flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] flex items-center justify-center font-bold">4</span>
                  <span>Confirm: 0 Outbound Payload Bytes</span>
                </div>
                <p className="text-[var(--text-main)] pl-7">
                  Observe that no POST requests containing your file payload are generated. The output file downloads directly via a local <code className="font-mono text-[11px]">blob:https://www.ihatelovepdf.com/...</code> URI generated in memory.
                </p>
              </li>
            </ol>
          </div>
        </section>

        {/* Document Isolation Architecture */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-main)]">
            3. Document Isolation &amp; Infrastructure Architecture
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2">
              <h3 className="font-bold text-sm text-[var(--text-main)] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero Server Ingestion</span>
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Your documents are processed on your device and are never sent to our servers. Because processing occurs strictly in client memory, no backend document processing servers exist.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2">
              <h3 className="font-bold text-sm text-[var(--text-main)] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Local Device Perimeter</span>
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Document data stays entirely within your local device memory. Byte arrays are manipulated in RAM and exported directly to your browser download manager.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2">
              <h3 className="font-bold text-sm text-[var(--text-main)] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero AI Training</span>
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                We have zero access to your documents and operate zero document ingestion pipelines. Your proprietary files and text are never accessed or used for model training.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-main)]">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            <details className="group rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 open:bg-[var(--card)] transition-colors">
              <summary className="flex cursor-pointer items-center justify-between font-semibold text-sm sm:text-base text-[var(--text-main)] select-none">
                <span>How does in-browser PDF processing work without a backend server?</span>
                <ChevronDown className="h-4 w-4 shrink-0 text-[var(--text-muted)] transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                Modern web browsers execute WebAssembly (Wasm) and typed ArrayBuffers directly inside a sandboxed virtual machine. When you load ihatelovepdf, the compiled WebAssembly bytecode and PDF manipulation libraries (PDF-lib, PDF.js) execute locally on your device CPU.
              </p>
            </details>

            <details className="group rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 open:bg-[var(--card)] transition-colors">
              <summary className="flex cursor-pointer items-center justify-between font-semibold text-sm sm:text-base text-[var(--text-main)] select-none">
                <span>Why is zero-upload privacy superior to &ldquo;files deleted after 1 hour&rdquo;?</span>
                <ChevronDown className="h-4 w-4 shrink-0 text-[var(--text-muted)] transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                Services that promise &ldquo;files deleted after 1 hour&rdquo; still require full transmission across the public internet, storage on third-party cloud disk volumes, and potential exposure to server logs, government subpoenas, or security vulnerabilities. With ihatelovepdf, files never leave your device memory in the first place.
              </p>
            </details>

            <details className="group rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 open:bg-[var(--card)] transition-colors">
              <summary className="flex cursor-pointer items-center justify-between font-semibold text-sm sm:text-base text-[var(--text-main)] select-none">
                <span>Are documents ever uploaded or sent to external servers?</span>
                <ChevronDown className="h-4 w-4 shrink-0 text-[var(--text-muted)] transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                No. Your documents are processed on your device and are never sent to our servers. All parsing, compression, merging, and rendering operations execute locally inside your browser via WebAssembly.
              </p>
            </details>
          </div>
        </section>

        {/* CTA */}
        <div className="p-6 sm:p-8 rounded-2xl border border-[var(--brand-border)] bg-[var(--card)] text-center space-y-3">
          <h3 className="text-lg sm:text-xl font-bold text-[var(--text-main)]">
            Experience Private, In-Browser Processing
          </h3>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-lg mx-auto">
            Try any of our 37 free tools. No sign-up required, runs in your browser, and your documents never leave your device.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link
              href={locale === 'en' ? '/merge' : `/${locale}/unir`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--brand)] text-white text-xs sm:text-sm font-semibold hover:opacity-95 transition-opacity"
            >
              <span>Merge PDF Privately</span>
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
