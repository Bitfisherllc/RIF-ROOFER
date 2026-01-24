# Complete Setup Guide - New Repository

## Step 1: Choose Your Repository Name

**What do you want to name your GitHub repository?**

Examples:
- `florida-roofers`
- `rif-roofing-website`
- `rif-website`
- Or your preferred name

**Tell me the name and I'll guide you through the rest!**

---

## Step 2: Create GitHub Repository

1. **Go to GitHub:**
   - Open: https://github.com/new
   - Or click the "+" icon (top right) → "New repository"

2. **Repository Settings:**
   - **Repository name:** [YOUR CHOSEN NAME]
   - **Description:** (Optional) "Florida Roofers website - Stone-coated metal roofing directory"
   - **Visibility:** Choose Public or Private
   - **⚠️ IMPORTANT - Leave these UNCHECKED:**
     - ❌ Do NOT check "Initialize this repository with a README"
     - ❌ Do NOT check "Add .gitignore"
     - ❌ Do NOT check "Choose a license"
   - Leave everything empty/unchecked

3. **Click "Create repository"**

4. **After creating, GitHub will show you commands - DON'T RUN THEM YET!**

---

## Step 3: Connect Local Repository to GitHub

After you tell me the repository name, I'll give you the exact commands to run.

The commands will be:
```bash
git remote add origin https://github.com/Bitfisherllc/[YOUR-REPO-NAME].git
git branch -M main
git push -u origin main
```

---

## Step 4: Push to GitHub

When you run `git push -u origin main`:

1. **Username prompt:** Enter `Bitfisherllc`
2. **Password prompt:** 
   - Paste your GitHub Personal Access Token
   - ⚠️ The field will be INVISIBLE (this is normal!)
   - Just paste/type your token and press Enter
   - It won't show anything on screen, but it's working

**Get your token from:** https://github.com/settings/tokens
- Click "Generate new token" → "Generate new token (classic)"
- Name: "RIF Deployment"
- Select scope: `repo` (full control)
- Generate and copy the token (starts with `ghp_`)

---

## Step 5: Verify Push

1. **Check GitHub:**
   - Go to: https://github.com/Bitfisherllc/[YOUR-REPO-NAME]
   - You should see all your files and folders

2. **If you see files:** ✅ Push was successful!

---

## Step 6: Deploy to Vercel

1. **Go to Vercel:**
   - Open: https://vercel.com/dashboard
   - Make sure you're logged in

2. **Import Project:**
   - Click **"Add New..."** → **"Project"**
   - Click **"Import Git Repository"**
   - Find **"Bitfisherllc/[YOUR-REPO-NAME]"** in the list
   - Click **"Import"**

3. **Deploy:**
   - Vercel will auto-detect Next.js
   - Click **"Deploy"** (use default settings)
   - Wait 2-3 minutes for build

4. **Your site will be live!** 🎉

---

## Step 7: Add Environment Variables (After Deployment)

1. In Vercel project → **Settings** → **Environment Variables**
2. Add:
   - `RESEND_API_KEY` (from your .env.local)
   - `RESEND_FROM_EMAIL` (from your .env.local)
   - `TURNSTILE_SECRET_KEY` (if you have it)
3. **Redeploy** after adding variables

---

## Ready to Start?

**Just tell me:**
1. What do you want to name your repository?
2. Have you created it on GitHub yet? (Yes/No)

Then I'll give you the exact commands to run!


