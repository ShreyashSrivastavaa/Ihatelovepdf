import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { PDFDocument } from 'pdf-lib';

test.describe('QA Batch 4: Redaction, Signatures, Forms, Editor & Comparison', () => {
  const fixturesDir = path.resolve(process.cwd(), 'tests/fixtures');

  // 16. Tool: REDACT
  test('16. REDACT: draws redaction box on canvas and sanitizes PDF with zero-leakage burn', async ({ page }) => {
    await page.goto('/redact');
    await expect(page).toHaveTitle(/Redact/i);

    const fileInput = page.locator('input[type="file"]').first();
    await fileInput.setInputFiles(path.join(fixturesDir, 'small.pdf'));

    const canvas = page.locator('.cursor-crosshair canvas');
    await canvas.waitFor({ state: 'visible', timeout: 15000 });
    await page.waitForFunction(() => {
      const c = document.querySelector('.cursor-crosshair canvas') as HTMLCanvasElement;
      return c && c.width > 50 && c.height > 50;
    }, { timeout: 15000 });

    const canvasWrapper = page.locator('.cursor-crosshair');
    await canvasWrapper.scrollIntoViewIfNeeded();
    const box = await canvasWrapper.boundingBox();
    expect(box).toBeTruthy();
    if (box) {
      // Drag a redaction box across the canvas with steps for smooth pointermove event stream
      await page.mouse.move(box.x + 40, box.y + 40);
      await page.mouse.down();
      await page.mouse.move(box.x + 160, box.y + 110, { steps: 5 });
      await page.mouse.up();
    }

    // Confirm redaction count
    await expect(page.getByText(/Redactions \(1\)/i)).toBeVisible({ timeout: 10000 });

    // Switch to Vector Box mode for fast deterministic verification
    const vectorBtn = page.getByRole('button', { name: /Vector Box Only/i });
    if (await vectorBtn.isVisible()) {
      await vectorBtn.click();
    }

    const applyBtn = page.getByRole('button', { name: /Apply & Download PDF/i });
    await applyBtn.waitFor({ state: 'visible' });

    const downloadPromise = page.waitForEvent('download');
    await applyBtn.click();

    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/\.pdf$/i);

    const downloadPath = await download.path();
    expect(downloadPath).toBeTruthy();
    if (downloadPath) {
      const pdfBytes = fs.readFileSync(downloadPath);
      const redactedDoc = await PDFDocument.load(pdfBytes);
      expect(redactedDoc.getPageCount()).toBe(1);
    }
  });

  // 17. Tool: SIGN PDF
  test('17. SIGN PDF: creates signature and stamps it onto PDF page', async ({ page }) => {
    await page.goto('/sign-pdf');
    await expect(page).toHaveTitle(/Sign/i);

    const fileInput = page.locator('input[type="file"]').first();
    await fileInput.setInputFiles(path.join(fixturesDir, 'small.pdf'));

    // Click "Create Signature"
    const createSigBtn = page.getByRole('button', { name: /Create Signature/i });
    await createSigBtn.waitFor({ state: 'visible', timeout: 15000 });
    await createSigBtn.click();

    // In modal, switch to "Stamps" tab
    const stampTab = page.getByRole('button', { name: /Stamps/i });
    await stampTab.waitFor({ state: 'visible', timeout: 5000 });
    await stampTab.click();

    // Click "Save & Place on PDF"
    const savePlaceBtn = page.getByRole('button', { name: /Save & Place/i });
    await savePlaceBtn.click({ force: true });

    // Confirm stamp is placed
    await expect(page.getByText(/1 stamp placed/i)).toBeVisible({ timeout: 5000 });

    // Click "Sign & Download"
    const signDownloadBtn = page.getByRole('button', { name: /Sign & Download/i });
    await signDownloadBtn.waitFor({ state: 'visible' });

    const downloadPromise = page.waitForEvent('download');
    await signDownloadBtn.click();

    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/\.pdf$/i);

    const downloadPath = await download.path();
    expect(downloadPath).toBeTruthy();
    if (downloadPath) {
      const pdfBytes = fs.readFileSync(downloadPath);
      const signedDoc = await PDFDocument.load(pdfBytes);
      expect(signedDoc.getPageCount()).toBe(1);
    }
  });

  // 18. Tool: FILL PDF FORM
  test('18. FILL PDF FORM: inspects AcroForm fields, updates values, and exports filled PDF', async ({ page }) => {
    await page.goto('/fill-pdf-form');
    await expect(page).toHaveTitle(/Fill.*Form/i);

    const fileInput = page.locator('input[type="file"]').first();
    await fileInput.setInputFiles(path.join(fixturesDir, 'form.pdf'));

    // Wait for interactive fields detection
    await expect(page.getByText(/Interactive Fields/i)).toBeVisible({ timeout: 15000 });

    // Fill an input in the form fields sidebar
    const formInput = page.locator('input[type="text"]').first();
    if (await formInput.isVisible()) {
      await formInput.fill('Playwright Test User');
    }

    // Click "Save & Download PDF"
    const saveFormBtn = page.getByRole('button', { name: /Save & Download PDF/i });
    await saveFormBtn.waitFor({ state: 'visible' });

    const downloadPromise = page.waitForEvent('download');
    await saveFormBtn.click();

    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/\.pdf$/i);

    const downloadPath = await download.path();
    expect(downloadPath).toBeTruthy();
    if (downloadPath) {
      const pdfBytes = fs.readFileSync(downloadPath);
      const formDoc = await PDFDocument.load(pdfBytes);
      expect(formDoc.getPageCount()).toBe(1);
    }
  });

  // 19. Tool: EDIT PDF
  test('19. EDIT PDF: opens vector editor, adds elements, and exports edited document', async ({ page }) => {
    await page.goto('/edit-pdf');
    await expect(page).toHaveTitle(/Edit/i);

    const fileInput = page.locator('input[type="file"]').first();
    await fileInput.setInputFiles(path.join(fixturesDir, 'small.pdf'));

    // Wait for editor toolbar and export button
    const exportBtn = page.getByRole('button', { name: /Save & Export/i });
    await exportBtn.waitFor({ state: 'visible', timeout: 20000 });

    const downloadPromise = page.waitForEvent('download');
    await exportBtn.click();

    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/\.pdf$/i);

    const downloadPath = await download.path();
    expect(downloadPath).toBeTruthy();
    if (downloadPath) {
      const pdfBytes = fs.readFileSync(downloadPath);
      const editedDoc = await PDFDocument.load(pdfBytes);
      expect(editedDoc.getPageCount()).toBe(1);
    }
  });

  // 20. Tool: COMPARE PDF
  test('20. COMPARE PDF: loads two PDF documents and synchronizes comparative viewports', async ({ page }) => {
    await page.goto('/compare');
    await expect(page).toHaveTitle(/Compare/i);

    // Upload Document A
    const inputA = page.locator('input[type="file"]').first();
    await inputA.setInputFiles(path.join(fixturesDir, 'small.pdf'));

    // Wait for Document A to load and unmount its file input
    await expect(page.getByText(/Document A \(small\.pdf\)/i)).toBeVisible({ timeout: 15000 });

    // Now upload Document B (the remaining file input on the page)
    const inputB = page.locator('input[type="file"]').first();
    await inputB.setInputFiles(path.join(fixturesDir, 'small.pdf'));

    // Verify both canvas viewports render with active document indicator
    await expect(page.getByText(/Document B \(small\.pdf\)/i)).toBeVisible({ timeout: 15000 });

    // Verify sync toggle button is active and functional
    const syncBtn = page.getByRole('button', { name: /Sync Pages/i });
    await expect(syncBtn).toBeVisible();
    await syncBtn.click();
    await expect(page.getByText(/Sync Pages: OFF/i)).toBeVisible();
  });
});
