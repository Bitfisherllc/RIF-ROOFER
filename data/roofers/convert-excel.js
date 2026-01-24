// Script to convert Excel roofer data to JSON/TypeScript
// Run with: node data/roofers/convert-excel.js

const fs = require('fs');
const path = require('path');

console.log('Excel to TypeScript Converter');
console.log('============================');
console.log('');
console.log('To convert your Excel file, you have a few options:');
console.log('');
console.log('Option 1: Use an online converter');
console.log('  - Upload ROOFERS LIST FINAL.xlsx to https://convertio.co/xlsx-json/');
console.log('  - Download the JSON file');
console.log('  - Place it in this folder as roofers-data.json');
console.log('');
console.log('Option 2: Use Excel to export to CSV');
console.log('  - Open ROOFERS LIST FINAL.xlsx in Excel');
console.log('  - File > Save As > CSV (Comma delimited)');
console.log('  - Save as roofers-data.csv in this folder');
console.log('');
console.log('Option 3: Use Python (if available)');
console.log('  - Install: pip install pandas openpyxl');
console.log('  - Run: python3 data/roofers/convert-excel.py');
console.log('');
console.log('Once you have the data in JSON or CSV format,');
console.log('I can help you structure it into TypeScript files.');

















