import type { Metadata } from 'next';
import { PrivacyArchitecturePageContent } from '../../../components/privacy-architecture/PrivacyArchitecturePageContent';
import { METADATA_BASE } from '../../../lib/metadata-shared';
import { SITE_URL } from '../../../lib/site';

const LOCALE = 'ro' as const;

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: "Arhitectură de Confidențialitate: Cum Funcționează Modelul Fără Server | ihatelovepdf",
  description: "Analiză tehnică a procesării PDF locale prin WebAssembly și instrucțiuni pas cu pas pentru verificarea traficului de rețea zero în DevTools.",
  alternates: {
    canonical: `${SITE_URL}/ro/privacy-architecture`,
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
    title: "Arhitectură de Confidențialitate: Cum Funcționează Modelul Fără Server | ihatelovepdf",
    description: "Analiză tehnică a procesării PDF locale prin WebAssembly și instrucțiuni pas cu pas pentru verificarea traficului de rețea zero în DevTools.",
    url: `${SITE_URL}/ro/privacy-architecture`,
    type: 'website',
    locale: 'ro_RO',
    images: [{ url: `${SITE_URL}/og-images/og-image-ro.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Arhitectură de Confidențialitate: Cum Funcționează Modelul Fără Server | ihatelovepdf",
    description: "Analiză tehnică a procesării PDF locale prin WebAssembly și instrucțiuni pas cu pas pentru verificarea traficului de rețea zero în DevTools.",
    creator: '@YesShrey',
    site: '@YesShrey',
    images: [`${SITE_URL}/og-images/og-image-ro.png`],
  },
};

export default function Page() {
  return <PrivacyArchitecturePageContent locale={LOCALE} />;
}
