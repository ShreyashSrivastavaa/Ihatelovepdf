import type { Metadata } from 'next';
import { ComparisonPageContent } from '../../../components/comparison/ComparisonPageContent';
import { METADATA_BASE } from '../../../lib/metadata-shared';
import { SITE_URL } from '../../../lib/site';
import { COMPARISONS_DATA } from '../../_data/comparisons-data';

const PAGE_TYPE = 'adobe-acrobat' as const;
const LOCALE = 'fr' as const;

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: COMPARISONS_DATA[PAGE_TYPE][LOCALE]?.title || COMPARISONS_DATA[PAGE_TYPE]['en'].title,
  description: COMPARISONS_DATA[PAGE_TYPE][LOCALE]?.description || COMPARISONS_DATA[PAGE_TYPE]['en'].description,
  alternates: {
    canonical: `${SITE_URL}/fr/adobe-acrobat-alternative`,
    languages: {
      'en': `${SITE_URL}/adobe-acrobat-alternative`,
      'de': `${SITE_URL}/de/adobe-acrobat-alternative`,
      'es': `${SITE_URL}/es/adobe-acrobat-alternative`,
      'fr': `${SITE_URL}/fr/adobe-acrobat-alternative`,
      'hu': `${SITE_URL}/hu/adobe-acrobat-alternative`,
      'it': `${SITE_URL}/it/adobe-acrobat-alternative`,
      'pt': `${SITE_URL}/pt/adobe-acrobat-alternative`,
      'ro': `${SITE_URL}/ro/adobe-acrobat-alternative`,
      'ru': `${SITE_URL}/ru/adobe-acrobat-alternative`,
      'x-default': `${SITE_URL}/adobe-acrobat-alternative`,
    },
  },
  openGraph: {
    siteName: 'ihatelovepdf',
    title: COMPARISONS_DATA[PAGE_TYPE][LOCALE]?.title || COMPARISONS_DATA[PAGE_TYPE]['en'].title,
    description: COMPARISONS_DATA[PAGE_TYPE][LOCALE]?.description || COMPARISONS_DATA[PAGE_TYPE]['en'].description,
    url: `${SITE_URL}/fr/adobe-acrobat-alternative`,
    type: 'website',
    locale: 'fr_FR',
    images: [{ url: `${SITE_URL}/og-images/og-image-fr.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: COMPARISONS_DATA[PAGE_TYPE][LOCALE]?.title || COMPARISONS_DATA[PAGE_TYPE]['en'].title,
    description: COMPARISONS_DATA[PAGE_TYPE][LOCALE]?.description || COMPARISONS_DATA[PAGE_TYPE]['en'].description,
    creator: '@YesShrey',
    site: '@YesShrey',
    images: [`${SITE_URL}/og-images/og-image-fr.png`],
  },
};

export default function Page() {
  return <ComparisonPageContent pageType={PAGE_TYPE} locale={LOCALE} />;
}
