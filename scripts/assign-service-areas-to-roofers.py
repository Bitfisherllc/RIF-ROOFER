#!/usr/bin/env python3
"""
Script to assign service areas (city, county, region) to all roofers based on their address.
This reads the roofer data file and assigns service areas for roofers missing them.
"""

import re
import json
import sys
from pathlib import Path

# Path to roofer data file
ROOFER_DATA_FILE = Path(__file__).parent.parent / 'app' / 'roofers' / 'data' / 'roofers.ts'
SEARCH_DATA_FILE = Path(__file__).parent.parent / 'app' / 'service-areas' / 'data' / 'search-data.ts'

def normalize_city_name(city):
    """Normalize city name for matching"""
    if not city:
        return ''
    return city.lower().strip().replace('.', '').replace(' ', '-').replace('saint', 'st').replace('st.', 'st')

def create_slug(name):
    """Create slug from name"""
    return name.lower().replace(' ', '-').replace('.', '').replace("'", '').replace('&', 'and')

# Load search data mapping from TypeScript file
def load_search_data_mapping():
    """Load city to service area mapping from search-data.ts"""
    mapping = {}
    
    try:
        with open(SEARCH_DATA_FILE, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Extract all city entries - extract from cityPath function call
        # Format: name: 'Tampa', slug: 'tampa', path: cityPath('sun-coast', 'hillsborough', 'Tampa')
        city_pattern = r"name: '([^']+)', slug: '([^']+)', path: cityPath\('([^']+)', '([^']+)'"
        
        for match in re.finditer(city_pattern, content):
            city_name = match.group(1)
            city_slug = match.group(2)
            region_slug = match.group(3)
            county_slug = match.group(4)
            
            if county_slug and region_slug:
                normalized = normalize_city_name(city_name)
                mapping[normalized] = {
                    'city_slug': city_slug,
                    'county_slug': county_slug,
                    'region_slug': region_slug,
                    'original_name': city_name
                }
                
                # Also map by city slug
                mapping[city_slug.lower()] = mapping[normalized]
                
                # Also map by original name variations
                name_lower = city_name.lower()
                mapping[name_lower] = mapping[normalized]
                
                # Handle common variations (St. vs Saint, etc.)
                name_variations = [
                    name_lower.replace('st.', 'st').replace('saint', 'st'),
                    name_lower.replace('ft.', 'fort').replace('ft', 'fort'),
                ]
                for variation in name_variations:
                    if variation != name_lower:
                        mapping[variation] = mapping[normalized]
        
        # Add fallback mappings for cities not in search-data but we know the county/region
        fallback_mappings = {
            'rotonda-west': {'city_slug': 'rotonda-west', 'county_slug': 'charlotte', 'region_slug': 'southwest-florida', 'original_name': 'Rotonda West'},
            'rotonda west': {'city_slug': 'rotonda-west', 'county_slug': 'charlotte', 'region_slug': 'southwest-florida', 'original_name': 'Rotonda West'},
            'panama-city-beach': {'city_slug': 'panama-city-beach', 'county_slug': 'bay', 'region_slug': 'florida-panhandle', 'original_name': 'Panama City Beach'},
            'panama city beach': {'city_slug': 'panama-city-beach', 'county_slug': 'bay', 'region_slug': 'florida-panhandle', 'original_name': 'Panama City Beach'},
            'boynton-beach': {'city_slug': 'boynton-beach', 'county_slug': 'palm-beach-south', 'region_slug': 'south-florida', 'original_name': 'Boynton Beach'},
            'boynton beach': {'city_slug': 'boynton-beach', 'county_slug': 'palm-beach-south', 'region_slug': 'south-florida', 'original_name': 'Boynton Beach'},
        }
        
        for key, value in fallback_mappings.items():
            normalized_key = normalize_city_name(key)
            if normalized_key not in mapping:
                mapping[normalized_key] = value
                mapping[key.lower()] = value
                
    except Exception as e:
        print(f"Error loading search data: {e}")
        
    return mapping

def find_service_areas_for_city(city_name, city_mapping):
    """Find service areas for a city name"""
    if not city_name:
        return None
        
    normalized = normalize_city_name(city_name)
    
    # Direct match
    if normalized in city_mapping:
        return city_mapping[normalized]
    
    # Partial match - check if any mapping key contains our city or vice versa
    for key, value in city_mapping.items():
        if normalized in key or key in normalized:
            return value
    
    # Try matching against original names too
    for key, value in city_mapping.items():
        if city_name.lower() in value['original_name'].lower() or value['original_name'].lower() in city_name.lower():
            return value
    
    return None

def extract_roofer_data(content):
    """Extract roofer data from TypeScript file"""
    roofers = []
    
    # Pattern to match each roofer entry
    # We'll extract the slug and then parse the object
    pattern = r"'([^']+)':\s*\{(.+?)\}(?=\s*,\s*'|\s*$)"
    
    for match in re.finditer(pattern, content, re.DOTALL):
        slug = match.group(1)
        roofer_content = match.group(2)
        
        roofer = {'slug': slug}
        
        # Extract city
        city_match = re.search(r"city:\s*['\"]([^'\"]+)['\"]", roofer_content)
        if city_match:
            roofer['city'] = city_match.group(1)
        
        # Extract zipCode
        zip_match = re.search(r"zipCode:\s*['\"]?(\d+)['\"]?", roofer_content)
        if zip_match:
            roofer['zipCode'] = zip_match.group(1)
        
        # Extract existing service areas
        service_areas_match = re.search(r"serviceAreas:\s*\{(.+?)\}", roofer_content, re.DOTALL)
        if service_areas_match:
            sa_content = service_areas_match.group(1)
            # Match arrays - can be empty [] or have content
            regions_match = re.search(r"regions:\s*\[([^\]]*)\]", sa_content)
            counties_match = re.search(r"counties:\s*\[([^\]]*)\]", sa_content)
            cities_match = re.search(r"cities:\s*\[([^\]]*)\]", sa_content)
            
            roofer['existing_regions'] = [r.strip().strip("'\"") for r in (regions_match.group(1).split(',') if regions_match and regions_match.group(1).strip() else [])]
            roofer['existing_counties'] = [c.strip().strip("'\"") for c in (counties_match.group(1).split(',') if counties_match and counties_match.group(1).strip() else [])]
            roofer['existing_cities'] = [c.strip().strip("'\"") for c in (cities_match.group(1).split(',') if cities_match and cities_match.group(1).strip() else [])]
        else:
            # No serviceAreas field found
            roofer['existing_regions'] = []
            roofer['existing_counties'] = []
            roofer['existing_cities'] = []
        
        # Only process if we have a city
        if 'city' in roofer:
            roofers.append(roofer)
    
    return roofers

def update_service_areas_in_file(content, updates):
    """Update service areas in the TypeScript file"""
    updated_content = content
    
    for slug, service_areas in updates.items():
        # Build the new serviceAreas string
        regions_str = "['" + "', '".join(service_areas['regions']) + "']" if service_areas['regions'] else "[]"
        counties_str = "['" + "', '".join(service_areas['counties']) + "']" if service_areas['counties'] else "[]"
        cities_str = "['" + "', '".join(service_areas['cities']) + "']" if service_areas['cities'] else "[]"
        
        new_service_areas = f"""serviceAreas: {{
      regions: {regions_str},
      counties: {counties_str},
      cities: {cities_str}
    }}"""
        
        # Find and replace the serviceAreas section for this roofer
        pattern = rf"('{re.escape(slug)}':\s*\{{.+?)(serviceAreas:\s*\{{.+?}})(.+?)(?=\s*,\s*'|\s*$)"
        
        def replace_match(m):
            before = m.group(1)
            after = m.group(3)
            return before + new_service_areas + after
        
        updated_content = re.sub(pattern, replace_match, updated_content, flags=re.DOTALL)
    
    return updated_content

def main():
    print("Loading service area mapping...")
    city_mapping = load_search_data_mapping()
    print(f"Loaded {len(city_mapping)} city mappings")
    
    print(f"\nReading roofer data from {ROOFER_DATA_FILE}...")
    with open(ROOFER_DATA_FILE, 'r', encoding='utf-8') as f:
        content = f.read()
    
    print("Extracting roofer information...")
    roofers = extract_roofer_data(content)
    print(f"Found {len(roofers)} roofers with city information")
    
    updates = {}
    updated_count = 0
    missing_areas_count = 0
    unmapped_cities = set()
    incomplete_areas_count = 0
    
    print("\nProcessing roofers...")
    for roofer in roofers:
        slug = roofer['slug']
        city = roofer.get('city', '')
        
        # Check if roofer already has complete service areas
        existing_regions = roofer.get('existing_regions', [])
        existing_counties = roofer.get('existing_counties', [])
        existing_cities = roofer.get('existing_cities', [])
        
        has_service_areas = existing_regions or existing_counties or existing_cities
        has_complete_service_areas = existing_regions and existing_counties
        
        # Find service areas for this city
        service_areas = find_service_areas_for_city(city, city_mapping)
        
        if service_areas:
            # Build updated service areas - always populate regions and counties if we found a match
            new_regions = list(set(existing_regions + [service_areas['region_slug']]))
            new_counties = list(set(existing_counties + [service_areas['county_slug']]))
            new_cities = list(set(existing_cities + [service_areas['city_slug']]))
            
            # Check if we need to update (missing regions/counties or adding new information)
            missing_regions = not existing_regions or service_areas['region_slug'] not in existing_regions
            missing_counties = not existing_counties or service_areas['county_slug'] not in existing_counties
            missing_city = service_areas['city_slug'] not in existing_cities
            
            needs_update = missing_regions or missing_counties or missing_city
            
            if needs_update:
                updates[slug] = {
                    'regions': new_regions,
                    'counties': new_counties,
                    'cities': new_cities
                }
                updated_count += 1
                if not has_complete_service_areas:
                    missing_areas_count += 1
                    if not has_service_areas:
                        print(f"  ✅ Assigning service areas to: {slug} ({city})")
                    else:
                        print(f"  ✅ Completing service areas for: {slug} ({city}) - adding region/county")
        else:
            if not has_service_areas:
                unmapped_cities.add(city)
                print(f"  ⚠️  Could not find service areas for: {slug} ({city})")
    
    if updates:
        print(f"\nUpdating {updated_count} roofers ({missing_areas_count} were missing service areas)...")
        updated_content = update_service_areas_in_file(content, updates)
        
        # Backup original file
        backup_file = ROOFER_DATA_FILE.with_suffix('.ts.backup')
        print(f"Creating backup: {backup_file}")
        with open(backup_file, 'w', encoding='utf-8') as f:
            f.write(content)
        
        # Write updated content
        print(f"Writing updates to {ROOFER_DATA_FILE}...")
        with open(ROOFER_DATA_FILE, 'w', encoding='utf-8') as f:
            f.write(updated_content)
        
        print(f"\n✅ Successfully updated {updated_count} roofers!")
        print(f"   - {missing_areas_count} roofers that were missing service areas now have them")
        print(f"   - {updated_count - missing_areas_count} roofers had their service areas enhanced")
        
        if unmapped_cities:
            print(f"\n⚠️  Warning: {len(unmapped_cities)} cities could not be mapped:")
            for city in sorted(unmapped_cities):
                print(f"   - {city}")
    else:
        print("\n✅ All roofers already have service areas assigned or no matches found.")

if __name__ == '__main__':
    main()

