# Vercel Deployment - Step by Step

## ✅ Prerequisites
- ✅ GitHub repository created: https://github.com/Bitfisherllc/RIF
- ✅ Code committed and ready (or pushed)

## 🚀 Deploy to Vercel

### Step 1: Go to Vercel Dashboard
1. Open: https://vercel.com/dashboard
2. Log in with your GitHub account (if not already logged in)

### Step 2: Import Your Repository
1. Click **"Add New..."** button (top right corner)
2. Click **"Project"** from the dropdown
3. You'll see "Import Git Repository"
4. Find **"Bitfisherllc/RIF"** in the list
5. Click **"Import"** next to it

### Step 3: Configure Project Settings
Vercel will auto-detect Next.js! Just verify these settings:

**Framework Preset:** Next.js (auto-detected)  
**Root Directory:** `./` (leave as default)  
**Build Command:** `npm run build` (auto-detected)  
**Output Directory:** `.next` (auto-detected)  
**Install Command:** `npm install` (auto-detected)  

**Just click "Deploy" button!** ✨

### Step 4: Wait for Deployment
- Build will take 2-3 minutes
- You'll see build logs in real-time
- When done, you'll see "Congratulations!" message

### Step 5: Add Environment Variables (Important!)

After deployment completes:

1. Click **"Settings"** tab (top menu)
2. Click **"Environment Variables"** (left sidebar)
3. Add these variables (if you have them):

   **Variable 1:**
   - Name: `RESEND_API_KEY`
   - Value: (paste your Resend API key from .env.local)
   - Environments: Production, Preview, Development (select all)

   **Variable 2:**
   - Name: `RESEND_FROM_EMAIL`
   - Value: (paste your from email, e.g., `RIF Roofing <noreply@yourdomain.com>`)
   - Environments: Production, Preview, Development (select all)

   **Variable 3 (Optional - if using spam protection):**
   - Name: `TURNSTILE_SECRET_KEY`
   - Value: (paste your Cloudflare Turnstile secret key)
   - Environments: Production, Preview, Development (select all)

4. Click **"Save"** for each variable

### Step 6: Redeploy After Adding Variables
1. Go to **"Deployments"** tab
2. Find your latest deployment
3. Click the **"..."** menu (three dots)
4. Click **"Redeploy"**
5. Wait for redeployment to complete

## 🎉 Your Site is Live!

Your site will be available at:
- **Production URL:** `https://rif.vercel.app` (or similar)
- Vercel will show you the exact URL after deployment

## 📋 Post-Deployment Checklist

- [ ] Visit your live site
- [ ] Test homepage
- [ ] Test guides page
- [ ] Test videos page
- [ ] Test roofers directory
- [ ] Test contact form (if environment variables added)
- [ ] Test free estimate form (if environment variables added)
- [ ] Test admin pages

## 🔄 Automatic Deployments

Once connected:
- ✅ Every push to `main` branch → Auto-deploys to production
- ✅ Pull requests → Auto-creates preview deployments

## 🆘 Troubleshooting

**Build fails?**
- Check build logs in Vercel dashboard
- Verify all dependencies are in package.json
- Check for TypeScript errors locally: `npm run build`

**Environment variables not working?**
- Make sure you redeployed after adding variables
- Check variable names match exactly (case-sensitive)
- Verify variables are added to correct environments

**Contact forms not working?**
- Verify RESEND_API_KEY is set correctly
- Check Resend dashboard for email logs
- Verify RESEND_FROM_EMAIL matches a verified domain in Resend

## 🎯 Next Steps After Deployment

1. **Custom Domain (Optional):**
   - Go to Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

2. **Monitor Performance:**
   - Check Vercel Analytics (if enabled)
   - Monitor deployment logs
   - Check error logs in Vercel dashboard

3. **Test Everything:**
   - Test all forms
   - Test authentication
   - Test admin features
   - Test on mobile devices

---

**Ready to deploy?** Just follow the steps above! 🚀


