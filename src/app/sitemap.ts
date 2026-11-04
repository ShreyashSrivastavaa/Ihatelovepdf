import { MetadataRoute } from "next";
import { getRouteMap } from "../i18n/routing";
import { BLOG_ARTICLES } from "./_data/blog-data";
import { ALL_GUIDE_SLUGS } from "./_data/localized-guides-data";
import { SUPPORTED_LOCALES } from "../i18n/config";

export const dynamic = "force-static";
export const revalidate = false;

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

const BASE_URL = "https://www.ihatelovepdf.com";
const weekly: ChangeFrequency = "weekly";
const monthly: ChangeFrequency = "monthly";

// Orphaned or non-operation routes explicitly excluded from sitemap
const EXCLUDED_ORPHANED_ROUTES = new Set([
  "flatten",
  "fingerprint",
  "ocr",
  "privacyScanner",
  "privacy-scanner",
  "pdfToAudio",
  "pdf-to-audio",
  "audioToPdf",
  "audio-to-pdf",
  "repairPdf",
  "repair-pdf",
  "p2pShare",
  "p2p-share",
  "aiSummarize",
  "ai-summarize",
  "aiChat",
  "ai-chat",
  "encrypt",
  "encrypt-pdf",
  "decrypt",
  "decrypt-pdf",
  "latexResume",
  "latex-resume",
  "support",
]);

export default function sitemap(): MetadataRoute.Sitemap {
  const { home, faq, operations } = getRouteMap();
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];
  const seen = new Set<string>();

  // Helper to normalize paths without trailing slashes
  const normalizePath = (rawPath: string) => {
    const clean = rawPath === "/" ? "" : rawPath.replace(/\/$/, "");
    return clean.startsWith("/") ? clean : `/${clean}`;
  };

  // Helper to build hreflang alternates across all 9 locales + x-default
  const buildAlternates = (paths: Record<string, string>) => {
    const languages: Record<string, string> = {};
    for (const [loc, path] of Object.entries(paths)) {
      const clean = normalizePath(path);
      languages[loc] = `${BASE_URL}${clean === "/" ? "" : clean}`;
    }
    if (paths.en) {
      const cleanEn = normalizePath(paths.en);
      languages["x-default"] = `${BASE_URL}${cleanEn === "/" ? "" : cleanEn}`;
    }
    return { languages };
  };

  const addEntry = (
    path: string,
    changeFrequency: ChangeFrequency,
    priority: number,
    alternates?: { languages: Record<string, string> }
  ) => {
    const cleanPath = normalizePath(path);
    const url = `${BASE_URL}${cleanPath === "/" ? "" : cleanPath}`;
    if (seen.has(url)) return;

    seen.add(url);
    entries.push({
      url,
      lastModified,
      changeFrequency,
      priority,
      ...(alternates ? { alternates } : {}),
    });
  };

  // 1. Homepage in all 9 languages (dedicated <loc> for each language)
  const homeAlternates = buildAlternates(home);
  for (const locale of SUPPORTED_LOCALES) {
    const path = home[locale] || (locale === "en" ? "/" : `/${locale}`);
    addEntry(path, weekly, 1.0, homeAlternates);
  }

  // 2. Localized /tools hub page in all 9 languages
  const toolsAlternatesMap: Record<string, string> = {
    en: "/tools",
    es: "/es/tools",
    pt: "/pt/tools",
    de: "/de/tools",
    it: "/it/tools",
    fr: "/fr/tools",
    ro: "/ro/tools",
    ru: "/ru/tools",
    hu: "/hu/tools",
  };
  const toolsAlternates = buildAlternates(toolsAlternatesMap);
  for (const locale of SUPPORTED_LOCALES) {
    addEntry(toolsAlternatesMap[locale], weekly, 0.9, toolsAlternates);
  }

  // 3. Active tool pages across all 9 languages (dedicated <loc> for each language)
  Object.entries(operations).forEach(([operationKey, perLocale]) => {
    if (EXCLUDED_ORPHANED_ROUTES.has(operationKey)) {
      return;
    }

    const enPath = perLocale.en;
    if (!enPath) return;

    const slug = enPath.replace(/^\//, "");
    if (EXCLUDED_ORPHANED_ROUTES.has(slug)) return;

    const opAlternates = buildAlternates(perLocale);
    for (const locale of SUPPORTED_LOCALES) {
      const localizedPath = perLocale[locale];
      if (localizedPath) {
        addEntry(localizedPath, weekly, 0.8, opAlternates);
      }
    }
  });

  // 4. FAQ in all 9 languages (dedicated <loc> for each language)
  const faqAlternates = buildAlternates(faq);
  for (const locale of SUPPORTED_LOCALES) {
    const faqPath = faq[locale];
    if (faqPath) {
      addEntry(faqPath, monthly, 0.8, faqAlternates);
    }
  }

  // 5. Comparison & Alternative Pages (English only)
  addEntry("/ilovepdf-alternative", weekly, 0.8);
  addEntry("/smallpdf-alternative", weekly, 0.8);
  addEntry("/free-pdf-tools-without-signup", weekly, 0.8);
  addEntry("/offline-pdf-tools", weekly, 0.8);

  // 6. Blog & Articles (English only)
  addEntry("/blog", weekly, 0.8);
  Object.keys(BLOG_ARTICLES).forEach((slug) => {
    addEntry(`/blog/${slug}`, weekly, 0.7);
  });

  // 7. Guides & Tutorials across all 9 languages with reciprocal hreflangs
  const guidesHubMap: Record<string, string> = {
    en: "/guides",
    es: "/es/guides",
    pt: "/pt/guides",
    de: "/de/guides",
    it: "/it/guides",
    fr: "/fr/guides",
    ro: "/ro/guides",
    ru: "/ru/guides",
    hu: "/hu/guides",
  };
  const guidesHubAlternates = buildAlternates(guidesHubMap);
  for (const locale of SUPPORTED_LOCALES) {
    addEntry(guidesHubMap[locale], weekly, 0.8, guidesHubAlternates);
  }

  for (const slug of ALL_GUIDE_SLUGS) {
    const guideAlternatesMap: Record<string, string> = {
      en: `/guides/${slug}`,
      es: `/es/guides/${slug}`,
      pt: `/pt/guides/${slug}`,
      de: `/de/guides/${slug}`,
      it: `/it/guides/${slug}`,
      fr: `/fr/guides/${slug}`,
      ro: `/ro/guides/${slug}`,
      ru: `/ru/guides/${slug}`,
      hu: `/hu/guides/${slug}`,
    };
    const guideAlternates = buildAlternates(guideAlternatesMap);
    for (const locale of SUPPORTED_LOCALES) {
      addEntry(guideAlternatesMap[locale], weekly, 0.7, guideAlternates);
    }
  }

  // 8. Static trust & company pages (English only)
  addEntry("/about", monthly, 0.8);
  addEntry("/products", monthly, 0.7);
  addEntry("/contact", monthly, 0.6);
  addEntry("/privacy", monthly, 0.5);
  addEntry("/terms", monthly, 0.5);
  addEntry("/buy-me-a-coffee", monthly, 0.7);

  return entries;
}
