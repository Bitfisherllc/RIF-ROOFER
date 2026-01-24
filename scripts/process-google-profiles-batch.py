#!/usr/bin/env python3
"""
Batch processor for finding Google Business Profiles.
This script helps process roofers in manageable batches.
"""

import json
from pathlib import Path
from typing import Dict, List

def load_roofers_needing_urls() -> List[Dict]:
    """Load all roofers that need Google Business URLs."""
    search_file = Path('data/roofers/all-google-profiles-search.json')
    if not search_file.exists():
        print(f"❌ Error: {search_file} not found")
        print("   Run: python3 scripts/find-all-google-profiles.py")
        return []
    
    roofers_data = json.loads(search_file.read_text())
    return [r for r in roofers_data if not r.get('hasGoogleUrl')]

def create_batch_file(batch_num: int, batch_size: int = 20) -> Path:
    """Create a batch file for processing."""
    roofers = load_roofers_needing_urls()
    
    if not roofers:
        print("✅ All roofers already have Google Business URLs!")
        return None
    
    start_idx = (batch_num - 1) * batch_size
    end_idx = start_idx + batch_size
    batch = roofers[start_idx:end_idx]
    
    if not batch:
        print(f"❌ Batch {batch_num} is empty (all roofers processed)")
        return None
    
    batch_file = Path(f'data/roofers/batch-{batch_num}-to-process.json')
    batch_file.parent.mkdir(parents=True, exist_ok=True)
    batch_file.write_text(json.dumps(batch, indent=2))
    
    return batch_file

def main():
    """Main function."""
    import sys
    
    print("📦 Google Business Profile Batch Processor\n")
    
    if len(sys.argv) < 2:
        print("Usage: python3 process-google-profiles-batch.py <batch_number> [batch_size]")
        print("\nExample:")
        print("  python3 process-google-profiles-batch.py 1    # Process batch 1 (20 roofers)")
        print("  python3 process-google-profiles-batch.py 2 50 # Process batch 2 (50 roofers)")
        return
    
    batch_num = int(sys.argv[1])
    batch_size = int(sys.argv[2]) if len(sys.argv) > 2 else 20
    
    print(f"Creating batch {batch_num} with {batch_size} roofers...\n")
    
    batch_file = create_batch_file(batch_num, batch_size)
    
    if batch_file:
        print(f"✅ Created: {batch_file}")
        print(f"\n📋 Instructions:")
        print(f"   1. Open {batch_file}")
        print(f"   2. For each roofer, open their googleMapsSearchUrl in a browser")
        print(f"   3. Find the business and copy the Google Business Profile URL")
        print(f"   4. Add the URL to data/roofers/found-google-urls.json:")
        print(f"      {{")
        print(f"        \"slug\": \"roofer-slug\",")
        print(f"        \"googleBusinessUrl\": \"https://www.google.com/maps/place/...\"")
        print(f"      }}")
        print(f"   5. After processing the batch, run:")
        print(f"      python3 scripts/batch-update-google-urls.py")
        print(f"   6. Then process the next batch: batch {batch_num + 1}")

if __name__ == '__main__':
    main()

















