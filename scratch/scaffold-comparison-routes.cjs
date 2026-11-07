const fs = require('fs');
const path = require('path');

const LOCALES = ['en', 'de', 'es', 'fr', 'hu', 'it', 'pt', 'ro', 'ru'];
const PAGE_TYPES = ['adobe-acrobat', 'ihatepdf'];

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

function getLanguagesMap(pageSlug) {
  const map = {};
  for (const loc of LOCALES) {
    map[loc] = loc === 'en' ? `\${SITE_URL}/${pageSlug}` : `\${SITE_URL}/${loc}/${pageSlug}`;
  }
  map['x-default'] = `\${SITE_URL}/${pageSlug}`;
  return map;
}

for (const pageType of PAGE_TYPES) {
  const pageSlug = `${pageType}-alternative`;

  for (const locale of LOCALES) {
    const isEn = locale === 'en';
    const routeDir = isEn
      ? path.join(__dirname, '..', 'src', 'app', '(en)', pageSlug)
      : path.join(__dirname, '..', 'src', 'app', locale, pageSlug);

    fs.mkdirSync(routeDir, { recursive: true });

    const relativeComponents = isEn ? '../../../components' : '../../../components';
    const relativeLib = isEn ? '../../../lib' : '../../../lib';
    const relativeData = isEn ? '../../_data/comparisons-data' : '../../_data/comparisons-data';

    const langMap = getLanguagesMap(pageSlug);
    const langEntriesStr = Object.entries(langMap)
      .map(([k, v]) => `      '${k}': \`${v}\`,`)
      .join('\n');

    const canonicalPath = isEn ? `/${pageSlug}` : `/${locale}/${pageSlug}`;

    const content = `import type { Metadata } from 'next';
import { ComparisonPageContent } from '${relativeComponents}/comparison/ComparisonPageContent';
import { METADATA_BASE } from '${relativeLib}/metadata-shared';
import { SITE_URL } from '${relativeLib}/site';
import { COMPARISONS_DATA } from '${relativeData}';

const PAGE_TYPE = '${pageType}' as const;
const LOCALE = '${locale}' as const;

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: COMPARISONS_DATA[PAGE_TYPE][LOCALE]?.title || COMPARISONS_DATA[PAGE_TYPE]['en'].title,
  description: COMPARISONS_DATA[PAGE_TYPE][LOCALE]?.description || COMPARISONS_DATA[PAGE_TYPE]['en'].description,
  alternates: {
    canonical: \`\${SITE_URL}${canonicalPath}\`,
    languages: {
${langEntriesStr}
    },
  },
  openGraph: {
    siteName: 'ihatelovepdf',
    title: COMPARISONS_DATA[PAGE_TYPE][LOCALE]?.title || COMPARISONS_DATA[PAGE_TYPE]['en'].title,
    description: COMPARISONS_DATA[PAGE_TYPE][LOCALE]?.description || COMPARISONS_DATA[PAGE_TYPE]['en'].description,
    url: \`\${SITE_URL}${canonicalPath}\`,
    type: 'website',
    locale: '${OG_LOCALES[locale]}',
    images: [{ url: \`\${SITE_URL}/og-images/og-image-${locale}.png\`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: COMPARISONS_DATA[PAGE_TYPE][LOCALE]?.title || COMPARISONS_DATA[PAGE_TYPE]['en'].title,
    description: COMPARISONS_DATA[PAGE_TYPE][LOCALE]?.description || COMPARISONS_DATA[PAGE_TYPE]['en'].description,
    creator: '@YesShrey',
    site: '@YesShrey',
    images: [\`\${SITE_URL}/og-images/og-image-${locale}.png\`],
  },
};

export default function Page() {
  return <ComparisonPageContent pageType={PAGE_TYPE} locale={LOCALE} />;
}
`;

    const filePath = path.join(routeDir, 'page.tsx');
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`[OK] Created ${filePath}`);
  }
}
