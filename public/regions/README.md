# Region Background Images

This directory contains optimized WebP background images for each region page.

## Required Images

Each region requires a background image in WebP format:

- `sun-coast.webp` - Sun Coast (Tampa Bay area, beaches, coastal scenery)
- `treasure-coast.webp` - Treasure Coast (barrier islands, beaches, waterways)
- `southwest-florida.webp` - Southwest Florida (Gulf Coast, mangroves, beaches)
- `south-florida.webp` - South Florida (Miami, tropical, urban coastal)
- `north-florida.webp` - North Florida (Jacksonville, St. Augustine, historic coastal)
- `florida-panhandle.webp` - Florida Panhandle (Emerald Coast, white sand beaches, pine forests)
- `first-coast.webp` - First Coast (historic St. Augustine, Atlantic coast)
- `central-florida.webp` - Central Florida (Orlando area, lakes, theme parks in distance)

## Image Requirements

- **Format**: WebP
- **Dimensions**: 1920x1080 (16:9 aspect ratio)
- **Quality**: Optimized for web (85% quality)
- **File Size**: Target < 500KB per image
- **Content**: Should reflect the scenic characteristics of each region

## How to Add Images

### Option 1: Using the Optimization Script

1. Find or download a high-quality image for the region (JPG, PNG, etc.)
2. Install dependencies:
   ```bash
   npm install --save-dev sharp
   ```
3. Run the optimization script:
   ```bash
   node scripts/optimize-region-images.js <path-to-image> <region-slug>
   ```
   
   Example:
   ```bash
   node scripts/optimize-region-images.js ~/Downloads/tampa-bay-sunset.jpg sun-coast
   ```

### Option 2: Manual Conversion

1. Use an online tool like [Squoosh](https://squoosh.app/) or [CloudConvert](https://cloudconvert.com/)
2. Resize to 1920x1080
3. Convert to WebP format with 85% quality
4. Save as `{region-slug}.webp` in this directory

## Image Sources

Recommended free stock photo sources:

- **Pixabay**: https://pixabay.com (search for "Tampa Bay", "Florida coast", etc.)
- **Pexels**: https://pexels.com (search for Florida regions)
- **Unsplash**: https://unsplash.com (high-quality free photos)
- **Good Free Photos**: https://www.goodfreephotos.com (public domain)

### Search Terms by Region

- **Sun Coast**: "Tampa Bay", "Clearwater Beach", "St. Petersburg Florida", "Gulf Coast Florida"
- **Treasure Coast**: "Vero Beach", "Stuart Florida", "Treasure Coast Florida", "Indian River"
- **Southwest Florida**: "Naples Florida", "Sarasota", "Fort Myers", "Gulf Coast sunset"
- **South Florida**: "Miami Beach", "Key West", "Fort Lauderdale", "South Florida coast"
- **North Florida**: "Jacksonville Beach", "St. Augustine", "Atlantic Coast Florida"
- **Florida Panhandle**: "Destin Florida", "Pensacola Beach", "Emerald Coast", "Panhandle beaches"
- **First Coast**: "St. Augustine", "Ponte Vedra", "First Coast Florida"
- **Central Florida**: "Orlando skyline", "Central Florida lakes", "Florida landscape"

## Current Status

- ✅ Infrastructure set up
- ⏳ Images need to be added

## Notes

- Images should be scenic and represent the region's character
- Avoid images with prominent text or logos
- Prefer images with good contrast for text overlay readability
- The component includes a semi-transparent white overlay (85% opacity) for text readability
















