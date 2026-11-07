const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const PORT = 8789;
const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  let filePath = path.join(__dirname, '..', 'out', reqPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  } else if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
    filePath = filePath + '.html';
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    const contentTypes = {
      '.html': 'text/html',
      '.js': 'application/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.png': 'image/png',
      '.svg': 'image/svg+xml'
    };
    res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

async function test() {
  await new Promise(r => server.listen(PORT, r));
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const thirdPartyRequests = [];
  page.on('request', req => {
    const url = req.url();
    if (url.startsWith('blob:') || url.startsWith('data:')) return;
    try {
      const host = new URL(url).hostname;
      if (host !== 'localhost' && host !== '127.0.0.1') {
        thirdPartyRequests.push(url);
      }
    } catch {}
  });

  const res = await page.goto(`http://localhost:${PORT}/buy-me-a-chai`, { waitUntil: 'load' });
  console.log('HTTP Status:', res.status());
  console.log('Third party requests:', thirdPartyRequests);

  const h1 = await page.locator('h1').innerText();
  console.log('H1:', h1);

  const buyMeAChaiBtn = page.locator('a[href*="buymeachai.in/shreyashsrivastava"]').first();
  console.log('Buy Me A Chai button visible?', await buyMeAChaiBtn.isVisible());
  console.log('Buy Me A Chai button href:', await buyMeAChaiBtn.getAttribute('href'));

  const coffeeBtn = page.locator('a[href="/buy-me-a-coffee"]').first();
  console.log('Coffee crosslink visible?', await coffeeBtn.isVisible());

  await browser.close();
  server.close();
}

test().catch(console.error);

