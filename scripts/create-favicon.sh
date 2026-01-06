#!/bin/bash
# Script to create favicon.ico from logo-icon.svg
# Requires ImageMagick or online conversion

echo "Creating favicon.ico from logo-icon.svg..."

# Check if ImageMagick is installed
if command -v convert &> /dev/null; then
    echo "Using ImageMagick..."
    convert public/logo-icon.svg -resize 32x32 public/favicon.ico
    echo "✅ Favicon created at public/favicon.ico"
else
    echo "❌ ImageMagick not found."
    echo ""
    echo "Alternative options:"
    echo "1. Use online converter: https://favicon.io/favicon-converter/"
    echo "   - Upload: public/logo-icon.svg"
    echo "   - Download favicon.ico"
    echo "   - Place in: public/favicon.ico"
    echo ""
    echo "2. Install ImageMagick:"
    echo "   macOS: brew install imagemagick"
    echo "   Linux: sudo apt-get install imagemagick"
    echo "   Windows: Download from https://imagemagick.org/"
fi


















