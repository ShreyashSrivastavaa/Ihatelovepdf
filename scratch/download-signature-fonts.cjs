const https = require('https');
const fs = require('fs');
const path = require('path');

const FONTS_DIR = path.join(__dirname, '..', 'public', 'fonts');
if (!fs.existsSync(FONTS_DIR)) {
  fs.mkdirSync(FONTS_DIR, { recursive: true });
}

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' } }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    });
  });
}

function downloadBinary(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, res => {
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
      file.on('error', reject);
    });
  });
}

async function run() {
  const cssUrl = 'https://fonts.googleapis.com/css2?family=Caveat:wght@600&family=Dancing+Script:wght@600&family=Great+Vibes&family=Pacifico&family=Sacramento&display=swap';
  console.log('Fetching Google Fonts CSS...');
  const css = await fetchText(cssUrl);

  const fontUrlRegex = /url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g;
  let match;
  const urls = [];
  while ((match = fontUrlRegex.exec(css)) !== null) {
    urls.push(match[1]);
  }

  console.log(`Found ${urls.length} font files to download.`);
  let localCss = css;

  for (let i = 0; i < urls.length; i++) {
    const remoteUrl = urls[i];
    const fileName = path.basename(remoteUrl);
    const destPath = path.join(FONTS_DIR, fileName);
    if (!fs.existsSync(destPath)) {
      console.log(`Downloading [${i+1}/${urls.length}] ${fileName}...`);
      await downloadBinary(remoteUrl, destPath);
    }
    // Replace remote URL with local path in CSS
    localCss = localCss.split(remoteUrl).join(`/fonts/${fileName}`);
  }

  fs.writeFileSync(path.join(FONTS_DIR, 'signatures.css'), localCss, 'utf8');
  console.log('Saved public/fonts/signatures.css');

  // Write SIL Open Font License
  const licenseText = `SIL OPEN FONT LICENSE Version 1.1
This license covers the following self-hosted fonts used for digital signatures:
- Caveat (Designed by Pablo Impallari)
- Dancing Script (Designed by Pablo Impallari)
- Great Vibes (Designed by TypeSETIT)
- Pacifico (Designed by Vernon Adams)
- Sacramento (Designed by Brian J. Bonislawsky)

Permission is hereby granted, free of charge, to any person obtaining
a copy of the Font Software, to use, study, copy, merge, embed, modify,
redistribute, and sell modified and unmodified copies of the Font Software,
subject to the conditions of the SIL Open Font License v1.1.
Full license text available at: http://scripts.sil.org/OFL
`;
  fs.writeFileSync(path.join(FONTS_DIR, 'LICENSE.txt'), licenseText, 'utf8');
  console.log('Saved public/fonts/LICENSE.txt');
}

run().catch(console.error);

