import PrivacyPageContent from "../../../components/PrivacyPageContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | PDFhelp — 100% Client-Side Private PDF Toolkit",
  description:
    "Read the PDFhelp Privacy Policy. Zero file uploads, zero server tracking, 100% local browser processing. GDPR, HIPAA, and LGPD compliant by design.",
  alternates: {
    canonical: "https://pdfhelp.com/privacy",
  },
};

export default function PrivacyPage() {
  return <PrivacyPageContent />;
}
