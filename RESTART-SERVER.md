# Restart Server - Step by Step

## Complete Restart Process

### 1. Stop Current Server
In the terminal where `npm run dev` is running:
- Press `Ctrl+C` (or `Cmd+C` on Mac)
- Wait for it to stop completely

### 2. Clear Cache
```bash
cd "/Volumes/Whale/_CLIENTS/Florida Roofers"
rm -rf .next
```

### 3. Start Fresh
```bash
npm run dev
```

### 4. Wait for Ready Message
You should see:
```
▲ Next.js 14.x.x
- Local:        http://localhost:3000
✓ Ready in Xs
```

### 5. Open Browser
- Go to: `http://localhost:3000`
- **Hard refresh:** `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

## If Still Not Working

### Check for Errors in Terminal
Look for any red error messages when starting the server.

### Check Browser Console
1. Open DevTools (F12)
2. Go to Console tab
3. Look for any error messages
4. Share the exact error text

### Verify Files
```bash
# Check logo files exist
ls public/logo*.svg

# Check component exists
ls components/Logo.tsx
```

## Current Fix Applied

✅ Logo component now uses regular `<img>` tag (not Next.js Image)
✅ Height is always calculated properly
✅ Next.js config updated for SVG handling
✅ Cache cleared

The error should be resolved after a proper restart!

















