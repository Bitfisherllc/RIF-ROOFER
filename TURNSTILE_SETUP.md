# Cloudflare Turnstile Setup Instructions

## Step 1: Get Your Turnstile Keys

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Turnstile** in the left sidebar
3. Click **Add Site**
4. Fill in:
   - **Site Name**: RIF Roofing Forms
   - **Domain**: Your domain (e.g., `yourdomain.com`)
   - **Widget Mode**: Managed (recommended) or Non-interactive
5. Click **Create**
6. Copy your **Site Key** and **Secret Key**

## Step 2: Add Keys to Environment Variables

Add these to your `.env.local` file:

```bash
# Cloudflare Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_site_key_here
TURNSTILE_SECRET_KEY=your_secret_key_here
```

**Important**: 
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is public (starts with `NEXT_PUBLIC_`)
- `TURNSTILE_SECRET_KEY` is private (never expose this)

## Step 3: Restart Your Dev Server

After adding the environment variables, restart your Next.js dev server:

```bash
npm run dev
```

## How It Works

### Protection Layers Implemented:

1. **Cloudflare Turnstile** (Primary)
   - Invisible bot detection
   - Runs automatically in the background
   - No user interaction required
   - Blocks sophisticated bots

2. **Honeypot Field** (Secondary)
   - Hidden field that humans can't see
   - Bots often fill it out
   - Silently rejects submissions with filled honeypot

3. **Rate Limiting** (Tertiary)
   - Limits to 5 submissions per 15 minutes per IP
   - Prevents spam floods
   - Returns 429 error if exceeded

### Testing

**Test Mode**: If you don't configure Turnstile keys, the forms will still work but won't verify Turnstile tokens. This is useful for development.

**Production**: Make sure to add your Turnstile keys before deploying to production.

## Troubleshooting

### "Security verification required" error
- Make sure `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is set
- Check that the Turnstile widget is loading on the page
- Verify the site key is correct

### "Security verification failed" error
- Check that `TURNSTILE_SECRET_KEY` is set correctly
- Verify the secret key matches your site key
- Check Cloudflare dashboard for any issues

### Forms not submitting
- Check browser console for errors
- Verify Turnstile widget is visible and completed
- Make sure you're not hitting rate limits

## Free Tier Limits

Cloudflare Turnstile is **completely free** with no limits on:
- Number of sites
- Number of verifications
- API calls

No credit card required!






