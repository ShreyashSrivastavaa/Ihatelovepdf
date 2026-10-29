import * as PDFOps from './pdf-operations';
import { pdfWorkerClient } from './worker-client';

// Re-export types from pdf-operations
export type PDFProcessingMode = PDFOps.PDFProcessingMode;
export type PDFProcessingOptions = PDFOps.PDFProcessingOptions;
export type ProcessingResult = PDFOps.ProcessingResult;
export type PdfToImagesArchiveResult = PDFOps.PdfToImagesArchiveResult;

/**
 * Compress a PDF file using the Web Worker
 */
export async function compressPDFFile(file: File, options: PDFProcessingOptions = {}): Promise<ProcessingResult> {
  try {
    const result = (await pdfWorkerClient.run('compress', [file], options)) as ProcessingResult;
    return result;
  } catch (error) {
    console.warn('Worker compression failed, falling back to main thread', error);
    return PDFOps.compressPDF(file, options);
  }
}

/**
 * Central dispatcher for all operations
 */
export async function processPDF(mode: 'compress', files: File[], options?: PDFProcessingOptions, onProgress?: (progress: number, status: string) => void): Promise<ProcessingResult>;
export async function processPDF(mode: 'split', files: File[], options?: PDFProcessingOptions, onProgress?: (progress: number, status: string) => void): Promise<Blob[]>;
export async function processPDF(mode: 'pdfToImages', files: File[], options?: PDFProcessingOptions, onProgress?: (progress: number, status: string) => void): Promise<PdfToImagesArchiveResult>;
export async function processPDF(mode: 'pdfToZip', files: File[], options?: PDFProcessingOptions, onProgress?: (progress: number, status: string) => void): Promise<Blob>;
export async function processPDF(mode: 'merge' | 'extract' | 'crop' | 'rotate' | 'reorder' | 'imagesToPdf', files: File[], options?: PDFProcessingOptions, onProgress?: (progress: number, status: string) => void): Promise<Blob>;
export async function processPDF(mode: PDFProcessingMode, files: File[], options?: PDFProcessingOptions, onProgress?: (progress: number, status: string) => void): Promise<ProcessingResult | Blob | Blob[] | PdfToImagesArchiveResult | string | unknown>;
export async function processPDF(
  mode: PDFProcessingMode,
  files: File[],
  options: PDFProcessingOptions = {},
  onProgress?: (progress: number, status: string) => void
): Promise<ProcessingResult | Blob | Blob[] | PdfToImagesArchiveResult | string | unknown> {
  if (
    files.length === 0 &&
    mode !== 'createPdf' &&
    mode !== 'latexResume' &&
    !options.markdownContent &&
    !options.htmlContent &&
    !options.csvContent &&
    !options.gstInvoice &&
    !options.posReceipt
  ) {
    throw new Error('No files or document content provided');
  }

  const primaryFile = files[0];

  switch (mode) {
    case 'compress':
      return compressPDFFile(primaryFile, options);

    case 'merge':
      return mergePDFsAsBlob(files, options);

    case 'split':
      return splitPDFAsBlobs(primaryFile, options);

    case 'extract': {
      if (!options.pagesToExtract || options.pagesToExtract.length === 0) {
        throw new Error('No pages selected');
      }
      return extractPagesAsBlob(primaryFile, options.pagesToExtract, options);
    }

    case 'crop': {
      if (!options.pagesToCrop || options.pagesToCrop.length === 0) {
        throw new Error('No pages selected');
      }
      return cropPagesAsBlob(primaryFile, options.pagesToCrop, options);
    }

    case 'rotate': {
      if (!options.pagesToRotate || options.pagesToRotate.length === 0) {
        throw new Error('No pages selected');
      }
      return rotatePagesAsBlob(primaryFile, options.pagesToRotate, options);
    }

    case 'reorder': {
      if (!options.pageOrder || options.pageOrder.length === 0) {
        throw new Error('No page order provided');
      }
      return reorderViaExtract(primaryFile, options.pageOrder, options);
    }

    case 'pdfToImages':
      return (await pdfWorkerClient.run('pdfToImages', [primaryFile], options, undefined, onProgress)) as Promise<PdfToImagesArchiveResult>;

    case 'imagesToPdf':
      return convertImagesToPdfAsBlob(files, options);

    case 'watermark': {
      try {
        const bytes = (await pdfWorkerClient.run('watermark', [primaryFile], options, undefined, onProgress)) as Uint8Array;
        return createPdfBlob(bytes);
      } catch (err) {
        console.warn('Worker watermark failed, falling back to main thread', err);
        const bytes = await PDFOps.applyWatermarkToPdf(primaryFile, options.watermark || {});
        return createPdfBlob(bytes);
      }
    }

    case 'pageNumbers': {
      try {
        const bytes = (await pdfWorkerClient.run('pageNumbers', [primaryFile], options, undefined, onProgress)) as Uint8Array;
        return createPdfBlob(bytes);
      } catch (err) {
        console.warn('Worker pageNumbers failed, falling back to main thread', err);
        const bytes = await PDFOps.addPageNumbersToPdf(primaryFile, options.pageNumbers || {});
        return createPdfBlob(bytes);
      }
    }

    case 'headersFooters': {
      try {
        const bytes = (await pdfWorkerClient.run('headersFooters', [primaryFile], options, undefined, onProgress)) as Uint8Array;
        return createPdfBlob(bytes);
      } catch (err) {
        console.warn('Worker headersFooters failed, falling back to main thread', err);
        const bytes = await PDFOps.addHeadersFootersToPdf(primaryFile, options.headersFooters || {});
        return createPdfBlob(bytes);
      }
    }

    case 'extractText':
      return PDFOps.extractPdfText(primaryFile);

    case 'invertColors': {
      const bytes = await PDFOps.invertPdfColors(
        primaryFile,
        (options.invertColorMode || 'dark') as PDFOps.InvertColorMode,
        options.downscaleImagesDpi || 144
      );
      return createPdfBlob(bytes);
    }

    case 'redact': {
      const redactions = options.redactions || [];
      const bytes = await PDFOps.redactPdf(primaryFile, redactions, options.redactionOptions);
      return createPdfBlob(bytes);
    }

    case 'pdfToZip': {
      const zipBytes = (await pdfWorkerClient.run('pdfToZip', files, options, undefined, onProgress)) as Uint8Array;
      return createZipBlob(zipBytes);
    }

    case 'encrypt': {
      try {
        const bytes = (await pdfWorkerClient.run('encrypt', [primaryFile], options, undefined, onProgress)) as Uint8Array;
        return createPdfBlob(bytes);
      } catch (workerErr) {
        console.warn('Worker encryption failed, executing on main thread', workerErr);
        const bytes = await PDFOps.encryptPdf(
          primaryFile,
          options.userPassword || options.password,
          options.ownerPassword,
          options.encryptionPermissions,
          options.encryptionAlgorithm || 'AES-256'
        );
        return createPdfBlob(bytes);
      }
    }

    case 'decrypt': {
      try {
        const bytes = (await pdfWorkerClient.run('decrypt', [primaryFile], options, undefined, onProgress)) as Uint8Array;
        return createPdfBlob(bytes);
      } catch (workerErr) {
        console.warn('Worker decryption failed, executing on main thread', workerErr);
        const bytes = await PDFOps.decryptPdf(primaryFile, options.password || options.decryptionPassword || '');
        return createPdfBlob(bytes);
      }
    }



    case 'createPdf': {
      if (options.documentModel) {
        const bytes = await PDFOps.buildPdfFromDocumentModel(options.documentModel);
        return createPdfBlob(bytes);
      }
      const pageCount = options.blankPageCount ?? 1;
      const pageSize = options.blankPageSize ?? 'a4';
      const orientation = options.blankPageOrientation ?? 'portrait';
      const bytes = await PDFOps.createBlankPdf({
        pageCount,
        pageSize,
        orientation,
      });
      return createPdfBlob(bytes);
    }

    case 'markdownToPdf': {
      const text =
        options.markdownContent ||
        (primaryFile ? await primaryFile.text() : '# New Document\n\nType your content here.');
      const bytes = await PDFOps.convertMarkdownToPdf(text, { title: options.documentTitle });
      return createPdfBlob(bytes);
    }

    case 'htmlToPdf': {
      const html =
        options.htmlContent ||
        (primaryFile ? await primaryFile.text() : '<h1>Document</h1><p>HTML Content</p>');
      const bytes = await PDFOps.convertHtmlToPdf(html, { title: options.documentTitle });
      return createPdfBlob(bytes);
    }

    case 'csvToPdf': {
      const csv =
        options.csvContent ||
        (primaryFile ? await primaryFile.text() : 'Name,Email,Role\nAlice,alice@example.com,Admin');
      const bytes = await PDFOps.convertCsvToPdf(csv, { title: options.documentTitle });
      return createPdfBlob(bytes);
    }

    case 'excelToPdf': {
      const bytes = await PDFOps.convertExcelToPdf(primaryFile);
      return createPdfBlob(bytes);
    }

    case 'pdfToExcel': {
      return PDFOps.convertPdfToExcel(primaryFile);
    }

    case 'powerpointToPdf': {
      const bytes = await PDFOps.convertPowerpointToPdf(primaryFile);
      return createPdfBlob(bytes);
    }

    case 'pdfToPowerpoint': {
      return PDFOps.convertPdfToPowerpoint(
        primaryFile,
        onProgress
          ? (current, total) => {
              onProgress(Math.round((current / total) * 100), `Rendering slide ${current} of ${total}`);
            }
          : undefined
      );
    }

    case 'pdfToHtml': {
      const htmlString = await PDFOps.convertPdfToHtml(primaryFile);
      return new Blob([htmlString], { type: 'text/html;charset=utf-8' });
    }

    case 'pdfToEpub': {
      return PDFOps.convertPdfToEpub(primaryFile, options.documentTitle);
    }

    case 'ebookToPdf': {
      const bytes = await PDFOps.convertEbookToPdf(primaryFile);
      return createPdfBlob(bytes);
    }

    case 'gstInvoice': {
      const bytes = await PDFOps.generateGstInvoicePdf(
        options.gstInvoice || {
          sellerName: 'Your Business Name',
          sellerGstin: '27AAAAA0000A1Z5',
          sellerAddress: 'Mumbai, Maharashtra',
          buyerName: 'Client Name',
          buyerGstin: 'URP',
          buyerAddress: 'Pune, Maharashtra',
          invoiceNumber: 'INV-2026-001',
          invoiceDate: new Date().toISOString().split('T')[0],
          placeOfSupply: 'Maharashtra (27)',
          items: [
            { description: 'Professional Services', hsn: '998314', quantity: 1, rate: 25000, cgstRate: 9, sgstRate: 9, igstRate: 0 },
          ],
        }
      );
      return createPdfBlob(bytes);
    }

    case 'posBilling': {
      const bytes = await PDFOps.generatePosReceiptPdf(
        options.posReceipt || {
          storeName: 'MY RETAIL STORE',
          storeAddress: '123 Market Road, City',
          receiptNumber: 'POS-8901',
          items: [
            { name: 'Product A', quantity: 2, price: 150 },
            { name: 'Product B', quantity: 1, price: 299 },
          ],
        }
      );
      return createPdfBlob(bytes);
    }

    case 'signPdf': {
      if (primaryFile) {
        const placements = options.signaturePlacements || [];
        const bytes = await PDFOps.signPdf(primaryFile, placements);
        return createPdfBlob(bytes);
      }
      throw new Error('No PDF file provided to sign');
    }

    case 'fillPdfForm': {
      if (primaryFile) {
        const fieldValues = options.formFieldValues || {};
        const freeformPlacements = options.freeformTextPlacements || [];
        const flatten = options.flattenForm !== undefined ? options.flattenForm : true;
        const bytes = await PDFOps.fillPdfForm(primaryFile, {
          acroValues: fieldValues,
          flatten,
          textPlacements: freeformPlacements,
        });
        return createPdfBlob(bytes);
      }
      throw new Error('No PDF file provided to fill form');
    }

    case 'latexResume': {
      const data = options.resumeData || PDFOps.SAMPLE_RESUME_DATA;
      const templateId = options.resumeTemplateId || 'jakes';
      const bytes = await PDFOps.generateResumePdf(data, templateId);
      return createPdfBlob(bytes);
    }

    case 'whiteboard': {
      // Return file as PDF Blob or blank template PDF
      if (primaryFile) {
        return createPdfBlob(new Uint8Array(await primaryFile.arrayBuffer()));
      }
      const bytes = await PDFOps.convertMarkdownToPdf('# Whiteboard Canvas\n\nVisual markups and annotations exported.', { title: 'Whiteboard Canvas' });
      return createPdfBlob(bytes);
    }

    case 'editPdf': {
      if (primaryFile) {
        if (options.documentEditState) {
          const editedBytes = await PDFOps.applyPdfEdits(await primaryFile.arrayBuffer(), options.documentEditState);
          return createPdfBlob(editedBytes);
        }
        return createPdfBlob(new Uint8Array(await primaryFile.arrayBuffer()));
      }
      const bytes = await PDFOps.convertMarkdownToPdf('# Edited Document\n\nDocument text edited.', { title: 'Edited Document' });
      return createPdfBlob(bytes);
    }

    default:
      throw new Error(`Unsupported mode: ${mode}`);
  }
}

/**
 * Merge PDFs and return as Blob (via worker)
 */
export async function mergePDFsAsBlob(files: File[], options: PDFProcessingOptions): Promise<Blob> {
  try {
    const pdfBytes = (await pdfWorkerClient.run('merge', files, options)) as Uint8Array;
    return createPdfBlob(pdfBytes);
  } catch (error) {
    console.warn('Worker merge failed, falling back to main thread', error);
    const pdfBytes = await PDFOps.mergePDFs(files, options);
    return createPdfBlob(pdfBytes);
  }
}

/**
 * Split PDF and return as array of Blobs (via worker)
 */
export async function splitPDFAsBlobs(file: File, options: PDFProcessingOptions): Promise<Blob[]> {
  try {
    const pdfBytesArray = (await pdfWorkerClient.run('split', [file], options)) as Uint8Array[];
    return pdfBytesArray.map(createPdfBlob);
  } catch (error) {
    console.warn('Worker split failed, falling back to main thread', error);
    const pdfBytesArray = await PDFOps.splitPDF(file, options);
    return pdfBytesArray.map(createPdfBlob);
  }
}

/**
 * Extract pages and return as Blob (via worker)
 */
export async function extractPagesAsBlob(file: File, pageNumbers: number[], options: PDFProcessingOptions): Promise<Blob> {
  try {
    const pdfBytes = (await pdfWorkerClient.run('extract', [file], {
      ...options,
      pagesToExtract: pageNumbers,
    })) as Uint8Array;

    return createPdfBlob(pdfBytes);
  } catch (error) {
    console.warn('Worker extract failed, falling back to main thread', error);
    const pdfBytes = await PDFOps.extractPages(file, pageNumbers, options);
    return createPdfBlob(pdfBytes);
  }
}

export async function cropPagesAsBlob(file: File, pageNumbers: number[], options: PDFProcessingOptions): Promise<Blob> {
  try {
    const pdfBytes = (await pdfWorkerClient.run('crop', [file], {
      ...options,
      pagesToCrop: pageNumbers,
    })) as Uint8Array;

    return createPdfBlob(pdfBytes);
  } catch (error) {
    console.warn('Worker crop failed, falling back to main thread', error);
    const pdfBytes = await PDFOps.cropPages(file, pageNumbers, options);
    return createPdfBlob(pdfBytes);
  }
}

export async function rotatePagesAsBlob(file: File, pageNumbers: number[], options: PDFProcessingOptions): Promise<Blob> {
  try {
    const pdfBytes = (await pdfWorkerClient.run('rotate', [file], {
      ...options,
      pagesToRotate: pageNumbers,
    })) as Uint8Array;
    return createPdfBlob(pdfBytes);
  } catch (error) {
    console.warn('Worker rotate failed, falling back to main thread', error);
    const pdfBytes = await PDFOps.rotatePages(file, pageNumbers, options.rotationDegrees ?? 90, options);
    return createPdfBlob(pdfBytes);
  }
}

/**
 * Reorder pages and return as Blob (via worker)
 */
async function reorderViaExtract(file: File, order: number[], options: PDFProcessingOptions): Promise<Blob> {
  try {
    const pdfBytes = (await pdfWorkerClient.run('reorder', [file], {
      ...options,
      pageOrder: order,
    })) as Uint8Array;

    return createPdfBlob(pdfBytes);
  } catch (error) {
    console.warn('Worker reorder failed, falling back to main thread', error);
    const pdfBytes = await PDFOps.reorderPages(file, order, options);
    return createPdfBlob(pdfBytes);
  }
}

async function convertImagesToPdfAsBlob(files: File[], options: PDFProcessingOptions): Promise<Blob> {
  if (files.length === 0) {
    throw new Error('No images provided');
  }

  try {
    const pdfBytes = (await pdfWorkerClient.run('imagesToPdf', files, options)) as Uint8Array;
    return createPdfBlob(pdfBytes);
  } catch (error) {
    console.warn('Worker imagesToPdf failed, falling back to main thread', error);
    const pdfBytes = await PDFOps.convertImagesToPdf(files, options);
    return createPdfBlob(pdfBytes);
  }
}

export function createPdfBlob(bytes: Uint8Array): Blob {
  // Pipeline logging: surface zero-byte results immediately instead of silently
  // producing blank PDFs. A detached ArrayBuffer (byteLength === 0) here means
  // the worker transferred ownership of the buffer before the main thread read it.
  if (bytes.byteLength === 0) {
    console.error('[PDFPipeline] createPdfBlob received a zero-length Uint8Array. The ArrayBuffer may have been detached during Worker postMessage transfer.');
    throw new Error('PDF output is empty (0 bytes). This usually means the processing result was lost during Worker transfer. Check the browser console for details.');
  }
  console.info(`[PDFPipeline] createPdfBlob: ${bytes.byteLength} bytes → Blob`);

  if (bytes.buffer instanceof ArrayBuffer) {
    const arrayBuffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
    return new Blob([arrayBuffer], { type: 'application/pdf' });
  }

  const arrayBuffer = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(arrayBuffer).set(bytes);
  return new Blob([arrayBuffer], { type: 'application/pdf' });
}

export function createZipBlob(bytes: Uint8Array): Blob {
  if (bytes.byteOffset === 0 && bytes.byteLength === bytes.buffer.byteLength && bytes.buffer instanceof ArrayBuffer) {
    return new Blob([bytes.buffer], { type: 'application/zip' });
  }
  const arrayBuffer = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(arrayBuffer).set(bytes);
  return new Blob([arrayBuffer], { type: 'application/zip' });
}

/**
 * Get PDF page count (delegated to worker for consistency)
 */
export async function getPdfPageCount(file: File): Promise<number> {
  try {
    return (await pdfWorkerClient.run('pageCount', [file])) as number;
  } catch {
    return PDFOps.getPDFPageCount(file);
  }
}

export async function getPdfPageDimensions(file: File, pageNumber: number): Promise<{ width: number; height: number }> {
  return PDFOps.getPDFPageDimensions(file, pageNumber);
}

/**
 * Render PDF thumbnail (MUST stay on main thread due to Canvas)
 */
export async function renderPdfThumbnail(file: File, pageNumber: number, targetWidth?: number): Promise<string> {
  return PDFOps.renderPDFThumbnail(file, pageNumber, targetWidth);
}
