#!/usr/bin/env node

/**
 * Script to import roofer data from JSON into TypeScript format
 */

const fs = require('fs');
const path = require('path');

const jsonFile = path.join(__dirname, '..', 'data', 'roofers', 'batch-1-roofers.json');
const outputFile = path.join(__dirname, '..', 'app', 'roofers', 'data', 'roofers.ts');

// Read JSON data
const roofers = JSON.parse(fs.readFileSync(jsonFile, 'utf-8'));

// Read existing roofers.ts
let existingFile = fs.readFileSync(outputFile, 'utf-8');

// Convert JSON data to TypeScript format
const rooferEntries = roofers.map(roofer => {
  const slug = roofer.slug;
  
  // Build the entry object
  const parts = [];
  parts.push(`    id: '${roofer.id}'`);
  parts.push(`    name: '${roofer.name.replace(/'/g, "\\'")}'`);
  parts.push(`    slug: '${roofer.slug}'`);
  if (roofer.phone) parts.push(`    phone: '${roofer.phone}'`);
  if (roofer.website) {
    const website = roofer.website.startsWith('http') ? roofer.website : `https://${roofer.website}`;
    parts.push(`    websiteUrl: '${website}'`);
  }
  parts.push(`    isPreferred: false`);
  parts.push(`    isHidden: false`);
  parts.push(`    serviceAreas: {`);
  parts.push(`      regions: [],`);
  parts.push(`      counties: [],`);
  parts.push(`      cities: [],`);
  parts.push(`    },`);

  return `  '${slug}': {\n${parts.join('\n')}\n  }`;
}).join(',\n\n');

// Find and replace the rooferData object
const rooferDataRegex = /export const rooferData[^}]*\{[^}]*\};/s;
const newRooferData = `export const rooferData: Record<string, RooferData | any> = {\n${rooferEntries}\n};`;

if (rooferDataRegex.test(existingFile)) {
  existingFile = existingFile.replace(rooferDataRegex, newRooferData);
} else {
  // If pattern not found, find the export line and replace everything until the closing brace
  const startIdx = existingFile.indexOf('export const rooferData');
  if (startIdx !== -1) {
    const before = existingFile.substring(0, startIdx);
    const afterIdx = existingFile.indexOf('};', startIdx);
    const after = existingFile.substring(afterIdx + 2);
    existingFile = before + newRooferData + after;
  }
}

fs.writeFileSync(outputFile, existingFile, 'utf-8');

console.log(`✓ Imported ${roofers.length} roofers into ${outputFile}`);
















