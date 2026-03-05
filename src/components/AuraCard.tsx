'use client'

import { useRef, useCallback, useState } from 'react'
import { toPng } from 'html-to-image'
import { Download, Sparkles } from 'lucide-react'
import { GenerativeBackground } from './GenerativeBackground'
import { CardConfig, Reading } from '@/lib/types'

interface AuraCardProps {
  card: CardConfig
  reading: Reading
  vibe: string
  index?: number
}

export function AuraCard({ card, reading, vibe, index = 0 }: AuraCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = useCallback(async () => {
    if (!cardRef.current) return
    
    setIsExporting(true)
    try {
      const dataUrl = await toPng(cardRef.current, {
        width: 1080,
        height: 1080,
        pixelRatio: 1,
        cacheBust: true,
      })
      
      const link = document.createElement('a')
      link.download = `auracard-${card.id}-${Date.now()}.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error('Export failed:', err)
    } finally {
      setIsExporting(false)
    }
  }, [card.id])

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Card Preview */}
      <div 
        ref={cardRef}
        className="relative w-full aspect-square max-w-[400px] rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: '#0f172a' }}
      >
        {/* Generative Background */}
        <div className="absolute inset-0">
          <GenerativeBackground
            style={card.style}
            primaryColor={card.primaryColor}
            secondaryColor={card.secondaryColor}
            accentElement={card.accentElement}
            mood={card.mood}
            width={1080}
            height={1080}
          />
        </div>

        {/* Card Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-12 bg-gradient-to-t from-black/60 via-transparent to-transparent">
          {/* Top: Tags */}
          <div className="flex flex-wrap gap-2">
            {reading.tags.map((tag, i) => (
              <span 
                key={tag}
                className="px-3 py-1 text-xs font-medium rounded-full bg-white/20 backdrop-blur-sm text-white/90"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Middle: Main Reading */}
          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight drop-shadow-lg">
              {reading.title}
            </h2>
            <p className="text-lg md:text-xl text-white/90 font-medium">
              {reading.subtitle}
            </p>
            <p className="text-sm md:text-base text-white/80 leading-relaxed line-clamp-[7]">
              {reading.body}
            </p>
          </div>

          {/* Bottom: Advice & Style */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white/70">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm italic">{reading.advice}</span>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-xs text-white/50 uppercase tracking-widest">
                {card.style} · {card.mood}
              </span>
              <span className="text-xs text-white/50">AuraCard Studio</span>
            </div>
          </div>
        </div>
      </div>

      {/* Export Button */}
      <button
        onClick={handleExport}
        disabled={isExporting}
        className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        <Download className="w-4 h-4" />
        {isExporting ? 'Exporting...' : 'Export PNG'}
      </button>
    </div>
  )
}
