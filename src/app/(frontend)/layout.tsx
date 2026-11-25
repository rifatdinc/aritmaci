import '@fontsource-variable/geist'
import '@fontsource/playfair-display/latin-500-italic.css'
import '@fontsource/playfair-display/latin-ext-500-italic.css'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { Button } from '@/components/ui/button'
import { buildWhatsappUrl, getSiteSettings } from '@/lib/cms'
import { WhatsappIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './styles.css'

export const metadata: Metadata = {
  title: {
    default: 'Aritman | Su Arıtma Sistemleri',
    template: '%s | Aritman',
  },
  description:
    'Gölcük, Kocaeli ve İstanbul’da evsel ve kurumsal su arıtma, su yumuşatma ve filtre bakımı. Yerinde su analizi ve ücretsiz keşif.',
}

export const dynamic = 'force-dynamic'

export default async function FrontendLayout({ children }: { children: ReactNode }) {
  const settings = await getSiteSettings()
  const waHref = buildWhatsappUrl(
    settings.whatsappNumber,
    'Merhaba, su arıtma sistemleri ve ücretsiz keşif hakkında bilgi almak istiyorum.',
  )

  return (
    <html lang="tr">
      <body>
        <a className="skip-link" href="#main-content">
          İçeriğe geç
        </a>
        <SiteHeader settings={settings} />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter settings={settings} />
        <Button variant="whatsapp" size="lg" className="floating-whatsapp" asChild>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp ile iletişime geçin"
          >
            <HugeiconsIcon icon={WhatsappIcon} size={20} strokeWidth={1.65} aria-hidden="true" />
            <span>WhatsApp</span>
          </a>
        </Button>
      </body>
    </html>
  )
}
