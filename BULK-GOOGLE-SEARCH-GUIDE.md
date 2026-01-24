# Bulk Google Business Profile Search Guide

This guide explains how to use bulk services (Outscraper or Apify) to find Google Business Profiles for all 684 roofers efficiently.

## Quick Start

1. **Prepare the data:**
   ```bash
   python3 scripts/prepare-bulk-search.py
   ```
   This creates input files in `data/roofers/bulk-search/`

2. **Choose a service and upload the file**

3. **Download results and process:**
   ```bash
   python3 scripts/process-bulk-results.py <results_file> <format>
   ```

## Option 1: Outscraper (Recommended)

### Why Outscraper?
- Easy to use web interface
- Good free tier (100 searches/month)
- Fast processing
- Direct CSV export

### Steps:

1. **Sign up at https://outscraper.com**
   - Free tier: 100 searches/month
   - Paid plans available for more searches

2. **Go to Google Maps Search tool:**
   - Navigate to: https://outscraper.com/google-maps-scraper/
   - Or search for "Google Maps Search" in Outscraper dashboard

3. **Upload the CSV:**
   - Use: `data/roofers/bulk-search/outscraper-input.csv`
   - The CSV has columns: `query`, `location`

4. **Configure the search:**
   - Set output format to CSV
   - Enable fields: `name`, `phone`, `url` (Google Maps URL)
   - Run the search

5. **Download results:**
   - Download the CSV results
   - Save to: `data/roofers/bulk-search/outscraper-results.csv`

6. **Process results:**
   ```bash
   python3 scripts/process-bulk-results.py data/roofers/bulk-search/outscraper-results.csv outscraper
   ```

### Outscraper Pricing:
- **Free**: 100 searches/month
- **Starter ($29/month)**: 5,000 searches/month
- **Professional ($99/month)**: 25,000 searches/month

For 684 roofers, you'll need at least the Starter plan ($29) or use free tier over multiple months.

## Option 2: Apify

### Why Apify?
- More powerful scraping capabilities
- Good for complex searches
- Pay-per-use pricing

### Steps:

1. **Sign up at https://apify.com**
   - Free tier available
   - Pay-per-use pricing

2. **Use Google Maps Scraper:**
   - Search for "Google Maps Scraper" in Apify store
   - Or use: https://apify.com/apify/google-maps-scraper

3. **Upload the JSON:**
   - Use: `data/roofers/bulk-search/apify-input.json`
   - The JSON contains search queries with business details

4. **Configure the scraper:**
   - Set input format to match our JSON structure
   - Enable output fields: `name`, `phone`, `url`
   - Run the scraper

5. **Download results:**
   - Download the JSON results
   - Save to: `data/roofers/bulk-search/apify-results.json`

6. **Process results:**
   ```bash
   python3 scripts/process-bulk-results.py data/roofers/bulk-search/apify-results.json apify
   ```

### Apify Pricing:
- Pay-per-use: ~$0.10-0.50 per search
- For 684 roofers: ~$68-342 one-time cost
- Or use free credits if available

## Option 3: Manual CSV Processing

If you prefer to manually fill in Google Business URLs or use another service:

1. **Use the manual CSV:**
   - File: `data/roofers/bulk-search/manual-input.csv`
   - Contains all roofer data with empty `google_business_url` column

2. **Fill in Google Business URLs:**
   - Open in Excel/Google Sheets
   - For each roofer, find their Google Business Profile
   - Paste the URL in the `google_business_url` column

3. **Process results:**
   ```bash
   python3 scripts/process-bulk-results.py data/roofers/bulk-search/manual-input.csv manual
   ```

## Processing Results

After downloading results from any service:

```bash
# For Outscraper CSV
python3 scripts/process-bulk-results.py data/roofers/bulk-search/outscraper-results.csv outscraper

# For Apify JSON
python3 scripts/process-bulk-results.py data/roofers/bulk-search/apify-results.json apify

# For manual CSV
python3 scripts/process-bulk-results.py data/roofers/bulk-search/manual-input.csv manual
```

The script will:
1. Read the results file
2. Extract Google Business URLs
3. Match them to roofers by slug/ID
4. Update `app/roofers/data/roofers.ts` with the URLs

## Expected Results

After processing, you should see:
- ✅ All roofers with Google Business URLs updated
- ✅ "Leave a Review" buttons appearing on roofer profile pages
- ✅ Ability to add reviews via `/admin/reviews`

## Troubleshooting

### No URLs found in results
- Check that the results file contains URL fields
- Verify the format matches expected structure
- Check that slug/ID matching is working

### Some roofers still missing URLs
- Some businesses may not have Google Business Profiles
- You can manually add URLs via `/admin/roofers`
- Or continue searching for those specific businesses

### URL format issues
- The script automatically cleans URLs
- Removes query parameters
- Extracts place URLs from search URLs

## Cost Comparison

| Service | Cost for 684 roofers | Speed |
|---------|---------------------|-------|
| **Outscraper (Starter)** | $29/month | ~1-2 hours |
| **Apify (Pay-per-use)** | ~$68-342 one-time | ~2-4 hours |
| **Manual** | Free | ~20-30 hours |
| **Individual search** | Free | ~23-34 hours |

## Recommendation

For 684 roofers, I recommend **Outscraper Starter plan ($29/month)**:
- Fastest option
- Most cost-effective for bulk processing
- Easy to use
- Can cancel after one month

## Next Steps After Finding URLs

1. **Add Reviews:**
   - Use `/admin/reviews` to manually add reviews
   - Or import reviews via CSV
   - Or use scraping services to import reviews

2. **Verify URLs:**
   - Check roofer profile pages
   - Ensure "Leave a Review" buttons appear
   - Test that links work correctly

3. **Monitor Progress:**
   - Check how many roofers have URLs
   - Track which ones still need URLs
   - Continue processing in batches if needed

## Files Reference

- **Input Files**: `data/roofers/bulk-search/`
  - `outscraper-input.csv` - For Outscraper
  - `apify-input.json` - For Apify
  - `manual-input.csv` - For manual processing

- **Scripts**:
  - `scripts/prepare-bulk-search.py` - Creates input files
  - `scripts/process-bulk-results.py` - Processes results

- **Documentation**:
  - This guide
  - Service-specific documentation on Outscraper/Apify websites

















