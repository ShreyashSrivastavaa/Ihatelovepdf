import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

test.describe('QA Batch 5: Document Conversions & Text Extractions (extractText, pdfToExcel, pdfToPowerpoint, pdfToHtml, pdfToEpub)', () => {
  const fixturesDir = path.resolve(process.cwd(), 'tests/fixtures');

  // 21. Tool: EXTRACT TEXT
  test('21. EXTRACT TEXT: parses text stream from PDF and exports readable plain text', async ({ page }) => {
    await page.goto('/extract-text');
    await expect(page).toHaveTitle(/Extract.*Text/i);

    const fileInput = page.locator('input[type="file"]').first();
    await fileInput.setInputFiles(path.join(fixturesDir, 'small.pdf'));

    await expect(page.getByText('small.pdf').first()).toBeVisible({ timeout: 10000 });

    const processBtn = page.getByRole('button', { name: /^Process/i }).first();
    await processBtn.waitFor({ state: 'visible' });

    const downloadPromise = page.waitForEvent('download');
    await processBtn.click();

    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/\.txt$/i);

    const downloadPath = await download.path();
    expect(downloadPath).toBeTruthy();
    if (downloadPath) {
      const textContent = fs.readFileSync(downloadPath, 'utf8');
      expect(textContent.length).toBeGreaterThan(0);
      expect(textContent).toContain('ihatelovepdf Small Test PDF');
    }
  });

  // 22. Tool: PDF TO EXCEL
  test('22. PDF TO EXCEL: detects tabular content in PDF and exports valid .xlsx spreadsheet', async ({ page }) => {
    await page.goto('/pdf-to-excel');
    await expect(page).toHaveTitle(/Excel/i);

    const fileInput = page.locator('input[type="file"]').first();
    await fileInput.setInputFiles(path.join(fixturesDir, 'small.pdf'));

    await expect(page.getByText('small.pdf').first()).toBeVisible({ timeout: 10000 });

    const processBtn = page.getByRole('button', { name: /^Process/i }).first();
    await processBtn.waitFor({ state: 'visible' });

    const downloadPromise = page.waitForEvent('download');
    await processBtn.click();

    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/\.xlsx$/i);

    const downloadPath = await download.path();
    expect(downloadPath).toBeTruthy();
    if (downloadPath) {
      const buffer = fs.readFileSync(downloadPath);
      // Valid ZIP/XLSX header starts with PK\x03\x04
      expect(buffer.length).toBeGreaterThan(100);
      expect(buffer[0]).toBe(0x50); // 'P'
      expect(buffer[1]).toBe(0x4b); // 'K'
    }
  });

  // 23. Tool: PDF TO POWERPOINT
  test('23. PDF TO POWERPOINT: renders PDF slides and exports presentation .pptx', async ({ page }) => {
    await page.goto('/pdf-to-powerpoint');
    await expect(page).toHaveTitle(/PowerPoint/i);

    const fileInput = page.locator('input[type="file"]').first();
    await fileInput.setInputFiles(path.join(fixturesDir, 'small.pdf'));

    await expect(page.getByText('small.pdf').first()).toBeVisible({ timeout: 10000 });

    const processBtn = page.getByRole('button', { name: /^Process/i }).first();
    await processBtn.waitFor({ state: 'visible' });

    const downloadPromise = page.waitForEvent('download');
    await processBtn.click();

    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/\.pptx$/i);

    const downloadPath = await download.path();
    expect(downloadPath).toBeTruthy();
    if (downloadPath) {
      const buffer = fs.readFileSync(downloadPath);
      // Valid PPTX header starts with PK\x03\x04
      expect(buffer.length).toBeGreaterThan(100);
      expect(buffer[0]).toBe(0x50); // 'P'
      expect(buffer[1]).toBe(0x4b); // 'K'
    }
  });

  // 24. Tool: PDF TO HTML
  test('24. PDF TO HTML: converts PDF text and layout into responsive standalone HTML', async ({ page }) => {
    await page.goto('/pdf-to-html');
    await expect(page).toHaveTitle(/HTML/i);

    const fileInput = page.locator('input[type="file"]').first();
    await fileInput.setInputFiles(path.join(fixturesDir, 'small.pdf'));

    await expect(page.getByText('small.pdf').first()).toBeVisible({ timeout: 10000 });

    const processBtn = page.getByRole('button', { name: /^Process/i }).first();
    await processBtn.waitFor({ state: 'visible' });

    const downloadPromise = page.waitForEvent('download');
    await processBtn.click();

    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/\.html$/i);

    const downloadPath = await download.path();
    expect(downloadPath).toBeTruthy();
    if (downloadPath) {
      const htmlContent = fs.readFileSync(downloadPath, 'utf8');
      expect(htmlContent.length).toBeGreaterThan(50);
      expect(htmlContent.toLowerCase()).toContain('<html');
    }
  });

  // 25. Tool: PDF TO EPUB
  test('25. PDF TO EPUB: converts PDF chapters and layout into eBook .epub standard archive', async ({ page }) => {
    await page.goto('/pdf-to-epub');
    await expect(page).toHaveTitle(/ePub|eBook/i);

    const fileInput = page.locator('input[type="file"]').first();
    await fileInput.setInputFiles(path.join(fixturesDir, 'small.pdf'));

    await expect(page.getByText('small.pdf').first()).toBeVisible({ timeout: 10000 });

    const processBtn = page.getByRole('button', { name: /^Process/i }).first();
    await processBtn.waitFor({ state: 'visible' });

    const downloadPromise = page.waitForEvent('download');
    await processBtn.click();

    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/\.epub$/i);

    const downloadPath = await download.path();
    expect(downloadPath).toBeTruthy();
    if (downloadPath) {
      const buffer = fs.readFileSync(downloadPath);
      // Valid EPUB is a ZIP archive starting with PK\x03\x04
      expect(buffer.length).toBeGreaterThan(100);
      expect(buffer[0]).toBe(0x50); // 'P'
      expect(buffer[1]).toBe(0x4b); // 'K'
    }
  });
});
