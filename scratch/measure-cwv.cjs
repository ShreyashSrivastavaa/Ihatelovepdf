const { chromium } = require('@playwright/test');
const http = require('http');
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.resolve(__dirname, '../out');
const PORT = 8899;

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

async function measurePage(browser, urlPath) {
  // Mobile emulation: Moto G4 / Pixel 5 viewport
  const context = await browser.newContext({
    viewport: { width: 393, height: 851 },
    userAgent: 'Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
    isMobile: true,
    hasTouch: true
  });

  const page = await context.newPage();

  // Inject performance observer before navigation
  await page.addInitScript(() => {
    window.__perfData = {
      lcp: 0,
      cls: 0,
      fcp: 0
    };
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          window.__perfData.lcp = entry.startTime;
        }
      }
    }).observe({ type: 'largest-contentful-paint', buffered: true });

    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          window.__perfData.cls += entry.value;
        }
      }
    }).observe({ type: 'layout-shift', buffered: true });
  });

  const startTime = Date.now();
  await page.goto(`http://localhost:${PORT}${urlPath}`, { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(2000);

  const metrics = await page.evaluate(() => {
    const nav = performance.getEntriesByType('navigation')[0] || {};
    const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0];
    const perf = window.__perfData || {};
    return {
      ttfb: Math.round(nav.responseStart - nav.requestStart),
      domContentLoaded: Math.round(nav.domContentLoadedEventEnd - nav.startTime),
      load: Math.round(nav.loadEventEnd - nav.startTime),
      fcp: fcpEntry ? Math.round(fcpEntry.startTime) : 0,
      lcp: Math.round(perf.lcp || (fcpEntry ? fcpEntry.startTime : 0)),
      cls: Number((perf.cls || 0).toFixed(4)),
    };
  });

  await context.close();
  return metrics;
}

async function run() {
  await new Promise(r => server.listen(PORT, r));
  const browser = await chromium.launch({ headless: true });

  console.log('Measuring Core Web Vitals (Mobile Viewport)...');
  const homeMetrics = await measurePage(browser, '/');
  console.log('Homepage (/):', homeMetrics);

  const mergeMetrics = await measurePage(browser, '/merge');
  console.log('Tool (/merge):', mergeMetrics);

  await browser.close();
  server.close();

  fs.writeFileSync(path.join(__dirname, 'cwv-mobile-summary.json'), JSON.stringify({
    homepage: homeMetrics,
    merge: mergeMetrics
  }, null, 2));
  console.log('Saved scratch/cwv-mobile-summary.json');
}

run().catch(console.error);

