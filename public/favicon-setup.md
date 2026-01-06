# Favicon Setup

## Create Favicon.ico

Convert the blue icon logo to favicon.ico format.

### Steps:

1. **Use online converter:**
   - Go to: https://favicon.io/favicon-converter/
   - Or: https://realfavicongenerator.net/
   - Upload `/public/logo-icon.svg`
   - Download the generated favicon.ico

2. **Or use command line (if ImageMagick installed):**
   ```bash
   convert public/logo-icon.svg -resize 32x32 public/favicon.ico
   ```

3. **Save as:**
   - `/public/favicon.ico`

### Recommended Sizes:
- 16x16 (standard)
- 32x32 (standard)
- 48x48 (optional)

### Current Status:
⏳ Favicon.ico needs to be created manually
✅ Layout is configured to use `/logo-icon.svg` as fallback
✅ Apple touch icon is set to `/logo-icon.svg`


















