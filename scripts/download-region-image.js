#!/usr/bin/env node

/**
 * Helper script to download and optimize region background images
 * 
 * Usage:
 *   node scripts/download-region-image.js <image-url> <region-slug>
 * 
 * Example:
 *   node scripts/download-region-image.js https://example.com/tampa-bay.jpg sun-coast
 * 
 * This script will:
 * 1. Download the image from the URL
 * 2. Optimize it to WebP format
 * 3. Save to public/regions/{region-slug}.webp
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

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

function downloadImage(url, outputPath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(outputPath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve(outputPath);
      });

      fileStream.on('error', (err) => {
        fs.unlink(outputPath, () => {}); // Delete the file on error
        reject(err);
      });
    }).on('error', reject);
  });
}

async function processImage(url, regionSlug) {
  if (!regions.includes(regionSlug)) {
    console.error(`Error: Invalid region slug "${regionSlug}"`);
    console.error(`Valid regions: ${regions.join(', ')}`);
    process.exit(1);
  }

  const tempDir = path.join(__dirname, '..', 'tmp');
  const outputDir = path.join(__dirname, '..', 'public', 'regions');
  const tempPath = path.join(tempDir, `temp-${Date.now()}.jpg`);
  const finalPath = path.join(outputDir, `${regionSlug}.webp`);

  // Ensure directories exist
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
    console.log(`Downloading image for ${regionSlug}...`);
    console.log(`URL: ${url}`);
    
    await downloadImage(url, tempPath);
    console.log(`✓ Downloaded to temporary file`);

    console.log(`Optimizing image...`);
    await sharp(tempPath)
      .resize(1920, 1080, {
        fit: 'cover',
        position: 'center',
      })
      .webp({
        quality: 85,
        effort: 6,
      })
      .toFile(finalPath);

    // Clean up temp file
    fs.unlinkSync(tempPath);

    const stats = fs.statSync(finalPath);
    const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
    
    console.log(`✓ Successfully processed image!`);
    console.log(`  File size: ${fileSizeInMB} MB`);
    console.log(`  Saved to: ${finalPath}`);
  } catch (error) {
    // Clean up temp file on error
    if (fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }
    console.error('Error processing image:', error.message);
    process.exit(1);
  }
}

// Main execution
const args = process.argv.slice(2);

if (args.length < 2) {
  console.log('Usage: node scripts/download-region-image.js <image-url> <region-slug>');
  console.log('');
  console.log('Regions:');
  regions.forEach(region => {
    console.log(`  - ${region}`);
  });
  console.log('');
  console.log('Example:');
  console.log('  node scripts/download-region-image.js https://example.com/tampa.jpg sun-coast');
  process.exit(1);
}

const [imageUrl, regionSlug] = args;
processImage(imageUrl, regionSlug);
















