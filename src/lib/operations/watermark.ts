import { PDFDocument, StandardFonts, rgb, degrees } from 'pdf-lib';

export interface WatermarkOptions {
  watermarkType?: 'text' | 'image';
  watermarkText?: string;
  watermarkImageData?: string; // Data URL
  watermarkOpacity?: number; // 0.0 - 1.0
  watermarkRotation?: number; // degrees, e.g. 45 or -45
  watermarkFontSize?: number; // 12 - 120 pt
  watermarkColor?: string; // hex #rrggbb
  watermarkPosition?:
    | 'center'
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'center-left'
    | 'center-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'
    | 'tile';
  pagesToWatermark?: number[]; // 1-based page numbers
}

function parseHexColor(hex = '#ff0000') {
  const clean = hex.replace('#', '').trim();
  if (clean.length === 3) {
    const r = parseInt(clean[0] + clean[0], 16) / 255;
    const g = parseInt(clean[1] + clean[1], 16) / 255;
    const b = parseInt(clean[2] + clean[2], 16) / 255;
    return rgb(r || 0, g || 0, b || 0);
  }
  const intVal = parseInt(clean.slice(0, 6), 16);
  if (Number.isNaN(intVal)) return rgb(1, 0, 0);
  return rgb(
    ((intVal >> 16) & 255) / 255,
    ((intVal >> 8) & 255) / 255,
    (intVal & 255) / 255
  );
}

export async function applyWatermarkToPdf(
  fileOrData: File | ArrayBuffer | Uint8Array,
  options: WatermarkOptions = {}
): Promise<Uint8Array> {
  const arrayBuffer =
    fileOrData instanceof File ? await fileOrData.arrayBuffer() : fileOrData;
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const pages = pdfDoc.getPages();

  const type = options.watermarkType ?? 'text';
  const opacity = Math.max(0.05, Math.min(1, options.watermarkOpacity ?? 0.35));
  const rotationDeg = options.watermarkRotation ?? 45;
  const position = options.watermarkPosition ?? 'center';
  const targetPages =
    options.pagesToWatermark && options.pagesToWatermark.length > 0
      ? new Set(options.pagesToWatermark.map((p) => p - 1))
      : null;

  if (type === 'text') {
    const text = options.watermarkText?.trim() || 'CONFIDENTIAL';
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontSize = options.watermarkFontSize ?? 48;
    const color = parseHexColor(options.watermarkColor ?? '#e11d48');
    const textWidth = font.widthOfTextAtSize(text, fontSize);
    const textHeight = font.heightAtSize(fontSize);

    pages.forEach((page, index) => {
      if (targetPages && !targetPages.has(index)) return;
      const { width, height } = page.getSize();

      if (position === 'tile') {
        const stepX = textWidth * 1.6 + 60;
        const stepY = textHeight * 5 + 80;
        for (let x = -width; x < width * 2; x += stepX) {
          for (let y = -height; y < height * 2; y += stepY) {
            page.drawText(text, {
              x,
              y,
              size: fontSize * 0.75,
              font,
              color,
              opacity: opacity * 0.7,
              rotate: degrees(rotationDeg),
            });
          }
        }
      } else {
        let x = (width - textWidth) / 2;
        let y = (height - textHeight) / 2;

        const pad = 40;
        switch (position) {
          case 'top-left':
            x = pad;
            y = height - pad - textHeight;
            break;
          case 'top-center':
            x = (width - textWidth) / 2;
            y = height - pad - textHeight;
            break;
          case 'top-right':
            x = width - pad - textWidth;
            y = height - pad - textHeight;
            break;
          case 'center-left':
            x = pad;
            y = (height - textHeight) / 2;
            break;
          case 'center-right':
            x = width - pad - textWidth;
            y = (height - textHeight) / 2;
            break;
          case 'bottom-left':
            x = pad;
            y = pad;
            break;
          case 'bottom-center':
            x = (width - textWidth) / 2;
            y = pad;
            break;
          case 'bottom-right':
            x = width - pad - textWidth;
            y = pad;
            break;
          case 'center':
          default:
            x = (width - textWidth) / 2;
            y = (height - textHeight) / 2;
            break;
        }

        page.drawText(text, {
          x,
          y,
          size: fontSize,
          font,
          color,
          opacity,
          rotate: degrees(rotationDeg),
        });
      }
    });
  } else if (type === 'image' && options.watermarkImageData) {
    let image;
    const isPng = options.watermarkImageData.startsWith('data:image/png');
    const binary = Uint8Array.from(
      atob(options.watermarkImageData.split(',')[1] || ''),
      (c) => c.charCodeAt(0)
    );

    if (isPng) {
      image = await pdfDoc.embedPng(binary);
    } else {
      image = await pdfDoc.embedJpg(binary);
    }

    const { width: imgW, height: imgH } = image.size();
    const maxDim = 250;
    const scale = Math.min(maxDim / imgW, maxDim / imgH, 1);
    const drawW = imgW * scale;
    const drawH = imgH * scale;

    pages.forEach((page, index) => {
      if (targetPages && !targetPages.has(index)) return;
      const { width, height } = page.getSize();
      const x = (width - drawW) / 2;
      const y = (height - drawH) / 2;

      page.drawImage(image, {
        x,
        y,
        width: drawW,
        height: drawH,
        opacity,
        rotate: degrees(rotationDeg),
      });
    });
  }

  return pdfDoc.save({ useObjectStreams: true });
}
