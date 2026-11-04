import type { Metadata } from 'next';
import { GuidesIndexPageContent } from '../../../components/guides/GuidesIndexPageContent';
import { METADATA_BASE } from '../../../lib/metadata-shared';
import { SITE_URL } from '../../../lib/site';

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: "PDF Anleitungen & Schritt-für-Schritt Tutorials | ihatelovepdf",
  description: "Schritt-für-Schritt-Anleitungen zum Zusammenfügen, Verkleinern, Teilen, Unterschreiben und Umwandeln von PDFs direkt im Browser.",
  alternates: {
    canonical: `${SITE_URL}/de/guides`,
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
    title: "PDF Anleitungen & Schritt-für-Schritt Tutorials | ihatelovepdf",
    description: "Schritt-für-Schritt-Anleitungen zum Zusammenfügen, Verkleinern, Teilen, Unterschreiben und Umwandeln von PDFs direkt im Browser.",
    url: `${SITE_URL}/de/guides`,
    type: 'website',
    locale: "de_DE",
    images: [{ url: `${SITE_URL}/og-images/og-image-de.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "PDF Anleitungen & Schritt-für-Schritt Tutorials | ihatelovepdf",
    description: "Schritt-für-Schritt-Anleitungen zum Zusammenfügen, Verkleinern, Teilen, Unterschreiben und Umwandeln von PDFs direkt im Browser.",
    creator: '@YesShrey',
    site: '@YesShrey',
    images: [`${SITE_URL}/og-images/og-image-de.png`],
  },
};

export default function GuidesIndexPage() {
  return <GuidesIndexPageContent locale="de" />;
}
