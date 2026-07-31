export const SUPPORTED_LOCALES = ["en", "es", "pt", "de", "fr", "hu", "it", "ro", "ru"] as const;

export type Locale = typeof SUPPORTED_LOCALES[number];

export const DEFAULT_LOCALE: Locale = "en";

export const localeLabels: Record<Locale, { label: string; nativeName: string; htmlLang: string; hrefLang: string }>
  = {
  es: { label: "EspaÃ±ol", nativeName: "EspaÃ±ol", htmlLang: "es", hrefLang: "es" },
  en: { label: "English", nativeName: "English", htmlLang: "en", hrefLang: "en" },
  pt: { label: "PortuguÃªs", nativeName: "PortuguÃªs", htmlLang: "pt", hrefLang: "pt" },
  de: { label: "Deutsch", nativeName: "Deutsch", htmlLang: "de", hrefLang: "de" },
  it: { label: "Italiano", nativeName: "Italiano", htmlLang: "it", hrefLang: "it" },
  fr: { label: "FranÃ§ais", nativeName: "FranÃ§ais", htmlLang: "fr", hrefLang: "fr" },
  hu: { label: "Magyar", nativeName: "Magyar", htmlLang: "hu", hrefLang: "hu" },
  ro: { label: "RomÃ¢nÄƒ", nativeName: "RomÃ¢nÄƒ", htmlLang: "ro", hrefLang: "ro" },
  ru: { label: "Ð ÑƒÑÑÐºÐ¸Ð¹", nativeName: "Ð ÑƒÑÑÐºÐ¸Ð¹", htmlLang: "ru", hrefLang: "ru" },
};

export function isLocale(value: string): value is Locale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value);
}
