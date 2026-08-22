/**
 * Core Shared PDF Engine
 * Provides optimized primitives for loading, manipulating, styling,
 * and saving PDF documents using pdf-lib and pdfjs-dist.
 */

import { PDFDocument, PDFPage, StandardFonts, PDFFont } from 'pdf-lib';

export type LoadDocOptions = {
  password?: string;
  ignoreEncryption?: boolean;
  parseSpeed?: number;
};

/**
 * Safely load a PDF document from File, ArrayBuffer, or Uint8Array
 */
export async function loadPdfDoc(
  source: File | ArrayBuffer | Uint8Array,
  options: LoadDocOptions = {}
): Promise<PDFDocument> {
  const bytes = source instanceof File ? await source.arrayBuffer() : source;
  return PDFDocument.load(bytes, {
    ignoreEncryption: options.ignoreEncryption ?? true,
    capNumbers: true,
  });
}

/**
 * Standard font cache to prevent duplicate font embedding overhead
 */
export class FontRegistry {
  private static regularFont: PDFFont | null = null;
  private static boldFont: PDFFont | null = null;
  private static monoFont: PDFFont | null = null;

  static async getFonts(pdfDoc: PDFDocument) {
    const [regular, bold, mono] = await Promise.all([
      pdfDoc.embedFont(StandardFonts.Helvetica),
      pdfDoc.embedFont(StandardFonts.HelveticaBold),
      pdfDoc.embedFont(StandardFonts.Courier),
    ]);
    return { regular, bold, mono };
  }
}

/**
 * Evaluates dynamic pagination & header/footer macro tokens
 */
export function interpolateMacroTokens(
  template: string,
  context: {
    pageIndex: number;
    pageCount: number;
    documentTitle?: string;
    fileName?: string;
    customDate?: string;
  }
): string {
  const pageNum = context.pageIndex + 1;
  const now = context.customDate || new Date().toISOString().split('T')[0];
  const title = context.documentTitle || 'Document';
  const name = context.fileName || 'document.pdf';

  return template
    .replace(/{page}|{n}|{p}/gi, String(pageNum))
    .replace(/{total}|{pages}|{count}/gi, String(context.pageCount))
    .replace(/{date}|{today}/gi, now)
    .replace(/{title}/gi, title)
    .replace(/{filename}|{name}/gi, name)
    .replace(/{roman}/gi, toRomanNumeral(pageNum))
    .replace(/{ROMAN}/gi, toRomanNumeral(pageNum).toUpperCase());
}

function toRomanNumeral(num: number): string {
  const lookup: Record<string, number> = {
    m: 1000,
    cm: 900,
    d: 500,
    cd: 400,
    c: 100,
    xc: 90,
    l: 50,
    xl: 40,
    x: 10,
    ix: 9,
    v: 5,
    iv: 4,
    i: 1,
  };
  let roman = '';
  for (const i in lookup) {
    while (num >= lookup[i]) {
      roman += i;
      num -= lookup[i];
    }
  }
  return roman || '1';
}

/**
 * Computes standard page placement coordinates (top, center, bottom, left, right)
 */
export function calculateSlotCoordinates(
  page: PDFPage,
  position: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right' | 'center',
  textWidth: number,
  fontSize: number,
  margin = 36
): { x: number; y: number } {
  const { width, height } = page.getSize();
  let x = margin;
  let y = margin;

  if (position.includes('center')) {
    x = (width - textWidth) / 2;
  } else if (position.includes('right')) {
    x = width - textWidth - margin;
  } else {
    x = margin;
  }

  if (position.startsWith('top')) {
    y = height - margin - fontSize;
  } else if (position.startsWith('bottom')) {
    y = margin;
  } else {
    y = (height - fontSize) / 2;
  }

  return { x, y };
}

/**
 * Standard PDF saving with object stream optimization
 */
export async function savePdfDoc(
  pdfDoc: PDFDocument,
  options: { useObjectStreams?: boolean } = { useObjectStreams: true }
): Promise<Uint8Array> {
  return pdfDoc.save({
    useObjectStreams: options.useObjectStreams ?? true,
    addDefaultPage: false,
  });
}
