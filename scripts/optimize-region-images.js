#!/usr/bin/env node

/**
 * Script to optimize region background images to WebP format
 * 
 * Usage:
 *   node scripts/optimize-region-images.js <input-image> <region-slug>
 * 
 * Example:
 *   node scripts/optimize-region-images.js ~/Downloads/tampa-bay.jpg sun-coast
 * 
 * The script will:
 * 1. Resize the image to optimal dimensions (1920x1080 for hero backgrounds)
 * 2. Convert to WebP format with quality optimization
 * 3. Save to public/regions/{region-slug}.webp
 */

const fs = require('fs');
const path = require('path');

// Check if sharp is available
let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.error('Error: sharp package is required for image optimization.');
  console.error('Please install it by running: npm install --save-dev sharp');
  process.exit(1);
}

const regions = [
  'sun-coast',
  'treasure-coast',
  'southwest-florida',
  'south-florida',
  'north-florida',
  'florida-panhandle',
  'first-coast',
  'central-florida',
];

async function optimizeImage(inputPath, regionSlug) {
  if (!regions.includes(regionSlug)) {
    console.error(`Error: Invalid region slug "${regionSlug}"`);
    console.error(`Valid regions: ${regions.join(', ')}`);
    process.exit(1);
  }

  if (!fs.existsSync(inputPath)) {
    console.error(`Error: Input file not found: ${inputPath}`);
    process.exit(1);
  }

  const outputDir = path.join(__dirname, '..', 'public', 'regions');
  const outputPath = path.join(outputDir, `${regionSlug}.webp`);

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
    console.log(`Optimizing image for ${regionSlug}...`);
    console.log(`Input: ${inputPath}`);
    console.log(`Output: ${outputPath}`);

    await sharp(inputPath)
      .resize(1920, 1080, {
        fit: 'cover',
        position: 'center',
      })
      .webp({
        quality: 85,
        effort: 6,
      })
      .toFile(outputPath);

    const stats = fs.statSync(outputPath);
    const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
    
    console.log(`✓ Successfully optimized image!`);
    console.log(`  File size: ${fileSizeInMB} MB`);
    console.log(`  Saved to: ${outputPath}`);
  } catch (error) {
    console.error('Error optimizing image:', error.message);
    process.exit(1);
  }
}

// Main execution
const args = process.argv.slice(2);

if (args.length < 2) {
  console.log('Usage: node scripts/optimize-region-images.js <input-image> <region-slug>');
  console.log('');
  console.log('Regions:');
  regions.forEach(region => {
    console.log(`  - ${region}`);
  });
  console.log('');
  console.log('Example:');
  console.log('  node scripts/optimize-region-images.js ~/Downloads/tampa-bay.jpg sun-coast');
  process.exit(1);
}

const [inputPath, regionSlug] = args;
optimizeImage(inputPath, regionSlug);

















