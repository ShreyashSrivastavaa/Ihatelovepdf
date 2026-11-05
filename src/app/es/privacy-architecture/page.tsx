import type { Metadata } from 'next';
import { PrivacyArchitecturePageContent } from '../../../components/privacy-architecture/PrivacyArchitecturePageContent';
import { METADATA_BASE } from '../../../lib/metadata-shared';
import { SITE_URL } from '../../../lib/site';

const LOCALE = 'es' as const;

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: "Arquitectura de Privacidad: Cómo Funciona el Modelo Sin Subidas | ihatelovepdf",
  description: "Análisis técnico del procesamiento local de PDF con WebAssembly y guía paso a paso para verificar cero subidas en la pestaña Red de las herramientas de desarrollo.",
  alternates: {
    canonical: `${SITE_URL}/es/privacy-architecture`,
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
    title: "Arquitectura de Privacidad: Cómo Funciona el Modelo Sin Subidas | ihatelovepdf",
    description: "Análisis técnico del procesamiento local de PDF con WebAssembly y guía paso a paso para verificar cero subidas en la pestaña Red de las herramientas de desarrollo.",
    url: `${SITE_URL}/es/privacy-architecture`,
    type: 'website',
    locale: 'es_ES',
    images: [{ url: `${SITE_URL}/og-images/og-image-es.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Arquitectura de Privacidad: Cómo Funciona el Modelo Sin Subidas | ihatelovepdf",
    description: "Análisis técnico del procesamiento local de PDF con WebAssembly y guía paso a paso para verificar cero subidas en la pestaña Red de las herramientas de desarrollo.",
    creator: '@YesShrey',
    site: '@YesShrey',
    images: [`${SITE_URL}/og-images/og-image-es.png`],
  },
};

export default function Page() {
  return <PrivacyArchitecturePageContent locale={LOCALE} />;
}
