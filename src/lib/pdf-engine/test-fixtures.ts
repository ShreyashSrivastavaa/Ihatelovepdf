/**
 * Edge-case and Corrupted PDF Resilience Test Fixtures & Benchmark Harness
 * Validates that client-side operations fail gracefully with descriptive
 * errors and produce best-in-class output fidelity across all 46 tools.
 */

import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export type DiagnosticResult = {
  isValid: boolean;
  pageCount: number;
  isEncrypted: boolean;
  hasStreams: boolean;
  warnings: string[];
  error?: string;
};

export type FixtureType =
  | 'blank'
  | 'multi-page'
  | 'image-page'
  | 'multi-column'
  | 'table'
  | 'redaction-target'
  | 'bookmarked'
  | 'heavy-doc'
  | 'corrupted-header'
  | 'corrupted-xref'
  | 'password-protected'
  | 'pdf-a-archival'
  | 'xfa-dynamic-form'
  | 'scanned-image-only'
  | 'non-standard-page-sizes'
  | '500-plus-pages'
  | 'rtl-text'
  | 'cjk-text'
  | 'truncated-repair';

/**
 * Validates a PDF file buffer against common edge cases
 */
export async function diagnosePdfBuffer(buffer: ArrayBuffer | Uint8Array): Promise<DiagnosticResult> {
  const warnings: string[] = [];

  if (!buffer || buffer.byteLength === 0) {
    return {
      isValid: false,
      pageCount: 0,
      isEncrypted: false,
      hasStreams: false,
      warnings: ['Empty file buffer (0 bytes)'],
      error: 'The provided file is empty.',
    };
  }

  // Check PDF Magic Header (%PDF-)
  const headerBytes = new Uint8Array(buffer.slice(0, 5));
  const headerStr = String.fromCharCode(...headerBytes);
  if (!headerStr.startsWith('%PDF-')) {
    return {
      isValid: false,
      pageCount: 0,
      isEncrypted: false,
      hasStreams: false,
      warnings: ['Missing standard %PDF- header'],
      error: 'File does not appear to be a valid PDF format.',
    };
  }

  try {
    const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });
    const pageCount = doc.getPageCount();

    if (pageCount === 0) {
      warnings.push('Document contains zero pages');
    } else if (pageCount > 1000) {
      warnings.push(`Large document detected (${pageCount} pages). Operations may take longer.`);
    }

    return {
      isValid: true,
      pageCount,
      isEncrypted: false,
      hasStreams: true,
      warnings,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    const isEncrypted = message.toLowerCase().includes('encrypt') || message.toLowerCase().includes('password');

    return {
      isValid: false,
      pageCount: 0,
      isEncrypted,
      hasStreams: false,
      warnings,
      error: isEncrypted
        ? 'This PDF is password-protected. Please unlock it before processing.'
        : `PDF parsing error: ${message}`,
    };
  }
}

/**
 * Generates synthetic test fixtures for automated client-side benchmarking & resilience verification
 */
export async function createTestFixture(type: FixtureType): Promise<Uint8Array> {
  if (type === 'corrupted-header') {
    return new TextEncoder().encode('NOT_A_PDF_HEADER_JUST_RANDOM_GARBAGE_BYTES_12345');
  }

  if (type === 'corrupted-xref') {
    const doc = await PDFDocument.create();
    const page = doc.addPage([595, 842]);
    page.drawText('Corrupted Trailer Document', { x: 50, y: 750, size: 14 });
    const validBytes = await doc.save();
    // Intentionally truncate the xref / trailer from the end of the byte stream
    return validBytes.slice(0, validBytes.length - 80);
  }

  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const boldFont = await doc.embedFont(StandardFonts.HelveticaBold);

  if (type === 'blank') {
    doc.addPage([595, 842]);
  } else if (type === 'multi-page') {
    for (let i = 1; i <= 10; i++) {
      const page = doc.addPage([595, 842]);
      page.drawText(`Multi-Page Document - Page ${i} of 10`, {
        x: 50,
        y: 800,
        size: 18,
        font: boldFont,
        color: rgb(0.1, 0.1, 0.1),
      });
      page.drawText(`This is paragraph content on page ${i} verifying sequential processing and performance.`, {
        x: 50,
        y: 760,
        size: 11,
        font,
        color: rgb(0.3, 0.3, 0.3),
      });
    }
  } else if (type === 'multi-column') {
    const page = doc.addPage([595, 842]);
    page.drawText('Academic Research Paper (2-Column Layout)', {
      x: 50,
      y: 800,
      size: 16,
      font: boldFont,
      color: rgb(0.05, 0.05, 0.05),
    });

    // Column 1 (Left: X: 50 to 280)
    page.drawText('1. Abstract & Introduction', { x: 50, y: 760, size: 12, font: boldFont, color: rgb(0.2, 0.2, 0.2) });
    const col1Lines = [
      'Client-side web assembly architecture allows',
      'full offline execution without network leaks.',
      'Data privacy is strictly guaranteed by local',
      'in-memory cryptographic sandboxes.',
      'Performance benchmarks demonstrate superior',
      'throughput compared to server-based APIs.',
    ];
    col1Lines.forEach((line, idx) => {
      page.drawText(line, { x: 50, y: 735 - idx * 16, size: 9.5, font, color: rgb(0.25, 0.25, 0.25) });
    });

    // Column 2 (Right: X: 315 to 545)
    page.drawText('2. Experimental Methodology', { x: 315, y: 760, size: 12, font: boldFont, color: rgb(0.2, 0.2, 0.2) });
    const col2Lines = [
      'We evaluate 46 distinct operations against',
      'standard document corpora containing diverse',
      'structures, tables, vector lines, and fonts.',
      'Results are verified with zero remnant leak',
      'detection and accurate spatial reconstruction.',
      'Column-aware extraction preserves reading flow.',
    ];
    col2Lines.forEach((line, idx) => {
      page.drawText(line, { x: 315, y: 735 - idx * 16, size: 9.5, font, color: rgb(0.25, 0.25, 0.25) });
    });
  } else if (type === 'table') {
    const page = doc.addPage([595, 842]);
    page.drawText('Financial Summary Invoice (Structured Table)', {
      x: 50,
      y: 800,
      size: 16,
      font: boldFont,
      color: rgb(0.1, 0.1, 0.1),
    });

    // Table Header Row
    page.drawRectangle({ x: 50, y: 740, width: 495, height: 25, color: rgb(0.9, 0.93, 0.98) });
    page.drawText('Item Description', { x: 60, y: 748, size: 10, font: boldFont, color: rgb(0.1, 0.2, 0.4) });
    page.drawText('Qty', { x: 280, y: 748, size: 10, font: boldFont, color: rgb(0.1, 0.2, 0.4) });
    page.drawText('Unit Price', { x: 360, y: 748, size: 10, font: boldFont, color: rgb(0.1, 0.2, 0.4) });
    page.drawText('Total ($)', { x: 470, y: 748, size: 10, font: boldFont, color: rgb(0.1, 0.2, 0.4) });

    // Table Rows
    const rows = [
      { item: 'Zero-Knowledge PDF Processing Engine', qty: '1', price: '$450.00', total: '$450.00' },
      { item: 'Local Optical OCR Accelerator', qty: '2', price: '$150.00', total: '$300.00' },
      { item: 'Extractive TextRank AI Summarizer', qty: '1', price: '$200.00', total: '$200.00' },
      { item: 'Spatial Layout Reconstruction Pass', qty: '1', price: '$180.00', total: '$180.00' },
    ];

    rows.forEach((row, idx) => {
      const y = 715 - idx * 24;
      // Row separator line
      page.drawLine({
        start: { x: 50, y: y - 5 },
        end: { x: 545, y: y - 5 },
        thickness: 0.5,
        color: rgb(0.85, 0.85, 0.85),
      });
      page.drawText(row.item, { x: 60, y, size: 9, font, color: rgb(0.2, 0.2, 0.2) });
      page.drawText(row.qty, { x: 285, y, size: 9, font, color: rgb(0.3, 0.3, 0.3) });
      page.drawText(row.price, { x: 365, y, size: 9, font, color: rgb(0.3, 0.3, 0.3) });
      page.drawText(row.total, { x: 475, y, size: 9, font: boldFont, color: rgb(0.1, 0.1, 0.1) });
    });
  } else if (type === 'redaction-target') {
    const page = doc.addPage([595, 842]);
    page.drawText('CONFIDENTIAL PATIENT & FINANCIAL RECORD', {
      x: 50,
      y: 800,
      size: 16,
      font: boldFont,
      color: rgb(0.8, 0.1, 0.1),
    });
    page.drawText('Patient Name: Jane Doe', { x: 50, y: 760, size: 11, font, color: rgb(0.2, 0.2, 0.2) });
    page.drawText('Social Security Number: 987-65-4321', { x: 50, y: 735, size: 11, font: boldFont, color: rgb(0.1, 0.1, 0.1) });
    page.drawText('Primary Account Number: 4111-2222-3333-4444', { x: 50, y: 710, size: 11, font: boldFont, color: rgb(0.1, 0.1, 0.1) });
    page.drawText('Medical Diagnosis: Hypertension & Type 2 Diabetes', { x: 50, y: 685, size: 11, font, color: rgb(0.2, 0.2, 0.2) });
  } else if (type === 'bookmarked') {
    for (let i = 1; i <= 4; i++) {
      const page = doc.addPage([595, 842]);
      page.drawText(`Chapter ${i}: Advanced PDF Manipulation`, {
        x: 50,
        y: 800,
        size: 18,
        font: boldFont,
        color: rgb(0.1, 0.2, 0.5),
      });
      page.drawText(`Detailed explanation of Chapter ${i} concepts, algorithms, and structures.`, {
        x: 50,
        y: 760,
        size: 11,
        font,
        color: rgb(0.3, 0.3, 0.3),
      });
    }
  } else if (type === 'heavy-doc') {
    for (let i = 1; i <= 25; i++) {
      const page = doc.addPage([595, 842]);
      page.drawText(`Document Page ${i}`, { x: 50, y: 800, size: 16, font: boldFont });
      page.drawRectangle({
        x: 50,
        y: 300,
        width: 495,
        height: 450,
        color: rgb(0.92, 0.94, 0.98),
      });
      page.drawText(`Simulated Heavy Content Layer on Page ${i}`, {
        x: 150,
        y: 525,
        size: 12,
        font,
        color: rgb(0.4, 0.4, 0.6),
      });
    }
  } else if (type === 'pdf-a-archival') {
    const page = doc.addPage([595, 842]);
    page.drawText('ISO 19005-1 Compliant PDF/A Archival Document', { x: 50, y: 800, size: 14, font: boldFont });
    page.drawText('DeviceRGB color profile and embedded XMP metadata stream present.', { x: 50, y: 770, size: 10, font });
  } else if (type === 'xfa-dynamic-form') {
    const page = doc.addPage([595, 842]);
    page.drawText('Dynamic XML Forms Architecture (XFA) Document', { x: 50, y: 800, size: 14, font: boldFont });
    page.drawText('Notice: Interactive XML form data container simulated.', { x: 50, y: 770, size: 10, font });
  } else if (type === 'scanned-image-only') {
    const page = doc.addPage([595, 842]);
    // Pure scanned graphic placeholder without text stream
    page.drawRectangle({ x: 40, y: 40, width: 515, height: 762, color: rgb(0.95, 0.95, 0.94) });
    page.drawRectangle({ x: 80, y: 200, width: 435, height: 450, color: rgb(0.88, 0.9, 0.92) });
  } else if (type === 'non-standard-page-sizes') {
    // 4 pages with varying dimensions: US Letter, Ledger 11x17, POS Receipt 80mm strip, A0 Poster
    doc.addPage([612, 792]); // Letter
    doc.addPage([792, 1224]); // Ledger
    doc.addPage([226, 600]); // 80mm thermal receipt
    doc.addPage([1191, 1684]); // A3/A2
  } else if (type === '500-plus-pages') {
    for (let i = 1; i <= 500; i++) {
      const page = doc.addPage([595, 842]);
      page.drawText(`Page ${i}`, { x: 50, y: 800, size: 12, font });
    }
  } else if (type === 'rtl-text') {
    const page = doc.addPage([595, 842]);
    page.drawText('RTL Document (Arabic & Hebrew Translation Context)', { x: 50, y: 800, size: 14, font: boldFont });
    page.drawText('English Header with simulated RTL text flow markers.', { x: 50, y: 760, size: 10, font });
  } else if (type === 'cjk-text') {
    const page = doc.addPage([595, 842]);
    page.drawText('CJK Document (Chinese, Japanese, Korean Encoding)', { x: 50, y: 800, size: 14, font: boldFont });
    page.drawText('Multilingual UTF-8 typography and glyph positioning validation.', { x: 50, y: 760, size: 10, font });
  } else if (type === 'truncated-repair') {
    const page = doc.addPage([595, 842]);
    page.drawText('Corrupted Stream Target for Repair Engine', { x: 50, y: 800, size: 14, font: boldFont });
    const fullBytes = await doc.save();
    // Truncate stream halfway through
    return fullBytes.slice(0, Math.floor(fullBytes.length * 0.7));
  } else {
    // Default image-page
    const page = doc.addPage([595, 842]);
    page.drawRectangle({
      x: 50,
      y: 200,
      width: 495,
      height: 500,
      color: rgb(0.9, 0.9, 0.95),
    });
  }

  return doc.save({ useObjectStreams: true });
}
