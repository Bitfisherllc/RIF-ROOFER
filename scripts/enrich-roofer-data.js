const fs = require('fs');
const path = require('path');

// Read the TypeScript file
const tsPath = path.join(__dirname, '../app/roofers/data/roofers.ts');
let tsContent = fs.readFileSync(tsPath, 'utf8');

// City to county/region mapping (simplified - you can expand this)
const cityToRegionMap = {
  // Sun Coast
  'tampa': { region: 'sun-coast', county: 'hillsborough' },
  'st-petersburg': { region: 'sun-coast', county: 'pinellas' },
  'clearwater': { region: 'sun-coast', county: 'pinellas' },
  'pinellas-park': { region: 'sun-coast', county: 'pinellas' },
  'largo': { region: 'sun-coast', county: 'pinellas' },
  'new-port-richey': { region: 'sun-coast', county: 'pasco' },
  'port-richey': { region: 'sun-coast', county: 'pasco' },
  'wesley-chapel': { region: 'sun-coast', county: 'pasco' },
  'brooksville': { region: 'sun-coast', county: 'hernando' },
  
  // Central Florida
  'orlando': { region: 'central-florida', county: 'orange' },
  'winter-park': { region: 'central-florida', county: 'orange' },
  'kissimmee': { region: 'central-florida', county: 'osceola' },
  'lakeland': { region: 'central-florida', county: 'polk' },
  'winter-haven': { region: 'central-florida', county: 'polk' },
  'sanford': { region: 'central-florida', county: 'seminole' },
  'altamonte-springs': { region: 'central-florida', county: 'seminole' },
  'clermont': { region: 'central-florida', county: 'lake' },
  'leesburg': { region: 'central-florida', county: 'lake' },
  
  // South Florida
  'miami': { region: 'south-florida', county: 'miami-dade' },
  'fort-lauderdale': { region: 'south-florida', county: 'broward' },
  'west-palm-beach': { region: 'south-florida', county: 'palm-beach-south' },
  'boca-raton': { region: 'south-florida', county: 'palm-beach-south' },
  'pompano-beach': { region: 'south-florida', county: 'broward' },
  'hollywood': { region: 'south-florida', county: 'broward' },
  'coral-gables': { region: 'south-florida', county: 'miami-dade' },
  'key-west': { region: 'south-florida', county: 'monroe' },
  
  // North Florida
  'jacksonville': { region: 'north-florida', county: 'duval' },
  'gainesville': { region: 'north-florida', county: 'alachua' },
  'ponte-vedra': { region: 'north-florida', county: 'st-johns' },
  'st-augustine': { region: 'north-florida', county: 'st-johns' },
  'orange-park': { region: 'north-florida', county: 'clay' },
  
  // Southwest Florida
  'sarasota': { region: 'southwest-florida', county: 'sarasota' },
  'naples': { region: 'southwest-florida', county: 'collier' },
  'fort-myers': { region: 'southwest-florida', county: 'lee' },
  'cape-coral': { region: 'southwest-florida', county: 'lee' },
  'port-charlotte': { region: 'southwest-florida', county: 'charlotte' },
  
  // Treasure Coast
  'vero-beach': { region: 'treasure-coast', county: 'indian-river' },
  'port-st-lucie': { region: 'treasure-coast', county: 'st-lucie' },
  'stuart': { region: 'treasure-coast', county: 'martin' },
  'jupiter': { region: 'treasure-coast', county: 'palm-beach' },
  
  // First Coast
  'jacksonville-beach': { region: 'first-coast', county: 'duval-fc' },
  'fernandina-beach': { region: 'first-coast', county: 'nassau' },
  
  // Panhandle
  'pensacola': { region: 'florida-panhandle', county: 'escambia' },
  'tallahassee': { region: 'florida-panhandle', county: 'leon' },
  'panama-city': { region: 'florida-panhandle', county: 'bay' },
};

// Helper to create slug from name
function createSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Helper to get region/county from city
function getServiceAreaFromCity(cityName) {
  if (!cityName) return null;
  const citySlug = createSlug(cityName);
  return cityToRegionMap[citySlug] || null;
}

// Generate default aboutText
function generateAboutText(roofer) {
  const locationParts = [];
  if (roofer.city) locationParts.push(roofer.city);
  if (roofer.state) locationParts.push(roofer.state);
  const location = locationParts.join(', ');
  
  return `<h3 class="text-2xl font-semibold text-rif-black mb-4 mt-0">Professional Roofing Services${location ? ` in ${location}` : ''}</h3>
<p class="mb-6">${roofer.name} is a professional roofing contractor${location ? ` serving ${location}` : ' serving Florida'} and surrounding areas. With expertise in residential and commercial roofing, ${roofer.name} provides quality installation, replacement, and repair services for various roofing systems suitable for Florida's climate.</p>

<h3 class="text-2xl font-semibold text-rif-black mb-4 mt-8">Services & Expertise</h3>
<p class="mb-6">${roofer.name} offers comprehensive roofing solutions including roof installation, replacement, and repair services. The company works with various roofing materials and systems designed to withstand Florida's unique weather conditions, including high heat, humidity, and occasional severe weather.</p>
<p class="mb-0">Whether you need a new roof installation, roof replacement after storm damage, or routine maintenance and repairs, ${roofer.name} brings professional expertise and quality workmanship to every project. Their knowledge of local building codes and roofing best practices makes them a trusted partner for your roofing needs.</p>`;
}

// Default specialties
const defaultSpecialties = [
  'Residential Roofing',
  'Commercial Roofing',
  'Roof Installation',
  'Roof Replacement',
  'Roof Repair',
  'Roof Maintenance',
];

// Find all roofer entries and enrich them
const rooferPattern = /'([^']+)':\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}\s*as any,/g;
let match;
const enrichedRoofers = [];

while ((match = rooferPattern.exec(tsContent)) !== null) {
  const slug = match[1];
  const rooferContent = match[0];
  
  // Skip if it's one of the detailed roofers (they already have full info)
  if (slug === '1-roof-llc' || slug === '360-degreez-consulting-llc') {
    continue;
  }
  
  // Extract basic info from the roofer entry
  const nameMatch = rooferContent.match(/name:\s*'([^']+)'/);
  const cityMatch = rooferContent.match(/city:\s*'([^']+)'/);
  const hasAboutText = rooferContent.includes('aboutText:');
  const hasSpecialties = rooferContent.includes('specialties:');
  const hasServiceAreas = rooferContent.match(/serviceAreas:\s*\{[^}]*regions:/);
  
  if (!nameMatch) continue;
  
  const name = nameMatch[1];
  const city = cityMatch ? cityMatch[1] : null;
  
  // Get service area info
  const serviceArea = getServiceAreaFromCity(city);
  
  // Build replacement
  let replacement = rooferContent;
  
  // Add aboutText if missing
  if (!hasAboutText) {
    const aboutText = generateAboutText({ name, city, state: 'FL' });
    // Insert before serviceAreas or before the closing brace
    if (replacement.includes('serviceAreas:')) {
      replacement = replacement.replace(
        /(serviceAreas:)/,
        `aboutText: \`${aboutText}\`,\n    $1`
      );
    } else {
      replacement = replacement.replace(
        /(isHidden:)/,
        `aboutText: \`${aboutText}\`,\n    $1`
      );
    }
  }
  
  // Add specialties if missing
  if (!hasSpecialties) {
    const specialtiesStr = `specialties: [\n      ${defaultSpecialties.map(s => `'${s}'`).join(',\n      ')},\n    ],`;
    if (replacement.includes('aboutText:')) {
      replacement = replacement.replace(
        /(aboutText:[^,]+),/,
        `$1,\n    ${specialtiesStr},`
      );
    } else if (replacement.includes('serviceAreas:')) {
      replacement = replacement.replace(
        /(serviceAreas:)/,
        `${specialtiesStr},\n    $1`
      );
    } else {
      replacement = replacement.replace(
        /(isHidden:)/,
        `${specialtiesStr},\n    $1`
      );
    }
  }
  
  // Add serviceAreas if missing or empty
  if (!hasServiceAreas || replacement.match(/serviceAreas:\s*\{\s*regions:\s*\[\s*\],/)) {
    const regions = serviceArea ? [serviceArea.region] : [];
    const counties = serviceArea ? [serviceArea.county] : [];
    const cities = city ? [createSlug(city)] : [];
    
    const serviceAreasStr = `serviceAreas: {\n      regions: [${regions.map(r => `'${r}'`).join(', ')}],\n      counties: [${counties.map(c => `'${c}'`).join(', ')}],\n      cities: [${cities.map(c => `'${c}'`).join(', ')}],\n    },`;
    
    if (replacement.includes('serviceAreas:')) {
      replacement = replacement.replace(
        /serviceAreas:\s*\{[^}]*\},/,
        serviceAreasStr
      );
    } else {
      replacement = replacement.replace(
        /(isHidden:)/,
        `${serviceAreasStr}\n    $1`
      );
    }
  }
  
  enrichedRoofers.push({ slug, original: rooferContent, enriched: replacement });
}

// Replace all enriched roofers in the content
enrichedRoofers.forEach(({ original, enriched }) => {
  tsContent = tsContent.replace(original, enriched);
});

// Write back
fs.writeFileSync(tsPath, tsContent, 'utf8');

console.log(`✅ Successfully enriched ${enrichedRoofers.length} roofers!`);
console.log(`   - Added aboutText to roofers missing it`);
console.log(`   - Added default specialties`);
console.log(`   - Populated serviceAreas based on city location`);


