const fs = require('fs');
const content = fs.readFileSync('src/components/offline-tools/OfflineToolsPageContent.tsx', 'utf8');

const langs = ['en', 'de', 'es', 'fr', 'it', 'pt', 'hu', 'ro', 'ru'];
const langNames = {
  en: 'English (EN)',
  de: 'Deutsch (DE)',
  es: 'Español (ES)',
  fr: 'Français (FR)',
  it: 'Italiano (IT)',
  pt: 'Português (PT)',
  hu: 'Magyar (HU)',
  ro: 'Română (RO)',
  ru: 'Русский (RU)',
};

langs.forEach(lang => {
  const marker = lang + ': {';
  const start = content.indexOf(marker);
  const end = content.indexOf('faqs:', start);
  const block = content.slice(start, end);
  const titleMatch = block.match(/noticeTitle:\s*['"]([^'"]+)['"]/);
  const textMatch = block.match(/noticeText:\s*['"]([^'"]+)['"]/);

  console.log(`\n### ${langNames[lang]}`);
  console.log(`**${titleMatch ? titleMatch[1] : ''}**`);
  console.log(`> "${textMatch ? textMatch[1] : ''}"`);
});

