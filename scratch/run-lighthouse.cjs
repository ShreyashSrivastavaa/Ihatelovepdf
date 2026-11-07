const { execSync } = require('child_process');
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

async function run() {
  await new Promise(r => server.listen(PORT, r));
  console.log(`Server listening on port ${PORT}...`);

  const urls = [
    { name: 'homepage', url: `http://localhost:${PORT}/` },
    { name: 'merge', url: `http://localhost:${PORT}/merge` }
  ];

  const results = {};

  for (const item of urls) {
    console.log(`\nRunning Lighthouse mobile on ${item.name} (${item.url})...`);
    const outJsonPath = path.join(__dirname, `lighthouse-${item.name}.json`);
    try {
      execSync(`npx lighthouse "${item.url}" --chrome-flags="--headless" --output=json --output-path="${outJsonPath}" --only-categories=performance --throttling-method=simulate --quiet`, { stdio: 'inherit' });
      if (fs.existsSync(outJsonPath)) {
        const report = JSON.parse(fs.readFileSync(outJsonPath, 'utf8'));
        const perfScore = Math.round((report.categories.performance.score || 0) * 100);
        const audits = report.audits;
        const lcp = audits['largest-contentful-paint'] ? audits['largest-contentful-paint'].displayValue : 'N/A';
        const fcp = audits['first-contentful-paint'] ? audits['first-contentful-paint'].displayValue : 'N/A';
        const tbt = audits['total-blocking-time'] ? audits['total-blocking-time'].displayValue : 'N/A';
        const cls = audits['cumulative-layout-shift'] ? audits['cumulative-layout-shift'].displayValue : 'N/A';
        const si = audits['speed-index'] ? audits['speed-index'].displayValue : 'N/A';

        results[item.name] = {
          score: perfScore,
          lcp,
          fcp,
          tbt,
          cls,
          si
        };
        console.log(`Result for ${item.name}: Score=${perfScore}/100, FCP=${fcp}, LCP=${lcp}, TBT=${tbt}, CLS=${cls}`);
      }
    } catch (e) {
      console.error(`Lighthouse failed for ${item.name}:`, e.message);
    }
  }

  server.close();
  fs.writeFileSync(path.join(__dirname, 'lighthouse-summary.json'), JSON.stringify(results, null, 2));
  console.log('\nSaved scratch/lighthouse-summary.json');
}

run().catch(console.error);

