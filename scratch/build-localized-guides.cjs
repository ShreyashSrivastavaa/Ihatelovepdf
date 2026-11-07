// scratch/build-localized-guides.cjs
const fs = require('fs');
const path = require('path');

const g1 = require('./guides-defs/guides-1-to-5.cjs');
const g2 = require('./guides-defs/guides-6-to-10.cjs');
const g3 = require('./guides-defs/guides-11-to-15.cjs');

const allGuidesRaw = [...g1, ...g2, ...g3];

const LOCALES = ['en', 'es', 'pt', 'de', 'fr', 'it', 'ro', 'ru', 'hu'];
const routeMap = require('../content/i18n-route-map.json');

function getToolPath(opKey, locale) {
  if (routeMap.operations[opKey] && routeMap.operations[opKey][locale]) {
    return routeMap.operations[opKey][locale];
  }
  if (opKey === 'wordToPdf') {
    return locale === 'en' ? '/word-to-pdf' : `/${locale}/word-to-pdf`;
  }
  return locale === 'en' ? `/${opKey}` : `/${locale}/${opKey}`;
}

const localizedGuides = {};
for (const loc of LOCALES) {
  localizedGuides[loc] = {};
}

const allSlugs = allGuidesRaw.map((g) => g.slug);

for (const guide of allGuidesRaw) {
  for (const loc of LOCALES) {
    const locData = guide[loc] || guide.en;
    const toolPath = getToolPath(guide.opKey, loc);
    const cleanToolSlug = toolPath.replace(/^\//, '');

    // Map related tools to localized paths if available
    const relatedToolsLocalized = (locData.relatedTools || []).map((rt) => {
      // Check if rt.slug is an opKey or slug
      const foundOpKey = Object.keys(routeMap.operations).find(
        (k) => k === rt.slug || routeMap.operations[k].en === `/${rt.slug}`
      );
      const targetPath = foundOpKey ? getToolPath(foundOpKey, loc) : (loc === 'en' ? `/${rt.slug}` : `/${loc}/${rt.slug}`);
      return {
        slug: targetPath.replace(/^\//, ''),
        path: targetPath,
        name: rt.name,
        description: rt.description,
      };
    });

    localizedGuides[loc][guide.slug] = {
      slug: guide.slug,
      locale: loc,
      h1: locData.h1,
      title: locData.title,
      metaDescription: locData.metaDescription,
      directAnswer: locData.directAnswer,
      category: guide.category,
      datePublished: '2026-08-20',
      dateModified: '2026-11-05',
      readTime: guide.readTime,
      author: 'Shreyash Srivastava',
      authorUrl: 'https://www.shreyashsrivastava.in/',
      toolOperationKey: guide.opKey,
      toolPath: toolPath,
      toolSlug: cleanToolSlug,
      toolName: locData.toolName,
      keyTakeaways: locData.keyTakeaways,
      steps: locData.steps,
      commonProblems: locData.commonProblems,
      faqs: locData.faqs,
      privacyNote: locData.privacyNote,
      relatedTools: relatedToolsLocalized,
      // Backwards-compatible content array
      content: [
        locData.directAnswer,
        locData.privacyNote,
      ],
    };
  }
}

// Generate the TypeScript file content
const tsContent = `/**
 * Localized PDF Guides Data across all 9 supported languages.
 * Generated automatically from verified localized guide definitions.
 */

export interface LocalizedGuideStep {
  title: string;
  text: string;
}

export interface LocalizedGuideProblem {
  problem: string;
  solution: string;
}

export interface LocalizedGuideFaq {
  question: string;
  answer: string;
}

export interface LocalizedGuideRelatedTool {
  slug: string;
  path: string;
  name: string;
  description: string;
}

export interface LocalizedGuideItem {
  slug: string;
  locale: string;
  h1: string;
  title: string;
  metaDescription: string;
  directAnswer: string;
  category: 'How-To' | 'Security' | 'Optimization' | 'Organization';
  datePublished: string;
  dateModified: string;
  readTime: string;
  author: string;
  authorUrl: string;
  toolOperationKey: string;
  toolPath: string;
  toolSlug: string;
  toolName: string;
  keyTakeaways: string[];
  steps: LocalizedGuideStep[];
  commonProblems: LocalizedGuideProblem[];
  faqs: LocalizedGuideFaq[];
  privacyNote: string;
  relatedTools: LocalizedGuideRelatedTool[];
  content: string[];
}

export const ALL_GUIDE_SLUGS: string[] = ${JSON.stringify(allSlugs, null, 2)};

export const LOCALIZED_GUIDES_DATA: Record<string, Record<string, LocalizedGuideItem>> = ${JSON.stringify(
  localizedGuides,
  null,
  2
)};

/**
 * Backwards-compatible English guides mapping for legacy components.
 */
export const GUIDES_DATA: Record<string, LocalizedGuideItem> = LOCALIZED_GUIDES_DATA['en'];
`;

const outputPath = path.resolve(__dirname, '../src/app/_data/localized-guides-data.ts');
fs.writeFileSync(outputPath, tsContent, 'utf8');

console.log('Successfully wrote', outputPath);
console.log('Total guide slugs:', allSlugs.length);
console.log('Languages covered:', LOCALES.join(', '));
console.log('Total localized guide entries:', allSlugs.length * LOCALES.length);
