# AuraCard Studio ✨

Transform your vibe into beautiful shareable aura cards.

## Quick Start (Local Development)

```bash
git clone https://github.com/lntegrals/auracard-studio.git
cd auracard-studio
pnpm install
pnpm dev
```

Then open http://localhost:3000

## Deployment

### Vercel (Recommended for full functionality)
```bash
pnpm add -g vercel
vercel
```

### GitHub Pages (Static only - limited functionality)
Push to main branch - auto-deploys at:
https://lntegrals.github.io/auracard-studio/

## Features

- 🎴 Generate 4 unique aura cards from your vibe
- 🎨 Custom generative backgrounds (SVG)
- 📥 Export as PNG (1080x1080)
- 📱 Mobile responsive
- 🔗 Share via QR code

## Tech Stack

- Next.js 15
- Tailwind CSS
- html-to-image (PNG export)
- qrcode.react (QR generation)
