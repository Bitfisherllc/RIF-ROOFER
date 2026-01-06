# Next Steps - Deploy to Vercel

## ✅ What's Done

- ✅ Git repository initialized
- ✅ All files committed
- ✅ Code pushed to GitHub: https://github.com/Bitfisherllc/RIF

## 📝 Step 1: Deploy to Vercel

1. **Go to Vercel:**
   - Open: https://vercel.com/dashboard
   - Make sure you're logged in

2. **Import Project:**
   - Click **"Add New..."** button (top right)
   - Click **"Project"**
   - Click **"Import Git Repository"**
   - Find and click on **"Bitfisherllc/RIF"** repository
   - Click **"Import"**

3. **Configure Project (Vercel will auto-detect):**
   - **Framework Preset:** Next.js (should be auto-detected)
   - **Root Directory:** `./` (default)
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `.next` (default)
   - **Install Command:** `npm install` (default)
   
   **Just click "Deploy" - Vercel will handle everything!**

4. **Wait for deployment** (usually 2-3 minutes)

## 📝 Step 2: Add Environment Variables (After First Deploy)

After the first deployment completes, add your environment variables:

1. Go to your project in Vercel dashboard
2. Click **"Settings"** → **"Environment Variables"**
3. Add these variables (if you have them):

   - **RESEND_API_KEY** = (your Resend API key from .env.local)
   - **RESEND_FROM_EMAIL** = (your email, e.g., `RIF Roofing <noreply@yourdomain.com>`)
   - **TURNSTILE_SECRET_KEY** = (if using Cloudflare Turnstile)

4. After adding variables, go to **"Deployments"** tab
5. Click the **"..."** menu on the latest deployment
6. Click **"Redeploy"**

## 📝 Step 3: Test Your Site

Your site will be live at: `https://rif.vercel.app` (or similar)

Test these pages:
- ✅ Homepage
- ✅ Guides
- ✅ Videos  
- ✅ Roofers directory
- ✅ Contact form
- ✅ Admin pages

## 🎉 You're Live!

Once deployed, your site will automatically update whenever you push to GitHub!

---

**Need help?** Just let me know if you encounter any issues during deployment!

