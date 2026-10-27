'use client'

import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/utils'
import type { Theme } from '@/types'

const THEME_LABELS: Record<Theme, { label: string; icon: string }> = {
  'mono':          { label: 'Mono',  icon: '○' },
  'glassmorphism': { label: 'Glass', icon: '◈' },
  'bold':          { label: 'Bold',  icon: '■' },
}

export default function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, setTheme, mounted } = useTheme()

  if (!mounted) return <div className="w-[120px] h-8" />

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {(Object.keys(THEME_LABELS) as Theme[]).map((t) => (
        <button
          key={t}
          onClick={() => setTheme(t)}
          title={THEME_LABELS[t].label}
          aria-label={`Switch to ${THEME_LABELS[t].label} theme`}
          className={cn(
            'flex items-center gap-1 px-2 py-1 rounded text-xs font-mono transition-all duration-200 cursor-pointer',
            theme === t
              ? 'text-[var(--accent)] border border-[var(--border-accent)] bg-[var(--accent-glow)]'
              : 'text-[var(--text-muted)] border border-transparent hover:text-[var(--text-secondary)]'
          )}
        >
          <span>{THEME_LABELS[t].icon}</span>
          <span className="hidden sm:inline">{THEME_LABELS[t].label}</span>
        </button>
      ))}
    </div>
  )
}
