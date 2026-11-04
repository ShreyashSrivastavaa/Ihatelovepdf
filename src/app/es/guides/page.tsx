import type { Metadata } from 'next';
import { GuidesIndexPageContent } from '../../../components/guides/GuidesIndexPageContent';
import { METADATA_BASE } from '../../../lib/metadata-shared';
import { SITE_URL } from '../../../lib/site';

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: "Guías y Tutoriales Paso a Paso de PDF | ihatelovepdf",
  description: "Tutoriales paso a paso para unir, comprimir, dividir, editar y convertir archivos PDF en tu navegador sin subir archivos.",
  alternates: {
    canonical: `${SITE_URL}/es/guides`,
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
    title: "Guías y Tutoriales Paso a Paso de PDF | ihatelovepdf",
    description: "Tutoriales paso a paso para unir, comprimir, dividir, editar y convertir archivos PDF en tu navegador sin subir archivos.",
    url: `${SITE_URL}/es/guides`,
    type: 'website',
    locale: "es_ES",
    images: [{ url: `${SITE_URL}/og-images/og-image-es.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Guías y Tutoriales Paso a Paso de PDF | ihatelovepdf",
    description: "Tutoriales paso a paso para unir, comprimir, dividir, editar y convertir archivos PDF en tu navegador sin subir archivos.",
    creator: '@YesShrey',
    site: '@YesShrey',
    images: [`${SITE_URL}/og-images/og-image-es.png`],
  },
};

export default function GuidesIndexPage() {
  return <GuidesIndexPageContent locale="es" />;
}
