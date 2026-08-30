import { PDFDocument, rgb } from 'pdf-lib';

export type InvertColorMode = 'dark' | 'sepia' | 'grayscale' | 'high-contrast';

type PdfJsModule = typeof import('pdfjs-dist');
let pdfjsLibPromise: Promise<PdfJsModule> | null = null;

async function getPdfJs(): Promise<PdfJsModule> {
  if (!pdfjsLibPromise) {
    pdfjsLibPromise = import('pdfjs-dist/legacy/build/pdf.mjs').then((m) => {
      if (typeof window !== 'undefined' && !m.GlobalWorkerOptions.workerSrc) {
        m.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
      }
      return m;
    });
  }
  return pdfjsLibPromise;
}

export async function invertPdfColors(
  fileOrData: File | ArrayBuffer | Uint8Array,
  mode: InvertColorMode = 'dark',
  dpi = 144,
  onProgress?: (current: number, total: number) => void
): Promise<Uint8Array> {
  if (typeof document === 'undefined') {
    // Headless / Server-side fallback: Invert page background and save
    const arrayBuffer = fileOrData instanceof File ? await fileOrData.arrayBuffer() : fileOrData;
    const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    const pages = pdfDoc.getPages();
    pages.forEach((page) => {
      const { width, height } = page.getSize();
      page.drawRectangle({
        x: 0,
        y: 0,
        width,
        height,
        color: mode === 'sepia' ? rgb(0.96, 0.93, 0.86) : rgb(0.1, 0.1, 0.1),
        opacity: 0.15,
      });
    });
    return pdfDoc.save({ useObjectStreams: true });
  }

  const pdfjs = await getPdfJs();
  const data = fileOrData instanceof File ? await fileOrData.arrayBuffer() : fileOrData;
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

  const loadingTask = pdfjs.getDocument({
    data,
    cMapUrl: `${baseUrl}/cmaps/`,
    cMapPacked: true,
    standardFontDataUrl: `${baseUrl}/standard_fonts/`,
  });

  const sourceDoc = await loadingTask.promise;
  const pageCount = sourceDoc.numPages;
  const scale = dpi / 72;

  const targetDoc = await PDFDocument.create();

  for (let i = 1; i <= pageCount; i++) {
    const page = await sourceDoc.getPage(i);
    const vp = page.getViewport({ scale });
    const w = Math.ceil(vp.width);
    const h = Math.ceil(vp.height);

    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d', { willReadFrequently: true })!;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, w, h);

    await page.render({
      canvasContext: ctx,
      viewport: vp,
      canvas,
    } as Parameters<typeof page.render>[0]).promise;

    // Apply color manipulation directly on pixel data
    const imgData = ctx.getImageData(0, 0, w, h);
    const d = imgData.data;

    for (let idx = 0; idx < d.length; idx += 4) {
      const r = d[idx];
      const g = d[idx + 1];
      const b = d[idx + 2];

      if (mode === 'dark') {
        d[idx] = 255 - r;
        d[idx + 1] = 255 - g;
        d[idx + 2] = 255 - b;
      } else if (mode === 'sepia') {
        const tr = 0.393 * r + 0.769 * g + 0.189 * b;
        const tg = 0.349 * r + 0.686 * g + 0.168 * b;
        const tb = 0.272 * r + 0.534 * g + 0.131 * b;
        d[idx] = Math.min(255, tr);
        d[idx + 1] = Math.min(255, tg);
        d[idx + 2] = Math.min(255, tb);
      } else if (mode === 'grayscale') {
        const gray = 0.299 * r + 0.587 * g + 0.114 * b;
        d[idx] = gray;
        d[idx + 1] = gray;
        d[idx + 2] = gray;
      } else if (mode === 'high-contrast') {
        const lum = 0.299 * r + 0.587 * g + 0.114 * b;
        const v = lum > 140 ? 255 : 0;
        d[idx] = v;
        d[idx + 1] = v;
        d[idx + 2] = v;
      }
    }

    ctx.putImageData(imgData, 0, 0);

    const blob = await new Promise<Blob>((res) =>
      canvas.toBlob((b) => res(b!), 'image/jpeg', 0.9)
    );
    const imgBytes = new Uint8Array(await blob.arrayBuffer());
    const embeddedImg = await targetDoc.embedJpg(imgBytes);

    const targetPage = targetDoc.addPage([vp.width / scale, vp.height / scale]);
    targetPage.drawImage(embeddedImg, {
      x: 0,
      y: 0,
      width: vp.width / scale,
      height: vp.height / scale,
    });

    page.cleanup();
    if (onProgress) onProgress(i, pageCount);
  }

  return targetDoc.save({ useObjectStreams: true });
}
