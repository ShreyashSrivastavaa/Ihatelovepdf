import fs from 'node:fs';

const locales = ['de', 'es', 'fr', 'hu', 'it', 'pt', 'ro', 'ru'];
let totalOver = 0;

for (const loc of locales) {
  const filePath = `src/i18n/dictionaries/${loc}/operations.ts`;
  if (!fs.existsSync(filePath)) continue;
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find all title: "..."
  const titles = [...content.matchAll(/title:\s*"([^"]+)"/g)];
  for (const match of titles) {
    const orig = match[1];
    if (orig.length > 50) {
      totalOver++;
      // Clean up common suffixes like " | ihatelovepdf", " | Ingyenes", etc.
      let shortened = orig;
      if (shortened.includes(' | ihatelovepdf')) {
        shortened = shortened.split(' | ihatelovepdf')[0].trim();
      }
      if (shortened.includes(' | ')) {
        const parts = shortened.split(' | ');
        shortened = parts[0].trim();
      }
      if (shortened.length > 50) {
        // If still over 50, truncate cleanly at word boundary
        const words = shortened.split(' ');
        while (words.join(' ').length > 50) {
          words.pop();
        }
        shortened = words.join(' ');
      }
      console.log(`[${loc}] (${orig.length} -> ${shortened.length}) "${orig}" -> "${shortened}"`);
      content = content.replace(`title: "${orig}"`, `title: "${shortened}"`);
    }
  }
  fs.writeFileSync(filePath, content, 'utf8');
}

console.log(`Finished trimming localized operation titles. Total updated: ${totalOver}`);
