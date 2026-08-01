# Google Search Console & Indexing Guide for ihatelovepdf

Follow these steps to submit your updated URLs to Google Search Console (GSC) and search engines after the URL/domain change:

---

## 1. Google Search Console Setup & Verification

1. Go to [Google Search Console](https://search.google.com/search-console).
2. Click **Add Property**:
   - Choose **URL prefix** (e.g. `https://ihatelovepdf.vercel.app`) or **Domain** (e.g. `ihatelovepdf.com` if using custom domain).
3. Select **HTML tag** verification method.
4. Copy the `content="..."` code string provided by Google (e.g. `abc123xyz...`).
5. Set the environment variable in Vercel or `.env.local`:
   ```bash
   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION="your_google_verification_code_here"
   ```
6. Deploy the site, then click **Verify** in Google Search Console.

---

## 2. Submit Sitemap to Google

1. In Google Search Console, navigate to **Indexing > Sitemaps** in the left sidebar.
2. Enter your sitemap URL:
   ```text
   https://ihatelovepdf.vercel.app/sitemap.xml
   ```
3. Click **Submit**.
4. Google will now discover and queue all 90+ localized URLs (Home, Tools, FAQ, Support, Privacy, Terms, Contact) across all supported languages (EN, ES, PT, DE, IT, FR, RO, RU, HU).

---

## 3. Fast Indexing via IndexNow (Bing, Yandex, Seznam)

To immediately notify IndexNow-supported search engines of your new URLs:

```bash
# Run dry-run test
DRY_RUN=true node scripts/ping-indexnow.mjs

# Submit live sitemap URLs
node scripts/ping-indexnow.mjs
```

---

## 4. Change of Address (If renaming domain in GSC)

If you previously had a domain registered in Google Search Console:
1. In Search Console for the old domain property, go to **Settings > Change of Address**.
2. Select your new domain (`https://ihatelovepdf.vercel.app` or `ihatelovepdf.com`).
3. Click **Submit**. Google will transfer ranking signals from the old domain to the new domain.
