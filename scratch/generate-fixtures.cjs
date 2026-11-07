const fs = require('fs');
const path = require('path');
const pdfjs = require('pdfjs-dist/legacy/build/pdf.mjs');

const FIXTURES_DIR = path.resolve(__dirname, '../tests/fixtures');

// 1. Generate jp2.pdf (PDF with a JPXDecode stream)
// Valid minimal 10x10 RGB JPEG2000 codestream
const j2cCodestream = Buffer.from([
  0xFF, 0x4F, 0xFF, 0x51, 0x00, 0x29, 0x00, 0x00, 0x00, 0x00, 0x00, 0x0A, 0x00, 0x00,
  0x00, 0x0A, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x0A,
  0x00, 0x00, 0x00, 0x0A, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03,
  0x07, 0x01, 0x01, 0x07, 0x01, 0x01, 0x07, 0x01, 0x01, 0xFF, 0x52, 0x00, 0x0C, 0x00,
  0x00, 0x00, 0x01, 0x01, 0x05, 0x04, 0x04, 0x00, 0x01, 0xFF, 0x5C, 0x00, 0x07, 0x20,
  0x60, 0x60, 0x60, 0x60, 0xFF, 0x90, 0x00, 0x0A, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x01, 0xFF, 0x93, 0xFF, 0xD9
]);

const jp2PdfRaw = `%PDF-1.4
1 0 obj
<<
  /Type /Catalog
  /Pages 2 0 R
>>
endobj
2 0 obj
<<
  /Type /Pages
  /Kids [3 0 R]
  /Count 1
>>
endobj
3 0 obj
<<
  /Type /Page
  /Parent 2 0 R
  /MediaBox [0 0 400 400]
  /Resources <<
    /XObject <<
      /Im1 4 0 R
    >>
  >>
  /Contents 5 0 R
>>
endobj
4 0 obj
<<
  /Type /XObject
  /Subtype /Image
  /Width 10
  /Height 10
  /ColorSpace /DeviceRGB
  /BitsPerComponent 8
  /Filter /JPXDecode
  /Length ${j2cCodestream.length}
>>
stream
${j2cCodestream.toString('binary')}
endstream
endobj
5 0 obj
<<
  /Length 45
>>
stream
q
200 0 0 200 100 100 cm
/Im1 Do
Q
endstream
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000257 00000 n 
0000000450 00000 n 
trailer
<<
  /Size 6
  /Root 1 0 R
>>
startxref
545
%%EOF
`;

fs.writeFileSync(path.join(FIXTURES_DIR, 'jp2.pdf'), Buffer.from(jp2PdfRaw, 'binary'));
console.log('Saved tests/fixtures/jp2.pdf');

// 2. Generate cjk.pdf (PDF with non-embedded CJK fonts requiring cMaps)
// Standard Chinese CJK text: "PDF工具 隐私安全"
const cjkPdfRaw = `%PDF-1.4
1 0 obj
<<
  /Type /Catalog
  /Pages 2 0 R
>>
endobj
2 0 obj
<<
  /Type /Pages
  /Kids [3 0 R]
  /Count 1
>>
endobj
3 0 obj
<<
  /Type /Page
  /Parent 2 0 R
  /MediaBox [0 0 612 792]
  /Resources <<
    /Font <<
      /F1 4 0 R
    >>
  >>
  /Contents 6 0 R
>>
endobj
4 0 obj
<<
  /Type /Font
  /Subtype /Type0
  /BaseFont /STSong-Light
  /Encoding /UniGB-UTF16-H
  /DescendantFonts [5 0 R]
>>
endobj
5 0 obj
<<
  /Type /Font
  /Subtype /CIDFontType0
  /BaseFont /STSong-Light
  /CIDSystemInfo <<
    /Registry (Adobe)
    /Ordering (GB1)
    /Supplement 4
  >>
>>
endobj
6 0 obj
<<
  /Length 120
>>
stream
BT
/F1 24 Tf
72 700 Td
<0050004400465de551770020969079c15b895168> Tj
ET
endstream
endobj
xref
0 7
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000247 00000 n 
0000000363 00000 n 
0000000511 00000 n 
trailer
<<
  /Size 7
  /Root 1 0 R
>>
startxref
680
%%EOF
`;

fs.writeFileSync(path.join(FIXTURES_DIR, 'cjk.pdf'), Buffer.from(cjkPdfRaw, 'binary'));
console.log('Saved tests/fixtures/cjk.pdf');

// Test that PDF.js can parse both fixtures without throwing
async function testFixtures() {
  const jp2Bytes = new Uint8Array(fs.readFileSync(path.join(FIXTURES_DIR, 'jp2.pdf')));
  const jp2Doc = await pdfjs.getDocument({ data: jp2Bytes }).promise;
  console.log('jp2.pdf verified with PDF.js, numPages:', jp2Doc.numPages);

  const cjkBytes = new Uint8Array(fs.readFileSync(path.join(FIXTURES_DIR, 'cjk.pdf')));
  const cjkDoc = await pdfjs.getDocument({
    data: cjkBytes,
    cMapUrl: path.resolve(__dirname, '../public/cmaps') + '/',
    cMapPacked: true
  }).promise;
  const page = await cjkDoc.getPage(1);
  const text = await page.getTextContent();
  console.log('cjk.pdf verified with PDF.js, items:', text.items.map(i => i.str).join(''));
}

testFixtures().catch(console.error);
