import Script from "next/script";

export function SchemaOrg() {
  const linkedSchemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://www.shreyashsrivastava.in/#person",
        name: "Shreyash Srivastava",
        jobTitle: "Founder and developer of I Hate Love PDF",
        url: "https://www.shreyashsrivastava.in/",
        image: "https://www.ihatelovepdf.com/apple-icon.png",
        sameAs: [
          "https://www.shreyashsrivastava.in/",
          "https://github.com/ShreyashSrivastavaa",
          "https://www.linkedin.com/in/shreyashsrivastavaa",
        ],
        worksFor: {
          "@id": "https://www.ihatelovepdf.com/#organization",
        },
      },
      {
        "@type": "Organization",
        "@id": "https://www.ihatelovepdf.com/#organization",
        name: "I Hate Love PDF",
        url: "https://www.ihatelovepdf.com",
        logo: {
          "@type": "ImageObject",
          url: "https://www.ihatelovepdf.com/apple-icon.png",
          caption: "I Hate Love PDF Logo",
        },
        founder: {
          "@id": "https://www.shreyashsrivastava.in/#person",
        },
        publishingPrinciples: "https://www.ihatelovepdf.com/privacy",
        sameAs: [
          "https://github.com/ShreyashSrivastavaa",
          "https://www.linkedin.com/in/shreyashsrivastavaa",
          "https://buymeacoffee.com/shreyashsrivastavaa",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://www.ihatelovepdf.com/#website",
        name: "I Hate Love PDF",
        url: "https://www.ihatelovepdf.com",
        description: "Free, Private & In-Browser PDF Tools. Files are processed locally in your browser and never uploaded.",
        inLanguage: ["en", "es", "pt", "de", "fr", "hu", "it", "ro", "ru"],
        publisher: {
          "@id": "https://www.ihatelovepdf.com/#organization",
        },
        creator: {
          "@id": "https://www.shreyashsrivastava.in/#person",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://www.ihatelovepdf.com/tools?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://www.ihatelovepdf.com/#software",
        name: "I Hate Love PDF",
        url: "https://www.ihatelovepdf.com",
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "All (Web Browser, Chrome, Firefox, Safari, Edge)",
        browserRequirements: "Requires a modern web browser with JavaScript enabled",
        author: {
          "@id": "https://www.shreyashsrivastava.in/#person",
        },
        publisher: {
          "@id": "https://www.ihatelovepdf.com/#organization",
        },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        featureList: [
          "Merge PDF files online free",
          "Compress PDF files without quality loss",
          "Split PDF pages and ranges",
          "Permanently redact sensitive PDF text",
          "Extract clean text from PDF",
          "Convert PDF to JPG and PNG images",
          "Sign PDF documents with legal e-signatures",
          "Fill interactive PDF forms and flatten fields",
          "100% private in-browser execution with zero cloud uploads",
        ],
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.ihatelovepdf.com/#faq-owner",
        mainEntity: [
          {
            "@type": "Question",
            name: "Who owns I Hate Love PDF?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "I Hate Love PDF is owned and built by Shreyash Srivastava. Portfolio: https://www.shreyashsrivastava.in/",
            },
          },
          {
            "@type": "Question",
            name: "Are files uploaded to a server on I Hate Love PDF?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. All files are processed locally inside your web browser memory using client-side JavaScript. No document data is ever uploaded to any remote server.",
            },
          },
        ],
      },
    ],
  };

  return (
    <Script
      id="schema-org-linked-graph"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(linkedSchemaGraph) }}
    />
  );
}
