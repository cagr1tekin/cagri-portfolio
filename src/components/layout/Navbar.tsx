'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import ThemeSwitcher from '@/components/ui/ThemeSwitcher'
import { cn } from '@/lib/utils'
import type { Locale } from '@/types'

interface NavbarProps {
  msg: { nav: Record<string, string> }
  locale: Locale
}

export default function Navbar({ msg, locale }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const switchLocale = () => {
    const next = locale === 'tr' ? 'en' : 'tr'
    const segments = pathname.split('/')
    segments[1] = next
    router.push(segments.join('/'))
  }

  return (
    <header
      className={cn(
        'fixed top-3 left-4 right-4 z-40 rounded-xl transition-all duration-300',
        scrolled
          ? 'backdrop-blur-md border border-[var(--border)]'
          : 'border border-transparent'
      )}
      style={{ background: scrolled ? 'var(--navbar-bg)' : 'transparent' }}
    >
      <nav className="flex items-center justify-between px-4 py-3 max-w-6xl mx-auto">
        <Link
          href={`/${locale}`}
          className="text-[var(--accent)] font-mono font-bold text-lg tracking-wider hover:opacity-80 transition-opacity"
        >
          CT
        </Link>

        <div className="flex items-center gap-3">
          <ThemeSwitcher />
          <button
            onClick={switchLocale}
            className="text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors border border-[var(--border)] px-2 py-1 rounded cursor-pointer"
            aria-label="Switch language"
          >
            {locale === 'tr' ? 'EN' : 'TR'}
          </button>
        </div>
      </nav>
    </header>
  )
}
