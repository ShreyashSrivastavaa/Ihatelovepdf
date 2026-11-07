const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const PATTERNS = [
  { name: 'Legal/Compliance', regex: 'gdpr|rgpd|dsgvo|lgpd|hipaa|compliant|conforme|konform' },
  { name: 'Offline Claims', regex: 'works offline|pwa|funciona sin conexi|hors ligne|offline-fähig|без интернета' },
  { name: 'Zero Tracking Claims', regex: '0 requests|no tracking|zero requests|sin rastreo|kein tracking|sans suivi' },
  { name: 'Old Trackers', regex: 'googletagmanager|google-analytics|gtag|pagepulse|supabase' }
];

const TARGET_DIRS = ['out', 'public', 'src'];

const results = {};

for (const p of PATTERNS) {
  results[p.name] = [];
  for (const dir of TARGET_DIRS) {
    if (!fs.existsSync(dir)) continue;
    try {
      const out = execSync(`git grep -iE "${p.regex}" -- "${dir}"`, { encoding: 'utf8' });
      if (out.trim()) {
        const lines = out.trim().split('\n');
        for (const line of lines) {
          results[p.name].push(line);
        }
      }
    } catch (e) {
      // exit code 1 means no match
    }
  }
  console.log(`[${p.name}] Found ${results[p.name].length} matches.`);
}

fs.writeFileSync(path.join(__dirname, 'full-claim-sweep-results.json'), JSON.stringify(results, null, 2));
console.log('Saved scratch/full-claim-sweep-results.json');

