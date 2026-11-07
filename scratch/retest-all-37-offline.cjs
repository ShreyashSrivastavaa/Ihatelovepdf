const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('@playwright/test');

const OUT_DIR = path.resolve(__dirname, '../out');
const FIXTURES_DIR = path.resolve(__dirname, '../tests/fixtures');
const PORT = 8773;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.wasm': 'application/wasm',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain',
  '.ttf': 'font/ttf',
  '.pfb': 'application/x-font-type1',
  '.bcmap': 'application/octet-stream',
  '.properties': 'text/plain'
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
      res.writeHead(200, {
        'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
        'Cache-Control': 'public, max-age=31536000, immutable'
      });
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  });
}

// 37 tools
const TOOLS_37 = [
  { key: 'compress', slug: '/compress', acceptsPdf: true },
  { key: 'merge', slug: '/merge', acceptsPdf: true, multi: true },
  { key: 'split', slug: '/split', acceptsPdf: true },
  { key: 'extract', slug: '/extract', acceptsPdf: true },
  { key: 'crop', slug: '/crop', acceptsPdf: true },
  { key: 'rotate', slug: '/rotate', acceptsPdf: true },
  { key: 'reorder', slug: '/reorder', acceptsPdf: true },
  { key: 'pdfToImages', slug: '/pdf-to-images', acceptsPdf: true },
  { key: 'imagesToPdf', slug: '/images-to-pdf', nonPdfFixture: 'sample.jpg' },
  { key: 'watermark', slug: '/watermark', acceptsPdf: true },
  { key: 'pageNumbers', slug: '/page-numbers', acceptsPdf: true },
  { key: 'headersFooters', slug: '/headers-footers', acceptsPdf: true },
  { key: 'extractText', slug: '/extract-text', acceptsPdf: true },
  { key: 'invertColors', slug: '/invert-colors', acceptsPdf: true },
  { key: 'redact', slug: '/redact', acceptsPdf: true },
  { key: 'compare', slug: '/compare', acceptsPdf: true, compare: true },
  { key: 'pdfToZip', slug: '/pdf-to-zip', acceptsPdf: true },
  { key: 'editPdf', slug: '/edit-pdf', acceptsPdf: true },
  { key: 'scanToPdf', slug: '/scan-to-pdf', nonPdfFixture: 'sample.jpg' },
  { key: 'markdownToPdf', slug: '/markdown-to-pdf', nonPdfFixture: 'sample.md' },
  { key: 'htmlToPdf', slug: '/html-to-pdf', nonPdfFixture: 'sample.html' },
  { key: 'csvToPdf', slug: '/csv-to-pdf', nonPdfFixture: 'sample.csv' },
  { key: 'createPdf', slug: '/create-pdf', actionType: 'blank' },
  { key: 'excelToPdf', slug: '/excel-to-pdf', nonPdfFixture: 'sample.xlsx' },
  { key: 'pdfToExcel', slug: '/pdf-to-excel', acceptsPdf: true },
  { key: 'pdfToWord', slug: '/pdf-to-word', acceptsPdf: true },
  { key: 'powerpointToPdf', slug: '/powerpoint-to-pdf', nonPdfFixture: 'sample.pptx' },
  { key: 'pdfToPowerpoint', slug: '/pdf-to-powerpoint', acceptsPdf: true },
  { key: 'pdfToHtml', slug: '/pdf-to-html', acceptsPdf: true },
  { key: 'pdfToEpub', slug: '/pdf-to-epub', acceptsPdf: true },
  { key: 'ebookToPdf', slug: '/ebook-to-pdf', nonPdfFixture: 'sample.epub' },
  { key: 'whiteboard', slug: '/whiteboard', actionType: 'whiteboard' },
  { key: 'gstInvoice', slug: '/gst-invoice', actionType: 'button' },
  { key: 'posBilling', slug: '/pos-billing', actionType: 'button' },
  { key: 'signPdf', slug: '/sign-pdf', acceptsPdf: true },
  { key: 'fillPdfForm', slug: '/fill-pdf-form', acceptsPdf: true, form: true },
  { key: 'wordToPdf', slug: '/word-to-pdf', nonPdfFixture: 'sample.docx' }
];

async function testToolFixture(browser, tool, fixtureName) {
  const context = await browser.newContext();
  const page = await context.newPage();
  const offlineRequests = [];
  let isOffline = false;
  let consoleErrors = [];

  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  page.on('request', req => {
    if (isOffline) {
      offlineRequests.push({ url: req.url(), method: req.method() });
    }
  });

  let passed = false;
  let failingRequest = 'none';
  let note = '';

  try {
    const res = await page.goto(`http://localhost:${PORT}${tool.slug}`, { waitUntil: 'load', timeout: 15000 });
    if (!res || res.status() >= 400) {
      failingRequest = `HTTP ${res ? res.status() : 404} on ${tool.slug}`;
      await context.close();
      return { passed: false, failingRequest, note: `Page load failed with ${res ? res.status() : 404}` };
    }

    // Wait 5s online for warmup
    await page.waitForTimeout(5000);

    // Go offline
    isOffline = true;
    await context.setOffline(true);

    if (tool.acceptsPdf) {
      const fileInput = page.locator('input[type="file"]').first();
      const count = await page.locator('input[type="file"]').count();

      if (tool.compare) {
        await fileInput.setInputFiles(path.join(FIXTURES_DIR, fixtureName));
        await page.waitForTimeout(1000);
        const secondInput = page.locator('input[type="file"]').nth(1);
        if (await secondInput.count() > 0) {
          await secondInput.setInputFiles(path.join(FIXTURES_DIR, fixtureName));
        }
      } else if (tool.multi) {
        await fileInput.setInputFiles([
          path.join(FIXTURES_DIR, fixtureName),
          path.join(FIXTURES_DIR, fixtureName)
        ]);
      } else {
        await fileInput.setInputFiles(path.join(FIXTURES_DIR, fixtureName));
      }

      await page.waitForTimeout(2000);

      // Click process / action button if available
      const buttons = page.locator('button');
      const btnCount = await buttons.count();
      for (let i = 0; i < btnCount; i++) {
        const btn = buttons.nth(i);
        const text = await btn.innerText().catch(() => '');
        const isVisible = await btn.isVisible().catch(() => false);
        const isEnabled = await btn.isEnabled().catch(() => false);
        if (isVisible && isEnabled && /process|merge|compress|split|rotate|extract|watermark|crop|apply|protect|download|convert/i.test(text)) {
          await btn.click({ timeout: 3000 }).catch(() => {});
          break;
        }
      }

      await page.waitForTimeout(2000);
    } else if (tool.nonPdfFixture) {
      const fileInput = page.locator('input[type="file"]').first();
      if (await fileInput.count() > 0) {
        await fileInput.setInputFiles(path.join(FIXTURES_DIR, tool.nonPdfFixture));
        await page.waitForTimeout(2000);
        const buttons = page.locator('button');
        const btnCount = await buttons.count();
        for (let i = 0; i < btnCount; i++) {
          const btn = buttons.nth(i);
          const text = await btn.innerText().catch(() => '');
          if (/process|convert|generate|download/i.test(text)) {
            await btn.click({ timeout: 3000 }).catch(() => {});
            break;
          }
        }
        await page.waitForTimeout(2000);
      }
    } else if (tool.actionType === 'blank') {
      const btn = page.locator('button').filter({ hasText: /create|blank/i }).first();
      if (await btn.count() > 0) await btn.click({ timeout: 3000 }).catch(() => {});
      await page.waitForTimeout(1000);
    }

    if (offlineRequests.length > 0) {
      failingRequest = offlineRequests.map(r => r.url).join(', ');
      note = `Blocked offline requests: ${offlineRequests.length}`;
    } else {
      const fatalErr = consoleErrors.find(e => e.includes('net::ERR_') || e.includes('Failed to fetch'));
      if (fatalErr) {
        failingRequest = fatalErr.slice(0, 100);
        note = 'Console network error';
      } else {
        passed = true;
        note = '100% offline success';
      }
    }
  } catch (err) {
    failingRequest = err.message.slice(0, 80);
    note = 'Exception thrown';
  }

  await context.close();
  return { passed, failingRequest, note };
}

async function run() {
  const server = createStaticServer();
  await new Promise(r => server.listen(PORT, r));
  console.log(`Server listening on port ${PORT}...`);

  const browser = await chromium.launch({ headless: true });
  const results = [];

  for (const tool of TOOLS_37) {
    console.log(`\nTesting tool: ${tool.key} (${tool.slug})...`);

    if (tool.acceptsPdf) {
      const r1 = await testToolFixture(browser, tool, 'small.pdf');
      const r2 = await testToolFixture(browser, tool, 'complex.pdf');
      results.push({
        key: tool.key,
        slug: tool.slug,
        isPdfTool: true,
        simplePdf: r1,
        complexPdf: r2
      });
      console.log(`  Simple PDF  : ${r1.passed ? 'PASS' : 'FAIL'} (${r1.failingRequest})`);
      console.log(`  Complex PDF : ${r2.passed ? 'PASS' : 'FAIL'} (${r2.failingRequest})`);
    } else {
      const r = await testToolFixture(browser, tool, tool.nonPdfFixture || 'action');
      results.push({
        key: tool.key,
        slug: tool.slug,
        isPdfTool: false,
        simplePdf: r,
        complexPdf: r
      });
      console.log(`  Non-PDF / Action: ${r.passed ? 'PASS' : 'FAIL'} (${r.failingRequest})`);
    }
  }

  await browser.close();
  server.close();

  fs.writeFileSync('scratch/retest-37-results.json', JSON.stringify(results, null, 2));
  console.log('\nRetest completed and saved to scratch/retest-37-results.json');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

