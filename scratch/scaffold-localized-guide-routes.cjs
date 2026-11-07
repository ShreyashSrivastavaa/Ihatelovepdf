// scratch/scaffold-localized-guide-routes.cjs
const fs = require('fs');
const path = require('path');

const LOCALES_CONFIG = {
  es: {
    ogLocale: 'es_ES',
    indexTitle: 'Guías y Tutoriales Paso a Paso de PDF | ihatelovepdf',
    indexDesc: 'Tutoriales paso a paso para unir, comprimir, dividir, editar y convertir archivos PDF en tu navegador sin subir archivos.',
  },
  pt: {
    ogLocale: 'pt_BR',
    indexTitle: 'Guias e Tutoriais Completos de PDF | ihatelovepdf',
    indexDesc: 'Aprenda a juntar, comprimir, dividir, assinar e converter arquivos PDF diretamente no seu navegador com total privacidade.',
  },
  de: {
    ogLocale: 'de_DE',
    indexTitle: 'PDF Anleitungen & Schritt-für-Schritt Tutorials | ihatelovepdf',
    indexDesc: 'Schritt-für-Schritt-Anleitungen zum Zusammenfügen, Verkleinern, Teilen, Unterschreiben und Umwandeln von PDFs direkt im Browser.',
  },
  fr: {
    ogLocale: 'fr_FR',
    indexTitle: 'Guides Pratiques et Tutoriels PDF | ihatelovepdf',
    indexDesc: 'Tutoriels pas à pas pour fusionner, compresser, diviser, signer et convertir vos PDF directement dans votre navigateur sans téléversement.',
  },
  it: {
    ogLocale: 'it_IT',
    indexTitle: 'Guide e Tutorial Passo dopo Passo per PDF | ihatelovepdf',
    indexDesc: 'Guide pratiche per unire, comprimere, dividere, firmare e convertire file PDF direttamente nel tuo browser senza caricare file.',
  },
  ro: {
    ogLocale: 'ro_RO',
    indexTitle: 'Ghiduri Practice și Tutoriale PDF Pas cu Pas | ihatelovepdf',
    indexDesc: 'Tutoriale detaliate despre cum să unești, comprimi, împarți, semnezi și convertești fișiere PDF direct în browser fără server.',
  },
  ru: {
    ogLocale: 'ru_RU',
    indexTitle: 'Пошаговые руководства и инструкции по PDF | ihatelovepdf',
    indexDesc: 'Практические инструкции по объединению, сжатию, разделению, подписанию и конвертации PDF прямо в браузере без отправки на сервер.',
  },
  hu: {
    ogLocale: 'hu_HU',
    indexTitle: 'Gyakorlati PDF útmutatók és leírások lépésről lépésre | ihatelovepdf',
    indexDesc: 'Lépésről lépésre útmutatók PDF fájlok egyesítéséhez, tömörítéséhez, szétbontásához, aláírásához és konvertálásához feltöltés nélkül.',
  },
};

for (const [loc, config] of Object.entries(LOCALES_CONFIG)) {
  const guideDir = path.resolve(__dirname, `../src/app/${loc}/guides`);
  const guideSlugDir = path.join(guideDir, '[slug]');

  fs.mkdirSync(guideSlugDir, { recursive: true });

  // 1. Index Page
  const indexPath = path.join(guideDir, 'page.tsx');
  const indexContent = `import type { Metadata } from 'next';
import { GuidesIndexPageContent } from '../../../components/guides/GuidesIndexPageContent';
import { METADATA_BASE } from '../../../lib/metadata-shared';
import { SITE_URL } from '../../../lib/site';

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: ${JSON.stringify(config.indexTitle)},
  description: ${JSON.stringify(config.indexDesc)},
  alternates: {
    canonical: \`\${SITE_URL}/${loc}/guides\`,
    languages: {
      en: \`\${SITE_URL}/guides\`,
      es: \`\${SITE_URL}/es/guides\`,
      pt: \`\${SITE_URL}/pt/guides\`,
      de: \`\${SITE_URL}/de/guides\`,
      it: \`\${SITE_URL}/it/guides\`,
      fr: \`\${SITE_URL}/fr/guides\`,
      ro: \`\${SITE_URL}/ro/guides\`,
      ru: \`\${SITE_URL}/ru/guides\`,
      hu: \`\${SITE_URL}/hu/guides\`,
      'x-default': \`\${SITE_URL}/guides\`,
    },
  },
  openGraph: {
    siteName: 'ihatelovepdf',
    title: ${JSON.stringify(config.indexTitle)},
    description: ${JSON.stringify(config.indexDesc)},
    url: \`\${SITE_URL}/${loc}/guides\`,
    type: 'website',
    locale: ${JSON.stringify(config.ogLocale)},
    images: [{ url: \`\${SITE_URL}/og-images/og-image-${loc}.png\`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: ${JSON.stringify(config.indexTitle)},
    description: ${JSON.stringify(config.indexDesc)},
    creator: '@YesShrey',
    site: '@YesShrey',
    images: [\`\${SITE_URL}/og-images/og-image-${loc}.png\`],
  },
};

export default function GuidesIndexPage() {
  return <GuidesIndexPageContent locale="${loc}" />;
}
`;
  fs.writeFileSync(indexPath, indexContent, 'utf8');

  // 2. Detail Page
  const detailPath = path.join(guideSlugDir, 'page.tsx');
  const detailContent = `import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  ALL_GUIDE_SLUGS,
  LOCALIZED_GUIDES_DATA,
} from '../../../_data/localized-guides-data';
import { GuideDetailPageContent } from '../../../../components/guides/GuideDetailPageContent';
import { METADATA_BASE } from '../../../../lib/metadata-shared';
import { SITE_URL } from '../../../../lib/site';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return ALL_GUIDE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = LOCALIZED_GUIDES_DATA.${loc}?.[slug];

  if (!guide) {
    return {};
  }

  const canonicalUrl = \`\${SITE_URL}/${loc}/guides/\${guide.slug}\`;

  return {
    metadataBase: METADATA_BASE,
    title: guide.title,
    description: guide.metaDescription,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: \`\${SITE_URL}/guides/\${guide.slug}\`,
        es: \`\${SITE_URL}/es/guides/\${guide.slug}\`,
        pt: \`\${SITE_URL}/pt/guides/\${guide.slug}\`,
        de: \`\${SITE_URL}/de/guides/\${guide.slug}\`,
        it: \`\${SITE_URL}/it/guides/\${guide.slug}\`,
        fr: \`\${SITE_URL}/fr/guides/\${guide.slug}\`,
        ro: \`\${SITE_URL}/ro/guides/\${guide.slug}\`,
        ru: \`\${SITE_URL}/ru/guides/\${guide.slug}\`,
        hu: \`\${SITE_URL}/hu/guides/\${guide.slug}\`,
        'x-default': \`\${SITE_URL}/guides/\${guide.slug}\`,
      },
    },
    openGraph: {
      siteName: 'ihatelovepdf',
      title: guide.title,
      description: guide.metaDescription,
      url: canonicalUrl,
      type: 'article',
      locale: ${JSON.stringify(config.ogLocale)},
      publishedTime: \`\${guide.datePublished}T08:00:00+00:00\`,
      modifiedTime: \`\${guide.dateModified}T12:00:00+00:00\`,
      authors: [guide.author],
      images: [{ url: \`\${SITE_URL}/og-images/og-image-${loc}.png\`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.title,
      description: guide.metaDescription,
      creator: '@YesShrey',
      site: '@YesShrey',
      images: [\`\${SITE_URL}/og-images/og-image-${loc}.png\`],
    },
  };
}

export default async function GuideDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const guide = LOCALIZED_GUIDES_DATA.${loc}?.[slug];

  if (!guide) {
    notFound();
  }

  return <GuideDetailPageContent guide={guide} />;
}
`;
  fs.writeFileSync(detailPath, detailContent, 'utf8');

  console.log(`Generated routes for locale [${loc}]: ${indexPath} & ${detailPath}`);
}

