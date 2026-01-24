# How to Get Google Reviews for All Roofers

Since you don't want to use paid API keys, here are free methods to get reviews:

## Method 1: Manual Copy-Paste (Recommended - Free & Reliable)

### Step 1: Find Each Roofer on Google

1. Go to [Google Maps](https://www.google.com/maps)
2. Search for each roofer by name and location
3. Click on their business listing
4. Scroll down to see reviews

### Step 2: Copy Reviews

For each review:
1. Copy the reviewer name
2. Note the star rating (1-5)
3. Copy the review text
4. Note the date
5. Copy the review URL if available

### Step 3: Add to System

1. Go to `/admin/reviews`
2. Select the roofer
3. Click "Add Review"
4. Paste the information
5. Save

**Time:** ~2-3 minutes per roofer with reviews

## Method 2: Bulk CSV Import (Faster for Many Reviews)

### Step 1: Collect Reviews in Spreadsheet

Create a CSV with columns:
```
rooferId,reviewerName,rating,reviewText,reviewDate,googleReviewUrl
```

### Step 2: Fill in Data

For each roofer:
1. Find their Google Business Profile
2. Copy all reviews into the spreadsheet
3. Make sure rooferId matches the ID in `roofers.ts`

### Step 3: Import

1. Go to `/admin/reviews`
2. Click "Import CSV"
3. Select your CSV file
4. Reviews are imported automatically

## Method 3: Use Free Review Aggregation Services

Some free services can help:
- **ReviewPush** (free tier available)
- **Podium** (free trial)
- **Birdeye** (free tier)

These services can aggregate reviews from multiple sources.

## Method 4: Browser Extension (If Available)

Some browser extensions can export Google reviews:
- Check Chrome Web Store for "Google Reviews Exporter"
- May require manual setup

## Quick Start: Get Reviews for Top Roofers First

1. **Prioritize**: Start with preferred roofers or those with most Google reviews
2. **Batch Process**: Do 5-10 roofers at a time
3. **Use CSV**: Faster than manual entry for bulk imports

## Tips

- **Focus on roofers with Google Business Profiles** - they're more likely to have reviews
- **Check Google Maps** - easier to find businesses there
- **Use roofer names + city** in Google search for better results
- **Save time**: Copy multiple reviews at once, then add them all

## Need Help?

If you want me to help you:
1. I can create a template CSV with all your roofer IDs
2. I can add a bulk import tool
3. I can create a script to help organize the data

Let me know which method you prefer!

















