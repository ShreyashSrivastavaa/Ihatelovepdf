import * as docx from 'docx';
import { convertWordToPdf } from '../src/lib/operations/word-to-pdf';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';
import fs from 'fs';

async function evaluateDocxQuality() {
  console.log('--- Generating complex test .docx ---');
  
  // Create a 1x1 red PNG buffer
  const samplePngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC';
  const imageBuffer = Buffer.from(samplePngBase64, 'base64');

  const doc = new docx.Document({
    sections: [
      {
        properties: {},
        children: [
          new docx.Paragraph({
            text: 'Complex Document Conversion Evaluation',
            heading: docx.HeadingLevel.HEADING_1,
          }),
          new docx.Paragraph({
            children: [
              new docx.TextRun({ text: 'Standard paragraph with ' }),
              new docx.TextRun({ text: 'Bold Text', bold: true }),
              new docx.TextRun({ text: ', ' }),
              new docx.TextRun({ text: 'Italic Text', italics: true }),
              new docx.TextRun({ text: ', and ' }),
              new docx.TextRun({ text: 'Underline Text', underline: {} }),
              new docx.TextRun({ text: '. Plus non-standard custom font: ', font: 'Papyrus' }),
              new docx.TextRun({ text: 'Sample in Custom Font', font: 'Comic Sans MS', color: 'E65100' }),
            ],
          }),
          new docx.Paragraph({
            text: 'Section 1: Data Table with Borders and Cell Values',
            heading: docx.HeadingLevel.HEADING_2,
          }),
          new docx.Table({
            rows: [
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph({ children: [new docx.TextRun({ text: 'Metric', bold: true })] })],
                    width: { size: 3000, type: docx.WidthType.DXA },
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph({ children: [new docx.TextRun({ text: 'Value', bold: true })] })],
                    width: { size: 3000, type: docx.WidthType.DXA },
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph({ children: [new docx.TextRun({ text: 'Status', bold: true })] })],
                    width: { size: 3000, type: docx.WidthType.DXA },
                  }),
                ],
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({ children: [new docx.Paragraph('Throughput')] }),
                  new docx.TableCell({ children: [new docx.Paragraph('14,200 req/s')] }),
                  new docx.TableCell({ children: [new docx.Paragraph('Pass')] }),
                ],
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({ children: [new docx.Paragraph('Latency P99')] }),
                  new docx.TableCell({ children: [new docx.Paragraph('4.2 ms')] }),
                  new docx.TableCell({ children: [new docx.Paragraph('Pass')] }),
                ],
              }),
            ],
          }),
          new docx.Paragraph({
            text: 'Section 2: Embedded Image Test',
            heading: docx.HeadingLevel.HEADING_2,
          }),
          new docx.Paragraph({
            children: [
              new docx.ImageRun({
                data: imageBuffer,
                transformation: { width: 100, height: 100 },
                type: 'png',
              }),
            ],
          }),
          new docx.Paragraph({
            text: 'Section 3: Bulleted and Numbered Lists',
            heading: docx.HeadingLevel.HEADING_2,
          }),
          new docx.Paragraph({
            text: 'Alpha item in bullet list',
            bullet: { level: 0 },
          }),
          new docx.Paragraph({
            text: 'Beta item with sub-level point',
            bullet: { level: 0 },
          }),
        ],
      },
    ],
  });

  const docxBuffer = await docx.Packer.toBuffer(doc);
  fs.writeFileSync('scratch/complex-test.docx', docxBuffer);
  console.log('Saved scratch/complex-test.docx (' + docxBuffer.length + ' bytes)');

  console.log('Converting scratch/complex-test.docx to PDF...');
  const pdfBytes = await convertWordToPdf(docxBuffer);
  fs.writeFileSync('scratch/complex-test-converted.pdf', pdfBytes);
  console.log('Saved scratch/complex-test-converted.pdf (' + pdfBytes.length + ' bytes)');

  // Inspect with PDF.js
  const docData = await pdfjs.getDocument({ data: pdfBytes }).promise;
  console.log('Output PDF total pages:', docData.numPages);
  for (let i = 1; i <= docData.numPages; i++) {
    const page = await docData.getPage(i);
    const textContent = await page.getTextContent();
    const strings = textContent.items.map((item: any) => item.str).filter(Boolean);
    console.log(`Page ${i} text items (${strings.length}):`, strings.slice(0, 15).join(' | '));
  }
}

evaluateDocxQuality().catch(console.error);

