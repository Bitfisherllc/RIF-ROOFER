#!/usr/bin/env python3
"""
Prepare roofer data for bulk Google Business Profile search using Outscraper or Apify.
This script creates CSV/JSON files ready for bulk processing.
"""

import re
import json
import csv
from pathlib import Path
from typing import Dict, List

def extract_all_roofers(file_path: Path) -> List[Dict]:
    """Extract all roofer data from TypeScript file."""
    content = file_path.read_text()
    roofers = []
    
    # Pattern to match roofer entries
    pattern = r"'([^']+)':\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}"
    matches = re.finditer(pattern, content, re.DOTALL)
    
    for match in matches:
        slug = match.group(1)
        roofer_obj = match.group(2)
        
        # Extract key fields
        id_match = re.search(r'"id":\s*"([^"]+)"', roofer_obj)
        name_match = re.search(r'"name":\s*"([^"]+)"', roofer_obj)
        phone_match = re.search(r'"phone":\s*"([^"]+)"', roofer_obj)
        website_match = re.search(r'"websiteUrl":\s*"([^"]+)"', roofer_obj)
        google_match = re.search(r'"googleBusinessUrl":\s*"([^"]+)"', roofer_obj)
        city_match = re.search(r'"city":\s*"([^"]+)"', roofer_obj)
        state_match = re.search(r'"state":\s*"([^"]+)"', roofer_obj)
        address_match = re.search(r'"address":\s*"([^"]+)"', roofer_obj)
        
        if id_match and name_match:
            roofers.append({
                'id': id_match.group(1),
                'slug': slug,
                'name': name_match.group(1),
                'phone': phone_match.group(1) if phone_match else '',
                'website': website_match.group(1) if website_match else '',
                'googleBusinessUrl': google_match.group(1) if google_match else '',
                'city': city_match.group(1) if city_match else '',
                'state': state_match.group(1) if state_match else '',
                'address': address_match.group(1) if address_match else '',
            })
    
    return roofers

def create_outscraper_csv(roofers: List[Dict], output_file: Path):
    """Create CSV file for Outscraper Google Maps Search."""
    # Filter to only roofers without Google URLs
    roofers_needing_urls = [r for r in roofers if not r.get('googleBusinessUrl')]
    
    with open(output_file, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        # Outscraper format: query, location (optional)
        writer.writerow(['query', 'location'])
        
        for roofer in roofers_needing_urls:
            # Build search query
            query_parts = [roofer['name']]
            if roofer.get('city'):
                query_parts.append(roofer['city'])
            if roofer.get('state'):
                query_parts.append(roofer['state'])
            if roofer.get('phone'):
                query_parts.append(roofer['phone'])
            query = ' '.join(query_parts)
            
            location = 'Florida, USA'
            if roofer.get('city'):
                location = f"{roofer['city']}, Florida, USA"
            
            writer.writerow([query, location])
    
    print(f"✅ Created Outscraper CSV: {output_file}")
    print(f"   Contains {len(roofers_needing_urls)} roofers needing Google Business URLs")

def create_apify_json(roofers: List[Dict], output_file: Path):
    """Create JSON file for Apify Google Maps Scraper."""
    # Filter to only roofers without Google URLs
    roofers_needing_urls = [r for r in roofers if not r.get('googleBusinessUrl')]
    
    # Apify format: array of search objects
    search_data = []
    for roofer in roofers_needing_urls:
        search_obj = {
            'query': roofer['name'],
            'slug': roofer['slug'],
            'id': roofer['id'],
        }
        
        if roofer.get('city'):
            search_obj['city'] = roofer['city']
        if roofer.get('state'):
            search_obj['state'] = roofer['state']
        if roofer.get('phone'):
            search_obj['phone'] = roofer['phone']
        if roofer.get('address'):
            search_obj['address'] = roofer['address']
        
        search_data.append(search_obj)
    
    output_file.write_text(json.dumps(search_data, indent=2))
    print(f"✅ Created Apify JSON: {output_file}")
    print(f"   Contains {len(roofers_needing_urls)} roofers needing Google Business URLs")

def create_manual_csv(roofers: List[Dict], output_file: Path):
    """Create a comprehensive CSV for manual processing or any service."""
    # Filter to only roofers without Google URLs
    roofers_needing_urls = [r for r in roofers if not r.get('googleBusinessUrl')]
    
    with open(output_file, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow([
            'id', 'slug', 'name', 'phone', 'website', 'address', 'city', 'state',
            'search_query', 'google_business_url'
        ])
        
        for roofer in roofers_needing_urls:
            # Build search query
            query_parts = [roofer['name']]
            if roofer.get('city'):
                query_parts.append(roofer['city'])
            if roofer.get('state'):
                query_parts.append(roofer['state'])
            if roofer.get('phone'):
                query_parts.append(roofer['phone'])
            query = ' '.join(query_parts)
            
            writer.writerow([
                roofer['id'],
                roofer['slug'],
                roofer['name'],
                roofer.get('phone', ''),
                roofer.get('website', ''),
                roofer.get('address', ''),
                roofer.get('city', ''),
                roofer.get('state', ''),
                query,
                ''  # Empty column for Google Business URL
            ])
    
    print(f"✅ Created manual CSV: {output_file}")
    print(f"   Contains {len(roofers_needing_urls)} roofers needing Google Business URLs")

def main():
    """Main function."""
    print("📦 Preparing roofer data for bulk Google Business Profile search...\n")
    
    roofers_file = Path('app/roofers/data/roofers.ts')
    
    if not roofers_file.exists():
        print(f"❌ Error: {roofers_file} not found")
        return
    
    print(f"📖 Reading roofer data...")
    roofers = extract_all_roofers(roofers_file)
    print(f"   Found {len(roofers)} total roofers\n")
    
    # Count roofers with/without URLs
    with_url = [r for r in roofers if r.get('googleBusinessUrl')]
    without_url = [r for r in roofers if not r.get('googleBusinessUrl')]
    
    print(f"✅ Roofers with Google URL: {len(with_url)}")
    print(f"❌ Roofers needing Google URL: {len(without_url)}\n")
    
    # Create output directory
    output_dir = Path('data/roofers/bulk-search')
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # Create files for different services
    print("📝 Creating bulk search files...\n")
    
    create_outscraper_csv(roofers, output_dir / 'outscraper-input.csv')
    create_apify_json(roofers, output_dir / 'apify-input.json')
    create_manual_csv(roofers, output_dir / 'manual-input.csv')
    
    print("\n✅ Done!")
    print(f"\n📋 Files created in: {output_dir}")
    print(f"\n💡 Next steps:")
    print(f"   1. Choose a service: Outscraper or Apify")
    print(f"   2. Upload the appropriate file to the service")
    print(f"   3. Run the search/scraper")
    print(f"   4. Download results")
    print(f"   5. Use scripts/process-bulk-results.py to update roofer data")

if __name__ == '__main__':
    main()

















