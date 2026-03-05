# AuraCard Studio ✨

Transform your vibe into beautiful shareable aura cards.

## Quick Start

```bash
# Clone & install
git clone https://github.com/YOUR_USERNAME/auracard-studio.git
cd auracard-studio
pnpm install

# Run locally
pnpm dev
```

Then open http://localhost:3000

## Deployment to GitHub Pages

This project is configured for GitHub Pages deployment with static export.

### Option 1: Automated (GitHub Actions)
1. Push code to GitHub
2. Go to Settings → Pages
3. Select "GitHub Actions" as source
4. The workflow will deploy automatically on push to main

### Option 2: Manual
```bash
pnpm build
# Upload the /out folder to GitHub Pages
```

## Features

- 🎴 Generate 4 unique aura cards from your vibe
- 🎨 Custom generative backgrounds (SVG)
- 📥 Export as PNG (1080x1080)
- 📱 Mobile responsive
- 🔗 Share via QR code

## Tech Stack

- Next.js 15
- shadcn/ui
- Tailwind CSS
- MiniMax M2.5 (LLM)
- html-to-image (PNG export)
- qrcode.react (QR generation)

## Project Structure

```
src/
├── app/           # Next.js app router pages
├── components/    # React components
│   ├── AuraCard.tsx
│   ├── GenerativeBackground.tsx
│   └── ShareCard.tsx
├── lib/           # Utilities & LLM integration
│   ├── llm.ts
│   └── types.ts
└── styles/        # Global styles
docs/
├── spec.md        # Project specification
├── research.md    # Research findings
├── decisions.md   # Architecture decisions
└── plan.md       # Development plan
eval/
└── acceptance.md  # Acceptance criteria
```

## License

MIT
