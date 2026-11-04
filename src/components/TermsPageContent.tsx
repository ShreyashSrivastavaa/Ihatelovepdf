'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, Shield, AlertTriangle, Scale, CheckCircle, Mail } from 'lucide-react';
import { useDictionary } from '../i18n/LocaleProvider';

export default function TermsPageContent() {
  const dictionary = useDictionary();
  const routes = dictionary.routes;

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-150 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header Banner */}
        <header className="text-center space-y-3 pb-8 border-b border-[var(--border)]">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--brand-soft)] border border-[var(--brand)]/20 text-xs font-semibold text-[var(--brand)]">
            <FileText className="h-3.5 w-3.5" />
            Terms &amp; Conditions of Service
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-main)]">
            Terms of Service
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed">
            Please read these terms carefully before using ihatelovepdf. By accessing or using our browser PDF toolkit, you agree to be bound by these terms.
          </p>
          <div className="text-xs text-[var(--text-muted)] pt-1">
            Last Updated: July 31, 2026
          </div>
        </header>

        {/* Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--brand-soft)] text-[var(--brand)] border border-[var(--brand)]/20 flex items-center justify-center">
              <Shield className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-semibold text-[var(--text-main)]">100% Free License</h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              ihatelovepdf is completely free for both personal and commercial document manipulation without paywalls.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--brand-soft)] text-[var(--brand)] border border-[var(--brand)]/20 flex items-center justify-center">
              <CheckCircle className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-semibold text-[var(--text-main)]">You Own Your Data</h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Your files remain 100% your property. We claim zero rights, ownership, or access to your processed output files.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--brand-soft)] text-[var(--brand)] border border-[var(--brand)]/20 flex items-center justify-center">
              <Scale className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-semibold text-[var(--text-main)]">Local Execution</h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              All processing runs locally in your browser &quot;as is&quot; without server guarantees.
            </p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-6 text-sm leading-relaxed text-[var(--text-muted)]">
          
          <section className="p-5 sm:p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2.5">
            <h2 className="text-base sm:text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
              <span className="text-[var(--brand)] font-mono text-sm font-semibold">1.</span> Acceptance of Terms
            </h2>
            <p>
              By accessing and using ihatelovepdf (accessible at <code>ihatelovepdf.com</code>), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service.
            </p>
          </section>

          <section className="p-5 sm:p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2.5">
            <h2 className="text-base sm:text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
              <span className="text-[var(--brand)] font-mono text-sm font-semibold">2.</span> Grant of Use License
            </h2>
            <p>
              Permission is granted to use ihatelovepdf for personal, educational, non-profit, or commercial document processing purposes free of charge. Under this license you may:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-xs sm:text-sm">
              <li>Process, merge, compress, split, crop, rotate, and convert unlimited PDF files locally</li>
              <li>Use generated output files for personal, corporate, or commercial projects</li>
            </ul>
          </section>

          <section className="p-5 sm:p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2.5">
            <h2 className="text-base sm:text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
              <span className="text-[var(--brand)] font-mono text-sm font-semibold">3.</span> Disclaimer of Warranties (&quot;As-Is&quot;)
            </h2>
            <p>
              ihatelovepdf is provided strictly on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind, whether express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.
            </p>
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-xs text-amber-700 dark:text-amber-400 font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              <span>We advise keeping backup copies of your original document files before performing local compression, splitting, or page deletion.</span>
            </div>
          </section>

          <section className="p-5 sm:p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2.5">
            <h2 className="text-base sm:text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
              <span className="text-[var(--brand)] font-mono text-sm font-semibold">4.</span> Limitation of Liability
            </h2>
            <p>
              In no event shall ihatelovepdf, its maintainers, or open-source contributors be liable for any direct, indirect, incidental, special, exemplary, or consequential damages (including loss of data, document corruption, business interruption, or system crash) arising in any way out of the use of this software tool.
            </p>
          </section>

          <section className="p-5 sm:p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2.5">
            <h2 className="text-base sm:text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
              <span className="text-[var(--brand)] font-mono text-sm font-semibold">5.</span> Prohibited Uses
            </h2>
            <p>You agree not to use ihatelovepdf to:</p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-xs sm:text-sm">
              <li>Process content that violates applicable local, national, or international laws</li>
              <li>Infringe upon the intellectual property rights or copyright of third parties</li>
              <li>Inject malicious code, exploits, or harmful scripts into document streams</li>
              <li>Attempt to reverse engineer or overload site infrastructure through automated spam attacks</li>
            </ul>
          </section>

          <section className="p-5 sm:p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2.5">
            <h2 className="text-base sm:text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
              <span className="text-[var(--brand)] font-mono text-sm font-semibold">6.</span> Intellectual Property &amp; Open Source
            </h2>
            <p>
              ihatelovepdf is built upon established open source software libraries, including PDF-lib (MIT License), PDF.js (Apache License 2.0), and Next.js (MIT License). All trademarks, service marks, and brand names are the property of their respective owners.
            </p>
          </section>

          <section className="p-5 sm:p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2.5">
            <h2 className="text-base sm:text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
              <span className="text-[var(--brand)] font-mono text-sm font-semibold">7.</span> Modifications &amp; Governing Law
            </h2>
            <p>
              We reserve the right to modify or update these terms at any time. Changes become effective immediately upon being posted on this page. These terms shall be governed by and construed in accordance with applicable laws without regard to conflict of law provisions.
            </p>
          </section>

          <section className="p-5 sm:p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2.5">
            <h2 className="text-base sm:text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
              <span className="text-[var(--brand)] font-mono text-sm font-semibold">8.</span> Inquiries &amp; Contact
            </h2>
            <p>
              For any questions regarding these Terms of Service, please reach out directly:
            </p>
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="mailto:shreyashsr2004@gmail.com"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[var(--brand)] text-white text-xs font-medium hover:opacity-95 transition-opacity"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>Contact Legal / Support</span>
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
