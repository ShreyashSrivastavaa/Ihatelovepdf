import { ToolsPageContent } from "../../../components/ToolsPageContent";
import type { Metadata } from "next";
import { METADATA_BASE } from "../../../lib/metadata-shared";

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: "All Free PDF Tools | ihatelovepdf",
  description: "Browse all free and private PDF tools. Merge, compress, split, redact, edit, and convert PDFs directly in your browser without uploading files.",
  alternates: {
    canonical: "https://www.ihatelovepdf.com/tools",
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
    title: "All Free PDF Tools | ihatelovepdf",
    description: "Browse all free and private PDF tools. Merge, compress, split, redact, edit, and convert PDFs directly in your browser without uploading files.",
    url: "https://www.ihatelovepdf.com/tools",
    siteName: "ihatelovepdf",
    locale: "en_US",
    type: "website",
  },
};

export default function ToolsPage() {
  return <ToolsPageContent />;
}
