/**
 * High-Precision Offline AI Engine
 * Implements Graph-based TextRank Extractive Summarization and Stemmed BM25 Semantic Search
 * 100% Client-Side WebAssembly / In-Memory Execution
 */

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

/**
 * Lightweight English stemmer (Suffix stripping heuristics based on Porter rules)
 */
export function stemWord(word: string): string {
  let w = word.toLowerCase().trim();
  if (w.length < 4) return w;

  if (w.endsWith('sses')) return w.slice(0, -2);
  if (w.endsWith('ies')) return w.slice(0, -2);
  if (w.endsWith('ss')) return w;
  if (w.endsWith('s')) w = w.slice(0, -1);

  if (w.endsWith('eed')) {
    if (w.length > 5) return w.slice(0, -1);
  } else if ((w.endsWith('ed') || w.endsWith('ing')) && w.length > 5) {
    w = w.replace(/(ed|ing)$/, '');
    if (w.endsWith('at') || w.endsWith('bl') || w.endsWith('iz')) w += 'e';
  }

  if (w.endsWith('ational')) return w.replace('ational', 'ate');
  if (w.endsWith('tional')) return w.replace('tional', 'tion');
  if (w.endsWith('fulness')) return w.replace('fulness', 'ful');
  if (w.endsWith('ousness')) return w.replace('ousness', 'ous');
  if (w.endsWith('ization')) return w.replace('ization', 'ize');
  if (w.endsWith('ement')) return w.replace('ement', '');
  if (w.endsWith('ment')) return w.replace('ment', '');
  if (w.endsWith('able') || w.endsWith('ible')) return w.slice(0, -4);

  return w;
}

/**
 * Executes Graph-based TextRank extractive summarization on local PDF text
 */
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

  // 1. Sentence Tokenization
  const rawSentences = clean
    .split(/(?<=[.?!])\s+(?=[A-Z0-9])/g)
    .map((s) => s.trim())
    .filter((s) => s.length > 20 && s.length < 600);

  // 2. Tokenize and Stem Words
  const allWords = clean.toLowerCase().match(/\b[a-z0-9_\u00C0-\u017F]{3,}\b/g) || [];
  const freqMap: Record<string, number> = {};
  allWords.forEach((w) => {
    if (!STOP_WORDS.has(w) && !/^\d+$/.test(w)) {
      const stem = stemWord(w);
      freqMap[stem] = (freqMap[stem] || 0) + 1;
    }
  });

  const sortedKeywords = Object.entries(freqMap)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([word, count]) => ({ word, count }));

  if (rawSentences.length <= 3) {
    return {
      overview: rawSentences.join(' '),
      keyPoints: rawSentences,
      topKeywords: sortedKeywords,
      statistics: {
        totalWords: allWords.length,
        totalSentences: rawSentences.length,
        estimatedReadingTimeMinutes: 1,
        vocabularyRichness: '100%',
      },
    };
  }

  // 3. Construct TextRank Sentence Similarity Graph
  // Similarity between S_i and S_j = common_stemmed_tokens / (log(len(S_i)) + log(len(S_j)))
  const N = rawSentences.length;
  const sentenceTokens = rawSentences.map((s) => {
    const tokens = s.toLowerCase().match(/\b[a-z0-9_\u00C0-\u017F]{3,}\b/g) || [];
    return new Set(tokens.filter((t) => !STOP_WORDS.has(t)).map(stemWord));
  });

  const similarityMatrix: number[][] = Array.from({ length: N }, () => new Array(N).fill(0));
  const degreeSums: number[] = new Array(N).fill(0);

  for (let i = 0; i < N; i++) {
    const setA = sentenceTokens[i];
    if (setA.size === 0) continue;

    for (let j = i + 1; j < N; j++) {
      const setB = sentenceTokens[j];
      if (setB.size === 0) continue;

      let overlap = 0;
      setA.forEach((token) => {
        if (setB.has(token)) overlap++;
      });

      if (overlap > 0) {
        const norm = Math.log(setA.size + 1) + Math.log(setB.size + 1);
        const weight = overlap / Math.max(1, norm);
        similarityMatrix[i][j] = weight;
        similarityMatrix[j][i] = weight;
        degreeSums[i] += weight;
        degreeSums[j] += weight;
      }
    }
  }

  // 4. Power Iteration (PageRank convergence over sentence graph)
  const d = 0.85; // Damping factor
  let scores: number[] = new Array(N).fill(1.0 / N);

  for (let iter = 0; iter < 20; iter++) {
    const nextScores: number[] = new Array(N).fill((1 - d) / N);
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (i !== j && similarityMatrix[j][i] > 0 && degreeSums[j] > 0) {
          nextScores[i] += d * (similarityMatrix[j][i] / degreeSums[j]) * scores[j];
        }
      }
    }
    scores = nextScores;
  }

  // Boost initial title / intro sentences slightly
  scores[0] *= 1.35;
  if (N > 1) scores[1] *= 1.15;

  // Rank sentences
  const ranked = scores
    .map((score, idx) => ({ text: rawSentences[idx], score, index: idx }))
    .sort((a, b) => b.score - a.score);

  const targetCount = summaryLength === 'short' ? 3 : summaryLength === 'detailed' ? 8 : 5;

  const topOverviewSentences = [...ranked]
    .slice(0, Math.min(3, targetCount))
    .sort((a, b) => a.index - b.index)
    .map((s) => s.text);

  const topKeyPoints = [...ranked]
    .slice(0, targetCount)
    .sort((a, b) => a.index - b.index)
    .map((s) => s.text);

  const uniqueWords = new Set(allWords).size;
  const richness = allWords.length > 0 ? ((uniqueWords / allWords.length) * 100).toFixed(1) + '%' : '0%';

  return {
    overview: topOverviewSentences.join(' '),
    keyPoints: topKeyPoints,
    topKeywords: sortedKeywords,
    statistics: {
      totalWords: allWords.length,
      totalSentences: rawSentences.length,
      estimatedReadingTimeMinutes: Math.max(1, Math.round(allWords.length / 200)),
      vocabularyRichness: richness,
    },
  };
}

export interface SearchMatch {
  pageNumber: number;
  snippet: string;
  score: number;
}

/**
 * High-Precision BM25 Relevance Search with Stemming
 */
export function runLocalSemanticSearch(
  pageTexts: string[],
  query: string
): SearchMatch[] {
  const rawTokens = query
    .toLowerCase()
    .match(/\b[a-z0-9_\u00C0-\u017F]{2,}\b/g)
    ?.filter((t) => !STOP_WORDS.has(t)) || [];

  if (rawTokens.length === 0) return [];

  const queryStems = rawTokens.map(stemWord);
  const totalPages = pageTexts.length;

  // 1. Calculate Document Frequency (DF) for each query token
  const df: Record<string, number> = {};
  const pageTokenLists = pageTexts.map((text) => {
    const tokens = text.toLowerCase().match(/\b[a-z0-9_\u00C0-\u017F]{2,}\b/g) || [];
    const stems = tokens.map(stemWord);
    const stemSet = new Set(stems);
    queryStems.forEach((stem) => {
      if (stemSet.has(stem)) {
        df[stem] = (df[stem] || 0) + 1;
      }
    });
    return stems;
  });

  const avgDocLen =
    pageTokenLists.reduce((sum, list) => sum + list.length, 0) / Math.max(1, totalPages);

  const k1 = 1.5;
  const b = 0.75;
  const results: SearchMatch[] = [];

  pageTokenLists.forEach((stems, pageIdx) => {
    const docLen = stems.length;
    let bm25Score = 0;

    // Term frequencies
    const tfMap: Record<string, number> = {};
    stems.forEach((s) => {
      tfMap[s] = (tfMap[s] || 0) + 1;
    });

    queryStems.forEach((stem) => {
      const tf = tfMap[stem] || 0;
      if (tf > 0) {
        const docFreq = df[stem] || 1;
        const idf = Math.log((totalPages - docFreq + 0.5) / (docFreq + 0.5) + 1);
        const numerator = tf * (k1 + 1);
        const denominator = tf + k1 * (1 - b + (b * docLen) / Math.max(1, avgDocLen));
        bm25Score += idf * (numerator / denominator);
      }
    });

    if (bm25Score > 0) {
      const pageText = pageTexts[pageIdx];
      // Generate clean contextual snippet
      const lower = pageText.toLowerCase();
      let bestIndex = -1;

      for (const token of rawTokens) {
        const idx = lower.indexOf(token);
        if (idx !== -1) {
          bestIndex = idx;
          break;
        }
      }

      if (bestIndex === -1) {
        bestIndex = 0;
      }

      const start = Math.max(0, bestIndex - 60);
      const end = Math.min(pageText.length, bestIndex + 160);
      const snippet =
        (start > 0 ? '...' : '') +
        pageText.slice(start, end).replace(/\s+/g, ' ').trim() +
        (end < pageText.length ? '...' : '');

      results.push({
        pageNumber: pageIdx + 1,
        snippet,
        score: Number(bm25Score.toFixed(3)),
      });
    }
  });

  return results.sort((a, b) => b.score - a.score);
}
