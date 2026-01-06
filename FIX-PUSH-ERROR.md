# Fix: Pre-Receive Hook Declined Error

## Common Causes & Solutions

### Solution 1: Repository Has Existing Content

If you created the repository with a README, .gitignore, or license:

**Option A: Pull First, Then Push**
```bash
cd "/Volumes/Whale/_CLIENTS/Florida Roofers"
git pull origin main --allow-unrelated-histories
git push -u origin main
```

**Option B: Force Push (if repository is empty/just created)**
```bash
cd "/Volumes/Whale/_CLIENTS/Florida Roofers"
git push -u origin main --force
```

⚠️ **Warning:** Only use `--force` if the repository is empty or you're sure you want to overwrite!

---

### Solution 2: Branch Name Mismatch

If GitHub created the repository with a different default branch (like `master`):

**Check what branch GitHub expects:**
1. Go to: https://github.com/Bitfisherllc/RIF-ROOFER/settings
2. Check "Default branch" (might be `master` instead of `main`)

**If it's `master`, push to that instead:**
```bash
git push -u origin main:master
```

Or change GitHub's default branch to `main` in repository settings.

---

### Solution 3: Delete and Recreate Repository

If the repository has unwanted content:

1. **Delete the repository:**
   - Go to: https://github.com/Bitfisherllc/RIF-ROOFER/settings
   - Scroll to bottom → "Danger Zone"
   - Click "Delete this repository"
   - Type repository name to confirm

2. **Create it again:**
   - Go to: https://github.com/new
   - Name: `RIF-ROOFER`
   - **DO NOT check any boxes** (no README, no .gitignore, no license)
   - Click "Create repository"

3. **Then push:**
   ```bash
   git push -u origin main
   ```

---

### Solution 4: Check Repository Settings

1. Go to: https://github.com/Bitfisherllc/RIF-ROOFER/settings
2. Check "Branches" → "Branch protection rules"
3. If there are rules, temporarily disable them
4. Or add yourself as an admin/owner

---

## Quick Fix (Try This First)

If the repository is empty or just created:

```bash
cd "/Volumes/Whale/_CLIENTS/Florida Roofers"
git push -u origin main --force
```

This will overwrite any existing content in the repository.

---

**Most likely issue:** Repository was created with a README or other files. Try Solution 1 (pull first) or Solution 3 (recreate empty).

