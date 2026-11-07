const fs = require('fs');
const path = require('path');

function searchExternalCalls(dir, hits = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name !== 'node_modules' && e.name !== '.git' && e.name !== '.next') {
        searchExternalCalls(full, hits);
      }
    } else if (/\.(tsx?|jsx?|css|html)$/i.test(e.name)) {
      const content = fs.readFileSync(full, 'utf8');
      const lines = content.split('\n');
      lines.forEach((line, i) => {
        // Look for fetch, import, script src, link href, css url
        if (
          /fetch\s*\(\s*['"`]https?:\/\//i.test(line) ||
          /importScripts\s*\(\s*['"`]https?:\/\//i.test(line) ||
          /<script[^>]+src=['"`]https?:\/\//i.test(line) ||
          /<link[^>]+href=['"`]https?:\/\//i.test(line) ||
          /url\s*\(\s*['"`]?https?:\/\//i.test(line)
        ) {
          hits.push({ file: full, line: i + 1, text: line.trim() });
        }
      });
    }
  }
  return hits;
}

const hits = searchExternalCalls('src');
console.log('Total external resource requests in src/:', hits.length);
hits.forEach(h => console.log(`${h.file}:${h.line} -> ${h.text}`));

