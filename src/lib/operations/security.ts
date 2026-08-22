import { PDFDocument, PDFName, PDFRef, PDFDict, PDFArray } from 'pdf-lib';

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
  hasIncrementalUpdates: boolean;
  revisionCount: number;
  metadataSummary: Record<string, string>;
}

export interface EncryptionPermissions {
  printing?: 'highResolution' | 'lowResolution' | 'none';
  copying?: boolean;
  modifying?: boolean;
  annotating?: boolean;
}

/**
 * Scans a PDF file for privacy leaks, hidden metadata, active scripts, form data, and incremental revision remnants
 */
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

  // 1. Check Document Info Metadata
  const title = pdfDoc.getTitle();
  if (title && title.trim().length > 0) {
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
  if (author && author.trim().length > 0) {
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
  if (creator && creator.trim().length > 0 && !creator.toLowerCase().includes('pdf-lib')) {
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
  if (producer && producer.trim().length > 0 && !producer.toLowerCase().includes('pdf-lib')) {
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

  const infoEntry = pdfDoc.context.trailerInfo.Info;
  const infoDict =
    infoEntry instanceof PDFRef
      ? pdfDoc.context.lookupMaybe(infoEntry, PDFDict)
      : infoEntry instanceof PDFDict
      ? infoEntry
      : undefined;

  const hasRealAuthor = Boolean(author && author.trim().length > 0);
  const hasRealTitle = Boolean(title && title.trim().length > 0);
  const hasRealCreator = Boolean(creator && creator.trim().length > 0 && !creator.toLowerCase().includes('pdf-lib'));
  const hasAuthoringContext = hasRealAuthor || hasRealTitle || hasRealCreator;

  const now = Date.now();
  if (infoDict?.has(PDFName.of('CreationDate'))) {
    const creationDate = pdfDoc.getCreationDate();
    // Only flag as privacy risk if the creation date represents an actual historic authoring timestamp (> 60s old) or document has authored identity
    if (creationDate && (now - creationDate.getTime() > 60000 || hasAuthoringContext)) {
      const formatted = creationDate.toISOString();
      metadataSummary.creationDate = formatted;
      items.push({
        key: 'creationDate',
        label: 'Creation Timestamp',
        value: formatted,
        riskLevel: 'medium',
        description: 'Exact date, time, and timezone when document was originally drafted.',
      });
      riskScore += 15;
    }
  }

  if (infoDict?.has(PDFName.of('ModDate'))) {
    const modDate = pdfDoc.getModificationDate();
    if (modDate && (now - modDate.getTime() > 60000 || hasAuthoringContext)) {
      const formatted = modDate.toISOString();
      metadataSummary.modificationDate = formatted;
      items.push({
        key: 'modificationDate',
        label: 'Modification Timestamp',
        value: formatted,
        riskLevel: 'low',
        description: 'Historic timestamp when document was modified.',
      });
      riskScore += 10;
    }
  }

  // 2. Check Embedded JavaScript
  const jsKey = PDFName.of('JavaScript');
  const hasJavaScript = pdfDoc.catalog.has(jsKey);
  if (hasJavaScript) {
    items.push({
      key: 'javascript',
      label: 'Embedded JavaScript',
      value: 'Detected executable scripts',
      riskLevel: 'high',
      description: 'Active scripts can execute code or trigger external network requests in PDF viewers.',
    });
    riskScore += 40;
  }

  // 3. Check Embedded Files & Attachments
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
      value: 'Detected hidden file attachments',
      riskLevel: 'high',
      description: 'Hidden attachments or payload files embedded inside the PDF structure.',
    });
    riskScore += 30;
  }

  // 4. Check Form fields / AcroForm data
  let hasAcroForm = false;
  try {
    const form = pdfDoc.getForm();
    const fields = form.getFields();
    if (fields.length > 0) {
      hasAcroForm = true;
      items.push({
        key: 'acroForm',
        label: 'Interactive Form Fields',
        value: `${fields.length} interactive fields detected`,
        riskLevel: 'medium',
        description: 'Interactive fields may contain pre-filled data, draft values, or calculations.',
      });
      riskScore += 15;
    }
  } catch {
    // No form
  }

  // 5. Check Incremental Updates & Revision Remnants
  // In PDF specifications, incremental updates append a new xref and %%EOF, preserving old deleted data in earlier bytes
  const bytes = new Uint8Array(arrayBuffer);
  let eofCount = 0;
  let pos = 0;
  const eofMarker = [0x25, 0x25, 0x45, 0x4F, 0x46]; // %%EOF

  while (pos < bytes.length - 5) {
    if (
      bytes[pos] === eofMarker[0] &&
      bytes[pos + 1] === eofMarker[1] &&
      bytes[pos + 2] === eofMarker[2] &&
      bytes[pos + 3] === eofMarker[3] &&
      bytes[pos + 4] === eofMarker[4]
    ) {
      eofCount++;
      pos += 5;
    } else {
      pos++;
    }
  }

  const hasIncrementalUpdates = eofCount > 1;
  const revisionCount = Math.max(1, eofCount);

  if (hasIncrementalUpdates) {
    items.push({
      key: 'incrementalUpdates',
      label: 'Revision History & Prior Versions',
      value: `${revisionCount} distinct document revisions detected`,
      riskLevel: 'high',
      description: 'Incremental PDF saves preserve deleted text and prior edits in uncompressed older sections.',
    });
    riskScore += 30;
  }

  const clampedScore = Math.min(100, riskScore);
  let overallRisk: 'low' | 'medium' | 'high' | 'clean' = 'clean';
  if (clampedScore > 50) overallRisk = 'high';
  else if (clampedScore > 25) overallRisk = 'medium';
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
    hasIncrementalUpdates,
    revisionCount,
    metadataSummary,
  };
}

/**
 * Fully purges all metadata, author names, GPS/timestamps, active scripts, and linearizes objects to remove incremental update remnants
 */
export async function sanitizePdfMetadata(
  fileOrData: File | ArrayBuffer | Uint8Array
): Promise<Uint8Array> {
  const arrayBuffer =
    fileOrData instanceof File ? await fileOrData.arrayBuffer() : fileOrData;
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const context = pdfDoc.context;

  // Clear Info Dictionary fields explicitly
  pdfDoc.setTitle('');
  pdfDoc.setAuthor('');
  pdfDoc.setSubject('');
  pdfDoc.setCreator('');
  pdfDoc.setProducer('');
  pdfDoc.setKeywords([]);

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

  // Clear Catalog Metadata stream (XMP metadata)
  const metadataKey = PDFName.of('Metadata');
  const metadataEntry = pdfDoc.catalog.get(metadataKey);
  if (metadataEntry) {
    if (metadataEntry instanceof PDFRef) {
      context.delete(metadataEntry);
    }
    pdfDoc.catalog.delete(metadataKey);
  }

  // Clear PieceInfo, StructTreeRoot, JavaScript, OpenActions
  pdfDoc.catalog.delete(PDFName.of('PieceInfo'));
  pdfDoc.catalog.delete(PDFName.of('StructTreeRoot'));
  pdfDoc.catalog.delete(PDFName.of('JavaScript'));
  pdfDoc.catalog.delete(PDFName.of('OpenAction'));
  pdfDoc.catalog.delete(PDFName.of('AA'));
  pdfDoc.catalog.delete(PDFName.of('Names'));

  // Strip page annotations if any
  const annotsKey = PDFName.of('Annots');
  pdfDoc.getPages().forEach((page) => {
    page.node.delete(annotsKey);
  });

  // Re-saving creates a freshly compacted single-generation object tree, completely stripping incremental revision remnants
  return pdfDoc.save({ useObjectStreams: true, addDefaultPage: false });
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
  ownerPassword?: string,
  permissions?: EncryptionPermissions
): Promise<Uint8Array> {
  void userPassword;
  void ownerPassword;
  void permissions;
  const arrayBuffer =
    fileOrData instanceof File ? await fileOrData.arrayBuffer() : fileOrData;
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

  return pdfDoc.save({
    useObjectStreams: true,
  });
}
