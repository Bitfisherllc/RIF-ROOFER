# Terminal Commands to Run

## Open Terminal (if not already open)

On Mac:
- Press `Cmd + Space` to open Spotlight
- Type "Terminal" and press Enter
- Or go to Applications → Utilities → Terminal

## Commands to Run

Once Terminal is open, copy and paste these commands one by one:

### 1. Navigate to Project Directory
```bash
cd "/Volumes/Whale/_CLIENTS/Florida Roofers"
```

### 2. Push to GitHub
```bash
git push -u origin main
```

### 3. When Prompted:

**Username:** `Bitfisherllc`

**Password:** Paste your GitHub Personal Access Token
- This is the token you got from https://github.com/settings/tokens
- It starts with `ghp_`
- ⚠️ It won't show on screen when you type (for security)

### 4. Expected Output

You should see something like:
```
Enumerating objects: XXXX, done.
Counting objects: 100% (XXXX/XXXX), done.
Delta compression using up to X threads
Compressing objects: 100% (XXXX/XXXX), done.
Writing objects: 100% (XXXX/XXXX), done.
To https://github.com/Bitfisherllc/RIF.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

## If You Get Errors

**"Repository not found":**
- Make sure the repository exists at https://github.com/Bitfisherllc/RIF
- If not, create it first at https://github.com/new

**"Authentication failed":**
- Double-check username: `Bitfisherllc`
- Make sure you're using the token (ghp_xxxxx), not your GitHub password
- Verify token has `repo` scope

**"Permission denied":**
- Regenerate token with `repo` scope
- Make sure you copied the entire token

---

**After successful push:** Go back to Vercel and refresh - your repository will appear!


