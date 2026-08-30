import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export interface HeaderFooterOptions {
  headerLeft?: string;
  headerCenter?: string;
  headerRight?: string;
  footerLeft?: string;
  footerCenter?: string;
  footerRight?: string;
  margin?: number; // default 25 pt
  fontSize?: number; // default 10 pt
  color?: string; // hex
  skipFirstPage?: boolean;
  documentTitle?: string;
  shrinkToFit?: boolean; // Scales and shifts page content down so headers/footers never overlap
}

function parseHexColor(hex = '#4b5563') {
  const clean = hex.replace('#', '').trim();
  if (clean.length === 3) {
    const r = parseInt(clean[0] + clean[0], 16) / 255;
    const g = parseInt(clean[1] + clean[1], 16) / 255;
    const b = parseInt(clean[2] + clean[2], 16) / 255;
    return rgb(r || 0, g || 0, b || 0);
  }
  const intVal = parseInt(clean.slice(0, 6), 16);
  if (Number.isNaN(intVal)) return rgb(0.3, 0.3, 0.3);
  return rgb(
    ((intVal >> 16) & 255) / 255,
    ((intVal >> 8) & 255) / 255,
    (intVal & 255) / 255
  );
}

function replaceMacros(
  raw: string,
  pageIndex: number,
  totalCount: number,
  title: string
): string {
  const today = new Date().toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  return raw
    .replace(/\{page\}/gi, String(pageIndex + 1))
    .replace(/\{total\}/gi, String(totalCount))
    .replace(/\{date\}/gi, today)
    .replace(/\{title\}/gi, title);
}

export async function addHeadersFootersToPdf(
  fileOrData: File | ArrayBuffer | Uint8Array,
  options: HeaderFooterOptions = {}
): Promise<Uint8Array> {
  const arrayBuffer =
    fileOrData instanceof File ? await fileOrData.arrayBuffer() : fileOrData;
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const pages = pdfDoc.getPages();
  const totalPages = pages.length;

  const margin = Math.max(10, options.margin ?? 25);
  const fontSize = options.fontSize ?? 9;
  const color = parseHexColor(options.color ?? '#4b5563');
  const skipFirst = options.skipFirstPage ?? false;
  const title =
    options.documentTitle ||
    (fileOrData instanceof File ? fileOrData.name.replace(/\.pdf$/i, '') : 'Document');

  pages.forEach((page, index) => {
    if (skipFirst && index === 0) return;
    const { width, height } = page.getSize();

    if (options.shrinkToFit) {
      // Scale page content down to 92% and translate downwards to guarantee header and footer margins
      const scaleFactor = 0.92;
      page.scaleContent(scaleFactor, scaleFactor);
      const shiftX = (width * (1 - scaleFactor)) / 2;
      const shiftY = (height * (1 - scaleFactor)) / 2 - 12;
      page.translateContent(shiftX, shiftY);
    }

    // Top Header
    const topY = height - margin - fontSize;

    if (options.headerLeft) {
      const text = replaceMacros(options.headerLeft, index, totalPages, title);
      page.drawText(text, { x: margin, y: topY, size: fontSize, font, color });
    }

    if (options.headerCenter) {
      const text = replaceMacros(options.headerCenter, index, totalPages, title);
      const textWidth = font.widthOfTextAtSize(text, fontSize);
      page.drawText(text, {
        x: (width - textWidth) / 2,
        y: topY,
        size: fontSize,
        font,
        color,
      });
    }

    if (options.headerRight) {
      const text = replaceMacros(options.headerRight, index, totalPages, title);
      const textWidth = font.widthOfTextAtSize(text, fontSize);
      page.drawText(text, {
        x: width - margin - textWidth,
        y: topY,
        size: fontSize,
        font,
        color,
      });
    }

    // Bottom Footer
    const botY = margin;

    if (options.footerLeft) {
      const text = replaceMacros(options.footerLeft, index, totalPages, title);
      page.drawText(text, { x: margin, y: botY, size: fontSize, font, color });
    }

    if (options.footerCenter) {
      const text = replaceMacros(options.footerCenter, index, totalPages, title);
      const textWidth = font.widthOfTextAtSize(text, fontSize);
      page.drawText(text, {
        x: (width - textWidth) / 2,
        y: botY,
        size: fontSize,
        font,
        color,
      });
    }

    if (options.footerRight) {
      const text = replaceMacros(options.footerRight, index, totalPages, title);
      const textWidth = font.widthOfTextAtSize(text, fontSize);
      page.drawText(text, {
        x: width - margin - textWidth,
        y: botY,
        size: fontSize,
        font,
        color,
      });
    }
  });

  return pdfDoc.save({ useObjectStreams: true });
}
