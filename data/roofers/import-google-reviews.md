# Importing Google Business Reviews

This guide explains how to import reviews from Google Business pages into the RIF website.

## Methods

### Method 1: Manual CSV Import (Recommended for initial setup)

1. Export reviews from Google Business:
   - Go to Google Business Profile
   - Navigate to Reviews section
   - Export reviews (if available) or copy manually

2. Format your CSV file with these columns:
   ```csv
   rooferId,reviewerName,rating,reviewText,reviewDate,googleReviewUrl
   roofer-123,John Smith,5,"Excellent work! Very professional.",2024-01-15,https://www.google.com/maps/reviews/...
   roofer-123,Jane Doe,4,"Good service, timely completion.",2024-01-10,https://www.google.com/maps/reviews/...
   ```

3. Use the import script:
   ```bash
   python3 data/roofers/import-google-reviews.py your-reviews.csv
   ```

### Method 2: Google My Business API (Advanced)

For automated syncing, you can use the Google My Business API:
- Requires API credentials
- Can sync reviews automatically
- See `data/roofers/google-api-sync.md` for setup

### Method 3: Manual Entry via Admin Panel

1. Go to `/admin/roofers/[rooferId]/reviews`
2. Click "Add Google Review"
3. Enter review details manually

## Required Fields

- **rooferId**: The ID from `roofers.ts` (e.g., "roofer-123")
- **reviewerName**: Name of the reviewer
- **rating**: 1-5 stars
- **reviewText**: The review content
- **reviewDate**: Date of the review (YYYY-MM-DD format)
- **googleReviewUrl**: (Optional) Link to the review on Google

## Optional Fields

- **reviewerPhotoUrl**: Profile photo URL
- **responseText**: Business owner's response
- **responseDate**: Date of response

## Finding Roofer IDs

Roofer IDs are in `app/roofers/data/roofers.ts`. Each roofer has an `id` field that matches the key in the `rooferData` object.

## Notes

- Reviews are stored in `app/roofers/data/reviews.ts`
- Duplicate reviews (same ID) will be updated, not duplicated
- Reviews are sorted by date (newest first)
- Only approved/visible reviews should be imported

















