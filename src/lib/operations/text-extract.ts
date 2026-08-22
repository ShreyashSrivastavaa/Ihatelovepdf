export interface ExtractedTextResult {
  fullText: string;
  pageTexts: string[];
  pageCount: number;
  wordCount: number;
  characterCount: number;
  linesCount: number;
  needsOcr?: boolean;
}

type PdfJsModule = typeof import('pdfjs-dist/legacy/build/pdf');
let pdfjsLibPromise: Promise<PdfJsModule> | null = null;

async function getPdfJs(): Promise<PdfJsModule> {
  if (typeof window === 'undefined') throw new Error('PDF text extraction requires browser environment');
  if (!pdfjsLibPromise) {
    pdfjsLibPromise = import('pdfjs-dist/legacy/build/pdf').then((m) => {
      if (!m.GlobalWorkerOptions.workerSrc) {
        m.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
      }
      return m;
    });
  }
  return pdfjsLibPromise;
}

interface TextItem {
  str: string;
  x: number;
  y: number;
  width: number;
  height: number;
  hasEOL?: boolean;
}

/**
 * Extracts text while reconstructing visual reading order across multi-column layouts (XY-Cut / Column Clustering)
 */
export async function extractTextFromPdf(
  fileOrData: File | ArrayBuffer | Uint8Array,
  onProgress?: (current: number, total: number) => void
): Promise<ExtractedTextResult> {
  const pdfjs = await getPdfJs();
  const data = fileOrData instanceof File ? await fileOrData.arrayBuffer() : fileOrData;
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

  const loadingTask = pdfjs.getDocument({
    data,
    cMapUrl: `${baseUrl}/cmaps/`,
    cMapPacked: true,
    standardFontDataUrl: `${baseUrl}/standard_fonts/`,
  });

  const doc = await loadingTask.promise;
  const pageCount = doc.numPages;
  const pageTexts: string[] = [];
  let totalCharacters = 0;

  for (let p = 1; p <= pageCount; p++) {
    const page = await doc.getPage(p);
    const viewport = page.getViewport({ scale: 1.0 });
    const textContent = await page.getTextContent();

    const rawItems = textContent.items as Array<{
      str: string;
      transform: number[];
      width?: number;
      height?: number;
      hasEOL?: boolean;
    }>;

    const items: TextItem[] = [];
    for (const it of rawItems) {
      if (!it.str || it.str.trim().length === 0) continue;
      const x = it.transform ? it.transform[4] : 0;
      const y = it.transform ? it.transform[5] : 0;
      const width = it.width ?? 10;
      const height = it.height ?? 10;
      items.push({ str: it.str, x, y, width, height, hasEOL: it.hasEOL });
    }

    if (items.length === 0) {
      pageTexts.push('');
      if (onProgress) onProgress(p, pageCount);
      continue;
    }

    // Determine if page has a 2-column or 3-column layout
    // We analyze X midpoints: if items cleanly cluster into distinct left/right halves with a gutter gap:
    const pageWidth = viewport.width;
    const midX = pageWidth / 2;

    const leftItems: TextItem[] = [];
    const rightItems: TextItem[] = [];
    const fullWidthItems: TextItem[] = [];

    // Check if there is significant column separation
    let hasTwoColumns = false;
    let itemsCrossingMid = 0;

    for (const it of items) {
      if (it.x < midX - 30 && it.x + it.width < midX + 20) {
        leftItems.push(it);
      } else if (it.x > midX - 20) {
        rightItems.push(it);
      } else {
        itemsCrossingMid++;
        fullWidthItems.push(it);
      }
    }

    if (leftItems.length > 5 && rightItems.length > 5 && itemsCrossingMid < items.length * 0.25) {
      hasTwoColumns = true;
    }

    let pageText = '';

    if (hasTwoColumns) {
      // 1. Process full-width header items (e.g. Title across top)
      const topHeaders = fullWidthItems
        .filter((it) => it.y > viewport.height * 0.8)
        .sort((a, b) => b.y - a.y || a.x - b.x);

      if (topHeaders.length > 0) {
        pageText += renderItemsToText(topHeaders) + '\n\n';
      }

      // 2. Process Column 1 (Left column top-to-bottom)
      leftItems.sort((a, b) => b.y - a.y || a.x - b.x);
      pageText += renderItemsToText(leftItems) + '\n\n';

      // 3. Process Column 2 (Right column top-to-bottom)
      rightItems.sort((a, b) => b.y - a.y || a.x - b.x);
      pageText += renderItemsToText(rightItems);

      // 4. Process remaining full-width items at bottom (e.g. Footers)
      const bottomFooters = fullWidthItems
        .filter((it) => it.y <= viewport.height * 0.8)
        .sort((a, b) => b.y - a.y || a.x - b.x);

      if (bottomFooters.length > 0) {
        pageText += '\n\n' + renderItemsToText(bottomFooters);
      }
    } else {
      // Standard single-column top-to-bottom layout
      items.sort((a, b) => b.y - a.y || a.x - b.x);
      pageText = renderItemsToText(items);
    }

    const trimmed = pageText.trim();
    totalCharacters += trimmed.length;
    pageTexts.push(trimmed);

    if (onProgress) onProgress(p, pageCount);
  }

  const fullText = pageTexts
    .map((text, idx) => `--- Page ${idx + 1} ---\n\n${text}`)
    .join('\n\n');

  const words = fullText.trim().split(/\s+/).filter(Boolean);
  const lines = fullText.split('\n');

  return {
    fullText,
    pageTexts,
    pageCount,
    wordCount: words.length,
    characterCount: fullText.length,
    linesCount: lines.length,
    needsOcr: totalCharacters < 50, // Flag for automatic OCR prompt when no text layer exists
  };
}

function renderItemsToText(items: TextItem[]): string {
  let result = '';
  let lastY: number | null = null;

  for (const it of items) {
    if (lastY !== null && Math.abs(it.y - lastY) > 6) {
      result += '\n';
    } else if (result.length > 0 && !result.endsWith(' ') && !result.endsWith('\n')) {
      result += ' ';
    }
    result += it.str;
    if (it.hasEOL) {
      result += '\n';
    }
    lastY = it.y;
  }

  return result.trim();
}

export const extractPdfText = extractTextFromPdf;
