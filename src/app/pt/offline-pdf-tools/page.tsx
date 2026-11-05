import type { Metadata } from 'next';
import { OfflineToolsPageContent } from '../../../components/offline-tools/OfflineToolsPageContent';
import { METADATA_BASE, SHARED_ICONS } from '../../../lib/metadata-shared';
import { SITE_URL } from '../../../lib/site';

const LOCALE = 'pt';

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: "Ferramentas PDF Offline no Navegador | ihatelovepdf",
  description: "Processe PDFs localmente no navegador sem conexão ativa após o carregamento inicial. Zero uploads.",
  alternates: {
    canonical: `${SITE_URL}/pt/offline-pdf-tools`,
    languages: {
      'en': `${SITE_URL}/offline-pdf-tools`,
      'de': `${SITE_URL}/de/offline-pdf-tools`,
      'es': `${SITE_URL}/es/offline-pdf-tools`,
      'fr': `${SITE_URL}/fr/offline-pdf-tools`,
      'hu': `${SITE_URL}/hu/offline-pdf-tools`,
      'it': `${SITE_URL}/it/offline-pdf-tools`,
      'pt': `${SITE_URL}/pt/offline-pdf-tools`,
      'ro': `${SITE_URL}/ro/offline-pdf-tools`,
      'ru': `${SITE_URL}/ru/offline-pdf-tools`,
      'x-default': `${SITE_URL}/offline-pdf-tools`,
    },
  },
  icons: SHARED_ICONS,
  openGraph: {
    siteName: 'ihatelovepdf',
    title: "Ferramentas PDF Offline no Navegador | ihatelovepdf",
    description: "Processe PDFs localmente no navegador sem conexão ativa após o carregamento inicial. Zero uploads.",
    url: `${SITE_URL}/pt/offline-pdf-tools`,
    type: 'website',
    images: [{ url: `${SITE_URL}/og-images/og-image-pt.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Ferramentas PDF Offline no Navegador | ihatelovepdf",
    description: "Processe PDFs localmente no navegador sem conexão ativa após o carregamento inicial. Zero uploads.",
    creator: '@YesShrey',
    site: '@YesShrey',
    images: [`${SITE_URL}/og-images/og-image-pt.png`],
  },
};

export default function OfflinePdfToolsPage() {
  return <OfflineToolsPageContent locale={LOCALE} />;
}
