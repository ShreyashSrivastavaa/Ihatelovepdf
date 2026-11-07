'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo, useState, useEffect, useRef } from 'react';
import { useDictionary, useLocale, LOCALE_STORAGE_KEY } from '../i18n/LocaleProvider';
import { SUPPORTED_LOCALES, localeLabels, Locale } from '../i18n/config';
import { getLocalizedAlternateMap, getRouteIdentifierForPath, getRoutePath } from '../i18n/routing';
import ContactModal from './ContactModal';
import {
  Globe,
  Sun,
  Moon,
  ChevronDown,
  Coffee,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  FileText,
  HelpCircle,
  Package,
  Sparkles,
} from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { TOTAL_TOOLS_COUNT } from '../lib/tools-registry';

const BACK_BUTTON_LABELS: Record<Locale, string> = {
  en: 'Back',
  es: 'Volver',
  pt: 'Voltar',
  de: 'Zurück',
  fr: 'Retour',
  it: 'Indietro',
  ro: 'Înapoi',
  ru: 'Назад',
  hu: 'Vissza',
};

interface MobileNavItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ComponentType<{ className?: string }>;
  description?: string;
  badge?: string;
  highlight?: boolean;
}

export default function NavMenu() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isConvertOpen, setIsConvertOpen] = useState(false);
  const [isAllToolsOpen, setIsAllToolsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const convertDropdownRef = useRef<HTMLDivElement>(null);
  const allToolsDropdownRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const dictionary = useDictionary();
  const locale = useLocale();
  const { theme, toggleTheme } = useTheme();
  const { nav } = dictionary.components;
  const routes = dictionary.routes;
  const toolsHref = locale === 'en' ? '/tools' : `/${locale}/tools`;
  const guidesHref = locale === 'en' ? '/guides' : `/${locale}/guides`;

  const isHome = useMemo(() => {
    if (!pathname) return true;
    const clean = pathname.replace(/\/$/, '') || '/';
    if (clean === '/') return true;
    const segments = clean.split('/').filter(Boolean);
    return segments.length === 1 && (SUPPORTED_LOCALES as readonly string[]).includes(segments[0]);
  }, [pathname]);

  const backLabel = BACK_BUTTON_LABELS[locale] || 'Back';

  const closeDropdowns = () => {
    setIsConvertOpen(false);
    setIsAllToolsOpen(false);
    setIsLangOpen(false);
    setIsOpen(false);
  };

  const handleBack = () => {
    closeDropdowns();
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push(routes.home);
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    closeDropdowns();
    if (isHome) {
      e.preventDefault();
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleLanguageSelect = (targetLocale: Locale) => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(LOCALE_STORAGE_KEY, targetLocale);
      }
    } catch {
      // Ignore localStorage errors
    }
    closeDropdowns();
  };

  const isActive = (path: string) => pathname === path;

  // Auto-close menu and dropdowns on route changes
  useEffect(() => {
    setIsOpen(false);
    setIsConvertOpen(false);
    setIsAllToolsOpen(false);
    setIsLangOpen(false);
  }, [pathname]);

  // Close dropdowns on outside click or escape key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        convertDropdownRef.current &&
        !convertDropdownRef.current.contains(event.target as Node)
      ) {
        setIsConvertOpen(false);
      }
      if (
        allToolsDropdownRef.current &&
        !allToolsDropdownRef.current.contains(event.target as Node)
      ) {
        setIsAllToolsOpen(false);
      }
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target as Node)
      ) {
        setIsLangOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsConvertOpen(false);
        setIsAllToolsOpen(false);
        setIsLangOpen(false);
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const routeIdentifier = useMemo(
    () => getRouteIdentifierForPath(locale, pathname),
    [locale, pathname]
  );

  const languageOptions = useMemo(() => {
    const alternates = routeIdentifier ? getLocalizedAlternateMap(routeIdentifier) : null;
    return SUPPORTED_LOCALES.map((candidateLocale) => ({
      locale: candidateLocale,
      href: alternates?.[candidateLocale] ?? getRoutePath(candidateLocale, 'home'),
    }));
  }, [routeIdentifier]);

  // Extensible list of navigation links for the mobile drawer
  const mobileNavItems: MobileNavItem[] = useMemo(() => [
    {
      id: 'all-tools',
      label: `Explore All ${TOTAL_TOOLS_COUNT} Tools`,
      href: toolsHref,
      icon: Sparkles,
      badge: `${TOTAL_TOOLS_COUNT} Tools`,
      highlight: true,
    },
    {
      id: 'guides',
      label: 'Guides & Documentation',
      href: guidesHref,
      icon: FileText,
    },
    {
      id: 'blog',
      label: 'Blog & Articles',
      href: '/blog',
      icon: FileText,
    },
    {
      id: 'faq',
      label: nav.faq,
      href: routes.faq,
      icon: HelpCircle,
    },
    {
      id: 'products',
      label: 'Our Products',
      href: '/products',
      icon: Package,
    },
    {
      id: 'coffee',
      label: 'Buy Me a Coffee',
      href: '/buy-me-a-coffee',
      icon: Coffee,
      description: 'International cards / PayPal',
    },
    {
      id: 'contact',
      label: 'Contact Us',
      onClick: () => {
        closeDropdowns();
        setIsContactOpen(true);
      },
      icon: HelpCircle,
    },
  ], [toolsHref, guidesHref, nav.faq, routes.faq]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[var(--color-border)] bg-[var(--color-main)] transition-colors duration-150">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 h-14 flex items-center justify-between gap-2">
          
          {/* LEFT: Back Button (inner pages only) + Logo & Wordmark */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2.5">
            {!isHome && (
              <button
                type="button"
                onClick={handleBack}
                aria-label="Go back"
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-1.5 rounded-lg px-2 sm:px-2.5 py-2 text-xs sm:text-sm font-medium text-secondary hover:bg-alt hover:text-primary transition-colors cursor-pointer border border-border/60 hover:border-border shrink-0 focus-visible:outline-2 focus-visible:outline-brand"
              >
                <ArrowLeft className="h-4 w-4 shrink-0" />
                <span className="hidden sm:inline font-semibold">{backLabel}</span>
              </button>
            )}
            <Link
              href={routes.home}
              onClick={handleLogoClick}
              aria-label="ihatelovepdf home"
              className="flex shrink-0 items-center gap-2 text-base sm:text-lg font-bold text-primary tracking-tight py-1"
            >
              <div className="relative flex h-7 w-7 items-center justify-center">
                <Image
                  src="/images/stickers/ihatelove.png"
                  alt="ihatelovepdf"
                  width={28}
                  height={28}
                  className="object-contain"
                  unoptimized
                />
              </div>
              <span className="font-extrabold tracking-tight text-primary">ihatelovepdf</span>
            </Link>
          </div>

          {/* DESKTOP NAV & CONTROLS (>= 768px / md:flex) */}
          <div className="hidden md:flex min-w-0 items-center gap-1">
            <nav aria-label="Main navigation" className="flex min-w-0 shrink-0 items-center gap-1">
              {/* Quick links: Merge, Split, Compress */}
              <div className="hidden lg:flex items-center">
                <Link
                  href={routes.operations.merge || '/merge'}
                  className={`inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-lg px-2 sm:px-3 text-[13px] font-medium transition-colors ${
                    isActive(routes.operations.merge || '/merge')
                      ? 'bg-alt text-primary font-semibold'
                      : 'text-secondary hover:bg-alt hover:text-primary'
                  }`}
                >
                  Merge PDF
                </Link>
                <Link
                  href={routes.operations.split || '/split'}
                  className={`inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-lg px-2 sm:px-3 text-[13px] font-medium transition-colors ${
                    isActive(routes.operations.split || '/split')
                      ? 'bg-alt text-primary font-semibold'
                      : 'text-secondary hover:bg-alt hover:text-primary'
                  }`}
                >
                  Split PDF
                </Link>
                <Link
                  href={routes.operations.compress || '/compress'}
                  className={`inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-lg px-2 sm:px-3 text-[13px] font-medium transition-colors ${
                    isActive(routes.operations.compress || '/compress')
                      ? 'bg-alt text-primary font-semibold'
                      : 'text-secondary hover:bg-alt hover:text-primary'
                  }`}
                >
                  Compress PDF
                </Link>
              </div>

              {/* "Convert" Dropdown */}
              <div ref={convertDropdownRef} className="relative">
                <button
                  type="button"
                  aria-label="Convert PDF"
                  aria-expanded={isConvertOpen}
                  onClick={() => {
                    setIsConvertOpen(!isConvertOpen);
                    setIsAllToolsOpen(false);
                  }}
                  className={`inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-lg px-2 sm:px-3 text-[13px] font-medium transition-colors cursor-pointer ${
                    isConvertOpen
                      ? 'bg-alt text-primary'
                      : 'text-secondary hover:bg-alt hover:text-primary'
                  }`}
                >
                  <span>Convert</span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-150 ${
                      isConvertOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isConvertOpen && (
                  <div className="absolute left-0 top-full mt-1.5 w-[420px] rounded-[12px] border border-border bg-main p-4 shadow-xl z-50 animate-fade-in grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-secondary/70 mb-2 px-2">
                        Convert to PDF
                      </p>
                      <div className="space-y-0.5">
                        <Link
                          href={routes.operations.imagesToPdf || '/images-to-pdf'}
                          onClick={closeDropdowns}
                          className="flex items-center px-2 py-1.5 rounded-md text-xs font-medium text-secondary hover:bg-alt hover:text-primary transition-colors"
                        >
                          Images to PDF
                        </Link>
                        <Link
                          href={routes.operations.wordToPdf || '/word-to-pdf'}
                          onClick={closeDropdowns}
                          className="flex items-center px-2 py-1.5 rounded-md text-xs font-medium text-secondary hover:bg-alt hover:text-primary transition-colors"
                        >
                          Word to PDF
                        </Link>
                        <Link
                          href={routes.operations.excelToPdf || '/excel-to-pdf'}
                          onClick={closeDropdowns}
                          className="flex items-center px-2 py-1.5 rounded-md text-xs font-medium text-secondary hover:bg-alt hover:text-primary transition-colors"
                        >
                          Excel to PDF
                        </Link>
                        <Link
                          href={routes.operations.powerpointToPdf || '/powerpoint-to-pdf'}
                          onClick={closeDropdowns}
                          className="flex items-center px-2 py-1.5 rounded-md text-xs font-medium text-secondary hover:bg-alt hover:text-primary transition-colors"
                        >
                          PowerPoint to PDF
                        </Link>
                        <Link
                          href={routes.operations.htmlToPdf || '/html-to-pdf'}
                          onClick={closeDropdowns}
                          className="flex items-center px-2 py-1.5 rounded-md text-xs font-medium text-secondary hover:bg-alt hover:text-primary transition-colors"
                        >
                          HTML to PDF
                        </Link>
                        <Link
                          href={routes.operations.markdownToPdf || '/markdown-to-pdf'}
                          onClick={closeDropdowns}
                          className="flex items-center px-2 py-1.5 rounded-md text-xs font-medium text-secondary hover:bg-alt hover:text-primary transition-colors"
                        >
                          Markdown to PDF
                        </Link>
                      </div>
                    </div>

                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-secondary/70 mb-2 px-2">
                        Convert from PDF
                      </p>
                      <div className="space-y-0.5">
                        <Link
                          href={routes.operations.pdfToWord || '/pdf-to-word'}
                          onClick={closeDropdowns}
                          className="flex items-center px-2 py-1.5 rounded-md text-xs font-medium text-secondary hover:bg-alt hover:text-primary transition-colors"
                        >
                          PDF to Word
                        </Link>
                        <Link
                          href={routes.operations.pdfToImages || '/pdf-to-images'}
                          onClick={closeDropdowns}
                          className="flex items-center px-2 py-1.5 rounded-md text-xs font-medium text-secondary hover:bg-alt hover:text-primary transition-colors"
                        >
                          PDF to Images
                        </Link>
                        <Link
                          href={routes.operations.pdfToExcel || '/pdf-to-excel'}
                          onClick={closeDropdowns}
                          className="flex items-center px-2 py-1.5 rounded-md text-xs font-medium text-secondary hover:bg-alt hover:text-primary transition-colors"
                        >
                          PDF to Excel
                        </Link>
                        <Link
                          href={routes.operations.pdfToPowerpoint || '/pdf-to-powerpoint'}
                          onClick={closeDropdowns}
                          className="flex items-center px-2 py-1.5 rounded-md text-xs font-medium text-secondary hover:bg-alt hover:text-primary transition-colors"
                        >
                          PDF to PowerPoint
                        </Link>
                        <Link
                          href={routes.operations.pdfToHtml || '/pdf-to-html'}
                          onClick={closeDropdowns}
                          className="flex items-center px-2 py-1.5 rounded-md text-xs font-medium text-secondary hover:bg-alt hover:text-primary transition-colors"
                        >
                          PDF to HTML
                        </Link>
                        <Link
                          href={routes.operations.pdfToEpub || '/pdf-to-epub'}
                          onClick={closeDropdowns}
                          className="flex items-center px-2 py-1.5 rounded-md text-xs font-medium text-secondary hover:bg-alt hover:text-primary transition-colors"
                        >
                          PDF to EPUB
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* "All tools" Dropdown */}
              <div ref={allToolsDropdownRef} className="relative shrink-0">
                <button
                  type="button"
                  aria-label="All tools"
                  aria-expanded={isAllToolsOpen}
                  onClick={() => {
                    setIsAllToolsOpen(!isAllToolsOpen);
                    setIsConvertOpen(false);
                  }}
                  className={`inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-lg px-2 sm:px-3 text-[13px] font-medium transition-colors cursor-pointer ${
                    isAllToolsOpen
                      ? 'bg-alt text-primary'
                      : 'text-secondary hover:bg-alt hover:text-primary'
                  }`}
                >
                  <span>All tools</span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-150 ${
                      isAllToolsOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isAllToolsOpen && (
                  <div className="absolute right-0 sm:left-0 top-full mt-1.5 w-[320px] sm:w-[520px] rounded-[12px] border border-border bg-main p-4 shadow-xl z-50 animate-fade-in">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-3 border-b border-border">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-secondary/70 mb-1.5 px-2">
                          Organize & Optimize
                        </p>
                        <div className="space-y-0.5">
                          <Link
                            href={routes.operations.merge || '/merge'}
                            onClick={closeDropdowns}
                            className="flex items-center justify-between px-2 py-1 rounded-md text-xs text-secondary hover:bg-alt hover:text-primary"
                          >
                            <span>Merge PDF</span>
                            <span className="text-[10px] text-secondary/60">Combine</span>
                          </Link>
                          <Link
                            href={routes.operations.split || '/split'}
                            onClick={closeDropdowns}
                            className="flex items-center justify-between px-2 py-1 rounded-md text-xs text-secondary hover:bg-alt hover:text-primary"
                          >
                            <span>Split PDF</span>
                            <span className="text-[10px] text-secondary/60">Separate</span>
                          </Link>
                          <Link
                            href={routes.operations.compress || '/compress'}
                            onClick={closeDropdowns}
                            className="flex items-center justify-between px-2 py-1 rounded-md text-xs text-secondary hover:bg-alt hover:text-primary"
                          >
                            <span>Compress PDF</span>
                            <span className="text-[10px] text-secondary/60">Shrink size</span>
                          </Link>
                          <Link
                            href={routes.operations.extract || '/extract'}
                            onClick={closeDropdowns}
                            className="flex items-center justify-between px-2 py-1 rounded-md text-xs text-secondary hover:bg-alt hover:text-primary"
                          >
                            <span>Extract Pages</span>
                            <span className="text-[10px] text-secondary/60">Save range</span>
                          </Link>
                          <Link
                            href={routes.operations.crop || '/crop'}
                            onClick={closeDropdowns}
                            className="flex items-center justify-between px-2 py-1 rounded-md text-xs text-secondary hover:bg-alt hover:text-primary"
                          >
                            <span>Crop PDF</span>
                            <span className="text-[10px] text-secondary/60">Trim area</span>
                          </Link>
                        </div>
                      </div>

                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-secondary/70 mb-1.5 px-2">
                          Edit & Security
                        </p>
                        <div className="space-y-0.5">
                          <Link
                            href={routes.operations.editPdf || '/edit-pdf'}
                            onClick={closeDropdowns}
                            className="flex items-center justify-between px-2 py-1 rounded-md text-xs text-secondary hover:bg-alt hover:text-primary"
                          >
                            <span>Edit PDF</span>
                            <span className="text-[10px] text-secondary/60">Annotate</span>
                          </Link>
                          <Link
                            href={routes.operations.signPdf || '/sign-pdf'}
                            onClick={closeDropdowns}
                            className="flex items-center justify-between px-2 py-1 rounded-md text-xs text-secondary hover:bg-alt hover:text-primary"
                          >
                            <span>Sign PDF</span>
                            <span className="text-[10px] text-secondary/60">Signatures</span>
                          </Link>
                          <Link
                            href={routes.operations.redact || '/redact'}
                            onClick={closeDropdowns}
                            className="flex items-center justify-between px-2 py-1 rounded-md text-xs text-secondary hover:bg-alt hover:text-primary"
                          >
                            <span>Redact PDF</span>
                            <span className="text-[10px] text-secondary/60">Sanitize</span>
                          </Link>
                          <Link
                            href={routes.operations.watermark || '/watermark'}
                            onClick={closeDropdowns}
                            className="flex items-center justify-between px-2 py-1 rounded-md text-xs text-secondary hover:bg-alt hover:text-primary"
                          >
                            <span>Watermark PDF</span>
                            <span className="text-[10px] text-secondary/60">Stamp text</span>
                          </Link>
                          <Link
                            href={routes.operations.compare || '/compare'}
                            onClick={closeDropdowns}
                            className="flex items-center justify-between px-2 py-1 rounded-md text-xs text-secondary hover:bg-alt hover:text-primary"
                          >
                            <span>Compare PDFs</span>
                            <span className="text-[10px] text-secondary/60">Diff check</span>
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2.5 flex items-center justify-between px-2">
                      <Link
                        href={guidesHref}
                        onClick={closeDropdowns}
                        className="text-xs text-secondary hover:text-primary transition-colors"
                      >
                        Guides
                      </Link>
                      <Link
                        href="/blog"
                        onClick={closeDropdowns}
                        className="text-xs text-secondary hover:text-primary transition-colors"
                      >
                        Blog
                      </Link>
                      <Link
                        href={toolsHref}
                        onClick={closeDropdowns}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
                      >
                        <span>Explore all {TOTAL_TOOLS_COUNT} tools</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Direct links for Guides & Blog on wide desktop */}
              <div className="hidden xl:flex items-center">
                <Link
                  href={guidesHref}
                  className={`inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-lg px-2 sm:px-3 text-[13px] font-medium transition-colors ${
                    isActive(guidesHref)
                      ? 'bg-alt text-primary font-semibold'
                      : 'text-secondary hover:bg-alt hover:text-primary'
                  }`}
                >
                  Guides
                </Link>
                <Link
                  href="/blog"
                  className={`inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-lg px-2 sm:px-3 text-[13px] font-medium transition-colors ${
                    isActive('/blog')
                      ? 'bg-alt text-primary font-semibold'
                      : 'text-secondary hover:bg-alt hover:text-primary'
                  }`}
                >
                  Blog
                </Link>
              </div>
            </nav>

            {/* RIGHT CONTROLS: Buy Me a Chai (UPI), Language, Theme Switch */}
            <div className="flex items-center gap-1.5 sm:gap-2 ml-2 pl-2 border-l border-border">
              {/* Buy Me a Chai (UPI) */}
              <Link
                href="/buy-me-a-chai"
                className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 transition-colors"
                title="Support via UPI on Buy Me a Chai"
              >
                <Coffee className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>Buy Me a Chai (UPI)</span>
              </Link>

              {/* Language Switcher (Crawlable & Accessible Dropdown) */}
              <div ref={langDropdownRef} className="relative inline-flex items-center">
                <button
                  type="button"
                  aria-label={nav.languageLabel}
                  aria-expanded={isLangOpen}
                  aria-haspopup="true"
                  onClick={() => {
                    setIsLangOpen(!isLangOpen);
                    setIsConvertOpen(false);
                    setIsAllToolsOpen(false);
                  }}
                  className={`inline-flex items-center gap-1.5 rounded-lg border border-border bg-main px-2.5 py-1.5 text-xs font-semibold text-secondary shadow-xs hover:border-hover hover:text-primary transition-colors cursor-pointer ${
                    isLangOpen ? 'border-primary text-primary bg-alt' : ''
                  }`}
                >
                  <Globe className="h-3.5 w-3.5 text-secondary shrink-0" />
                  <span className="uppercase tracking-wide">{locale}</span>
                  <ChevronDown
                    className={`h-3 w-3 text-secondary transition-transform duration-150 ${
                      isLangOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isLangOpen && (
                  <div
                    role="menu"
                    aria-label={nav.languageLabel}
                    className="absolute right-0 top-full mt-1.5 w-48 rounded-xl border border-border bg-main p-1.5 shadow-xl z-50 animate-fade-in"
                  >
                    <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-secondary/70 border-b border-border mb-1">
                      {nav.languageLabel}
                    </div>
                    <div className="max-h-72 overflow-y-auto space-y-0.5">
                      {languageOptions.map((option) => (
                        <Link
                          key={option.locale}
                          href={option.href}
                          hrefLang={option.locale}
                          lang={option.locale}
                          role="menuitem"
                          onClick={() => {
                            handleLanguageSelect(option.locale);
                          }}
                          className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                            option.locale === locale
                              ? 'bg-alt text-primary font-bold'
                              : 'text-secondary hover:bg-alt hover:text-primary'
                          }`}
                        >
                          <span className="truncate">{localeLabels[option.locale].nativeName}</span>
                          <span className="text-[10px] font-mono uppercase text-secondary/60 ml-2 shrink-0">
                            {option.locale}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Dark Mode Switch */}
              <button
                type="button"
                role="switch"
                aria-checked={theme === 'dark'}
                aria-label="Dark mode"
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                onClick={toggleTheme}
                className="group inline-flex min-h-10 min-w-10 shrink-0 items-center justify-center rounded-lg px-1 cursor-pointer focus:outline-none"
              >
                <span className="flex h-7 w-12 items-center rounded-full border border-border bg-alt p-[3px] transition-colors group-hover:border-secondary dark:border-primary dark:bg-primary">
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full bg-main text-primary shadow-xs transition-transform duration-200 ${
                      theme === 'dark' ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  >
                    <Sun className="h-3 w-3 dark:hidden" />
                    <Moon className="h-3 w-3 hidden dark:block" />
                  </span>
                </span>
              </button>
            </div>
          </div>

          {/* MOBILE HAMBURGER TOGGLE (< 768px / md:hidden) */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              id="mobile-nav-toggle"
              aria-controls="mobile-nav-menu"
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Close menu' : 'Toggle menu'}
              onClick={() => setIsOpen((prev) => !prev)}
              className="inline-flex min-h-[44px] min-w-[44px] h-11 w-11 items-center justify-center rounded-lg text-secondary hover:bg-alt hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-brand cursor-pointer"
            >
              <div className="relative w-5 h-4 flex flex-col justify-between items-center pointer-events-none" aria-hidden="true">
                <span
                  className={`block h-0.5 w-5 bg-current rounded-full transition-all duration-300 ease-in-out ${
                    isOpen ? 'translate-y-[7px] rotate-45' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 w-5 bg-current rounded-full transition-all duration-200 ease-in-out ${
                    isOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`block h-0.5 w-5 bg-current rounded-full transition-all duration-300 ease-in-out ${
                    isOpen ? '-translate-y-[7px] -rotate-45' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE BACKDROP OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 top-14 z-40 bg-black/50 backdrop-blur-xs md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* MOBILE SLIDE-DOWN / DRAWER MENU */}
      <div
        id="mobile-nav-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed top-14 left-0 right-0 bottom-0 z-50 bg-[var(--color-main)] border-b border-border shadow-2xl transition-all duration-300 ease-in-out md:hidden flex flex-col justify-between overflow-y-auto ${
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto visible'
            : 'opacity-0 -translate-y-4 pointer-events-none invisible'
        }`}
      >
        <div className="p-4 sm:p-6 space-y-5">
          {/* Top Status & Dark Mode Switcher Row */}
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border bg-alt text-[11px] font-medium text-secondary">
              <ShieldCheck className="h-3.5 w-3.5 text-success shrink-0" />
              <span>100% Private · Runs in Browser</span>
            </div>

            {/* Dark Mode Switch in Mobile Menu */}
            <button
              type="button"
              role="switch"
              aria-checked={theme === 'dark'}
              aria-label="Dark mode"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              onClick={toggleTheme}
              className="inline-flex items-center gap-2 rounded-lg px-2 py-1 text-xs font-medium text-secondary hover:bg-alt hover:text-primary transition-colors cursor-pointer"
            >
              <span className="flex h-6 w-11 items-center rounded-full border border-border bg-alt p-[2px] transition-colors dark:border-primary dark:bg-primary">
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded-full bg-main text-primary shadow-xs transition-transform duration-200 ${
                    theme === 'dark' ? 'translate-x-5' : 'translate-x-0'
                  }`}
                >
                  <Sun className="h-2.5 w-2.5 dark:hidden" />
                  <Moon className="h-2.5 w-2.5 hidden dark:block" />
                </span>
              </span>
              <span className="text-xs">{theme === 'dark' ? 'Dark' : 'Light'}</span>
            </button>
          </div>

          {/* 1. PREMIER CTA: Buy Me a Chai (UPI) */}
          <Link
            href="/buy-me-a-chai"
            onClick={closeDropdowns}
            className="flex items-center justify-between p-3.5 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 transition-all shadow-xs"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400">
                <Coffee className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold tracking-tight">Buy Me a Chai (UPI)</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300">
                    UPI / QR
                  </span>
                </div>
                <p className="text-xs text-amber-700/80 dark:text-amber-300/80 truncate">
                  Support this free project via UPI, RuPay or Cards
                </p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400 ml-2" />
          </Link>

          {/* 2. Quick Popular Tools */}
          <div className="space-y-1">
            <p className="text-[11px] font-bold uppercase tracking-wider text-secondary/70 px-1 mb-1">
              Popular Tools
            </p>
            <div className="grid grid-cols-3 gap-2">
              <Link
                href={routes.operations.merge || '/merge'}
                onClick={closeDropdowns}
                className="flex flex-col items-center justify-center p-3 rounded-lg border border-border bg-alt text-xs font-semibold text-primary hover:border-hover transition-colors"
              >
                <span>Merge</span>
              </Link>
              <Link
                href={routes.operations.split || '/split'}
                onClick={closeDropdowns}
                className="flex flex-col items-center justify-center p-3 rounded-lg border border-border bg-alt text-xs font-semibold text-primary hover:border-hover transition-colors"
              >
                <span>Split</span>
              </Link>
              <Link
                href={routes.operations.compress || '/compress'}
                onClick={closeDropdowns}
                className="flex flex-col items-center justify-center p-3 rounded-lg border border-border bg-alt text-xs font-semibold text-primary hover:border-hover transition-colors"
              >
                <span>Compress</span>
              </Link>
            </div>
          </div>

          {/* 3. Quick Conversions */}
          <div className="space-y-1">
            <p className="text-[11px] font-bold uppercase tracking-wider text-secondary/70 px-1 mb-1">
              Conversions
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Link
                href={routes.operations.pdfToWord || '/pdf-to-word'}
                onClick={closeDropdowns}
                className="p-2.5 rounded-lg border border-border bg-main text-secondary hover:text-primary hover:border-hover transition-colors font-medium"
              >
                PDF to Word
              </Link>
              <Link
                href={routes.operations.wordToPdf || '/word-to-pdf'}
                onClick={closeDropdowns}
                className="p-2.5 rounded-lg border border-border bg-main text-secondary hover:text-primary hover:border-hover transition-colors font-medium"
              >
                Word to PDF
              </Link>
              <Link
                href={routes.operations.pdfToImages || '/pdf-to-images'}
                onClick={closeDropdowns}
                className="p-2.5 rounded-lg border border-border bg-main text-secondary hover:text-primary hover:border-hover transition-colors font-medium"
              >
                PDF to JPG/PNG
              </Link>
              <Link
                href={routes.operations.imagesToPdf || '/images-to-pdf'}
                onClick={closeDropdowns}
                className="p-2.5 rounded-lg border border-border bg-main text-secondary hover:text-primary hover:border-hover transition-colors font-medium"
              >
                JPG/PNG to PDF
              </Link>
            </div>
          </div>

          {/* 4. Extensible Menu Links List (Array-driven) */}
          <div className="space-y-1 border-t border-border pt-4">
            <p className="text-[11px] font-bold uppercase tracking-wider text-secondary/70 px-1 mb-1">
              Navigation
            </p>
            <div className="space-y-0.5">
              {mobileNavItems.map((item) => {
                const IconComponent = item.icon;
                if (item.href) {
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={closeDropdowns}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
                        item.highlight
                          ? 'font-bold text-primary bg-alt/60 hover:bg-alt'
                          : 'text-secondary hover:text-primary hover:bg-alt'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {IconComponent && <IconComponent className="h-4 w-4 shrink-0 text-secondary" />}
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-brand/10 text-brand shrink-0">
                          {item.badge}
                        </span>
                      )}
                      {item.description && !item.badge && (
                        <span className="text-[11px] text-secondary/60 shrink-0">
                          {item.description}
                        </span>
                      )}
                    </Link>
                  );
                }
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={item.onClick}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-secondary hover:text-primary hover:bg-alt transition-colors cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      {IconComponent && <IconComponent className="h-4 w-4 shrink-0 text-secondary" />}
                      <span>{item.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Drawer Bottom: Language Selector */}
        <div className="p-4 border-t border-border bg-alt space-y-2.5">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-secondary">
            <span>{nav.languageLabel}</span>
            <Globe className="h-3.5 w-3.5 text-secondary" />
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {languageOptions.map((option) => (
              <Link
                key={option.locale}
                href={option.href}
                hrefLang={option.locale}
                lang={option.locale}
                onClick={() => {
                  handleLanguageSelect(option.locale);
                }}
                className={`flex flex-col items-center justify-center p-2 rounded-lg border text-center transition-colors ${
                  option.locale === locale
                    ? 'border-brand bg-main text-brand font-bold shadow-2xs'
                    : 'border-border/60 bg-main/50 text-secondary hover:bg-main hover:text-primary hover:border-hover'
                }`}
              >
                <span className="text-xs truncate w-full">{localeLabels[option.locale].nativeName}</span>
                <span className="text-[10px] uppercase font-mono text-secondary/60 mt-0.5">
                  {option.locale}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
