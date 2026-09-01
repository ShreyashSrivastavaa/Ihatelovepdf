import "../../styles/globals.css";
import { Suspense, type ReactNode } from "react";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import NavMenu from "../../components/NavMenu";
import Footer from "../../components/Footer";

import { LocaleProvider } from "../../i18n/LocaleProvider";
import { GoogleAnalyticsScripts } from "../../components/analytics/GoogleAnalyticsScripts";
import { PagePulseScript } from "../../components/analytics/PagePulseScript";
import { GaPageViewTracker } from "../../components/analytics/GaPageViewTracker";
import { WebVitalsReporter } from "../../components/analytics/WebVitalsReporter";
import CookieBanner from "../../components/CookieBanner";
import { SchemaOrg } from "../../components/SchemaOrg";
import { BreadcrumbSchema } from "../../components/seo/BreadcrumbSchema";

import { METADATA_BASE, SHARED_ICONS, SHARED_OPEN_GRAPH, SHARED_TWITTER } from "../../lib/metadata-shared";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const LOCALE = "pt" as const;

export const metadata = {
  metadataBase: METADATA_BASE,
  title: "ihatelovepdf - Juntar, Comprimir, Dividir e Converter PDFs Online",
  description: "Ferramentas de PDF online gratuitas para juntar, comprimir, dividir, extrair e converter PDFs. 100% privado, processamento local no seu navegador.",
  icons: SHARED_ICONS,
  alternates: {
    canonical: "https://ihatelovepdf.com/pt/",
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
    images: [{ url: "https://ihatelovepdf.com/og-images/og-image-pt.png", width: 1409, height: 736, alt: "ihatelovepdf - Processamento de PDFs privado e gratuito" }],
    title: "ihatelovepdf - Ferramentas de PDF gratuitas e privadas no seu navegador",
    description: "Combine, comprima, divida e converta PDFs sem carregar arquivos. Processamento seguro e 100% privado.",
    url: "https://ihatelovepdf.com/pt",
    locale: "pt_BR",
    type: "website",
  },
  twitter: SHARED_TWITTER,
};

import { ThemeScript } from "../../components/ThemeScript";

export default function PtLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={LOCALE} suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <ThemeScript />
        <SchemaOrg />
        <BreadcrumbSchema />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <GoogleAnalyticsScripts />
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
        <PagePulseScript />
      </body>
    </html>
  );
}
