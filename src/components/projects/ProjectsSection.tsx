'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ExternalLink, Star } from 'lucide-react'

const IconGithub = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
)
import { cn } from '@/lib/utils'
import type { Locale, Project } from '@/types'

// Static seed data from CV — will be replaced by Supabase in admin panel
const PROJECTS: Project[] = [
  {
    id: '1', featured: true, active: true, order_index: 1,
    category: 'team',
    title_tr: 'Cargo Pilot', title_en: 'Cargo Pilot',
    desc_tr: 'Yük planlama süreçlerini dijitalleştiren lojistik platform. Three.js tabanlı 3D kargo görselleştirmesi ve çok takımlı mimari.',
    desc_en: 'Logistics platform digitizing load planning. Three.js 3D cargo visualization and multi-squad architecture.',
    tech_tags: ['Next.js', 'Three.js', 'Docker', 'GitHub Actions', 'CI/CD'],
    live_url: 'https://cargopilot.divizyon.org',
    created_at: '2025-03-01',
  },
  {
    id: '2', featured: true, active: true, order_index: 2,
    category: 'personal',
    title_tr: 'Visa Platform', title_en: 'Visa Platform',
    desc_tr: 'Türk vatandaşları için akıllı Schengen vize eşleştirme ve karar destek platformu. Karşılaştırma sitesi modeli.',
    desc_en: 'Smart Schengen visa matching and decision support platform for Turkish citizens. Comparison-site model.',
    tech_tags: ['Next.js', 'NestJS', 'PostgreSQL', 'Supabase'],
    created_at: '2026-04-01',
  },
  {
    id: '3', featured: true, active: true, order_index: 3,
    category: 'freelance',
    title_tr: 'Psikoloji Platformu', title_en: 'Psychology Platform',
    desc_tr: 'Uzman listeleme, blog, psikolojik testler, randevu sistemi ve tam admin panel içeren online danışmanlık platformu.',
    desc_en: 'Online counseling platform with expert listing, blog, psychological tests, appointment system, and full admin panel.',
    tech_tags: ['Next.js', 'NestJS', 'Supabase', 'AWS S3', 'Brevo'],
    live_url: 'https://psiko-landing-page.vercel.app',
    created_at: '2025-06-01',
  },
  {
    id: '4', featured: false, active: true, order_index: 4,
    category: 'freelance',
    title_tr: 'Beyond Vize', title_en: 'Beyond Vize',
    desc_tr: 'Global vize danışmanlık firması için SEO odaklı kurumsal web uygulaması. Google Analytics, Maps ve email otomasyonu.',
    desc_en: 'SEO-optimized corporate web application for a global visa consultancy firm.',
    tech_tags: ['Next.js', 'Tailwind CSS', 'GA4', 'Brevo'],
    live_url: 'https://beyondvize.com',
    created_at: '2025-02-01',
  },
  {
    id: '5', featured: false, active: true, order_index: 5,
    category: 'freelance',
    title_tr: 'Liklidi Collective House', title_en: 'Liklidi Collective House',
    desc_tr: 'Kolektif yaşam markası için yüksek etkileşimli landing page. Magnetic butonlar, bento grid, kelime kelime açılma animasyonları.',
    desc_en: 'Highly interactive landing page for a collective living brand. Magnetic buttons, bento grid, word-by-word reveal.',
    tech_tags: ['Next.js', 'Framer Motion', 'Tailwind CSS'],
    live_url: 'https://liklidi-nine.vercel.app',
    created_at: '2026-04-01',
  },
  {
    id: '6', featured: false, active: true, order_index: 6,
    category: 'freelance',
    title_tr: 'CodeBar POS Sistemi', title_en: 'CodeBar POS System',
    desc_tr: 'Offline çalışabilen Electron masaüstü POS uygulaması. Native Windows executable, bulut senkronizasyonu, dark mode arayüz.',
    desc_en: 'Offline-capable Electron desktop POS application. Native Windows executable with cloud sync.',
    tech_tags: ['Electron', 'Node.js', 'SQLite', 'Supabase'],
    created_at: '2025-12-01',
  },
  {
    id: '7', featured: false, active: true, order_index: 7,
    category: 'team',
    title_tr: 'Konsense', title_en: 'Konsense',
    desc_tr: 'Konya üniversite öğrencileri için hibrit Wiki+Sözlük platformu. Divizyon Jam\'da 28 kişi arasında 1. lik.',
    desc_en: 'Hybrid Wiki+Dictionary platform for Konya university students. 1st place at Divizyon Jam among 28 participants.',
    tech_tags: ['Next.js', 'Three.js', 'Gamification', 'PostgreSQL'],
    live_url: 'https://kon-sens.vercel.app',
    created_at: '2024-12-01',
  },
  {
    id: '8', featured: false, active: true, order_index: 8,
    category: 'freelance',
    title_tr: 'Altınöz Bobinaj', title_en: 'Altınöz Bobinaj',
    desc_tr: '1976\'dan bu yana endüstriyel motor sarım firması için kurumsal web sitesi. Marka kimliğine uygun motion-rich tasarım.',
    desc_en: 'Corporate website for an industrial motor rewinding company established in 1976.',
    tech_tags: ['Next.js', 'Framer Motion', 'Tailwind CSS'],
    live_url: 'https://altinozbobinaj.com',
    created_at: '2026-02-01',
  },
]

type Filter = 'all' | 'freelance' | 'team' | 'personal'

interface ProjectsProps {
  msg: {
    title: string; subtitle: string
    filter_all: string; filter_freelance: string; filter_team: string; filter_personal: string
    live_url: string; github_url: string; featured: string
  }
  locale: Locale
}

export default function ProjectsSection({ msg, locale }: ProjectsProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [filter, setFilter] = useState<Filter>('all')

  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: msg.filter_all },
    { key: 'freelance', label: msg.filter_freelance },
    { key: 'team', label: msg.filter_team },
    { key: 'personal', label: msg.filter_personal },
  ]

  const filtered = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === filter)

  return (
    <section id="projects" ref={ref} className="py-24 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <p className="text-xs font-mono text-[var(--accent)] tracking-widest uppercase mb-3">02 / Projects</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">{msg.title}</h2>
        <p className="text-[var(--text-secondary)]">{msg.subtitle}</p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-center gap-2 mb-10 flex-wrap"
      >
        {filters.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={cn(
              'px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer',
              filter === key
                ? 'bg-[var(--accent)] text-white'
                : 'border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--border-accent)]'
            )}
          >
            {label}
          </button>
        ))}
      </motion.div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.article
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              whileHover={{ y: -5 }}
              className={cn(
                'group relative p-5 rounded-[var(--radius)] border border-[var(--border)]',
                'bg-[var(--bg-surface)] hover:border-[var(--border-accent)]',
                'transition-all duration-300 glass-card cursor-default',
                project.featured && 'md:col-span-1'
              )}
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              {project.featured && (
                <div className="flex items-center gap-1 text-xs text-[var(--accent)] font-mono mb-3">
                  <Star size={12} fill="currentColor" /> {msg.featured}
                </div>
              )}
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">
                {locale === 'tr' ? project.title_tr : project.title_en}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                {locale === 'tr' ? project.desc_tr : project.desc_en}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tech_tags.map(tag => (
                  <span key={tag} className="text-xs font-mono px-2 py-0.5 rounded border border-[var(--border)] text-[var(--text-muted)]">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3">
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-[var(--accent)] hover:underline cursor-pointer"
                  >
                    <ExternalLink size={12} /> {msg.live_url}
                  </a>
                )}
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
                  >
                    <IconGithub /> {msg.github_url}
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
