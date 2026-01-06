# How to Start the Development Server

## Quick Start

1. **Open terminal in the project directory:**
   ```bash
   cd "/Volumes/Whale/_CLIENTS/Florida Roofers"
   ```

2. **Install dependencies (if not done):**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   ```
   http://localhost:3000
   ```

## Server Status

The server should start and show:
```
▲ Next.js 14.x.x
- Local:        http://localhost:3000
- Ready in Xs
```

## If Port 3000 is Busy

If you see "Port 3000 is already in use", you can:

1. **Use a different port:**
   ```bash
   PORT=3001 npm run dev
   ```
   Then visit: `http://localhost:3001`

2. **Or kill the process on port 3000:**
   ```bash
   lsof -ti:3000 | xargs kill -9
   npm run dev
   ```

## Troubleshooting

### "Cannot find module" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors
The app should compile automatically. If you see errors, check:
- `tsconfig.json` exists
- All dependencies are installed

### Server won't start
1. Check Node.js version: `node --version` (should be 18+)
2. Check if port is available: `lsof -i :3000`
3. Try clearing Next.js cache: `rm -rf .next`

## View Your Site

Once running, visit:
- **Homepage:** http://localhost:3000
- **Theme Preview:** http://localhost:3000/theme-preview
- **Service Areas:** http://localhost:3000/service-areas
- **Roofers:** http://localhost:3000/roofers


















