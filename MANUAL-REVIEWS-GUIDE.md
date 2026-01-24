# Manual Review Management - No API Keys Needed!

✅ **100% Free!** Manage reviews manually without any Google API keys or costs.

## How to Use

### Option 1: Admin Interface (Easiest)

1. **Visit the admin page:**
   ```
   http://localhost:3000/admin/reviews
   ```

2. **Select a roofer** from the dropdown

3. **Add reviews:**
   - Click "Add Review"
   - Fill in the form:
     - Reviewer Name
     - Rating (1-5 stars)
     - Review Text
     - Review Date
     - (Optional) Google Review URL
     - (Optional) Business Response
   - Click "Save Review"

4. **Edit or delete reviews:**
   - Click the edit icon to modify a review
   - Click the delete icon to remove a review

### Option 2: CSV Import (Bulk Import)

1. **Download the template:**
   - Click "Download Template" on the admin page
   - Or use: `data/roofers/reviews-template.csv`

2. **Fill in your reviews:**
   ```
   rooferId,reviewerName,rating,reviewText,reviewDate,googleReviewUrl,responseText,responseDate
   roofer-123,John Smith,5,"Great service!",2024-01-15,https://...,"Thank you!",2024-01-16
   roofer-123,Jane Doe,4,"Good work",2024-01-10,https://...,,
   ```

3. **Import:**
   - Click "Import CSV" on the admin page
   - Select your CSV file
   - Reviews are imported automatically!

### Option 3: Direct File Editing

You can also edit `app/roofers/data/reviews.ts` directly if you prefer.

## Features

✅ **No API keys** - completely free  
✅ **Easy to use** - simple form interface  
✅ **Bulk import** - CSV support  
✅ **Edit/Delete** - full CRUD operations  
✅ **Business responses** - add your responses to reviews  
✅ **Automatic display** - reviews appear on roofer pages automatically  

## CSV Format

Required columns:
- `rooferId` - The roofer's ID (from roofers.ts)
- `reviewerName` - Name of the reviewer
- `rating` - 1-5 stars
- `reviewText` - The review text
- `reviewDate` - Date in YYYY-MM-DD format

Optional columns:
- `googleReviewUrl` - Link to the review on Google
- `responseText` - Your business response
- `responseDate` - Date of your response
- `reviewerPhotoUrl` - Reviewer's photo URL

## Getting Roofer IDs

To find roofer IDs for your CSV:
1. Open `app/roofers/data/roofers.ts`
2. Look for the `id` field in each roofer object
3. Use that ID in your CSV

## Tips

- **Copy from Google:** When you see a review on Google, copy the text and paste it into the form
- **Bulk import:** Use CSV for importing many reviews at once
- **Keep it updated:** Add new reviews as you get them
- **Add responses:** Use the response field to show you engage with customers

## That's It!

No costs, no API keys, no complexity. Just add your reviews and they'll appear on your site! 🎉

















