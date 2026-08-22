import {
  compressPDF,
  mergePDFs,
  splitPDF,
  extractPages,
  cropPages,
  rotatePages,
  reorderPages,
  getPDFPageCount,
  convertPdfToImages,
  convertImagesToPdf,
  applyWatermarkToPdf,
  addPageNumbersToPdf,
  addHeadersFootersToPdf,
  flattenPdf,
  sanitizePdfMetadata,
  encryptPdf,
  decryptPdf,
  repairPdf,
  ProcessingResult,
} from '../lib/pdf-operations';

// Polyfill document/window for PDF.js in worker environment
if (typeof self !== 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!(self as any).window) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (self as any).window = self;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!(self as any).document) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (self as any).document = {
      createElement: (tagName: string) => {
        if (tagName === 'canvas') {
          if (typeof OffscreenCanvas !== 'undefined') {
            return new OffscreenCanvas(1, 1);
          }
          throw new Error('OffscreenCanvas not supported in this worker');
        }
        return {
          getContext: () => null,
          style: {},
        };
      },
      head: { appendChild: () => {} },
      body: { appendChild: () => {} },
      baseURI: self.location.href,
    };
  }
}

self.onmessage = async (e: MessageEvent) => {
  const { id, mode, files, options } = e.data;

  try {
    let result: unknown;

    switch (mode) {
      case 'compress':
        result = await compressPDF(files[0], options);
        break;
      case 'merge':
        result = await mergePDFs(files, options);
        break;
      case 'split':
        result = await splitPDF(files[0], options);
        break;
      case 'extract':
        result = await extractPages(files[0], options.pagesToExtract, options);
        break;
      case 'crop':
        result = await cropPages(files[0], options.pagesToCrop ?? [], options);
        break;
      case 'rotate':
        result = await rotatePages(files[0], options.pagesToRotate ?? [], options.rotationDegrees ?? 90, options);
        break;
      case 'reorder':
        result = await reorderPages(files[0], options.pageOrder, options);
        break;
      case 'pageCount':
        result = await getPDFPageCount(files[0]);
        break;
      case 'pdfToImages':
        result = await convertPdfToImages(files[0], options);
        break;
      case 'imagesToPdf':
        result = await convertImagesToPdf(files, options);
        break;
      case 'watermark':
        result = await applyWatermarkToPdf(files[0], options.watermark || {});
        break;
      case 'pageNumbers':
        result = await addPageNumbersToPdf(files[0], options.pageNumbers || {});
        break;
      case 'headersFooters':
        result = await addHeadersFootersToPdf(files[0], options.headersFooters || {});
        break;
      case 'flatten':
        result = await flattenPdf(files[0], options.flatten || {});
        break;
      case 'sanitizeMetadata':
        result = await sanitizePdfMetadata(files[0]);
        break;
      case 'encrypt':
      case 'lockPdf':
        result = await encryptPdf(files[0], options.userPassword, options.ownerPassword);
        break;
      case 'decrypt':
      case 'unlockPdf':
        result = await decryptPdf(files[0], options.decryptionPassword || options.password);
        break;
      case 'repair':
        result = await repairPdf(files[0]);
        break;
      default:
        throw new Error(`Unsupported mode in worker: ${mode}`);
    }

    // Zero-copy Transferable objects
    const transfer: Transferable[] = [];

    if (result instanceof Uint8Array) {
      transfer.push(result.buffer);
    } else if (result && typeof result === 'object' && 'data' in result && (result as ProcessingResult).data instanceof Uint8Array) {
      transfer.push((result as ProcessingResult).data.buffer);
    } else if (Array.isArray(result)) {
      result.forEach((item) => {
        if (item instanceof Uint8Array) {
          transfer.push(item.buffer);
        }
      });
    }

    (self as unknown as Worker).postMessage({ id, success: true, result }, transfer);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    (self as unknown as Worker).postMessage({ id, success: false, error: errorMessage || 'Worker execution error' });
  }
};
