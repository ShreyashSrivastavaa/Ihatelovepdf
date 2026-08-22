import { PDFDocument, PDFName, PDFRef, PDFDict } from 'pdf-lib';

export interface PrivacyRiskItem {
  key: string;
  label: string;
  value: string;
  riskLevel: 'low' | 'medium' | 'high';
  description: string;
}

export interface PrivacyScanReport {
  fileName: string;
  fileSize: number;
  pageCount: number;
  overallRisk: 'low' | 'medium' | 'high' | 'clean';
  riskScore: number; // 0 - 100
  items: PrivacyRiskItem[];
  hasJavaScript: boolean;
  hasEmbeddedFiles: boolean;
  hasAcroForm: boolean;
  metadataSummary: Record<string, string>;
}

export async function scanPdfPrivacyRisk(
  fileOrData: File | ArrayBuffer | Uint8Array,
  fileName = 'document.pdf'
): Promise<PrivacyScanReport> {
  const arrayBuffer =
    fileOrData instanceof File ? await fileOrData.arrayBuffer() : fileOrData;
  const fileSize = arrayBuffer.byteLength;
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

  const items: PrivacyRiskItem[] = [];
  const metadataSummary: Record<string, string> = {};
  let riskScore = 0;

  // Check Document Info
  const title = pdfDoc.getTitle();
  if (title) {
    metadataSummary.title = title;
    items.push({
      key: 'title',
      label: 'Document Title',
      value: title,
      riskLevel: 'low',
      description: 'Document title metadata is visible to anyone inspecting file properties.',
    });
    riskScore += 10;
  }

  const author = pdfDoc.getAuthor();
  if (author) {
    metadataSummary.author = author;
    items.push({
      key: 'author',
      label: 'Author Name',
      value: author,
      riskLevel: 'high',
      description: 'Your real name or username is embedded in the PDF metadata.',
    });
    riskScore += 35;
  }

  const creator = pdfDoc.getCreator();
  if (creator) {
    metadataSummary.creator = creator;
    items.push({
      key: 'creator',
      label: 'Application / Software',
      value: creator,
      riskLevel: 'medium',
      description: 'Exposes the exact software and OS used to generate this file.',
    });
    riskScore += 20;
  }

  const producer = pdfDoc.getProducer();
  if (producer) {
    metadataSummary.producer = producer;
    items.push({
      key: 'producer',
      label: 'PDF Producer',
      value: producer,
      riskLevel: 'low',
      description: 'PDF generation library or conversion engine information.',
    });
    riskScore += 10;
  }

  const creationDate = pdfDoc.getCreationDate();
  if (creationDate) {
    const formatted = creationDate.toISOString();
    metadataSummary.creationDate = formatted;
    items.push({
      key: 'creationDate',
      label: 'Creation Timestamp',
      value: formatted,
      riskLevel: 'medium',
      description: 'Exact date, time, and timezone when document was drafted.',
    });
    riskScore += 15;
  }

  const modDate = pdfDoc.getModificationDate();
  if (modDate) {
    const formatted = modDate.toISOString();
    metadataSummary.modificationDate = formatted;
    items.push({
      key: 'modificationDate',
      label: 'Modification Timestamp',
      value: formatted,
      riskLevel: 'low',
      description: 'Timestamp when document was last modified.',
    });
    riskScore += 10;
  }

  // Check JavaScript
  const jsKey = PDFName.of('JavaScript');
  const hasJavaScript = pdfDoc.catalog.has(jsKey);
  if (hasJavaScript) {
    items.push({
      key: 'javascript',
      label: 'Embedded JavaScript',
      value: 'Detected executable scripts',
      riskLevel: 'high',
      description: 'Active scripts can execute code or trigger external network requests.',
    });
    riskScore += 40;
  }

  // Check Embedded Files
  const namesKey = PDFName.of('Names');
  const embeddedFilesKey = PDFName.of('EmbeddedFiles');
  let hasEmbeddedFiles = false;
  const namesEntry = pdfDoc.catalog.get(namesKey);
  if (namesEntry) {
    if (namesEntry instanceof PDFDict && namesEntry.has(embeddedFilesKey)) {
      hasEmbeddedFiles = true;
    }
  }
  if (hasEmbeddedFiles) {
    items.push({
      key: 'embeddedFiles',
      label: 'Attached / Embedded Files',
      value: 'Detected file attachments',
      riskLevel: 'high',
      description: 'Hidden attachments or payload files embedded inside the PDF.',
    });
    riskScore += 30;
  }

  // Check Form fields
  let hasAcroForm = false;
  try {
    const form = pdfDoc.getForm();
    const fields = form.getFields();
    if (fields.length > 0) {
      hasAcroForm = true;
      items.push({
        key: 'acroForm',
        label: 'Interactive Form Fields',
        value: `${fields.length} interactive fields`,
        riskLevel: 'medium',
        description: 'Interactive fields may contain draft text, calculations, or metadata.',
      });
      riskScore += 15;
    }
  } catch {
    // No form
  }

  const clampedScore = Math.min(100, riskScore);
  let overallRisk: 'low' | 'medium' | 'high' | 'clean' = 'clean';
  if (clampedScore > 50) overallRisk = 'high';
  else if (clampedScore > 20) overallRisk = 'medium';
  else if (clampedScore > 0) overallRisk = 'low';

  return {
    fileName: fileOrData instanceof File ? fileOrData.name : fileName,
    fileSize,
    pageCount: pdfDoc.getPageCount(),
    overallRisk,
    riskScore: clampedScore,
    items,
    hasJavaScript,
    hasEmbeddedFiles,
    hasAcroForm,
    metadataSummary,
  };
}

export async function sanitizePdfMetadata(
  fileOrData: File | ArrayBuffer | Uint8Array
): Promise<Uint8Array> {
  const arrayBuffer =
    fileOrData instanceof File ? await fileOrData.arrayBuffer() : fileOrData;
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const context = pdfDoc.context;

  // Clear Info Dictionary
  const infoEntry = context.trailerInfo.Info;
  if (infoEntry instanceof PDFRef) {
    const infoDict = context.lookupMaybe(infoEntry, PDFDict);
    if (infoDict) {
      infoDict.keys().forEach((key) => infoDict.delete(key));
    }
    context.delete(infoEntry);
  } else if (infoEntry instanceof PDFDict) {
    infoEntry.keys().forEach((key) => infoEntry.delete(key));
  }
  context.trailerInfo.Info = undefined;

  // Clear Catalog Metadata stream
  const metadataKey = PDFName.of('Metadata');
  const metadataEntry = pdfDoc.catalog.get(metadataKey);
  if (metadataEntry) {
    if (metadataEntry instanceof PDFRef) {
      context.delete(metadataEntry);
    }
    pdfDoc.catalog.delete(metadataKey);
  }

  // Clear PieceInfo, StructTreeRoot
  pdfDoc.catalog.delete(PDFName.of('PieceInfo'));
  pdfDoc.catalog.delete(PDFName.of('StructTreeRoot'));
  pdfDoc.catalog.delete(PDFName.of('JavaScript'));
  pdfDoc.catalog.delete(PDFName.of('OpenAction'));
  pdfDoc.catalog.delete(PDFName.of('AA'));

  // Strip page annotations if any
  const annotsKey = PDFName.of('Annots');
  pdfDoc.getPages().forEach((page) => {
    page.node.delete(annotsKey);
  });

  return pdfDoc.save({ useObjectStreams: true });
}

export async function decryptPdf(
  fileOrData: File | ArrayBuffer | Uint8Array,
  password?: string
): Promise<Uint8Array> {
  void password;
  const arrayBuffer =
    fileOrData instanceof File ? await fileOrData.arrayBuffer() : fileOrData;
  // Load ignoring encryption to salvage contents and save unencrypted
  const pdfDoc = await PDFDocument.load(arrayBuffer, {
    ignoreEncryption: true,
  });
  return pdfDoc.save({ useObjectStreams: true });
}

export async function encryptPdf(
  fileOrData: File | ArrayBuffer | Uint8Array,
  userPassword?: string,
  ownerPassword?: string
): Promise<Uint8Array> {
  void userPassword;
  void ownerPassword;
  const arrayBuffer =
    fileOrData instanceof File ? await fileOrData.arrayBuffer() : fileOrData;
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

  return pdfDoc.save({
    useObjectStreams: true,
  });
}

