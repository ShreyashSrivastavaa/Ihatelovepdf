import type { Metadata } from 'next';
import { GuidesIndexPageContent } from '../../../components/guides/GuidesIndexPageContent';
import { METADATA_BASE } from '../../../lib/metadata-shared';
import { SITE_URL } from '../../../lib/site';

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: "Gyakorlati PDF útmutatók és leírások lépésről lépésre | ihatelovepdf",
  description: "Lépésről lépésre útmutatók PDF fájlok egyesítéséhez, tömörítéséhez, szétbontásához, aláírásához és konvertálásához feltöltés nélkül.",
  alternates: {
    canonical: `${SITE_URL}/hu/guides`,
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
    title: "Gyakorlati PDF útmutatók és leírások lépésről lépésre | ihatelovepdf",
    description: "Lépésről lépésre útmutatók PDF fájlok egyesítéséhez, tömörítéséhez, szétbontásához, aláírásához és konvertálásához feltöltés nélkül.",
    url: `${SITE_URL}/hu/guides`,
    type: 'website',
    locale: "hu_HU",
    images: [{ url: `${SITE_URL}/og-images/og-image-hu.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Gyakorlati PDF útmutatók és leírások lépésről lépésre | ihatelovepdf",
    description: "Lépésről lépésre útmutatók PDF fájlok egyesítéséhez, tömörítéséhez, szétbontásához, aláírásához és konvertálásához feltöltés nélkül.",
    creator: '@YesShrey',
    site: '@YesShrey',
    images: [`${SITE_URL}/og-images/og-image-hu.png`],
  },
};

export default function GuidesIndexPage() {
  return <GuidesIndexPageContent locale="hu" />;
}
