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

const LOCALE = "hu" as const;

export const metadata = {
  metadataBase: METADATA_BASE,
  title: "PDFhelp - PDF tömörítése, egyesítése, felosztása és konvertálása",
  description: "Ingyenes online PDF-eszközök: tömörítés, egyesítés, felosztás, kinyerés és konvertálás. 100% privát, helyi feldolgozás a böngésződben.",
  icons: SHARED_ICONS,
  alternates: {
    canonical: "https://pdfhelp.com/hu/",
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
    images: [{ url: "https://pdfhelp.com/og-images/og-image-hu.png", width: 1409, height: 736, alt: "PDFhelp - Privát és ingyenes PDF-feldolgozás" }],
    title: "PDFhelp - Ingyenes és privát PDF-eszközök a böngésződben",
    description: "Egyesítsd, tömörítsd, oszd fel és konvertáld a PDF-eket szerverre feltöltés nélkül. Biztonságos és 100% privát.",
    url: "https://pdfhelp.com/hu/",
    locale: "hu_HU",
    type: "website",
  },
  twitter: SHARED_TWITTER,
};

import { ThemeScript } from "../../components/ThemeScript";

export default function HuLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={LOCALE}>
      <head>
        <ThemeScript />
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
        </LocaleProvider>
      </body>
    </html>
  );
}
