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

for (const relPath of layouts) {
  const fullPath = path.resolve(__dirname, '..', relPath);
  if (!fs.existsSync(fullPath)) continue;

  let content = fs.readFileSync(fullPath, 'utf8');

  // Remove import lines
  content = content.replace(/import\s*\{\s*GoogleAnalyticsScripts\s*\}\s*from\s*["'].*?["'];?\r?\n?/g, '');
  content = content.replace(/import\s*\{\s*PagePulseScript\s*\}\s*from\s*["'].*?["'];?\r?\n?/g, '');
  content = content.replace(/import\s*\{\s*GaPageViewTracker\s*\}\s*from\s*["'].*?["'];?\r?\n?/g, '');
  content = content.replace(/import\s*\{\s*WebVitalsReporter\s*\}\s*from\s*["'].*?["'];?\r?\n?/g, '');
  content = content.replace(/import\s*\{\s*Analytics\s*\}\s*from\s*["']@vercel\/analytics\/next["'];?\r?\n?/g, '');
  content = content.replace(/import\s*\{\s*SpeedInsights\s*\}\s*from\s*["']@vercel\/speed-insights\/next["'];?\r?\n?/g, '');

  // Remove component tags
  content = content.replace(/<GoogleAnalyticsScripts\s*\/>\r?\n?/g, '');
  content = content.replace(/<PagePulseScript\s*\/>\r?\n?/g, '');
  content = content.replace(/<WebVitalsReporter\s*\/>\r?\n?/g, '');
  content = content.replace(/<Suspense fallback=\{null\}>\s*<GaPageViewTracker\s*\/>\s*<\/Suspense>\r?\n?/g, '');
  content = content.replace(/<Analytics\s*\/>\r?\n?/g, '');
  content = content.replace(/<SpeedInsights\s*\/>\r?\n?/g, '');

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log('Cleaned layout:', relPath);
}

