"use client";

import { useState, useEffect, useMemo } from "react";
import { useDictionary, useLocale } from "../i18n/LocaleProvider";
import type { FAQItem } from "../i18n/dictionaries/dictionary-types";
import { FaqSchema } from "./seo/FaqSchema";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [region, setRegion] = useState<string | null>(null);
  const locale = useLocale();
  const dictionary = useDictionary();

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      const browserLang = navigator.language;
      setRegion(browserLang);
    }
  }, []);

  const { faqs, labels } = useMemo(() => {
    const collection = dictionary.faqs;

    const combined: FAQItem[] = [...collection.common];

    if (locale === "es") {
      if (region?.toLowerCase().includes("es")) {
        if (collection.spain) {
          combined.push(...collection.spain);
        }
      } else if (collection.latam) {
        combined.push(...collection.latam);
      }
    } else if (collection.regional) {
      combined.push(...collection.regional);
    }

    combined.push(...collection.tech);

    return {
      faqs: combined,
      labels: {
        title: dictionary.pages.faq.title,
      },
    };
  }, [dictionary, locale, region]);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="my-10">
      <h2 className="text-2xl font-bold tracking-tight mb-6 text-center text-primary">{labels.title}</h2>

      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={`${faq.question}-${index}`}
              className="border border-border rounded-[10px] bg-main overflow-hidden transition-colors"
            >
              <button
                type="button"
                aria-expanded={isOpen}
                className="w-full text-left px-5 py-4 flex justify-between items-center text-sm font-semibold text-primary hover:bg-alt transition-colors cursor-pointer"
                onClick={() => toggleQuestion(index)}
              >
                <span className="pr-4">{faq.question}</span>
                <span className="text-base text-secondary font-mono">{isOpen ? "−" : "+"}</span>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-sm text-secondary leading-relaxed border-t border-border/50 bg-main">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <FaqSchema data={faqs} />
    </section>
  );
}
