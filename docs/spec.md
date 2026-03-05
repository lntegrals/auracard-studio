# AuraCard Studio - Project Specification

## Project Overview
- **Name**: AuraCard Studio
- **Goal**: Turn user's vibe into beautiful shareable "Aura Card" PNG images with personalized readings
- **Target Users**: Non-tech, social media-savvy users wanting quick, premium-looking spiritual/astrology-style cards

## Problem
People want quick, personalized "vibe checks" or spiritual readings to share on social media, but existing tools are either too basic or require accounts/complex setup.

## Scope
### In Scope
- Landing page with vibe input
- 4 distinct aura cards per generation
- Generative SVG/Canvas backgrounds (no external AI images)
- LLM-generated readings, titles, tags
- PNG export (1080x1080)
- Share link + QR code
- Mobile-responsive

### Out of Scope
- User accounts / authentication
- Saving readings to cloud
- Social sharing directly to platforms (just link/QR)
- Audio/videoconversions

## Non-Goals
- Complex chart readings (natal charts, etc.)
- Real astrology calculations
- Payment processing

---

## Technical Stack
- **Framework**: Next.js + shadcn/ui
- **Styling**: Tailwind CSS
- **LLM**: MiniMax M2.5 (via OpenClaw)
- **Image Generation**: Canvas/SVG (local)
- **QR Code**: qrcode.react or similar

## Acceptance Criteria
See /eval/acceptance.md

---

Updated: 2026-03-05
