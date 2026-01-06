# Google Business Profile API Setup Guide

This guide walks you through setting up automatic Google Business reviews import with weekly updates.

## ⚠️ Important Note About API Availability

**As of 2024-2025, Google has deprecated the direct reviews endpoint in the Business Profile API v4.9.** 

The newer v1 APIs may have limited or different review access. This implementation attempts to use the available APIs, but you may need to:

1. **Use Google Business Profile Manager API** (if available)
2. **Use third-party services** that provide review APIs
3. **Manual import via CSV** (fallback option)
4. **Web scraping** (not recommended, may violate ToS)

**We recommend testing the API connection first** using the test endpoint before setting up automated syncing.

## Overview

The system automatically:
- Fetches reviews from Google Business Profile API
- Maps reviews to roofers by location ID or store code
- Updates reviews weekly via cron job
- Displays reviews on roofer profile pages

## Step 1: Google Cloud Console Setup

### 1.1 Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Name it (e.g., "RIF Roofing Reviews")
4. Click "Create"

### 1.2 Enable Google Business Profile API

1. In Google Cloud Console, go to **APIs & Services** → **Library**
2. Search for "Google My Business API" or "Google Business Profile API"
3. Click on it and click **Enable**

### 1.3 Create a Service Account

1. Go to **IAM & Admin** → **Service Accounts**
2. Click **Create Service Account**
3. Fill in:
   - **Name**: `rif-reviews-sync`
   - **Description**: `Service account for syncing Google Business reviews`
4. Click **Create and Continue**
5. Skip role assignment (click **Continue**)
6. Click **Done**

### 1.4 Generate Service Account Key

1. Click on the service account you just created
2. Go to **Keys** tab
3. Click **Add Key** → **Create New Key**
4. Choose **JSON** format
5. Click **Create**
6. The JSON file will download - **SAVE THIS FILE SECURELY**

## Step 2: Google Business Profile Setup

### 2.1 Add Service Account to Google Business Profile

1. Go to [Google Business Profile](https://business.google.com/)
2. Select your business location
3. Go to **Users** (or **Managers**)
4. Click **Add Users** or **Invite Users**
5. Enter the service account email (found in the JSON file as `client_email`)
6. Assign role: **Manager** or **Owner**
7. Click **Invite**
8. Accept the invitation if needed

### 2.2 Get Location IDs

1. In Google Business Profile, go to your location
2. The location ID is in the URL: `https://business.google.com/locations/{LOCATION_ID}`
3. Or use the API test endpoint: `GET /api/sync-google-reviews` to list all locations

## Step 3: Configure Roofer Mappings

Edit `app/roofers/data/roofers.ts` and add Google location mapping to each roofer:

```typescript
'roofer-slug': {
  id: 'roofer-123',
  name: 'Roofer Name',
  // ... other fields
  googleLocationId: 'LOCATION_ID_FROM_GOOGLE', // Optional
  googleStoreCode: 'STORE_CODE', // Optional (alternative to locationId)
}
```

**Note**: You need either `googleLocationId` OR `googleStoreCode` to map reviews to roofers.

## Step 4: Environment Variables

1. Copy `.env.example` to `.env.local`
2. Add your service account JSON:

```bash
# Option 1: Single-line JSON string
GOOGLE_SERVICE_ACCOUNT_JSON='{"type":"service_account",...}'

# Option 2: Use a file path (if storing JSON separately)
GOOGLE_SERVICE_ACCOUNT_JSON_PATH=/path/to/credentials.json
```

3. Set API keys:

```bash
REVIEWS_SYNC_API_KEY=your-secret-key-here
CRON_SECRET=your-cron-secret-here
```

## Step 5: Test the Integration

### 5.1 Manual Sync

Test the sync manually:

```bash
# Get list of locations
curl http://localhost:3000/api/sync-google-reviews

# Trigger sync
curl -X POST http://localhost:3000/api/sync-google-reviews \
  -H "Authorization: Bearer your-api-key"
```

### 5.2 Verify Reviews

1. Check `app/roofers/data/reviews.ts` - reviews should be populated
2. Visit a roofer profile page - reviews should display
3. Check browser console for any errors

## Step 6: Set Up Weekly Cron Job

### Option A: Vercel Cron (if deploying to Vercel)

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

This runs every Monday at 2 AM UTC.

### Option B: External Cron Service

Use a service like:
- **GitHub Actions** (free for public repos)
- **Cron-job.org** (free tier available)
- **EasyCron** (paid)
- **Your own server** with cron

Example cron job:
```bash
# Every Monday at 2 AM
0 2 * * 1 curl -X POST https://your-domain.com/api/cron/sync-reviews \
  -H "Authorization: Bearer your-cron-secret"
```

### Option C: GitHub Actions (Recommended for Free)

Create `.github/workflows/sync-reviews.yml`:

```yaml
name: Sync Google Reviews

on:
  schedule:
    - cron: '0 2 * * 1'  # Every Monday at 2 AM UTC
  workflow_dispatch:  # Allow manual trigger

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Review Sync
        run: |
          curl -X POST ${{ secrets.REVIEWS_SYNC_URL }} \
            -H "Authorization: Bearer ${{ secrets.REVIEWS_SYNC_API_KEY }}"
```

## Troubleshooting

### Error: "GOOGLE_SERVICE_ACCOUNT_JSON not set"

- Check `.env.local` file exists
- Verify JSON is properly formatted
- Restart dev server after adding env vars

### Error: "No Google Business Profile accounts found"

- Verify service account email is added to Google Business Profile
- Check service account has Manager or Owner role
- Ensure Google Business Profile API is enabled

### Error: "No roofer mapping found"

- Add `googleLocationId` or `googleStoreCode` to roofer in `roofers.ts`
- Verify location ID matches Google Business Profile location
- Use `GET /api/sync-google-reviews` to see available locations

### Reviews Not Updating

- Check cron job is running (check logs)
- Verify API endpoint is accessible
- Check browser console for errors
- Manually trigger sync to test

## API Endpoints

### GET /api/sync-google-reviews
Lists all Google Business locations (for testing)

### POST /api/sync-google-reviews
Manually triggers review sync
- Requires: `Authorization: Bearer {REVIEWS_SYNC_API_KEY}`

### GET/POST /api/cron/sync-reviews
Cron endpoint for scheduled syncs
- Requires: `Authorization: Bearer {CRON_SECRET}`

## Security Notes

1. **Never commit** `.env.local` or service account JSON to git
2. Use strong, unique API keys
3. Restrict cron endpoint access
4. Rotate credentials periodically
5. Monitor API usage in Google Cloud Console

## Monitoring

Check sync status:
- Review sync logs in server console
- Check `reviews.ts` file timestamp
- Monitor Google Cloud Console API usage
- Set up error alerts if using external cron

## Support

For issues:
1. Check Google Cloud Console API quotas
2. Verify service account permissions
3. Test with manual sync first
4. Check server logs for detailed errors
















