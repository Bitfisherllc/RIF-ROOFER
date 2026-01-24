# How to Test and Sync Google Reviews

This guide shows you exactly how to test the connection and run a manual sync.

## Prerequisites

Before testing, make sure you've completed:
- ✅ Created `.env.local` with your Google credentials
- ✅ Added service account to Google Business Profile
- ✅ Started your dev server (`npm run dev`)

---

## Method 1: Test Connection (See Your Locations)

### Option A: Using Your Browser (Easiest)

1. **Make sure your dev server is running:**
   ```bash
   npm run dev
   ```

2. **Open your browser** and go to:
   ```
   http://localhost:3000/api/sync-google-reviews
   ```

3. **You should see JSON** like this:
   ```json
   {
     "status": "ready",
     "locationsFound": 3,
     "locations": [
       {
         "locationId": "1234567890",
         "title": "Your Business Name",
         "storeCode": "STORE123"
       }
     ]
   }
   ```

4. **If you see this**, your connection is working! ✅
   - Copy the `locationId` values - you'll need them to map to roofers

5. **If you see an error**, check:
   - Is `.env.local` created and has `GOOGLE_SERVICE_ACCOUNT_JSON`?
   - Did you restart the dev server after adding `.env.local`?
   - Are your credentials correct?

### Option B: Using Terminal (curl)

1. **Open Terminal**

2. **Run this command:**
   ```bash
   curl http://localhost:3000/api/sync-google-reviews
   ```

3. **You'll see the same JSON response** as above

---

## Method 2: Run Manual Sync (Import Reviews)

### Option A: Using Terminal (curl) - Recommended

1. **First, get your API key** from `.env.local`:
   - Open `.env.local`
   - Find the line: `REVIEWS_SYNC_API_KEY=your-secret-api-key-here`
   - Copy the value after the `=` sign

2. **Run the sync command:**
   ```bash
   curl -X POST http://localhost:3000/api/sync-google-reviews \
     -H "Authorization: Bearer YOUR_API_KEY_HERE"
   ```
   
   **Replace `YOUR_API_KEY_HERE`** with the actual key from step 1.

   **Example:**
   ```bash
   curl -X POST http://localhost:3000/api/sync-google-reviews \
     -H "Authorization: Bearer abc123xyz456"
   ```

3. **You should see a success response:**
   ```json
   {
     "success": true,
     "message": "Reviews synced successfully",
     "statistics": {
       "locationsProcessed": 3,
       "roofersUpdated": 2,
       "totalReviews": 45,
       "syncedAt": "2024-12-14T12:00:00.000Z"
     }
   }
   ```

4. **If successful**, reviews are now imported! ✅

### Option B: Using a REST Client (Postman, Insomnia, etc.)

1. **Open your REST client** (Postman, Insomnia, or similar)

2. **Create a new POST request:**
   - URL: `http://localhost:3000/api/sync-google-reviews`
   - Method: `POST`
   - Headers:
     - Key: `Authorization`
     - Value: `Bearer YOUR_API_KEY_HERE` (from `.env.local`)

3. **Click Send**

4. **Check the response** - should show success with statistics

### Option C: Create a Simple Test Page

I can create a simple admin page for you to click a button and sync. Would you like me to do that?

---

## Method 3: Verify Reviews Appeared

### Check the Reviews File

1. **Open:** `app/roofers/data/reviews.ts`

2. **Look for:** The `googleReviews` object should now have data:
   ```typescript
   export const googleReviews: Record<string, GoogleReview[]> = {
     'roofer-id-1': [
       {
         id: 'review-123',
         rooferId: 'roofer-id-1',
         reviewerName: 'John Smith',
         rating: 5,
         reviewText: 'Great service!',
         // ... more fields
       }
     ],
   };
   ```

3. **If you see review data**, it worked! ✅

### Check a Roofer Profile Page

1. **Visit a roofer profile page:**
   ```
   http://localhost:3000/roofers/roofer-slug
   ```

2. **You should see:**
   - Star ratings
   - Review count
   - Individual review cards
   - Rating distribution chart

3. **If reviews appear**, everything is working! ✅

---

## Troubleshooting

### Error: "Unauthorized" (401)

**Problem:** API key is missing or incorrect

**Solution:**
1. Check `.env.local` has `REVIEWS_SYNC_API_KEY=...`
2. Make sure you're using the correct key in the Authorization header
3. Restart dev server after changing `.env.local`

### Error: "GOOGLE_SERVICE_ACCOUNT_JSON not set"

**Problem:** Google credentials not configured

**Solution:**
1. Check `.env.local` exists
2. Verify `GOOGLE_SERVICE_ACCOUNT_JSON=...` is set
3. Make sure JSON is properly formatted (single quotes around it)
4. Restart dev server

### Error: "No Google Business Profile accounts found"

**Problem:** Service account not added to Google Business Profile

**Solution:**
1. Go to Google Business Profile
2. Add the service account email (from JSON file) as Manager/Owner
3. Wait a few minutes for permissions to propagate
4. Try again

### Error: "No roofer mapping found"

**Problem:** Roofers don't have `googleLocationId` set

**Solution:**
1. Get location IDs from test endpoint (Method 1)
2. Edit `app/roofers/data/roofers.ts`
3. Add `googleLocationId: '1234567890'` to each roofer
4. Save and try sync again

### Reviews Not Appearing on Pages

**Problem:** Reviews synced but not showing

**Solution:**
1. Check `app/roofers/data/reviews.ts` has data
2. Verify roofer IDs match between `roofers.ts` and `reviews.ts`
3. Hard refresh browser (Cmd+Shift+R / Ctrl+Shift+R)
4. Check browser console for errors

---

## Quick Test Script

Save this as `test-sync.sh` and run it:

```bash
#!/bin/bash

echo "🔍 Testing Google Business API connection..."
curl http://localhost:3000/api/sync-google-reviews

echo ""
echo ""
echo "🔄 Running manual sync..."
echo "Enter your API key from .env.local:"
read API_KEY

curl -X POST http://localhost:3000/api/sync-google-reviews \
  -H "Authorization: Bearer $API_KEY"

echo ""
echo "✅ Done! Check app/roofers/data/reviews.ts for imported reviews"
```

Make it executable:
```bash
chmod +x test-sync.sh
./test-sync.sh
```

---

## Next Steps

After successful sync:
1. ✅ Reviews are imported
2. ✅ They'll display on roofer pages automatically
3. ✅ Set up weekly automatic sync (see `GOOGLE-REVIEWS-SETUP-GUIDE.md` Step 10)

















