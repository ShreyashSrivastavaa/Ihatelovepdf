/**
 * IndexNow Automated URL Submission Script
 *
 * NOTE: Google DOES NOT support the IndexNow protocol.
 * Google relies exclusively on Google Search Console, sitemap.xml, and standard web crawling.
 * IndexNow is actively supported by Microsoft Bing, Yandex, Seznam.cz, and Naver.
 *
 * Usage:
 *   node scripts/submit-indexnow.mjs [url1 url2 ...]
 *   If no arguments are provided, it extracts the most recent routes from out/sitemap.xml.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HOST = 'www.ihatelovepdf.com';
const KEY = '55004af46f924269e5c96c7da70d26cb';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';

async function submitUrls(urls) {
  if (!urls || urls.length === 0) {
    console.log('[IndexNow] No URLs provided to submit.');
    return;
  }

  // Deduplicate and limit to 10,000 per request
  const cleanUrls = [...new Set(urls)].slice(0, 10000);

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: cleanUrls,
  };

  console.log(`[IndexNow] Submitting ${cleanUrls.length} URLs to Bing/Yandex IndexNow API...`);
  console.log(`[IndexNow] (Note: Google does not participate in IndexNow; submit sitemap.xml in GSC instead)`);

  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    if (response.status === 200 || response.status === 202) {
      console.log(`[IndexNow] Successfully accepted by IndexNow API (${response.status} ${response.statusText}).`);
    } else {
      const text = await response.text().catch(() => '');
      console.warn(`[IndexNow] Received status ${response.status}: ${text}`);
    }
  } catch (error) {
    console.error(`[IndexNow] Network error submitting to IndexNow:`, error.message);
  }
}

// CLI Execution
const args = process.argv.slice(2);
if (args.length > 0) {
  submitUrls(args);
} else {
  // Try reading sitemap.xml from out/
  const sitemapPath = path.resolve(__dirname, '../out/sitemap.xml');
  if (fs.existsSync(sitemapPath)) {
    const xml = fs.readFileSync(sitemapPath, 'utf8');
    const matches = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)];
    const urls = matches.map(m => m[1]);
    console.log(`[IndexNow] Loaded ${urls.length} URLs from out/sitemap.xml`);
    submitUrls(urls);
  } else {
    // Fallback: submit core landing and tool routes
    const fallbackUrls = [
      `https://${HOST}/`,
      `https://${HOST}/merge`,
      `https://${HOST}/compress`,
      `https://${HOST}/split`,
      `https://${HOST}/privacy-architecture`,
      `https://${HOST}/merge-pdf-without-uploading`,
      `https://${HOST}/pdf-tools-no-watermark`,
    ];
    submitUrls(fallbackUrls);
  }
}
