import type { Metadata } from 'next';
import { GuidesIndexPageContent } from '../../../components/guides/GuidesIndexPageContent';
import { METADATA_BASE } from '../../../lib/metadata-shared';
import { SITE_URL } from '../../../lib/site';

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: 'PDF How-To Guides and Tutorials | ihatelovepdf',
  description:
    'Step-by-step tutorials and practical guides for merging, compressing, splitting, redacting, signing, and converting PDFs with private in-browser tools.',
  alternates: {
    canonical: `${SITE_URL}/guides`,
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
    title: 'PDF How-To Guides and Tutorials | ihatelovepdf',
    description:
      'Step-by-step tutorials and practical guides for merging, compressing, splitting, redacting, signing, and converting PDFs with private in-browser tools.',
    url: `${SITE_URL}/guides`,
    type: 'website',
    locale: 'en_US',
    images: [{ url: `${SITE_URL}/og-images/og-image-en.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF How-To Guides and Tutorials | ihatelovepdf',
    description:
      'Step-by-step tutorials and practical guides for merging, compressing, splitting, redacting, signing, and converting PDFs with private in-browser tools.',
    creator: '@YesShrey',
    site: '@YesShrey',
    images: [`${SITE_URL}/og-images/og-image-en.png`],
  },
};

export default function GuidesIndexPage() {
  return <GuidesIndexPageContent locale="en" />;
}
