# Vercel Blob Storage Setup for Roofer Updates

Roofer updates (listing type, category, contact info, etc.) are now stored in **Vercel Blob Storage**, which allows them to persist on the live site.

## Setup Steps

### 1. Get Your Blob Token

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Storage**
4. Click **Create Database** or **Add Storage**
5. Select **Blob**
6. Create a new Blob store (or use existing)
7. Copy the **BLOB_READ_WRITE_TOKEN** (or it may auto-populate)

### 2. Add Environment Variable

1. In Vercel Dashboard → Your Project → **Settings** → **Environment Variables**
2. Add a new variable:
   - **Name:** `BLOB_READ_WRITE_TOKEN`
   - **Value:** (paste the token from step 1)
   - **Environments:** Select all (Production, Preview, Development)
3. Click **Save**

### 3. Redeploy

After adding the environment variable:
1. Go to **Deployments** tab
2. Find your latest deployment
3. Click **...** (three dots) → **Redeploy**
4. Wait for deployment to complete

## How It Works

- **Base roofer data** (name, slug, aboutText, etc.) comes from `app/roofers/data/roofers.ts` (bundled in the app)
- **Editable fields** (category, isPreferred, isHidden, contact info, serviceAreas) are stored in Vercel Blob
- When reading roofers, the app **merges** base data + Blob overrides
- Admin UI updates save to Blob, which persists across deployments

## Local Development

When running locally (`npm run dev`):
- If `BLOB_READ_WRITE_TOKEN` is set, it uses Blob (same as production)
- If not set, it falls back to writing to `app/roofers/data/roofers.ts` (local file)

## Troubleshooting

**Error: "Blob storage is not configured"**
- Make sure `BLOB_READ_WRITE_TOKEN` is set in Vercel environment variables
- Redeploy after adding the variable
- Check that the token is valid in Vercel Dashboard → Storage

**Updates not saving**
- Check Vercel function logs for errors
- Verify the Blob store exists and is accessible
- Ensure the token has read/write permissions

## Cost

Vercel Blob has a free tier:
- **Free:** 1 GB storage, 1 GB bandwidth/month
- For roofer overrides (small JSON file), this is more than enough

See [Vercel Blob Pricing](https://vercel.com/docs/storage/blob/pricing) for details.
