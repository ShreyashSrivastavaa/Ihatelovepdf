# Developer Guide: Adding a New PDF Tool

This tutorial provides a complete walkthrough for adding a new PDF tool to **ihatelovepdf**.

---

## 🎯 Architecture Checklist for a New Tool

Every PDF tool requires touchpoints in:
1. **Type Definitions**: Register the tool identifier.
2. **Core Operation Logic**: Write the `pdf-lib` manipulation algorithm.
3. **Worker Integration**: Hook the operation into `pdf.worker.ts`.
4. **Registry & Categorization**: Register metadata, description, and icons.
5. **UI Options Panel**: Add interactive user options in `ProcessingOptions.tsx`.
6. **Routing & Translations**: Add route slugs and dictionary keys.
7. **Automated Audits**: Add verification cases.

---

## Step 1: Register the Operation Key

Open [`src/types/operations.ts`](../src/types/operations.ts) and append your tool key to `OperationKey`:

```typescript
export type OperationKey =
  | "merge"
  | "compress"
  // ... existing tools
  | "grayscalePdf"; // <- Your new tool key
```

---

## Step 2: Implement the Engine Function

Create a new file in [`src/lib/operations/`](../src/lib/operations/) (or append to an existing category file):

```typescript
// src/lib/operations/grayscale.ts
import { PDFDocument, PDFName, PDFRawStream } from 'pdf-lib';

export interface GrayscaleOptions {
  preserveTransparency?: boolean;
}

export async function convertPdfToGrayscale(
  file: File,
  options: GrayscaleOptions = {}
): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);

  // Implement document transformation using pdf-lib primitives...
  const pages = pdfDoc.getPages();
  for (const page of pages) {
    // Modify page properties or content streams
  }

  return pdfDoc.save();
}
```

Re-export your new function from [`src/lib/pdf-operations.ts`](../src/lib/pdf-operations.ts):
```typescript
export * from './operations/grayscale';
```

---

## Step 3: Connect to the Web Worker

In [`src/workers/pdf.worker.ts`](../src/workers/pdf.worker.ts):
1. Import your function:
   ```typescript
   import { convertPdfToGrayscale } from '../lib/pdf-operations';
   ```
2. Add a `case` in the worker switch:
   ```typescript
   case 'grayscalePdf':
     result = await convertPdfToGrayscale(files[0], options.grayscale || {});
     break;
   ```

In [`src/lib/pdf-processor.ts`](../src/lib/pdf-processor.ts):
Add the case dispatcher with worker offloading and fallback:
```typescript
case 'grayscalePdf': {
  try {
    const bytes = (await pdfWorkerClient.run('grayscalePdf', [primaryFile], options, undefined, onProgress)) as Uint8Array;
    return createPdfBlob(bytes);
  } catch (err) {
    console.warn('Worker grayscale failed, falling back to main thread', err);
    const bytes = await PDFOps.convertPdfToGrayscale(primaryFile, options.grayscale || {});
    return createPdfBlob(bytes);
  }
}
```

---

## Step 4: Add Metadata to the Tools Registry

Open [`src/lib/tools-registry.ts`](../src/lib/tools-registry.ts):
1. Add your tool key to one of the categories in `TOOL_CATEGORIES`:
   ```typescript
   {
     id: 'extract-view',
     name: 'Extract & View',
     // ...
     toolKeys: ['extractText', 'invertColors', 'grayscalePdf'],
   }
   ```
2. Add the display name in `TOOL_NAMES`:
   ```typescript
   export const TOOL_NAMES: Record<OperationKey, string> = {
     // ...
     grayscalePdf: 'Grayscale PDF',
   };
   ```
3. Map an icon in [`src/components/ToolSwitcher.tsx`](../src/components/ToolSwitcher.tsx) under `ICON_MAP`.

---

## Step 5: Add UI Configuration Controls

In [`src/components/pdf-processor/ProcessingOptions.tsx`](../src/components/pdf-processor/ProcessingOptions.tsx):
Add controls for any options your tool provides:
```tsx
{mode === 'grayscalePdf' && (
  <div className="space-y-4">
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={options.grayscale?.preserveTransparency ?? true}
        onChange={(e) =>
          onOptionsChange({
            ...options,
            grayscale: { ...options.grayscale, preserveTransparency: e.target.checked },
          })
        }
      />
      <span>Preserve transparent backgrounds</span>
    </label>
  </div>
)}
```

---

## Step 6: Add Route Map and Localized Dictionaries

1. In [`content/i18n-route-map.json`](../content/i18n-route-map.json), add localized URL slugs:
   ```json
   "grayscalePdf": {
     "en": "/grayscale-pdf",
     "es": "/es/pdf-escala-de-grises",
     "pt": "/pt/pdf-escala-de-cinza",
     "de": "/de/pdf-graustufen",
     "it": "/it/pdf-scala-di-grigi",
     "fr": "/fr/pdf-niveaux-de-gris",
     "ro": "/ro/pdf-alb-negru",
     "ru": "/ru/pdf-ottenki-serogo",
     "hu": "/hu/pdf-szurkearnyalat"
   }
   ```
2. Add metadata titles, descriptions, and feature bullet points to each dictionary in [`content/dictionaries/`](../content/dictionaries/).

---

## Step 7: Verify Everything Passes!

Run the full verification suite:
```bash
# Verify route mapping and dictionary parity
npx tsx scripts/verify-locales.ts

# Run the 35+ tool automated audit
npm test

# Test building production static artifacts
npm run build
```
