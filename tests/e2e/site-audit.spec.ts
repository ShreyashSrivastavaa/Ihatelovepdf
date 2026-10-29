import { test, expect } from '@playwright/test';

test.describe('Site-Wide QA & SEO Audit', () => {
  const locales = ['es', 'pt', 'de', 'it', 'fr', 'ro', 'ru', 'hu'];

  test('1. SITEMAP.XML: serves valid XML with proper URLs and priorities', async ({ page }) => {
    const response = await page.goto('/sitemap.xml');
    expect(response?.status()).toBe(200);

    const content = await page.content();
    expect(content).toContain('urlset');
    expect(content).toContain('https://www.ihatelovepdf.com');

    // Verify orphaned routes are NOT present
    expect(content).not.toContain('/ocr');
    expect(content).not.toContain('/fingerprint');
    expect(content).not.toContain('/latex-resume');
  });

  test('2. ROBOTS.TXT: serves proper directives and sitemap reference', async ({ page }) => {
    const response = await page.goto('/robots.txt');
    expect(response?.status()).toBe(200);

    const text = await page.locator('body').innerText();
    expect(text).toMatch(/User-[aA]gent:\s*\*/);
    expect(text).toContain('Allow: /');
    expect(text).toContain('Disallow: /api/');
    expect(text).toContain('Sitemap: https://www.ihatelovepdf.com/sitemap.xml');
  });

  test('3. LOCALE HOMEPAGES: all 9 locales load HTTP 200 with matching lang attribute and canonical', async ({ page }) => {
    // English
    await page.goto('/');
    await expect(page).toHaveTitle(/I Hate Love PDF|PDF/i);
    const htmlLangEn = await page.locator('html').getAttribute('lang');
    expect(htmlLangEn).toMatch(/^en/i);

    // All other 8 locales
    for (const locale of locales) {
      const response = await page.goto(`/${locale}`);
      expect(response?.status()).toBe(200);
      const htmlLang = await page.locator('html').getAttribute('lang');
      expect(htmlLang?.toLowerCase()).toContain(locale);

      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(canonical).toBeTruthy();
    }
  });

  test('4. HREFLANG TAGS: verify alternate hreflang links exist on tool pages', async ({ page }) => {
    await page.goto('/merge');
    const hreflangs = await page.locator('link[rel="alternate"][hreflang]').evaluateAll((links) =>
      links.map((link) => ({
        hreflang: link.getAttribute('hreflang'),
        href: link.getAttribute('href'),
      }))
    );

    expect(hreflangs.length).toBeGreaterThanOrEqual(9);
    const xDefault = hreflangs.find((h) => h.hreflang === 'x-default');
    expect(xDefault).toBeTruthy();
    expect(xDefault?.href).toContain('/merge');
  });

  test('5. CORE STATIC PAGES: all content marketing and legal pages load with 200 and h1', async ({ page }) => {
    const staticRoutes = [
      '/tools',
      '/about',
      '/faq',
      '/privacy',
      '/terms',
      '/contact',
      '/ilovepdf-alternative',
      '/smallpdf-alternative',
      '/buy-me-a-coffee',
    ];

    for (const route of staticRoutes) {
      const res = await page.goto(route);
      expect(res?.status()).toBe(200);
      await expect(page.locator('h1').first()).toBeVisible();
    }
  });

  test('6. LANGUAGE SWITCHER: navigating via desktop language dropdown routes properly', async ({ page }) => {
    await page.goto('/merge');
    const langSelect = page.locator('#nav-language-select-desktop');
    if (await langSelect.isVisible()) {
      await langSelect.selectOption('es');
      await page.waitForURL(/\/es\//);
      expect(page.url()).toContain('/es/');
    }
  });
});
