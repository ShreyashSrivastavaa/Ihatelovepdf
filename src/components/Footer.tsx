'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useDictionary, useLocale } from '../i18n/LocaleProvider';
import ContactModal from './ContactModal';
import { ShieldCheck, Coffee } from 'lucide-react';

export default function Footer() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const locale = useLocale();
  const dictionary = useDictionary();
  const footer = dictionary.components.footer;
  const routes = dictionary.routes;
  const toolsHref = locale === 'en' ? '/tools' : `/${locale}/tools`;

  return (
    <>
      <footer className="w-full shrink-0 border-t border-border bg-main py-10 mt-auto transition-colors duration-150">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 flex flex-col items-center gap-6 text-sm text-secondary">
          
          {/* Brand & Privacy Pill */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link href={routes.home} className="flex items-center gap-2 text-primary font-bold tracking-tight">
              <Image
                src="/images/stickers/ihatelove.png"
                alt="ihatelovepdf"
                width={24}
                height={24}
                className="object-contain"
                unoptimized
              />
              <span className="font-extrabold text-base">ihatelovepdf</span>
            </Link>
            <span className="hidden sm:inline-block text-border">·</span>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-border bg-alt text-xs font-medium text-secondary">
              <ShieldCheck className="h-3.5 w-3.5 text-success shrink-0" />
              <span>100% Private · Runs in Your Browser</span>
            </div>
          </div>

          {/* Primary Navigation Links */}
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-xs sm:text-sm">
            <Link href={toolsHref} prefetch={true} className="hover:text-primary transition-colors">
              All Tools
            </Link>
            <Link href="/privacy" prefetch={true} className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" prefetch={true} className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="/guides" prefetch={true} className="hover:text-primary transition-colors">
              Guides
            </Link>
            <Link href="/blog" prefetch={true} className="hover:text-primary transition-colors">
              Blog
            </Link>
            <Link href="/about" prefetch={true} className="hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/products" prefetch={true} className="hover:text-primary transition-colors font-medium text-brand">
              Our Products
            </Link>
            <Link href={routes.faq} prefetch={true} className="hover:text-primary transition-colors">
              {footer.links.faq}
            </Link>
            <Link
              href="/buy-me-a-coffee"
              prefetch={true}
              className="inline-flex items-center gap-1 text-accent hover:opacity-85 font-medium transition-opacity"
            >
              <Coffee className="h-3.5 w-3.5" />
              <span>Buy Me a Coffee</span>
            </Link>
            <button
              type="button"
              onClick={() => setIsContactOpen(true)}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              {footer.links.contact}
            </button>
          </div>

          {/* Alternatives & Comparisons */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs text-secondary/70 border-t border-border/60 pt-4 w-full">
            <span className="font-semibold text-secondary">Alternatives:</span>
            <Link href="/adobe-acrobat-alternative" className="hover:text-primary transition-colors">
              Adobe Acrobat Alternative
            </Link>
            <span>·</span>
            <Link href="/ihatepdf-alternative" className="hover:text-primary transition-colors">
              ihatepdf vs ihatelovepdf
            </Link>
            <span>·</span>
            <Link href="/ilovepdf-alternative" className="hover:text-primary transition-colors">
              iLovePDF Alternative
            </Link>
            <span>·</span>
            <Link href="/smallpdf-alternative" className="hover:text-primary transition-colors">
              Smallpdf Alternative
            </Link>
            <span>·</span>
            <Link href="/free-pdf-tools-without-signup" className="hover:text-primary transition-colors">
              Free Tools (No Signup)
            </Link>
            <span>·</span>
            <Link href="/offline-pdf-tools" className="hover:text-primary transition-colors">
              Offline PDF Tools
            </Link>
          </div>

          {/* Copyright, Author & One-line witty sign-off */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-secondary/80 w-full pt-2">
            <p>
              Made with quiet irritation © {new Date().getFullYear()} ihatelovepdf · All files processed locally.
            </p>
            <div className="flex items-center gap-3">
              <span>Built by</span>
              <a
                href="https://www.shreyashsrivastava.in/"
                target="_blank"
                rel="me author noopener noreferrer"
                className="font-semibold text-primary hover:underline"
              >
                Shreyash Srivastava
              </a>
              <span>·</span>
              <a
                href="https://github.com/ShreyashSrivastavaa"
                target="_blank"
                rel="me noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                GitHub
              </a>
              <span>·</span>
              <a
                href="https://www.linkedin.com/in/shreyashsrivastavaa"
                target="_blank"
                rel="me noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
