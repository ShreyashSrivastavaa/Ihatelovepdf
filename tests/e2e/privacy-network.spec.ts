import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Privacy Network Audit: Zero Outbound Document Data', () => {
  const fixturesDir = path.resolve(process.cwd(), 'tests/fixtures');

  test('Privacy Assertion: Processing documents never uploads bytes to external servers', async ({ page }) => {
    const outboundTransfers: Array<{ url: string; method: string; postDataSize: number; postData: string }> = [];

    // Attach strict network monitor
    page.on('request', (req) => {
      const url = req.url();
      const method = req.method();
      const postDataBuf = req.postDataBuffer();
      const postData = req.postData() || '';
      const postDataSize = postDataBuf ? postDataBuf.length : 0;

      // Filter out internal localhost navigation / static asset requests
      if (!url.startsWith('http://localhost:3000')) {
        outboundTransfers.push({ url, method, postDataSize, postData });
      }
    });

    // 1. Run Compress Tool
    await page.goto('/compress');
    const compressInput = page.locator('input[type="file"]').first();
    await compressInput.setInputFiles(path.join(fixturesDir, 'small.pdf'));

    const compressBtn = page.getByRole('button', { name: /^Process/i }).first();
    const downloadCompressPromise = page.waitForEvent('download');
    await compressBtn.click();
    await downloadCompressPromise;

    // 2. Run Watermark Tool
    await page.goto('/watermark');
    const watermarkInput = page.locator('input[type="file"]').first();
    await watermarkInput.setInputFiles(path.join(fixturesDir, 'small.pdf'));

    const watermarkBtn = page.getByRole('button', { name: /^Process/i }).first();
    const downloadWatermarkPromise = page.waitForEvent('download');
    await watermarkBtn.click();
    await downloadWatermarkPromise;

    // 3. Run Split Tool
    await page.goto('/split');
    const splitInput = page.locator('input[type="file"]').first();
    await splitInput.setInputFiles(path.join(fixturesDir, 'small.pdf'));

    const splitBtn = page.getByRole('button', { name: /^Split/i }).first();
    const downloadSplitPromise = page.waitForEvent('download');
    await splitBtn.click();
    await downloadSplitPromise;

    // 4. Run Merge Tool
    await page.goto('/merge');
    const mergeInput = page.locator('input[type="file"]').first();
    await mergeInput.setInputFiles([path.join(fixturesDir, 'small.pdf'), path.join(fixturesDir, 'multipage-100.pdf')]);
    await expect(page.getByText('small.pdf').first()).toBeVisible({ timeout: 10000 });

    const mergeBtn = page.getByRole('button', { name: /^Process/i }).first();
    await mergeBtn.waitFor({ state: 'visible' });
    const downloadMergePromise = page.waitForEvent('download');
    await mergeBtn.click();
    await downloadMergePromise;

    // Strict Privacy Verification:
    // NO document contents, binary buffers, or file data ever leave the browser
    for (const transfer of outboundTransfers) {
      if (transfer.postDataSize > 0) {
        // Assert that the only allowed outbound POSTs are anonymized GA/telemetry pings, never file data
        const isTelemetry = transfer.url.includes('google-analytics.com') || transfer.url.includes('pagepulse');
        expect(isTelemetry, `Unexpected external POST to ${transfer.url}`).toBe(true);

        // Assert payload contains ZERO PDF data or binary file buffers
        expect(transfer.postData).not.toContain('%PDF-');
        expect(transfer.postData).not.toContain('PDFLince');
        expect(transfer.postData).not.toContain('small.pdf');
        // File sizes of real documents are > 5000 bytes; telemetry beacons are tiny
        expect(transfer.postDataSize).toBeLessThan(1000);
      }
    }

    // Also assert that no document processing endpoints were contacted
    const forbiddenPatterns = [
      /api\/process/i,
      /api\/upload/i,
      /api\/pdf/i,
      /convert/i,
      /extract/i,
    ];

    for (const transfer of outboundTransfers) {
      for (const pattern of forbiddenPatterns) {
        expect(transfer.url).not.toMatch(pattern);
      }
    }
  });
});
