const fs = require('fs');

console.log('=== BUY ME A CHAI ===');
console.log('out/buy-me-a-chai.html exists?', fs.existsSync('out/buy-me-a-chai.html'));
if (fs.existsSync('out/buy-me-a-chai.html')) {
  const html = fs.readFileSync('out/buy-me-a-chai.html', 'utf8');
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  console.log('Title:', titleMatch ? titleMatch[1] : 'NONE');
  const canonicalMatch = html.match(/rel="canonical" href="([^"]+)"/);
  console.log('Canonical:', canonicalMatch ? canonicalMatch[1] : 'NONE');
  const robotsMatch = html.match(/name="robots" content="([^"]+)"/);
  console.log('Robots:', robotsMatch ? robotsMatch[1] : 'NONE');
  console.log('Includes buymeachai.in link?', html.includes('buymeachai.in/shreyashsrivastava'));
  console.log('Includes buymeacoffee cross-link?', html.includes('/buy-me-a-coffee'));
}

console.log('\n=== BUY ME A COFFEE ===');
console.log('out/buy-me-a-coffee.html exists?', fs.existsSync('out/buy-me-a-coffee.html'));
if (fs.existsSync('out/buy-me-a-coffee.html')) {
  const html = fs.readFileSync('out/buy-me-a-coffee.html', 'utf8');
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  console.log('Title:', titleMatch ? titleMatch[1] : 'NONE');
  const canonicalMatch = html.match(/rel="canonical" href="([^"]+)"/);
  console.log('Canonical:', canonicalMatch ? canonicalMatch[1] : 'NONE');
  const robotsMatch = html.match(/name="robots" content="([^"]+)"/);
  console.log('Robots:', robotsMatch ? robotsMatch[1] : 'NONE');
  console.log('Includes Chai cross-link?', html.includes('/buy-me-a-chai'));
  console.log('Includes buymeachai.in external link?', html.includes('buymeachai.in/shreyashsrivastava'));
}

console.log('\n=== SITEMAP & OUT AUDIT ===');
if (fs.existsSync('out/sitemap.xml')) {
  const sitemap = fs.readFileSync('out/sitemap.xml', 'utf8');
  console.log('Sitemap contains /buy-me-a-chai?', sitemap.includes('https://www.ihatelovepdf.com/buy-me-a-chai'));
  console.log('Sitemap contains /buy-me-a-coffee?', sitemap.includes('https://www.ihatelovepdf.com/buy-me-a-coffee'));
  const urls = (sitemap.match(/<loc>/g) || []).length;
  console.log('Total URLs in sitemap.xml:', urls);
}

const htmlFiles = fs.readdirSync('out', { recursive: true }).filter(f => f.endsWith('.html'));
console.log('Total HTML files in out/:', htmlFiles.length);
