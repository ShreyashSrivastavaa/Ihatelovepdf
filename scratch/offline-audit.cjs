const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

const FIXTURES_DIR = path.resolve(__dirname, '../tests/fixtures');
const SAMPLE_PDF = path.join(FIXTURES_DIR, 'small.pdf');

const FIVE_TOOLS = [
  { name: 'Merge', url: 'https://www.ihatelovepdf.com/merge', multi: true },
  { name: 'Compress', url: 'https://www.ihatelovepdf.com/compress' },
  { name: 'Split', url: 'https://www.ihatelovepdf.com/split' },
  { name: 'Rotate', url: 'https://www.ihatelovepdf.com/rotate' },
  { name: 'Watermark', url: 'https://www.ihatelovepdf.com/watermark' }
];

async function runOfflineTest() {
  console.log('=== STARTING OFFLINE CAPABILITY TEST ===');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Step 1: Check service worker registration on homepage
  console.log('Navigating to homepage online...');
  await page.goto('https://www.ihatelovepdf.com', { waitUntil: 'networkidle' });

  const swRegistrations = await page.evaluate(async () => {
    if (!('serviceWorker' in navigator)) return { supported: false, registrations: [] };
    const regs = await navigator.serviceWorker.getRegistrations();
    return {
      supported: true,
      count: regs.length,
      registrations: regs.map(r => ({ scope: r.scope, active: !!r.active }))
    };
  });

  console.log('Service Worker Status:', JSON.stringify(swRegistrations, null, 2));

  // Step 2: Now test 5 tools with network disabled
  const toolResults = [];

  for (const tool of FIVE_TOOLS) {
    console.log(`\nTesting ${tool.name}: loading first online, then going offline...`);
    const toolPage = await context.newPage();
    
    // Load page online first
    await toolPage.goto(tool.url, { waitUntil: 'networkidle' });

    // Now set offline
    await context.setOffline(true);
    console.log(`  -> Network set to OFFLINE for ${tool.name}.`);

    let offlineWorkedTest = false;
    let errorMsg = null;

    try {
      // Try to interact with the file input offline
      const fileInput = toolPage.locator('input[type="file"]').first();
      if (tool.multi) {
        await fileInput.setInputFiles([SAMPLE_PDF, SAMPLE_PDF]);
      } else {
        await fileInput.setInputFiles(SAMPLE_PDF);
      }
      await toolPage.waitForTimeout(1000);

      // Find action button
      const buttons = toolPage.locator('button');
      const count = await buttons.count();
      let targetBtn = null;
      for (let i = 0; i < count; i++) {
        const text = await buttons.nth(i).innerText().catch(() => '');
        if (/process|merge|compress|split|rotate|extract|watermark|crop|download|apply/i.test(text)) {
          targetBtn = buttons.nth(i);
          break;
        }
      }

      if (targetBtn) {
        await targetBtn.click({ timeout: 5000 });
        await toolPage.waitForTimeout(2000);
        offlineWorkedTest = true;
      }
    } catch (e) {
      errorMsg = e.message;
    }

    // Now test navigating or reloading while offline
    let reloadSuccess = false;
    try {
      const resp = await toolPage.reload({ waitUntil: 'networkidle', timeout: 5000 });
      reloadSuccess = resp && resp.status() === 200;
    } catch (e) {
      reloadSuccess = false;
    }

    toolResults.push({
      tool: tool.name,
      url: tool.url,
      offlineInteractionWorked: offlineWorkedTest,
      offlineReloadWorked: reloadSuccess,
      errorMsg
    });

    console.log(`  -> Interaction while offline: ${offlineWorkedTest ? 'PASSED' : 'FAILED'}`);
    console.log(`  -> Page reload while offline: ${reloadSuccess ? 'PASSED (SW cached)' : 'FAILED (ERR_INTERNET_DISCONNECTED)'}`);

    // Restore online before next test
    await context.setOffline(false);
    await toolPage.close();
  }

  await page.close();
  await browser.close();

  const finalOutput = {
    swRegistrations,
    toolResults
  };

  fs.writeFileSync('scratch/offline-audit-results.json', JSON.stringify(finalOutput, null, 2));
  console.log('\nResults saved to scratch/offline-audit-results.json');
}

runOfflineTest().catch(err => {
  console.error('Offline test failed:', err);
  process.exit(1);
});

