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
              <Link href={routes.home} prefetch={true} className="hover:text-[var(--tx)] transition-colors">
                {footer.links.home}
              </Link>
              <Link href="/tools" prefetch={true} className="hover:text-[var(--tx)] transition-colors">
                All Tools
              </Link>
              <Link href="/products" prefetch={true} className="hover:text-[var(--tx)] transition-colors text-[var(--accent)] font-semibold">
                Our Products
              </Link>
              <Link href="/about" prefetch={true} className="hover:text-[var(--tx)] transition-colors">
                About
              </Link>
              <Link href="/guides" prefetch={true} className="hover:text-[var(--tx)] transition-colors">
                Guides
              </Link>
              <Link href={routes.faq} prefetch={true} className="hover:text-[var(--tx)] transition-colors">
                {footer.links.faq}
              </Link>
              <Link href={routes.privacy || '/privacy'} prefetch={true} className="hover:text-[var(--tx)] transition-colors">
                Privacy Policy
              </Link>
              <Link href={routes.terms || '/terms'} prefetch={true} className="hover:text-[var(--tx)] transition-colors">
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



          <div className="pt-6 border-t border-[var(--border)]">
            {/* Top row: author info + badge */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
              {/* Left: author + links */}
              <div className="space-y-2 text-xs text-[var(--tx-3)]">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="font-medium text-[var(--tx-2)]">Created &amp; maintained by</span>
                  <a
                    href="https://shreyashsrivastava.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[var(--tx)] hover:underline transition-colors"
                  >
                    Shreyash Srivastava
                  </a>
                  <span className="opacity-50">·</span>
                  <a
                    href="https://linkedin.com/in/shreyashsrivastavaa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--tx)] transition-colors"
                  >
                    LinkedIn
                  </a>
                  <span className="opacity-50">·</span>
                  <a
                    href="https://github.com/ShreyashSrivastavaa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--tx)] transition-colors"
                  >
                    GitHub
                  </a>
                  <span className="opacity-50">·</span>
                  <a
                    href="https://x.com/YesShrey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--tx)] transition-colors"
                  >
                    Twitter/X
                  </a>
                </div>
                <div className="space-y-0.5 pt-1">
                  <p className="text-[11px] text-[var(--tx-3)]">{footer.rights}</p>
                  <p className="text-[11px] opacity-65">{footer.license}</p>
                  {footer.disclaimer && (
                    <p className="text-[11px] opacity-55 max-w-xl leading-relaxed">{footer.disclaimer}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
