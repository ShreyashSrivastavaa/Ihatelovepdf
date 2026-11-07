const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

const FIXTURES_DIR = path.resolve(__dirname, '../tests/fixtures');
const SAMPLE_PDF = path.join(FIXTURES_DIR, 'small.pdf');

const RETRY_TOOLS = [
  { name: 'Merge', url: 'https://www.ihatelovepdf.com/merge', multi: true },
  { name: 'Compress', url: 'https://www.ihatelovepdf.com/compress' }
];

async function runMergeCompress() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();

  for (const tool of RETRY_TOOLS) {
    console.log(`Retesting: ${tool.name}...`);
    const page = await context.newPage();
    const requests = [];

    page.on('request', (req) => {
      const reqUrl = req.url();
      let isThirdParty = false;
      try {
        const host = new URL(reqUrl).hostname;
        if (!host.includes('ihatelovepdf.com') && host !== 'localhost' && host !== '127.0.0.1') {
          isThirdParty = true;
        }
      } catch (e) {}

      requests.push({
        url: reqUrl,
        method: req.method(),
        resourceType: req.resourceType(),
        isThirdParty,
        postDataSize: req.postDataBuffer() ? req.postDataBuffer().length : 0,
        hasPdfData: (req.postData() || '').includes('%PDF-') || (req.postData() || '').includes('small.pdf')
      });
    });

    await page.goto(tool.url, { waitUntil: 'load', timeout: 30000 });
    await page.waitForTimeout(3000);

    const fileInput = page.locator('input[type="file"]').first();
    if (tool.multi) {
      await fileInput.setInputFiles([SAMPLE_PDF, SAMPLE_PDF]);
    } else {
      await fileInput.setInputFiles(SAMPLE_PDF);
    }
    await page.waitForTimeout(1500);

    const buttons = page.locator('button');
    const count = await buttons.count();
    let targetBtn = null;
    for (let i = 0; i < count; i++) {
      const text = await buttons.nth(i).innerText().catch(() => '');
      if (/process|merge|compress/i.test(text)) {
        targetBtn = buttons.nth(i);
        break;
      }
    }
    if (targetBtn) {
      await targetBtn.click({ timeout: 5000 }).catch(() => {});
      await page.waitForTimeout(3000);
    }

    const thirdParty = requests.filter(r => r.isThirdParty);
    const pdfLeaks = requests.filter(r => r.hasPdfData);
    console.log(`Tool ${tool.name} finished: ${requests.length} requests, ${thirdParty.length} third-party, ${pdfLeaks.length} PDF leaks.`);
    console.log('Third party requests for ' + tool.name + ':', JSON.stringify(thirdParty, null, 2));

    await page.close();
  }

  await browser.close();
}

runMergeCompress().catch(console.error);

