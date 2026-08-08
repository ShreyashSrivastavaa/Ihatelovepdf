import type { Metadata } from "next";
import { Locale, DEFAULT_LOCALE, localeLabels } from "../../i18n/config";
import { getDictionary } from "../../i18n/get-dictionary";
import { getLocalizedAlternateMap } from "../../i18n/routing";
import { SITE_URL, GOOGLE_SITE_VERIFICATION } from "../../lib/site";

type StaticRouteKey = "home" | "faq" | "support";

function buildLanguagesMap(identifier: { type: "static"; key: StaticRouteKey }, baseUrl: string) {
  const alternatesMap = getLocalizedAlternateMap(identifier);
  const entries = (Object.entries(alternatesMap) as [Locale, string][]).map(([localeKey, path]) => {
    const hrefLang = localeLabels[localeKey].hrefLang;
    const pathWithSlash = path.endsWith("/") ? path : `${path}/`;
    const absoluteUrl = new URL(pathWithSlash, baseUrl).toString();
    return [hrefLang, absoluteUrl] as const;
  });

  const languages = Object.fromEntries(entries) as Record<string, string>;
  const defaultHref = localeLabels[DEFAULT_LOCALE].hrefLang;
  const xDefaultUrl = languages[defaultHref];
  return xDefaultUrl ? { ...languages, "x-default": xDefaultUrl } : languages;
}

export function createHomeMetadata(locale: Locale) {
  return (): Metadata => {
    const dictionary = getDictionary(locale);
    const siteMeta = dictionary.metadata.site;
    const baseUrl = SITE_URL;
    const homePath = dictionary.routes.home;
    const homePathWithSlash = homePath.endsWith("/") ? homePath : `${homePath}/`;
    const canonicalUrl = new URL(homePathWithSlash, baseUrl).toString();
    const languages = buildLanguagesMap({ type: "static", key: "home" }, baseUrl);

    return {
      title: siteMeta.title,
      description: siteMeta.description,
      keywords: siteMeta.keywords,
      verification: {
        ...(GOOGLE_SITE_VERIFICATION ? { google: GOOGLE_SITE_VERIFICATION } : {}),
        other: {
          "websitelaunches-verification": ["714e3c091b00f4a86f93e6be17c060fc"],
        },
      },
      alternates: {
        canonical: canonicalUrl,
        languages,
      },
      openGraph: {
        title: siteMeta.openGraph.title,
        description: siteMeta.openGraph.description,
        url: canonicalUrl,
        locale: siteMeta.openGraph.locale,
        images: [
          {
            url: `${baseUrl}/og-images/og-image-${locale}.png`,
            width: 1409,
            height: 736,
            alt: siteMeta.openGraph.imageAlt,
          },
        ],
      },
    };
  };
}

export function createFaqMetadata(locale: Locale) {
  return (): Metadata => {
    const dictionary = getDictionary(locale);
    const faqMeta = dictionary.metadata.faq;
    const baseUrl = SITE_URL;
    const faqPath = dictionary.routes.faq;
    const faqPathWithSlash = faqPath.endsWith("/") ? faqPath : `${faqPath}/`;
    const canonicalUrl = new URL(faqPathWithSlash, baseUrl).toString();
    const languages = buildLanguagesMap({ type: "static", key: "faq" }, baseUrl);

    return {
      title: faqMeta.title,
      description: faqMeta.description,
      keywords: faqMeta.keywords,
      verification: {
        ...(GOOGLE_SITE_VERIFICATION ? { google: GOOGLE_SITE_VERIFICATION } : {}),
        other: {
          "websitelaunches-verification": ["714e3c091b00f4a86f93e6be17c060fc"],
        },
      },
      alternates: {
        canonical: canonicalUrl,
        languages,
      },
      openGraph: {
        title: faqMeta.title,
        description: faqMeta.description,
        url: canonicalUrl,
        locale: dictionary.metadata.site.openGraph.locale,
        images: [
          {
            url: `${baseUrl}/og-images/og-image-${locale}.png`,
            width: 1409,
            height: 736,
            alt: faqMeta.title,
          },
        ],
      },
    };
  };
}

export function createSupportMetadata(locale: Locale) {
  return (): Metadata => {
    const dictionary = getDictionary(locale);
    const supportMeta = dictionary.metadata.support;
    const baseUrl = SITE_URL;
    const supportPath = dictionary.routes.support;
    const supportPathWithSlash = supportPath.endsWith("/") ? supportPath : `${supportPath}/`;
    const canonicalUrl = new URL(supportPathWithSlash, baseUrl).toString();
    const languages = buildLanguagesMap({ type: "static", key: "support" }, baseUrl);

    return {
      title: supportMeta.title,
      description: supportMeta.description,
      keywords: supportMeta.keywords,
      verification: {
        ...(GOOGLE_SITE_VERIFICATION ? { google: GOOGLE_SITE_VERIFICATION } : {}),
        other: {
          "websitelaunches-verification": ["714e3c091b00f4a86f93e6be17c060fc"],
        },
      },
      robots: {
        index: false,
        follow: false,
      },
      alternates: {
        canonical: canonicalUrl,
        languages,
      },
    };
  };
}

