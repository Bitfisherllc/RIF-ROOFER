#!/usr/bin/env python3
"""
Mark roofers as preferred in the TypeScript data file
Usage: python3 mark-preferred.py
Then follow the interactive prompts
"""

import json
import re
from pathlib import Path

roofers_file = Path(__file__).parent.parent.parent / "app/roofers/data/roofers.ts"
candidates_file = Path(__file__).parent / "preferred-candidates.json"

# Read the TypeScript file
with open(roofers_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Load candidates if available
candidates = []
if candidates_file.exists():
    with open(candidates_file, 'r') as f:
        candidates = json.load(f)

print("=" * 80)
print("MARK ROOFERS AS PREFERRED")
print("=" * 80)

if candidates:
    print(f"\nFound {len(candidates)} candidate roofers from analysis.")
    print("\nWould you like to:")
    print("1. Mark all candidates as preferred")
    print("2. Review and select specific roofers")
    print("3. Manually enter roofer names")
    
    choice = input("\nEnter choice (1-3): ").strip()
    
    if choice == "1":
        # Mark all candidates
        names_to_mark = [c['name'] for c in candidates]
    elif choice == "2":
        # Interactive selection
        print("\nCandidates:")
        for i, candidate in enumerate(candidates, 1):
            print(f"{i}. {candidate['name']} - {candidate['reason']}")
        
        selected = input("\nEnter numbers to mark (comma-separated, e.g., 1,3,5-10): ").strip()
        # Parse selection
        indices = []
        for part in selected.split(','):
            part = part.strip()
            if '-' in part:
                start, end = map(int, part.split('-'))
                indices.extend(range(start - 1, end))
            else:
                indices.append(int(part) - 1)
        
        names_to_mark = [candidates[i]['name'] for i in indices if 0 <= i < len(candidates)]
    else:
        # Manual entry
        print("\nEnter roofer names (one per line, empty line to finish):")
        names_to_mark = []
        while True:
            name = input().strip()
            if not name:
                break
            names_to_mark.append(name)
else:
    print("\nNo candidates file found. Enter roofer names manually:")
    print("(One per line, empty line to finish)")
    names_to_mark = []
    while True:
        name = input().strip()
        if not name:
            break
        names_to_mark.append(name)

# Find and mark roofers in the TypeScript file
marked_count = 0
for name in names_to_mark:
    # Create slug from name
    slug = re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')
    
    # Try to find the roofer entry
    # Look for pattern: 'slug': { ... "isPreferred": false, ...
    pattern = f"('{slug}'|\\\"{slug}\\\"):\\s*\\{{[^}}]*\"isPreferred\":\\s*false"
    replacement = f"'{slug}': {{\n    \"isPreferred\": true"
    
    # More robust pattern matching
    # Find the roofer entry
    roofer_pattern = f"'{slug}':\\s*\\{{"
    match = re.search(roofer_pattern, content)
    
    if match:
        # Find the isPreferred field in this roofer's object
        start = match.end()
        # Find the closing brace for this object (simplified - assumes proper formatting)
        # Look for "isPreferred": false
        pref_pattern = r'"isPreferred":\s*false'
        pref_match = re.search(pref_pattern, content[start:start+2000])
        
        if pref_match:
            pref_pos = start + pref_match.start()
            # Replace false with true
            content = content[:pref_pos] + content[pref_pos:].replace('"isPreferred": false', '"isPreferred": true', 1)
            marked_count += 1
            print(f"✓ Marked: {name}")
        else:
            print(f"⚠ Could not find isPreferred field for: {name}")
    else:
        # Try variations of the slug
        print(f"⚠ Could not find roofer: {name} (slug: {slug})")

# Write back to file
if marked_count > 0:
    with open(roofers_file, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"\n✓ Marked {marked_count} roofers as preferred")
    print(f"File updated: {roofers_file}")
else:
    print("\n⚠ No roofers were marked. Please check the names and try again.")
















