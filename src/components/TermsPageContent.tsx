'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, Shield, AlertTriangle, Scale, CheckCircle, Mail } from 'lucide-react';
import { useDictionary } from '../i18n/LocaleProvider';

export default function TermsPageContent() {
  const dictionary = useDictionary();
  const routes = dictionary.routes;

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--tx)] transition-colors duration-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header Banner */}
        <header className="text-center space-y-4 pb-8 border-b border-[var(--border)]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-soft)] border border-[var(--accent-border)] text-xs font-semibold text-[var(--accent)]">
            <FileText className="h-4 w-4" />
            Terms & Conditions of Service
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--tx)]">
            Terms of Service
          </h1>
          <p className="text-sm sm:text-base text-[var(--tx-2)] max-w-2xl mx-auto leading-relaxed">
            Please read these terms carefully before using ihatelovepdf. By accessing or using our browser PDF toolkit, you agree to be bound by these terms.
          </p>
          <div className="text-xs text-[var(--tx-3)] pt-2">
            Last Updated: July 31, 2026
          </div>
        </header>

        {/* Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="surface-card p-5 space-y-2">
            <div className="w-9 h-9 rounded-lg bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center">
              <Shield className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-[var(--tx)]">100% Free License</h3>
            <p className="text-xs text-[var(--tx-2)] leading-relaxed">
              ihatelovepdf is completely free for both personal and commercial document manipulation without paywalls.
            </p>
          </div>

          <div className="surface-card p-5 space-y-2">
            <div className="w-9 h-9 rounded-lg bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center">
              <CheckCircle className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-[var(--tx)]">You Own Your Data</h3>
            <p className="text-xs text-[var(--tx-2)] leading-relaxed">
              Your files remain 100% your property. We claim zero rights, ownership, or access to your processed output files.
            </p>
          </div>

          <div className="surface-card p-5 space-y-2">
            <div className="w-9 h-9 rounded-lg bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center">
              <Scale className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-[var(--tx)]">Local Execution</h3>
            <p className="text-xs text-[var(--tx-2)] leading-relaxed">
              All processing runs locally in your browser &quot;as is&quot; without server guarantees.
            </p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8 text-sm leading-relaxed text-[var(--tx-2)]">
          
          <section className="surface-card p-6 space-y-3">
            <h2 className="text-lg font-bold text-[var(--tx)] flex items-center gap-2">
              <span className="text-[var(--accent)] font-mono text-base">1.</span> Acceptance of Terms
            </h2>
            <p>
              By accessing and using ihatelovepdf (accessible at <code>ihatelovepdf.com</code>), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service.
            </p>
          </section>

          <section className="surface-card p-6 space-y-3">
            <h2 className="text-lg font-bold text-[var(--tx)] flex items-center gap-2">
              <span className="text-[var(--accent)] font-mono text-base">2.</span> Grant of Use License
            </h2>
            <p>
              Permission is granted to use ihatelovepdf for personal, educational, non-profit, or commercial document processing purposes free of charge. Under this license you may:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li>Process, merge, compress, split, crop, rotate, and convert unlimited PDF files locally</li>
              <li>Use generated output files for personal, corporate, or commercial projects</li>
            </ul>
          </section>

          <section className="surface-card p-6 space-y-3">
            <h2 className="text-lg font-bold text-[var(--tx)] flex items-center gap-2">
              <span className="text-[var(--accent)] font-mono text-base">3.</span> Disclaimer of Warranties (&quot;As-Is&quot;)
            </h2>
            <p>
              ihatelovepdf is provided strictly on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind, whether express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.
            </p>
            <div className="p-3 bg-[var(--warning-soft)] border border-[var(--warning)]/30 rounded-xl text-xs text-[var(--warning)] font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              <span>We advise keeping backup copies of your original document files before performing local compression, splitting, or page deletion.</span>
            </div>
          </section>

          <section className="surface-card p-6 space-y-3">
            <h2 className="text-lg font-bold text-[var(--tx)] flex items-center gap-2">
              <span className="text-[var(--accent)] font-mono text-base">4.</span> Limitation of Liability
            </h2>
            <p>
              In no event shall ihatelovepdf, its maintainers, or open-source contributors be liable for any direct, indirect, incidental, special, exemplary, or consequential damages (including loss of data, document corruption, business interruption, or system crash) arising in any way out of the use of this software tool.
            </p>
          </section>

          <section className="surface-card p-6 space-y-3">
            <h2 className="text-lg font-bold text-[var(--tx)] flex items-center gap-2">
              <span className="text-[var(--accent)] font-mono text-base">5.</span> Prohibited Uses
            </h2>
            <p>You agree not to use ihatelovepdf to:</p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li>Process content that violates applicable local, national, or international laws</li>
              <li>Infringe upon the intellectual property rights or copyright of third parties</li>
              <li>Inject malicious code, exploits, or harmful scripts into document streams</li>
              <li>Attempt to reverse engineer or overload site infrastructure through automated spam attacks</li>
            </ul>
          </section>

          <section className="surface-card p-6 space-y-3">
            <h2 className="text-lg font-bold text-[var(--tx)] flex items-center gap-2">
              <span className="text-[var(--accent)] font-mono text-base">6.</span> Intellectual Property & Open Source
            </h2>
            <p>
              ihatelovepdf is built upon established open source software libraries, including PDF-lib (MIT License), PDF.js (Apache License 2.0), and Next.js (MIT License). All trademarks, service marks, and brand names are the property of their respective owners.
            </p>
          </section>

          <section className="surface-card p-6 space-y-3">
            <h2 className="text-lg font-bold text-[var(--tx)] flex items-center gap-2">
              <span className="text-[var(--accent)] font-mono text-base">7.</span> Modifications & Governing Law
            </h2>
            <p>
              We reserve the right to modify or update these terms at any time. Changes become effective immediately upon being posted on this page. These terms shall be governed by and construed in accordance with applicable laws without regard to conflict of law provisions.
            </p>
          </section>

          <section className="surface-card p-6 space-y-3">
            <h2 className="text-lg font-bold text-[var(--tx)] flex items-center gap-2">
              <span className="text-[var(--accent)] font-mono text-base">8.</span> Inquiries & Contact
            </h2>
            <p>
              For any questions regarding these Terms of Service, please reach out directly:
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="mailto:shreyashsr2004@gmail.com"
                className="inline-flex items-center gap-2 btn-primary px-4 py-2 text-xs font-semibold"
              >
                <Mail className="h-4 w-4" />
                <span>Contact Legal / Support</span>
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
