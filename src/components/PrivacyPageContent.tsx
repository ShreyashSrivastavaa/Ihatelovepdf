'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, HardDrive, EyeOff, CheckCircle2, Mail } from 'lucide-react';
import { useDictionary } from '../i18n/LocaleProvider';

export default function PrivacyPageContent() {
  const dictionary = useDictionary();
  const routes = dictionary.routes;

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--tx)] transition-colors duration-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header Banner */}
        <header className="text-center space-y-4 pb-8 border-b border-[var(--border)]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--success-soft)] border border-[var(--success-border)] text-xs font-semibold text-[var(--success)]">
            <ShieldCheck className="h-4 w-4" />
            100% Client-Side Local Processing
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--tx)]">
            Privacy Policy
          </h1>
          <p className="text-sm sm:text-base text-[var(--tx-2)] max-w-2xl mx-auto leading-relaxed">
            Your privacy is our absolute core promise. ihatelovepdf operates completely inside your browser — your documents never touch a remote server.
          </p>
          <div className="text-xs text-[var(--tx-3)] pt-2">
            Last Updated: July 31, 2026
          </div>
        </header>

        {/* Core Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="surface-card p-5 space-y-2">
            <div className="w-9 h-9 rounded-lg bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center">
              <Lock className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-[var(--tx)]">Zero Server Uploads</h3>
            <p className="text-xs text-[var(--tx-2)] leading-relaxed">
              Files uploaded to ihatelovepdf stay in your browser RAM and local disk storage. We operate zero cloud processing pipelines.
            </p>
          </div>

          <div className="surface-card p-5 space-y-2">
            <div className="w-9 h-9 rounded-lg bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center">
              <EyeOff className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-[var(--tx)]">No Tracking Cookies</h3>
            <p className="text-xs text-[var(--tx-2)] leading-relaxed">
              We do not use advertising identifiers or invasive profiling cookies. Only essential user settings (like theme) are stored locally.
            </p>
          </div>

          <div className="surface-card p-5 space-y-2">
            <div className="w-9 h-9 rounded-lg bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center">
              <HardDrive className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-[var(--tx)]">Instant Destruction</h3>
            <p className="text-xs text-[var(--tx-2)] leading-relaxed">
              Closing your browser tab immediately releases all file buffers from system memory. No data residual copies are maintained.
            </p>
          </div>
        </div>

        {/* Detailed Content Sections */}
        <div className="space-y-8 text-sm leading-relaxed text-[var(--tx-2)]">
          
          <section className="surface-card p-6 space-y-3">
            <h2 className="text-lg font-bold text-[var(--tx)] flex items-center gap-2">
              <span className="text-[var(--accent)] font-mono text-base">1.</span> Introduction
            </h2>
            <p>
              ihatelovepdf (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) provides a browser-based document utility toolkit designed to compress, merge, split, crop, rotate, reorder, and convert PDF files. This Privacy Policy governs your access to and use of our web application.
            </p>
          </section>

          <section className="surface-card p-6 space-y-3">
            <h2 className="text-lg font-bold text-[var(--tx)] flex items-center gap-2">
              <span className="text-[var(--accent)] font-mono text-base">2.</span> Information We Do NOT Collect
            </h2>
            <p>Because processing takes place strictly inside your client web browser, we do NOT collect, access, or inspect:</p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-[var(--tx-2)] font-normal">
              <li>Your uploaded PDF files or image assets</li>
              <li>Text, graphics, metadata, or form content inside your documents</li>
              <li>Personal identification details (names, identity numbers, financial records)</li>
              <li>Browsing logs, search histories, or document activity histories</li>
            </ul>
          </section>

          <section className="surface-card p-6 space-y-3">
            <h2 className="text-lg font-bold text-[var(--tx)] flex items-center gap-2">
              <span className="text-[var(--accent)] font-mono text-base">3.</span> Local Browser Processing Architecture
            </h2>
            <p>
              Traditional PDF tools send files over HTTP requests to cloud servers to be processed and returned. ihatelovepdf is built differently:
            </p>
            <p>
              We leverage modern client-side technologies — Web Workers, WebAssembly (WASM), PDF-lib, and Mozilla PDF.js — to run all document algorithms right inside your web browser. File bytes never traverse the internet.
            </p>
          </section>

          <section className="surface-card p-6 space-y-3">
            <h2 className="text-lg font-bold text-[var(--tx)] flex items-center gap-2">
              <span className="text-[var(--accent)] font-mono text-base">4.</span> Cookies & Local Storage
            </h2>
            <p>
              We prioritize data minimization:
            </p>
            <div className="space-y-2 pt-1">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[var(--success)] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[var(--tx)]">Theme Preference (`ihatelovepdf-theme`):</strong> Stores your choice of Light or Dark mode in your browser&apos;s <code>localStorage</code>.
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[var(--success)] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[var(--tx)]">Privacy-Preserving Analytics:</strong> Aggregate, anonymized usage pageviews (via Google Analytics 4) to ensure site health and performance optimization. No document contents or PII are logged.
                </div>
              </div>
            </div>
          </section>

          <section className="surface-card p-6 space-y-3">
            <h2 className="text-lg font-bold text-[var(--tx)] flex items-center gap-2">
              <span className="text-[var(--accent)] font-mono text-base">5.</span> Third-Party Libraries & Licenses
            </h2>
            <p>ihatelovepdf relies on trusted open-source technology frameworks:</p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 font-mono text-xs">
              <li>PDF-lib — MIT License (PDF manipulation and compilation)</li>
              <li>PDF.js — Apache License 2.0 (Client-side rendering and page previews)</li>
              <li>Lucide Icons — ISC License (UI icons)</li>
              <li>Next.js / React — MIT License (Frontend framework)</li>
            </ul>
          </section>

          <section className="surface-card p-6 space-y-3">
            <h2 className="text-lg font-bold text-[var(--tx)] flex items-center gap-2">
              <span className="text-[var(--accent)] font-mono text-base">6.</span> International Legal Compliance
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-[var(--tx)]">General Data Protection Regulation (GDPR)</h3>
                <p className="text-xs text-[var(--tx-2)]">
                  Because no personal data or document content leaves your browser, ihatelovepdf complies with GDPR requirements for data minimization, storage limitation, and confidentiality by default.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-[var(--tx)]">Health Insurance Portability & Accountability Act (HIPAA)</h3>
                <p className="text-xs text-[var(--tx-2)]">
                  Since Protected Health Information (PHI) is never uploaded, transmitted, or stored on third-party servers, ihatelovepdf can safely be utilized for document manipulation without risk of cloud PHI breaches.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-[var(--tx)]">Lei Geral de Proteção de Dados (LGPD)</h3>
                <p className="text-xs text-[var(--tx-2)]">
                  In compliance with Brazil&apos;s LGPD, we collect no personal data profiles and process zero personal information on remote database systems.
                </p>
              </div>
            </div>
          </section>

          <section className="surface-card p-6 space-y-3">
            <h2 className="text-lg font-bold text-[var(--tx)] flex items-center gap-2">
              <span className="text-[var(--accent)] font-mono text-base">7.</span> Privacy Concerns & Contact
            </h2>
            <p>
              If you have any questions or concerns regarding our privacy practices, please contact us:
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="mailto:shreyashsr2004@gmail.com"
                className="inline-flex items-center gap-2 btn-primary px-4 py-2 text-xs font-semibold"
              >
                <Mail className="h-4 w-4" />
                <span>Contact shreyashsr2004@gmail.com</span>
              </a>
              {routes.contact && (
                <Link href={routes.contact} className="btn-secondary px-4 py-2 text-xs font-semibold">
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
