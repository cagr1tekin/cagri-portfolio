'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Server, Code2, Palette } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Locale } from '@/types'

const TECH_STACK = {
  frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js', 'Zustand'],
  backend:  ['Node.js', 'NestJS', 'Express.js', '.NET Core', 'Golang'],
  database: ['PostgreSQL', 'MongoDB', 'Supabase', 'Prisma', 'SQL Server'],
  devops:   ['Docker', 'GitHub Actions', 'Vercel', 'Render', 'AWS S3'],
  ai:       ['YOLO', 'Roboflow', 'Google Colab', 'Object Detection'],
}

const IDENTITY_ICONS = [Server, Code2, Palette]

interface AboutProps {
  msg: {
    title: string
    bio: string
    identity_1_title: string; identity_1_desc: string
    identity_2_title: string; identity_2_desc: string
    identity_3_title: string; identity_3_desc: string
    stack_title: string
  }
  locale: Locale
}

export default function AboutSection({ msg, locale }: AboutProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const identities = [
    { title: msg.identity_1_title, desc: msg.identity_1_desc, Icon: IDENTITY_ICONS[0] },
    { title: msg.identity_2_title, desc: msg.identity_2_desc, Icon: IDENTITY_ICONS[1] },
    { title: msg.identity_3_title, desc: msg.identity_3_desc, Icon: IDENTITY_ICONS[2] },
  ]

  return (
    <section id="about" ref={ref} className="py-24 px-6 max-w-6xl mx-auto">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <p className="text-xs font-mono text-[var(--accent)] tracking-widest uppercase mb-3">
          01 / About
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
          {msg.title}
        </h2>
      </motion.div>

      {/* Bio */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto text-center mb-16 leading-relaxed"
      >
        {msg.bio}
      </motion.p>

      {/* Identity cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
        {identities.map(({ title, desc, Icon }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
            whileHover={{ y: -4 }}
            className={cn(
              'p-6 rounded-[var(--radius)] border border-[var(--border)] cursor-default',
              'bg-[var(--bg-surface)] hover:border-[var(--border-accent)]',
              'transition-all duration-300 glass-card'
            )}
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
              style={{ background: 'var(--accent-glow)', color: 'var(--accent)' }}
            >
              <Icon size={20} />
            </div>
            <h3 className="font-semibold text-[var(--text-primary)] mb-2">{title}</h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Tech stack */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <p className="text-center text-sm font-mono text-[var(--text-muted)] uppercase tracking-widest mb-8">
          {msg.stack_title}
        </p>
        <div className="space-y-4">
          {Object.entries(TECH_STACK).map(([cat, items]) => (
            <div key={cat} className="flex flex-wrap gap-2 justify-center">
              {items.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono px-3 py-1.5 rounded border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--border-accent)] hover:text-[var(--accent)] transition-all duration-200 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
