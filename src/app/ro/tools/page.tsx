import { ToolsPageContent } from "../../../components/ToolsPageContent";
import type { Metadata } from "next";
import { METADATA_BASE } from "../../../lib/metadata-shared";

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: "Toate Instrumentele PDF Gratuite | ihatelovepdf",
  description: "Descoperă toate instrumentele PDF gratuite și private. Unește, comprimă, împarte, editează și convertește PDF direct în browser fără a încărca fișiere.",
  alternates: {
    canonical: "https://www.ihatelovepdf.com/ro/tools",
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
    title: "Toate Instrumentele PDF Gratuite | ihatelovepdf",
    description: "Descoperă toate instrumentele PDF gratuite și private. Unește, comprimă, împarte și convertește PDF direct în browser.",
    url: "https://www.ihatelovepdf.com/ro/tools",
    siteName: "ihatelovepdf",
    locale: "ro_RO",
    type: "website",
  },
};

export default function ToolsPage() {
  return <ToolsPageContent />;
}

