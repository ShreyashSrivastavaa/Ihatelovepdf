import type { Metadata } from 'next';
import { PrivacyArchitecturePageContent } from '../../../components/privacy-architecture/PrivacyArchitecturePageContent';
import { METADATA_BASE } from '../../../lib/metadata-shared';
import { SITE_URL } from '../../../lib/site';

const LOCALE = 'fr' as const;

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: "Architecture de Confidentialité : Comment Fonctionne le Zéro Téléversement | ihatelovepdf",
  description: "Explications techniques du traitement local WebAssembly et guide pas à pas pour vérifier l'absence de téléversement dans l'onglet Réseau.",
  alternates: {
    canonical: `${SITE_URL}/fr/privacy-architecture`,
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
    title: "Architecture de Confidentialité : Comment Fonctionne le Zéro Téléversement | ihatelovepdf",
    description: "Explications techniques du traitement local WebAssembly et guide pas à pas pour vérifier l'absence de téléversement dans l'onglet Réseau.",
    url: `${SITE_URL}/fr/privacy-architecture`,
    type: 'website',
    locale: 'fr_FR',
    images: [{ url: `${SITE_URL}/og-images/og-image-fr.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Architecture de Confidentialité : Comment Fonctionne le Zéro Téléversement | ihatelovepdf",
    description: "Explications techniques du traitement local WebAssembly et guide pas à pas pour vérifier l'absence de téléversement dans l'onglet Réseau.",
    creator: '@YesShrey',
    site: '@YesShrey',
    images: [`${SITE_URL}/og-images/og-image-fr.png`],
  },
};

export default function Page() {
  return <PrivacyArchitecturePageContent locale={LOCALE} />;
}
