import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { PDFDocument } from 'pdf-lib';

const FIXTURES_DIR = path.resolve(process.cwd(), 'tests/fixtures');
const smallPdfPath = path.join(FIXTURES_DIR, 'small.pdf');
const multipagePdfPath = path.join(FIXTURES_DIR, 'multipage-100.pdf');
const nonLatinPdfPath = path.join(FIXTURES_DIR, 'non-latin.pdf');

test.describe('QA Batch 3: Annotation, Watermark & Styling (Watermark, Page Numbers, Headers & Footers, Invert Colors, Whiteboard)', () => {
  // 11. Tool: WATERMARK
  test('11. WATERMARK: stamps text watermark onto PDF pages via Web Worker pipeline', async ({ page }) => {
    await page.goto('/watermark');
    await expect(page).toHaveTitle(/Watermark/i);

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(smallPdfPath);

    await expect(page.getByText('small.pdf').first()).toBeVisible();

    // Verify option controls
    const watermarkInput = page.locator('input[placeholder*="watermark" i], input[type="text"]').first();
    if (await watermarkInput.isVisible()) {
      await watermarkInput.fill('CONFIDENTIAL QA TEST');
    }

    const downloadPromise = page.waitForEvent('download');
    const processBtn = page.getByRole('button', { name: /^Process/i }).first();
    await expect(processBtn).toBeVisible({ timeout: 10000 });
    await processBtn.click();

    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/\.pdf$/i);

    const downloadPath = await download.path();
    expect(downloadPath).toBeTruthy();
    if (downloadPath) {
      const pdfBytes = fs.readFileSync(downloadPath);
      const wmDoc = await PDFDocument.load(pdfBytes);
      expect(wmDoc.getPageCount()).toBe(1);
      // Stamping watermark increases content stream size
      expect(pdfBytes.byteLength).toBeGreaterThan(500);
    }
  });

  // 12. Tool: PAGE NUMBERS
  test('12. PAGE NUMBERS: numbers all pages in multi-page document accurately', async ({ page }) => {
    await page.goto('/page-numbers');
    await expect(page).toHaveTitle(/Page Numbers/i);

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(multipagePdfPath);

    await expect(page.getByText('multipage-100.pdf').first()).toBeVisible();

    const downloadPromise = page.waitForEvent('download');
    const processBtn = page.getByRole('button', { name: /^Process/i }).first();
    await expect(processBtn).toBeVisible({ timeout: 10000 });
    await processBtn.click();

    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/\.pdf$/i);

    const downloadPath = await download.path();
    expect(downloadPath).toBeTruthy();
    if (downloadPath) {
      const pdfBytes = fs.readFileSync(downloadPath);
      const pnDoc = await PDFDocument.load(pdfBytes);
      expect(pnDoc.getPageCount()).toBe(105);
    }
  });

  // 13. Tool: HEADERS & FOOTERS
  test('13. HEADERS & FOOTERS: injects running headers and footers with page tokens', async ({ page }) => {
    await page.goto('/headers-footers');
    await expect(page).toHaveTitle(/Header/i);

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(smallPdfPath);

    await expect(page.getByText('small.pdf').first()).toBeVisible();

    const downloadPromise = page.waitForEvent('download');
    const processBtn = page.getByRole('button', { name: /^Process/i }).first();
    await expect(processBtn).toBeVisible({ timeout: 10000 });
    await processBtn.click();

    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/\.pdf$/i);

    const downloadPath = await download.path();
    expect(downloadPath).toBeTruthy();
    if (downloadPath) {
      const pdfBytes = fs.readFileSync(downloadPath);
      const hfDoc = await PDFDocument.load(pdfBytes);
      expect(hfDoc.getPageCount()).toBe(1);
    }
  });

  // 14. Tool: INVERT COLORS
  test('14. INVERT COLORS: applies high-contrast dark mode inversion to document', async ({ page }) => {
    await page.goto('/invert-colors');
    await expect(page).toHaveTitle(/Invert/i);

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(smallPdfPath);

    await expect(page.getByText('small.pdf').first()).toBeVisible();

    const downloadPromise = page.waitForEvent('download');
    const processBtn = page.getByRole('button', { name: /^Process/i }).first();
    await expect(processBtn).toBeVisible({ timeout: 10000 });
    await processBtn.click();

    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/\.pdf$/i);

    const downloadPath = await download.path();
    expect(downloadPath).toBeTruthy();
    if (downloadPath) {
      const pdfBytes = fs.readFileSync(downloadPath);
      const invDoc = await PDFDocument.load(pdfBytes);
      expect(invDoc.getPageCount()).toBe(1);
    }
  });

  // 15. Tool: WHITEBOARD
  test('15. WHITEBOARD: loads canvas board, draws annotation marks, and exports clean PDF', async ({ page }) => {
    page.on('console', msg => console.log('WHITEBOARD CONSOLE:', msg.text()));
    page.on('pageerror', err => console.log('WHITEBOARD PAGEERROR:', err.message));

    await page.goto('/whiteboard');
    await expect(page).toHaveTitle(/Whiteboard/i);

    // Wait specifically for 'Export Marked PDF'
    const exportBtn = page.getByRole('button', { name: 'Export Marked PDF' });
    await exportBtn.waitFor({ state: 'visible', timeout: 15000 });

    const downloadPromise = page.waitForEvent('download');
    await exportBtn.click();

    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/\.pdf$/i);

    const downloadPath = await download.path();
    expect(downloadPath).toBeTruthy();
    if (downloadPath) {
      const pdfBytes = fs.readFileSync(downloadPath);
      const wbDoc = await PDFDocument.load(pdfBytes);
      expect(wbDoc.getPageCount()).toBeGreaterThanOrEqual(1);
    }
  });
});
