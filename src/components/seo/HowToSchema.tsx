"use client";

import Script from "next/script";
import type { OperationContent } from "../../i18n/dictionaries/operation-types";

interface HowToSchemaProps {
  operation: OperationContent;
}

export function HowToSchema({ operation }: HowToSchemaProps) {
  if (!operation || !operation.howTo || !operation.howTo.steps || operation.howTo.steps.length === 0) {
    return null;
  }

  const howToJson = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": operation.howTo.title || operation.hero.title,
    "description": operation.meta.description || operation.hero.description,
    "step": operation.howTo.steps.map((stepText, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": stepText.length > 80 ? `Step ${index + 1}` : stepText,
      "text": stepText
    }))
  };

  return (
    <Script
      id={`howto-schema-${operation.key}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJson) }}
    />
  );
}
