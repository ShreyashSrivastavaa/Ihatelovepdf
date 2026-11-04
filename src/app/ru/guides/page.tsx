import type { Metadata } from 'next';
import { GuidesIndexPageContent } from '../../../components/guides/GuidesIndexPageContent';
import { METADATA_BASE } from '../../../lib/metadata-shared';
import { SITE_URL } from '../../../lib/site';

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: "Пошаговые руководства и инструкции по PDF | ihatelovepdf",
  description: "Практические инструкции по объединению, сжатию, разделению, подписанию и конвертации PDF прямо в браузере без отправки на сервер.",
  alternates: {
    canonical: `${SITE_URL}/ru/guides`,
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
    title: "Пошаговые руководства и инструкции по PDF | ihatelovepdf",
    description: "Практические инструкции по объединению, сжатию, разделению, подписанию и конвертации PDF прямо в браузере без отправки на сервер.",
    url: `${SITE_URL}/ru/guides`,
    type: 'website',
    locale: "ru_RU",
    images: [{ url: `${SITE_URL}/og-images/og-image-ru.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Пошаговые руководства и инструкции по PDF | ihatelovepdf",
    description: "Практические инструкции по объединению, сжатию, разделению, подписанию и конвертации PDF прямо в браузере без отправки на сервер.",
    creator: '@YesShrey',
    site: '@YesShrey',
    images: [`${SITE_URL}/og-images/og-image-ru.png`],
  },
};

export default function GuidesIndexPage() {
  return <GuidesIndexPageContent locale="ru" />;
}
