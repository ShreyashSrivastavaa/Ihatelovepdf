import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export interface PageNumberOptions {
  pageNumberFormat?: 'n' | 'page_n' | 'page_n_of_total' | 'n_of_total' | 'dash_n_dash';
  pageNumberPosition?:
    | 'bottom-center'
    | 'bottom-right'
    | 'bottom-left'
    | 'top-center'
    | 'top-right'
    | 'top-left';
  pageNumberStartNumber?: number; // default 1
  pageNumberMargin?: number; // default 25 pt
  pageNumberFontSize?: number; // default 10 pt
  pageNumberColor?: string; // hex
  skipFirstPage?: boolean;
  pagesToNumber?: number[]; // 1-based indices
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

export async function addPageNumbersToPdf(
  fileOrData: File | ArrayBuffer | Uint8Array,
  options: PageNumberOptions = {}
): Promise<Uint8Array> {
  const arrayBuffer =
    fileOrData instanceof File ? await fileOrData.arrayBuffer() : fileOrData;
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const pages = pdfDoc.getPages();
  const totalPages = pages.length;

  const format = options.pageNumberFormat ?? 'page_n_of_total';
  const position = options.pageNumberPosition ?? 'bottom-center';
  const startNum = options.pageNumberStartNumber ?? 1;
  const margin = Math.max(10, options.pageNumberMargin ?? 25);
  const fontSize = options.pageNumberFontSize ?? 10;
  const color = parseHexColor(options.pageNumberColor ?? '#4b5563');
  const skipFirst = options.skipFirstPage ?? false;
  const targetSet =
    options.pagesToNumber && options.pagesToNumber.length > 0
      ? new Set(options.pagesToNumber.map((p) => p - 1))
      : null;

  pages.forEach((page, index) => {
    if (skipFirst && index === 0) return;
    if (targetSet && !targetSet.has(index)) return;

    const currentNumber = startNum + index - (skipFirst ? 1 : 0);
    const displayedTotal = skipFirst ? totalPages - 1 : totalPages;

    let text = `${currentNumber}`;
    switch (format) {
      case 'page_n':
        text = `Page ${currentNumber}`;
        break;
      case 'page_n_of_total':
        text = `Page ${currentNumber} of ${displayedTotal}`;
        break;
      case 'n_of_total':
        text = `${currentNumber} / ${displayedTotal}`;
        break;
      case 'dash_n_dash':
        text = `- ${currentNumber} -`;
        break;
      case 'n':
      default:
        text = `${currentNumber}`;
        break;
    }

    const textWidth = font.widthOfTextAtSize(text, fontSize);
    const { width, height } = page.getSize();

    let x = (width - textWidth) / 2;
    let y = margin;

    switch (position) {
      case 'bottom-left':
        x = margin;
        y = margin;
        break;
      case 'bottom-center':
        x = (width - textWidth) / 2;
        y = margin;
        break;
      case 'bottom-right':
        x = width - margin - textWidth;
        y = margin;
        break;
      case 'top-left':
        x = margin;
        y = height - margin - fontSize;
        break;
      case 'top-center':
        x = (width - textWidth) / 2;
        y = height - margin - fontSize;
        break;
      case 'top-right':
        x = width - margin - textWidth;
        y = height - margin - fontSize;
        break;
    }

    page.drawText(text, {
      x,
      y,
      size: fontSize,
      font,
      color,
    });
  });

  return pdfDoc.save({ useObjectStreams: true });
}
