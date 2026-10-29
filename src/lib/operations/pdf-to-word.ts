/**
 * PDF to Word (.docx) Conversion Engine
 * Runs 100% in-browser with zero server uploads.
 * Uses pdfjs-dist for coordinate-aware text and image extraction
 * and docx (MIT) for standards-compliant Word document generation.
 */

import {
  Document,
  Paragraph,
  TextRun,
  HeadingLevel,
  Packer,
  ImageRun,
  AlignmentType,
} from 'docx';

type PdfJsModule = typeof import('pdfjs-dist');
let pdfjsLibPromise: Promise<PdfJsModule> | null = null;

async function getPdfJs(): Promise<PdfJsModule> {
  if (!pdfjsLibPromise) {
    pdfjsLibPromise = import('pdfjs-dist/legacy/build/pdf.mjs').then((m) => {
      if (typeof window !== 'undefined' && !m.GlobalWorkerOptions.workerSrc) {
        m.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
      }
      return m;
    });
  }
  return pdfjsLibPromise;
}

export interface ExtractedTextItem {
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize: number;
  fontName: string;
  isBold: boolean;
  isItalic: boolean;
}

export interface ExtractedLine {
  y: number;
  height: number;
  minX: number;
  maxX: number;
  fontSize: number;
  runs: Array<{
    text: string;
    fontSize: number;
    isBold: boolean;
    isItalic: boolean;
  }>;
  rawText: string;
}

export interface StructuredBlock {
  type: 'heading' | 'list-bullet' | 'list-number' | 'paragraph';
  headingLevel?: (typeof HeadingLevel)[keyof typeof HeadingLevel];
  runs: Array<{
    text: string;
    fontSize?: number;
    isBold?: boolean;
    isItalic?: boolean;
  }>;
}

export interface ExtractedImage {
  bytes: Uint8Array;
  width: number;
  height: number;
  x?: number;
  y?: number;
}

export interface PageStructure {
  pageNumber: number;
  blocks: StructuredBlock[];
  images: ExtractedImage[];
}

export interface PdfToWordOptions {
  documentTitle?: string;
  extractImages?: boolean;
  password?: string;
  warnAbove50MB?: boolean;
}

/**
 * Checks if font name implies bold weight.
 */
export function isFontBold(fontName: string): boolean {
  if (!fontName) return false;
  return /(bold|black|heavy|semibold|bld|gothic|w[6-9])/i.test(fontName);
}

/**
 * Checks if font name implies italic / oblique style.
 */
export function isFontItalic(fontName: string): boolean {
  if (!fontName) return false;
  return /(italic|oblique|ital|slanted|it)/i.test(fontName);
}

/**
 * Groups raw positioned text items on a page into lines, preserving reading order and spacing.
 */
export function groupItemsIntoLines(items: ExtractedTextItem[]): ExtractedLine[] {
  if (items.length === 0) return [];

  // Sort items primarily by Y descending (top of page to bottom), secondarily by X ascending
  const sorted = [...items].sort((a, b) => {
    const yDiff = b.y - a.y;
    if (Math.abs(yDiff) > 3) {
      return yDiff;
    }
    return a.x - b.x;
  });

  const lines: ExtractedLine[] = [];

  for (const item of sorted) {
    if (!item.text || item.text.trim() === '') continue;

    // Find if there is an existing line within vertical tolerance
    let matchedLine: ExtractedLine | null = null;
    for (const line of lines) {
      const tolerance = Math.max(item.fontSize, line.fontSize) * 0.45;
      if (Math.abs(line.y - item.y) <= tolerance) {
        matchedLine = line;
        break;
      }
    }

    if (matchedLine) {
      // Append to line
      const lastRun = matchedLine.runs[matchedLine.runs.length - 1];
      const needsSpace =
        item.x > matchedLine.maxX + Math.max(item.fontSize, matchedLine.fontSize) * 0.22 &&
        !lastRun.text.endsWith(' ') &&
        !item.text.startsWith(' ');

      const formattedText = needsSpace ? ` ${item.text}` : item.text;

      if (
        lastRun &&
        lastRun.fontSize === item.fontSize &&
        lastRun.isBold === item.isBold &&
        lastRun.isItalic === item.isItalic
      ) {
        lastRun.text += formattedText;
      } else {
        matchedLine.runs.push({
          text: formattedText,
          fontSize: item.fontSize,
          isBold: item.isBold,
          isItalic: item.isItalic,
        });
      }

      matchedLine.rawText += formattedText;
      matchedLine.maxX = Math.max(matchedLine.maxX, item.x + item.width);
      matchedLine.minX = Math.min(matchedLine.minX, item.x);
      matchedLine.fontSize = Math.max(matchedLine.fontSize, item.fontSize);
      matchedLine.height = Math.max(matchedLine.height, item.height);
    } else {
      lines.push({
        y: item.y,
        height: item.height || item.fontSize * 1.2,
        minX: item.x,
        maxX: item.x + item.width,
        fontSize: item.fontSize,
        runs: [
          {
            text: item.text,
            fontSize: item.fontSize,
            isBold: item.isBold,
            isItalic: item.isItalic,
          },
        ],
        rawText: item.text,
      });
    }
  }

  // Final sort of lines from top to bottom
  return lines.sort((a, b) => b.y - a.y);
}

/**
 * Calculates modal/body font size for a document or page.
 */
export function calculateBodyFontSize(lines: ExtractedLine[]): number {
  if (lines.length === 0) return 11;

  const fontCounts = new Map<number, number>();
  for (const line of lines) {
    const roundedSize = Math.round(line.fontSize);
    fontCounts.set(roundedSize, (fontCounts.get(roundedSize) || 0) + line.rawText.length);
  }

  let maxCount = 0;
  let bodySize = 11;
  for (const [size, count] of fontCounts.entries()) {
    if (count > maxCount) {
      maxCount = count;
      bodySize = size;
    }
  }

  return bodySize;
}

/**
 * Groups lines into structured blocks (headings, paragraphs, bullet/numbered lists).
 */
export function groupLinesIntoBlocks(lines: ExtractedLine[], bodyFontSize: number): StructuredBlock[] {
  if (lines.length === 0) return [];

  const blocks: StructuredBlock[] = [];
  let currentBlock: StructuredBlock | null = null;
  let lastLine: ExtractedLine | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const textTrimmed = line.rawText.trim();
    if (!textTrimmed) continue;

    // 1. Detect Heading
    const isHeading =
      line.fontSize >= bodyFontSize * 1.25 ||
      (line.fontSize > bodyFontSize * 1.1 && line.runs.every((r) => r.isBold) && textTrimmed.length < 90);

    if (isHeading) {
      if (currentBlock) {
        blocks.push(currentBlock);
        currentBlock = null;
      }

      let headingLevel: (typeof HeadingLevel)[keyof typeof HeadingLevel] = HeadingLevel.HEADING_3;
      if (line.fontSize >= bodyFontSize * 1.7) {
        headingLevel = HeadingLevel.HEADING_1;
      } else if (line.fontSize >= bodyFontSize * 1.35) {
        headingLevel = HeadingLevel.HEADING_2;
      }

      blocks.push({
        type: 'heading',
        headingLevel,
        runs: line.runs,
      });

      lastLine = line;
      continue;
    }

    // 2. Detect Bullet List
    const bulletMatch = textTrimmed.match(/^[•\-\*\u2022\u2023\u25E6\u2043\u2219]\s+(.*)$/);
    if (bulletMatch) {
      if (currentBlock) {
        blocks.push(currentBlock);
        currentBlock = null;
      }

      const strippedRuns = line.runs.map((r, idx) => {
        if (idx === 0) {
          return {
            ...r,
            text: r.text.replace(/^[•\-\*\u2022\u2023\u25E6\u2043\u2219]\s*/, ''),
          };
        }
        return r;
      });

      blocks.push({
        type: 'list-bullet',
        runs: strippedRuns,
      });

      lastLine = line;
      continue;
    }

    // 3. Detect Numbered List
    const numberMatch = textTrimmed.match(/^(\d+|[a-zA-Z])[\.\)]\s+(.*)$/);
    if (numberMatch) {
      if (currentBlock) {
        blocks.push(currentBlock);
        currentBlock = null;
      }

      blocks.push({
        type: 'list-number',
        runs: line.runs,
      });

      lastLine = line;
      continue;
    }

    // 4. Standard Paragraph Grouping
    const verticalGap = lastLine ? lastLine.y - line.y - lastLine.height : 0;
    const avgLineHeight = (lastLine ? lastLine.height : line.height) || line.fontSize * 1.2;
    const isNewParagraph = !lastLine || verticalGap > avgLineHeight * 0.85;

    if (isNewParagraph || !currentBlock || currentBlock.type !== 'paragraph') {
      if (currentBlock) {
        blocks.push(currentBlock);
      }
      currentBlock = {
        type: 'paragraph',
        runs: [...line.runs],
      };
    } else {
      // Add space between lines if needed
      const lastRun = currentBlock.runs[currentBlock.runs.length - 1];
      if (lastRun && !lastRun.text.endsWith(' ') && !line.runs[0]?.text.startsWith(' ')) {
        lastRun.text += ' ';
      }
      currentBlock.runs.push(...line.runs);
    }

    lastLine = line;
  }

  if (currentBlock) {
    blocks.push(currentBlock);
  }

  return blocks;
}

/**
 * Extracts embedded images from a PDF.js page operator list.
 */
async function extractPageImages(page: any): Promise<ExtractedImage[]> {
  const images: ExtractedImage[] = [];

  try {
    const operatorList = await page.getOperatorList();
    const pdfjs = await getPdfJs();
    const ops = (pdfjs as any).OPS || {};
    const imageOps = new Set([
      ops.paintImageXObject,
      ops.paintJpegXObject,
      ops.paintImageXObjectRepeat,
    ].filter(Boolean));

    for (let i = 0; i < operatorList.fnArray.length; i++) {
      const fn = operatorList.fnArray[i];
      if (!imageOps.has(fn)) continue;

      const imgName = operatorList.argsArray[i][0];
      if (!imgName) continue;

      try {
        const imgObj = await new Promise<any>((resolve) => {
          if (page.objs.has(imgName)) {
            page.objs.get(imgName, (obj: any) => resolve(obj));
          } else {
            resolve(null);
          }
        });

        if (!imgObj) continue;

        // Extract raw image bitmap or buffer
        if (imgObj.data && imgObj.width && imgObj.height) {
          const width = imgObj.width;
          const height = imgObj.height;

          // Convert RGBA / RGB data into PNG via OffscreenCanvas if available
          if (typeof OffscreenCanvas !== 'undefined') {
            const canvas = new OffscreenCanvas(width, height);
            const ctx = canvas.getContext('2d');
            if (ctx) {
              const imgData = ctx.createImageData(width, height);
              const srcData = imgObj.data;

              if (srcData.length === width * height * 4) {
                imgData.data.set(srcData);
              } else if (srcData.length === width * height * 3) {
                // RGB to RGBA
                let s = 0;
                let d = 0;
                while (s < srcData.length) {
                  imgData.data[d] = srcData[s];
                  imgData.data[d + 1] = srcData[s + 1];
                  imgData.data[d + 2] = srcData[s + 2];
                  imgData.data[d + 3] = 255;
                  s += 3;
                  d += 4;
                }
              }

              ctx.putImageData(imgData, 0, 0);
              const blob = await canvas.convertToBlob({ type: 'image/png' });
              const arrayBuffer = await blob.arrayBuffer();
              images.push({
                bytes: new Uint8Array(arrayBuffer),
                width: Math.min(width, 600),
                height: Math.min(height, 800),
              });
            }
          }
        }
      } catch (imgErr) {
        // Gracefully ignore corrupt or unsupported image formats
        console.warn(`[pdf-to-word] Skipped embedded image "${imgName}":`, imgErr);
      }
    }
  } catch (err) {
    console.warn('[pdf-to-word] Image extraction non-critical error:', err);
  }

  return images;
}

/**
 * Main conversion function: converts PDF file/buffer to a standard .docx Word document.
 */
export async function convertPdfToWord(
  fileOrData: File | ArrayBuffer | Uint8Array,
  options: PdfToWordOptions = {},
  onProgress?: (progress: number, status: string) => void,
  signal?: AbortSignal
): Promise<Blob> {
  if (signal?.aborted) {
    throw new DOMException('Operation aborted by user', 'AbortError');
  }

  // 1. File size check & warning (> 50MB)
  const byteLength =
    fileOrData instanceof File
      ? fileOrData.size
      : fileOrData instanceof ArrayBuffer
      ? fileOrData.byteLength
      : fileOrData.length;

  if (byteLength > 50 * 1024 * 1024) {
    console.warn('[pdf-to-word] Large PDF file (>50MB). Conversion runs in client RAM.');
  }

  let rawData: Uint8Array | ArrayBuffer;
  if (fileOrData instanceof File) {
    rawData = await fileOrData.arrayBuffer();
  } else if (fileOrData instanceof ArrayBuffer) {
    rawData = fileOrData;
  } else if (fileOrData instanceof Uint8Array) {
    rawData = new Uint8Array(fileOrData.buffer, fileOrData.byteOffset, fileOrData.byteLength);
  } else {
    rawData = new Uint8Array(fileOrData as ArrayLike<number>);
  }

  const pdfjs = await getPdfJs();
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

  onProgress?.(5, 'Loading PDF document...');

  let doc: any;
  try {
    const loadingTask = pdfjs.getDocument({
      data: rawData,
      password: options.password,
      cMapUrl: `${baseUrl}/cmaps/`,
      cMapPacked: true,
      standardFontDataUrl: `${baseUrl}/standard_fonts/`,
    });

    doc = await loadingTask.promise;
  } catch (err: any) {
    if (err?.name === 'PasswordException' || err?.message?.includes('password')) {
      throw new Error(
        'This PDF is password-protected. Please unlock it using the Unlock PDF tool first or provide the password.'
      );
    }
    if (err?.name === 'InvalidPDFException' || err?.message?.includes('corrupted') || err?.message?.includes('Invalid PDF')) {
      throw new Error('Unable to parse this PDF document. The file may be corrupted or unreadable.');
    }
    throw new Error(err?.message || 'Failed to open PDF document.');
  }

  const numPages = doc.numPages;
  if (numPages === 0) {
    throw new Error('This PDF has zero pages.');
  }

  const pageStructures: PageStructure[] = [];
  let totalTextItemsCount = 0;
  const allLinesForBodySize: ExtractedLine[] = [];

  // Pass 1: Extract text items and lines from all pages
  for (let p = 1; p <= numPages; p++) {
    if (signal?.aborted) {
      throw new DOMException('Operation aborted by user', 'AbortError');
    }

    const pct = Math.round(5 + (p / numPages) * 65);
    onProgress?.(pct, `Extracting page ${p} of ${numPages}...`);

    const page = await doc.getPage(p);
    const textContent = await page.getTextContent();
    const rawItems = textContent.items as Array<{
      str: string;
      transform: number[];
      width: number;
      height: number;
      fontName: string;
    }>;

    const extractedItems: ExtractedTextItem[] = [];

    for (const item of rawItems) {
      if (!item.str || item.str.trim() === '') continue;

      const scaleX = item.transform[0];
      const skewY = item.transform[1];
      const fontSize = Math.round(Math.hypot(scaleX, skewY) * 10) / 10 || 11;
      const x = Math.round(item.transform[4] * 10) / 10;
      const y = Math.round(item.transform[5] * 10) / 10;
      const fontName = item.fontName || '';

      extractedItems.push({
        text: item.str,
        x,
        y,
        width: item.width || fontSize * (item.str.length * 0.5),
        height: item.height || fontSize,
        fontSize,
        fontName,
        isBold: isFontBold(fontName),
        isItalic: isFontItalic(fontName),
      });
    }

    totalTextItemsCount += extractedItems.length;

    // Line grouping
    const lines = groupItemsIntoLines(extractedItems);
    allLinesForBodySize.push(...lines);

    // Image extraction (if enabled)
    let images: ExtractedImage[] = [];
    if (options.extractImages !== false) {
      images = await extractPageImages(page);
    }

    pageStructures.push({
      pageNumber: p,
      blocks: [], // filled in Pass 2
      images,
    });
  }

  // Detect scanned / image-only PDFs
  if (totalTextItemsCount === 0) {
    throw new Error(
      'No selectable text found in this PDF. It appears to be a scanned document or image-only file. PDF to Word requires selectable text.'
    );
  }

  // Pass 2: Calculate body font size and group into structured blocks
  const bodyFontSize = calculateBodyFontSize(allLinesForBodySize);

  let currentLineIndex = 0;
  for (let p = 0; p < numPages; p++) {
    const page = await doc.getPage(p + 1);
    const textContent = await page.getTextContent();
    const rawItems = textContent.items as Array<{
      str: string;
      transform: number[];
      width: number;
      height: number;
      fontName: string;
    }>;

    const pageItems: ExtractedTextItem[] = [];
    for (const item of rawItems) {
      if (!item.str || item.str.trim() === '') continue;
      const fontSize = Math.round(Math.hypot(item.transform[0], item.transform[1]) * 10) / 10 || 11;
      const x = Math.round(item.transform[4] * 10) / 10;
      const y = Math.round(item.transform[5] * 10) / 10;
      const fontName = item.fontName || '';
      pageItems.push({
        text: item.str,
        x,
        y,
        width: item.width || fontSize * (item.str.length * 0.5),
        height: item.height || fontSize,
        fontSize,
        fontName,
        isBold: isFontBold(fontName),
        isItalic: isFontItalic(fontName),
      });
    }

    const lines = groupItemsIntoLines(pageItems);
    pageStructures[p].blocks = groupLinesIntoBlocks(lines, bodyFontSize);
  }

  onProgress?.(75, 'Constructing Word (.docx) document...');

  // 3. Assemble DOCX with docx library
  const docxParagraphs: Paragraph[] = [];

  for (let p = 0; p < pageStructures.length; p++) {
    const page = pageStructures[p];

    // Page break before subsequent pages
    let isFirstBlockOnPage = true;

    // Render embedded images for this page
    for (const img of page.images) {
      try {
        const imageRun = new ImageRun({
          data: img.bytes,
          transformation: {
            width: Math.min(img.width, 500),
            height: Math.min(img.height, 400),
          },
          type: 'png',
        });

        docxParagraphs.push(
          new Paragraph({
            children: [imageRun],
            alignment: AlignmentType.CENTER,
            pageBreakBefore: isFirstBlockOnPage && p > 0,
            spacing: { after: 200 },
          })
        );
        isFirstBlockOnPage = false;
      } catch (err) {
        console.warn('[pdf-to-word] Failed to insert ImageRun:', err);
      }
    }

    // Render structured text blocks
    for (const block of page.blocks) {
      const pageBreakBefore = isFirstBlockOnPage && p > 0;
      isFirstBlockOnPage = false;

      const children = block.runs.map(
        (run) =>
          new TextRun({
            text: run.text,
            bold: run.isBold,
            italics: run.isItalic,
            size: run.fontSize ? Math.round(run.fontSize * 2) : 22, // docx uses half-points
          })
      );

      if (block.type === 'heading') {
        docxParagraphs.push(
          new Paragraph({
            children,
            heading: block.headingLevel || HeadingLevel.HEADING_2,
            pageBreakBefore,
            spacing: { before: 240, after: 120 },
          })
        );
      } else if (block.type === 'list-bullet') {
        docxParagraphs.push(
          new Paragraph({
            children,
            bullet: { level: 0 },
            pageBreakBefore,
            spacing: { after: 100 },
          })
        );
      } else {
        docxParagraphs.push(
          new Paragraph({
            children,
            pageBreakBefore,
            spacing: { after: 140 },
          })
        );
      }
    }
  }

  // If no paragraphs created, ensure at least one empty paragraph exists
  if (docxParagraphs.length === 0) {
    docxParagraphs.push(new Paragraph({ children: [new TextRun('Document content')] }));
  }

  onProgress?.(90, 'Packing .docx file...');

  const docxDoc = new Document({
    title: options.documentTitle || 'Converted Document',
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440, // 1 inch in dxa
              right: 1440,
              bottom: 1440,
              left: 1440,
            },
          },
        },
        children: docxParagraphs,
      },
    ],
  });

  const docxBlob = await Packer.toBlob(docxDoc);

  onProgress?.(100, 'Conversion complete!');
  return docxBlob;
}
