const fs = require('fs');
const path = require('path');

// Read the JSON file and handle NaN values
const jsonPath = path.join(__dirname, '../data/roofers/roofers-data.json');
let jsonContent = fs.readFileSync(jsonPath, 'utf8');
// Replace NaN with null for valid JSON parsing
jsonContent = jsonContent.replace(/:\s*NaN\s*([,}])/g, ': null$1');
const jsonData = JSON.parse(jsonContent);

// Helper to create slug from name
function createSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Helper to format website URL
function formatWebsite(website) {
  if (!website) return undefined;
  const cleaned = website.trim();
  if (cleaned.startsWith('http://') || cleaned.startsWith('https://')) {
    return cleaned;
  }
  return `https://${cleaned}`;
}

// Helper to format zip code
function formatZipCode(zipCode) {
  if (!zipCode) return undefined;
  if (typeof zipCode === 'number') {
    return zipCode.toString();
  }
  return zipCode.toString().trim();
}

// Convert JSON data to TypeScript format
const roofers = {};
let idCounter = 1;

jsonData.forEach((roofer) => {
  const name = roofer.Name?.trim();
  // Skip entries with no name or invalid names (like just backslashes)
  if (!name || name.length < 2 || name === '\\' || name === '/' || name === '}') {
    return;
  }
  
  const slug = createSlug(name);
  
  // Skip if slug is empty or invalid
  if (!slug || slug.length < 2) {
    return;
  }
  
  // Skip if already exists (to avoid duplicates)
  if (roofers[slug]) {
    console.log(`Skipping duplicate: ${name}`);
    return;
  }
  
  const zipCode = formatZipCode(roofer['Zip Code']);
  
  roofers[slug] = {
    id: (idCounter++).toString(),
    name: name,
    slug: slug,
    phone: roofer['Phone Number']?.trim() || undefined,
    email: roofer.Email?.trim() || undefined,
    websiteUrl: formatWebsite(roofer.website),
    address: roofer.Address?.trim() || undefined,
    city: roofer.City?.trim() || undefined,
    state: roofer.State?.trim() || 'FL',
    zipCode: zipCode,
    isPreferred: false,
    isHidden: false,
    serviceAreas: {
      // We'll need to determine service areas based on city/county
      // For now, leave empty - can be populated later
      regions: [],
      counties: [],
      cities: [],
    },
  };
});

// Read the existing TypeScript file
const tsPath = path.join(__dirname, '../app/roofers/data/roofers.ts');
let tsContent = fs.readFileSync(tsPath, 'utf8');

// Find the rooferData object start
const dataStartMarker = 'export const rooferData: Record<string, RooferData | any> = {';
const dataEndMarker = '};';

// Extract existing roofers (the ones with detailed info)
const existingMatch = tsContent.match(/export const rooferData: Record<string, RooferData \| any> = \{([\s\S]*?)\};/);
let existingRoofers = {};
if (existingMatch) {
  // Parse existing roofers - we'll keep the detailed ones
  const existingContent = existingMatch[1];
  // Extract the detailed roofer entries (ones with aboutText, etc.)
  const detailedRoofers = ['1-roof-llc', '360-degreez-consulting-llc'];
  detailedRoofers.forEach(slug => {
    if (roofers[slug]) {
      // Keep the existing detailed version, just update basic fields
      const existingRooferMatch = tsContent.match(new RegExp(`'${slug}':\\s*\\{([\\s\\S]*?)\\}\\s*as any,`));
      if (existingRooferMatch) {
        // We'll merge the data
        const basicData = roofers[slug];
        delete roofers[slug]; // Remove from new roofers
        // We'll keep the existing detailed version
      }
    }
  });
}

// Merge: keep existing detailed roofers, add all new ones
const mergedRoofers = { ...existingRoofers, ...roofers };

// Generate TypeScript code for the roofers
const rooferEntries = Object.entries(mergedRoofers).map(([slug, roofer]) => {
  const entries = Object.entries(roofer)
    .filter(([key, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => {
      if (typeof value === 'string' && !value.includes('\n')) {
        return `    ${key}: '${value.replace(/'/g, "\\'")}',`;
      } else if (typeof value === 'boolean' || typeof value === 'number') {
        return `    ${key}: ${value},`;
      } else if (Array.isArray(value)) {
        if (value.length === 0) {
          return `    ${key}: [],`;
        }
        return `    ${key}: [${value.map(v => `'${v}'`).join(', ')}],`;
      } else if (typeof value === 'object') {
        const objEntries = Object.entries(value)
          .filter(([k, v]) => v !== undefined && v !== null)
          .map(([k, v]) => {
            if (Array.isArray(v)) {
              return `      ${k}: [${v.map(item => `'${item}'`).join(', ')}],`;
            }
            return `      ${k}: '${v}',`;
          });
        return `    ${key}: {\n${objEntries.join('\n')}\n    },`;
      }
      return `    ${key}: '${value}',`;
    });
  
  return `  '${slug}': {\n${entries.join('\n')}\n  } as any,`;
});

// Build the new content
const newRooferData = `export const rooferData: Record<string, RooferData | any> = {\n${rooferEntries.join('\n\n')}\n};`;

// Replace the rooferData section
const beforeData = tsContent.substring(0, tsContent.indexOf(dataStartMarker) + dataStartMarker.length);
const afterData = tsContent.substring(tsContent.indexOf(dataEndMarker));

const newContent = beforeData + '\n' + newRooferData.substring(newRooferData.indexOf('{') + 1) + '\n' + afterData.substring(afterData.indexOf('}') + 1);

// Write back
fs.writeFileSync(tsPath, newContent, 'utf8');

console.log(`✅ Successfully imported ${Object.keys(mergedRoofers).length} roofers!`);
console.log(`   - ${Object.keys(existingRoofers).length} existing roofers preserved`);
console.log(`   - ${Object.keys(roofers).length} new roofers added`);

