import { PDFDocument, PDFName, PDFRef, PDFDict } from 'pdf-lib';

export interface FlattenOptions {
  flattenForms?: boolean;
  flattenAnnotations?: boolean;
  removeScripts?: boolean;
}

export async function flattenPdf(
  fileOrData: File | ArrayBuffer | Uint8Array,
  options: FlattenOptions = {}
): Promise<Uint8Array> {
  const arrayBuffer =
    fileOrData instanceof File ? await fileOrData.arrayBuffer() : fileOrData;
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

  const flattenForms = options.flattenForms !== false;
  const flattenAnnotations = options.flattenAnnotations !== false;
  const removeScripts = options.removeScripts !== false;

  if (flattenForms) {
    try {
      const form = pdfDoc.getForm();
      form.flatten();
    } catch {
      // Form might not exist or already be flat
    }
  }

  const context = pdfDoc.context;

  if (flattenAnnotations) {
    const annotsKey = PDFName.of('Annots');
    pdfDoc.getPages().forEach((page) => {
      page.node.delete(annotsKey);
    });
  }

  if (removeScripts) {
    const jsKey = PDFName.of('JavaScript');
    const openActionKey = PDFName.of('OpenAction');
    const aaKey = PDFName.of('AA');
    const namesKey = PDFName.of('Names');

    pdfDoc.catalog.delete(jsKey);
    pdfDoc.catalog.delete(openActionKey);
    pdfDoc.catalog.delete(aaKey);

    const namesEntry = pdfDoc.catalog.get(namesKey);
    if (namesEntry) {
      if (namesEntry instanceof PDFRef) {
        const namesDict = context.lookupMaybe(namesEntry, PDFDict);
        if (namesDict) {
          namesDict.delete(jsKey);
        }
      } else if (namesEntry instanceof PDFDict) {
        namesEntry.delete(jsKey);
      }
    }
  }

  return pdfDoc.save({ useObjectStreams: true });
}
