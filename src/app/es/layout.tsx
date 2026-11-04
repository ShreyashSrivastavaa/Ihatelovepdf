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

import { METADATA_BASE, SHARED_ICONS, SHARED_AUTHORS, SHARED_CREATOR, SHARED_PUBLISHER, BRAND_NAME, getAlternateOgLocales } from "../../lib/metadata-shared";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeScript } from "../../components/ThemeScript";

const LOCALE = "es" as const;

export const metadata = {
  metadataBase: METADATA_BASE,
  authors: SHARED_AUTHORS,
  creator: SHARED_CREATOR,
  publisher: SHARED_PUBLISHER,
  title: "ihatelovepdf | Herramientas PDF Privadas y Gratuitas en tu Navegador",
  description:
    "Herramientas PDF gratuitas en tu navegador: unir PDF, comprimir PDF, dividir PDF, extraer páginas, convertir PDF a imágenes o imágenes a PDF. 100% privado.",
  icons: SHARED_ICONS,
  alternates: {
    canonical: "https://www.ihatelovepdf.com/es",
    languages: {
      "x-default": "https://www.ihatelovepdf.com",
      en: "https://www.ihatelovepdf.com",
      es: "https://www.ihatelovepdf.com/es",
      de: "https://www.ihatelovepdf.com/de",
      fr: "https://www.ihatelovepdf.com/fr",
      it: "https://www.ihatelovepdf.com/it",
      pt: "https://www.ihatelovepdf.com/pt",
      ru: "https://www.ihatelovepdf.com/ru",
      ro: "https://www.ihatelovepdf.com/ro",
      hu: "https://www.ihatelovepdf.com/hu",
    },
  },
  openGraph: {
    siteName: BRAND_NAME,
    images: [{ url: "https://www.ihatelovepdf.com/og-images/og-image-es.png", width: 1200, height: 630, alt: "ihatelovepdf | Herramientas PDF Privadas y Gratuitas en tu Navegador" }],
    title: "ihatelovepdf | Herramientas PDF Privadas y Gratuitas en tu Navegador",
    description:
      "Unir, comprimir, dividir y convertir PDFs sin subir archivos. Procesamiento 100% privado en tu navegador.",
    url: "https://www.ihatelovepdf.com/es",
    locale: "es_ES",
    alternateLocale: getAlternateOgLocales("es"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ihatelovepdf | Herramientas PDF Privadas y Gratuitas en tu Navegador",
    description:
      "Unir, comprimir, dividir y convertir PDFs sin subir archivos. Procesamiento 100% privado en tu navegador.",
    creator: "@YesShrey",
    site: "@YesShrey",
    images: ["https://www.ihatelovepdf.com/og-images/og-image-es.png"],
  },
};

export default function EsLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={LOCALE} suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="websitelaunches-verification" content="714e3c091b00f4a86f93e6be17c060fc" />
        <meta name="directree-verify" content="directree-verify=dfce967396d09deb8ea0daa79821f507" />
        <ThemeScript />
        <SchemaOrg />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <GoogleAnalyticsScripts />
        <LocaleProvider locale={LOCALE}>
          <WebVitalsReporter />
          <Suspense fallback={null}>
            <GaPageViewTracker />
          </Suspense>
          <a
            href="#main-content"
            className="sr-only z-[100] rounded-md bg-[var(--color-primary)] px-4 py-2 text-[var(--color-main)] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:shadow-md font-medium text-sm border border-[var(--color-border)]"
          >
            Skip to main content
          </a>
          <NavMenu />
          <main id="main-content" tabIndex={-1} className="outline-none flex-grow">
            {children}
          </main>

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
