import type { Metadata } from 'next';
import { OfflineToolsPageContent } from '../../../components/offline-tools/OfflineToolsPageContent';
import { METADATA_BASE, SHARED_ICONS } from '../../../lib/metadata-shared';
import { SITE_URL } from '../../../lib/site';

const LOCALE = 'en';

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: "Offline PDF Tools: Run in Browser | ihatelovepdf",
  description: "Process PDFs locally in your browser without an active connection once loaded. Client-side tools that keep files on your device.",
  alternates: {
    canonical: `${SITE_URL}/offline-pdf-tools`,
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
    title: "Offline PDF Tools: Run in Browser | ihatelovepdf",
    description: "Process PDFs locally in your browser without an active connection once loaded. Client-side tools that keep files on your device.",
    url: `${SITE_URL}/offline-pdf-tools`,
    type: 'website',
    images: [{ url: `${SITE_URL}/og-images/og-image-en.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Offline PDF Tools: Run in Browser | ihatelovepdf",
    description: "Process PDFs locally in your browser without an active connection once loaded. Client-side tools that keep files on your device.",
    creator: '@YesShrey',
    site: '@YesShrey',
    images: [`${SITE_URL}/og-images/og-image-en.png`],
  },
};

export default function OfflinePdfToolsPage() {
  return <OfflineToolsPageContent locale={LOCALE} />;
}
