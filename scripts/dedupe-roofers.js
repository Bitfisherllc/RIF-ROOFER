const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../app/roofers/data/roofers.ts');
const lines = fs.readFileSync(filePath, 'utf8').split('\n');
const seen = new Set();
const output = [];
let i = 0;
let skipped = 0;
while (i < lines.length) {
  const line = lines[i];
  const match = line.match(/^\s*'([^']+)':\s*\{/);
  if (!match) {
    output.push(line);
    i++;
    continue;
  }
  const slug = match[1];
  // capture roofer block until "} as any," balance
  let block = [line];
  i++;
  let brace = 1;
  while (i < lines.length && brace > 0) {
    const l = lines[i];
    if (l.includes('{')) brace += (l.match(/\{/g)||[]).length;
    if (l.includes('}')) brace -= (l.match(/\}/g)||[]).length;
    block.push(l);
    i++;
    if (brace === 0 && /} as any,/.test(l)) break;
  }
  if (seen.has(slug)) {
    skipped++;
    continue;
  }
  seen.add(slug);
  output.push(...block);
}
fs.writeFileSync(filePath, output.join('\n'));
console.log('Deduped roofers. Skipped duplicates:', skipped, 'Total kept:', seen.size);
