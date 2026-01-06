# Deployment Guide - Going Live with Vercel

This guide will help you deploy your Florida Roofers website to production using GitHub and Vercel.

## Prerequisites

✅ GitHub account  
✅ Vercel account  
✅ Code ready to deploy  

## Step 1: Prepare Your Code

### 1.1 Check Git Status

Make sure all your changes are committed:

```bash
git status
```

### 1.2 Review .gitignore

Ensure sensitive files are excluded. Your `.gitignore` should already include:
- `.next/` (build files)
- `node_modules/`
- `.env.local` (environment variables)
- `app/api/auth/users.json` (user data)
- Any other sensitive files

### 1.3 Commit All Changes

If you have uncommitted changes:

```bash
git add .
git commit -m "Ready for production deployment"
```

## Step 2: Create GitHub Repository

### 2.1 Create New Repository on GitHub

1. Go to https://github.com/new
2. Repository name: `florida-roofers` (or your preferred name)
3. Description: "Florida Roofers website - Stone-coated metal roofing directory"
4. Visibility: Choose Public or Private
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

### 2.2 Connect Local Repository to GitHub

GitHub will show you commands. Use these:

```bash
# If you haven't initialized git yet:
git init
git add .
git commit -m "Initial commit"

# Add GitHub remote (replace YOUR_USERNAME with your GitHub username):
git remote add origin https://github.com/YOUR_USERNAME/florida-roofers.git

# Push to GitHub:
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel

### 3.1 Import Project to Vercel

1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Click "Import Git Repository"
4. Find your `florida-roofers` repository
5. Click "Import"

### 3.2 Configure Project Settings

Vercel will auto-detect Next.js. Verify these settings:

**Framework Preset:** Next.js  
**Root Directory:** `./` (default)  
**Build Command:** `npm run build` (default)  
**Output Directory:** `.next` (default)  
**Install Command:** `npm install` (default)  

### 3.3 Environment Variables (If Needed)

If your app uses environment variables (check if you have any):

1. In Vercel project settings, go to "Settings" → "Environment Variables"
2. Add any variables needed (e.g., API keys, database URLs)
3. Common variables you might need:
   - `RESEND_API_KEY` (if using Resend for emails)
   - `TURNSTILE_SECRET_KEY` (if using Cloudflare Turnstile)
   - Any other API keys from your `.env.local` file

**Note:** Never commit `.env.local` to GitHub - only add variables to Vercel's dashboard.

### 3.4 Deploy

Click "Deploy" and wait for the build to complete (usually 2-3 minutes).

## Step 4: Post-Deployment Checklist

### 4.1 Verify Deployment

1. Visit your Vercel deployment URL (e.g., `https://florida-roofers.vercel.app`)
2. Test key pages:
   - Homepage
   - Guides
   - Videos
   - Roofers directory
   - Contact form
   - Free estimate form
   - Admin pages

### 4.2 Custom Domain (Optional)

If you have a custom domain:

1. Go to Vercel project → "Settings" → "Domains"
2. Add your domain (e.g., `www.floridaroofers.com`)
3. Follow Vercel's DNS configuration instructions
4. Update DNS records at your domain registrar

### 4.3 Test Critical Features

- ✅ Site-wide password protection (if enabled)
- ✅ Contact form submissions
- ✅ Free estimate form
- ✅ User authentication (login/signup)
- ✅ Admin portal functionality
- ✅ Video embeds
- ✅ Image loading

## Step 5: Production Optimizations

### 5.1 Enable Analytics (Optional)

Vercel Analytics:
1. Go to project → "Analytics"
2. Enable Vercel Analytics for insights

### 5.2 Set Up Monitoring

Consider setting up:
- Vercel's built-in monitoring
- Error tracking (e.g., Sentry)
- Uptime monitoring

### 5.3 Update Environment Variables for Production

If you have different settings for production:
- Update environment variables in Vercel dashboard
- Redeploy if needed

## Troubleshooting

### Build Errors

If the build fails:
1. Check Vercel build logs
2. Verify all dependencies are in `package.json`
3. Ensure Node.js version is compatible (check `package.json` for `engines` field)
4. Check for TypeScript errors locally: `npm run build`

### Environment Variables Missing

If features don't work:
1. Verify all environment variables are set in Vercel
2. Redeploy after adding variables
3. Check browser console for errors

### Images Not Loading

If images don't load:
1. Verify images are in `/public` directory
2. Check image paths start with `/` (not `/public/`)
3. Clear browser cache

### API Routes Not Working

If API routes fail:
1. Check Vercel function logs
2. Verify environment variables
3. Check CORS settings if making external requests

## Continuous Deployment

Once connected, Vercel will automatically deploy:
- ✅ Every push to `main` branch → Production
- ✅ Pull requests → Preview deployments

## Next Steps

1. **Test thoroughly** on production URL
2. **Set up custom domain** (if you have one)
3. **Monitor performance** and errors
4. **Set up backups** for user data (if storing locally)
5. **Consider database migration** (if using file-based storage, consider moving to a database for production)

## Support

If you encounter issues:
- Check Vercel documentation: https://vercel.com/docs
- Check Next.js deployment guide: https://nextjs.org/docs/deployment
- Review build logs in Vercel dashboard

