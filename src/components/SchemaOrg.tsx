export function SchemaOrg() {
  const linkedSchemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://www.shreyashsrivastava.in/#person",
        name: "Shreyash Srivastava",
        jobTitle: "Founder and developer of ihatelovepdf",
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
        name: "ihatelovepdf",
        url: "https://www.ihatelovepdf.com",
        logo: {
          "@type": "ImageObject",
          url: "https://www.ihatelovepdf.com/apple-icon.png",
          caption: "ihatelovepdf Logo",
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
        name: "ihatelovepdf",
        url: "https://www.ihatelovepdf.com",
        description: "Free, Private & In-Browser PDF Tools. Files are processed locally in your browser and never uploaded.",
        inLanguage: ["en", "es", "pt", "de", "fr", "hu", "it", "ro", "ru"],
        publisher: {
          "@id": "https://www.ihatelovepdf.com/#organization",
        },
        creator: {
          "@id": "https://www.shreyashsrivastava.in/#person",
        },
      },
    ],
  };

  return (
    <script
      id="schema-org-linked-graph"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(linkedSchemaGraph) }}
    />
  );
}
