#!/usr/bin/env python3
"""Simple test to verify the scraping script works"""

import sys
from pathlib import Path

print("=" * 60)
print("DIAGNOSTIC TEST")
print("=" * 60)

# Check Python version
print(f"Python version: {sys.version}")
print()

# Check dependencies
try:
    import requests
    print("✅ requests module installed")
except ImportError:
    print("❌ requests module NOT installed")
    print("   Run: pip3 install requests")
    sys.exit(1)

try:
    from bs4 import BeautifulSoup
    print("✅ beautifulsoup4 module installed")
except ImportError:
    print("❌ beautifulsoup4 module NOT installed")
    print("   Run: pip3 install beautifulsoup4")
    sys.exit(1)

# Check data files
data_file = Path("roofers-data.json")
if data_file.exists():
    print(f"✅ Roofers data file found: {data_file}")
    import json
    with open(data_file, 'r') as f:
        data = json.load(f)
    print(f"   Contains {len(data)} roofers")
else:
    print(f"❌ Roofers data file NOT found: {data_file}")

# Check script file
script_file = Path("scrape-yelp-reviews.py")
if script_file.exists():
    print(f"✅ Scraping script found: {script_file}")
else:
    print(f"❌ Scraping script NOT found: {script_file}")

print()
print("=" * 60)
print("TESTING SCRIPT EXECUTION")
print("=" * 60)

# Try to run the script with --help
import subprocess
result = subprocess.run(
    [sys.executable, "scrape-yelp-reviews.py", "--help"],
    capture_output=True,
    text=True,
    timeout=5
)

if result.returncode == 0:
    print("✅ Script runs successfully")
    print("   Help output:")
    print(result.stdout)
else:
    print("❌ Script has errors:")
    print(result.stderr)

print()
print("=" * 60)
print("READY TO USE")
print("=" * 60)
print()
print("To start scraping, run:")
print("  python3 scrape-yelp-reviews.py --limit 10")
print()
print("Make sure you're in the correct directory:")
print("  cd '/Volumes/Whale/_CLIENTS/Florida Roofers/data/roofers'")
















