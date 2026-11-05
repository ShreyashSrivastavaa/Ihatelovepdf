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

const LOCALE = "ru" as const;

export const metadata = {
  metadataBase: METADATA_BASE,
  title: "ihatelovepdf | Сжать, объединить, разделить и конвертировать PDF",
  description: "Бесплатные онлайн-инструменты для PDF: сжатие, объединение, разделение, извлечение и конвертация. 100% конфиденциально, локальная обработка в браузере.",
  icons: SHARED_ICONS,
  alternates: {
    canonical: "https://www.ihatelovepdf.com/ru",
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
    images: [{ url: "https://www.ihatelovepdf.com/og-images/og-image-ru.png", width: 1200, height: 630, alt: "ihatelovepdf | Сжать, объединить, разделить и конвертировать PDF" }],
    title: "ihatelovepdf | Сжать, объединить, разделить и конвертировать PDF",
    description: "Бесплатные онлайн-инструменты для PDF: сжатие, объединение, разделение, извлечение и конвертация. 100% конфиденциально, локальная обработка в браузере.",
    url: "https://www.ihatelovepdf.com/ru",
    locale: "ru_RU",
    alternateLocale: getAlternateOgLocales("ru"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ihatelovepdf | Сжать, объединить, разделить и конвертировать PDF",
    description: "Бесплатные онлайн-инструменты для PDF: сжатие, объединение, разделение, извлечение и конвертация. 100% конфиденциально, локальная обработка в браузере.",
    creator: "@YesShrey",
    site: "@YesShrey",
    images: ["https://www.ihatelovepdf.com/og-images/og-image-ru.png"],
  },
};

import { ThemeScript } from "../../components/ThemeScript";

export default function RuLayout({ children }: { children: ReactNode }) {
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
