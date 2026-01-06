const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../app/roofers/data/roofers.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Pattern: isHidden: false, followed by a line with just a comma, then duplicate quoted properties
// Replace with: isHidden: false, followed by closing brace
const pattern = /(\s+isHidden: false,)\n\s+,\n\s+"isPreferred": false,\n\s+"isHidden": false \}/g;
const replacement = '$1\n  },';
content = content.replace(pattern, replacement);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed duplicate isPreferred/isHidden properties');









