/**
 * Legacy guides-data.ts - re-exports from central localized-guides-data.ts
 * for backwards compatibility with any existing imports.
 */

export type {
  LocalizedGuideItem as GuideItem,
  LocalizedGuideStep,
  LocalizedGuideProblem,
  LocalizedGuideFaq,
  LocalizedGuideRelatedTool,
} from './localized-guides-data';

export {
  GUIDES_DATA,
  LOCALIZED_GUIDES_DATA,
  ALL_GUIDE_SLUGS,
} from './localized-guides-data';
