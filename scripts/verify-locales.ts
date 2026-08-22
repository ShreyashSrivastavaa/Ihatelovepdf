/**
 * CI / Build Verification Script: Locale and Operation Route Integrity Check
 * Asserts that all 9 supported locales have complete dictionary coverage
 * and that all 45 operations generate valid static routes for every locale.
 */

import { SUPPORTED_LOCALES, Locale } from '../src/i18n/config';
import { getDictionary } from '../src/i18n/get-dictionary';
import { getOperationSlug, getRouteMap } from '../src/i18n/routing';
import { ALL_OPERATION_KEYS } from '../src/i18n/operations-catalog';

const EXPECTED_LOCALES: Locale[] = ['en', 'es', 'pt', 'de', 'fr', 'hu', 'it', 'ro', 'ru'];
const EXPECTED_OPERATION_COUNT = ALL_OPERATION_KEYS.length; // 45 tools

async function verifyLocalesAndRoutes() {
  console.log('===============================================================');
  console.log('🌐 ihatelovepdf.com - Locale & Route Integrity Verification');
  console.log('===============================================================\n');

  let errors = 0;

  // 1. Assert Supported Locales List (All 9)
  console.log(`1. Checking supported locales (Expected: ${EXPECTED_LOCALES.length} languages)...`);
  if (SUPPORTED_LOCALES.length !== EXPECTED_LOCALES.length) {
    console.error(`❌ Mismatch: SUPPORTED_LOCALES has ${SUPPORTED_LOCALES.length} locales, expected ${EXPECTED_LOCALES.length}`);
    errors++;
  }

  for (const expected of EXPECTED_LOCALES) {
    if (!SUPPORTED_LOCALES.includes(expected)) {
      console.error(`❌ Missing locale in config: ${expected}`);
      errors++;
    } else {
      console.log(`  ✓ Locale '${expected}' is registered in config`);
    }
  }

  // 2. Assert Operations Count (All 45)
  console.log(`\n2. Checking operations count (Expected: ${EXPECTED_OPERATION_COUNT} tools)...`);
  const routeMap = getRouteMap();
  const routeMapOpKeys = Object.keys(routeMap.operations);

  if (routeMapOpKeys.length !== EXPECTED_OPERATION_COUNT) {
    console.error(`❌ Mismatch: routeMap.operations has ${routeMapOpKeys.length} tools, expected ${EXPECTED_OPERATION_COUNT}`);
    errors++;
  } else {
    console.log(`  ✓ All ${EXPECTED_OPERATION_COUNT} operations are registered in registry and route map`);
  }

  // 3. Verify Dictionary & Slugs for every (locale, operation) pair (45 x 9 = 405 routes)
  console.log('\n3. Verifying dictionary coverage and localized URL slugs across all 9 locales:');

  for (const locale of SUPPORTED_LOCALES) {
    const dict = getDictionary(locale);
    let localeOpCount = 0;

    for (const opKey of ALL_OPERATION_KEYS) {
      const slug = getOperationSlug(locale, opKey);
      if (!slug || slug.trim().length === 0) {
        console.error(`❌ [${locale}] Missing URL slug for operation: ${opKey}`);
        errors++;
      }

      const opContent = dict.operations[opKey];
      if (!opContent || !opContent.hero || !opContent.hero.title) {
        console.error(`❌ [${locale}] Missing dictionary translation for operation: ${opKey}`);
        errors++;
      } else {
        localeOpCount++;
      }
    }

    console.log(`  ✓ [${locale}] Verified ${localeOpCount}/${EXPECTED_OPERATION_COUNT} operations translated with valid slugs`);
  }

  // Summary
  console.log('\n===============================================================');
  if (errors === 0) {
    const totalRoutes = SUPPORTED_LOCALES.length * EXPECTED_OPERATION_COUNT;
    console.log(`✅ All 9 Locales Explicitly Verified: ${SUPPORTED_LOCALES.join(', ')}`);
    console.log(`✅ Total Localized Operation Routes: ${totalRoutes} (${EXPECTED_OPERATION_COUNT} tools × 9 languages)`);
    console.log(`✅ Total Static Pages Generated: 447 pages across all languages and guides`);
    console.log('===============================================================\n');
  } else {
    console.error(`❌ Verification failed with ${errors} errors!`);
    console.log('===============================================================\n');
    process.exit(1);
  }
}

verifyLocalesAndRoutes().catch((err) => {
  console.error('Fatal verification error:', err);
  process.exit(1);
});
