import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Locale } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function t<T extends Record<string, unknown>>(
  messages: T,
  locale: Locale
): T {
  return messages
}

export function pick<T extends Record<string, string>>(
  obj: { tr: string; en: string } | Record<string, string>,
  locale: Locale
): string {
  const key = locale === 'tr' ? 'tr' : 'en'
  return (obj as Record<string, string>)[key] ?? ''
}

export function formatDate(dateStr: string, locale: Locale): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US', {
    year: 'numeric',
    month: 'long',
  })
}
