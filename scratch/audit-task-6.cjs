const fs = require('fs');
const path = require('path');

const LOCALES = ['en', 'de', 'es', 'fr', 'hu', 'it', 'pt', 'ro', 'ru'];
const PAGE_TYPES = ['adobe-acrobat', 'ihatepdf'];

async function auditTask6() {
  console.log('=== AUDITING TASK 6: COMPARISON PAGES IN ALL 9 LANGUAGES ===\n');

  let passed = 0;
  let total = 0;

  for (const pageType of PAGE_TYPES) {
    const pageSlug = `${pageType}-alternative`;

    for (const locale of LOCALES) {
      total++;
      const isEn = locale === 'en';
      const expectedUrl = isEn
        ? `https://www.ihatelovepdf.com/${pageSlug}`
        : `https://www.ihatelovepdf.com/${locale}/${pageSlug}`;

      // In Next.js static export / build output
      const relPath = isEn
        ? path.join('.next', 'server', 'app', `${pageSlug}.html`)
        : path.join('.next', 'server', 'app', locale, `${pageSlug}.html`);

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
        console.error(`[FAIL] Canonical mismatch for ${locale}/${pageSlug}. Expected: ${expectedUrl}, Got: ${canonicalMatch ? canonicalMatch[1] : 'none'}`);
        continue;
      }

      // 2. Check 9 hreflang alternates (Next.js camelCase hrefLang or lowercase hreflang)
      let allHreflangsPresent = true;
      const lowerHtml = html.toLowerCase();
      for (const loc of LOCALES) {
        if (!lowerHtml.includes(`hreflang="${loc}"`)) {
          console.error(`[FAIL] Missing hreflang for [${loc}] in ${locale}/${pageSlug}`);
          allHreflangsPresent = false;
          break;
        }
      }
      if (!lowerHtml.includes('hreflang="x-default"')) {
        console.error(`[FAIL] Missing hreflang for [x-default] in ${locale}/${pageSlug}`);
        allHreflangsPresent = false;
      }
      if (!allHreflangsPresent) continue;

      // 3. Check JSON-LD Schemas
      if (!html.includes('"@type":"BreadcrumbList"') || !html.includes('"@type":"FAQPage"') || !html.includes('"@type":"Article"')) {
        console.error(`[FAIL] Missing JSON-LD schemas in ${locale}/${pageSlug}`);
        continue;
      }

      passed++;
    }
  }

  console.log(`\nAudit Results: ${passed} / ${total} comparison pages passed 100% of audit checks.`);
  if (passed === total) {
    console.log('=== TASK 6 AUDIT PASSED 100% ===\n');
  } else {
    process.exit(1);
  }
}

auditTask6().catch(err => {
  console.error(err);
  process.exit(1);
});
