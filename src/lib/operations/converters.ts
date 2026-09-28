import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import JSZip from 'jszip';
import { clampCanvasScale, cleanupPdfPage, releaseCanvas } from '../canvas-limits';

import type pptxgen from 'pptxgenjs';

type PdfJsModule = typeof import('pdfjs-dist');
type PptxConstructor = new () => pptxgen;
type XlsxModule = typeof import('xlsx');

let pdfjsLibPromise: Promise<PdfJsModule> | null = null;
let pptxGenPromise: Promise<PptxConstructor> | null = null;
let xlsxPromise: Promise<XlsxModule> | null = null;

/**
 * Sanitizes arbitrary unicode strings into valid WinAnsi / Latin-1 encoding compatible with standard PDF fonts
 */
export function sanitizeForWinAnsi(text: string): string {
  if (!text) return '';
  return text
    // Replace null and replacement characters
    .replace(/[\u0000\uFFFD]/g, '')
    // Replace smart quotes and apostrophes with standard ASCII quotes
    .replace(/[\u2018\u2019\u201A\u201B]/g, "'")
    .replace(/[\u201C\u201D\u201E\u201F]/g, '"')
    // Replace various unicode dashes and hyphens with standard ASCII hyphen
    .replace(/[\u2010\u2011\u2012\u2013\u2014\u2015\u2212]/g, '-')
    // Replace bullets and list markers with standard dash
    .replace(/[\u2022\u2023\u25E6\u2043\u2219\u25CB\u25CF\u25AA\u25AB]/g, '-')
    // Replace ellipsis
    .replace(/\u2026/g, '...')
    // Replace non-breaking spaces and zero-width spaces with standard space
    .replace(/[\u00A0\u2000-\u200B\u202F\u205F\u3000\uFEFF]/g, ' ')
    // Replace remaining non-WinAnsi characters
    .replace(/[^\x00-\xFF]/g, (ch) => {
      // Try decomposing accented characters to base ASCII
      const normalized = ch.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      return normalized && normalized.length === 1 && normalized.charCodeAt(0) <= 0xff
        ? normalized
        : ' ';
    });
}

async function getXlsx(): Promise<XlsxModule> {
  if (!xlsxPromise) {
    xlsxPromise = import('xlsx').then((m) => (m.default || m) as XlsxModule);
  }
  return xlsxPromise;
}

async function getPptxGen(): Promise<PptxConstructor> {
  if (!pptxGenPromise) {
    pptxGenPromise = import('pptxgenjs').then((m) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mod = m as any;
      if (typeof mod.default === 'function') {
        return mod.default;
      }
      if (mod.default && typeof mod.default.default === 'function') {
        return mod.default.default;
      }
      if (typeof mod === 'function') {
        return mod;
      }
      return (mod.default || mod) as PptxConstructor;
    });
  }
  return pptxGenPromise;
}

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

export type BlankPdfPageSize = 'a4' | 'letter' | 'legal' | 'a3' | 'a5';
export type BlankPdfOrientation = 'portrait' | 'landscape';

export const BLANK_PAGE_DIMENSIONS: Record<BlankPdfPageSize, [number, number]> = {
  a4: [595.28, 841.89],
  letter: [612.0, 792.0],
  legal: [612.0, 1008.0],
  a3: [841.89, 1190.55],
  a5: [419.53, 595.28],
};

/**
 * Creates a completely blank PDF document with the requested page count, size, and orientation.
 * Contains genuinely blank pages with zero text, fonts, or images.
 */
export async function createBlankPdf(options: {
  pageCount?: number;
  pageSize?: BlankPdfPageSize;
  orientation?: BlankPdfOrientation;
} = {}): Promise<Uint8Array> {
  const count = Math.min(500, Math.max(1, Math.floor(options.pageCount || 1)));
  const sizeKey = options.pageSize || 'a4';
  const orientation = options.orientation || 'portrait';

  const [baseW, baseH] = BLANK_PAGE_DIMENSIONS[sizeKey] || BLANK_PAGE_DIMENSIONS.a4;
  const [pageWidth, pageHeight] = orientation === 'landscape' ? [baseH, baseW] : [baseW, baseH];

  const pdfDoc = await PDFDocument.create();

  for (let i = 0; i < count; i++) {
    pdfDoc.addPage([pageWidth, pageHeight]);
  }

  return pdfDoc.save({ useObjectStreams: true });
}

// -------------------------------------------------------------
// 1. CSV -> PDF
// -------------------------------------------------------------
export async function convertCsvToPdf(
  csvText: string,
  options: {
    delimiter?: string;
    title?: string;
    theme?: 'clean' | 'striped' | 'bordered';
    orientation?: 'portrait' | 'landscape';
  } = {}
): Promise<Uint8Array> {
  const XLSX = await getXlsx();
  const workbook = XLSX.read(csvText, { type: 'string', raw: true });
  const firstSheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[firstSheetName];
  const rows = XLSX.utils.sheet_to_json<string[]>(sheet, { header: 1 }) as string[][];

  return renderTableRowsToPdf(rows, options);
}

// -------------------------------------------------------------
// 2. Excel (.xlsx / .xls) -> PDF
// -------------------------------------------------------------
export async function convertExcelToPdf(
  fileOrData: File | ArrayBuffer | Uint8Array,
  options: {
    sheetName?: string;
    theme?: 'clean' | 'striped' | 'bordered';
    orientation?: 'portrait' | 'landscape';
  } = {}
): Promise<Uint8Array> {
  const XLSX = await getXlsx();
  const data = fileOrData instanceof File ? await fileOrData.arrayBuffer() : fileOrData;
  const workbook = XLSX.read(data, { type: 'array' });
  const sheetName = options.sheetName || workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json<string[]>(sheet, { header: 1 }) as string[][];

  return renderTableRowsToPdf(rows, {
    title: sheetName,
    ...options,
  });
}

async function renderTableRowsToPdf(
  rows: string[][],
  options: {
    title?: string;
    theme?: 'clean' | 'striped' | 'bordered';
    orientation?: 'portrait' | 'landscape';
  } = {}
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const isLandscape = options.orientation === 'landscape' || (rows[0] && rows[0].length > 5);
  const pageWidth = isLandscape ? 841.89 : 595.28;
  const pageHeight = isLandscape ? 595.28 : 841.89;
  const margin = 36;
  const contentWidth = pageWidth - margin * 2;

  const validRows = rows.filter((r) => r && r.length > 0 && r.some((c) => c !== undefined && c !== ''));
  if (validRows.length === 0) {
    const page = pdfDoc.addPage([pageWidth, pageHeight]);
    page.drawText('Empty Spreadsheet / Table', { x: margin, y: pageHeight - margin - 20, size: 14, font: boldFont });
    return pdfDoc.save();
  }

  const colCount = Math.max(...validRows.map((r) => r.length));
  const colWidth = contentWidth / colCount;
  const rowHeight = 22;
  const fontSize = colCount > 6 ? 8 : 9;

  let currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
  let currentY = pageHeight - margin;

  // Title
  if (options.title) {
    currentPage.drawText(sanitizeForWinAnsi(options.title), {
      x: margin,
      y: currentY - 14,
      size: 16,
      font: boldFont,
      color: rgb(0.1, 0.1, 0.1),
    });
    currentY -= 36;
  }

  validRows.forEach((row, rowIdx) => {
    if (currentY - rowHeight < margin) {
      currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
      currentY = pageHeight - margin;
    }

    const isHeader = rowIdx === 0;

    // Background highlight
    if (isHeader) {
      currentPage.drawRectangle({
        x: margin,
        y: currentY - rowHeight,
        width: contentWidth,
        height: rowHeight,
        color: rgb(0.93, 0.94, 0.96),
      });
    } else if (rowIdx % 2 === 1 && options.theme === 'striped') {
      currentPage.drawRectangle({
        x: margin,
        y: currentY - rowHeight,
        width: contentWidth,
        height: rowHeight,
        color: rgb(0.98, 0.98, 0.99),
      });
    }

    // Border line
    currentPage.drawLine({
      start: { x: margin, y: currentY - rowHeight },
      end: { x: margin + contentWidth, y: currentY - rowHeight },
      thickness: isHeader ? 1.0 : 0.5,
      color: isHeader ? rgb(0.7, 0.7, 0.75) : rgb(0.88, 0.88, 0.9),
    });

    for (let c = 0; c < colCount; c++) {
      const cellText = sanitizeForWinAnsi(String(row[c] ?? '').trim());
      const cellFont = isHeader ? boldFont : font;
      const cellColor = isHeader ? rgb(0.1, 0.1, 0.15) : rgb(0.2, 0.2, 0.25);

      // Truncate cell text if exceeding column width
      let display = cellText;
      while (display.length > 0 && cellFont.widthOfTextAtSize(display, fontSize) > colWidth - 8) {
        display = display.slice(0, -1);
      }
      if (display !== cellText && display.length > 3) {
        display = display.slice(0, -3) + '...';
      }

      currentPage.drawText(display, {
        x: margin + c * colWidth + 4,
        y: currentY - rowHeight + 6,
        size: fontSize,
        font: cellFont,
        color: cellColor,
      });
    }

    currentY -= rowHeight;
  });

  return pdfDoc.save({ useObjectStreams: true });
}

// -------------------------------------------------------------
// 3. PDF -> Excel (.xlsx) with Column Clustering & Table Inference
// -------------------------------------------------------------
export async function convertPdfToExcel(
  fileOrData: File | ArrayBuffer | Uint8Array
): Promise<Blob> {
  const pdfjs = await getPdfJs();
  const XLSX = await getXlsx();
  const data = fileOrData instanceof File ? await fileOrData.arrayBuffer() : fileOrData;
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

  const loadingTask = pdfjs.getDocument({
    data,
    cMapUrl: `${baseUrl}/cmaps/`,
    cMapPacked: true,
    standardFontDataUrl: `${baseUrl}/standard_fonts/`,
  });

  const doc = await loadingTask.promise;
  const workbook = XLSX.utils.book_new();

  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p);
    const textContent = await page.getTextContent();
    const items = textContent.items as Array<{
      str: string;
      transform: number[];
    }>;

    // 1. Group items by vertical lines (Y coordinate buckets within 5 pt)
    const lineMap = new Map<number, Array<{ x: number; text: string }>>();
    const allXCoords: number[] = [];

    for (const item of items) {
      const text = item.str.trim();
      if (!text) continue;
      const x = Math.round(item.transform[4]);
      const y = Math.round(item.transform[5]);
      allXCoords.push(x);

      let matchedY = y;
      for (const existingY of lineMap.keys()) {
        if (Math.abs(existingY - y) <= 5) {
          matchedY = existingY;
          break;
        }
      }

      if (!lineMap.has(matchedY)) {
        lineMap.set(matchedY, []);
      }
      lineMap.get(matchedY)!.push({ x, text });
    }

    // 2. Compute Global Column Clusters (cluster X coordinates within 20 pt)
    const sortedX = Array.from(new Set(allXCoords)).sort((a, b) => a - b);
    const columnCentroids: number[] = [];

    for (const x of sortedX) {
      let matchedCol = false;
      for (let i = 0; i < columnCentroids.length; i++) {
        if (Math.abs(columnCentroids[i] - x) <= 24) {
          matchedCol = true;
          break;
        }
      }
      if (!matchedCol) {
        columnCentroids.push(x);
      }
    }
    columnCentroids.sort((a, b) => a - b);

    // 3. Populate Rows using Column Bins to prevent column shifts
    const sortedY = Array.from(lineMap.keys()).sort((a, b) => b - a);
    const tableData: Array<Array<string | number>> = [];

    for (const y of sortedY) {
      const lineItems = lineMap.get(y)!;
      const row: Array<string | number> = new Array(Math.max(1, columnCentroids.length)).fill('');

      for (const it of lineItems) {
        // Find nearest column centroid
        let bestColIdx = 0;
        let minDiff = Infinity;
        for (let c = 0; c < columnCentroids.length; c++) {
          const diff = Math.abs(columnCentroids[c] - it.x);
          if (diff < minDiff) {
            minDiff = diff;
            bestColIdx = c;
          }
        }

        const existingVal = row[bestColIdx];
        const combinedStr = existingVal ? `${existingVal} ${it.text}` : it.text;

        // Numeric parsing
        const cleanNum = combinedStr.replace(/[$,€£]/g, '').trim();
        if (cleanNum && !isNaN(Number(cleanNum)) && !cleanNum.startsWith('0') && cleanNum.length < 12) {
          row[bestColIdx] = Number(cleanNum);
        } else {
          row[bestColIdx] = combinedStr;
        }
      }

      if (row.some((cell) => cell !== '')) {
        tableData.push(row);
      }
    }

    const sheet = XLSX.utils.aoa_to_sheet(tableData.length > 0 ? tableData : [['']]);
    XLSX.utils.book_append_sheet(workbook, sheet, `Page ${p}`);
  }

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  return new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
}

// -------------------------------------------------------------
// 4. PDF -> PowerPoint (.pptx)
// -------------------------------------------------------------
// 4. PDF -> PowerPoint (.pptx)
// -------------------------------------------------------------
export async function convertPdfToPowerpoint(
  fileOrData: File | ArrayBuffer | Uint8Array,
  onProgress?: (current: number, total: number) => void
): Promise<Blob> {
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).JSZip = JSZip;
  }

  const pdfjs = await getPdfJs();
  const data = fileOrData instanceof File ? await fileOrData.arrayBuffer() : fileOrData;
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

  let doc;
  try {
    const loadingTask = pdfjs.getDocument({
      data,
      cMapUrl: `${baseUrl}/cmaps/`,
      cMapPacked: true,
      standardFontDataUrl: `${baseUrl}/standard_fonts/`,
    });
    doc = await loadingTask.promise;
  } catch (err: unknown) {
    const errorObj = err as { name?: string; message?: string };
    if (errorObj?.name === 'PasswordException') {
      throw new Error('This PDF is password-protected. Please decrypt it first.');
    }
    throw new Error(`Failed to read PDF: ${errorObj?.message || 'Invalid or corrupted PDF document.'}`);
  }

  if (doc.numPages === 0) {
    throw new Error('The provided PDF document has 0 pages.');
  }

  const PptxGen = await getPptxGen();
  const pptx = new PptxGen();

  // Inspect first page to determine slide aspect ratio
  try {
    const firstPage = await doc.getPage(1);
    try {
      const unscaledVp = firstPage.getViewport({ scale: 1.0 });
      const isPortrait = unscaledVp.height > unscaledVp.width;
      const isStandard43 = !isPortrait && unscaledVp.width / unscaledVp.height < 1.5;

      if (isPortrait) {
        // If defineLayout is supported on the instance, register portrait; otherwise fallback to LAYOUT_4x3 or LAYOUT_WIDE
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (typeof (pptx as any).defineLayout === 'function') {
          try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (pptx as any).defineLayout({ name: 'PORTRAIT_PAGE', width: 8.5, height: 11.0 });
            pptx.layout = 'PORTRAIT_PAGE';
          } catch {
            pptx.layout = 'LAYOUT_WIDE';
          }
        } else {
          pptx.layout = 'LAYOUT_WIDE';
        }
      } else if (isStandard43) {
        pptx.layout = 'LAYOUT_4x3';
      } else {
        pptx.layout = 'LAYOUT_WIDE'; // Standard 16:9 widescreen
      }
    } finally {
      cleanupPdfPage(firstPage);
    }
  } catch (layoutErr) {
    console.warn('Could not inspect initial page dimensions for layout, using standard widescreen:', layoutErr);
    pptx.layout = 'LAYOUT_WIDE';
  }

  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    try {
      if (typeof document === 'undefined') {
        const textContent = await page.getTextContent();
        const text = textContent.items
          .map((item) => ('str' in item ? (item as { str: string }).str : ''))
          .filter(Boolean)
          .join(' ');
        const slide = pptx.addSlide();
        slide.addText(text || `Slide ${i}`, { x: 0.5, y: 0.5, w: '90%', h: '80%', fontSize: 16 });
      } else {
        const unscaledVp = page.getViewport({ scale: 1.0 });
        // Crisp 150-200 DPI rendering with bounds to avoid canvas size overflow
        const renderScale = Math.min(2.5, Math.max(1.5, 1800 / Math.max(unscaledVp.width, unscaledVp.height)));
        const { scale: safeScale } = clampCanvasScale(unscaledVp.width, unscaledVp.height, renderScale);
        const vp = page.getViewport({ scale: safeScale });

        const canvas = document.createElement('canvas');
        canvas.width = Math.ceil(vp.width);
        canvas.height = Math.ceil(vp.height);
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) {
          throw new Error('Failed to create 2D canvas context for slide rendering.');
        }

        try {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          await page.render({
            canvasContext: ctx,
            viewport: vp,
            canvas,
          } as Parameters<typeof page.render>[0]).promise;

          const dataUrl = canvas.toDataURL('image/jpeg', 0.92);

          const slide = pptx.addSlide();
          slide.addImage({
            data: dataUrl,
            x: 0,
            y: 0,
            w: '100%',
            h: '100%',
            sizing: { type: 'contain', w: '100%', h: '100%' },
          });
        } finally {
          releaseCanvas(canvas);
        }
      }
    } finally {
      cleanupPdfPage(page);
    }
    if (onProgress) onProgress(i, doc.numPages);
  }

  const output = await pptx.write({ outputType: 'blob' });
  if (output instanceof Blob) {
    return output;
  }
  return new Blob([output as ArrayBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  });
}

// -------------------------------------------------------------
// 5. PowerPoint (.pptx) -> PDF
// -------------------------------------------------------------
export async function convertPowerpointToPdf(
  fileOrData: File | ArrayBuffer | Uint8Array
): Promise<Uint8Array> {
  const data = fileOrData instanceof File ? await fileOrData.arrayBuffer() : fileOrData;

  let zip: JSZip;
  try {
    zip = await JSZip.loadAsync(data);
  } catch {
    throw new Error('Invalid or corrupted PowerPoint presentation file (.pptx).');
  }

  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // 1. Determine slide dimensions from presentation.xml
  let slideWidth = 960; // default 16:9 widescreen in pt
  let slideHeight = 540;

  const presFile = zip.file('ppt/presentation.xml');
  if (presFile) {
    const presXml = await presFile.async('string');
    const sldSzMatch = presXml.match(/<p:sldSz[^>]*cx="(\d+)"[^>]*cy="(\d+)"/i);
    if (sldSzMatch) {
      const cxEmu = parseInt(sldSzMatch[1], 10);
      const cyEmu = parseInt(sldSzMatch[2], 10);
      if (cxEmu > 0 && cyEmu > 0) {
        // 1 EMU = 1/12700 pt
        slideWidth = Math.round(cxEmu / 12700);
        slideHeight = Math.round(cyEmu / 12700);
      }
    }
  }

  // 2. Discover slides in order
  const slideFiles = Object.keys(zip.files)
    .filter((f) => f.startsWith('ppt/slides/slide') && f.endsWith('.xml'))
    .sort((a, b) => {
      const numA = parseInt(a.replace(/[^\d]/g, ''), 10) || 0;
      const numB = parseInt(b.replace(/[^\d]/g, ''), 10) || 0;
      return numA - numB;
    });

  if (slideFiles.length === 0) {
    const page = pdfDoc.addPage([slideWidth, slideHeight]);
    page.drawText('Converted Presentation', {
      x: 50,
      y: slideHeight - 80,
      size: 24,
      font: boldFont,
      color: rgb(0.1, 0.2, 0.4),
    });
    return pdfDoc.save({ useObjectStreams: true });
  }

  for (let idx = 0; idx < slideFiles.length; idx++) {
    const slidePath = slideFiles[idx];
    const slideNum = idx + 1;
    const xml = await zip.files[slidePath].async('string');
    const page = pdfDoc.addPage([slideWidth, slideHeight]);

    // Check for slide background or embedded images in relations
    const relsPath = `ppt/slides/_rels/slide${slideNum}.xml.rels`;
    const relsFile = zip.file(relsPath);
    if (relsFile) {
      try {
        const relsXml = await relsFile.async('string');
        const mediaMatches = Array.from(
          relsXml.matchAll(/Target="(?:\.\.\/)?media\/([^"]+)"/g)
        ).map((m) => m[1]);

        for (const mediaName of mediaMatches) {
          const mediaFile = zip.file(`ppt/media/${mediaName}`);
          if (mediaFile) {
            const mediaBytes = await mediaFile.async('uint8array');
            if (mediaName.endsWith('.png')) {
              const embeddedImg = await pdfDoc.embedPng(mediaBytes);
              const imgDims = embeddedImg.scale(Math.min(1.0, (slideWidth * 0.4) / embeddedImg.width));
              page.drawImage(embeddedImg, {
                x: slideWidth - imgDims.width - 40,
                y: 40,
                width: imgDims.width,
                height: imgDims.height,
              });
            } else if (mediaName.endsWith('.jpg') || mediaName.endsWith('.jpeg')) {
              const embeddedImg = await pdfDoc.embedJpg(mediaBytes);
              const imgDims = embeddedImg.scale(Math.min(1.0, (slideWidth * 0.4) / embeddedImg.width));
              page.drawImage(embeddedImg, {
                x: slideWidth - imgDims.width - 40,
                y: 40,
                width: imgDims.width,
                height: imgDims.height,
              });
            }
          }
        }
      } catch {
        // Continue if embedded media decoding fails
      }
    }

    // Extract text paragraphs and runs
    const paragraphs: string[] = [];
    const pRegex = /<a:p>([\s\S]*?)<\/a:p>/g;
    let pMatch: RegExpExecArray | null;

    while ((pMatch = pRegex.exec(xml)) !== null) {
      const pContent = pMatch[1];
      const textPieces = Array.from(pContent.matchAll(/<a:t>([^<]+)<\/a:t>/g)).map(
        (m) => m[1]
      );
      const joined = textPieces.join(' ').trim();
      if (joined) {
        paragraphs.push(joined);
      }
    }

    let y = slideHeight - 60;

    // Slide Header
    page.drawText(`Slide ${slideNum}`, {
      x: 50,
      y,
      size: 13,
      font: boldFont,
      color: rgb(0.85, 0.35, 0.15), // Brand accent
    });
    y -= 35;

    // Slide title & content paragraphs
    for (let pIdx = 0; pIdx < paragraphs.length; pIdx++) {
      if (y < 45) break;
      const text = sanitizeForWinAnsi(paragraphs[pIdx]);
      const isTitle = pIdx === 0 && text.length < 80;
      const fontSize = isTitle ? 18 : 12;
      const activeFont = isTitle ? boldFont : font;
      const color = isTitle ? rgb(0.1, 0.15, 0.25) : rgb(0.2, 0.25, 0.3);

      // Simple word wrapping
      const words = text.split(' ');
      let currentLine = '';
      const maxLineWidth = slideWidth * 0.65;

      for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        const testWidth = activeFont.widthOfTextAtSize(testLine, fontSize);
        if (testWidth > maxLineWidth) {
          if (currentLine && y >= 45) {
            page.drawText(currentLine, {
              x: isTitle ? 50 : 65,
              y,
              size: fontSize,
              font: activeFont,
              color,
            });
            y -= fontSize + 6;
          }
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      }

      if (currentLine && y >= 45) {
        page.drawText(currentLine, {
          x: isTitle ? 50 : 65,
          y,
          size: fontSize,
          font: activeFont,
          color,
        });
        y -= fontSize + (isTitle ? 16 : 8);
      }
    }
  }

  return pdfDoc.save({ useObjectStreams: true });
}

// -------------------------------------------------------------
// 6. Markdown -> PDF with Tables & Code Highlighting
// -------------------------------------------------------------
export async function convertMarkdownToPdf(
  markdownText: string,
  options: {
    title?: string;
    fontSize?: number;
    theme?: 'clean' | 'academic' | 'modern';
  } = {}
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const monoFont = await pdfDoc.embedFont(StandardFonts.Courier);

  const baseFontSize = options.fontSize || 10;
  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const margin = 40;
  const contentWidth = pageWidth - margin * 2;

  let currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
  let currentY = pageHeight - margin;

  const cleanMarkdown = sanitizeForWinAnsi(markdownText);
  const lines = cleanMarkdown.split('\n');

  for (const line of lines) {
    if (currentY < margin + 40) {
      currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
      currentY = pageHeight - margin;
    }

    const trimmed = line.trim();

    if (trimmed.startsWith('# ')) {
      const heading = sanitizeForWinAnsi(trimmed.slice(2));
      currentY -= 10;
      currentPage.drawText(heading, {
        x: margin,
        y: currentY,
        size: 20,
        font: boldFont,
        color: rgb(0.1, 0.1, 0.15),
      });
      currentY -= 28;
    } else if (trimmed.startsWith('## ')) {
      const heading = sanitizeForWinAnsi(trimmed.slice(3));
      currentY -= 6;
      currentPage.drawText(heading, {
        x: margin,
        y: currentY,
        size: 15,
        font: boldFont,
        color: rgb(0.15, 0.15, 0.2),
      });
      currentY -= 22;
    } else if (trimmed.startsWith('### ')) {
      const heading = sanitizeForWinAnsi(trimmed.slice(4));
      currentPage.drawText(heading, {
        x: margin,
        y: currentY,
        size: 12,
        font: boldFont,
        color: rgb(0.2, 0.2, 0.25),
      });
      currentY -= 18;
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const item = sanitizeForWinAnsi(trimmed.slice(2));
      currentPage.drawCircle({
        x: margin + 8,
        y: currentY + 3.5,
        size: 2,
        color: rgb(0.3, 0.3, 0.35),
      });
      currentPage.drawText(item, { x: margin + 18, y: currentY, size: 10, font, color: rgb(0.2, 0.2, 0.2) });
      currentY -= 16;
    } else if (trimmed.startsWith('```')) {
      // Code block card
      currentPage.drawRectangle({
        x: margin,
        y: currentY - 6,
        width: contentWidth,
        height: 18,
        color: rgb(0.95, 0.95, 0.97),
      });
      currentY -= 14;
    } else if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      // Markdown Table Row
      const cells = trimmed
        .slice(1, -1)
        .split('|')
        .map((c) => sanitizeForWinAnsi(c.trim()));
      if (cells.every((c) => c.match(/^:?-+:?$/))) {
        // Separator line
        currentPage.drawLine({
          start: { x: margin, y: currentY },
          end: { x: margin + contentWidth, y: currentY },
          thickness: 1,
          color: rgb(0.8, 0.8, 0.85),
        });
        currentY -= 12;
      } else {
        const cellW = contentWidth / cells.length;
        cells.forEach((cell, idx) => {
          currentPage.drawText(cell, {
            x: margin + idx * cellW + 4,
            y: currentY,
            size: 9,
            font: boldFont,
            color: rgb(0.2, 0.2, 0.2),
          });
        });
        currentY -= 16;
      }
    } else if (line.startsWith('    ') || line.startsWith('\t')) {
      currentPage.drawText(sanitizeForWinAnsi(trimmed), { x: margin + 12, y: currentY, size: 9, font: monoFont, color: rgb(0.2, 0.3, 0.5) });
      currentY -= 14;
    } else if (trimmed.length === 0) {
      currentY -= 10;
    } else {
      // Normal paragraph text with word wrapping
      const words = trimmed.split(' ');
      let currentLine = '';

      for (const rawWord of words) {
        const word = sanitizeForWinAnsi(rawWord);
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        if (font.widthOfTextAtSize(testLine, baseFontSize) > contentWidth) {
          if (currentLine) {
            currentPage.drawText(currentLine, { x: margin, y: currentY, size: baseFontSize, font, color: rgb(0.2, 0.2, 0.2) });
            currentY -= baseFontSize + 4;
          }
          if (currentY < margin + 40) {
            currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
            currentY = pageHeight - margin;
          }
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      }

      if (currentLine) {
        currentPage.drawText(currentLine, { x: margin, y: currentY, size: baseFontSize, font, color: rgb(0.2, 0.2, 0.2) });
        currentY -= baseFontSize + 4;
      }
    }
  }

  return pdfDoc.save({ useObjectStreams: true });
}

// -------------------------------------------------------------
// 7. HTML -> PDF
// -------------------------------------------------------------
export async function convertHtmlToPdf(
  htmlContent: string,
  options: { title?: string } = {}
): Promise<Uint8Array> {
  const text = htmlContent
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '# $1\n\n')
    .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '## $1\n\n')
    .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '### $1\n\n')
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1\n')
    .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1\n\n')
    .replace(/<br\s*[\/]?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();

  return convertMarkdownToPdf(text || 'Empty HTML Document', options);
}

// -------------------------------------------------------------
// 8. PDF -> HTML
// -------------------------------------------------------------
export async function convertPdfToHtml(
  fileOrData: File | ArrayBuffer | Uint8Array
): Promise<string> {
  const pdfjs = await getPdfJs();
  const data = fileOrData instanceof File ? await fileOrData.arrayBuffer() : fileOrData;
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

  const loadingTask = pdfjs.getDocument({
    data,
    cMapUrl: `${baseUrl}/cmaps/`,
    cMapPacked: true,
    standardFontDataUrl: `${baseUrl}/standard_fonts/`,
  });

  const doc = await loadingTask.promise;
  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Converted Document</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; color: #1e293b; background: #f8fafc; padding: 2rem; max-width: 800px; margin: 0 auto; }
    .page { background: #ffffff; padding: 2.5rem; border-radius: 12px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); margin-bottom: 2rem; border: 1px solid #e2e8f0; }
    .page-header { font-size: 0.75rem; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 1.5rem; border-bottom: 1px solid #f1f5f9; padding-bottom: 0.5rem; }
    p { margin-bottom: 1rem; }
  </style>
</head>
<body>
`;

  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map((it) => ('str' in it ? (it as { str: string }).str : ''))
      .join(' ');

    html += `  <div class="page">\n    <div class="page-header">Page ${i} of ${doc.numPages}</div>\n    <p>${pageText}</p>\n  </div>\n`;
  }

  html += `</body>\n</html>`;
  return html;
}

// -------------------------------------------------------------
// 9. PDF -> EPUB (.epub)
// -------------------------------------------------------------
export async function convertPdfToEpub(
  fileOrData: File | ArrayBuffer | Uint8Array,
  title = 'Converted eBook'
): Promise<Blob> {
  const pdfjs = await getPdfJs();
  const data = fileOrData instanceof File ? await fileOrData.arrayBuffer() : fileOrData;
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

  const loadingTask = pdfjs.getDocument({
    data,
    cMapUrl: `${baseUrl}/cmaps/`,
    cMapPacked: true,
    standardFontDataUrl: `${baseUrl}/standard_fonts/`,
  });

  const doc = await loadingTask.promise;
  const zip = new JSZip();

  zip.file('mimetype', 'application/epub+zip', { compression: 'STORE' });

  zip.folder('META-INF')!.file(
    'container.xml',
    `<?xml version="1.0"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>`
  );

  const oebps = zip.folder('OEBPS')!;
  let manifestItems = '';
  let spineItems = '';

  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map((it) => ('str' in it ? (it as { str: string }).str : ''))
      .join(' ');

    const chapterHtml = `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head><title>Chapter ${i}</title></head>
<body>
  <h2>Chapter ${i}</h2>
  <p>${pageText}</p>
</body>
</html>`;

    oebps.file(`chapter_${i}.xhtml`, chapterHtml);
    manifestItems += `    <item id="chap_${i}" href="chapter_${i}.xhtml" media-type="application/xhtml+xml"/>\n`;
    spineItems += `    <itemref idref="chap_${i}"/>\n`;
  }

  oebps.file(
    'content.opf',
    `<?xml version="1.0" encoding="utf-8"?>
<package xmlns="http://www.idpf.org/2007/opf" unique-identifier="BookID" version="3.0">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:title>${title}</dc:title>
    <dc:language>en</dc:language>
    <dc:identifier id="BookID">urn:uuid:${Math.random().toString(36).slice(2)}</dc:identifier>
  </metadata>
  <manifest>
    <item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>
${manifestItems}  </manifest>
  <spine toc="ncx">
${spineItems}  </spine>
</package>`
  );

  return zip.generateAsync({ type: 'blob', mimeType: 'application/epub+zip' });
}

// -------------------------------------------------------------
// 10. eBook (EPUB) -> PDF
// -------------------------------------------------------------
export async function convertEbookToPdf(
  fileOrData: File | ArrayBuffer | Uint8Array
): Promise<Uint8Array> {
  const data = fileOrData instanceof File ? await fileOrData.arrayBuffer() : fileOrData;
  const zip = await JSZip.loadAsync(data);

  const htmlFiles = Object.keys(zip.files).filter(
    (f) => f.endsWith('.xhtml') || f.endsWith('.html') || f.endsWith('.htm')
  );

  let combinedText = '';
  for (const f of htmlFiles) {
    const raw = await zip.files[f].async('string');
    const text = raw.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (text) {
      combinedText += `# Section ${f}\n\n${text}\n\n`;
    }
  }

  return convertMarkdownToPdf(combinedText || 'Empty eBook Document');
}
