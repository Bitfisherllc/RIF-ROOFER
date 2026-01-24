# Bulk Import Google Reviews - Free Methods

Here are **free ways** to get Google reviews for all your roofers:

## Method 1: Outscraper (Free Tier - 500 reviews/month) ⭐ RECOMMENDED

### Setup:
1. **Sign up** at [Outscraper.com](https://outscraper.com) (free account)
2. **Get API key** from dashboard
3. **Add to `.env.local`**:
   ```bash
   OUTSCRAPER_API_KEY=your-free-api-key-here
   ```
4. **Add Google Business URLs** to roofers in `roofers.ts`:
   ```typescript
   googleBusinessUrl: 'https://www.google.com/maps/place/...'
   ```

### Run:
```bash
python3 scripts/fetch-google-reviews-free.py
```

**Free tier:** 500 reviews/month - enough for ~10-20 roofers

---

## Method 2: Apify (Free $5/month credits)

### Setup:
1. Sign up at [Apify.com](https://apify.com) (free account)
2. Use [Google Maps Reviews Scraper](https://apify.com/compass/google-maps-reviews-scraper)
3. $5 free credits = ~8,000 reviews/month

### Process:
1. For each roofer, get their Google Maps URL
2. Run scraper with the URL
3. Export results as CSV
4. Import via `/admin/reviews` → Import CSV

---

## Method 3: Manual CSV Import (100% Free)

### Step 1: Find Reviews on Google Maps

For each roofer:
1. Go to [Google Maps](https://www.google.com/maps)
2. Search: `[Roofer Name] [City]`
3. Click on their business
4. Scroll to reviews section
5. Copy each review:
   - Reviewer name
   - Star rating
   - Review text
   - Date

### Step 2: Create CSV

Use the template: `data/roofers/reviews-import-template.csv`

Format:
```csv
rooferId,reviewerName,rating,reviewText,reviewDate,googleReviewUrl
"2","John Smith",5,"Great service!","2024-01-15","https://..."
"2","Jane Doe",4,"Good work","2024-01-10","https://..."
```

### Step 3: Import

1. Go to `/admin/reviews`
2. Click "Import CSV"
3. Select your CSV file
4. Done!

---

## Method 4: Kimola (Free Tool)

1. Go to [Kimola.com](https://kimola.com/scrape-and-analyze-google-business-reviews)
2. Enter Google Maps URL
3. Download results as Excel
4. Convert to CSV and import

**Free:** Unlimited (with some limitations)

---

## Quick Start Guide

### For 10-20 Roofers (Outscraper Free Tier):

1. **Get Outscraper API key** (free signup)
2. **Add Google Business URLs** to your roofers
3. **Run the script**: `python3 scripts/fetch-google-reviews-free.py`
4. **Reviews appear automatically!**

### For All 685 Roofers (Manual CSV):

1. **Prioritize**: Start with preferred roofers
2. **Batch process**: Do 20-30 at a time
3. **Use CSV template**: Faster than manual entry
4. **Import weekly**: Keep reviews updated

---

## Finding Google Business URLs

For each roofer:
1. Search Google Maps: `[Company Name] [City, FL]`
2. Click on the business listing
3. Copy the URL from address bar
4. Add to `roofers.ts` as `googleBusinessUrl`

Example:
```typescript
'roofer-slug': {
  // ... other fields ...
  googleBusinessUrl: 'https://www.google.com/maps/place/ABC+Roofing/@27.9506,-82.4572,17z',
}
```

---

## Which Method Should I Use?

- **Small scale (10-50 roofers)**: Outscraper free tier
- **Medium scale (50-200 roofers)**: Apify free credits
- **Large scale (all 685)**: Manual CSV import (batch process)
- **Ongoing updates**: Use Outscraper or Apify monthly

---

## Need Help?

1. **I can help you** set up Outscraper integration
2. **I can create** a bulk CSV from Google Maps URLs
3. **I can add** more automation tools

Let me know which method you want to use!

















