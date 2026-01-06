# Outscraper Quick Start Guide

The fastest way to find Google Business Profiles for all 678 remaining roofers.

## Why Outscraper?

- ✅ **Free tier**: First 500 searches free
- ✅ **Fast**: Processes 684 roofers in 1-2 hours
- ✅ **Easy**: Simple web interface
- ✅ **Cost-effective**: $29/month for 5,000 searches (covers all roofers)

## Step-by-Step Instructions

### 1. Sign Up for Outscraper

1. Go to https://outscraper.com
2. Click "Sign Up" (free account)
3. Verify your email

### 2. Prepare Your Data (Already Done!)

The input file is already created:
- **File**: `data/roofers/bulk-search/outscraper-input.csv`
- **Contains**: 678 roofers with search queries

### 3. Use Outscraper Web Interface

#### Option A: Google Maps Search Tool (Recommended)

1. **Go to Google Maps Search:**
   - Navigate to: https://outscraper.com/google-maps-scraper/
   - Or: Dashboard → Tools → Google Maps Search

2. **Upload CSV:**
   - Click "Upload CSV" or "Import from CSV"
   - Select: `data/roofers/bulk-search/outscraper-input.csv`
   - The CSV has columns: `query`, `location`

3. **Configure Output:**
   - Enable these fields:
     - ✅ Name
     - ✅ Phone
     - ✅ Address
     - ✅ URL (Google Maps URL) - **IMPORTANT**
     - ✅ Website (optional)
     - ✅ Rating (optional)
     - ✅ Reviews count (optional)

4. **Run the Search:**
   - Click "Start" or "Run"
   - Wait for processing (1-2 hours for 678 searches)

5. **Download Results:**
   - Once complete, click "Download"
   - Save as: `data/roofers/bulk-search/outscraper-results.csv`

#### Option B: Google Maps API (For Developers)

If you have an API key:

1. **Get API Key:**
   - Go to: https://outscraper.com/api-keys
   - Create a new API key
   - Copy the key

2. **Set Environment Variable:**
   ```bash
   export OUTSCRAPER_API_KEY='your-api-key-here'
   ```

3. **Run the Script:**
   ```bash
   python3 scripts/outscraper-api-search.py
   ```

### 4. Process Results

After downloading results from Outscraper:

```bash
python3 scripts/process-bulk-results.py data/roofers/bulk-search/outscraper-results.csv outscraper
```

This will:
- Read the Outscraper results
- Extract Google Business URLs
- Match them to roofers
- Update `app/roofers/data/roofers.ts`

### 5. Verify Results

1. **Check Progress:**
   ```bash
   python3 scripts/find-all-google-profiles.py
   ```
   Should show most roofers now have Google URLs

2. **Check Roofer Pages:**
   - Visit `/roofers/[slug]` for any roofer
   - You should see "Leave a Review on Google" button if URL is set

## Pricing

### Free Tier
- **500 searches free** (first-time users)
- Enough for ~500 roofers
- Remaining 178 can be done next month or upgrade

### Paid Plans
- **Starter ($29/month)**: 5,000 searches/month
  - Perfect for all 678 roofers
  - Can cancel after one month
  - Total cost: $29

- **Professional ($99/month)**: 25,000 searches/month
  - If you need more searches later

## Expected Results

After processing:
- ✅ ~80-90% of roofers will have Google Business URLs
- ⚠️ Some businesses may not have Google Business Profiles
- ⚠️ Some may need manual verification

## Troubleshooting

### No Results for Some Roofers

Some businesses may not have Google Business Profiles. You can:
1. Manually search for them
2. Add URLs via `/admin/roofers`
3. Leave them without URLs (they'll show empty state)

### URL Format Issues

The processing script automatically:
- Cleans URLs
- Removes query parameters
- Extracts place URLs

### Matching Issues

If results don't match:
- Check that phone numbers match
- Verify business names are similar
- Some may need manual matching

## Alternative: Use Free Tier Over Time

If you want to avoid paying:
1. Use free 500 searches this month
2. Process 500 roofers
3. Next month, use another 500 free searches
4. Process remaining 178 roofers

## Next Steps After Finding URLs

1. **Add Reviews:**
   - Use `/admin/reviews` to add reviews manually
   - Or use Outscraper to scrape reviews (separate tool)

2. **Verify All URLs:**
   - Check a sample of roofer pages
   - Ensure links work correctly

3. **Update Missing URLs:**
   - For roofers without URLs, manually search
   - Or use the admin interface to add them

## Files Reference

- **Input**: `data/roofers/bulk-search/outscraper-input.csv`
- **Results**: `data/roofers/bulk-search/outscraper-results.csv` (after download)
- **Script**: `scripts/process-bulk-results.py`
- **API Script**: `scripts/outscraper-api-search.py` (optional)

## Support

- **Outscraper Docs**: https://outscraper.com/docs/
- **Outscraper Support**: support@outscraper.com
- **This Project**: Check `BULK-GOOGLE-SEARCH-GUIDE.md` for more details
















