const fs = require('fs');
const langs = ['en', 'de', 'es', 'fr', 'hu', 'it', 'pt', 'ro', 'ru'];

langs.forEach(lang => {
  const content = fs.readFileSync(`src/i18n/dictionaries/${lang}/index.ts`, 'utf8');
  const match = content.match(/cookieBanner:\s*\{[\s\S]*?message:\s*["']([^"']+)["']/);
  console.log(`${lang.toUpperCase()}: ${match ? match[1] : 'NOT FOUND'}`);
});

