const fs = require('fs');
const path = require('path');

const GREPS = [
  {
    id: 1,
    label: 'LEGAL & COMPLIANCE CLAIMS',
    pattern: /gdpr|rgpd|dsgvo|lgpd|hipaa|compliant|conforme|konform/i
  },
  {
    id: 2,
    label: 'OFFLINE & PWA CLAIMS',
    pattern: /works offline|offline|pwa|funciona sin conexi|hors ligne|offline-fähig|без интернета/i
  },
  {
    id: 3,
    label: 'ZERO TRACKING / 0 REQUESTS CLAIMS',
    pattern: /0 requests|no tracking|zero requests|sin rastreo|kein tracking|sans suivi/i
  },
  {
    id: 4,
    label: 'LEFTOVER TRACKER ARTIFACTS',
    pattern: /googletagmanager|google-analytics|gtag|pagepulse|supabase/i
  }
];

const SCAN_DIRS = [
  path.resolve(__dirname, '../public'),
  path.resolve(__dirname, '../src'),
  path.resolve(__dirname, '../out')
];

function scanDirectory(dir, filterFn) {
  let files = [];
  if (!fs.existsSync(dir)) return files;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'scratch' || entry.name === 'tests') continue;
      files = files.concat(scanDirectory(full, filterFn));
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      if (['.html', '.txt', '.ts', '.tsx', '.js', '.json', '.css'].includes(ext)) {
        files.push(full);
      }
    }
  }
  return files;
}

const allFiles = SCAN_DIRS.flatMap(d => scanDirectory(d));
console.log(`Scanning ${allFiles.length} files across public/, src/, and out/...\n`);

const results = { 1: [], 2: [], 3: [], 4: [] };

for (const file of allFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const relPath = path.relative(path.resolve(__dirname, '..'), file).replace(/\\/g, '/');

  for (const g of GREPS) {
    if (g.pattern.test(content)) {
      const lines = content.split('\n');
      lines.forEach((line, idx) => {
        if (g.pattern.test(line)) {
          // Truncate line for clean readable report
          results[g.id].push({
            file: relPath,
            line: idx + 1,
            text: line.trim().slice(0, 140)
          });
        }
      });
    }
  }
}

for (const g of GREPS) {
  console.log(`========================================================================`);
  console.log(`GREP ${g.id}: ${g.label}`);
  console.log(`========================================================================`);
  const hits = results[g.id];
  console.log(`Total hits: ${hits.length}\n`);

  // Group by src vs public vs out
  const srcHits = hits.filter(h => h.file.startsWith('src/'));
  const publicHits = hits.filter(h => h.file.startsWith('public/'));
  const outHits = hits.filter(h => h.file.startsWith('out/'));

  console.log(`--- src/ (${srcHits.length} hits) ---`);
  srcHits.forEach(h => console.log(`  ${h.file}:${h.line} -> ${h.text}`));

  console.log(`\n--- public/ (${publicHits.length} hits) ---`);
  publicHits.forEach(h => console.log(`  ${h.file}:${h.line} -> ${h.text}`));

  console.log(`\n--- out/ (${outHits.length} hits - showing unique files) ---`);
  const outFiles = [...new Set(outHits.map(h => h.file))];
  console.log(`  Appears in ${outFiles.length} out/ files.`);
  outHits.slice(0, 15).forEach(h => console.log(`  ${h.file}:${h.line} -> ${h.text}`));
  if (outHits.length > 15) {
    console.log(`  ... and ${outHits.length - 15} more out/ hits.`);
  }
  console.log('\n');
}

