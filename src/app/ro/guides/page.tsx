import type { Metadata } from 'next';
import { GuidesIndexPageContent } from '../../../components/guides/GuidesIndexPageContent';
import { METADATA_BASE } from '../../../lib/metadata-shared';
import { SITE_URL } from '../../../lib/site';

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: "Ghiduri Practice și Tutoriale PDF Pas cu Pas | ihatelovepdf",
  description: "Tutoriale detaliate despre cum să unești, comprimi, împarți, semnezi și convertești fișiere PDF direct în browser fără server.",
  alternates: {
    canonical: `${SITE_URL}/ro/guides`,
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
    title: "Ghiduri Practice și Tutoriale PDF Pas cu Pas | ihatelovepdf",
    description: "Tutoriale detaliate despre cum să unești, comprimi, împarți, semnezi și convertești fișiere PDF direct în browser fără server.",
    url: `${SITE_URL}/ro/guides`,
    type: 'website',
    locale: "ro_RO",
    images: [{ url: `${SITE_URL}/og-images/og-image-ro.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Ghiduri Practice și Tutoriale PDF Pas cu Pas | ihatelovepdf",
    description: "Tutoriale detaliate despre cum să unești, comprimi, împarți, semnezi și convertești fișiere PDF direct în browser fără server.",
    creator: '@YesShrey',
    site: '@YesShrey',
    images: [`${SITE_URL}/og-images/og-image-ro.png`],
  },
};

export default function GuidesIndexPage() {
  return <GuidesIndexPageContent locale="ro" />;
}
