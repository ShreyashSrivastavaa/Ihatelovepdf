/**
 * Edge-case and Corrupted PDF Resilience Test Fixtures
 * Validates that client-side operations fail gracefully with descriptive
 * errors instead of hanging or crashing the SPA shell.
 */

import { PDFDocument, rgb } from 'pdf-lib';

export type DiagnosticResult = {
  isValid: boolean;
  pageCount: number;
  isEncrypted: boolean;
  hasStreams: boolean;
  warnings: string[];
  error?: string;
};

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
 * Generates synthetic test fixtures for automated client-side resilience verification
 */
export async function createTestFixture(
  type: 'blank' | 'multi-page' | 'image-page'
): Promise<Uint8Array> {
  const doc = await PDFDocument.create();

  if (type === 'blank') {
    doc.addPage([595, 842]);
  } else if (type === 'multi-page') {
    for (let i = 1; i <= 5; i++) {
      const page = doc.addPage([595, 842]);
      page.drawText(`Test Page ${i}`, { x: 50, y: 800, size: 24, color: rgb(0.1, 0.1, 0.1) });
    }
  } else if (type === 'image-page') {
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
