# Go-Live Checklist

## ✅ Done

1. **Build fixes applied** – Production build now passes locally.
   - `/api/admin/mailing-list`: marked `force-dynamic` (was breaking static export).
   - `/admin/training`: `LocationMap` and `RichTextEditor` loaded with `dynamic(..., { ssr: false })` (fixes `window is not defined`).

2. **Pushed to GitHub** – Build fixes are on `main` at `Bitfisherllc/RIF-ROOFER`.

---

## 🚀 Deploy on Vercel

### If you don’t have a Vercel project yet

1. Open **[vercel.com/dashboard](https://vercel.com/dashboard)** and sign in (GitHub).
2. **Add New…** → **Project**.
3. Import **Bitfisherllc/RIF-ROOFER**.
4. Confirm **Framework**: Next.js, **Build**: `npm run build`.
5. Add **Environment Variables** (see below), then **Deploy**.

### If you already have a project linked to RIF-ROOFER

- Vercel will deploy automatically from the latest push.
- Check **Deployments** for the new build. It should succeed with the recent fixes.

---

## 🔐 Environment Variables (Vercel)

In the project **Settings** → **Environment Variables**, add:

| Variable | Used for | Required? |
|----------|----------|-----------|
| `RESEND_API_KEY` | Contact, estimate, confirmation emails | If you use forms |
| `RESEND_FROM_EMAIL` | e.g. `RIF Roofing <noreply@yourdomain.com>` | If using Resend |
| `RESEND_VERIFIED_EMAIL` | Reply-to / recipient | If using Resend |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile (forms) | If you use Turnstile |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Turnstile site key (client) | If you use Turnstile |
| `JWT_SECRET` | Auth / login | **Yes** – use a long random string in production |
| `NEXT_PUBLIC_SITE_URL` | Emails, links | Your live URL, e.g. `https://yoursite.com` |
| `CRON_SECRET` | Cron sync (e.g. reviews) | If you use cron |
| `GOOGLE_PLACES_API_KEY` | Places/reviews features | If you use those |

After adding or changing variables, **redeploy** (Deployments → ⋮ → Redeploy).

---

## 📋 After deploy

- [ ] Visit the Vercel URL (e.g. `https://rif-roofer.vercel.app`).
- [ ] Check **Home**, **Guides**, **Roofers**, **Training**, **Contact**, **Free Estimate**.
- [ ] Test **contact** and **free estimate** forms (if Resend is configured).
- [ ] Test **admin** (login, training, config, etc.).

### Custom domain

1. **Settings** → **Domains**.
2. Add your domain and follow Vercel’s DNS instructions.
3. Optionally add `www` and redirect root → `www` (or the opposite).

---

## ⚠️ Uncommitted changes

You still have **modified and untracked files** (e.g. app pages, components, scripts, new features like mailing list, hero background, etc.). They are **not** in the repo yet.

To deploy that full set of changes:

```bash
git add .
git commit -m "Ready for production: all current changes"
git push origin main
```

Vercel will then deploy from this new commit. Run `npm run build` locally first to ensure it passes.

---

## 🆘 Build fails on Vercel

- Check **Deployments** → select the failed run → **Building** logs.
- Confirm **Build Command**: `npm run build`.
- Confirm **Node**: 18+ (e.g. in **Settings** → **General** → **Node.js Version**).
- Ensure all env vars above are set for **Production** (and Preview if you use previews).

---

**Repo:** `https://github.com/Bitfisherllc/RIF-ROOFER`  
**Deploy:** [vercel.com/dashboard](https://vercel.com/dashboard) → import or use existing project.
