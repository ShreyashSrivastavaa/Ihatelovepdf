import type { Metadata } from 'next';
import { PrivacyArchitecturePageContent } from '../../../components/privacy-architecture/PrivacyArchitecturePageContent';
import { METADATA_BASE } from '../../../lib/metadata-shared';
import { SITE_URL } from '../../../lib/site';

const LOCALE = 'it' as const;

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: "Architettura di Privacy: Come Funziona il Modello Senza Upload | ihatelovepdf",
  description: "Analisi tecnica dell'elaborazione PDF locale con WebAssembly e guida per verificare zero byte inviati nella scheda Rete degli strumenti di sviluppo.",
  alternates: {
    canonical: `${SITE_URL}/it/privacy-architecture`,
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
    title: "Architettura di Privacy: Come Funziona il Modello Senza Upload | ihatelovepdf",
    description: "Analisi tecnica dell'elaborazione PDF locale con WebAssembly e guida per verificare zero byte inviati nella scheda Rete degli strumenti di sviluppo.",
    url: `${SITE_URL}/it/privacy-architecture`,
    type: 'website',
    locale: 'it_IT',
    images: [{ url: `${SITE_URL}/og-images/og-image-it.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Architettura di Privacy: Come Funziona il Modello Senza Upload | ihatelovepdf",
    description: "Analisi tecnica dell'elaborazione PDF locale con WebAssembly e guida per verificare zero byte inviati nella scheda Rete degli strumenti di sviluppo.",
    creator: '@YesShrey',
    site: '@YesShrey',
    images: [`${SITE_URL}/og-images/og-image-it.png`],
  },
};

export default function Page() {
  return <PrivacyArchitecturePageContent locale={LOCALE} />;
}
