import fs from 'fs';
import path from 'path';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { encryptPDF } from '@pdfsmaller/pdf-encrypt';
import * as XLSX from 'xlsx';
import pptxgen from 'pptxgenjs';

const FIXTURES_DIR = path.resolve(process.cwd(), 'tests/fixtures');

async function main() {
  if (!fs.existsSync(FIXTURES_DIR)) {
    fs.mkdirSync(FIXTURES_DIR, { recursive: true });
  }

  console.log(`Generating test fixtures in ${FIXTURES_DIR}...`);

  // 1. Small PDF (1 page)
  console.log('1. Generating small.pdf...');
  const smallDoc = await PDFDocument.create();
  const smallPage = smallDoc.addPage([600, 400]);
  const font = await smallDoc.embedFont(StandardFonts.Helvetica);
  smallPage.drawText('ihatelovepdf Small Test PDF', { x: 50, y: 350, size: 24, font, color: rgb(0.1, 0.1, 0.1) });
  smallPage.drawText('This is a clean, 1-page document for happy path QA verification.', { x: 50, y: 300, size: 12, font });
  const smallBytes = await smallDoc.save();
  fs.writeFileSync(path.join(FIXTURES_DIR, 'small.pdf'), smallBytes);

  // 2. Multipage 100+ PDF
  console.log('2. Generating multipage-100.pdf...');
  const multiDoc = await PDFDocument.create();
  const multiFont = await multiDoc.embedFont(StandardFonts.Helvetica);
  for (let i = 1; i <= 105; i++) {
    const page = multiDoc.addPage([595, 842]);
    page.drawText(`ihatelovepdf Automated QA Document - Page ${i} of 105`, {
      x: 50,
      y: 800,
      size: 14,
      font: multiFont,
      color: rgb(0.2, 0.2, 0.2),
    });
    page.drawText(`Content block for page index ${i}. Testing pagination, splitting, merging and indexing.`, {
      x: 50,
      y: 750,
      size: 11,
      font: multiFont,
    });
  }
  const multiBytes = await multiDoc.save();
  fs.writeFileSync(path.join(FIXTURES_DIR, 'multipage-100.pdf'), multiBytes);

  // 3. Password-protected PDF
  console.log('3. Generating password-protected.pdf (Password: test1234)...');
  const encDoc = await PDFDocument.create();
  const encPage = encDoc.addPage([500, 300]);
  encPage.drawText('Confidential Encrypted PDF (Password is test1234)', { x: 40, y: 220, size: 16 });
  const rawEncBytes = await encDoc.save();
  const encBytes = await encryptPDF(rawEncBytes, 'test1234', {
    ownerPassword: 'test1234',
    algorithm: 'AES-256',
  });
  fs.writeFileSync(path.join(FIXTURES_DIR, 'password-protected.pdf'), encBytes);

  // 4. Corrupted PDF
  console.log('4. Generating corrupted.pdf...');
  const corruptContent = '%PDF-1.4\n%\xe2\xe3\xcf\xd3\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\nCORRUPTED_STREAM_DATA_NOT_A_VALID_PDF_STRUCTURE_END';
  fs.writeFileSync(path.join(FIXTURES_DIR, 'corrupted.pdf'), Buffer.from(corruptContent, 'utf-8'));

  // 5. Minimal Valid 1x1 PNG and JPG
  console.log('5. Generating image fixtures (sample.png, sample.jpg, sample.webp)...');
  // 1x1 red PNG
  const png1x1 = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
    'base64'
  );
  fs.writeFileSync(path.join(FIXTURES_DIR, 'sample.png'), png1x1);

  // 1x1 JPEG
  const jpg1x1 = Buffer.from(
    '/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA=',
    'base64'
  );
  fs.writeFileSync(path.join(FIXTURES_DIR, 'sample.jpg'), jpg1x1);

  // 1x1 WebP
  const webp1x1 = Buffer.from(
    'UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=',
    'base64'
  );
  fs.writeFileSync(path.join(FIXTURES_DIR, 'sample.webp'), webp1x1);

  // 6. Scanned/Image-only PDF
  console.log('6. Generating scanned-image.pdf...');
  const scanDoc = await PDFDocument.create();
  const pngImage = await scanDoc.embedPng(png1x1);
  const scanPage = scanDoc.addPage([600, 800]);
  scanPage.drawImage(pngImage, { x: 50, y: 50, width: 500, height: 700 });
  const scanBytes = await scanDoc.save();
  fs.writeFileSync(path.join(FIXTURES_DIR, 'scanned-image.pdf'), scanBytes);

  // 7. Non-Latin Text PDF (Hindi, Arabic, CJK)
  console.log('7. Generating non-latin.pdf...');
  const nonLatinDoc = await PDFDocument.create();
  const nonLatinPage = nonLatinDoc.addPage([600, 400]);
  nonLatinPage.drawText('Internationalization & Non-Latin Character Test:', { x: 50, y: 350, size: 14 });
  nonLatinPage.drawText('Hindi: Namaste (Devanagari)', { x: 50, y: 310, size: 12 });
  nonLatinPage.drawText('Arabic: Marhaban (Right-to-Left script)', { x: 50, y: 280, size: 12 });
  nonLatinPage.drawText('CJK: Nihao / Konnichiwa (Ideographs)', { x: 50, y: 250, size: 12 });
  const nonLatinBytes = await nonLatinDoc.save();
  fs.writeFileSync(path.join(FIXTURES_DIR, 'non-latin.pdf'), nonLatinBytes);

  // 8. PDF with Forms (AcroForm)
  console.log('8. Generating form.pdf...');
  const formDoc = await PDFDocument.create();
  const formPage = formDoc.addPage([600, 500]);
  const form = formDoc.getForm();
  formPage.drawText('Interactive AcroForm Test Document', { x: 50, y: 450, size: 18 });
  formPage.drawText('Full Name:', { x: 50, y: 400, size: 12 });
  const nameField = form.createTextField('fullName');
  nameField.setText('Jane Doe');
  nameField.addToPage(formPage, { x: 150, y: 390, width: 250, height: 25 });

  formPage.drawText('Email Address:', { x: 50, y: 350, size: 12 });
  const emailField = form.createTextField('emailAddress');
  emailField.setText('jane.doe@example.com');
  emailField.addToPage(formPage, { x: 150, y: 340, width: 250, height: 25 });

  const formBytes = await formDoc.save();
  fs.writeFileSync(path.join(FIXTURES_DIR, 'form.pdf'), formBytes);

  // 9. Excel (.xlsx) file
  console.log('9. Generating sample.xlsx...');
  const wb = XLSX.utils.book_new();
  const wsData = [
    ['Product', 'Qty', 'Unit Price', 'Total'],
    ['PDF Merger Pro', 10, 50, 500],
    ['Document Compressor', 5, 30, 150],
    ['Privacy Redactor', 2, 100, 200],
  ];
  const ws = XLSX.utils.aoa_to_sheet(wsData);
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  const xlsxBuffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
  fs.writeFileSync(path.join(FIXTURES_DIR, 'sample.xlsx'), xlsxBuffer);

  // 10. PowerPoint (.pptx) file
  console.log('10. Generating sample.pptx...');
  const ppt = new pptxgen();
  const slide = ppt.addSlide();
  slide.addText('ihatelovepdf Presentation', { x: 1, y: 1, fontSize: 28, color: '363636' });
  slide.addText('Automated QA verification slide for PDF converter tools.', { x: 1, y: 2, fontSize: 16, color: '646464' });
  const pptBuffer = await ppt.write({ outputType: 'nodebuffer' });
  fs.writeFileSync(path.join(FIXTURES_DIR, 'sample.pptx'), pptBuffer as Buffer);

  // 11. Word (.docx) file (valid minimal ZIP container)
  console.log('11. Generating sample.docx...');
  const docxMinimal = Buffer.from(
    'UEsDBBQAAAAIAAAAAAAAAAAAAAAAAAAAAAAQAAAAZG9jUHJvcHMvYXBwLnhtbM1Qy07DMBC8I/EfLN+J0wohVTmgHhASQhUufInXSa3EPtSOEP4ed1pEHHDAcVo5d2Zmd6N98gVd66rMGIU0d3w/nFwB94JbU5uQ2r73zZ7Yf551Gk65XG4fXf7sB15sV9k4e/m2w5k7+31k9N/793/1V39fX9+fnv7eX1/v//0BUEsBAhQAFAAAAAgAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAQAAAAAAAAAGRvY1Byb3BzL2FwcC54bWxQSwUGAAAAAAEAAQBOAAAASQAAAAAA',
    'base64'
  );
  fs.writeFileSync(path.join(FIXTURES_DIR, 'sample.docx'), docxMinimal);

  // 12. 50MB+ Large PDF
  console.log('12. Generating large-50mb.pdf (this may take a few seconds)...');
  const baseDoc = await PDFDocument.create();
  const p1 = baseDoc.addPage([600, 800]);
  p1.drawText('50MB Stress Test PDF', { x: 50, y: 700, size: 24 });
  const baseBytes = await baseDoc.save();

  // Create a 51MB file by appending valid PDF comment block at EOF
  const targetBytes = 51 * 1024 * 1024;
  const paddingSize = targetBytes - baseBytes.byteLength;
  const paddingBuffer = Buffer.alloc(paddingSize, 0x20); // whitespace padding
  const largeFileBuffer = Buffer.concat([
    Buffer.from(baseBytes),
    Buffer.from('\n% PADDING STREAM FOR STRESS TESTING LARGE FILES IN CLIENT STORAGE\n'),
    paddingBuffer,
    Buffer.from('\n%%EOF\n'),
  ]);
  fs.writeFileSync(path.join(FIXTURES_DIR, 'large-50mb.pdf'), largeFileBuffer);
  const largeSizeMB = (fs.statSync(path.join(FIXTURES_DIR, 'large-50mb.pdf')).size / (1024 * 1024)).toFixed(2);
  console.log(`large-50mb.pdf generated: ${largeSizeMB} MB`);

  console.log('All QA test fixtures generated successfully!');
}

main().catch((err) => {
  console.error('Fixture generation failed:', err);
  process.exit(1);
});
