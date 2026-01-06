# Finding Google Business Profiles for All Roofers

This guide explains how to systematically find Google Business Profile URLs for all 684 roofers.

## Current Status

- **Total Roofers**: 684
- **With Google URL**: 1 (1 ROOF LLC)
- **Needing Google URL**: 683

## Quick Start

### Option 1: Use Batch Processing (Recommended)

1. **Create a batch to process:**
   ```bash
   python3 scripts/process-google-profiles-batch.py 1 20
   ```
   This creates `data/roofers/batch-1-to-process.json` with 20 roofers.

2. **Process each roofer in the batch:**
   - Open `data/roofers/batch-1-to-process.json`
   - For each roofer, copy their `googleMapsSearchUrl`
   - Open the URL in your browser
   - Find the business listing
   - Copy the Google Business Profile URL from the address bar

3. **Add found URLs to the update file:**
   Edit `data/roofers/found-google-urls.json` and add entries:
   ```json
   [
     {
       "slug": "1-roof-llc",
       "googleBusinessUrl": "https://www.google.com/maps/place/1+Roof+LLC/@30.0765199,-81.4516127,17z/data=!3m1!4b1!4m6!3m5!1s0x88e4320d5f34a7d3:0x8c9b534e560f18db!8m2!3d30.0765199!4d-81.4490378!16s%2Fg%2F11fx2ysy1y"
     },
     {
       "slug": "3mg-roofing-llc",
       "googleBusinessUrl": "https://www.google.com/maps/place/..."
     }
   ]
   ```

4. **Update the roofer data:**
   ```bash
   python3 scripts/batch-update-google-urls.py
   ```

5. **Process the next batch:**
   ```bash
   python3 scripts/process-google-profiles-batch.py 2 20
   ```

### Option 2: Use Admin Interface

1. Go to `/admin/roofers`
2. Search for a roofer
3. Click "Add" next to "Google Business"
4. Search Google Maps for the business
5. Copy and paste the URL
6. Click "Save"

### Option 3: Use Bulk Service (For Large Scale)

For processing all 684 roofers efficiently, consider using a service like:

- **Outscraper** (https://outscraper.com) - Google Maps scraper
- **Apify** (https://apify.com) - Google Maps scraper
- **ScraperAPI** (https://www.scraperapi.com) - Web scraping API

These services can find Google Business Profile URLs in bulk, but require API keys and may have costs.

## Tips for Finding Google Business Profiles

1. **Use the exact business name** from the roofer data
2. **Include phone number** in search: `"[Business Name]" "[Phone]" Florida`
3. **Try variations** if not found:
   - With/without "LLC", "INC", "CORP"
   - Abbreviated vs full company name
   - With/without city name
4. **Check the business website** - many link to their Google Business Profile
5. **Use Google Maps directly** - more reliable than Google Search

## URL Format

Google Business Profile URLs typically look like:
```
https://www.google.com/maps/place/Business+Name/@LAT,LNG,Z/data=!3m1!4b1!4m6!3m5!1sPLACE_ID...
```

You can use the full URL or just the base URL:
```
https://www.google.com/maps/place/Business+Name/@LAT,LNG,Z
```

## Progress Tracking

After each batch update, check progress:
```bash
python3 scripts/find-all-google-profiles.py
```

This will show how many roofers still need URLs.

## Files Reference

- **All Roofers Search Data**: `data/roofers/all-google-profiles-search.json`
- **Found URLs**: `data/roofers/found-google-urls.json`
- **Batch Files**: `data/roofers/batch-N-to-process.json`
- **Update Script**: `scripts/batch-update-google-urls.py`
- **Batch Creator**: `scripts/process-google-profiles-batch.py`

## Automation Ideas

If you want to automate this further:

1. **Browser Extension**: Create a Chrome extension that extracts Google Business URLs
2. **Selenium Script**: Use Selenium to automate browser searches
3. **API Service**: Use Outscraper or similar service for bulk processing
4. **Manual Team**: Have a team member process 20-50 roofers per day

## Next Steps After Finding URLs

Once you have Google Business URLs:

1. **Add Reviews**: Use `/admin/reviews` to add reviews manually
2. **Import Reviews**: Use CSV import or scraping services to bulk import reviews
3. **Verify Links**: Check that "Leave a Review" buttons appear on roofer profile pages

## Estimated Time

- **Manual Processing**: ~2-3 minutes per roofer = ~20-30 hours for all 684
- **Batch Processing**: ~1 hour per batch of 20 = ~35 hours total
- **With Automation**: Significantly faster, but requires setup

## Questions?

If a business doesn't have a Google Business Profile:
- They may need to create one at https://business.google.com
- Some businesses operate without Google Business Profiles
- You can still add reviews manually via the admin interface
















