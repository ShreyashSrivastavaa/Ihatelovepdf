import fs from 'node:fs';

const data = JSON.parse(fs.readFileSync("scripts/audit-final-results.json", "utf8"));
const routes = [
  "/",
  "/merge", "/compress", "/split", "/extract", "/crop", "/rotate", "/reorder",
  "/pdf-to-images", "/images-to-pdf", "/watermark", "/page-numbers", "/headers-footers",
  "/extract-text", "/invert-colors", "/redact", "/compare", "/pdf-to-zip", "/edit-pdf",
  "/camera-scan", "/markdown-to-pdf", "/html-to-pdf", "/csv-to-pdf", "/create-pdf",
  "/excel-to-pdf", "/pdf-to-excel", "/powerpoint-to-pdf", "/pdf-to-powerpoint",
  "/pdf-to-html", "/pdf-to-epub", "/ebook-to-pdf", "/whiteboard-to-pdf",
  "/gst-invoice", "/pos-billing", "/sign-pdf", "/fill-pdf-form",
  "/about", "/contact", "/terms", "/blog", "/products", "/offline-pdf-tools",
  "/smallpdf-alternative", "/ilovepdf-alternative", "/free-pdf-tools-without-signup",
  "/blog/how-to-sign-a-pdf-on-mobile", "/blog/is-it-safe-to-use-online-pdf-tools",
  "/blog/how-to-unlock-pdf-forgotten-password", "/blog/how-to-convert-pdf-to-jpg-on-phone",
  "/blog/best-free-pdf-editors-no-watermark", "/blog/how-to-compress-pdf-to-under-100kb",
  "/guides/how-to-merge-pdf-files", "/guides/how-to-split-pdf-pages",
  "/guides/how-to-compress-pdf-without-losing-quality", "/guides/how-to-convert-images-to-pdf",
  "/guides/how-to-redact-pdf-free", "/guides/how-to-ocr-scanned-pdf-offline"
];

const map = new Map(data.results.map(r => [r.route, r]));
let md = "| Route | Final Rendered Title | Length |\n| :--- | :--- | :---: |\n";
for (const rt of routes) {
  const item = map.get(rt);
  if (item) {
    md += `| \`${rt}\` | ${item.finalTitle} | ${item.titleLength} |\n`;
  }
}
fs.writeFileSync("scripts/rendered-titles-table.md", md);
console.log("Table written to scripts/rendered-titles-table.md successfully");
