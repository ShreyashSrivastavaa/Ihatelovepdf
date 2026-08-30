import { OperationKey } from '../types/operations';
import { OperationContent } from './dictionaries/operation-types';
import { Locale } from './config';
import { getOperationPath } from './routing';

export const ALL_OPERATION_KEYS: OperationKey[] = [
  'merge',
  'compress',
  'split',
  'extract',
  'crop',
  'rotate',
  'reorder',
  'pdfToImages',
  'imagesToPdf',
  'watermark',
  'pageNumbers',
  'headersFooters',
  'extractText',
  'invertColors',
  'redact',
  'compare',
  'pdfToZip',
  'decrypt',
  'editPdf',
  'scanToPdf',
  'markdownToPdf',
  'htmlToPdf',
  'csvToPdf',
  'createPdf',
  'excelToPdf',
  'pdfToExcel',
  'powerpointToPdf',
  'pdfToPowerpoint',
  'pdfToHtml',
  'pdfToEpub',
  'ebookToPdf',
  'whiteboard',
  'gstInvoice',
  'posBilling',
];

export interface OperationCatalogItem {
  key: OperationKey;
  label: string;
  helper: string;
  title: string;
  description: string;
  keywords: string[];
  bulletPoints: string[];
  benefitsTitle: string;
  benefits: Array<{ title: string; description: string }>;
  howToTitle: string;
  howToSteps: string[];
  useCases: string[];
}

export const OPERATIONS_CATALOG: Record<OperationKey, OperationCatalogItem> = {
  merge: {
    key: 'merge',
    label: 'Merge PDF',
    helper: 'Combine multiple PDF files into a single organized document in seconds.',
    title: 'Merge PDF Online Free - Combine PDF Files',
    description: 'Combine multiple PDF files into one single document directly in your browser. Fast, 100% private, zero uploads.',
    keywords: ['merge pdf', 'combine pdf', 'join pdf', 'merge pdf online free', 'pdf merger'],
    bulletPoints: ['Drag & drop reordering', 'Unlimited file merging', '100% client-side privacy', 'Instant browser download'],
    benefitsTitle: 'Why merge PDFs with ihatelovepdf',
    benefits: [
      { title: 'Lightning Speed', description: 'Combines pages instantly using your local browser WebAssembly.' },
      { title: 'Zero Cloud Uploads', description: 'Files never leave your computer or phone.' },
      { title: 'Preserve Bookmarks & Hyperlinks', description: 'Maintains vector fidelity and outline structures.' },
    ],
    howToTitle: 'How to merge PDF files',
    howToSteps: ['Upload two or more PDF files.', 'Reorder documents to your liking.', 'Click "Merge PDF" to download the merged document.'],
    useCases: ['Combining monthly reports', 'Compiling application forms with receipts', 'Organizing scanned paperwork into a single dossier'],
  },
  compress: {
    key: 'compress',
    label: 'Compress PDF',
    helper: 'Reduce PDF file size without losing quality for email and portal submissions.',
    title: 'Compress PDF Online Free - Reduce PDF File Size',
    description: 'Reduce PDF size up to 90% without compromising visual clarity. 100% local processing in your browser.',
    keywords: ['compress pdf', 'reduce pdf size', 'shrink pdf', 'pdf compressor online free'],
    bulletPoints: ['Multiple compression presets', 'Image downsampling & metadata stripping', 'Zero server uploads', 'Lightning fast'],
    benefitsTitle: 'Why compress PDFs locally',
    benefits: [
      { title: 'Meet Email Limits', description: 'Shrink bulky PDFs below 25MB email attachment limits easily.' },
      { title: 'Strict Privacy', description: 'Confidential tax and legal records are processed entirely in memory.' },
      { title: 'Retain Text Crispness', description: 'Vectors and fonts stay sharp while images are intelligently downscaled.' },
    ],
    howToTitle: 'How to compress PDF files',
    howToSteps: ['Select your PDF file.', 'Choose your preferred compression level (Low, Balanced, Extreme).', 'Download your compressed PDF.'],
    useCases: ['Meeting portal upload limits', 'Emailing client proposals', 'Saving local storage space'],
  },
  split: {
    key: 'split',
    label: 'Split PDF',
    helper: 'Separate PDF pages or extract specific sections into separate documents.',
    title: 'Split PDF Online Free - Separate PDF Pages',
    description: 'Split PDF into individual pages or page ranges easily. 100% private in-browser processing.',
    keywords: ['split pdf', 'separate pdf pages', 'divide pdf', 'split pdf online'],
    bulletPoints: ['Custom page ranges', 'Split every page into a standalone PDF', 'Instant ZIP download', 'Zero upload required'],
    benefitsTitle: 'Why split PDFs with ihatelovepdf',
    benefits: [
      { title: 'Precise Page Control', description: 'Extract exactly the chapters or single pages you need.' },
      { title: 'Batch Page Partitioning', description: 'Split large books into chapters in one click.' },
      { title: 'Total Privacy', description: 'Zero cloud interaction keeps your files safe.' },
    ],
    howToTitle: 'How to split a PDF',
    howToSteps: ['Upload the PDF document.', 'Specify page intervals or extract all pages.', 'Click Split PDF.'],
    useCases: ['Extracting specific invoices from a monthly bundle', 'Splitting books into chapters', 'Separating signed contract pages'],
  },
  extract: {
    key: 'extract',
    label: 'Extract Pages',
    helper: 'Select and pull specific pages from any PDF into a new document.',
    title: 'Extract PDF Pages Free Online',
    description: 'Pull individual pages or custom ranges out of any PDF document in seconds.',
    keywords: ['extract pdf pages', 'pull pages from pdf', 'save specific pages from pdf'],
    bulletPoints: ['Visual page thumbnail selector', 'One-click multi-page extraction', '100% private in browser', 'Fast & free'],
    benefitsTitle: 'Why extract pages locally',
    benefits: [
      { title: 'Visual Thumbnails', description: 'Preview pages before picking them.' },
      { title: 'Selective Compilation', description: 'Create a tailored handout from a 100-page presentation.' },
      { title: 'Instant Processing', description: 'No waiting for cloud queue or uploads.' },
    ],
    howToTitle: 'How to extract PDF pages',
    howToSteps: ['Select your PDF document.', 'Click the pages you want to keep.', 'Click Extract Pages to download.'],
    useCases: ['Saving only the summary page from a report', 'Extracting reference charts', 'Pulling specific certificates'],
  },
  crop: {
    key: 'crop',
    label: 'Crop PDF',
    helper: 'Trim margins, white borders, and custom viewports on PDF pages.',
    title: 'Crop PDF Online Free - Trim PDF Margins',
    description: 'Crop margins and adjust page dimensions on your PDF pages visually in your browser.',
    keywords: ['crop pdf', 'trim pdf margins', 'crop pdf pages online free'],
    bulletPoints: ['Visual crop box handle', 'Custom inch / mm / pt margins', 'Apply to all or selected pages', '100% offline'],
    benefitsTitle: 'Why crop PDFs with ihatelovepdf',
    benefits: [
      { title: 'Remove Scanner Borders', description: 'Clean up dirty scanner borders and white space.' },
      { title: 'E-Reader Optimization', description: 'Maximize text area for Kindle and tablet reading.' },
      { title: 'Zero Data Leakage', description: 'Everything executes locally.' },
    ],
    howToTitle: 'How to crop PDF pages',
    howToSteps: ['Upload your PDF file.', 'Drag the crop box boundaries to frame the desired area.', 'Click Crop PDF.'],
    useCases: ['Trimming printer bleed marks', 'Optimizing PDFs for small tablet screens', 'Cropping multi-column articles'],
  },
  rotate: {
    key: 'rotate',
    label: 'Rotate PDF',
    helper: 'Permanently rotate upside-down or sideways PDF pages by 90°, 180°, or 270°.',
    title: 'Rotate PDF Online Free - Turn PDF Pages',
    description: 'Rotate PDF pages clockwise or counter-clockwise permanently in your browser.',
    keywords: ['rotate pdf', 'turn pdf pages', 'fix upside down pdf', 'rotate pdf 90 degrees'],
    bulletPoints: ['Rotate individual or all pages', '90°, 180°, and 270° orientations', 'Permanent rotation angle fix', '100% private'],
    benefitsTitle: 'Why rotate PDFs locally',
    benefits: [
      { title: 'Fix Scans Instantly', description: 'Correct sideways scanned documents in seconds.' },
      { title: 'Selective Page Rotation', description: 'Rotate only landscape tables in portrait documents.' },
      { title: 'Zero Cloud Uploads', description: 'Files are processed in browser memory.' },
    ],
    howToTitle: 'How to rotate PDF pages',
    howToSteps: ['Choose your PDF file.', 'Select pages and click Rotate Left or Rotate Right.', 'Download your corrected PDF.'],
    useCases: ['Fixing inverted document scans', 'Adjusting orientation for landscape spreadsheets', 'Preparing slides for printing'],
  },
  reorder: {
    key: 'reorder',
    label: 'Reorder PDF',
    helper: 'Drag and rearrange the page sequence of any PDF document.',
    title: 'Reorder PDF Pages Online Free - Rearrange PDF',
    description: 'Drag and drop PDF page thumbnails to change their order easily.',
    keywords: ['reorder pdf', 'rearrange pdf pages', 'change pdf page order', 'sort pdf pages'],
    bulletPoints: ['Visual drag-and-drop grid', 'Instant thumbnail previews', 'Delete or duplicate pages', '100% private'],
    benefitsTitle: 'Why reorder pages with ihatelovepdf',
    benefits: [
      { title: 'Intuitive Drag & Drop', description: 'Rearrange complex documents with ease.' },
      { title: 'Live Page Previews', description: 'See high-fidelity thumbnails as you organize.' },
      { title: 'Zero Upload Wait', description: 'No file transfer latency.' },
    ],
    howToTitle: 'How to reorder PDF pages',
    howToSteps: ['Upload your PDF file.', 'Drag page cards to your desired sequence.', 'Click Reorder PDF.'],
    useCases: ['Correcting scrambled scanned sheets', 'Repositioning cover pages', 'Sorting portfolio samples'],
  },
  pdfToImages: {
    key: 'pdfToImages',
    label: 'PDF to Images',
    helper: 'Convert PDF pages into high-resolution PNG or JPEG images.',
    title: 'Convert PDF to JPG / PNG Online Free',
    description: 'Render every PDF page into crisp PNG or JPEG images. Export individually or as a ZIP archive.',
    keywords: ['pdf to jpg', 'pdf to png', 'convert pdf to images', 'pdf to image online free'],
    bulletPoints: ['Custom DPI (72 to 300 DPI)', 'Lossless PNG & compressed JPEG', 'ZIP archive bundling', '100% client-side'],
    benefitsTitle: 'Why convert PDF to images locally',
    benefits: [
      { title: 'Crystal Clear Quality', description: 'Render high-resolution raster images at up to 300 DPI.' },
      { title: 'One-Click ZIP Export', description: 'Download all page images in a single organized archive.' },
      { title: 'Safe & Secure', description: 'No files sent to remote servers.' },
    ],
    howToTitle: 'How to convert PDF to images',
    howToSteps: ['Drop your PDF into the tool.', 'Choose PNG or JPG format and resolution DPI.', 'Download image files or ZIP.'],
    useCases: ['Embedding PDF pages in presentations', 'Creating social media previews', 'Sharing slides as images'],
  },
  imagesToPdf: {
    key: 'imagesToPdf',
    label: 'Images to PDF',
    helper: 'Convert JPG, PNG, WebP, and GIF images into a polished PDF document.',
    title: 'Convert JPG to PDF Online Free - Images to PDF',
    description: 'Combine multiple JPG, PNG, and WebP images into a single multi-page PDF document.',
    keywords: ['jpg to pdf', 'images to pdf', 'png to pdf', 'convert photos to pdf online'],
    bulletPoints: ['Batch image compilation', 'A4, US Letter, or auto-fit canvas', 'Margin & background customization', '100% local'],
    benefitsTitle: 'Why convert images to PDF locally',
    benefits: [
      { title: 'Auto Page Layout', description: 'Fits portrait and landscape photos seamlessly onto standard pages.' },
      { title: 'Fast Reordering', description: 'Arrange your photos in chronological order before building the PDF.' },
      { title: 'Privacy Guaranteed', description: 'Personal photos are processed 100% on your device.' },
    ],
    howToTitle: 'How to convert images to PDF',
    howToSteps: ['Upload one or more image files.', 'Set page size (A4/Letter) and fit preferences.', 'Click Convert to PDF.'],
    useCases: ['Converting photo receipts for expense reports', 'Creating photo albums or portfolios', 'Submitting ID scans as PDF'],
  },
  watermark: {
    key: 'watermark',
    label: 'Watermark PDF',
    helper: 'Stamp custom text or image watermarks across PDF pages with opacity and rotation control.',
    title: 'Add Watermark to PDF Online Free - Stamp Text & Logo',
    description: 'Protect and brand your PDF documents with custom text or image watermarks. Set opacity, angle, and grid placement 100% in your browser.',
    keywords: ['watermark pdf', 'add watermark to pdf online', 'stamp pdf', 'confidential watermark pdf', 'draft watermark'],
    bulletPoints: ['Custom text or logo stamp', 'Full-page tile repeat or 9-point grid', 'Opacity, rotation & color sliders', '100% private in browser'],
    benefitsTitle: 'Why watermark PDFs with ihatelovepdf',
    benefits: [
      { title: 'Document Protection', description: 'Mark drafts, confidential files, and copyrighted assets with clear ownership.' },
      { title: 'Flexible Layouts', description: 'Tile diagonally across entire pages or position discreetly in corners.' },
      { title: 'Zero Cloud Risk', description: 'Proprietary IP and trade secrets never leave your browser.' },
    ],
    howToTitle: 'How to add a watermark to PDF',
    howToSteps: ['Upload your PDF file.', 'Type your watermark text (e.g. CONFIDENTIAL) and adjust opacity & angle.', 'Click Apply Watermark.'],
    useCases: ['Marking preliminary financial reports as DRAFT', 'Stamping client proposals with company logos', 'Protecting copyrighted eBooks'],
  },
  pageNumbers: {
    key: 'pageNumbers',
    label: 'Page Numbers',
    helper: 'Stamp customizable page numbers (Page X of Y, X/Y, numbers only) on any PDF.',
    title: 'Add Page Numbers to PDF Online Free',
    description: 'Insert dynamic page numbering to your PDF documents with customizable positions, formats, fonts, and skip-first-page options.',
    keywords: ['add page numbers to pdf', 'number pdf pages online', 'pdf pagination', 'page numbering tool'],
    bulletPoints: ['Formats: Page X of Y, X / Y, numbers only', '6 alignment positions (Top/Bottom Left/Center/Right)', 'Skip cover page toggle', 'Custom start number'],
    benefitsTitle: 'Why add page numbers with ihatelovepdf',
    benefits: [
      { title: 'Professional Formatting', description: 'Ensure legal briefs, academic papers, and manuals have clear pagination.' },
      { title: 'Cover Page Protection', description: 'Easily exclude title pages and start numbering from page 2.' },
      { title: 'Instant Local Output', description: 'Numbers are stamped directly into the vector stream.' },
    ],
    howToTitle: 'How to number PDF pages',
    howToSteps: ['Select your PDF document.', 'Pick your preferred format and alignment position.', 'Click Add Page Numbers.'],
    useCases: ['Numbering legal briefs and exhibits', 'Formatting theses and research papers', 'Preparing bound booklets'],
  },
  headersFooters: {
    key: 'headersFooters',
    label: 'Headers & Footers',
    helper: 'Insert custom headers, footers, dates, and dynamic document titles across pages.',
    title: 'Add Headers and Footers to PDF Online Free',
    description: 'Add header and footer text, page counters, and timestamps to any PDF with zero server uploads.',
    keywords: ['add header to pdf', 'add footer to pdf', 'pdf header footer online', 'stamp header on pdf'],
    bulletPoints: ['3-column header and footer slots', 'Dynamic macros ({page}, {total}, {date}, {title})', 'Skip cover page support', '100% private'],
    benefitsTitle: 'Why add headers & footers locally',
    benefits: [
      { title: 'Document Branding', description: 'Add company names, document codes, and revision notices across all pages.' },
      { title: 'Dynamic Variables', description: 'Auto-fill current dates and page totals with macro tokens.' },
      { title: 'Complete Confidentiality', description: 'Processed on your device memory.' },
    ],
    howToTitle: 'How to add headers and footers to PDF',
    howToSteps: ['Upload your PDF file.', 'Fill in header and footer text fields.', 'Click Add Headers & Footers.'],
    useCases: ['Adding confidentiality notices in footers', 'Displaying document titles and revision dates', 'Standardizing multi-author reports'],
  },
  extractText: {
    key: 'extractText',
    label: 'Extract Text',
    helper: 'Extract plain text, words, and character metrics from PDF pages with 1-click export.',
    title: 'Extract Text from PDF Online Free - PDF to TXT',
    description: 'Pull all readable text from any PDF document with line break preservation. Export as TXT, Markdown, or JSON.',
    keywords: ['extract text from pdf', 'pdf to txt online free', 'copy text from pdf', 'pdf text extractor'],
    bulletPoints: ['Structure and line preservation', 'Word count and character count stats', 'Export as TXT, Markdown, or JSON', '100% offline'],
    benefitsTitle: 'Why extract PDF text locally',
    benefits: [
      { title: 'Clean Formatting', description: 'Maintains paragraphs and line hierarchy without garbled character codes.' },
      { title: 'Searchable Inspector', description: 'Search and inspect extracted text before copying or downloading.' },
      { title: 'Privacy First', description: 'Sensitive text is never uploaded to any server.' },
    ],
    howToTitle: 'How to extract text from a PDF',
    howToSteps: ['Select your PDF document.', 'Preview the extracted text in the interactive viewer.', 'Copy to clipboard or download as TXT/MD/JSON.'],
    useCases: ['Extracting text for copy-pasting into Word/Docs', 'Data mining and text analysis', 'Extracting article transcripts'],
  },
  invertColors: {
    key: 'invertColors',
    label: 'Invert Colors / Dark Mode',
    helper: 'Convert bright white PDF pages into eye-friendly Dark Mode, Sepia, or High Contrast.',
    title: 'Invert PDF Colors Online Free - PDF Dark Mode',
    description: 'Turn glaring white PDF documents into Dark Mode, Sepia, or High Contrast for comfortable reading and battery saving.',
    keywords: ['invert pdf colors', 'pdf dark mode', 'dark mode pdf converter', 'pdf sepia mode', 'high contrast pdf'],
    bulletPoints: ['Dark Mode, Sepia, Grayscale & High Contrast', 'Pixel-level canvas inversion', 'Eye-strain reduction for night reading', '100% private'],
    benefitsTitle: 'Why invert PDF colors',
    benefits: [
      { title: 'Night-Time Eye Comfort', description: 'Read textbooks and research papers comfortably in low-light environments.' },
      { title: 'Save OLED Battery', description: 'Dark backgrounds consume significantly less power on mobile and tablet screens.' },
      { title: 'High Contrast Mode', description: 'Improves legibility for low-vision readers.' },
    ],
    howToTitle: 'How to invert PDF colors',
    howToSteps: ['Upload your PDF file.', 'Select Dark Mode, Sepia, or High Contrast.', 'Download your night-friendly PDF.'],
    useCases: ['Studying textbooks at night', 'Reading technical documentation on OLED screens', 'Accessibility enhancement'],
  },
  redact: {
    key: 'redact',
    label: 'Redact PDF',
    helper: 'Permanently black out or white out confidential information, SSNs, and private data.',
    title: 'Redact PDF Online Free - Permanently Black Out Text & Data',
    description: 'Permanently remove and black out sensitive data from your PDF. Solid opaque vector blocks are burned directly into the PDF stream.',
    keywords: ['redact pdf', 'black out pdf text', 'censor pdf', 'permanent pdf redaction', 'remove sensitive info pdf'],
    bulletPoints: ['Permanent vector burning (irreversible)', 'Interactive drag-to-box canvas studio', 'Blackout and whiteout modes', 'Zero cloud leakage'],
    benefitsTitle: 'Why redact PDFs with ihatelovepdf',
    benefits: [
      { title: 'Irreversible Redaction', description: 'Underlying text is deleted from the stream so it cannot be highlighted or copied.' },
      { title: 'Interactive Visual Editor', description: 'Draw exact redaction rectangles directly on page previews.' },
      { title: 'GDPR & HIPAA Compliance', description: 'Zero cloud interaction guarantees zero data exposure during redaction.' },
    ],
    howToTitle: 'How to redact a PDF',
    howToSteps: ['Upload the PDF file.', 'Draw rectangles over sensitive names, numbers, or figures.', 'Click Apply Redactions.'],
    useCases: ['Masking SSNs, tax IDs, and credit cards', 'Censoring witness identities in legal filings', 'Sharing sanitized research reports'],
  },

  compare: {
    key: 'compare',
    label: 'Compare PDFs',
    helper: 'Compare two PDF revisions side-by-side with synchronized scrolling and page jump.',
    title: 'Compare PDF Files Online Free - Side-by-Side Diff',
    description: 'Compare two PDF documents side-by-side in your browser to spot visual differences and revisions.',
    keywords: ['compare pdf', 'pdf diff online free', 'compare two pdf files', 'pdf revision comparator'],
    bulletPoints: ['Side-by-side synchronized view', 'Dual canvas page navigation', '100% private in browser', 'Zero upload required'],
    benefitsTitle: 'Why compare PDFs locally',
    benefits: [
      { title: 'Spot Changes Instantly', description: 'Compare original and revised contracts page by page.' },
      { title: 'Synchronized Scrolling', description: 'Both viewports advance together for seamless cross-checking.' },
      { title: 'Total Privacy', description: 'Confidential drafts are never shared or stored.' },
    ],
    howToTitle: 'How to compare PDF files',
    howToSteps: ['Upload Document A (Original) and Document B (Revision).', 'Navigate pages synchronously to review differences.'],
    useCases: ['Reviewing contract revisions', 'Comparing design proofs before printing', 'Auditing financial sheet updates'],
  },
  pdfToZip: {
    key: 'pdfToZip',
    label: 'PDF to ZIP',
    helper: 'Package and bundle your PDF documents directly into a compressed ZIP archive.',
    title: 'Convert PDF to ZIP Online Free - Package PDF Files',
    description: 'Bundle single or multiple PDF documents directly into a clean ZIP archive with zero loss and 100% client-side privacy.',
    keywords: ['pdf to zip', 'package pdf to zip', 'bundle pdf archive', 'compress pdf to zip'],
    bulletPoints: ['Direct original PDF packaging', 'Multi-file ZIP bundling', '100% loss-free byte preservation', '100% client-side privacy'],
    benefitsTitle: 'Why package PDF files into ZIP',
    benefits: [
      { title: 'Organized Archiving', description: 'Package single or multiple PDF documents into one organized ZIP file.' },
      { title: 'Byte-for-Byte Integrity', description: 'Original PDF files are preserved directly without re-encoding or rasterization.' },
      { title: 'Zero Server Storage', description: 'Archive is generated directly in your browser memory for maximum speed and security.' },
    ],
    howToTitle: 'How to package PDF files into ZIP',
    howToSteps: ['Upload one or more PDF files.', 'Choose your preferred compression level if desired.', 'Download your ZIP archive immediately.'],
    useCases: ['Packaging multiple contracts into a single archive', 'Sending document bundles via email attachments', 'Organizing multi-file PDF projects'],
  },

  decrypt: {
    key: 'decrypt',
    label: 'Unlock / Decrypt PDF',
    helper: 'Remove password security and permission locks from your PDF files.',
    title: 'Unlock PDF Online Free - Remove PDF Password',
    description: 'Remove password protection from PDF files you own with instant client-side decryption.',
    keywords: ['unlock pdf', 'remove password from pdf', 'decrypt pdf online', 'remove pdf restrictions'],
    bulletPoints: ['Instant local decryption', 'Removes printing and copying locks', 'Zero server uploads', '100% private'],
    benefitsTitle: 'Why unlock PDFs with ihatelovepdf',
    benefits: [
      { title: 'Convenient Access', description: 'Remove repetitive password prompts on frequently used files.' },
      { title: 'Restore Permissions', description: 'Enable printing and text copying on locked documents.' },
      { title: 'Local Safety', description: 'Decryption happens in memory without sharing passwords.' },
    ],
    howToTitle: 'How to unlock a PDF',
    howToSteps: ['Upload your protected PDF.', 'Enter the document password.', 'Download the unlocked PDF.'],
    useCases: ['Removing passwords from bank statements for archiving', 'Unlocking printing permissions on purchased manuals'],
  },


  editPdf: {
    key: 'editPdf',
    label: 'Edit PDF',
    helper: 'Add text annotations, shapes, highlights, and markup to your PDF pages.',
    title: 'Edit PDF Online Free - Add Text, Shapes & Markup',
    description: 'Annotate and markup PDF pages directly in your browser. Add text boxes, highlights, and shapes easily.',
    keywords: ['edit pdf', 'annotate pdf', 'add text to pdf online', 'pdf editor free'],
    bulletPoints: ['Add custom text boxes & signatures', 'Draw shapes and highlights', 'Visual canvas overlay', '100% offline'],
    benefitsTitle: 'Why edit PDFs with ihatelovepdf',
    benefits: [
      { title: 'No Installation Required', description: 'Edit documents instantly without heavy software.' },
      { title: 'Full Annotation Tools', description: 'Highlight text, draw callouts, and type notes.' },
      { title: 'Privacy Guaranteed', description: 'Zero uploads to external servers.' },
    ],
    howToTitle: 'How to edit a PDF',
    howToSteps: ['Upload your PDF file.', 'Add text boxes, highlights, or markings on the canvas.', 'Download the edited PDF.'],
    useCases: ['Filling out non-interactive PDF forms', 'Reviewing student essays with callout notes', 'Adding quick notes to diagrams'],
  },
  scanToPdf: {
    key: 'scanToPdf',
    label: 'Scan to PDF',
    helper: 'Use your camera or webcam to scan multi-page physical documents directly into PDF.',
    title: 'Camera Document Scanner Online Free - Scan to PDF',
    description: 'Capture document pages using your computer webcam or smartphone camera, apply clean scan filters, and export to PDF.',
    keywords: ['scan to pdf', 'camera scanner online', 'webcam pdf scanner', 'document scanner browser'],
    bulletPoints: ['Multi-page camera capture', 'B&W document enhancement filters', 'Gallery reordering', '100% local'],
    benefitsTitle: 'Why scan with your browser',
    benefits: [
      { title: 'No App Install Needed', description: 'Scan receipts and papers directly from your browser on any phone or laptop.' },
      { title: 'Automatic Contrast Boost', description: 'Converts dim photos into clean black-and-white scanner pages.' },
      { title: 'Instant Compilation', description: 'Combines all captured shots into a single multi-page PDF.' },
    ],
    howToTitle: 'How to scan documents to PDF',
    howToSteps: ['Grant camera access and position document.', 'Click Capture Page for each sheet.', 'Click Download PDF.'],
    useCases: ['Scanning paper receipts for expense reports', 'Digitizing signed physical documents', 'Scanning homework assignments'],
  },
  markdownToPdf: {
    key: 'markdownToPdf',
    label: 'Markdown to PDF',
    helper: 'Convert Markdown notes, headings, code blocks, and tables into formatted PDFs.',
    title: 'Convert Markdown to PDF Online Free',
    description: 'Transform Markdown text into clean, beautifully formatted PDF documents with headings, lists, and code styling.',
    keywords: ['markdown to pdf', 'convert md to pdf', 'markdown document converter', 'markdown print pdf'],
    bulletPoints: ['Supports headers, bold, italics, lists, and tables', 'Code block syntax rendering', 'Live preview editor', '100% offline'],
    benefitsTitle: 'Why convert Markdown to PDF',
    benefits: [
      { title: 'Clean Typography', description: 'Generates polished, readable PDF reports from simple plain text.' },
      { title: 'Developer Friendly', description: 'Perfect for documentation, READMEs, and technical specifications.' },
      { title: 'Instant Conversion', description: 'Converts in milliseconds on your device.' },
    ],
    howToTitle: 'How to convert Markdown to PDF',
    howToSteps: ['Type or paste your Markdown content, or upload a .md file.', 'Click Convert to PDF to download.'],
    useCases: ['Exporting developer documentation to PDF', 'Printing meeting minutes written in Markdown', 'Creating technical reports'],
  },
  htmlToPdf: {
    key: 'htmlToPdf',
    label: 'HTML to PDF',
    helper: 'Convert HTML code, styled pages, and web snippets into PDF documents.',
    title: 'Convert HTML to PDF Online Free',
    description: 'Render HTML code and web content into clean PDF pages directly in your browser.',
    keywords: ['html to pdf', 'convert html to pdf online', 'web page to pdf', 'save html as pdf'],
    bulletPoints: ['Renders HTML markup and inline styles', 'Table and list preservation', 'Live editor interface', '100% client-side'],
    benefitsTitle: 'Why convert HTML to PDF locally',
    benefits: [
      { title: 'Accurate Layout Rendering', description: 'Preserves structured HTML tables and formatting.' },
      { title: 'Secure & Private', description: 'HTML code is parsed in an isolated sandbox in memory.' },
      { title: 'Fast Export', description: 'Generates PDFs without headless browser overhead.' },
    ],
    howToTitle: 'How to convert HTML to PDF',
    howToSteps: ['Paste your HTML code or upload an .html file.', 'Click Convert to PDF.'],
    useCases: ['Archiving web invoices and receipts', 'Exporting newsletters to PDF', 'Generating reports from HTML templates'],
  },
  csvToPdf: {
    key: 'csvToPdf',
    label: 'CSV to PDF',
    helper: 'Convert tabular CSV data into clean, bordered, and formatted PDF tables.',
    title: 'Convert CSV to PDF Online Free - Tabular Data to PDF',
    description: 'Transform comma-separated and tab-separated CSV datasets into formatted PDF tables.',
    keywords: ['csv to pdf', 'convert csv to pdf online', 'csv table to pdf', 'spreadsheet to pdf'],
    bulletPoints: ['Auto-detects columns and headers', 'Clean striped and bordered table themes', 'Pagination for large datasets', '100% local'],
    benefitsTitle: 'Why convert CSV to PDF',
    benefits: [
      { title: 'Professional Tables', description: 'Converts raw data files into printable, easy-to-read reports.' },
      { title: 'Auto-Scaling Columns', description: 'Calculates optimal column widths automatically.' },
      { title: 'Data Privacy', description: 'Financial and customer CSVs never leave your browser.' },
    ],
    howToTitle: 'How to convert CSV to PDF',
    howToSteps: ['Paste CSV data or upload a .csv file.', 'Click Convert to PDF to generate your table document.'],
    useCases: ['Printing financial transaction exports', 'Formatting customer list reports', 'Converting log files to readable tables'],
  },
  createPdf: {
    key: 'createPdf',
    label: 'Create Blank PDF',
    helper: 'Create a new blank PDF or write notes from scratch with instant PDF generation.',
    title: 'Create PDF Online Free - Blank Document Generator',
    description: 'Create a new PDF document from scratch in your browser. Write text, add notes, and export to PDF instantly.',
    keywords: ['create pdf', 'create blank pdf online', 'new pdf document', 'write pdf online'],
    bulletPoints: ['Blank page generator', 'Rich text & Markdown writing tools', 'Standard A4 and US Letter sizes', '100% private'],
    benefitsTitle: 'Why create PDFs online',
    benefits: [
      { title: 'Quick Note Taking', description: 'Jot down notes and generate a clean PDF in seconds.' },
      { title: 'No Account Required', description: 'Create documents without signing up or installing apps.' },
      { title: 'Zero Storage Footprint', description: 'Works 100% on your device.' },
    ],
    howToTitle: 'How to create a new PDF',
    howToSteps: ['Type your document title and content.', 'Click Create PDF to download.'],
    useCases: ['Quickly typing a letter or memo', 'Creating blank template pages', 'Writing invoices and notes'],
  },
  excelToPdf: {
    key: 'excelToPdf',
    label: 'Excel to PDF',
    helper: 'Convert XLSX and XLS spreadsheets into formatted PDF table reports.',
    title: 'Convert Excel to PDF Online Free - XLSX to PDF',
    description: 'Convert Microsoft Excel (.xlsx, .xls) spreadsheets into clean PDF documents directly in your browser.',
    keywords: ['excel to pdf', 'xlsx to pdf', 'convert excel to pdf online free', 'xls to pdf'],
    bulletPoints: ['SheetJS client-side parser', 'Preserves table structure and cell values', 'Multi-sheet workbook support', '100% private'],
    benefitsTitle: 'Why convert Excel to PDF locally',
    benefits: [
      { title: 'Spreadsheet to Report', description: 'Turn raw workbooks into executive-ready PDF tables.' },
      { title: 'Zero Cloud Exposure', description: 'Confidential budgets and payroll files stay 100% on your device.' },
      { title: 'Fast & Free', description: 'Instant conversion with zero file limits.' },
    ],
    howToTitle: 'How to convert Excel to PDF',
    howToSteps: ['Upload your .xlsx or .xls file.', 'Click Convert to PDF to generate your document.'],
    useCases: ['Converting financial balance sheets to PDF', 'Exporting sales pipeline reports', 'Sharing employee rosters'],
  },
  pdfToExcel: {
    key: 'pdfToExcel',
    label: 'PDF to Excel',
    helper: 'Extract tables from PDF documents and export them into editable XLSX spreadsheets.',
    title: 'Convert PDF to Excel Online Free - PDF to XLSX',
    description: 'Extract tabular data from PDF files and convert them into editable Microsoft Excel (.xlsx) spreadsheets.',
    keywords: ['pdf to excel', 'convert pdf to excel online free', 'pdf to xlsx', 'extract table from pdf'],
    bulletPoints: ['Client-side table extraction', 'Generates standard .xlsx workbooks', 'Preserves rows and columns', '100% private'],
    benefitsTitle: 'Why convert PDF to Excel',
    benefits: [
      { title: 'Recover Tabular Data', description: 'Stop manually re-typing tables from PDF reports.' },
      { title: 'Editable Spreadsheets', description: 'Open extracted numbers directly in Excel, Google Sheets, or Numbers.' },
      { title: 'Zero Server Leaks', description: 'Processes files entirely in browser memory.' },
    ],
    howToTitle: 'How to convert PDF to Excel',
    howToSteps: ['Upload your PDF containing tables.', 'Click Convert to Excel to download your .xlsx file.'],
    useCases: ['Extracting bank statement transactions into Excel', 'Pulling research table data for statistical analysis'],
  },
  powerpointToPdf: {
    key: 'powerpointToPdf',
    label: 'PowerPoint to PDF',
    helper: 'Convert PPTX slide decks into printable PDF documents.',
    title: 'Convert PowerPoint to PDF Online Free - PPTX to PDF',
    description: 'Convert Microsoft PowerPoint presentations (.pptx) into clean PDF slide handouts directly in your browser.',
    keywords: ['powerpoint to pdf', 'pptx to pdf', 'convert ppt to pdf online free', 'presentation to pdf'],
    bulletPoints: ['Parses PPTX slides locally', 'Creates slide-by-slide PDF pages', 'Zero file size limits', '100% private'],
    benefitsTitle: 'Why convert PowerPoint to PDF',
    benefits: [
      { title: 'Universal Presentation Handouts', description: 'Ensure your slides can be viewed on any device without PowerPoint installed.' },
      { title: 'Print Ready', description: 'Preserves slide dimensions for handouts and booklet printing.' },
      { title: 'Confidential Presentations', description: 'Company pitch decks stay secure on your device.' },
    ],
    howToTitle: 'How to convert PowerPoint to PDF',
    howToSteps: ['Upload your .pptx presentation file.', 'Click Convert to PDF to download.'],
    useCases: ['Creating PDF handouts for meetings', 'Sharing pitch decks with investors', 'Archiving lectures'],
  },
  pdfToPowerpoint: {
    key: 'pdfToPowerpoint',
    label: 'PDF to PowerPoint',
    helper: 'Convert PDF pages into editable PowerPoint (.pptx) slide decks.',
    title: 'Convert PDF to PowerPoint Online Free - PDF to PPTX',
    description: 'Transform PDF pages into Microsoft PowerPoint (.pptx) slides with high-resolution slide layouts.',
    keywords: ['pdf to powerpoint', 'pdf to pptx', 'convert pdf to slides', 'pdf presentation converter'],
    bulletPoints: ['High-res slide rendering with PptxGenJS', 'Standard 16:9 widescreen layout', '100% client-side generation', 'Zero cloud uploads'],
    benefitsTitle: 'Why convert PDF to PowerPoint',
    benefits: [
      { title: 'Revive Slide Decks', description: 'Turn static PDF presentations back into interactive slide decks.' },
      { title: 'Presenter Ready', description: 'Add speaker notes and present in PowerPoint or Keynote.' },
      { title: 'Fast & Secure', description: 'Generates .pptx files on the fly in memory.' },
    ],
    howToTitle: 'How to convert PDF to PowerPoint',
    howToSteps: ['Upload your PDF presentation.', 'Click Convert to PowerPoint to download your .pptx slide deck.'],
    useCases: ['Converting conference PDF slides to PPTX', 'Rebuilding lost presentation files', 'Editing slide orders'],
  },
  pdfToHtml: {
    key: 'pdfToHtml',
    label: 'PDF to HTML',
    helper: 'Convert PDF document pages into responsive HTML and web-ready code.',
    title: 'Convert PDF to HTML Online Free - PDF to Web Page',
    description: 'Convert PDF files into semantic, responsive HTML code that you can embed on websites or view in any browser.',
    keywords: ['pdf to html', 'convert pdf to html online', 'pdf to web page', 'publish pdf as html'],
    bulletPoints: ['Semantic HTML5 structure', 'Responsive layout styling', 'Preserves headings, lists & tables', '100% offline'],
    benefitsTitle: 'Why convert PDF to HTML',
    benefits: [
      { title: 'Web Publishing', description: 'Publish document content online without forcing visitors to download large PDFs.' },
      { title: 'SEO Optimized', description: 'Makes PDF text indexable by web search engines.' },
      { title: 'Zero Cloud Storage', description: 'Generates HTML directly in your browser.' },
    ],
    howToTitle: 'How to convert PDF to HTML',
    howToSteps: ['Upload your PDF file.', 'Click Convert to HTML to download the .html document.'],
    useCases: ['Publishing company reports on web portals', 'Embedding documents into blogs', 'Creating accessible web pages'],
  },
  pdfToEpub: {
    key: 'pdfToEpub',
    label: 'PDF to EPUB',
    helper: 'Convert PDF documents into reflowable EPUB eBooks for Kindle, Apple Books, and Kobo.',
    title: 'Convert PDF to EPUB Online Free - PDF to eBook',
    description: 'Transform PDF documents into reflowable EPUB eBooks for comfortable reading on Kindle, Kobo, and Apple Books.',
    keywords: ['pdf to epub', 'convert pdf to epub online free', 'pdf to ebook', 'read pdf on kindle'],
    bulletPoints: ['Reflowable text chapters', 'Generates standard EPUB 3.0 package', 'Custom book title and metadata', '100% private'],
    benefitsTitle: 'Why convert PDF to EPUB',
    benefits: [
      { title: 'Comfortable Reading', description: 'Text resizes dynamically to fit small e-reader and smartphone screens.' },
      { title: 'Custom Typography', description: 'Adjust fonts, margins, and brightness on your favorite e-reader app.' },
      { title: 'Zero Cloud Uploads', description: 'EPUB package is built entirely in browser memory.' },
    ],
    howToTitle: 'How to convert PDF to EPUB',
    howToSteps: ['Upload your PDF document.', 'Set book title and metadata.', 'Click Convert to EPUB.'],
    useCases: ['Reading PDFs on Kindle and Kobo e-readers', 'Converting manuals into digital eBooks', 'Mobile reading'],
  },
  ebookToPdf: {
    key: 'ebookToPdf',
    label: 'eBook to PDF',
    helper: 'Convert EPUB and MOBI eBook files into printable, formatted PDF documents.',
    title: 'Convert EPUB to PDF Online Free - eBook to PDF',
    description: 'Convert EPUB and digital eBook files into formatted, printable PDF documents with custom margins and page sizes.',
    keywords: ['epub to pdf', 'ebook to pdf', 'convert epub to pdf online', 'mobi to pdf'],
    bulletPoints: ['Extracts chapters and text hierarchy', 'Formatted A4 / US Letter pagination', 'Zero file size limits', '100% offline'],
    benefitsTitle: 'Why convert EPUB to PDF',
    benefits: [
      { title: 'Print Any eBook', description: 'Create printable physical copies of digital books and articles.' },
      { title: 'Universal Viewing', description: 'Open eBooks on computers and devices without specialized reader software.' },
      { title: 'Total Privacy', description: 'Personal reading files stay on your device.' },
    ],
    howToTitle: 'How to convert EPUB to PDF',
    howToSteps: ['Upload your .epub eBook file.', 'Click Convert to PDF to download.'],
    useCases: ['Printing digital study materials', 'Converting eBooks for annotation in PDF viewers', 'Archiving digital books'],
  },


  whiteboard: {
    key: 'whiteboard',
    label: 'Collaborative Whiteboard',
    helper: 'Mark up and review PDFs on a real-time interactive canvas with drawing tools.',
    title: 'Collaborative PDF Whiteboard Online Free',
    description: 'Draw, sketch, annotate, and brainstorm directly over PDF pages with an interactive collaborative whiteboard.',
    keywords: ['pdf whiteboard', 'annotate pdf whiteboard', 'collaborative pdf canvas', 'draw on pdf online'],
    bulletPoints: ['Pen, highlighter, eraser, and shapes', 'Multi-layer drawing canvas', 'Export marked pages to PDF', '100% client-side'],
    benefitsTitle: 'Why use the PDF whiteboard',
    benefits: [
      { title: 'Interactive Brainstorming', description: 'Sketch ideas directly on architectural plans, diagrams, and drafts.' },
      { title: 'Full Drawing Toolbox', description: 'Switch easily between precision pens, broad highlighters, and shapes.' },
      { title: 'Export with Markups', description: 'Download your finalized whiteboard annotations as a high-res PDF.' },
    ],
    howToTitle: 'How to use the PDF whiteboard',
    howToSteps: ['Upload your PDF document.', 'Use drawing tools to sketch and annotate on pages.', 'Export your marked PDF.'],
    useCases: ['Reviewing architectural blueprints', 'Teaching and grading homework', 'Brainstorming UI wireframes'],
  },
  gstInvoice: {
    key: 'gstInvoice',
    label: 'GST Invoice Generator',
    helper: 'Generate compliant Indian GST tax invoices with CGST/SGST/IGST breakdown and HSN table.',
    title: 'Indian GST Invoice Generator Online Free - Tax Invoice PDF',
    description: 'Create GST-compliant tax invoice PDFs with auto-calculated CGST, SGST, IGST, HSN/SAC codes, and bank details.',
    keywords: ['gst invoice generator', 'free gst invoice online', 'indian gst tax invoice pdf', 'gst billing software free'],
    bulletPoints: ['Auto CGST/SGST vs IGST calculation', 'HSN/SAC summary table', 'Clean A4 tax invoice layout', '100% private in browser'],
    benefitsTitle: 'Why generate GST invoices here',
    benefits: [
      { title: '100% GST Compliant', description: 'Follows Indian GST tax invoice rules with proper supplier/buyer GSTINs and tax breakdowns.' },
      { title: 'Zero Signup Required', description: 'Generate and download invoices instantly without monthly software subscriptions.' },
      { title: 'Financial Privacy', description: 'Client billing details and revenues are never stored on any server.' },
    ],
    howToTitle: 'How to generate a GST invoice',
    howToSteps: ['Enter seller and buyer GST details.', 'Add line items, rates, and tax percentages.', 'Click Generate Tax Invoice PDF.'],
    useCases: ['Freelancer and consultant billing', 'Small business B2B invoicing', 'E-commerce tax receipt generation'],
  },
  posBilling: {
    key: 'posBilling',
    label: 'POS Billing',
    helper: 'Tap products to build a bill, then generate a GST 58mm/80mm/A4 receipt instantly.',
    title: 'POS Receipt Generator Online Free - 58mm/80mm Thermal Bill',
    description: 'Generate point-of-sale thermal receipts and retail bills in 58mm, 80mm, or A4 formats directly in your browser.',
    keywords: ['pos receipt generator', 'thermal receipt pdf', 'retail billing software free', '58mm receipt generator'],
    bulletPoints: ['58mm and 80mm thermal roll formats', 'Itemized cart with tax and discounts', 'Instant 1-click PDF download', '100% offline'],
    benefitsTitle: 'Why use our POS receipt generator',
    benefits: [
      { title: 'Thermal Printer Ready', description: 'Pre-formatted to fit standard 58mm and 80mm ESC/POS thermal printers.' },
      { title: 'Lightning Fast', description: 'Type items and print receipts in seconds with zero delay.' },
      { title: 'Completely Free', description: 'Zero recurring fees or hardware lock-in.' },
    ],
    howToTitle: 'How to generate a POS receipt',
    howToSteps: ['Enter your store name and receipt number.', 'Add purchased items and prices.', 'Click Generate POS Receipt.'],
    useCases: ['Cafes, coffee shops, and bakeries', 'Pop-up stores and retail boutiques', 'Quick payment acknowledgment'],
  },
};

export function getOperationsEnContent(): Record<OperationKey, OperationContent> {
  const result = {} as Record<OperationKey, OperationContent>;
  for (const key of ALL_OPERATION_KEYS) {
    const item = OPERATIONS_CATALOG[key];
    result[key] = {
      key,
      slug: key === 'pdfToImages' ? 'pdf-to-jpg' : key === 'imagesToPdf' ? 'jpg-to-pdf' : key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase(),
      mode: key,
      meta: {
        title: item.title,
        description: item.description,
        keywords: item.keywords,
        ogTitle: `${item.title} | ihatelovepdf`,
        ogDescription: item.description,
        ogImageAlt: item.title,
      },
      hero: {
        title: item.title,
        description: item.description,
        bulletPoints: item.bulletPoints,
        imageAlt: item.title,
      },
      benefitsTitle: item.benefitsTitle,
      benefits: item.benefits,
      howTo: {
        title: item.howToTitle,
        steps: item.howToSteps,
        note: '100% client-side local processing. Zero server uploads.',
      },
      useCasesTitle: `When to use ${item.label}`,
      useCases: item.useCases,
    };
  }
  return result;
}

export function getOperationsLocalized(
  locale: Locale,
  localizedMap?: Partial<Record<OperationKey, OperationContent>>
): Record<OperationKey, OperationContent> {
  const enContent = getOperationsEnContent();
  const result = {} as Record<OperationKey, OperationContent>;

  for (const key of ALL_OPERATION_KEYS) {
    if (localizedMap && localizedMap[key]) {
      result[key] = localizedMap[key]!;
    } else {
      // Fallback with correct localized path
      result[key] = {
        ...enContent[key],
        slug: getOperationPath(locale, key).replace(`/${locale}/`, '').replace('/', ''),
      };
    }
  }
  return result;
}

export function getOperationsRoutes(locale: Locale): Record<OperationKey, string> {
  const result = {} as Record<OperationKey, string>;
  for (const key of ALL_OPERATION_KEYS) {
    result[key] = getOperationPath(locale, key);
  }
  return result;
}

export function getOperationsFooterLabels(locale?: Locale): Record<OperationKey, string> {
  void locale;
  const result = {} as Record<OperationKey, string>;
  for (const key of ALL_OPERATION_KEYS) {
    result[key] = OPERATIONS_CATALOG[key]?.label || key;
  }
  return result;
}

export function getOperationsModeLabels(locale?: Locale): Record<OperationKey, { label: string; helper: string }> {
  void locale;
  const result = {} as Record<OperationKey, { label: string; helper: string }>;
  for (const key of ALL_OPERATION_KEYS) {
    const item = OPERATIONS_CATALOG[key];
    result[key] = {
      label: item?.label || key,
      helper: item?.helper || '',
    };
  }
  return result;
}

export function getOperationsDownloadNames(locale?: Locale): Record<OperationKey, string> {
  void locale;
  const result = {} as Record<OperationKey, string>;
  for (const key of ALL_OPERATION_KEYS) {
    result[key] = `${key}_ihatelovepdf`;
  }
  return result;
}

