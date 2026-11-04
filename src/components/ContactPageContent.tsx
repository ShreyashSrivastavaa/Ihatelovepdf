'use client';

import React, { useState } from 'react';
import ContactModal from './ContactModal';
import { Mail, Bug, Sparkles, ShieldCheck, MessageSquare, ArrowRight, MapPin } from 'lucide-react';

export default function ContactPageContent() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-150 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header */}
        <header className="text-center space-y-3 pb-8 border-b border-[var(--border)]">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--brand-soft)] border border-[var(--brand)]/20 text-xs font-semibold text-[var(--brand)]">
            <Mail className="h-3.5 w-3.5" />
            Support &amp; Community Center
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-main)]">
            Get in Touch
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed">
            Have a question, feature idea, bug report, or privacy concern? We&apos;d love to hear from you.
          </p>
        </header>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          <div
            onClick={() => setIsModalOpen(true)}
            className="p-5 sm:p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2.5 cursor-pointer hover:border-[var(--brand)] transition-colors"
          >
            <div className="w-9 h-9 rounded-lg bg-[var(--brand-soft)] text-[var(--brand)] flex items-center justify-center border border-[var(--brand)]/20">
              <Bug className="h-4 w-4" />
            </div>
            <h3 className="text-base font-semibold text-[var(--text-main)]">Report a Bug</h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Found a broken document parsing issue or visual glitch? Let us know so we can fix it promptly.
            </p>
            <div className="text-xs font-semibold text-[var(--brand)] flex items-center gap-1 pt-1">
              <span>Open Form</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </div>

          <div
            onClick={() => setIsModalOpen(true)}
            className="p-5 sm:p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2.5 cursor-pointer hover:border-[var(--brand)] transition-colors"
          >
            <div className="w-9 h-9 rounded-lg bg-[var(--brand-soft)] text-[var(--brand)] flex items-center justify-center border border-[var(--brand)]/20">
              <Sparkles className="h-4 w-4" />
            </div>
            <h3 className="text-base font-semibold text-[var(--text-main)]">Feature Request</h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Suggest new PDF manipulation algorithms, options, layout options, or format conversions.
            </p>
            <div className="text-xs font-semibold text-[var(--brand)] flex items-center gap-1 pt-1">
              <span>Suggest Feature</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </div>

          <div
            onClick={() => setIsModalOpen(true)}
            className="p-5 sm:p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2.5 cursor-pointer hover:border-[var(--brand)] transition-colors"
          >
            <div className="w-9 h-9 rounded-lg bg-[var(--brand-soft)] text-[var(--brand)] flex items-center justify-center border border-[var(--brand)]/20">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <h3 className="text-base font-semibold text-[var(--text-main)]">Privacy &amp; General</h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Questions regarding browser execution, security, licenses, or general inquiries.
            </p>
            <div className="text-xs font-semibold text-[var(--brand)] flex items-center gap-1 pt-1">
              <span>Contact Us</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>

        {/* Direct Email & Location Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] text-center space-y-2.5 flex flex-col justify-center">
            <MessageSquare className="h-7 w-7 text-[var(--brand)] mx-auto" />
            <h3 className="text-base font-bold text-[var(--text-main)]">Direct Email</h3>
            <p className="text-xs text-[var(--text-muted)] max-w-xs mx-auto">
              Reach out directly for critical security, partnership, or maintainer inquiries:
            </p>
            <a
              href="mailto:shreyashsr2004@gmail.com"
              className="text-[var(--brand)] underline font-medium text-xs sm:text-sm block"
            >
              shreyashsr2004@gmail.com
            </a>
          </div>

          <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-3 text-left text-xs text-[var(--text-muted)]">
            <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-main)]">
              <MapPin className="h-4 w-4 text-[var(--brand)]" />
              <span>Registered Location &amp; Operations</span>
            </div>
            <div className="space-y-2 border-t border-[var(--border)] pt-3 font-normal">
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Lead Maintainer:</span>
                <span className="font-medium text-[var(--text-main)]">Shreyash Srivastava</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Headquarters / Base:</span>
                <span className="font-medium text-[var(--text-main)]">Sydney, NSW, Australia</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Operations:</span>
                <span className="font-medium text-[var(--text-main)]">Global Remote Web Services</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Guaranteed Response SLA:</span>
                <span className="font-medium text-emerald-600 dark:text-emerald-400">Within 24 business hours</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
