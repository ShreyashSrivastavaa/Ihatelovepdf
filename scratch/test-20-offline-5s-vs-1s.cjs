const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('@playwright/test');

const OUT_DIR = path.resolve(__dirname, '../out');
const FIXTURES_DIR = path.resolve(__dirname, '../tests/fixtures');
const PORT = 8770;

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

const PDFJS_TOOLS = [
  { key: 'compress', slug: '/compress' },
  { key: 'merge', slug: '/merge', files: ['small.pdf', 'small.pdf'] },
  { key: 'split', slug: '/split' },
  { key: 'extract', slug: '/extract' },
  { key: 'crop', slug: '/crop' },
  { key: 'rotate', slug: '/rotate' },
  { key: 'reorder', slug: '/reorder' },
  { key: 'pdfToImages', slug: '/pdf-to-images' },
  { key: 'watermark', slug: '/watermark' },
  { key: 'pageNumbers', slug: '/page-numbers' },
  { key: 'headersFooters', slug: '/headers-footers' },
  { key: 'extractText', slug: '/extract-text' },
  { key: 'invertColors', slug: '/invert-colors' },
  { key: 'compare', slug: '/compare', files: ['small.pdf', 'small.pdf'] },
  { key: 'pdfToZip', slug: '/pdf-to-zip' },
  { key: 'pdfToExcel', slug: '/pdf-to-excel' },
  { key: 'pdfToWord', slug: '/pdf-to-word' },
  { key: 'pdfToPowerpoint', slug: '/pdf-to-powerpoint' },
  { key: 'pdfToHtml', slug: '/pdf-to-html' },
  { key: 'pdfToEpub', slug: '/pdf-to-epub' }
];

async function testScenario(waitMs, scenarioName) {
  console.log(`\n======================================================`);
  console.log(`TESTING SCENARIO: ${scenarioName} (${waitMs / 1000}s online wait)`);
  console.log(`======================================================`);

  const browser = await chromium.launch({ headless: true });
  const results = [];

  for (const tool of PDFJS_TOOLS) {
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
        offlineRequests.push(req.url());
      }
    });

    let passed = false;
    let note = '';

    try {
      await page.goto(`http://localhost:${PORT}${tool.slug}`, { waitUntil: 'load', timeout: 15000 });
      // Wait specified time for warm-up while online
      await page.waitForTimeout(waitMs);

      // Go offline
      isOffline = true;
      await context.setOffline(true);

      const fileInput = page.locator('input[type="file"]').first();
      const count = await page.locator('input[type="file"]').count();

      if (tool.files && tool.files.length > 1) {
        const file1 = path.join(FIXTURES_DIR, tool.files[0]);
        const file2 = path.join(FIXTURES_DIR, tool.files[1]);
        if (tool.key === 'compare') {
          await fileInput.setInputFiles(file1);
          await page.waitForTimeout(1000);
          const secondInput = page.locator('input[type="file"]').nth(1);
          if (await secondInput.count() > 0) {
            await secondInput.setInputFiles(file2);
          }
        } else {
          await fileInput.setInputFiles([file1, file2]);
        }
      } else {
        await fileInput.setInputFiles(path.join(FIXTURES_DIR, 'small.pdf'));
      }

      await page.waitForTimeout(2000);

      // Check if any error banner or failed requests
      const errorMsg = consoleErrors.find(e => e.includes('net::ERR_') || e.includes('Failed to fetch') || e.includes('worker'));
      if (errorMsg) {
        note = `Console error: ${errorMsg.slice(0, 80)}`;
      } else if (offlineRequests.length > 0) {
        note = `Blocked offline requests: ${offlineRequests.slice(0, 2).join(', ')}`;
      } else {
        passed = true;
        note = 'Processed without network requests';
      }
    } catch (err) {
      note = `Execution failed: ${err.message.slice(0, 80)}`;
    }

    results.push({ key: tool.key, slug: tool.slug, passed, note, offlineRequestsCount: offlineRequests.length });
    const status = passed ? 'PASS' : 'FAIL';
    console.log(`[${status}] ${tool.key.padEnd(16)} : ${note}`);

    await context.close();
  }

  await browser.close();
  return results;
}

async function run() {
  const server = createStaticServer();
  await new Promise(r => server.listen(PORT, r));
  console.log(`Server listening on port ${PORT}...`);

  const results5s = await testScenario(5000, '5 Seconds Online Wait');
  const results1s = await testScenario(1000, '1 Second Online Wait');

  fs.writeFileSync('scratch/pdfjs-tools-offline-results.json', JSON.stringify({ results5s, results1s }, null, 2));

  server.close();
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

