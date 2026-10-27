'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, MapPin, Mail, ArrowUpRight, Star, Calendar } from 'lucide-react'
import { PROJECTS, EXPERIENCES, SKILLS } from '@/lib/data'
import { cn } from '@/lib/utils'
import type { Locale } from '@/types'

const IconGH = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
)

const stagger = (i: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
})

type Filter = 'all' | 'freelance' | 'team' | 'personal'

interface Props { locale: Locale }

export default function LandingView({ locale: l }: Props) {
  const [filter, setFilter] = useState<Filter>('all')
  const filtered = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === filter)

  const filterLabels: { k: Filter; tr: string; en: string }[] = [
    { k: 'all',       tr: 'Tümü',     en: 'All' },
    { k: 'freelance', tr: 'Freelance', en: 'Freelance' },
    { k: 'team',      tr: 'Ekip',     en: 'Team' },
    { k: 'personal',  tr: 'Kişisel',  en: 'Personal' },
  ]

  return (
    <div style={{ fontFamily: 'var(--font-body)', color: 'var(--text-primary)' }}>

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="px-10 pt-14 pb-12 border-b" style={{ borderColor: 'var(--border)' }}>
        <div style={{ borderBottom: '1px solid var(--border)' }} className="pb-12">
          {/* Available badge */}
          <motion.div {...stagger(0)} className="inline-flex items-center gap-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
              {l === 'tr' ? 'Proje almaya müsait' : 'Available for projects'}
            </span>
          </motion.div>

          <motion.h1 {...stagger(1)}
            className="text-4xl font-bold tracking-tight leading-[1.1] mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}>
            Çağrı Tekin
          </motion.h1>

          <motion.div {...stagger(2)} className="flex flex-wrap gap-2 mb-5">
            {['System Engineer', 'Full-Stack Dev', 'UI/UX Designer'].map(r => (
              <span key={r} className="text-xs px-2.5 py-1 rounded-full border font-mono"
                style={{ borderColor: 'var(--border-accent)', color: 'var(--accent)' }}>
                {r}
              </span>
            ))}
          </motion.div>

          <motion.p {...stagger(3)} className="text-sm leading-relaxed max-w-lg mb-7"
            style={{ color: 'var(--text-secondary)' }}>
            {l === 'tr'
              ? 'Sistem kurar, backend yazar, arayüz teslim eder. Brief\'ten deployment\'a tek muhatap — fikir aşamasından production\'a.'
              : 'Architects systems, writes backends, ships interfaces. One contact from brief to deployment — idea to production.'}
          </motion.p>

          <motion.div {...stagger(4)} className="flex items-center gap-3 flex-wrap">
            <a href="#projects-l"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold cursor-pointer transition-opacity hover:opacity-90"
              style={{ background: 'var(--accent)', color: 'var(--bg-base)' }}>
              {l === 'tr' ? 'Projeleri gör' : 'View projects'}
              <ArrowUpRight size={14} />
            </a>
            <a href="mailto:tekincagri16@gmail.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium cursor-pointer border transition-all hover:border-[var(--border-accent)]"
              style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
              <Mail size={13} />
              {l === 'tr' ? 'İletişim' : 'Contact'}
            </a>
          </motion.div>

          {/* Meta row */}
          <motion.div {...stagger(5)} className="flex items-center gap-5 mt-8 pt-6"
            style={{ borderTop: '1px solid var(--border)' }}>
            {[
              { icon: <MapPin size={12} />, text: 'Konya, TR' },
              { icon: <Calendar size={12} />, text: l === 'tr' ? '2+ yıl deneyim' : '2+ yr experience' },
              { icon: <Star size={12} />, text: '8+ production projects' },
            ].map(item => (
              <div key={item.text} className="flex items-center gap-1.5 text-xs"
                style={{ color: 'var(--text-muted)' }}>
                <span style={{ color: 'var(--accent)' }}>{item.icon}</span>
                {item.text}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT — 3 Identity Cards ─────────────────── */}
      <section className="px-10 py-10 border-b" style={{ borderColor: 'var(--border)' }}>
        <motion.p {...stagger(0)} className="text-xs font-mono uppercase tracking-widest mb-5"
          style={{ color: 'var(--accent)' }}>
          {l === 'tr' ? '/ Hakkımda' : '/ About'}
        </motion.p>
        <div className="grid grid-cols-3 gap-4">
          {[
            {
              num: '01', title: l === 'tr' ? 'Sistem Müh.' : 'Systems Eng.',
              desc: l === 'tr' ? 'Docker, CI/CD, mimari kararlar. Sistemi doğru kurup ölçeklenebilir yapmak.' : 'Docker, CI/CD, architectural decisions. Building systems that scale.',
              tags: ['Docker', 'GitHub Actions', 'Nginx'],
            },
            {
              num: '02', title: 'Full-Stack',
              desc: l === 'tr' ? 'Next.js\'ten NestJS\'e. Brief\'ten deployment\'a tam süreç yönetimi.' : 'Next.js to NestJS. End-to-end ownership from brief to deployment.',
              tags: ['Next.js', 'NestJS', 'PostgreSQL'],
            },
            {
              num: '03', title: 'UI/UX',
              desc: l === 'tr' ? 'Framer Motion, Three.js, bileşen sistemleri. İyi çalışan arayüzler.' : 'Framer Motion, Three.js, component systems. Interfaces that work.',
              tags: ['Figma', 'Framer Motion', 'Three.js'],
            },
          ].map((item, i) => (
            <motion.div key={item.num} {...stagger(i)}
              className="group p-5 rounded-xl border cursor-default transition-all duration-200 hover:border-[var(--border-accent)]"
              style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
              <p className="text-xs font-mono mb-3" style={{ color: 'var(--text-muted)' }}>{item.num}</p>
              <p className="font-semibold text-sm mb-2" style={{ color: 'var(--text-primary)' }}>{item.title}</p>
              <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
              <div className="flex flex-wrap gap-1">
                {item.tags.map(t => (
                  <span key={t} className="text-[10px] font-mono px-1.5 py-0.5 rounded"
                    style={{ background: 'var(--bg-elevated)', color: 'var(--text-muted)' }}>{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── PROJECTS ──────────────────────────────────── */}
      <section id="projects-l" className="px-10 py-10 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center justify-between mb-5">
          <motion.p {...stagger(0)} className="text-xs font-mono uppercase tracking-widest"
            style={{ color: 'var(--accent)' }}>
            {l === 'tr' ? '/ Projeler' : '/ Projects'}
          </motion.p>
          <div className="flex items-center gap-1">
            {filterLabels.map(({ k, tr, en }) => (
              <button key={k} onClick={() => setFilter(k)}
                className={cn('px-3 py-1 rounded text-xs font-medium transition-all cursor-pointer',
                  filter === k ? 'text-[var(--bg-base)]' : 'hover:text-[var(--text-primary)]')}
                style={{
                  background: filter === k ? 'var(--accent)' : 'transparent',
                  color: filter === k ? 'var(--bg-base)' : 'var(--text-muted)',
                }}>
                {l === 'tr' ? tr : en}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {filtered.slice(0, 6).map((p, i) => (
            <motion.article key={p.id} {...stagger(i)}
              className="group relative p-5 rounded-xl border transition-all duration-200 cursor-default hover:border-[var(--border-accent)]"
              style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
              {p.featured && (
                <div className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-mono"
                  style={{ color: 'var(--accent)' }}>
                  <Star size={9} fill="currentColor" />
                  {l === 'tr' ? 'Öne çıkan' : 'Featured'}
                </div>
              )}
              <p className="text-[10px] font-mono uppercase mb-2" style={{ color: 'var(--text-muted)' }}>
                {p.category}
              </p>
              <h3 className="font-semibold text-sm mb-2 pr-16" style={{ color: 'var(--text-primary)' }}>
                {l === 'tr' ? p.title_tr : p.title_en}
              </h3>
              <p className="text-xs leading-relaxed mb-4 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                {l === 'tr' ? p.desc_tr : p.desc_en}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {p.tech_tags.slice(0, 3).map(t => (
                    <span key={t} className="text-[10px] font-mono px-1.5 py-0.5 rounded border"
                      style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>{t}</span>
                  ))}
                </div>
                {p.live_url && (
                  <a href={p.live_url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[11px] font-medium cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: 'var(--accent)' }}>
                    Live <ExternalLink size={10} />
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ── EXPERIENCE ─────────────────────────────────── */}
      <section className="px-10 py-10 border-b" style={{ borderColor: 'var(--border)' }}>
        <motion.p {...stagger(0)} className="text-xs font-mono uppercase tracking-widest mb-6"
          style={{ color: 'var(--accent)' }}>
          {l === 'tr' ? '/ Deneyim' : '/ Experience'}
        </motion.p>
        <div className="space-y-1">
          {EXPERIENCES.map((e, i) => (
            <motion.div key={i} {...stagger(i)}
              className="group flex items-start gap-4 py-4 border-b last:border-0 cursor-default"
              style={{ borderColor: 'var(--border)' }}>
              <span className="text-xs font-mono mt-0.5 w-16 shrink-0" style={{ color: 'var(--text-muted)' }}>
                {e.start.split('/')[1]}
              </span>
              <div className="flex-1">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                    {l === 'tr' ? e.company_tr : e.company_en}
                  </p>
                  <span className="text-xs font-mono" style={{ color: 'var(--accent)' }}>
                    {l === 'tr' ? e.role_tr : e.role_en}
                  </span>
                  <span className="ml-auto text-xs" style={{ color: 'var(--text-muted)' }}>
                    {e.end ? `${e.start} → ${e.end}` : `${e.start} → ${l === 'tr' ? 'Devam' : 'Now'}`}
                  </span>
                </div>
                <p className="text-xs mt-1.5" style={{ color: 'var(--text-muted)' }}>
                  {(l === 'tr' ? e.bullets_tr : e.bullets_en)[0]}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── SKILLS ─────────────────────────────────────── */}
      <section className="px-10 py-10 border-b" style={{ borderColor: 'var(--border)' }}>
        <motion.p {...stagger(0)} className="text-xs font-mono uppercase tracking-widest mb-6"
          style={{ color: 'var(--accent)' }}>
          {l === 'tr' ? '/ Yetenekler' : '/ Skills'}
        </motion.p>
        <div className="grid grid-cols-2 gap-x-10 gap-y-4">
          {Object.entries(SKILLS).map(([cat, items], ci) => (
            <div key={cat}>
              <p className="text-[10px] font-mono uppercase tracking-widest mb-2"
                style={{ color: 'var(--text-muted)' }}>{cat}</p>
              <div className="flex flex-wrap gap-1.5">
                {items.map(s => (
                  <span key={s} className="text-xs px-2 py-1 rounded-md border transition-all duration-150 cursor-default hover:border-[var(--border-accent)] hover:text-[var(--accent)]"
                    style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ────────────────────────────────────── */}
      <section className="px-10 py-12">
        <motion.div {...stagger(0)} className="text-center max-w-sm mx-auto">
          <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: 'var(--accent)' }}>
            {l === 'tr' ? '/ İletişim' : '/ Contact'}
          </p>
          <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
            {l === 'tr' ? 'Bir projen mi var?' : 'Have a project?'}
          </h2>
          <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
            {l === 'tr' ? 'Fikirlerini dinlemekten mutluluk duyarım.' : 'I\'d love to hear about it.'}
          </p>
          <div className="flex items-center justify-center gap-3">
            <a href="mailto:tekincagri16@gmail.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold cursor-pointer transition-opacity hover:opacity-90"
              style={{ background: 'var(--accent)', color: 'var(--bg-base)' }}>
              <Mail size={14} /> tekincagri16@gmail.com
            </a>
            <a href="https://github.com/tekincagri16" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm cursor-pointer border transition-all hover:border-[var(--border-accent)]"
              style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
              <IconGH />
            </a>
          </div>
        </motion.div>
      </section>

    </div>
  )
}
