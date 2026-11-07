const fs = require('fs');
['de', 'es', 'fr', 'hu', 'it', 'pt', 'ro', 'ru'].forEach(loc => {
  const content = fs.readFileSync('src/i18n/dictionaries/' + loc + '/operations.ts', 'utf8');
  const matches = content.match(/slug:\s*["']([^"']+)["']/g) || [];
  console.log(loc, 'explicit operations count:', matches.length);
});

