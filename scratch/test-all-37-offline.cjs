const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('@playwright/test');

const OUT_DIR = path.resolve(__dirname, '../out');
const FIXTURES_DIR = path.resolve(__dirname, '../tests/fixtures');
const PORT = 8769;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.wasm': 'application/wasm',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain'
};

function createStaticServer() {
  return http.createServer((req, res) => {
    let cleanUrl = decodeURIComponent(req.url.split('?')[0]);
    if (cleanUrl === '/') cleanUrl = '/index.html';
    let filePath = path.join(OUT_DIR, cleanUrl);

    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      const indexFile = path.join(filePath, 'index.html');
      if (fs.existsSync(indexFile)) filePath = indexFile;
      else if (fs.existsSync(filePath + '.html')) filePath = filePath + '.html';
    } else if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
      filePath = filePath + '.html';
    }

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath);
      res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  });
}

const TOOLS_CONFIG = [
  { key: 'compress', slug: '/compress', fixture: 'small.pdf' },
  { key: 'merge', slug: '/merge', fixture: ['small.pdf', 'small.pdf'] },
  { key: 'split', slug: '/split', fixture: 'small.pdf' },
  { key: 'extract', slug: '/extract', fixture: 'small.pdf' },
  { key: 'crop', slug: '/crop', fixture: 'small.pdf' },
  { key: 'rotate', slug: '/rotate', fixture: 'small.pdf' },
  { key: 'reorder', slug: '/reorder', fixture: 'small.pdf' },
  { key: 'pdfToImages', slug: '/pdf-to-images', fixture: 'small.pdf' },
  { key: 'imagesToPdf', slug: '/images-to-pdf', fixture: 'sample.jpg' },
  { key: 'watermark', slug: '/watermark', fixture: 'small.pdf' },
  { key: 'pageNumbers', slug: '/page-numbers', fixture: 'small.pdf' },
  { key: 'headersFooters', slug: '/headers-footers', fixture: 'small.pdf' },
  { key: 'extractText', slug: '/extract-text', fixture: 'small.pdf' },
  { key: 'invertColors', slug: '/invert-colors', fixture: 'small.pdf' },
  { key: 'redact', slug: '/redact', fixture: 'small.pdf' },
  { key: 'compare', slug: '/compare', fixture: ['small.pdf', 'small.pdf'] },
  { key: 'pdfToZip', slug: '/pdf-to-zip', fixture: 'small.pdf' },
  { key: 'editPdf', slug: '/edit-pdf', fixture: 'small.pdf' },
  { key: 'scanToPdf', slug: '/scan-to-pdf', fixture: 'sample.jpg' },
  { key: 'markdownToPdf', slug: '/markdown-to-pdf', fixture: 'sample.md' },
  { key: 'htmlToPdf', slug: '/html-to-pdf', fixture: 'sample.html' },
  { key: 'csvToPdf', slug: '/csv-to-pdf', fixture: 'sample.csv' },
  { key: 'createPdf', slug: '/create-pdf', actionType: 'button' },
  { key: 'excelToPdf', slug: '/excel-to-pdf', fixture: 'sample.xlsx' },
  { key: 'pdfToExcel', slug: '/pdf-to-excel', fixture: 'small.pdf' },
  { key: 'pdfToWord', slug: '/pdf-to-word', fixture: 'small.pdf' },
  { key: 'powerpointToPdf', slug: '/powerpoint-to-pdf', fixture: 'sample.pptx' },
  { key: 'pdfToPowerpoint', slug: '/pdf-to-powerpoint', fixture: 'small.pdf' },
  { key: 'pdfToHtml', slug: '/pdf-to-html', fixture: 'small.pdf' },
  { key: 'pdfToEpub', slug: '/pdf-to-epub', fixture: 'small.pdf' },
  { key: 'ebookToPdf', slug: '/ebook-to-pdf', fixture: 'sample.epub' },
  { key: 'whiteboard', slug: '/whiteboard', actionType: 'whiteboard' },
  { key: 'gstInvoice', slug: '/gst-invoice', actionType: 'button' },
  { key: 'posBilling', slug: '/pos-billing', actionType: 'button' },
  { key: 'signPdf', slug: '/sign-pdf', fixture: 'small.pdf' },
  { key: 'fillPdfForm', slug: '/fill-pdf-form', fixture: 'form.pdf' },
  { key: 'editPdfForResume', slug: '/edit-pdf-for-resume', actionType: 'button' }
];

async function runOfflineTest() {
  const server = createStaticServer();
  await new Promise(r => server.listen(PORT, r));
  console.log(`Server listening on port ${PORT}...`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();

  const results = [];

  for (const tool of TOOLS_CONFIG) {
    const page = await context.newPage();
    const offlineRequests = [];
    const initialRequests = [];
    let isOffline = false;
    let consoleErrors = [];

    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    page.on('request', req => {
      const url = req.url();
      if (isOffline) {
        offlineRequests.push({
          url,
          method: req.method(),
          resourceType: req.resourceType()
        });
      } else {
        initialRequests.push(url);
      }
    });

    try {
      // 1. Initial Load online
      await page.goto(`http://localhost:${PORT}${tool.slug}`, { waitUntil: 'load', timeout: 15000 });
      // Allow Next.js hydration to complete
      await page.waitForTimeout(1000);

      // 2. Set browser OFFLINE
      isOffline = true;
      await context.setOffline(true);

      // 3. Process File / Trigger Action while offline
      let actionSuccess = false;
      let actionNote = '';

      if (tool.fixture) {
        const fileInputs = page.locator('input[type="file"]');
        const inputCount = await fileInputs.count();
        if (inputCount >= 2 && Array.isArray(tool.fixture)) {
          await fileInputs.nth(0).setInputFiles(path.join(FIXTURES_DIR, tool.fixture[0]));
          await fileInputs.nth(1).setInputFiles(path.join(FIXTURES_DIR, tool.fixture[1]));
          await page.waitForTimeout(1000);
          actionSuccess = true;
          actionNote = 'Fed 2 comparison files';
        } else if (inputCount > 0) {
          const fileInput = fileInputs.first();
          const fixtures = Array.isArray(tool.fixture)
            ? tool.fixture.map(f => path.join(FIXTURES_DIR, f))
            : path.join(FIXTURES_DIR, tool.fixture);
          
          await fileInput.setInputFiles(fixtures);
          await page.waitForTimeout(1000);

          // Click process button if visible
          const buttons = page.locator('button');
          const count = await buttons.count();
          for (let i = 0; i < count; i++) {
            const text = await buttons.nth(i).innerText().catch(() => '');
            if (/process|merge|compress|split|rotate|extract|watermark|crop|download|apply|protect|convert|generate|export|sign|fill/i.test(text)) {
              await buttons.nth(i).click({ timeout: 3000 }).catch(() => {});
              break;
            }
          }
          await page.waitForTimeout(2000);
          actionSuccess = true;
          actionNote = 'File fed & processed';
        } else {
          actionSuccess = true;
          actionNote = 'Interactive UI loaded without file input';
        }
      } else if (tool.actionType === 'button') {
        const buttons = page.locator('button');
        const count = await buttons.count();
        for (let i = 0; i < count; i++) {
          const text = await buttons.nth(i).innerText().catch(() => '');
          if (/create|generate|compile|download|print|add/i.test(text)) {
            await buttons.nth(i).click({ timeout: 2000 }).catch(() => {});
            break;
          }
        }
        await page.waitForTimeout(1500);
        actionSuccess = true;
        actionNote = 'Action button triggered';
      } else if (tool.actionType === 'whiteboard') {
        const canvas = page.locator('canvas').first();
        if (await canvas.count() > 0) {
          actionSuccess = true;
          actionNote = 'Canvas interactive';
        }
      }

      // Check if any offline network requests were attempted (e.g. lazy chunks/wasm)
      const lazyChunkRequests = offlineRequests.filter(r => 
        r.url.includes('_next/static') || r.url.endsWith('.wasm') || r.url.endsWith('.worker.js')
      );

      const pass = lazyChunkRequests.length === 0;

      results.push({
        key: tool.key,
        slug: tool.slug,
        pass,
        offlineRequestsCount: offlineRequests.length,
        lazyChunkRequests,
        actionNote,
        consoleErrors: consoleErrors.slice(0, 3)
      });

      console.log(`[${pass ? 'PASS' : 'FAIL'}] ${tool.key.padEnd(20)} (${tool.slug}): offline reqs: ${offlineRequests.length} (lazy chunks: ${lazyChunkRequests.length}) | ${actionNote}`);

    } catch (err) {
      results.push({
        key: tool.key,
        slug: tool.slug,
        pass: false,
        error: err.message,
        offlineRequestsCount: offlineRequests.length,
        lazyChunkRequests: offlineRequests
      });
      console.log(`[ERROR] ${tool.key.padEnd(20)}: ${err.message}`);
    } finally {
      // Re-enable online before next page
      await context.setOffline(false);
      await page.close();
    }
  }

  await browser.close();
  server.close();

  fs.writeFileSync('scratch/all-37-offline-results.json', JSON.stringify(results, null, 2));

  console.log('\n======================================================');
  console.log(`TOTAL TOOLS TESTED: ${results.length}`);
  console.log(`PASSING (0 lazy network requests offline): ${results.filter(r => r.pass).length}`);
  console.log(`FAILING (lazy requests attempted offline): ${results.filter(r => !r.pass).length}`);
  console.log('======================================================');
}

runOfflineTest().catch(console.error);
