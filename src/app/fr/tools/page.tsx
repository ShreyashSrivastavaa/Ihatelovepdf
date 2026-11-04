import { ToolsPageContent } from "../../../components/ToolsPageContent";
import type { Metadata } from "next";
import { METADATA_BASE } from "../../../lib/metadata-shared";

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: "Tous les Outils PDF Gratuits | ihatelovepdf",
  description: "Découvrez tous les outils PDF gratuits et privés. Fusionnez, compressez, divisez, modifiez et convertissez des PDF directement dans votre navigateur sans téléversement.",
  alternates: {
    canonical: "https://www.ihatelovepdf.com/fr/tools",
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
    title: "Tous les Outils PDF Gratuits | ihatelovepdf",
    description: "Découvrez tous les outils PDF gratuits et privés. Fusionnez, compressez, divisez et convertissez des PDF directement dans votre navigateur.",
    url: "https://www.ihatelovepdf.com/fr/tools",
    siteName: "ihatelovepdf",
    locale: "fr_FR",
    type: "website",
  },
};

export default function ToolsPage() {
  return <ToolsPageContent />;
}

