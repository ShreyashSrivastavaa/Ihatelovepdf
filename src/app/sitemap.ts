import { MetadataRoute } from "next";
import { getRouteMap } from "../i18n/routing";
import { BLOG_ARTICLES } from "./_data/blog-data";

export const dynamic = "force-static";
export const revalidate = false;

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

const BASE_URL = "https://www.ihatelovepdf.com";
const weekly: ChangeFrequency = "weekly";
const monthly: ChangeFrequency = "monthly";

// 11 orphaned 404ing routes explicitly excluded from sitemap
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
  const { home, privacy, terms, operations } = getRouteMap();
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];
  const seen = new Set<string>();

  // Helper to build hreflang alternates across all 9 locales + x-default
  const buildAlternates = (paths: Record<string, string>) => {
    const languages: Record<string, string> = {};
    for (const [loc, path] of Object.entries(paths)) {
      const clean = path.startsWith("/") ? path : `/${path}`;
      languages[loc] = `${BASE_URL}${clean}`;
    }
    if (paths.en) {
      const cleanEn = paths.en.startsWith("/") ? paths.en : `/${paths.en}`;
      languages["x-default"] = `${BASE_URL}${cleanEn}`;
    }
    return { languages };
  };

  const addEntry = (
    path: string,
    changeFrequency: ChangeFrequency,
    priority: number,
    alternates?: { languages: Record<string, string> }
  ) => {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    const url = `${BASE_URL}${cleanPath}`;
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

  // 1. Homepage with all 9 locales + x-default
  const homeAlternates = buildAlternates(home);
  addEntry(home.en || "/", weekly, 1.0, homeAlternates);

  // 2. Active tool pages with all 9 locales + x-default
  Object.entries(operations).forEach(([operationKey, perLocale]) => {
    if (EXCLUDED_ORPHANED_ROUTES.has(operationKey)) {
      return;
    }

    const enPath = perLocale.en;
    if (enPath) {
      const slug = enPath.replace(/^\//, "");
      if (!EXCLUDED_ORPHANED_ROUTES.has(slug)) {
        const opAlternates = buildAlternates(perLocale);
        addEntry(enPath, weekly, 0.8, opAlternates);
      }
    }
  });

  // 3. FAQ with all 9 locales + x-default
  const faqAlternates = buildAlternates(getRouteMap().faq);
  addEntry("/faq", monthly, 0.8, faqAlternates);

  // 4. Comparison & Alternative Pages
  addEntry("/ilovepdf-alternative", weekly, 0.8);
  addEntry("/smallpdf-alternative", weekly, 0.8);
  addEntry("/free-pdf-tools-without-signup", weekly, 0.8);
  addEntry("/offline-pdf-tools", weekly, 0.8);

  // 5. Blog & Articles
  addEntry("/blog", weekly, 0.8);
  Object.keys(BLOG_ARTICLES).forEach((slug) => {
    addEntry(`/blog/${slug}`, weekly, 0.7);
  });

  // 6. Static trust pages
  addEntry("/tools", weekly, 0.9);
  addEntry("/buy-me-a-coffee", monthly, 0.7);
  addEntry("/about", monthly, 0.8);
  addEntry("/guides", weekly, 0.8);
  addEntry("/contact", monthly, 0.6);
  if (privacy?.en) {
    addEntry(privacy.en, monthly, 0.5);
  } else {
    addEntry("/privacy", monthly, 0.5);
  }

  if (terms?.en) {
    addEntry(terms.en, monthly, 0.5);
  } else {
    addEntry("/terms", monthly, 0.5);
  }

  return entries;
}
