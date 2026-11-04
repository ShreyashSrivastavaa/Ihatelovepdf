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

import { METADATA_BASE, SHARED_ICONS, BRAND_NAME, getAlternateOgLocales } from "../../lib/metadata-shared";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const LOCALE = "de" as const;

export const metadata = {
  metadataBase: METADATA_BASE,
  title: "ihatelovepdf | PDFs zusammenführen, komprimieren, teilen und konvertieren",
  description: "Kostenlose Online-PDF-Tools zum Zusammenführen, Komprimieren, Teilen, Extrahieren und Konvertieren von PDFs. 100% privat, lokale Verarbeitung in Ihrem Browser.",
  icons: SHARED_ICONS,
  alternates: {
    canonical: "https://www.ihatelovepdf.com/de",
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
    images: [{ url: "https://www.ihatelovepdf.com/og-images/og-image-de.png", width: 1200, height: 630, alt: "ihatelovepdf | PDFs zusammenführen, komprimieren, teilen und konvertieren" }],
    title: "ihatelovepdf | PDFs zusammenführen, komprimieren, teilen und konvertieren",
    description: "Kostenlose Online-PDF-Tools zum Zusammenführen, Komprimieren, Teilen, Extrahieren und Konvertieren von PDFs. 100% privat, lokale Verarbeitung in Ihrem Browser.",
    url: "https://www.ihatelovepdf.com/de",
    locale: "de_DE",
    alternateLocale: getAlternateOgLocales("de"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ihatelovepdf | PDFs zusammenführen, komprimieren, teilen und konvertieren",
    description: "Kostenlose Online-PDF-Tools zum Zusammenführen, Komprimieren, Teilen, Extrahieren und Konvertieren von PDFs. 100% privat, lokale Verarbeitung in Ihrem Browser.",
    creator: "@YesShrey",
    site: "@YesShrey",
    images: ["https://www.ihatelovepdf.com/og-images/og-image-de.png"],
  },
};

import { ThemeScript } from "../../components/ThemeScript";

export default function DeLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={LOCALE} suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="websitelaunches-verification" content="714e3c091b00f4a86f93e6be17c060fc" />
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
