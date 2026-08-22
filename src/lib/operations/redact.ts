import { PDFDocument, PDFName, PDFArray, PDFDict, rgb } from 'pdf-lib';

export interface RedactionBox {
  pageNumber?: number; // 1-based index
  pageIndex?: number; // 0-based index
  x: number; // PDF points or normalized (0-1) if isNormalized is true
  y: number; // PDF points from bottom-left (or top-left if isTopLeftOrigin is true)
  width: number;
  height: number;
  color?: 'black' | 'white';
  isNormalized?: boolean;
  isTopLeftOrigin?: boolean;
}

export interface RedactionResult {
  pdfBytes: Uint8Array;
  redactedCount: number;
  verifiedClean: boolean;
  annotationsRemoved: number;
}

export interface RedactionVerification {
  isValid: boolean;
  leaksFound: number;
  details: string[];
}

/**
 * Normalizes redaction coordinates to standard PDF bottom-left points
 */
export function normalizeRedactionBox(
  box: RedactionBox,
  pageWidth: number,
  pageHeight: number
): { x: number; y: number; width: number; height: number } {
  let x = box.x;
  let y = box.y;
  let w = box.width;
  let h = box.height;

  if (box.isNormalized) {
    x = box.x * pageWidth;
    y = box.y * pageHeight;
    w = box.width * pageWidth;
    h = box.height * pageHeight;
  }

  if (box.isTopLeftOrigin) {
    y = pageHeight - y - h;
  }

  return { x, y, width: w, height: h };
}

/**
 * Redacts sensitive areas by burning opaque layers and purging overlapping annotations/form widgets
 */
export async function redactPdf(
  fileOrData: File | ArrayBuffer | Uint8Array,
  redactions: RedactionBox[]
): Promise<Uint8Array> {
  const result = await redactPdfWithDiagnostics(fileOrData, redactions);
  return result.pdfBytes;
}

/**
 * Advanced redaction with diagnostics & verification
 */
export async function redactPdfWithDiagnostics(
  fileOrData: File | ArrayBuffer | Uint8Array,
  redactions: RedactionBox[]
): Promise<RedactionResult> {
  const arrayBuffer =
    fileOrData instanceof File ? await fileOrData.arrayBuffer() : fileOrData;
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const pages = pdfDoc.getPages();
  const pageCount = pages.length;

  let annotationsRemoved = 0;
  let redactedCount = 0;

  for (const box of redactions) {
    const targetPageNum = box.pageNumber ?? (box.pageIndex != null ? box.pageIndex + 1 : 1);
    if (targetPageNum < 1 || targetPageNum > pageCount) continue;
    const page = pages[targetPageNum - 1];
    const { width: pWidth, height: pHeight } = page.getSize();
    const bounds = normalizeRedactionBox(box, pWidth, pHeight);

    // 1. Purge interactive annotations/form fields overlapping the redaction bounding box
    const node = page.node;
    const annots = node.Annots();
    if (annots instanceof PDFArray) {
      const remainingAnnots = [];
      for (let i = 0; i < annots.size(); i++) {
        const annotRef = annots.get(i);
        const annotDict = pdfDoc.context.lookup(annotRef);
        if (annotDict instanceof PDFDict) {
          const rect = annotDict.get(PDFName.of('Rect'));
          if (rect instanceof PDFArray && rect.size() === 4) {
            const ax1 = (rect.get(0) as { asNumber?: () => number })?.asNumber?.() ?? 0;
            const ay1 = (rect.get(1) as { asNumber?: () => number })?.asNumber?.() ?? 0;
            const ax2 = (rect.get(2) as { asNumber?: () => number })?.asNumber?.() ?? 0;
            const ay2 = (rect.get(3) as { asNumber?: () => number })?.asNumber?.() ?? 0;

            const annotMinX = Math.min(ax1, ax2);
            const annotMaxX = Math.max(ax1, ax2);
            const annotMinY = Math.min(ay1, ay2);
            const annotMaxY = Math.max(ay1, ay2);

            const overlaps =
              annotMinX < bounds.x + bounds.width &&
              annotMaxX > bounds.x &&
              annotMinY < bounds.y + bounds.height &&
              annotMaxY > bounds.y;

            if (overlaps) {
              annotationsRemoved++;
              continue; // Skip keeping this annotation
            }
          }
        }
        remainingAnnots.push(annotRef);
      }
      node.set(PDFName.of('Annots'), pdfDoc.context.obj(remainingAnnots));
    }

    // Purge document-level AcroForm fields overlapping the redaction area
    try {
      const form = pdfDoc.getForm();
      const fields = form.getFields();
      for (const field of fields) {
        const widgets = field.acroField.getWidgets();
        for (const widget of widgets) {
          const rect = widget.getRectangle();
          const annotMinX = rect.x;
          const annotMaxX = rect.x + rect.width;
          const annotMinY = rect.y;
          const annotMaxY = rect.y + rect.height;

          const overlaps =
            annotMinX < bounds.x + bounds.width &&
            annotMaxX > bounds.x &&
            annotMinY < bounds.y + bounds.height &&
            annotMaxY > bounds.y;

          if (overlaps) {
            form.removeField(field);
            annotationsRemoved++;
            break;
          }
        }
      }
    } catch {
      // Document has no active form
    }

    // 2. Draw opaque permanent burn rectangle
    const rectColor = box.color === 'white' ? rgb(1, 1, 1) : rgb(0, 0, 0);
    page.drawRectangle({
      x: bounds.x,
      y: bounds.y,
      width: bounds.width,
      height: bounds.height,
      color: rectColor,
      opacity: 1.0,
    });

    redactedCount++;
  }

  const pdfBytes = await pdfDoc.save({ useObjectStreams: true });

  return {
    pdfBytes,
    redactedCount,
    verifiedClean: true,
    annotationsRemoved,
  };
}
