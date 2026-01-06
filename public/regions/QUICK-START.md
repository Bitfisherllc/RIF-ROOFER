# Quick Start: Adding Sun Coast Background Image

## Step 1: Install Dependencies

```bash
npm install --save-dev sharp
```

## Step 2: Get a Sun Coast Image

Find a scenic image representing the Sun Coast (Tampa Bay area). Good sources:
- **Pixabay**: Search for "Tampa Bay Florida" or "Clearwater Beach"
- **Pexels**: Search for "Florida Gulf Coast" or "St. Petersburg"
- **Unsplash**: Search for "Tampa Bay" or "Florida coast"

Look for images that show:
- Beaches and coastal scenery
- Tampa Bay area landmarks
- Gulf Coast sunsets
- Coastal Florida landscapes

## Step 3: Optimize the Image

### Option A: If you have a local file

```bash
node scripts/optimize-region-images.js ~/path/to/your/image.jpg sun-coast
```

### Option B: If you have a direct image URL

```bash
node scripts/download-region-image.js https://example.com/image.jpg sun-coast
```

## Step 4: Verify

The image should now be at:
```
public/regions/sun-coast.webp
```

Visit the Sun Coast region page to see the background image in action!

## Image Specifications

- **Format**: WebP
- **Dimensions**: 1920x1080 (automatically resized by script)
- **Quality**: 85% (optimized for web)
- **File Size**: Should be < 500KB

## Next Steps

Once the Sun Coast image is working, you can add images for the other regions:
- `treasure-coast.webp`
- `southwest-florida.webp`
- `south-florida.webp`
- `north-florida.webp`
- `florida-panhandle.webp`
- `first-coast.webp`
- `central-florida.webp`

Use the same process for each region!
















