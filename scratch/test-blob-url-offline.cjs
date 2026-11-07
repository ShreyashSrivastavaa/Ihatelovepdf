const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('@playwright/test');

const OUT_DIR = path.resolve(__dirname, '../out');
const FIXTURES_DIR = path.resolve(__dirname, '../tests/fixtures');
const PORT = 8772;

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

async function run() {
  const server = createStaticServer();
  await new Promise(r => server.listen(PORT, r));

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const offlineRequests = [];
  let isOffline = false;

  page.on('request', req => {
    if (isOffline) {
      offlineRequests.push({ url: req.url(), method: req.method() });
    }
  });

  page.on('console', msg => {
    console.log('[Browser Console]', msg.type(), msg.text());
  });

  // Load /compress
  await page.goto(`http://localhost:${PORT}/compress`, { waitUntil: 'load' });

  // Test inside the browser page: fetch /pdf.worker.min.mjs, create blob url, set GlobalWorkerOptions
  const evaluation = await page.evaluate(async () => {
    try {
      const res = await fetch('/pdf.worker.min.mjs');
      const text = await res.text();
      const blob = new Blob([text], { type: 'application/javascript' });
      const blobUrl = URL.createObjectURL(blob);
      window.__testBlobUrl = blobUrl;
      return { success: true, blobUrlLength: text.length };
    } catch (e) {
      return { success: false, error: e.message };
    }
  });

  console.log('Evaluation:', evaluation);

  // Now go offline
  isOffline = true;
  await context.setOffline(true);

  // Now inside the page, try spawning new Worker with blobUrl!
  const workerTest = await page.evaluate(async () => {
    try {
      const w = new Worker(window.__testBlobUrl);
      let workerResponded = false;
      w.onmessage = () => { workerResponded = true; };
      return { createdOffline: true };
    } catch (e) {
      return { createdOffline: false, error: e.message };
    }
  });

  console.log('Worker created offline via blob URL:', workerTest);
  console.log('Offline network requests attempted:', offlineRequests);

  await browser.close();
  server.close();
}

run().catch(console.error);

