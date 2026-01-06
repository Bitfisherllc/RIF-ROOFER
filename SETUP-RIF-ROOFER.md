# Setup Guide for RIF-ROOFER Repository

## ✅ Step 1: Create GitHub Repository

1. **Go to GitHub:**
   - Open: https://github.com/new

2. **Repository Settings:**
   - **Repository name:** `RIF-ROOFER`
   - **Description:** (Optional) "Florida Roofers website - Stone-coated metal roofing directory"
   - **Visibility:** Choose Public or Private
   - **⚠️ IMPORTANT - Leave these UNCHECKED:**
     - ❌ Do NOT check "Initialize this repository with a README"
     - ❌ Do NOT check "Add .gitignore"
     - ❌ Do NOT check "Choose a license"

3. **Click "Create repository"**

4. **After creating, come back here for Step 2!**

---

## ✅ Step 2: Push to GitHub

After you've created the repository, run these commands in your terminal:

```bash
cd "/Volumes/Whale/_CLIENTS/Florida Roofers"
git branch -M main
git push -u origin main
```

**When prompted:**
- **Username:** `Bitfisherllc`
- **Password:** Paste your GitHub Personal Access Token (ghp_xxxxx)
  - ⚠️ The password field is INVISIBLE - this is normal!
  - Just paste/type your token and press Enter

**Get your token from:** https://github.com/settings/tokens
- Click "Generate new token" → "Generate new token (classic)"
- Name: "RIF-ROOFER Deployment"
- Select scope: `repo` (full control)
- Generate and copy the token

---

## ✅ Step 3: Verify Push

1. **Check GitHub:**
   - Go to: https://github.com/Bitfisherllc/RIF-ROOFER
   - You should see all your files and folders
   - If you see files: ✅ Push was successful!

---

## ✅ Step 4: Deploy to Vercel

1. **Go to Vercel:**
   - Open: https://vercel.com/dashboard
   - Click **"Add New..."** → **"Project"**

2. **Import Repository:**
   - Find **"Bitfisherllc/RIF-ROOFER"** in the list
   - Click **"Import"**

3. **Deploy:**
   - Vercel will auto-detect Next.js
   - Click **"Deploy"** (use default settings)
   - Wait 2-3 minutes

4. **Your site will be live!** 🎉

---

## ✅ Step 5: Add Environment Variables

After deployment completes:

1. Go to **Settings** → **Environment Variables**
2. Add:
   - `RESEND_API_KEY` (from your .env.local)
   - `RESEND_FROM_EMAIL` (from your .env.local)
   - `TURNSTILE_SECRET_KEY` (if you have it)
3. **Redeploy** after adding variables

---

## Current Status

✅ Git remote configured: `https://github.com/Bitfisherllc/RIF-ROOFER.git`
✅ Ready to push once repository is created

**Next:** Create the repository on GitHub, then run the push commands!

