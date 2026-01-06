# Google Business Reviews Setup Guide

This guide explains how to import and display Google Business reviews on the RIF website.

## Overview

The system allows you to:
- Import reviews from Google Business pages
- Display ratings and reviews on roofer profile pages
- Show aggregated ratings on roofer listing pages
- Link to Google Business profiles

## Quick Start

### 1. Add Google Business URL to Roofers

Edit `app/roofers/data/roofers.ts` and add `googleBusinessUrl` to each roofer:

```typescript
'roofer-slug': {
  // ... other fields
  googleBusinessUrl: 'https://www.google.com/maps/place/...',
}
```

### 2. Import Reviews

#### Option A: CSV Import (Recommended)

1. Export reviews from Google Business or copy manually
2. Create a CSV file using `reviews-template.csv` as a template
3. Run the import script:

```bash
python3 data/roofers/import-google-reviews.py your-reviews.csv
```

#### Option B: Manual Entry

Edit `app/roofers/data/reviews.ts` directly and add reviews to the `googleReviews` object.

### 3. Verify Display

- Visit any roofer profile page with reviews
- Check that ratings appear on roofer cards
- Verify reviews display correctly

## CSV Format

Required columns:
- `rooferId` - The roofer's ID from `roofers.ts`
- `reviewerName` - Name of the reviewer
- `rating` - 1-5 stars
- `reviewText` - The review content
- `reviewDate` - Date in YYYY-MM-DD format

Optional columns:
- `googleReviewUrl` - Link to the review
- `reviewerPhotoUrl` - Profile photo URL
- `responseText` - Business owner's response
- `responseDate` - Response date

## Finding Roofer IDs

Roofer IDs are in `app/roofers/data/roofers.ts`. Each roofer has an `id` field.

Example:
```typescript
export const rooferData: Record<string, RooferData> = {
  '1-roof-llc': {
    id: "2",  // <-- This is the rooferId
    name: "1 ROOF LLC",
    // ...
  }
}
```

## Features

### Rating Display
- Star ratings on roofer cards
- Average rating with review count
- Rating distribution chart
- Full review details on profile pages

### Review Cards
- Reviewer name and photo
- Star rating
- Review text
- Review date
- Business responses (if available)
- Link to Google review

### Aggregation
- Automatic calculation of average ratings
- Rating distribution (5-star breakdown)
- Total review count

## Updating Reviews

### Adding New Reviews

1. Export new reviews from Google Business
2. Add to CSV file
3. Run import script (it will merge with existing reviews)

### Updating Existing Reviews

The import script automatically updates reviews with the same ID. To update manually:

1. Edit `app/roofers/data/reviews.ts`
2. Find the review by ID
3. Update the fields
4. Save the file

## Best Practices

1. **Regular Updates**: Import reviews monthly or quarterly
2. **Verify Data**: Check that roofer IDs match correctly
3. **Include Responses**: Add business responses when available
4. **Keep URLs**: Include Google review URLs for verification
5. **Date Format**: Use ISO date format (YYYY-MM-DD)

## Troubleshooting

### Reviews Not Showing

1. Check that `rooferId` matches the roofer's `id` in `roofers.ts`
2. Verify reviews are in `googleReviews` object
3. Check browser console for errors

### Import Errors

1. Verify CSV format matches template
2. Check that dates are in correct format
3. Ensure roofer IDs exist in `roofers.ts`

### Rating Calculation

Ratings are automatically calculated from imported reviews. The system:
- Calculates average from all reviews
- Shows distribution (how many 5-star, 4-star, etc.)
- Updates when new reviews are added

## Future Enhancements

Potential improvements:
- Google My Business API integration for automatic syncing
- Review moderation interface
- Review analytics dashboard
- Email notifications for new reviews
- Review filtering and sorting options

## Support

For issues or questions:
1. Check this documentation
2. Review the import script output
3. Verify data structure matches examples
















