const fs = require('fs');
const path = require('path');

const catalogPath = path.join(__dirname, '..', 'src', 'i18n', 'operations-catalog.ts');
let content = fs.readFileSync(catalogPath, 'utf-8');

const updates = {
  merge: {
    title: 'Merge PDF Online Free - No Watermark, No Sign-Up',
    description: 'Combine multiple PDF files into one clean document with no watermark, no sign-up, and zero server uploads. Works offline in browser with unlimited merges.',
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Works offline & no sign-up required', 'Unlimited file merging'],
  },
  compress: {
    title: 'Compress PDF Online Free - No Watermark, No Upload',
    description: 'Reduce PDF size up to 90% without watermark or quality loss. Runs locally in your browser with zero server uploads, works offline, and offers unlimited compression.',
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Works offline & no sign-up', 'Unlimited document compression'],
  },
  split: {
    title: 'Split PDF Pages Online Free - No Watermark, No Sign-Up',
    description: 'Split PDF into individual pages or custom ranges with no watermark and no registration. Zero server uploads, works offline with unlimited tasks.',
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Works offline & no sign-up required', 'Unlimited page splitting'],
  },
  extract: {
    title: 'Extract PDF Pages Free - No Watermark, No Sign-Up',
    description: 'Extract specific pages or page ranges from any PDF with no watermark, no sign-up, and zero server uploads. Fast, private, and works offline.',
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Works offline & no sign-up required', 'Unlimited page extraction'],
  },
  crop: {
    title: 'Crop and Resize PDF Free - No Watermark, No Upload',
    description: 'Crop margins and adjust page dimensions with no watermark, no sign-up, and zero server uploads. Runs 100% offline in your browser with unlimited tasks.',
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Works offline & no sign-up required', 'Unlimited document cropping'],
  },
  rotate: {
    title: 'Rotate PDF Pages Free - No Watermark, Works Offline',
    description: 'Permanently rotate PDF pages clockwise or counter-clockwise with no watermark, no sign-up, and zero server uploads. Unlimited tasks, works offline.',
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Works offline & no sign-up required', 'Unlimited page rotation'],
  },
  reorder: {
    title: 'Reorder PDF Pages Free - No Watermark, No Sign-Up',
    description: 'Drag and rearrange PDF page sequence with no watermark, no account, and zero server uploads. Unlimited tasks, works offline in your browser.',
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Works offline & no sign-up required', 'Unlimited page reordering'],
  },
  pdfToImages: {
    title: 'PDF to Images Converter Free - No Watermark, No Upload',
    description: 'Convert PDF pages into high-resolution PNG or JPEG images with no watermark, no sign-up, and zero server uploads. Fast, offline-capable, and unlimited.',
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Works offline & no sign-up required', 'Unlimited image conversions'],
  },
  imagesToPdf: {
    title: 'Images to PDF Converter Free - No Watermark, No Sign-Up',
    description: 'Convert JPG, PNG, and WebP images into a PDF document with no watermark, no sign-up, and zero server uploads. Unlimited tasks, works offline.',
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Works offline & no sign-up required', 'Unlimited image conversions'],
  },
  watermark: {
    title: 'Add Watermark to PDF Free - No Sign-Up, Works Offline',
    description: 'Stamp custom text or image watermarks across PDF pages with opacity control, zero server uploads, and no account needed. Works offline and unlimited.',
    bulletPoints: ['Custom text or logo stamp', 'Zero server uploads (100% private)', 'Works offline & no sign-up required', 'Unlimited document stamping'],
  },
  pageNumbers: {
    title: 'Add Page Numbers to PDF Free - No Watermark, No Sign-Up',
    description: 'Insert customizable page numbering into your PDF documents with no watermark, no sign-up, and zero server uploads. Works offline with unlimited tasks.',
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Works offline & no sign-up required', 'Unlimited page numbering'],
  },
  headersFooters: {
    title: 'Add Headers & Footers to PDF Free - No Watermark',
    description: 'Add header and footer text, page counters, and timestamps to any PDF with no watermark, no sign-up, and zero server uploads. Works offline.',
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Works offline & no sign-up required', 'Unlimited document headers'],
  },
  extractText: {
    title: 'Extract Text from PDF Free - No Watermark, No Sign-Up',
    description: 'Extract readable text and perform OCR from PDF pages with no watermark, no registration, and zero server uploads. 100% offline and unlimited.',
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Works offline & no sign-up required', 'Unlimited text extraction'],
  },
  invertColors: {
    title: 'Invert PDF Colors for Dark Mode Free - No Watermark',
    description: 'Convert bright white PDF pages into Dark Mode, Sepia, or High Contrast with no watermark, no sign-up, and zero server uploads. Works offline.',
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Works offline & no sign-up required', 'Unlimited reading comfort'],
  },
  redact: {
    title: 'Redact PDF Online Free - No Watermark, Zero Uploads',
    description: 'Permanently black out sensitive text, SSNs, and numbers with no watermark, no sign-up, and zero server uploads. 100% private and offline-capable.',
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Works offline & no sign-up required', 'Unlimited document redactions'],
  },
  compare: {
    title: 'Compare Two PDF Files Free - No Sign-Up, Zero Uploads',
    description: 'Compare two PDF revisions side-by-side in your browser with synchronized scrolling, no account required, and zero server uploads. Works offline.',
    bulletPoints: ['Synchronized side-by-side view', 'Zero server uploads (100% private)', 'Works offline & no sign-up required', 'Unlimited revision checks'],
  },
  pdfToZip: {
    title: 'Convert PDF to ZIP Online Free - No Sign-Up, Works Offline',
    description: 'Package and bundle single or multiple PDF documents into a clean ZIP archive with no watermark, no account, and zero server uploads. 100% private.',
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Works offline & no sign-up required', 'Unlimited archive bundling'],
  },
  encrypt: {
    title: 'Protect and Encrypt PDF Free - No Sign-Up, Zero Uploads',
    description: 'Secure your PDF files with AES-256 password encryption directly in your browser with no sign-up and zero server uploads. Works offline and unlimited.',
    bulletPoints: ['Standard AES-256 encryption', 'Zero server uploads (100% private)', 'Works offline & no sign-up required', 'Unlimited document encryption'],
  },
  decrypt: {
    title: 'Unlock and Decrypt PDF Free - No Sign-Up, Works Offline',
    description: 'Remove password security and permission locks from PDF files you own with no watermark, no registration, and zero cloud uploads. Works offline.',
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Works offline & no sign-up required', 'Unlimited password unlocking'],
  },
  editPdf: {
    title: 'Edit PDF Online Free - No Watermark, No Sign-Up',
    description: 'Annotate, draw, highlight, and add text to PDF documents with no watermark, no account, and zero server uploads. Works offline with unlimited tasks.',
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Works offline & no sign-up required', 'Unlimited document editing'],
  },
  scanToPdf: {
    title: 'Scan to PDF Free - No Watermark, Works Offline',
    description: 'Capture multi-page paper documents using your camera or webcam with no watermark, no app install, and zero server uploads. Works offline.',
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Works offline & no sign-up required', 'Unlimited camera scans'],
  },
  markdownToPdf: {
    title: 'Markdown to PDF Converter Free - No Watermark, No Sign-Up',
    description: 'Transform Markdown notes, code blocks, and tables into clean PDF files with no watermark, no account, and zero server uploads. Works offline.',
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Works offline & no sign-up required', 'Unlimited document exports'],
  },
  htmlToPdf: {
    title: 'HTML to PDF Converter Free - No Watermark, No Sign-Up',
    description: 'Render HTML markup and web snippets into clean PDF pages with no watermark, no sign-up, and zero server uploads. Fast and works offline.',
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Works offline & no sign-up required', 'Unlimited HTML conversions'],
  },
  csvToPdf: {
    title: 'CSV to PDF Converter Free - No Watermark, Works Offline',
    description: 'Convert CSV datasets into clean, formatted PDF tables with no watermark, no registration, and zero server uploads. 100% private and unlimited.',
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Works offline & no sign-up required', 'Unlimited spreadsheet exports'],
  },
  createPdf: {
    title: 'Create PDF Online Free - No Watermark, No Sign-Up',
    description: 'Design custom PDF documents with text, images, shapes, and tables with no watermark, no registration, and zero server uploads. Works offline.',
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Works offline & no sign-up required', 'Unlimited document creation'],
  },
  excelToPdf: {
    title: 'Excel to PDF Converter Free - No Watermark, No Sign-Up',
    description: 'Convert Microsoft Excel (.xlsx, .xls) spreadsheets into clean PDF documents with no watermark, no account, and zero server uploads. 100% private.',
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Works offline & no sign-up required', 'Unlimited Excel conversions'],
  },
  pdfToExcel: {
    title: 'PDF to Excel Converter Free - No Watermark, No Sign-Up',
    description: 'Extract tabular data from PDF files into editable Microsoft Excel spreadsheets (.xlsx) with no watermark, no account, and zero server uploads.',
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Works offline & no sign-up required', 'Unlimited XLSX exports'],
  },
  pdfToWord: {
    title: 'PDF to Word Converter Free - No Watermark, No Sign-Up',
    description: 'Convert PDF files to editable Microsoft Word (.docx) documents with no watermark, no registration, and zero cloud uploads. Private and unlimited.',
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Works offline & no sign-up required', 'Unlimited DOCX conversions'],
  },
  wordToPdf: {
    title: 'Word to PDF Converter Free - No Watermark, No Sign-Up',
    description: 'Convert Microsoft Word (.docx) documents to PDF with selectable text, no watermark, no registration, and zero server uploads. Private and unlimited.',
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Works offline & no sign-up required', 'Unlimited Word conversions'],
  },
  powerpointToPdf: {
    title: 'PowerPoint to PDF Free - No Watermark, No Sign-Up',
    description: 'Convert PPTX slide decks into printable PDF handouts with no watermark, no account, and zero server uploads. Works offline and unlimited.',
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Works offline & no sign-up required', 'Unlimited PPTX conversions'],
  },
  pdfToPowerpoint: {
    title: 'PDF to PowerPoint Free - No Watermark, No Sign-Up',
    description: 'Transform PDF pages into editable PowerPoint (.pptx) slides with no watermark, no registration, and zero server uploads. Works offline and unlimited.',
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Works offline & no sign-up required', 'Unlimited PPTX conversions'],
  },
  pdfToHtml: {
    title: 'PDF to HTML Converter Free - No Watermark, Works Offline',
    description: 'Convert PDF document pages into responsive HTML code with no watermark, no account, and zero server uploads. Works offline and unlimited.',
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Works offline & no sign-up required', 'Unlimited web exports'],
  },
  pdfToEpub: {
    title: 'PDF to EPUB Converter Free - No Watermark, Works Offline',
    description: 'Transform PDF documents into reflowable EPUB eBooks for Kindle and e-readers with no watermark, no sign-up, and zero server uploads.',
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Works offline & no sign-up required', 'Unlimited eBook conversions'],
  },
  ebookToPdf: {
    title: 'EPUB to PDF Converter Free - No Watermark, Works Offline',
    description: 'Convert EPUB and digital eBook files into formatted, printable PDF documents with no watermark, no account, and zero server uploads. 100% private.',
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Works offline & no sign-up required', 'Unlimited eBook printing'],
  },
  whiteboard: {
    title: 'PDF Whiteboard Free - No Watermark, Works Offline',
    description: 'Mark up, draw, and brainstorm directly over PDF pages on an interactive whiteboard with no watermark, no account, and zero server uploads.',
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Works offline & no sign-up required', 'Unlimited whiteboard markups'],
  },
  gstInvoice: {
    title: 'GST Invoice Generator Free - No Watermark, Works Offline',
    description: 'Generate GST-compliant tax invoices with auto-calculated CGST/SGST/IGST and HSN table with no watermark, no sign-up, and zero server uploads.',
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Works offline & no sign-up required', 'Unlimited invoice generation'],
  },
  posBilling: {
    title: 'POS Receipt Generator Free - No Watermark, Works Offline',
    description: 'Generate thermal point-of-sale receipts in 58mm, 80mm, or A4 formats with no watermark, no registration, and zero server uploads. 100% offline.',
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Works offline & no sign-up required', 'Unlimited receipt generation'],
  },
  signPdf: {
    title: 'Sign PDF Online Free - No Watermark, No Account',
    description: 'Draw or type your signature and sign contracts with no watermark, no sign-up, and zero server uploads. Works offline with unlimited signatures.',
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Works offline & no sign-up required', 'Unlimited document signatures'],
  },
  fillPdfForm: {
    title: 'Fill PDF Forms Online Free - No Watermark, No Sign-Up',
    description: 'Fill out interactive AcroForm PDF forms with no watermark, no registration, and zero server uploads. Fast, private, works offline, and unlimited.',
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Works offline & no sign-up required', 'Unlimited form filling'],
  },
  latexResume: {
    title: 'LaTeX Resume Builder Free - No Watermark, No Sign-Up',
    description: 'Build ATS-friendly resumes with authentic LaTeX templates with no watermark, no registration, and zero server uploads. Export PDF & .tex source free.',
    bulletPoints: ['No watermark added', 'Zero server uploads (100% private)', 'Works offline & no sign-up required', 'Unlimited resume builds'],
  },
};

for (const [key, data] of Object.entries(updates)) {
  // Regex to locate the key block in OPERATIONS_CATALOG
  const keyBlockRegex = new RegExp(`(${key}:\\s*\\{[\\s\\S]*?key:\\s*['"]${key}['"][\\s\\S]*?title:\\s*['"])[^'"]+(['"][\\s\\S]*?description:\\s*['"])[^'"]+(['"][\\s\\S]*?bulletPoints:\\s*\\[)[^\\]]+(\\])`);
  if (keyBlockRegex.test(content)) {
    content = content.replace(keyBlockRegex, (match, p1, p2, p3, p4) => {
      const formattedBullets = data.bulletPoints.map(b => `'${b}'`).join(', ');
      return `${p1}${data.title}${p2}${data.description}${p3}${formattedBullets}${p4}`;
    });
    console.log(`[OK] Updated catalog item for ${key}`);
  } else {
    console.log(`[WARN] Could not match key block for ${key}`);
  }
}

fs.writeFileSync(catalogPath, content, 'utf-8');
console.log('Finished updating operations catalog.');
