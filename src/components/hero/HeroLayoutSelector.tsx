'use client'

import { cn } from '@/lib/utils'

export type HeroLayout = 'landing' | 'dashboard' | 'creative' | 'minimal'

const LAYOUTS: { key: HeroLayout; label: string; icon: string }[] = [
  { key: 'landing',   label: 'Landing',    icon: '⬡' },
  { key: 'dashboard', label: 'Dashboard',  icon: '⊞' },
  { key: 'creative',  label: 'Creative',   icon: '◈' },
  { key: 'minimal',   label: 'Minimal',    icon: '─' },
]

interface Props {
  current: HeroLayout
  onChange: (l: HeroLayout) => void
}

export default function HeroLayoutSelector({ current, onChange }: Props) {
  return (
    <div className="flex items-center gap-1 p-1 rounded-full border border-[var(--border)] bg-[var(--bg-surface)] glass-card backdrop-blur-sm">
      {LAYOUTS.map(({ key, label, icon }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          title={label}
          className={cn(
            'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer',
            current === key
              ? 'bg-[var(--accent)] text-white shadow-sm'
              : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
          )}
        >
          <span className="text-[10px]">{icon}</span>
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  )
}
