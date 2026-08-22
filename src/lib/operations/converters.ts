import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import * as XLSX from 'xlsx';
import JSZip from 'jszip';

import type pptxgen from 'pptxgenjs';

type PdfJsModule = typeof import('pdfjs-dist/legacy/build/pdf');
type PptxConstructor = new () => pptxgen;

let pdfjsLibPromise: Promise<PdfJsModule> | null = null;
let pptxGenPromise: Promise<PptxConstructor> | null = null;

async function getPptxGen(): Promise<PptxConstructor> {
  if (typeof window === 'undefined') throw new Error('PPTX generation requires browser environment');
  if (!pptxGenPromise) {
    pptxGenPromise = import('pptxgenjs').then((m) => (m.default || m) as PptxConstructor);
  }
  return pptxGenPromise;
}

async function getPdfJs(): Promise<PdfJsModule> {
  if (typeof window === 'undefined') throw new Error('PDF conversions require browser environment');
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
    currentPage.drawText(options.title, {
      x: margin,
      y: currentY - 14,
      size: 16,
      font: boldFont,
      color: rgb(0.1, 0.1, 0.1),
    });
    currentY -= 36;
  }

  validRows.forEach((row, rowIdx) => {
    if (currentY - rowHeight < margin + 20) {
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
      const cellText = String(row[c] ?? '').trim();
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
// 3. PDF -> Excel (.xlsx)
// -------------------------------------------------------------
export async function convertPdfToExcel(
  fileOrData: File | ArrayBuffer | Uint8Array
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
  const workbook = XLSX.utils.book_new();

  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p);
    const textContent = await page.getTextContent();
    const items = textContent.items as Array<{
      str: string;
      transform: number[];
    }>;

    // Group items by line based on Y coordinate
    const lineMap = new Map<number, Array<{ x: number; text: string }>>();
    for (const item of items) {
      if (!item.str.trim()) continue;
      const x = Math.round(item.transform[4]);
      const y = Math.round(item.transform[5]);

      // Find closest existing bucket within 4 points
      let matchedY = y;
      for (const existingY of lineMap.keys()) {
        if (Math.abs(existingY - y) <= 4) {
          matchedY = existingY;
          break;
        }
      }

      if (!lineMap.has(matchedY)) {
        lineMap.set(matchedY, []);
      }
      lineMap.get(matchedY)!.push({ x, text: item.str });
    }

    // Sort lines top to bottom (highest Y first in PDF coords)
    const sortedY = Array.from(lineMap.keys()).sort((a, b) => b - a);
    const tableData: string[][] = [];

    for (const y of sortedY) {
      const lineItems = lineMap.get(y)!.sort((a, b) => a.x - b.x);
      const row: string[] = [];
      for (const it of lineItems) {
        row.push(it.text);
      }
      if (row.length > 0) {
        tableData.push(row);
      }
    }

    const sheet = XLSX.utils.aoa_to_sheet(tableData);
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
export async function convertPdfToPowerpoint(
  fileOrData: File | ArrayBuffer | Uint8Array,
  onProgress?: (current: number, total: number) => void
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
  const PptxGen = await getPptxGen();
  const pptx = new PptxGen();
  pptx.layout = 'LAYOUT_WIDE'; // 16:9

  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const vp = page.getViewport({ scale: 2.0 }); // High-res 144 DPI
    const canvas = document.createElement('canvas');
    canvas.width = Math.ceil(vp.width);
    canvas.height = Math.ceil(vp.height);
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    await page.render({ canvasContext: ctx, viewport: vp, canvas } as Parameters<typeof page.render>[0]).promise;

    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);

    const slide = pptx.addSlide();
    slide.addImage({
      data: dataUrl,
      x: 0,
      y: 0,
      w: '100%',
      h: '100%',
    });

    page.cleanup();
    if (onProgress) onProgress(i, doc.numPages);
  }

  const pptxBlob = (await pptx.write({ outputType: 'blob' })) as Blob;
  return pptxBlob;
}

// -------------------------------------------------------------
// 5. PowerPoint (.pptx) -> PDF
// -------------------------------------------------------------
export async function convertPowerpointToPdf(
  fileOrData: File | ArrayBuffer | Uint8Array
): Promise<Uint8Array> {
  const data = fileOrData instanceof File ? await fileOrData.arrayBuffer() : fileOrData;
  const zip = await JSZip.loadAsync(data);

  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Search for slide XML files in ppt/slides/
  const slideFiles = Object.keys(zip.files)
    .filter((f) => f.startsWith('ppt/slides/slide') && f.endsWith('.xml'))
    .sort((a, b) => {
      const numA = parseInt(a.replace(/[^\d]/g, ''), 10) || 0;
      const numB = parseInt(b.replace(/[^\d]/g, ''), 10) || 0;
      return numA - numB;
    });

  if (slideFiles.length === 0) {
    const page = pdfDoc.addPage([841.89, 595.28]);
    page.drawText('Converted Presentation', { x: 50, y: 500, size: 20, font: boldFont });
    return pdfDoc.save();
  }

  for (const slidePath of slideFiles) {
    const xml = await zip.files[slidePath].async('string');
    // Extract text nodes <a:t>
    const textMatches = Array.from(xml.matchAll(/<a:t>([^<]+)<\/a:t>/g)).map((m) => m[1]);

    const page = pdfDoc.addPage([841.89, 595.28]); // 16:9 Landscape
    let y = 520;

    page.drawText(`Slide ${slidePath.replace(/[^\d]/g, '')}`, {
      x: 50,
      y,
      size: 14,
      font: boldFont,
      color: rgb(0.1, 0.3, 0.7),
    });
    y -= 30;

    for (const line of textMatches) {
      if (y < 60) break;
      page.drawText(line, {
        x: 60,
        y,
        size: 12,
        font,
        color: rgb(0.15, 0.15, 0.15),
      });
      y -= 22;
    }
  }

  return pdfDoc.save({ useObjectStreams: true });
}

// -------------------------------------------------------------
// 6. Markdown -> PDF
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

  const lines = markdownText.split('\n');

  for (const line of lines) {
    if (currentY < margin + 40) {
      currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
      currentY = pageHeight - margin;
    }

    const trimmed = line.trim();

    if (trimmed.startsWith('# ')) {
      const heading = trimmed.slice(2);
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
      const heading = trimmed.slice(3);
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
      const heading = trimmed.slice(4);
      currentPage.drawText(heading, {
        x: margin,
        y: currentY,
        size: 12,
        font: boldFont,
        color: rgb(0.2, 0.2, 0.25),
      });
      currentY -= 18;
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const item = trimmed.slice(2);
      currentPage.drawText('•', { x: margin + 8, y: currentY, size: 10, font: boldFont, color: rgb(0.3, 0.3, 0.3) });
      currentPage.drawText(item, { x: margin + 20, y: currentY, size: 10, font, color: rgb(0.2, 0.2, 0.2) });
      currentY -= 16;
    } else if (trimmed.startsWith('```')) {
      // Code block start/end
      currentY -= 8;
    } else if (line.startsWith('    ') || line.startsWith('\t')) {
      currentPage.drawText(trimmed, { x: margin + 12, y: currentY, size: 9, font: monoFont, color: rgb(0.3, 0.3, 0.35) });
      currentY -= 14;
    } else if (trimmed.length === 0) {
      currentY -= 10;
    } else {
      // Normal paragraph text with basic word wrapping
      const words = trimmed.split(' ');
      let currentLine = '';

      for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        if (font.widthOfTextAtSize(testLine, baseFontSize) > contentWidth) {
          currentPage.drawText(currentLine, { x: margin, y: currentY, size: baseFontSize, font, color: rgb(0.2, 0.2, 0.2) });
          currentY -= baseFontSize + 4;
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
  // Strip tags or convert to readable layout
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

  // Standard EPUB mimetype (uncompressed)
  zip.file('mimetype', 'application/epub+zip', { compression: 'STORE' });

  // META-INF
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

  // content.opf
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

  // Find all xhtml / html files
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
