#!/bin/bash
# Quick deploy script for AuraCard Studio

set -e

echo "🔄 Building..."
pnpm build

echo "📦 Committing..."
git add out/ -f
git commit -m "Deploy $(date '+%Y-%m-%d %H:%M')" || echo "No changes"

echo "🚀 Pushing..."
git push origin main

echo "⏳ Waiting for GitHub Pages..."
sleep 60

echo "✅ Done! Check https://lntegrals.github.io/auracard-studio/"
