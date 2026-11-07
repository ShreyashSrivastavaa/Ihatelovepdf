const fs = require('fs');
const path = require('path');

const layouts = [
  'src/app/(en)/layout.tsx',
  'src/app/de/layout.tsx',
  'src/app/es/layout.tsx',
  'src/app/fr/layout.tsx',
  'src/app/hu/layout.tsx',
  'src/app/it/layout.tsx',
  'src/app/pt/layout.tsx',
  'src/app/ro/layout.tsx',
  'src/app/ru/layout.tsx',
];

for (const rel of layouts) {
  const p = path.resolve(__dirname, '..', rel);
  if (!fs.existsSync(p)) continue;
  let c = fs.readFileSync(p, 'utf8');
  c = c.replace(/import\s*\{\s*Suspense,\s*type\s*ReactNode\s*\}\s*from\s*["']react["'];?/g, 'import { type ReactNode } from "react";');
  fs.writeFileSync(p, c, 'utf8');
}
console.log('Cleaned Suspense from layouts');

