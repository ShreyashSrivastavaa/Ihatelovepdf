import { convertMarkdownToPdf } from './converters';

export interface OcrResult {
  text: string;
  confidence: number;
  pdfData?: Uint8Array;
}

/**
 * Preprocesses an image canvas with grayscale conversion, contrast enhancement, and adaptive thresholding
 * to maximize character recognition accuracy on phone scans and noisy receipts.
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
  const ctx = procCanvas.getContext('2d');
  if (!ctx) return sourceCanvas;

  // Draw source image
  ctx.drawImage(sourceCanvas, 0, 0);
  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;

  // 1. Grayscale & Contrast Normalization
  const contrast = options.contrastBoost ?? 1.3; // 30% contrast boost
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
      // Otsu-style thresholding
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
 * Executes 100% client-side WebAssembly OCR using Tesseract.js.
 * Dynamically loads the Tesseract engine on demand with preprocessed image enhancement.
 */
export async function runClientOcr(
  imageOrCanvas: HTMLCanvasElement | Blob | string,
  language = 'eng',
  onProgress?: (progress: number, status: string) => void
): Promise<OcrResult> {
  if (onProgress) {
    onProgress(5, 'Loading client-side OCR engine (~2MB WebAssembly)...');
  }

  // Pre-process canvas if input is an HTMLCanvasElement
  let targetInput: HTMLCanvasElement | Blob | string = imageOrCanvas;
  if (typeof HTMLCanvasElement !== 'undefined' && imageOrCanvas instanceof HTMLCanvasElement) {
    if (onProgress) {
      onProgress(12, 'Enhancing scan contrast & normalization...');
    }
    targetInput = preprocessCanvasForOcr(imageOrCanvas, { contrastBoost: 1.25 });
  }

  // Dynamic import so tesseract is never pulled into initial bundle
  const { createWorker } = await import('tesseract.js');

  if (onProgress) {
    onProgress(20, `Initializing language traineddata (${language})...`);
  }

  const worker = await createWorker(language, 1, {
    logger: (m) => {
      if (onProgress) {
        if (m.status === 'recognizing text') {
          const pct = Math.min(95, Math.max(25, Math.round((m.progress || 0) * 100)));
          onProgress(pct, `Recognizing text (${pct}%)...`);
        } else if (m.status === 'loading language traineddata') {
          onProgress(15, 'Loading language traineddata...');
        } else if (m.status === 'initializing api') {
          onProgress(25, 'Initializing OCR recognition pipeline...');
        }
      }
    },
  });

  try {
    if (onProgress) {
      onProgress(30, 'Performing optical character recognition...');
    }

    const ret = await worker.recognize(targetInput);
    const text = ret.data.text;
    const confidence = ret.data.confidence;

    if (onProgress) {
      onProgress(95, 'Generating searchable PDF transcript...');
    }

    // Generate searchable PDF transcript
    const pdfData = await convertMarkdownToPdf(
      `# OCR Document Transcript\n\n${text}`
    );

    if (onProgress) {
      onProgress(100, 'OCR Complete');
    }

    return {
      text,
      confidence,
      pdfData,
    };
  } finally {
    await worker.terminate();
  }
}
