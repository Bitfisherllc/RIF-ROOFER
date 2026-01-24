#!/usr/bin/env python3
"""
Update all roofers with Yelp review data
This script helps you systematically scrape and update Yelp reviews for all roofers
"""

import json
from pathlib import Path
from typing import Dict, List
import sys

ROOFERS_DATA_FILE = Path(__file__).parent / "roofers-data.json"
YELP_DATA_FILE = Path(__file__).parent / "yelp-reviews-analysis.json"
ROOFERS_TS_FILE = Path(__file__).parent.parent.parent / "app/roofers/data/roofers.ts"

def load_roofers() -> List[Dict]:
    """Load roofers from JSON"""
    if not ROOFERS_DATA_FILE.exists():
        print(f"Error: {ROOFERS_DATA_FILE} not found")
        return []
    
    with open(ROOFERS_DATA_FILE, 'r') as f:
        return json.load(f)

def load_existing_yelp_data() -> Dict[str, Dict]:
    """Load existing Yelp data"""
    if not YELP_DATA_FILE.exists():
        return {}
    
    with open(YELP_DATA_FILE, 'r') as f:
        yelp_list = json.load(f)
    
    # Convert to dict by name
    yelp_dict = {}
    for item in yelp_list:
        name = item.get('name', '').upper().strip()
        yelp_dict[name] = item
    
    return yelp_dict

def get_roofer_id_mapping() -> Dict[str, str]:
    """Extract roofer ID mapping from TypeScript file"""
    mapping = {}
    
    if not ROOFERS_TS_FILE.exists():
        print(f"Warning: {ROOFERS_TS_FILE} not found, cannot map IDs")
        return mapping
    
    try:
        content = ROOFERS_TS_FILE.read_text()
        # Extract roofer entries: 'slug': { id: 'X', name: '...' }
        import re
        pattern = r"'([^']+)':\s*\{[^}]*id:\s*['\"]([^'\"]+)['\"]"
        matches = re.findall(pattern, content)
        for slug, roofer_id in matches:
            # Try to get name
            name_pattern = rf"'{slug}':\s*\{{[^}}]*name:\s*['\"]([^'\"]+)['\"]"
            name_match = re.search(name_pattern, content)
            if name_match:
                name = name_match.group(1).upper().strip()
                mapping[name] = roofer_id
        
        print(f"Found {len(mapping)} roofer ID mappings")
    except Exception as e:
        print(f"Warning: Could not parse roofer IDs: {e}")
    
    return mapping

def generate_update_plan(roofers: List[Dict], yelp_data: Dict, id_mapping: Dict) -> Dict:
    """Generate a plan for updating roofers"""
    plan = {
        'total_roofers': len(roofers),
        'with_yelp_data': 0,
        'needs_scraping': [],
        'ready_to_import': [],
        'missing_ids': [],
    }
    
    for roofer in roofers:
        name = roofer.get('Name', '').upper().strip()
        yelp_item = yelp_data.get(name)
        
        if yelp_item and yelp_item.get('yelp_found'):
            plan['with_yelp_data'] += 1
            roofer_id = id_mapping.get(name)
            if roofer_id:
                plan['ready_to_import'].append({
                    'name': roofer.get('Name'),
                    'id': roofer_id,
                    'yelp_url': yelp_item.get('yelp_url'),
                    'rating': yelp_item.get('star_rating'),
                })
            else:
                plan['missing_ids'].append({
                    'name': roofer.get('Name'),
                    'city': roofer.get('City'),
                })
        else:
            plan['needs_scraping'].append({
                'name': roofer.get('Name'),
                'city': roofer.get('City'),
                'phone': roofer.get('Phone Number'),
            })
    
    return plan

def main():
    print("=" * 70)
    print("YELP REVIEWS - UPDATE ALL ROOFERS")
    print("=" * 70)
    print()
    
    # Load data
    print("Loading data...")
    roofers = load_roofers()
    yelp_data = load_existing_yelp_data()
    id_mapping = get_roofer_id_mapping()
    
    print(f"  - Roofers: {len(roofers)}")
    print(f"  - Existing Yelp data: {len(yelp_data)}")
    print(f"  - ID mappings: {len(id_mapping)}")
    print()
    
    # Generate plan
    plan = generate_update_plan(roofers, yelp_data, id_mapping)
    
    print("=" * 70)
    print("UPDATE PLAN")
    print("=" * 70)
    print(f"Total roofers: {plan['total_roofers']}")
    print(f"With Yelp data: {plan['with_yelp_data']}")
    print(f"Ready to import: {len(plan['ready_to_import'])}")
    print(f"Needs scraping: {len(plan['needs_scraping'])}")
    print(f"Missing IDs: {len(plan['missing_ids'])}")
    print()
    
    # Show ready to import
    if plan['ready_to_import']:
        print("✅ READY TO IMPORT (have Yelp data + roofer ID):")
        for item in plan['ready_to_import'][:10]:
            print(f"   - {item['name']} (ID: {item['id']}) - Rating: {item['rating']}⭐")
        if len(plan['ready_to_import']) > 10:
            print(f"   ... and {len(plan['ready_to_import']) - 10} more")
        print()
    
    # Show needs scraping
    if plan['needs_scraping']:
        print("⚠️  NEEDS YELP SCRAPING:")
        for item in plan['needs_scraping'][:10]:
            location = f"{item['city']}, FL" if item.get('city') else "FL"
            print(f"   - {item['name']} ({location})")
        if len(plan['needs_scraping']) > 10:
            print(f"   ... and {len(plan['needs_scraping']) - 10} more")
        print()
        print("To scrape these, run:")
        print("   python3 scrape-yelp-reviews.py")
        print()
    
    # Show missing IDs
    if plan['missing_ids']:
        print("⚠️  HAS YELP DATA BUT MISSING ROOFER ID:")
        for item in plan['missing_ids'][:10]:
            print(f"   - {item['name']} ({item.get('city', '')})")
        if len(plan['missing_ids']) > 10:
            print(f"   ... and {len(plan['missing_ids']) - 10} more")
        print()
        print("These need to be manually mapped in roofers.ts")
        print()
    
    # Next steps
    print("=" * 70)
    print("NEXT STEPS")
    print("=" * 70)
    
    if plan['ready_to_import']:
        print("1. Import ready roofers:")
        print("   python3 import-yelp-to-site.py")
        print()
    
    if plan['needs_scraping']:
        print("2. Scrape Yelp reviews for remaining roofers:")
        print("   python3 scrape-yelp-reviews.py")
        print(f"   (This will process {len(plan['needs_scraping'])} roofers)")
        print()
    
    if plan['missing_ids']:
        print("3. Map roofer IDs for roofers with Yelp data:")
        print("   - Check app/roofers/data/roofers.ts for IDs")
        print("   - Update app/roofers/data/yelp-reviews.ts")
        print()

if __name__ == '__main__':
    main()

















