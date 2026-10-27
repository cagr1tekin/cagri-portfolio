'use client'

import { useEffect, useRef } from 'react'

interface Dot {
  homeX: number; homeY: number
  x: number; y: number
  vx: number; vy: number
}

type Theme = 'mono' | 'glassmorphism' | 'bold'

function getTheme(): Theme {
  return (document.documentElement.getAttribute('data-theme') as Theme) || 'mono'
}

function getAccentRGB(): [number, number, number] {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--accent-rgb').trim()
  if (raw) {
    const p = raw.split(',').map(Number)
    if (p.length === 3) return p as [number, number, number]
  }
  return [245, 245, 245]
}

// Pre-render a single dot to an offscreen canvas — used as a stamp
function createSprite(theme: Theme, accentRGB: [number, number, number]): HTMLCanvasElement {
  const DOT_R   = 5.5
  const SQ_HALF = 5
  const SIZE    = Math.ceil(Math.max(DOT_R, SQ_HALF) * 2 + 4)
  const cx      = SIZE / 2
  const off     = document.createElement('canvas')
  off.width     = SIZE
  off.height    = SIZE
  const c       = off.getContext('2d')!
  const [r, g, b] = accentRGB

  if (theme === 'mono') {
    c.beginPath()
    c.arc(cx, cx, DOT_R, 0, Math.PI * 2)
    c.strokeStyle = `rgba(${r},${g},${b},0.9)`
    c.lineWidth   = 1.2
    c.stroke()

  } else if (theme === 'glassmorphism') {
    // Simple solid circle — no per-dot gradient
    c.beginPath()
    c.arc(cx, cx, DOT_R, 0, Math.PI * 2)
    c.fillStyle = `rgba(${r},${g},${b},0.5)`
    c.fill()
    c.strokeStyle = `rgba(255,255,255,0.35)`
    c.lineWidth   = 1
    c.stroke()

  } else {
    // Bold — solid red square
    c.fillStyle = `rgba(255,60,0,0.9)`
    c.fillRect(cx - SQ_HALF, cx - SQ_HALF, SQ_HALF * 2, SQ_HALF * 2)
  }

  return off
}

export default function ThreeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const isMobile  = window.innerWidth < 768
    const GAP       = isMobile ? 22 : 16
    const REPEL_R   = isMobile ? 70 : 110
    const REPEL_F   = 6
    const SPRING    = 0.09
    const DAMPING   = 0.72
    const SPRITE_SZ = 16   // offscreen canvas size

    let w = 0, h = 0
    let mouseX = -9999, mouseY = -9999
    let animId: number
    let dots: Dot[]       = []
    let theme             = getTheme()
    let accentRGB         = getAccentRGB()
    let sprite: HTMLCanvasElement = createSprite(theme, accentRGB)

    const rebuildSprite = () => {
      sprite = createSprite(theme, accentRGB)
    }

    const buildGrid = () => {
      w = canvas.offsetWidth
      h = canvas.offsetHeight
      canvas.width  = w
      canvas.height = h
      dots = []
      const cols = Math.ceil(w / GAP) + 2
      const rows = Math.ceil(h / GAP) + 2
      const ox   = (w % GAP) / 2
      const oy   = (h % GAP) / 2
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const hx = ox + c * GAP
          const hy = oy + r * GAP
          dots.push({ homeX: hx, homeY: hy, x: hx, y: hy, vx: 0, vy: 0 })
        }
      }
    }
    buildGrid()

    // Watch theme changes
    const themeObserver = new MutationObserver(() => {
      theme     = getTheme()
      accentRGB = getAccentRGB()
      rebuildSprite()
    })
    themeObserver.observe(document.documentElement, {
      attributes: true, attributeFilter: ['data-theme'],
    })

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }
    const onMouseLeave = () => { mouseX = -9999; mouseY = -9999 }
    const onResize     = () => buildGrid()
    window.addEventListener('mousemove',  onMouseMove,  { passive: true })
    window.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('resize',     onResize,     { passive: true })

    const half = sprite.width / 2

    const draw = () => {
      animId = requestAnimationFrame(draw)
      ctx.clearRect(0, 0, w, h)

      for (const dot of dots) {
        // Mouse repulsion
        const dx   = dot.x - mouseX
        const dy   = dot.y - mouseY
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < REPEL_R && dist > 0.1) {
          const force = (1 - dist / REPEL_R) * REPEL_F
          dot.vx += (dx / dist) * force
          dot.vy += (dy / dist) * force
        }

        // Spring to home
        dot.vx += (dot.homeX - dot.x) * SPRING
        dot.vy += (dot.homeY - dot.y) * SPRING

        dot.vx *= DAMPING
        dot.vy *= DAMPING

        dot.x += dot.vx
        dot.y += dot.vy

        // Alpha based on displacement from home
        const disp      = Math.sqrt((dot.x - dot.homeX) ** 2 + (dot.y - dot.homeY) ** 2)
        const displaced = Math.min(disp / (REPEL_R * 0.4), 1)
        const base      = theme === 'bold' ? 0.22 : theme === 'glassmorphism' ? 0.18 : 0.16
        const active    = theme === 'bold' ? 0.85 : theme === 'glassmorphism' ? 0.65 : 0.62
        const alpha     = base + displaced * (active - base)

        // Stamp sprite with globalAlpha
        ctx.globalAlpha = alpha
        ctx.drawImage(sprite, dot.x - half, dot.y - half)
      }

      ctx.globalAlpha = 1
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove',  onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('resize',     onResize)
      themeObserver.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  )
}
