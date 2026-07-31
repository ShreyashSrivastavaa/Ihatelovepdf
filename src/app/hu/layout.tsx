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

const LOCALE = "hu" as const;

export const metadata = {
  metadataBase: METADATA_BASE,
  title: "ihatelovepdf - PDF tÃ¶mÃ¶rÃ­tÃ©se, egyesÃ­tÃ©se, felosztÃ¡sa Ã©s konvertÃ¡lÃ¡sa",
  description: "Ingyenes online PDF-eszkÃ¶zÃ¶k: tÃ¶mÃ¶rÃ­tÃ©s, egyesÃ­tÃ©s, felosztÃ¡s, kinyerÃ©s Ã©s konvertÃ¡lÃ¡s. 100% privÃ¡t, helyi feldolgozÃ¡s a bÃ¶ngÃ©szÅ‘dben.",
  icons: SHARED_ICONS,
  alternates: {
    canonical: "https://ihatelovepdf.com/hu/",
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
    images: [{ url: "https://ihatelovepdf.com/og-images/og-image-hu.png", width: 1409, height: 736, alt: "ihatelovepdf - PrivÃ¡t Ã©s ingyenes PDF-feldolgozÃ¡s" }],
    title: "ihatelovepdf - Ingyenes Ã©s privÃ¡t PDF-eszkÃ¶zÃ¶k a bÃ¶ngÃ©szÅ‘dben",
    description: "EgyesÃ­tsd, tÃ¶mÃ¶rÃ­tsd, oszd fel Ã©s konvertÃ¡ld a PDF-eket szerverre feltÃ¶ltÃ©s nÃ©lkÃ¼l. BiztonsÃ¡gos Ã©s 100% privÃ¡t.",
    url: "https://ihatelovepdf.com/hu/",
    locale: "hu_HU",
    type: "website",
  },
  twitter: SHARED_TWITTER,
};

import { ThemeScript } from "../../components/ThemeScript";

export default function HuLayout({ children }: { children: ReactNode }) {
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
