# How to Get Your Free Yelp API Key

## Step-by-Step Guide

### Step 1: Go to Yelp Developers
1. Open your web browser
2. Go to: **https://www.yelp.com/developers**
3. Click **"Log In"** (top right) or **"Sign Up"** if you don't have an account

### Step 2: Create/Login to Your Account
- If you have a Yelp account: Log in with your credentials
- If you don't have an account: Click "Sign Up" and create a free account

### Step 3: Create a New App
1. After logging in, go to: **https://www.yelp.com/developers/v3/manage_app**
2. You'll see a page to "Create App"
3. Fill out the form:
   - **App Name:** (e.g., "Florida Roofers Analysis" or "Roofer Reviews")
   - **Industry:** Select "Other" or "Business Services"
   - **Description:** (e.g., "Analyzing Yelp reviews for Florida roofing companies")
   - **Website:** (optional - can use your company website or leave blank)
   - **Contact Email:** Your email address

### Step 4: Get Your API Key
1. After creating the app, you'll see your **API Key**
2. **Copy the API Key** - it will look something like:
   ```
   abc123XYZ789def456ghi012jkl345mno678pqr901stu234vwx567yz
   ```
3. **Important:** Keep this key secure and don't share it publicly

### Step 5: Set the API Key

**Option A: Set as Environment Variable (Recommended)**
```bash
cd "/Volumes/Whale/_CLIENTS/Florida Roofers/data/roofers"
export YELP_API_KEY='your-api-key-here'
```

**Option B: Pass as Command Line Argument**
```bash
python3 find-yelp-reviews-api.py --api-key your-api-key-here
```

**Option C: Add to Your Shell Profile (Permanent)**
```bash
# Add to ~/.zshrc or ~/.bash_profile
echo 'export YELP_API_KEY="your-api-key-here"' >> ~/.zshrc
source ~/.zshrc
```

### Step 6: Test the API Key
```bash
cd "/Volumes/Whale/_CLIENTS/Florida Roofers/data/roofers"
python3 find-yelp-reviews-api.py --limit 5
```

If it works, you'll see output like:
```
[1/5] Processing: COMPANY NAME
  Found: Company Name
  Rating: 4.5 stars (23 reviews)
```

## Free Tier Limits

The free Yelp API (Fusion API) includes:
- **5,000 API calls per day** (free)
- Perfect for your 686 roofers (will take ~2-3 hours)
- No credit card required
- No expiration (as long as you use it)

## Troubleshooting

### "API key required" error
- Make sure you set the `YELP_API_KEY` environment variable
- Or pass it with `--api-key` flag
- Check that you copied the entire key (no spaces)

### "Rate limit exceeded" error
- You've hit the 5,000 calls/day limit
- Wait 24 hours or the script will automatically wait and retry
- The script processes ~5 roofers/minute, so 686 roofers = ~2.3 hours

### "Invalid API key" error
- Double-check you copied the entire key correctly
- Make sure there are no extra spaces
- Try creating a new app if the key doesn't work

## Quick Reference

**Get API Key:** https://www.yelp.com/developers/v3/manage_app

**Set Key:**
```bash
export YELP_API_KEY='your-key'
```

**Run Analysis:**
```bash
python3 find-yelp-reviews-api.py
```

**Check Progress:**
```bash
python3 -c "import json; f=open('yelp-reviews-analysis.json'); print(f'{len(json.load(f))} processed'); f.close()"
```

## Next Steps

Once you have your API key set:
1. Test with 10 roofers: `python3 find-yelp-reviews-api.py --limit 10`
2. If successful, run full analysis: `python3 find-yelp-reviews-api.py`
3. Generate report: `python3 generate-yelp-report.py --csv`

















