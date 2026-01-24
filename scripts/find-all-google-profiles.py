#!/usr/bin/env python3
"""
Script to find Google Business Profiles for all roofers.
This script extracts all roofers and creates search queries for finding their Google Business Profiles.
"""

import re
import json
import time
from pathlib import Path
from typing import Dict, List
import urllib.parse

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
                'phone': phone_match.group(1) if phone_match else None,
                'website': website_match.group(1) if website_match else None,
                'googleBusinessUrl': google_match.group(1) if google_match else None,
                'city': city_match.group(1) if city_match else None,
                'state': state_match.group(1) if state_match else None,
                'address': address_match.group(1) if address_match else None,
            })
    
    return roofers

def build_search_query(roofer: Dict) -> str:
    """Build a search query for finding the business."""
    parts = [roofer['name']]
    if roofer.get('city'):
        parts.append(roofer['city'])
    if roofer.get('state'):
        parts.append(roofer['state'])
    if roofer.get('phone'):
        parts.append(roofer['phone'])
    parts.append('roofing')
    return ' '.join(parts)

def generate_google_maps_search_url(roofer: Dict) -> str:
    """Generate Google Maps search URL."""
    query = build_search_query(roofer)
    encoded = urllib.parse.quote(query)
    return f"https://www.google.com/maps/search/?api=1&query={encoded}"

def generate_google_search_url(roofer: Dict) -> str:
    """Generate Google search URL."""
    query = f"{roofer['name']} roofing"
    if roofer.get('phone'):
        query += f" {roofer['phone']}"
    if roofer.get('city'):
        query += f" {roofer['city']} Florida"
    encoded = urllib.parse.quote(query)
    return f"https://www.google.com/search?q={encoded}"

def main():
    """Main function."""
    print("🔍 Finding Google Business Profiles for all roofers...\n")
    
    roofers_file = Path('app/roofers/data/roofers.ts')
    output_file = Path('data/roofers/all-google-profiles-search.json')
    
    if not roofers_file.exists():
        print(f"❌ Error: {roofers_file} not found")
        return
    
    output_file.parent.mkdir(parents=True, exist_ok=True)
    
    print(f"📖 Reading roofer data...")
    roofers = extract_all_roofers(roofers_file)
    print(f"   Found {len(roofers)} total roofers\n")
    
    # Separate roofers with and without Google URLs
    with_url = [r for r in roofers if r.get('googleBusinessUrl')]
    without_url = [r for r in roofers if not r.get('googleBusinessUrl')]
    
    print(f"✅ Roofers with Google URL: {len(with_url)}")
    print(f"❌ Roofers needing Google URL: {len(without_url)}\n")
    
    # Create search data for all roofers
    search_data = []
    for roofer in roofers:
        search_data.append({
            'id': roofer['id'],
            'slug': roofer['slug'],
            'name': roofer['name'],
            'phone': roofer.get('phone'),
            'website': roofer.get('website'),
            'address': roofer.get('address'),
            'city': roofer.get('city'),
            'state': roofer.get('state'),
            'currentGoogleUrl': roofer.get('googleBusinessUrl'),
            'googleMapsSearchUrl': generate_google_maps_search_url(roofer),
            'googleSearchUrl': generate_google_search_url(roofer),
            'hasGoogleUrl': bool(roofer.get('googleBusinessUrl')),
        })
    
    # Save to JSON
    output_file.write_text(json.dumps(search_data, indent=2))
    print(f"✅ Created search file: {output_file}")
    print(f"   Contains {len(search_data)} roofers")
    
    # Create batches for processing
    batch_size = 50
    batches = []
    for i in range(0, len(without_url), batch_size):
        batch = without_url[i:i + batch_size]
        batches.append(batch)
    
    print(f"\n📦 Created {len(batches)} batches of {batch_size} roofers each")
    print(f"\n💡 Next steps:")
    print(f"   1. The search URLs are in: {output_file}")
    print(f"   2. Use browser automation or manual search to find Google Business Profile URLs")
    print(f"   3. Update via admin interface at /admin/roofers")
    print(f"   4. Or use batch-update-google-urls.py script with a JSON file of URLs")

if __name__ == '__main__':
    main()

















