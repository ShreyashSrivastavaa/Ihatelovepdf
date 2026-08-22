import { convertMarkdownToPdf } from './converters';

export interface OcrResult {
  text: string;
  confidence: number;
  pdfData?: Uint8Array;
}

/**
 * Executes 100% client-side WebAssembly OCR using Tesseract.js.
 * Dynamically loads the Tesseract engine on demand with granular progress updates.
 */
export async function runClientOcr(
  imageOrCanvas: HTMLCanvasElement | Blob | string,
  language = 'eng',
  onProgress?: (progress: number, status: string) => void
): Promise<OcrResult> {
  if (onProgress) {
    onProgress(5, 'Loading client-side OCR engine (~2MB WebAssembly)...');
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

    const ret = await worker.recognize(imageOrCanvas);
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
