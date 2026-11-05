import type { Metadata } from 'next';
import { PrivacyArchitecturePageContent } from '../../../components/privacy-architecture/PrivacyArchitecturePageContent';
import { METADATA_BASE } from '../../../lib/metadata-shared';
import { SITE_URL } from '../../../lib/site';

const LOCALE = 'ru' as const;

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: "Архитектура безопасности: Как работает модель без загрузки на сервер | ihatelovepdf",
  description: "Технический анализ локальной обработки PDF через WebAssembly и пошаговая инструкция по проверке нулевой сетевой активности в DevTools браузера.",
  alternates: {
    canonical: `${SITE_URL}/ru/privacy-architecture`,
    languages: {
      'en': `${SITE_URL}/privacy-architecture`,
      'de': `${SITE_URL}/de/privacy-architecture`,
      'es': `${SITE_URL}/es/privacy-architecture`,
      'fr': `${SITE_URL}/fr/privacy-architecture`,
      'hu': `${SITE_URL}/hu/privacy-architecture`,
      'it': `${SITE_URL}/it/privacy-architecture`,
      'pt': `${SITE_URL}/pt/privacy-architecture`,
      'ro': `${SITE_URL}/ro/privacy-architecture`,
      'ru': `${SITE_URL}/ru/privacy-architecture`,
      'x-default': `${SITE_URL}/privacy-architecture`,
    },
  },
  openGraph: {
    siteName: 'ihatelovepdf',
    title: "Архитектура безопасности: Как работает модель без загрузки на сервер | ihatelovepdf",
    description: "Технический анализ локальной обработки PDF через WebAssembly и пошаговая инструкция по проверке нулевой сетевой активности в DevTools браузера.",
    url: `${SITE_URL}/ru/privacy-architecture`,
    type: 'website',
    locale: 'ru_RU',
    images: [{ url: `${SITE_URL}/og-images/og-image-ru.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Архитектура безопасности: Как работает модель без загрузки на сервер | ihatelovepdf",
    description: "Технический анализ локальной обработки PDF через WebAssembly и пошаговая инструкция по проверке нулевой сетевой активности в DevTools браузера.",
    creator: '@YesShrey',
    site: '@YesShrey',
    images: [`${SITE_URL}/og-images/og-image-ru.png`],
  },
};

export default function Page() {
  return <PrivacyArchitecturePageContent locale={LOCALE} />;
}
