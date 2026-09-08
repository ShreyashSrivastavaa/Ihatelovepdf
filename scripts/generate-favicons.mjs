import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function createIco(pngBuffers) {
  // pngBuffers: array of { width, height, buffer }
  const count = pngBuffers.length;
  const headerLength = 6;
  const dirEntryLength = 16;
  let currentOffset = headerLength + dirEntryLength * count;

  const header = Buffer.alloc(headerLength);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // 1 = ICO
  header.writeUInt16LE(count, 4); // count

  const entries = [];
  for (const item of pngBuffers) {
    const entry = Buffer.alloc(dirEntryLength);
    entry.writeUInt8(item.width >= 256 ? 0 : item.width, 0);
    entry.writeUInt8(item.height >= 256 ? 0 : item.height, 1);
    entry.writeUInt8(0, 2); // color palette count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(item.buffer.length, 8); // image size
    entry.writeUInt32LE(currentOffset, 12); // image offset
    entries.push(entry);
    currentOffset += item.buffer.length;
  }

  return Buffer.concat([header, ...entries, ...pngBuffers.map(p => p.buffer)]);
}

async function main() {
  const sourceImage = 'public/icon.png';
  if (!fs.existsSync(sourceImage)) {
    throw new Error(`Source image not found: ${sourceImage}`);
  }

  console.log(`Generating icons from ${sourceImage}...`);

  // 1. Generate square PNGs with sharp, preserving aspect ratio with transparent padding
  const sizes = {
    'public/icon.png': 32,
    'public/favicon.png': 48,
    'public/apple-icon.png': 180,
    'public/icon-192.png': 192,
    'public/icon-512.png': 512,
  };

  for (const [filePath, size] of Object.entries(sizes)) {
    const buf = await sharp(sourceImage)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toBuffer();

    fs.writeFileSync(filePath, buf);
    console.log(`Generated ${filePath} (${size}x${size}px) - ${buf.length} bytes`);
  }

  // 2. Generate valid multi-size favicon.ico (16x16, 32x32, 48x48)
  const icoSizes = [16, 32, 48];
  const icoPngBuffers = [];
  for (const s of icoSizes) {
    const b = await sharp(sourceImage)
      .resize(s, s, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toBuffer();
    icoPngBuffers.push({ width: s, height: s, buffer: b });
  }

  const icoBuffer = await createIco(icoPngBuffers);
  fs.writeFileSync('public/favicon.ico', icoBuffer);
  console.log(`Generated public/favicon.ico (contains 16x16, 32x32, 48x48) - ${icoBuffer.length} bytes`);

  // Also copy favicon.ico and apple-icon.png to src/app/
  fs.writeFileSync('src/app/favicon.ico', icoBuffer);
  console.log(`Copied favicon.ico to src/app/favicon.ico`);

  const appleIconBuf = fs.readFileSync('public/apple-icon.png');
  fs.writeFileSync('src/app/apple-icon.png', appleIconBuf);
  console.log(`Copied apple-icon.png to src/app/apple-icon.png`);

  const iconBuf = fs.readFileSync('public/icon.png');
  fs.writeFileSync('src/app/icon.png', iconBuf);
  console.log(`Copied icon.png to src/app/icon.png`);

  console.log('All icons generated successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
