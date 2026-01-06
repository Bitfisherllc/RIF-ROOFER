#!/usr/bin/env python3
"""
Import roofer JSON data into TypeScript format
Maps cities to counties/regions using existing city data from cities.ts
"""

import json
import re
from pathlib import Path

# Read the JSON data
json_file = Path(__file__).parent / "roofers-data.json"
output_file = Path(__file__).parent.parent.parent / "app/roofers/data/roofers.ts"
cities_file = Path(__file__).parent.parent.parent / "app/service-areas/data/cities.ts"

with open(json_file, 'r', encoding='utf-8') as f:
    roofers = json.load(f)

# Build city mapping from cities.ts
city_to_location = {}

if cities_file.exists():
    with open(cities_file, 'r', encoding='utf-8') as f:
        content = f.read()
        
        # Extract city data using regex
        # Look for patterns like: 'city-name': { name: 'City Name', countySlug: 'county', regionSlug: 'region' }
        pattern = r"'([^']+)':\s*\{[^}]*name:\s*'([^']+)'[^}]*countySlug:\s*'([^']+)'[^}]*regionSlug:\s*'([^']+)'"
        matches = re.finditer(pattern, content, re.DOTALL)
        
        for match in matches:
            city_slug = match.group(1)
            city_name = match.group(2)
            county_slug = match.group(3)
            region_slug = match.group(4)
            
            # Normalize city name for matching
            city_normalized = city_name.lower().strip()
            city_to_location[city_normalized] = {
                'county': county_slug,
                'region': region_slug
            }
            
            # Also map by slug
            city_to_location[city_slug.lower()] = {
                'county': county_slug,
                'region': region_slug
            }

print(f"Loaded {len(city_to_location)} city mappings")

# Helper to create slug
def create_slug(name):
    return re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')

# Helper to safely get string value from dict (handles NaN)
def safe_str(value, default=''):
    if value is None:
        return default
    if isinstance(value, float):
        if str(value) == 'nan':
            return default
        return str(int(value)) if value == int(value) else str(value)
    return str(value).strip() if value else default

# Helper to normalize city name for matching
def normalize_city_name(city):
    if not city:
        return ''
    # Remove common suffixes and normalize
    city = str(city).strip()
    city = re.sub(r'\s+', ' ', city)
    # Handle common variations
    city = city.replace('St.', 'St').replace('Saint', 'St')
    city = city.replace('Ft.', 'Fort').replace('Ft ', 'Fort ')
    return city.lower()

# Helper to find county/region for a city
def find_service_areas(city_name):
    """Find county and region for a city using city mapping"""
    if not city_name:
        return {'counties': [], 'regions': [], 'cities': []}
    
    city_normalized = normalize_city_name(city_name)
    
    # Try exact match first
    if city_normalized in city_to_location:
        loc = city_to_location[city_normalized]
        return {
            'counties': [loc['county']],
            'regions': [loc['region']],
            'cities': []
        }
    
    # Try partial matches (for cases like "Ponte Vedra" vs "Ponte Vedra Beach")
    for mapped_city, loc in city_to_location.items():
        if city_normalized in mapped_city or mapped_city in city_normalized:
            return {
                'counties': [loc['county']],
                'regions': [loc['region']],
                'cities': []
            }
    
    # Fallback: common city mappings for cities not in our data yet
    fallback_mappings = {
        'tampa': ('hillsborough', 'sun-coast'),
        'st. petersburg': ('pinellas', 'sun-coast'),
        'st petersburg': ('pinellas', 'sun-coast'),
        'clearwater': ('pinellas', 'sun-coast'),
        'pinellas park': ('pinellas', 'sun-coast'),
        'orlando': ('orange', 'central-florida'),
        'miami': ('miami-dade', 'south-florida'),
        'fort lauderdale': ('broward', 'south-florida'),
        'jacksonville': ('duval', 'north-florida'),
        'gainesville': ('alachua', 'north-florida'),
        'tallahassee': ('leon', 'florida-panhandle'),
        'naples': ('collier', 'southwest-florida'),
        'sarasota': ('sarasota', 'southwest-florida'),
        'west palm beach': ('palm-beach-south', 'south-florida'),
        'ponte vedra': ('st-johns', 'first-coast'),
        'ponte vedra beach': ('st-johns', 'first-coast'),
        'winter park': ('orange', 'central-florida'),
        'boynton beach': ('palm-beach-south', 'south-florida'),
        'zephyrhills': ('pasco', 'sun-coast'),
        'deerfield beach': ('broward', 'south-florida'),
        'rotonda west': ('charlotte', 'southwest-florida'),
    }
    
    if city_normalized in fallback_mappings:
        county_slug, region_slug = fallback_mappings[city_normalized]
        return {
            'counties': [county_slug],
            'regions': [region_slug],
            'cities': []
        }
    
    # No match found
    return {'counties': [], 'regions': [], 'cities': []}

# Convert roofers to TypeScript format
ts_roofers = {}
unmapped_cities = set()

for idx, roofer in enumerate(roofers, 1):
    name = roofer.get('Name', '').strip()
    if not name:
        continue
    
    slug = create_slug(name)
    
    # Ensure unique slug
    original_slug = slug
    counter = 1
    while slug in ts_roofers:
        slug = f"{original_slug}-{counter}"
        counter += 1
    
    # Get service areas based on city
    city = safe_str(roofer.get('City', ''))
    service_areas = find_service_areas(city)
    
    if not service_areas['counties'] and city:
        unmapped_cities.add(city)
    
    # Format website URL
    website = safe_str(roofer.get('website', ''))
    if website:
        website = website.replace('http://', '').replace('https://', '')
        if website:
            website = f"https://{website}"
    else:
        website = ''
    
    # Format phone
    phone = safe_str(roofer.get('Phone Number', ''))
    
    # Format email
    email = safe_str(roofer.get('Email', ''))
    
    # Build roofer object
    roofer_obj = {
        'id': str(idx),
        'name': name,
        'slug': slug,
        'isPreferred': False,
        'isHidden': False,
    }
    
    # Add optional fields only if they have values
    if phone:
        roofer_obj['phone'] = phone
    if email:
        roofer_obj['email'] = email
    if website:
        roofer_obj['websiteUrl'] = website
    if service_areas['counties'] or service_areas['regions']:
        roofer_obj['serviceAreas'] = service_areas
    else:
        roofer_obj['serviceAreas'] = {'counties': [], 'regions': [], 'cities': []}
    
    address = safe_str(roofer.get('Address', ''))
    if address:
        roofer_obj['address'] = address
    
    if city:
        roofer_obj['city'] = city
    
    state = safe_str(roofer.get('State', 'FL'))
    if state:
        roofer_obj['state'] = state
    
    zip_code = roofer.get('Zip Code', '')
    if zip_code and not (isinstance(zip_code, float) and str(zip_code) == 'nan'):
        roofer_obj['zipCode'] = str(int(zip_code)) if isinstance(zip_code, float) and zip_code == int(zip_code) else str(zip_code)
    
    ts_roofers[slug] = roofer_obj

# Generate TypeScript file
ts_content = '''// Roofer data structure
// This file contains all roofer information imported from ROOFERS LIST FINAL.xlsx
// Total roofers: ''' + str(len(ts_roofers)) + '''

export interface RooferData {
  id: string;
  name: string;
  slug: string;
  phone?: string;
  email?: string;
  websiteUrl?: string;
  licenseNumber?: string;
  logoUrl?: string;
  aboutText?: string;
  isPreferred: boolean;
  isHidden: boolean;
  sortOverride?: number;
  serviceAreas: {
    regions?: string[]; // region slugs
    counties?: string[]; // county slugs
    cities?: string[]; // city slugs
  };
  // Additional fields
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  yearsInBusiness?: number;
  specialties?: string[];
}

// Helper to create slug from name
export function createRooferSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Roofer data
export const rooferData: Record<string, RooferData> = {
'''

# Add each roofer (sorted by name for easier review)
for slug, roofer in sorted(ts_roofers.items(), key=lambda x: x[1]['name']):
    # Format as TypeScript object
    roofer_str = json.dumps(roofer, indent=4, ensure_ascii=False)
    # Fix boolean values (Python uses True/False, TS uses true/false)
    roofer_str = roofer_str.replace(': true', ': true').replace(': false', ': false')
    # Fix None to undefined (but we're not using None anymore)
    ts_content += f"  '{slug}': {roofer_str},\n"

ts_content += '''};

// Helper to get all roofers
export function getAllRoofers(): RooferData[] {
  return Object.values(rooferData).filter(roofer => !roofer.isHidden);
}

// Helper to get preferred roofers
export function getPreferredRoofers(): RooferData[] {
  return getAllRoofers()
    .filter(roofer => roofer.isPreferred)
    .sort((a, b) => {
      // Sort by sortOverride if available, then by name
      if (a.sortOverride !== undefined && b.sortOverride !== undefined) {
        return a.sortOverride - b.sortOverride;
      }
      if (a.sortOverride !== undefined) return -1;
      if (b.sortOverride !== undefined) return 1;
      return a.name.localeCompare(b.name);
    });
}

// Helper to get other (non-preferred) roofers
export function getOtherRoofers(): RooferData[] {
  return getAllRoofers()
    .filter(roofer => !roofer.isPreferred)
    .sort((a, b) => {
      if (a.sortOverride !== undefined && b.sortOverride !== undefined) {
        return a.sortOverride - b.sortOverride;
      }
      if (a.sortOverride !== undefined) return -1;
      if (b.sortOverride !== undefined) return 1;
      return a.name.localeCompare(b.name);
    });
}

// Helper to get roofer by slug
export function getRooferBySlug(slug: string): RooferData | null {
  return rooferData[slug] && !rooferData[slug].isHidden ? rooferData[slug] : null;
}

// Helper to get roofers by service area
export function getRoofersByServiceArea(
  regionSlug?: string,
  countySlug?: string,
  citySlug?: string
): RooferData[] {
  const allRoofers = getAllRoofers();
  
  return allRoofers.filter(roofer => {
    const { serviceAreas } = roofer;
    
    // If city is specified, check city first
    if (citySlug) {
      return serviceAreas.cities?.includes(citySlug) ||
             serviceAreas.counties?.some(county => {
               // If roofer serves the county, they serve all cities in it
               return county === countySlug;
             }) ||
             serviceAreas.regions?.some(region => {
               // If roofer serves the region, they serve all areas in it
               return region === regionSlug;
             });
    }
    
    // If county is specified
    if (countySlug) {
      return serviceAreas.counties?.includes(countySlug) ||
             serviceAreas.regions?.some(region => region === regionSlug);
    }
    
    // If region is specified
    if (regionSlug) {
      return serviceAreas.regions?.includes(regionSlug);
    }
    
    return false;
  }).sort((a, b) => {
    // Preferred first
    if (a.isPreferred && !b.isPreferred) return -1;
    if (!a.isPreferred && b.isPreferred) return 1;
    
    // Then by sortOverride
    if (a.sortOverride !== undefined && b.sortOverride !== undefined) {
      return a.sortOverride - b.sortOverride;
    }
    if (a.sortOverride !== undefined) return -1;
    if (b.sortOverride !== undefined) return 1;
    
    // Finally by name
    return a.name.localeCompare(b.name);
  });
}
'''

# Write the file
with open(output_file, 'w', encoding='utf-8') as f:
    f.write(ts_content)

print(f"✓ Imported {len(ts_roofers)} roofers to {output_file}")
print(f"\nUnmapped cities ({len(unmapped_cities)}):")
for city in sorted(unmapped_cities)[:20]:  # Show first 20
    print(f"  - {city}")
if len(unmapped_cities) > 20:
    print(f"  ... and {len(unmapped_cities) - 20} more")
print(f"\nNext steps:")
print(f"  1. Review the generated file: {output_file}")
print(f"  2. Mark preferred roofers (set isPreferred: true)")
print(f"  3. Add license numbers, logos, and about text where available")
print(f"  4. Update service areas for unmapped cities if needed")
















