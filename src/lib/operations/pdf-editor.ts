import { PDFDocument, rgb, StandardFonts, degrees, PDFPage } from 'pdf-lib';

export type EditorToolType =
  | 'select'
  | 'editText'
  | 'addText'
  | 'rect'
  | 'circle'
  | 'line'
  | 'arrow'
  | 'image'
  | 'draw'
  | 'signature'
  | 'whiteout'
  | 'highlight'
  | 'underline'
  | 'strikethrough';

export interface EditorPoint {
  x: number;
  y: number;
}

export interface BaseEditorElement {
  id: string;
  type: string;
  x: number; // Screen X at 1.0 scale
  y: number; // Screen Y at 1.0 scale
  width: number;
  height: number;
  rotation?: number; // In degrees
  opacity?: number;
}

export interface TextElement extends BaseEditorElement {
  type: 'text';
  text: string;
  fontSize: number;
  fontFamily: 'Helvetica' | 'TimesRoman' | 'Courier';
  fontWeight: 'normal' | 'bold';
  fontStyle: 'normal' | 'italic';
  color: string; // Hex color e.g. '#000000'
  alignment: 'left' | 'center' | 'right';
  lineHeight?: number;
}

export interface ExistingTextOverride {
  id: string;
  originalText: string;
  newText: string;
  x: number; // Screen X at 1.0 scale
  y: number; // Screen Y at 1.0 scale
  width: number;
  height: number;
  fontSize: number;
  fontFamily?: string;
  color: string;
  backgroundColor?: string;
  isDeleted?: boolean;
}

export interface ShapeElement extends BaseEditorElement {
  type: 'rect' | 'circle' | 'line' | 'arrow' | 'whiteout' | 'highlight' | 'underline' | 'strikethrough';
  strokeColor: string;
  fillColor?: string;
  strokeWidth: number;
  borderRadius?: number;
  startX?: number;
  startY?: number;
  endX?: number;
  endY?: number;
}

export interface ImageElement extends BaseEditorElement {
  type: 'image';
  dataUrl: string; // Base64 data URL
  mimeType: 'image/png' | 'image/jpeg';
  originalDataUrl?: string; // Full resolution original image for non-destructive re-cropping
  crop?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  lockAspectRatio?: boolean;
}

export interface DrawingElement extends BaseEditorElement {
  type: 'draw' | 'signature';
  points: EditorPoint[];
  color: string;
  strokeWidth: number;
  dataUrl?: string; // Optional high-res raster fallback
}

export type EditorElement = TextElement | ShapeElement | ImageElement | DrawingElement;

export interface PageEditState {
  pageIndex: number;
  width: number;
  height: number;
  rotation: number; // 0, 90, 180, 270
  existingTextOverrides: ExistingTextOverride[];
  elements: EditorElement[];
}

export interface PageMetadata {
  originalIndex: number;
  pageNumber: number;
  width: number;
  height: number;
  rotation: number;
  isNewBlank?: boolean;
}

export interface DocumentEditState {
  pages: PageMetadata[];
  pageEdits: Record<number, PageEditState>; // Keyed by originalIndex or page identifier
}

/**
 * Parses Hex color to pdf-lib rgb(r, g, b)
 */
function hexToRgbColor(hex: string): { r: number; g: number; b: number } {
  const cleanHex = hex.replace('#', '').trim();
  if (cleanHex.length === 3) {
    const r = parseInt(cleanHex[0] + cleanHex[0], 16) / 255;
    const g = parseInt(cleanHex[1] + cleanHex[1], 16) / 255;
    const b = parseInt(cleanHex[2] + cleanHex[2], 16) / 255;
    return { r, g, b };
  }
  if (cleanHex.length >= 6) {
    const r = parseInt(cleanHex.slice(0, 2), 16) / 255;
    const g = parseInt(cleanHex.slice(2, 4), 16) / 255;
    const b = parseInt(cleanHex.slice(4, 6), 16) / 255;
    return { r, g, b };
  }
  return { r: 0, g: 0, b: 0 };
}

/**
 * Calculates bottom-left origin for pdf-lib drawImage/drawRectangle when rotated around its center
 */
function getRotatedPdfCoordinates(
  x: number,
  y: number,
  width: number,
  height: number,
  pageHeight: number,
  rotationDeg: number = 0
): { drawX: number; drawY: number; angleDeg: number } {
  if (!rotationDeg || rotationDeg % 360 === 0) {
    return {
      drawX: x,
      drawY: pageHeight - y - height,
      angleDeg: 0,
    };
  }

  const cx = x + width / 2;
  const cy = pageHeight - (y + height / 2);
  const rad = (-rotationDeg * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  const drawX = cx - (width / 2) * cos + (height / 2) * sin;
  const drawY = cy - (width / 2) * sin - (height / 2) * cos;

  return { drawX, drawY, angleDeg: -rotationDeg };
}

/**
 * Apply all edits, page operations, text modifications, and overlays to original PDF
 */
export async function applyPdfEdits(
  originalBytes: ArrayBuffer | Uint8Array,
  documentState: DocumentEditState
): Promise<Uint8Array> {
  const originalPdf = await PDFDocument.load(originalBytes, { ignoreEncryption: true });
  const outputPdf = await PDFDocument.create();

  // Pre-load standard font families
  const helvetica = await outputPdf.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await outputPdf.embedFont(StandardFonts.HelveticaBold);
  const helveticaOblique = await outputPdf.embedFont(StandardFonts.HelveticaOblique);
  const helveticaBoldOblique = await outputPdf.embedFont(StandardFonts.HelveticaBoldOblique);

  const times = await outputPdf.embedFont(StandardFonts.TimesRoman);
  const timesBold = await outputPdf.embedFont(StandardFonts.TimesRomanBold);
  const timesItalic = await outputPdf.embedFont(StandardFonts.TimesRomanItalic);
  const timesBoldItalic = await outputPdf.embedFont(StandardFonts.TimesRomanBoldItalic);

  const courier = await outputPdf.embedFont(StandardFonts.Courier);
  const courierBold = await outputPdf.embedFont(StandardFonts.CourierBold);
  const courierOblique = await outputPdf.embedFont(StandardFonts.CourierOblique);
  const courierBoldOblique = await outputPdf.embedFont(StandardFonts.CourierBoldOblique);

  const getFont = (family: string = 'Helvetica', weight: string = 'normal', style: string = 'normal') => {
    const isBold = weight === 'bold' || weight === '700' || weight === '800';
    const isItalic = style === 'italic' || style === 'oblique';

    if (family.toLowerCase().includes('times')) {
      if (isBold && isItalic) return timesBoldItalic;
      if (isBold) return timesBold;
      if (isItalic) return timesItalic;
      return times;
    }
    if (family.toLowerCase().includes('courier') || family.toLowerCase().includes('mono')) {
      if (isBold && isItalic) return courierBoldOblique;
      if (isBold) return courierBold;
      if (isItalic) return courierOblique;
      return courier;
    }
    if (isBold && isItalic) return helveticaBoldOblique;
    if (isBold) return helveticaBold;
    if (isItalic) return helveticaOblique;
    return helvetica;
  };

  // Iterate over desired page layout
  for (let pIdx = 0; pIdx < documentState.pages.length; pIdx++) {
    const pageMeta = documentState.pages[pIdx];
    let page: PDFPage;

    if (pageMeta.isNewBlank) {
      page = outputPdf.addPage([pageMeta.width || 595, pageMeta.height || 842]);
    } else {
      const [copiedPage] = await outputPdf.copyPages(originalPdf, [pageMeta.originalIndex]);
      page = outputPdf.addPage(copiedPage);
    }

    if (pageMeta.rotation !== undefined) {
      page.setRotation(degrees(pageMeta.rotation));
    }

    const { height: pageHeight } = page.getSize();
    const editState = documentState.pageEdits[pageMeta.originalIndex];

    if (!editState) continue;

    // 1. Process Existing Text Overrides (Replacement & Deletion)
    if (editState.existingTextOverrides && editState.existingTextOverrides.length > 0) {
      for (const override of editState.existingTextOverrides) {
        // PDF coordinate conversion: Y origin is bottom-left
        const pdfX = override.x;
        const pdfY = pageHeight - override.y - override.height;

        // Draw whiteout mask to hide original text cleanly
        const maskColor = override.backgroundColor ? hexToRgbColor(override.backgroundColor) : { r: 1, g: 1, b: 1 };
        page.drawRectangle({
          x: Math.max(0, pdfX - 1),
          y: Math.max(0, pdfY - 1),
          width: override.width + 2,
          height: override.height + 2,
          color: rgb(maskColor.r, maskColor.g, maskColor.b),
          opacity: 1,
        });

        // If replaced with new text, draw vector text
        if (!override.isDeleted && override.newText && override.newText.trim().length > 0) {
          const font = getFont(override.fontFamily);
          const textColor = hexToRgbColor(override.color || '#000000');
          const fontSize = Math.max(6, override.fontSize || 12);

          page.drawText(override.newText, {
            x: pdfX,
            y: pdfY + Math.max(1, (override.height - fontSize) / 2),
            size: fontSize,
            font,
            color: rgb(textColor.r, textColor.g, textColor.b),
          });
        }
      }
    }

    // 2. Process Added Elements (Text, Shapes, Images, Drawings, Annotations)
    if (editState.elements && editState.elements.length > 0) {
      for (const elem of editState.elements) {
        const opacity = elem.opacity !== undefined ? Math.max(0, Math.min(1, elem.opacity)) : 1;

        if (elem.type === 'text') {
          const textElem = elem as TextElement;
          const font = getFont(textElem.fontFamily, textElem.fontWeight, textElem.fontStyle);
          const textColor = hexToRgbColor(textElem.color || '#000000');
          const fontSize = Math.max(6, textElem.fontSize || 14);
          const lines = textElem.text.split('\n');
          const lineSpacing = fontSize * (textElem.lineHeight || 1.2);

          for (let lIdx = 0; lIdx < lines.length; lIdx++) {
            const line = lines[lIdx];
            if (!line) continue;
            const lineWidth = font.widthOfTextAtSize(line, fontSize);
            let lineX = textElem.x;

            if (textElem.alignment === 'center') {
              lineX = textElem.x + Math.max(0, (textElem.width - lineWidth) / 2);
            } else if (textElem.alignment === 'right') {
              lineX = textElem.x + Math.max(0, textElem.width - lineWidth);
            }

            const pdfX = lineX;
            const pdfY = pageHeight - (textElem.y + (lIdx + 1) * lineSpacing);

            page.drawText(line, {
              x: pdfX,
              y: pdfY,
              size: fontSize,
              font,
              color: rgb(textColor.r, textColor.g, textColor.b),
              opacity,
              rotate: textElem.rotation ? degrees(textElem.rotation) : undefined,
            });
          }
        } else if (elem.type === 'rect' || elem.type === 'whiteout' || elem.type === 'highlight') {
          const shape = elem as ShapeElement;
          const pdfX = shape.x;
          const pdfY = pageHeight - shape.y - shape.height;
          const isHighlight = elem.type === 'highlight';
          const isWhiteout = elem.type === 'whiteout';

          const strokeC = shape.strokeColor && shape.strokeColor !== 'transparent'
            ? hexToRgbColor(shape.strokeColor)
            : undefined;
          const fillC = isWhiteout
            ? { r: 1, g: 1, b: 1 }
            : shape.fillColor && shape.fillColor !== 'transparent'
            ? hexToRgbColor(shape.fillColor)
            : undefined;

          page.drawRectangle({
            x: pdfX,
            y: pdfY,
            width: shape.width,
            height: shape.height,
            borderColor: strokeC ? rgb(strokeC.r, strokeC.g, strokeC.b) : undefined,
            borderWidth: isWhiteout || isHighlight ? 0 : shape.strokeWidth || 1,
            color: fillC ? rgb(fillC.r, fillC.g, fillC.b) : undefined,
            opacity: isHighlight ? 0.35 : opacity,
            rotate: shape.rotation ? degrees(shape.rotation) : undefined,
          });
        } else if (elem.type === 'circle') {
          const shape = elem as ShapeElement;
          const xRadius = shape.width / 2;
          const yRadius = shape.height / 2;
          const pdfCenterX = shape.x + xRadius;
          const pdfCenterY = pageHeight - shape.y - yRadius;

          const strokeC = shape.strokeColor && shape.strokeColor !== 'transparent'
            ? hexToRgbColor(shape.strokeColor)
            : undefined;
          const fillC = shape.fillColor && shape.fillColor !== 'transparent'
            ? hexToRgbColor(shape.fillColor)
            : undefined;

          page.drawEllipse({
            x: pdfCenterX,
            y: pdfCenterY,
            xScale: xRadius,
            yScale: yRadius,
            borderColor: strokeC ? rgb(strokeC.r, strokeC.g, strokeC.b) : undefined,
            borderWidth: shape.strokeWidth || 1,
            color: fillC ? rgb(fillC.r, fillC.g, fillC.b) : undefined,
            opacity,
            rotate: shape.rotation ? degrees(shape.rotation) : undefined,
          });
        } else if (elem.type === 'line' || elem.type === 'arrow' || elem.type === 'underline' || elem.type === 'strikethrough') {
          const shape = elem as ShapeElement;
          const strokeC = hexToRgbColor(shape.strokeColor || '#000000');
          const startX = shape.startX !== undefined ? shape.startX : shape.x;
          const startY = shape.startY !== undefined ? pageHeight - shape.startY : pageHeight - shape.y;
          const endX = shape.endX !== undefined ? shape.endX : shape.x + shape.width;
          const endY = shape.endY !== undefined ? pageHeight - shape.endY : pageHeight - (shape.y + shape.height);

          page.drawLine({
            start: { x: startX, y: startY },
            end: { x: endX, y: endY },
            thickness: shape.strokeWidth || 2,
            color: rgb(strokeC.r, strokeC.g, strokeC.b),
            opacity,
          });

          if (elem.type === 'arrow') {
            // Draw arrowhead
            const angle = Math.atan2(endY - startY, endX - startX);
            const headLength = Math.max(8, (shape.strokeWidth || 2) * 3);
            const arrowAngle = Math.PI / 6;

            const arrowLeftX = endX - headLength * Math.cos(angle - arrowAngle);
            const arrowLeftY = endY - headLength * Math.sin(angle - arrowAngle);
            const arrowRightX = endX - headLength * Math.cos(angle + arrowAngle);
            const arrowRightY = endY - headLength * Math.sin(angle + arrowAngle);

            page.drawLine({
              start: { x: endX, y: endY },
              end: { x: arrowLeftX, y: arrowLeftY },
              thickness: shape.strokeWidth || 2,
              color: rgb(strokeC.r, strokeC.g, strokeC.b),
              opacity,
            });
            page.drawLine({
              start: { x: endX, y: endY },
              end: { x: arrowRightX, y: arrowRightY },
              thickness: shape.strokeWidth || 2,
              color: rgb(strokeC.r, strokeC.g, strokeC.b),
              opacity,
            });
          }
        } else if (elem.type === 'image') {
          const imgElem = elem as ImageElement;
          if (imgElem.dataUrl) {
            try {
              const base64Data = imgElem.dataUrl.split(',')[1];
              const binaryString = atob(base64Data);
              const imgBytes = new Uint8Array(binaryString.length);
              for (let b = 0; b < binaryString.length; b++) {
                imgBytes[b] = binaryString.charCodeAt(b);
              }

              const embeddedImage = imgElem.mimeType === 'image/jpeg'
                ? await outputPdf.embedJpg(imgBytes)
                : await outputPdf.embedPng(imgBytes);

              const { drawX, drawY, angleDeg } = getRotatedPdfCoordinates(
                imgElem.x,
                imgElem.y,
                imgElem.width,
                imgElem.height,
                pageHeight,
                imgElem.rotation || 0
              );

              page.drawImage(embeddedImage, {
                x: drawX,
                y: drawY,
                width: imgElem.width,
                height: imgElem.height,
                opacity,
                rotate: angleDeg ? degrees(angleDeg) : undefined,
              });
            } catch (err) {
              console.warn('Failed to embed image in PDF export:', err);
            }
          }
        } else if (elem.type === 'draw' || elem.type === 'signature') {
          const drawElem = elem as DrawingElement;
          const strokeC = hexToRgbColor(drawElem.color || '#000000');
          const strokeWidth = drawElem.strokeWidth || 2;

          if (drawElem.points && drawElem.points.length > 1) {
            for (let ptIdx = 0; ptIdx < drawElem.points.length - 1; ptIdx++) {
              const p1 = drawElem.points[ptIdx];
              const p2 = drawElem.points[ptIdx + 1];

              page.drawLine({
                start: { x: p1.x, y: pageHeight - p1.y },
                end: { x: p2.x, y: pageHeight - p2.y },
                thickness: strokeWidth,
                color: rgb(strokeC.r, strokeC.g, strokeC.b),
                opacity,
              });
            }
          }
        }
      }
    }
  }

  return outputPdf.save({ useObjectStreams: true });
}
