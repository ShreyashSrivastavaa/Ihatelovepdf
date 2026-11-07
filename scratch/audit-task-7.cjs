const fs = require('fs');
const path = require('path');

const LOCALES = ['en', 'de', 'es', 'fr', 'hu', 'it', 'pt', 'ro', 'ru'];
const SEARCH_INTENT_SLUGS = [
  'merge-pdf-without-uploading',
  'pdf-tools-no-watermark',
  'edit-pdf-for-resume',
  'is-it-safe-to-merge-pdf-online',
];

async function auditTask7() {
  console.log('=== AUDITING TASK 7: SEARCH-INTENT LANDING PAGES IN ALL 9 LANGUAGES ===\n');

  let passed = 0;
  let total = 0;

  for (const slug of SEARCH_INTENT_SLUGS) {
    for (const locale of LOCALES) {
      total++;
      const isEn = locale === 'en';
      const expectedUrl = isEn
        ? `https://www.ihatelovepdf.com/${slug}`
        : `https://www.ihatelovepdf.com/${locale}/${slug}`;

      const relPath = isEn
        ? path.join('.next', 'server', 'app', `${slug}.html`)
        : path.join('.next', 'server', 'app', locale, `${slug}.html`);

      const fullPath = path.join(__dirname, '..', relPath);

      if (!fs.existsSync(fullPath)) {
        console.error(`[FAIL] Page missing from build: ${relPath}`);
        continue;
      }

      const html = fs.readFileSync(fullPath, 'utf-8');

      // 1. Check Canonical
      const canonicalMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i) ||
                             html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i);
      if (!canonicalMatch || canonicalMatch[1] !== expectedUrl) {
        console.error(`[FAIL] Canonical mismatch for ${locale}/${slug}. Expected: ${expectedUrl}, Got: ${canonicalMatch ? canonicalMatch[1] : 'none'}`);
        continue;
      }

      // 2. Check 9 hreflang alternates
      let allHreflangsPresent = true;
      const lowerHtml = html.toLowerCase();
      for (const loc of LOCALES) {
        if (!lowerHtml.includes(`hreflang="${loc}"`)) {
          console.error(`[FAIL] Missing hreflang for [${loc}] in ${locale}/${slug}`);
          allHreflangsPresent = false;
          break;
        }
      }
      if (!lowerHtml.includes('hreflang="x-default"')) {
        console.error(`[FAIL] Missing hreflang for [x-default] in ${locale}/${slug}`);
        allHreflangsPresent = false;
      }
      if (!allHreflangsPresent) continue;

      // 3. Check JSON-LD Schemas
      if (!html.includes('"@type":"BreadcrumbList"') || !html.includes('"@type":"FAQPage"') || !html.includes('"@type":"Article"')) {
        console.error(`[FAIL] Missing JSON-LD schemas in ${locale}/${slug}`);
        continue;
      }

      passed++;
    }
  }

  console.log(`\nAudit Results: ${passed} / ${total} search-intent landing pages passed 100% of audit checks.`);
  if (passed === total) {
    console.log('=== TASK 7 AUDIT PASSED 100% ===\n');
  } else {
    process.exit(1);
  }
}

auditTask7().catch(err => {
  console.error(err);
  process.exit(1);
});
