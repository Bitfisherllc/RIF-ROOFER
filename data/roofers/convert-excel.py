#!/usr/bin/env python3
"""
Convert Excel roofer data to JSON format
Requires: pip install pandas openpyxl
"""

import json
import sys
from pathlib import Path

try:
    import pandas as pd
except ImportError:
    print("Error: pandas is not installed.")
    print("Install it with: pip install pandas openpyxl")
    sys.exit(1)

# Path to Excel file
excel_file = Path(__file__).parent / "ROOFERS LIST FINAL.xlsx"
output_json = Path(__file__).parent / "roofers-data.json"

if not excel_file.exists():
    print(f"Error: {excel_file} not found")
    sys.exit(1)

try:
    # Read Excel file
    print(f"Reading {excel_file}...")
    df = pd.read_excel(excel_file)
    
    # Show column names
    print("\nColumns found in Excel file:")
    for i, col in enumerate(df.columns, 1):
        print(f"  {i}. {col}")
    
    # Show first few rows
    print("\nFirst 3 rows:")
    print(df.head(3).to_string())
    
    # Convert to JSON
    records = df.to_dict('records')
    
    # Save to JSON
    with open(output_json, 'w', encoding='utf-8') as f:
        json.dump(records, f, indent=2, ensure_ascii=False, default=str)
    
    print(f"\n✓ Converted {len(records)} roofers to {output_json}")
    print(f"\nNext step: Review the JSON file and let me know the column mapping.")
    
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)
















