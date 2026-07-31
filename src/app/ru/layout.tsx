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

const LOCALE = "ru" as const;

export const metadata = {
  metadataBase: METADATA_BASE,
  title: "ihatelovepdf - Ð¡Ð¶Ð°Ñ‚ÑŒ, Ð¾Ð±ÑŠÐµÐ´Ð¸Ð½Ð¸Ñ‚ÑŒ, Ñ€Ð°Ð·Ð´ÐµÐ»Ð¸Ñ‚ÑŒ Ð¸ ÐºÐ¾Ð½Ð²ÐµÑ€Ñ‚Ð¸Ñ€Ð¾Ð²Ð°Ñ‚ÑŒ PDF",
  description: "Ð‘ÐµÑÐ¿Ð»Ð°Ñ‚Ð½Ñ‹Ðµ Ð¾Ð½Ð»Ð°Ð¹Ð½-Ð¸Ð½ÑÑ‚Ñ€ÑƒÐ¼ÐµÐ½Ñ‚Ñ‹ Ð´Ð»Ñ PDF: ÑÐ¶Ð°Ñ‚Ð¸Ðµ, Ð¾Ð±ÑŠÐµÐ´Ð¸Ð½ÐµÐ½Ð¸Ðµ, Ñ€Ð°Ð·Ð´ÐµÐ»ÐµÐ½Ð¸Ðµ, Ð¸Ð·Ð²Ð»ÐµÑ‡ÐµÐ½Ð¸Ðµ Ð¸ ÐºÐ¾Ð½Ð²ÐµÑ€Ñ‚Ð°Ñ†Ð¸Ñ. 100% ÐºÐ¾Ð½Ñ„Ð¸Ð´ÐµÐ½Ñ†Ð¸Ð°Ð»ÑŒÐ½Ð¾, Ð»Ð¾ÐºÐ°Ð»ÑŒÐ½Ð°Ñ Ð¾Ð±Ñ€Ð°Ð±Ð¾Ñ‚ÐºÐ° Ð² Ð±Ñ€Ð°ÑƒÐ·ÐµÑ€Ðµ.",
  icons: SHARED_ICONS,
  alternates: {
    canonical: "https://ihatelovepdf.com/ru/",
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
    images: [{ url: "https://ihatelovepdf.com/og-images/og-image-ru.png", width: 1409, height: 736, alt: "ihatelovepdf - ÐšÐ¾Ð½Ñ„Ð¸Ð´ÐµÐ½Ñ†Ð¸Ð°Ð»ÑŒÐ½Ð°Ñ Ð¸ Ð±ÐµÑÐ¿Ð»Ð°Ñ‚Ð½Ð°Ñ Ð¾Ð±Ñ€Ð°Ð±Ð¾Ñ‚ÐºÐ° PDF" }],
    title: "ihatelovepdf - Ð‘ÐµÑÐ¿Ð»Ð°Ñ‚Ð½Ñ‹Ðµ Ð¸ ÐºÐ¾Ð½Ñ„Ð¸Ð´ÐµÐ½Ñ†Ð¸Ð°Ð»ÑŒÐ½Ñ‹Ðµ Ð¸Ð½ÑÑ‚Ñ€ÑƒÐ¼ÐµÐ½Ñ‚Ñ‹ Ð´Ð»Ñ PDF Ð² Ð±Ñ€Ð°ÑƒÐ·ÐµÑ€Ðµ",
    description: "ÐžÐ±ÑŠÐµÐ´Ð¸Ð½ÑÐ¹Ñ‚Ðµ, ÑÐ¶Ð¸Ð¼Ð°Ð¹Ñ‚Ðµ, Ð´ÐµÐ»Ð¸Ñ‚Ðµ Ð¸ ÐºÐ¾Ð½Ð²ÐµÑ€Ñ‚Ð¸Ñ€ÑƒÐ¹Ñ‚Ðµ PDF Ð±ÐµÐ· Ð·Ð°Ð³Ñ€ÑƒÐ·ÐºÐ¸ Ð½Ð° ÑÐµÑ€Ð²ÐµÑ€. Ð‘ÐµÐ·Ð¾Ð¿Ð°ÑÐ½Ð¾ Ð¸ 100% ÐºÐ¾Ð½Ñ„Ð¸Ð´ÐµÐ½Ñ†Ð¸Ð°Ð»ÑŒÐ½Ð¾.",
    url: "https://ihatelovepdf.com/ru/",
    locale: "ru_RU",
    type: "website",
  },
  twitter: SHARED_TWITTER,
};

import { ThemeScript } from "../../components/ThemeScript";

export default function RuLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={LOCALE}>
      <head>
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
        </LocaleProvider>
      </body>
    </html>
  );
}
