'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useDictionary } from '../i18n/LocaleProvider';
import ContactModal from './ContactModal';
import { ShieldCheck } from 'lucide-react';

export default function Footer() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const dictionary = useDictionary();
  const footer = dictionary.components.footer;
  const routes = dictionary.routes;

  return (
    <>
      <footer className="w-full border-t border-[var(--border)] bg-[var(--bg)] text-[var(--tx-2)] py-12 transition-colors duration-200">
        <div className="mx-auto max-w-[1140px] px-4 sm:px-6 space-y-8">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-[var(--border)]">
            <div className="flex items-center gap-2.5">
              <Image src="/images/stickers/ihatelove.png" alt="ihatelovepdf logo" width={32} height={32} className="object-contain h-8 w-8" unoptimized />
              <span className="text-lg font-extrabold text-[var(--tx)]">ihatelovepdf</span>
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
            </div>
          </div>



          <div className="pt-4 text-xs text-[var(--tx-3)] space-y-1.5 border-t border-[var(--border)]">
            <p className="font-medium text-[var(--tx-2)]">
              Created &amp; Maintained by{' '}
              <a
                href="https://shreyashsrivastava.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[var(--tx)] hover:underline"
              >
                Shreyash Srivastava
              </a>{' '}
              •{' '}
              <a
                href="https://github.com/ShreyashSrivastavaa"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--tx)] transition-colors"
              >
                GitHub Profile
              </a>
            </p>
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
