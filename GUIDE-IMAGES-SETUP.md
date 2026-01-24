# Guide Images Setup Guide

This guide explains how to add images to your guides.

## Current Guide Structure

Your guides are stored in `app/guides/data/guides.ts` and can include images through the content sections.

## Image Options

### Option 1: Use Next.js Image Component in Guide Content

You can add images directly in the guide content HTML using the Next.js Image component or standard `<img>` tags. Update your guide data structure to include image references in the HTML content.

### Option 2: Add Image Field to Guide Interface

Add an optional image field to each guide for a hero/featured image.

## Recommended Image Sources

For general roofing guide images, consider using:

1. **Unsplash** (https://unsplash.com) - Free high-quality photos
   - Search terms: "roofing", "roof repair", "roofing contractor", "metal roof", "roof installation"
   - Examples: https://unsplash.com/s/photos/roofing

2. **Pexels** (https://www.pexels.com) - Free stock photos
   - Search terms: "roofing", "construction", "home repair"
   - Examples: https://www.pexels.com/search/roofing/

3. **Pixabay** (https://pixabay.com) - Free images
   - Search terms: "roof", "roofing", "construction"

## Image Placement

Suggested image locations:
- `/public/guides/` - Create this directory for guide-specific images
- Hero/featured images for each guide
- Section images within guide content

## Image Requirements

- **Format**: JPG or PNG (WebP for optimization)
- **Size**: 
  - Hero images: 1200x600px or larger (16:9 aspect ratio)
  - Content images: 800x600px or larger (4:3 aspect ratio)
- **File size**: Optimize to under 200KB for web performance
- **Naming**: Use descriptive names like `guide-roofing-basics-hero.jpg`

## Next Steps

1. Choose your images from the recommended sources
2. Download and optimize them
3. Place them in `/public/guides/` directory
4. Update guide data structure to reference the images
5. Optionally add image fields to the GuideData interface

Would you like me to:
- Create a script to help organize guide images?
- Update the guide data structure to include image fields?
- Set up the `/public/guides/` directory structure?
- Add image display functionality to the guide pages?


