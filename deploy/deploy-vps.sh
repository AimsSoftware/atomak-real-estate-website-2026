#!/usr/bin/env bash
# Deploy ONLY ATOMAK from GitHub main into /var/www/atomakrealestate/app.
set -Eeuo pipefail
APP_DIR="/var/www/atomakrealestate/app"
cd "$APP_DIR"

if [[ ! -d .git ]]; then
  echo "Not a Git checkout: $APP_DIR" >&2
  exit 1
fi
if [[ "$(git branch --show-current)" != "main" ]]; then
  echo "Expected branch main; refusing deployment." >&2
  exit 1
fi
if ! command -v pm2 >/dev/null; then
  echo "PM2 is not installed for the current user." >&2
  exit 1
fi

git fetch origin main
git merge --ff-only origin/main

if [[ -f package-lock.json ]]; then
  npm ci
else
  npm install --no-package-lock
fi
npm run build

if pm2 describe atomak-web >/dev/null 2>&1; then
  pm2 reload ecosystem.config.cjs --only atomak-web --update-env
else
  pm2 start ecosystem.config.cjs --only atomak-web
fi
pm2 save
echo "ATOMAK deployed. Check: curl -I http://127.0.0.1:3002/ar"
