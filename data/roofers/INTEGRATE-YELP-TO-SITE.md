# How to Display Yelp Reviews on Your Website

## Overview

After scraping Yelp reviews, you can display them on your roofer profile pages. The integration is already set up - you just need to import your scraped data.

## Quick Steps

### 1. Scrape Yelp Reviews

First, scrape Yelp reviews using the scraper:

```bash
cd data/roofers
python3 scrape-yelp-reviews.py
```

This creates `yelp-reviews-analysis.json` with all the scraped data.

### 2. Import to Site

Run the import script to convert Yelp data to TypeScript:

```bash
python3 import-yelp-to-site.py
```

This generates/updates `app/roofers/data/yelp-reviews.ts`

### 3. Map Roofer IDs

**IMPORTANT:** You need to manually map roofer names to roofer IDs:

1. Open `app/roofers/data/roofers.ts` to see roofer IDs
2. Open `app/roofers/data/yelp-reviews.ts` 
3. For each roofer, replace:
   - The key (currently roofer name) with the roofer ID
   - `rooferId: 'PLACEHOLDER_ID'` with the actual roofer ID

**Example:**

Before:
```typescript
'1-roof-llc': {
  rooferId: 'PLACEHOLDER_ID',
  ...
}
```

After (if roofer ID is '2'):
```typescript
'2': {
  rooferId: '2',
  ...
}
```

### 4. View on Site

Once mapped, Yelp reviews will automatically appear on roofer profile pages at:
- `/roofers/[roofer-slug]`

The Yelp section will show:
- ⭐ Star rating
- 📝 Synopsis
- ✅ Positive reviews
- ❌ Negative reviews
- Link to Yelp profile

## What Gets Displayed

For each roofer with Yelp data, the site shows:

1. **Yelp Reviews Section** (after Google Reviews)
   - Overall star rating
   - Total review count
   - Synopsis/summary
   - Top 3 positive reviews
   - Top 3 negative reviews
   - Link to full Yelp profile

2. **Automatic Display**
   - Only shows if roofer has Yelp reviews
   - Matches the design of Google Reviews section
   - Responsive and mobile-friendly

## Files Created

- ✅ `app/roofers/data/yelp-reviews.ts` - Yelp reviews data
- ✅ `components/YelpReviewSummary.tsx` - Display component
- ✅ Updated `app/roofers/[slug]/page.tsx` - Integration

## Testing

1. Make sure you have at least one roofer with Yelp data
2. Map the roofer ID correctly
3. Start your dev server: `npm run dev`
4. Visit: `http://localhost:3000/roofers/[roofer-slug]`
5. Scroll down to see Yelp Reviews section

## Troubleshooting

### Yelp section not showing
- Check that roofer ID is correctly mapped
- Verify `hasYelpReviews()` returns true
- Check browser console for errors

### Reviews not displaying
- Verify `yelp-reviews-analysis.json` has data
- Check that import script ran successfully
- Ensure roofer IDs match between `roofers.ts` and `yelp-reviews.ts`

### Need to update reviews
1. Re-scrape Yelp: `python3 scrape-yelp-reviews.py`
2. Re-import: `python3 import-yelp-to-site.py`
3. Re-map IDs if needed
4. Restart dev server

## Next Steps

- Scrape more roofers: `python3 scrape-yelp-reviews.py`
- Import new data: `python3 import-yelp-to-site.py`
- Map new roofer IDs
- View on site!
















