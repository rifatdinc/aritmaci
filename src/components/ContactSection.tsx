import { QuoteForm } from '@/components/QuoteForm'
import type { SiteSettingsDoc } from '@/lib/types'
import {
  ArrowUpRight01Icon,
  Call02Icon,
  Clock01Icon,
  Location01Icon,
  Mail01Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

export function ContactSection({
  settings,
  showMap = false,
}: {
  settings: SiteSettingsDoc
  showMap?: boolean
}) {
  const Heading = showMap ? 'h1' : 'h2'
  const phoneHref = `tel:${settings.phoneDisplay.replace(/\s+/g, '')}`
  const mapsQuery = encodeURIComponent(settings.mapsQuery || settings.address || 'Gölcük Kocaeli')

  return (
    <section id="iletisim" className="contact-section">
      <div className="shell contact-layout">
        <div className="contact-copy">
          <Heading>Ücretsiz keşif planlayalım</Heading>
          <p>Ev veya iş yerinizde suyu ölçelim, ihtiyacınıza uygun sistemi birlikte seçelim.</p>
          <address className="contact-details">
            <a href={phoneHref}>
              <HugeiconsIcon icon={Call02Icon} size={21} aria-hidden="true" />
              <span>
                <small>Telefon</small>
                <strong>{settings.phoneDisplay}</strong>
              </span>
            </a>
            {settings.email && (
              <a href={`mailto:${settings.email}`}>
                <HugeiconsIcon icon={Mail01Icon} size={21} aria-hidden="true" />
                <span>
                  <small>E-posta</small>
                  <strong>{settings.email}</strong>
                </span>
              </a>
            )}
            {settings.workingHours && (
              <div>
                <HugeiconsIcon icon={Clock01Icon} size={21} aria-hidden="true" />
                <span>
                  <small>Çalışma saatleri</small>
                  <strong>{settings.workingHours}</strong>
                </span>
              </div>
            )}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <HugeiconsIcon icon={Location01Icon} size={21} aria-hidden="true" />
              <span>
                <small>
                  Haritada aç{' '}
                  <HugeiconsIcon icon={ArrowUpRight01Icon} size={14} aria-hidden="true" />
                </small>
                <strong>{settings.address}</strong>
              </span>
            </a>
          </address>
        </div>
        <QuoteForm whatsappNumber={settings.whatsappNumber} />
      </div>
      {showMap && (
        <div className="shell contact-map">
          <iframe
            title="Aritman Su Arıtma Sistemleri konumu"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
          />
        </div>
      )}
    </section>
  )
}
