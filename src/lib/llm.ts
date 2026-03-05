import { GenerationResponse, Reading, CardConfig, CardStyle } from './types'

// MiniMax API integration
const MINIMAX_API_KEY = process.env.MINIMAX_API_KEY || ''
const MINIMAX_BASE_URL = 'https://api.minimax.chat/v1'

// Prompt for generating aura card readings
function buildPrompt(vibe: string): string {
  return `You are a mystical aura card reader. Generate a personalized aura card reading based on the user's vibe.

User's vibe: "${vibe}"

Generate a reading with exactly ONE card (we'll expand to 4 later). Output ONLY valid JSON with this exact structure:

{
  "reading": {
    "title": "string (3-8 words, evocative)",
    "subtitle": "string (5-15 words, sets context)",
    "body": "string (40-120 words, main reading)",
    "tags": ["string (3-5 tags)"],
    "advice": "string (10-30 words, call to action)"
  },
  "cards": [
    {
      "id": "1",
      "style": "ethereal|geometric|minimal|organic",
      "primaryColor": "#hexcode",
      "secondaryColor": "#hexcode",
      "accentElement": "string (optional visual element)",
      "mood": "string (1-2 words)"
    }
  ]
}

Rules:
- Choose ONE style for the card (don't repeat styles)
- Use colors that match the vibe and mood
- The reading should be personal, warm, and specific - NOT generic astrology filler
- First 3 words of body should hook (not "The cards show...")
- End body with forward momentum (not "wait and see")
- Output ONLY the JSON, no markdown, no explanation`
}

function getRandomStyle(used: CardStyle[]): CardStyle {
  const styles: CardStyle[] = ['ethereal', 'geometric', 'minimal', 'organic']
  const available = styles.filter(s => !used.includes(s))
  return available[Math.floor(Math.random() * available.length)]
}

export async function generateAuraCard(vibe: string): Promise<GenerationResponse> {
  // For demo/development, return mock data if no API key
  if (!MINIMAX_API_KEY) {
    console.log('No MINIMAX_API_KEY, returning mock data')
    return getMockResponse(vibe)
  }

  try {
    const response = await fetch(`${MINIMAX_BASE_URL}/text/chatcompletion_v2`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MINIMAX_API_KEY}`
      },
      body: JSON.stringify({
        model: 'MiniMax-M2.5',
        messages: [
          { role: 'system', content: 'You are a mystical aura card reader. Generate beautiful, personalized readings.' },
          { role: 'user', content: buildPrompt(vibe) }
        ],
        temperature: 0.8,
        max_tokens: 2048
      })
    })

    if (!response.ok) {
      throw new Error(`MiniMax API error: ${response.status}`)
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content

    if (!content) {
      throw new Error('No content in response')
    }

    // Parse JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('No JSON found in response')
    }

    const parsed = JSON.parse(jsonMatch[0])
    return parsed as GenerationResponse

  } catch (error) {
    console.error('LLM generation failed:', error)
    // Fallback to mock on error
    return getMockResponse(vibe)
  }
}

function getMockResponse(vibe: string): GenerationResponse {
  // Detect vibe tone for mock
  const vibeLower = vibe.toLowerCase()
  let style: CardStyle = 'ethereal'
  let mood = 'mysterious'
  
  if (vibeLower.includes('happy') || vibeLower.includes('joy') || vibeLower.includes('excited')) {
    style = 'ethereal'
    mood = 'joyful'
  } else if (vibeLower.includes('love') || vibeLower.includes('heart')) {
    style = 'organic'
    mood = 'loving'
  } else if (vibeLower.includes('focus') || vibeLower.includes('clear') || vibeLower.includes('sharp')) {
    style = 'geometric'
    mood = 'focused'
  } else if (vibeLower.includes('calm') || vibeLower.includes('peace') || vibeLower.includes('rest')) {
    style = 'minimal'
    mood = 'serene'
  }

  return {
    reading: {
      title: "The Dawning Light",
      subtitle: "A new perspective emerges from within",
      body: `As you sit with this moment of "${vibe}", know that clarity flows like water through still stones. The universe is conspiring in your favor, though the signs may be subtle right now. Trust the stirrings in your chest—they're more wise than your mind sometimes admits. Something beautiful is beginning to take shape.`,
      tags: ["intuition", "new-beginnings", "trust"],
      advice: "Take one small step toward what calls to you. The path reveals itself as you walk."
    },
    cards: [
      {
        id: "1",
        style,
        primaryColor: style === 'ethereal' ? '#a78bfa' : style === 'geometric' ? '#f59e0b' : style === 'minimal' ? '#6b7280' : '#10b981',
        secondaryColor: style === 'ethereal' ? '#f0abfc' : style === 'geometric' ? '#ec4899' : style === 'minimal' ? '#e5e7eb' : '#34d399',
        accentElement: "stars",
        mood
      }
    ]
  }
}
