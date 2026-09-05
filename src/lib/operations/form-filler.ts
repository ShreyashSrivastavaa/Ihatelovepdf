import {
  PDFDocument,
  PDFTextField,
  PDFCheckBox,
  PDFDropdown,
  PDFRadioGroup,
  PDFOptionList,
  PDFButton,
  StandardFonts,
  PDFFont,
  rgb,
} from 'pdf-lib';

export interface PdfFormFieldMeta {
  name: string;
  type: 'text' | 'checkbox' | 'dropdown' | 'radio' | 'button' | 'unknown';
  isReadOnly: boolean;
  isRequired: boolean;
  value?: string | boolean;
  options?: string[];
  maxLength?: number;
  isMultiline?: boolean;
}

export interface FreeformTextPlacement {
  id: string;
  pageIndex: number; // 0-indexed page in PDF
  x: number; // Screen X in unscaled PDF points (top-left)
  y: number; // Screen Y in unscaled PDF points (top-left)
  text: string;
  fontSize: number;
  fontFamily: 'Helvetica' | 'Times' | 'Courier';
  color: string;
  bold?: boolean;
  italic?: boolean;
}

export interface FillFormOptions {
  acroValues?: Record<string, string | boolean | number>;
  flatten?: boolean;
  textPlacements?: FreeformTextPlacement[];
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  let clean = hex.replace('#', '');
  if (clean.length === 3) {
    clean = clean
      .split('')
      .map((c) => c + c)
      .join('');
  }
  const num = parseInt(clean, 16);
  if (isNaN(num)) return { r: 0, g: 0, b: 0 };
  return {
    r: ((num >> 16) & 255) / 255,
    g: ((num >> 8) & 255) / 255,
    b: (num & 255) / 255,
  };
}

/**
 * Inspect an uploaded PDF for digital AcroForm fields
 */
export async function inspectPdfForm(
  file: File | ArrayBuffer | Uint8Array
): Promise<PdfFormFieldMeta[]> {
  let fileBytes: Uint8Array;
  if (file instanceof Uint8Array) {
    fileBytes = file;
  } else if (file instanceof ArrayBuffer) {
    fileBytes = new Uint8Array(file);
  } else {
    fileBytes = new Uint8Array(await file.arrayBuffer());
  }

  try {
    const pdfDoc = await PDFDocument.load(fileBytes, { ignoreEncryption: true });
    const form = pdfDoc.getForm();
    const fields = form.getFields();

    const result: PdfFormFieldMeta[] = [];

    for (const field of fields) {
      const name = field.getName();
      let type: PdfFormFieldMeta['type'] = 'unknown';
      let value: string | boolean | undefined;
      let options: string[] | undefined;
      let isMultiline = false;
      let maxLength: number | undefined;

      if (field instanceof PDFTextField) {
        type = 'text';
        try {
          value = field.getText();
        } catch {
          value = '';
        }
        try {
          isMultiline = field.isMultiline();
        } catch {}
        try {
          maxLength = field.getMaxLength();
        } catch {}
      } else if (field instanceof PDFCheckBox) {
        type = 'checkbox';
        try {
          value = field.isChecked();
        } catch {
          value = false;
        }
      } else if (field instanceof PDFDropdown) {
        type = 'dropdown';
        try {
          const selected = field.getSelected();
          value = selected.length > 0 ? selected[0] : '';
        } catch {}
        try {
          options = field.getOptions();
        } catch {}
      } else if (field instanceof PDFRadioGroup) {
        type = 'radio';
        try {
          value = field.getSelected();
        } catch {}
        try {
          options = field.getOptions();
        } catch {}
      } else if (field instanceof PDFOptionList) {
        type = 'dropdown';
        try {
          options = field.getOptions();
        } catch {}
      } else if (field instanceof PDFButton) {
        type = 'button';
      }

      let isReadOnly = false;
      let isRequired = false;
      try {
        isReadOnly = field.isReadOnly();
      } catch {}
      try {
        isRequired = field.isRequired();
      } catch {}

      result.push({
        name,
        type,
        isReadOnly,
        isRequired,
        value,
        options,
        maxLength,
        isMultiline,
      });
    }

    return result;
  } catch (err) {
    console.warn('Could not inspect PDF form fields:', err);
    return [];
  }
}

/**
 * Fills digital AcroForm fields and/or embeds freeform text blocks onto a PDF
 */
export async function fillPdfForm(
  file: File | ArrayBuffer | Uint8Array,
  options: FillFormOptions
): Promise<Uint8Array> {
  let fileBytes: Uint8Array;
  if (file instanceof Uint8Array) {
    fileBytes = file;
  } else if (file instanceof ArrayBuffer) {
    fileBytes = new Uint8Array(file);
  } else {
    fileBytes = new Uint8Array(await file.arrayBuffer());
  }

  const pdfDoc = await PDFDocument.load(fileBytes, { ignoreEncryption: true });

  // 1. Fill AcroForm fields
  if (options.acroValues && Object.keys(options.acroValues).length > 0) {
    try {
      const form = pdfDoc.getForm();
      const fields = form.getFields();

      for (const field of fields) {
        const name = field.getName();
        const val = options.acroValues[name];
        if (val === undefined || val === null) continue;

        try {
          if (field instanceof PDFTextField) {
            field.setText(String(val));
          } else if (field instanceof PDFCheckBox) {
            const isChecked = val === true || val === 'true' || val === 'on' || val === 1;
            if (isChecked) {
              field.check();
            } else {
              field.uncheck();
            }
          } else if (field instanceof PDFDropdown) {
            field.select(String(val));
          } else if (field instanceof PDFRadioGroup) {
            field.select(String(val));
          }
        } catch (fieldErr) {
          console.warn(`Could not set form value for "${name}":`, fieldErr);
        }
      }

      if (options.flatten) {
        try {
          form.flatten();
        } catch (flattenErr) {
          console.warn('Could not flatten PDF form:', flattenErr);
        }
      }
    } catch (formErr) {
      console.warn('Could not access AcroForm in document:', formErr);
    }
  }

  // 2. Embed Freeform Click-to-Type Text Placements
  if (options.textPlacements && options.textPlacements.length > 0) {
    const pageCount = pdfDoc.getPageCount();

    // Standard Font Embeddings Cache
    const fontCache: Record<string, PDFFont> = {};
    const getFont = async (
      family: 'Helvetica' | 'Times' | 'Courier',
      bold?: boolean,
      italic?: boolean
    ) => {
      const key = `${family}_${bold ? 'B' : ''}${italic ? 'I' : ''}`;
      if (fontCache[key]) return fontCache[key];

      let standardFont = StandardFonts.Helvetica;
      if (family === 'Times') {
        if (bold && italic) standardFont = StandardFonts.TimesRomanBoldItalic;
        else if (bold) standardFont = StandardFonts.TimesRomanBold;
        else if (italic) standardFont = StandardFonts.TimesRomanItalic;
        else standardFont = StandardFonts.TimesRoman;
      } else if (family === 'Courier') {
        if (bold && italic) standardFont = StandardFonts.CourierBoldOblique;
        else if (bold) standardFont = StandardFonts.CourierBold;
        else if (italic) standardFont = StandardFonts.CourierOblique;
        else standardFont = StandardFonts.Courier;
      } else {
        if (bold && italic) standardFont = StandardFonts.HelveticaBoldOblique;
        else if (bold) standardFont = StandardFonts.HelveticaBold;
        else if (italic) standardFont = StandardFonts.HelveticaOblique;
        else standardFont = StandardFonts.Helvetica;
      }

      const font = await pdfDoc.embedFont(standardFont);
      fontCache[key] = font;
      return font;
    };

    for (const placement of options.textPlacements) {
      if (placement.pageIndex < 0 || placement.pageIndex >= pageCount) continue;
      if (!placement.text || placement.text.trim().length === 0) continue;

      const page = pdfDoc.getPage(placement.pageIndex);
      const { height: pageHeight } = page.getSize();

      const font = await getFont(
        placement.fontFamily || 'Helvetica',
        placement.bold,
        placement.italic
      );
      const colorRgb = hexToRgb(placement.color || '#000000');
      const fontSize = Math.max(6, placement.fontSize || 12);
      const lines = placement.text.split('\n');
      const lineHeight = fontSize * 1.25;

      for (let lIdx = 0; lIdx < lines.length; lIdx++) {
        const line = lines[lIdx];
        if (!line) continue;

        const pdfX = placement.x;
        // PDF origin is bottom-left
        const pdfY = pageHeight - (placement.y + (lIdx + 1) * lineHeight);

        page.drawText(line, {
          x: pdfX,
          y: pdfY,
          size: fontSize,
          font,
          color: rgb(colorRgb.r, colorRgb.g, colorRgb.b),
        });
      }
    }
  }

  return pdfDoc.save({ useObjectStreams: true });
}
