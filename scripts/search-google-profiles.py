#!/usr/bin/env python3
"""
Script to search for Google Business Profiles for roofing companies.
This script uses web search to find Google Business Profile URLs.
"""

import re
import json
import time
from pathlib import Path
from typing import Dict, List, Optional
import urllib.parse

def extract_roofers_from_ts(file_path: Path) -> List[Dict]:
    """Extract roofer data from TypeScript file."""
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
            })
    
    return roofers

def build_search_query(roofer: Dict) -> str:
    """Build a search query for the business."""
    parts = [roofer['name']]
    if roofer.get('city'):
        parts.append(roofer['city'])
    if roofer.get('state'):
        parts.append(roofer['state'])
    parts.append('roofing')
    if roofer.get('phone'):
        parts.append(roofer['phone'])
    return ' '.join(parts)

def generate_google_maps_url(roofer: Dict) -> str:
    """Generate Google Maps search URL."""
    query = build_search_query(roofer)
    encoded = urllib.parse.quote(query)
    return f"https://www.google.com/maps/search/?api=1&query={encoded}"

def generate_google_search_url(roofer: Dict) -> str:
    """Generate Google search URL."""
    query = build_search_query(roofer)
    encoded = urllib.parse.quote(query)
    return f"https://www.google.com/search?q={encoded}"

def main():
    """Main function."""
    print("🔍 Generating Google Business Profile search URLs...\n")
    
    roofers_file = Path('app/roofers/data/roofers.ts')
    output_file = Path('data/roofers/google-profiles-to-find.json')
    
    if not roofers_file.exists():
        print(f"❌ Error: {roofers_file} not found")
        return
    
    output_file.parent.mkdir(parents=True, exist_ok=True)
    
    print(f"📖 Reading roofer data...")
    roofers = extract_roofers_from_ts(roofers_file)
    print(f"   Found {len(roofers)} roofers\n")
    
    # Separate roofers with and without Google URLs
    with_url = [r for r in roofers if r.get('googleBusinessUrl')]
    without_url = [r for r in roofers if not r.get('googleBusinessUrl')]
    
    print(f"✅ Roofers with Google URL: {len(with_url)}")
    print(f"❌ Roofers needing Google URL: {len(without_url)}\n")
    
    # Create search data for roofers without URLs
    search_data = []
    for roofer in without_url[:50]:  # Limit to first 50 for now
        search_data.append({
            'id': roofer['id'],
            'name': roofer['name'],
            'slug': roofer['slug'],
            'phone': roofer.get('phone'),
            'website': roofer.get('website'),
            'city': roofer.get('city'),
            'state': roofer.get('state'),
            'googleMapsUrl': generate_google_maps_url(roofer),
            'googleSearchUrl': generate_google_search_url(roofer),
        })
    
    output_file.write_text(json.dumps(search_data, indent=2))
    print(f"✅ Created search file: {output_file}")
    print(f"   Contains {len(search_data)} roofers to search for")
    print(f"\n💡 Next steps:")
    print(f"   1. Open each Google Maps URL to find the business")
    print(f"   2. Copy the Google Business Profile URL")
    print(f"   3. Use the admin page at /admin/roofers to update googleBusinessUrl")
    print(f"   4. Or use the API: POST /api/admin/roofers with {{roofers: [{{slug: '...', googleBusinessUrl: '...'}}]}}")

if __name__ == '__main__':
    main()
















