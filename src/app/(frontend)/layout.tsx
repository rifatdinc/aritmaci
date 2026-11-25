import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { buildWhatsappUrl, getSiteSettings } from '@/lib/cms'
import { WhatsappIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import React from 'react'
import './styles.css'

const geistSans = Geist({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-geist-sans',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  variable: '--font-geist-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Aritman — Su Arıtma Sistemleri',
    template: '%s — Aritman',
  },
  description:
    '20 yılı aşkın deneyim, 5.000+ kurulum. Gölcük, Kocaeli ve İstanbul genelinde evsel ve kurumsal ters osmoz su arıtma cihazları, reçineli yumuşatma sistemleri ve periyodik filtre bakımı.',
}

export const dynamic = 'force-dynamic'

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings()
  const waHref = buildWhatsappUrl(
    settings.whatsappNumber,
    'Merhaba, su arıtma sistemleri ve ücretsiz keşif hakkında bilgi almak istiyorum.',
  )

  return (
    <html lang="tr" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-white text-zinc-950 antialiased selection:bg-sky-600 selection:text-white">
        <SiteHeader settings={settings} />
        <main id="main-content">{children}</main>
        <SiteFooter settings={settings} />

        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp ile iletişime geçin"
          className="fixed bottom-5 right-5 z-50 inline-flex h-11 items-center gap-2 rounded-full bg-emerald-600 px-4 text-xs font-semibold text-white shadow-[0_10px_28px_rgba(5,150,105,0.32)] transition-all hover:-translate-y-0.5 hover:bg-emerald-700"
        >
          <HugeiconsIcon icon={WhatsappIcon} size={18} strokeWidth={2} />
          <span className="hidden sm:inline">WhatsApp</span>
        </a>
      </body>
    </html>
  )
}
