# Smoke Test

Run with: `pnpm test`

```bash
#!/bin/bash
# Smoke test for AuraCard Studio

echo "Starting AuraCard Studio smoke test..."

# Check if dev server starts
cd ~/.openclaw/workspace/projects/auracard-studio

# Test 1: pnpm install works
echo "Test 1: pnpm install..."
pnpm install --silent && echo "✓ pnpm install passed" || exit 1

# Test 2: pnpm build works (compile check)
echo "Test 2: pnpm build..."
pnpm build && echo "✓ pnpm build passed" || exit 1

# Test 3: Start dev server in background
echo "Test 3: Starting dev server..."
pnpm dev &
DEV_PID=$!
sleep 15

# Test 4: Server responds
echo "Test 4: Checking localhost:3000..."
curl -s http://localhost:3000 | grep -q "AuraCard" && echo "✓ Server responded" || exit 1

# Cleanup
kill $DEV_PID 2>/dev/null

echo "All tests passed! ✓"
```
