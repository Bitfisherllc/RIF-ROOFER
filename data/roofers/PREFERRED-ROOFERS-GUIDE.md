# Guide to Identifying Preferred Roofers

## Analysis Summary

Based on the analysis of 686 roofers, here are the findings:

### Key Findings:

1. **1 Roofer with "Preferred" in name:**
   - AMERICAS PREFERRED ROOFERS INC

2. **485 Roofers with complete contact info** (Phone + Email + Website)

3. **529 Roofers with professional email domains** (not gmail/yahoo/hotmail)

4. **486 Roofers with websites**

5. **196 Roofers in major metro areas** (Tampa, Miami, Orlando, Jacksonville, etc.)

### Recommended Approach:

Since RIF "Preferred Roofing Contractors" are supposed to be:
- Vetted
- Trained on specific products
- Meet higher standards for installation quality
- Code compliance
- Professionalism

**You should manually select roofers based on:**
1. **Your actual business relationships** - Which roofers do you actually work with?
2. **Training/certification** - Which roofers have been trained on your products?
3. **Quality standards** - Which roofers meet your quality requirements?
4. **Geographic coverage** - Which roofers cover key service areas?

## How to Mark Roofers as Preferred

### Option 1: Use the Interactive Script
```bash
cd data/roofers
python3 mark-preferred.py
```

### Option 2: Manual Edit
Edit `/app/roofers/data/roofers.ts` and find the roofer entry, then change:
```typescript
"isPreferred": false,
```
to:
```typescript
"isPreferred": true,
```

### Option 3: Bulk Mark by Name List
Create a text file with roofer names (one per line) and use the script.

## Suggested Starting List

Based on the analysis, here are some **strong candidates** to consider:

### High-Profile Candidates:
1. **AMERICAS PREFERRED ROOFERS INC** - Has "Preferred" in name
2. **ADVANCED ROOFING INC** - Major company, complete profile
3. **AMERICAN ROOFING & SHEET METAL INC** - Established, Tampa area
4. **ADERHOLD ROOFING CORP** - Tampa, complete profile
5. **ELITE ROOFING INC** - West Palm Beach, professional
6. **PREMIUM ROOFING SYSTEMS LLC** - Has "Premium" in name

### By Major City (Top candidates per city):

**Tampa Area:**
- ADERHOLD ROOFING CORP
- AMERICAN ROOFING & SHEET METAL INC
- ALLIED ROOFING INC
- TAMPA ROOFING CO INC

**Orlando Area:**
- ARCHITECTURAL SHEET METAL INC
- ALPHA ROOFING & SHEET METAL LLC
- DIMENSIONAL ROOF SYSTEMS

**Miami Area:**
- 4TH GENERATION ROOFING & SHEET METAL LLC
- ACE PROPERTY SERVICES
- AJF ROOFING INC

**Jacksonville Area:**
- ADVOCATE RESTORATION LLC
- ALL PRO ROOFING & CONSULTING LLC
- JOHN GILMORE ROOFING INC

## Next Steps

1. **Review your actual business records** - Which roofers are you actually working with?
2. **Check training records** - Which roofers have completed RIF training?
3. **Select 10-20 roofers initially** - Start with a manageable number
4. **Test the website** - See how preferred roofers appear
5. **Expand gradually** - Add more as you verify relationships

## Files Created

- `preferred-candidates.json` - Full list of 476 candidates
- `analyze-preferred.py` - Analysis script (run again anytime)
- `mark-preferred.py` - Interactive marking tool

















