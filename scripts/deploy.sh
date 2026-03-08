#!/bin/bash
set -e

# Project directory = parent of the directory containing this script (works no matter where repo is cloned)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_DIR"

echo "🔄 Pulling latest code..."
git config --global --add safe.directory "$PROJECT_DIR"
git fetch origin main
git reset --hard origin/main

echo "📦 Installing dependencies..."
npm install --production=false

echo "🏗 Building application..."
npm run build

echo "🚀 Starting/restarting PM2 process..."
pm2 restart getpaidclients || pm2 start npm --name "getpaidclients" -- start -- -p 8000
pm2 save

echo "✅ Deployment completed!"
