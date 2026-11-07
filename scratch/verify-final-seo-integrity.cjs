const fs = require('fs');
const path = require('path');

const OUT_DIR = path.resolve(__dirname, '../out');
const NOINDEX_ROUTES = [
  'support', 'thank-you',
  'de/unterstuetzen', 'es/apoya', 'fr/soutenir',
  'hu/tamogatas', 'it/supporto', 'pt/apoie',
  'ro/sustine', 'ru/podderzhka'
];

function walk(dir) {
  let files = [];
  fs.readdirSync(dir, { withFileTypes: true }).forEach(e => {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...walk(f));
    else if (f.endsWith('.html')) files.push(f);
  });
  return files;
}

const htmlFiles = walk(OUT_DIR);
console.log(`Checking SEO integrity across ${htmlFiles.length} HTML files...\n`);

// 1. Check Noindex Routes
let noindexPassCount = 0;
let noindexFailures = [];

for (const route of NOINDEX_ROUTES) {
  const filePath = path.join(OUT_DIR, `${route}.html`);
  if (!fs.existsSync(filePath)) {
    noindexFailures.push(`File missing: ${route}.html`);
    continue;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  const hasNoindex = /<meta name="robots" content="noindex,\s*nofollow"\/?>/i.test(content);
  if (hasNoindex) {
    noindexPassCount++;
  } else {
    noindexFailures.push(`${route}.html missing 'noindex, nofollow' meta tag!`);
  }
}

console.log(`1. NOINDEX VERIFICATION: ${noindexPassCount}/${NOINDEX_ROUTES.length} passed.`);
if (noindexFailures.length > 0) {
  console.error('FAILURES:', noindexFailures);
}

// 2. Check Hreflang Isolation for Noindex Pages
let hreflangLeakedInNoindex = [];
for (const file of htmlFiles) {
  const rel = path.relative(OUT_DIR, file).replace(/\\/g, '/');
  const content = fs.readFileSync(file, 'utf8');
  
  // Find all hreflangs
  const hreflangs = [...content.matchAll(/<link\s+rel="alternate"\s+hreflang="([^"]+)"\s+href="([^"]+)"/gi)];
  for (const [_, lang, href] of hreflangs) {
    for (const noindexRoute of NOINDEX_ROUTES) {
      if (href.endsWith(`/${noindexRoute}`) || href.endsWith(`/${noindexRoute}/`)) {
        hreflangLeakedInNoindex.push({ file: rel, lang, href });
      }
    }
  }
}

console.log(`2. NOINDEX HREFLANG ISOLATION: ${hreflangLeakedInNoindex.length} leaks detected.`);
if (hreflangLeakedInNoindex.length > 0) {
  console.error('LEAKS:', hreflangLeakedInNoindex);
}

// 3. Check Hreflang Reciprocity across indexable pages
const urlToHreflangs = new Map();
const urlToCanonical = new Map();

for (const file of htmlFiles) {
  const rel = path.relative(OUT_DIR, file).replace(/\\/g, '/');
  let url = 'https://www.ihatelovepdf.com/' + rel.replace(/\.html$/, '');
  if (rel === 'index.html') url = 'https://www.ihatelovepdf.com';
  
  const content = fs.readFileSync(file, 'utf8');
  const canMatch = content.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i);
  if (canMatch) {
    urlToCanonical.set(url, canMatch[1]);
  }

  const hls = [...content.matchAll(/<link\s+rel="alternate"\s+hreflang="([^"]+)"\s+href="([^"]+)"/gi)].map(m => ({
    lang: m[1],
    href: m[2]
  }));
  if (hls.length > 0) {
    urlToHreflangs.set(url, hls);
  }
}

let reciprocityErrors = 0;
let checkedPairs = 0;

for (const [pageUrl, hls] of urlToHreflangs.entries()) {
  for (const { lang, href } of hls) {
    if (href === pageUrl) continue; // Self-reference is checked by presence
    checkedPairs++;
    const targetHls = urlToHreflangs.get(href);
    if (!targetHls) {
      reciprocityErrors++;
      if (reciprocityErrors <= 5) {
        console.error(`Missing back-link set: ${pageUrl} points to ${href} (${lang}), but ${href} has no hreflang tags.`);
      }
    } else {
      const hasBacklink = targetHls.some(t => t.href === pageUrl);
      if (!hasBacklink) {
        reciprocityErrors++;
        if (reciprocityErrors <= 5) {
          console.error(`Non-reciprocal hreflang: ${pageUrl} -> ${href}, but ${href} does NOT link back to ${pageUrl}`);
        }
      }
    }
  }
}

console.log(`3. HREFLANG RECIPROCITY: checked ${checkedPairs} pairs, ${reciprocityErrors} reciprocity errors.`);

// 4. Validate JSON-LD Schema on all pages
let validSchemas = 0;
let invalidSchemas = 0;
let jsonLdBannedClaims = 0;

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const rel = path.relative(OUT_DIR, file).replace(/\\/g, '/');
  const scripts = [...content.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  for (const [_, jsonStr] of scripts) {
    try {
      const parsed = JSON.parse(jsonStr);
      validSchemas++;
      if (/works offline|pwa|gdpr|rgpd|dsgvo|hipaa|0 requests|no tracking/i.test(jsonStr)) {
        jsonLdBannedClaims++;
        console.error(`Banned claim in JSON-LD in ${rel}:`, jsonStr.slice(0, 100));
      }
    } catch (e) {
      invalidSchemas++;
      console.error(`Invalid JSON-LD in ${rel}:`, e.message);
    }
  }
}

console.log(`4. JSON-LD VALIDATION: ${validSchemas} schema blocks parsed. ${invalidSchemas} invalid. ${jsonLdBannedClaims} banned claims.`);
