import Script from "next/script";

export function SchemaOrg() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ihatelovepdf",
    url: "https://www.ihatelovepdf.com",
    logo: "https://www.ihatelovepdf.com/apple-icon.png",
    founder: {
      "@type": "Person",
      name: "Shreyash Srivastava",
      jobTitle: "Creator & Lead Engineer",
      url: "https://shreyashsrivastava.vercel.app/",
      sameAs: [
        "https://github.com/ShreyashSrivastavaa",
        "https://shreyashsrivastava.vercel.app/",
      ],
    },
    publishingPrinciples: "https://www.ihatelovepdf.com/privacy",
    sameAs: [
      "https://github.com/ShreyashSrivastavaa",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ihatelovepdf",
    url: "https://www.ihatelovepdf.com",
    description: "Powerful, Private & Free PDF Tools running 100% in your browser.",
    inLanguage: ["en", "es", "pt", "de", "fr", "hu", "it", "ro", "ru"],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://www.ihatelovepdf.com/tools?q={search_term_string}",
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
        id="schema-org-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
