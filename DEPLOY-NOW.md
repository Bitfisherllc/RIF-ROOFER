# Deploy to Vercel - Quick Guide

## Current Status

I can't directly push to GitHub or deploy to Vercel for you because it requires your authentication. Here's what you need to do:

## Step 1: Push to GitHub (If Not Done Yet)

Run in your terminal:
```bash
git push -u origin main
```

When prompted:
- Username: `Bitfisherllc`
- Password: Your GitHub Personal Access Token (ghp_xxxxx)

## Step 2: Deploy to Vercel

Since I can't access your Vercel account, you'll need to:

1. **Go to Vercel:** https://vercel.com/dashboard
2. **Click "Add New..." → "Project"**
3. **Find "Bitfisherllc/RIF"** in the repository list
4. **Click "Import"**
5. **Click "Deploy"** (use default settings)

Vercel will:
- Auto-detect Next.js
- Build your project
- Deploy it live
- Give you a URL like `https://rif.vercel.app`

## Step 3: Add Environment Variables

After deployment:
1. Go to **Settings** → **Environment Variables**
2. Add:
   - `RESEND_API_KEY` (from your .env.local)
   - `RESEND_FROM_EMAIL` (from your .env.local)
3. **Redeploy** after adding variables

---

**Your site will be live in 2-3 minutes!** 🚀

If you need help with any step, let me know!

