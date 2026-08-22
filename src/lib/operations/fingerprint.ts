import { PDFDocument, PDFName, PDFString, StandardFonts, rgb } from 'pdf-lib';

// Zero-width characters used for binary encoding
const ZW_ZERO = '\u200B'; // Zero-Width Space
const ZW_ONE = '\u200C';  // Zero-Width Non-Joiner
const ZW_SEP = '\u200D';  // Zero-Width Joiner

export interface FingerprintResult {
  data: Uint8Array;
  fingerprintId: string;
  recipient: string;
  timestamp: string;
}

function textToZeroWidth(text: string): string {
  const binary = text
    .split('')
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, '0'))
    .join('');
  return (
    ZW_SEP +
    binary
      .split('')
      .map((b) => (b === '1' ? ZW_ONE : ZW_ZERO))
      .join('') +
    ZW_SEP
  );
}

export function zeroWidthToText(zw: string): string | null {
  const match = zw.match(new RegExp(`${ZW_SEP}([${ZW_ZERO}${ZW_ONE}]+)${ZW_SEP}`));
  if (!match) return null;
  const binary = match[1]
    .split('')
    .map((c) => (c === ZW_ONE ? '1' : '0'))
    .join('');
  let text = '';
  for (let i = 0; i < binary.length; i += 8) {
    const byte = binary.slice(i, i + 8);
    if (byte.length === 8) {
      text += String.fromCharCode(parseInt(byte, 2));
    }
  }
  return text;
}

export async function fingerprintPdf(
  fileOrData: File | ArrayBuffer | Uint8Array,
  recipient: string,
  customFingerprintId?: string
): Promise<FingerprintResult> {
  const arrayBuffer =
    fileOrData instanceof File ? await fileOrData.arrayBuffer() : fileOrData;
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const timestamp = new Date().toISOString();
  const fingerprintId =
    customFingerprintId ||
    `FP-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;

  const payload = JSON.stringify({
    id: fingerprintId,
    rcpt: recipient.trim() || 'Confidential Recipient',
    ts: timestamp,
  });

  const zeroWidthPayload = textToZeroWidth(payload);

  // 1. Embed invisible micro-text on every page (opacity 0.01, size 1)
  const pages = pdfDoc.getPages();
  pages.forEach((page) => {
    page.drawText(`[SEC:${fingerprintId}]${zeroWidthPayload}`, {
      x: 10,
      y: 10,
      size: 1,
      font,
      color: rgb(0.99, 0.99, 0.99),
      opacity: 0.01,
    });
  });

  // 2. Embed custom catalog identifier
  pdfDoc.catalog.set(
    PDFName.of('DocFingerprint'),
    PDFString.of(`ID:${fingerprintId};RCPT:${recipient};TS:${timestamp}`)
  );

  const data = await pdfDoc.save({ useObjectStreams: true });

  return {
    data,
    fingerprintId,
    recipient: recipient.trim() || 'Confidential Recipient',
    timestamp,
  };
}

export async function inspectPdfFingerprint(
  fileOrData: File | ArrayBuffer | Uint8Array
): Promise<{
  found: boolean;
  fingerprintId?: string;
  recipient?: string;
  timestamp?: string;
}> {
  try {
    const arrayBuffer =
      fileOrData instanceof File ? await fileOrData.arrayBuffer() : fileOrData;
    const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

    // Check catalog entry
    const entry = pdfDoc.catalog.get(PDFName.of('DocFingerprint'));
    if (entry && typeof entry.toString === 'function') {
      const str = entry.toString();
      const idMatch = str.match(/ID:([^;]+)/);
      const rcptMatch = str.match(/RCPT:([^;]+)/);
      const tsMatch = str.match(/TS:([^;)]+)/);
      if (idMatch) {
        return {
          found: true,
          fingerprintId: idMatch[1],
          recipient: rcptMatch ? rcptMatch[1] : undefined,
          timestamp: tsMatch ? tsMatch[1] : undefined,
        };
      }
    }
  } catch {
    // Non-fatal
  }
  return { found: false };
}
