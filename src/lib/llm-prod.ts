// Production LLM integration - use this when deployed on Vercel
// For now, we use mock-llm.ts which works client-side

export async function generateAuraCard(vibe: string) {
  // In production, call your LLM API here
  // For static/GitHub Pages, mock-llm.ts handles it client-side
  throw new Error('Use mock-llm.ts for static deployment')
}
