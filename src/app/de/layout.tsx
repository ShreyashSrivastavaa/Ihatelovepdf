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

import { METADATA_BASE, SHARED_ICONS, SHARED_OPEN_GRAPH, SHARED_TWITTER } from "../../lib/metadata-shared";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const LOCALE = "de" as const;

export const metadata = {
  metadataBase: METADATA_BASE,
  title: "ihatelovepdf - PDFs zusammenführen, komprimieren, teilen und konvertieren",
  description: "Kostenlose Online-PDF-Tools zum Zusammenführen, Komprimieren, Teilen, Extrahieren und Konvertieren von PDFs. 100% privat, lokale Verarbeitung in Ihrem Browser.",
  icons: SHARED_ICONS,
  alternates: {
    canonical: "https://ihatelovepdf.com/de/",
    languages: {
      'en': 'https://ihatelovepdf.com/',
      'en-US': 'https://ihatelovepdf.com/',
      'es': 'https://ihatelovepdf.com/es/',
      'es-ES': 'https://ihatelovepdf.com/es/',
      'es-MX': 'https://ihatelovepdf.com/es/',
      'es-CO': 'https://ihatelovepdf.com/es/',
      'es-AR': 'https://ihatelovepdf.com/es/',
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
    images: [{ url: "https://ihatelovepdf.com/og-images/og-image-de.png", width: 1409, height: 736, alt: "ihatelovepdf – Private und kostenlose PDF-Bearbeitung" }],
    title: "ihatelovepdf - Kostenlose und private PDF-Tools in Ihrem Browser",
    description: "PDFs zusammenführen, komprimieren, teilen und konvertieren, ohne Dateien hochzuladen. Sichere und 100% private Verarbeitung.",
    url: "https://ihatelovepdf.com/de",
    locale: "de_DE",
    type: "website",
  },
  twitter: SHARED_TWITTER,
};

import { ThemeScript } from "../../components/ThemeScript";

export default function DeLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={LOCALE}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="websitelaunches-verification" content="714e3c091b00f4a86f93e6be17c060fc" />
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
