const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren\'t', 'as', 'at',
  'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'can', 'can\'t', 'cannot',
  'could', 'couldn\'t', 'did', 'didn\'t', 'do', 'does', 'doesn\'t', 'doing', 'don\'t', 'down', 'during', 'each',
  'few', 'for', 'from', 'further', 'had', 'hadn\'t', 'has', 'hasn\'t', 'have', 'haven\'t', 'having', 'he', 'he\'d',
  'he\'ll', 'he\'s', 'her', 'here', 'here\'s', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'how\'s', 'i',
  'i\'d', 'i\'ll', 'i\'m', 'i\'ve', 'if', 'in', 'into', 'is', 'isn\'t', 'it', 'it\'s', 'its', 'itself', 'let\'s',
  'me', 'more', 'most', 'mustn\'t', 'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or',
  'other', 'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', 'shan\'t', 'she', 'she\'d', 'she\'ll',
  'she\'s', 'should', 'shouldn\'t', 'so', 'some', 'such', 'than', 'that', 'that\'s', 'the', 'their', 'theirs', 'them',
  'themselves', 'then', 'there', 'there\'s', 'these', 'they', 'they\'d', 'they\'ll', 'they\'re', 'they\'ve', 'this',
  'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'wasn\'t', 'we', 'we\'d', 'we\'ll', 'we\'re',
  'we\'ve', 'were', 'weren\'t', 'what', 'what\'s', 'when', 'when\'s', 'where', 'where\'s', 'which', 'while', 'who',
  'who\'s', 'whom', 'why', 'why\'s', 'with', 'won\'t', 'would', 'wouldn\'t', 'you', 'you\'d', 'you\'ll', 'you\'re',
  'you\'ve', 'your', 'yours', 'yourself', 'yourselves', 'el', 'la', 'los', 'las', 'un', 'una', 'de', 'del', 'en',
  'para', 'por', 'con', 'que', 'es', 'son', 'fue', 'fueron', 'se', 'su', 'sus'
]);

export interface LocalSummaryResult {
  overview: string;
  keyPoints: string[];
  topKeywords: Array<{ word: string; count: number }>;
  statistics: {
    totalWords: number;
    totalSentences: number;
    estimatedReadingTimeMinutes: number;
    vocabularyRichness: string;
  };
}

export function runLocalExtractiveSummary(
  fullText: string,
  summaryLength: 'short' | 'medium' | 'detailed' = 'medium'
): LocalSummaryResult {
  const clean = fullText.replace(/--- Page \d+ ---/g, '').trim();
  if (!clean) {
    return {
      overview: 'No text content detected in document.',
      keyPoints: [],
      topKeywords: [],
      statistics: {
        totalWords: 0,
        totalSentences: 0,
        estimatedReadingTimeMinutes: 0,
        vocabularyRichness: '0%',
      },
    };
  }

  // Sentence split
  const rawSentences = clean
    .split(/(?<=[.?!])\s+(?=[A-Z0-9])/g)
    .map((s) => s.trim())
    .filter((s) => s.length > 25 && s.length < 500);

  // Word frequency
  const words = clean.toLowerCase().match(/\b[a-z0-9_\u00C0-\u017F]{3,}\b/g) || [];
  const freqMap: Record<string, number> = {};
  words.forEach((w) => {
    if (!STOP_WORDS.has(w) && !/^\d+$/.test(w)) {
      freqMap[w] = (freqMap[w] || 0) + 1;
    }
  });

  const sortedKeywords = Object.entries(freqMap)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([word, count]) => ({ word, count }));

  // Score sentences based on keyword density and position
  const sentenceScores: Array<{ text: string; score: number; index: number }> = [];

  rawSentences.forEach((sentence, index) => {
    const sWords = sentence.toLowerCase().match(/\b[a-z0-9_\u00C0-\u017F]{3,}\b/g) || [];
    if (sWords.length < 5) return;

    let score = 0;
    sWords.forEach((w) => {
      score += freqMap[w] || 0;
    });

    // Normalize by length
    score = score / Math.sqrt(sWords.length);

    // Position boost (early document and start of sections)
    if (index === 0) score *= 1.8;
    else if (index < 5) score *= 1.3;
    else if (index > rawSentences.length - 3) score *= 1.2;

    sentenceScores.push({ text: sentence, score, index });
  });

  // Pick top sentences
  const targetCount = summaryLength === 'short' ? 3 : summaryLength === 'detailed' ? 8 : 5;
  const topForOverview = [...sentenceScores]
    .sort((a, b) => b.score - a.score)
    .slice(0, Math.min(3, targetCount))
    .sort((a, b) => a.index - b.index)
    .map((s) => s.text);

  const topForBullets = [...sentenceScores]
    .sort((a, b) => b.score - a.score)
    .slice(0, targetCount)
    .map((s) => s.text);

  const uniqueWords = new Set(words).size;
  const richness = words.length > 0 ? ((uniqueWords / words.length) * 100).toFixed(1) + '%' : '0%';

  return {
    overview: topForOverview.join(' '),
    keyPoints: topForBullets,
    topKeywords: sortedKeywords,
    statistics: {
      totalWords: words.length,
      totalSentences: rawSentences.length,
      estimatedReadingTimeMinutes: Math.max(1, Math.round(words.length / 200)),
      vocabularyRichness: richness,
    },
  };
}

export interface SearchMatch {
  pageNumber: number;
  snippet: string;
  score: number;
}

export function runLocalSemanticSearch(
  pageTexts: string[],
  query: string
): SearchMatch[] {
  const qTokens = query
    .toLowerCase()
    .match(/\b[a-z0-9_\u00C0-\u017F]{2,}\b/g)
    ?.filter((t) => !STOP_WORDS.has(t)) || [];

  if (qTokens.length === 0) return [];

  const results: SearchMatch[] = [];

  pageTexts.forEach((text, pageIndex) => {
    const lower = text.toLowerCase();
    let matchCount = 0;
    qTokens.forEach((token) => {
      const regex = new RegExp(`\\b${token}`, 'g');
      const matches = lower.match(regex);
      if (matches) matchCount += matches.length;
    });

    if (matchCount > 0) {
      // Find best snippet
      const firstIndex = lower.indexOf(qTokens[0]);
      const start = Math.max(0, firstIndex - 60);
      const end = Math.min(text.length, firstIndex + 140);
      const snippet = (start > 0 ? '...' : '') + text.slice(start, end).trim() + (end < text.length ? '...' : '');

      results.push({
        pageNumber: pageIndex + 1,
        snippet,
        score: matchCount,
      });
    }
  });

  return results.sort((a, b) => b.score - a.score);
}
