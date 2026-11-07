const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('@playwright/test');

const OUT_DIR = path.resolve(__dirname, '../out');
const PORT = 8771;

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
      res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  });
}

const SUPPORT_ROUTES = [
  '/support',
  '/thank-you',
  '/de/unterstuetzen',
  '/es/apoya',
  '/fr/soutenir',
  '/hu/tamogatas',
  '/it/supporto',
  '/pt/apoie',
  '/ro/sustine',
  '/ru/podderzhka'
];

async function run() {
  const server = createStaticServer();
  await new Promise(r => server.listen(PORT, r));
  console.log(`Server listening on port ${PORT}...`);

  const browser = await chromium.launch({ headless: true });
  const results = [];

  for (const route of SUPPORT_ROUTES) {
    const context = await browser.newContext();
    const page = await context.newPage();
    const thirdPartyRequests = [];
    const allRequests = [];
    const externalLinks = [];

    page.on('request', req => {
      const url = req.url();
      allRequests.push(url);
      if (!url.startsWith(`http://localhost:${PORT}`)) {
        thirdPartyRequests.push({
          url,
          method: req.method(),
          type: req.resourceType()
        });
      }
    });

    await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle', timeout: 15000 });

    // Inspect all external links on the page (e.g. href="https://...")
    const links = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('a[href]'))
        .map(a => a.href)
        .filter(href => href.startsWith('http') && !href.includes(window.location.host));
    });

    // Inspect any script tags
    const scriptSrcs = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('script[src]'))
        .map(s => s.src);
    });

    results.push({
      route,
      allRequestsCount: allRequests.length,
      thirdPartyRequests,
      externalLinks: [...new Set(links)],
      externalScripts: scriptSrcs.filter(s => !s.includes(String(PORT)))
    });

    console.log(`\nRoute: ${route}`);
    console.log(`  Requests: ${allRequests.length} (3rd-party network: ${thirdPartyRequests.length})`);
    if (thirdPartyRequests.length > 0) {
      console.log(`  3rd-party requests:`, thirdPartyRequests);
    }
    console.log(`  External Links:`, [...new Set(links)]);
    console.log(`  External Scripts:`, scriptSrcs.filter(s => !s.includes(String(PORT))));

    await context.close();
  }

  await browser.close();
  server.close();
  fs.writeFileSync('scratch/support-audit-results.json', JSON.stringify(results, null, 2));
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

