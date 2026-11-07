const { chromium } = require('@playwright/test');
const http = require('http');
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.resolve(__dirname, '../out');
const FIXTURES_DIR = path.resolve(__dirname, '../tests/fixtures');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2',
  '.wasm': 'application/wasm',
  '.bcmap': 'application/octet-stream',
  '.properties': 'text/plain',
  '.txt': 'text/plain',
  '.pdf': 'application/pdf',
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  if (reqPath === '/') reqPath = '/index.html';
  let filePath = path.join(OUT_DIR, reqPath);
  if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) filePath = filePath + '.html';
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) filePath = path.join(filePath, 'index.html');

  if (fs.existsSync(filePath)) {
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

const FIXTURES = [
  { name: 'simpleText', file: 'small.pdf' },
  { name: 'complex', file: 'complex.pdf' },
  { name: 'jpeg2000', file: 'jp2.pdf' },
  { name: 'cjk', file: 'cjk.pdf' }
];

async function run() {
  server.listen(8799);
  const browser = await chromium.launch({ headless: true });

  for (const fix of FIXTURES) {
    const context = await browser.newContext();
    const page = await context.newPage();
    let isOffline = false;
    const attemptedOfflineRequests = [];
    const functionalFails = [];

    page.on('request', req => {
      if (isOffline) {
        const u = req.url();
        attemptedOfflineRequests.push(u);
        if (u.startsWith('blob:') || u.startsWith('data:')) return;
        if (u.includes('?_rsc=') || u.endsWith('.txt')) {
          // background Next.js prefetch
        } else {
          functionalFails.push(u);
        }
      }
    });

    console.log(`\nTesting /sign-pdf with fixture ${fix.name}...`);
    await page.goto('http://localhost:8799/sign-pdf', { waitUntil: 'domcontentloaded' });
    // wait 2.5s for warmup idle callback
    await page.waitForTimeout(2500);

    // Go offline
    isOffline = true;
    await context.setOffline(true);

    const filePath = path.join(FIXTURES_DIR, fix.file);
    const fileInput = page.locator('input[type="file"]').first();
    await fileInput.setInputFiles(filePath);
    await page.waitForTimeout(1000);

    // Test typed signature mode
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

    const passed = functionalFails.length === 0;
    console.log(`Result for ${fix.name}: ${passed ? 'PASS' : 'FAIL'}`);
    if (!passed) {
      console.log('Failing requests:', functionalFails);
    }
    await page.close();
    await context.close();
  }

  // Also test 1s threshold
  console.log(`\nTesting 1s threshold for /sign-pdf...`);
  const ctx1s = await browser.newContext();
  const page1s = ctx1s.newPage ? await ctx1s.newPage() : null;
  let isOffline1s = false;
  const fails1s = [];
  page1s.on('request', req => {
    if (isOffline1s) {
      const u = req.url();
      if (u.startsWith('blob:') || u.startsWith('data:')) return;
      if (!u.includes('?_rsc=') && !u.endsWith('.txt')) {
        fails1s.push(u);
      }
    }
  });
  await page1s.goto('http://localhost:8799/sign-pdf', { waitUntil: 'domcontentloaded' });
  await page1s.waitForTimeout(1000);
  isOffline1s = true;
  await ctx1s.setOffline(true);
  const fileInput = page1s.locator('input[type="file"]').first();
  await fileInput.setInputFiles(path.join(FIXTURES_DIR, 'small.pdf'));
  await page1s.waitForTimeout(1000);
  console.log(`Result for 1s threshold: ${fails1s.length === 0 ? 'PASS' : 'FAIL'}`);
  if (fails1s.length > 0) console.log('Failing 1s requests:', fails1s);
  await ctx1s.close();

  await browser.close();
  server.close();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
