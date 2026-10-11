import fs from 'node:fs';
import path from 'node:path';

const outDir = 'out';
const results = [];
const linkIssues = [];
const allValidPaths = new Set();

function normalizePath(p) {
  let clean = p.split('#')[0].split('?')[0];
  if (!clean.startsWith('/')) clean = '/' + clean;
  clean = clean.replace(/\/+$/, '');
  return clean || '/';
}

function collectRoutes(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectRoutes(full);
    } else if (entry.name.endsWith('.html')) {
      const rel = path.relative(outDir, full).replace(/\\/g, '/');
      let route = '/' + rel.replace(/\.html$/, '');
      if (route.endsWith('/index')) route = route.slice(0, -6) || '/';
      allValidPaths.add(route);
      allValidPaths.add(route + '/');
    }
  }
}

collectRoutes(outDir);
// Also allow existing static files
allValidPaths.add('/robots.txt');
allValidPaths.add('/sitemap.xml');
allValidPaths.add('/manifest.webmanifest');
allValidPaths.add('/favicon.ico');

let emDashCount = 0;
let enDashCount = 0;

function scanHtml(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanHtml(full);
    } else if (entry.name.endsWith('.html')) {
      const content = fs.readFileSync(full, 'utf8');
      
      if (content.includes('—')) emDashCount++;
      if (content.includes('–')) enDashCount++;

      const titleMatches = [...content.matchAll(/<title[^>]*>(.*?)<\/title>/gi)].map(m => m[1]);
      const descMatches = [...content.matchAll(/<meta[^>]*name=["']description["'][^>]*content=["'](.*?)["'][^>]*>/gi)].map(m => m[1]);
      
      const relPath = path.relative(outDir, full).replace(/\\/g, '/');
      let pageRoute = '/' + relPath.replace(/\.html$/, '');
      if (pageRoute.endsWith('/index')) pageRoute = pageRoute.slice(0, -6) || '/';

      results.push({
        file: relPath,
        route: pageRoute,
        titles: titleMatches,
        titleCount: titleMatches.length,
        finalTitle: titleMatches[0] || '',
        titleLength: (titleMatches[0] || '').length,
        desc: descMatches[0] || '',
        descLength: (descMatches[0] || '').length
      });

      // Extract links
      const hrefMatches = [...content.matchAll(/<a[^>]*href=["']([^"']+)["'][^>]*>/gi)].map(m => m[1]);
      for (const href of hrefMatches) {
        if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) {
          continue;
        }
        const clean = normalizePath(href);
        if (!allValidPaths.has(clean)) {
          linkIssues.push({ from: pageRoute, brokenHref: href, normalized: clean });
        }
      }
    }
  }
}

scanHtml(outDir);

console.log('================ AUDIT REPORT ================');
console.log(`Total HTML pages audited: ${results.length}`);

const over70 = results.filter(r => r.titleLength > 70);
const over65 = results.filter(r => r.titleLength > 65);
console.log(`Pages with title length > 70: ${over70.length}`);
console.log(`Pages with title length > 65: ${over65.length}`);

const multiTitle = results.filter(r => r.titleCount !== 1);
console.log(`Pages with titleCount !== 1: ${multiTitle.length}`);

console.log(`Broken internal links found: ${linkIssues.length}`);
console.log(`Em dashes (—) found in HTML: ${emDashCount}`);
console.log(`En dashes (–) found in HTML: ${enDashCount}`);

if (over70.length > 0) {
  console.log('\n❌ TITLES OVER 70 CHARS:');
  over70.forEach(r => console.log(`${r.titleLength} | ${r.route} | "${r.finalTitle}"`));
}

if (over65.length > 0) {
  console.log('\n⚠️ TITLES OVER 65 CHARS:');
  over65.forEach(r => console.log(`${r.titleLength} | ${r.route} | "${r.finalTitle}"`));
}

if (linkIssues.length > 0) {
  console.log('\n❌ BROKEN INTERNAL LINKS:');
  linkIssues.slice(0, 20).forEach(l => console.log(`In ${l.from} -> ${l.brokenHref} (${l.normalized})`));
}

fs.writeFileSync('scripts/audit-final-results.json', JSON.stringify({ results, linkIssues, over70, over65 }, null, 2));

if (over70.length > 0 || multiTitle.length > 0 || linkIssues.length > 0) {
  console.log('\n❌ Audit FAILED');
  process.exit(1);
} else {
  console.log('\n✅ Audit PASSED: 0 titles > 70, 0 pages with multi/missing titles, 0 broken links!');
}
