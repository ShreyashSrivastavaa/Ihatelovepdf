const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('@playwright/test');

const OUT_DIR = path.resolve(__dirname, '../out');
const FIXTURES_DIR = path.resolve(__dirname, '../tests/fixtures');
const SAMPLE_PDF = path.join(FIXTURES_DIR, 'small.pdf');
const PORT = 8765;

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
    let cleanUrl = req.url.split('?')[0];
    if (cleanUrl === '/') cleanUrl = '/index.html';
    
    let filePath = path.join(OUT_DIR, cleanUrl);
    
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
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

const TOOLS_TO_TEST = [
  { name: 'Merge', path: '/merge', multi: true },
  { name: 'Compress', path: '/compress' },
  { name: 'Split', path: '/split' },
  { name: 'Rotate', path: '/rotate' },
  { name: 'Extract', path: '/extract' },
  { name: 'Watermark', path: '/watermark' },
  { name: 'Crop', path: '/crop' },
  { name: 'Reorder / Organize', path: '/organize' },
  { name: 'PDF to JPG', path: '/pdf-to-images' },
  { name: 'Protect', path: '/protect' }
];

async function runVerification() {
  const server = createStaticServer();
  await new Promise(resolve => server.listen(PORT, resolve));
  console.log(`Local test server running on http://localhost:${PORT}`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();

  const auditReport = [];
  let totalThirdPartyCount = 0;

  for (const tool of TOOLS_TO_TEST) {
    const page = await context.newPage();
    const requests = [];

    page.on('request', (req) => {
      const url = req.url();
      let isThirdParty = false;
      try {
        const u = new URL(url);
        if (u.hostname !== 'localhost' && u.hostname !== '127.0.0.1') {
          isThirdParty = true;
        }
      } catch (e) {}

      requests.push({
        url,
        method: req.method(),
        resourceType: req.resourceType(),
        isThirdParty,
        postDataSize: req.postDataBuffer() ? req.postDataBuffer().length : 0
      });
    });

    const targetUrl = `http://localhost:${PORT}${tool.path}`;
    try {
      await page.goto(targetUrl, { waitUntil: 'load', timeout: 15000 });
      await page.waitForTimeout(1000);

      // Attempt interaction
      const fileInput = page.locator('input[type="file"]').first();
      if (await fileInput.count() > 0) {
        if (tool.multi) {
          await fileInput.setInputFiles([SAMPLE_PDF, SAMPLE_PDF]);
        } else {
          await fileInput.setInputFiles(SAMPLE_PDF);
        }
        await page.waitForTimeout(1000);

        // Click action button if visible
        const buttons = page.locator('button');
        const count = await buttons.count();
        for (let i = 0; i < count; i++) {
          const text = await buttons.nth(i).innerText().catch(() => '');
          if (/process|merge|compress|split|rotate|extract|watermark|crop|download|apply|protect/i.test(text)) {
            await buttons.nth(i).click({ timeout: 3000 }).catch(() => {});
            break;
          }
        }
        await page.waitForTimeout(2000);
      }

      const thirdParty = requests.filter(r => r.isThirdParty);
      totalThirdPartyCount += thirdParty.length;

      auditReport.push({
        tool: tool.name,
        path: tool.path,
        totalRequests: requests.length,
        thirdPartyCount: thirdParty.length,
        thirdPartyRequests: thirdParty
      });

      console.log(`[AUDIT] ${tool.name.padEnd(20)}: ${requests.length} total reqs, ${thirdParty.length} third-party reqs.`);
    } catch (err) {
      console.error(`Error on ${tool.name}:`, err.message);
      auditReport.push({
        tool: tool.name,
        path: tool.path,
        error: err.message
      });
    } finally {
      await page.close();
    }
  }

  await browser.close();
  server.close();

  fs.writeFileSync('scratch/built-network-audit-results.json', JSON.stringify({ totalThirdPartyCount, auditReport }, null, 2));
  console.log(`\n=== AUDIT COMPLETE ===`);
  console.log(`Total Third-Party Requests Detected Across All 10 Tools: ${totalThirdPartyCount}`);
}

runVerification().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});

