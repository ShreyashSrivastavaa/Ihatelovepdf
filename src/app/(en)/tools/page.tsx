import { ToolsPageContent } from "../../../components/ToolsPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All 45+ Free PDF Tools - ihatelovepdf",
  description: "Browse all 45+ free, private, and client-side PDF tools. Merge, compress, split, redact, edit, OCR, and convert PDFs directly in your browser with zero uploads.",
};

export default function ToolsPage() {
  return <ToolsPageContent />;
}
