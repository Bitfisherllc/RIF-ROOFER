# Google Places API Setup Guide

This is **much simpler** than the Business Profile API! You just need a Google API key.

## Why Google Places API?

✅ **Simple**: Just an API key (no service accounts)  
✅ **Public**: Works with any Google Business listing  
✅ **Easy Setup**: 5 minutes vs 30+ minutes  
✅ **No Authentication**: No API key needed for the sync endpoint  
✅ **Reliable**: Well-documented and stable API  

## Step 1: Get Google Places API Key

### 1.1 Create/Select Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click project dropdown → **"New Project"** (or select existing)
3. Name it: `RIF Roofing Reviews`
4. Click **"Create"**

### 1.2 Enable Places API

1. Go to **"APIs & Services"** → **"Library"**
2. Search for: **"Places API"**
3. Click **"Places API"** (the one by Google)
4. Click **"Enable"**

### 1.3 Create API Key

1. Go to **"APIs & Services"** → **"Credentials"**
2. Click **"Create Credentials"** → **"API Key"**
3. Copy the API key that appears
4. (Optional) Click **"Restrict Key"** to limit usage:
   - Under "API restrictions", select **"Restrict key"**
   - Choose **"Places API"**
   - Click **"Save"**

## Step 2: Add API Key to Your Project

1. Open `.env.local` (create it if it doesn't exist)

2. Add your API key:
   ```bash
   GOOGLE_PLACES_API_KEY=your-api-key-here
   ```

3. **Save the file**

4. **Restart your dev server:**
   ```bash
   npm run dev
   ```

That's it! No service accounts, no complex setup. Just an API key.

## Step 3: Test the Connection

### Option A: Using Browser

1. Visit: `http://localhost:3000/api/sync-places-reviews`
2. You should see:
   ```json
   {
     "status": "ready",
     "message": "Google Places API is configured"
   }
   ```

### Option B: Using Admin Page

1. Visit: `http://localhost:3000/admin/sync-reviews`
2. Click **"Test Connection"**
3. Should show success!

## Step 4: Sync Reviews

### Option A: Using Admin Page (Easiest)

1. Visit: `http://localhost:3000/admin/sync-reviews`
2. Click **"Sync Reviews Now"** (no API key needed!)
3. Wait for it to complete
4. See results with statistics

### Option B: Using Terminal

```bash
curl -X POST http://localhost:3000/api/sync-places-reviews
```

### Option C: Using Browser

Just visit (but this will be a GET request, so use POST methods above):
```
http://localhost:3000/api/sync-places-reviews
```

## How It Works

1. **Reads roofers** from `app/roofers/data/roofers.ts`
2. **Searches Google Places** for each roofer by name + address
3. **Fetches reviews** from the Places API
4. **Updates** `app/roofers/data/reviews.ts` automatically

## Optional: Add Place IDs for Faster Sync

If you know the Google Place ID for a roofer, add it to speed up syncing:

1. Find the Place ID:
   - Search for the business on Google Maps
   - The Place ID is in the URL or you can get it from the Places API

2. Add to `app/roofers/data/roofers.ts`:
   ```typescript
   'roofer-slug': {
     id: 'roofer-123',
     name: 'Roofer Name',
     // ... other fields ...
     googlePlaceId: 'ChIJN1t_tDeuEmsRUsoyG83frY4', // Optional: speeds up sync
   }
   ```

## Troubleshooting

### Error: "GOOGLE_PLACES_API_KEY not set"

**Solution:**
- Check `.env.local` exists
- Verify `GOOGLE_PLACES_API_KEY=...` is set
- Restart dev server after adding

### Error: "Places API error: REQUEST_DENIED"

**Solution:**
- Check API key is correct
- Verify Places API is enabled in Google Cloud Console
- Check if API key has restrictions (may need to allow your IP)

### Error: "No place found"

**Solution:**
- Roofer may not have a Google Business listing
- Try adding more address details to roofer data
- Manually add `googlePlaceId` if you know it

### No Reviews Found

**Solution:**
- Business may not have reviews on Google
- Check the business on Google Maps to verify reviews exist
- Some businesses have reviews but Places API may not return all

### Rate Limiting

**Solution:**
- Google Places API has free tier: 1,000 requests/day
- Sync adds delays between requests automatically
- For many roofers, you may need to upgrade API quota

## API Costs

- **Free Tier**: $200 credit/month (covers ~1,000 requests/day)
- **Places API - Text Search**: $32 per 1,000 requests
- **Places API - Place Details**: $17 per 1,000 requests

For 685 roofers:
- Initial sync: ~1,370 requests (search + details)
- Cost: ~$0.05 per full sync
- Free tier covers ~20 full syncs per month

## Next Steps

1. ✅ Get API key
2. ✅ Add to `.env.local`
3. ✅ Test connection
4. ✅ Run sync
5. ✅ Reviews appear on roofer pages automatically!

## Comparison: Places API vs Business Profile API

| Feature | Places API | Business Profile API |
|---------|-----------|---------------------|
| Setup Time | 5 minutes | 30+ minutes |
| Authentication | API Key | Service Account |
| Complexity | Simple | Complex |
| Public Access | Yes | No (needs access) |
| Cost | Pay per use | Free (if you own) |
| Reviews | Public reviews | All reviews |
| Best For | Public listings | Your own businesses |

**For most use cases, Places API is the better choice!**

















