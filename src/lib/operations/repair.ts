import { PDFDocument } from 'pdf-lib';

export interface RepairResult {
  data: Uint8Array;
  pagesRecovered: number;
  originalSize: number;
  repairedSize: number;
  strategyUsed: string;
}

type PdfJsModule = typeof import('pdfjs-dist/legacy/build/pdf');
let pdfjsLibPromise: Promise<PdfJsModule> | null = null;

async function getPdfJs(): Promise<PdfJsModule> {
  if (typeof window === 'undefined') throw new Error('PDF repair requires browser environment');
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

export async function repairPdf(
  fileOrData: File | ArrayBuffer | Uint8Array
): Promise<RepairResult> {
  const rawBytes =
    fileOrData instanceof File
      ? new Uint8Array(await fileOrData.arrayBuffer())
      : new Uint8Array(fileOrData);
  const originalSize = rawBytes.byteLength;

  // Strategy 1: Header / Trailing Garbage cleanup + PDF-lib re-indexing
  try {
    let cleanBytes = rawBytes;
    const headerIndex = cleanBytes.indexOf(0x25); // '%'
    if (headerIndex > 0) {
      cleanBytes = cleanBytes.subarray(headerIndex);
    }

    const pdfDoc = await PDFDocument.load(cleanBytes, {
      ignoreEncryption: true,
      parseSpeed: 100,
      throwOnInvalidObject: false,
    });

    const pageCount = pdfDoc.getPageCount();
    if (pageCount > 0) {
      const data = await pdfDoc.save({ useObjectStreams: true });
      return {
        data,
        pagesRecovered: pageCount,
        originalSize,
        repairedSize: data.byteLength,
        strategyUsed: 'Structure Re-indexing & Stream Rebuilding',
      };
    }
  } catch (err) {
    console.warn('Strategy 1 repair failed, escalating to Strategy 2:', err);
  }

  // Strategy 2: PDF.js tolerant parser & high-fidelity page reconstruction
  try {
    const pdfjs = await getPdfJs();
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const loadingTask = pdfjs.getDocument({
      data: rawBytes,
      cMapUrl: `${baseUrl}/cmaps/`,
      cMapPacked: true,
      standardFontDataUrl: `${baseUrl}/standard_fonts/`,
      stopAtErrors: false,
    });

    const sourceDoc = await loadingTask.promise;
    const numPages = sourceDoc.numPages;

    const newDoc = await PDFDocument.create();
    let recoveredCount = 0;

    for (let i = 1; i <= numPages; i++) {
      try {
        const page = await sourceDoc.getPage(i);
        const vp = page.getViewport({ scale: 2.0 }); // 144 DPI
        const canvas = document.createElement('canvas');
        canvas.width = Math.ceil(vp.width);
        canvas.height = Math.ceil(vp.height);
        const ctx = canvas.getContext('2d')!;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        await page.render({ canvasContext: ctx, viewport: vp, canvas } as Parameters<typeof page.render>[0]).promise;

        const blob = await new Promise<Blob>((res) =>
          canvas.toBlob((b) => res(b!), 'image/jpeg', 0.92)
        );
        const imgBytes = new Uint8Array(await blob.arrayBuffer());
        const embeddedImg = await newDoc.embedJpg(imgBytes);

        const newPage = newDoc.addPage([vp.width / 2, vp.height / 2]);
        newPage.drawImage(embeddedImg, {
          x: 0,
          y: 0,
          width: vp.width / 2,
          height: vp.height / 2,
        });

        recoveredCount++;
        page.cleanup();
      } catch (pageErr) {
        console.warn(`Failed to recover page ${i}:`, pageErr);
      }
    }

    if (recoveredCount > 0) {
      const data = await newDoc.save({ useObjectStreams: true });
      return {
        data,
        pagesRecovered: recoveredCount,
        originalSize,
        repairedSize: data.byteLength,
        strategyUsed: 'Tolerant Parser Page Extraction & Recompilation',
      };
    }
  } catch (err) {
    console.error('Strategy 2 repair failed:', err);
  }

  throw new Error('Unable to repair this file: file header or structure is critically damaged.');
}
