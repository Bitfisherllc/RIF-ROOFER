# Guide Images Directory

This directory contains images for roofing guides.

## Directory Structure

Place guide images here with descriptive filenames:
- `guide-[slug]-hero.jpg` - Featured/hero images for individual guides
- `guide-[slug]-section-[number].jpg` - Images for specific sections

## Image Sources

Recommended free image sources:
- **Unsplash**: https://unsplash.com/s/photos/roofing
- **Pexels**: https://www.pexels.com/search/roofing/
- **Pixabay**: https://pixabay.com/images/search/roofing/

## Image Specifications

- **Hero/Featured Images**: 1200x600px (16:9 aspect ratio), max 200KB
- **Content Images**: 800x600px (4:3 aspect ratio), max 150KB
- **Format**: JPG or WebP (preferred for optimization)

## Usage

In your guide data (`app/guides/data/guides.ts`), add the `featuredImage` field:

```typescript
'guide-slug': {
  // ... other fields ...
  featuredImage: '/guides/guide-slug-hero.jpg',
  // ... rest of fields ...
}
```

The featured image will automatically display on:
- Individual guide pages (hero section)
- Guide listing pages (thumbnail)

