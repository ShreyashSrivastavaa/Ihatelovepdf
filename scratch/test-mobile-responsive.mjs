import { chromium } from '@playwright/test';
import http from 'http';
import fs from 'fs';
import path from 'path';

// Serve the out/ directory or test live/local build
const outDir = path.resolve('out');

function createStaticServer(port = 4173) {
  const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.mjs': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
  };

  const server = http.createServer((req, res) => {
    let reqPath = decodeURI(req.url.split('?')[0]);
    if (reqPath.endsWith('/')) reqPath += 'index.html';
    let filePath = path.join(outDir, reqPath);

    if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
      filePath += '.html';
    } else if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    if (!fs.existsSync(filePath)) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });

  return new Promise((resolve) => {
    server.listen(port, () => resolve(server));
  });
}

async function runTests() {
  console.log('Starting local static server on port 4173...');
  const server = await createStaticServer(4173);
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const baseUrl = 'http://localhost:4173';
  const viewports = [
    { name: 'Mobile 320px', width: 320, height: 640 },
    { name: 'Mobile 375px', width: 375, height: 667 },
    { name: 'Tablet 767px', width: 767, height: 1024 },
    { name: 'Desktop 768px', width: 768, height: 1024 },
    { name: 'Desktop 1024px', width: 1024, height: 768 },
    { name: 'Desktop 1280px', width: 1280, height: 800 },
  ];

  console.log('\n=== TESTING VIEWPORT RESPONSIVENESS & HORIZONTAL SCROLL ===');
  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto(baseUrl, { waitUntil: 'networkidle' });

    // Check horizontal scroll
    const overflow = await page.evaluate(() => {
      const docWidth = document.documentElement.offsetWidth;
      const scrollWidth = document.documentElement.scrollWidth;
      const bodyScrollWidth = document.body.scrollWidth;
      return {
        clientWidth: window.innerWidth,
        docWidth,
        scrollWidth,
        bodyScrollWidth,
        hasHorizontalScroll: scrollWidth > window.innerWidth || bodyScrollWidth > window.innerWidth,
      };
    });

    console.log(`Viewport [${vp.name}]:`, overflow.hasHorizontalScroll ? 'FAIL: Horizontal Scroll Detected' : 'PASS: Zero Horizontal Overflow');
    if (overflow.hasHorizontalScroll) {
      console.log('  Details:', overflow);
    }

    // Check Header elements
    const isMobile = vp.width < 768;
    const hamburgerVisible = await page.locator('#mobile-nav-toggle').isVisible();
    const desktopNavVisible = await page.locator('nav[aria-label="Main navigation"]').isVisible();
    const buyMeAChaiDesktopVisible = await page.locator('header a[href="/buy-me-a-chai"]').isVisible();

    if (isMobile) {
      if (!hamburgerVisible) {
        console.error(`  FAIL [${vp.name}]: Hamburger button should be visible on mobile!`);
      } else {
        console.log(`  PASS [${vp.name}]: Hamburger button is visible.`);
      }
      if (desktopNavVisible) {
        console.error(`  FAIL [${vp.name}]: Desktop navigation should be HIDDEN on mobile!`);
      } else {
        console.log(`  PASS [${vp.name}]: Desktop navigation is hidden.`);
      }
    } else {
      if (hamburgerVisible) {
        console.error(`  FAIL [${vp.name}]: Hamburger button should be HIDDEN on desktop!`);
      } else {
        console.log(`  PASS [${vp.name}]: Hamburger button is hidden.`);
      }
      if (!desktopNavVisible) {
        console.error(`  FAIL [${vp.name}]: Desktop navigation should be VISIBLE on desktop!`);
      } else {
        console.log(`  PASS [${vp.name}]: Desktop navigation is visible.`);
      }
      if (!buyMeAChaiDesktopVisible) {
        console.error(`  FAIL [${vp.name}]: Buy Me a Chai (UPI) should be visible in desktop header!`);
      } else {
        console.log(`  PASS [${vp.name}]: Buy Me a Chai (UPI) visible in desktop header.`);
      }
    }
  }

  console.log('\n=== TESTING HAMBURGER MENU INTERACTION & ACCESSIBILITY ===');
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto(baseUrl, { waitUntil: 'networkidle' });

  const hamburger = page.locator('#mobile-nav-toggle');
  const mobileMenu = page.locator('#mobile-nav-menu');

  // Verify initial aria attributes
  const initialExpanded = await hamburger.getAttribute('aria-expanded');
  const initialAriaControls = await hamburger.getAttribute('aria-controls');
  const initialAriaLabel = await hamburger.getAttribute('aria-label');
  console.log('Hamburger aria-expanded initial:', initialExpanded);
  console.log('Hamburger aria-controls:', initialAriaControls);
  console.log('Hamburger aria-label:', initialAriaLabel);

  // Check touch target bounding box
  const box = await hamburger.boundingBox();
  console.log(`Hamburger touch target: ${box?.width}x${box?.height}px (Requirement: >= 44x44px):`, (box && box.width >= 44 && box.height >= 44) ? 'PASS' : 'FAIL');

  // Click to open
  console.log('\nClicking hamburger to open menu...');
  await hamburger.click();
  await page.waitForTimeout(350); // wait for 300ms transition

  const openExpanded = await hamburger.getAttribute('aria-expanded');
  const menuVisible = await mobileMenu.isVisible();
  const bodyOverflow = await page.evaluate(() => document.body.style.overflow);
  console.log('Hamburger aria-expanded open:', openExpanded, openExpanded === 'true' ? 'PASS' : 'FAIL');
  console.log('Mobile menu visible:', menuVisible ? 'PASS' : 'FAIL');
  console.log('Body scroll locked (overflow: hidden):', bodyOverflow === 'hidden' ? 'PASS' : 'FAIL');

  // Verify "Buy Me a Chai (UPI)" is inside the mobile menu
  const chaiInMenu = mobileMenu.locator('a[href="/buy-me-a-chai"]');
  const isChaiVisible = await chaiInMenu.isVisible();
  const chaiText = await chaiInMenu.innerText();
  console.log('Buy Me a Chai (UPI) in mobile menu:', isChaiVisible ? 'PASS' : 'FAIL');
  console.log('  Content:', chaiText.replace(/\n/g, ' '));

  // Press Escape to close
  console.log('\nPressing Escape key to close menu...');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(350);
  const isClosedAfterEsc = !(await mobileMenu.isVisible());
  const bodyOverflowRestored = await page.evaluate(() => document.body.style.overflow);
  console.log('Menu closed after Escape:', isClosedAfterEsc ? 'PASS' : 'FAIL');
  console.log('Body overflow restored:', bodyOverflowRestored !== 'hidden' ? 'PASS' : 'FAIL');

  // Test Inner Page Back Button on mobile
  console.log('\n=== TESTING INNER TOOL PAGE (MERGE) ON MOBILE ===');
  await page.goto(baseUrl + '/merge', { waitUntil: 'networkidle' });
  const backBtnVisible = await page.locator('button[aria-label="Go back"]').isVisible();
  console.log('Back button visible on inner page:', backBtnVisible ? 'PASS' : 'FAIL');
  const backBox = await page.locator('button[aria-label="Go back"]').boundingBox();
  console.log(`Back button touch target: ${backBox?.width}x${backBox?.height}px (Requirement: >= 44x44px):`, (backBox && backBox.width >= 44 && backBox.height >= 44) ? 'PASS' : 'FAIL');

  await browser.close();
  server.close();
  console.log('\nAll automated tests completed successfully!');
}

runTests().catch((err) => {
  console.error('Test error:', err);
  process.exit(1);
});

