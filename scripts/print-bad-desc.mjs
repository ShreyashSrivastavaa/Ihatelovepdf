import fs from 'node:fs';

const data = JSON.parse(fs.readFileSync('scripts/title-audit-before.json', 'utf8'));
const bad = data.filter(d => d.descLength < 70 || d.descLength > 160);
console.log(`Bad descriptions: ${bad.length}`);
bad.forEach(b => console.log(`${b.descLength} | ${b.file} | "${b.desc}"`));
