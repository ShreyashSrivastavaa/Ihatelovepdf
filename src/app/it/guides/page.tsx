import type { Metadata } from 'next';
import { GuidesIndexPageContent } from '../../../components/guides/GuidesIndexPageContent';
import { METADATA_BASE } from '../../../lib/metadata-shared';
import { SITE_URL } from '../../../lib/site';

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: "Guide e Tutorial Passo dopo Passo per PDF | ihatelovepdf",
  description: "Guide pratiche per unire, comprimere, dividere, firmare e convertire file PDF direttamente nel tuo browser senza caricare file.",
  alternates: {
    canonical: `${SITE_URL}/it/guides`,
    languages: {
      en: `${SITE_URL}/guides`,
      es: `${SITE_URL}/es/guides`,
      pt: `${SITE_URL}/pt/guides`,
      de: `${SITE_URL}/de/guides`,
      it: `${SITE_URL}/it/guides`,
      fr: `${SITE_URL}/fr/guides`,
      ro: `${SITE_URL}/ro/guides`,
      ru: `${SITE_URL}/ru/guides`,
      hu: `${SITE_URL}/hu/guides`,
      'x-default': `${SITE_URL}/guides`,
    },
  },
  openGraph: {
    siteName: 'ihatelovepdf',
    title: "Guide e Tutorial Passo dopo Passo per PDF | ihatelovepdf",
    description: "Guide pratiche per unire, comprimere, dividere, firmare e convertire file PDF direttamente nel tuo browser senza caricare file.",
    url: `${SITE_URL}/it/guides`,
    type: 'website',
    locale: "it_IT",
    images: [{ url: `${SITE_URL}/og-images/og-image-it.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Guide e Tutorial Passo dopo Passo per PDF | ihatelovepdf",
    description: "Guide pratiche per unire, comprimere, dividere, firmare e convertire file PDF direttamente nel tuo browser senza caricare file.",
    creator: '@YesShrey',
    site: '@YesShrey',
    images: [`${SITE_URL}/og-images/og-image-it.png`],
  },
};

export default function GuidesIndexPage() {
  return <GuidesIndexPageContent locale="it" />;
}
