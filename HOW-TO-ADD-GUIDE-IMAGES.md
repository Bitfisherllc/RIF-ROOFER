# How to Add Photos to Guides

## Quick Steps

1. **Add your image file** to the `/public/guides/` directory
2. **Name it correctly** using the pattern: `guide-[guide-slug]-hero.jpg`
3. **Update the guide data** in `app/guides/data/guides.ts` to reference the image

## Step-by-Step Instructions

### Step 1: Prepare Your Image

- **Recommended size**: 1200x600px (16:9 aspect ratio)
- **File size**: Keep under 200KB for fast loading
- **Format**: JPG or WebP (WebP is preferred for better compression)
- **Naming**: Use the pattern `guide-[slug]-hero.jpg`

**Example**: If your guide slug is `complete-guide-to-roofing-in-tampa`, name your image:
```
guide-complete-guide-to-roofing-in-tampa-hero.jpg
```

### Step 2: Add the Image File

Copy your image file to:
```
/public/guides/guide-[slug]-hero.jpg
```

**Example path**: 
```
/public/guides/guide-complete-guide-to-roofing-in-tampa-hero.jpg
```

### Step 3: Update the Guide Data

Open `app/guides/data/guides.ts` and find your guide. Add (or update) the `featuredImage` field:

```typescript
'your-guide-slug': {
  id: '1',
  title: 'Your Guide Title',
  slug: 'your-guide-slug',
  // ... other fields ...
  featuredImage: '/guides/guide-your-guide-slug-hero.jpg',  // Add this line
  // ... rest of fields ...
}
```

**Important**: The path must start with `/guides/` (not `/public/guides/`) because Next.js serves files from `/public/` at the root URL.

### Step 4: Find Your Guide's Slug

If you're not sure what the slug is for your guide:
1. Look at the URL when viewing the guide on the site (e.g., `/guides/complete-guide-to-roofing-in-tampa`)
2. Or check the `slug` field in the guide data file

## Example

Here's a complete example:

**File to add**:
```
/public/guides/guide-hurricane-roof-repair-hero.jpg
```

**In `app/guides/data/guides.ts`**:
```typescript
'hurricane-roof-repair': {
  id: '2',
  title: 'Hurricane Roof Repair Guide',
  slug: 'hurricane-roof-repair',
  category: 'storm-damage',
  featuredImage: '/guides/guide-hurricane-roof-repair-hero.jpg',  // ← Add this
  metaDescription: '...',
  publishDate: '2024-12-15',
  // ... rest of guide data ...
}
```

## Image Sources

If you need stock photos, here are some recommended free sources:

- **Unsplash**: https://unsplash.com/s/photos/roofing
- **Pexels**: https://www.pexels.com/search/roofing/
- **Pixabay**: https://pixabay.com/images/search/roofing/

Search for terms like:
- "roofing"
- "roof repair"
- "metal roof"
- "Florida roof"
- "hurricane damage"
- "roofing contractor"

## Image Optimization Tips

For best performance:

1. **Resize before uploading**: Use image editing software to resize to 1200x600px
2. **Compress the file**: Use tools like:
   - [Squoosh](https://squoosh.app/) (free, browser-based)
   - [TinyPNG](https://tinypng.com/) (free, JPG/PNG compression)
3. **Use WebP format** when possible (better compression than JPG)
4. **Aim for under 200KB** file size

## Where Images Appear

Once added, the featured image will display on:

1. **Individual guide pages**: Large hero image at the top of the guide content
2. **Guide listing pages**: Thumbnail image on guide cards (if implemented)

## Need Help?

If you have questions or need help:
- Check that the file path matches exactly (case-sensitive)
- Verify the image is in `/public/guides/` (not just `/guides/`)
- Make sure the path in the code starts with `/guides/` (Next.js serves `/public/` at root)
- Check the browser console for any 404 errors


