import TermsPageContent from "../../../components/TermsPageContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | ihatelovepdf — Free & Private PDF Toolkit",
  description:
    "Read the ihatelovepdf Terms of Service. Free personal and commercial license, client-side execution guarantees, and intellectual property terms.",
  alternates: {
    canonical: "https://ihatelovepdf.com/terms",
  },
};

export default function TermsPage() {
  return <TermsPageContent />;
}
