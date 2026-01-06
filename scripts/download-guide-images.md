# Guide Images Download Instructions

Since I cannot directly download images from the internet, here's a step-by-step process to get images for your guides:

## Quick Method: Use Browser Extensions

1. **Install an image downloader extension** (like "Image Downloader" for Chrome/Firefox)
2. Visit these sites and search for roofing-related images:
   - https://unsplash.com/s/photos/roofing
   - https://www.pexels.com/search/roofing/
   - https://pixabay.com/images/search/roofing/

3. Download images that match your guide topics:
   - **Location guides**: City skylines, Florida architecture, local landmarks
   - **Storm damage**: Hurricane damage, storm recovery, damaged roofs
   - **Material education**: Metal roofs, roofing materials, installation
   - **Process guides**: Construction, roofers at work, tools
   - **Seasonal**: Maintenance, seasonal preparation
   - **Cost guides**: Money, budgeting, estimates
   - **Problem-solving**: Roof repairs, troubleshooting
   - **Building code**: Construction documents, compliance
   - **Energy efficiency**: Solar panels, energy-efficient homes
   - **Case studies**: Before/after, project examples
   - **Commercial**: Commercial buildings, flat roofs

## Image Naming Convention

Save images as: `guide-[slug]-hero.jpg`

For example:
- `guide-complete-guide-to-roofing-in-tampa-hero.jpg`
- `guide-storm-damage-recovery-hero.jpg`
- `guide-choosing-roofing-materials-hero.jpg`

## Image Requirements

- **Size**: 1200x600px (16:9 aspect ratio)
- **Format**: JPG (optimized to under 200KB)
- **Location**: Save to `/public/guides/` directory

## Automated Option

If you have access to image APIs or want to use placeholder services temporarily, you could use:
- **Placeholder.com**: `https://via.placeholder.com/1200x600/0066CC/FFFFFF?text=Guide+Image`
- **Lorem Picsum**: `https://picsum.photos/1200/600`

But real roofing images from Unsplash/Pexels will look much better!

## After Downloading

Once you have images:
1. Place them in `/public/guides/` directory
2. The `featuredImage` field in guide data will automatically reference them
3. Images will appear on both listing and individual guide pages

