import { OperationKey } from '../types/operations';
import { OperationContent } from './dictionaries/operation-types';
import { Locale } from './config';
import { getOperationPath } from './routing';
import { TOOL_FAQS } from '../lib/tool-faqs';

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
  'editPdf',
  'scanToPdf',
  'markdownToPdf',
  'htmlToPdf',
  'csvToPdf',
  'createPdf',
  'excelToPdf',
  'pdfToExcel',
  'pdfToWord',
  'powerpointToPdf',
  'pdfToPowerpoint',
  'pdfToHtml',
  'pdfToEpub',
  'ebookToPdf',
  'whiteboard',
  'gstInvoice',
  'posBilling',
  'signPdf',
  'fillPdfForm',
  'wordToPdf',
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
    title: 'Merge PDF Online Free - No Watermark, No Sign-Up',
    description: 'Combine multiple PDF files into one clean document with no watermark, no sign-up, and zero server uploads. Runs directly in your browser with unlimited merges.',
    keywords: ['merge pdf', 'combine pdf', 'join pdf', 'merge pdf online free', 'pdf merger'],
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Runs in your browser & no sign-up required', 'Unlimited file merging'],
    benefitsTitle: 'Why merge PDFs with ihatelovepdf',
    benefits: [
      { title: 'Fast Processing', description: 'Combines pages instantly right inside your browser.' },
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
    title: 'Compress PDF Online Free - No Watermark, No Upload',
    description: 'Reduce PDF size up to 90% without watermark or quality loss. Runs locally in your browser with zero server uploads, runs in your browser, and offers unlimited compression.',
    keywords: ['compress pdf', 'reduce pdf size', 'shrink pdf', 'pdf compressor online free'],
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Runs in your browser & no sign-up', 'Unlimited document compression'],
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
    title: 'Split PDF Pages Online Free - No Watermark, No Sign-Up',
    description: 'Split PDF into individual pages or custom ranges with no watermark and no registration. Zero server uploads, runs in your browser with unlimited tasks.',
    keywords: ['split pdf', 'separate pdf pages', 'divide pdf', 'split pdf online'],
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Runs in your browser & no sign-up required', 'Unlimited page splitting'],
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
    title: 'Extract PDF Pages Free - No Watermark, No Sign-Up',
    description: 'Extract specific pages or page ranges from any PDF with no watermark, no sign-up, and zero server uploads. Fast, private, and runs in your browser.',
    keywords: ['extract pdf pages', 'pull pages from pdf', 'save specific pages from pdf'],
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Runs in your browser & no sign-up required', 'Unlimited page extraction'],
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
    title: 'Crop and Resize PDF Free - No Watermark, No Upload',
    description: 'Crop margins and adjust page dimensions with no watermark, no sign-up, and zero server uploads. Runs 100% offline in your browser with unlimited tasks.',
    keywords: ['crop pdf', 'trim pdf margins', 'crop pdf pages online free'],
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Runs in your browser & no sign-up required', 'Unlimited document cropping'],
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
    title: 'Rotate PDF Pages Free - No Watermark, Runs in Browser',
    description: 'Permanently rotate PDF pages clockwise or counter-clockwise with no watermark, no sign-up, and zero server uploads. Unlimited tasks, runs in your browser.',
    keywords: ['rotate pdf', 'turn pdf pages', 'fix upside down pdf', 'rotate pdf 90 degrees'],
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Runs in your browser & no sign-up required', 'Unlimited page rotation'],
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
    title: 'Reorder PDF Pages Free - No Watermark, No Sign-Up',
    description: 'Drag and rearrange PDF page sequence with no watermark, no account, and zero server uploads. Unlimited tasks, runs in your browser.',
    keywords: ['reorder pdf', 'rearrange pdf pages', 'change pdf page order', 'sort pdf pages'],
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Runs in your browser & no sign-up required', 'Unlimited page reordering'],
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
    title: 'PDF to Images Converter Free - No Watermark, No Upload',
    description: 'Convert PDF pages into high-resolution PNG or JPEG images with no watermark, no sign-up, and zero server uploads. Fast, offline-capable, and unlimited.',
    keywords: ['pdf to jpg', 'pdf to png', 'convert pdf to images', 'pdf to image online free'],
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Runs in your browser & no sign-up required', 'Unlimited image conversions'],
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
    title: 'Images to PDF Converter Free - No Watermark, No Sign-Up',
    description: 'Convert JPG, PNG, and WebP images into a PDF document with no watermark, no sign-up, and zero server uploads. Unlimited tasks, runs in your browser.',
    keywords: ['jpg to pdf', 'images to pdf', 'png to pdf', 'convert photos to pdf online'],
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Runs in your browser & no sign-up required', 'Unlimited image conversions'],
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
    title: 'Add Watermark to PDF Free - No Sign-Up, Runs in Browser',
    description: 'Stamp custom text or image watermarks across PDF pages with opacity control, zero server uploads, and no account needed. Runs in your browser with unlimited tasks.',
    keywords: ['watermark pdf', 'add watermark to pdf online', 'stamp pdf', 'confidential watermark pdf', 'draft watermark'],
    bulletPoints: ['Custom text or logo stamp', 'Zero server uploads (100% private)', 'Runs in your browser & no sign-up required', 'Unlimited document stamping'],
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
    title: 'Add Page Numbers to PDF Free - No Watermark, No Sign-Up',
    description: 'Insert customizable page numbering into your PDF documents with no watermark, no sign-up, and zero server uploads. Runs in your browser with unlimited tasks.',
    keywords: ['add page numbers to pdf', 'number pdf pages online', 'pdf pagination', 'page numbering tool'],
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Runs in your browser & no sign-up required', 'Unlimited page numbering'],
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
    title: 'Add Headers & Footers to PDF Free - No Watermark',
    description: 'Add header and footer text, page counters, and timestamps to any PDF with no watermark, no sign-up, and zero server uploads. Runs in your browser.',
    keywords: ['add header to pdf', 'add footer to pdf', 'pdf header footer online', 'stamp header on pdf'],
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Runs in your browser & no sign-up required', 'Unlimited document headers'],
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
    title: 'Extract Text from PDF Free - No Watermark, No Sign-Up',
    description: 'Extract readable text and perform OCR from PDF pages with no watermark, no registration, and zero server uploads. 100% offline and unlimited.',
    keywords: ['extract text from pdf', 'pdf to txt online free', 'copy text from pdf', 'pdf text extractor'],
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Runs in your browser & no sign-up required', 'Unlimited text extraction'],
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
    title: 'Invert PDF Colors for Dark Mode Free - No Watermark',
    description: 'Convert bright white PDF pages into Dark Mode, Sepia, or High Contrast with no watermark, no sign-up, and zero server uploads. Runs in your browser.',
    keywords: ['invert pdf colors', 'pdf dark mode', 'dark mode pdf converter', 'pdf sepia mode', 'high contrast pdf'],
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Runs in your browser & no sign-up required', 'Unlimited reading comfort'],
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
    title: 'Redact PDF Online Free - No Watermark, Zero Uploads',
    description: 'Permanently black out sensitive text, SSNs, and numbers with no watermark, no sign-up, and zero server uploads. 100% private and offline-capable.',
    keywords: ['redact pdf', 'black out pdf text', 'censor pdf', 'permanent pdf redaction', 'remove sensitive info pdf'],
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Runs in your browser & no sign-up required', 'Unlimited document redactions'],
    benefitsTitle: 'Why redact PDFs with ihatelovepdf',
    benefits: [
      { title: 'Irreversible Redaction', description: 'Underlying text is deleted from the stream so it cannot be highlighted or copied.' },
      { title: 'Interactive Visual Editor', description: 'Draw exact redaction rectangles directly on page previews.' },
      { title: 'Local Device Isolation', description: 'Your documents are processed on your device and are never sent to our servers.' },
    ],
    howToTitle: 'How to redact a PDF',
    howToSteps: ['Upload the PDF file.', 'Draw rectangles over sensitive names, numbers, or figures.', 'Click Apply Redactions.'],
    useCases: ['Masking SSNs, tax IDs, and credit cards', 'Censoring witness identities in legal filings', 'Sharing sanitized research reports'],
  },

  compare: {
    key: 'compare',
    label: 'Compare PDFs',
    helper: 'Compare two PDF revisions side-by-side with synchronized scrolling and page jump.',
    title: 'Compare Two PDF Files Free - No Sign-Up, Zero Uploads',
    description: 'Compare two PDF revisions side-by-side in your browser with synchronized scrolling, no account required, and zero server uploads. Runs in your browser.',
    keywords: ['compare pdf', 'pdf diff online free', 'compare two pdf files', 'pdf revision comparator'],
    bulletPoints: ['Synchronized side-by-side view', 'Zero server uploads (100% private)', 'Runs in your browser & no sign-up required', 'Unlimited revision checks'],
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
    title: 'Convert PDF to ZIP Online Free - No Sign-Up, Runs in Browser',
    description: 'Package and bundle single or multiple PDF documents into a clean ZIP archive with no watermark, no account, and zero server uploads. 100% private.',
    keywords: ['pdf to zip', 'package pdf to zip', 'bundle pdf archive', 'compress pdf to zip'],
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Runs in your browser & no sign-up required', 'Unlimited archive bundling'],
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

  encrypt: {
    key: 'encrypt',
    label: 'Protect / Encrypt PDF',
    helper: 'Add robust AES-256 password protection and permission restrictions to your PDF documents.',
    title: 'Protect and Encrypt PDF Free - No Sign-Up, Zero Uploads',
    description: 'Secure your PDF files with AES-256 password encryption directly in your browser with no sign-up and zero server uploads. Runs in your browser with unlimited tasks.',
    keywords: ['encrypt pdf', 'password protect pdf', 'protect pdf online', 'aes 256 pdf encryption', 'lock pdf with password'],
    bulletPoints: ['Standard AES-256 encryption', 'Zero server uploads (100% private)', 'Runs in your browser & no sign-up required', 'Unlimited document encryption'],
    benefitsTitle: 'Why encrypt PDFs with ihatelovepdf',
    benefits: [
      { title: 'AES-256 Encryption', description: 'Standard Advanced Encryption Standard with 256-bit keys. Trusted worldwide for sensitive documents.' },
      { title: 'In-Browser Encryption', description: 'All encryption happens locally in your browser. Your PDF file and password never travel over the internet, keeping everything private on your device.' },
      { title: 'Password Strength Validation', description: 'Real-time password strength meter analyzes your password for length, complexity, and common patterns to ensure maximum security against attacks.' },
      { title: 'Instant Processing', description: 'Fast encryption completes in seconds. No waiting and no queues. Your encrypted PDF is ready to download immediately after processing.' },
    ],
    howToTitle: 'How to Encrypt PDF with Password',
    howToSteps: [
      'Upload PDF: Select the PDF file you want to password protect.',
      'Create Password: Enter a strong password using 12 or more characters with mixed case, numbers, and symbols.',
      'Confirm Password: Re-enter your password to prevent typos.',
      'Download Encrypted PDF: Get your password-protected PDF file instantly.',
    ],
    useCases: [
      'Protecting confidential financial statements, payroll, and tax records',
      'Securing legal contracts and NDAs before email transmission',
      'Locking intellectual property, eBooks, and medical documents',
    ],
  },

  decrypt: {
    key: 'decrypt',
    label: 'Unlock / Decrypt PDF',
    helper: 'Remove password security and permission locks from your PDF files.',
    title: 'Unlock and Decrypt PDF Free - No Sign-Up, Runs in Browser',
    description: 'Remove password security and permission locks from PDF files you own with no watermark, no registration, and zero cloud uploads. Runs in your browser.',
    keywords: ['unlock pdf', 'remove password from pdf', 'decrypt pdf online', 'remove pdf restrictions'],
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Runs in your browser & no sign-up required', 'Unlimited password unlocking'],
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
    title: 'Edit PDF Online Free - No Watermark, No Sign-Up',
    description: 'Annotate, draw, highlight, and add text to PDF documents with no watermark, no account, and zero server uploads. Runs in your browser with unlimited tasks.',
    keywords: ['edit pdf', 'annotate pdf', 'add text to pdf online', 'pdf editor free'],
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Runs in your browser & no sign-up required', 'Unlimited document editing'],
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
    title: 'Scan to PDF Free - No Watermark, Runs in Browser',
    description: 'Capture multi-page paper documents using your camera or webcam with no watermark, no app install, and zero server uploads. Runs in your browser.',
    keywords: ['scan to pdf', 'camera scanner online', 'webcam pdf scanner', 'document scanner browser'],
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Runs in your browser & no sign-up required', 'Unlimited camera scans'],
    benefitsTitle: 'Why scan with your browser',
    benefits: [
      { title: 'No App Install Needed', description: 'Scan receipts and papers directly from your browser on any phone or laptop.' },
      { title: 'Automatic Contrast Boost', description: 'Converts dim photos into clean black and white scanner pages.' },
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
    title: 'Markdown to PDF Converter Free - No Watermark, No Sign-Up',
    description: 'Transform Markdown notes, code blocks, and tables into clean PDF files with no watermark, no account, and zero server uploads. Runs in your browser.',
    keywords: ['markdown to pdf', 'convert md to pdf', 'markdown document converter', 'markdown print pdf'],
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Runs in your browser & no sign-up required', 'Unlimited document exports'],
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
    title: 'HTML to PDF Converter Free - No Watermark, No Sign-Up',
    description: 'Render HTML markup and web snippets into clean PDF pages with no watermark, no sign-up, and zero server uploads. Fast and runs in your browser.',
    keywords: ['html to pdf', 'convert html to pdf online', 'web page to pdf', 'save html as pdf'],
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Runs in your browser & no sign-up required', 'Unlimited HTML conversions'],
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
    title: 'CSV to PDF Converter Free - No Watermark, Runs in Browser',
    description: 'Convert CSV datasets into clean, formatted PDF tables with no watermark, no registration, and zero server uploads. 100% private and unlimited.',
    keywords: ['csv to pdf', 'convert csv to pdf online', 'csv table to pdf', 'spreadsheet to pdf'],
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Runs in your browser & no sign-up required', 'Unlimited spreadsheet exports'],
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
    label: 'Create PDF',
    helper: 'Design custom PDFs with text, images, shapes, tables, and presets in a visual canvas.',
    title: 'Create PDF Online Free - No Watermark, No Sign-Up',
    description: 'Design custom PDF documents with text, images, shapes, and tables with no watermark, no registration, and zero server uploads. Runs in your browser.',
    keywords: ['create pdf', 'create pdf online', 'design pdf online', 'pdf canvas creator', 'new pdf document'],
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Runs in your browser & no sign-up required', 'Unlimited document creation'],
    benefitsTitle: 'Why create PDFs with ihatelovepdf',
    benefits: [
      { title: 'Visual Drag & Drop Canvas', description: 'Easily place and resize text blocks, images, shapes, and tables.' },
      { title: 'Built-in Document Presets', description: 'Start from scratch or use invoices, letterheads, and certificates.' },
      { title: '100% Local Processing', description: 'Your documents, text, and graphics are processed entirely in memory.' },
    ],
    howToTitle: 'How to create a PDF from scratch',
    howToSteps: ['Select a page preset or start with a blank page.', 'Add text, shapes, images, or tables from the toolbar.', 'Click "Export PDF" to generate and download your document.'],
    useCases: ['Designing invoices, quotes, and receipts', 'Creating custom letterheads and official notices', 'Generating awards and certificates'],
  },
  excelToPdf: {
    key: 'excelToPdf',
    label: 'Excel to PDF',
    helper: 'Convert XLSX and XLS spreadsheets into formatted PDF table reports.',
    title: 'Excel to PDF Converter Free - No Watermark, No Sign-Up',
    description: 'Convert Microsoft Excel (.xlsx, .xls) spreadsheets into clean PDF documents with no watermark, no account, and zero server uploads. 100% private.',
    keywords: ['excel to pdf', 'xlsx to pdf', 'convert excel to pdf online free', 'xls to pdf'],
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Runs in your browser & no sign-up required', 'Unlimited Excel conversions'],
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
    title: 'PDF to Excel Converter Free - No Watermark, No Sign-Up',
    description: 'Extract tabular data from PDF files into editable Microsoft Excel spreadsheets (.xlsx) with no watermark, no account, and zero server uploads.',
    keywords: ['pdf to excel', 'convert pdf to excel online free', 'pdf to xlsx', 'extract table from pdf'],
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Runs in your browser & no sign-up required', 'Unlimited XLSX exports'],
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
  pdfToWord: {
    key: 'pdfToWord',
    label: 'PDF to Word',
    helper: 'Convert PDF documents to editable Microsoft Word (.docx) files.',
    title: 'PDF to Word Converter Free - No Watermark, No Sign-Up',
    description: 'Convert PDF files to editable Microsoft Word (.docx) documents with no watermark, no registration, and zero cloud uploads. Private and unlimited.',
    keywords: ['pdf to word', 'convert pdf to word', 'pdf to docx', 'convert pdf to docx free', 'pdf to editable word online'],
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Runs in your browser & no sign-up required', 'Unlimited DOCX conversions'],
    benefitsTitle: 'Why convert PDF to Word with ihatelovepdf',
    benefits: [
      { title: 'Re-edit Static Documents', description: 'Unlock text from locked PDFs and edit directly in Microsoft Word, Google Docs, or LibreOffice.' },
      { title: 'Preserve Structural Elements', description: 'Reconstructs headings, body paragraphs, bullet lists, and embedded images.' },
      { title: '100% Private & Confidential', description: 'Legal contracts, resumes, and personal documents never leave your browser.' },
    ],
    howToTitle: 'How to convert PDF to Word',
    howToSteps: ['Upload your PDF file.', 'Click Convert to Word to generate your editable .docx document.', 'Download your Word file instantly.'],
    useCases: ['Editing resumes and CVs received as PDF', 'Updating contracts and agreements without original source files', 'Re-purposing reports and essays into editable documents'],
  },
  wordToPdf: {
    key: 'wordToPdf',
    label: 'Word to PDF',
    helper: 'Convert Word documents (.docx) to PDF with selectable text.',
    title: 'Word to PDF Converter Free - No Watermark, No Sign-Up',
    description: 'Convert Microsoft Word (.docx) documents to PDF with selectable text, no watermark, no registration, and zero server uploads. Private and unlimited.',
    keywords: ['word to pdf', 'convert word to pdf', 'docx to pdf', 'convert docx to pdf free', 'word document to pdf online'],
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Runs in your browser & no sign-up required', 'Unlimited Word conversions'],
    benefitsTitle: 'Why convert Word to PDF with ihatelovepdf',
    benefits: [
      { title: 'Universal Compatibility', description: 'Transform editable Word documents into pristine PDFs readable on any device or operating system.' },
      { title: 'Preserve Layout & Typography', description: 'Maintains font hierarchies, bullet lists, tables, and inline images with high fidelity.' },
      { title: '100% Private & Confidential', description: 'Your business reports, letters, and confidential Word documents never leave your computer.' },
    ],
    howToTitle: 'How to convert Word to PDF',
    howToSteps: ['Upload your Word (.docx) file.', 'Click Convert to PDF to generate your document.', 'Download your PDF instantly.'],
    useCases: ['Converting resumes and cover letters for job applications', 'Exporting contracts and agreements to locked PDF format', 'Preparing academic papers and reports for printing and sharing'],
  },
  powerpointToPdf: {
    key: 'powerpointToPdf',
    label: 'PowerPoint to PDF',
    helper: 'Convert PPTX slide decks into printable PDF documents.',
    title: 'PowerPoint to PDF Free - No Watermark, No Sign-Up',
    description: 'Convert PPTX slide decks into printable PDF handouts with no watermark, no account, and zero server uploads. Runs in your browser with unlimited tasks.',
    keywords: ['powerpoint to pdf', 'pptx to pdf', 'convert ppt to pdf online free', 'presentation to pdf'],
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Runs in your browser & no sign-up required', 'Unlimited PPTX conversions'],
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
    title: 'PDF to PowerPoint Free - No Watermark, No Sign-Up',
    description: 'Transform PDF pages into editable PowerPoint (.pptx) slides with no watermark, no registration, and zero server uploads. Runs in your browser with unlimited tasks.',
    keywords: ['pdf to powerpoint', 'pdf to pptx', 'convert pdf to slides', 'pdf presentation converter'],
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Runs in your browser & no sign-up required', 'Unlimited PPTX conversions'],
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
    title: 'PDF to HTML Converter Free - No Watermark, Runs in Browser',
    description: 'Convert PDF document pages into responsive HTML code with no watermark, no account, and zero server uploads. Runs in your browser with unlimited tasks.',
    keywords: ['pdf to html', 'convert pdf to html online', 'pdf to web page', 'publish pdf as html'],
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Runs in your browser & no sign-up required', 'Unlimited web exports'],
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
    title: 'PDF to EPUB Converter Free - No Watermark, Runs in Browser',
    description: 'Transform PDF documents into reflowable EPUB eBooks for Kindle and e-readers with no watermark, no sign-up, and zero server uploads.',
    keywords: ['pdf to epub', 'convert pdf to epub online free', 'pdf to ebook', 'read pdf on kindle'],
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Runs in your browser & no sign-up required', 'Unlimited eBook conversions'],
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
    title: 'EPUB to PDF Converter Free - No Watermark, Runs in Browser',
    description: 'Convert EPUB and digital eBook files into formatted, printable PDF documents with no watermark, no account, and zero server uploads. 100% private.',
    keywords: ['epub to pdf', 'ebook to pdf', 'convert epub to pdf online', 'mobi to pdf'],
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Runs in your browser & no sign-up required', 'Unlimited eBook printing'],
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
    title: 'PDF Whiteboard Free - No Watermark, Runs in Browser',
    description: 'Mark up, draw, and brainstorm directly over PDF pages on an interactive whiteboard with no watermark, no account, and zero server uploads.',
    keywords: ['pdf whiteboard', 'annotate pdf whiteboard', 'collaborative pdf canvas', 'draw on pdf online'],
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Runs in your browser & no sign-up required', 'Unlimited whiteboard markups'],
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
    helper: 'Generate standard Indian GST tax invoices with CGST/SGST/IGST breakdown and HSN table.',
    title: 'GST Invoice Generator Free - No Watermark, Runs in Browser',
    description: 'Generate standard GST tax invoices with auto-calculated CGST/SGST/IGST and HSN table with no watermark, no sign-up, and zero server uploads.',
    keywords: ['gst invoice generator', 'free gst invoice online', 'indian gst tax invoice pdf', 'gst billing software free'],
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Runs in your browser & no sign-up required', 'Unlimited invoice generation'],
    benefitsTitle: 'Why generate GST invoices here',
    benefits: [
      { title: 'Standard GST Format', description: 'Follows Indian GST tax invoice rules with proper supplier/buyer GSTINs and tax breakdowns.' },
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
    title: 'POS Receipt Generator Free - No Watermark, Runs in Browser',
    description: 'Generate thermal point-of-sale receipts in 58mm, 80mm, or A4 formats with no watermark, no registration, and zero server uploads. 100% offline.',
    keywords: ['pos receipt generator', 'thermal receipt pdf', 'retail billing software free', '58mm receipt generator'],
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Runs in your browser & no sign-up required', 'Unlimited receipt generation'],
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
  signPdf: {
    key: 'signPdf',
    label: 'Sign PDF',
    helper: 'Sign PDF documents with digital signatures, typed cursive script, or uploaded signature stamps.',
    title: 'Sign PDF Online Free - No Watermark, No Account',
    description: 'Draw or type your signature and sign contracts with no watermark, no sign-up, and zero server uploads. Runs in your browser with unlimited signatures.',
    keywords: ['sign pdf', 'sign pdf online free', 'electronic signature pdf', 'draw signature on pdf', 'fill and sign pdf free'],
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Runs in your browser & no sign-up required', 'Unlimited document signatures'],
    benefitsTitle: 'Why sign PDFs locally',
    benefits: [
      { title: 'Legally Sound E-Signatures', description: 'Create clean, vector-sharp electronic signatures adhering to standard e-sign practices.' },
      { title: 'Zero Cloud Storage', description: 'Your contracts, legal deeds, and private agreements never leave your browser.' },
      { title: 'Multi-Signature Workflow', description: 'Place signatures, initials, dates, and approval stamps across any page effortlessly.' },
    ],
    howToTitle: 'How to sign a PDF document',
    howToSteps: ['Upload your PDF document.', 'Draw, type, or upload your signature.', 'Drag your signature onto the desired page location and download.'],
    useCases: ['Signing contracts and NDAs', 'Authorizing purchase orders and invoices', 'Endorsing tax forms and employment agreements'],
  },
  fillPdfForm: {
    key: 'fillPdfForm',
    label: 'Fill PDF Form',
    helper: 'Fill out PDF forms, check boxes, select dropdowns, and add custom text directly in your browser.',
    title: 'Fill PDF Forms Online Free - No Watermark, No Sign-Up',
    description: 'Fill out interactive AcroForm PDF forms with no watermark, no registration, and zero server uploads. Fast, private, runs in your browser, and unlimited.',
    keywords: ['fill pdf form', 'fill out pdf form free', 'complete pdf forms online', 'edit pdf form fields', 'flatten pdf form'],
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Runs in your browser & no sign-up required', 'Unlimited form filling'],
    benefitsTitle: 'Why fill PDF forms locally',
    benefits: [
      { title: 'Interactive Form Field Detection', description: 'Automatically maps native PDF AcroForm fields for rapid tab-and-fill completion.' },
      { title: 'Click & Type Fallback', description: 'Type anywhere on scanned or non-interactive PDFs with custom fonts, sizes, and colors.' },
      { title: 'Form Flattening Security', description: 'Permanently lock entered data and signatures into page streams so values cannot be altered.' },
    ],
    howToTitle: 'How to fill a PDF form',
    howToSteps: ['Upload your PDF form.', 'Fill detected AcroForm fields or click anywhere on the page to type custom text.', 'Toggle flattening if desired and click Fill & Download PDF.'],
    useCases: ['Completing government, tax, and visa applications', 'Filling medical intake and patient registration forms', 'Entering employment verification and insurance claim details'],
  },
  latexResume: {
    key: 'latexResume',
    label: 'LaTeX Resume Builder',
    helper: 'Create ATS friendly resumes using authentic LaTeX templates, live PDF preview, and source code export.',
    title: 'LaTeX Resume Builder Free - No Watermark, No Sign-Up',
    description: 'Build ATS-friendly resumes with authentic LaTeX templates with no watermark, no registration, and zero server uploads. Export PDF & .tex source free.',
    keywords: ['latex resume builder', 'latex cv generator online', 'jakes resume online', 'ats friendly resume builder', 'free latex resume'],
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Runs in your browser & no sign-up required', 'Unlimited resume builds'],
    benefitsTitle: 'Why build resumes with LaTeX',
    benefits: [
      { title: 'Clean ATS Parsing', description: 'Standard LaTeX layouts generate clean single-column text trees that ATS scanners can parse accurately.' },
      { title: 'Dual-Mode Editing', description: 'Easily fill out simple guided form fields or take full control by customizing raw LaTeX code directly.' },
      { title: 'Zero Cloud Compilation', description: 'Your private career history, phone number, and address never touch external compile servers.' },
    ],
    howToTitle: 'How to create a LaTeX resume',
    howToSteps: ['Choose an ATS template (Jakes Resume, Corporate, Modern, or Academic).', 'Fill in your personal details, work history, education, skills, and projects.', 'Preview the vector PDF in real time, then download your PDF or .tex source.'],
    useCases: ['Software engineers and developers applying for tech roles', 'Finance, consulting, and corporate executive applications', 'Academic faculty, postdoctoral, and graduate researcher CVs'],
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
        note: 'Runs completely in your browser. No files are uploaded to any server.',
      },
      useCasesTitle: `When to use ${item.label}`,
      useCases: item.useCases,
      faqs: TOOL_FAQS[key] || [],
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

