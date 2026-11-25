import { Brand } from '@/components/Brand'
import { buildWhatsappUrl, type SiteSettingsDoc } from '@/lib/types'
import Link from 'next/link'

const links = [
  ['Ürünler', '/urunler'],
  ['Referanslar', '/referanslar'],
  ['Hakkımızda', '/#hakkimizda'],
  ['İletişim', '/iletisim'],
]

const tools = [
  ['Cihaz seçim rehberi', '/#cihaz-secimi'],
  ['Filtre bakım hesabı', '/#filtre-bakim'],
  ['Sık sorulan sorular', '/#sss'],
]

export function SiteFooter({ settings }: { settings: SiteSettingsDoc }) {
  const telHref = `tel:${settings.phoneDisplay.replace(/\s+/g, '')}`
  const waHref = buildWhatsappUrl(
    settings.whatsappNumber,
    'Merhaba, su arıtma sistemleri hakkında bilgi almak istiyorum.',
  )

  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-grid">
          <div>
            <Brand settings={settings} />
            <p>{settings.serviceArea}</p>
          </div>
          <nav aria-label="Alt menü">
            <h2>Sayfalar</h2>
            <ul>
              {links.map(([label, href]) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Yardım">
            <h2>Yardım</h2>
            <ul>
              {tools.map(([label, href]) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2>Bize ulaşın</h2>
            <address>
              <a href={telHref}>{settings.phoneDisplay}</a>
              <a href={waHref} target="_blank" rel="noopener noreferrer">
                WhatsApp destek hattı
              </a>
              {settings.email && <a href={`mailto:${settings.email}`}>{settings.email}</a>}
              {settings.address && <span>{settings.address}</span>}
            </address>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {settings.companyName}
          </span>
          <Link href="/admin">Yönetim paneli</Link>
        </div>
      </div>
    </footer>
  )
}
