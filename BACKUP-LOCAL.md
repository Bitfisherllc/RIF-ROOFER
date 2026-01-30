# Backing Up This Site Locally

Three ways to keep a local backup of the Florida Roofers site.

---

## 1. Git (recommended daily backup)

Your project is already under Git. For a proper backup:

- **Commit** your work: `git add -A && git commit -m "Backup: [date or description]"`
- **Push** to a remote (GitHub, etc.): `git push origin main`

That gives you a full history in the cloud. For a **second local copy** on the same machine or an external drive:

```bash
# Clone into another folder (e.g. backup drive or Desktop)
git clone /Volumes/Whale/_CLIENTS/Florida\ Roofers "/path/to/backup/Florida-Roofers-$(date +%Y%m%d)"
```

Then in that folder you can `git pull` later to refresh the backup.

---

## 2. One-command archive (script)

Use the included script to create a dated zip of the project (excluding `node_modules` and `.next`):

```bash
./scripts/backup-local.sh
```

Backups are written to `../backups` by default (sibling of `_CLIENTS`), or set `BACKUP_DIR` to override:

```bash
BACKUP_DIR=/Volumes/MyDrive/backups ./scripts/backup-local.sh
```

To restore: unzip the archive and run `npm install` (and `npm run build` if you need a production build).

---

## 3. Manual copy

- Copy the whole project folder to another location (external drive, second Mac, etc.).
- Exclude `node_modules` and `.next` to save space; you can reinstall with `npm install` and rebuild with `npm run build` after restoring.

---

## What to exclude in archives/copies

- `node_modules` – reinstall with `npm install`
- `.next` – rebuild with `npm run build`
- `.env*.local` – keep these only in a secure place; don’t commit them to Git

Everything else (source, data, config, `public/`, etc.) should be in the backup.
