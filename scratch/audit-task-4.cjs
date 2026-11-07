// scratch/audit-task-4.cjs
const fs = require('fs');
const path = require('path');

const LOCALES = ['en', 'es', 'pt', 'de', 'fr', 'it', 'ro', 'ru', 'hu'];
const guideDefs = [
  ...require('./guides-defs/guides-1-to-5.cjs'),
  ...require('./guides-defs/guides-6-to-10.cjs'),
  ...require('./guides-defs/guides-11-to-15.cjs'),
];
const slugs = guideDefs.map(g => g.slug);

console.log('--- STARTING TASK 4 AUDIT ---');
console.log(`Checking ${slugs.length} guides across ${LOCALES.length} languages (${slugs.length * LOCALES.length} total guide pages)...`);

let passCount = 0;
let failCount = 0;

for (const slug of slugs) {
  for (const loc of LOCALES) {
    const filePath = loc === 'en'
      ? path.resolve(__dirname, `../.next/server/app/guides/${slug}.html`)
      : path.resolve(__dirname, `../.next/server/app/${loc}/guides/${slug}.html`);

    if (!fs.existsSync(filePath)) {
      console.error(`FAIL: Missing HTML output for [${loc}] ${slug} at ${filePath}`);
      failCount++;
      continue;
    }

    const html = fs.readFileSync(filePath, 'utf8');

    // 1. Check Canonical
    const expectedCanonical = loc === 'en'
      ? `https://www.ihatelovepdf.com/guides/${slug}`
      : `https://www.ihatelovepdf.com/${loc}/guides/${slug}`;
    if (!html.includes(`rel="canonical" href="${expectedCanonical}"`)) {
      console.error(`FAIL: Canonical mismatch in [${loc}] ${slug}`);
      failCount++;
      continue;
    }

    // 2. Check Question-style H1
    if (!html.includes('<h1')) {
      console.error(`FAIL: Missing H1 in [${loc}] ${slug}`);
      failCount++;
      continue;
    }

    // 3. Check Schemas (HowTo, FAQPage, BlogPosting, BreadcrumbList)
    if (!html.includes('"@type":"HowTo"') || !html.includes('"@type":"FAQPage"') || !html.includes('"@type":"BlogPosting"') || !html.includes('"@type":"BreadcrumbList"')) {
      console.error(`FAIL: Missing JSON-LD schemas in [${loc}] ${slug}`);
      failCount++;
      continue;
    }

    // 4. Check Reciprocal Hreflangs (case-insensitive for hrefLang / hreflang)
    let missingHreflang = false;
    for (const altLoc of LOCALES) {
      const expectedHref = altLoc === 'en'
        ? `https://www.ihatelovepdf.com/guides/${slug}`
        : `https://www.ihatelovepdf.com/${altLoc}/guides/${slug}`;
      const hasHreflang = html.toLowerCase().includes(`hreflang="${altLoc.toLowerCase()}" href="${expectedHref.toLowerCase()}"`);
      if (!hasHreflang) {
        console.error(`FAIL: Missing hreflang for [${altLoc}] in [${loc}] ${slug}`);
        missingHreflang = true;
        break;
      }
    }
    if (missingHreflang) {
      failCount++;
      continue;
    }

    // 5. Check Author
    if (!html.includes('Shreyash Srivastava')) {
      console.error(`FAIL: Missing author in [${loc}] ${slug}`);
      failCount++;
      continue;
    }

    // 6. Check Semantic Details FAQ
    if (!html.includes('<details') || !html.includes('<summary')) {
      console.error(`FAIL: Missing semantic <details> FAQ in [${loc}] ${slug}`);
      failCount++;
      continue;
    }

    passCount++;
  }
}

// Check index pages for each language
for (const loc of LOCALES) {
  const filePath = loc === 'en'
    ? path.resolve(__dirname, `../.next/server/app/guides.html`)
    : path.resolve(__dirname, `../.next/server/app/${loc}/guides.html`);

  if (!fs.existsSync(filePath)) {
    console.error(`FAIL: Missing HTML output for guides index [${loc}] at ${filePath}`);
    failCount++;
    continue;
  }
  const html = fs.readFileSync(filePath, 'utf8');
  if (!html.includes('CollectionPage') || !html.includes('<h1')) {
    console.error(`FAIL: Missing CollectionPage or H1 in guides index [${loc}]`);
    failCount++;
    continue;
  }
  passCount++;
}

console.log(`\nAUDIT COMPLETE:`);
console.log(`Passed: ${passCount} / ${passCount + failCount}`);
console.log(`Failed: ${failCount}`);

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('ALL 144 GUIDE AND INDEX PAGES PASSED 100% AUDIT CHECKS!');
}
