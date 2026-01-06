# Google Places API - Quick Start

✅ **Much simpler than Business Profile API!** No API key authentication needed for the sync endpoint.

## Setup (5 minutes)

### 1. Get Google Places API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create/select a project
3. Go to **APIs & Services** → **Library**
4. Search for **"Places API"** and enable it
5. Go to **Credentials** → **Create Credentials** → **API Key**
6. Copy the API key

### 2. Add to Your Project

1. Open `.env.local` (create if needed)
2. Add:
   ```bash
   GOOGLE_PLACES_API_KEY=your-api-key-here
   ```
3. Save and restart dev server

### 3. Sync Reviews

**Option A: Admin Page (Easiest)**
1. Visit: `http://localhost:3000/admin/sync-reviews`
2. Click **"Test Connection"** to verify setup
3. Click **"Sync Reviews Now"** (no API key needed!)
4. Done! Reviews are imported

**Option B: Terminal**
```bash
curl -X POST http://localhost:3000/api/sync-places-reviews
```

## How It Works

1. Reads all roofers from `app/roofers/data/roofers.ts`
2. Searches Google Places for each roofer (by name + address)
3. Fetches reviews from Places API
4. Updates `app/roofers/data/reviews.ts` automatically
5. Reviews appear on roofer pages!

## Optional: Speed Up Sync

If you know a roofer's Google Place ID, add it to speed things up:

```typescript
// In app/roofers/data/roofers.ts
'roofer-slug': {
  // ... other fields ...
  googlePlaceId: 'ChIJN1t_tDeuEmsRUsoyG83frY4', // Optional
}
```

## Benefits

✅ **No API key in requests** - stored securely in .env.local  
✅ **Simple setup** - just an API key, no service accounts  
✅ **Public reviews** - works with any Google Business listing  
✅ **Automatic** - finds businesses by name/address  
✅ **Fast** - direct API calls, no complex auth  

## Troubleshooting

**"GOOGLE_PLACES_API_KEY not set"**
- Check `.env.local` has the key
- Restart dev server

**"No place found"**
- Business may not be on Google Maps
- Try adding more address details
- Manually add `googlePlaceId` if you know it

**Rate limiting**
- Free tier: 1,000 requests/day
- Sync adds delays automatically
- Upgrade quota if needed

## Full Documentation

See `GOOGLE-PLACES-API-SETUP.md` for complete details.
















