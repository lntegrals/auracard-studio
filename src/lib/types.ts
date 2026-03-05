export type CardStyle = 'ethereal' | 'geometric' | 'minimal' | 'organic'

export interface CardConfig {
  id: string
  style: CardStyle
  primaryColor: string
  secondaryColor: string
  accentElement?: string
  mood: string
}

export interface Reading {
  title: string
  subtitle: string
  body: string
  tags: string[]
  advice: string
}

export interface AuraCard {
  id: string
  vibe: string
  generatedAt: Date
  reading: Reading
  cards: CardConfig[]
}

export interface GenerationRequest {
  vibe: string
}

export interface GenerationResponse {
  reading: Reading
  cards: CardConfig[]
}
