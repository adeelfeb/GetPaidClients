#!/bin/bash
set -e

# Project directory (under root's home on the server)
PROJECT_DIR="/root/GetPaidClients"
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
