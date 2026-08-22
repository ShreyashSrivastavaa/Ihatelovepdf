export interface ExtractedTextResult {
  fullText: string;
  pageTexts: string[];
  pageCount: number;
  wordCount: number;
  characterCount: number;
  linesCount: number;
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

  for (let i = 1; i <= pageCount; i++) {
    const page = await doc.getPage(i);
    const textContent = await page.getTextContent();

    // Group items by vertical position (y coordinate) to preserve natural line breaks
    const items = textContent.items as Array<{
      str: string;
      transform: number[];
      hasEOL?: boolean;
    }>;

    let pageText = '';
    let lastY: number | null = null;

    for (const item of items) {
      if (!item.str) continue;
      const currentY = item.transform ? item.transform[5] : null;

      if (lastY !== null && currentY !== null && Math.abs(currentY - lastY) > 5) {
        pageText += '\n';
      } else if (pageText.length > 0 && !pageText.endsWith(' ') && !pageText.endsWith('\n')) {
        pageText += ' ';
      }

      pageText += item.str;
      if (item.hasEOL) {
        pageText += '\n';
      }
      if (currentY !== null) {
        lastY = currentY;
      }
    }

    pageTexts.push(pageText.trim());
    if (onProgress) onProgress(i, pageCount);
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
  };
}

export const extractPdfText = extractTextFromPdf;

