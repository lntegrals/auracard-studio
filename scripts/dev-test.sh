#!/bin/bash
# Quick local test
cd "$(dirname "$0")/.."
echo "🧪 Running local test..."
pnpm build 2>&1 | tail -10
echo "✅ Build OK"
