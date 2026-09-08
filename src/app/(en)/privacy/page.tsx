import PrivacyPageContent from "../../../components/PrivacyPageContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | ihatelovepdf: Private PDF Tools in Your Browser",
  description:
    "Read the ihatelovepdf Privacy Policy. No file uploads, no server tracking, and local browser processing on your own device.",
  alternates: {
    canonical: "https://ihatelovepdf.com/privacy",
  },
};

export default function PrivacyPage() {
  return <PrivacyPageContent />;
}
