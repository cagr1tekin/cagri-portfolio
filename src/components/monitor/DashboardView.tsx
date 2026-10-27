'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Star, TrendingUp, Code2, Briefcase, Mail, LayoutDashboard, ChevronRight } from 'lucide-react'
import { PROJECTS, EXPERIENCES, SKILLS } from '@/lib/data'
import { cn } from '@/lib/utils'
import type { Locale } from '@/types'

type Section = 'overview' | 'projects' | 'experience' | 'skills' | 'contact'

const NAV: { id: Section; icon: React.ReactNode; tr: string; en: string }[] = [
  { id: 'overview',   icon: <LayoutDashboard size={14} />, tr: 'Genel Bakış', en: 'Overview' },
  { id: 'projects',   icon: <Code2 size={14} />,           tr: 'Projeler',    en: 'Projects' },
  { id: 'experience', icon: <Briefcase size={14} />,       tr: 'Deneyim',     en: 'Experience' },
  { id: 'skills',     icon: <TrendingUp size={14} />,      tr: 'Yetenekler',  en: 'Skills' },
  { id: 'contact',    icon: <Mail size={14} />,            tr: 'İletişim',    en: 'Contact' },
]

const fade = {
  initial: { opacity: 0, x: 6 },
  animate: { opacity: 1, x: 0 },
  exit:    { opacity: 0, x: -6 },
  transition: { duration: 0.2, ease: 'easeOut' },
}

const stagger = (i: number) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.06, duration: 0.3, ease: [0.22, 1, 0.36, 1] },
})

// ── Shared card shell ───────────────────────────────────
const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn('rounded-xl border p-4', className)}
    style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
    {children}
  </div>
)

// ── KPI Stat card ───────────────────────────────────────
const Stat = ({ label, value, sub, trend }: { label: string; value: string; sub?: string; trend?: string }) => (
  <Card>
    <p className="text-[11px] font-medium mb-2" style={{ color: 'var(--text-muted)' }}>{label}</p>
    <p className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>{value}</p>
    <div className="flex items-center gap-1.5 mt-1">
      {trend && <span className="text-[10px] font-medium text-emerald-400">{trend}</span>}
      {sub && <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{sub}</span>}
    </div>
  </Card>
)

// ── Mini bar chart ──────────────────────────────────────
const MiniBarChart = () => {
  const bars = [40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88]
  return (
    <div className="flex items-end gap-0.5 h-12">
      {bars.map((h, i) => (
        <div key={i} className="flex-1 rounded-sm transition-all duration-300"
          style={{ height: `${h}%`, background: i === bars.length - 1 ? 'var(--accent)' : 'var(--bg-elevated)', opacity: i === bars.length - 1 ? 1 : 0.6 }} />
      ))}
    </div>
  )
}

// ── Activity item ───────────────────────────────────────
const Activity = ({ icon, text, time }: { icon: string; text: string; time: string }) => (
  <div className="flex items-start gap-3 py-2.5 border-b last:border-0" style={{ borderColor: 'var(--border)' }}>
    <div className="w-6 h-6 rounded-md flex items-center justify-center text-xs shrink-0 mt-0.5"
      style={{ background: 'var(--bg-elevated)' }}>{icon}</div>
    <div className="flex-1 min-w-0">
      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{text}</p>
    </div>
    <p className="text-[10px] shrink-0" style={{ color: 'var(--text-muted)' }}>{time}</p>
  </div>
)

// ── PANELS ─────────────────────────────────────────────

function OverviewPanel({ l }: { l: Locale }) {
  return (
    <div className="space-y-4">
      {/* Stats row */}
      <div className="grid grid-cols-4 gap-3">
        <motion.div {...stagger(0)}><Stat label={l === 'tr' ? 'Toplam Proje' : 'Total Projects'} value="8" trend="↑ 3" sub={l === 'tr' ? 'bu yıl' : 'this year'} /></motion.div>
        <motion.div {...stagger(1)}><Stat label={l === 'tr' ? 'Canlı Site' : 'Live Sites'} value="6" sub="production" /></motion.div>
        <motion.div {...stagger(2)}><Stat label={l === 'tr' ? 'Teknoloji' : 'Technologies'} value="20+" sub="stack" /></motion.div>
        <motion.div {...stagger(3)}>
          <Card>
            <p className="text-[11px] font-medium mb-2" style={{ color: 'var(--text-muted)' }}>{l === 'tr' ? 'Durum' : 'Status'}</p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-sm font-semibold text-emerald-400">{l === 'tr' ? 'Müsait' : 'Available'}</p>
            </div>
            <p className="text-[10px] mt-1" style={{ color: 'var(--text-muted)' }}>Konya, TR · Remote</p>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-5 gap-3">
        {/* Activity chart */}
        <motion.div {...stagger(4)} className="col-span-3">
          <Card>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
                {l === 'tr' ? 'Proje Aktivitesi' : 'Project Activity'}
              </p>
              <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>
                {l === 'tr' ? 'Son 12 ay' : 'Last 12 months'}
              </span>
            </div>
            <MiniBarChart />
            <div className="flex items-center justify-between mt-2">
              {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'].map(m => (
                <span key={m} className="text-[9px]" style={{ color: 'var(--text-muted)' }}>{m}</span>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Recent activity */}
        <motion.div {...stagger(5)} className="col-span-2">
          <Card className="h-full">
            <p className="text-xs font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              {l === 'tr' ? 'Son İşlemler' : 'Recent'}
            </p>
            <Activity icon="⚡" text={l === 'tr' ? 'beyondvize.com deploy edildi' : 'beyondvize.com deployed'} time="2g" />
            <Activity icon="★" text={l === 'tr' ? '3D görselleştirme eklendi' : '3D visualization added'} time="5g" />
            <Activity icon="✓" text={l === 'tr' ? 'POS sistemi teslim edildi' : 'POS system delivered'} time="12g" />
            <Activity icon="⚡" text={l === 'tr' ? 'Psikoloji platformu' : 'Psychology platform'} time="1h" />
          </Card>
        </motion.div>
      </div>

      {/* Featured projects strip */}
      <motion.div {...stagger(6)}>
        <Card>
          <p className="text-xs font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
            {l === 'tr' ? 'Öne Çıkan Projeler' : 'Featured Projects'}
          </p>
          <div className="space-y-2">
            {PROJECTS.filter(p => p.featured).map(p => (
              <div key={p.id} className="flex items-center gap-3 py-1.5 border-b last:border-0"
                style={{ borderColor: 'var(--border)' }}>
                <Star size={10} fill="currentColor" style={{ color: 'var(--accent)' }} />
                <p className="text-xs font-medium flex-1" style={{ color: 'var(--text-primary)' }}>
                  {l === 'tr' ? p.title_tr : p.title_en}
                </p>
                <div className="flex gap-1">
                  {p.tech_tags.slice(0, 2).map(t => (
                    <span key={t} className="text-[10px] font-mono px-1.5 py-0.5 rounded"
                      style={{ background: 'var(--bg-elevated)', color: 'var(--text-muted)' }}>{t}</span>
                  ))}
                </div>
                {p.live_url && (
                  <a href={p.live_url} target="_blank" rel="noopener noreferrer"
                    className="cursor-pointer" style={{ color: 'var(--accent)' }}>
                    <ExternalLink size={11} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

function ProjectsPanel({ l }: { l: Locale }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
          {l === 'tr' ? 'Tüm Projeler' : 'All Projects'}
          <span className="ml-2 text-xs font-normal" style={{ color: 'var(--text-muted)' }}>({PROJECTS.length})</span>
        </p>
      </div>
      {/* Table */}
      <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
        <table className="w-full text-xs">
          <thead>
            <tr style={{ background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border)' }}>
              {[l === 'tr' ? 'Proje' : 'Project', l === 'tr' ? 'Kategori' : 'Category', 'Stack', l === 'tr' ? 'Durum' : 'Status', ''].map(h => (
                <th key={h} className="text-left px-4 py-2.5 font-medium"
                  style={{ color: 'var(--text-muted)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PROJECTS.map((p, i) => (
              <motion.tr key={p.id} {...stagger(i)}
                className="border-b last:border-0 hover:bg-[var(--bg-surface)] transition-colors cursor-default"
                style={{ borderColor: 'var(--border)', background: i % 2 === 0 ? 'var(--bg-base)' : 'var(--bg-surface)' }}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {p.featured && <Star size={9} fill="currentColor" style={{ color: 'var(--accent)' }} />}
                    <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                      {l === 'tr' ? p.title_tr : p.title_en}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono"
                    style={{ background: 'var(--bg-elevated)', color: 'var(--text-muted)' }}>
                    {p.category}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1 flex-wrap">
                    {p.tech_tags.slice(0, 2).map(t => (
                      <span key={t} className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>{t}</span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <span className={cn('w-1.5 h-1.5 rounded-full', p.live_url ? 'bg-emerald-400' : 'bg-yellow-400')} />
                    <span style={{ color: 'var(--text-muted)' }}>{p.live_url ? 'Live' : 'Private'}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  {p.live_url && (
                    <a href={p.live_url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 cursor-pointer transition-colors hover:opacity-80"
                      style={{ color: 'var(--accent)' }}>
                      <ExternalLink size={11} />
                    </a>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ExperiencePanel({ l }: { l: Locale }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div>
      <p className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
        {l === 'tr' ? 'İş Deneyimi' : 'Work Experience'}
      </p>
      <div className="space-y-2">
        {EXPERIENCES.map((e, i) => (
          <motion.div key={i} {...stagger(i)}
            className="rounded-xl border overflow-hidden cursor-pointer"
            style={{ borderColor: open === i ? 'var(--border-accent)' : 'var(--border)', background: 'var(--bg-surface)' }}
            onClick={() => setOpen(open === i ? null : i)}>
            <div className="flex items-center gap-4 px-4 py-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                style={{ background: 'var(--accent-glow)', color: 'var(--accent)' }}>
                {(l === 'tr' ? e.company_tr : e.company_en).charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
                  {l === 'tr' ? e.company_tr : e.company_en}
                </p>
                <p className="text-[11px] font-mono" style={{ color: 'var(--accent)' }}>
                  {l === 'tr' ? e.role_tr : e.role_en}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>
                  {e.start} → {e.end ?? (l === 'tr' ? 'Devam' : 'Now')}
                </p>
              </div>
              <ChevronRight size={14} className={cn('transition-transform shrink-0', open === i && 'rotate-90')}
                style={{ color: 'var(--text-muted)' }} />
            </div>
            <AnimatePresence>
              {open === i && (
                <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                  className="overflow-hidden border-t" style={{ borderColor: 'var(--border)' }}>
                  <ul className="px-4 py-3 space-y-1.5">
                    {(l === 'tr' ? e.bullets_tr : e.bullets_en).map((b, j) => (
                      <li key={j} className="flex gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                        <span style={{ color: 'var(--accent)' }}>›</span>{b}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function SkillsPanel({ l }: { l: Locale }) {
  const cats = [
    { k: 'frontend', label: 'Frontend' },
    { k: 'backend',  label: 'Backend' },
    { k: 'database', label: l === 'tr' ? 'Veritabanı' : 'Database' },
    { k: 'devops',   label: 'DevOps' },
    { k: 'ai',       label: 'AI & CV' },
    { k: 'tools',    label: l === 'tr' ? 'Araçlar' : 'Tools' },
  ] as const

  return (
    <div>
      <p className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
        {l === 'tr' ? 'Teknoloji Stack\'i' : 'Tech Stack'}
      </p>
      <div className="grid grid-cols-2 gap-3">
        {cats.map(({ k, label }, ci) => (
          <motion.div key={k} {...stagger(ci)}>
            <Card>
              <p className="text-[10px] font-mono uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>
                {label}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {SKILLS[k].map(s => (
                  <span key={s}
                    className="text-[11px] px-2 py-1 rounded-md border cursor-default transition-all hover:border-[var(--border-accent)] hover:text-[var(--accent)]"
                    style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
                    {s}
                  </span>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function ContactPanel({ l }: { l: Locale }) {
  const links = [
    { label: 'Email', value: 'tekincagri16@gmail.com', href: 'mailto:tekincagri16@gmail.com', badge: l === 'tr' ? 'Tercih edilen' : 'Preferred' },
    { label: 'GitHub', value: 'github.com/tekincagri16', href: 'https://github.com/tekincagri16', badge: null },
    { label: 'LinkedIn', value: 'linkedin.com/in/tekincagri16', href: 'https://linkedin.com/in/tekincagri16', badge: null },
    { label: 'Medium', value: 'medium.com/@tekincagri16', href: 'https://medium.com/@tekincagri16', badge: null },
  ]
  return (
    <div className="max-w-md">
      <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
        {l === 'tr' ? 'İletişime geç' : 'Get in touch'}
      </p>
      <p className="text-xs mb-6" style={{ color: 'var(--text-muted)' }}>
        {l === 'tr' ? 'Freelance teklifler, iş fırsatları veya sadece merhaba demek için.' : 'For freelance offers, job opportunities, or just to say hi.'}
      </p>
      <div className="space-y-2">
        {links.map((link, i) => (
          <motion.a key={link.label} {...stagger(i)}
            href={link.href} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all hover:border-[var(--border-accent)] group"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
            <span className="text-xs w-16 shrink-0 font-mono" style={{ color: 'var(--text-muted)' }}>{link.label}</span>
            <span className="text-xs flex-1 font-medium group-hover:text-[var(--accent)] transition-colors"
              style={{ color: 'var(--text-primary)' }}>{link.value}</span>
            {link.badge && (
              <span className="text-[10px] px-2 py-0.5 rounded-full font-mono"
                style={{ background: 'var(--accent-glow)', color: 'var(--accent)' }}>{link.badge}</span>
            )}
            <ExternalLink size={12} className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ color: 'var(--accent)' }} />
          </motion.a>
        ))}
      </div>
    </div>
  )
}

// ── MAIN ───────────────────────────────────────────────
export default function DashboardView({ locale }: { locale: Locale }) {
  const [active, setActive] = useState<Section>('overview')
  const l = locale

  const panels: Record<Section, React.ReactNode> = {
    overview:   <OverviewPanel l={l} />,
    projects:   <ProjectsPanel l={l} />,
    experience: <ExperiencePanel l={l} />,
    skills:     <SkillsPanel l={l} />,
    contact:    <ContactPanel l={l} />,
  }

  return (
    <div className="flex h-full" style={{ fontFamily: 'var(--font-body)' }}>

      {/* ── Sidebar ─────────────────────────────────── */}
      <aside className="w-48 shrink-0 flex flex-col border-r" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
        {/* Brand */}
        <div className="px-4 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
              style={{ background: 'var(--accent)', color: 'var(--bg-base)' }}>CT</div>
            <div>
              <p className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>Çağrı Tekin</p>
              <p className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>portfolio.sh</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-2 space-y-0.5">
          {NAV.map(item => (
            <button key={item.id} onClick={() => setActive(item.id)}
              className={cn(
                'w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer text-left',
                active === item.id ? 'text-[var(--bg-base)]' : 'hover:bg-[var(--bg-elevated)]'
              )}
              style={{
                background: active === item.id ? 'var(--accent)' : 'transparent',
                color: active === item.id ? 'var(--bg-base)' : 'var(--text-secondary)',
              }}>
              <span style={{ opacity: active === item.id ? 1 : 0.7 }}>{item.icon}</span>
              {l === 'tr' ? item.tr : item.en}
            </button>
          ))}
        </nav>

        {/* User card */}
        <div className="p-3 border-t" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-2.5 p-2 rounded-lg" style={{ background: 'var(--bg-elevated)' }}>
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
              style={{ background: 'var(--accent)', color: 'var(--bg-base)' }}>Ç</div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-semibold truncate" style={{ color: 'var(--text-primary)' }}>Çağrı</p>
              <p className="text-[10px] truncate" style={{ color: 'var(--text-muted)' }}>@tekincagri16</p>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
          </div>
        </div>
      </aside>

      {/* ── Main content ─────────────────────────────── */}
      <main className="flex-1 min-w-0 overflow-y-auto" style={{ background: 'var(--bg-base)' }}>
        {/* Top bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-3 border-b"
          style={{ background: 'var(--bg-base)', borderColor: 'var(--border)' }}>
          <div>
            <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              {l === 'tr' ? NAV.find(n => n.id === active)?.tr : NAV.find(n => n.id === active)?.en}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {l === 'tr' ? 'Müsait' : 'Available'}
            </span>
          </div>
        </div>

        {/* Panel content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div key={active} {...fade}>
              {panels[active]}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}
