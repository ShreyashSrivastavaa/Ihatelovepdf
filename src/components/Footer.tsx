'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useDictionary } from '../i18n/LocaleProvider';
import type { OperationKey } from '../types/operations';
import ContactModal from './ContactModal';
import { ShieldCheck, Github } from 'lucide-react';

export default function Footer() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const dictionary = useDictionary();
  const footer = dictionary.components.footer;
  const routes = dictionary.routes;
  const footerOperationLinks = (Object.keys(routes.operations) as OperationKey[])
    .map((operation) => {
      const href = routes.operations[operation];
      const label = footer.operations[operation];

      if (!href || !label) {
        return null;
      }

      return { operation, href, label };
    })
    .filter((link): link is { operation: OperationKey; href: string; label: string } => link !== null);

  return (
    <>
      <footer className="w-full border-t border-[var(--border)] bg-[var(--bg)] text-[var(--tx-2)] py-12 transition-colors duration-200">
        <div className="mx-auto max-w-[1140px] px-4 sm:px-6 space-y-8">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-[var(--border)]">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-[var(--tx)]">PDFhelp</span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-[var(--success-border)] bg-[var(--success-soft)] text-xs font-medium text-[var(--tx)]">
                <ShieldCheck className="h-3.5 w-3.5 text-[var(--success)]" />
                100% Private
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm font-medium">
              <Link href={routes.home} className="hover:text-[var(--tx)] transition-colors">
                {footer.links.home}
              </Link>
              <Link href={routes.faq} className="hover:text-[var(--tx)] transition-colors">
                {footer.links.faq}
              </Link>
              <Link href={routes.privacy || '/privacy'} className="hover:text-[var(--tx)] transition-colors">
                Privacy Policy
              </Link>
              <Link href={routes.terms || '/terms'} className="hover:text-[var(--tx)] transition-colors">
                Terms of Service
              </Link>
              <button
                onClick={() => setIsContactOpen(true)}
                className="hover:text-[var(--tx)] transition-colors cursor-pointer"
              >
                {footer.links.contact}
              </button>
              <a
                href="https://github.com/ShreyashSrivastavaa/PDFhelp"
                className="inline-flex items-center gap-1.5 hover:text-[var(--tx)] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-[var(--tx-3)] uppercase tracking-wider">
              {footer.capabilitiesLabel}
            </h4>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-[var(--tx-2)]">
              {footerOperationLinks.map(({ operation, href, label }) => (
                <Link 
                  key={operation} 
                  href={href} 
                  className="hover:text-[var(--accent)] transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-4 text-xs text-[var(--tx-3)] space-y-1.5 border-t border-[var(--border)]">
            <p>{footer.rights}</p>
            <p className="opacity-75">{footer.license}</p>
            {footer.disclaimer && (
              <p className="opacity-65 text-[11px] max-w-4xl">{footer.disclaimer}</p>
            )}
          </div>
        </div>
      </footer>
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
