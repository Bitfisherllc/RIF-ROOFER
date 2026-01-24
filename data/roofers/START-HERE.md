# How to Start Yelp Scraping

## Quick Start

1. **Open Terminal** (Applications > Utilities > Terminal, or Cmd+Space, type "Terminal")

2. **Navigate to the directory:**
   ```bash
   cd "/Volumes/Whale/_CLIENTS/Florida Roofers/data/roofers"
   ```

3. **Run the script:**
   ```bash
   python3 scrape-yelp-reviews.py --limit 10
   ```

## What Should Happen

You should see:
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

Then it waits for you to type/paste a Yelp URL.

## Troubleshooting

### If nothing happens:
- Make sure you're in the right directory
- Check: `ls scrape-yelp-reviews.py` (should show the file)
- Try: `python3 --version` (should show Python 3.x)

### If you get "command not found":
- Try: `python3 scrape-yelp-reviews.py --limit 10`
- Or: `/usr/bin/python3 scrape-yelp-reviews.py --limit 10`

### If you get import errors:
```bash
pip3 install requests beautifulsoup4
```

### If script runs but exits immediately:
- The script requires interactive input
- Make sure you're running it in a terminal (not in an IDE)
- It should wait for you to type a Yelp URL

## Test First

Run the diagnostic:
```bash
python3 test-script.py
```

This will check if everything is set up correctly.

## Need Help?

If it's still not working, share:
1. What command you ran
2. What error message you see (if any)
3. What happens (nothing? error? exits immediately?)

















