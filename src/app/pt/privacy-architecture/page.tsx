import type { Metadata } from 'next';
import { PrivacyArchitecturePageContent } from '../../../components/privacy-architecture/PrivacyArchitecturePageContent';
import { METADATA_BASE } from '../../../lib/metadata-shared';
import { SITE_URL } from '../../../lib/site';

const LOCALE = 'pt' as const;

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: "Arquitetura de Privacidade: Como Funciona o Modelo Sem Upload | ihatelovepdf",
  description: "Análise técnica do processamento local de PDF com WebAssembly e instruções passo a passo para verificar zero uploads na aba Rede do navegador.",
  alternates: {
    canonical: `${SITE_URL}/pt/privacy-architecture`,
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
    title: "Arquitetura de Privacidade: Como Funciona o Modelo Sem Upload | ihatelovepdf",
    description: "Análise técnica do processamento local de PDF com WebAssembly e instruções passo a passo para verificar zero uploads na aba Rede do navegador.",
    url: `${SITE_URL}/pt/privacy-architecture`,
    type: 'website',
    locale: 'pt_BR',
    images: [{ url: `${SITE_URL}/og-images/og-image-pt.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Arquitetura de Privacidade: Como Funciona o Modelo Sem Upload | ihatelovepdf",
    description: "Análise técnica do processamento local de PDF com WebAssembly e instruções passo a passo para verificar zero uploads na aba Rede do navegador.",
    creator: '@YesShrey',
    site: '@YesShrey',
    images: [`${SITE_URL}/og-images/og-image-pt.png`],
  },
};

export default function Page() {
  return <PrivacyArchitecturePageContent locale={LOCALE} />;
}
