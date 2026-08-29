/**
 * PDF Operations using PDF-lib
 * Clean abstraction layer for PDF processing operations
 */

import {
  PDFDict,
  PDFDocument,
  PDFName,
  PDFRawStream,
  PDFRef,
  PDFArray,
  PDFNumber,
  degrees,
  rgb,
} from 'pdf-lib';

import type { OperationKey } from '../types/operations';
import type { WatermarkOptions } from './operations/watermark';
import type { PageNumberOptions } from './operations/page-numbers';
import type { HeaderFooterOptions } from './operations/headers-footers';
import type { RedactionBox } from './operations/redact';
import type { GstInvoiceData, PosReceiptData } from './operations/business';
import type { BlankPdfPageSize, BlankPdfOrientation } from './operations/converters';
import type { DocumentModel } from './pdf-engine/creator-engine';

export * from './operations/watermark';
export * from './operations/page-numbers';
export * from './operations/headers-footers';
export * from './operations/text-extract';
export * from './operations/color-inversion';
export * from './operations/redact';
export * from './operations/security';
export * from './operations/converters';
export * from './operations/business';
export * from './operations/pdf-editor';
export {
  buildPdfFromDocumentModel,
  DOCUMENT_PRESETS,
  PAGE_DIMENSIONS,
  getPageSize,
  hexToRgb,
  createEmptyPage,
} from './pdf-engine/creator-engine';
export type {
  DocumentModel,
  PageModel,
  PageFormat,
  PageOrientation,
  CanvasElement,
  ElementType as CreatorElementType,
  TextElement as CreatorTextElement,
  ImageElement as CreatorImageElement,
  ShapeElement as CreatorShapeElement,
  TableElement as CreatorTableElement,
  FontFamily as CreatorFontFamily,
  TextAlignment as CreatorTextAlignment,
  ShapeType as CreatorShapeType,
} from './pdf-engine/creator-engine';

// Type definitions
export type PDFProcessingMode = OperationKey | 'pageCount';

export type PDFProcessingOptions = {
  documentModel?: DocumentModel;
  compressionLevel?: 'low' | 'medium' | 'high';
  outputFormat?: 'pdf';
  pageRange?: string;
  metadata?: Record<string, string>;
  password?: string;

  pagesToExtract?: number[];
  pagesToCrop?: number[];
  pageOrder?: number[];

  pagesToRotate?: number[];
  rotationDegrees?: 90 | 180 | 270 | -90 | -180 | -270;
  cropMargins?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  cropInputMode?: 'margins' | 'manual';
  bundleAsZip?: boolean;

  preserveMetadata?: boolean;
  stripAnnotations?: boolean;
  downscaleImages?: boolean;
  downscaleImagesDpi?: number;
  imageQuality?: number;

  bookmarkHandling?: 'merge' | 'first' | 'none';
  addPageDividers?: boolean;

  splitMode?: 'pageCount' | 'bookmarks' | 'pageNumbers';
  pagesToSplit?: number[];
  splitRanges?: Array<[number, number]>;
  pagesPerFile?: number;
  splitPoints?: string;
  outputNamePattern?: string;

  maintainOriginalSize?: boolean;

  imageOutputFormat?: 'png' | 'jpeg';
  imageOutputQuality?: number;
  imageRenderDpi?: number;
  imageBaseName?: string;
  imageFit?: 'contain' | 'cover';
  pageSize?: 'auto' | 'a4' | 'letter';
  pageOrientation?: 'auto' | 'portrait' | 'landscape';
  pageMarginPoints?: number;
  backgroundColor?: string;
  imageBorderType?: 'none' | 'thin' | 'standard' | 'thick' | 'custom';
  imageBorderWidth?: number;
  imageBorderColor?: string;
  zipMode?: 'direct' | 'images' | 'splitPdf';
  documentEditState?: import('./operations/pdf-editor').DocumentEditState;

  // New tool options (nested & flat)
  watermark?: WatermarkOptions;
  watermarkType?: 'text' | 'image';
  watermarkText?: string;
  watermarkColor?: string;
  watermarkOpacity?: number;
  watermarkRotation?: number;
  watermarkPosition?: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'tile';
  watermarkFontSize?: number;

  pageNumbers?: PageNumberOptions;
  pageNumberFormat?: string;
  pageNumberPosition?: 'bottom-center' | 'bottom-right' | 'bottom-left' | 'top-center' | 'top-right' | 'top-left';
  pageNumberStart?: number;
  pageNumberSkipFirst?: boolean;
  pageNumberFontSize?: number;
  pageNumberColor?: string;

  headersFooters?: HeaderFooterOptions;
  headerLeft?: string;
  headerCenter?: string;
  headerRight?: string;
  footerLeft?: string;
  footerCenter?: string;
  footerRight?: string;
  headerFooterFontSize?: number;
  headerFooterColor?: string;

  invertColorMode?: 'dark' | 'sepia' | 'grayscale' | 'high-contrast';
  colorMode?: 'dark-mode' | 'sepia' | 'grayscale' | 'high-contrast';

  redactions?: RedactionBox[];
  redactColor?: string;

  decryptionPassword?: string;

  markdownContent?: string;
  markdownTheme?: string;
  htmlContent?: string;
  csvContent?: string;
  csvDelimiter?: string;
  documentTitle?: string;

  blankPageCount?: number;
  blankPageSize?: BlankPdfPageSize;
  blankPageOrientation?: BlankPdfOrientation;

  gstInvoice?: GstInvoiceData;
  invoiceNumber?: string;
  taxRate?: number;

  posReceipt?: PosReceiptData;
};

export type ProcessingResult = {
  data: Uint8Array;
  originalSize: number;
  processedSize: number;
  compressionRatio: number;
  processingTimeMs: number;
  isSimulated?: boolean;
  universalOptimizedCount?: number;
};

export type PdfToImagesArchiveResult =
  | {
    kind: 'zip';
    blob: Blob;
    imageCount: number;
    format: 'png' | 'jpeg';
    suggestedName: string;
  }
  | {
    kind: 'files';
    files: Array<{ blob: Blob; name: string }>;
    imageCount: number;
    format: 'png' | 'jpeg';
    suggestedName?: string;
  };

type PageLayout = {
  pageWidth: number;
  pageHeight: number;
  margin: number;
};

/**
 * Compress a PDF file
 */
export async function compressPDF(
  fileOrData: File | ArrayBuffer | Uint8Array,
  options: PDFProcessingOptions = {}
): Promise<ProcessingResult> {
  const startTime = performance.now();

  try {
    const arrayBuffer = fileOrData instanceof File
      ? await fileOrData.arrayBuffer()
      : fileOrData;
    const pdfDoc = await PDFDocument.load(arrayBuffer, {
      ignoreEncryption: true,
      updateMetadata: options.preserveMetadata !== false
    });

    // Get compression level
    const compressionLevel = options.compressionLevel || 'medium';

    const shouldRemoveMetadata = options.preserveMetadata === false || compressionLevel === 'high' || compressionLevel === 'medium';
    const shouldStripAnnotations = options.stripAnnotations === true || compressionLevel === 'high';
    const shouldDownscaleImages = options.downscaleImages !== false;
    const targetDpi = options.downscaleImagesDpi ?? (
      compressionLevel === 'high' ? 72 : compressionLevel === 'low' ? 200 : 120
    );
    const imageQuality = options.imageQuality ?? (
      compressionLevel === 'high' ? 0.45 : compressionLevel === 'low' ? 0.75 : 0.60
    );

    let optimizationStats = { universalOptimizedCount: 0 };

    if (shouldRemoveMetadata || shouldStripAnnotations || shouldDownscaleImages) {
      optimizationStats = await applyCompressionEnhancements(pdfDoc, {
        removeMetadata: shouldRemoveMetadata,
        stripAnnotations: shouldStripAnnotations,
        downscaleImages: shouldDownscaleImages,
        targetDpi,
        imageQuality,
      });
    }

    // Save with optimization
    const pdfBytes = await pdfDoc.save({
      useObjectStreams: true, // Compress object streams
      addDefaultPage: false,
      objectsPerTick: compressionLevel === 'high' ? 500 : 50,
    });

    // If PDF didn't shrink and no images were optimized, keep original bytes so file is never LARGER
    let finalBytes = pdfBytes;
    if (finalBytes.length >= arrayBuffer.byteLength && optimizationStats.universalOptimizedCount === 0) {
      finalBytes = new Uint8Array(arrayBuffer);
    }

    const endTime = performance.now();

    return {
      data: finalBytes,
      originalSize: arrayBuffer.byteLength,
      processedSize: finalBytes.length,
      compressionRatio: finalBytes.length / arrayBuffer.byteLength,
      processingTimeMs: endTime - startTime,
      universalOptimizedCount: optimizationStats.universalOptimizedCount,
    };
  } catch (error) {
    console.error('Error compressing PDF:', error);
    throw new Error(`Failed to compress PDF: ${error instanceof Error ? error.message : String(error)}`);
  }
}

type CompressionEnhancementPlan = {
  removeMetadata: boolean;
  stripAnnotations: boolean;
  downscaleImages: boolean;
  targetDpi: number;
  imageQuality: number;
};

async function applyCompressionEnhancements(pdfDoc: PDFDocument, plan: CompressionEnhancementPlan) {
  let universalOptimizedCount = 0;

  if (plan.removeMetadata) {
    removeDocumentMetadata(pdfDoc);
  }

  if (plan.stripAnnotations) {
    stripPageAnnotations(pdfDoc);
  }

  if (plan.downscaleImages) {
    universalOptimizedCount = await downscaleDocumentImages(pdfDoc, plan.targetDpi, plan.imageQuality);
  }

  return { universalOptimizedCount };
}

function removeDocumentMetadata(pdfDoc: PDFDocument) {
  const metadataKey = PDFName.of('Metadata');
  const context = pdfDoc.context;

  const infoEntry = context.trailerInfo.Info;
  if (infoEntry instanceof PDFRef) {
    const infoDict = context.lookupMaybe(infoEntry, PDFDict);
    if (infoDict) {
      infoDict.keys().forEach(key => infoDict.delete(key));
    }
    context.delete(infoEntry);
  } else if (infoEntry instanceof PDFDict) {
    infoEntry.keys().forEach(key => infoEntry.delete(key));
    const ref = context.getObjectRef(infoEntry);
    if (ref) {
      context.delete(ref);
    }
  }
  context.trailerInfo.Info = undefined;

  const metadataEntry = pdfDoc.catalog.get(metadataKey);
  if (metadataEntry) {
    if (metadataEntry instanceof PDFRef) {
      context.delete(metadataEntry);
    }
    pdfDoc.catalog.delete(metadataKey);
  }
}

function stripPageAnnotations(pdfDoc: PDFDocument) {
  const pages = pdfDoc.getPages();
  const annotsKey = PDFName.of('Annots');

  pages.forEach(page => {
    page.node.delete(annotsKey);
  });
}

/**
 * Decompress FlateDecode/Zlib bytes using browser's DecompressionStream.
 */
async function decompressFlate(bytes: Uint8Array): Promise<Uint8Array | null> {
  if (typeof DecompressionStream === 'undefined') return null;
  try {
    const ds = new DecompressionStream('deflate');
    const writer = ds.writable.getWriter();
    writer.write(bytes as unknown as BufferSource);
    writer.close();
    const output = await new Response(ds.readable).arrayBuffer();
    return new Uint8Array(output);
  } catch {
    return null;
  }
}

/**
 * Undo PNG predictors (None, Sub, Up, Average, Paeth) for FlateDecode streams.
 * Handles the standard PDF predictor types 10-15.
 */
function unfilterPng(bytes: Uint8Array, width: number, height: number, bpp: number): Uint8Array {
  const rowSize = width * bpp + 1;
  const result = new Uint8Array(width * height * bpp);

  for (let y = 0; y < height; y++) {
    const rowStart = y * rowSize;
    if (rowStart + rowSize > bytes.length) break;

    const filter = bytes[rowStart];
    const rawRowStart = y * width * bpp;

    for (let x = 0; x < width * bpp; x++) {
      const currentByte = bytes[rowStart + 1 + x];
      const left = x >= bpp ? result[rawRowStart + x - bpp] : 0;
      const up = y > 0 ? result[rawRowStart - width * bpp + x] : 0;
      const upLeft = (y > 0 && x >= bpp) ? result[rawRowStart - width * bpp + x - bpp] : 0;

      let val = 0;
      switch (filter) {
        case 0: val = currentByte; break;
        case 1: val = (currentByte + left) % 256; break;
        case 2: val = (currentByte + up) % 256; break;
        case 3: val = (currentByte + Math.floor((left + up) / 2)) % 256; break;
        case 4: {
          const p = left + up - upLeft;
          const pa = Math.abs(p - left);
          const pb = Math.abs(p - up);
          const pc = Math.abs(p - upLeft);
          const pr = (pa <= pb && pa <= pc) ? left : (pb <= pc ? up : upLeft);
          val = (currentByte + pr) % 256;
          break;
        }
        default: val = currentByte; break;
      }
      result[rawRowStart + x] = val;
    }
  }
  return result;
}

// Main image downscaling logic
async function downscaleImage(
  bytes: Uint8Array,
  targetDpi: number,
  quality: number,
  rawParams?: { width: number; height: number; colorSpace: string }
): Promise<{ bytes: Uint8Array; width: number; height: number } | null> {
  const hasDocument = typeof document !== 'undefined';
  const hasOffscreen = typeof OffscreenCanvas !== 'undefined';

  if (!hasDocument && !hasOffscreen) return null;

  let width = 0;
  let height = 0;
  let source: ImageBitmap | HTMLImageElement | ImageData | null = null;

  try {
    if (rawParams) {
      const { width: w, height: h, colorSpace } = rawParams;
      width = w;
      height = h;

      let rgba: Uint8ClampedArray;
      if (colorSpace === 'DeviceRGB') {
        rgba = new Uint8ClampedArray(w * h * 4);
        for (let i = 0; i < w * h; i++) {
          rgba[i * 4] = bytes[i * 3];
          rgba[i * 4 + 1] = bytes[i * 3 + 1];
          rgba[i * 4 + 2] = bytes[i * 3 + 2];
          rgba[i * 4 + 3] = 255;
        }
      } else if (colorSpace === 'DeviceGray') {
        rgba = new Uint8ClampedArray(w * h * 4);
        for (let i = 0; i < w * h; i++) {
          const g = bytes[i];
          rgba[i * 4] = g;
          rgba[i * 4 + 1] = g;
          rgba[i * 4 + 2] = g;
          rgba[i * 4 + 3] = 255;
        }
      } else {
        return null; // Unsupported raw color space (like CMYK/Indexed) for now
      }
      source = new ImageData(rgba as unknown as Uint8ClampedArray<ArrayBuffer>, w, h);
    } else {
      const blob = new Blob([bytes as BlobPart], { type: 'image/jpeg' });
      if (typeof createImageBitmap === 'function') {
        const bitmap = await createImageBitmap(blob);
        width = bitmap.width;
        height = bitmap.height;
        source = bitmap;
      } else if (hasDocument) {
        const img = await loadImageFromBlob(blob);
        width = img.width;
        height = img.height;
        source = img;
      }
    }
  } catch {
    return null;
  }

  if (!source) return null;

  const maxDimension = Math.max(width, height);
  const targetPixels = Math.round(targetDpi * 8.27);

  const scale = targetPixels <= 0 ? 1 : Math.min(1, targetPixels / maxDimension);
  const targetWidth = Math.max(1, Math.round(width * scale));
  const targetHeight = Math.max(1, Math.round(height * scale));

  let resultBlob: Blob | null = null;

  if (hasOffscreen) {
    const canvas = new OffscreenCanvas(targetWidth, targetHeight);
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    if (source instanceof ImageData) {
      if (width === targetWidth && height === targetHeight) {
        ctx.putImageData(source, 0, 0);
      } else {
        const tempCanvas = new OffscreenCanvas(width, height);
        tempCanvas.getContext('2d')!.putImageData(source, 0, 0);
        ctx.drawImage(tempCanvas, 0, 0, targetWidth, targetHeight);
      }
    } else {
      ctx.drawImage(source, 0, 0, targetWidth, targetHeight);
    }
    resultBlob = await canvas.convertToBlob({ type: 'image/jpeg', quality });
  } else if (hasDocument) {
    const canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    if (source instanceof ImageData) {
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = width;
      tempCanvas.height = height;
      tempCanvas.getContext('2d')!.putImageData(source, 0, 0);
      ctx.drawImage(tempCanvas, 0, 0, targetWidth, targetHeight);
    } else {
      ctx.drawImage(source, 0, 0, targetWidth, targetHeight);
    }
    resultBlob = await new Promise<Blob | null>(resolve =>
      canvas.toBlob(resolve, 'image/jpeg', quality)
    );
  }

  if (source instanceof ImageBitmap) source.close();
  if (!resultBlob) return null;

  return {
    bytes: new Uint8Array(await resultBlob.arrayBuffer()),
    width: targetWidth,
    height: targetHeight
  };
}

async function downscaleDocumentImages(pdfDoc: PDFDocument, targetDpi: number, quality: number) {
  let universalOptimizedCount = 0;
  const processedImages = new Map<string, { bytes: Uint8Array; width: number; height: number }>();
  const allObjects = pdfDoc.context.enumerateIndirectObjects();

  for (const [ref, object] of allObjects) {
    if (!(object instanceof PDFRawStream)) continue;

    const subtype = object.dict.get(PDFName.of("Subtype"));
    if (subtype !== PDFName.of("Image")) continue;

    const filter = object.dict.get(PDFName.of("Filter"));
    const isDCT = filter === PDFName.of("DCTDecode") ||
      (filter instanceof PDFArray && filter.asArray().some(f => f === PDFName.of("DCTDecode")));
    const isFlate = filter === PDFName.of("FlateDecode") ||
      (filter instanceof PDFArray && filter.asArray().some(f => f === PDFName.of("FlateDecode")));

    if (!isDCT && !isFlate) continue;

    let imageBytes = object.contents;
    let rawParams: { width: number; height: number; colorSpace: string } | undefined;

    if (isFlate) {
      const decompressed = await decompressFlate(imageBytes);
      if (!decompressed) continue;

      const w = object.dict.get(PDFName.of('Width'));
      const h = object.dict.get(PDFName.of('Height'));
      const cs = object.dict.get(PDFName.of('ColorSpace'));
      const bpc = object.dict.get(PDFName.of('BitsPerComponent'));
      const params = object.dict.get(PDFName.of('DecodeParms'));

      if (w instanceof PDFNumber && h instanceof PDFNumber && bpc instanceof PDFNumber && bpc.asNumber() === 8) {
        const width = w.asNumber();
        const height = h.asNumber();
        const colorSpace = cs instanceof PDFName ? cs.asString().replace(/^\//, '') : 'DeviceRGB';
        const bpp = colorSpace === 'DeviceRGB' ? 3 : 1;

        let predictor = 1;
        if (params instanceof PDFDict) {
          const p = params.get(PDFName.of('Predictor'));
          if (p instanceof PDFNumber) predictor = p.asNumber();
        }

        if (predictor >= 10) {
          imageBytes = unfilterPng(decompressed, width, height, bpp);
        } else if (predictor > 1) {
          continue; // Unsupported predictor (e.g. LZW)
        } else {
          imageBytes = decompressed;
        }

        rawParams = { width, height, colorSpace };
      } else {
        continue; // Unsupported bpc or missing dimensions
      }
    }

    const hash = hashBytes(imageBytes);
    const cached = processedImages.get(hash);

    if (cached && (cached.bytes.length < object.contents.length || !isDCT)) {
      // PDFRawStream.contents is readonly, so we must replace the object in the context
      const newStream = PDFRawStream.of(object.dict, cached.bytes);
      newStream.dict.set(PDFName.of("Length"), pdfDoc.context.obj(cached.bytes.length));
      newStream.dict.set(PDFName.of("Filter"), PDFName.of("DCTDecode"));
      newStream.dict.set(PDFName.of("Width"), pdfDoc.context.obj(cached.width));
      newStream.dict.set(PDFName.of("Height"), pdfDoc.context.obj(cached.height));
      newStream.dict.delete(PDFName.of('DecodeParms'));

      // Assign the new stream to the existing reference
      pdfDoc.context.assign(ref, newStream);
      universalOptimizedCount++;
      continue;
    }

    const result = await downscaleImage(imageBytes, targetDpi, quality, rawParams);
    if (result && (result.bytes.length < object.contents.length || !isDCT)) {
      // PDFRawStream.contents is readonly, so we must replace the object in the context
      const newStream = PDFRawStream.of(object.dict, result.bytes);
      newStream.dict.set(PDFName.of("Length"), pdfDoc.context.obj(result.bytes.length));
      newStream.dict.set(PDFName.of("Filter"), PDFName.of("DCTDecode"));
      newStream.dict.set(PDFName.of("Width"), pdfDoc.context.obj(result.width));
      newStream.dict.set(PDFName.of("Height"), pdfDoc.context.obj(result.height));
      newStream.dict.delete(PDFName.of('DecodeParms'));

      // Assign the new stream to the existing reference
      pdfDoc.context.assign(ref, newStream);
      processedImages.set(hash, result);
      universalOptimizedCount++;
    }
  }

  return universalOptimizedCount;
}

function hashBytes(bytes: Uint8Array): string {
  let hash = 0;
  for (let i = 0; i < bytes.length; i++) {
    hash = (hash << 5) - hash + bytes[i];
    hash |= 0;
  }
  return hash.toString(36);
}

function loadImageFromBlob(blob: Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.decoding = 'async';
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = (event) => {
      URL.revokeObjectURL(url);
      reject(event instanceof ErrorEvent ? event.error : new Error('Failed to load image'));
    };
    img.src = url;
  });
}

const yieldToMain = () => new Promise(resolve => setTimeout(resolve, 0));

export async function mergePDFs(
  filesOrData: (File | ArrayBuffer | Uint8Array)[],
  options: PDFProcessingOptions = {}
): Promise<Uint8Array> {
  try {
    if (filesOrData.length === 0) throw new Error('No files to merge');
    if (filesOrData.length === 1) {
      const data = filesOrData[0];
      return data instanceof File ? new Uint8Array(await data.arrayBuffer()) : new Uint8Array(data);
    }

    const mergedPdf = await PDFDocument.create();
    for (let i = 0; i < filesOrData.length; i++) {
      await yieldToMain();
      const input = filesOrData[i];
      const arrayBuffer = input instanceof File ? await input.arrayBuffer() : input;
      const pdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));

      if (options.addPageDividers && i < filesOrData.length - 1) {
        const dividerPage = mergedPdf.addPage();
        const { width, height } = dividerPage.getSize();
        dividerPage.drawRectangle({ x: 0, y: 0, width, height, color: rgb(1, 1, 1) });
      }
    }

    if (options.metadata) {
      if (options.metadata.title) mergedPdf.setTitle(options.metadata.title);
      if (options.metadata.author) mergedPdf.setAuthor(options.metadata.author);
      if (options.metadata.subject) mergedPdf.setSubject(options.metadata.subject);
      if (options.metadata.keywords) mergedPdf.setKeywords([options.metadata.keywords]);
    }

    return mergedPdf.save({ useObjectStreams: true });
  } catch (error) {
    console.error('Error merging PDFs:', error);
    throw new Error(`Failed to merge PDFs: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function splitPDF(
  fileOrData: File | ArrayBuffer | Uint8Array,
  options: PDFProcessingOptions = {}
): Promise<Uint8Array[]> {
  try {
    const arrayBuffer = fileOrData instanceof File ? await fileOrData.arrayBuffer() : fileOrData;
    const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    const pageCount = pdfDoc.getPageCount();
    const results: Uint8Array[] = [];

    // Mode A: Custom Selected Pages (e.g. pagesToExtract or pagesToSplit)
    const rawSelected: number[] = options.pagesToExtract || options.pagesToSplit || [];
    const selectedPages = rawSelected.filter((p) => p >= 1 && p <= pageCount);

    if (selectedPages.length > 0 && selectedPages.length < pageCount) {
      const selectedIndices = Array.from(new Set(selectedPages)).map((p) => Number(p) - 1).sort((a, b) => a - b);
      const remainingIndices = Array.from({ length: pageCount }, (_, i) => i).filter((i) => !selectedIndices.includes(i));

      // Part 1: Selected pages PDF
      const part1Doc = await PDFDocument.create();
      const copied1 = await part1Doc.copyPages(pdfDoc, selectedIndices);
      copied1.forEach((p) => part1Doc.addPage(p));
      results.push(await part1Doc.save({ useObjectStreams: true }));

      // Part 2: Remaining pages PDF
      if (remainingIndices.length > 0) {
        const part2Doc = await PDFDocument.create();
        const copied2 = await part2Doc.copyPages(pdfDoc, remainingIndices);
        copied2.forEach((p) => part2Doc.addPage(p));
        results.push(await part2Doc.save({ useObjectStreams: true }));
      }
      return results;
    }

    // Mode B: Custom Range String (e.g. "1-3, 4-5, 6")
    let ranges: Array<[number, number]> = [];
    if (Array.isArray(options.splitRanges)) {
      ranges = options.splitRanges;
    } else if (typeof options.pageRange === 'string' && options.pageRange.trim()) {
      const parts = options.pageRange.split(',').map((s) => s.trim()).filter(Boolean);
      for (const part of parts) {
        if (part.includes('-')) {
          const [startStr, endStr] = part.split('-');
          const start = Math.max(1, parseInt(startStr, 10) || 1);
          const end = Math.min(pageCount, parseInt(endStr, 10) || start);
          if (start <= end) ranges.push([start, end]);
        } else {
          const p = parseInt(part, 10);
          if (!isNaN(p) && p >= 1 && p <= pageCount) ranges.push([p, p]);
        }
      }
    }

    if (ranges.length > 0) {
      for (const [start, end] of ranges) {
        await yieldToMain();
        const startIdx = Math.max(0, start - 1);
        const endIdx = Math.min(pageCount - 1, end - 1);
        const count = endIdx - startIdx + 1;
        if (count <= 0) continue;
        const pageIndices = Array.from({ length: count }, (_, idx) => startIdx + idx);
        const newPdf = await PDFDocument.create();
        const copiedPages = await newPdf.copyPages(pdfDoc, pageIndices);
        copiedPages.forEach((p) => newPdf.addPage(p));
        results.push(await newPdf.save({ useObjectStreams: true }));
      }
      if (results.length > 0) return results;
    }

    // Mode C: Fixed Interval / Every N Pages (Default: 1)
    const pagesPerFile = options.pagesPerFile || 1;
    for (let i = 0; i < pageCount; i += pagesPerFile) {
      await yieldToMain();
      const newPdf = await PDFDocument.create();
      const endPage = Math.min(i + pagesPerFile, pageCount);
      const pageIndices = Array.from({ length: endPage - i }, (_, idx) => i + idx);
      const copiedPages = await newPdf.copyPages(pdfDoc, pageIndices);
      copiedPages.forEach((page) => newPdf.addPage(page));
      results.push(await newPdf.save({ useObjectStreams: true }));
    }
    return results;
  } catch (error) {
    console.error('Error splitting PDF:', error);
    throw new Error(`Failed to split PDF: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function extractPages(
  fileOrData: File | ArrayBuffer | Uint8Array,
  pageNumbers: number[],
  options: PDFProcessingOptions = {}
): Promise<Uint8Array> {
  try {
    if (pageNumbers.length === 0) throw new Error('No pages to extract');
    const arrayBuffer = fileOrData instanceof File ? await fileOrData.arrayBuffer() : fileOrData;
    const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    const pageCount = pdfDoc.getPageCount();
    const validPageIndices = pageNumbers.map(num => num - 1).filter(idx => idx >= 0 && idx < pageCount).sort((a, b) => a - b);
    if (validPageIndices.length === 0) throw new Error('No valid page numbers provided');

    const newPdf = await PDFDocument.create();
    const copiedPages = await newPdf.copyPages(pdfDoc, validPageIndices);
    copiedPages.forEach((page) => newPdf.addPage(page));

    if (options.preserveMetadata !== false) {
      const title = pdfDoc.getTitle();
      const author = pdfDoc.getAuthor();
      const subject = pdfDoc.getSubject();
      if (title) newPdf.setTitle(title);
      if (author) newPdf.setAuthor(author);
      if (subject) newPdf.setSubject(subject);
    }

    return newPdf.save({ useObjectStreams: true });
  } catch (error) {
    console.error('Error extracting pages:', error);
    throw new Error(`Failed to extract pages: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function reorderPages(
  fileOrData: File | ArrayBuffer | Uint8Array,
  newOrder: number[],
  options: PDFProcessingOptions = {}
): Promise<Uint8Array> {
  try {
    if (newOrder.length === 0) throw new Error('No page order provided');
    const arrayBuffer = fileOrData instanceof File ? await fileOrData.arrayBuffer() : fileOrData;
    const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    const pageCount = pdfDoc.getPageCount();
    const validPageIndices = newOrder.map(num => num - 1).filter(idx => idx >= 0 && idx < pageCount);
    if (validPageIndices.length === 0) throw new Error('No valid page numbers in order');

    const newPdf = await PDFDocument.create();
    const copiedPages = await newPdf.copyPages(pdfDoc, validPageIndices);
    copiedPages.forEach((page) => newPdf.addPage(page));

    if (options.preserveMetadata !== false) {
      const title = pdfDoc.getTitle();
      const author = pdfDoc.getAuthor();
      const subject = pdfDoc.getSubject();
      if (title) newPdf.setTitle(title);
      if (author) newPdf.setAuthor(author);
      if (subject) newPdf.setSubject(subject);
    }

    return newPdf.save({ useObjectStreams: true });
  } catch (error) {
    console.error('Error reordering pages:', error);
    throw new Error(`Failed to reorder pages: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function cropPages(
  fileOrData: File | ArrayBuffer | Uint8Array,
  pageNumbers: number[],
  options: PDFProcessingOptions = {}
): Promise<Uint8Array> {
  try {
    if (pageNumbers.length === 0) {
      throw new Error('No pages to crop');
    }

    const margins = options.cropMargins || { top: 18, right: 18, bottom: 18, left: 18 };

    const left = Math.max(0, margins.left ?? 0);
    const right = Math.max(0, margins.right ?? 0);
    const top = Math.max(0, margins.top ?? 0);
    const bottom = Math.max(0, margins.bottom ?? 0);

    const arrayBuffer = fileOrData instanceof File ? await fileOrData.arrayBuffer() : fileOrData;
    const pdfDoc = await PDFDocument.load(arrayBuffer, {
      ignoreEncryption: true,
      updateMetadata: options.preserveMetadata !== false,
    });

    const pageCount = pdfDoc.getPageCount();
    const validPageIndices = [...new Set(
      pageNumbers
        .map(num => num - 1)
        .filter(idx => idx >= 0 && idx < pageCount)
    )];

    if (validPageIndices.length === 0) {
      throw new Error('No valid page numbers provided');
    }

    for (const pageIndex of validPageIndices) {
      const page = pdfDoc.getPage(pageIndex);
      const mediaBox = page.getMediaBox();
      const rotationAngle = page.getRotation().angle;
      const normalizedRotation = ((rotationAngle % 360) + 360) % 360;

      let logicalTop = top;
      let logicalRight = right;
      let logicalBottom = bottom;
      let logicalLeft = left;

      if (normalizedRotation === 90) {
        logicalTop = right;
        logicalRight = bottom;
        logicalBottom = left;
        logicalLeft = top;
      } else if (normalizedRotation === 180) {
        logicalTop = bottom;
        logicalRight = left;
        logicalBottom = top;
        logicalLeft = right;
      } else if (normalizedRotation === 270) {
        logicalTop = left;
        logicalRight = top;
        logicalBottom = right;
        logicalLeft = bottom;
      }

      const nextWidth = mediaBox.width - logicalLeft - logicalRight;
      const nextHeight = mediaBox.height - logicalTop - logicalBottom;

      if (nextWidth <= 0 || nextHeight <= 0) {
        throw new Error(
          `Crop margins exceed page bounds on page ${pageIndex + 1}. ` +
          `Details: mediaBox=(${Math.round(mediaBox.width)}x${Math.round(mediaBox.height)}), ` +
          `rotation=${rotationAngle}, normalized=${normalizedRotation}, ` +
          `visual=(T:${Math.round(top)},R:${Math.round(right)},B:${Math.round(bottom)},L:${Math.round(left)}), ` +
          `logical=(T:${Math.round(logicalTop)},R:${Math.round(logicalRight)},B:${Math.round(logicalBottom)},L:${Math.round(logicalLeft)}), ` +
          `next=(${Math.round(nextWidth)}x${Math.round(nextHeight)})`
        );
      }

      const nextX = mediaBox.x + logicalLeft;
      const nextY = mediaBox.y + logicalBottom;

      page.setMediaBox(nextX, nextY, nextWidth, nextHeight);
      page.setCropBox(nextX, nextY, nextWidth, nextHeight);
      page.setBleedBox(nextX, nextY, nextWidth, nextHeight);
      page.setTrimBox(nextX, nextY, nextWidth, nextHeight);
      page.setArtBox(nextX, nextY, nextWidth, nextHeight);
    }

    if (options.metadata) {
      if (options.metadata.title) pdfDoc.setTitle(options.metadata.title);
      if (options.metadata.author) pdfDoc.setAuthor(options.metadata.author);
      if (options.metadata.subject) pdfDoc.setSubject(options.metadata.subject);
      if (options.metadata.keywords) {
        pdfDoc.setKeywords([options.metadata.keywords]);
      }
    }

    return pdfDoc.save({
      useObjectStreams: true,
      addDefaultPage: false,
    });
  } catch (error) {
    console.error('Error cropping pages:', error);
    throw new Error(
      `Failed to crop pages: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

export async function rotatePages(
  fileOrData: File | ArrayBuffer | Uint8Array,
  pageNumbers: number[],
  degreesOrOptions: number | PDFProcessingOptions = 90,
  options: PDFProcessingOptions = {}
): Promise<Uint8Array> {
  try {
    if (pageNumbers.length === 0) {
      throw new Error('No pages to rotate');
    }

    const rotationDegrees = typeof degreesOrOptions === 'number'
      ? degreesOrOptions
      : (degreesOrOptions?.rotationDegrees ?? 90);
    const resolvedOptions = typeof degreesOrOptions === 'object' && degreesOrOptions !== null
      ? degreesOrOptions
      : options;

    const arrayBuffer =
      fileOrData instanceof File ? await fileOrData.arrayBuffer() : fileOrData;

    const pdfDoc = await PDFDocument.load(arrayBuffer, {
      ignoreEncryption: true,
      updateMetadata: resolvedOptions.preserveMetadata !== false,
    });

    const pageCount = pdfDoc.getPageCount();

    const validPageIndices = [...new Set(
      pageNumbers
        .map((num) => num - 1)
        .filter((idx) => idx >= 0 && idx < pageCount)
    )];

    if (validPageIndices.length === 0) {
      throw new Error('No valid page numbers provided');
    }

    for (const pageIndex of validPageIndices) {
      const page = pdfDoc.getPage(pageIndex);
      const currentRotation = page.getRotation().angle;
      const nextRotation = normalizeRotation(currentRotation + Number(rotationDegrees));
      page.setRotation(degrees(nextRotation));
    }

    if (resolvedOptions.metadata) {
      if (resolvedOptions.metadata.title) pdfDoc.setTitle(resolvedOptions.metadata.title);
      if (resolvedOptions.metadata.author) pdfDoc.setAuthor(resolvedOptions.metadata.author);
      if (resolvedOptions.metadata.subject) pdfDoc.setSubject(resolvedOptions.metadata.subject);
      if (resolvedOptions.metadata.keywords) {
        pdfDoc.setKeywords([resolvedOptions.metadata.keywords]);
      }
    }

    return pdfDoc.save({
      useObjectStreams: true,
      addDefaultPage: false,
    });
  } catch (error) {
    console.error('Error rotating pages:', error);
    throw new Error(
      `Failed to rotate pages: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

function getSafeZipEntryName(rawName: string, existingNames: Set<string>): string {
  const baseOnly = rawName.replace(/^.*[\\\/]/, '').trim();
  const sanitized = baseOnly.replace(/[\x00-\x1f\x80-\x9f<>:"/\\|?*]/g, '_').trim() || 'document.pdf';
  const withExt = sanitized.toLowerCase().endsWith('.pdf') ? sanitized : `${sanitized}.pdf`;

  let finalName = withExt;
  let counter = 1;
  const baseWithoutExt = withExt.slice(0, -4);
  while (existingNames.has(finalName.toLowerCase())) {
    finalName = `${baseWithoutExt}_${counter}.pdf`;
    counter++;
  }
  existingNames.add(finalName.toLowerCase());
  return finalName;
}

export async function pdfToZip(
  fileOrData: File | File[] | ArrayBuffer | Uint8Array,
  options: PDFProcessingOptions = {},
  onProgress?: (progress: number, status: string) => void
): Promise<Uint8Array> {
  const { default: JSZip } = await import('jszip');
  const zip = new JSZip();
  const filesArray = Array.isArray(fileOrData) ? fileOrData : [fileOrData];
  const usedNames = new Set<string>();

  for (let idx = 0; idx < filesArray.length; idx++) {
    const item = filesArray[idx];
    let bytes: Uint8Array;
    let originalName = 'document.pdf';

    if (item instanceof File) {
      originalName = item.name;
      const buffer = await item.arrayBuffer();
      bytes = new Uint8Array(buffer);
    } else if (item instanceof ArrayBuffer) {
      bytes = new Uint8Array(item);
    } else if (item instanceof Uint8Array) {
      bytes = item;
    } else {
      continue;
    }

    const safeName = getSafeZipEntryName(originalName, usedNames);
    zip.file(safeName, bytes, { binary: true });

    onProgress?.(
      Math.min(50, Math.round(((idx + 1) / filesArray.length) * 50)),
      `Added ${safeName} (${idx + 1} of ${filesArray.length})...`
    );
  }

  const compressionLevel =
    options.compressionLevel === 'high' ? 9 : options.compressionLevel === 'low' ? 1 : 6;

  return zip.generateAsync(
    {
      type: 'uint8array',
      compression: 'DEFLATE',
      compressionOptions: { level: compressionLevel },
    },
    (metadata) => {
      onProgress?.(
        Math.min(99, 50 + Math.round(metadata.percent * 0.5)),
        `Packaging ZIP archive (${Math.round(metadata.percent)}%)...`
      );
    }
  );
}

function normalizeRotation(angle: number): 0 | 90 | 180 | 270 {
  const normalized = ((angle % 360) + 360) % 360;

  if (normalized === 0) return 0;
  if (normalized === 90) return 90;
  if (normalized === 180) return 180;
  if (normalized === 270) return 270;

  throw new Error(`Invalid rotation angle: ${angle}`);
}

export async function getPDFPageCount(fileOrData: File | ArrayBuffer | Uint8Array): Promise<number> {
  try {
    const arrayBuffer = fileOrData instanceof File ? await fileOrData.arrayBuffer() : fileOrData;
    const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    return pdfDoc.getPageCount();
  } catch (error) {
    console.error('Error getting page count:', error);
    return 0;
  }
}

export async function getPDFPageDimensions(
  fileOrData: File | ArrayBuffer | Uint8Array,
  pageNumber: number
): Promise<{ width: number; height: number }> {
  const arrayBuffer = fileOrData instanceof File ? await fileOrData.arrayBuffer() : fileOrData;
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const pageCount = pdfDoc.getPageCount();
  const pageIndex = Math.min(Math.max(pageNumber - 1, 0), Math.max(pageCount - 1, 0));
  const page = pdfDoc.getPage(pageIndex);
  
  const mediaBox = page.getMediaBox();
  const rotation = page.getRotation().angle;
  const normalized = ((rotation % 360) + 360) % 360;
  
  if (normalized === 90 || normalized === 270) {
    return { width: mediaBox.height, height: mediaBox.width };
  }
  
  return { width: mediaBox.width, height: mediaBox.height };
}

const FALLBACK_THUMBNAIL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=';

/** Minimal interface for pdfjs-dist PDFDocumentProxy (avoids importing full pdfjs types) */
interface PdfjsDocument {
  numPages: number;
  getPage(pageNumber: number): Promise<PdfjsPage>;
}

interface PdfjsPage {
  rotate?: number;
  getViewport(params: { scale: number; rotation?: number }): { width: number; height: number };
  render(params: { canvasContext: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D; viewport: { width: number; height: number }; canvasFactory?: unknown }): { promise: Promise<void> };
  cleanup(): void;
}

type PdfJsModule = typeof import('pdfjs-dist');
let pdfjsLibPromise: Promise<PdfJsModule> | null = null;
const pdfDocumentCache = new WeakMap<File, Promise<PdfjsDocument>>();
const thumbnailCache = new WeakMap<File, Map<string, string>>();

const PAGE_SIZE_MAP: Record<'a4' | 'letter', { width: number; height: number }> = {
  a4: { width: 595.28, height: 841.89 },
  letter: { width: 612, height: 792 },
};

async function getPdfJsLib(): Promise<PdfJsModule> {
  if (!pdfjsLibPromise) {
    pdfjsLibPromise = import('pdfjs-dist/legacy/build/pdf.mjs').then((module) => {
      if (typeof window !== 'undefined' && !module.GlobalWorkerOptions.workerSrc) {
        module.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
      }
      return module;
    });
  }
  return pdfjsLibPromise;
}

async function getCachedPdfDocument(fileOrData: File | ArrayBuffer | Uint8Array): Promise<PdfjsDocument> {
  const isFile = fileOrData instanceof File;
  let docPromise = isFile ? pdfDocumentCache.get(fileOrData) : null;
  if (!docPromise) {
    docPromise = (async () => {
      const pdfjsLib = await getPdfJsLib();
      const data = fileOrData instanceof File ? await fileOrData.arrayBuffer() : fileOrData;
      // Use absolute URLs for CMap/font loading
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : typeof self !== 'undefined' && self.location ? self.location.origin : '';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const isInWorker = typeof (globalThis as any).importScripts === 'function';
      const loadingTask = pdfjsLib.getDocument({
        data,
        cMapUrl: `${baseUrl}/cmaps/`,
        cMapPacked: true,
        standardFontDataUrl: `${baseUrl}/standard_fonts/`,
        // In worker: disable @font-face (CSS not available) → forces path-based glyph rendering
        disableFontFace: isInWorker,
        // In worker: fetch CMaps/fonts from our context (has polyfills), not pdf.js's nested worker
        useWorkerFetch: !isInWorker,
      });
      return loadingTask.promise as unknown as PdfjsDocument;
    })();
    if (isFile) pdfDocumentCache.set(fileOrData, docPromise);
  }
  return docPromise;
}

function getThumbnailCache(file: File): Map<string, string> {
  let cache = thumbnailCache.get(file);
  if (!cache) {
    cache = new Map<string, string>();
    thumbnailCache.set(file, cache);
  }
  return cache;
}

function sanitizeFileBaseName(raw: string): string {
  const normalised = raw.trim().replace(/[^\p{L}\p{N}\-_. ]/gu, '-').replace(/\s+/g, '-');
  const cleaned = normalised.replace(/-+/g, '-').replace(/^-|-$/g, '');
  return cleaned.length > 0 ? cleaned.toLowerCase() : 'ihatelovepdf';
}

function stripExtension(fileName: string): string {
  const dotIndex = fileName.lastIndexOf('.');
  return dotIndex <= 0 ? fileName : fileName.slice(0, dotIndex);
}

function clamp(value: number, min: number, max: number): number {
  if (Number.isNaN(value)) return min;
  return Math.min(Math.max(value, min), max);
}

function parseBackgroundColor(color?: string) {
  const fallback = rgb(1, 1, 1);
  if (!color) return fallback;
  const hexMatch = color.trim().match(/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (!hexMatch) return fallback;
  let hex = hexMatch[1];
  if (hex.length === 3) hex = hex.split('').map(char => char + char).join('');
  const intVal = parseInt(hex, 16);
  return rgb(((intVal >> 16) & 0xff) / 255, ((intVal >> 8) & 0xff) / 255, (intVal & 0xff) / 255);
}

async function normalizeImageForPdf(fileOrData: File | ArrayBuffer | Uint8Array): Promise<{ bytes: Uint8Array; format: 'png' | 'jpeg' }> {
  const data = fileOrData instanceof File ? fileOrData : new Blob([fileOrData as BlobPart]);
  if (fileOrData instanceof File) {
    const lowerName = fileOrData.name.toLowerCase();
    const mime = (fileOrData.type || '').toLowerCase();
    if (mime === 'image/png' || lowerName.endsWith('.png')) return { bytes: new Uint8Array(await fileOrData.arrayBuffer()), format: 'png' };
    if (mime === 'image/jpeg' || mime === 'image/jpg' || lowerName.endsWith('.jpg') || lowerName.endsWith('.jpeg')) return { bytes: new Uint8Array(await fileOrData.arrayBuffer()), format: 'jpeg' };
  }
  const hasDocument = typeof document !== 'undefined';
  let resultBuffer: ArrayBuffer;
  if (typeof createImageBitmap === 'function') {
    const bitmap = await createImageBitmap(data);
    const w = bitmap.width, h = bitmap.height;
    let canvas: HTMLCanvasElement | OffscreenCanvas;
    if (typeof OffscreenCanvas !== 'undefined') {
      canvas = new OffscreenCanvas(w, h);
    } else if (typeof document !== 'undefined') {
      canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
    } else {
      throw new Error('Canvas support required for image processing');
    }
    const ctx = canvas.getContext('2d')! as CanvasRenderingContext2D;
    ctx.drawImage(bitmap, 0, 0);
    bitmap.close();
    const blob = (canvas instanceof OffscreenCanvas) ? await canvas.convertToBlob({ type: 'image/png' }) : await new Promise<Blob>(r => (canvas as HTMLCanvasElement).toBlob(b => r(b!), 'image/png'));
    resultBuffer = await blob.arrayBuffer();
  } else {
    if (!hasDocument) throw new Error('Image rendering requires a browser environment');
    const img = await loadImageFromBlob(data);
    const canvas = document.createElement('canvas');
    canvas.width = img.width; canvas.height = img.height;
    canvas.getContext('2d')!.drawImage(img, 0, 0);
    const blob = await new Promise<Blob>(r => canvas.toBlob(b => r(b!), 'image/png'));
    resultBuffer = await blob.arrayBuffer();
  }
  return { bytes: new Uint8Array(resultBuffer as ArrayBuffer), format: 'png' };
}

function resolvePageLayout(imageWidth: number, imageHeight: number, options: PDFProcessingOptions, fallbackMargin: number): PageLayout {
  const sizeOption = options.pageSize ?? 'auto';
  if (sizeOption === 'auto') return { pageWidth: imageWidth, pageHeight: imageHeight, margin: 0 };
  const base = PAGE_SIZE_MAP[sizeOption];
  if (!base) return { pageWidth: imageWidth, pageHeight: imageHeight, margin: 0 };
  const useLandscape = (options.pageOrientation ?? 'auto') === 'landscape' || ((options.pageOrientation ?? 'auto') === 'auto' && imageWidth > imageHeight);
  return { pageWidth: useLandscape ? base.height : base.width, pageHeight: useLandscape ? base.width : base.height, margin: Math.max(0, fallbackMargin) };
}

export async function convertImagesToPdf(files: File[], options: PDFProcessingOptions = {}): Promise<Uint8Array> {
  if (files.length === 0) throw new Error('No images provided');
  const pdfDoc = await PDFDocument.create();
  const defaultMargin = clamp(options.pageMarginPoints ?? 18, 0, 144);
  const background = parseBackgroundColor(options.backgroundColor);
  for (const file of files) {
    await yieldToMain();
    const normalised = await normalizeImageForPdf(file);
    const image = normalised.format === 'png' ? await pdfDoc.embedPng(normalised.bytes) : await pdfDoc.embedJpg(normalised.bytes);
    const layout = resolvePageLayout(image.size().width, image.size().height, options, defaultMargin);
    const page = pdfDoc.addPage([layout.pageWidth, layout.pageHeight]);
    page.drawRectangle({ x: 0, y: 0, width: layout.pageWidth, height: layout.pageHeight, color: background });
    const availW = Math.max(layout.pageWidth - layout.margin * 2, 0);
    const availH = Math.max(layout.pageHeight - layout.margin * 2, 0);
    const sf = (options.imageFit === 'cover') ? Math.max(availW / image.size().width, availH / image.size().height) : Math.min(availW / image.size().width, availH / image.size().height);
    page.drawImage(image, { x: (layout.pageWidth - image.size().width * sf) / 2, y: (layout.pageHeight - image.size().height * sf) / 2, width: image.size().width * sf, height: image.size().height * sf });
  }
  return pdfDoc.save({ useObjectStreams: true });
}

// Canvas factory for PDF.js in worker environment
const workerCanvasFactory = {
  create: function (width: number, height: number) {
    const safeW = Math.max(1, Math.ceil(width || 1));
    const safeH = Math.max(1, Math.ceil(height || 1));
    let canvas: HTMLCanvasElement | OffscreenCanvas;
    if (typeof OffscreenCanvas !== 'undefined') {
      canvas = new OffscreenCanvas(safeW, safeH);
    } else if (typeof document !== 'undefined') {
      canvas = document.createElement('canvas'); // SAFE
      canvas.width = safeW;
      canvas.height = safeH;
    } else {
      throw new Error('Canvas not supported');
    }
    const context = canvas.getContext('2d');
    return { canvas, context };
  },
  reset: function (canvasAndContext: { canvas: HTMLCanvasElement | OffscreenCanvas; context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D }, width: number, height: number) {
    if (canvasAndContext?.canvas) {
      canvasAndContext.canvas.width = Math.max(1, Math.ceil(width || 1));
      canvasAndContext.canvas.height = Math.max(1, Math.ceil(height || 1));
    }
  },
  destroy: function (canvasAndContext: { canvas: HTMLCanvasElement | OffscreenCanvas | null; context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D | null }) {
    if (canvasAndContext) {
      canvasAndContext.canvas = null;
      canvasAndContext.context = null;
    }
  },
};


export async function convertPdfToImages(
  fileOrData: File | ArrayBuffer | Uint8Array,
  options: PDFProcessingOptions = {},
  onProgress?: (progress: number, status: string) => void
): Promise<PdfToImagesArchiveResult> {
  const doc = await getCachedPdfDocument(fileOrData);
  const rawDpi =
    typeof options.imageRenderDpi === 'number' && !isNaN(options.imageRenderDpi)
      ? options.imageRenderDpi
      : Number(options.imageRenderDpi) || 144;
  const dpi = Math.max(36, Math.min(600, rawDpi));
  const scale = dpi / 72;
  const extension = (options.imageOutputFormat ?? 'png') === 'png' ? 'png' : 'jpg';
  const mimeType = extension === 'jpg' ? 'image/jpeg' : 'image/png';
  const quality =
    typeof options.imageOutputQuality === 'number' && !isNaN(options.imageOutputQuality)
      ? Math.min(Math.max(options.imageOutputQuality, 0.1), 1.0)
      : 0.92;

  const base = sanitizeFileBaseName(
    options.imageBaseName ??
      (fileOrData instanceof File ? stripExtension(fileOrData.name) : 'ihatelovepdf')
  );

  // Determine target pages
  let targetPages: number[] = [];
  if (options.pagesToExtract && options.pagesToExtract.length > 0) {
    targetPages = options.pagesToExtract.filter((p) => p >= 1 && p <= doc.numPages);
  } else if (options.pageRange) {
    const parts = options.pageRange.split(',').map((s) => s.trim());
    for (const part of parts) {
      if (part.includes('-')) {
        const [start, end] = part.split('-').map((n) => parseInt(n, 10));
        if (!isNaN(start) && !isNaN(end)) {
          for (let p = Math.max(1, start); p <= Math.min(doc.numPages, end); p++) {
            if (!targetPages.includes(p)) targetPages.push(p);
          }
        }
      } else {
        const p = parseInt(part, 10);
        if (!isNaN(p) && p >= 1 && p <= doc.numPages && !targetPages.includes(p)) {
          targetPages.push(p);
        }
      }
    }
  }

  if (targetPages.length === 0) {
    for (let i = 1; i <= doc.numPages; i++) {
      targetPages.push(i);
    }
  }

  const isZip = options.bundleAsZip !== false;
  let zip: InstanceType<typeof import('jszip')> | null = null;
  if (isZip) {
    const { default: JSZip } = await import('jszip');
    zip = new JSZip();
  }
  const entries: Array<{ name: string; blob: Blob }> = [];

  for (let idx = 0; idx < targetPages.length; idx++) {
    const pageNum = targetPages[idx];
    await yieldToMain();

    onProgress?.(
      Math.min(85, Math.round(((idx + 1) / targetPages.length) * 85)),
      `Rendering page ${pageNum} (${idx + 1} of ${targetPages.length})...`
    );

    const page = await doc.getPage(pageNum);
    const vp = page.getViewport({ scale, rotation: page.rotate || 0 });
    const w = Math.max(1, Math.ceil(vp.width || 595));
    const h = Math.max(1, Math.ceil(vp.height || 842));

    let canvas: HTMLCanvasElement | OffscreenCanvas;
    if (typeof OffscreenCanvas !== 'undefined') {
      canvas = new OffscreenCanvas(w, h);
    } else if (typeof document !== 'undefined') {
      canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
    } else {
      throw new Error('Canvas support required for PDF processing');
    }

    if (canvas.width <= 0 || canvas.height <= 0) {
      throw new Error(
        `Page ${pageNum} viewport computed invalid dimensions (${canvas.width}x${canvas.height}) — cannot rasterize.`
      );
    }

    const ctx = canvas.getContext('2d', { alpha: false })! as CanvasRenderingContext2D;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await page.render({
      canvasContext: ctx as unknown as CanvasRenderingContext2D,
      viewport: vp,
      canvasFactory: workerCanvasFactory,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any).promise;

    const borderWidth = options.imageBorderWidth ?? 0;
    const borderColor = options.imageBorderColor ?? '#000000';
    if (borderWidth > 0 && borderColor !== 'transparent') {
      const scaledWidth = Math.max(1, Math.round(borderWidth * (scale / 2)));
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = scaledWidth;
      ctx.strokeRect(scaledWidth / 2, scaledWidth / 2, w - scaledWidth, h - scaledWidth);
    }

    let blob: Blob;
    if (canvas instanceof OffscreenCanvas) {
      blob =
        extension === 'jpg'
          ? await canvas.convertToBlob({ type: mimeType, quality })
          : await canvas.convertToBlob({ type: mimeType });
    } else {
      blob = await new Promise<Blob>((resolve, reject) => {
        (canvas as HTMLCanvasElement).toBlob(
          (b) => (b ? resolve(b) : reject(new Error(`Failed to rasterize page ${pageNum} to blob`))),
          mimeType,
          extension === 'jpg' ? quality : undefined
        );
      });
    }

    const paddedNum = String(pageNum).padStart(String(doc.numPages).length, '0');
    const entryName = `${base}_${paddedNum}.${extension}`;

    if (zip) {
      const buffer = await blob.arrayBuffer();
      zip.file(entryName, buffer);
    } else {
      entries.push({ name: entryName, blob });
    }

    page.cleanup();
  }

  if (!zip) {
    return {
      kind: 'files',
      files: entries,
      imageCount: entries.length,
      format: options.imageOutputFormat ?? 'png',
    };
  }

  const zipBlob = await zip.generateAsync({ type: 'blob' }, (metadata) => {
    onProgress?.(
      Math.min(99, 85 + Math.round(metadata.percent * 0.14)),
      `Building ZIP archive (${Math.round(metadata.percent)}%)...`
    );
  });

  return {
    kind: 'zip',
    blob: zipBlob,
    imageCount: targetPages.length,
    format: options.imageOutputFormat ?? 'png',
    suggestedName: `${base}_${extension}.zip`,
  };
}

export async function renderPDFThumbnail(file: File, pageNumber: number, targetWidth = 160): Promise<string> {
  const cache = getThumbnailCache(file);
  const resolvedTargetWidth = Math.max(32, Math.min(600, targetWidth));
  const cacheKey = `${pageNumber}_${resolvedTargetWidth}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey)!;
  try {
    const doc = await getCachedPdfDocument(file);
    const page = await doc.getPage(pageNumber);
    const viewportAtScaleOne = page.getViewport({ scale: 1 });
    const scale = viewportAtScaleOne.width > 0 ? resolvedTargetWidth / viewportAtScaleOne.width : 1;
    const vp = page.getViewport({ scale, rotation: page.rotate || 0 });
    const w = Math.max(1, Math.ceil(vp.width || resolvedTargetWidth));
    const h = Math.max(1, Math.ceil(vp.height || resolvedTargetWidth * 1.414));

    let canvas: HTMLCanvasElement | OffscreenCanvas;
    if (typeof OffscreenCanvas !== 'undefined') {
      canvas = new OffscreenCanvas(w, h);
    } else if (typeof document !== 'undefined') {
      canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
    } else {
      return FALLBACK_THUMBNAIL;
    }

    const ctx = canvas.getContext('2d')! as CanvasRenderingContext2D;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, w, h);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await page.render({
      canvasContext: ctx as unknown as CanvasRenderingContext2D,
      viewport: vp,
      canvasFactory: workerCanvasFactory,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any).promise;

    if (canvas.width <= 0 || canvas.height <= 0) {
      return FALLBACK_THUMBNAIL;
    }

    // Convert to Data URL (OffscreenCanvas needs FileReader)
    let url: string;
    if (canvas instanceof OffscreenCanvas) {
      const blob = await canvas.convertToBlob({ type: 'image/png' });
      url = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve((reader.result as string) || FALLBACK_THUMBNAIL);
        reader.onerror = () => resolve(FALLBACK_THUMBNAIL);
        reader.readAsDataURL(blob);
      });
    } else {
      url = (canvas as HTMLCanvasElement).toDataURL('image/png');
    }

    cache.set(cacheKey, url);
    page.cleanup();
    return url;
  } catch {
    return FALLBACK_THUMBNAIL;
  }
}
