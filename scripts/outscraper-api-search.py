#!/usr/bin/env python3
"""
Direct Outscraper API integration for finding Google Business Profiles.
This script uses the Outscraper API to search for all roofers in bulk.

Requirements:
- pip install requests
- Outscraper API key (get from https://outscraper.com/api-keys)
"""

import json
import csv
import os
import time
import requests
from pathlib import Path
from typing import Dict, List, Optional

# Outscraper API endpoint
OUTSCRAPER_API_URL = "https://api.outscraper.com/maps/search-v3"

def load_roofers_from_csv(csv_file: Path) -> List[Dict]:
    """Load roofers from the prepared CSV file."""
    roofers = []
    with open(csv_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            roofers.append(row)
    return roofers

def search_with_outscraper(queries: List[str], api_key: str, location: str = "Florida, USA") -> List[Dict]:
    """
    Search for businesses using Outscraper API.
    
    Args:
        queries: List of search queries (business name + location + phone)
        api_key: Outscraper API key
        location: Default location if not in query
    
    Returns:
        List of search results
    """
    # Outscraper API allows batch processing
    # Process in batches of 100 to avoid rate limits
    batch_size = 100
    all_results = []
    
    print(f"🔍 Searching for {len(queries)} businesses using Outscraper API...\n")
    
    for i in range(0, len(queries), batch_size):
        batch = queries[i:i + batch_size]
        batch_num = (i // batch_size) + 1
        total_batches = (len(queries) + batch_size - 1) // batch_size
        
        print(f"📦 Processing batch {batch_num}/{total_batches} ({len(batch)} queries)...")
        
        # Prepare request
        params = {
            'query': batch,  # Can be array of queries
            'limit': 1,  # One result per query
            'language': 'en',
            'region': 'us',
        }
        
        headers = {
            'X-API-KEY': api_key,
        }
        
        try:
            response = requests.post(OUTSCRAPER_API_URL, json=params, headers=headers)
            response.raise_for_status()
            
            data = response.json()
            if 'data' in data:
                all_results.extend(data['data'])
                print(f"   ✅ Found {len(data['data'])} results")
            else:
                print(f"   ⚠️  No results in response")
            
            # Rate limiting - wait between batches
            if i + batch_size < len(queries):
                time.sleep(2)  # 2 second delay between batches
                
        except requests.exceptions.RequestException as e:
            print(f"   ❌ Error: {e}")
            if hasattr(e.response, 'text'):
                print(f"   Response: {e.response.text}")
            continue
    
    return all_results

def match_results_to_roofers(results: List[Dict], roofers: List[Dict]) -> List[Dict]:
    """Match API results to roofers by name/phone."""
    updates = []
    
    # Create lookup by phone number (most reliable)
    phone_lookup = {}
    for roofer in roofers:
        phone = roofer.get('phone', '').strip()
        if phone:
            # Normalize phone number
            phone_normalized = phone.replace('-', '').replace('(', '').replace(')', '').replace(' ', '')
            phone_lookup[phone_normalized] = roofer
    
    # Match results to roofers
    for result in results:
        result_phone = result.get('phone', '').strip()
        if result_phone:
            # Normalize phone number
            result_phone_normalized = result_phone.replace('-', '').replace('(', '').replace(')', '').replace(' ', '')
            
            if result_phone_normalized in phone_lookup:
                roofer = phone_lookup[result_phone_normalized]
                google_url = result.get('url') or result.get('google_maps_url')
                
                if google_url:
                    updates.append({
                        'slug': roofer.get('slug'),
                        'googleBusinessUrl': google_url
                    })
    
    return updates

def main():
    """Main function."""
    import sys
    
    print("🚀 Outscraper API Google Business Profile Search\n")
    
    # Check for API key
    api_key = os.getenv('OUTSCRAPER_API_KEY')
    if not api_key:
        print("❌ Error: OUTSCRAPER_API_KEY environment variable not set")
        print("\n💡 To set it:")
        print("   export OUTSCRAPER_API_KEY='your-api-key-here'")
        print("\n   Or add to .env.local:")
        print("   OUTSCRAPER_API_KEY=your-api-key-here")
        print("\n   Get your API key from: https://outscraper.com/api-keys")
        return
    
    # Load roofers
    csv_file = Path('data/roofers/bulk-search/outscraper-input.csv')
    if not csv_file.exists():
        print(f"❌ Error: {csv_file} not found")
        print("   Run: python3 scripts/prepare-bulk-search.py first")
        return
    
    print(f"📖 Loading roofers from: {csv_file}")
    roofers = load_roofers_from_csv(csv_file)
    print(f"   Found {len(roofers)} roofers to search\n")
    
    # Extract queries
    queries = [roofer['query'] for roofer in roofers]
    
    # Search with Outscraper
    results = search_with_outscraper(queries, api_key)
    
    if not results:
        print("\n❌ No results found. Check your API key and query format.")
        return
    
    print(f"\n✅ Found {len(results)} total results")
    
    # Match results to roofers
    print("\n🔗 Matching results to roofers...")
    updates = match_results_to_roofers(results, roofers)
    print(f"   Matched {len(updates)} roofers\n")
    
    # Save results
    output_file = Path('data/roofers/bulk-search/outscraper-api-results.json')
    output_file.parent.mkdir(parents=True, exist_ok=True)
    output_file.write_text(json.dumps(updates, indent=2))
    print(f"✅ Saved results to: {output_file}")
    
    # Update roofer data
    if updates:
        print("\n🔄 Updating roofer data...")
        from batch_update_google_urls import update_roofer_google_url
        
        roofers_file = Path('app/roofers/data/roofers.ts')
        update_roofer_google_url(roofers_file, updates)
        print(f"✅ Updated {len(updates)} roofers")
    
    print("\n✅ Done!")
    print(f"\n📊 Summary:")
    print(f"   Total roofers: {len(roofers)}")
    print(f"   Results found: {len(results)}")
    print(f"   Matched: {len(updates)}")
    print(f"   Missing: {len(roofers) - len(updates)}")

if __name__ == '__main__':
    main()

















