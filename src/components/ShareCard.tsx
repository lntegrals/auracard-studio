'use client'

import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Link2, Copy, Check } from 'lucide-react'

interface ShareCardProps {
  cardId: string
  vibe: string
}

export function ShareCard({ cardId, vibe }: ShareCardProps) {
  const [copied, setCopied] = useState(false)
  
  // Generate a shareable URL (in production, this would be a real URL)
  const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/share/${cardId}`
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex items-center gap-2 text-purple-600">
        <Link2 className="w-5 h-5" />
        <span className="font-semibold">Share this card</span>
      </div>
      
      {/* QR Code */}
      <div className="p-4 bg-white rounded-xl border-2 border-slate-100">
        <QRCodeSVG
          value={shareUrl}
          size={150}
          level="M"
          includeMargin={false}
        />
      </div>
      
      {/* Share Link */}
      <div className="flex items-center gap-2 w-full max-w-xs">
        <input
          type="text"
          readOnly
          value={shareUrl}
          className="flex-1 px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-600"
        />
        <button
          onClick={handleCopy}
          className="p-2 text-slate-600 hover:text-purple-600 transition-colors"
          title="Copy link"
        >
          {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
        </button>
      </div>
      
      <p className="text-xs text-slate-400">
        Scan to view this card later
      </p>
    </div>
  )
}
