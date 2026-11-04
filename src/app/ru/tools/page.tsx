import { ToolsPageContent } from "../../../components/ToolsPageContent";
import type { Metadata } from "next";
import { METADATA_BASE } from "../../../lib/metadata-shared";

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: "Все бесплатные инструменты PDF | ihatelovepdf",
  description: "Ознакомьтесь со всеми бесплатными и приватными инструментами PDF. Объединяйте, сжимайте, разделяйте, редактируйте и конвертируйте PDF прямо в браузере без загрузки файлов.",
  alternates: {
    canonical: "https://www.ihatelovepdf.com/ru/tools",
    languages: {
      en: "https://www.ihatelovepdf.com/tools",
      es: "https://www.ihatelovepdf.com/es/tools",
      pt: "https://www.ihatelovepdf.com/pt/tools",
      de: "https://www.ihatelovepdf.com/de/tools",
      it: "https://www.ihatelovepdf.com/it/tools",
      fr: "https://www.ihatelovepdf.com/fr/tools",
      ro: "https://www.ihatelovepdf.com/ro/tools",
      ru: "https://www.ihatelovepdf.com/ru/tools",
      hu: "https://www.ihatelovepdf.com/hu/tools",
      "x-default": "https://www.ihatelovepdf.com/tools",
    },
  },
  openGraph: {
    title: "Все бесплатные инструменты PDF | ihatelovepdf",
    description: "Ознакомьтесь со всеми бесплатными и приватными инструментами PDF. Объединяйте, сжимайте, разделяйте и конвертируйте PDF прямо в браузере.",
    url: "https://www.ihatelovepdf.com/ru/tools",
    siteName: "ihatelovepdf",
    locale: "ru_RU",
    type: "website",
  },
};

export default function ToolsPage() {
  return <ToolsPageContent />;
}

