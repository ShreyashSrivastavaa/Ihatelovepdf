import type { Metadata } from 'next';
import { PrivacyArchitecturePageContent } from '../../../components/privacy-architecture/PrivacyArchitecturePageContent';
import { METADATA_BASE } from '../../../lib/metadata-shared';
import { SITE_URL } from '../../../lib/site';

const LOCALE = 'hu' as const;

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: "Adatvédelmi Architektúra: Hogyan Működik a Feltöltés Nélküli Modell | ihatelovepdf",
  description: "A helyi WebAssembly PDF-feldolgozás technikai bemutatása és útmutató a 0 bájtos hálózati forgalom független ellenőrzéséhez a böngészőben.",
  alternates: {
    canonical: `${SITE_URL}/hu/privacy-architecture`,
    languages: {
      'en': `${SITE_URL}/privacy-architecture`,
      'de': `${SITE_URL}/de/privacy-architecture`,
      'es': `${SITE_URL}/es/privacy-architecture`,
      'fr': `${SITE_URL}/fr/privacy-architecture`,
      'hu': `${SITE_URL}/hu/privacy-architecture`,
      'it': `${SITE_URL}/it/privacy-architecture`,
      'pt': `${SITE_URL}/pt/privacy-architecture`,
      'ro': `${SITE_URL}/ro/privacy-architecture`,
      'ru': `${SITE_URL}/ru/privacy-architecture`,
      'x-default': `${SITE_URL}/privacy-architecture`,
    },
  },
  openGraph: {
    siteName: 'ihatelovepdf',
    title: "Adatvédelmi Architektúra: Hogyan Működik a Feltöltés Nélküli Modell | ihatelovepdf",
    description: "A helyi WebAssembly PDF-feldolgozás technikai bemutatása és útmutató a 0 bájtos hálózati forgalom független ellenőrzéséhez a böngészőben.",
    url: `${SITE_URL}/hu/privacy-architecture`,
    type: 'website',
    locale: 'hu_HU',
    images: [{ url: `${SITE_URL}/og-images/og-image-hu.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Adatvédelmi Architektúra: Hogyan Működik a Feltöltés Nélküli Modell | ihatelovepdf",
    description: "A helyi WebAssembly PDF-feldolgozás technikai bemutatása és útmutató a 0 bájtos hálózati forgalom független ellenőrzéséhez a böngészőben.",
    creator: '@YesShrey',
    site: '@YesShrey',
    images: [`${SITE_URL}/og-images/og-image-hu.png`],
  },
};

export default function Page() {
  return <PrivacyArchitecturePageContent locale={LOCALE} />;
}
