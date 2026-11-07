const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('@playwright/test');

const OUT_DIR = path.resolve(__dirname, '../out');
const FIXTURES_DIR = path.resolve(__dirname, '../tests/fixtures');
const SAMPLE_PDF = path.join(FIXTURES_DIR, 'small.pdf');
const PORT = 8768;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.wasm': 'application/wasm',
  '.woff2': 'font/woff2'
};

const server = http.createServer((req, res) => {
  let u = decodeURIComponent(req.url.split('?')[0]);
  if (u === '/') u = '/index.html';
  let p = path.join(OUT_DIR, u);
  if (fs.existsSync(p) && fs.statSync(p).isDirectory()) {
    const idx = path.join(p, 'index.html');
    if (fs.existsSync(idx)) p = idx;
    else if (fs.existsSync(p + '.html')) p = p + '.html';
  } else if (!fs.existsSync(p) && fs.existsSync(p + '.html')) {
    p = p + '.html';
  }

  if (fs.existsSync(p) && fs.statSync(p).isFile()) {
    res.writeHead(200, { 'Content-Type': MIME[path.extname(p)] || 'application/octet-stream' });
    fs.createReadStream(p).pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
  }
});

const TARGET_PAGES = [
  { name: 'Homepage (English)', path: '/' },
  { name: 'Tool: Merge PDF', path: '/merge', isTool: true, multi: true },
  { name: 'Tool: Compress PDF', path: '/compress', isTool: true },
  { name: 'Tool: Split PDF', path: '/split', isTool: true },
  { name: 'Tool: Rotate PDF', path: '/rotate', isTool: true },
  { name: 'Tool: Reorder PDF', path: '/reorder', isTool: true },
  { name: 'Localized Tool: Unir PDF (Spanish)', path: '/es/unir', isTool: true, multi: true },
  { name: 'Localized Homepage: German', path: '/de' },
  { name: 'Guide: How to Merge PDF Files', path: '/guides/how-to-merge-pdf-files' },
  { name: 'Landing: Offline PDF Tools', path: '/offline-pdf-tools' },
];

async function run() {
  await new Promise(r => server.listen(PORT, r));
  console.log(`Server listening on port ${PORT}...`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();

  let totalThirdParty = 0;
  let totalDocPayloads = 0;
  let totalFailedRequests = 0;

  for (const item of TARGET_PAGES) {
    const page = await context.newPage();
    const requests = [];
    const thirdPartyRequests = [];
    const docPayloadRequests = [];
    const failedResponses = [];

    page.on('request', req => {
      const url = req.url();
      if (url.startsWith('blob:') || url.startsWith('data:')) {
        return;
      }
      let isThirdParty = false;
      try {
        const u = new URL(url);
        if (u.hostname !== 'localhost' && u.hostname !== '127.0.0.1') {
          isThirdParty = true;
          thirdPartyRequests.push({ url, method: req.method() });
        }
      } catch {}

      const postData = req.postData() || '';
      const hasPdf = postData.includes('%PDF-') || postData.includes('small.pdf');
      if (hasPdf) {
        docPayloadRequests.push({ url, method: req.method(), size: postData.length });
      }

      requests.push({ url, method: req.method(), isThirdParty, hasPdf });
    });

    page.on('response', resp => {
      if (resp.status() >= 400) {
        failedResponses.push({ url: resp.url(), status: resp.status() });
      }
    });

    try {
      const targetUrl = `http://localhost:${PORT}${item.path}`;
      await page.goto(targetUrl, { waitUntil: 'load', timeout: 15000 });
      await page.waitForTimeout(1000);

      if (item.isTool && fs.existsSync(SAMPLE_PDF)) {
        const fileInput = page.locator('input[type="file"]').first();
        if (await fileInput.count() > 0) {
          if (item.multi) {
            await fileInput.setInputFiles([SAMPLE_PDF, SAMPLE_PDF]);
          } else {
            await fileInput.setInputFiles(SAMPLE_PDF);
          }
          await page.waitForTimeout(1000);

          const buttons = page.locator('button');
          const count = await buttons.count();
          for (let i = 0; i < count; i++) {
            const text = await buttons.nth(i).innerText().catch(() => '');
            if (/process|merge|compress|split|rotate|extract|watermark|crop|download|apply|protect|unir/i.test(text)) {
              await buttons.nth(i).click({ timeout: 3000 }).catch(() => {});
              break;
            }
          }
          await page.waitForTimeout(2000);
        }
      }

      totalThirdParty += thirdPartyRequests.length;
      totalDocPayloads += docPayloadRequests.length;
      totalFailedRequests += failedResponses.length;

      const pagePassed = thirdPartyRequests.length === 0 && docPayloadRequests.length === 0 && failedResponses.length === 0;

      console.log(`[${pagePassed ? 'PASS' : 'FAIL'}] ${item.name.padEnd(35)}: ${requests.length} reqs | 3rd-party: ${thirdPartyRequests.length} | doc-payloads: ${docPayloadRequests.length} | 4xx/5xx: ${failedResponses.length}`);

    } catch (err) {
      console.error(`[ERROR] ${item.name}: ${err.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  server.close();

  console.log(`\n======================================================`);
  console.log(`TOTAL 3RD-PARTY REQUESTS   : ${totalThirdParty}`);
  console.log(`TOTAL DOCUMENT PAYLOADS    : ${totalDocPayloads}`);
  console.log(`TOTAL FAILED ASSET REQUESTS: ${totalFailedRequests}`);
  console.log(`======================================================`);

  if (totalThirdParty === 0 && totalDocPayloads === 0 && totalFailedRequests === 0) {
    console.log(`\nAll 10 production URLs passed zero-leakage test.`);
  } else {
    process.exit(1);
  }
}

run().catch(console.error);

