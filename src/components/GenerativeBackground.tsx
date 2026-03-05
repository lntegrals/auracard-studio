'use client'

import { useMemo, ReactNode } from 'react'
import { CardStyle } from '@/lib/types'

interface GenerativeBackgroundProps {
  style: CardStyle
  primaryColor: string
  secondaryColor: string
  accentElement?: string
  mood?: string
  width?: number
  height?: number
}

// Seeded random for reproducibility
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 147, g: 112, b: 219 } // default purple
}

export function GenerativeBackground({
  style,
  primaryColor,
  secondaryColor,
  accentElement,
  mood,
  width = 1080,
  height = 1080,
}: GenerativeBackgroundProps) {
  const elements = useMemo(() => {
    const seed = primaryColor.charCodeAt(1) * 1000 + secondaryColor.charCodeAt(1)
    const elements: ReactNode[] = []
    
    // Add gradient background
    const primary = hexToRgb(primaryColor)
    const secondary = hexToRgb(secondaryColor)

    if (style === 'ethereal') {
      // Ethereal: Soft gradients, glow, floating particles
      elements.push(
        <defs key="defs">
          <radialGradient id="etherealGrad" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor={`rgb(${primary.r}, ${primary.g}, ${primary.b})`} stopOpacity="0.8" />
            <stop offset="50%" stopColor={`rgb(${secondary.r}, ${secondary.g}, ${secondary.b})`} stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.2" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      )
      
      elements.push(
        <rect key="bg" width={width} height={height} fill="url(#etherealGrad)" />
      )

      // Floating particles
      for (let i = 0; i < 30; i++) {
        const x = seededRandom(seed + i * 3) * width
        const y = seededRandom(seed + i * 3 + 1) * height
        const r = seededRandom(seed + i * 3 + 2) * 8 + 2
        const opacity = seededRandom(seed + i * 3 + 3) * 0.6 + 0.2
        
        elements.push(
          <circle
            key={`particle-${i}`}
            cx={x}
            cy={y}
            r={r}
            fill={i % 2 === 0 ? primaryColor : secondaryColor}
            opacity={opacity}
            filter="url(#glow)"
          />
        )
      }

    } else if (style === 'geometric') {
      // Geometric: Sharp lines, tessellations, sacred geometry
      elements.push(
        <rect key="bg" width={width} height={height} fill="#0f172a" />
      )

      // Hexagon grid
      const hexSize = 80
      const cols = Math.ceil(width / (hexSize * 1.5)) + 1
      const rows = Math.ceil(height / (hexSize * Math.sqrt(3))) + 1

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const offset = row % 2 === 0 ? 0 : hexSize * 0.75
          const x = col * hexSize * 1.5 + offset
          const y = row * hexSize * Math.sqrt(3)
          
          if (seededRandom(seed + row * 100 + col) > 0.6) {
            elements.push(
              <polygon
                key={`hex-${row}-${col}`}
                points={generateHexagon(x, y, hexSize * 0.9)}
                fill="none"
                stroke={col % 2 === 0 ? primaryColor : secondaryColor}
                strokeWidth="2"
                opacity={seededRandom(seed + row * 100 + col + 1) * 0.5 + 0.2}
              />
            )
          }
        }
      }

      // Center focal shape
      elements.push(
        <polygon
          key="center"
          points={generateHexagon(width / 2, height / 2, 120)}
          fill={primaryColor}
          opacity={0.3}
        />
      )
      elements.push(
        <polygon
          key="center-inner"
          points={generateHexagon(width / 2, height / 2, 80)}
          fill={secondaryColor}
          opacity={0.5}
        />
      )

    } else if (style === 'minimal') {
      // Minimal: Clean lines, negative space, single focal element
      elements.push(
        <rect key="bg" width={width} height={height} fill="#fafafa" />
      )

      // Single large circle
      const cx = width / 2
      const cy = height / 2
      const r = Math.min(width, height) * 0.35
      
      elements.push(
        <circle
          key="focal"
          cx={cx}
          cy={cy}
          r={r}
          fill={primaryColor}
          opacity={0.15}
        />
      )

      // Thin accent line
      const lineY = height * 0.7
      elements.push(
        <line
          key="line"
          x1={width * 0.15}
          y1={lineY}
          x2={width * 0.85}
          y2={lineY}
          stroke={secondaryColor}
          strokeWidth="3"
        />
      )

      // Small dots
      for (let i = 0; i < 5; i++) {
        elements.push(
          <circle
            key={`dot-${i}`}
            cx={width * (0.2 + i * 0.15)}
            cy={lineY + 30}
            r={4}
            fill={primaryColor}
          />
        )
      }

    } else if (style === 'organic') {
      // Organic: Fluid curves, nature-inspired, perlin-like
      elements.push(
        <defs key="defs">
          <linearGradient id="organicGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.6" />
            <stop offset="100%" stopColor={secondaryColor} stopOpacity="0.4" />
          </linearGradient>
        </defs>
      )
      
      elements.push(
        <rect key="bg" width={width} height={height} fill="#fefcfb" />
      )

      // Fluid wave curves
      for (let i = 0; i < 5; i++) {
        const yOffset = height * (0.2 + i * 0.15)
        const amplitude = 50 + seededRandom(seed + i) * 100
        const frequency = 0.002 + seededRandom(seed + i + 1) * 0.003
        
        elements.push(
          <path
            key={`wave-${i}`}
            d={generateWave(width, yOffset, amplitude, frequency, seed + i)}
            fill="none"
            stroke={i % 2 === 0 ? primaryColor : secondaryColor}
            strokeWidth={3 + i}
            opacity={0.4 - i * 0.05}
          />
        )
      }

      // Organic circles (leaves/bubbles)
      for (let i = 0; i < 8; i++) {
        const x = seededRandom(seed + i * 7) * width
        const y = seededRandom(seed + i * 7 + 1) * height
        const r = 10 + seededRandom(seed + i * 7 + 2) * 40
        
        elements.push(
          <circle
            key={`bubble-${i}`}
            cx={x}
            cy={y}
            r={r}
            fill={i % 2 === 0 ? primaryColor : secondaryColor}
            opacity={0.2 + seededRandom(seed + i * 7 + 3) * 0.2}
          />
        )
      }
    }

    return elements
  }, [style, primaryColor, secondaryColor, accentElement, mood, width, height])

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      {elements}
    </svg>
  )
}

function generateHexagon(cx: number, cy: number, size: number): string {
  const angles = [0, 60, 120, 180, 240, 300]
  const points = angles.map(angle => {
    const rad = (angle * Math.PI) / 180
    return `${cx + size * Math.cos(rad)},${cy + size * Math.sin(rad)}`
  })
  return points.join(' ')
}

function generateWave(width: number, yOffset: number, amplitude: number, frequency: number, seed: number): string {
  let d = `M 0 ${yOffset}`
  for (let x = 0; x <= width; x += 10) {
    const y = yOffset + Math.sin(x * frequency + seed) * amplitude
    d += ` L ${x} ${y}`
  }
  return d
}
