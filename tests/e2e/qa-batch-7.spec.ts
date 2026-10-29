import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { PDFDocument } from 'pdf-lib';

test.describe('QA Batch 7: Document Creation & Business Utilities (Scan to PDF, Create PDF, POS Billing, GST Invoice)', () => {
  const fixturesDir = path.resolve(process.cwd(), 'tests/fixtures');

  // 32. Tool: SCAN TO PDF
  test('32. SCAN TO PDF: captures document snapshots via camera and compiles into vector PDF', async ({ page }) => {
    // Inject mock getUserMedia returning synthetic canvas stream
    await page.addInitScript(() => {
      const canvas = document.createElement('canvas');
      canvas.width = 640;
      canvas.height = 480;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 640, 480);
      ctx.fillStyle = '#111827';
      ctx.font = '24px sans-serif';
      ctx.fillText('SCANNED DOCUMENT TEST PAGE', 40, 100);

      // Animation loop to ensure active video stream with valid videoWidth
      let frame = 0;
      setInterval(() => {
        frame++;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 640, 480);
        ctx.fillStyle = '#111827';
        ctx.font = '24px sans-serif';
        ctx.fillText(`SCANNED DOCUMENT TEST PAGE (Frame ${frame})`, 40, 100);
      }, 50);

      const stream = canvas.captureStream(30);
      if (navigator.mediaDevices) {
        navigator.mediaDevices.getUserMedia = async () => stream;
        navigator.mediaDevices.enumerateDevices = async () => [
          {
            deviceId: 'mock-camera-1',
            kind: 'videoinput',
            label: 'HD Facetime Camera (Mock)',
            groupId: 'group-1',
            toJSON: () => ({}),
          } as MediaDeviceInfo,
        ];
      }
    });

    await page.goto('/scan-to-pdf');
    await expect(page).toHaveTitle(/Scan.*PDF|Camera/i);

    // Turn on camera
    const turnOnBtn = page.getByRole('button', { name: /Turn On Camera/i }).first();
    await turnOnBtn.click();

    // Verify video stream becomes active and capture button appears
    const captureBtn = page.getByRole('button', { name: /Capture Page #1/i });
    await expect(captureBtn).toBeVisible({ timeout: 10000 });

    // Capture first page
    await captureBtn.click();
    await expect(page.getByText('Scanned Pages (1)')).toBeVisible();

    // Capture second page
    const captureBtn2 = page.getByRole('button', { name: /Capture Page #2/i });
    await captureBtn2.click();
    await expect(page.getByText('Scanned Pages (2)')).toBeVisible();

    // Compile into PDF
    const downloadPromise = page.waitForEvent('download');
    const compileBtn = page.getByRole('button', { name: /Download PDF \(2 Pages\)/i });
    await compileBtn.click();

    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/camera_scan.*\.pdf$/i);

    const downloadPath = await download.path();
    expect(downloadPath).toBeTruthy();
    if (downloadPath) {
      const pdfBytes = fs.readFileSync(downloadPath);
      const pdfDoc = await PDFDocument.load(pdfBytes);
      expect(pdfDoc.getPageCount()).toBe(2);
    }
  });

  // 33. Tool: CREATE PDF (Canvas Studio)
  test('33. CREATE PDF: generates customizable blank vector document from preset', async ({ page }) => {
    await page.goto('/create-pdf');
    await expect(page).toHaveTitle(/Create.*PDF|Blank.*PDF/i);

    // Choose preset "Commercial Invoice"
    const presetSelect = page.locator('#pdf-processor select').first();
    await presetSelect.selectOption('invoice');

    // Click Export PDF
    const exportBtn = page.getByRole('button', { name: /Export PDF/i });
    await expect(exportBtn).toBeVisible();

    const downloadPromise = page.waitForEvent('download');
    await exportBtn.click();

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

  // 34. Tool: POS BILLING (Thermal Receipt Generator)
  test('34. POS BILLING: creates thermal receipt PDF with products and tax calculation', async ({ page }) => {
    await page.goto('/pos-billing');
    await expect(page).toHaveTitle(/POS.*Billing|Receipt/i);

    // Add first product to cart by clicking its card in the catalog
    const firstProductBtn = page.locator('button').filter({ hasText: /₹/ }).first();
    await firstProductBtn.click();

    // Verify checkout button becomes active with total
    const checkoutBtn = page.getByRole('button', { name: /^Checkout/i });
    await expect(checkoutBtn).toBeVisible();

    const downloadPromise = page.waitForEvent('download');
    await checkoutBtn.click();

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

  // 35. Tool: GST INVOICE GENERATOR
  test('35. GST INVOICE: compiles compliant Indian GST tax invoice with HSN and tax slabs', async ({ page }) => {
    await page.goto('/gst-invoice');
    await expect(page).toHaveTitle(/GST.*Invoice/i);

    const fileInput = page.locator('input[type="file"]').first();
    await fileInput.setInputFiles(path.join(fixturesDir, 'small.pdf'));

    await expect(page.getByText('small.pdf').first()).toBeVisible({ timeout: 10000 });

    // Options form is populated with default seller/buyer
    await expect(page.getByPlaceholder('Business Name')).toBeVisible();

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
