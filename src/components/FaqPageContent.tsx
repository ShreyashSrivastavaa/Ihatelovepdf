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
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16 space-y-10">
        {/* HERO SECTION */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--brand-soft)] border border-[var(--brand)]/20 text-xs font-semibold text-[var(--brand)]">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Support &amp; Privacy Center</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--text-main)]">
            {faqPage.title}
          </h1>

          <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
            {faqPage.intro}
          </p>
        </div>

        {/* ACCORDION FAQ ITEMS */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-7">
          <FaqSection />
        </div>

        {/* STILL HAVE QUESTIONS CARD */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 text-center space-y-3.5">
          <div className="h-10 w-10 rounded-xl bg-[var(--brand-soft)] text-[var(--brand)] border border-[var(--brand)]/20 flex items-center justify-center mx-auto">
            <Mail className="h-5 w-5 stroke-[1.8]" />
          </div>

          <div className="space-y-1">
            <h2 className="text-lg font-bold text-[var(--text-main)]">Still have questions?</h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-md mx-auto">
              Our engineering team is always ready to assist with bug reports, feature requests, and privacy questions.
            </p>
          </div>

          <div className="pt-1">
            <button
              type="button"
              onClick={() => setIsContactOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm bg-[var(--brand)] text-white hover:opacity-95 transition-all cursor-pointer"
            >
              <span>Contact Support</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* BOTTOM CTA: RETURN TO TOOLS */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--subtle)] p-6 text-center space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-[var(--text-main)]">{faqPage.cta.title}</h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-lg mx-auto leading-relaxed">
            {faqPage.cta.description}
          </p>
          <div className="pt-1">
            <Link
              href="/tools"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg font-semibold text-xs sm:text-sm bg-[var(--brand)] text-white hover:opacity-95 transition-all"
            >
              <span>{faqPage.cta.ctaLabel}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}
