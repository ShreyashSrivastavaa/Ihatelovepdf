import { MetadataRoute } from "next";
import { getRouteMap } from "../i18n/routing";

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
]);

export default function sitemap(): MetadataRoute.Sitemap {
  const { home, privacy, terms, operations } = getRouteMap();
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];
  const seen = new Set<string>();

  const addEntry = (path: string, changeFrequency: ChangeFrequency, priority: number) => {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    const url = `${BASE_URL}${cleanPath}`;
    if (seen.has(url)) return;

    seen.add(url);
    entries.push({ url, lastModified, changeFrequency, priority });
  };

  // 1. Homepage (priority 1.0, changefreq weekly)
  addEntry(home.en || "/", weekly, 1.0);

  // 2. Active tool pages (priority 0.8, changefreq weekly)
  // Dynamically pulled from existing route-map, excluding orphaned 404ing routes
  Object.entries(operations).forEach(([operationKey, perLocale]) => {
    if (EXCLUDED_ORPHANED_ROUTES.has(operationKey)) {
      return;
    }

    const enPath = perLocale.en;
    if (enPath) {
      const slug = enPath.replace(/^\//, "");
      if (!EXCLUDED_ORPHANED_ROUTES.has(slug)) {
        addEntry(enPath, weekly, 0.8);
      }
    }
  });

  // 3. Static pages (about, privacy, terms) at priority 0.5
  addEntry("/about", monthly, 0.5);
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
