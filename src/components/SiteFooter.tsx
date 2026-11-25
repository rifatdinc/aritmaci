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
    <footer className="border-t border-zinc-200 bg-white text-zinc-500">
      <div className="mx-auto max-w-[1200px] px-5 pb-10 pt-16 sm:px-6">
        <div className="grid grid-cols-1 gap-10 border-b border-zinc-200/80 pb-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="mb-4 flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-sky-700 text-white">
                <HugeiconsIcon icon={DropletIcon} size={16} strokeWidth={2} />
              </span>
              <span className="text-[16px] font-semibold tracking-tight text-zinc-950">
                Aritman<span className="text-sky-600">.</span>
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-zinc-500">
              20 yılı aşkın deneyimle Gölcük, Kocaeli ve İstanbul genelinde evsel ve kurumsal su
              arıtma çözümleri.
            </p>
          </div>

          <div className="lg:col-span-2">
            <h4 className="mb-4 text-xs font-medium text-zinc-950">Sayfalar</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="transition-colors hover:text-zinc-950">
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link href="/urunler" className="transition-colors hover:text-zinc-950">
                  Cihazlar
                </Link>
              </li>
              <li>
                <Link href="/referanslar" className="transition-colors hover:text-zinc-950">
                  Referanslar
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="transition-colors hover:text-zinc-950">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="mb-4 text-xs font-medium text-zinc-950">Sistemler</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/urunler/evsel-5-asamali-ro-sistemi"
                  className="transition-colors hover:text-zinc-950"
                >
                  Evsel 5 Aşamalı RO
                </Link>
              </li>
              <li>
                <Link
                  href="/urunler/kurumsal-isletme-ro-sistemi"
                  className="transition-colors hover:text-zinc-950"
                >
                  Kurumsal &amp; Kafe RO
                </Link>
              </li>
              <li>
                <Link
                  href="/urunler/recineli-su-yumusatma-sistemi"
                  className="transition-colors hover:text-zinc-950"
                >
                  Su Yumuşatma
                </Link>
              </li>
              <li>
                <Link
                  href="/urunler/periyodik-filtre-degisim-bakim"
                  className="transition-colors hover:text-zinc-950"
                >
                  Periyodik Filtre Bakımı
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="mb-4 text-xs font-medium text-zinc-950">İletişim</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href={telHref} className="font-mono text-zinc-950 hover:underline">
                  {settings.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-zinc-950"
                >
                  WhatsApp Destek Hattı
                </a>
              </li>
              {settings.email && (
                <li>
                  <a
                    href={`mailto:${settings.email}`}
                    className="transition-colors hover:text-zinc-950"
                  >
                    {settings.email}
                  </a>
                </li>
              )}
              <li className="leading-relaxed text-zinc-500">{settings.address}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 text-xs text-zinc-400">
          <span>
            © {year} {settings.companyName}
          </span>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 px-3 py-1 text-zinc-600 transition-colors hover:border-zinc-300 hover:text-zinc-950"
          >
            <HugeiconsIcon icon={Settings02Icon} size={13} strokeWidth={1.8} />
            <span>Yönetim Paneli</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
