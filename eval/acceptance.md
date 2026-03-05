# Acceptance Criteria

## Checklist

### 1. Development Environment
- [ ] `pnpm install && pnpm dev` runs locally without errors
- [ ] Dev server accessible at localhost:3000

### 2. Core Functionality
- [ ] User can enter vibe description (2-5 lines)
- [ ] User can select from quick prompts (3-5 options)
- [ ] System generates 4 distinct cards from single input
- [ ] Each card has: title, reading (2-4 sentences), bullets (3), tags

### 3. Visual Quality
- [ ] Cards look desktop ( premium on1080x1080)
- [ ] Cards look good on mobile (responsive)
- [ ] Text wraps gracefully (no overflow)
- [ ] Emojis render correctly
- [ ] Generative backgrounds are distinct per card style

### 4. Export Functionality
- [ ] "Download PNG" works on Chrome
- [ ] Exported PNG is at least 1080x1080
- [ ] PNG includes art + text correctly
- [ ] Share link generated
- [ ] QR code displays and is scannable

### 5. Documentation
- [ ] /docs/spec.md exists and updated
- [ ] /docs/research.md exists
- [ ] /docs/decisions.md exists
- [ ] /docs/plan.md exists with task checklist

### 6. Testing
- [ ] Test plan documented
- [ ] At least one automated test (playwright or unit)
- [ ] Smoke test covers: input → generate → export

---

## Demo Checklist
- [ ] Show landing page
- [ ] Enter vibe "Coffee, rain, lo-fi beats"
- [ ] Click generate
- [ ] Show 4 cards
- [ ] Click export on card 1
- [ ] Verify PNG download
- [ ] Show share link + QR
