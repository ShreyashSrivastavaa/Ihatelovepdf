import type { Metadata } from 'next';
import { SearchIntentPageContent } from '../../../components/search-intent/SearchIntentPageContent';
import { METADATA_BASE } from '../../../lib/metadata-shared';
import { SITE_URL } from '../../../lib/site';
import { SEARCH_INTENT_DATA } from '../../_data/search-intent-data';

const SLUG = 'pdf-tools-no-watermark' as const;
const LOCALE = 'es' as const;

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: SEARCH_INTENT_DATA[SLUG][LOCALE]?.title || SEARCH_INTENT_DATA[SLUG]['en'].title,
  description: SEARCH_INTENT_DATA[SLUG][LOCALE]?.description || SEARCH_INTENT_DATA[SLUG]['en'].description,
  alternates: {
    canonical: `${SITE_URL}/es/pdf-tools-no-watermark`,
    languages: {
      'en': `${SITE_URL}/pdf-tools-no-watermark`,
      'de': `${SITE_URL}/de/pdf-tools-no-watermark`,
      'es': `${SITE_URL}/es/pdf-tools-no-watermark`,
      'fr': `${SITE_URL}/fr/pdf-tools-no-watermark`,
      'hu': `${SITE_URL}/hu/pdf-tools-no-watermark`,
      'it': `${SITE_URL}/it/pdf-tools-no-watermark`,
      'pt': `${SITE_URL}/pt/pdf-tools-no-watermark`,
      'ro': `${SITE_URL}/ro/pdf-tools-no-watermark`,
      'ru': `${SITE_URL}/ru/pdf-tools-no-watermark`,
      'x-default': `${SITE_URL}/pdf-tools-no-watermark`,
    },
  },
  openGraph: {
    siteName: 'ihatelovepdf',
    title: SEARCH_INTENT_DATA[SLUG][LOCALE]?.title || SEARCH_INTENT_DATA[SLUG]['en'].title,
    description: SEARCH_INTENT_DATA[SLUG][LOCALE]?.description || SEARCH_INTENT_DATA[SLUG]['en'].description,
    url: `${SITE_URL}/es/pdf-tools-no-watermark`,
    type: 'website',
    locale: 'es_ES',
    images: [{ url: `${SITE_URL}/og-images/og-image-es.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SEARCH_INTENT_DATA[SLUG][LOCALE]?.title || SEARCH_INTENT_DATA[SLUG]['en'].title,
    description: SEARCH_INTENT_DATA[SLUG][LOCALE]?.description || SEARCH_INTENT_DATA[SLUG]['en'].description,
    creator: '@YesShrey',
    site: '@YesShrey',
    images: [`${SITE_URL}/og-images/og-image-es.png`],
  },
};

export default function Page() {
  return <SearchIntentPageContent slug={SLUG} locale={LOCALE} />;
}
