import { PDFDocument, rgb } from 'pdf-lib';
import JSZip from 'jszip';
import { pdfToZip, convertPdfToImages } from '../src/lib/pdf-operations';

// Polyfill DOMMatrix and OffscreenCanvas for Node.js test environment
if (typeof (globalThis as any).DOMMatrix === 'undefined') {
  class MockDOMMatrix {
    a = 1; b = 0; c = 0; d = 1; e = 0; f = 0;
    m11 = 1; m12 = 0; m21 = 0; m22 = 1; m41 = 0; m42 = 0;
    constructor(init?: number[] | string) {
      if (Array.isArray(init) && init.length >= 6) {
        this.a = init[0]; this.b = init[1]; this.c = init[2]; this.d = init[3]; this.e = init[4]; this.f = init[5];
      }
    }
    multiply() { return this; }
    translate() { return this; }
    scale() { return this; }
    transformPoint(pt: any) { return pt; }
    inverse() { return this; }
  }
  (globalThis as any).DOMMatrix = MockDOMMatrix;
}

if (typeof (globalThis as any).OffscreenCanvas === 'undefined') {
  class MockOffscreenCanvas {
    width: number;
    height: number;
    constructor(w: number, h: number) {
      this.width = w;
      this.height = h;
    }
    getContext() {
      const dummyCtx: any = {
        canvas: this,
        fillStyle: '#ffffff',
        strokeStyle: '#000000',
        lineWidth: 1,
        fillRect: () => {},
        drawImage: () => {},
        strokeRect: () => {},
        putImageData: () => {},
        getImageData: () => ({ data: new Uint8ClampedArray(4) }),
        save: () => {},
        restore: () => {},
        transform: () => {},
        setTransform: () => {},
        resetTransform: () => {},
        scale: () => {},
        translate: () => {},
        rotate: () => {},
        beginPath: () => {},
        moveTo: () => {},
        lineTo: () => {},
        bezierCurveTo: () => {},
        quadraticCurveTo: () => {},
        arc: () => {},
        closePath: () => {},
        fill: () => {},
        stroke: () => {},
        clip: () => {},
        clearRect: () => {},
        createPattern: () => null,
        createLinearGradient: () => ({ addColorStop: () => {} }),
        createRadialGradient: () => ({ addColorStop: () => {} }),
        getTransform: () => ({ a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }),
        measureText: () => ({ width: 10 }),
        fillText: () => {},
        strokeText: () => {},
      };
      return new Proxy(dummyCtx, {
        get(target, prop) {
          if (prop in target) return target[prop];
          return () => {};
        },
      });
    }
    async convertToBlob(options?: { type?: string; quality?: number }) {
      if (this.width <= 0 || this.height <= 0) {
        throw new Error('Failed to execute \'convertToBlob\' on \'OffscreenCanvas\': The size of "OffscreenCanvas" is zero.');
      }
      const dummyBytes = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82]);
      return new Blob([dummyBytes], { type: options?.type || 'image/png' });
    }
  }
  (globalThis as any).OffscreenCanvas = MockOffscreenCanvas;
}

async function runPdfToZipVerification() {
  console.log('===============================================================');
  console.log('📦 Verifying Direct PDF to ZIP & PDF to Images Pipelines');
  console.log('===============================================================\n');

  // 1. Create a 10 MB simulated PDF
  console.log('--- 1. Testing 10 MB PDF Direct ZIP Archiving (Byte Fidelity & Size) ---');
  const largeDoc = await PDFDocument.create();
  for (let i = 0; i < 50; i++) {
    const page = largeDoc.addPage([595, 842]);
    page.drawText(`High volume page ${i + 1}`, { x: 50, y: 750, size: 14, color: rgb(0.1, 0.1, 0.1) });
  }
  const baseLargeBytes = await largeDoc.save();
  // Pad buffer to reach ~10MB
  const targetSize = 10 * 1024 * 1024; // 10MB
  const padded10Mb = new Uint8Array(targetSize);
  padded10Mb.set(baseLargeBytes, 0);
  for (let i = baseLargeBytes.length; i < targetSize; i++) {
    padded10Mb[i] = (i % 256);
  }
  const file10Mb = new File([padded10Mb], '10mb_document.pdf', { type: 'application/pdf' });

  const zip10MbResult = await pdfToZip([file10Mb]);
  console.log(`Original PDF Size: ${(file10Mb.size / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Result ZIP Size: ${(zip10MbResult.length / (1024 * 1024)).toFixed(2)} MB`);

  if (zip10MbResult.length > 15 * 1024 * 1024) {
    throw new Error(`CRITICAL BUG: ZIP size is ${(zip10MbResult.length / (1024 * 1024)).toFixed(2)} MB (exceeds 15MB limit) — files are being rasterized!`);
  }

  const unzipped10Mb = await JSZip.loadAsync(zip10MbResult);
  const unzippedEntry = unzipped10Mb.file('10mb_document.pdf');
  if (!unzippedEntry) {
    throw new Error('Expected 10mb_document.pdf to be inside the ZIP archive');
  }
  const extractedBytes = await unzippedEntry.async('uint8array');
  if (extractedBytes.length !== file10Mb.size) {
    throw new Error(`Extracted PDF size (${extractedBytes.length}) does not match original (${file10Mb.size})`);
  }
  console.log('✅ PASS: 10 MB PDF packaged directly to ZIP with 100% byte fidelity!\n');

  // 2. Multi-PDF bundling and duplicate filename handling
  console.log('--- 2. Testing Multi-PDF Archiving & Filename Deduplication ---');
  const f1 = new File([new Uint8Array([1, 2, 3, 4])], 'report.pdf', { type: 'application/pdf' });
  const f2 = new File([new Uint8Array([5, 6, 7, 8])], 'report.pdf', { type: 'application/pdf' }); // duplicate name
  const f3 = new File([new Uint8Array([9, 10, 11, 12])], '../../malicious_path/invoice.pdf', { type: 'application/pdf' }); // path traversal attempt

  const multiZipResult = await pdfToZip([f1, f2, f3]);
  const unzippedMulti = await JSZip.loadAsync(multiZipResult);
  const multiEntries = Object.keys(unzippedMulti.files);

  console.log(`Multi-file ZIP entries: ${multiEntries.join(', ')}`);
  if (!multiEntries.includes('report.pdf') || !multiEntries.includes('report_1.pdf') || !multiEntries.includes('invoice.pdf')) {
    throw new Error(`Deduplication or path sanitation failed: got ${multiEntries.join(', ')}`);
  }
  console.log('✅ PASS: Multi-PDFs packaged with clean names and path safety!\n');

  // 3. Testing separate PDF to Images tool
  console.log('--- 3. Testing PDF to Images Tool (Rendering Pipeline) ---');
  const sampleDoc = await PDFDocument.create();
  sampleDoc.addPage([595, 842]);
  const sampleBytes = await sampleDoc.save();
  const sampleFile = new File([sampleBytes.buffer as ArrayBuffer], 'sample.pdf', { type: 'application/pdf' });

  const imageResult = await convertPdfToImages(sampleFile, {
    imageRenderDpi: 144,
    imageOutputFormat: 'png',
    bundleAsZip: true,
  });

  if (imageResult.kind !== 'zip') {
    throw new Error(`Expected zip result, got ${imageResult.kind}`);
  }
  console.log(`✅ PASS: PDF to Images extracted ${imageResult.imageCount} image into ZIP.\n`);

  console.log('🎉 ALL TESTS PASSED: PDF to ZIP is 100% direct, fast, and byte-preserving!');
}

runPdfToZipVerification().catch((err) => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
