#!/bin/bash
set -e

# Move to project directory
cd /GetPaidClients

echo "🔄 Pulling latest code..."
git config --global --add safe.directory /GetPaidClients
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
