'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo, useState, useEffect, type ChangeEvent } from 'react';
import { useDictionary, useLocale } from '../i18n/LocaleProvider';
import { SUPPORTED_LOCALES, localeLabels, type Locale } from '../i18n/config';
import { getLocalizedAlternateMap, getRouteIdentifierForPath, getRoutePath } from '../i18n/routing';
import ContactModal from './ContactModal';
import { ShieldCheck, Globe, Menu, X, Sun, Moon, FileText, Shield, Mail, Sparkles } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function NavMenu() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const dictionary = useDictionary();
  const locale = useLocale();
  const { theme, toggleTheme } = useTheme();
  const { nav } = dictionary.components;
  const routes = dictionary.routes;

  const isActive = (path: string) => pathname === path;

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

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
      <header className="sticky top-0 z-40 w-full border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-md transition-colors duration-200 header-safe-area">
        <div className="mx-auto flex h-[56px] md:h-auto max-w-[1200px] items-center justify-between px-3 sm:px-6 py-2 sm:py-3.5">
          
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Hamburger Button (top-left on < 768px) */}
            <button
              type="button"
              className="md:hidden flex h-11 w-11 items-center justify-center rounded-lg text-[var(--tx-2)] hover:bg-[var(--bg-subtle)] transition-colors focus:outline-none"
              onClick={() => setIsOpen((open) => !open)}
              aria-label={nav.menuLabel}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            <Link href={routes.home} onClick={() => setIsOpen(false)} className="flex items-center gap-2.5 group">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105">
                <Image src="/images/stickers/ihatelove.png" alt="ihatelovepdf logo" width={40} height={40} className="object-contain h-10 w-10" unoptimized />
              </div>
              <span className="text-lg font-extrabold tracking-tight text-[var(--tx)]">ihatelovepdf</span>
            </Link>

            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--bg-subtle)] px-2.5 py-0.5 text-xs font-medium text-[var(--tx-2)]">
              <ShieldCheck className="h-3.5 w-3.5 text-[var(--success)]" />
              100% Client-Side
            </span>
          </div>

          {/* Desktop Navigation Links (>= 768px) */}
          <nav className="hidden md:flex md:flex-row md:items-center md:gap-6">
            <ul className="flex flex-row items-center gap-6 text-sm font-medium">
              <li>
                <Link
                  href={routes.home}
                  prefetch={true}
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
                  href="/tools"
                  prefetch={true}
                  className={`px-2.5 py-1.5 rounded-md transition-colors ${
                    isActive('/tools')
                      ? 'text-[var(--accent)] bg-[var(--accent-soft)] font-semibold'
                      : 'text-[var(--tx-2)] hover:text-[var(--tx)] hover:bg-[var(--bg-subtle)]'
                  }`}
                >
                  All Tools
                </Link>
              </li>
              <li>
                <Link
                  href="/guides"
                  prefetch={true}
                  className={`px-2.5 py-1.5 rounded-md transition-colors ${
                    isActive('/guides')
                      ? 'text-[var(--accent)] bg-[var(--accent-soft)] font-semibold'
                      : 'text-[var(--tx-2)] hover:text-[var(--tx)] hover:bg-[var(--bg-subtle)]'
                  }`}
                >
                  Guides
                </Link>
              </li>
              <li>
                <Link
                  href={routes.faq}
                  prefetch={true}
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
                <Link
                  href={routes.support || '/support'}
                  prefetch={true}
                  className={`px-2.5 py-1.5 rounded-md transition-colors ${
                    isActive(routes.support || '/support')
                      ? 'text-[var(--accent)] bg-[var(--accent-soft)] font-semibold text-[var(--accent)]'
                      : 'text-[var(--tx-2)] hover:text-[var(--tx)] hover:bg-[var(--bg-subtle)]'
                  }`}
                >
                  ❤️ Support
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  prefetch={true}
                  className={`px-2.5 py-1.5 rounded-md transition-colors ${
                    isActive('/products')
                      ? 'text-[var(--accent)] bg-[var(--accent-soft)] font-semibold'
                      : 'text-[var(--tx-2)] hover:text-[var(--tx)] hover:bg-[var(--bg-subtle)]'
                  }`}
                >
                  Our Products
                </Link>
              </li>
              <li>
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="px-2.5 py-1.5 rounded-md text-[var(--tx-2)] hover:text-[var(--tx)] hover:bg-[var(--bg-subtle)] transition-colors text-left cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>

            <div className="flex items-center gap-2">
              {/* Theme Toggle Button */}
              <button
                type="button"
                onClick={toggleTheme}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-card)] text-[var(--tx-2)] hover:text-[var(--tx)] hover:border-[var(--border-hover)] transition-all cursor-pointer shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
                title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5 text-amber-400 stroke-[2] transition-transform duration-200 hover:rotate-45" />
                ) : (
                  <Moon className="h-5 w-5 text-slate-600 stroke-[2] transition-transform duration-200 hover:-rotate-12" />
                )}
              </button>

              {/* Desktop Language Selector */}
              <div className="relative inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-2.5 py-1.5 text-xs text-[var(--tx-2)] shadow-xs transition-colors hover:border-[var(--border-hover)]">
                <Globe className="h-3.5 w-3.5 text-[var(--tx-3)]" />
                <label className="sr-only" htmlFor="nav-language-select-desktop">
                  {nav.languageLabel}
                </label>
                <select
                  id="nav-language-select-desktop"
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

          {/* Mobile Right Controls: Theme Toggle Button (always visible on mobile header) */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-card)] text-[var(--tx-2)] hover:text-[var(--tx)] transition-all cursor-pointer shadow-xs"
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-amber-400 stroke-[2]" />
              ) : (
                <Moon className="h-5 w-5 text-slate-600 stroke-[2]" />
              )}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 top-[56px] z-40 bg-black/60 backdrop-blur-xs md:hidden animate-fade-in"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Slide-In Left Drawer Navigation Menu */}
      <div
        className={`fixed top-[56px] left-0 bottom-0 z-50 w-full bg-[var(--bg-card)] border-b border-[var(--border)] shadow-2xl transition-transform duration-300 ease-in-out md:hidden flex flex-col justify-between overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--tx-3)]">Navigation Menu</span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md text-[var(--tx-3)] hover:text-[var(--tx)] hover:bg-[var(--bg-subtle)]"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="space-y-1.5">
            <Link
              href={routes.home}
              prefetch={true}
              onClick={() => setIsOpen(false)}
              className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors min-h-[44px] w-full ${
                isActive(routes.home)
                  ? 'text-[var(--accent)] bg-[var(--accent-soft)]'
                  : 'text-[var(--tx)] hover:bg-[var(--bg-subtle)]'
              }`}
            >
              <span>{nav.home}</span>
            </Link>

            <Link
              href="/tools"
              prefetch={true}
              onClick={() => setIsOpen(false)}
              className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors min-h-[44px] w-full ${
                isActive('/tools')
                  ? 'text-[var(--accent)] bg-[var(--accent-soft)]'
                  : 'text-[var(--tx)] hover:bg-[var(--bg-subtle)]'
              }`}
            >
              <span>All Tools (45+)</span>
            </Link>

            <Link
              href="/guides"
              prefetch={true}
              onClick={() => setIsOpen(false)}
              className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors min-h-[44px] w-full ${
                isActive('/guides')
                  ? 'text-[var(--accent)] bg-[var(--accent-soft)]'
                  : 'text-[var(--tx)] hover:bg-[var(--bg-subtle)]'
              }`}
            >
              <span>Guides & Tutorials</span>
            </Link>

            <Link
              href={routes.faq}
              prefetch={true}
              onClick={() => setIsOpen(false)}
              className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors min-h-[44px] w-full ${
                isActive(routes.faq)
                  ? 'text-[var(--accent)] bg-[var(--accent-soft)]'
                  : 'text-[var(--tx)] hover:bg-[var(--bg-subtle)]'
              }`}
            >
              <span>{nav.faq}</span>
            </Link>

            <Link
              href={routes.support || '/support'}
              prefetch={true}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors min-h-[44px] w-full ${
                isActive(routes.support || '/support')
                  ? 'text-[var(--accent)] bg-[var(--accent-soft)]'
                  : 'text-[var(--tx)] hover:bg-[var(--bg-subtle)]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="shrink-0">❤️</span>
                <span>Support / Donate</span>
              </div>
            </Link>

            <Link
              href="/products"
              prefetch={true}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors min-h-[44px] w-full ${
                isActive('/products')
                  ? 'text-[var(--accent)] bg-[var(--accent-soft)]'
                  : 'text-[var(--tx)] hover:bg-[var(--bg-subtle)]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="h-4 w-4 text-[var(--accent)] shrink-0" />
                <span>Our Products</span>
              </div>
            </Link>

            <Link
              href={routes.privacy || '/privacy'}
              prefetch={true}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors min-h-[44px] w-full ${
                isActive(routes.privacy || '/privacy')
                  ? 'text-[var(--accent)] bg-[var(--accent-soft)]'
                  : 'text-[var(--tx)] hover:bg-[var(--bg-subtle)]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Shield className="h-4 w-4 text-[var(--tx-3)] shrink-0" />
                <span>Privacy Policy</span>
              </div>
            </Link>

            <Link
              href={routes.terms || '/terms'}
              prefetch={true}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors min-h-[44px] w-full ${
                isActive(routes.terms || '/terms')
                  ? 'text-[var(--accent)] bg-[var(--accent-soft)]'
                  : 'text-[var(--tx)] hover:bg-[var(--bg-subtle)]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FileText className="h-4 w-4 text-[var(--tx-3)] shrink-0" />
                <span>Terms of Service</span>
              </div>
            </Link>

            <button
              onClick={() => {
                setIsOpen(false);
                setIsContactOpen(true);
              }}
              className="flex items-center gap-3 w-full text-left px-3.5 py-3 rounded-xl text-sm font-semibold text-[var(--tx)] hover:bg-[var(--bg-subtle)] transition-colors min-h-[44px]"
            >
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-[var(--tx-3)] shrink-0" />
                <span>Contact Us</span>
              </div>
            </button>
          </nav>
        </div>

        {/* Mobile Drawer Bottom: Language Selector */}
        <div className="p-4 border-t border-[var(--border)] bg-[var(--bg-subtle)] space-y-2">
          <label htmlFor="nav-language-select-mobile" className="block text-xs font-semibold text-[var(--tx-3)]">
            {nav.languageLabel}
          </label>
          <div className="relative flex items-center rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-3 py-2.5 text-sm text-[var(--tx)] shadow-xs">
            <Globe className="h-4 w-4 text-[var(--tx-3)] shrink-0 mr-2" />
            <select
              id="nav-language-select-mobile"
              className="w-full bg-transparent font-medium text-[var(--tx)] focus:outline-none cursor-pointer text-sm"
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
      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
