import TermsPageContent from "../../../components/TermsPageContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | ihatelovepdf: Free and Private PDF Tools",
  description:
    "Read the ihatelovepdf Terms of Service. Free personal and commercial license, browser execution terms, and intellectual property information.",
  alternates: {
    canonical: "https://ihatelovepdf.com/terms",
  },
};

export default function TermsPage() {
  return <TermsPageContent />;
}
