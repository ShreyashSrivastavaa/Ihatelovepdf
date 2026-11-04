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

import { METADATA_BASE, SHARED_ICONS, SHARED_OPEN_GRAPH, SHARED_TWITTER } from "../../lib/metadata-shared";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const LOCALE = "hu" as const;

export const metadata = {
  metadataBase: METADATA_BASE,
  title: "ihatelovepdf - PDF tömörítése, egyesítése, felosztása és konvertálása",
  description: "Ingyenes online PDF-eszközök: tömörítés, egyesítés, felosztás, kinyerés és konvertálás. 100% privát, helyi feldolgozás a böngésződben.",
  icons: SHARED_ICONS,
  alternates: {
    canonical: "https://www.ihatelovepdf.com/hu",
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
    ...SHARED_OPEN_GRAPH,
    images: [{ url: "https://www.ihatelovepdf.com/og-images/og-image-hu.png", width: 1409, height: 736, alt: "ihatelovepdf - Privát és ingyenes PDF-feldolgozás" }],
    title: "ihatelovepdf - Ingyenes és privát PDF-eszközök a böngésződben",
    description: "Egyesítsd, tömörítsd, oszd fel és konvertáld a PDF-eket szerverre feltöltés nélkül. Biztonságos és 100% privát.",
    url: "https://www.ihatelovepdf.com/hu",
    locale: "hu_HU",
    type: "website",
  },
  twitter: SHARED_TWITTER,
};

import { ThemeScript } from "../../components/ThemeScript";
import { BreadcrumbSchema } from "../../components/seo/BreadcrumbSchema";

export default function HuLayout({ children }: { children: ReactNode }) {
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
