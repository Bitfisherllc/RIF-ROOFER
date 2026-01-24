# Push to GitHub - Authentication Required

Git needs authentication to push. Here are your options:

## Option 1: Push Manually (Easiest)

Run these commands in your terminal:

```bash
cd "/Volumes/Whale/_CLIENTS/Florida Roofers"
git remote add origin https://github.com/Bitfisherllc/RIF.git
git branch -M main
git push -u origin main
```

Git will prompt you for:
- **Username:** Bitfisherllc
- **Password:** Use a GitHub Personal Access Token (NOT your GitHub password)

**To get a Personal Access Token:**
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Name it: "RIF Deployment"
4. Select scope: `repo` (full control of private repositories)
5. Click "Generate token"
6. **Copy the token** (you won't see it again!)
7. Use this token as your password when pushing

## Option 2: Use SSH (If you have SSH keys set up)

If you have SSH keys configured with GitHub:

```bash
cd "/Volumes/Whale/_CLIENTS/Florida Roofers"
git remote set-url origin git@github.com:Bitfisherllc/RIF.git
git push -u origin main
```

## Option 3: Use GitHub CLI (If installed)

```bash
cd "/Volumes/Whale/_CLIENTS/Florida Roofers"
gh auth login
git push -u origin main
```

---

**Recommendation:** Use Option 1 (Personal Access Token) - it's the most straightforward!

Once you've pushed, let me know and we'll proceed to Vercel deployment!


