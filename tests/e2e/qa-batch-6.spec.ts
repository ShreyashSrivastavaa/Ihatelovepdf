import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { PDFDocument } from 'pdf-lib';

test.describe('QA Batch 6: File Formats to PDF (Excel, PowerPoint, Markdown, HTML, CSV, eBook)', () => {
  const fixturesDir = path.resolve(process.cwd(), 'tests/fixtures');

  // 26. Tool: EXCEL TO PDF
  test('26. EXCEL TO PDF: parses .xlsx spreadsheets and generates printable PDF table', async ({ page }) => {
    await page.goto('/excel-to-pdf');
    await expect(page).toHaveTitle(/Excel.*PDF/i);

    const fileInput = page.locator('input[type="file"]').first();
    await fileInput.setInputFiles(path.join(fixturesDir, 'sample.xlsx'));

    await expect(page.getByText('sample.xlsx').first()).toBeVisible({ timeout: 10000 });

    const processBtn = page.getByRole('button', { name: /^Process/i }).first();
    await processBtn.waitFor({ state: 'visible' });

    const downloadPromise = page.waitForEvent('download');
    await processBtn.click();

    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/\.pdf$/i);

    const downloadPath = await download.path();
    expect(downloadPath).toBeTruthy();
    if (downloadPath) {
      const pdfBytes = fs.readFileSync(downloadPath);
      const pdfDoc = await PDFDocument.load(pdfBytes);
      expect(pdfDoc.getPageCount()).toBeGreaterThanOrEqual(1);
    }
  });

  // 27. Tool: POWERPOINT TO PDF
  test('27. POWERPOINT TO PDF: converts .pptx slide deck into multi-page presentation PDF', async ({ page }) => {
    await page.goto('/powerpoint-to-pdf');
    await expect(page).toHaveTitle(/PowerPoint.*PDF/i);

    const fileInput = page.locator('input[type="file"]').first();
    await fileInput.setInputFiles(path.join(fixturesDir, 'sample.pptx'));

    await expect(page.getByText('sample.pptx').first()).toBeVisible({ timeout: 10000 });

    const processBtn = page.getByRole('button', { name: /^Process/i }).first();
    await processBtn.waitFor({ state: 'visible' });

    const downloadPromise = page.waitForEvent('download');
    await processBtn.click();

    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/\.pdf$/i);

    const downloadPath = await download.path();
    expect(downloadPath).toBeTruthy();
    if (downloadPath) {
      const pdfBytes = fs.readFileSync(downloadPath);
      const pdfDoc = await PDFDocument.load(pdfBytes);
      expect(pdfDoc.getPageCount()).toBeGreaterThanOrEqual(1);
    }
  });

  // 28. Tool: MARKDOWN TO PDF
  test('28. MARKDOWN TO PDF: compiles markdown document with headings into formatted PDF', async ({ page }) => {
    await page.goto('/markdown-to-pdf');
    await expect(page).toHaveTitle(/Markdown.*PDF/i);

    const fileInput = page.locator('input[type="file"]').first();
    await fileInput.setInputFiles(path.join(fixturesDir, 'sample.md'));

    await expect(page.getByText('sample.md').first()).toBeVisible({ timeout: 10000 });

    const processBtn = page.getByRole('button', { name: /^Process/i }).first();
    await processBtn.waitFor({ state: 'visible' });

    const downloadPromise = page.waitForEvent('download');
    await processBtn.click();

    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/\.pdf$/i);

    const downloadPath = await download.path();
    expect(downloadPath).toBeTruthy();
    if (downloadPath) {
      const pdfBytes = fs.readFileSync(downloadPath);
      const pdfDoc = await PDFDocument.load(pdfBytes);
      expect(pdfDoc.getPageCount()).toBeGreaterThanOrEqual(1);
    }
  });

  // 29. Tool: HTML TO PDF
  test('29. HTML TO PDF: renders HTML source code into vector PDF layout', async ({ page }) => {
    await page.goto('/html-to-pdf');
    await expect(page).toHaveTitle(/HTML.*PDF/i);

    const fileInput = page.locator('input[type="file"]').first();
    await fileInput.setInputFiles(path.join(fixturesDir, 'sample.html'));

    await expect(page.getByText('sample.html').first()).toBeVisible({ timeout: 10000 });

    const processBtn = page.getByRole('button', { name: /^Process/i }).first();
    await processBtn.waitFor({ state: 'visible' });

    const downloadPromise = page.waitForEvent('download');
    await processBtn.click();

    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/\.pdf$/i);

    const downloadPath = await download.path();
    expect(downloadPath).toBeTruthy();
    if (downloadPath) {
      const pdfBytes = fs.readFileSync(downloadPath);
      const pdfDoc = await PDFDocument.load(pdfBytes);
      expect(pdfDoc.getPageCount()).toBeGreaterThanOrEqual(1);
    }
  });

  // 30. Tool: CSV TO PDF
  test('30. CSV TO PDF: transforms delimited CSV tabular data into paginated PDF table', async ({ page }) => {
    await page.goto('/csv-to-pdf');
    await expect(page).toHaveTitle(/CSV.*PDF/i);

    const fileInput = page.locator('input[type="file"]').first();
    await fileInput.setInputFiles(path.join(fixturesDir, 'sample.csv'));

    await expect(page.getByText('sample.csv').first()).toBeVisible({ timeout: 10000 });

    const processBtn = page.getByRole('button', { name: /^Process/i }).first();
    await processBtn.waitFor({ state: 'visible' });

    const downloadPromise = page.waitForEvent('download');
    await processBtn.click();

    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/\.pdf$/i);

    const downloadPath = await download.path();
    expect(downloadPath).toBeTruthy();
    if (downloadPath) {
      const pdfBytes = fs.readFileSync(downloadPath);
      const pdfDoc = await PDFDocument.load(pdfBytes);
      expect(pdfDoc.getPageCount()).toBeGreaterThanOrEqual(1);
    }
  });

  // 31. Tool: EBOOK TO PDF
  test('31. EBOOK TO PDF: unpacks EPUB archive chapters and compiles eBook PDF document', async ({ page }) => {
    await page.goto('/ebook-to-pdf');
    await expect(page).toHaveTitle(/eBook.*PDF|ePub.*PDF/i);

    const fileInput = page.locator('input[type="file"]').first();
    await fileInput.setInputFiles(path.join(fixturesDir, 'sample.epub'));

    await expect(page.getByText('sample.epub').first()).toBeVisible({ timeout: 10000 });

    const processBtn = page.getByRole('button', { name: /^Process/i }).first();
    await processBtn.waitFor({ state: 'visible' });

    const downloadPromise = page.waitForEvent('download');
    await processBtn.click();

    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/\.pdf$/i);

    const downloadPath = await download.path();
    expect(downloadPath).toBeTruthy();
    if (downloadPath) {
      const pdfBytes = fs.readFileSync(downloadPath);
      const pdfDoc = await PDFDocument.load(pdfBytes);
      expect(pdfDoc.getPageCount()).toBeGreaterThanOrEqual(1);
    }
  });
});
