const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

const FIXTURES_DIR = path.resolve(__dirname, '../tests/fixtures');
const SAMPLE_PDF = path.join(FIXTURES_DIR, 'small.pdf');

// Test targets
const TOOLS = [
  { name: 'Merge', url: 'https://www.ihatelovepdf.com/merge', multi: true },
  { name: 'Compress', url: 'https://www.ihatelovepdf.com/compress' },
  { name: 'Split', url: 'https://www.ihatelovepdf.com/split' },
  { name: 'Rotate', url: 'https://www.ihatelovepdf.com/rotate' },
  { name: 'Extract', url: 'https://www.ihatelovepdf.com/extract' },
  { name: 'Watermark', url: 'https://www.ihatelovepdf.com/watermark' },
  { name: 'Crop', url: 'https://www.ihatelovepdf.com/crop' },
  { name: 'Reorder / Organize', url: 'https://www.ihatelovepdf.com/organize' },
  { name: 'PDF to JPG', url: 'https://www.ihatelovepdf.com/pdf-to-jpg' },
  { name: 'Protect', url: 'https://www.ihatelovepdf.com/protect' }
];

async function runAudit() {
  console.log('=== STARTING NETWORK AUDIT ON 10 MOST-USED TOOLS ===');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });

  const auditResults = [];

  for (const tool of TOOLS) {
    console.log(`\nTesting tool: ${tool.name} (${tool.url})...`);
    const page = await context.newPage();

    const requests = [];

    page.on('request', (req) => {
      const reqUrl = req.url();
      const method = req.method();
      const resourceType = req.resourceType();
      const postData = req.postData() || '';
      const postDataSize = req.postDataBuffer() ? req.postDataBuffer().length : 0;
      
      let isThirdParty = false;
      try {
        const parsed = new URL(reqUrl);
        const host = parsed.hostname;
        if (!host.includes('ihatelovepdf.com') && host !== 'localhost' && host !== '127.0.0.1') {
          isThirdParty = true;
        }
      } catch (e) {}

      requests.push({
        url: reqUrl,
        method,
        resourceType,
        isThirdParty,
        postDataSize,
        hasPdfData: postData.includes('%PDF-') || postData.includes('small.pdf')
      });
    });

    try {
      // 1. Initial Page Load
      await page.goto(tool.url, { waitUntil: 'networkidle', timeout: 30000 });
      const loadRequestsCount = requests.length;

      // 2. Upload file
      const fileInput = page.locator('input[type="file"]').first();
      const hasInput = await fileInput.count() > 0;
      
      let processed = false;
      if (hasInput) {
        if (tool.multi) {
          await fileInput.setInputFiles([SAMPLE_PDF, SAMPLE_PDF]);
        } else {
          await fileInput.setInputFiles(SAMPLE_PDF);
        }
        await page.waitForTimeout(1500);

        // Try to find process button
        const buttons = page.locator('button');
        const count = await buttons.count();
        let targetBtn = null;
        for (let i = 0; i < count; i++) {
          const text = await buttons.nth(i).innerText().catch(() => '');
          if (/process|merge|compress|split|rotate|extract|watermark|crop|download|apply|protect/i.test(text)) {
            targetBtn = buttons.nth(i);
            break;
          }
        }

        if (targetBtn) {
          try {
            await targetBtn.click({ timeout: 5000 });
            await page.waitForTimeout(3000);
            processed = true;
          } catch (e) {
            console.log(`Could not click action button on ${tool.name}: ${e.message}`);
          }
        }
      }

      const totalRequests = [...requests];
      const thirdPartyRequests = totalRequests.filter(r => r.isThirdParty);
      const documentUploads = totalRequests.filter(r => r.hasPdfData);

      auditResults.push({
        tool: tool.name,
        url: tool.url,
        totalRequestsCount: totalRequests.length,
        thirdPartyRequests,
        documentUploadsCount: documentUploads.length,
        processed
      });

      console.log(`  -> Completed: ${totalRequests.length} total requests, ${thirdPartyRequests.length} third-party requests, ${documentUploads.length} document leaks.`);
    } catch (err) {
      console.error(`  -> Error testing ${tool.name}:`, err.message);
      auditResults.push({
        tool: tool.name,
        url: tool.url,
        error: err.message
      });
    } finally {
      await page.close();
    }
  }

  await browser.close();

  fs.writeFileSync('scratch/network-audit-results.json', JSON.stringify(auditResults, null, 2));
  console.log('\nAudit written to scratch/network-audit-results.json');
}

runAudit().catch(err => {
  console.error('Fatal error during network audit:', err);
  process.exit(1);
});

