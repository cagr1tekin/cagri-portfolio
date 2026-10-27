'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useMagnetic } from '@/hooks/useMagnetic'
import type { Locale } from '@/types'

const ThreeCanvas = dynamic(() => import('./ThreeCanvas'), { ssr: false })

interface HeroProps {
  msg: {
    greeting: string; name: string; roles: string[]
    tagline: string; subtitle: string
    cta_projects: string; cta_contact: string
  }
  locale: Locale
}

export default function HeroSection({ msg, locale }: HeroProps) {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [displayed, setDisplayed] = useState('')
  const [roleIdx, setRoleIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const magP = useMagnetic<HTMLAnchorElement>(0.3)
  const magC = useMagnetic<HTMLAnchorElement>(0.3)

  useEffect(() => {
    const current = msg.roles[roleIdx]
    let t: ReturnType<typeof setTimeout>
    if (!deleting && displayed.length < current.length)
      t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 75)
    else if (!deleting)
      t = setTimeout(() => setDeleting(true), 2200)
    else if (displayed.length > 0)
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
    else { setDeleting(false); setRoleIdx(i => (i + 1) % msg.roles.length) }
    return () => clearTimeout(t)
  }, [displayed, deleting, roleIdx, msg.roles])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !titleRef.current) return
    import('animejs').then(({ default: anime }) => {
      anime({
        targets: titleRef.current?.querySelectorAll('.letter'),
        opacity: [0, 1], translateY: [24, 0],
        delay: anime.stagger(38, { start: 200 }),
        duration: 600, easing: 'easeOutExpo',
      })
    })
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <ThreeCanvas />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg-base)] pointer-events-none" />

      <div className="relative z-10 text-center max-w-3xl mx-auto px-6 pt-28 pb-20">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          className="text-xs font-mono text-[var(--accent)] tracking-[0.3em] uppercase mb-6">
          {msg.greeting}
        </motion.p>

        <h1 ref={titleRef}
          className="text-5xl sm:text-7xl font-bold tracking-tight text-[var(--text-primary)] mb-6"
          style={{ fontFamily: 'var(--font-heading)' }}>
          {msg.name.split('').map((c, i) => (
            <span key={i} className="letter inline-block opacity-0"
              style={{ whiteSpace: c === ' ' ? 'pre' : 'normal' }}>{c}</span>
          ))}
        </h1>

        <div className="h-9 mb-6">
          <p className="text-2xl font-mono text-[var(--accent)]">
            {displayed}<span className="animate-pulse">▌</span>
          </p>
        </div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
          className="text-lg text-[var(--text-secondary)] mb-2 max-w-xl mx-auto leading-relaxed">
          {msg.tagline}
        </motion.p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
          className="text-sm font-mono text-[var(--text-muted)] mb-12">
          {msg.subtitle}
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }}
          className="flex flex-wrap items-center justify-center gap-4">
          <motion.a ref={magP.ref} href="#monitor"
            style={magP.style} onMouseMove={magP.onMouseMove} onMouseLeave={magP.onMouseLeave}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-medium text-sm bg-[var(--accent)] text-[var(--bg-base)] cursor-pointer hover:opacity-90 transition-opacity shadow-[0_0_24px_var(--accent-glow)]">
            {msg.cta_projects}
          </motion.a>
          <motion.a ref={magC.ref} href="#monitor"
            style={magC.style} onMouseMove={magC.onMouseMove} onMouseLeave={magC.onMouseLeave}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-medium text-sm border border-[var(--border-accent)] text-[var(--text-primary)] cursor-pointer hover:bg-[var(--accent-glow)] transition-all">
            {msg.cta_contact}
          </motion.a>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
          className="mt-16 flex flex-col items-center gap-2">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-px h-8 bg-gradient-to-b from-[var(--accent)] to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}
