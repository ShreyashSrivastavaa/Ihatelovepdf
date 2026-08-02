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
import { SpeedInsights } from "@vercel/speed-insights/next";

const LOCALE = "ro" as const;

export const metadata = {
  metadataBase: METADATA_BASE,
  title: "ihatelovepdf - UneÈ™te, ComprimÄƒ, Divide È™i ConverteÈ™te PDF-uri",
  description: "Instrumente PDF gratuite, online, pentru a uni, comprima, divide, extrage È™i converti. 100% privat, procesare localÄƒ în browserul tÄƒu.",
  icons: SHARED_ICONS,
  alternates: {
    canonical: "https://ihatelovepdf.com/ro/",
    languages: {
      'es-ES': 'https://ihatelovepdf.com/',
      'es-MX': 'https://ihatelovepdf.com/',
      'es-CO': 'https://ihatelovepdf.com/',
      'es-AR': 'https://ihatelovepdf.com/',
      'es': 'https://ihatelovepdf.com/',
      'en': 'https://ihatelovepdf.com/en/',
      'en-US': 'https://ihatelovepdf.com/en/',
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
    images: [{ url: "https://ihatelovepdf.com/og-images/og-image-ro.png", width: 1409, height: 736, alt: "ihatelovepdf - Procesare PDF privatÄƒ È™i gratuitÄƒ" }],
    title: "ihatelovepdf - Instrumente PDF gratuite È™i private în browserul tÄƒu",
    description: "UneÈ™te, comprimÄƒ, divide È™i converteÈ™te PDF-uri fÄƒrÄƒ a încÄƒrca fiÈ™ierele pe server. Securizat È™i 100% privat.",
    url: "https://ihatelovepdf.com/ro/",
    locale: "ro_RO",
    type: "website",
  },
  twitter: SHARED_TWITTER,
};

import { ThemeScript } from "../../components/ThemeScript";

export default function RoLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={LOCALE}>
      <head>
        <meta charSet="UTF-8" />
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
          <Analytics />
          <SpeedInsights />
        </LocaleProvider>
      </body>
    </html>
  );
}
