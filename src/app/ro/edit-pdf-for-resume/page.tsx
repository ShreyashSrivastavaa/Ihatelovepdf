import type { Metadata } from 'next';
import { SearchIntentPageContent } from '../../../components/search-intent/SearchIntentPageContent';
import { METADATA_BASE } from '../../../lib/metadata-shared';
import { SITE_URL } from '../../../lib/site';
import { SEARCH_INTENT_DATA } from '../../_data/search-intent-data';

const SLUG = 'edit-pdf-for-resume' as const;
const LOCALE = 'ro' as const;

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: SEARCH_INTENT_DATA[SLUG][LOCALE]?.title || SEARCH_INTENT_DATA[SLUG]['en'].title,
  description: SEARCH_INTENT_DATA[SLUG][LOCALE]?.description || SEARCH_INTENT_DATA[SLUG]['en'].description,
  alternates: {
    canonical: `${SITE_URL}/ro/edit-pdf-for-resume`,
    languages: {
      'en': `${SITE_URL}/edit-pdf-for-resume`,
      'de': `${SITE_URL}/de/edit-pdf-for-resume`,
      'es': `${SITE_URL}/es/edit-pdf-for-resume`,
      'fr': `${SITE_URL}/fr/edit-pdf-for-resume`,
      'hu': `${SITE_URL}/hu/edit-pdf-for-resume`,
      'it': `${SITE_URL}/it/edit-pdf-for-resume`,
      'pt': `${SITE_URL}/pt/edit-pdf-for-resume`,
      'ro': `${SITE_URL}/ro/edit-pdf-for-resume`,
      'ru': `${SITE_URL}/ru/edit-pdf-for-resume`,
      'x-default': `${SITE_URL}/edit-pdf-for-resume`,
    },
  },
  openGraph: {
    siteName: 'ihatelovepdf',
    title: SEARCH_INTENT_DATA[SLUG][LOCALE]?.title || SEARCH_INTENT_DATA[SLUG]['en'].title,
    description: SEARCH_INTENT_DATA[SLUG][LOCALE]?.description || SEARCH_INTENT_DATA[SLUG]['en'].description,
    url: `${SITE_URL}/ro/edit-pdf-for-resume`,
    type: 'website',
    locale: 'ro_RO',
    images: [{ url: `${SITE_URL}/og-images/og-image-ro.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SEARCH_INTENT_DATA[SLUG][LOCALE]?.title || SEARCH_INTENT_DATA[SLUG]['en'].title,
    description: SEARCH_INTENT_DATA[SLUG][LOCALE]?.description || SEARCH_INTENT_DATA[SLUG]['en'].description,
    creator: '@YesShrey',
    site: '@YesShrey',
    images: [`${SITE_URL}/og-images/og-image-ro.png`],
  },
};

export default function Page() {
  return <SearchIntentPageContent slug={SLUG} locale={LOCALE} />;
}
