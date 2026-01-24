# BBB Research Guide

This guide explains how to research roofing companies on BBB.org and update the roofer data with BBB accreditation information.

## Steps to Research and Update BBB Information

### 1. Research Each Roofer on BBB.org

1. Go to [https://www.bbb.org/](https://www.bbb.org/)
2. Use the search function to find each roofing company by:
   - Company name
   - City/State
   - Phone number (if available)
3. Look for the BBB profile page for each company

### 2. Determine BBB Accreditation Status

- **BBB Accredited**: The business has a BBB Accreditation seal/icon on their profile
- Look for indicators such as:
  - "BBB Accredited Business" badge
  - "Accredited Since [date]" information
  - BBB rating displayed (A+, A, B, etc.)

### 3. Collect Information

For each accredited business, collect:
- **BBB URL**: The full URL to the BBB profile page (e.g., `https://www.bbb.org/us/fl/orlando/profile/roofing-contractor/company-name/...`)
- **BBB Rating**: The letter grade (A+, A, A-, B+, B, etc.)
- **Accreditation Status**: Confirmed as `true` if accredited

### 4. Update Roofer Data

Edit `app/roofers/data/roofers.ts` and add/update the following fields for each roofer:

```typescript
'roofer-slug': {
  // ... existing fields ...
  bbbAccredited: true,  // Set to true if BBB Accredited, false or omit if not
  bbbUrl: "https://www.bbb.org/us/fl/city/profile/...",  // Full BBB profile URL
  bbbRating: "A+",  // BBB rating letter grade (optional)
  // ... rest of fields ...
}
```

### Example

```typescript
'3mg-roofing-llc': {
  id: '4',
  name: '3MG ROOFING LLC',
  // ... other fields ...
  bbbAccredited: true,
  bbbUrl: "https://www.bbb.org/us/fl/orlando/profile/roofing-contractor/3mg-roofing-llc/...",
  bbbRating: "A+",
  category: "sponsored"
},
```

## Notes

- BBB accreditation is optional - only set `bbbAccredited: true` for businesses that are actually accredited
- If a business is not accredited, you can omit the `bbbAccredited` field or set it to `false`
- The `bbbUrl` is optional but recommended for accredited businesses so users can verify the accreditation
- The `bbbRating` field is optional but can be useful information to display

## BBB Badge Display

Once you add `bbbAccredited: true` to a roofer's data, a small "BBB Accredited" badge will automatically appear at the bottom of their card on:
- The main roofer directory page (`/roofers`)
- Service area pages (when using the RooferList component)

The badge is clickable and will link to the BBB profile page (if `bbbUrl` is provided) or to BBB.org homepage.


