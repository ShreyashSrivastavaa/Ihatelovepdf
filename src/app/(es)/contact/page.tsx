import ContactPageContent from "../../../components/ContactPageContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | PDFhelp — Support, Bug Reports & Feedback",
  description:
    "Contact the PDFhelp team for support, bug reports, feature requests, or privacy inquiries.",
  alternates: {
    canonical: "https://pdfhelp.com/contact",
  },
};

export default function ContactPage() {
  return <ContactPageContent />;
}
