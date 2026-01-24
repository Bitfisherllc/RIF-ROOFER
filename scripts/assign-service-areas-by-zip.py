#!/usr/bin/env python3
"""
Enhanced script to assign service areas to all roofers based on city and ZIP code.
Uses both city mapping and ZIP code lookup for comprehensive coverage.
"""

import re
import sys
from pathlib import Path

ROOFER_DATA_FILE = Path(__file__).parent.parent / 'app' / 'roofers' / 'data' / 'roofers.ts'
SEARCH_DATA_FILE = Path(__file__).parent.parent / 'app' / 'service-areas' / 'data' / 'search-data.ts'

# ZIP code to county/region mapping (first 3 digits of ZIP)
ZIP_TO_COUNTY = {
    # Sun Coast (Hillsborough, Pinellas, Pasco, Hernando)
    '336': ('hillsborough', 'sun-coast'),  # Tampa area
    '337': ('pinellas', 'sun-coast'),  # St. Pete, Clearwater, Pinellas Park
    '346': ('pasco', 'sun-coast'),  # New Port Richey, Zephyrhills
    '3460': ('hernando', 'sun-coast'),  # Brooksville
    
    # Central Florida (Orange, Seminole, Osceola, Polk, Lake)
    '327': ('orange', 'central-florida'),  # Orlando, Winter Park, Apopka
    '328': ('orange', 'central-florida'),  # Orlando
    '3271': ('seminole', 'central-florida'),  # Sanford
    '3467': ('osceola', 'central-florida'),  # Kissimmee
    '338': ('polk', 'central-florida'),  # Lakeland, Winter Haven
    '347': ('lake', 'central-florida'),  # Clermont, Tavares
    
    # South Florida (Miami-Dade, Broward, Palm Beach)
    '331': ('miami-dade', 'south-florida'),  # Miami
    '330': ('broward', 'south-florida'),  # Fort Lauderdale, Hollywood
    '333': ('broward', 'south-florida'),  # Fort Lauderdale area
    '334': ('palm-beach-south', 'south-florida'),  # West Palm Beach, Boynton Beach
    '349': ('palm-beach-south', 'south-florida'),  # Port St. Lucie area
    
    # Southwest Florida (Sarasota, Charlotte, Lee, Collier)
    '342': ('sarasota', 'southwest-florida'),  # Sarasota, Venice
    '339': ('charlotte', 'southwest-florida'),  # Rotonda West, Punta Gorda
    '341': ('collier', 'southwest-florida'),  # Naples, Marco Island
    
    # First Coast / North Florida (Duval, St. Johns, Clay, Nassau)
    '322': ('duval-fc', 'first-coast'),  # Jacksonville
    '320': ('st-johns-fc', 'first-coast'),  # St. Augustine, Ponte Vedra
    '3208': ('st-johns-fc', 'first-coast'),  # Ponte Vedra
    '3203': ('clay-fc', 'first-coast'),  # Orange Park
    
    # North Florida (Alachua, etc.)
    '326': ('alachua', 'north-florida'),  # Gainesville
    
    # Panhandle
    '324': ('bay', 'florida-panhandle'),  # Panama City Beach
    '325': ('escambia', 'florida-panhandle'),  # Pensacola
}

def normalize_city_name(city):
    if not city:
        return ''
    return city.lower().strip().replace('.', '').replace(' ', '-').replace('saint', 'st').replace('st.', 'st').replace('ft.', 'fort')

def load_search_data_mapping():
    mapping = {}
    
    try:
        with open(SEARCH_DATA_FILE, 'r', encoding='utf-8') as f:
            content = f.read()
        
        city_pattern = r"name: '([^']+)', slug: '([^']+)', path: cityPath\('([^']+)', '([^']+)'"
        
        for match in re.finditer(city_pattern, content):
            city_name = match.group(1)
            city_slug = match.group(2)
            region_slug = match.group(3)
            county_slug = match.group(4)
            
            normalized = normalize_city_name(city_name)
            mapping[normalized] = {
                'city_slug': city_slug,
                'county_slug': county_slug,
                'region_slug': region_slug,
                'original_name': city_name
            }
            mapping[city_slug.lower()] = mapping[normalized]
            mapping[city_name.lower()] = mapping[normalized]
            
    except Exception as e:
        print(f"Error loading search data: {e}")
        
    # Add fallback mappings
    fallbacks = {
        'rotonda-west': {'city_slug': 'rotonda-west', 'county_slug': 'charlotte', 'region_slug': 'southwest-florida', 'original_name': 'Rotonda West'},
        'panama-city-beach': {'city_slug': 'panama-city-beach', 'county_slug': 'bay', 'region_slug': 'florida-panhandle', 'original_name': 'Panama City Beach'},
        'boynton-beach': {'city_slug': 'boynton-beach', 'county_slug': 'palm-beach-south', 'region_slug': 'south-florida', 'original_name': 'Boynton Beach'},
    }
    
    for key, value in fallbacks.items():
        normalized_key = normalize_city_name(key)
        if normalized_key not in mapping:
            mapping[normalized_key] = value
            mapping[key.lower()] = value
    
    return mapping

def find_service_areas_by_zip(zip_code):
    """Find service areas using ZIP code"""
    if not zip_code:
        return None
    
    zip_str = str(zip_code).strip()
    
    # Try 4-digit prefix first (for specific areas)
    if len(zip_str) >= 4:
        prefix_4 = zip_str[:4]
        if prefix_4 in ZIP_TO_COUNTY:
            county_slug, region_slug = ZIP_TO_COUNTY[prefix_4]
            return {
                'county_slug': county_slug,
                'region_slug': region_slug,
                'city_slug': None  # We don't know the city from ZIP alone
            }
    
    # Try 3-digit prefix
    if len(zip_str) >= 3:
        prefix_3 = zip_str[:3]
        if prefix_3 in ZIP_TO_COUNTY:
            county_slug, region_slug = ZIP_TO_COUNTY[prefix_3]
            return {
                'county_slug': county_slug,
                'region_slug': region_slug,
                'city_slug': None
            }
    
    return None

def find_service_areas_for_city(city_name, city_mapping):
    """Find service areas for a city name"""
    if not city_name:
        return None
        
    normalized = normalize_city_name(city_name)
    
    # Direct match
    if normalized in city_mapping:
        return city_mapping[normalized]
    
    # Partial match
    for key, value in city_mapping.items():
        if normalized in key or key in normalized:
            return value
    
    # Try matching against original names
    for key, value in city_mapping.items():
        if city_name.lower() in value.get('original_name', '').lower() or value.get('original_name', '').lower() in city_name.lower():
            return value
    
    return None

def extract_roofer_data(content):
    roofers = []
    pattern = r"'([^']+)':\s*\{(.+?)\}(?=\s*,\s*'|\s*$)"
    
    for match in re.finditer(pattern, content, re.DOTALL):
        slug = match.group(1)
        roofer_content = match.group(2)
        
        roofer = {'slug': slug}
        
        city_match = re.search(r"city:\s*['\"]([^'\"]+)['\"]", roofer_content)
        if city_match:
            roofer['city'] = city_match.group(1)
        
        zip_match = re.search(r"zipCode:\s*['\"]?(\d+)['\"]?", roofer_content)
        if zip_match:
            roofer['zipCode'] = zip_match.group(1)
        
        # Extract existing service areas
        service_areas_match = re.search(r"serviceAreas:\s*\{(.+?)\}", roofer_content, re.DOTALL)
        if service_areas_match:
            sa_content = service_areas_match.group(1)
            regions_match = re.search(r"regions:\s*\[([^\]]*)\]", sa_content)
            counties_match = re.search(r"counties:\s*\[([^\]]*)\]", sa_content)
            cities_match = re.search(r"cities:\s*\[([^\]]*)\]", sa_content)
            
            roofer['existing_regions'] = [r.strip().strip("'\"") for r in (regions_match.group(1).split(',') if regions_match and regions_match.group(1).strip() else [])]
            roofer['existing_counties'] = [c.strip().strip("'\"") for c in (counties_match.group(1).split(',') if counties_match and counties_match.group(1).strip() else [])]
            roofer['existing_cities'] = [c.strip().strip("'\"") for c in (cities_match.group(1).split(',') if cities_match and cities_match.group(1).strip() else [])]
        else:
            roofer['existing_regions'] = []
            roofer['existing_counties'] = []
            roofer['existing_cities'] = []
        
        if 'city' in roofer:
            roofers.append(roofer)
    
    return roofers

def update_service_areas_in_file(content, updates):
    updated_content = content
    
    for slug, service_areas in updates.items():
        regions_str = "['" + "', '".join(service_areas['regions']) + "']" if service_areas['regions'] else "[]"
        counties_str = "['" + "', '".join(service_areas['counties']) + "']" if service_areas['counties'] else "[]"
        cities_str = "['" + "', '".join(service_areas['cities']) + "']" if service_areas['cities'] else "[]"
        
        new_service_areas = f"""serviceAreas: {{
      regions: {regions_str},
      counties: {counties_str},
      cities: {cities_str}
    }}"""
        
        # Find and replace - look for the roofer entry and its serviceAreas
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
    
    print("\nProcessing roofers...")
    for roofer in roofers:
        slug = roofer['slug']
        city = roofer.get('city', '')
        zip_code = roofer.get('zipCode', '')
        
        existing_regions = roofer.get('existing_regions', [])
        existing_counties = roofer.get('existing_counties', [])
        existing_cities = roofer.get('existing_cities', [])
        
        has_complete_service_areas = existing_regions and existing_counties
        
        # Try to find service areas by city first
        service_areas = find_service_areas_for_city(city, city_mapping)
        
        # If not found, try ZIP code
        if not service_areas and zip_code:
            service_areas = find_service_areas_by_zip(zip_code)
        
        if service_areas:
            # Build updated service areas
            new_regions = list(set(existing_regions + [service_areas['region_slug']]))
            new_counties = list(set(existing_counties + [service_areas['county_slug']]))
            new_cities = existing_cities[:]  # Keep existing cities
            if service_areas.get('city_slug') and service_areas['city_slug'] not in new_cities:
                new_cities.append(service_areas['city_slug'])
            
            # Check if we need to update (missing regions/counties)
            missing_regions = not existing_regions or service_areas['region_slug'] not in existing_regions
            missing_counties = not existing_counties or service_areas['county_slug'] not in existing_counties
            
            if missing_regions or missing_counties:
                updates[slug] = {
                    'regions': new_regions,
                    'counties': new_counties,
                    'cities': new_cities
                }
                updated_count += 1
                if not has_complete_service_areas:
                    missing_areas_count += 1
                    source = f"via ZIP {zip_code}" if not service_areas.get('city_slug') else f"via city {city}"
                    print(f"  ✅ Assigning service areas to: {slug} ({city}) - {source}")
        else:
            if not existing_regions and not existing_counties:
                unmapped_cities.add((city, zip_code))
                print(f"  ⚠️  Could not find service areas for: {slug} ({city}, ZIP: {zip_code})")
    
    if updates:
        print(f"\nUpdating {updated_count} roofers ({missing_areas_count} were missing service areas)...")
        
        # Backup
        backup_file = ROOFER_DATA_FILE.with_suffix('.ts.backup')
        print(f"Creating backup: {backup_file}")
        with open(backup_file, 'w', encoding='utf-8') as f:
            f.write(content)
        
        # Update
        updated_content = update_service_areas_in_file(content, updates)
        print(f"Writing updates to {ROOFER_DATA_FILE}...")
        with open(ROOFER_DATA_FILE, 'w', encoding='utf-8') as f:
            f.write(updated_content)
        
        print(f"\n✅ Successfully updated {updated_count} roofers!")
        print(f"   - {missing_areas_count} roofers that were missing service areas now have them")
        
        if unmapped_cities:
            print(f"\n⚠️  Warning: {len(unmapped_cities)} cities could not be mapped:")
            for city, zip_code in sorted(unmapped_cities)[:20]:
                print(f"   - {city} (ZIP: {zip_code})")
            if len(unmapped_cities) > 20:
                print(f"   ... and {len(unmapped_cities) - 20} more")
    else:
        print("\n✅ All roofers already have complete service areas assigned.")

if __name__ == '__main__':
    main()

