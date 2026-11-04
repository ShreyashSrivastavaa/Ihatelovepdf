import { ToolsPageContent } from "../../../components/ToolsPageContent";
import type { Metadata } from "next";
import { METADATA_BASE } from "../../../lib/metadata-shared";

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: "Todas las Herramientas PDF Gratis | ihatelovepdf",
  description: "Explora todas las herramientas PDF gratuitas y privadas. Une, comprime, divide, edita y convierte archivos PDF directamente en tu navegador sin subir archivos.",
  alternates: {
    canonical: "https://www.ihatelovepdf.com/es/tools",
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
    title: "Todas las Herramientas PDF Gratis | ihatelovepdf",
    description: "Explora todas las herramientas PDF gratuitas y privadas. Une, comprime, divide, edita y convierte archivos PDF directamente en tu navegador.",
    url: "https://www.ihatelovepdf.com/es/tools",
    siteName: "ihatelovepdf",
    locale: "es_ES",
    type: "website",
  },
};

export default function ToolsPage() {
  return <ToolsPageContent />;
}

