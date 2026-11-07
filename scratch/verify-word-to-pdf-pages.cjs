const fs = require('fs');

const files = [
  'out/word-to-pdf.html',
  'out/de/word-zu-pdf.html',
  'out/es/word-a-pdf.html',
  'out/fr/word-en-pdf.html',
  'out/hu/word-bol-pdf.html',
  'out/it/word-in-pdf.html',
  'out/pt/word-para-pdf.html',
  'out/ro/word-in-pdf.html',
  'out/ru/word-v-pdf.html'
];

files.forEach(f => {
  const exists = fs.existsSync(f);
  console.log(f, 'exists?', exists);
  if (exists) {
    const html = fs.readFileSync(f, 'utf8');
    const titleMatch = html.match(/<title>([^<]+)<\/title>/);
    const canMatch = html.match(/rel="canonical" href="([^"]+)"/);
    console.log(' -> Title:', titleMatch ? titleMatch[1] : 'NONE');
    console.log(' -> Canonical:', canMatch ? canMatch[1] : 'NONE');
  }
});

