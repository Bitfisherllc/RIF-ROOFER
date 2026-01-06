#!/usr/bin/env python3
"""
Script to batch update Google Business URLs for roofers.
This script reads a JSON file with roofer slugs and Google Business URLs,
then updates the roofer data file.
"""

import json
import re
from pathlib import Path
from typing import Dict, List

def update_roofer_google_url(roofers_file: Path, updates: List[Dict[str, str]]):
    """Update Google Business URLs for roofers in the TypeScript file."""
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
    print(f"✅ Updated {len(updates)} roofers")

def main():
    """Main function."""
    print("🔄 Batch updating Google Business URLs...\n")
    
    # Paths
    roofers_file = Path('app/roofers/data/roofers.ts')
    # Try found-google-urls.json first, then google-urls-updates.json
    updates_file = Path('data/roofers/found-google-urls.json')
    if not updates_file.exists():
        updates_file = Path('data/roofers/google-urls-updates.json')
    
    if not roofers_file.exists():
        print(f"❌ Error: {roofers_file} not found")
        return
    
    if not updates_file.exists():
        print(f"❌ Error: {updates_file} not found")
        print(f"\n💡 Create {updates_file} with this format:")
        print(json.dumps([
            {
                "slug": "1-roof-llc",
                "googleBusinessUrl": "https://www.google.com/maps/place/1+Roof+LLC/@30.123,-81.456"
            }
        ], indent=2))
        return
    
    # Read updates
    updates = json.loads(updates_file.read_text())
    
    if not isinstance(updates, list):
        print(f"❌ Error: {updates_file} must contain a JSON array")
        return
    
    print(f"📖 Reading updates from {updates_file}...")
    print(f"   Found {len(updates)} updates\n")
    
    # Update roofers
    update_roofer_google_url(roofers_file, updates)
    
    print("\n✅ Done!")
    print("\n💡 Next steps:")
    print("   1. Restart your dev server to see the changes")
    print("   2. Check the roofer profile pages to see Google Business URLs")
    print("   3. Use /admin/reviews to add reviews for these businesses")

if __name__ == '__main__':
    main()
















