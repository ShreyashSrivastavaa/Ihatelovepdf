'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, HardDrive, EyeOff, CheckCircle2, Mail } from 'lucide-react';
import { useDictionary } from '../i18n/LocaleProvider';

export default function PrivacyPageContent() {
  const dictionary = useDictionary();
  const routes = dictionary.routes;

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-150 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header Banner */}
        <header className="text-center space-y-3 pb-8 border-b border-[var(--border)]">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>100% Local Processing in Your Browser</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-main)]">
            Privacy Policy
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed">
            Your privacy comes first. ihatelovepdf runs completely inside your browser, so your documents never touch a remote server.
          </p>
          <div className="text-xs text-[var(--text-muted)] pt-1">
            Last Updated: July 31, 2026
          </div>
        </header>

        {/* Core Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--brand-soft)] text-[var(--brand)] border border-[var(--brand)]/20 flex items-center justify-center">
              <Lock className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-semibold text-[var(--text-main)]">Zero Server Uploads</h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Files uploaded to ihatelovepdf stay in your browser RAM and local disk storage. We operate zero cloud processing pipelines.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--brand-soft)] text-[var(--brand)] border border-[var(--brand)]/20 flex items-center justify-center">
              <EyeOff className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-semibold text-[var(--text-main)]">No Tracking Cookies</h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              We do not use advertising identifiers or invasive profiling cookies. Only essential user settings (like theme) are stored locally.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--brand-soft)] text-[var(--brand)] border border-[var(--brand)]/20 flex items-center justify-center">
              <HardDrive className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-semibold text-[var(--text-main)]">Instant Destruction</h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Closing your browser tab immediately releases all file buffers from system memory. No data residual copies are maintained.
            </p>
          </div>
        </div>

        {/* Detailed Content Sections */}
        <div className="space-y-6 text-sm leading-relaxed text-[var(--text-muted)]">
          
          <section className="p-5 sm:p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2.5">
            <h2 className="text-base sm:text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
              <span className="text-[var(--brand)] font-mono text-sm font-semibold">1.</span> Introduction
            </h2>
            <p>
              ihatelovepdf (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) provides a browser-based document utility toolkit designed to compress, merge, split, crop, rotate, reorder, and convert PDF files. This Privacy Policy governs your access to and use of our web application.
            </p>
          </section>

          <section className="p-5 sm:p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2.5">
            <h2 className="text-base sm:text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
              <span className="text-[var(--brand)] font-mono text-sm font-semibold">2.</span> Information We Do NOT Collect
            </h2>
            <p>Because processing takes place strictly inside your client web browser, we do NOT collect, access, or inspect:</p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-[var(--text-muted)] font-normal text-xs sm:text-sm">
              <li>Your uploaded PDF files or image assets</li>
              <li>Text, graphics, metadata, or form content inside your documents</li>
              <li>Personal identification details (names, identity numbers, financial records)</li>
              <li>Browsing logs, search histories, or document activity histories</li>
            </ul>
          </section>

          <section className="p-5 sm:p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2.5">
            <h2 className="text-base sm:text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
              <span className="text-[var(--brand)] font-mono text-sm font-semibold">3.</span> Local Browser Processing Architecture
            </h2>
            <p>
              Traditional PDF tools send files over HTTP requests to cloud servers to be processed and returned. ihatelovepdf is built differently:
            </p>
            <p>
              All file processing runs locally in your web browser using open source libraries like PDF-lib and PDF.js. Your document data never travels across the internet.
            </p>
          </section>

          <section className="p-5 sm:p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2.5">
            <h2 className="text-base sm:text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
              <span className="text-[var(--brand)] font-mono text-sm font-semibold">4.</span> Cookies &amp; Local Storage
            </h2>
            <p>
              We prioritize data minimization:
            </p>
            <div className="space-y-2 pt-1 text-xs sm:text-sm">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[var(--text-main)]">Theme Preference (`ihatelovepdf-theme`):</strong> Stores your choice of Light or Dark mode in your browser&apos;s <code>localStorage</code>.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[var(--text-main)]">Privacy-Preserving Analytics:</strong> Aggregate, anonymized usage pageviews (via Google Analytics 4) to ensure site health and performance optimization. No document contents or PII are logged.
                </div>
              </div>
            </div>
          </section>

          <section className="p-5 sm:p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2.5">
            <h2 className="text-base sm:text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
              <span className="text-[var(--brand)] font-mono text-sm font-semibold">5.</span> Third-Party Libraries &amp; Licenses
            </h2>
            <p>ihatelovepdf relies on trusted open source libraries:</p>
            <ul className="list-disc list-inside space-y-1 pl-2 font-mono text-xs">
              <li>PDF-lib: MIT License (PDF manipulation and compilation)</li>
              <li>PDF.js: Apache License 2.0 (In-browser rendering and page previews)</li>
              <li>Lucide Icons: ISC License (UI icons)</li>
              <li>Next.js / React: MIT License (Frontend framework)</li>
            </ul>
          </section>

          <section className="p-5 sm:p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2.5">
            <h2 className="text-base sm:text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
              <span className="text-[var(--brand)] font-mono text-sm font-semibold">6.</span> International Legal Compliance
            </h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-xs sm:text-sm text-[var(--text-main)]">General Data Protection Regulation (GDPR)</h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Because no personal data or document content leaves your browser, ihatelovepdf complies with GDPR requirements for data minimization, storage limitation, and confidentiality by default.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-xs sm:text-sm text-[var(--text-main)]">Health Insurance Portability &amp; Accountability Act (HIPAA)</h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Since Protected Health Information (PHI) is never uploaded, transmitted, or stored on third-party servers, ihatelovepdf can safely be utilized for document manipulation without risk of cloud PHI breaches.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-xs sm:text-sm text-[var(--text-main)]">Lei Geral de Proteção de Dados (LGPD)</h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  In compliance with Brazil&apos;s LGPD, we collect no personal data profiles and process zero personal information on remote database systems.
                </p>
              </div>
            </div>
          </section>

          <section className="p-5 sm:p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2.5">
            <h2 className="text-base sm:text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
              <span className="text-[var(--brand)] font-mono text-sm font-semibold">7.</span> Privacy Concerns &amp; Contact
            </h2>
            <p>
              If you have any questions or concerns regarding our privacy practices, please contact us:
            </p>
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="mailto:shreyashsr2004@gmail.com"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[var(--brand)] text-white text-xs font-medium hover:opacity-95 transition-opacity"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>Contact shreyashsr2004@gmail.com</span>
              </a>
              {routes.contact && (
                <Link href={routes.contact} className="px-3.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--subtle)] text-xs font-medium text-[var(--text-main)] hover:border-[var(--brand)] transition-colors">
                  Open Contact Form
                </Link>
              )}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
