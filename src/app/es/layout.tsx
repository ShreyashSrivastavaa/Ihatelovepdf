import "../../styles/globals.css";
import { Suspense, type ReactNode } from "react";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import NavMenu from "../../components/NavMenu";
import Footer from "../../components/Footer";

import { LocaleProvider } from "../../i18n/LocaleProvider";
import { GoogleAnalyticsScripts } from "../../components/analytics/GoogleAnalyticsScripts";
import { GaPageViewTracker } from "../../components/analytics/GaPageViewTracker";
import { WebVitalsReporter } from "../../components/analytics/WebVitalsReporter";
import CookieBanner from "../../components/CookieBanner";
import { SchemaOrg } from "../../components/SchemaOrg";
import { BreadcrumbSchema } from "../../components/seo/BreadcrumbSchema";

import { METADATA_BASE, SHARED_ICONS, SHARED_OPEN_GRAPH, SHARED_TWITTER, SHARED_AUTHORS, SHARED_CREATOR, SHARED_PUBLISHER } from "../../lib/metadata-shared";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const LOCALE = "es" as const;

export const metadata = {
  metadataBase: METADATA_BASE,
  authors: SHARED_AUTHORS,
  creator: SHARED_CREATOR,
  publisher: SHARED_PUBLISHER,
  title: "ihatelovepdf | Herramientas PDF Privadas y Gratuitas en tu Navegador",
  description:
    "Herramientas PDF gratuitas en tu navegador: unir PDF, comprimir PDF, dividir PDF, extraer páginas, convertir PDF a imágenes o imágenes a PDF. 100% privado.",
  keywords:
    "unir pdf, comprimir pdf, dividir pdf, extraer paginas pdf, convertir pdf, pdf a imagen, imagen a pdf, reordenar pdf, herramienta pdf gratis",
  icons: SHARED_ICONS,
  alternates: {
    canonical: "https://ihatelovepdf.com/",
    languages: {
      'en': 'https://ihatelovepdf.com/en/',
      'en-US': 'https://ihatelovepdf.com/en/',
      'es': 'https://ihatelovepdf.com/',
      'es-ES': 'https://ihatelovepdf.com/',
      'es-MX': 'https://ihatelovepdf.com/',
      'es-CO': 'https://ihatelovepdf.com/',
      'es-AR': 'https://ihatelovepdf.com/',
      'fr': 'https://ihatelovepdf.com/fr/',
      'fr-FR': 'https://ihatelovepdf.com/fr/',
      'pt': 'https://ihatelovepdf.com/pt/',
      'pt-BR': 'https://ihatelovepdf.com/pt/',
      'pt-PT': 'https://ihatelovepdf.com/pt/',
      'de': 'https://ihatelovepdf.com/de/',
      'de-DE': 'https://ihatelovepdf.com/de/',
      'it': 'https://ihatelovepdf.com/it/',
      'it-IT': 'https://ihatelovepdf.com/it/',
      'ro': 'https://ihatelovepdf.com/ro/',
      'ro-RO': 'https://ihatelovepdf.com/ro/',
      'ru': 'https://ihatelovepdf.com/ru/',
      'ru-RU': 'https://ihatelovepdf.com/ru/',
      'hu': 'https://ihatelovepdf.com/hu/',
      'hu-HU': 'https://ihatelovepdf.com/hu/',
      'x-default': 'https://ihatelovepdf.com/',
    },
  },
  openGraph: {
    ...SHARED_OPEN_GRAPH,
    images: [{ url: "https://ihatelovepdf.com/og-images/og-image-es.png", width: 1409, height: 736, alt: "ihatelovepdf - Herramientas PDF privadas y gratuitas" }],
    title: "ihatelovepdf | Herramientas PDF Privadas y Gratuitas en tu Navegador",
    description:
      "Unir, comprimir, dividir y convertir PDFs sin subir archivos. Procesamiento 100% privado en tu navegador.",
    url: "https://ihatelovepdf.com",
    locale: "es_ES",
    type: "website",
  },
  twitter: SHARED_TWITTER,
};

import { ThemeScript } from "../../components/ThemeScript";

export default function EsLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={LOCALE}>
      <head>
        <meta charSet="UTF-8" />
        <ThemeScript />
        <GoogleAnalyticsScripts />
        <SchemaOrg />
        <BreadcrumbSchema />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <LocaleProvider locale={LOCALE}>
          <WebVitalsReporter />
          <Suspense fallback={null}>
            <GaPageViewTracker />
          </Suspense>
          <NavMenu />
          <main>{children}</main>

          <Footer />
          <CookieBanner />
          <Analytics />
          <SpeedInsights />
        </LocaleProvider>
      </body>
    </html>
  );
}
