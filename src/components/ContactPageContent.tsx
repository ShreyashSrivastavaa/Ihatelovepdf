'use client';

import React, { useState } from 'react';
import ContactModal from './ContactModal';
import { Mail, Bug, Sparkles, ShieldCheck, MessageSquare, ArrowRight, MapPin } from 'lucide-react';

export default function ContactPageContent() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--tx)] transition-colors duration-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header */}
        <header className="text-center space-y-4 pb-8 border-b border-[var(--border)]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-soft)] border border-[var(--accent-border)] text-xs font-semibold text-[var(--accent)]">
            <Mail className="h-4 w-4" />
            Support & Community Center
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--tx)]">
            Get in Touch
          </h1>
          <p className="text-sm sm:text-base text-[var(--tx-2)] max-w-2xl mx-auto leading-relaxed">
            Have a question, feature idea, bug report, or privacy concern? We&apos;d love to hear from you.
          </p>
        </header>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            onClick={() => setIsModalOpen(true)}
            className="surface-card p-6 space-y-3 cursor-pointer hover:scale-[1.02] transition-transform"
          >
            <div className="w-10 h-10 rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center">
              <Bug className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-[var(--tx)]">Report a Bug</h3>
            <p className="text-xs text-[var(--tx-2)] leading-relaxed">
              Found a broken document parsing issue or visual glitch? Let us know so we can fix it promptly.
            </p>
            <div className="text-xs font-semibold text-[var(--accent)] flex items-center gap-1 pt-2">
              <span>Open Form</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </div>

          <div
            onClick={() => setIsModalOpen(true)}
            className="surface-card p-6 space-y-3 cursor-pointer hover:scale-[1.02] transition-transform"
          >
            <div className="w-10 h-10 rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-[var(--tx)]">Feature Request</h3>
            <p className="text-xs text-[var(--tx-2)] leading-relaxed">
              Suggest new PDF manipulation algorithms, options, layout options, or format conversions.
            </p>
            <div className="text-xs font-semibold text-[var(--accent)] flex items-center gap-1 pt-2">
              <span>Suggest Feature</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </div>

          <div
            onClick={() => setIsModalOpen(true)}
            className="surface-card p-6 space-y-3 cursor-pointer hover:scale-[1.02] transition-transform"
          >
            <div className="w-10 h-10 rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-[var(--tx)]">Privacy & General</h3>
            <p className="text-xs text-[var(--tx-2)] leading-relaxed">
              Questions regarding browser execution, security, licenses, or general inquiries.
            </p>
            <div className="text-xs font-semibold text-[var(--accent)] flex items-center gap-1 pt-2">
              <span>Contact Us</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>

        {/* Direct Email & Location Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="surface-card p-6 text-center space-y-3 flex flex-col justify-center">
            <MessageSquare className="h-8 w-8 text-[var(--accent)] mx-auto" />
            <h3 className="text-lg font-bold text-[var(--tx)]">Direct Email</h3>
            <p className="text-xs sm:text-sm text-[var(--tx-2)] max-w-xs mx-auto">
              Reach out directly for critical security, partnership, or maintainer inquiries:
            </p>
            <a
              href="mailto:shreyashsr2004@gmail.com"
              className="text-[var(--accent)] underline font-semibold text-sm block"
            >
              shreyashsr2004@gmail.com
            </a>
          </div>

          <div className="surface-card p-6 space-y-3.5 text-left text-xs text-[var(--tx-2)]">
            <div className="flex items-center gap-2 text-sm font-bold text-[var(--tx)]">
              <MapPin className="h-4 w-4 text-[var(--accent)]" />
              <span>Registered Location & Operations</span>
            </div>
            <div className="space-y-2 border-t border-[var(--border)] pt-3 font-normal">
              <div className="flex justify-between">
                <span className="text-[var(--tx-3)]">Lead Maintainer:</span>
                <span className="font-semibold text-[var(--tx)]">Shreyash Srivastava</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--tx-3)]">Headquarters / Base:</span>
                <span className="font-semibold text-[var(--tx)]">Sydney, NSW, Australia</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--tx-3)]">Operations:</span>
                <span className="font-semibold text-[var(--tx)]">Global Remote Web Services</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--tx-3)]">Guaranteed Response SLA:</span>
                <span className="font-semibold text-emerald-500">Within 24 business hours</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
