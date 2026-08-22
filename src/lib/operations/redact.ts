import { PDFDocument, rgb } from 'pdf-lib';

export interface RedactionBox {
  pageNumber: number; // 1-based index
  x: number; // PDF points or normalized (0-1) if isNormalized is true
  y: number; // PDF points from bottom-left (or top-left if isTopLeftOrigin is true)
  width: number;
  height: number;
  color?: 'black' | 'white';
  isNormalized?: boolean;
  isTopLeftOrigin?: boolean;
}

export async function redactPdf(
  fileOrData: File | ArrayBuffer | Uint8Array,
  redactions: RedactionBox[]
): Promise<Uint8Array> {
  const arrayBuffer =
    fileOrData instanceof File ? await fileOrData.arrayBuffer() : fileOrData;
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const pages = pdfDoc.getPages();
  const pageCount = pages.length;

  for (const box of redactions) {
    if (box.pageNumber < 1 || box.pageNumber > pageCount) continue;
    const page = pages[box.pageNumber - 1];
    const { width: pWidth, height: pHeight } = page.getSize();

    let x = box.x;
    let y = box.y;
    let w = box.width;
    let h = box.height;

    if (box.isNormalized) {
      x = box.x * pWidth;
      y = box.y * pHeight;
      w = box.width * pWidth;
      h = box.height * pHeight;
    }

    if (box.isTopLeftOrigin) {
      y = pHeight - y - h;
    }

    const rectColor = box.color === 'white' ? rgb(1, 1, 1) : rgb(0, 0, 0);

    page.drawRectangle({
      x,
      y,
      width: w,
      height: h,
      color: rectColor,
      opacity: 1.0,
    });
  }

  return pdfDoc.save({ useObjectStreams: true });
}
