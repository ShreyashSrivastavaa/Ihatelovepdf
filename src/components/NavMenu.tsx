'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo, useState, type ChangeEvent } from 'react';
import { useDictionary, useLocale } from '../i18n/LocaleProvider';
import { SUPPORTED_LOCALES, localeLabels, type Locale } from '../i18n/config';
import { getLocalizedAlternateMap, getRouteIdentifierForPath, getRoutePath } from '../i18n/routing';
import ContactModal from './ContactModal';
import { ShieldCheck, Globe, Menu, X } from 'lucide-react';

export default function NavMenu() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const dictionary = useDictionary();
  const locale = useLocale();
  const { nav } = dictionary.components;
  const routes = dictionary.routes;

  const isActive = (path: string) => pathname === path;

  const routeIdentifier = useMemo(() => getRouteIdentifierForPath(locale, pathname), [locale, pathname]);

  const languageOptions = useMemo(
    () => {
      const alternates = routeIdentifier ? getLocalizedAlternateMap(routeIdentifier) : null;
      return SUPPORTED_LOCALES.map(candidateLocale => ({
        locale: candidateLocale,
        href: alternates?.[candidateLocale] ?? getRoutePath(candidateLocale, 'home'),
      }));
    },
    [routeIdentifier]
  );

  const handleLocaleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value as Locale;
    const target = languageOptions.find(option => option.locale === nextLocale)?.href;
    setIsOpen(false);
    router.push(target ?? getRoutePath(nextLocale, 'home'));
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-md transition-colors duration-200">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 sm:px-6 py-3.5">
          <div className="flex items-center gap-3">
            <Link href={routes.home} className="flex items-center gap-2.5 group">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent)] text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
                <Image src="/logo.png" alt="PDFhelp logo" width={28} height={28} className="rounded-md object-contain" unoptimized />
              </div>
              <span className="text-lg font-bold tracking-tight text-[var(--tx)]">PDFhelp</span>
            </Link>

            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--bg-subtle)] px-2.5 py-0.5 text-xs font-medium text-[var(--tx-2)]">
              <ShieldCheck className="h-3.5 w-3.5 text-[var(--success)]" />
              100% Client-Side
            </span>
          </div>

          <button
            className="md:hidden p-2 rounded-md text-[var(--tx-2)] hover:bg-[var(--bg-subtle)] transition-colors"
            onClick={() => setIsOpen((open) => !open)}
            aria-label={nav.menuLabel}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <nav className={`${isOpen ? 'flex flex-col absolute top-full left-0 right-0 p-4 border-b border-[var(--border)] bg-[var(--bg-card)] shadow-lg' : 'hidden'} md:flex md:flex-row md:items-center md:static md:p-0 md:bg-transparent md:border-0 md:shadow-none md:gap-6`}>
            <ul className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-sm font-medium">
              <li>
                <Link
                  href={routes.home}
                  className={`px-2.5 py-1.5 rounded-md transition-colors ${
                    isActive(routes.home)
                      ? 'text-[var(--accent)] bg-[var(--accent-soft)] font-semibold'
                      : 'text-[var(--tx-2)] hover:text-[var(--tx)] hover:bg-[var(--bg-subtle)]'
                  }`}
                >
                  {nav.home}
                </Link>
              </li>
              <li>
                <Link
                  href={routes.faq}
                  className={`px-2.5 py-1.5 rounded-md transition-colors ${
                    isActive(routes.faq)
                      ? 'text-[var(--accent)] bg-[var(--accent-soft)] font-semibold'
                      : 'text-[var(--tx-2)] hover:text-[var(--tx)] hover:bg-[var(--bg-subtle)]'
                  }`}
                >
                  {nav.faq}
                </Link>
              </li>
              <li>
                <button
                  onClick={() => { setIsOpen(false); setIsContactOpen(true); }}
                  className="px-2.5 py-1.5 rounded-md text-[var(--tx-2)] hover:text-[var(--tx)] hover:bg-[var(--bg-subtle)] transition-colors text-left w-full md:w-auto"
                >
                  Contact
                </button>
              </li>
            </ul>

            <div className="mt-3 md:mt-0 pt-3 md:pt-0 border-t md:border-t-0 border-[var(--border)] flex items-center">
              <div className="relative inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-2.5 py-1 text-xs text-[var(--tx-2)] shadow-xs transition-colors hover:border-[var(--border-hover)]">
                <Globe className="h-3.5 w-3.5 text-[var(--tx-3)]" />
                <label className="sr-only" htmlFor="nav-language-select">
                  {nav.languageLabel}
                </label>
                <select
                  id="nav-language-select"
                  className="bg-transparent font-medium text-[var(--tx)] focus:outline-none cursor-pointer pr-1"
                  value={locale}
                  onChange={handleLocaleChange}
                >
                  {languageOptions.map(option => (
                    <option key={option.locale} value={option.locale} className="bg-[var(--bg-card)] text-[var(--tx)]">
                      {localeLabels[option.locale].nativeName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </nav>
        </div>
      </header>
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
