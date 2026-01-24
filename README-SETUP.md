# RIF Website Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Environment File
```bash
cp .env.local.example .env.local
# Edit .env.local with your settings
```

### 3. Create Favicon (One-time setup)
**Option A: Using online tool (easiest)**
1. Go to https://favicon.io/favicon-converter/
2. Upload `public/logo-icon.svg`
3. Download `favicon.ico`
4. Place in `public/favicon.ico`

**Option B: Using ImageMagick**
```bash
./scripts/create-favicon.sh
```

### 4. Create OG Image (One-time setup)
1. Open `logos/blue-full.svg` in design tool (Figma, Canva, etc.)
2. Create 1200x630px canvas
3. Center logo, add background/text
4. Export as PNG
5. Save as `public/og-image.png`

### 5. Start Development Server
```bash
npm run dev
```

Visit: http://localhost:3000

## Project Structure

```
/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with Header/Footer
│   ├── page.tsx           # Homepage
│   ├── globals.css        # Global styles
│   └── metadata.ts        # SEO metadata
├── components/            # React components
│   ├── Logo.tsx          # Logo component
│   ├── Header.tsx        # Site header
│   └── Footer.tsx        # Site footer
├── public/               # Static assets
│   ├── logo.svg         # Main logo
│   ├── logo-white.svg   # White logo
│   ├── logo-icon.svg    # Icon
│   └── [favicon.ico]    # Create manually
├── logos/                # All logo files
└── [config files]        # Next.js, TypeScript, Tailwind
```

## Logo System

The logo component supports all variants:

```tsx
<Logo variant="full" color="blue" width={180} />
<Logo variant="full" color="white" width={150} />
<Logo variant="icon" color="blue" width={40} />
<Logo variant="box-words" color="blue" width={200} />
```

## Features

✅ Logo system integrated
✅ Header with navigation
✅ Footer with RIF contact info
✅ SEO metadata configured
✅ Responsive design
✅ Tailwind CSS styling
✅ TypeScript support

## Next Steps

1. ✅ Logo integration complete
2. ⏳ Create favicon.ico (5 min)
3. ⏳ Create og-image.png (10 min)
4. ⏳ Set up backend API connection
5. ⏳ Add service area pages
6. ⏳ Add roofer pages

## Documentation

- `INTEGRATION-COMPLETE.md` - Full integration details
- `logos/README.md` - Logo file reference
- `PRD-RIF-SEO-Website.md` - Product requirements



















