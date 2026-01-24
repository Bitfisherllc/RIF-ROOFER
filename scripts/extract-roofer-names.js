const fs = require('fs');
const path = require('path');

// Read the roofers data file
const filePath = path.join(__dirname, '../app/roofers/data/roofers.ts');
const content = fs.readFileSync(filePath, 'utf8');

// Extract company names and slugs using regex
const regex = /'([a-z-]+)':\s*\{[^}]*name:\s*'([^']+)'/g;
const companies = [];
let match;

while ((match = regex.exec(content)) !== null) {
  companies.push({
    slug: match[1],
    name: match[2]
  });
}

// Also try to extract phone and city for better searching
const detailedRegex = /'([a-z-]+)':\s*\{[^}]*name:\s*'([^']+)'[^}]*phone:\s*'?([^',}]+)'?[^}]*city:\s*'?([^',}]+)'?/g;
const detailedCompanies = [];
let detailedMatch;

while ((detailedMatch = detailedRegex.exec(content)) !== null) {
  detailedCompanies.push({
    slug: detailedMatch[1],
    name: detailedMatch[2],
    phone: detailedMatch[3]?.trim() || '',
    city: detailedMatch[4]?.trim() || ''
  });
}

console.log('Total companies found:', companies.length);
console.log('\n=== Companies List (for BBB Search) ===\n');

detailedCompanies.forEach((company, index) => {
  console.log(`${index + 1}. ${company.name}`);
  if (company.city) console.log(`   Location: ${company.city}, FL`);
  if (company.phone) console.log(`   Phone: ${company.phone}`);
  console.log(`   Slug: ${company.slug}`);
  console.log('');
});

// Export as JSON for programmatic use
fs.writeFileSync(
  path.join(__dirname, '../roofers-for-bbb-search.json'),
  JSON.stringify(detailedCompanies, null, 2)
);

console.log('\n✅ Company list saved to: roofers-for-bbb-search.json');


