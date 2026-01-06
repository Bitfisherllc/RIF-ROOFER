# Batch Update All Roofers with Yelp Reviews

## Current Status
- **Total Roofers:** 686
- **With Yelp Data:** 0
- **Needs Scraping:** 686

## Recommended Approach

Since scraping requires manual Yelp URL entry, here's the best workflow:

### Option 1: Batch Processing (Recommended)

Process roofers in batches of 20-50 at a time:

```bash
# Process first 50 roofers
python3 scrape-yelp-reviews.py --limit 50

# After batch 1, continue with next 50
python3 scrape-yelp-reviews.py --start-from 50 --limit 50

# Continue in batches...
python3 scrape-yelp-reviews.py --start-from 100 --limit 50
```

**Benefits:**
- Progress saves automatically
- Can pause and resume anytime
- Less overwhelming than all 686 at once
- Can review results between batches

### Option 2: Focus on Priority Roofers First

1. Identify preferred/high-priority roofers
2. Process those first
3. Then work through the rest

### Option 3: Automated Search (Future Enhancement)

For faster processing, you could:
1. Use Yelp API (requires API key)
2. Or create a script that opens Yelp search URLs automatically

## Workflow Steps

### Step 1: Start First Batch

```bash
cd data/roofers
python3 scrape-yelp-reviews.py --limit 50
```

For each roofer:
1. Script shows roofer name and location
2. You search Yelp (script provides search URL)
3. Copy/paste Yelp business URL
4. Script extracts reviews automatically
5. Press Enter to skip if not found

### Step 2: Check Progress

```bash
python3 update-all-roofers-yelp.py
```

This shows:
- How many have Yelp data
- How many still need scraping
- Which are ready to import

### Step 3: Import to Site

After each batch (or when you have enough):

```bash
python3 import-yelp-to-site.py
```

Then manually map roofer IDs in `app/roofers/data/yelp-reviews.ts`

### Step 4: Continue with Next Batch

```bash
# Check how many processed
python3 -c "import json; f=open('yelp-reviews-analysis.json'); print(f'{len(json.load(f))} processed'); f.close()"

# Continue from where you left off
python3 scrape-yelp-reviews.py --start-from 50 --limit 50
```

## Tips for Efficiency

1. **Use Search URLs:** The script provides Yelp search URLs - use them!
2. **Skip Unknown:** Don't spend too long on roofers you can't find - press Enter to skip
3. **Batch Size:** 20-50 roofers per session is manageable
4. **Take Breaks:** Process in multiple sessions
5. **Review Results:** Check the generated reports between batches

## Time Estimate

- **Per Roofer:** ~1-2 minutes (finding URL + scraping)
- **50 Roofers:** ~1-2 hours
- **All 686 Roofers:** ~12-24 hours total (spread over multiple sessions)

## Quick Commands

```bash
# Check current progress
python3 update-all-roofers-yelp.py

# Process next 50
python3 scrape-yelp-reviews.py --start-from [N] --limit 50

# Generate report after batch
python3 generate-yelp-report-scraped.py --csv

# Import to site
python3 import-yelp-to-site.py
```

## Next Steps

1. **Start First Batch:**
   ```bash
   python3 scrape-yelp-reviews.py --limit 50
   ```

2. **After Batch Completes:**
   - Review results
   - Import to site if ready
   - Continue with next batch

3. **Repeat** until all 686 roofers are processed

Good luck! 🚀
















