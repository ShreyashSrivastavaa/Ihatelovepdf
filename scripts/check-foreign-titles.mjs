import fs from 'node:fs';

const files = ['de', 'es', 'fr', 'hu', 'it', 'pt', 'ro', 'ru'];
for (const f of files) {
  const content = fs.readFileSync(`src/i18n/dictionaries/${f}/index.ts`, 'utf8');
  const siteTitle = content.match(/site:\s*\{[\s\S]*?title:\s*["']([^"']+)["']/);
  const faqTitle = content.match(/faq:\s*\{[\s\S]*?title:\s*["']([^"']+)["']/);
  console.log(`${f} SITE: (${siteTitle ? siteTitle[1].length : 0}) "${siteTitle ? siteTitle[1] : ''}"`);
  console.log(`${f} FAQ:  (${faqTitle ? faqTitle[1].length : 0}) "${faqTitle ? faqTitle[1] : ''}"`);
}
