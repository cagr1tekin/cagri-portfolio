import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Çağrı Tekin | Full-Stack Developer & UI/UX Engineer',
  description:
    'Sistem kurar, backend yazar, arayüz teslim eder. Brief\'ten deployment\'a tek muhatap.',
  openGraph: {
    title: 'Çağrı Tekin | Full-Stack Developer',
    description: 'Production-ready independent engineer.',
    url: 'https://cagri.dev',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" data-theme="mono" suppressHydrationWarning>
      <body className="min-h-screen overflow-x-hidden">{children}</body>
    </html>
  )
}
