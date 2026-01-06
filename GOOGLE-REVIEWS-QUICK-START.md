# Google Reviews Setup - Quick Start Checklist

Follow this checklist to get Google reviews syncing automatically.

## ✅ Setup Checklist

- [ ] **Step 1**: Created Google Cloud Project
- [ ] **Step 2**: Enabled Google Business Profile API
- [ ] **Step 3**: Created Service Account (`rif-reviews-sync`)
- [ ] **Step 4**: Downloaded Service Account JSON key
- [ ] **Step 5**: Added service account email to Google Business Profile as Manager/Owner
- [ ] **Step 6**: Created `.env.local` with credentials
- [ ] **Step 7**: Tested `/api/sync-google-reviews` to get location IDs
- [ ] **Step 8**: Added `googleLocationId` to roofers in `roofers.ts`
- [ ] **Step 9**: Tested manual sync - reviews appear!
- [ ] **Step 10**: Set up weekly automatic sync

## 🚀 Quick Commands

### Test API Connection
```bash
# Get list of Google Business locations
curl http://localhost:3000/api/sync-google-reviews
```

### Manual Sync
```bash
# Sync reviews manually
curl -X POST http://localhost:3000/api/sync-google-reviews \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Generate Secure Keys
```bash
# Generate API key
openssl rand -hex 32

# Generate cron secret
openssl rand -hex 32
```

## 📝 Files to Edit

1. **`.env.local`** - Add Google credentials
2. **`app/roofers/data/roofers.ts`** - Add `googleLocationId` to each roofer

## 🔍 Verify Setup

1. Visit: `http://localhost:3000/api/sync-google-reviews`
   - Should show your Google Business locations

2. Run manual sync
   - Should return success with statistics

3. Check: `app/roofers/data/reviews.ts`
   - Should contain review data

4. Visit a roofer profile page
   - Reviews should display!

## 📚 Full Documentation

See `GOOGLE-REVIEWS-SETUP-GUIDE.md` for detailed step-by-step instructions.

## ⚠️ Important Notes

- **Never commit** `.env.local` to git (it's already ignored)
- Keep your service account JSON file secure
- Test the API connection before setting up automatic sync
- Google may have deprecated some review endpoints - see `data/roofers/API-ALTERNATIVES.md` if you encounter issues
















