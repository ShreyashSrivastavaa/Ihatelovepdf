const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir, baseDir = dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getHtmlFiles(fullPath, baseDir));
    } else if (file.endsWith('.html')) {
      const rel = path.relative(baseDir, fullPath).replace(/\\/g, '/');
      results.push(rel);
    }
  }
  return results;
}

const outDir = path.resolve(__dirname, '../out');
if (!fs.existsSync(outDir)) {
  console.log('out dir does not exist');
  process.exit(1);
}

const htmlFiles = getHtmlFiles(outDir);
console.log(`Total HTML files built in out/: ${htmlFiles.length}`);

// Read sitemap.xml from out/
const sitemapXmlPath = path.join(outDir, 'sitemap.xml');
let sitemapUrls = [];
if (fs.existsSync(sitemapXmlPath)) {
  const xml = fs.readFileSync(sitemapXmlPath, 'utf8');
  const locMatches = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)];
  sitemapUrls = locMatches.map(m => m[1]);
  console.log(`Total URLs in sitemap.xml: ${sitemapUrls.length}`);
} else {
  console.log('sitemap.xml not found in out/');
}

// Map HTML files to expected URLs
const urlFromHtml = htmlFiles.map(f => {
  if (f === 'index.html') return 'https://www.ihatelovepdf.com';
  if (f.endsWith('/index.html')) {
    return 'https://www.ihatelovepdf.com/' + f.slice(0, -('/index.html'.length));
  }
  return 'https://www.ihatelovepdf.com/' + f.replace(/\.html$/, '');
});

// Compare
const sitemapSet = new Set(sitemapUrls);
const htmlSet = new Set(urlFromHtml);

const inHtmlNotInSitemap = urlFromHtml.filter(u => !sitemapSet.has(u) && !u.includes('_not-found') && !u.includes('404'));
const inSitemapNotInHtml = sitemapUrls.filter(u => !htmlSet.has(u));

console.log(`\nPages in out/ but NOT in sitemap.xml (${inHtmlNotInSitemap.length}):`);
inHtmlNotInSitemap.slice(0, 10).forEach(u => console.log('  -', u));
if (inHtmlNotInSitemap.length > 10) console.log(`  ... and ${inHtmlNotInSitemap.length - 10} more`);

console.log(`\nPages in sitemap.xml but NOT in out/ (${inSitemapNotInHtml.length}):`);
inSitemapNotInHtml.slice(0, 10).forEach(u => console.log('  -', u));
if (inSitemapNotInHtml.length > 10) console.log(`  ... and ${inSitemapNotInHtml.length - 10} more`);

