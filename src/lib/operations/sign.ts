import { PDFDocument, degrees, PDFImage } from 'pdf-lib';

export interface SignaturePlacement {
  id: string;
  pageIndex: number; // 0-indexed target page
  x: number; // Screen X at unscaled 1.0 points (top-left)
  y: number; // Screen Y at unscaled 1.0 points (top-left)
  width: number;
  height: number;
  rotation?: number; // In degrees clockwise
  opacity?: number; // 0 to 1, default 1
  dataUrl: string; // Base64 PNG/JPG data URL
  type?: 'signature' | 'initial' | 'date' | 'text' | 'stamp';
  title?: string;
}

/**
 * Calculates bottom-left origin for pdf-lib drawImage when rotated around its center
 */
export function getRotatedPdfCoordinates(
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
 * Embeds signature images and stamps onto target PDF pages
 */
export async function signPdf(
  file: File | ArrayBuffer | Uint8Array,
  placements: SignaturePlacement[]
): Promise<Uint8Array> {
  let fileBytes: Uint8Array;
  if (file instanceof Uint8Array) {
    fileBytes = file;
  } else if (file instanceof ArrayBuffer) {
    fileBytes = new Uint8Array(file);
  } else {
    const ab = await file.arrayBuffer();
    fileBytes = new Uint8Array(ab);
  }

  const pdfDoc = await PDFDocument.load(fileBytes, { ignoreEncryption: true });
  const pageCount = pdfDoc.getPageCount();

  // Cache embedded image objects so identical signatures re-used across pages aren't duplicated in file size
  const embeddedImageCache = new Map<string, PDFImage>();

  for (const placement of placements) {
    if (placement.pageIndex < 0 || placement.pageIndex >= pageCount) {
      continue;
    }
    const page = pdfDoc.getPage(placement.pageIndex);
    const { height: pageHeight } = page.getSize();

    if (!placement.dataUrl) continue;

    let embeddedImage = embeddedImageCache.get(placement.dataUrl);
    if (!embeddedImage) {
      try {
        const isJpeg =
          placement.dataUrl.startsWith('data:image/jpeg') ||
          placement.dataUrl.startsWith('data:image/jpg');
        const base64Str = placement.dataUrl.split(',')[1];
        if (!base64Str) continue;
        const binaryStr = atob(base64Str);
        const imgBytes = new Uint8Array(binaryStr.length);
        for (let i = 0; i < binaryStr.length; i++) {
          imgBytes[i] = binaryStr.charCodeAt(i);
        }

        if (isJpeg) {
          embeddedImage = await pdfDoc.embedJpg(imgBytes);
        } else {
          embeddedImage = await pdfDoc.embedPng(imgBytes);
        }
        embeddedImageCache.set(placement.dataUrl, embeddedImage);
      } catch (err) {
        console.warn('Failed to embed signature image in PDF:', err);
        continue;
      }
    }

    const { drawX, drawY, angleDeg } = getRotatedPdfCoordinates(
      placement.x,
      placement.y,
      placement.width,
      placement.height,
      pageHeight,
      placement.rotation || 0
    );

    page.drawImage(embeddedImage, {
      x: drawX,
      y: drawY,
      width: placement.width,
      height: placement.height,
      opacity: placement.opacity ?? 1,
      rotate: angleDeg ? degrees(angleDeg) : undefined,
    });
  }

  return pdfDoc.save({ useObjectStreams: true });
}
