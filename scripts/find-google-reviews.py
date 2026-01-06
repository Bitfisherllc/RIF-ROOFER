#!/usr/bin/env python3
"""
Script to find Google Business Profiles and reviews for roofing companies.
This script searches for each roofer's Google Business Profile and extracts review information.
"""

import re
import json
import time
from pathlib import Path
from typing import Dict, List, Optional, Tuple
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
        
        # Extract key fields with better regex
        id_match = re.search(r'"id":\s*"([^"]+)"', roofer_obj)
        name_match = re.search(r'"name":\s*"([^"]+)"', roofer_obj)
        phone_match = re.search(r'"phone":\s*"([^"]+)"', roofer_obj)
        website_match = re.search(r'"websiteUrl":\s*"([^"]+)"', roofer_obj)
        google_match = re.search(r'"googleBusinessUrl":\s*"([^"]+)"', roofer_obj)
        address_match = re.search(r'"address":\s*"([^"]+)"', roofer_obj)
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
                'address': address_match.group(1) if address_match else None,
                'city': city_match.group(1) if city_match else None,
                'state': state_match.group(1) if state_match else None,
            })
    
    return roofers

def build_google_search_query(roofer: Dict) -> str:
    """Build a Google search query for finding the business."""
    query_parts = [roofer['name']]
    
    if roofer['city']:
        query_parts.append(roofer['city'])
    if roofer['state']:
        query_parts.append(roofer['state'])
    query_parts.append('roofing')
    
    return ' '.join(query_parts)

def generate_google_maps_url(roofer: Dict) -> str:
    """Generate a potential Google Maps search URL."""
    query = build_google_search_query(roofer)
    encoded_query = urllib.parse.quote(query)
    return f"https://www.google.com/maps/search/?api=1&query={encoded_query}"

def generate_google_business_search_url(roofer: Dict) -> str:
    """Generate a Google search URL for the business."""
    query = build_google_search_query(roofer)
    if roofer['phone']:
        query += f" {roofer['phone']}"
    encoded_query = urllib.parse.quote(query)
    return f"https://www.google.com/search?q={encoded_query}"

def create_search_results_file(roofers: List[Dict], output_file: Path):
    """Create a JSON file with search URLs for manual review."""
    results = []
    
    for roofer in roofers:
        # Skip if already has Google Business URL
        if roofer['googleBusinessUrl']:
            results.append({
                'id': roofer['id'],
                'name': roofer['name'],
                'slug': roofer['slug'],
                'phone': roofer['phone'],
                'website': roofer['website'],
                'currentGoogleUrl': roofer['googleBusinessUrl'],
                'googleMapsUrl': generate_google_maps_url(roofer),
                'googleSearchUrl': generate_google_business_search_url(roofer),
                'status': 'has_url'
            })
        else:
            results.append({
                'id': roofer['id'],
                'name': roofer['name'],
                'slug': roofer['slug'],
                'phone': roofer['phone'],
                'website': roofer['website'],
                'address': roofer.get('address'),
                'city': roofer.get('city'),
                'googleMapsUrl': generate_google_maps_url(roofer),
                'googleSearchUrl': generate_google_business_search_url(roofer),
                'status': 'needs_url'
            })
    
    output_file.write_text(json.dumps(results, indent=2))
    print(f"✅ Created search results file: {output_file}")
    print(f"   Total roofers: {len(results)}")
    print(f"   With Google URL: {sum(1 for r in results if r.get('currentGoogleUrl'))}")
    print(f"   Needs URL: {sum(1 for r in results if r['status'] == 'needs_url')}")

def main():
    """Main function."""
    print("🔍 Finding Google Business Profiles for roofers...\n")
    
    # Paths
    roofers_file = Path('app/roofers/data/roofers.ts')
    output_file = Path('data/roofers/google-business-profiles.json')
    
    if not roofers_file.exists():
        print(f"❌ Error: {roofers_file} not found")
        return
    
    # Create output directory
    output_file.parent.mkdir(parents=True, exist_ok=True)
    
    # Extract roofers
    print(f"📖 Reading roofer data from {roofers_file}...")
    roofers = extract_roofers_from_ts(roofers_file)
    print(f"   Found {len(roofers)} roofers\n")
    
    # Create search results
    print("🔗 Generating Google search URLs...")
    create_search_results_file(roofers, output_file)
    
    print("\n✅ Done!")
    print(f"\n📋 Next steps:")
    print(f"   1. Review the search URLs in: {output_file}")
    print(f"   2. For each roofer, find their Google Business Profile URL")
    print(f"   3. Update the roofer data with googleBusinessUrl")
    print(f"   4. Use the admin page at /admin/reviews to add reviews manually")
    print(f"\n💡 Tip: You can use the Google Maps URLs to quickly find each business")

if __name__ == '__main__':
    main()
















