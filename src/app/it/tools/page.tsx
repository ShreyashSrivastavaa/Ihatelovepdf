import { ToolsPageContent } from "../../../components/ToolsPageContent";
import type { Metadata } from "next";
import { METADATA_BASE } from "../../../lib/metadata-shared";

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: "Tutti gli Strumenti PDF Gratuiti | ihatelovepdf",
  description: "Scopri tutti gli strumenti PDF gratuiti e privati. Unisci, comprimi, dividi, modifica e converti PDF direttamente nel browser senza caricare file.",
  alternates: {
    canonical: "https://www.ihatelovepdf.com/it/tools",
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
    title: "Tutti gli Strumenti PDF Gratuiti | ihatelovepdf",
    description: "Scopri tutti gli strumenti PDF gratuiti e privati. Unisci, comprimi, dividi, modifica e converti PDF direttamente nel browser.",
    url: "https://www.ihatelovepdf.com/it/tools",
    siteName: "ihatelovepdf",
    locale: "it_IT",
    type: "website",
  },
};

export default function ToolsPage() {
  return <ToolsPageContent />;
}

