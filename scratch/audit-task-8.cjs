const fs = require('fs');
const path = require('path');

const LOCALES = ['en', 'de', 'es', 'fr', 'hu', 'it', 'pt', 'ro', 'ru'];

async function auditTask8() {
  console.log('=== AUDITING TASK 8: GEO, PRIVACY ARCHITECTURE & LLMS.TXT SYNC ===\n');

  let passed = 0;
  let total = 0;

  // 1. Audit Privacy Architecture in all 9 languages
  for (const locale of LOCALES) {
    total++;
    const isEn = locale === 'en';
    const slug = 'privacy-architecture';
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

    // Canonical
    const canonicalMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i) ||
                           html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i);
    if (!canonicalMatch || canonicalMatch[1] !== expectedUrl) {
      console.error(`[FAIL] Canonical mismatch for ${locale}/${slug}. Expected: ${expectedUrl}, Got: ${canonicalMatch ? canonicalMatch[1] : 'none'}`);
      continue;
    }

    // 9 hreflang alternates
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

    // JSON-LD Schemas
    if (!html.includes('"@type":"BreadcrumbList"') || !html.includes('"@type":"HowTo"') || !html.includes('"@type":"Article"')) {
      console.error(`[FAIL] Missing JSON-LD schemas in ${locale}/${slug}`);
      continue;
    }

    passed++;
  }

  // 2. Audit llms.txt & llms-full.txt
  total += 2;
  const llmsTxt = fs.readFileSync(path.join(__dirname, '..', 'public', 'llms.txt'), 'utf-8');
  const llmsFullTxt = fs.readFileSync(path.join(__dirname, '..', 'public', 'llms-full.txt'), 'utf-8');

  const requiredLlmsSnippets = [
    'privacy-architecture',
    'adobe-acrobat-alternative',
    'ihatepdf-alternative',
    'merge-pdf-without-uploading',
    'pdf-tools-no-watermark',
    'edit-pdf-for-resume',
    'is-it-safe-to-merge-pdf-online',
    '/guides',
  ];

  let llmsPassed = true;
  for (const snippet of requiredLlmsSnippets) {
    if (!llmsTxt.includes(snippet)) {
      console.error(`[FAIL] public/llms.txt missing snippet: ${snippet}`);
      llmsPassed = false;
    }
    if (!llmsFullTxt.includes(snippet)) {
      console.error(`[FAIL] public/llms-full.txt missing snippet: ${snippet}`);
      llmsPassed = false;
    }
  }

  if (llmsPassed) {
    console.log('[PASS] public/llms.txt and public/llms-full.txt are completely in sync with all new pages.');
    passed += 2;
  }

  console.log(`\nAudit Results: ${passed} / ${total} audit checks passed.`);
  if (passed === total) {
    console.log('=== TASK 8 AUDIT PASSED 100% ===\n');
  } else {
    process.exit(1);
  }
}

auditTask8().catch(err => {
  console.error(err);
  process.exit(1);
});

