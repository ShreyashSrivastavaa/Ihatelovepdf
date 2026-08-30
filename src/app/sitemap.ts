import { MetadataRoute } from "next";

import { getRouteMap } from "../i18n/routing";
import { SITE_URL } from "../lib/site";
import { GUIDES_DATA } from "./_data/guides-data";

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

  // Dedicated All Tools Directory (high priority catalog)
  addEntry('/tools', weekly, 0.95);

  // PDF Tool Operations (high value landing pages)
  Object.values(operations).forEach((perLocale) => {
    Object.values(perLocale).forEach((path) => addEntry(path, weekly, 0.9));
  });

  // FAQ & Support
  Object.values(faq).forEach((path) => addEntry(path, monthly, 0.7));
  Object.values(support).forEach((path) => addEntry(path, monthly, 0.6));

  // Legal & Contact
  Object.values(privacy).forEach((path) => addEntry(path, monthly, 0.5));
  Object.values(terms).forEach((path) => addEntry(path, monthly, 0.5));
  Object.values(contact).forEach((path) => addEntry(path, monthly, 0.5));

  // About Page (high E-E-A-T trust signal)
  addEntry('/about', monthly, 0.8);

  // Guides & How-To Content Hub
  addEntry('/guides', weekly, 0.8);
  Object.keys(GUIDES_DATA).forEach((slug) => {
    addEntry(`/guides/${slug}`, weekly, 0.85);
  });

  return entries;
}
