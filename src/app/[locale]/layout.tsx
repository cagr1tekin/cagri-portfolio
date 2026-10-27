import type { Locale } from '@/types'
import trMessages from '@/messages/tr.json'
import enMessages from '@/messages/en.json'

const messages = { tr: trMessages, en: enMessages }

export function generateStaticParams() {
  return [{ locale: 'tr' }, { locale: 'en' }]
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: Locale }
}) {
  const locale = params.locale ?? 'tr'
  const msg = messages[locale] ?? messages.tr

  return (
    <div data-locale={locale}>
      {children}
    </div>
  )
}
