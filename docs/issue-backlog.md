# GitHub Issue Backlog & Community Triage Guide

This document contains ready-to-use GitHub issue templates, a standardized label taxonomy, and a project board structure for **ihatelovepdf.com** (`https://github.com/ShreyashSrivastavaa/Ihatelovepdf`).

Maintainers can copy-paste these directly into GitHub or bulk-create them using the GitHub CLI (`gh issue create`).

---

## 1. Recommended GitHub Label Taxonomy

| Label | Color | Description |
| :--- | :--- | :--- |
| `good first issue` | `#7057ff` | Ideal for first-time open-source contributors (small scope, well-defined solution) |
| `help wanted` | `#008672` | Community help is actively sought on this issue |
| `type: bug` | `#d73a4a` | Something isn't working as intended |
| `type: feature` | `#a2eeef` | New tool or major capability proposal |
| `type: enhancement` | `#a2eeef` | Improvement or polish to an existing tool or flow |
| `type: performance` | `#e99695` | Optimizations for runtime execution, memory footprint, or bundle size |
| `type: a11y` | `#0075ca` | Accessibility, keyboard navigation, contrast, and assistive tech support |
| `type: i18n` | `#d4c5f9` | Translations, locale routing, or internationalization improvements |
| `type: testing` | `#bfdadc` | Unit, integration, or visual regression tests |
| `type: refactor` | `#cfd3d7` | Code quality, component modularity, or architecture improvements |
| `type: docs` | `#0075ca` | Documentation, guides, or tutorials |
| `tool: core-pdf` | `#fbca04` | PDF manipulation engine (`pdf-lib`, `pdfjs-dist`) |
| `tool: business` | `#d93f0b` | Billing, invoice generator, and report tools |
| `tool: conversion` | `#e11d48` | Document and image conversion pipelines |
| `difficulty: starter` | `#c2e0c6` | Estimated time: 1-3 hours (well isolated) |
| `difficulty: intermediate` | `#fef2c0` | Estimated time: 3-8 hours (touches multiple components) |
| `difficulty: advanced` | `#f9d0c4` | Complex algorithms, worker threading, or deep memory management |

---

## 2. Recommended GitHub Project Board Structure

### Board Setup: Automated Kanban
- **Board Name**: `ihatelovepdf Community Roadmap`
- **Views**:
  1. **Kanban by Status** (Columns: `Triage`, `Ready for Dev / Up for Grabs`, `In Progress`, `In Review`, `Done`)
  2. **Good First Issues** (Filter: `label:"good first issue" is:open`)
  3. **Performance & Architecture** (Filter: `label:"type: performance", "type: refactor"`)
  4. **New Tools Pipeline** (Filter: `label:"type: feature"`)

### Column Automation Rules
- **Triage**: Default column for newly opened issues and PRs without labels.
- **Ready for Dev / Up for Grabs**: Issues with fully defined acceptance criteria and assigned `good first issue` or `help wanted` tags.
- **In Progress**: Moved when an issue is assigned to a contributor or referenced in a draft PR.
- **In Review**: Moved when a linked PR is opened and marked ready for review.
- **Done**: Moved automatically when PR is merged into `main`.

---

## 3. Curated Issue Backlog (18 Ready-to-Copy Issues)

### Table of Contents
- **Good First Issues (Starter)**
  - [Issue #1: Add PDF Metadata Viewer & Editor Tool](#issue-1-add-pdf-metadata-viewer--editor-tool)
  - [Issue #2: Add Grayscale / Black-and-White PDF Filter Tool](#issue-2-add-grayscale--black-and-white-pdf-filter-tool)
  - [Issue #3: Add Bates Numbering Tool for Legal Documents](#issue-3-add-bates-numbering-tool-for-legal-documents)
  - [Issue #4: Unit Test Suite for `download-helper.ts`](#issue-4-unit-test-suite-for-download-helperts)
  - [Issue #5: Implement Keyboard Focus Trap in `ContactModal`](#issue-5-implement-keyboard-focus-trap-in-contactmodal)
  - [Issue #6: Add Export to Plain Text & Markdown from PDF](#issue-6-add-export-to-plain-text--markdown-from-pdf)
  - [Issue #7: Complete Missing Spanish and German FAQ Translations](#issue-7-complete-missing-spanish-and-german-faq-translations)
- **Intermediate Issues**
  - [Issue #8: Offload PDF Inversion and Color Manipulation to Web Worker](#issue-8-offload-pdf-inversion-and-color-manipulation-to-web-worker)
  - [Issue #9: Decompose Monolithic `ProcessingOptions.tsx` into Per-Tool Panels](#issue-9-decompose-monolithic-processingoptionstsx-into-per-tool-panels)
  - [Issue #10: Implement Progressive Web App (PWA) Offline Manifest & Service Worker](#issue-10-implement-progressive-web-app-pwa-offline-manifest--service-worker)
  - [Issue #11: Add Extract Embedded Images Tool (`pdfToImages`)](#issue-11-add-extract-embedded-images-tool-pdftoimages)
  - [Issue #12: Add PDF Page Size Normalizer Tool (e.g. Standardize to A4 or Letter)](#issue-12-add-pdf-page-size-normalizer-tool-eg-standardize-to-a4-or-letter)
  - [Issue #13: Implement End-to-End Playwright Workflow Tests for Merge & Compress](#issue-13-implement-end-to-end-playwright-workflow-tests-for-merge--compress)
  - [Issue #14: Add Dark Mode Persistent Toggle with Zero Flash of Unstyled Content (FOUC)](#issue-14-add-dark-mode-persistent-toggle-with-zero-flash-of-unstyled-content-fouc)
- **Advanced Issues**
  - [Issue #15: Memory-Safe Chunked Processing for Large (>150MB) PDFs](#issue-15-memory-safe-chunked-processing-for-large-150mb-pdfs)
  - [Issue #16: Client-Side OCR Engine via Dynamic WebAssembly Plugin](#issue-16-client-side-ocr-engine-via-dynamic-webassembly-plugin)
  - [Issue #17: Advanced Interactive Redaction Canvas with Multi-Box Selector](#issue-17-advanced-interactive-redaction-canvas-with-multi-box-selector)
  - [Issue #18: Dynamic Route Code Splitting for PDF.js Standard Fonts (~2.8MB)](#issue-18-dynamic-route-code-splitting-for-pdfjs-standard-fonts-28mb)

---

### Issue #1: Add PDF Metadata Viewer & Editor Tool
- **Title**: `feat(tool): add client-side PDF metadata viewer and editor`
- **Labels**: `good first issue`, `type: feature`, `tool: core-pdf`, `difficulty: starter`
- **Difficulty**: Starter (Good First Issue)
- **Description**:
  Users frequently need to view or clean document metadata (Title, Author, Subject, Creator, Producer, CreationDate, Keywords) for privacy before submitting applications or resumes. We should introduce an `editMetadata` tool that displays current metadata fields in an editable form and downloads the updated PDF without re-compressing the document structure.
- **Proposed Solution**:
  1. Add `editMetadata` to `PdfOperation` in `src/types/operations.ts`.
  2. Register metadata config in `src/lib/tools-registry.ts` under the "Edit & Annotate" or "Security & Privacy" category.
  3. In `src/lib/pdf-processor.ts`, read `pdfDoc.getTitle()`, `pdfDoc.getAuthor()`, etc.
  4. Allow users to update values using `pdfDoc.setTitle()`, `pdfDoc.setAuthor()`, `pdfDoc.setProducer()`, etc.
  5. Save with `pdfDoc.save()`.
- **Acceptance Criteria**:
  - [ ] `editMetadata` operation registered and accessible at `/edit-metadata` and localized routes.
  - [ ] Displays existing metadata fields upon uploading a PDF.
  - [ ] Provides inputs to modify Title, Author, Subject, Keywords, Creator.
  - [ ] Includes a "Clear All Metadata" one-click button.
  - [ ] All processing happens 100% in-browser via `pdf-lib`.
  - [ ] Unit test added to `tests/tool-verification.test.ts`.
- **Relevant Files**:
  - `src/types/operations.ts`
  - `src/lib/tools-registry.ts`
  - `src/lib/pdf-processor.ts`
  - `src/components/pdf-processor/ProcessingOptions.tsx`

---

### Issue #2: Add Grayscale / Black-and-White PDF Filter Tool
- **Title**: `feat(tool): add grayscale / black-and-white conversion for PDF pages`
- **Labels**: `good first issue`, `type: feature`, `tool: core-pdf`, `difficulty: starter`
- **Difficulty**: Starter (Good First Issue)
- **Description**:
  Many official portals and printers require documents in grayscale to reduce file size and printing ink. We can add a `grayscale` tool that renders PDF pages onto an HTML5 canvas, applies a luminance grayscale filter (`0.299*R + 0.587*G + 0.114*B`), and compiles them back into a clean PDF.
- **Proposed Solution**:
  1. Register `grayscale` operation in `src/types/operations.ts` and `src/lib/tools-registry.ts`.
  2. Use `pdfjs-dist` to render pages to canvas.
  3. Apply `ctx.filter = 'grayscale(100%)'` or manipulate canvas image data.
  4. Embed JPEG/PNG stream into a new `PDFDocument` via `pdf-lib`.
- **Acceptance Criteria**:
  - [ ] Tool registered with route `/grayscale`.
  - [ ] Converts color PDFs into clear black-and-white / grayscale documents.
  - [ ] Supports customizable DPI/Quality slider (150 DPI, 200 DPI, 300 DPI).
  - [ ] Zero server uploads (100% client-side execution).
  - [ ] Registered in unit test suite.
- **Relevant Files**:
  - `src/types/operations.ts`
  - `src/lib/tools-registry.ts`
  - `src/lib/pdf-processor.ts`

---

### Issue #3: Add Bates Numbering Tool for Legal Documents
- **Title**: `feat(tool): implement Bates numbering tool for legal and compliance PDFs`
- **Labels**: `good first issue`, `type: feature`, `tool: core-pdf`, `difficulty: starter`
- **Difficulty**: Starter (Good First Issue)
- **Description**:
  Legal, medical, and corporate teams require Bates numbering (e.g., `CASE-0001`, `CASE-0002`) across multi-page discovery bundles.
- **Proposed Solution**:
  1. Add `batesNumbering` to `PdfOperation` in `src/types/operations.ts`.
  2. Provide option inputs: Prefix (string), Starting Number (integer), Digit Padding (e.g. 4 -> `0001`), Position (Bottom-Right, Bottom-Left, Top-Right, Top-Left).
  3. In `src/lib/pdf-processor.ts`, loop through pages, draw formatted Bates text using standard Helvetica font.
- **Acceptance Criteria**:
  - [ ] Accessible at `/bates-numbering`.
  - [ ] Customizable prefix, suffix, zero-padding length, and font size.
  - [ ] Live visual placement preview or option controls.
  - [ ] Runs completely in-memory using `pdf-lib`.
  - [ ] Unit test passing in `npm test`.
- **Relevant Files**:
  - `src/types/operations.ts`
  - `src/lib/tools-registry.ts`
  - `src/lib/pdf-processor.ts`
  - `src/components/pdf-processor/ProcessingOptions.tsx`

---

### Issue #4: Unit Test Suite for `download-helper.ts`
- **Title**: `test: add unit test coverage for download-helper and file naming utilities`
- **Labels**: `good first issue`, `type: testing`, `difficulty: starter`
- **Difficulty**: Starter (Good First Issue)
- **Description**:
  `src/lib/download-helper.ts` handles creating download anchors, formatting filenames with timestamps, handling mobile Safari popups, and generating zip archives. Currently, it has minimal test coverage.
- **Proposed Solution**:
  1. Create `tests/download-helper.test.ts`.
  2. Mock `URL.createObjectURL`, `URL.revokeObjectURL`, and HTMLAnchorElement.
  3. Verify sanitization of file extensions (preventing `.pdf.pdf`).
  4. Verify timestamp generation and fallback naming when `originalName` is missing.
- **Acceptance Criteria**:
  - [ ] `tests/download-helper.test.ts` runs under `npm test`.
  - [ ] 100% function coverage on `download-helper.ts`.
  - [ ] Edge cases tested: files with multiple dots (`doc.v1.final.pdf`), empty file names, special characters.
- **Relevant Files**:
  - `src/lib/download-helper.ts`
  - `tests/download-helper.test.ts`

---

### Issue #5: Implement Keyboard Focus Trap in `ContactModal`
- **Title**: `fix(a11y): trap focus within ContactModal and support Escape key dismissal`
- **Labels**: `good first issue`, `type: a11y`, `type: bug`, `difficulty: starter`
- **Difficulty**: Starter (Good First Issue)
- **Description**:
  When `src/components/ContactModal.tsx` is open, tabbing can cycle outside the modal into background page elements, violating WCAG 2.1 AA SC 2.1.2 (No Keyboard Trap) and SC 2.4.3 (Focus Order).
- **Proposed Solution**:
  1. Listen for `keydown` on `Escape` to close the modal.
  2. Implement focus trapping (or leverage a lightweight `useEffect` hook) that cycles `Tab` between the first and last interactive elements within the modal.
  3. Restore focus to the triggering element when the modal closes.
- **Acceptance Criteria**:
  - [ ] Pressing `Escape` closes the modal immediately.
  - [ ] Tabbing wraps within modal elements while open.
  - [ ] Screen readers announce dialog title with `aria-labelledby`.
  - [ ] Previous active element receives focus on close.
- **Relevant Files**:
  - `src/components/ContactModal.tsx`

---

### Issue #6: Add Export to Plain Text & Markdown from PDF
- **Title**: `feat(tool): export PDF contents to clean Markdown with headings and tables`
- **Labels**: `good first issue`, `type: feature`, `tool: conversion`, `difficulty: starter`
- **Difficulty**: Starter (Good First Issue)
- **Description**:
  Our current `extractText` dumps unstructured strings. Many users want to convert documents directly to clean Markdown (`.md`) or formatted `.txt` files with detected paragraphs, bullet points, and headers.
- **Proposed Solution**:
  1. Add `pdfToMarkdown` operation to `src/types/operations.ts`.
  2. Use `pdfjs-dist` text item coordinates (`transform[5]` Y-position and `fontSize`) to deduce headings (`#`, `##`) vs body paragraphs.
  3. Return a `.md` Blob that downloads directly.
- **Acceptance Criteria**:
  - [ ] Accessible at `/pdf-to-markdown`.
  - [ ] Detects larger font sizes as Markdown headers (`#`, `##`).
  - [ ] Outputs formatted text ready for copy or `.md` download.
  - [ ] Fully verified by `npm test`.
- **Relevant Files**:
  - `src/types/operations.ts`
  - `src/lib/tools-registry.ts`
  - `src/lib/pdf-processor.ts`

---

### Issue #7: Complete Missing Spanish and German FAQ Translations
- **Title**: `i18n: complete translated FAQ schema entries for Spanish and German locales`
- **Labels**: `good first issue`, `type: i18n`, `difficulty: starter`
- **Difficulty**: Starter (Good First Issue)
- **Description**:
  Several FAQ entries in `src/dictionaries/es.json` and `src/dictionaries/de.json` contain English fallback strings for privacy guarantees and local browser processing.
- **Proposed Solution**:
  1. Review `src/dictionaries/es.json` and `src/dictionaries/de.json`.
  2. Translate missing questions and answers ensuring technical terminology (client-side, WebAssembly, Web Worker) is natural and accurate.
  3. Verify JSON syntax with `npm test`.
- **Acceptance Criteria**:
  - [ ] No English fallback text on `/es/preguntas-frecuentes` or `/de/haeufige-fragen`.
  - [ ] Passes locale check script during `npm test`.
- **Relevant Files**:
  - `src/dictionaries/es.json`
  - `src/dictionaries/de.json`
  - `src/app/de/haeufige-fragen/page.tsx`
  - `src/app/es/preguntas-frecuentes/page.tsx`

---

### Issue #8: Offload PDF Inversion and Color Manipulation to Web Worker
- **Title**: `perf(worker): offload invertColors canvas processing to Web Worker with OffscreenCanvas`
- **Labels**: `help wanted`, `type: performance`, `tool: core-pdf`, `difficulty: intermediate`
- **Difficulty**: Intermediate
- **Description**:
  `invertColors` currently runs on the main browser thread. For 20+ page PDFs, the UI thread drops frames and becomes unresponsive during canvas pixel manipulation.
- **Proposed Solution**:
  1. Add `invertColors` handler to `src/workers/pdf.worker.ts`.
  2. Use `OffscreenCanvas` inside worker where supported, with fallback to main thread.
  3. Transfer `ArrayBuffer` efficiently via `postMessage`.
- **Acceptance Criteria**:
  - [ ] Main UI thread maintains 60fps during multi-page color inversion.
  - [ ] Progress bar updates accurately per page without stutter.
  - [ ] Works cleanly on browsers without `OffscreenCanvas` via graceful fallback.
- **Relevant Files**:
  - `src/workers/pdf.worker.ts`
  - `src/lib/worker-client.ts`
  - `src/lib/pdf-processor.ts`

---

### Issue #9: Decompose Monolithic `ProcessingOptions.tsx` into Per-Tool Panels
- **Title**: `refactor: break ProcessingOptions.tsx into modular per-category option components`
- **Labels**: `help wanted`, `type: refactor`, `difficulty: intermediate`
- **Difficulty**: Intermediate
- **Description**:
  `src/components/pdf-processor/ProcessingOptions.tsx` has grown to over 1,000 lines, containing option forms for watermark, redaction, compression, page numbering, invoice generation, and margin cropping all in a single file with complex switch statements.
- **Proposed Solution**:
  1. Create a `src/components/pdf-processor/options/` directory.
  2. Extract specialized components:
     - `WatermarkOptions.tsx`
     - `PageNumberOptions.tsx`
     - `RedactionOptions.tsx`
     - `CompressOptions.tsx`
     - `BillingOptions.tsx`
  3. Create a clean dictionary map in `ProcessingOptions.tsx` to render the active option panel.
- **Acceptance Criteria**:
  - [ ] `ProcessingOptions.tsx` reduced to < 200 lines as a thin dispatcher.
  - [ ] Zero behavioral regressions across any of the 35 tools.
  - [ ] Clean type definitions with Props interfaces.
- **Relevant Files**:
  - `src/components/pdf-processor/ProcessingOptions.tsx`
  - `src/components/pdf-processor/options/*`

---

### Issue #10: Implement Progressive Web App (PWA) Offline Manifest & Service Worker
- **Title**: `feat: add offline PWA support with service worker caching`
- **Labels**: `type: feature`, `type: performance`, `difficulty: intermediate`
- **Difficulty**: Intermediate
- **Description**:
  Since ihatelovepdf.com processes everything client-side without a backend server, it is the perfect candidate for a Progressive Web App (PWA) that works 100% offline on airplanes, remote locations, or unstable network connections.
- **Proposed Solution**:
  1. Update `public/manifest.webmanifest` with complete icons, standalone display mode, and categories.
  2. Implement a Service Worker using `Workbox` or Next.js PWA plugins to cache static JS/CSS bundles and WebAssembly font assets with a Cache-First strategy.
  3. Add an offline status badge and install prompt banner.
- **Acceptance Criteria**:
  - [ ] The app installs cleanly on Chrome, Edge, and iOS Safari.
  - [ ] Core tools (Merge, Split, Protect, Watermark, Compress) work with Wi-Fi disabled.
  - [ ] Lighthouse PWA audit achieves 100%.
- **Relevant Files**:
  - `public/manifest.webmanifest`
  - `next.config.js`
  - `src/app/layout.tsx`

---

### Issue #11: Add Extract Embedded Images Tool (`pdfToImages`)
- **Title**: `feat(tool): extract raw embedded images from PDF without rasterizing entire pages`
- **Labels**: `type: feature`, `tool: conversion`, `difficulty: intermediate`
- **Difficulty**: Intermediate
- **Description**:
  Currently, converting PDF to images rasterizes the entire page. Users frequently want to extract just the original embedded JPEG/PNG photo files from a PDF without degradation or loss of quality.
- **Proposed Solution**:
  1. Add `extractImages` to `src/types/operations.ts`.
  2. Enumerate objects in `PDFDocument` (via `pdf-lib` or `pdfjs-dist` operator list), look for `/XObject` dictionaries with `/Subtype /Image`.
  3. Extract image byte streams and pack them into a `.zip` archive via `jszip`.
- **Acceptance Criteria**:
  - [ ] Accessible at `/extract-images`.
  - [ ] Extracts original uncompressed image files from PDF objects.
  - [ ] Offers one-click ZIP download if multiple images are extracted.
  - [ ] Verified via automated test.
- **Relevant Files**:
  - `src/types/operations.ts`
  - `src/lib/tools-registry.ts`
  - `src/lib/pdf-processor.ts`

---

### Issue #12: Add PDF Page Size Normalizer Tool (e.g. Standardize to A4 or Letter)
- **Title**: `feat(tool): normalize mixed page sizes in a document to standard A4 or US Letter`
- **Labels**: `good first issue`, `type: feature`, `tool: core-pdf`, `difficulty: starter`
- **Difficulty**: Starter (Good First Issue)
- **Description**:
  Scanned documents often contain a chaotic mix of page dimensions. Users need a tool to rescale or fit all pages to a consistent target dimension (A4, US Letter, A3) with centering and optional margins.
- **Proposed Solution**:
  1. Add `normalizePageSize` to `src/types/operations.ts`.
  2. Options: Target size (`A4`, `Letter`, `Legal`), Orientation (`Auto`, `Portrait`, `Landscape`), Fit mode (`Scale to Fit`, `Fit with White Borders`).
  3. In `src/lib/pdf-processor.ts`, use `page.scaleContent()` or embed each page as an XObject centered onto a newly sized page.
- **Acceptance Criteria**:
  - [ ] Accessible at `/normalize-page-size`.
  - [ ] Correctly standardizes pages to uniform dimensions.
  - [ ] Preserves vector text and form elements.
  - [ ] Automated test added.
- **Relevant Files**:
  - `src/types/operations.ts`
  - `src/lib/tools-registry.ts`
  - `src/lib/pdf-processor.ts`

---

### Issue #13: Implement End-to-End Playwright Workflow Tests for Merge & Compress
- **Title**: `test(e2e): setup Playwright automated workflow tests for file upload and download`
- **Labels**: `help wanted`, `type: testing`, `difficulty: intermediate`
- **Difficulty**: Intermediate
- **Description**:
  While unit tests verify the PDF engine, we lack automated browser E2E tests verifying user interaction: drag-and-dropping files, clicking process buttons, checking progress bars, and validating download triggers.
- **Proposed Solution**:
  1. Add `@playwright/test` to devDependencies.
  2. Create test suites in `e2e/`:
     - `merge-flow.spec.ts`
     - `compress-flow.spec.ts`
     - `watermark-flow.spec.ts`
  3. Wire E2E script into GitHub Actions CI workflow.
- **Acceptance Criteria**:
  - [ ] Headless browser runs tests successfully in < 30s.
  - [ ] Tests verify DOM upload, processing feedback dialog, and trigger of download anchor.
  - [ ] Integrated in `.github/workflows/ci.yml`.
- **Relevant Files**:
  - `playwright.config.ts`
  - `e2e/*.spec.ts`
  - `.github/workflows/ci.yml`

---

### Issue #14: Add Dark Mode Persistent Toggle with Zero Flash of Unstyled Content (FOUC)
- **Title**: `feat(ui): add persistent dark mode theme toggle with system preference sync`
- **Labels**: `good first issue`, `type: enhancement`, `difficulty: starter`
- **Difficulty**: Starter (Good First Issue)
- **Description**:
  The CSS tokens in `src/styles/globals.css` define dark mode variables (`@media (prefers-color-scheme: dark)`), but users cannot manually toggle dark mode or lock their preference.
- **Proposed Solution**:
  1. Add a theme switcher icon in `src/components/Header.tsx` (Light / Dark / System).
  2. Store preference in `localStorage`.
  3. Add an inline blocking script in `src/app/layout.tsx` to read `localStorage` and set `class="dark"` on `<html>` before initial paint, eliminating FOUC.
- **Acceptance Criteria**:
  - [ ] Toggle button appears in header across all pages.
  - [ ] Persists selection across page reloads and route navigation.
  - [ ] Zero flash of unstyled theme on page refresh.
  - [ ] Accessible button with `aria-label` and keyboard support.
- **Relevant Files**:
  - `src/components/Header.tsx`
  - `src/app/layout.tsx`
  - `src/styles/globals.css`

---

### Issue #15: Memory-Safe Chunked Processing for Large (>150MB) PDFs
- **Title**: `perf: implement chunked memory management and garbage collection for large PDF files`
- **Labels**: `help wanted`, `type: performance`, `tool: core-pdf`, `difficulty: advanced`
- **Difficulty**: Advanced
- **Description**:
  Processing 150MB+ scanned PDFs or 500+ page documents currently risks exhausting the browser tab's V8 heap memory (triggering "Out of Memory" crashes), especially on mobile devices or 32-bit browsers.
- **Proposed Solution**:
  1. Implement batching in `src/lib/pdf-processor.ts` for operations like `split`, `compress`, and `extractText`.
  2. Free intermediate canvas contexts and `ArrayBuffer` instances between page batches.
  3. Implement user warnings when uploaded document size approaches estimated heap safety limits.
- **Acceptance Criteria**:
  - [ ] Successfully processes a 200MB PDF without tab crash.
  - [ ] Memory footprint profiles show stable flat usage rather than unbounded monotonic growth.
  - [ ] Clear user-friendly error message if browser memory is exhausted.
- **Relevant Files**:
  - `src/lib/pdf-processor.ts`
  - `src/lib/worker-client.ts`
  - `src/workers/pdf.worker.ts`

---

### Issue #16: Client-Side OCR Engine via Dynamic WebAssembly Plugin
- **Title**: `feat(tool): optional on-demand WebAssembly OCR for scanned documents`
- **Labels**: `type: feature`, `tool: core-pdf`, `difficulty: advanced`
- **Difficulty**: Advanced
- **Description**:
  Users want to extract text from scanned image PDFs. While we removed the bloated 70MB unconditional Tesseract bundle in Phase 2, we can build a lightweight, lazy-loaded on-demand WebAssembly OCR module loaded only when the user explicitly triggers an OCR tool.
- **Proposed Solution**:
  1. Create an isolated dynamic import for an optimized WASM OCR runtime (e.g. `tesseract-wasm` or lightweight ONNX runtime).
  2. Download language models dynamically only upon user selection, caching them in IndexedDB.
  3. Overlay invisible searchable text layers on top of scanned image pages.
- **Acceptance Criteria**:
  - [ ] Main site bundle size remains strictly unaffected (0 kB added to initial load).
  - [ ] WASM and language dictionaries download on-demand with progress indicator.
  - [ ] Successfully generates a searchable PDF from a scanned input.
  - [ ] 100% privacy maintained (all OCR runs inside browser memory).
- **Relevant Files**:
  - `src/lib/ocr/`
  - `src/lib/pdf-processor.ts`
  - `src/types/operations.ts`

---

### Issue #17: Advanced Interactive Redaction Canvas with Multi-Box Selector
- **Title**: `feat(ux): interactive visual multi-box canvas redaction tool`
- **Labels**: `type: enhancement`, `type: a11y`, `tool: core-pdf`, `difficulty: advanced`
- **Difficulty**: Advanced
- **Description**:
  Currently, redaction allows coordinate entry and basic bounding boxes. Users need an intuitive PDF viewer where they can drag rectangular selection boxes directly over sensitive text or images across multiple pages, preview the redactions, and burn them into the PDF stream.
- **Proposed Solution**:
  1. Render PDF pages in a responsive canvas stack.
  2. Support click-and-drag drawing of multiple redaction boxes.
  3. Support deleting boxes, resizing handles, and color selection (Blackout / Whited-out).
  4. Ensure true redaction (sanitizing underlying text and vector streams as verified in Phase 2).
- **Acceptance Criteria**:
  - [ ] Drag-and-drop selection of multiple redaction areas on any page.
  - [ ] Keyboard navigation support to select and delete boxes.
  - [ ] Complete permanent burn verification (underlying text destroyed, not just covered).
- **Relevant Files**:
  - `src/components/pdf-processor/RedactionCanvas.tsx`
  - `src/lib/pdf-processor.ts`

---

### Issue #18: Dynamic Route Code Splitting for PDF.js Standard Fonts (~2.8MB)
- **Title**: `perf(bundle): lazy-load PDF.js standard fonts to eliminate build warning and shave 2.8MB`
- **Labels**: `type: performance`, `tool: conversion`, `difficulty: intermediate`
- **Difficulty**: Intermediate
- **Description**:
  During `npm test` and build, warnings appear: `Unable to load font data at: /standard_fonts/LiberationSans-Regular.ttf`. PDF.js standard font metrics should be served on-demand from the public static assets rather than throwing warnings during headless evaluation.
- **Proposed Solution**:
  1. Ensure standard font `.ttf` files are housed in `public/standard_fonts/`.
  2. Configure `pdfjsLib.GlobalWorkerOptions.standardFontDataUrl` to point to `/standard_fonts/`.
  3. Verify headless test runner can locate the fonts without warnings.
- **Acceptance Criteria**:
  - [ ] `npm test` executes with zero font loading warnings.
  - [ ] Font assets are served with immutable cache headers in production.
- **Relevant Files**:
  - `src/lib/pdf-loader.ts`
  - `tests/tool-verification.test.ts`

---

### Issue #19: Drag-and-Drop Visual Page Reordering with Animated Thumbnails
- **Title**: `ux(reorder): add native touch & pointer drag-and-drop page tile reordering with animations`
- **Labels**: `type: enhancement`, `type: a11y`, `tool: core-pdf`, `difficulty: intermediate`
- **Difficulty**: Intermediate
- **Description**:
  Users reordering or merging multi-page PDFs currently use sequential move-left / move-right arrow buttons or page selection checkboxes. Adding smooth pointer and touch drag-and-drop tile sorting (e.g. `@dnd-kit/core` or HTML5 native drag-drop) will provide an intuitive tactile experience.
- **Proposed Solution**:
  1. Wrap page thumbnail tiles in drag-and-drop container.
  2. Provide live ghost preview while dragging.
  3. Include accessible keyboard reordering (arrow keys + Space to drop) for screen-reader and keyboard users.
- **Acceptance Criteria**:
  - [ ] Drag tiles with mouse or touch to reorder pages in real-time.
  - [ ] Keyboard accessible navigation with ARIA live announcements.
  - [ ] Verified on mobile touchscreens and desktop viewports.
- **Relevant Files**:
  - `src/components/pdf-processor/PageOrderer.tsx`
  - `src/components/pdf-processor/FileList.tsx`

---

### Issue #20: Interactive Live Dual-Split Preview with Real-Time Margin & Dimension Guides
- **Title**: `ux(crop): interactive visual rulers and millimeter dimension indicators for crop and margins`
- **Labels**: `type: enhancement`, `tool: core-pdf`, `difficulty: starter`
- **Difficulty**: Starter
- **Description**:
  The crop interface provides numerical inputs and drag handles. Showing live millimeter / inch rulers alongside points will help users preparing documents for official passport, visa, or print requirements.
- **Proposed Solution**:
  1. Add optional unit selector (points, mm, inches, cm).
  2. Show dynamic dimensions overlay on the active crop rectangle.
  3. Provide quick preset buttons (Trim Margins 5mm, Remove 10mm Header, Standard Letter to A4).
- **Acceptance Criteria**:
  - [ ] Unit toggle updates dimensions dynamically in real-time.
  - [ ] Standard print presets apply calibrated margins.
- **Relevant Files**:
  - `src/components/pdf-processor/UnifiedCropInterface.tsx`

---

### Issue #21: Before/After Visual Document Comparison Slider for Compression & Color Inversion
- **Title**: `ux(compress): split-pane comparison slider to preview compression quality before download`
- **Labels**: `type: enhancement`, `tool: core-pdf`, `difficulty: intermediate`
- **Difficulty**: Intermediate
- **Description**:
  Users compressing high-resolution PDFs want to verify image clarity and font legibility before downloading. A side-by-side or curtain slider comparing original vs compressed thumbnails gives immediate confidence.
- **Proposed Solution**:
  1. Render page 1 thumbnail of both original and compressed preview.
  2. Provide an interactive swipe slider revealing original on left and compressed on right.
  3. Highlight exact file size delta (e.g., `-68% (14.2 MB → 4.5 MB)`).
- **Acceptance Criteria**:
  - [ ] Interactive slider reveals image comparison.
  - [ ] Smooth 60fps gesture response on touch devices.
- **Relevant Files**:
  - `src/components/pdf-processor/CompressionPreviewCard.tsx`
  - `src/components/pdf-processor/OptionLivePreview.tsx`

---

### Issue #22: Smart Default Detection for Document Orientation and Paper Size
- **Title**: `ux(smart-defaults): auto-detect source PDF orientation and dimensions for conversion tools`
- **Labels**: `type: enhancement`, `tool: conversion`, `difficulty: starter`
- **Difficulty**: Starter
- **Description**:
  When converting spreadsheets, presentations, or images to PDF, users frequently have to guess whether landscape or portrait will fit better. Inspecting the input aspect ratio and setting the initial orientation accordingly saves time.
- **Proposed Solution**:
  1. For `.xlsx` with > 6 columns, default orientation to `landscape`.
  2. For images wider than tall, default page format to matching landscape aspect ratio.
  3. For PowerPoint decks, match 16:9 widescreen geometry automatically.
- **Acceptance Criteria**:
  - [ ] Auto-orientation selected upon file analysis.
  - [ ] User can still override the suggested preset with 1 click.
- **Relevant Files**:
  - `src/components/pdf-processor/ProcessingOptions.tsx`
  - `src/lib/pdf-processor.ts`

---

### Issue #23: Contextual Tooltips and Rich Empty States across All 35 Tools
- **Title**: `ux(a11y): add accessible tooltips for specialized compression and PDF standard settings`
- **Labels**: `type: a11y`, `type: enhancement`, `difficulty: starter`
- **Difficulty**: Starter
- **Description**:
  Specialized options like `Downscale DPI`, `Flatten Form Fields`, `Bypass OffscreenCanvas`, and `Linearize PDF` need concise explanatory tooltips for non-technical users.
- **Proposed Solution**:
  1. Add `<HelpTooltip text="..." />` component to non-obvious form labels.
  2. Implement keyboard focusable info triggers with `role="tooltip"`.
  3. Provide illustrative empty states when no files or items are present.
- **Acceptance Criteria**:
  - [ ] Tooltips accessible via mouse hover, keyboard focus, and mobile tap.
  - [ ] Compliant with WCAG 2.1 AA focusable/hoverable guidelines.
- **Relevant Files**:
  - `src/components/pdf-processor/ProcessingOptions.tsx`
  - `src/components/ui/Tooltip.tsx`

