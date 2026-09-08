'use client';

import { useDictionary } from '../i18n/LocaleProvider';
import type { Dictionary } from '../i18n/dictionaries/dictionary-types';
import DashboardLayout from './dashboard/DashboardLayout';

export function ToolsPageContent({ dictionary: propDictionary }: { dictionary?: Dictionary } = {}) {
  const contextDictionary = useDictionary();
  const dictionary = propDictionary || contextDictionary;
  const {
    pages: { home },
    routes,
  } = dictionary;

  const labels = dictionary.components.footer.operations as Record<string, string>;

  return (
    <DashboardLayout
      hero={{
        title: "All PDF Tools",
        subtitle: "A collection of 45+ free, private PDF tools that run directly in your browser.",
        badges: home.hero.badges,
      }}
      why={{
        title: home.why.title,
        cards: home.why.cards,
      }}
      routes={routes.operations}
      labels={labels}
    />
  );
}
