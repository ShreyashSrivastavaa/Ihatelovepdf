import type { Metadata } from 'next';
import { GuidesIndexPageContent } from '../../../components/guides/GuidesIndexPageContent';
import { METADATA_BASE } from '../../../lib/metadata-shared';
import { SITE_URL } from '../../../lib/site';

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: "Guias e Tutoriais Completos de PDF | ihatelovepdf",
  description: "Aprenda a juntar, comprimir, dividir, assinar e converter arquivos PDF diretamente no seu navegador com total privacidade.",
  alternates: {
    canonical: `${SITE_URL}/pt/guides`,
    languages: {
      en: `${SITE_URL}/guides`,
      es: `${SITE_URL}/es/guides`,
      pt: `${SITE_URL}/pt/guides`,
      de: `${SITE_URL}/de/guides`,
      it: `${SITE_URL}/it/guides`,
      fr: `${SITE_URL}/fr/guides`,
      ro: `${SITE_URL}/ro/guides`,
      ru: `${SITE_URL}/ru/guides`,
      hu: `${SITE_URL}/hu/guides`,
      'x-default': `${SITE_URL}/guides`,
    },
  },
  openGraph: {
    siteName: 'ihatelovepdf',
    title: "Guias e Tutoriais Completos de PDF | ihatelovepdf",
    description: "Aprenda a juntar, comprimir, dividir, assinar e converter arquivos PDF diretamente no seu navegador com total privacidade.",
    url: `${SITE_URL}/pt/guides`,
    type: 'website',
    locale: "pt_BR",
    images: [{ url: `${SITE_URL}/og-images/og-image-pt.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Guias e Tutoriais Completos de PDF | ihatelovepdf",
    description: "Aprenda a juntar, comprimir, dividir, assinar e converter arquivos PDF diretamente no seu navegador com total privacidade.",
    creator: '@YesShrey',
    site: '@YesShrey',
    images: [`${SITE_URL}/og-images/og-image-pt.png`],
  },
};

export default function GuidesIndexPage() {
  return <GuidesIndexPageContent locale="pt" />;
}
