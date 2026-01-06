# Google Business Reviews Setup - Step by Step Guide

This guide will walk you through setting up automated Google Business reviews import.

## Prerequisites
- A Google account
- Access to Google Business Profile for your roofing companies
- Basic familiarity with Google Cloud Console

---

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click the project dropdown at the top
3. Click **"New Project"**
4. Enter project name: `RIF Roofing Reviews`
5. Click **"Create"**
6. Wait for project creation, then select it from the dropdown

---

## Step 2: Enable Google Business Profile API

1. In Google Cloud Console, go to **"APIs & Services"** → **"Library"**
2. Search for: `Google My Business API` or `Google Business Profile API`
3. Click on **"Google My Business API"** (or similar)
4. Click **"Enable"**
5. Wait for it to enable (may take a minute)

---

## Step 3: Create Service Account

1. Go to **"IAM & Admin"** → **"Service Accounts"**
2. Click **"Create Service Account"**
3. Fill in:
   - **Service account name**: `rif-reviews-sync`
   - **Service account ID**: (auto-filled)
   - **Description**: `Service account for syncing Google Business reviews`
4. Click **"Create and Continue"**
5. Skip role assignment (click **"Continue"**)
6. Skip user access (click **"Continue"**)
7. Click **"Done"**

---

## Step 4: Generate Service Account Key (JSON)

1. Click on the service account you just created (`rif-reviews-sync`)
2. Go to **"Keys"** tab
3. Click **"Add Key"** → **"Create New Key"**
4. Select **"JSON"** format
5. Click **"Create"**
6. **IMPORTANT**: The JSON file will download automatically
   - Save this file securely (you'll need it in Step 6)
   - **DO NOT** commit this file to git (it contains sensitive credentials)

---

## Step 5: Add Service Account to Google Business Profile

1. Open the downloaded JSON file
2. Find the `client_email` field (looks like: `rif-reviews-sync@your-project.iam.gserviceaccount.com`)
3. Copy this email address
4. Go to [Google Business Profile](https://business.google.com/)
5. Select your business location (or create one if needed)
6. Go to **"Users"** or **"Managers"** section
7. Click **"Add Users"** or **"Invite Users"**
8. Paste the service account email
9. Assign role: **"Manager"** or **"Owner"**
10. Click **"Invite"** or **"Add"**
11. Accept the invitation if prompted

**Repeat this for each Google Business Profile location you want to sync reviews from.**

---

## Step 6: Configure Environment Variables

1. In your project root, create a file named `.env.local` (if it doesn't exist)

2. Open the downloaded JSON file from Step 4

3. Convert the JSON to a single line (remove all line breaks and extra spaces)

4. Add to `.env.local`:

```bash
# Google Service Account JSON (paste the entire JSON as a single line)
GOOGLE_SERVICE_ACCOUNT_JSON='{"type":"service_account","project_id":"your-project","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"rif-reviews-sync@your-project.iam.gserviceaccount.com","client_id":"...","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"..."}'

# API Key for manual sync (create a random secure string)
REVIEWS_SYNC_API_KEY=your-secret-api-key-here-change-this

# Secret for cron job authentication
CRON_SECRET=your-cron-secret-here-change-this
```

**Important Notes:**
- Replace the entire JSON string with your actual service account JSON
- Use single quotes around the JSON string
- Generate strong, random strings for `REVIEWS_SYNC_API_KEY` and `CRON_SECRET`
- Never commit `.env.local` to git (it's already in `.gitignore`)

---

## Step 7: Get Google Business Location IDs

1. Start your dev server:
   ```bash
   npm run dev
   ```

2. Visit: `http://localhost:3000/api/sync-google-reviews`

3. You should see a JSON response with all your Google Business locations:
   ```json
   {
     "status": "ready",
     "locationsFound": 5,
     "locations": [
       {
         "locationId": "1234567890",
         "title": "Your Business Name",
         "storeCode": "STORE123"
       }
     ]
   }
   ```

4. **Copy the `locationId` for each location** - you'll need this in Step 8

---

## Step 8: Map Roofers to Google Business Locations

1. Open `app/roofers/data/roofers.ts`

2. For each roofer that has a Google Business Profile, add one of these fields:

```typescript
'roofer-slug': {
  id: 'roofer-123',
  name: 'Roofer Name',
  // ... existing fields ...
  googleLocationId: '1234567890', // Use the locationId from Step 7
  // OR
  googleStoreCode: 'STORE123', // Alternative: use storeCode if available
}
```

**You need either `googleLocationId` OR `googleStoreCode` (not both).**

3. Save the file

---

## Step 9: Test the Sync

1. Make sure your dev server is running

2. Test the sync manually using curl (or use the admin page):
   ```bash
   curl -X POST http://localhost:3000/api/sync-google-reviews \
     -H "Authorization: Bearer your-secret-api-key-here"
   ```

   Or visit: `http://localhost:3000/admin/sync-reviews` (if the admin page exists)

3. Check the response - it should show:
   ```json
   {
     "success": true,
     "message": "Reviews synced successfully",
     "statistics": {
       "locationsProcessed": 5,
       "roofersUpdated": 3,
       "totalReviews": 45,
       "syncedAt": "2024-12-14T..."
     }
   }
   ```

4. Check `app/roofers/data/reviews.ts` - it should now contain review data

5. Visit a roofer profile page - reviews should display!

---

## Step 10: Set Up Weekly Automatic Sync

### Option A: GitHub Actions (Recommended - Free)

The workflow is already set up at `.github/workflows/sync-google-reviews.yml`

1. Go to your GitHub repository
2. Go to **Settings** → **Secrets and variables** → **Actions**
3. Add these secrets:
   - `REVIEWS_SYNC_URL`: `https://your-domain.com/api/cron/sync-reviews`
   - `REVIEWS_SYNC_API_KEY`: (same value as in `.env.local`)

4. The workflow will run automatically every Monday at 2 AM UTC

### Option B: Vercel Cron (If deploying to Vercel)

Add to `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/cron/sync-reviews",
      "schedule": "0 2 * * 1"
    }
  ]
}
```

### Option C: External Cron Service

Use a service like:
- [cron-job.org](https://cron-job.org) (free tier)
- [EasyCron](https://www.easycron.com) (paid)

Set up a cron job to call:
```
POST https://your-domain.com/api/cron/sync-reviews
Authorization: Bearer your-cron-secret-here
```

Schedule: Every Monday at 2 AM UTC (`0 2 * * 1`)

---

## Troubleshooting

### Error: "GOOGLE_SERVICE_ACCOUNT_JSON not set"
- Check `.env.local` exists and has the correct variable name
- Restart your dev server after adding env vars
- Make sure JSON is properly formatted (single quotes around it)

### Error: "No Google Business Profile accounts found"
- Verify service account email was added to Google Business Profile
- Check service account has Manager or Owner role
- Ensure Google Business Profile API is enabled in Cloud Console

### Error: "No roofer mapping found"
- Add `googleLocationId` or `googleStoreCode` to roofer in `roofers.ts`
- Verify location ID matches the one from `/api/sync-google-reviews`
- Check for typos in location IDs

### Reviews Not Appearing
- Check `app/roofers/data/reviews.ts` - is data there?
- Verify roofer ID matches between `roofers.ts` and `reviews.ts`
- Check browser console for errors
- Hard refresh the page (Cmd+Shift+R / Ctrl+Shift+R)

### API Endpoint Not Available / Deprecated
If you get errors about the reviews endpoint being unavailable:
- See `data/roofers/API-ALTERNATIVES.md` for alternative methods
- Consider using Google Places API instead
- Or use manual CSV import

---

## Next Steps

1. ✅ Complete Steps 1-9 to get initial sync working
2. ✅ Test that reviews appear on roofer pages
3. ✅ Set up weekly sync (Step 10)
4. ✅ Monitor sync logs to ensure it's working
5. ✅ Add more roofers as you get their Google Business location IDs

---

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review `data/roofers/GOOGLE-API-SETUP.md` for detailed API info
3. Check server logs for detailed error messages
4. Verify all credentials and permissions are correct
















