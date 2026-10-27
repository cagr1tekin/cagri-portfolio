import type { Locale } from '@/types'
import trMessages from '@/messages/tr.json'
import enMessages from '@/messages/en.json'
import Navbar from '@/components/layout/Navbar'
import HeroSection from '@/components/hero/HeroSection'
import MonitorSection from '@/components/monitor/MonitorSection'
import Footer from '@/components/layout/Footer'

const messages = { tr: trMessages, en: enMessages }

export function generateStaticParams() {
  return [{ locale: 'tr' }, { locale: 'en' }]
}

export default function Home({ params }: { params: { locale: Locale } }) {
  const locale = params.locale ?? 'tr'
  const msg = messages[locale] ?? messages.tr

  return (
    <>
      <Navbar msg={msg} locale={locale} />
      <main>
        <HeroSection msg={msg.hero} locale={locale} />
        {/* Monitor + Footer birlikte tam 100vh */}
        <div className="h-screen flex flex-col">
          <MonitorSection locale={locale} />
          <Footer msg={msg.footer} locale={locale} themeMsg={msg.theme} />
        </div>
      </main>
    </>
  )
}
