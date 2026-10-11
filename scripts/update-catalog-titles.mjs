import fs from 'node:fs';

const titlesMap = {
  merge: 'Merge PDF Online Free, No Signup',
  compress: 'Compress PDF Online Free, No Upload',
  split: 'Split PDF Pages Online, Free and Private',
  extract: 'Extract Pages from PDF Online Free',
  crop: 'Crop and Resize PDF Online Free',
  rotate: 'Rotate PDF Pages Online Free',
  reorder: 'Reorder and Organize PDF Pages Free',
  pdfToImages: 'PDF to JPG and Images, Free Converter',
  imagesToPdf: 'Images to PDF Converter, Free and Private',
  watermark: 'Add Watermark to PDF Online Free',
  pageNumbers: 'Add Page Numbers to PDF Online Free',
  headersFooters: 'Add Headers and Footers to PDF Free',
  extractText: 'Extract Text from PDF Online Free',
  invertColors: 'Invert PDF Colors for Dark Mode Free',
  redact: 'Redact PDF Online Free, Private',
  compare: 'Compare Two PDF Files Online Free',
  pdfToZip: 'Convert PDF to ZIP Online Free',
  editPdf: 'Edit and Annotate PDF Online Free',
  scanToPdf: 'Scan Documents to PDF with Your Camera',
  markdownToPdf: 'Markdown to PDF Converter Online Free',
  htmlToPdf: 'HTML to PDF Converter Online Free',
  csvToPdf: 'CSV to PDF Converter Online Free',
  createPdf: 'Create PDF Online Free, No Signup',
  excelToPdf: 'Excel to PDF Converter Online Free',
  pdfToExcel: 'PDF to Excel Converter Online Free',
  powerpointToPdf: 'PowerPoint to PDF Converter Free',
  pdfToPowerpoint: 'PDF to PowerPoint Converter Free',
  pdfToHtml: 'PDF to HTML Converter Online Free',
  pdfToEpub: 'PDF to EPUB Converter Online Free',
  ebookToPdf: 'EPUB to PDF Converter Online Free',
  whiteboard: 'Whiteboard Sketch to PDF Online Free',
  gstInvoice: 'Free GST Invoice Generator, PDF Download',
  posBilling: 'Free POS Billing Receipt Generator PDF',
  signPdf: 'Sign PDF Online Free, Private',
  fillPdfForm: 'Fill PDF Forms Online Free',
  encrypt: 'Protect PDF Online Free, Private',
  decrypt: 'Unlock PDF Online Free, Private',
  latexResume: 'Free LaTeX Resume Builder Online'
};

let content = fs.readFileSync('src/i18n/operations-catalog.ts', 'utf8');

for (const [key, title] of Object.entries(titlesMap)) {
  const regex = new RegExp(`(${key}:\\s*{[\\s\\S]*?title:\\s*')[^']+(')`, 'm');
  if (regex.test(content)) {
    content = content.replace(regex, `$1${title}$2`);
  } else {
    console.log('Key regex did not match in operations-catalog:', key);
  }
}

fs.writeFileSync('src/i18n/operations-catalog.ts', content, 'utf8');
console.log('Successfully updated operations-catalog.ts titles');
