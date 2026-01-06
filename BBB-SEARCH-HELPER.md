# BBB Search Helper

Since I cannot browse websites directly, here's a structured approach to help you search for BBB accreditation:

## Option 1: Manual Search Process

1. Use the list in `roofers-for-bbb-search.json` which contains all roofing companies with their names, locations, and phone numbers
2. For each company, visit https://www.bbb.org/ and search using:
   - Company name
   - City, FL
   - Phone number (if available)

## Option 2: Use Browser Automation (if you have access)

If you have tools like Selenium, Puppeteer, or browser automation capabilities, you could automate the searches. However, BBB.org may have rate limiting or bot protection.

## Option 3: BBB API (if available)

Check if BBB.org offers an API for business lookups. Some business directories provide APIs for this purpose.

## Current Status

The code is already set up to display BBB badges. You just need to populate the data in `app/roofers/data/roofers.ts` with:

```typescript
bbbAccredited: true/false,
bbbUrl: "https://www.bbb.org/...",
bbbRating: "A+" // optional
```

## Recommendation

Given the limitations, the most practical approach is:
1. Start with a small batch (10-20 companies)
2. Search manually on BBB.org
3. Update the data file as you go
4. The badge will appear automatically once `bbbAccredited: true` is set

The badge code is already implemented and ready to use!

