# Alternative Methods for Google Reviews Import

Since Google Business Profile API reviews endpoint may be deprecated or limited, here are alternative approaches:

## Option 1: Google Places API (Recommended Alternative)

If your roofers have Google Maps Place IDs, you can use the Places API:

### Setup:
1. Enable **Places API** in Google Cloud Console
2. Get API key (different from Business Profile API)
3. Add `googlePlaceId` to each roofer in `roofers.ts`
4. Use Places API to fetch public reviews

### Pros:
- Public reviews are accessible
- More reliable than Business Profile API
- Good documentation

### Cons:
- Requires Place ID for each business
- May have usage limits/costs
- Only shows public reviews

## Option 2: Third-Party Review Aggregation Services

Services that aggregate Google reviews:
- **WiserReview** - Import and sync Google reviews
- **Prompt Reviews** - Review management platform
- **Reputation.com** - Enterprise solution
- **Podium** - Review management with API

These services often provide APIs to access aggregated reviews.

## Option 3: Manual CSV Import (Current Fallback)

Use the CSV import script as a fallback:
```bash
python3 data/roofers/import-google-reviews.py reviews.csv
```

## Option 4: Web Scraping (Not Recommended)

⚠️ **Warning**: Web scraping may violate Google's Terms of Service.

If you must use this approach:
- Use responsibly and ethically
- Respect rate limits
- Don't overload Google's servers
- Consider using a service like ScraperAPI

## Recommended Approach

1. **First**: Try the Business Profile API (current implementation)
2. **If that fails**: Use Places API with Place IDs
3. **Fallback**: Manual CSV import weekly
4. **Future**: Consider third-party aggregation service

## Testing API Availability

Test if the API works:
```bash
# Test endpoint
curl http://localhost:3000/api/sync-google-reviews

# If you get locations, API is working
# If you get errors about reviews endpoint, use alternatives
```

















