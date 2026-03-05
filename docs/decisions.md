# AuraCard Studio - Design Decisions

## Decision 1: Full LLM Control Approach

**Decision**: Use Option A - LLM generates both reading content AND visual style assignments.

**Rationale**:
- Single prompt simplifies integration
- Coherent output where reading matches visual mood
- More magical experience for users
- Easier to iterate on (one place to change)

---

## Decision 2: Three-Tone System

**Decision**: Implement Personal/Kind/Sharp as the three tone modes.

**Rationale**:
- Covers the main emotional spectrum (neutral, distressed, confident)
- Simple for LLM to detect and apply
- Avoids over-complication of having more modes
- Each mode has clear guidelines that are easy to prompt

---

## Decision 3: Four Distinct Art Styles

**Decision**: Implement Ethereal, Geometric, Minimal, and Organic as the four styles.

**Rationale**:
- Each style is visually distinct and recognizable
- Covers different aesthetic preferences (soft, bold, clean, natural)
- All are achievable with Canvas/SVG without external assets
- Easy to algorithmically generate with procedural techniques

---

## Decision 4: JSON Schema for LLM Output

**Decision**: Use strict JSON schema with structured output validation.

**Rationale**:
- MiniMax supports structured output
- Eliminates need for regex parsing hacks
- Type-safe data flow through the app
- Easier to debug when things go wrong

---

## Decision 5: 1080x1080 PNG Export

**Decision**: Fixed 1080x1080 dimensions for PNG export.

**Rationale**:
- Optimal for Instagram/TikTok/social sharing
- Standard square format works everywhere
- High enough resolution for quality
- Not too large for quick generation/download

---

## Decision 6: Color Palette from LLM + Validation

**Decision**: LLM suggests colors, but validate against preset harmonious palettes.

**Rationale**:
- Gives LLM creative freedom
- Prevents terrible color combinations
- Hybrid approach balances AI creativity with design quality
- Can expand palette presets as we learn

---

## Decision 7: No User Accounts (From Spec)

**Decision**: Keep the app account-free.

**Rationale**:
- Explicitly stated in spec as out of scope
- Reduces friction for casual users
- Faster time-to-value (instant card generation)
- Simpler technical implementation

---

## Decision 8: MiniMax M2.5 as LLM Provider

**Decision**: Use MiniMax M2.5 via OpenClaw.

**Rationale**:
- Already integrated in the environment
- Good reasoning capabilities for creative writing
- Cost-effective for this use case
- Supports structured output
