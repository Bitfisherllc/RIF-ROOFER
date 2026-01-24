/**
 * Script to assign service areas (city, county, region) to roofers based on their address
 * Run with: node scripts/assign-service-areas.js
 */

const fs = require('fs');
const path = require('path');

// Import search data - we'll need to parse the TypeScript file or use a compiled version
// For now, let's create a comprehensive city mapping

const cityToServiceArea = {
  // Sun Coast
  'tampa': { city: 'tampa', county: 'hillsborough', region: 'sun-coast' },
  'brandon': { city: 'brandon', county: 'hillsborough', region: 'sun-coast' },
  'plant-city': { city: 'plant-city', county: 'hillsborough', region: 'sun-coast' },
  'pinellas-park': { city: 'pinellas-park', county: 'pinellas', region: 'sun-coast' },
  'clearwater': { city: 'clearwater', county: 'pinellas', region: 'sun-coast' },
  'st-petersburg': { city: 'st-petersburg', county: 'pinellas', region: 'sun-coast' },
  'st-pete': { city: 'st-petersburg', county: 'pinellas', region: 'sun-coast' },
  
  // First Coast / North Florida
  'jacksonville': { city: 'jacksonville', county: 'duval-fc', region: 'first-coast' },
  'ponte-vedra': { city: 'ponte-vedra', county: 'st-johns-fc', region: 'first-coast' },
  'ponte-vedra-beach': { city: 'ponte-vedra', county: 'st-johns-fc', region: 'first-coast' },
  'st-augustine': { city: 'st-augustine', county: 'st-johns-fc', region: 'first-coast' },
  
  // Central Florida
  'winter-park': { city: 'winter-park', county: 'orange', region: 'central-florida' },
  'orlando': { city: 'orlando', county: 'orange', region: 'central-florida' },
  
  // South Florida
  'miami': { city: 'miami', county: 'miami-dade', region: 'south-florida' },
  'fort-lauderdale': { city: 'fort-lauderdale', county: 'broward', region: 'south-florida' },
  
  // Southwest Florida
  'naples': { city: 'naples', county: 'collier', region: 'southwest-florida' },
  'sarasota': { city: 'sarasota', county: 'sarasota', region: 'southwest-florida' },
};

function normalizeCityName(city) {
  if (!city) return '';
  return city
    .toLowerCase()
    .trim()
    .replace(/\./g, '')
    .replace(/\s+/g, '-')
    .replace(/saint/gi, 'st')
    .replace(/st\./gi, 'st');
}

function findServiceAreas(cityName) {
  if (!cityName) return null;
  
  const normalized = normalizeCityName(cityName);
  
  // Direct match
  if (cityToServiceArea[normalized]) {
    return cityToServiceArea[normalized];
  }
  
  // Partial match
  for (const [key, value] of Object.entries(cityToServiceArea)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return value;
    }
  }
  
  return null;
}

// Read the roofer data file
const rooferDataPath = path.join(__dirname, '../app/roofers/data/roofers.ts');
let content = fs.readFileSync(rooferDataPath, 'utf-8');

// Extract all roofer entries and update service areas
// This is a complex regex operation to find and update service areas
const rooferPattern = /'([^']+)':\s*\{([^}]+serviceAreas:\s*\{[^}]+\}[^}]*)\}/g;
let match;
let updatesCount = 0;

// For now, let's output what we would update
console.log('Analyzing roofers for service area assignment...\n');

// We'll need a more sophisticated approach - parsing the full file
// Let me create a better solution using a Node.js script that can parse the TypeScript

console.log('Service area mapping ready.');
console.log('\nTo assign service areas, we need to:');
console.log('1. Parse the roofer data file');
console.log('2. Find roofers missing service areas');
console.log('3. Match their city to service areas');
console.log('4. Update the file');

