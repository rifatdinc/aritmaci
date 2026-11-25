import { buildWhatsappUrl, type SiteSettingsDoc } from '@/lib/types'
import { DropletIcon, Settings02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Link from 'next/link'
import React from 'react'

export function SiteFooter({ settings }: { settings: SiteSettingsDoc }) {
  const year = new Date().getFullYear()
  const telHref = `tel:${settings.phoneDisplay.replace(/\s+/g, '')}`
  const waHref = buildWhatsappUrl(
    settings.whatsappNumber,
    'Merhaba, Aritman su arıtma sistemleri hakkında bilgi almak istiyorum.',
  )

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--card)] text-[var(--text-secondary)]">
      <div className="mx-auto max-w-[1200px] px-6 pb-10 pt-16">
        <div className="grid grid-cols-1 gap-10 border-b border-[var(--border)] pb-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="mb-4 flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[var(--primary)] text-[var(--primary-foreground)]">
                <HugeiconsIcon icon={DropletIcon} size={16} strokeWidth={1.5} />
              </span>
              <span className="text-base font-semibold leading-none text-[var(--foreground)]">
                Aritman
              </span>
            </div>
            <p className="max-w-xs text-sm leading-6 text-[var(--text-secondary)]">
              20 yılı aşkın deneyimle Gölcük, Kocaeli ve İstanbul genelinde evsel ve kurumsal su
              arıtma çözümleri.
            </p>
          </div>

          <div className="lg:col-span-2">
            <h4 className="mb-4 text-xs font-medium text-[var(--foreground)]">Sayfalar</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="transition-colors duration-150 hover:text-[var(--foreground)]"
                >
                  Ana sayfa
                </Link>
              </li>
              <li>
                <Link
                  href="/urunler"
                  className="transition-colors duration-150 hover:text-[var(--foreground)]"
                >
                  Cihazlar
                </Link>
              </li>
              <li>
                <Link
                  href="/referanslar"
                  className="transition-colors duration-150 hover:text-[var(--foreground)]"
                >
                  Referanslar
                </Link>
              </li>
              <li>
                <Link
                  href="/iletisim"
                  className="transition-colors duration-150 hover:text-[var(--foreground)]"
                >
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="mb-4 text-xs font-medium text-[var(--foreground)]">Sistemler</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/urunler/evsel-5-asamali-ro-sistemi"
                  className="transition-colors duration-150 hover:text-[var(--foreground)]"
                >
                  Evsel 5 aşamalı RO
                </Link>
              </li>
              <li>
                <Link
                  href="/urunler/kurumsal-isletme-ro-sistemi"
                  className="transition-colors duration-150 hover:text-[var(--foreground)]"
                >
                  Kurumsal ve kafe RO
                </Link>
              </li>
              <li>
                <Link
                  href="/urunler/recineli-su-yumusatma-sistemi"
                  className="transition-colors duration-150 hover:text-[var(--foreground)]"
                >
                  Su yumuşatma
                </Link>
              </li>
              <li>
                <Link
                  href="/urunler/periyodik-filtre-degisim-bakim"
                  className="transition-colors duration-150 hover:text-[var(--foreground)]"
                >
                  Periyodik filtre bakımı
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="mb-4 text-xs font-medium text-[var(--foreground)]">İletişim</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={telHref}
                  className="font-mono tabular-nums text-[var(--foreground)] hover:underline"
                >
                  {settings.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-150 hover:text-[var(--foreground)]"
                >
                  WhatsApp destek hattı
                </a>
              </li>
              {settings.email && (
                <li>
                  <a
                    href={`mailto:${settings.email}`}
                    className="transition-colors duration-150 hover:text-[var(--foreground)]"
                  >
                    {settings.email}
                  </a>
                </li>
              )}
              <li className="leading-6 text-[var(--muted-foreground)]">{settings.address}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 text-xs text-[var(--muted-foreground)]">
          <span>
            © {year} {settings.companyName}
          </span>
          <Link
            href="/admin"
            className="inline-flex h-8 items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 text-xs text-[var(--text-secondary)] transition-colors duration-150 hover:border-[var(--border-strong)] hover:text-[var(--foreground)]"
          >
            <HugeiconsIcon icon={Settings02Icon} size={16} strokeWidth={1.5} />
            <span>Yönetim paneli</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
