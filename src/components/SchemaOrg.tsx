import Script from "next/script";

export function SchemaOrg() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ihatelovepdf",
    url: "https://ihatelovepdf.com",
    logo: "https://ihatelovepdf.com/apple-icon.png",
    founder: {
      "@type": "Person",
      name: "Shreyash Srivastava",
      jobTitle: "Creator & Lead Engineer",
      url: "https://shreyashsrivastava.vercel.app/",
      sameAs: [
        "https://linkedin.com/in/shreyashsrivastavaa",
        "https://github.com/ShreyashSrivastavaa",
        "https://x.com/YesShrey",
        "https://shreyashsrivastava.vercel.app/",
      ],
    },
    publishingPrinciples: "https://ihatelovepdf.com/privacy",
    sameAs: [
      "https://linkedin.com/in/shreyashsrivastavaa",
      "https://github.com/ShreyashSrivastavaa",
      "https://x.com/YesShrey",
    ],
  };

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ihatelovepdf",
    url: "https://ihatelovepdf.com",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All (Web Browser, Chrome, Firefox, Safari, Edge)",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    author: {
      "@type": "Person",
      name: "Shreyash Srivastava",
      url: "https://shreyashsrivastava.vercel.app/",
      sameAs: [
        "https://linkedin.com/in/shreyashsrivastavaa",
        "https://github.com/ShreyashSrivastavaa",
        "https://x.com/YesShrey",
      ],
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Merge PDF files",
      "Compress PDF files",
      "Split PDF pages",
      "Redact sensitive PDF data",
      "OCR and extract text from PDF",
      "Convert PDF to images and images to PDF",
      "Sign PDF documents",
      "100% private in-browser execution with zero cloud uploads",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ihatelovepdf",
    url: "https://ihatelovepdf.com",
    description: "Powerful, Private & Free PDF Tools running 100% in your browser.",
    inLanguage: ["en", "es", "pt", "de", "fr", "hu", "it", "ro", "ru"],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://ihatelovepdf.com/tools?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <Script
        id="schema-org-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="schema-org-software-application"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <Script
        id="schema-org-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
