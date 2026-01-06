const fs = require('fs');
const path = require('path');

// Read the TypeScript file
const tsPath = path.join(__dirname, '../app/roofers/data/roofers.ts');
let tsContent = fs.readFileSync(tsPath, 'utf8');

// City to county/region mapping
const cityToRegionMap = {
  'pinellas-park': { region: 'sun-coast', county: 'pinellas' },
  'winter-park': { region: 'central-florida', county: 'orange' },
  'miami': { region: 'south-florida', county: 'miami-dade' },
  'rotonda-west': { region: 'southwest-florida', county: 'charlotte' },
  'boynton-beach': { region: 'south-florida', county: 'broward' },
  'zephyrhills': { region: 'sun-coast', county: 'pasco' },
  'deerfield-beach': { region: 'south-florida', county: 'broward' },
  'coral-springs': { region: 'south-florida', county: 'broward' },
  'oldsmar': { region: 'sun-coast', county: 'pinellas' },
  'pompano-beach': { region: 'south-florida', county: 'broward' },
  'tampa': { region: 'sun-coast', county: 'hillsborough' },
  'ft-lauderdale': { region: 'south-florida', county: 'broward' },
  'melbourne': { region: 'central-florida', county: 'brevard' },
  'jacksonville': { region: 'north-florida', county: 'duval' },
  'orlando': { region: 'central-florida', county: 'orange' },
  'gainesville': { region: 'north-florida', county: 'alachua' },
  'ponte-vedra': { region: 'north-florida', county: 'st-johns' },
  'st-augustine': { region: 'north-florida', county: 'st-johns' },
  'ocala': { region: 'central-florida', county: 'marion' },
  'sarasota': { region: 'southwest-florida', county: 'sarasota' },
  'naples': { region: 'southwest-florida', county: 'collier' },
  'fort-myers': { region: 'southwest-florida', county: 'lee' },
  'west-palm-beach': { region: 'south-florida', county: 'palm-beach-south' },
  'boca-raton': { region: 'south-florida', county: 'palm-beach-south' },
  'clearwater': { region: 'sun-coast', county: 'pinellas' },
  'st-petersburg': { region: 'sun-coast', county: 'pinellas' },
  'lakeland': { region: 'central-florida', county: 'polk' },
  'pensacola': { region: 'florida-panhandle', county: 'escambia' },
  'tallahassee': { region: 'florida-panhandle', county: 'leon' },
};

// Helper to create slug from name
function createSlug(name) {
  if (!name) return '';
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Get service area from city
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

const defaultSpecialties = [
  'Residential Roofing',
  'Commercial Roofing',
  'Roof Installation',
  'Roof Replacement',
  'Roof Repair',
  'Roof Maintenance',
];

// Process the file line by line to find and enrich roofers
const lines = tsContent.split('\n');
let inRoofer = false;
let rooferSlug = '';
let rooferName = '';
let rooferCity = '';
let rooferState = 'FL';
let rooferStartLine = -1;
let rooferLines = [];
let enrichedCount = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Detect start of a roofer entry
  const rooferStartMatch = line.match(/^\s*'([^']+)':\s*\{/);
  if (rooferStartMatch) {
    // Save previous roofer if any
    if (inRoofer && rooferStartLine >= 0) {
      // Process the previous roofer
      const rooferContent = rooferLines.join('\n');
      const hasAboutText = rooferContent.includes('aboutText:');
      const hasSpecialties = rooferContent.includes('specialties:');
      const hasNonEmptyServiceAreas = rooferContent.match(/serviceAreas:\s*\{[^}]*regions:\s*\[[^\]]+\]/);
      
      // Skip detailed roofers
      if (rooferSlug !== '1-roof-llc' && rooferSlug !== '360-degreez-consulting-llc') {
        const serviceArea = getServiceAreaFromCity(rooferCity);
        let needsUpdate = false;
        let newLines = [...rooferLines];
        
        // Add aboutText if missing
        if (!hasAboutText) {
          const aboutText = generateAboutText({ name: rooferName, city: rooferCity, state: rooferState });
          // Find where to insert (before serviceAreas or isHidden)
          for (let j = 0; j < newLines.length; j++) {
            if (newLines[j].includes('serviceAreas:') || newLines[j].includes('isHidden:')) {
              newLines.splice(j, 0, `    aboutText: \`${aboutText}\`,`);
              needsUpdate = true;
              break;
            }
          }
        }
        
        // Add specialties if missing
        if (!hasSpecialties) {
          const specialtiesStr = `    specialties: [\n      ${defaultSpecialties.map(s => `'${s}'`).join(',\n      ')},\n    ],`;
          for (let j = 0; j < newLines.length; j++) {
            if (newLines[j].includes('aboutText:') || newLines[j].includes('serviceAreas:') || newLines[j].includes('isHidden:')) {
              newLines.splice(j, 0, specialtiesStr);
              needsUpdate = true;
              break;
            }
          }
        }
        
        // Update serviceAreas if empty
        if (!hasNonEmptyServiceAreas && serviceArea) {
          const regions = [serviceArea.region];
          const counties = [serviceArea.county];
          const cities = rooferCity ? [createSlug(rooferCity)] : [];
          
          for (let j = 0; j < newLines.length; j++) {
            if (newLines[j].includes('serviceAreas:')) {
              // Replace the serviceAreas block
              let endIdx = j;
              let braceCount = 0;
              let foundStart = false;
              for (let k = j; k < newLines.length; k++) {
                if (newLines[k].includes('{')) {
                  braceCount++;
                  foundStart = true;
                }
                if (newLines[k].includes('}')) braceCount--;
                if (foundStart && braceCount === 0) {
                  endIdx = k;
                  break;
                }
              }
              newLines.splice(j, endIdx - j + 1, 
                `    serviceAreas: {`,
                `      regions: [${regions.map(r => `'${r}'`).join(', ')}],`,
                `      counties: [${counties.map(c => `'${c}'`).join(', ')}],`,
                `      cities: [${cities.map(c => `'${c}'`).join(', ')}],`,
                `    },`
              );
              needsUpdate = true;
              break;
            }
          }
        }
        
        if (needsUpdate) {
          // Replace the lines
          lines.splice(rooferStartLine, rooferLines.length, ...newLines);
          i = rooferStartLine + newLines.length - 1;
          enrichedCount++;
        }
      }
    }
    
    // Start new roofer
    rooferSlug = rooferStartMatch[1];
    rooferName = '';
    rooferCity = '';
    rooferState = 'FL';
    rooferStartLine = i;
    rooferLines = [line];
    inRoofer = true;
    continue;
  }
  
  if (inRoofer) {
    rooferLines.push(line);
    
    // Extract name
    const nameMatch = line.match(/name:\s*'([^']+)'/);
    if (nameMatch) rooferName = nameMatch[1];
    
    // Extract city
    const cityMatch = line.match(/city:\s*'([^']+)'/);
    if (cityMatch) rooferCity = cityMatch[1];
    
    // Extract state
    const stateMatch = line.match(/state:\s*'([^']+)'/);
    if (stateMatch) rooferState = stateMatch[1];
    
    // Detect end of roofer entry
    if (line.includes('} as any,')) {
      inRoofer = false;
    }
  }
}

// Write back
fs.writeFileSync(tsPath, lines.join('\n'), 'utf8');

console.log(`✅ Successfully enriched ${enrichedCount} roofers!`);
console.log(`   - Added aboutText, specialties, and serviceAreas where missing`);


