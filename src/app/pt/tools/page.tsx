import { ToolsPageContent } from "../../../components/ToolsPageContent";
import type { Metadata } from "next";
import { METADATA_BASE } from "../../../lib/metadata-shared";

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: "Todas as Ferramentas de PDF Gratuitas | ihatelovepdf",
  description: "Explore todas as ferramentas de PDF gratuitas e privadas. Junte, comprima, divida, edite e converta PDFs diretamente no navegador sem enviar arquivos.",
  alternates: {
    canonical: "https://www.ihatelovepdf.com/pt/tools",
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
    title: "Todas as Ferramentas de PDF Gratuitas | ihatelovepdf",
    description: "Explore todas as ferramentas de PDF gratuitas e privadas. Junte, comprima, divida, edite e converta PDFs diretamente no navegador.",
    url: "https://www.ihatelovepdf.com/pt/tools",
    siteName: "ihatelovepdf",
    locale: "pt_BR",
    type: "website",
  },
};

export default function ToolsPage() {
  return <ToolsPageContent />;
}

