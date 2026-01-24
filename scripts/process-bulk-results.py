#!/usr/bin/env python3
"""
Process bulk Google Business Profile results from Outscraper or Apify.
This script reads the results and updates the roofer data file.
"""

import json
import csv
import re
from pathlib import Path
from typing import Dict, List, Optional

def extract_google_url_from_result(result: Dict) -> Optional[str]:
    """Extract Google Business Profile URL from result data."""
    # Try different possible field names
    url_fields = [
        'google_maps_url',
        'googleMapsUrl',
        'url',
        'google_url',
        'place_url',
        'maps_url',
        'google_business_url',
        'googleBusinessUrl',
    ]
    
    for field in url_fields:
        if field in result and result[field]:
            url = result[field]
            # Clean up URL - remove query parameters if needed
            if isinstance(url, str) and 'google.com/maps' in url:
                # Extract just the place URL part
                if '/place/' in url:
                    # Get URL up to the place ID
                    match = re.search(r'(https://www\.google\.com/maps/place/[^?]+)', url)
                    if match:
                        return match.group(1)
                return url.split('?')[0]  # Remove query params
    
    return None

def process_outscraper_results(results_file: Path) -> List[Dict]:
    """Process Outscraper CSV results."""
    updates = []
    
    with open(results_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            # Outscraper typically returns: query, name, address, phone, url, etc.
            slug = row.get('slug') or row.get('id')
            google_url = row.get('url') or row.get('google_maps_url') or row.get('googleMapsUrl')
            
            if slug and google_url:
                updates.append({
                    'slug': slug,
                    'googleBusinessUrl': google_url
                })
    
    return updates

def process_apify_results(results_file: Path) -> List[Dict]:
    """Process Apify JSON results."""
    updates = []
    
    results = json.loads(results_file.read_text())
    
    for result in results:
        slug = result.get('slug') or result.get('id')
        google_url = extract_google_url_from_result(result)
        
        if slug and google_url:
            updates.append({
                'slug': slug,
                'googleBusinessUrl': google_url
            })
    
    return updates

def process_manual_csv(results_file: Path) -> List[Dict]:
    """Process manual CSV with Google Business URLs filled in."""
    updates = []
    
    with open(results_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            slug = row.get('slug')
            google_url = row.get('google_business_url') or row.get('googleBusinessUrl')
            
            if slug and google_url and google_url.strip():
                updates.append({
                    'slug': slug,
                    'googleBusinessUrl': google_url.strip()
                })
    
    return updates

def update_roofer_data(roofers_file: Path, updates: List[Dict]):
    """Update roofer data file with Google Business URLs."""
    content = roofers_file.read_text()
    
    for update in updates:
        slug = update.get('slug')
        google_url = update.get('googleBusinessUrl', '')
        
        if not slug:
            continue
        
        # Escape single quotes in slug
        escaped_slug = slug.replace("'", "\\'")
        
        # Check if googleBusinessUrl already exists for this roofer
        url_pattern = re.compile(
            rf"('{re.escape(escaped_slug)}':\s*\{{[^}}]*?)\"googleBusinessUrl\":\s*\"[^\"]*\"",
            re.DOTALL
        )
        
        if url_pattern.search(content):
            # Update existing URL
            content = url_pattern.sub(
                rf'\1"googleBusinessUrl": "{google_url}"',
                content
            )
        else:
            # Add new URL field - insert before isPreferred or isHidden
            insert_pattern = re.compile(
                rf"('{re.escape(escaped_slug)}':\s*\{{[^}}]*?)(?:\"websiteUrl\":\s*\"[^\"]*\",\s*)?(?=\"isPreferred\"|\"isHidden\")",
                re.DOTALL
            )
            
            def add_url_field(match):
                before = match.group(1)
                url_field = f'"googleBusinessUrl": "{google_url}",\n      ' if google_url else ''
                return before + url_field
            
            content = insert_pattern.sub(add_url_field, content)
    
    # Write updated content
    roofers_file.write_text(content, 'utf-8')
    print(f"✅ Updated {len(updates)} roofers in roofer data file")

def main():
    """Main function."""
    import sys
    
    print("🔄 Processing bulk Google Business Profile results...\n")
    
    if len(sys.argv) < 2:
        print("Usage: python3 process-bulk-results.py <results_file> [format]")
        print("\nFormats:")
        print("  outscraper  - CSV from Outscraper")
        print("  apify       - JSON from Apify")
        print("  manual      - CSV with google_business_url column (default)")
        print("\nExample:")
        print("  python3 process-bulk-results.py data/roofers/bulk-search/results.csv")
        print("  python3 process-bulk-results.py data/roofers/bulk-search/results.json apify")
        return
    
    results_file = Path(sys.argv[1])
    format_type = sys.argv[2] if len(sys.argv) > 2 else 'manual'
    
    if not results_file.exists():
        print(f"❌ Error: {results_file} not found")
        return
    
    roofers_file = Path('app/roofers/data/roofers.ts')
    if not roofers_file.exists():
        print(f"❌ Error: {roofers_file} not found")
        return
    
    print(f"📖 Reading results from: {results_file}")
    print(f"   Format: {format_type}\n")
    
    # Process based on format
    if format_type == 'outscraper':
        updates = process_outscraper_results(results_file)
    elif format_type == 'apify':
        updates = process_apify_results(results_file)
    else:  # manual
        updates = process_manual_csv(results_file)
    
    if not updates:
        print("❌ No updates found in results file")
        print("   Make sure the file contains 'slug' and Google Business URL columns/fields")
        return
    
    print(f"✅ Found {len(updates)} Google Business URLs to update\n")
    
    # Update roofer data
    update_roofer_data(roofers_file, updates)
    
    print("\n✅ Done!")
    print("\n💡 Next steps:")
    print("   1. Restart your dev server to see the changes")
    print("   2. Check roofer profile pages to verify Google Business URLs")
    print("   3. Use /admin/reviews to add reviews for businesses with URLs")

if __name__ == '__main__':
    main()

















