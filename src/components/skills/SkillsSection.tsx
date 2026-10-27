'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Locale } from '@/types'

const SKILLS_DATA = {
  frontend: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'SCSS', 'Framer Motion', 'Three.js', 'shadcn/ui', 'Zustand', 'TanStack Query'],
  backend:  ['Node.js', 'NestJS', 'Express.js', '.NET Core 8', 'Golang'],
  database: ['PostgreSQL', 'MongoDB', 'Supabase', 'Prisma ORM', 'SQL Server'],
  devops:   ['Git', 'GitHub Actions', 'Docker', 'Vercel', 'Render', 'Vite'],
  ai:       ['YOLO', 'Roboflow', 'Google Colab', 'Object Detection', 'Dataset Prep'],
  tools:    ['Figma', 'Postman', 'Swagger UI', 'Electron', 'AWS S3', 'Brevo API'],
}

interface SkillsProps {
  msg: {
    title: string; subtitle: string
    frontend: string; backend: string; database: string
    devops: string; ai: string; tools: string
  }
  locale: Locale
}

export default function SkillsSection({ msg, locale }: SkillsProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const categories = [
    { key: 'frontend', label: msg.frontend, items: SKILLS_DATA.frontend },
    { key: 'backend',  label: msg.backend,  items: SKILLS_DATA.backend },
    { key: 'database', label: msg.database, items: SKILLS_DATA.database },
    { key: 'devops',   label: msg.devops,   items: SKILLS_DATA.devops },
    { key: 'ai',       label: msg.ai,       items: SKILLS_DATA.ai },
    { key: 'tools',    label: msg.tools,    items: SKILLS_DATA.tools },
  ]

  return (
    <section id="skills" ref={ref} className="py-24 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <p className="text-xs font-mono text-[var(--accent)] tracking-widest uppercase mb-3">04 / Skills</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">{msg.title}</h2>
        <p className="text-[var(--text-secondary)]">{msg.subtitle}</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(({ key, label, items }, catIndex) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: catIndex * 0.1 }}
            className="p-5 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg-surface)] glass-card"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            <h3 className="text-xs font-mono text-[var(--accent)] uppercase tracking-widest mb-4">
              {label}
            </h3>
            <div className="flex flex-wrap gap-2">
              {items.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: catIndex * 0.1 + i * 0.04 }}
                  className="text-xs px-2.5 py-1 rounded border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--border-accent)] hover:text-[var(--accent)] transition-all duration-200 cursor-default font-mono"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
