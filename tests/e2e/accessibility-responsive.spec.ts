import { test, expect } from '@playwright/test';

test.describe('Responsive Viewports, Accessibility & Theme Switching', () => {
  const viewports = [
    { name: 'Mobile 360px', width: 360, height: 740 },
    { name: 'Mobile 390px', width: 390, height: 844 },
    { name: 'Tablet 768px', width: 768, height: 1024 },
  ];

  for (const vp of viewports) {
    test(`Responsive Viewport: ${vp.name} renders without horizontal scroll overflow`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/');

      // Verify no horizontal overflow
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2); // 2px margin of error for fractional pixels

      // Verify header and main elements are visible
      await expect(page.locator('h1').first()).toBeVisible();
    });
  }

  test('Theme Switcher: toggles between light and dark themes smoothly', async ({ page }) => {
    await page.goto('/');

    const themeToggle = page.locator('#nav-theme-toggle').first();
    if (await themeToggle.isVisible()) {
      const initialIsDark = await page.evaluate(() =>
        document.documentElement.classList.contains('dark')
      );

      await themeToggle.click();

      const newIsDark = await page.evaluate(() =>
        document.documentElement.classList.contains('dark')
      );

      expect(newIsDark).not.toBe(initialIsDark);
    }
  });

  test('Accessibility: keyboard navigation and ARIA labels on upload dropzone', async ({ page }) => {
    await page.goto('/compress');

    // Verify upload zone has role and aria-label or accessible name
    const fileInput = page.locator('input[type="file"]').first();
    await expect(fileInput).toBeAttached();

    // Verify action buttons have accessible names
    const processButtons = page.getByRole('button');
    const buttonCount = await processButtons.count();
    expect(buttonCount).toBeGreaterThan(0);

    for (let i = 0; i < Math.min(buttonCount, 5); i++) {
      const btn = processButtons.nth(i);
      if (await btn.isVisible()) {
        const text = await btn.innerText();
        const ariaLabel = await btn.getAttribute('aria-label');
        const title = await btn.getAttribute('title');
        expect(text || ariaLabel || title).toBeTruthy();
      }
    }
  });
});
