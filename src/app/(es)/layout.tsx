import "../../styles/globals.css";
import { Suspense, type ReactNode } from "react";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { DEFAULT_LOCALE } from "../../i18n/config";
import { GoogleAnalyticsScripts } from "../../components/analytics/GoogleAnalyticsScripts";
import { GaPageViewTracker } from "../../components/analytics/GaPageViewTracker";
import { WebVitalsReporter } from "../../components/analytics/WebVitalsReporter";
import CookieBanner from "../../components/CookieBanner";
import NavMenu from "../../components/NavMenu";
import Footer from "../../components/Footer";

import { LocaleProvider } from "../../i18n/LocaleProvider";
import { SchemaOrg } from "../../components/SchemaOrg";
import { BreadcrumbSchema } from "../../components/seo/BreadcrumbSchema";

import { METADATA_BASE, SHARED_ICONS, SHARED_OPEN_GRAPH, SHARED_TWITTER } from "../../lib/metadata-shared";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  metadataBase: METADATA_BASE,
  title: "ihatelovepdf | Merge, Compress, Split and Convert PDFs Online",
  description:
    "Free PDF tools right in your browser: merge PDF, compress PDF, split PDF, extract pages, convert PDF to images or images to PDF. 100% local processing, completely private.",
  keywords:
    "merge pdf, compress pdf, split pdf, extract pages pdf, convert pdf, pdf to image, image to pdf, reorder pdf, free pdf tool, pdf without upload",
  icons: SHARED_ICONS,
  alternates: {
    canonical: "https://ihatelovepdf.com/",
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
    images: [{ url: "https://ihatelovepdf.com/og-images/og-image-en.png", width: 1409, height: 736, alt: "ihatelovepdf - Private and free PDF processing" }],
    title: "ihatelovepdf | Free & Private PDF Tools in Your Browser",
    description:
      "Merge, compress, split, and convert PDFs without uploading files. Instant results with 100% local, private processing.",
    url: "https://ihatelovepdf.com",
    locale: "en_US",
    type: "website",
  },
  twitter: SHARED_TWITTER,
  verification: {
    google: "m8KoSeRzU9slpYn6QHT5ZBRMnb_wkcU00sdc_B-ZPvg",
  },
};

import { ThemeScript } from "../../components/ThemeScript";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ThemeScript />
        <GoogleAnalyticsScripts />
        <SchemaOrg />
        <BreadcrumbSchema />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <LocaleProvider locale={DEFAULT_LOCALE}>
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
