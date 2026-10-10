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
import StickyMobileCta from "../../components/StickyMobileCta";
import { SchemaOrg } from "../../components/SchemaOrg";
import { BreadcrumbSchema } from "../../components/seo/BreadcrumbSchema";

import { PagePulseScript } from "../../components/analytics/PagePulseScript";
import { METADATA_BASE, SHARED_ICONS, SHARED_OPEN_GRAPH, SHARED_TWITTER, SHARED_AUTHORS, SHARED_CREATOR, SHARED_PUBLISHER } from "../../lib/metadata-shared";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeScript } from "../../components/ThemeScript";

const LOCALE = "en" as const;

export const metadata = {
  metadataBase: METADATA_BASE,
  authors: SHARED_AUTHORS,
  creator: SHARED_CREATOR,
  publisher: SHARED_PUBLISHER,
  icons: SHARED_ICONS,
  openGraph: SHARED_OPEN_GRAPH,
  twitter: SHARED_TWITTER,
  robots: {
    index: true,
    follow: true,
  },
  title: {
    default: "I Hate Love PDF: Free and Private PDF Tools in Your Browser",
    template: "%s | I Hate Love PDF",
  },
  description: "Merge, compress, split, extract, edit, redact, and convert PDFs locally in your browser. 100% private, zero server uploads, free forever.",
  keywords: [
    "PDF tools",
    "merge PDF",
    "compress PDF",
    "split PDF",
    "convert PDF",
    "edit PDF",
    "redact PDF",
    "local PDF processing",
    "private PDF tools",
    "free PDF editor",
    "PDF security",
  ],
  alternates: {
    canonical: "https://www.ihatelovepdf.com",
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
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={LOCALE} suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="author" content="Shreyash Srivastava" />
        <meta name="websitelaunches-verification" content="714e3c091b00f4a86f93e6be17c060fc" />
        <meta name="directree-verify" content="directree-verify=dfce967396d09deb8ea0daa79821f507" />
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
          <StickyMobileCta />
          <Analytics />
          <SpeedInsights />
        </LocaleProvider>
        <PagePulseScript />
      </body>
    </html>
  );
}
