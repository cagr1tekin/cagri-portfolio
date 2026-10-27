'use client'

import { useState, useCallback } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import type { Locale } from '@/types'

export function useLocale(currentLocale: Locale) {
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = useCallback((next: Locale) => {
    const segments = pathname.split('/')
    segments[1] = next
    router.push(segments.join('/'))
  }, [pathname, router])

  return { locale: currentLocale, switchLocale }
}
