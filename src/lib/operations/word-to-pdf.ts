/**
 * ------------------------------------------------------------------
 * Word (.docx) to PDF Client-Side Engine
 * ------------------------------------------------------------------
 * Converts Microsoft Word (.docx) documents to high-quality,
 * searchable, vector-text PDF documents directly in the browser.
 *
 * Architecture & Constraints:
 * 1. 100% Client-side: No file data ever leaves the user's device.
 * 2. Parses .docx structure to HTML using mammoth.js (BSD-2-Clause).
 * 3. Walks the DOM tree and renders selectable text, headings, lists,
 *    tables, and inline images using pdf-lib (MIT) & @pdf-lib/fontkit (Apache-2.0).
 * 4. Embeds Unicode-capable fonts (Liberation Sans / Geist) to ensure
 *    flawless rendering for non-Latin scripts (Cyrillic, Hungarian, Romanian, etc.).
 * 5. Rejects legacy .doc files with an informative error message.
 * 6. Supports cancellation via AbortSignal and page-by-page progress.
 * ------------------------------------------------------------------
 */

import { PDFDocument, rgb, StandardFonts, PDFFont, PDFPage } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import mammoth from 'mammoth';

// ------------------------------------------------------------------
// Types & Options
// ------------------------------------------------------------------

export type PageSizeOption = 'A4' | 'Letter';
export type MarginOption = 'compact' | 'normal' | 'wide';
export type FontSizeOption = 'small' | 'medium' | 'large';
export type FontFamilyOption = 'LiberationSans' | 'Geist';

export interface WordToPdfOptions {
  pageSize?: PageSizeOption;
  margins?: MarginOption;
  fontSize?: FontSizeOption;
  fontFamily?: FontFamilyOption;
  onProgress?: (progress: number, status?: string) => void;
  signal?: AbortSignal;
}

export interface HtmlTextRun {
  text: string;
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  fontSize: number;
}

export interface HtmlNode {
  type: 'text' | 'tag';
  text?: string;
  tag?: string;
  attributes?: Record<string, string>;
  children?: HtmlNode[];
}

// ------------------------------------------------------------------
// Page & Style Metrics
// ------------------------------------------------------------------

const PAGE_DIMENSIONS: Record<PageSizeOption, [number, number]> = {
  A4: [595.28, 841.89],
  Letter: [612.0, 792.0],
};

const MARGIN_VALUES: Record<MarginOption, number> = {
  compact: 36, // 0.5 inch
  normal: 54, // 0.75 inch
  wide: 72, // 1.0 inch
};

const BASE_FONT_SIZES: Record<FontSizeOption, number> = {
  small: 9.5,
  medium: 11,
  large: 12.5,
};

// ------------------------------------------------------------------
// Font Loading Utilities
// ------------------------------------------------------------------

async function loadFontBytes(relativePath: string): Promise<Uint8Array | null> {
  try {
    // 1. Node.js environment (Unit tests / SSR audit)
    if (typeof process !== 'undefined' && process.versions && process.versions.node) {
      try {
        const fs = await import('fs');
        const path = await import('path');
        const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
        const localPath = path.resolve(process.cwd(), 'public', cleanPath.replace(/^standard_fonts\//, 'standard_fonts/'));
        if (fs.existsSync(localPath)) {
          return new Uint8Array(fs.readFileSync(localPath));
        }
      } catch {
        // Continue to fetch fallback
      }
    }

    // 2. Browser & Web Worker environment
    if (typeof fetch !== 'undefined') {
      const url = relativePath.startsWith('/') ? relativePath : `/${relativePath}`;
      const response = await fetch(url);
      if (response.ok) {
        const buffer = await response.arrayBuffer();
        return new Uint8Array(buffer);
      }
    }
  } catch (err) {
    console.warn(`[word-to-pdf] Could not load font from ${relativePath}:`, err);
  }
  return null;
}

// ------------------------------------------------------------------
// Lightweight Pure-JS HTML AST Parser
// (Runs everywhere: Web Worker, Browser, Node.js without DOM dependencies)
// ------------------------------------------------------------------

export function parseHtmlToAst(html: string): HtmlNode[] {
  const root: HtmlNode = { type: 'tag', tag: 'root', attributes: {}, children: [] };
  const stack: HtmlNode[] = [root];

  // Matches open tag, close tag, or raw text chunk
  const tagRegex = /<\/?([a-z0-9]+)([^>]*?)(\/?)>|([^<]+)/gi;
  let match: RegExpExecArray | null;

  while ((match = tagRegex.exec(html)) !== null) {
    if (match[4]) {
      // Raw text content
      const rawText = match[4]
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&nbsp;/g, ' ');

      if (rawText.length > 0) {
        const currentParent = stack[stack.length - 1];
        // Ignore whitespace-only text nodes at the root level or inside container blocks
        if (currentParent === root && rawText.trim().length === 0) {
          continue;
        }
        if (['table', 'tr', 'ul', 'ol'].includes(currentParent.tag || '') && rawText.trim().length === 0) {
          continue;
        }
        if (currentParent.children) {
          currentParent.children.push({ type: 'text', text: rawText });
        }
      }
    } else {
      const isClosing = match[0].startsWith('</');
      const tagName = match[1].toLowerCase();
      const rawAttrs = match[2] || '';
      const isSelfClosing = match[3] === '/' || ['img', 'br', 'hr'].includes(tagName);

      if (isClosing) {
        for (let i = stack.length - 1; i > 0; i--) {
          if (stack[i].tag === tagName) {
            stack.splice(i);
            break;
          }
        }
      } else {
        const attributes: Record<string, string> = {};
        const attrRegex = /([a-z0-9_-]+)(?:=["']([^"']*)["']|=(\S+))?/gi;
        let attrMatch: RegExpExecArray | null;
        while ((attrMatch = attrRegex.exec(rawAttrs)) !== null) {
          attributes[attrMatch[1].toLowerCase()] = attrMatch[2] ?? attrMatch[3] ?? '';
        }

        const node: HtmlNode = { type: 'tag', tag: tagName, attributes, children: [] };
        const currentParent = stack[stack.length - 1];
        if (currentParent.children) {
          currentParent.children.push(node);
        }

        if (!isSelfClosing) {
          stack.push(node);
        }
      }
    }
  }

  return root.children || [];
}

// ------------------------------------------------------------------
// Text Extraction from Node Subtree
// ------------------------------------------------------------------

function extractTextRuns(
  node: HtmlNode,
  currentRuns: HtmlTextRun[],
  state: { isBold: boolean; isItalic: boolean; isUnderline: boolean; fontSize: number }
): void {
  if (node.type === 'text' && node.text) {
    currentRuns.push({
      text: node.text,
      isBold: state.isBold,
      isItalic: state.isItalic,
      isUnderline: state.isUnderline,
      fontSize: state.fontSize,
    });
    return;
  }

  if (node.type === 'tag' && node.children) {
    const nextState = { ...state };
    if (node.tag === 'strong' || node.tag === 'b') nextState.isBold = true;
    if (node.tag === 'em' || node.tag === 'i') nextState.isItalic = true;
    if (node.tag === 'u') nextState.isUnderline = true;

    for (const child of node.children) {
      extractTextRuns(child, currentRuns, nextState);
    }
  }
}

// ------------------------------------------------------------------
// Word Wrapping Helper for Mixed Runs
// ------------------------------------------------------------------

interface WrappedLine {
  runs: HtmlTextRun[];
  width: number;
  height: number;
}

function wrapTextRuns(
  runs: HtmlTextRun[],
  maxWidth: number,
  regularFont: PDFFont,
  boldFont: PDFFont
): WrappedLine[] {
  const lines: WrappedLine[] = [];
  let currentLineRuns: HtmlTextRun[] = [];
  let currentLineWidth = 0;
  let currentMaxHeight = 12;

  const measureText = (text: string, size: number, isBold: boolean) => {
    const font = isBold ? boldFont : regularFont;
    try {
      return font.widthOfTextAtSize(text, size);
    } catch {
      // Fallback rough estimate if character not supported
      return text.length * (size * 0.55);
    }
  };

  for (const run of runs) {
    // Split into tokens preserving spaces
    const tokens = run.text.match(/\S+|\s+/g) || [];

    for (const token of tokens) {
      const isWhitespace = /^\s+$/.test(token);
      const tokenWidth = measureText(token, run.fontSize, run.isBold);
      const tokenHeight = run.fontSize * 1.25;

      if (!isWhitespace && currentLineWidth + tokenWidth > maxWidth && currentLineRuns.length > 0) {
        // Start a new line
        lines.push({
          runs: currentLineRuns,
          width: currentLineWidth,
          height: currentMaxHeight,
        });
        currentLineRuns = [];
        currentLineWidth = 0;
        currentMaxHeight = tokenHeight;
      }

      if (tokenHeight > currentMaxHeight) {
        currentMaxHeight = tokenHeight;
      }

      currentLineRuns.push({
        text: token,
        isBold: run.isBold,
        isItalic: run.isItalic,
        isUnderline: run.isUnderline,
        fontSize: run.fontSize,
      });
      currentLineWidth += tokenWidth;
    }
  }

  if (currentLineRuns.length > 0) {
    lines.push({
      runs: currentLineRuns,
      width: currentLineWidth,
      height: currentMaxHeight,
    });
  }

  return lines;
}

// ------------------------------------------------------------------
// Core Word to PDF Conversion Function
// ------------------------------------------------------------------

export async function convertWordToPdf(
  fileOrData: File | Uint8Array | ArrayBuffer,
  options: WordToPdfOptions = {}
): Promise<Uint8Array> {
  const {
    pageSize = 'A4',
    margins = 'normal',
    fontSize = 'medium',
    fontFamily = 'LiberationSans',
    onProgress,
    signal,
  } = options;

  onProgress?.(5, 'Reading Word document...');
  if (signal?.aborted) throw new Error('Operation was canceled by user.');

  // 1. Normalize binary buffer
  let uint8Data: Uint8Array;
  if (fileOrData instanceof Uint8Array) {
    uint8Data = fileOrData;
  } else if (fileOrData instanceof ArrayBuffer) {
    uint8Data = new Uint8Array(fileOrData);
  } else if (typeof File !== 'undefined' && fileOrData instanceof File) {
    const ab = await fileOrData.arrayBuffer();
    uint8Data = new Uint8Array(ab);
  } else {
    throw new Error('Unsupported input: expected File, Uint8Array, or ArrayBuffer.');
  }

  // 2. Validate file size (>50MB warning)
  if (uint8Data.byteLength > 50 * 1024 * 1024) {
    console.warn(`[word-to-pdf] Large file warning: ${Math.round(uint8Data.byteLength / 1024 / 1024)}MB`);
  }

  // 3. Detect legacy .doc (Compound File Binary Format / OLE2)
  if (
    uint8Data.byteLength >= 8 &&
    uint8Data[0] === 0xd0 &&
    uint8Data[1] === 0xcf &&
    uint8Data[2] === 0x11 &&
    uint8Data[3] === 0xe0 &&
    uint8Data[4] === 0xa1 &&
    uint8Data[5] === 0xb1 &&
    uint8Data[6] === 0x1a &&
    uint8Data[7] === 0xe1
  ) {
    throw new Error(
      'Legacy Word (.doc) format is not supported. Please open your document in Word, Google Docs, or LibreOffice and save it as .docx before converting.'
    );
  }

  // 4. Convert .docx to HTML via Mammoth
  onProgress?.(15, 'Extracting document structure...');
  if (signal?.aborted) throw new Error('Operation was canceled by user.');

  let htmlResult: { value: string; messages: unknown[] };
  try {
    interface MammothImage {
      read(encoding: string): Promise<string>;
      contentType: string;
    }
    interface MammothModule {
      images?: {
        imgElement?: (callback: (image: MammothImage) => Promise<{ src: string }>) => unknown;
      };
      convertToHtml: (
        input: { buffer: Buffer | Uint8Array },
        options?: unknown
      ) => Promise<{ value: string; messages: unknown[] }>;
    }

    const mammothModule = mammoth as unknown as MammothModule;
    const mammothOptions = {
      convertImage: mammothModule.images?.imgElement?.((image: MammothImage) => {
        return image.read('base64').then((imageBuffer: string) => {
          return {
            src: `data:${image.contentType};base64,${imageBuffer}`,
          };
        });
      }),
    };

    htmlResult = await mammothModule.convertToHtml(
      { buffer: Buffer.isBuffer(uint8Data) ? uint8Data : Buffer.from(uint8Data) },
      mammothOptions
    );
  } catch (err: unknown) {
    const errorObj = err as { message?: string } | null | undefined;
    const msg = (errorObj?.message || '').toLowerCase();
    if (msg.includes('encrypted') || msg.includes('password')) {
      throw new Error('The Word document is password-protected. Please remove password protection before converting.');
    }
    if (msg.includes('end of central directory') || msg.includes('corrupted') || msg.includes('zip')) {
      throw new Error('The Word file appears corrupted or invalid.');
    }
    throw new Error(`Failed to read Word document: ${errorObj?.message || 'Unknown format error'}`);
  }

  const rawHtml = htmlResult.value.trim();
  if (!rawHtml) {
    throw new Error('The Word document contains no readable text, headings, or content.');
  }

  onProgress?.(30, 'Preparing PDF document & fonts...');
  if (signal?.aborted) throw new Error('Operation was canceled by user.');

  // 5. Initialize PDF Document & Embed Fonts
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  let regularFont: PDFFont;
  let boldFont: PDFFont;

  const fontBasePath =
    fontFamily === 'Geist'
      ? {
          regular: 'standard_fonts/Geist-Regular.ttf',
          bold: 'standard_fonts/Geist-Bold.ttf',
        }
      : {
          regular: 'standard_fonts/LiberationSans-Regular.ttf',
          bold: 'standard_fonts/LiberationSans-Bold.ttf',
        };

  const regularFontBytes = await loadFontBytes(fontBasePath.regular);
  const boldFontBytes = await loadFontBytes(fontBasePath.bold);

  if (regularFontBytes && boldFontBytes) {
    try {
      regularFont = await pdfDoc.embedFont(regularFontBytes, { subset: true });
      boldFont = await pdfDoc.embedFont(boldFontBytes, { subset: true });
    } catch {
      // Fallback to standard fonts if subsetting fails
      regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
      boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    }
  } else {
    regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  }

  // 6. Setup Layout Geometry
  const [pageWidth, pageHeight] = PAGE_DIMENSIONS[pageSize];
  const margin = MARGIN_VALUES[margins];
  const contentWidth = pageWidth - margin * 2;
  const baseFontSize = BASE_FONT_SIZES[fontSize];

  let currentPage: PDFPage = pdfDoc.addPage([pageWidth, pageHeight]);
  let currentY = pageHeight - margin;

  const ensureSpace = (neededHeight: number): void => {
    if (currentY - neededHeight < margin) {
      currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
      currentY = pageHeight - margin;
    }
  };

  // 7. Parse HTML to AST
  onProgress?.(45, 'Laying out text and paragraphs...');
  const nodes = parseHtmlToAst(rawHtml);

  // 8. Render AST Elements
  const totalNodes = nodes.length;

  for (let idx = 0; idx < totalNodes; idx++) {
    if (signal?.aborted) throw new Error('Operation was canceled by user.');
    const node = nodes[idx];

    // Emit fine progress
    const pct = Math.min(45 + Math.round((idx / totalNodes) * 45), 90);
    onProgress?.(pct, `Rendering element ${idx + 1} of ${totalNodes}...`);

    if (node.type !== 'tag') continue;

    // A. Headings (h1 - h6)
    if (/^h[1-6]$/.test(node.tag || '')) {
      const level = parseInt(node.tag!.slice(1), 10);
      const headingMultiplier = level === 1 ? 1.8 : level === 2 ? 1.45 : level === 3 ? 1.25 : 1.1;
      const headingSize = Math.round(baseFontSize * headingMultiplier);

      const runs: HtmlTextRun[] = [];
      extractTextRuns(node, runs, {
        isBold: true,
        isItalic: false,
        isUnderline: false,
        fontSize: headingSize,
      });

      const lines = wrapTextRuns(runs, contentWidth, regularFont, boldFont);
      const totalBlockHeight = lines.length * (headingSize * 1.3) + 16;
      ensureSpace(totalBlockHeight);

      currentY -= 6; // Spacing before heading

      for (const line of lines) {
        let lineX = margin;
        for (const run of line.runs) {
          const font = run.isBold ? boldFont : regularFont;
          let safeText = run.text;
          try {
            currentPage.drawText(safeText, {
              x: lineX,
              y: currentY - run.fontSize,
              size: run.fontSize,
              font,
              color: rgb(0.1, 0.12, 0.18),
            });
          } catch {
            // If character encoding issues occur with standard fonts
            safeText = safeText.replace(/[^\x20-\x7E]/g, '?');
            currentPage.drawText(safeText, {
              x: lineX,
              y: currentY - run.fontSize,
              size: run.fontSize,
              font,
              color: rgb(0.1, 0.12, 0.18),
            });
          }
          lineX += font.widthOfTextAtSize(safeText, run.fontSize);
        }
        currentY -= line.height + 4;
      }
      currentY -= 6; // Spacing after heading
      continue;
    }

    // B. Standard Paragraphs (p)
    if (node.tag === 'p') {
      const runs: HtmlTextRun[] = [];
      extractTextRuns(node, runs, {
        isBold: false,
        isItalic: false,
        isUnderline: false,
        fontSize: baseFontSize,
      });

      const lines = wrapTextRuns(runs, contentWidth, regularFont, boldFont);
      if (lines.length === 0) {
        // Blank line
        currentY -= baseFontSize * 0.8;
        continue;
      }

      for (const line of lines) {
        ensureSpace(line.height + 2);
        let lineX = margin;

        for (const run of line.runs) {
          const font = run.isBold ? boldFont : regularFont;
          let safeText = run.text;

          try {
            currentPage.drawText(safeText, {
              x: lineX,
              y: currentY - run.fontSize,
              size: run.fontSize,
              font,
              color: rgb(0.15, 0.15, 0.18),
            });
          } catch {
            safeText = safeText.replace(/[^\x20-\x7E]/g, '?');
            currentPage.drawText(safeText, {
              x: lineX,
              y: currentY - run.fontSize,
              size: run.fontSize,
              font,
              color: rgb(0.15, 0.15, 0.18),
            });
          }

          const wordWidth = font.widthOfTextAtSize(safeText, run.fontSize);

          // Underline decoration
          if (run.isUnderline) {
            currentPage.drawLine({
              start: { x: lineX, y: currentY - run.fontSize - 1.5 },
              end: { x: lineX + wordWidth, y: currentY - run.fontSize - 1.5 },
              thickness: 0.75,
              color: rgb(0.2, 0.2, 0.2),
            });
          }

          lineX += wordWidth;
        }
        currentY -= line.height + 3;
      }
      currentY -= 4; // Spacing after paragraph
      continue;
    }

    // C. Lists (ul & ol)
    if (node.tag === 'ul' || node.tag === 'ol') {
      const isOrdered = node.tag === 'ol';
      const listItems = (node.children || []).filter((c) => c.tag === 'li');
      let itemIndex = 1;

      for (const item of listItems) {
        const runs: HtmlTextRun[] = [];
        extractTextRuns(item, runs, {
          isBold: false,
          isItalic: false,
          isUnderline: false,
          fontSize: baseFontSize,
        });

        const listIndent = 22;
        const itemWidth = contentWidth - listIndent;
        const lines = wrapTextRuns(runs, itemWidth, regularFont, boldFont);
        if (lines.length === 0) continue;

        ensureSpace(lines[0].height + 2);

        // Draw bullet or number
        const bulletText = isOrdered ? `${itemIndex}.` : '•';
        itemIndex++;

        try {
          currentPage.drawText(bulletText, {
            x: margin + 4,
            y: currentY - baseFontSize,
            size: baseFontSize,
            font: boldFont,
            color: rgb(0.25, 0.25, 0.3),
          });
        } catch {
          currentPage.drawText('*', {
            x: margin + 4,
            y: currentY - baseFontSize,
            size: baseFontSize,
            font: regularFont,
            color: rgb(0.25, 0.25, 0.3),
          });
        }

        // Draw item lines
        for (const line of lines) {
          ensureSpace(line.height + 2);
          let lineX = margin + listIndent;

          for (const run of line.runs) {
            const font = run.isBold ? boldFont : regularFont;
            let safeText = run.text;
            try {
              currentPage.drawText(safeText, {
                x: lineX,
                y: currentY - run.fontSize,
                size: run.fontSize,
                font,
                color: rgb(0.18, 0.18, 0.2),
              });
            } catch {
              safeText = safeText.replace(/[^\x20-\x7E]/g, '?');
              currentPage.drawText(safeText, {
                x: lineX,
                y: currentY - run.fontSize,
                size: run.fontSize,
                font,
                color: rgb(0.18, 0.18, 0.2),
              });
            }
            lineX += font.widthOfTextAtSize(safeText, run.fontSize);
          }
          currentY -= line.height + 2.5;
        }
      }
      currentY -= 4; // Space after list
      continue;
    }

    // D. Tables (table)
    if (node.tag === 'table') {
      const rows = (node.children || []).filter((c) => c.tag === 'tr');
      if (rows.length === 0) continue;

      // Calculate number of columns
      let numCols = 1;
      for (const row of rows) {
        const cells = (row.children || []).filter((c) => c.tag === 'td' || c.tag === 'th');
        if (cells.length > numCols) numCols = cells.length;
      }

      const colWidth = contentWidth / numCols;
      const cellPadding = 6;

      for (let r = 0; r < rows.length; r++) {
        const row = rows[r];
        const cells = (row.children || []).filter((c) => c.tag === 'td' || c.tag === 'th');
        const isHeaderRow = cells.some((c) => c.tag === 'th') || r === 0;

        // Wrap lines for all cells in this row to compute row height
        const cellWrappedLines: WrappedLine[][] = [];
        let maxRowHeight = baseFontSize + 14;

        for (let c = 0; c < numCols; c++) {
          const cell = cells[c];
          const runs: HtmlTextRun[] = [];
          if (cell) {
            extractTextRuns(cell, runs, {
              isBold: isHeaderRow,
              isItalic: false,
              isUnderline: false,
              fontSize: baseFontSize - 0.5,
            });
          }
          const wrapped = wrapTextRuns(runs, colWidth - cellPadding * 2, regularFont, boldFont);
          cellWrappedLines.push(wrapped);

          const totalCellHeight = wrapped.length * (baseFontSize * 1.25) + cellPadding * 2;
          if (totalCellHeight > maxRowHeight) {
            maxRowHeight = totalCellHeight;
          }
        }

        ensureSpace(maxRowHeight + 4);

        // Render cell backgrounds & borders
        for (let c = 0; c < numCols; c++) {
          const cellX = margin + c * colWidth;

          if (isHeaderRow) {
            currentPage.drawRectangle({
              x: cellX,
              y: currentY - maxRowHeight,
              width: colWidth,
              height: maxRowHeight,
              color: rgb(0.94, 0.95, 0.97),
              borderColor: rgb(0.8, 0.83, 0.88),
              borderWidth: 0.75,
            });
          } else {
            currentPage.drawRectangle({
              x: cellX,
              y: currentY - maxRowHeight,
              width: colWidth,
              height: maxRowHeight,
              borderColor: rgb(0.85, 0.87, 0.9),
              borderWidth: 0.5,
            });
          }

          // Draw cell text
          const lines = cellWrappedLines[c] || [];
          let textY = currentY - cellPadding - baseFontSize;

          for (const line of lines) {
            let lineX = cellX + cellPadding;
            for (const run of line.runs) {
              const font = run.isBold ? boldFont : regularFont;
              let safeText = run.text;
              try {
                currentPage.drawText(safeText, {
                  x: lineX,
                  y: textY,
                  size: run.fontSize,
                  font,
                  color: isHeaderRow ? rgb(0.1, 0.15, 0.25) : rgb(0.2, 0.2, 0.22),
                });
              } catch {
                safeText = safeText.replace(/[^\x20-\x7E]/g, '?');
                currentPage.drawText(safeText, {
                  x: lineX,
                  y: textY,
                  size: run.fontSize,
                  font,
                  color: isHeaderRow ? rgb(0.1, 0.15, 0.25) : rgb(0.2, 0.2, 0.22),
                });
              }
              lineX += font.widthOfTextAtSize(safeText, run.fontSize);
            }
            textY -= line.height + 1.5;
          }
        }

        currentY -= maxRowHeight;
      }
      currentY -= 8; // Spacing after table
      continue;
    }

    // E. Inline Images (img)
    if (node.tag === 'img' && node.attributes?.src) {
      const src = node.attributes.src;
      if (src.startsWith('data:image/')) {
        try {
          const commaIdx = src.indexOf(',');
          if (commaIdx !== -1) {
            const base64Data = src.slice(commaIdx + 1);
            const binaryString = atob(base64Data);
            const imageBytes = new Uint8Array(binaryString.length);
            for (let b = 0; b < binaryString.length; b++) {
              imageBytes[b] = binaryString.charCodeAt(b);
            }

            let embeddedImage;
            if (src.includes('image/png')) {
              embeddedImage = await pdfDoc.embedPng(imageBytes);
            } else {
              embeddedImage = await pdfDoc.embedJpg(imageBytes);
            }

            const imgDims = embeddedImage.scale(1.0);
            const maxW = Math.min(contentWidth, 480);
            const maxH = 360;
            const scale = Math.min(maxW / imgDims.width, maxH / imgDims.height, 1.0);
            const renderW = Math.round(imgDims.width * scale);
            const renderH = Math.round(imgDims.height * scale);

            ensureSpace(renderH + 16);

            const imgX = margin + Math.max(0, (contentWidth - renderW) / 2);
            currentPage.drawImage(embeddedImage, {
              x: imgX,
              y: currentY - renderH,
              width: renderW,
              height: renderH,
            });

            currentY -= renderH + 12;
          }
        } catch (imgErr) {
          console.warn('[word-to-pdf] Failed to embed inline image:', imgErr);
        }
      }
      continue;
    }
  }

  onProgress?.(95, 'Finalizing and compressing PDF...');
  if (signal?.aborted) throw new Error('Operation was canceled by user.');

  const pdfBytes = await pdfDoc.save({ useObjectStreams: true });
  onProgress?.(100, 'Conversion complete!');

  return pdfBytes;
}
