import { ToolsPageContent } from "../../../components/ToolsPageContent";
import type { Metadata } from "next";
import { METADATA_BASE } from "../../../lib/metadata-shared";

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: "Minden Ingyenes PDF Eszköz | ihatelovepdf",
  description: "Böngésszen az összes ingyenes és privát PDF-eszköz között. Egyesítsen, tömörítsen, osszon fel, szerkesszen és alakítson át PDF-eket közvetlenül a böngészőben fájlfeltöltés nélkül.",
  alternates: {
    canonical: "https://www.ihatelovepdf.com/hu/tools",
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
    title: "Minden Ingyenes PDF Eszköz | ihatelovepdf",
    description: "Böngésszen az összes ingyenes és privát PDF-eszköz között. Egyesítsen, tömörítsen, osszon fel és alakítson át PDF-eket közvetlenül a böngészőben.",
    url: "https://www.ihatelovepdf.com/hu/tools",
    siteName: "ihatelovepdf",
    locale: "hu_HU",
    type: "website",
  },
};

export default function ToolsPage() {
  return <ToolsPageContent />;
}

