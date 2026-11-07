"use client";

import { createContext, ReactNode, useContext, useMemo, useEffect } from "react";
import { usePathname } from "next/navigation";
import { DEFAULT_LOCALE, Locale, SUPPORTED_LOCALES } from "./config";
import type { Dictionary } from "./dictionaries/dictionary-types";
import { getDictionary, getDefaultDictionary } from "./get-dictionary";
import { ThemeProvider } from "../components/ThemeProvider";

export const LOCALE_STORAGE_KEY = 'ihatelovepdf-locale';

const LocaleContext = createContext<Locale>(DEFAULT_LOCALE);
const DictionaryContext = createContext<Dictionary>(getDefaultDictionary());

export function LocaleProvider({ locale: initialLocale, children }: { locale: Locale; children: ReactNode }) {
  const pathname = usePathname();

  const locale = useMemo(() => {
    if (!pathname) return initialLocale;

    // Check if pathname starts with a supported locale
    const segments = pathname.split('/');
    const firstSegment = segments[1] as Locale;

    if (firstSegment && (SUPPORTED_LOCALES as readonly string[]).includes(firstSegment) && firstSegment !== DEFAULT_LOCALE) {
      return firstSegment;
    }

    return initialLocale;
  }, [pathname, initialLocale]);

  const dictionary = useMemo(() => getDictionary(locale), [locale]);

  // Persist current active locale to localStorage
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && locale) {
        localStorage.setItem(LOCALE_STORAGE_KEY, locale);
      }
    } catch {
      // Ignore localStorage errors (private browsing / quota)
    }
  }, [locale]);

  return (
    <LocaleContext.Provider value={locale}>
      <DictionaryContext.Provider value={dictionary}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </DictionaryContext.Provider>
    </LocaleContext.Provider>
  );
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}

export function useDictionary(): Dictionary {
  return useContext(DictionaryContext);
}
