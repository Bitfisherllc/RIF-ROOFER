# Yelp Review Scraping Guide (No API Required)

## Overview

This solution scrapes Yelp reviews directly from web pages, analyzes them, and provides:
- ⭐ **Star Rating** - Overall Yelp rating
- 📝 **Synopsis** - AI-generated summary of reviews
- ✅ **Positive Reviews** - Categorized positive feedback
- ❌ **Negative Reviews** - Categorized negative feedback

## Quick Start

### 1. Install Dependencies

```bash
cd "/Volumes/Whale/_CLIENTS/Florida Roofers/data/roofers"
pip install requests beautifulsoup4
```

### 2. Run the Scraper

```bash
python3 scrape-yelp-reviews.py --limit 10  # Test with 10 roofers first
```

### 3. How It Works

For each roofer:
1. Script shows you the roofer name and location
2. **You search for them on Yelp** in your browser
3. **Copy and paste the Yelp business URL** when prompted
4. Script automatically:
   - Scrapes the Yelp page
   - Extracts star rating
   - Extracts all reviews
   - Analyzes sentiment (positive/negative)
   - Generates a synopsis
5. Press Enter to skip roofers you can't find

### 4. Generate Report

After scraping:

```bash
python3 generate-yelp-report-scraped.py --csv
```

This creates:
- `yelp-analysis-report.md` - Full report with synopsis
- `yelp-summary.csv` - Spreadsheet format

## Example Workflow

```
[1/10] Processing: 1 ROOF LLC
  Location: Ponte Vedra, FL
==========================================================
Please find this roofer on Yelp:
  Search: https://www.yelp.com/search?find_desc=1+ROOF+LLC+roofing&find_loc=Ponte+Vedra

Then copy and paste the Yelp business URL here.
Example: https://www.yelp.com/biz/company-name-city
(Press Enter to skip this roofer)

Yelp URL: https://www.yelp.com/biz/1-roof-llc-ponte-vedra

  📥 Fetching: https://www.yelp.com/biz/1-roof-llc-ponte-vedra
  ✅ Rating: 4.8 stars
  ✅ Reviews: 23 total
  ✅ Analysis: 5 positive, 1 negative
  ✅ Synopsis: Highly rated with 83% positive reviews. Common themes include: professionalism, punctuality...
```

## What You Get

Each roofer entry includes:

```json
{
  "name": "1 ROOF LLC",
  "star_rating": 4.8,
  "review_count": 23,
  "synopsis": "Highly rated with 83% positive reviews. Common themes include: professionalism, punctuality, work quality. Overall sentiment is very positive. Customers frequently recommend this business.",
  "review_analysis": {
    "positive": [
      {
        "text": "Excellent service! Professional and on time...",
        "rating": 5,
        "sentiment_score": 4
      }
    ],
    "negative": [
      {
        "text": "Had some delays in the project timeline...",
        "rating": 3,
        "sentiment_score": -1
      }
    ],
    "total_analyzed": 20
  }
}
```

## Options

```bash
# Process first 10 roofers (testing)
python3 scrape-yelp-reviews.py --limit 10

# Process all roofers
python3 scrape-yelp-reviews.py

# Resume from roofer #50
python3 scrape-yelp-reviews.py --start-from 50
```

## Tips

1. **Batch Processing**: Process 20-50 roofers at a time
2. **Skip Unknown**: Press Enter to skip roofers you can't find
3. **Progress Saves**: Progress saves automatically after each roofer
4. **Resume Anytime**: Can pause (Ctrl+C) and resume later
5. **Search Tips**: Use the provided search URL to find roofers quickly

## Troubleshooting

### "Error fetching page"
- Check the Yelp URL is correct
- Make sure the business page exists
- Try refreshing the page in your browser first

### "No reviews extracted"
- Yelp may have changed their page structure
- The business might not have reviews yet
- Rating will still be captured if available

### Rate Limiting
- Script includes delays between requests
- If you get blocked, wait a few minutes and resume

## Output Files

- `yelp-reviews-analysis.json` - Complete data with all analysis
- `yelp-scrape-progress.json` - Progress tracking
- `yelp-analysis-report.md` - Generated markdown report
- `yelp-summary.csv` - Spreadsheet summary

## Next Steps

1. Test with 10 roofers: `python3 scrape-yelp-reviews.py --limit 10`
2. Review the output in `yelp-reviews-analysis.json`
3. Generate report: `python3 generate-yelp-report-scraped.py --csv`
4. If satisfied, process all roofers: `python3 scrape-yelp-reviews.py`
















