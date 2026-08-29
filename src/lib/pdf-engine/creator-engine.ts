/**
 * Shared PDF Creator Engine
 * High-performance, client-side PDF document generation built on pdf-lib.
 * Powers the visual blank-canvas Creator, Sign PDF, Form Filler, and Document Tools.
 */

import {
  PDFDocument,
  StandardFonts,
  rgb,
  RGB,
  PDFFont,
  PDFPage,
} from 'pdf-lib';

export type PageFormat = 'a4' | 'letter' | 'legal' | 'a3' | 'a5';
export type PageOrientation = 'portrait' | 'landscape';
export type ElementType = 'text' | 'image' | 'shape' | 'table';
export type FontFamily = 'Helvetica' | 'Times' | 'Courier';
export type TextAlignment = 'left' | 'center' | 'right';
export type ShapeType = 'rectangle' | 'circle' | 'line';

export interface BaseElement {
  id: string;
  type: ElementType;
  x: number; // Top-left origin in points
  y: number; // Top-left origin in points
  width: number;
  height: number;
}

export interface TextElement extends BaseElement {
  type: 'text';
  text: string;
  font?: FontFamily;
  fontSize?: number;
  color?: string; // Hex color code e.g. '#000000'
  alignment?: TextAlignment;
  bold?: boolean;
  italic?: boolean;
  lineHeight?: number; // Multiplier, e.g. 1.25
}

export interface ImageElement extends BaseElement {
  type: 'image';
  dataUrl: string; // PNG or JPEG base64 data URL
  opacity?: number; // 0 to 1
}

export interface ShapeElement extends BaseElement {
  type: 'shape';
  shapeType: ShapeType;
  fillColor?: string; // Hex color or 'transparent'
  strokeColor?: string; // Hex color
  strokeWidth?: number;
  borderRadius?: number;
  opacity?: number;
}

export interface TableElement extends BaseElement {
  type: 'table';
  rows: string[][];
  columnWidths?: number[]; // In points, or auto-distributed if omitted
  headerBackground?: string;
  headerTextColor?: string;
  cellBorders?: boolean;
  borderColor?: string;
  fontSize?: number;
  textColor?: string;
  cellPadding?: number;
}

export type CanvasElement = TextElement | ImageElement | ShapeElement | TableElement;

export interface PageModel {
  id: string;
  format: PageFormat;
  orientation: PageOrientation;
  elements: CanvasElement[];
  backgroundColor?: string;
}

export interface DocumentModel {
  title?: string;
  author?: string;
  subject?: string;
  pages: PageModel[];
}

/** Standard dimensions in PDF points (72 points = 1 inch) */
export const PAGE_DIMENSIONS: Record<PageFormat, { width: number; height: number }> = {
  a4: { width: 595.28, height: 841.89 },
  letter: { width: 612.0, height: 792.0 },
  legal: { width: 612.0, height: 1008.0 },
  a3: { width: 841.89, height: 1190.55 },
  a5: { width: 419.53, height: 595.28 },
};

/** Get page dimensions respecting orientation */
export function getPageSize(format: PageFormat = 'a4', orientation: PageOrientation = 'portrait'): {
  width: number;
  height: number;
} {
  const base = PAGE_DIMENSIONS[format] || PAGE_DIMENSIONS.a4;
  if (orientation === 'landscape') {
    return { width: Math.max(base.width, base.height), height: Math.min(base.width, base.height) };
  }
  return { width: Math.min(base.width, base.height), height: Math.max(base.width, base.height) };
}

/** Convert CSS Hex color (#rrggbb or #rgb) to pdf-lib RGB (0 to 1) */
export function hexToRgb(hex?: string): RGB | null {
  if (!hex || hex === 'transparent' || hex === 'none') return null;
  let clean = hex.replace(/^#/, '').trim();
  if (clean.length === 3) {
    clean = clean.split('').map((c) => c + c).join('');
  }
  if (clean.length !== 6) return rgb(0, 0, 0);

  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  return rgb(
    isNaN(r) ? 0 : Math.min(1, Math.max(0, r)),
    isNaN(g) ? 0 : Math.min(1, Math.max(0, g)),
    isNaN(b) ? 0 : Math.min(1, Math.max(0, b))
  );
}

/** Convert base64 data URL to Uint8Array */
function dataUrlToUint8Array(dataUrl: string): { bytes: Uint8Array; format: 'png' | 'jpeg' } {
  const match = dataUrl.match(/^data:image\/(png|jpeg|jpg);base64,(.+)$/i);
  if (!match) {
    throw new Error('Unsupported image format. Must be PNG or JPEG data URL.');
  }
  const isPng = match[1].toLowerCase() === 'png';
  const binaryString = atob(match[2]);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return { bytes, format: isPng ? 'png' : 'jpeg' };
}

/** Resolve font from family, bold, italic flags */
function resolveStandardFont(
  family: FontFamily = 'Helvetica',
  bold: boolean = false,
  italic: boolean = false
): StandardFonts {
  if (family === 'Times') {
    if (bold && italic) return StandardFonts.TimesRomanBoldItalic;
    if (bold) return StandardFonts.TimesRomanBold;
    if (italic) return StandardFonts.TimesRomanItalic;
    return StandardFonts.TimesRoman;
  }
  if (family === 'Courier') {
    if (bold && italic) return StandardFonts.CourierBoldOblique;
    if (bold) return StandardFonts.CourierBold;
    if (italic) return StandardFonts.CourierOblique;
    return StandardFonts.Courier;
  }
  // Default: Helvetica
  if (bold && italic) return StandardFonts.HelveticaBoldOblique;
  if (bold) return StandardFonts.HelveticaBold;
  if (italic) return StandardFonts.HelveticaOblique;
  return StandardFonts.Helvetica;
}

/** Wrap text into lines fitting within a given maxWidth */
function wrapText(
  text: string,
  maxWidth: number,
  font: PDFFont,
  fontSize: number
): string[] {
  const paragraphs = text.split('\n');
  const lines: string[] = [];

  for (const para of paragraphs) {
    if (para.trim() === '') {
      lines.push('');
      continue;
    }
    const words = para.split(' ');
    let currentLine = '';

    for (const word of words) {
      const candidate = currentLine ? `${currentLine} ${word}` : word;
      const width = font.widthOfTextAtSize(candidate, fontSize);
      if (width <= maxWidth || !currentLine) {
        currentLine = candidate;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) {
      lines.push(currentLine);
    }
  }

  return lines;
}

/**
 * Compiles a structured DocumentModel into raw PDF bytes using pdf-lib.
 */
export async function buildPdfFromDocumentModel(doc: DocumentModel): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();

  if (doc.title) pdfDoc.setTitle(doc.title);
  if (doc.author) pdfDoc.setAuthor(doc.author);
  if (doc.subject) pdfDoc.setSubject(doc.subject);
  pdfDoc.setCreator('ihatelovepdf Creator Engine');

  // Font cache for document
  const fontCache = new Map<StandardFonts, PDFFont>();
  const getFont = async (name: StandardFonts): Promise<PDFFont> => {
    let f = fontCache.get(name);
    if (!f) {
      f = await pdfDoc.embedFont(name);
      fontCache.set(name, f);
    }
    return f;
  };

  const pages = doc.pages.length > 0 ? doc.pages : [createEmptyPage('a4', 'portrait')];

  for (const pageModel of pages) {
    const { width: pageWidth, height: pageHeight } = getPageSize(pageModel.format, pageModel.orientation);
    const pdfPage = pdfDoc.addPage([pageWidth, pageHeight]);

    // Optional background color
    if (pageModel.backgroundColor) {
      const bgRgb = hexToRgb(pageModel.backgroundColor);
      if (bgRgb) {
        pdfPage.drawRectangle({
          x: 0,
          y: 0,
          width: pageWidth,
          height: pageHeight,
          color: bgRgb,
        });
      }
    }

    // Render elements in array order
    for (const el of pageModel.elements) {
      try {
        switch (el.type) {
          case 'text':
            await renderTextElement(pdfPage, el, pageHeight, getFont);
            break;
          case 'image':
            await renderImageElement(pdfDoc, pdfPage, el, pageHeight);
            break;
          case 'shape':
            renderShapeElement(pdfPage, el, pageHeight);
            break;
          case 'table':
            await renderTableElement(pdfPage, el, pageHeight, getFont);
            break;
        }
      } catch (err) {
        console.warn(`[PDFPipeline] Failed to render element ${el.id} (${el.type}):`, err);
      }
    }
  }

  const pdfBytes = await pdfDoc.save({ useObjectStreams: true });

  // Debugging byte-size pipeline logging
  console.info(
    `[PDFPipeline] buildPdfFromDocumentModel: created PDF with ${pages.length} page(s), ${pdfBytes.byteLength} bytes`
  );

  return pdfBytes;
}

/** Render a TextElement */
async function renderTextElement(
  page: PDFPage,
  el: TextElement,
  pageHeight: number,
  getFont: (name: StandardFonts) => Promise<PDFFont>
) {
  const fontName = resolveStandardFont(el.font, el.bold, el.italic);
  const font = await getFont(fontName);
  const fontSize = el.fontSize || 12;
  const color = hexToRgb(el.color) || rgb(0, 0, 0);
  const maxWidth = Math.max(20, el.width || 200);
  const lineHeightMult = el.lineHeight || 1.25;
  const lineSpacing = fontSize * lineHeightMult;

  const lines = wrapText(el.text, maxWidth, font, fontSize);

  // Convert top-left origin to pdf-lib bottom-left
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;

    const lineWidth = font.widthOfTextAtSize(line, fontSize);
    let xOffset = 0;
    if (el.alignment === 'center') {
      xOffset = (maxWidth - lineWidth) / 2;
    } else if (el.alignment === 'right') {
      xOffset = maxWidth - lineWidth;
    }

    const drawX = el.x + xOffset;
    // PDF baseline is slightly above the bottom of the line box
    const drawY = pageHeight - (el.y + fontSize + i * lineSpacing);

    page.drawText(line, {
      x: drawX,
      y: drawY,
      size: fontSize,
      font,
      color,
    });
  }
}

/** Render an ImageElement */
async function renderImageElement(
  pdfDoc: PDFDocument,
  page: PDFPage,
  el: ImageElement,
  pageHeight: number
) {
  if (!el.dataUrl) return;

  const { bytes, format } = dataUrlToUint8Array(el.dataUrl);
  const image = format === 'png' ? await pdfDoc.embedPng(bytes) : await pdfDoc.embedJpg(bytes);

  const drawX = el.x;
  const drawY = pageHeight - (el.y + el.height);

  page.drawImage(image, {
    x: drawX,
    y: drawY,
    width: el.width,
    height: el.height,
    opacity: el.opacity ?? 1.0,
  });
}

/** Render a ShapeElement */
function renderShapeElement(page: PDFPage, el: ShapeElement, pageHeight: number) {
  const fillColor = hexToRgb(el.fillColor);
  const strokeColor = hexToRgb(el.strokeColor);
  const strokeWidth = el.strokeWidth ?? 1;
  const opacity = el.opacity ?? 1.0;

  if (el.shapeType === 'line') {
    const startY = pageHeight - el.y;
    const endY = pageHeight - (el.y + el.height);
    page.drawLine({
      start: { x: el.x, y: startY },
      end: { x: el.x + el.width, y: endY },
      thickness: strokeWidth,
      color: strokeColor || rgb(0, 0, 0),
      opacity,
    });
    return;
  }

  const drawX = el.x;
  const drawY = pageHeight - (el.y + el.height);

  if (el.shapeType === 'circle') {
    const xRadius = Math.max(1, el.width / 2);
    const yRadius = Math.max(1, el.height / 2);
    page.drawEllipse({
      x: drawX + xRadius,
      y: drawY + yRadius,
      xScale: xRadius,
      yScale: yRadius,
      color: fillColor || undefined,
      borderColor: strokeColor || undefined,
      borderWidth: strokeColor ? strokeWidth : 0,
      opacity,
    });
    return;
  }

  // Default: Rectangle
  page.drawRectangle({
    x: drawX,
    y: drawY,
    width: el.width,
    height: el.height,
    color: fillColor || undefined,
    borderColor: strokeColor || undefined,
    borderWidth: strokeColor ? strokeWidth : 0,
    opacity,
  });
}

/** Render a TableElement */
async function renderTableElement(
  page: PDFPage,
  el: TableElement,
  pageHeight: number,
  getFont: (name: StandardFonts) => Promise<PDFFont>
) {
  if (!el.rows || el.rows.length === 0) return;

  const font = await getFont(StandardFonts.Helvetica);
  const fontBold = await getFont(StandardFonts.HelveticaBold);
  const fontSize = el.fontSize || 10;
  const padding = el.cellPadding ?? 6;
  const textColor = hexToRgb(el.textColor) || rgb(0.1, 0.1, 0.1);
  const headerTextColor = hexToRgb(el.headerTextColor) || rgb(1, 1, 1);
  const headerBg = hexToRgb(el.headerBackground) || rgb(0.2, 0.25, 0.35);
  const borderColor = hexToRgb(el.borderColor) || rgb(0.85, 0.85, 0.88);
  const drawBorders = el.cellBorders !== false;

  const numCols = Math.max(...el.rows.map((r) => r.length));
  if (numCols === 0) return;

  // Calculate column widths
  let colWidths = el.columnWidths;
  if (!colWidths || colWidths.length < numCols) {
    const defaultColW = el.width / numCols;
    colWidths = Array(numCols).fill(defaultColW);
  }

  const rowHeight = fontSize + padding * 2;
  let currentY = el.y;

  for (let rIdx = 0; rIdx < el.rows.length; rIdx++) {
    const isHeader = rIdx === 0;
    const row = el.rows[rIdx];
    const cellFont = isHeader ? fontBold : font;
    const cellColor = isHeader ? headerTextColor : textColor;

    // Draw header row background
    if (isHeader && headerBg) {
      page.drawRectangle({
        x: el.x,
        y: pageHeight - (currentY + rowHeight),
        width: el.width,
        height: rowHeight,
        color: headerBg,
      });
    }

    let currentX = el.x;
    for (let cIdx = 0; cIdx < numCols; cIdx++) {
      const cWidth = colWidths[cIdx] || el.width / numCols;
      const text = row[cIdx] || '';

      // Cell border
      if (drawBorders && borderColor) {
        page.drawRectangle({
          x: currentX,
          y: pageHeight - (currentY + rowHeight),
          width: cWidth,
          height: rowHeight,
          borderColor,
          borderWidth: 0.75,
        });
      }

      // Cell text
      if (text) {
        const textY = pageHeight - (currentY + padding + fontSize);
        // Truncate text if wider than cell
        let displayText = text;
        while (displayText && cellFont.widthOfTextAtSize(displayText, fontSize) > cWidth - padding * 2) {
          displayText = displayText.slice(0, -1);
        }
        if (displayText !== text && displayText.length > 2) {
          displayText = displayText.slice(0, -2) + '…';
        }

        page.drawText(displayText, {
          x: currentX + padding,
          y: textY,
          size: fontSize,
          font: cellFont,
          color: cellColor,
        });
      }

      currentX += cWidth;
    }

    currentY += rowHeight;
  }
}

/** Create a blank page model */
export function createEmptyPage(format: PageFormat = 'a4', orientation: PageOrientation = 'portrait'): PageModel {
  return {
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `page_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    format,
    orientation,
    elements: [],
    backgroundColor: '#ffffff',
  };
}

/** Preset Templates */
export const DOCUMENT_PRESETS: Record<string, (format?: PageFormat, orientation?: PageOrientation) => DocumentModel> = {
  blank: (format = 'a4', orientation = 'portrait') => ({
    title: 'Blank Document',
    pages: [
      {
        ...createEmptyPage(format, orientation),
        elements: [
          {
            id: 'el_title',
            type: 'text',
            text: 'Untitled Document',
            font: 'Helvetica',
            fontSize: 24,
            bold: true,
            color: '#111827',
            x: 54,
            y: 54,
            width: 487,
            alignment: 'left',
            height: 36,
          },
          {
            id: 'el_body',
            type: 'text',
            text: 'Start typing your document text here. You can add images, shapes, and tables from the toolbar above.',
            font: 'Helvetica',
            fontSize: 12,
            color: '#4b5563',
            x: 54,
            y: 100,
            width: 487,
            alignment: 'left',
            height: 60,
          },
        ],
      },
    ],
  }),

  invoice: (format = 'a4', orientation = 'portrait') => ({
    title: 'Commercial Invoice',
    pages: [
      {
        ...createEmptyPage(format, orientation),
        elements: [
          // Header Bar
          {
            id: 'inv_bar',
            type: 'shape',
            shapeType: 'rectangle',
            x: 0,
            y: 0,
            width: 595,
            height: 12,
            fillColor: '#2563eb',
            strokeWidth: 0,
          },
          // Company Info
          {
            id: 'inv_company',
            type: 'text',
            text: 'ACME ENTERPRISES INC.',
            font: 'Helvetica',
            fontSize: 20,
            bold: true,
            color: '#1e293b',
            x: 54,
            y: 45,
            width: 280,
            alignment: 'left',
            height: 28,
          },
          {
            id: 'inv_company_sub',
            type: 'text',
            text: '123 Business Avenue, Suite 400\ncontact@acme-corp.com • (555) 019-2831',
            font: 'Helvetica',
            fontSize: 10,
            color: '#64748b',
            x: 54,
            y: 75,
            width: 280,
            alignment: 'left',
            height: 30,
          },
          // Invoice Title & Meta
          {
            id: 'inv_title',
            type: 'text',
            text: 'INVOICE',
            font: 'Helvetica',
            fontSize: 26,
            bold: true,
            color: '#2563eb',
            x: 380,
            y: 45,
            width: 160,
            alignment: 'right',
            height: 32,
          },
          {
            id: 'inv_meta',
            type: 'text',
            text: 'Invoice #: INV-2026-001\nDate: 2026-09-05\nDue Date: 2026-10-05',
            font: 'Helvetica',
            fontSize: 10,
            color: '#475569',
            x: 380,
            y: 80,
            width: 160,
            alignment: 'right',
            height: 45,
          },
          // Bill To Box
          {
            id: 'inv_billto_bg',
            type: 'shape',
            shapeType: 'rectangle',
            x: 54,
            y: 135,
            width: 487,
            height: 65,
            fillColor: '#f8fafc',
            strokeColor: '#e2e8f0',
            strokeWidth: 1,
            borderRadius: 6,
          },
          {
            id: 'inv_billto_text',
            type: 'text',
            text: 'BILLED TO:\nClient Corporation Ltd.\n456 Client Plaza, Downtown, NY 10001\nVAT / GST ID: 9876543210',
            font: 'Helvetica',
            fontSize: 9.5,
            color: '#334155',
            x: 66,
            y: 142,
            width: 460,
            height: 50,
          },
          // Items Table
          {
            id: 'inv_table',
            type: 'table',
            x: 54,
            y: 220,
            width: 487,
            height: 140,
            rows: [
              ['Description', 'Qty', 'Unit Rate', 'Total Amount'],
              ['Cloud Architecture & Security Audit', '1', '$1,800.00', '$1,800.00'],
              ['Full-Stack Web Application Engineering', '40 hrs', '$95.00', '$3,800.00'],
              ['Database Migration & Index Tuning', '1', '$750.00', '$750.00'],
              ['Managed Hosting & SSL Maintenance', '1 mo', '$150.00', '$150.00'],
            ],
            columnWidths: [240, 60, 95, 92],
            headerBackground: '#1e293b',
            headerTextColor: '#ffffff',
            cellBorders: true,
            borderColor: '#cbd5e1',
            fontSize: 9.5,
          },
          // Total Box
          {
            id: 'inv_total_bg',
            type: 'shape',
            shapeType: 'rectangle',
            x: 350,
            y: 380,
            width: 191,
            height: 70,
            fillColor: '#eff6ff',
            strokeColor: '#bfdbfe',
            strokeWidth: 1,
          },
          {
            id: 'inv_total_text',
            type: 'text',
            text: 'Subtotal: $6,500.00\nTax (0%): $0.00\nTOTAL DUE: $6,500.00',
            font: 'Helvetica',
            fontSize: 11,
            bold: true,
            color: '#1e3a8a',
            x: 360,
            y: 390,
            width: 171,
            alignment: 'right',
            height: 50,
          },
          // Footer Note
          {
            id: 'inv_footer',
            type: 'text',
            text: 'Thank you for your business! Please wire payments within 30 days.\nBank: Chase Commercial Bank • A/C: 1234-5678-9012 • Routing: 021000021',
            font: 'Helvetica',
            fontSize: 8.5,
            color: '#94a3b8',
            x: 54,
            y: 750,
            width: 487,
            alignment: 'center',
            height: 25,
          },
        ],
      },
    ],
  }),

  letterhead: (format = 'a4', orientation = 'portrait') => ({
    title: 'Executive Letterhead',
    pages: [
      {
        ...createEmptyPage(format, orientation),
        elements: [
          // Top Colored Accent
          {
            id: 'lh_accent',
            type: 'shape',
            shapeType: 'rectangle',
            x: 0,
            y: 0,
            width: 595,
            height: 8,
            fillColor: '#0f766e',
            strokeWidth: 0,
          },
          // Logo & Name
          {
            id: 'lh_header',
            type: 'text',
            text: 'VERTEX HOLDINGS LLC',
            font: 'Times',
            fontSize: 22,
            bold: true,
            color: '#0f766e',
            x: 54,
            y: 48,
            width: 300,
            height: 28,
          },
          {
            id: 'lh_contact',
            type: 'text',
            text: 'One Financial Tower, 32nd Floor • New York, NY 10005\nTel: +1 (212) 555-0199 • office@vertex-holdings.com',
            font: 'Helvetica',
            fontSize: 8.5,
            color: '#64748b',
            x: 54,
            y: 78,
            width: 487,
            height: 24,
          },
          // Divider
          {
            id: 'lh_divider',
            type: 'shape',
            shapeType: 'line',
            x: 54,
            y: 110,
            width: 487,
            height: 0,
            strokeColor: '#0f766e',
            strokeWidth: 1.5,
          },
          // Date & Recipient
          {
            id: 'lh_date',
            type: 'text',
            text: 'September 5, 2026',
            font: 'Times',
            fontSize: 11,
            color: '#334155',
            x: 54,
            y: 135,
            width: 200,
            height: 18,
          },
          {
            id: 'lh_recipient',
            type: 'text',
            text: 'Dear Sir or Madam,\n\nRe: Formal Notification and Advisory Notice',
            font: 'Times',
            fontSize: 11,
            bold: true,
            color: '#1e293b',
            x: 54,
            y: 165,
            width: 487,
            height: 35,
          },
          // Letter Body
          {
            id: 'lh_body',
            type: 'text',
            text: 'We are pleased to submit this official document for your immediate review. The particulars described herein represent the agreed terms and governance parameters established during our consultative discussions.\n\nPlease sign and return the duplicated copy at your earliest convenience to ensure timely initiation of the milestones scheduled for the upcoming financial quarter.\n\nShould you have any inquiries regarding the specifications outlined in this schedule, do not hesitate to contact our executive liaison team.',
            font: 'Times',
            fontSize: 11,
            color: '#334155',
            x: 54,
            y: 215,
            width: 487,
            height: 180,
            lineHeight: 1.4,
          },
          // Sign-off
          {
            id: 'lh_signoff',
            type: 'text',
            text: 'Sincerely,\n\n\n\n_____________________________________\nJonathan Reynolds, Managing Director\nVertex Holdings LLC',
            font: 'Times',
            fontSize: 11,
            color: '#1e293b',
            x: 54,
            y: 440,
            width: 320,
            height: 80,
          },
          // Bottom Footer Bar
          {
            id: 'lh_footer',
            type: 'text',
            text: 'Confidential • Vertex Holdings LLC • All Rights Reserved',
            font: 'Helvetica',
            fontSize: 8,
            color: '#94a3b8',
            x: 54,
            y: 780,
            width: 487,
            alignment: 'center',
            height: 16,
          },
        ],
      },
    ],
  }),

  certificate: (format = 'a4', orientation = 'landscape') => ({
    title: 'Certificate of Achievement',
    pages: [
      {
        ...createEmptyPage(format, orientation),
        orientation: 'landscape',
        elements: [
          // Outer Decorative Border
          {
            id: 'cert_outer_border',
            type: 'shape',
            shapeType: 'rectangle',
            x: 24,
            y: 24,
            width: 793,
            height: 547,
            fillColor: '#fdfbf7',
            strokeColor: '#b45309',
            strokeWidth: 3,
          },
          // Inner Thin Border
          {
            id: 'cert_inner_border',
            type: 'shape',
            shapeType: 'rectangle',
            x: 34,
            y: 34,
            width: 773,
            height: 527,
            fillColor: 'transparent',
            strokeColor: '#d97706',
            strokeWidth: 1,
          },
          // Main Title
          {
            id: 'cert_title',
            type: 'text',
            text: 'CERTIFICATE OF ACHIEVEMENT',
            font: 'Times',
            fontSize: 30,
            bold: true,
            color: '#78350f',
            x: 50,
            y: 80,
            width: 741,
            alignment: 'center',
            height: 40,
          },
          {
            id: 'cert_subtitle',
            type: 'text',
            text: 'THIS CERTIFICATE IS PROUDLY PRESENTED TO',
            font: 'Helvetica',
            fontSize: 11,
            bold: true,
            color: '#b45309',
            x: 50,
            y: 135,
            width: 741,
            alignment: 'center',
            height: 20,
          },
          // Recipient Name
          {
            id: 'cert_recipient',
            type: 'text',
            text: 'Alex Morgan',
            font: 'Times',
            fontSize: 34,
            bold: true,
            italic: true,
            color: '#1e293b',
            x: 50,
            y: 180,
            width: 741,
            alignment: 'center',
            height: 45,
          },
          // Divider Line
          {
            id: 'cert_line',
            type: 'shape',
            shapeType: 'line',
            x: 220,
            y: 235,
            width: 400,
            height: 0,
            strokeColor: '#d97706',
            strokeWidth: 1.5,
          },
          // Description
          {
            id: 'cert_desc',
            type: 'text',
            text: 'For exemplary dedication, distinguished leadership, and extraordinary professional contributions toward the completion of the Global Systems Architecture Initiative.',
            font: 'Times',
            fontSize: 13,
            color: '#475569',
            x: 120,
            y: 260,
            width: 600,
            alignment: 'center',
            height: 60,
            lineHeight: 1.4,
          },
          // Signatures
          {
            id: 'cert_sig1',
            type: 'text',
            text: '_____________________________________\nDirector of Executive Committee',
            font: 'Times',
            fontSize: 10,
            color: '#334155',
            x: 120,
            y: 440,
            width: 250,
            alignment: 'center',
            height: 40,
          },
          {
            id: 'cert_sig2',
            type: 'text',
            text: '_____________________________________\nDate of Conferral • September 2026',
            font: 'Times',
            fontSize: 10,
            color: '#334155',
            x: 470,
            y: 440,
            width: 250,
            alignment: 'center',
            height: 40,
          },
        ],
      },
    ],
  }),
};
