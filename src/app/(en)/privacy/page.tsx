import PrivacyPageContent from "../../../components/PrivacyPageContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | ihatelovepdf — 100% Client-Side Private PDF Toolkit",
  description:
    "Read the ihatelovepdf Privacy Policy. Zero file uploads, zero server tracking, 100% local browser processing. GDPR, HIPAA, and LGPD compliant by design.",
  alternates: {
    canonical: "https://ihatelovepdf.com/privacy",
  },
};

export default function PrivacyPage() {
  return <PrivacyPageContent />;
}
