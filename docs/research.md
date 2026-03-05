# AuraCard Studio - Research Notes

## 1. Prompt Schema for LLM

### Input Structure
The LLM receives user "vibe" as free text (e.g., "feeling anxious about a new job", "just fell in love", "need clarity on my path").

### Output Schema
```json
{
  "reading": {
    "title": "String (3-8 words, evocative)",
    "subtitle": "String (5-15 words, sets context)",
    "body": "String (40-120 words, main reading)",
    "tags": ["String (3-5 tags)"],
    "advice": "String (10-30 words, call to action)"
  },
  "cards": [
    {
      "id": "1-4",
      "style": "ethereal|geometric|minimal|organic",
      "primaryColor": "#hexcode",
      "secondaryColor": "#hexcode",
      "accentElement": "String (optional visual element)",
      "mood": "String (1-2 words)"
    }
  ]
}
```

### Prompt Engineering Approach
- Use structured output with JSON schema validation
- Include style distribution rules (don't assign same style twice)
- Add temperature control (0.7-0.8 for creativity while maintaining coherence)

---

## 2. Tone Rules

### Three Voice Modes

| Mode | When Used | Voice Characteristics |
|------|-----------|----------------------|
| **Personal** | Default, casual vibes | Warm, conversational, "I see you", use "you" directly |
| **Kind** | Sad/troubled inputs | Gentle, nurturing, reassuring, slower pace |
| **Sharp** | Bold/confident inputs | Direct, incisive, poetic but clear |

### Tone Guidelines
- **Avoid**: Generic astrology filler ("the stars align")
- **Include**: Specific, surprising metaphors
- **Length**: Reading body 40-120 words max ( digestible in 15 seconds)
- **Opening**: First 3 words should hook (not "The cards show...")
- **Closing**: End with forward momentum (not "wait and see")

---

## 3. Art Styles (Generative SVG/Canvas)

### Style 1: Ethereal
- Soft gradients with blur/glow effects
- Floating particle systems
- Color palette: Pastels, iridescent
- Algorithm: Radial gradients with noise-based 2: Geometric opacity

### Style
- Sharp lines, tessellations, sacred geometry
- Rotating shapes (hexagons, triangles)
- Color palette: Bold, high contrast
- Algorithm: Procedural shape generation with symmetry

### Style 3: Minimal
- Clean lines, lots of negative space
- Single focal element
- Color palette: Monochrome + 1 accent
- Algorithm: Controlled randomness with constraints

### Style 4: Organic
- Fluid, natural shapes (waves, vines)
- Hand-drawn feel with bezier curves
- Color palette: Earth tones, nature-inspired
- Algorithm: Perlin noise-driven curves

---

## 4. Data Model

### Card Entity
```typescript
interface AuraCard {
  id: string;
  vibe: string;
  generatedAt: Date;
  
  // LLM-generated content
  reading: {
    title: string;
    subtitle: string;
    body: string;
    tags: string[];
    advice: string;
  };
  
  // Visual configuration
  cards: [
    {
      id: string;
      style: 'ethereal' | 'geometric' | 'minimal' | 'organic';
      primaryColor: string;
      secondaryColor: string;
      accentElement?: string;
      mood: string;
    }
  ];
  
  // Export metadata
  export: {
    format: 'png';
    dimensions: { width: 1080; height: 1080 };
    resolution: 2; // 2x for retina
  };
  
  // Sharing
  share: {
    slug?: string;
    qrCode?: string;
  };
}
```

---

## Approach Options Considered

### Option A: Full LLM Control (Chosen)
- LLM generates both reading content AND visual style assignments
- Pros: Single prompt, coherent output, AI "sees" the whole card
- Cons: Requires more token budget, style assignments may lack nuance

### Option B: Hybrid
- LLM generates reading + vibe analysis
- Rule-based system maps vibe → style
- Pros: More predictable, cheaper LLM calls
- Cons: Two systems to maintain, potential mismatch

### Option C: Template-Based
- Pre-defined card templates with LLM filling slots
- Pros: Consistent quality, predictable costs
- Cons: Less magical, feels generic

---

## Risks & Unknowns

1. **LLM Output Consistency**: MiniMax may not always return valid JSON - need robust parsing
2. **Style Interpretation**: "ethereal" to one model may differ from another - need style guide
3. **Color Theory**: LLM-generated hex codes may clash - need validation or palette presets
4. **Performance**: 4 Canvas renders per request may be slow on mobile
5. **Vibe Ambiguity**: Very abstract or contradictory vibes may confuse the LLM

---

## Proposed Experiments

### Exp 1: Prompt Iteration
Test different prompt structures with same vibe input to find most consistent output.

### Exp 2: Style-Authentication
Have LLM describe each style, then test if another LLM can correctly identify styles from the generated SVG.

### Exp 3: Color Harmony Check
Generate 100 cards, manually review color combinations for coherence.

### Exp 4: User Flow Testing
Test with 5 users: Does the vibe → card pipeline feel magical or disjointed?
