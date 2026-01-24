#!/usr/bin/env python3
"""
Import roofer JSON data into TypeScript format
Maps cities to counties/regions using existing city data
"""

import json
import re
from pathlib import Path

# Read the JSON data
json_file = Path(__file__).parent / "roofers-data.json"
output_file = Path(__file__).parent.parent.parent / "app/roofers/data/roofers.ts"

with open(json_file, 'r', encoding='utf-8') as f:
    roofers = json.load(f)

# Read city data to map cities to counties/regions
city_data_file = Path(__file__).parent.parent.parent / "app/service-areas/data/cities.ts"
city_mapping = {}

# Try to extract city data from the TypeScript file
if city_data_file.exists():
    with open(city_data_file, 'r', encoding='utf-8') as f:
        content = f.read()
        # This is a simple extraction - we'll do better mapping in the script
        pass

# Helper to create slug
def create_slug(name):
    return re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')

# Helper to normalize city name for matching
def normalize_city_name(city):
    # Remove common suffixes and normalize
    city = city.strip()
    city = re.sub(r'\s+', ' ', city)
    # Handle common variations
    city = city.replace('St.', 'St').replace('Saint', 'St')
    return city.lower()

# Helper to find county/region for a city
def find_service_areas(city_name, zip_code=None):
    """Find county and region for a city"""
    # We'll use a simple mapping based on known cities
    # This will be enhanced with actual city data lookup
    city_normalized = normalize_city_name(city_name)
    
    # Common city to county mappings (we'll expand this)
    city_to_county = {
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
    
    if city_normalized in city_to_county:
        county_slug, region_slug = city_to_county[city_normalized]
        return {
            'counties': [county_slug],
            'regions': [region_slug],
            'cities': []
        }
    
    # Default: return empty (will need manual mapping)
    return {
        'counties': [],
        'regions': [],
        'cities': []
    }

# Convert roofers to TypeScript format
ts_roofers = {}
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
    city = roofer.get('City', '').strip()
    zip_code = roofer.get('Zip Code', '')
    service_areas = find_service_areas(city, zip_code)
    
    # Format website URL
    website = roofer.get('website', '').strip()
    if website and not website.startswith('http'):
        website = f"https://{website}"
    
    # Format phone
    phone = roofer.get('Phone Number', '').strip()
    
    # Format email
    email = roofer.get('Email', '').strip()
    
    # Build roofer object
    roofer_obj = {
        'id': str(idx),
        'name': name,
        'slug': slug,
        'phone': phone if phone else None,
        'email': email if email else None,
        'websiteUrl': website if website else None,
        'licenseNumber': None,  # Not in Excel
        'logoUrl': None,  # Not in Excel
        'aboutText': None,  # Not in Excel
        'isPreferred': False,  # Default - can be updated later
        'isHidden': False,  # Default - can be updated later
        'sortOverride': None,
        'serviceAreas': service_areas,
        'address': roofer.get('Address', '').strip() or None,
        'city': city or None,
        'state': roofer.get('State', 'FL').strip(),
        'zipCode': str(zip_code) if zip_code else None,
        'yearsInBusiness': None,
        'specialties': []
    }
    
    # Remove None values for cleaner output
    roofer_obj = {k: v for k, v in roofer_obj.items() if v is not None}
    
    ts_roofers[slug] = roofer_obj

# Generate TypeScript file
ts_content = '''// Roofer data structure
// This file contains all roofer information imported from ROOFERS LIST FINAL.xlsx

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

# Add each roofer
for slug, roofer in sorted(ts_roofers.items(), key=lambda x: x[1]['name']):
    ts_content += f"  '{slug}': {json.dumps(roofer, indent=4, ensure_ascii=False)},\n"

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
print(f"\nNote: Service area mapping is basic. You may want to:")
print(f"  1. Review and update service areas for each roofer")
print(f"  2. Mark preferred roofers (set isPreferred: true)")
print(f"  3. Add license numbers, logos, and about text where available")

















