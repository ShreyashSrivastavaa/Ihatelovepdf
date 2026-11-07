const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const PORT = 8799;
const FIXTURES_DIR = path.resolve(__dirname, '../tests/fixtures');
const OUT_DIR = path.resolve(__dirname, '../out');

function createServer() {
  return http.createServer((req, res) => {
    let reqPath = decodeURIComponent(req.url.split('?')[0]);
    if (reqPath === '/') reqPath = '/index.html';
    let filePath = path.join(OUT_DIR, reqPath);

    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    } else if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
      filePath = filePath + '.html';
    }

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath);
      const types = {
        '.html': 'text/html; charset=utf-8',
        '.js': 'application/javascript',
        '.mjs': 'application/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.woff2': 'font/woff2',
        '.ttf': 'font/ttf',
        '.pfb': 'application/x-font',
        '.bcmap': 'application/octet-stream',
        '.properties': 'text/plain'
      };
      res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  });
}

const ALL_37_TOOLS = [
  { key: 'compress', slug: '/compress', acceptsPdf: true },
  { key: 'merge', slug: '/merge', acceptsPdf: true, multi: true },
  { key: 'split', slug: '/split', acceptsPdf: true },
  { key: 'extract', slug: '/extract', acceptsPdf: true },
  { key: 'crop', slug: '/crop', acceptsPdf: true },
  { key: 'rotate', slug: '/rotate', acceptsPdf: true },
  { key: 'reorder', slug: '/reorder', acceptsPdf: true },
  { key: 'pdfToImages', slug: '/pdf-to-images', acceptsPdf: true },
  { key: 'imagesToPdf', slug: '/images-to-pdf', fixture: 'sample.jpg' },
  { key: 'watermark', slug: '/watermark', acceptsPdf: true },
  { key: 'pageNumbers', slug: '/page-numbers', acceptsPdf: true },
  { key: 'headersFooters', slug: '/headers-footers', acceptsPdf: true },
  { key: 'extractText', slug: '/extract-text', acceptsPdf: true },
  { key: 'invertColors', slug: '/invert-colors', acceptsPdf: true },
  { key: 'redact', slug: '/redact', acceptsPdf: true },
  { key: 'compare', slug: '/compare', acceptsPdf: true, compare: true },
  { key: 'pdfToZip', slug: '/pdf-to-zip', acceptsPdf: true },
  { key: 'editPdf', slug: '/edit-pdf', acceptsPdf: true },
  { key: 'scanToPdf', slug: '/scan-to-pdf', fixture: 'sample.jpg' },
  { key: 'markdownToPdf', slug: '/markdown-to-pdf', fixture: 'sample.md' },
  { key: 'htmlToPdf', slug: '/html-to-pdf', fixture: 'sample.html' },
  { key: 'csvToPdf', slug: '/csv-to-pdf', fixture: 'sample.csv' },
  { key: 'createPdf', slug: '/create-pdf', actionType: 'blank' },
  { key: 'excelToPdf', slug: '/excel-to-pdf', fixture: 'sample.xlsx' },
  { key: 'pdfToExcel', slug: '/pdf-to-excel', acceptsPdf: true },
  { key: 'pdfToWord', slug: '/pdf-to-word', acceptsPdf: true },
  { key: 'powerpointToPdf', slug: '/powerpoint-to-pdf', fixture: 'sample.pptx' },
  { key: 'pdfToPowerpoint', slug: '/pdf-to-powerpoint', acceptsPdf: true },
  { key: 'pdfToHtml', slug: '/pdf-to-html', acceptsPdf: true },
  { key: 'pdfToEpub', slug: '/pdf-to-epub', acceptsPdf: true },
  { key: 'ebookToPdf', slug: '/ebook-to-pdf', fixture: 'sample.epub' },
  { key: 'whiteboard', slug: '/whiteboard', actionType: 'whiteboard' },
  { key: 'gstInvoice', slug: '/gst-invoice', actionType: 'button' },
  { key: 'posBilling', slug: '/pos-billing', actionType: 'button' },
  { key: 'signPdf', slug: '/sign-pdf', acceptsPdf: true, signMode: 'typed' },
  { key: 'fillPdfForm', slug: '/fill-pdf-form', acceptsPdf: true, form: true },
  { key: 'wordToPdf', slug: '/word-to-pdf', fixture: path.join(__dirname, 'complex-test.docx') }
];

const PDF_FIXTURES = [
  { name: 'simpleText', file: 'small.pdf' },
  { name: 'complex', file: 'complex.pdf' },
  { name: 'jpeg2000', file: 'jp2.pdf' },
  { name: 'cjk', file: 'cjk.pdf' }
];

async function testToolWithFixture(browser, tool, fixtureObj, waitMs = 2500) {
  const context = await browser.newContext();
  const page = await context.newPage();

  let isOffline = false;
  const attemptedOfflineRequests = [];
  const backgroundPrefetches = [];
  const functionalFailingRequests = [];

  page.on('request', req => {
    if (isOffline) {
      const url = req.url();
      attemptedOfflineRequests.push(url);
      if (url.includes('?_rsc=') || url.endsWith('.txt')) {
        backgroundPrefetches.push(url);
      } else if (!url.startsWith('blob:') && !url.startsWith('data:')) {
        functionalFailingRequests.push(url);
      }
    }
  });

  try {
    const res = await page.goto(`http://localhost:${PORT}${tool.slug}`, { waitUntil: 'load', timeout: 15000 });
    if (!res || res.status() >= 400) {
      await context.close();
      return {
        passed: false,
        functionalFailures: [`HTTP ${res ? res.status() : 404} on load`],
        backgroundPrefetches: [],
        note: 'Load failed'
      };
    }

    // Wait specified time online
    await page.waitForTimeout(waitMs);

    // Disconnect network
    isOffline = true;
    await context.setOffline(true);

    if (tool.acceptsPdf) {
      const filePath = path.join(FIXTURES_DIR, fixtureObj.file);
      const fileInput = page.locator('input[type="file"]').first();

      if (tool.compare) {
        await fileInput.setInputFiles(filePath);
        await page.waitForTimeout(500);
        const second = page.locator('input[type="file"]').nth(1);
        if (await second.count() > 0) await second.setInputFiles(filePath);
      } else if (tool.multi) {
        await fileInput.setInputFiles([filePath, filePath]);
      } else {
        await fileInput.setInputFiles(filePath);
      }

      await page.waitForTimeout(1000);

      if (tool.signMode === 'typed') {
        const addSigBtn = page.locator('button').filter({ hasText: /create signature|add signature|firmar|sign/i }).first();
        if (await addSigBtn.count() > 0) {
          await addSigBtn.click().catch(() => {});
          await page.waitForTimeout(600);
          const typeTab = page.locator('button').filter({ hasText: /type|escribir|tipp/i }).first();
          if (await typeTab.count() > 0) {
            await typeTab.click().catch(() => {});
            await page.waitForTimeout(400);
            const nameInput = page.locator('input[type="text"]').first();
            if (await nameInput.count() > 0) {
              await nameInput.fill('John Doe');
              await page.waitForTimeout(400);
            }
          }
        }
      }

      // Click primary action button
      const buttons = page.locator('button');
      const count = await buttons.count();
      for (let i = 0; i < count; i++) {
        const btn = buttons.nth(i);
        const text = await btn.innerText().catch(() => '');
        const isVisible = await btn.isVisible().catch(() => false);
        const isEnabled = await btn.isEnabled().catch(() => false);
        if (isVisible && isEnabled && /process|merge|compress|split|rotate|extract|watermark|crop|download|apply|protect|convert/i.test(text)) {
          await btn.click({ timeout: 3000 }).catch(() => {});
          break;
        }
      }
      await page.waitForTimeout(1000);
    } else if (tool.fixture) {
      const filePath = path.isAbsolute(tool.fixture) ? tool.fixture : path.join(FIXTURES_DIR, tool.fixture);
      const fileInput = page.locator('input[type="file"]').first();
      if (await fileInput.count() > 0) {
        await fileInput.setInputFiles(filePath);
        await page.waitForTimeout(1000);
        const buttons = page.locator('button');
        const count = await buttons.count();
        for (let i = 0; i < count; i++) {
          const btn = buttons.nth(i);
          const text = await btn.innerText().catch(() => '');
          if (/process|convert|download|generate/i.test(text)) {
            await btn.click({ timeout: 3000 }).catch(() => {});
            break;
          }
        }
        await page.waitForTimeout(1000);
      }
    } else if (tool.actionType === 'blank') {
      const btn = page.locator('button').filter({ hasText: /create|blank/i }).first();
      if (await btn.count() > 0) await btn.click().catch(() => {});
      await page.waitForTimeout(600);
    }

    const passed = functionalFailingRequests.length === 0;
    await context.close();
    return {
      passed,
      functionalFailures: functionalFailingRequests,
      backgroundPrefetches: backgroundPrefetches,
      note: passed ? 'PASS' : `FAIL (${functionalFailingRequests.join(', ')})`
    };
  } catch (err) {
    await context.close();
    return {
      passed: false,
      functionalFailures: [err.message.slice(0, 80)],
      backgroundPrefetches: backgroundPrefetches,
      note: 'Exception thrown'
    };
  }
}

async function run() {
  const server = createServer();
  await new Promise(r => server.listen(PORT, r));
  console.log(`Server running on port ${PORT}...`);

  const browser = await chromium.launch({ headless: true });

  console.log('Testing 37 tools...');
  const matrixResults = [];

  for (let idx = 0; idx < ALL_37_TOOLS.length; idx++) {
    const tool = ALL_37_TOOLS[idx];
    const toolRow = {
      key: tool.key,
      slug: tool.slug,
      acceptsPdf: tool.acceptsPdf,
      results: {}
    };

    if (tool.acceptsPdf) {
      for (const fix of PDF_FIXTURES) {
        toolRow.results[fix.name] = await testToolWithFixture(browser, tool, fix, 2500);
      }
      toolRow.results['offlineAt1s'] = await testToolWithFixture(browser, tool, PDF_FIXTURES[0], 1000);
    } else {
      toolRow.results['nonPdf'] = await testToolWithFixture(browser, tool, { file: tool.fixture || 'custom' }, 2500);
      toolRow.results['offlineAt1s'] = await testToolWithFixture(browser, tool, { file: tool.fixture || 'custom' }, 1000);
    }

    const summary = tool.acceptsPdf 
      ? `simple=${toolRow.results.simpleText.passed ? 'PASS' : 'FAIL'}, complex=${toolRow.results.complex.passed ? 'PASS' : 'FAIL'}, jp2=${toolRow.results.jpeg2000.passed ? 'PASS' : 'FAIL'}, cjk=${toolRow.results.cjk.passed ? 'PASS' : 'FAIL'}, 1s=${toolRow.results.offlineAt1s.passed ? 'PASS' : 'FAIL'}`
      : `fixture=${toolRow.results.nonPdf.passed ? 'PASS' : 'FAIL'}, 1s=${toolRow.results.offlineAt1s.passed ? 'PASS' : 'FAIL'}`;

    console.log(`[${idx+1}/37] ${tool.key.padEnd(18)}: ${summary}`);
    matrixResults.push(toolRow);
  }

  fs.writeFileSync(path.join(__dirname, 'full-37-matrix-results.json'), JSON.stringify(matrixResults, null, 2));
  console.log('\nSaved scratch/full-37-matrix-results.json');

  await browser.close();
  server.close();
}

run().catch(console.error);
