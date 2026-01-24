# Quick Deploy Checklist

## Before You Start

### 1. Environment Variables You Might Need

Check if you're using these features and need to set up environment variables in Vercel:

- ✅ **RESEND_API_KEY** - Required if using contact/estimate forms
- ✅ **TURNSTILE_SECRET_KEY** - Required if using Cloudflare Turnstile spam protection
- ⚠️ **GOOGLE_PLACES_API_KEY** - Optional (for reviews sync)

### 2. Files Already Protected

Your `.gitignore` already excludes:
- ✅ `.env.local` (environment variables)
- ✅ `node_modules/`
- ✅ `.next/` (build files)
- ✅ `app/api/auth/users.json` (user data)

## Deployment Steps

### Step 1: Initialize Git (if needed)

```bash
cd "/Volumes/Whale/_CLIENTS/Florida Roofers"
git init
git add .
git commit -m "Initial commit - Ready for production"
```

### Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `florida-roofers` (or your choice)
3. **Don't** initialize with README/gitignore/license
4. Click "Create repository"

### Step 3: Connect & Push to GitHub

Replace `YOUR_USERNAME` with your GitHub username:

```bash
git remote add origin https://github.com/YOUR_USERNAME/florida-roofers.git
git branch -M main
git push -u origin main
```

### Step 4: Deploy to Vercel

1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Vercel auto-detects Next.js - click "Deploy"

### Step 5: Add Environment Variables (if needed)

In Vercel project → Settings → Environment Variables, add:

- `RESEND_API_KEY` = (your Resend API key)
- `TURNSTILE_SECRET_KEY` = (your Cloudflare Turnstile secret)
- `RESEND_FROM_EMAIL` = (optional, default exists)
- `RESEND_VERIFIED_EMAIL` = (optional, default exists)

After adding variables, redeploy.

## That's It! 🚀

Your site will be live at: `https://your-project.vercel.app`

See `DEPLOYMENT-GUIDE.md` for detailed instructions.


