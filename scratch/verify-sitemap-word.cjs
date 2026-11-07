const fs = require('fs');

const sitemap = fs.readFileSync('out/sitemap.xml', 'utf8');
const locs = [
  'https://www.ihatelovepdf.com/word-to-pdf',
  'https://www.ihatelovepdf.com/de/word-zu-pdf',
  'https://www.ihatelovepdf.com/es/word-a-pdf',
  'https://www.ihatelovepdf.com/fr/word-en-pdf',
  'https://www.ihatelovepdf.com/hu/word-bol-pdf',
  'https://www.ihatelovepdf.com/it/word-in-pdf',
  'https://www.ihatelovepdf.com/pt/word-para-pdf',
  'https://www.ihatelovepdf.com/ro/word-in-pdf',
  'https://www.ihatelovepdf.com/ru/word-v-pdf'
];

locs.forEach(url => {
  console.log(url, 'in sitemap?', sitemap.includes(url));
});

const totalLocs = (sitemap.match(/<loc>/g) || []).length;
console.log('Total URLs in sitemap:', totalLocs);

// Verify buy-me-a-chai is NOT in sitemap
console.log('/buy-me-a-chai in sitemap?', sitemap.includes('buy-me-a-chai'));

