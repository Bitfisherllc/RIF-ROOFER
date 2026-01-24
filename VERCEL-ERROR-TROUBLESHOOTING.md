# Vercel Deployment Error Troubleshooting

## Common Issues & Fixes

### 1. File System Writes (Most Likely)
**Problem:** Auth routes try to write `users.json` to the file system, which is read-only on Vercel.

**Solution:** We need to use a database or Vercel KV for user storage, OR create the file if it doesn't exist during build.

### 2. Missing Environment Variables
**Problem:** Required env vars not set in Vercel.

**Solution:** Add these in Vercel Settings → Environment Variables:
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `JWT_SECRET` (optional, has default)
- `TURNSTILE_SECRET_KEY` (if using)

### 3. Node Version
**Problem:** Vercel might be using wrong Node version.

**Solution:** Add to `package.json`:
```json
"engines": {
  "node": ">=18.0.0"
}
```

### 4. Build Timeout
**Problem:** Build takes too long.

**Solution:** Optimize build or increase timeout in Vercel settings.

## Next Steps

**Please share the exact error message from Vercel build logs so I can provide a specific fix!**

To get the error:
1. Go to Vercel Dashboard
2. Click on the failed deployment
3. Click "Build Logs" tab
4. Copy the error message (especially the red text at the end)


