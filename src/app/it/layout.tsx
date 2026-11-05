import "../../styles/globals.css";
import { type ReactNode } from "react";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import NavMenu from "../../components/NavMenu";
import Footer from "../../components/Footer";

import { LocaleProvider } from "../../i18n/LocaleProvider";
import CookieBanner from "../../components/CookieBanner";
import { SchemaOrg } from "../../components/SchemaOrg";

import { METADATA_BASE, SHARED_ICONS, BRAND_NAME, getAlternateOgLocales } from "../../lib/metadata-shared";

const LOCALE = "it" as const;

export const metadata = {
  metadataBase: METADATA_BASE,
  title: "ihatelovepdf | Unisci, Comprimi, Dividi e Converti PDF Online",
  description: "Strumenti PDF online gratuiti per unire, comprimere, dividere, estrarre e convertire PDF. 100% privato, elaborazione locale nel tuo browser.",
  icons: SHARED_ICONS,
  alternates: {
    canonical: "https://www.ihatelovepdf.com/it",
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
    images: [{ url: "https://www.ihatelovepdf.com/og-images/og-image-it.png", width: 1200, height: 630, alt: "ihatelovepdf | Unisci, Comprimi, Dividi e Converti PDF Online" }],
    title: "ihatelovepdf | Unisci, Comprimi, Dividi e Converti PDF Online",
    description: "Strumenti PDF online gratuiti per unire, comprimere, dividere, estrarre e convertire PDF. 100% privato, elaborazione locale nel tuo browser.",
    url: "https://www.ihatelovepdf.com/it",
    locale: "it_IT",
    alternateLocale: getAlternateOgLocales("it"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ihatelovepdf | Unisci, Comprimi, Dividi e Converti PDF Online",
    description: "Strumenti PDF online gratuiti per unire, comprimere, dividere, estrarre e convertire PDF. 100% privato, elaborazione locale nel tuo browser.",
    creator: "@YesShrey",
    site: "@YesShrey",
    images: ["https://www.ihatelovepdf.com/og-images/og-image-it.png"],
  },
};

import { ThemeScript } from "../../components/ThemeScript";

export default function ItLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={LOCALE} suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <ThemeScript />
        <SchemaOrg />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
                <LocaleProvider locale={LOCALE}>
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
                            </LocaleProvider>
              </body>
    </html>
  );
}
