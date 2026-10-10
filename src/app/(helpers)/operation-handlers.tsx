import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Locale, DEFAULT_LOCALE, localeLabels } from "../../i18n/config";
import { getDictionary } from "../../i18n/get-dictionary";
import { getLocalizedAlternateMap, getOperationSlug, matchOperationKeyBySlug } from "../../i18n/routing";
import type { OperationKey } from "../../types/operations";
import { OperationPageContent } from "../../components/OperationPageContent";
import { SITE_URL, GOOGLE_SITE_VERIFICATION } from "../../lib/site";

function buildLanguagesMap(operationKey: OperationKey, baseUrl: string) {
  const alternatesMap = getLocalizedAlternateMap({ type: "operation", key: operationKey });
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

export function buildOperationMetadata(locale: Locale, operationKey: OperationKey) {
  return (): Metadata => {
    const dictionary = getDictionary(locale);
    const operationMeta = dictionary.metadata.operations[operationKey];
    const baseUrl = SITE_URL;
    const canonicalPath = dictionary.routes.operations[operationKey];
    const canonicalPathWithSlash = canonicalPath.endsWith("/") ? canonicalPath : `${canonicalPath}/`;
    const canonicalUrl = new URL(canonicalPathWithSlash, baseUrl).toString();
    const languages = buildLanguagesMap(operationKey, baseUrl);

    return {
      metadataBase: new URL(baseUrl),
      title: operationMeta.meta.title,
      description: operationMeta.meta.description,
      keywords: operationMeta.meta.keywords,
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
        title: operationMeta.meta.ogTitle ?? operationMeta.meta.title,
        description: operationMeta.meta.ogDescription ?? operationMeta.meta.description,
        url: canonicalUrl,
        locale: dictionary.metadata.site.openGraph.locale,
        images: [
          {
            url: `${baseUrl}/og-images/og-image-${locale}.png`,
            width: 1409,
            height: 736,
            alt: operationMeta.meta.ogImageAlt ?? operationMeta.hero.imageAlt,
          },
        ],
      },
    };
  };
}


export function buildOperationPage(locale: Locale, operationKey: OperationKey) {
  return function OperationPage() {
    const dictionary = getDictionary(locale);
    const operation = dictionary.operations[operationKey];

    if (!operation) {
      notFound();
    }

    return <OperationPageContent operation={operation} />;
  };
}

export function createLocaleOperationHandlers(locale: Locale) {
  type Params = { operation: string };

  function generateStaticParams(): Params[] {
    const dictionary = getDictionary(locale);
    return (Object.keys(dictionary.operations) as OperationKey[]).map((operationKey) => ({
      operation: getOperationSlug(locale, operationKey),
    }));
  }

  async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
    const { operation: operationSlug } = await params;
    const operationKey = matchOperationKeyBySlug(locale, operationSlug) as OperationKey | undefined;
    if (!operationKey) {
      return {};
    }

    return buildOperationMetadata(locale, operationKey)();
  }

  async function OperationPage({ params }: { params: Promise<Params> }) {
    const { operation: operationSlug } = await params;
    const operationKey = matchOperationKeyBySlug(locale, operationSlug) as OperationKey | undefined;
    if (!operationKey) {
      notFound();
    }

    const dictionary = getDictionary(locale);
    const operationContent = dictionary.operations[operationKey];
    if (!operationContent) {
      notFound();
    }

    return <OperationPageContent operation={operationContent} />;
  }

  return { generateStaticParams, generateMetadata, OperationPage };
}
