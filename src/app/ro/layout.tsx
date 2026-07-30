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

import { METADATA_BASE, SHARED_ICONS, SHARED_OPEN_GRAPH, SHARED_TWITTER } from "../../lib/metadata-shared";
import { Analytics } from "@vercel/analytics/next";

const LOCALE = "ro" as const;

export const metadata = {
  metadataBase: METADATA_BASE,
  title: "PDFhelp - Unește, Comprimă, Divide și Convertește PDF-uri",
  description: "Instrumente PDF gratuite, online, pentru a uni, comprima, divide, extrage și converti. 100% privat, procesare locală în browserul tău.",
  icons: SHARED_ICONS,
  alternates: {
    canonical: "https://pdfhelp.com/ro/",
    languages: {
      'es-ES': 'https://pdfhelp.com/',
      'es-MX': 'https://pdfhelp.com/',
      'es-CO': 'https://pdfhelp.com/',
      'es-AR': 'https://pdfhelp.com/',
      'es': 'https://pdfhelp.com/',
      'en': 'https://pdfhelp.com/en/',
      'en-US': 'https://pdfhelp.com/en/',
      'fr': 'https://pdfhelp.com/fr/',
      'fr-FR': 'https://pdfhelp.com/fr/',
      'pt': 'https://pdfhelp.com/pt/',
      'pt-BR': 'https://pdfhelp.com/pt/',
      'pt-PT': 'https://pdfhelp.com/pt/',
      'de': 'https://pdfhelp.com/de/',
      'de-DE': 'https://pdfhelp.com/de/',
      'it': 'https://pdfhelp.com/it/',
      'it-IT': 'https://pdfhelp.com/it/',
      'ro': 'https://pdfhelp.com/ro/',
      'ro-RO': 'https://pdfhelp.com/ro/',
      'ru': 'https://pdfhelp.com/ru/',
      'ru-RU': 'https://pdfhelp.com/ru/',
      'hu': 'https://pdfhelp.com/hu/',
      'hu-HU': 'https://pdfhelp.com/hu/',
      'x-default': 'https://pdfhelp.com/',
    },
  },
  openGraph: {
    ...SHARED_OPEN_GRAPH,
    images: [{ url: "https://pdfhelp.com/og-images/og-image-ro.png", width: 1409, height: 736, alt: "PDFhelp - Procesare PDF privată și gratuită" }],
    title: "PDFhelp - Instrumente PDF gratuite și private în browserul tău",
    description: "Unește, comprimă, divide și convertește PDF-uri fără a încărca fișierele pe server. Securizat și 100% privat.",
    url: "https://pdfhelp.com/ro/",
    locale: "ro_RO",
    type: "website",
  },
  twitter: SHARED_TWITTER,
};

export default function RoLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={LOCALE}>
      <head>
        <GoogleAnalyticsScripts />
        <SchemaOrg />
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
        </LocaleProvider>
      </body>
    </html>
  );
}
