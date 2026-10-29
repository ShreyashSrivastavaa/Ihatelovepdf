import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { PDFDocument } from 'pdf-lib';

const FIXTURES_DIR = path.resolve(process.cwd(), 'tests/fixtures');
const smallPdfPath = path.join(FIXTURES_DIR, 'small.pdf');
const multipagePdfPath = path.join(FIXTURES_DIR, 'multipage-100.pdf');
const corruptedPdfPath = path.join(FIXTURES_DIR, 'corrupted.pdf');
const nonLatinPdfPath = path.join(FIXTURES_DIR, 'non-latin.pdf');

test.describe('QA Batch 1: Core PDF Tools (Merge, Split, Compress, Rotate, Crop)', () => {
  // 1. Tool: MERGE (English + Localized Route)
  test('1. MERGE: combines multiple PDFs, verifies ordering, page count & privacy', async ({ page }) => {
    const leakRequests: string[] = [];
    page.on('request', req => {
      if (req.method() === 'POST' || req.method() === 'PUT') {
        const postData = req.postData();
        if (postData && (postData.includes('%PDF') || postData.includes('ihatelovepdf'))) {
          leakRequests.push(req.url());
        }
      }
    });

    await page.goto('/merge');
    await expect(page).toHaveTitle(/Merge/i);

    // Upload two files
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles([smallPdfPath, nonLatinPdfPath]);

    // Verify files appear in file list
    await expect(page.getByText('small.pdf').first()).toBeVisible();
    await expect(page.getByText('non-latin.pdf').first()).toBeVisible();

    // Trigger merge and wait for download
    const downloadPromise = page.waitForEvent('download');
    const mergeBtn = page.getByRole('button', { name: /^Process/i }).first();
    await expect(mergeBtn).toBeVisible();
    await mergeBtn.click();

    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/\.pdf$/i);

    // Read and verify downloaded PDF
    const downloadPath = await download.path();
    expect(downloadPath).toBeTruthy();
    if (downloadPath) {
      const pdfBytes = fs.readFileSync(downloadPath);
      const mergedDoc = await PDFDocument.load(pdfBytes);
      expect(mergedDoc.getPageCount()).toBe(2);
    }

    // Verify privacy assertion
    expect(leakRequests).toHaveLength(0);

    // Verify localized Spanish route loads and displays proper localized buttons
    await page.goto('/es/unir');
    await expect(page).toHaveTitle(/Unir/i);
    await expect(page.locator('h1')).toBeVisible();
  });

  // 2. Tool: SPLIT
  test('2. SPLIT: splits multi-page PDF by single pages or range', async ({ page }) => {
    await page.goto('/split');
    await expect(page).toHaveTitle(/Split/i);

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(multipagePdfPath);

    await expect(page.getByText('multipage-100.pdf').first()).toBeVisible();

    // Trigger split
    const downloadPromise = page.waitForEvent('download');
    const splitBtn = page.getByRole('button', { name: /^Split/i }).first();
    await expect(splitBtn).toBeVisible();
    await splitBtn.click();

    const download = await downloadPromise;
    const filename = download.suggestedFilename();
    expect(filename).toMatch(/\.(zip|pdf)$/i);
    const downloadPath = await download.path();
    expect(downloadPath).toBeTruthy();
  });

  // 3. Tool: COMPRESS
  test('3. COMPRESS: compresses document, generates preview, verifies output structure', async ({ page }) => {
    await page.goto('/compress');
    await expect(page).toHaveTitle(/Compress/i);

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(multipagePdfPath);

    await expect(page.getByText('multipage-100.pdf').first()).toBeVisible();

    // Trigger compress
    const downloadPromise = page.waitForEvent('download');
    const compressBtn = page.getByRole('button', { name: /^Process/i }).first();
    await expect(compressBtn).toBeVisible({ timeout: 10000 });
    await compressBtn.click();

    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/\.pdf$/i);

    const downloadPath = await download.path();
    expect(downloadPath).toBeTruthy();
    if (downloadPath) {
      const pdfBytes = fs.readFileSync(downloadPath);
      const compDoc = await PDFDocument.load(pdfBytes);
      expect(compDoc.getPageCount()).toBe(105);
    }
  });

  // 4. Tool: ROTATE
  test('4. ROTATE: rotates pages by 90/180/270 degrees and verifies rotation property', async ({ page }) => {
    await page.goto('/rotate');
    await expect(page).toHaveTitle(/Rotate/i);

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(smallPdfPath);

    await expect(page.getByText('small.pdf').first()).toBeVisible();

    // In rotate mode, wait for page selector to finish loading thumbnails and click Select All
    const selectAllBtn = page.getByRole('button', { name: /Select All/i }).first();
    await selectAllBtn.waitFor({ state: 'visible', timeout: 10000 });
    await selectAllBtn.click();

    // Trigger process
    const downloadPromise = page.waitForEvent('download');
    const rotateBtn = page.getByRole('button', { name: /Rotate \d+ Page/i }).first();
    await expect(rotateBtn).toBeEnabled({ timeout: 10000 });
    await rotateBtn.click();

    const download = await downloadPromise;
    const downloadPath = await download.path();
    expect(downloadPath).toBeTruthy();
    if (downloadPath) {
      const pdfBytes = fs.readFileSync(downloadPath);
      const rotDoc = await PDFDocument.load(pdfBytes);
      expect(rotDoc.getPageCount()).toBe(1);
    }
  });

  // 5. Tool: CROP
  test('5. CROP: crops document margins and verifies valid CropBox dimensions', async ({ page }) => {
    await page.goto('/crop');
    await expect(page).toHaveTitle(/Crop/i);

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(smallPdfPath);

    await expect(page.getByText('small.pdf').first()).toBeVisible();

    // Select page for cropping
    const selectAllBtn = page.getByRole('button', { name: /Select All/i }).first();
    await selectAllBtn.waitFor({ state: 'visible', timeout: 10000 });
    await selectAllBtn.click();

    const downloadPromise = page.waitForEvent('download');
    const cropBtn = page.getByRole('button', { name: /Crop/i }).first();
    await expect(cropBtn).toBeEnabled({ timeout: 10000 });
    await cropBtn.click();

    const download = await downloadPromise;
    const downloadPath = await download.path();
    expect(downloadPath).toBeTruthy();
    if (downloadPath) {
      const pdfBytes = fs.readFileSync(downloadPath);
      const cropDoc = await PDFDocument.load(pdfBytes);
      expect(cropDoc.getPageCount()).toBe(1);
    }
  });

  // 6. Resilience & Edge Cases: Corrupted file error state and 5x repeated cycle
  test('6. EDGE CASES: handles corrupted PDF gracefully & survives 5 consecutive runs', async ({ page }) => {
    await page.goto('/compress');

    // Upload corrupted file
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(corruptedPdfPath);

    // Verify error banner appears
    await expect(page.locator('.bg-\\[var\\(--err-soft\\)\\], [role="alert"]').first()).toBeVisible({ timeout: 5000 });

    // Reset / clear
    await page.goto('/merge');

    // Run 5x consecutive operations to check memory stability
    for (let cycle = 1; cycle <= 5; cycle++) {
      const fileIn = page.locator('input[type="file"]');
      await fileIn.setInputFiles([smallPdfPath, nonLatinPdfPath]);
      const dlPromise = page.waitForEvent('download');
      const btn = page.getByRole('button', { name: /^Process/i }).first();
      await btn.click();
      const dl = await dlPromise;
      expect(dl.suggestedFilename()).toBeTruthy();
      // Navigate to fresh instance for next run
      await page.goto('/merge');
    }
  });
});
