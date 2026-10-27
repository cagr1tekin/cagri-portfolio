'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { Locale } from '@/types'
import LandingView from './LandingView'
import DashboardView from './DashboardView'

type Layout = 'landing' | 'dashboard'

interface Props { locale: Locale }

export default function MonitorSection({ locale }: Props) {
  const [layout, setLayout] = useState<Layout>('landing')

  const labels: Record<Layout, { tr: string; en: string; icon: string }> = {
    landing:   { tr: 'Landing',   en: 'Landing',   icon: '⬡' },
    dashboard: { tr: 'Dashboard', en: 'Dashboard', icon: '⊞' },
  }

  return (
    <section id="monitor" className="flex-1 flex flex-col px-4 pb-0 min-h-0">
      <div className="max-w-6xl mx-auto w-full flex flex-col flex-1 min-h-0">

        {/* Chrome bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 px-4 py-2.5 rounded-t-xl border border-b-0 border-[var(--border)] shrink-0"
          style={{ background: 'var(--bg-surface)' }}
        >
          {/* Traffic lights */}
          <div className="flex gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
          </div>

          {/* URL bar */}
          <div className="flex-1 px-3 py-1 rounded text-xs font-mono flex items-center gap-2"
            style={{ background: 'var(--bg-elevated)', color: 'var(--text-muted)' }}>
            <span className="opacity-40">🔒</span>
            <span>cagri.dev/<span style={{ color: 'var(--accent)' }}>{layout}</span></span>
          </div>

          {/* Layout tabs */}
          <div className="flex items-center gap-1 shrink-0">
            {(Object.keys(labels) as Layout[]).map(key => (
              <button
                key={key}
                onClick={() => setLayout(key)}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium transition-all duration-200 cursor-pointer',
                  layout === key
                    ? 'bg-[var(--accent)] text-[var(--bg-base)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]'
                )}
              >
                <span className="text-[10px]">{labels[key].icon}</span>
                {locale === 'tr' ? labels[key].tr : labels[key].en}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Screen — flex-1 fills all remaining height */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex-1 min-h-0 border border-[var(--border)] rounded-b-xl overflow-hidden"
          style={{ background: 'var(--bg-base)' }}
        >
          <div
            className="h-full overflow-y-auto"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'var(--border-accent) transparent',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={layout}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="h-full"
              >
                {layout === 'landing'
                  ? <LandingView locale={locale} />
                  : <DashboardView locale={locale} />
                }
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
