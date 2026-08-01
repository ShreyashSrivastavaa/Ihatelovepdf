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

const LOCALE = "it" as const;

export const metadata = {
  metadataBase: METADATA_BASE,
  title: "ihatelovepdf - Merge, Compress, Split, and Convert PDFs Online",
  description: "Free online PDF tools to merge, compress, split, extract, and convert PDFs. 100% private, local processing in your browser.",
  icons: SHARED_ICONS,
  alternates: {
    canonical: "https://ihatelovepdf.com/it/",
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
    images: [{ url: "https://ihatelovepdf.com/og-images/og-image-it.png", width: 1409, height: 736, alt: "ihatelovepdf - Elaborazione PDF gratuita e privata" }],
    title: "ihatelovepdf - Strumenti PDF gratuiti e privati nel tuo browser",
    description: "Unisci, comprimi, dividi e converti PDF senza dover caricare i file online. Elaborazione sicura e completamente privata.",
    url: "https://ihatelovepdf.com/it",
    locale: "it_IT",
    type: "website",
  },
  twitter: SHARED_TWITTER,
};

import { ThemeScript } from "../../components/ThemeScript";

export default function ItLayout({ children }: { children: ReactNode }) {
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
        </LocaleProvider>
      </body>
    </html>
  );
}
