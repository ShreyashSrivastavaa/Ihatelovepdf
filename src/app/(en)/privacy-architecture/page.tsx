import type { Metadata } from 'next';
import { PrivacyArchitecturePageContent } from '../../../components/privacy-architecture/PrivacyArchitecturePageContent';
import { METADATA_BASE } from '../../../lib/metadata-shared';
import { SITE_URL } from '../../../lib/site';

const LOCALE = 'en' as const;

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: "Privacy Architecture: How Our Zero-Upload Model Works | ihatelovepdf",
  description: "Technical breakdown of in-browser WebAssembly PDF processing and step-by-step instructions to verify zero outbound network transmission in browser DevTools.",
  alternates: {
    canonical: `${SITE_URL}/privacy-architecture`,
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
    title: "Privacy Architecture: How Our Zero-Upload Model Works | ihatelovepdf",
    description: "Technical breakdown of in-browser WebAssembly PDF processing and step-by-step instructions to verify zero outbound network transmission in browser DevTools.",
    url: `${SITE_URL}/privacy-architecture`,
    type: 'website',
    locale: 'en_US',
    images: [{ url: `${SITE_URL}/og-images/og-image-en.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Privacy Architecture: How Our Zero-Upload Model Works | ihatelovepdf",
    description: "Technical breakdown of in-browser WebAssembly PDF processing and step-by-step instructions to verify zero outbound network transmission in browser DevTools.",
    creator: '@YesShrey',
    site: '@YesShrey',
    images: [`${SITE_URL}/og-images/og-image-en.png`],
  },
};

export default function Page() {
  return <PrivacyArchitecturePageContent locale={LOCALE} />;
}
