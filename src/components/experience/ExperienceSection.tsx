'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Locale } from '@/types'

const EXPERIENCES = [
  {
    company_tr: 'Divizyon — Cargo Pilot',
    company_en: 'Divizyon — Cargo Pilot',
    role_tr: 'Frontend Chapter Lead',
    role_en: 'Frontend Chapter Lead',
    start: '03/2026', end: '05/2026',
    bullets_tr: [
      'Three.js tabanlı 3D kargo görselleştirmesi ve çok takımlı mimari kurulumu',
      'Docker containerization ve GitHub Actions CI/CD pipeline yönetimi',
      'Sprint planlaması, PR review ve branch yönetimi ile takım koordinasyonu',
    ],
    bullets_en: [
      'Three.js-based 3D visualization and multi-squad frontend architecture',
      'Docker containerization and GitHub Actions CI/CD pipeline management',
      'Sprint planning, PR reviews, and branch management across squads',
    ],
  },
  {
    company_tr: 'Divizyon — SportLink',
    company_en: 'Divizyon — SportLink',
    role_tr: 'Web Backend Developer',
    role_en: 'Web Backend Developer',
    start: '03/2025', end: '06/2025',
    bullets_tr: [
      '28 kişilik takım projesinde admin panel backend altyapısı',
      'PostgreSQL, Supabase, JWT auth ve güvenlik protokolleri',
      'Swagger UI ile API dokümantasyonu ve Vercel CI/CD kurulumu',
    ],
    bullets_en: [
      'Backend infrastructure for admin panel in a 28-person team project',
      'PostgreSQL, Supabase, JWT auth, and security protocols',
      'API documentation with Swagger UI and Vercel CI/CD setup',
    ],
  },
  {
    company_tr: 'Serbest Yazılım Geliştirici',
    company_en: 'Freelance Software Developer',
    role_tr: 'Freelance',
    role_en: 'Freelance',
    start: '02/2025', end: null,
    bullets_tr: [
      'Web, masaüstü ve platform alanlarında üretim kalitesinde yazılım çözümleri',
      'Full-stack web uygulamaları, Electron POS sistemi, SaaS ürünü, kurumsal siteler',
      'Brief\'ten deployment\'a tüm süreç bağımsız olarak yönetiliyor',
    ],
    bullets_en: [
      'Production-grade software solutions across web, desktop, and platform verticals',
      'Full-stack web apps, Electron POS, SaaS product, corporate websites',
      'Full process managed independently from brief to deployment',
    ],
  },
  {
    company_tr: 'SelçukChain Topluluğu',
    company_en: 'SelçukChain Community',
    role_tr: 'Başkan Yardımcısı',
    role_en: 'Vice President',
    start: '10/2024', end: '11/2025',
    bullets_tr: [
      'Teknik ve stratejik topluluk operasyonları liderliği',
      'Full-stack geliştirme, teknik dokümantasyon ve mentörlük',
    ],
    bullets_en: [
      'Technical and strategic community operations leadership',
      'Full-stack development, technical documentation, and mentorship',
    ],
  },
  {
    company_tr: 'Toyota Otomotiv Sanayi Türkiye (TMMT)',
    company_en: 'Toyota Motor Manufacturing Turkey (TMMT)',
    role_tr: 'Maliyet & Muhasebe Stajyeri',
    role_en: 'Cost & Accounting Intern',
    start: '07/2025', end: '08/2025',
    bullets_tr: [
      'Global kurumsal yapıda zorunlu staj tamamlandı',
      'Kurumsal süreç yönetimi ve fonksiyonlar arası ekip çalışması',
    ],
    bullets_en: [
      'Mandatory internship completed in a global corporate structure',
      'Corporate process management and cross-functional teamwork',
    ],
  },
]

interface ExperienceProps {
  msg: { title: string; subtitle: string; present: string }
  locale: Locale
}

export default function ExperienceSection({ msg, locale }: ExperienceProps) {
  const ref = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  // Anime.js timeline line animation
  useEffect(() => {
    if (!inView || !lineRef.current) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      if (lineRef.current) lineRef.current.style.transform = 'scaleY(1)'
      return
    }
    import('animejs').then(({ default: anime }) => {
      anime({
        targets: lineRef.current,
        scaleY: [0, 1],
        duration: 1200,
        easing: 'easeOutExpo',
      })
    })
  }, [inView])

  return (
    <section id="experience" ref={ref} className="py-24 px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <p className="text-xs font-mono text-[var(--accent)] tracking-widest uppercase mb-3">03 / Experience</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">{msg.title}</h2>
        <p className="text-[var(--text-secondary)]">{msg.subtitle}</p>
      </motion.div>

      <div className="relative">
        {/* Timeline line */}
        <div
          ref={lineRef}
          className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px origin-top"
          style={{ background: 'var(--border-accent)', transform: 'scaleY(0)' }}
        />

        <div className="space-y-10">
          {EXPERIENCES.map((exp, i) => {
            const isLeft = i % 2 === 0
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
                className={`relative flex items-start gap-6 md:gap-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-[var(--accent)] bg-[var(--bg-base)] z-10" />

                {/* Card */}
                <div className={`ml-12 md:ml-0 w-full md:w-[calc(50%-2rem)] ${isLeft ? 'md:pr-8' : 'md:pl-8'}`}>
                  <div
                    className="p-5 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg-surface)] glass-card hover:border-[var(--border-accent)] transition-all duration-300"
                    style={{ boxShadow: 'var(--shadow-card)' }}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-[var(--text-primary)] text-sm">
                        {locale === 'tr' ? exp.company_tr : exp.company_en}
                      </h3>
                      <span className="text-xs font-mono text-[var(--text-muted)] whitespace-nowrap">
                        {exp.start} – {exp.end ?? msg.present}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--accent)] font-mono mb-3">
                      {locale === 'tr' ? exp.role_tr : exp.role_en}
                    </p>
                    <ul className="space-y-1">
                      {(locale === 'tr' ? exp.bullets_tr : exp.bullets_en).map((b, j) => (
                        <li key={j} className="text-xs text-[var(--text-secondary)] flex gap-2">
                          <span className="text-[var(--accent)] mt-0.5 shrink-0">›</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
