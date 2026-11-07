const fs = require('fs');
const path = require('path');

const PROHIBITED_PATTERNS = [
  { name: 'GDPR', regex: /\bGDPR\b/i },
  { name: 'RGPD', regex: /\bRGPD\b/i },
  { name: 'DSGVO', regex: /\bDSGVO\b/i },
  { name: 'LGPD', regex: /\bLGPD\b/i },
  { name: 'HIPAA', regex: /\bHIPAA\b/i },
  { name: 'works offline', regex: /works offline/i },
  { name: '0 requests', regex: /0 requests/i },
  { name: 'no personal tracking', regex: /no personal tracking/i },
  { name: 'PWA claim', regex: /Progressive Web App \(PWA\)/i }
];

// Folders/files to scan
const SCAN_TARGETS = [
  path.resolve(__dirname, '../public/llms.txt'),
  path.resolve(__dirname, '../public/llms-full.txt'),
  path.resolve(__dirname, '../src'),
  path.resolve(__dirname, '../out')
];

function scanFile(filePath, foundIssues) {
  // Skip binary, lock, test fixtures, scratch
  if (filePath.includes('node_modules') || filePath.includes('.git') || filePath.includes('scratch') || filePath.includes('tests/fixtures')) return;
  const ext = path.extname(filePath);
  if (!['.ts', '.tsx', '.js', '.mjs', '.cjs', '.txt', '.html', '.json', '.md'].includes(ext)) return;

  const content = fs.readFileSync(filePath, 'utf8');

  for (const { name, regex } of PROHIBITED_PATTERNS) {
    if (regex.test(content)) {
      // Ignore legitimate coding instances (e.g. resume template text or CSS contrast)
      const lines = content.split('\n');
      lines.forEach((line, idx) => {
        if (regex.test(line)) {
          // Exclude resume-types.ts sample text if any
          if (filePath.includes('resume-types.ts') && line.includes('requests/sec')) return;
          foundIssues.push({
            file: path.relative(path.resolve(__dirname, '..'), filePath).replace(/\\/g, '/'),
            lineNum: idx + 1,
            issue: name,
            snippet: line.trim().slice(0, 120)
          });
        }
      });
    }
  }
}

function scanDir(dirPath, foundIssues) {
  const entries = fs.readdirSync(dirPath);
  for (const entry of entries) {
    const full = path.join(dirPath, entry);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      scanDir(full, foundIssues);
    } else {
      scanFile(full, foundIssues);
    }
  }
}

const foundIssues = [];
for (const target of SCAN_TARGETS) {
  if (fs.existsSync(target)) {
    const stat = fs.statSync(target);
    if (stat.isDirectory()) {
      scanDir(target, foundIssues);
    } else {
      scanFile(target, foundIssues);
    }
  }
}

console.log(`\n=== SCAN REPORT FOR PROHIBITED CLAIMS ===`);
console.log(`Total occurrences found: ${foundIssues.length}`);
if (foundIssues.length > 0) {
  foundIssues.slice(0, 30).forEach(i => {
    console.log(`  [${i.issue}] ${i.file}:${i.lineNum} -> "${i.snippet}"`);
  });
} else {
  console.log(`PASS: Zero prohibited claims found across out/, src/, and llms*.txt!`);
}

