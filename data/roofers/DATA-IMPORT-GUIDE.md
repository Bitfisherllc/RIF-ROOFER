# Roofer Data Import Guide

## Current Status
✅ Structure created:
- `/app/roofers/page.tsx` - Main roofers listing page
- `/app/roofers/[slug]/page.tsx` - Individual roofer profile pages
- `/app/roofers/data/roofers.ts` - Data structure and helper functions

## Next Steps

### Option 1: Convert Excel to JSON (Recommended)

**If you have Python with pandas:**
```bash
pip install pandas openpyxl
python3 data/roofers/convert-excel.py
```

This will create `roofers-data.json` with all your roofer data.

**If you don't have pandas:**
1. Open `ROOFERS LIST FINAL.xlsx` in Excel
2. File > Save As > CSV (Comma delimited)
3. Save as `roofers-data.csv` in this folder
4. I can then help convert the CSV to TypeScript

### Option 2: Manual Data Entry

If you prefer, I can help you structure the data manually. Just let me know:
- What columns are in your Excel file?
- How many roofers are in the list?
- What format are service areas in? (separate columns, comma-separated, etc.)

## Expected Data Fields

Based on the schema, here's what we need:

### Required Fields:
- **name** - Company name
- **slug** - URL-friendly version (auto-generated from name if not provided)

### Optional Fields:
- **phone** - Phone number
- **email** - Email address
- **websiteUrl** - Website URL
- **licenseNumber** - Florida contractor license number
- **logoUrl** - URL to company logo
- **aboutText** - HTML or plain text description
- **isPreferred** - Boolean (true/false or "Yes"/"No")
- **isHidden** - Boolean (true/false or "Yes"/"No")
- **sortOverride** - Number for custom sorting
- **address** - Street address
- **city** - City name
- **state** - State (usually "FL")
- **zipCode** - ZIP code
- **yearsInBusiness** - Number of years
- **specialties** - Array of specialties

### Service Areas:
Service areas can be in different formats. We'll need to map them to:
- **regions** - Array of region slugs (e.g., ["sun-coast", "treasure-coast"])
- **counties** - Array of county slugs (e.g., ["hillsborough", "pinellas"])
- **cities** - Array of city slugs (e.g., ["tampa", "st-petersburg"])

## Column Mapping

Once you share your Excel columns, I'll create a mapping script that:
1. Reads your Excel/CSV file
2. Maps columns to our data structure
3. Generates slugs from names
4. Converts service area data to the correct format
5. Outputs a TypeScript file ready to use

## Questions to Answer:

1. **What columns are in your Excel file?** (Please list them)
2. **How are service areas stored?** 
   - Separate columns for regions/counties/cities?
   - One column with comma-separated values?
   - Multiple rows per roofer?
3. **Which roofers are "Preferred"?** 
   - Is there a column for this?
   - Or a specific list?
4. **Do you have logos?** 
   - Are they URLs in the Excel?
   - Or separate image files?

## After Data Import

Once the data is imported, the roofers will automatically appear on:
- `/roofers` - Main listing page (preferred first)
- `/roofers/[slug]` - Individual profiles
- Service area pages (when integrated)

Let me know how you'd like to proceed!

















