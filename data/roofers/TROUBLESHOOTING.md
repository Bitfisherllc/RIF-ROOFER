# Troubleshooting Yelp Scraping Script

## The Script IS Working - Here's What to Expect

When you run:
```bash
python3 scrape-yelp-reviews.py --limit 10
```

**The script will WAIT for you to type something.** It's not broken - it's waiting for your input!

## What You Should See

```
======================================================================
YELP REVIEW SCRAPING & ANALYSIS
======================================================================
Total roofers to process: 10
Starting from index: 0

You'll be prompted to enter Yelp URLs for each roofer.
Press Ctrl+C at any time to save progress and exit.


======================================================================
Roofer: CF HANDYMAN LLC (Pinellas Park, FL)
======================================================================
Please find this roofer on Yelp:
  Search: https://www.yelp.com/search?find_desc=CF+HANDYMAN+LLC+roofing&find_loc=Pinellas+Park

Then copy and paste the Yelp business URL here.
Example: https://www.yelp.com/biz/company-name-city
(Press Enter to skip this roofer)

Yelp URL: 
```

**At this point, the cursor is blinking and waiting for you to:**
1. Type a Yelp URL and press Enter, OR
2. Just press Enter to skip this roofer

## Common Issues

### "Nothing happens after I run the command"
- **This is normal!** The script is waiting for you to type a Yelp URL
- Look for the blinking cursor after "Yelp URL: "
- Type something (or press Enter to skip)

### "Script exits immediately"
- Check if you're in the right directory:
  ```bash
  pwd
  # Should show: /Volumes/Whale/_CLIENTS/Florida Roofers/data/roofers
  ```

### "Command not found"
- Make sure you're using `python3` (not `python`)
- Try the full path:
  ```bash
  /usr/bin/python3 scrape-yelp-reviews.py --limit 10
  ```

### "Module not found"
- Install dependencies:
  ```bash
  pip3 install requests beautifulsoup4
  ```

## Step-by-Step Test

1. **Open Terminal**

2. **Navigate:**
   ```bash
   cd "/Volumes/Whale/_CLIENTS/Florida Roofers/data/roofers"
   ```

3. **Verify you're in the right place:**
   ```bash
   ls scrape-yelp-reviews.py
   # Should show: scrape-yelp-reviews.py
   ```

4. **Run the script:**
   ```bash
   python3 scrape-yelp-reviews.py --limit 1
   ```

5. **When you see "Yelp URL: " with a blinking cursor:**
   - Option A: Type a Yelp URL like `https://www.yelp.com/biz/example` and press Enter
   - Option B: Just press Enter to skip

6. **The script will then:**
   - Scrape the Yelp page (if you provided a URL)
   - Show results
   - Move to the next roofer (or finish if limit is 1)

## Quick Test

Try this to verify it works:

```bash
cd "/Volumes/Whale/_CLIENTS/Florida Roofers/data/roofers"
python3 scrape-yelp-reviews.py --limit 1
```

When prompted, just press **Enter** to skip. You should see:
```
  ⏭️  Skipped
```

Then it will finish and show:
```
======================================================================
Analysis complete!
Results saved to: yelp-reviews-analysis.json
```

## Still Not Working?

Share:
1. **What command you ran exactly**
2. **What you see** (copy/paste the output)
3. **What happens** when you type something

The script requires interactive input, so it MUST be run in a terminal window (not in an IDE or background process).
















