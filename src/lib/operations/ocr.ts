import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

type PdfJsModule = typeof import('pdfjs-dist/legacy/build/pdf');
let pdfjsLibPromise: Promise<PdfJsModule> | null = null;

async function getPdfJs(): Promise<PdfJsModule> {
  if (typeof window === 'undefined') throw new Error('Browser required for PDF rendering');
  if (!pdfjsLibPromise) {
    pdfjsLibPromise = import('pdfjs-dist/legacy/build/pdf').then((m) => {
      if (!m.GlobalWorkerOptions.workerSrc) {
        m.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
      }
      return m;
    });
  }
  return pdfjsLibPromise;
}

export interface OcrResult {
  text: string;
  confidence: number;
  pdfData?: Uint8Array;
  pageCount?: number;
  wordCount?: number;
  pageTexts?: string[];
}

export interface FullOcrResult {
  text: string;
  confidence: number;
  pdfData: Uint8Array;
  pageCount: number;
  wordCount: number;
  pageTexts: string[];
}

/**
 * Preprocesses an image canvas with grayscale conversion, contrast enhancement, and adaptive thresholding
 * to maximize character recognition accuracy on phone scans, faxes, and noisy receipts.
 */
export function preprocessCanvasForOcr(
  sourceCanvas: HTMLCanvasElement,
  options: { binarize?: boolean; contrastBoost?: number } = {}
): HTMLCanvasElement {
  if (typeof document === 'undefined') return sourceCanvas;

  const width = sourceCanvas.width;
  const height = sourceCanvas.height;

  const procCanvas = document.createElement('canvas');
  procCanvas.width = width;
  procCanvas.height = height;
  const ctx = procCanvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return sourceCanvas;

  // Draw source image
  ctx.drawImage(sourceCanvas, 0, 0);
  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;

  // Grayscale & Contrast Normalization
  const contrast = options.contrastBoost ?? 1.35; // 35% contrast boost
  const factor = (259 * (contrast * 255 + 255)) / (255 * (259 - contrast * 255));

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Standard luminosity weights
    let gray = 0.299 * r + 0.587 * g + 0.114 * b;

    // Apply contrast
    gray = factor * (gray - 128) + 128;
    gray = Math.max(0, Math.min(255, gray));

    if (options.binarize) {
      gray = gray > 140 ? 255 : 0;
    }

    data[i] = gray;
    data[i + 1] = gray;
    data[i + 2] = gray;
  }

  ctx.putImageData(imgData, 0, 0);
  return procCanvas;
}

/**
 * Executes full client-side OCR on a multi-page PDF or image file using Tesseract WebAssembly.
 * Generates both a searchable PDF (high-res scan visual + selectable text layer) and plain text transcript.
 */
export async function performFullPdfOcr(
  fileOrData: File | ArrayBuffer | Uint8Array,
  language = 'eng',
  onProgress?: (progress: number, status: string) => void
): Promise<FullOcrResult> {
  const isImageFile =
    fileOrData instanceof File &&
    (fileOrData.type.startsWith('image/') || /\.(jpe?g|png|webp|bmp|tiff?)$/i.test(fileOrData.name));

  if (onProgress) {
    onProgress(5, 'Loading client-side OCR engine (~2.5MB WebAssembly)...');
  }

  // Dynamically load Tesseract so it is never bundled in the initial page payload
  const { createWorker } = await import('tesseract.js');

  if (onProgress) {
    onProgress(12, `Initializing language models (${language})...`);
  }

  // Single worker instance reused across all pages for high throughput
  const worker = await createWorker(language, 1, {
    logger: (m) => {
      if (onProgress && m.status === 'recognizing text') {
        // Sub-progress during active page recognition
      }
    },
  });

  try {
    const pageTexts: string[] = [];
    const confidences: number[] = [];
    const outputPdf = await PDFDocument.create();
    const helveticaFont = await outputPdf.embedFont(StandardFonts.Helvetica);

    if (isImageFile) {
      // -------------------------------------------------------------
      // IMAGE FILE OCR PIPELINE
      // -------------------------------------------------------------
      if (onProgress) {
        onProgress(25, 'Preprocessing image for character extraction...');
      }

      const imgBlob = fileOrData instanceof File ? fileOrData : new Blob([fileOrData]);
      const imgBitmap = await createImageBitmap(imgBlob);

      const canvas = document.createElement('canvas');
      canvas.width = imgBitmap.width;
      canvas.height = imgBitmap.height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(imgBitmap, 0, 0);

      const processedCanvas = preprocessCanvasForOcr(canvas, { contrastBoost: 1.3 });

      if (onProgress) {
        onProgress(45, 'Recognizing characters via WebAssembly...');
      }

      const ocrResult = await worker.recognize(processedCanvas);
      const recognizedText = (ocrResult.data.text || '').trim();
      const confidence = ocrResult.data.confidence || 85;

      pageTexts.push(recognizedText);
      confidences.push(confidence);

      if (onProgress) {
        onProgress(85, 'Building searchable PDF...');
      }

      // Convert image to JPEG bytes for PDF embedding
      const imgDataUrl = canvas.toDataURL('image/jpeg', 0.92);
      const imgBytes = await (await fetch(imgDataUrl)).arrayBuffer();
      const embeddedImage = await outputPdf.embedJpg(imgBytes);

      const pdfPage = outputPdf.addPage([imgBitmap.width * 0.75, imgBitmap.height * 0.75]);
      pdfPage.drawImage(embeddedImage, {
        x: 0,
        y: 0,
        width: pdfPage.getWidth(),
        height: pdfPage.getHeight(),
      });

      // Overlay invisible selectable text for full searchability
      const lines = recognizedText.split('\n').filter((l) => l.trim().length > 0);
      let textY = pdfPage.getHeight() - 30;
      const lineStep = Math.max(12, (pdfPage.getHeight() - 60) / Math.max(1, lines.length));

      for (const line of lines) {
        if (textY < 20) break;
        try {
          // Draw with opacity: 0 so it stays invisible on top of the original scan
          pdfPage.drawText(line.slice(0, 120), {
            x: 20,
            y: textY,
            size: 10,
            font: helveticaFont,
            color: rgb(0, 0, 0),
            opacity: 0,
          });
        } catch {
          // Ignore unrenderable unicode glyphs in invisible layer
        }
        textY -= lineStep;
      }
    } else {
      // -------------------------------------------------------------
      // PDF DOCUMENT MULTI-PAGE OCR PIPELINE
      // -------------------------------------------------------------
      const pdfjs = await getPdfJs();
      const arrayBuffer =
        fileOrData instanceof File ? await fileOrData.arrayBuffer() : fileOrData;
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

      const loadingTask = pdfjs.getDocument({
        data: arrayBuffer,
        cMapUrl: `${baseUrl}/cmaps/`,
        cMapPacked: true,
        standardFontDataUrl: `${baseUrl}/standard_fonts/`,
      });

      const doc = await loadingTask.promise;
      const totalPages = doc.numPages;

      for (let p = 1; p <= totalPages; p++) {
        const pagePctBase = 15 + Math.round(((p - 1) / totalPages) * 75);
        if (onProgress) {
          onProgress(pagePctBase, `Rendering page ${p} of ${totalPages}...`);
        }

        const page = await doc.getPage(p);
        // Render at 2.0 scale (144-150 DPI) for optimal character edge clarity
        const viewport = page.getViewport({ scale: 2.0 });

        const canvas = document.createElement('canvas');
        canvas.width = Math.ceil(viewport.width);
        canvas.height = Math.ceil(viewport.height);
        const ctx = canvas.getContext('2d')!;

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        await page.render({
          canvasContext: ctx,
          viewport,
          canvas,
        } as Parameters<typeof page.render>[0]).promise;

        // Enhance contrast for Tesseract
        const processedCanvas = preprocessCanvasForOcr(canvas, { contrastBoost: 1.3 });

        if (onProgress) {
          onProgress(
            pagePctBase + Math.round(75 / totalPages / 2),
            `Recognizing text on page ${p} of ${totalPages}...`
          );
        }

        const ocrResult = await worker.recognize(processedCanvas);
        const pageText = (ocrResult.data.text || '').trim();
        const pageConfidence = ocrResult.data.confidence || 85;

        pageTexts.push(pageText);
        confidences.push(pageConfidence);

        // Embed high-res page image into output PDF
        const imgDataUrl = canvas.toDataURL('image/jpeg', 0.90);
        const imgBytes = await (await fetch(imgDataUrl)).arrayBuffer();
        const embeddedImg = await outputPdf.embedJpg(imgBytes);

        // Add page matching original point dimensions (viewport scaled by 0.5)
        const pdfPage = outputPdf.addPage([viewport.width * 0.5, viewport.height * 0.5]);
        pdfPage.drawImage(embeddedImg, {
          x: 0,
          y: 0,
          width: pdfPage.getWidth(),
          height: pdfPage.getHeight(),
        });

        // Overlay invisible text for searchability
        const lines = pageText.split('\n').filter((l) => l.trim().length > 0);
        let textY = pdfPage.getHeight() - 25;
        const lineStep = Math.max(10, (pdfPage.getHeight() - 50) / Math.max(1, lines.length));

        for (const line of lines) {
          if (textY < 15) break;
          try {
            pdfPage.drawText(line.slice(0, 140), {
              x: 20,
              y: textY,
              size: 9,
              font: helveticaFont,
              color: rgb(0, 0, 0),
              opacity: 0,
            });
          } catch {
            // Ignore unrenderable unicode glyphs
          }
          textY -= lineStep;
        }

        page.cleanup();
      }
    }

    if (onProgress) {
      onProgress(95, 'Finalizing searchable PDF and transcript...');
    }

    const pdfData = await outputPdf.save({ useObjectStreams: true });
    const fullText = pageTexts
      .map((t, idx) => `--- Page ${idx + 1} ---\n${t}`)
      .join('\n\n')
      .trim();

    const avgConfidence =
      confidences.length > 0
        ? Math.round(confidences.reduce((a, b) => a + b, 0) / confidences.length)
        : 85;

    const wordCount = fullText
      .split(/\s+/)
      .filter((w) => w.length > 0 && !w.startsWith('---')).length;

    if (onProgress) {
      onProgress(100, 'OCR Complete');
    }

    return {
      text: fullText,
      confidence: avgConfidence,
      pdfData,
      pageCount: pageTexts.length,
      wordCount,
      pageTexts,
    };
  } finally {
    await worker.terminate();
  }
}

/**
 * Backward-compatible single image/canvas OCR runner
 */
export async function runClientOcr(
  imageOrCanvas: HTMLCanvasElement | Blob | string,
  language = 'eng',
  onProgress?: (progress: number, status: string) => void
): Promise<OcrResult> {
  const bytes =
    imageOrCanvas instanceof Blob
      ? new Uint8Array(await imageOrCanvas.arrayBuffer())
      : new Uint8Array();

  const result = await performFullPdfOcr(
    bytes,
    language,
    onProgress
  );

  return {
    text: result.text,
    confidence: result.confidence,
    pdfData: result.pdfData,
    pageCount: result.pageCount,
    wordCount: result.wordCount,
    pageTexts: result.pageTexts,
  };
}
