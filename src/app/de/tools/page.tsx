import { ToolsPageContent } from "../../../components/ToolsPageContent";
import type { Metadata } from "next";
import { METADATA_BASE } from "../../../lib/metadata-shared";

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: "Alle kostenlosen PDF-Tools | ihatelovepdf",
  description: "Entdecken Sie alle kostenlosen und privaten PDF-Tools. Führen Sie PDFs zusammen, komprimieren, teilen, bearbeiten und konvertieren Sie direkt im Browser ohne Datei-Upload.",
  alternates: {
    canonical: "https://www.ihatelovepdf.com/de/tools",
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
    title: "Alle kostenlosen PDF-Tools | ihatelovepdf",
    description: "Entdecken Sie alle kostenlosen und privaten PDF-Tools. Führen Sie PDFs zusammen, komprimieren, teilen und konvertieren Sie direkt im Browser.",
    url: "https://www.ihatelovepdf.com/de/tools",
    siteName: "ihatelovepdf",
    locale: "de_DE",
    type: "website",
  },
};

export default function ToolsPage() {
  return <ToolsPageContent />;
}

