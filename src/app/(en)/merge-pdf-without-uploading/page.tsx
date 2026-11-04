import type { Metadata } from 'next';
import { SearchIntentPageContent } from '../../../components/search-intent/SearchIntentPageContent';
import { METADATA_BASE } from '../../../lib/metadata-shared';
import { SITE_URL } from '../../../lib/site';
import { SEARCH_INTENT_DATA } from '../../_data/search-intent-data';

const SLUG = 'merge-pdf-without-uploading' as const;
const LOCALE = 'en' as const;

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: SEARCH_INTENT_DATA[SLUG][LOCALE]?.title || SEARCH_INTENT_DATA[SLUG]['en'].title,
  description: SEARCH_INTENT_DATA[SLUG][LOCALE]?.description || SEARCH_INTENT_DATA[SLUG]['en'].description,
  alternates: {
    canonical: `${SITE_URL}/merge-pdf-without-uploading`,
    languages: {
      'en': `${SITE_URL}/merge-pdf-without-uploading`,
      'de': `${SITE_URL}/de/merge-pdf-without-uploading`,
      'es': `${SITE_URL}/es/merge-pdf-without-uploading`,
      'fr': `${SITE_URL}/fr/merge-pdf-without-uploading`,
      'hu': `${SITE_URL}/hu/merge-pdf-without-uploading`,
      'it': `${SITE_URL}/it/merge-pdf-without-uploading`,
      'pt': `${SITE_URL}/pt/merge-pdf-without-uploading`,
      'ro': `${SITE_URL}/ro/merge-pdf-without-uploading`,
      'ru': `${SITE_URL}/ru/merge-pdf-without-uploading`,
      'x-default': `${SITE_URL}/merge-pdf-without-uploading`,
    },
  },
  openGraph: {
    siteName: 'ihatelovepdf',
    title: SEARCH_INTENT_DATA[SLUG][LOCALE]?.title || SEARCH_INTENT_DATA[SLUG]['en'].title,
    description: SEARCH_INTENT_DATA[SLUG][LOCALE]?.description || SEARCH_INTENT_DATA[SLUG]['en'].description,
    url: `${SITE_URL}/merge-pdf-without-uploading`,
    type: 'website',
    locale: 'en_US',
    images: [{ url: `${SITE_URL}/og-images/og-image-en.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SEARCH_INTENT_DATA[SLUG][LOCALE]?.title || SEARCH_INTENT_DATA[SLUG]['en'].title,
    description: SEARCH_INTENT_DATA[SLUG][LOCALE]?.description || SEARCH_INTENT_DATA[SLUG]['en'].description,
    creator: '@YesShrey',
    site: '@YesShrey',
    images: [`${SITE_URL}/og-images/og-image-en.png`],
  },
};

export default function Page() {
  return <SearchIntentPageContent slug={SLUG} locale={LOCALE} />;
}
