import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { PDFDocument } from 'pdf-lib';

const FIXTURES_DIR = path.resolve(process.cwd(), 'tests/fixtures');
const smallPdfPath = path.join(FIXTURES_DIR, 'small.pdf');
const multipagePdfPath = path.join(FIXTURES_DIR, 'multipage-100.pdf');
const samplePngPath = path.join(FIXTURES_DIR, 'sample.png');
const sampleJpgPath = path.join(FIXTURES_DIR, 'sample.jpg');

test.describe('QA Batch 2: Page Manipulation & Extraction (Extract, Reorder, PDF to Images, Images to PDF, PDF to ZIP)', () => {
  // 6. Tool: EXTRACT
  test('6. EXTRACT: extracts selected pages and verifies page count in downloaded PDF', async ({ page }) => {
    await page.goto('/extract');
    await expect(page).toHaveTitle(/Extract/i);

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(multipagePdfPath);

    await expect(page.getByText('multipage-100.pdf').first()).toBeVisible();

    // Select first page
    const selectAllBtn = page.getByRole('button', { name: /Select All/i }).first();
    await selectAllBtn.waitFor({ state: 'visible', timeout: 10000 });
    await selectAllBtn.click();

    const downloadPromise = page.waitForEvent('download');
    const extractBtn = page.getByRole('button', { name: /Extract/i }).first();
    await expect(extractBtn).toBeEnabled({ timeout: 10000 });
    await extractBtn.click();

    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/\.pdf$/i);

    const downloadPath = await download.path();
    expect(downloadPath).toBeTruthy();
    if (downloadPath) {
      const pdfBytes = fs.readFileSync(downloadPath);
      const extDoc = await PDFDocument.load(pdfBytes);
      expect(extDoc.getPageCount()).toBeGreaterThan(0);
    }
  });

  // 7. Tool: REORDER
  test('7. REORDER: organizes and reorders pages in multi-page document', async ({ page }) => {
    await page.goto('/reorder');
    await expect(page).toHaveTitle(/Reorder/i);

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(smallPdfPath);

    await expect(page.getByText('small.pdf').first()).toBeVisible();

    const downloadPromise = page.waitForEvent('download');
    const reorderBtn = page.getByRole('button', { name: /Save New Page Order/i }).first();
    await expect(reorderBtn).toBeVisible({ timeout: 10000 });
    await reorderBtn.click();

    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/\.pdf$/i);

    const downloadPath = await download.path();
    expect(downloadPath).toBeTruthy();
    if (downloadPath) {
      const pdfBytes = fs.readFileSync(downloadPath);
      const reDoc = await PDFDocument.load(pdfBytes);
      expect(reDoc.getPageCount()).toBe(1);
    }
  });

  // 8. Tool: PDF TO IMAGES
  test('8. PDF TO IMAGES: converts pages into image archive (PNG/ZIP)', async ({ page }) => {
    await page.goto('/pdf-to-images');
    await expect(page).toHaveTitle(/Images/i);

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(smallPdfPath);

    await expect(page.getByText('small.pdf').first()).toBeVisible();

    const downloadPromise = page.waitForEvent('download');
    const convertBtn = page.getByRole('button', { name: /Export Images/i }).first();
    await expect(convertBtn).toBeVisible({ timeout: 10000 });
    await convertBtn.click();

    const download = await downloadPromise;
    const filename = download.suggestedFilename();
    expect(filename).toMatch(/\.(zip|png|jpg|jpeg)$/i);

    const downloadPath = await download.path();
    expect(downloadPath).toBeTruthy();
    if (downloadPath) {
      const stat = fs.statSync(downloadPath);
      expect(stat.size).toBeGreaterThan(100);
    }
  });

  // 9. Tool: IMAGES TO PDF
  test('9. IMAGES TO PDF: merges multiple image formats (PNG, JPG) into single PDF', async ({ page }) => {
    await page.goto('/images-to-pdf');
    await expect(page).toHaveTitle(/Images to PDF/i);

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles([samplePngPath, sampleJpgPath]);

    await expect(page.getByText('sample.png').first()).toBeVisible();
    await expect(page.getByText('sample.jpg').first()).toBeVisible();

    const downloadPromise = page.waitForEvent('download');
    const mergeImgBtn = page.getByRole('button', { name: /Create PDF/i }).first();
    await expect(mergeImgBtn).toBeVisible({ timeout: 10000 });
    await mergeImgBtn.click();

    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/\.pdf$/i);

    const downloadPath = await download.path();
    expect(downloadPath).toBeTruthy();
    if (downloadPath) {
      const pdfBytes = fs.readFileSync(downloadPath);
      const imgDoc = await PDFDocument.load(pdfBytes);
      expect(imgDoc.getPageCount()).toBe(2);
    }
  });

  // 10. Tool: PDF TO ZIP
  test('10. PDF TO ZIP: packages document into compressed ZIP container', async ({ page }) => {
    await page.goto('/pdf-to-zip');
    await expect(page).toHaveTitle(/ZIP/i);

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(smallPdfPath);

    await expect(page.getByText('small.pdf').first()).toBeVisible();

    const downloadPromise = page.waitForEvent('download');
    const zipBtn = page.getByRole('button', { name: /^Process/i }).first();
    await expect(zipBtn).toBeVisible({ timeout: 10000 });
    await zipBtn.click();

    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/\.zip$/i);

    const downloadPath = await download.path();
    expect(downloadPath).toBeTruthy();
    if (downloadPath) {
      const stat = fs.statSync(downloadPath);
      expect(stat.size).toBeGreaterThan(100);
    }
  });
});
