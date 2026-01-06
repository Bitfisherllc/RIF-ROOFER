# Guide: Finding Google Business Profiles and Reviews

This guide explains how to find Google Business Profiles for each roofing company and populate their reviews.

## Overview

The system is designed to:
1. **Find Google Business Profiles** for each roofer using business name, phone, and location
2. **Display review summaries** on roofer profile pages
3. **Show "Leave a Review" links** for businesses without reviews (if Google Business URL is set)

## Step 1: Find Google Business Profile URLs

### Option A: Use the Admin Interface (Recommended)

1. Go to `/admin/roofers`
2. For each roofer, click "Add" or "Edit" next to "Google Business"
3. Search for the business on Google Maps:
   - Open a new tab
   - Go to Google Maps
   - Search for: `[Business Name] [Phone] [City] Florida`
   - Click on the business listing
   - Copy the URL from the address bar
4. Paste the URL into the admin interface and click "Save"

### Option B: Use the Search Script

1. Run the search script to generate Google Maps URLs:
   ```bash
   python3 scripts/search-google-profiles.py
   ```
2. This creates `data/roofers/google-profiles-to-find.json` with search URLs
3. Open each URL in your browser
4. Find the business and copy the Google Business Profile URL
5. Update via admin interface or batch update (see below)

### Option C: Batch Update

1. Create `data/roofers/google-urls-updates.json`:
   ```json
   [
     {
       "slug": "1-roof-llc",
       "googleBusinessUrl": "https://www.google.com/maps/place/1+Roof+LLC/@30.2394,-81.3858"
     }
   ]
   ```
2. Run the batch update script:
   ```bash
   python3 scripts/batch-update-google-urls.py
   ```

## Step 2: Add Reviews

Once Google Business URLs are set, you can add reviews in two ways:

### Option A: Manual Entry (Admin Interface)

1. Go to `/admin/reviews`
2. Select a roofer from the dropdown
3. Click "Add Review"
4. Fill in:
   - Reviewer Name
   - Rating (1-5 stars)
   - Review Text
   - Review Date
   - (Optional) Google Review URL
5. Click "Save Review"

### Option B: CSV Import

1. Create a CSV file with columns:
   - `rooferId` (the roofer's ID from the data)
   - `reviewerName`
   - `rating` (1-5)
   - `reviewText`
   - `reviewDate` (ISO format: YYYY-MM-DD)
   - `googleReviewUrl` (optional)

2. Go to `/admin/reviews`
3. Click "Import from CSV"
4. Select your CSV file
5. Click "Upload"

### Option C: Free Scraping Tools

See `BULK-IMPORT-REVIEWS.md` for instructions on using free scraping services like Outscraper or Apify.

## Step 3: Verify on Roofer Pages

1. Visit a roofer profile page: `/roofers/[slug]`
2. You should see:
   - **If reviews exist**: Review summary with star rating, synopsis, and positive/negative feedback
   - **If no reviews but Google URL exists**: "Leave a Review on Google" button
   - **If no Google URL**: Empty state (no review link)

## Tips for Finding Google Business Profiles

1. **Use exact business name** from the roofer data
2. **Include phone number** in search: `"[Business Name]" "[Phone]" Florida`
3. **Try variations**: Some businesses may be listed under slightly different names
4. **Check website**: Many businesses link to their Google Business Profile on their website
5. **Use Google Maps directly**: Often more reliable than Google Search

## API Endpoints

### Update Google Business URL

```bash
POST /api/admin/roofers
Content-Type: application/json

{
  "roofers": [
    {
      "slug": "1-roof-llc",
      "googleBusinessUrl": "https://www.google.com/maps/place/..."
    }
  ]
}
```

### Get All Roofers

```bash
GET /api/admin/roofers
```

Returns all roofers with their current `googleBusinessUrl` values.

## Troubleshooting

### "Leave a Review" link not showing

- Check that `googleBusinessUrl` is set in the roofer data
- Verify the URL is a valid Google Maps/Google Business Profile URL
- Hard refresh the page (Cmd+Shift+R or Ctrl+Shift+R)

### Reviews not displaying

- Check that reviews exist in `app/roofers/data/reviews.ts`
- Verify `rooferId` in reviews matches the roofer's `id` field
- Check browser console for errors

### Can't find Google Business Profile

- Try searching without phone number
- Check if business has a different name on Google
- Look for the business on their website (often linked in footer)
- Some businesses may not have a Google Business Profile yet

## Next Steps

1. **Start with preferred roofers**: Focus on finding Google Business Profiles for preferred contractors first
2. **Batch process**: Use the search script to generate URLs for 50 roofers at a time
3. **Add reviews gradually**: Don't try to add all reviews at once - work through them systematically
4. **Verify accuracy**: Double-check that Google Business URLs match the correct business

## Files Reference

- **Roofer Data**: `app/roofers/data/roofers.ts`
- **Reviews Data**: `app/roofers/data/reviews.ts`
- **Admin Roofers Page**: `app/admin/roofers/page.tsx`
- **Admin Reviews Page**: `app/admin/reviews/page.tsx`
- **Search Script**: `scripts/search-google-profiles.py`
- **Batch Update Script**: `scripts/batch-update-google-urls.py`
















