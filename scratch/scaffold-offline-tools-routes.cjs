const fs = require('fs');
const path = require('path');

const data = require('./offline-tools-data.json');
const LOCALES = ['en', 'de', 'es', 'fr', 'hu', 'it', 'pt', 'ro', 'ru'];

LOCALES.forEach(locale => {
  const locData = data[locale];
  const dir = locale === 'en'
    ? path.resolve(__dirname, '../src/app/(en)/offline-pdf-tools')
    : path.resolve(__dirname, `../src/app/${locale}/offline-pdf-tools`);

  fs.mkdirSync(dir, { recursive: true });

  const canonicalPath = locale === 'en' ? '/offline-pdf-tools' : `/${locale}/offline-pdf-tools`;

  const content = `import type { Metadata } from 'next';
import { OfflineToolsPageContent } from '../../../components/offline-tools/OfflineToolsPageContent';
import { METADATA_BASE, SHARED_ICONS } from '../../../lib/metadata-shared';
import { SITE_URL } from '../../../lib/site';

const LOCALE = '${locale}';

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: "${locData.title}",
  description: "${locData.description}",
  alternates: {
    canonical: \`\${SITE_URL}${canonicalPath}\`,
    languages: {
      'en': \`\${SITE_URL}/offline-pdf-tools\`,
      'de': \`\${SITE_URL}/de/offline-pdf-tools\`,
      'es': \`\${SITE_URL}/es/offline-pdf-tools\`,
      'fr': \`\${SITE_URL}/fr/offline-pdf-tools\`,
      'hu': \`\${SITE_URL}/hu/offline-pdf-tools\`,
      'it': \`\${SITE_URL}/it/offline-pdf-tools\`,
      'pt': \`\${SITE_URL}/pt/offline-pdf-tools\`,
      'ro': \`\${SITE_URL}/ro/offline-pdf-tools\`,
      'ru': \`\${SITE_URL}/ru/offline-pdf-tools\`,
      'x-default': \`\${SITE_URL}/offline-pdf-tools\`,
    },
  },
  icons: SHARED_ICONS,
  openGraph: {
    siteName: 'ihatelovepdf',
    title: "${locData.title}",
    description: "${locData.description}",
    url: \`\${SITE_URL}${canonicalPath}\`,
    type: 'website',
    images: [{ url: \`\${SITE_URL}/og-images/og-image-${locale}.png\`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "${locData.title}",
    description: "${locData.description}",
    creator: '@YesShrey',
    site: '@YesShrey',
    images: [\`\${SITE_URL}/og-images/og-image-${locale}.png\`],
  },
};

export default function OfflinePdfToolsPage() {
  return <OfflineToolsPageContent locale={LOCALE} />;
}
`;

  fs.writeFileSync(path.join(dir, 'page.tsx'), content);
  console.log(`Scaffolded: ${dir}/page.tsx`);
});

