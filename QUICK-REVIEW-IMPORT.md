# Quick Start: Import Reviews for All Roofers

## Fastest Method: Use Free Scraping Services

### Option A: Outscraper (Easiest)

1. **Sign up** (free): https://outscraper.com
2. **Get API key** from dashboard
3. **Add to `.env.local`**:
   ```bash
   OUTSCRAPER_API_KEY=your-key-here
   ```
4. **Add Google URLs** to roofers (see below)
5. **Run script**:
   ```bash
   python3 scripts/fetch-google-reviews-free.py
   ```

### Option B: Manual CSV (No Signup Needed)

1. **Get reviews** from Google Maps for each roofer
2. **Fill CSV** using template: `data/roofers/reviews-import-template.csv`
3. **Import** via `/admin/reviews` → Import CSV

---

## Adding Google Business URLs to Roofers

To enable automatic fetching, add `googleBusinessUrl` to each roofer in `app/roofers/data/roofers.ts`:

```typescript
'roofer-slug': {
  id: 'roofer-123',
  name: 'Roofer Name',
  // ... other fields ...
  googleBusinessUrl: 'https://www.google.com/maps/place/...', // Add this
}
```

**How to find the URL:**
1. Search Google Maps for the roofer
2. Click on their business
3. Copy URL from address bar
4. Paste into `roofers.ts`

---

## Current Status

- ✅ **1 ROOF LLC** has 7 sample reviews (see `/roofers/1-roof-llc`)
- ⚠️ **All other roofers** need reviews added

---

## Next Steps

**Choose one:**

1. **Use Outscraper** (free, automated) - See `BULK-IMPORT-REVIEWS.md`
2. **Manual CSV import** (free, manual work) - See `GET-GOOGLE-REVIEWS-GUIDE.md`
3. **I can help you** set up automated fetching

Which method would you like to use?
















