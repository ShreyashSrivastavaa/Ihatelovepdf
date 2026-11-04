import { Metadata } from "next";
import { SITE_URL } from "./site";
import type { Locale } from "../i18n/config";

export const BRAND_NAME = "ihatelovepdf";

export const METADATA_BASE = new URL(SITE_URL);

export const LOCALE_OG_MAP: Record<Locale, string> = {
  en: "en_US",
  es: "es_ES",
  pt: "pt_BR",
  de: "de_DE",
  fr: "fr_FR",
  hu: "hu_HU",
  it: "it_IT",
  ro: "ro_RO",
  ru: "ru_RU",
};

export const ALL_OG_LOCALES = Object.values(LOCALE_OG_MAP);

export function getAlternateOgLocales(locale: Locale): string[] {
  const currentOg = LOCALE_OG_MAP[locale];
  return ALL_OG_LOCALES.filter((loc) => loc !== currentOg);
}

export function getLocalizedOgImageUrl(locale: Locale): string {
  return `${SITE_URL}/og-images/og-image-${locale}.png`;
}

export const SHARED_ICONS: Metadata["icons"] = {
  icon: [
    { url: "/favicon.ico", sizes: "any" },
    { url: "/favicon.png", type: "image/png", sizes: "48x48" },
    { url: "/icon.png", type: "image/png", sizes: "32x32" },
    { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
  ],
  apple: [
    { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
  ],
  shortcut: "/favicon.ico",
};

export const SHARED_OPEN_GRAPH: Metadata["openGraph"] = {
  siteName: BRAND_NAME,
  type: "website",
  locale: LOCALE_OG_MAP.en,
  alternateLocale: getAlternateOgLocales("en"),
  images: [
    {
      url: getLocalizedOgImageUrl("en"),
      width: 1200,
      height: 630,
      alt: "ihatelovepdf: Free and Private PDF Tools in Your Browser",
    },
  ],
};

export const SHARED_TWITTER: Metadata["twitter"] = {
  card: "summary_large_image",
  creator: "@YesShrey",
  site: "@YesShrey",
  images: [getLocalizedOgImageUrl("en")],
};

export function getSocialMetadata(locale: Locale, title: string, description: string, url: string): {
  openGraph: NonNullable<Metadata["openGraph"]>;
  twitter: NonNullable<Metadata["twitter"]>;
} {
  const imageUrl = getLocalizedOgImageUrl(locale);
  return {
    openGraph: {
      siteName: BRAND_NAME,
      type: "website",
      locale: LOCALE_OG_MAP[locale],
      alternateLocale: getAlternateOgLocales(locale),
      title,
      description,
      url,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@YesShrey",
      site: "@YesShrey",
      images: [imageUrl],
    },
  };
}

export const SHARED_AUTHORS = [{ name: "Shreyash Srivastava", url: "https://www.shreyashsrivastava.in/" }];
export const SHARED_CREATOR = "Shreyash Srivastava";
export const SHARED_PUBLISHER = "Shreyash Srivastava";
export const WEBSITE_LAUNCHES_VERIFICATION = "714e3c091b00f4a86f93e6be17c060fc";
