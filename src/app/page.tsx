'use client'

import { useState } from 'react'
import { Sparkles, Wand2, Loader2 } from 'lucide-react'
import { AuraCard } from '@/components/AuraCard'
import { ShareCard } from '@/components/ShareCard'
import { generateAuraCard } from '@/lib/llm'
import { AuraCard as AuraCardType } from '@/lib/types'

export default function Home() {
  const [vibe, setVibe] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [result, setResult] = useState<AuraCardType | null>(null)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!vibe.trim()) return

    setIsGenerating(true)
    setError('')

    try {
      const response = await generateAuraCard(vibe.trim())
      
      setResult({
        id: '1',
        vibe: vibe.trim(),
        generatedAt: new Date(),
        reading: response.reading,
        cards: response.cards
      })
    } catch (err) {
      setError('Failed to generate aura card. Please try again.')
      console.error(err)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleReset = () => {
    setVibe('')
    setResult(null)
    setError('')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-slate-100">
      {/* Header */}
      <header className="py-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            AuraCard Studio
          </h1>
        </div>
        <p className="text-slate-600 text-lg max-w-md mx-auto">
          Transform your vibe into beautiful aura cards
        </p>
      </header>

      {/* Main Content */}
      <div className="container max-w-4xl mx-auto px-4 pb-16">
        {!result ? (
          /* Input Form */
          <div className="max-w-xl mx-auto mt-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label 
                  htmlFor="vibe" 
                  className="block text-lg font-medium text-slate-700"
                >
                  What&apos;s your vibe right now?
                </label>
                <textarea
                  id="vibe"
                  value={vibe}
                  onChange={(e) => setVibe(e.target.value)}
                  placeholder="e.g., feeling anxious about a new job, just fell in love, need clarity on my path..."
                  className="w-full h-32 p-4 text-lg bg-white border-2 border-slate-200 rounded-2xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition-all resize-none"
                  disabled={isGenerating}
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}

              <button
                type="submit"
                disabled={isGenerating || !vibe.trim()}
                className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Reading your aura...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5" />
                    Generate Aura Card
                  </>
                )}
              </button>
            </form>

            {/* Examples */}
            <div className="mt-12 text-center">
              <p className="text-sm text-slate-500 mb-4">Try these vibes:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['feeling hopeful', 'need direction', 'full of love', 'seeking peace'].map((example) => (
                  <button
                    key={example}
                    onClick={() => setVibe(example)}
                    disabled={isGenerating}
                    className="px-4 py-2 text-sm bg-white border border-slate-200 rounded-full hover:border-purple-300 hover:bg-purple-50 transition-colors"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Result */
          <div className="space-y-8">
            {/* Your Vibe */}
            <div className="text-center">
              <p className="text-sm text-slate-500 uppercase tracking-wider mb-1">
                Your Vibe
              </p>
              <p className="text-xl font-medium text-slate-700">
                &ldquo;{result.vibe}&rdquo;
              </p>
            </div>

            {/* Card Display */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
              {result.cards.map((card, index) => (
                <AuraCard
                  key={card.id}
                  card={card}
                  reading={result.reading}
                  vibe={result.vibe}
                  index={index}
                />
              ))}
            </div>

            {/* Share Section */}
            <div className="mt-8">
              <ShareCard cardId={result.id} vibe={result.vibe} />
            </div>

            {/* Try Again */}
            <div className="text-center">
              <button
                onClick={handleReset}
                className="px-6 py-3 text-purple-600 font-medium hover:bg-purple-50 rounded-xl transition-colors"
              >
                Try another vibe
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
