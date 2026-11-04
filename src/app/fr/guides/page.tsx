import type { Metadata } from 'next';
import { GuidesIndexPageContent } from '../../../components/guides/GuidesIndexPageContent';
import { METADATA_BASE } from '../../../lib/metadata-shared';
import { SITE_URL } from '../../../lib/site';

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: "Guides Pratiques et Tutoriels PDF | ihatelovepdf",
  description: "Tutoriels pas à pas pour fusionner, compresser, diviser, signer et convertir vos PDF directement dans votre navigateur sans téléversement.",
  alternates: {
    canonical: `${SITE_URL}/fr/guides`,
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
    title: "Guides Pratiques et Tutoriels PDF | ihatelovepdf",
    description: "Tutoriels pas à pas pour fusionner, compresser, diviser, signer et convertir vos PDF directement dans votre navigateur sans téléversement.",
    url: `${SITE_URL}/fr/guides`,
    type: 'website',
    locale: "fr_FR",
    images: [{ url: `${SITE_URL}/og-images/og-image-fr.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Guides Pratiques et Tutoriels PDF | ihatelovepdf",
    description: "Tutoriels pas à pas pour fusionner, compresser, diviser, signer et convertir vos PDF directement dans votre navigateur sans téléversement.",
    creator: '@YesShrey',
    site: '@YesShrey',
    images: [`${SITE_URL}/og-images/og-image-fr.png`],
  },
};

export default function GuidesIndexPage() {
  return <GuidesIndexPageContent locale="fr" />;
}
