import routeMapJson from "../../content/i18n-route-map.json" assert { type: "json" };
import { Locale } from "./config";
import { OperationKey } from "../types/operations";

export type StaticRouteKey = "home" | "faq" | "support" | "privacy" | "terms" | "contact";

export type RouteIdentifier =
  | { type: "static"; key: StaticRouteKey }
  | { type: "operation"; key: OperationKey };

type RouteMap = {
  home: Record<Locale, string>;
  faq: Record<Locale, string>;
  support: Record<Locale, string>;
  privacy: Record<Locale, string>;
  terms: Record<Locale, string>;
  contact: Record<Locale, string>;
  operations: Record<OperationKey, Record<Locale, string>>;
};

const routeMap = routeMapJson as RouteMap;

const localeOperationSlugMap: Record<Locale, Record<string, string>> = {
  es: {},
  en: {},
  pt: {},
  de: {},
  it: {},
  fr: {},
  ro: {},
  ru: {},
  hu: {},
};

const localeOperationSlugLookup: Record<Locale, Record<string, OperationKey>> = {
  es: {},
  en: {},
  pt: {},
  de: {},
  it: {},
  fr: {},
  ro: {},
  ru: {},
  hu: {},
};

const trimLeadingSlash = (path: string) => (path.startsWith("/") ? path.slice(1) : path);

const normalizePath = (path: string) => {
  if (path === "/") return "/";
  return path.replace(/\/$/, "");
};

(Object.keys(routeMap.operations) as OperationKey[]).forEach((operationKey) => {
  const perLocale = routeMap.operations[operationKey];
  (Object.keys(perLocale) as Locale[]).forEach((locale) => {
    const fullPath = perLocale[locale];
    const slug = trimLeadingSlash(fullPath.replace(new RegExp(`^/${locale}/`), ""));

    localeOperationSlugMap[locale][operationKey] = slug;
    localeOperationSlugLookup[locale][slug] = operationKey;
  });
});

export function getRoutePath(locale: Locale, key: StaticRouteKey): string {
  return routeMap[key][locale];
}

export function getOperationPath(locale: Locale, key: OperationKey): string {
  return routeMap.operations[key][locale];
}

export function getOperationSlug(locale: Locale, key: OperationKey): string {
  return localeOperationSlugMap[locale][key];
}

export function matchOperationKeyBySlug(locale: Locale, slug: string): OperationKey | undefined {
  return localeOperationSlugLookup[locale][slug];
}

export function getRouteIdentifierForPath(locale: Locale, pathname: string): RouteIdentifier | null {
  const normalised = normalizePath(pathname);

  if (normalizePath(getRoutePath(locale, "home")) === normalised) {
    return { type: "static", key: "home" };
  }

  if (normalizePath(getRoutePath(locale, "faq")) === normalised) {
    return { type: "static", key: "faq" };
  }

  if (normalizePath(getRoutePath(locale, "support")) === normalised) {
    return { type: "static", key: "support" };
  }

  if (normalizePath(getRoutePath(locale, "privacy")) === normalised) {
    return { type: "static", key: "privacy" };
  }

  if (normalizePath(getRoutePath(locale, "terms")) === normalised) {
    return { type: "static", key: "terms" };
  }

  if (normalizePath(getRoutePath(locale, "contact")) === normalised) {
    return { type: "static", key: "contact" };
  }

  const operationEntry = Object.entries(routeMap.operations).find(([, perLocale]) => {
    return normalizePath(perLocale[locale]) === normalised;
  }) as [OperationKey, Record<Locale, string>] | undefined;

  if (operationEntry) {
    return { type: "operation", key: operationEntry[0] };
  }

  return null;
}

export function getLocalizedAlternateMap(identifier: RouteIdentifier): Record<Locale, string> {
  if (identifier.type === "static") {
    const entry = routeMap[identifier.key];
    return { ...entry };
  }

  const entry = routeMap.operations[identifier.key];
  return { ...entry };
}

export function getRouteMap() {
  return routeMap;
}

/**
 * Flat lookup: URL slug segment → OperationKey across ALL locales.
 * Built dynamically from the route map so it never goes stale.
 * Used by BreadcrumbSchema to resolve the last path segment
 * into an operation key for structured data labels.
 */
export function buildGlobalSlugToOperationMap(): Record<string, OperationKey> {
  const map: Record<string, OperationKey> = {};
  for (const [slug, opKey] of Object.values(localeOperationSlugLookup).flatMap(Object.entries)) {
    map[slug] = opKey;
  }
  return map;
}

/**
 * Set of all FAQ URL segments across all locales (e.g. "faq", "preguntas-frecuentes", etc.).
 * Built dynamically from the route map.
 */
export function buildFaqSegmentSet(): Set<string> {
  const segments = new Set<string>();
  const faqRoutes = routeMap.faq;
  for (const path of Object.values(faqRoutes)) {
    const parts = path.split("/").filter(Boolean);
    const lastSegment = parts[parts.length - 1];
    if (lastSegment) segments.add(lastSegment);
  }
  return segments;
}
