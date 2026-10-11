import https from 'node:https';
import fs from 'node:fs';

const payload = JSON.parse(fs.readFileSync(new URL('./indexnow-payload.json', import.meta.url), 'utf8'));
const postData = JSON.stringify(payload);

const options = {
  hostname: 'api.indexnow.org',
  port: 443,
  path: '/IndexNow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(postData)
  }
};

console.log(`Submitting ${payload.urlList.length} URLs to IndexNow (api.indexnow.org)...`);

const req = https.request(options, (res) => {
  console.log(`HTTP Status: ${res.statusCode} (${res.statusMessage})`);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    if (res.statusCode === 200 || res.statusCode === 202) {
      console.log('Success: URLs received by search engines via IndexNow.');
    } else {
      console.log('Response body:', data);
    }
  });
});

req.on('error', (e) => {
  console.error(`Request error: ${e.message}`);
});

req.write(postData);
req.end();
