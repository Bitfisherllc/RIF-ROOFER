#!/usr/bin/env python3
"""
Quick script to mark specific roofers as preferred by name
Usage: python3 quick-mark-preferred.py "Roofer Name 1" "Roofer Name 2" ...
Or edit the PREFERRED_NAMES list below
"""

import sys
import re
from pathlib import Path

roofers_file = Path(__file__).parent.parent.parent / "app/roofers/data/roofers.ts"

# List of roofer names to mark as preferred
# Add your roofer names here:
PREFERRED_NAMES = [
    "AMERICAS PREFERRED ROOFERS INC",
    # Add more names here, one per line
    # "ADVANCED ROOFING INC",
    # "AMERICAN ROOFING & SHEET METAL INC",
]

# Or get names from command line
if len(sys.argv) > 1:
    PREFERRED_NAMES = sys.argv[1:]

if not PREFERRED_NAMES:
    print("No roofer names provided.")
    print("Usage: python3 quick-mark-preferred.py \"Roofer Name 1\" \"Roofer Name 2\" ...")
    print("Or edit the PREFERRED_NAMES list in the script.")
    sys.exit(1)

# Read the TypeScript file
with open(roofers_file, 'r', encoding='utf-8') as f:
    content = f.read()

marked_count = 0
not_found = []

for name in PREFERRED_NAMES:
    # Create slug from name
    slug = re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')
    
    # Try to find the roofer entry
    roofer_pattern = f"'{slug}':\\s*\\{{"
    match = re.search(roofer_pattern, content)
    
    if match:
        # Find the isPreferred field in this roofer's object
        start = match.end()
        # Look for "isPreferred": false within the next 2000 characters
        pref_pattern = r'"isPreferred":\s*false'
        pref_match = re.search(pref_pattern, content[start:start+2000])
        
        if pref_match:
            pref_pos = start + pref_match.start()
            # Replace false with true
            content = content[:pref_pos] + content[pref_pos:].replace('"isPreferred": false', '"isPreferred": true', 1)
            marked_count += 1
            print(f"✓ Marked as preferred: {name}")
        else:
            # Check if already true
            pref_true_pattern = r'"isPreferred":\s*true'
            if re.search(pref_true_pattern, content[start:start+2000]):
                print(f"⚠ Already marked as preferred: {name}")
            else:
                print(f"⚠ Could not find isPreferred field for: {name}")
                not_found.append(name)
    else:
        print(f"✗ Could not find roofer: {name} (slug: {slug})")
        not_found.append(name)

# Write back to file
if marked_count > 0:
    with open(roofers_file, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"\n✓ Successfully marked {marked_count} roofer(s) as preferred")
    print(f"File updated: {roofers_file}")
    
    if not_found:
        print(f"\n⚠ Could not find {len(not_found)} roofer(s):")
        for name in not_found:
            print(f"  - {name}")
else:
    print("\n⚠ No roofers were marked. Please check the names and try again.")

















