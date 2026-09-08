import ContactPageContent from "../../../components/ContactPageContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | ihatelovepdf: Support, Bug Reports, and Feedback",
  description:
    "Contact the ihatelovepdf team for support, bug reports, feature requests, or privacy inquiries.",
  alternates: {
    canonical: "https://ihatelovepdf.com/contact",
  },
};

export default function ContactPage() {
  return <ContactPageContent />;
}
