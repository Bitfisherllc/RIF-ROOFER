# RIF Design System

This folder contains the design system and theme options for the RIF website.

## Files

- **color-palette.md** - Complete color palette extracted from logo
- **theme-options.md** - 5 different theme options to choose from
- **theme-preview.md** - Current implementation and customization guide

## Quick Start

1. Review the **theme-options.md** to see 5 different design approaches
2. Check **color-palette.md** for all available colors
3. See **theme-preview.md** for current implementation and how to customize

## Current Status

✅ Logo colors extracted and added to Tailwind config
✅ Color system implemented (RIF Blue, Black, White + variations)
✅ Components updated to use logo colors
✅ Clean & Professional theme applied

## Color Classes Available

### RIF Brand Colors
- `text-rif-blue-500` - Primary blue
- `bg-rif-blue-500` - Primary blue background
- `border-rif-blue-500` - Primary blue border
- `text-rif-black` - RIF black
- `text-rif-white` - White

### Blue Variations
- `rif-blue-50` through `rif-blue-900` (10 shades)

### Primary Alias
- `primary` - Alias for RIF blue
- `primary-light` - Lighter blue
- `primary-dark` - Darker blue

## Making Changes

All colors are defined in `tailwind.config.js`. To change the theme:

1. Modify Tailwind classes in components
2. Update `tailwind.config.js` for new colors
3. See `theme-preview.md` for specific examples



















