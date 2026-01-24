# Quick Start: Yelp Review Analysis

## Quick Setup (5 minutes)

### Option 1: Yelp API (Recommended - Fastest & Most Reliable) ⭐

1. Get API key from https://www.yelp.com/developers (free)
2. Set it:
```bash
export YELP_API_KEY='your-key-here'
```
3. Run:
```bash
cd data/roofers
pip install -r requirements-yelp.txt
python3 find-yelp-reviews-api.py --limit 10  # Test first
```

### Option 2: Manual Entry (No API Key Needed)

You manually find and paste Yelp URLs - script extracts reviews automatically:

```bash
cd data/roofers
pip install -r requirements-yelp.txt
python3 find-yelp-manual.py --limit 10  # Test first
```

## Generate Report

After analysis completes:

```bash
python3 generate-yelp-report.py --csv
```

This creates:
- `yelp-analysis-report.md` - Detailed markdown report
- `yelp-summary.csv` - Spreadsheet-friendly summary

## What You Get

For each roofer:
- ✅ Overall Yelp star rating
- ✅ Total review count
- ✅ Positive reviews section (categorized)
- ✅ Negative reviews section (categorized)
- ✅ Yelp profile URL

## Full Documentation

See `YELP-SETUP.md` for complete details.

















