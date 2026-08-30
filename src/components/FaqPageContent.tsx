'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useDictionary } from '../i18n/LocaleProvider';
import type { Dictionary } from '../i18n/dictionaries/dictionary-types';
import FaqSection from './faq-section';
import ContactModal from './ContactModal';
import { HelpCircle, ArrowRight, Mail } from 'lucide-react';

export function FaqPageContent({ dictionary: propDictionary }: { dictionary?: Dictionary } = {}) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const contextDictionary = useDictionary();
  const dictionary = propDictionary || contextDictionary;
  const faqPage = dictionary.pages.faq;

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--tx)]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16 space-y-12">
        {/* HERO SECTION */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-soft)] border border-[var(--accent-border)] text-xs font-mono font-bold uppercase tracking-widest text-[var(--accent)]">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Support & Privacy Center</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[var(--tx)]">
            {faqPage.title}
          </h1>

          <p className="text-base sm:text-lg text-[var(--tx-2)] leading-relaxed">
            {faqPage.intro}
          </p>
        </div>

        {/* ACCORDION FAQ ITEMS */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 sm:p-8 shadow-xs">
          <FaqSection />
        </div>

        {/* STILL HAVE QUESTIONS CARD */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 sm:p-8 text-center space-y-4 shadow-xs">
          <div className="h-12 w-12 rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent-border)] flex items-center justify-center mx-auto shadow-xs">
            <Mail className="h-6 w-6 stroke-[1.8]" />
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-bold text-[var(--tx)]">Still have questions?</h2>
            <p className="text-xs sm:text-sm text-[var(--tx-2)] max-w-md mx-auto">
              Our engineering team is always ready to assist with bug reports, feature requests, and privacy questions.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => setIsContactOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition-all cursor-pointer shadow-xs"
            >
              <span>Contact Support</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* BOTTOM CTA: RETURN TO TOOLS */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)] p-6 sm:p-8 text-center space-y-4 shadow-xs">
          <h2 className="text-xl sm:text-2xl font-black text-[var(--tx)]">{faqPage.cta.title}</h2>
          <p className="text-xs sm:text-sm text-[var(--tx-2)] max-w-lg mx-auto leading-relaxed">
            {faqPage.cta.description}
          </p>
          <div className="pt-2">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition-all shadow-xs"
            >
              <span>{faqPage.cta.ctaLabel}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}
