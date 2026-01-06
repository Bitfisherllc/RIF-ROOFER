# Modern SVG Icon System

A collection of modern, clean SVG icons for the RIF website.

## Design Principles

- **Clean lines**: Minimal stroke-based designs
- **Consistent styling**: All icons use `currentColor` for easy theming
- **Customizable**: Accept `className` and `strokeWidth` props
- **Accessible**: Proper viewBox and semantic structure

## Available Icons

- `MenuIcon` - Hamburger menu icon
- `CloseIcon` - Close/X icon
- `PhoneIcon` - Phone/telephone icon
- `EmailIcon` - Email/envelope icon
- `MapPinIcon` - Location/map pin icon
- `ExternalLinkIcon` - External link icon
- `CheckIcon` - Checkmark icon
- `ArrowRightIcon` - Right arrow icon

## Usage

```tsx
import { MenuIcon, PhoneIcon } from '@/components/icons';

// Basic usage
<MenuIcon />

// With custom size
<MenuIcon className="h-6 w-6" />

// With custom stroke width
<PhoneIcon strokeWidth={2} />

// With both
<EmailIcon className="h-8 w-8" strokeWidth={1.5} />
```

## Adding New Icons

1. Create a new file in `components/icons/` following the pattern:
   - Accept `className` and `strokeWidth` props
   - Use `currentColor` for stroke/fill
   - Include proper viewBox
   - Export as default

2. Add export to `components/icons/index.ts`

3. Document in this README

## Icon Guidelines

- Use stroke-based designs (not filled) for consistency
- Default stroke width: 1.5
- Default size: h-5 w-5 (20px)
- Always use `currentColor` for theming
- Keep viewBox consistent (typically 0 0 24 24)
- Use rounded line caps and joins for modern look
















