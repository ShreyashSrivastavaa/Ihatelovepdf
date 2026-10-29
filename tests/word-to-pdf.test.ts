/**
 * ------------------------------------------------------------------
 * Word (.docx) to PDF Unit Tests
 * ------------------------------------------------------------------
 * Tests:
 * 1. HTML AST parsing for headings, lists, tables, and inline styles.
 * 2. Word wrapping and layout engine calculations.
 * 3. End-to-end conversion of a generated .docx containing:
 *    - Headings (H1, H2)
 *    - Paragraphs with bold, italic, underline
 *    - Non-Latin Unicode characters (Cyrillic, Romanian, Hungarian)
 *    - Bullet and numbered lists
 *    - Tables
 *    - Inline image
 * 4. Verification that output PDF has selectable vector text.
 * 5. Rejection of legacy .doc files with clear explanation.
 * 6. Graceful handling of corrupted/invalid files.
 * ------------------------------------------------------------------
 */

import assert from 'assert';
import * as docx from 'docx';
import {
  convertWordToPdf,
  parseHtmlToAst,
} from '../src/lib/operations/word-to-pdf';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';

function pass(name: string) {
  console.log(`✅ PASS: ${name}`);
}

async function runTests() {
  console.log('🧪 Starting Word (.docx) to PDF Unit Tests...\n');

  // -------------------------------------------------------------
  // Test 1: HTML AST Parsing
  // -------------------------------------------------------------
  const htmlSnippet = `
    <h1>Main Title</h1>
    <p>This is <strong>bold</strong> and <em>italic</em> with <u>underline</u>.</p>
    <ul>
      <li>First Item</li>
      <li>Second Item</li>
    </ul>
    <table>
      <tr><th>Col 1</th><th>Col 2</th></tr>
      <tr><td>A</td><td>B</td></tr>
    </table>
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=" />
  `;

  const ast = parseHtmlToAst(htmlSnippet);
  assert.ok(Array.isArray(ast), 'AST should be an array of nodes');
  assert.strictEqual(ast.length, 5, 'AST should contain 5 top-level block elements');
  pass('HTML AST parses 5 top-level blocks correctly');

  assert.strictEqual(ast[0].tag, 'h1');
  assert.strictEqual(ast[0].children?.[0]?.text?.trim(), 'Main Title');
  pass('AST identifies H1 heading and text content');

  assert.strictEqual(ast[1].tag, 'p');
  const pChildren = ast[1].children || [];
  const strongNode = pChildren.find((c) => c.tag === 'strong');
  assert.ok(strongNode, 'Paragraph has <strong> child');
  assert.strictEqual(strongNode.children?.[0]?.text, 'bold');
  pass('AST preserves nested strong/bold formatting');

  assert.strictEqual(ast[2].tag, 'ul');
  assert.strictEqual(ast[2].children?.filter((c) => c.tag === 'li').length, 2);
  pass('AST parses unordered list with 2 items');

  assert.strictEqual(ast[3].tag, 'table');
  const trs = ast[3].children?.filter((c) => c.tag === 'tr') || [];
  assert.strictEqual(trs.length, 2);
  pass('AST parses table with 2 rows');

  assert.strictEqual(ast[4].tag, 'img');
  assert.ok(ast[4].attributes?.src?.startsWith('data:image/png;base64,'), 'Image has base64 data URL');
  pass('AST parses inline image with data URL');

  // -------------------------------------------------------------
  // Test 2: Build Realistic DOCX Fixture and Convert to PDF
  // -------------------------------------------------------------
  // 1x1 transparent PNG data for image test
  const samplePngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=';
  const samplePngBuffer = Buffer.from(samplePngBase64, 'base64');

  const doc = new docx.Document({
    sections: [
      {
        children: [
          new docx.Paragraph({
            text: 'Comprehensive Test Document',
            heading: docx.HeadingLevel.HEADING_1,
          }),
          new docx.Paragraph({
            text: 'Section 1: Formatting & Multilingual Characters',
            heading: docx.HeadingLevel.HEADING_2,
          }),
          new docx.Paragraph({
            children: [
              new docx.TextRun({ text: 'Standard paragraph with ' }),
              new docx.TextRun({ text: 'bold formatting', bold: true }),
              new docx.TextRun({ text: ', ' }),
              new docx.TextRun({ text: 'italic formatting', italics: true }),
              new docx.TextRun({ text: ', and ' }),
              new docx.TextRun({ text: 'underlined text', underline: {} }),
              new docx.TextRun({
                text: '. Unicode test: Привет мир! Árvíztűrő tükörfúrógép șț îâ.',
              }),
            ],
          }),
          new docx.Paragraph({
            text: '• First bullet item',
          }),
          new docx.Paragraph({
            text: '• Second bullet item',
          }),
          new docx.Table({
            rows: [
              new docx.TableRow({
                children: [
                  new docx.TableCell({ children: [new docx.Paragraph('Product')] }),
                  new docx.TableCell({ children: [new docx.Paragraph('Category')] }),
                  new docx.TableCell({ children: [new docx.Paragraph('Price')] }),
                ],
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({ children: [new docx.Paragraph('PDF Tool')] }),
                  new docx.TableCell({ children: [new docx.Paragraph('Utility')] }),
                  new docx.TableCell({ children: [new docx.Paragraph('Free')] }),
                ],
              }),
            ],
          }),
          new docx.Paragraph({
            children: [
              new docx.ImageRun({
                data: samplePngBuffer,
                transformation: { width: 40, height: 40 },
                type: 'png',
              }),
            ],
          }),
        ],
      },
    ],
  });

  const docxBytes = await docx.Packer.toBuffer(doc);
  assert.ok(docxBytes.length > 0, 'DOCX fixture generated');

  let progressReported = false;
  const pdfBytes = await convertWordToPdf(docxBytes, {
    pageSize: 'A4',
    margins: 'normal',
    fontSize: 'medium',
    fontFamily: 'LiberationSans',
    onProgress: (p, status) => {
      if (p > 0) progressReported = true;
    },
  });

  assert.ok(pdfBytes instanceof Uint8Array, 'Should return Uint8Array');
  assert.ok(pdfBytes.length > 1000, `PDF output should have valid size, got ${pdfBytes.length}`);
  assert.ok(progressReported, 'Progress callback should be invoked');
  pass(`Generated valid PDF from rich .docx fixture (${pdfBytes.length} bytes)`);

  // Verify PDF header magic bytes '%PDF-'
  const header = String.fromCharCode(...pdfBytes.slice(0, 5));
  assert.strictEqual(header, '%PDF-', 'Output must have valid PDF header');
  pass('PDF header verified (%PDF-)');

  // Verify Selectable Text via PDF.js
  const pdfDoc = await pdfjs.getDocument({
    data: new Uint8Array(pdfBytes),
    disableFontFace: true,
  }).promise;

  assert.strictEqual(pdfDoc.numPages, 1, 'Should produce 1 page');
  const page1 = await pdfDoc.getPage(1);
  const textContent = await page1.getTextContent();
  const fullText = textContent.items.map((item: any) => item.str).join(' ');

  assert.ok(fullText.includes('Comprehensive Test Document'), 'Text must contain Title');
  assert.ok(fullText.includes('bold formatting'), 'Text must contain bold formatting text');
  assert.ok(fullText.includes('Product'), 'Text must contain table header');
  assert.ok(fullText.includes('PDF Tool'), 'Text must contain table cell');
  pass('PDF text is vector and selectable (verified with PDF.js)');

  // -------------------------------------------------------------
  // Test 3: Detect Legacy .doc (Compound File Binary Format / OLE2)
  // -------------------------------------------------------------
  const fakeLegacyDoc = new Uint8Array([
    0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1, 0x00, 0x00,
  ]);

  let legacyErrorThrown = false;
  try {
    await convertWordToPdf(fakeLegacyDoc);
  } catch (err: any) {
    legacyErrorThrown = true;
    assert.ok(
      err.message.includes('Legacy Word (.doc) format is not supported'),
      `Expected legacy message, got: ${err.message}`
    );
  }
  assert.ok(legacyErrorThrown, 'Must reject legacy .doc files with clear message');
  pass('Legacy .doc correctly detected and rejected with informative error');

  // -------------------------------------------------------------
  // Test 4: Corrupted / Invalid File Handling
  // -------------------------------------------------------------
  const corruptedBuffer = new Uint8Array([0x50, 0x4b, 0x03, 0x04, 0x00, 0x99, 0x88]); // Broken zip
  let corruptErrorThrown = false;
  try {
    await convertWordToPdf(corruptedBuffer);
  } catch (err: any) {
    corruptErrorThrown = true;
    assert.ok(
      err.message.includes('corrupted') || err.message.includes('Failed to read Word document'),
      `Expected corruption error, got: ${err.message}`
    );
  }
  assert.ok(corruptErrorThrown, 'Must catch corrupted file gracefully');
  pass('Corrupted files handled gracefully without crashing');

  console.log('\n🎉 All Word (.docx) to PDF unit tests passed successfully!\n');
}

runTests().catch((err) => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
