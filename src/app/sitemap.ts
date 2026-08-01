import { MetadataRoute } from "next";

import { getRouteMap } from "../i18n/routing";
import { SITE_URL } from "../lib/site";

export const dynamic = "force-static";
export const revalidate = false;

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

const weekly: ChangeFrequency = "weekly";
const monthly: ChangeFrequency = "monthly";

export default function sitemap(): MetadataRoute.Sitemap {
  const { home, faq, support, privacy, terms, contact, operations } = getRouteMap();
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];
  const seen = new Set<string>();

  const addEntry = (path: string, changeFrequency: ChangeFrequency, priority: number) => {
    const pathWithSlash = path.endsWith("/") ? path : `${path}/`;
    const url = `${SITE_URL}${pathWithSlash}`;
    if (seen.has(url)) return;

    seen.add(url);
    entries.push({ url, lastModified, changeFrequency, priority });
  };

  // Home routes (high priority)
  Object.values(home).forEach((path) => addEntry(path, weekly, 1.0));

  // PDF Tool Operations (high value landing pages)
  Object.values(operations).forEach((perLocale) => {
    Object.values(perLocale).forEach((path) => addEntry(path, weekly, 0.9));
  });

  // FAQ & Support
  Object.values(faq).forEach((path) => addEntry(path, monthly, 0.7));
  Object.values(support).forEach((path) => addEntry(path, monthly, 0.7));

  // Legal & Info pages
  Object.values(privacy).forEach((path) => addEntry(path, monthly, 0.5));
  Object.values(terms).forEach((path) => addEntry(path, monthly, 0.5));
  Object.values(contact).forEach((path) => addEntry(path, monthly, 0.5));

  return entries;
}

