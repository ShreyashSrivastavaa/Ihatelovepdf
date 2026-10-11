import fs from 'node:fs';
import path from 'node:path';

const outDir = 'out';
const results = [];

function scanHtml(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanHtml(full);
    } else if (entry.name.endsWith('.html')) {
      const content = fs.readFileSync(full, 'utf8');
      const titleMatches = [...content.matchAll(/<title[^>]*>(.*?)<\/title>/gi)].map(m => m[1]);
      const descMatches = [...content.matchAll(/<meta[^>]*name=["']description["'][^>]*content=["'](.*?)["'][^>]*>/gi)].map(m => m[1]);
      
      const relPath = path.relative(outDir, full).replace(/\\/g, '/');
      results.push({
        file: relPath,
        titles: titleMatches,
        titleCount: titleMatches.length,
        finalTitle: titleMatches[0] || '',
        titleLength: (titleMatches[0] || '').length,
        desc: descMatches[0] || '',
        descLength: (descMatches[0] || '').length
      });
    }
  }
}

scanHtml(outDir);
console.log(`Total HTML pages audited: ${results.length}`);

const over65 = results.filter(r => r.titleLength > 65);
console.log(`Pages with title length > 65: ${over65.length}`);

const multiTitle = results.filter(r => r.titleCount > 1);
console.log(`Pages with multiple title tags: ${multiTitle.length}`);

const badDesc = results.filter(r => r.descLength < 70 || r.descLength > 160);
console.log(`Pages with description outside 70-160 chars: ${badDesc.length}`);

fs.writeFileSync('scripts/title-audit-before.json', JSON.stringify(results, null, 2));

if (badDesc.length > 0) {
  console.log('\nSample Descriptions outside 70-160:');
  badDesc.slice(0, 30).forEach(r => console.log(`${r.descLength} chars | ${r.file} | "${r.desc}"`));
}

if (over65.length > 0) {
  console.log('\nSample Over 65 characters:');
  over65.slice(0, 25).forEach(r => console.log(`${r.titleLength} chars | ${r.file} | "${r.finalTitle}"`));
}

if (multiTitle.length > 0) {
  console.log('\nSample Multiple Title Tags:');
  multiTitle.slice(0, 10).forEach(r => console.log(`${r.file} (${r.titleCount} titles): ${JSON.stringify(r.titles)}`));
}
