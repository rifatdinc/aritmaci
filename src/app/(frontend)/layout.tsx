import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { buildWhatsappUrl, getSiteSettings } from '@/lib/cms'
import { WhatsappIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import type { Metadata } from 'next'
import { Geist_Mono, Instrument_Sans } from 'next/font/google'
import React from 'react'
import './styles.css'

const instrumentSans = Instrument_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  variable: '--font-instrument-sans',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500'],
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
    <html lang="tr" className={`${instrumentSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased selection:bg-[var(--primary)] selection:text-[var(--primary-foreground)]">
        <SiteHeader settings={settings} />
        <main id="main-content">{children}</main>
        <SiteFooter settings={settings} />

        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp ile iletişime geçin"
          className="fixed bottom-6 right-6 z-50 inline-flex h-10 items-center gap-2 rounded-lg border border-[var(--dark-border)] bg-[var(--surface-dark)] px-4 text-sm font-medium text-[var(--dark-foreground)] shadow-[0_8px_24px_rgba(28,27,24,0.14)] transition-[background-color,transform] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[#2c2a25] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
        >
          <HugeiconsIcon icon={WhatsappIcon} size={16} strokeWidth={1.5} />
          <span className="hidden sm:inline">WhatsApp</span>
        </a>
      </body>
    </html>
  )
}
