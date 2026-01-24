# Yelp Review Analysis Setup Guide

This guide explains how to find each roofer on Yelp and analyze their reviews, including star ratings and positive/negative review categorization.

## Overview

There are three methods available:

1. **Yelp API Method** (`find-yelp-reviews-api.py`) - ⭐ **RECOMMENDED** - Requires API key, fastest and most reliable
2. **Manual Entry Method** (`find-yelp-manual.py`) - No API key needed, you manually enter Yelp URLs
3. **Web Scraping Method** (`find-yelp-reviews.py`) - May be blocked by Yelp (403 errors)

## Method 1: Yelp API (Recommended)

### Setup

1. Get a Yelp API key:
   - Go to https://www.yelp.com/developers
   - Sign up or log in
   - Create a new app
   - Copy your API key

2. Set the API key as an environment variable:
```bash
export YELP_API_KEY='your-api-key-here'
```

Or pass it as an argument:
```bash
python3 find-yelp-reviews-api.py --api-key your-api-key-here
```

3. Install required Python packages:
```bash
pip install -r requirements-yelp.txt
```

Or manually:
```bash
pip install requests
```

4. Run the script:
```bash
cd data/roofers
python3 find-yelp-reviews-api.py
```

### Options

- `--api-key KEY` - Yelp API key (or set YELP_API_KEY env var)
- `--limit N` - Process only first N roofers
- `--reset` - Reset progress and start from beginning

### Example

```bash
# Test with first 10 roofers
python3 find-yelp-reviews-api.py --limit 10

# Process all roofers
python3 find-yelp-reviews-api.py
```

## Method 2: Manual Entry (No API Key Required)

This method prompts you to manually find and enter Yelp URLs for each roofer.

### Setup

1. Install required Python packages:
```bash
pip install -r requirements-yelp.txt
```

Or manually:
```bash
pip install requests beautifulsoup4
```

2. Run the script:
```bash
cd data/roofers
python3 find-yelp-manual.py
```

### How It Works

1. Script shows you a roofer name and location
2. You search for them on Yelp in your browser
3. Copy and paste the Yelp business URL
4. Script automatically extracts ratings and reviews
5. Press Enter to skip roofers you can't find

### Options

- `--limit N` - Process only first N roofers
- `--start-from N` - Start from a specific index

### Example

```bash
# Process first 10 roofers
python3 find-yelp-manual.py --limit 10

# Resume from roofer #50
python3 find-yelp-manual.py --start-from 50
```

## Method 3: Web Scraping (May Be Blocked)

### Setup

1. Install required Python packages:
```bash
pip install -r requirements-yelp.txt
```

Or manually:
```bash
pip install requests beautifulsoup4
```

2. Run the script:
```bash
cd data/roofers
python3 find-yelp-reviews.py
```

### Options

- `--limit N` - Process only first N roofers (useful for testing)
- `--reset` - Reset progress and start from beginning

### Example

```bash
# Process first 10 roofers as a test
python3 find-yelp-reviews.py --limit 10

# Process all roofers (will take several hours)
python3 find-yelp-reviews.py
```

## Method 3: Web Scraping (May Be Blocked)

### Setup

1. Get a Yelp API key:
   - Go to https://www.yelp.com/developers
   - Sign up or log in
   - Create a new app
   - Copy your API key

2. Set the API key as an environment variable:
```bash
export YELP_API_KEY='your-api-key-here'
```

Or pass it as an argument:
```bash
python3 find-yelp-reviews-api.py --api-key your-api-key-here
```

3. Install required Python packages:
```bash
pip install -r requirements-yelp.txt
```

Or manually:
```bash
pip install requests
```

4. Run the script:
```bash
cd data/roofers
python3 find-yelp-reviews-api.py
```

### Options

- `--api-key KEY` - Yelp API key (or set YELP_API_KEY env var)
- `--limit N` - Process only first N roofers
- `--reset` - Reset progress and start from beginning

### Example

```bash
# Test with first 10 roofers
python3 find-yelp-reviews-api.py --limit 10

# Process all roofers
python3 find-yelp-reviews-api.py
```

## Output Files

Both methods generate:

1. **`yelp-reviews-analysis.json`** - Complete analysis data with:
   - Star ratings
   - Review counts
   - Positive reviews (categorized)
   - Negative reviews (categorized)
   - Yelp URLs

2. **`yelp-progress.json`** - Progress tracking (allows resuming if interrupted)

## Generating Reports

After running the analysis, generate a comprehensive report:

```bash
python3 generate-yelp-report.py
```

This creates:
- **`yelp-analysis-report.md`** - Markdown report with detailed analysis
- Optionally: **`yelp-summary.csv`** - CSV summary (use `--csv` flag)

### Report Features

- Summary statistics
- Rating distribution
- Detailed results for each roofer with:
  - Overall star rating
  - Positive reviews section
  - Negative reviews section
- List of roofers not found on Yelp

### Example

```bash
# Generate markdown report
python3 generate-yelp-report.py

# Generate both markdown and CSV
python3 generate-yelp-report.py --csv
```

## Data Structure

Each roofer entry includes:

```json
{
  "name": "Company Name",
  "city": "City",
  "state": "FL",
  "phone": "123-456-7890",
  "website": "example.com",
  "yelp_found": true,
  "yelp_url": "https://www.yelp.com/biz/...",
  "star_rating": 4.5,
  "review_count": 25,
  "review_analysis": {
    "positive": [
      {
        "text": "Great service!",
        "rating": 5,
        "sentiment_score": 3
      }
    ],
    "negative": [
      {
        "text": "Poor communication",
        "rating": 2,
        "sentiment_score": -2
      }
    ],
    "total_analyzed": 25
  }
}
```

## Resuming Interrupted Runs

Both scripts automatically save progress. If interrupted:

1. Simply run the script again - it will resume from where it left off
2. To start over, use the `--reset` flag

## Rate Limiting

- **Web Scraping**: 2 second delay between requests (configurable in script)
- **API Method**: 0.5 second delay (Yelp API allows 5000 requests/day)

## Troubleshooting

### Web Scraping Method

- If you get blocked, increase `DELAY_BETWEEN_REQUESTS` in the script
- Yelp may change their HTML structure - you may need to update selectors

### API Method

- Check your API key is valid
- Monitor your API usage at https://www.yelp.com/developers
- If you hit rate limits, the script will automatically wait

## Next Steps

1. Run the analysis script
2. Generate the report
3. Review the markdown report for insights
4. Use the CSV for data analysis in Excel/Google Sheets

















