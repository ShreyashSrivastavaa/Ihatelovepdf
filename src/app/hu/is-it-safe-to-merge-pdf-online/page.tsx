import type { Metadata } from 'next';
import { SearchIntentPageContent } from '../../../components/search-intent/SearchIntentPageContent';
import { METADATA_BASE } from '../../../lib/metadata-shared';
import { SITE_URL } from '../../../lib/site';
import { SEARCH_INTENT_DATA } from '../../_data/search-intent-data';

const SLUG = 'is-it-safe-to-merge-pdf-online' as const;
const LOCALE = 'hu' as const;

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: SEARCH_INTENT_DATA[SLUG][LOCALE]?.title || SEARCH_INTENT_DATA[SLUG]['en'].title,
  description: SEARCH_INTENT_DATA[SLUG][LOCALE]?.description || SEARCH_INTENT_DATA[SLUG]['en'].description,
  alternates: {
    canonical: `${SITE_URL}/hu/is-it-safe-to-merge-pdf-online`,
    languages: {
      'en': `${SITE_URL}/is-it-safe-to-merge-pdf-online`,
      'de': `${SITE_URL}/de/is-it-safe-to-merge-pdf-online`,
      'es': `${SITE_URL}/es/is-it-safe-to-merge-pdf-online`,
      'fr': `${SITE_URL}/fr/is-it-safe-to-merge-pdf-online`,
      'hu': `${SITE_URL}/hu/is-it-safe-to-merge-pdf-online`,
      'it': `${SITE_URL}/it/is-it-safe-to-merge-pdf-online`,
      'pt': `${SITE_URL}/pt/is-it-safe-to-merge-pdf-online`,
      'ro': `${SITE_URL}/ro/is-it-safe-to-merge-pdf-online`,
      'ru': `${SITE_URL}/ru/is-it-safe-to-merge-pdf-online`,
      'x-default': `${SITE_URL}/is-it-safe-to-merge-pdf-online`,
    },
  },
  openGraph: {
    siteName: 'ihatelovepdf',
    title: SEARCH_INTENT_DATA[SLUG][LOCALE]?.title || SEARCH_INTENT_DATA[SLUG]['en'].title,
    description: SEARCH_INTENT_DATA[SLUG][LOCALE]?.description || SEARCH_INTENT_DATA[SLUG]['en'].description,
    url: `${SITE_URL}/hu/is-it-safe-to-merge-pdf-online`,
    type: 'website',
    locale: 'hu_HU',
    images: [{ url: `${SITE_URL}/og-images/og-image-hu.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SEARCH_INTENT_DATA[SLUG][LOCALE]?.title || SEARCH_INTENT_DATA[SLUG]['en'].title,
    description: SEARCH_INTENT_DATA[SLUG][LOCALE]?.description || SEARCH_INTENT_DATA[SLUG]['en'].description,
    creator: '@YesShrey',
    site: '@YesShrey',
    images: [`${SITE_URL}/og-images/og-image-hu.png`],
  },
};

export default function Page() {
  return <SearchIntentPageContent slug={SLUG} locale={LOCALE} />;
}
