import { ToolsPageContent } from "../../../components/ToolsPageContent";
import type { Metadata } from "next";
import { METADATA_BASE } from "../../../lib/metadata-shared";

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: "All Free PDF Tools",
  description: "Browse all free and private PDF tools. Merge, compress, split, redact, edit, and convert PDFs directly in your browser without uploading files.",
};

export default function ToolsPage() {
  return <ToolsPageContent />;
}
