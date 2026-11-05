import type { Metadata } from 'next';
import { PrivacyArchitecturePageContent } from '../../../components/privacy-architecture/PrivacyArchitecturePageContent';
import { METADATA_BASE } from '../../../lib/metadata-shared';
import { SITE_URL } from '../../../lib/site';

const LOCALE = 'de' as const;

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: "Datenschutz-Architektur: Wie unser Zero-Upload-Modell funktioniert | ihatelovepdf",
  description: "Technische Erklärung der lokalen WebAssembly-PDF-Verarbeitung im Browser und Schritt-für-Schritt-Anleitung zur Prüfung von 0 Bytes Netzwerkaktivität.",
  alternates: {
    canonical: `${SITE_URL}/de/privacy-architecture`,
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
    title: "Datenschutz-Architektur: Wie unser Zero-Upload-Modell funktioniert | ihatelovepdf",
    description: "Technische Erklärung der lokalen WebAssembly-PDF-Verarbeitung im Browser und Schritt-für-Schritt-Anleitung zur Prüfung von 0 Bytes Netzwerkaktivität.",
    url: `${SITE_URL}/de/privacy-architecture`,
    type: 'website',
    locale: 'de_DE',
    images: [{ url: `${SITE_URL}/og-images/og-image-de.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Datenschutz-Architektur: Wie unser Zero-Upload-Modell funktioniert | ihatelovepdf",
    description: "Technische Erklärung der lokalen WebAssembly-PDF-Verarbeitung im Browser und Schritt-für-Schritt-Anleitung zur Prüfung von 0 Bytes Netzwerkaktivität.",
    creator: '@YesShrey',
    site: '@YesShrey',
    images: [`${SITE_URL}/og-images/og-image-de.png`],
  },
};

export default function Page() {
  return <PrivacyArchitecturePageContent locale={LOCALE} />;
}
