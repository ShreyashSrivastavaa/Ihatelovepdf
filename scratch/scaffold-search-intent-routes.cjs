const fs = require('fs');
const path = require('path');

const LOCALES = ['en', 'de', 'es', 'fr', 'hu', 'it', 'pt', 'ro', 'ru'];
const SEARCH_INTENT_SLUGS = [
  'merge-pdf-without-uploading',
  'pdf-tools-no-watermark',
  'edit-pdf-for-resume',
  'is-it-safe-to-merge-pdf-online',
];

const OG_LOCALES = {
  en: 'en_US',
  es: 'es_ES',
  pt: 'pt_BR',
  de: 'de_DE',
  fr: 'fr_FR',
  hu: 'hu_HU',
  it: 'it_IT',
  ro: 'ro_RO',
  ru: 'ru_RU',
};

function getLanguagesMap(slug) {
  const map = {};
  for (const loc of LOCALES) {
    map[loc] = loc === 'en' ? `\${SITE_URL}/${slug}` : `\${SITE_URL}/${loc}/${slug}`;
  }
  map['x-default'] = `\${SITE_URL}/${slug}`;
  return map;
}

for (const slug of SEARCH_INTENT_SLUGS) {
  for (const locale of LOCALES) {
    const isEn = locale === 'en';
    const routeDir = isEn
      ? path.join(__dirname, '..', 'src', 'app', '(en)', slug)
      : path.join(__dirname, '..', 'src', 'app', locale, slug);

    fs.mkdirSync(routeDir, { recursive: true });

    const relativeComponents = '../../../components';
    const relativeLib = '../../../lib';
    const relativeData = '../../_data/search-intent-data';

    const langMap = getLanguagesMap(slug);
    const langEntriesStr = Object.entries(langMap)
      .map(([k, v]) => `      '${k}': \`${v}\`,`)
      .join('\n');

    const canonicalPath = isEn ? `/${slug}` : `/${locale}/${slug}`;

    const content = `import type { Metadata } from 'next';
import { SearchIntentPageContent } from '${relativeComponents}/search-intent/SearchIntentPageContent';
import { METADATA_BASE } from '${relativeLib}/metadata-shared';
import { SITE_URL } from '${relativeLib}/site';
import { SEARCH_INTENT_DATA } from '${relativeData}';

const SLUG = '${slug}' as const;
const LOCALE = '${locale}' as const;

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: SEARCH_INTENT_DATA[SLUG][LOCALE]?.title || SEARCH_INTENT_DATA[SLUG]['en'].title,
  description: SEARCH_INTENT_DATA[SLUG][LOCALE]?.description || SEARCH_INTENT_DATA[SLUG]['en'].description,
  alternates: {
    canonical: \`\${SITE_URL}${canonicalPath}\`,
    languages: {
${langEntriesStr}
    },
  },
  openGraph: {
    siteName: 'ihatelovepdf',
    title: SEARCH_INTENT_DATA[SLUG][LOCALE]?.title || SEARCH_INTENT_DATA[SLUG]['en'].title,
    description: SEARCH_INTENT_DATA[SLUG][LOCALE]?.description || SEARCH_INTENT_DATA[SLUG]['en'].description,
    url: \`\${SITE_URL}${canonicalPath}\`,
    type: 'website',
    locale: '${OG_LOCALES[locale]}',
    images: [{ url: \`\${SITE_URL}/og-images/og-image-${locale}.png\`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SEARCH_INTENT_DATA[SLUG][LOCALE]?.title || SEARCH_INTENT_DATA[SLUG]['en'].title,
    description: SEARCH_INTENT_DATA[SLUG][LOCALE]?.description || SEARCH_INTENT_DATA[SLUG]['en'].description,
    creator: '@YesShrey',
    site: '@YesShrey',
    images: [\`\${SITE_URL}/og-images/og-image-${locale}.png\`],
  },
};

export default function Page() {
  return <SearchIntentPageContent slug={SLUG} locale={LOCALE} />;
}
`;

    const filePath = path.join(routeDir, 'page.tsx');
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`[OK] Created ${filePath}`);
  }
}
