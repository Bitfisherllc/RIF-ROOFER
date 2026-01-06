#!/usr/bin/env python3
"""
Analyze roofer data to help identify preferred roofers
"""

import json
import pandas as pd
from pathlib import Path

# Read the Excel data
excel_file = Path(__file__).parent / "ROOFERS LIST FINAL.xlsx"
df = pd.read_excel(excel_file)

print("=" * 80)
print("ROOFER ANALYSIS FOR PREFERRED STATUS")
print("=" * 80)
print(f"\nTotal roofers: {len(df)}")
print("\n" + "=" * 80)

# Analysis 1: Roofers with "Preferred" in name
print("\n1. ROOFERS WITH 'PREFERRED' IN COMPANY NAME:")
print("-" * 80)
preferred_in_name = df[df['Name'].str.contains('preferred', case=False, na=False)]
if len(preferred_in_name) > 0:
    for idx, row in preferred_in_name.iterrows():
        print(f"  • {row['Name']}")
        if pd.notna(row['Phone Number']):
            print(f"    Phone: {row['Phone Number']}")
        if pd.notna(row['Email']):
            print(f"    Email: {row['Email']}")
        print()
else:
    print("  None found")

# Analysis 2: Roofers with complete contact information (indicator of professionalism)
print("\n2. ROOFERS WITH COMPLETE CONTACT INFO (Phone + Email + Website):")
print("-" * 80)
complete_info = df[
    df['Phone Number'].notna() & 
    df['Email'].notna() & 
    df['website'].notna()
].copy()
print(f"Found {len(complete_info)} roofers with all contact methods")
print("\nFirst 20:")
for idx, row in complete_info.head(20).iterrows():
    print(f"  • {row['Name']}")

# Analysis 3: Roofers with professional email domains (not gmail/yahoo)
print("\n3. ROOFERS WITH PROFESSIONAL EMAIL DOMAINS:")
print("-" * 80)
professional_domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'aol.com', 'outlook.com']
df_with_email = df[df['Email'].notna()].copy()
df_with_email['email_domain'] = df_with_email['Email'].str.split('@').str[1].str.lower()
professional_emails = df_with_email[~df_with_email['email_domain'].isin(professional_domains)]
print(f"Found {len(professional_emails)} roofers with professional email domains")
print("\nFirst 20:")
for idx, row in professional_emails.head(20).iterrows():
    print(f"  • {row['Name']} ({row['Email']})")

# Analysis 4: Roofers with websites
print("\n4. ROOFERS WITH WEBSITES:")
print("-" * 80)
with_websites = df[df['website'].notna()].copy()
print(f"Found {len(with_websites)} roofers with websites")
print("\nFirst 20:")
for idx, row in with_websites.head(20).iterrows():
    print(f"  • {row['Name']} - {row['website']}")

# Analysis 5: Roofers in major metro areas (might be more established)
print("\n5. ROOFERS IN MAJOR METRO AREAS:")
print("-" * 80)
major_cities = ['Tampa', 'Miami', 'Orlando', 'Jacksonville', 'Fort Lauderdale', 
                'St. Petersburg', 'Clearwater', 'West Palm Beach', 'Naples', 
                'Sarasota', 'Tallahassee', 'Gainesville']
major_city_roofers = df[df['City'].isin(major_cities)]
print(f"Found {len(major_city_roofers)} roofers in major cities")
print("\nBy city:")
for city in major_cities:
    city_roofers = major_city_roofers[major_city_roofers['City'] == city]
    if len(city_roofers) > 0:
        print(f"\n  {city}: {len(city_roofers)} roofers")
        for idx, row in city_roofers.head(5).iterrows():
            print(f"    • {row['Name']}")

# Analysis 6: Generate candidate list
print("\n" + "=" * 80)
print("6. RECOMMENDED CANDIDATES FOR PREFERRED STATUS:")
print("=" * 80)
print("\nCandidates based on multiple factors:")
print("(Roofers with: Preferred in name OR Complete info + Professional email + Website)")

candidates = []

# Add roofers with "Preferred" in name
for idx, row in preferred_in_name.iterrows():
    candidates.append({
        'name': row['Name'],
        'reason': 'Has "Preferred" in company name',
        'phone': row['Phone Number'] if pd.notna(row['Phone Number']) else None,
        'email': row['Email'] if pd.notna(row['Email']) else None,
        'website': row['website'] if pd.notna(row['website']) else None,
    })

# Add roofers with complete professional profile
for idx, row in complete_info.iterrows():
    if row['Name'] not in [c['name'] for c in candidates]:
        email_str = str(row['Email']) if pd.notna(row['Email']) else ''
        email_domain = ''
        if '@' in email_str:
            parts = email_str.split('@')
            if len(parts) > 1:
                email_domain = parts[1].lower()
        
        if email_domain and email_domain not in professional_domains:
            candidates.append({
                'name': row['Name'],
                'reason': 'Complete professional profile (phone + email + website)',
                'phone': row['Phone Number'] if pd.notna(row['Phone Number']) else None,
                'email': row['Email'] if pd.notna(row['Email']) else None,
                'website': row['website'] if pd.notna(row['website']) else None,
            })

print(f"\nTotal candidates: {len(candidates)}")
print("\nDetailed list:")
for i, candidate in enumerate(candidates[:50], 1):  # Show first 50
    print(f"\n{i}. {candidate['name']}")
    print(f"   Reason: {candidate['reason']}")
    if candidate['phone']:
        print(f"   Phone: {candidate['phone']}")
    if candidate['email']:
        print(f"   Email: {candidate['email']}")
    if candidate['website']:
        print(f"   Website: {candidate['website']}")

if len(candidates) > 50:
    print(f"\n... and {len(candidates) - 50} more candidates")

# Save candidates to JSON for easy review
candidates_file = Path(__file__).parent / "preferred-candidates.json"
with open(candidates_file, 'w') as f:
    json.dump(candidates, f, indent=2)

print(f"\n" + "=" * 80)
print(f"Candidates saved to: {candidates_file}")
print("=" * 80)
print("\nNEXT STEPS:")
print("1. Review the candidates above")
print("2. Use the mark-preferred.py script to mark roofers as preferred")
print("3. Or manually edit app/roofers/data/roofers.ts and set isPreferred: true")
















