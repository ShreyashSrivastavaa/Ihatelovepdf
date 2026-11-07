const fs = require('fs');
const html = fs.readFileSync('out/compress.html', 'utf8');
console.log('out/compress.html length:', html.length);
console.log('Has input type="file"?', html.includes('type="file"'));
console.log('Script tags in out/compress.html:');
const scripts = html.match(/<script[^>]+src="([^"]+)"/g) || [];
scripts.forEach(s => console.log(' ', s));

