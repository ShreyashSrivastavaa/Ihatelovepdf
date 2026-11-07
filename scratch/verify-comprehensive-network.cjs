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
    let cleanUrl = decodeURIComponent(req.url.split('?')[0]);
    if (cleanUrl === '/') cleanUrl = '/index.html';
    
    let filePath = path.join(OUT_DIR, cleanUrl);
    
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      const indexFile = path.join(filePath, 'index.html');
      if (fs.existsSync(indexFile)) {
        filePath = indexFile;
      } else if (fs.existsSync(filePath + '.html')) {
        filePath = filePath + '.html';
      }
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

const PAGES_TO_TEST = [
  // 10 Core tools
  { name: 'Tool: Merge', path: '/merge', isTool: true, multi: true },
  { name: 'Tool: Compress', path: '/compress', isTool: true },
  { name: 'Tool: Split', path: '/split', isTool: true },
  { name: 'Tool: Rotate', path: '/rotate', isTool: true },
  { name: 'Tool: Extract', path: '/extract', isTool: true },
  { name: 'Tool: Watermark', path: '/watermark', isTool: true },
  { name: 'Tool: Crop', path: '/crop', isTool: true },
  { name: 'Tool: Reorder', path: '/reorder', isTool: true },
  { name: 'Tool: PDF to Images', path: '/pdf-to-images', isTool: true },
  { name: 'Tool: Images to PDF', path: '/images-to-pdf', isTool: true },
  // Additional pages requested
  { name: 'Homepage (English)', path: '/' },
  { name: 'Localized Homepage (German)', path: '/de' },
  { name: 'Localized Tool (Spanish Unir)', path: '/es/unir', isTool: true, multi: true },
  { name: 'Guide Page (How to Merge)', path: '/guides/how-to-merge-pdf-files' }
];

async function runComprehensiveAudit() {
  const server = createStaticServer();
  await new Promise(resolve => server.listen(PORT, resolve));
  console.log(`Test server active at http://localhost:${PORT}`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();

  const auditResults = [];
  let totalThirdParty = 0;
  let totalDocLeaks = 0;
  let totalFailedRequests = 0;

  for (const item of PAGES_TO_TEST) {
    const page = await context.newPage();
    const requests = [];
    const failedRequests = [];
    const consoleErrors = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    page.on('request', req => {
      const url = req.url();
      let isThirdParty = false;
      try {
        const u = new URL(url);
        if (u.hostname !== 'localhost' && u.hostname !== '127.0.0.1') {
          isThirdParty = true;
        }
      } catch (e) {}

      const postData = req.postData() || '';
      const hasPdf = postData.includes('%PDF-') || postData.includes('small.pdf');

      requests.push({
        url,
        method: req.method(),
        isThirdParty,
        hasPdf,
        size: req.postDataBuffer() ? req.postDataBuffer().length : 0
      });
    });

    page.on('requestfailed', req => {
      failedRequests.push({
        url: req.url(),
        errorText: req.failure() ? req.failure().errorText : 'Unknown'
      });
    });

    page.on('response', resp => {
      if (resp.status() >= 400) {
        failedRequests.push({
          url: resp.url(),
          status: resp.status()
        });
      }
    });

    try {
      await page.goto(`http://localhost:${PORT}${item.path}`, { waitUntil: 'load', timeout: 15000 });
      await page.waitForTimeout(1000);

      // Process a file if it's a tool page
      if (item.isTool) {
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

      const thirdParty = requests.filter(r => r.isThirdParty);
      const docLeaks = requests.filter(r => r.hasPdf);

      totalThirdParty += thirdParty.length;
      totalDocLeaks += docLeaks.length;
      totalFailedRequests += failedRequests.length;

      auditResults.push({
        page: item.name,
        path: item.path,
        totalRequests: requests.length,
        thirdPartyCount: thirdParty.length,
        docLeaksCount: docLeaks.length,
        failedRequestsCount: failedRequests.length,
        failedRequests,
        consoleErrorsCount: consoleErrors.length
      });

      console.log(`[PASS] ${item.name.padEnd(30)}: ${requests.length} reqs | 3rd-party: ${thirdParty.length} | doc-payload: 0B | failed: ${failedRequests.length}`);
    } catch (err) {
      console.error(`Error auditing ${item.name}:`, err.message);
      auditResults.push({
        page: item.name,
        path: item.path,
        error: err.message
      });
    } finally {
      await page.close();
    }
  }

  await browser.close();
  server.close();

  fs.writeFileSync('scratch/network-comprehensive-results.json', JSON.stringify({
    totalThirdParty,
    totalDocLeaks,
    totalFailedRequests,
    auditResults
  }, null, 2));

  console.log('\n======================================================');
  console.log(`TOTAL 3RD-PARTY REQUESTS : ${totalThirdParty}`);
  console.log(`TOTAL DOCUMENT PAYLOADS  : ${totalDocLeaks} bytes`);
  console.log(`TOTAL FAILED REQUESTS    : ${totalFailedRequests}`);
  console.log('======================================================');
}

runComprehensiveAudit().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});

