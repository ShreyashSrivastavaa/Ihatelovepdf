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
  title: "PDFhelp | Merge, Compress, Split and Convert PDFs Online",
  description:
    "Free PDF tools right in your browser: merge PDF, compress PDF, split PDF, extract pages, convert PDF to images or images to PDF. 100% local processing, completely private.",
  keywords:
    "merge pdf, compress pdf, split pdf, extract pages pdf, convert pdf, pdf to image, image to pdf, reorder pdf, free pdf tool, pdf without upload",
  icons: SHARED_ICONS,
  alternates: {
    canonical: "https://pdfhelp.com/",
    languages: {
      'en': 'https://pdfhelp.com/',
      'en-US': 'https://pdfhelp.com/',
      'es': 'https://pdfhelp.com/es/',
      'es-ES': 'https://pdfhelp.com/es/',
      'es-MX': 'https://pdfhelp.com/es/',
      'es-CO': 'https://pdfhelp.com/es/',
      'es-AR': 'https://pdfhelp.com/es/',
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
    images: [{ url: "https://pdfhelp.com/og-images/og-image-en.png", width: 1409, height: 736, alt: "PDFhelp - Private and free PDF processing" }],
    title: "PDFhelp | Free & Private PDF Tools in Your Browser",
    description:
      "Merge, compress, split, and convert PDFs without uploading files. Instant results with 100% local, private processing.",
    url: "https://pdfhelp.com",
    locale: "en_US",
    type: "website",
  },
  twitter: SHARED_TWITTER,
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
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
