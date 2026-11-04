import type { Metadata } from 'next';
import { ComparisonPageContent } from '../../../components/comparison/ComparisonPageContent';
import { METADATA_BASE } from '../../../lib/metadata-shared';
import { SITE_URL } from '../../../lib/site';
import { COMPARISONS_DATA } from '../../_data/comparisons-data';

const PAGE_TYPE = 'ihatepdf' as const;
const LOCALE = 'pt' as const;

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: COMPARISONS_DATA[PAGE_TYPE][LOCALE]?.title || COMPARISONS_DATA[PAGE_TYPE]['en'].title,
  description: COMPARISONS_DATA[PAGE_TYPE][LOCALE]?.description || COMPARISONS_DATA[PAGE_TYPE]['en'].description,
  alternates: {
    canonical: `${SITE_URL}/pt/ihatepdf-alternative`,
    languages: {
      'en': `${SITE_URL}/ihatepdf-alternative`,
      'de': `${SITE_URL}/de/ihatepdf-alternative`,
      'es': `${SITE_URL}/es/ihatepdf-alternative`,
      'fr': `${SITE_URL}/fr/ihatepdf-alternative`,
      'hu': `${SITE_URL}/hu/ihatepdf-alternative`,
      'it': `${SITE_URL}/it/ihatepdf-alternative`,
      'pt': `${SITE_URL}/pt/ihatepdf-alternative`,
      'ro': `${SITE_URL}/ro/ihatepdf-alternative`,
      'ru': `${SITE_URL}/ru/ihatepdf-alternative`,
      'x-default': `${SITE_URL}/ihatepdf-alternative`,
    },
  },
  openGraph: {
    siteName: 'ihatelovepdf',
    title: COMPARISONS_DATA[PAGE_TYPE][LOCALE]?.title || COMPARISONS_DATA[PAGE_TYPE]['en'].title,
    description: COMPARISONS_DATA[PAGE_TYPE][LOCALE]?.description || COMPARISONS_DATA[PAGE_TYPE]['en'].description,
    url: `${SITE_URL}/pt/ihatepdf-alternative`,
    type: 'website',
    locale: 'pt_BR',
    images: [{ url: `${SITE_URL}/og-images/og-image-pt.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: COMPARISONS_DATA[PAGE_TYPE][LOCALE]?.title || COMPARISONS_DATA[PAGE_TYPE]['en'].title,
    description: COMPARISONS_DATA[PAGE_TYPE][LOCALE]?.description || COMPARISONS_DATA[PAGE_TYPE]['en'].description,
    creator: '@YesShrey',
    site: '@YesShrey',
    images: [`${SITE_URL}/og-images/og-image-pt.png`],
  },
};

export default function Page() {
  return <ComparisonPageContent pageType={PAGE_TYPE} locale={LOCALE} />;
}
