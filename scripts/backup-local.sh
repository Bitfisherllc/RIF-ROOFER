#!/usr/bin/env bash
# Create a dated zip backup of the Florida Roofers site (no node_modules or .next).
# Usage: ./scripts/backup-local.sh
#        BACKUP_DIR=/path/to/dir ./scripts/backup-local.sh

set -e
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
PROJECT_NAME="Florida-Roofers"
DATE=$(date +%Y%m%d-%H%M)
ARCHIVE_NAME="${PROJECT_NAME}-${DATE}.zip"
BACKUP_DIR="${BACKUP_DIR:-$PROJECT_DIR/../backups}"

mkdir -p "$BACKUP_DIR"
cd "$PROJECT_DIR"

zip -r "$BACKUP_DIR/$ARCHIVE_NAME" . \
  -x "node_modules/*" \
  -x ".next/*" \
  -x "*.log" \
  -x ".DS_Store" \
  -x "*.tsbuildinfo" \
  -x ".git/*"

echo "Backup created: $BACKUP_DIR/$ARCHIVE_NAME"
