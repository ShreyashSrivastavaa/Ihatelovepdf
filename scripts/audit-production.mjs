#!/usr/bin/env node

/**
 * Post-Deploy Production Verification Audit
 *
 * Runs headless Chromium against the live deployment to enforce zero-leakage guarantees:
 * 1. Zero third-party telemetry / advertising / tracking requests
 * 2. Zero bytes of document payloads transmitted across the network
 * 3. Zero 404/500 asset errors or broken script references
 *
 * Usage:
 *   node scripts/audit-production.mjs [BASE_URL]
 * Example:
 *   node scripts/audit-production.mjs https://www.ihatelovepdf.com
 */

import { chromium } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = (process.argv[2] || 'https://www.ihatelovepdf.com').replace(/\/+$/, '');
const FIXTURES_DIR = path.resolve(__dirname, '../tests/fixtures');
const SAMPLE_PDF = path.join(FIXTURES_DIR, 'small.pdf');

const TARGET_PAGES = [
  { name: 'Homepage (English)', path: '/' },
  { name: 'Tool: Merge PDF', path: '/merge', isTool: true, multi: true },
  { name: 'Tool: Compress PDF', path: '/compress', isTool: true },
  { name: 'Tool: Split PDF', path: '/split', isTool: true },
  { name: 'Tool: Rotate PDF', path: '/rotate', isTool: true },
  { name: 'Tool: Reorder PDF', path: '/reorder', isTool: true },
  { name: 'Localized Tool: Unir PDF (Spanish)', path: '/es/unir', isTool: true, multi: true },
  { name: 'Localized Homepage: German', path: '/de' },
  { name: 'Guide: How to Merge PDF Files', path: '/guides/how-to-merge-pdf-files' },
  { name: 'Landing: Offline PDF Tools', path: '/offline-pdf-tools' },
];

console.log(`\n======================================================`);
console.log(`PRODUCTION ZERO-LEAKAGE AUDIT`);
console.log(`Target: ${BASE_URL}`);
console.log(`======================================================\n`);

let baseHost = 'www.ihatelovepdf.com';
try {
  baseHost = new URL(BASE_URL).hostname;
} catch (e) {
  console.error(`Invalid BASE_URL: ${BASE_URL}`);
  process.exit(1);
}

async function auditProduction() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();

  let totalThirdParty = 0;
  let totalDocPayloads = 0;
  let totalFailedRequests = 0;
  const auditResults = [];

  for (const item of TARGET_PAGES) {
    const page = await context.newPage();
    const requests = [];
    const thirdPartyRequests = [];
    const docPayloadRequests = [];
    const failedResponses = [];

    page.on('request', req => {
      const url = req.url();
      let isThirdParty = false;
      try {
        const reqHost = new URL(url).hostname;
        // Treat localhost/127.0.0.1 or matching target hostname as first-party
        if (reqHost !== baseHost && reqHost !== 'localhost' && reqHost !== '127.0.0.1') {
          // Cloudflare Web Analytics beacon is optional, but everything else is forbidden
          isThirdParty = true;
          thirdPartyRequests.push({ url, method: req.method() });
        }
      } catch {}

      const postData = req.postData() || '';
      const postBuffer = req.postDataBuffer();
      const hasPdfHeader = postBuffer ? postBuffer.includes(Buffer.from('%PDF-')) : false;
      const hasPdf = hasPdfHeader || postData.includes('%PDF-') || postData.includes('small.pdf');
      if (hasPdf) {
        docPayloadRequests.push({ url, method: req.method(), size: postBuffer ? postBuffer.length : postData.length });
      }

      requests.push({ url, method: req.method(), isThirdParty, hasPdf });
    });

    page.on('response', resp => {
      if (resp.status() >= 400) {
        failedResponses.push({ url: resp.url(), status: resp.status() });
      }
    });

    try {
      const targetUrl = `${BASE_URL}${item.path}`;
      await page.goto(targetUrl, { waitUntil: 'load', timeout: 30000 });
      await page.waitForTimeout(1500);

      // If it's a tool page and sample fixture exists, simulate processing
      if (item.isTool && fs.existsSync(SAMPLE_PDF)) {
        const fileInput = page.locator('input[type="file"]').first();
        if (await fileInput.count() > 0) {
          if (item.multi) {
            await fileInput.setInputFiles([SAMPLE_PDF, SAMPLE_PDF]);
          } else {
            await fileInput.setInputFiles(SAMPLE_PDF);
          }
          await page.waitForTimeout(1000);

          const buttons = page.locator('button');
          const count = await buttons.count();
          for (let i = 0; i < count; i++) {
            const text = await buttons.nth(i).innerText().catch(() => '');
            if (/process|merge|compress|split|rotate|extract|watermark|crop|download|apply|protect|unir/i.test(text)) {
              await buttons.nth(i).click({ timeout: 3000 }).catch(() => {});
              break;
            }
          }
          await page.waitForTimeout(2000);
        }
      }

      totalThirdParty += thirdPartyRequests.length;
      totalDocPayloads += docPayloadRequests.length;
      totalFailedRequests += failedResponses.length;

      const pagePassed = thirdPartyRequests.length === 0 && docPayloadRequests.length === 0 && failedResponses.length === 0;

      auditResults.push({
        name: item.name,
        path: item.path,
        passed: pagePassed,
        requestsCount: requests.length,
        thirdPartyRequests,
        docPayloadRequests,
        failedResponses
      });

      console.log(`[${pagePassed ? 'PASS' : 'FAIL'}] ${item.name.padEnd(35)}: ${requests.length} reqs | 3rd-party: ${thirdPartyRequests.length} | doc-payloads: ${docPayloadRequests.length} | 4xx/5xx: ${failedResponses.length}`);

      if (!pagePassed) {
        if (thirdPartyRequests.length > 0) {
          console.error(`  -> Third-party leaks:`, thirdPartyRequests.map(r => r.url));
        }
        if (docPayloadRequests.length > 0) {
          console.error(`  -> Document payload leaks:`, docPayloadRequests.map(r => `${r.url} (${r.size}B)`));
        }
        if (failedResponses.length > 0) {
          console.error(`  -> Asset failures:`, failedResponses.map(r => `${r.status} ${r.url}`));
        }
      }

    } catch (err) {
      console.error(`[ERROR] Failed auditing ${item.name}: ${err.message}`);
      auditResults.push({
        name: item.name,
        path: item.path,
        passed: false,
        error: err.message
      });
      totalFailedRequests++;
    } finally {
      await page.close();
    }
  }

  await browser.close();

  console.log(`\n======================================================`);
  console.log(`AUDIT SUMMARY FOR ${BASE_URL}`);
  console.log(`======================================================`);
  console.log(`Total Pages Audited      : ${auditResults.length}`);
  console.log(`Pages Passed             : ${auditResults.filter(r => r.passed).length}/${auditResults.length}`);
  console.log(`Third-Party Requests     : ${totalThirdParty}`);
  console.log(`Document Payload Leaks   : ${totalDocPayloads}`);
  console.log(`Asset Failures (4xx/5xx) : ${totalFailedRequests}`);
  console.log(`======================================================`);

  if (totalThirdParty > 0 || totalDocPayloads > 0 || totalFailedRequests > 0) {
    console.error(`\n❌ AUDIT FAILED: Production does not meet zero-leakage standards.`);
    process.exit(1);
  } else {
    console.log(`\n✅ AUDIT PASSED: 100% verified private and operational.`);
    process.exit(0);
  }
}

auditProduction().catch(err => {
  console.error(`Fatal audit runner error:`, err);
  process.exit(1);
});
