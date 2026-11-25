'use client'

import { Button } from '@/components/ui/button'
import { buildWhatsappUrl, getMediaUrl, type SiteSettingsDoc } from '@/lib/types'
import {
  Call02Icon,
  Cancel01Icon,
  DropletIcon,
  Menu01Icon,
  WhatsappIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

const NAV_ITEMS = [
  { href: '/urunler', label: 'Cihazlar' },
  { href: '/#cihaz-secimi', label: 'Cihaz seçimi' },
  { href: '/referanslar', label: 'Referanslar' },
  { href: '/#filtre-bakim', label: 'Filtre takibi' },
  { href: '/#sss', label: 'Sorular' },
]

export function SiteHeader({ settings }: { settings: SiteSettingsDoc }) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const customLogo =
    settings.logo && typeof settings.logo === 'object' && settings.logo.url
      ? getMediaUrl(settings.logo)
      : null

  const telHref = `tel:${settings.phoneDisplay.replace(/\s+/g, '')}`
  const waHref = buildWhatsappUrl(
    settings.whatsappNumber,
    'Merhaba, su arıtma sistemleri ve ücretsiz keşif hakkında bilgi almak istiyorum.',
  )

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/92 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-6 px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
          aria-label={settings.companyName}
        >
          {customLogo ? (
            <img src={customLogo} alt={settings.companyName} className="h-8 w-auto object-contain" />
          ) : (
            <>
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[var(--primary)] text-[var(--primary-foreground)]">
                <HugeiconsIcon icon={DropletIcon} size={16} strokeWidth={1.5} />
              </span>
              <span className="text-base font-semibold leading-none text-[var(--foreground)]">
                Aritman
              </span>
            </>
          )}
        </Link>

        <nav aria-label="Ana menü" className="hidden lg:block">
          <ul className="flex items-center gap-6">
            {NAV_ITEMS.map((item) => {
              const isActive = !item.href.startsWith('/#') && pathname.startsWith(item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`rounded-md px-1 py-1 text-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] ${
                      isActive
                        ? 'font-medium text-[var(--foreground)]'
                        : 'text-[var(--text-secondary)] hover:text-[var(--foreground)]'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <Link
            href="/iletisim"
            className="text-sm text-[var(--text-secondary)] transition-colors duration-150 hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] rounded-md"
          >
            İletişim
          </Link>
          <Button variant="ocean" size="sm" asChild>
            <a href={waHref} target="_blank" rel="noopener noreferrer">
              Ücretsiz keşif
            </a>
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-strong)] bg-[var(--card)] text-[var(--foreground)] transition-colors duration-150 hover:bg-[var(--surface-raised)] lg:hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
          aria-label={menuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <HugeiconsIcon icon={menuOpen ? Cancel01Icon : Menu01Icon} size={16} strokeWidth={1.5} />
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-[var(--border)] bg-[var(--card)] px-6 pb-6 pt-2 lg:hidden">
          <div className="flex flex-col divide-y divide-[var(--border)]">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="py-3 text-sm font-medium text-[var(--foreground)]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/iletisim"
              onClick={() => setMenuOpen(false)}
              className="py-3 text-sm font-medium text-[var(--foreground)]"
            >
              İletişim
            </Link>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Button variant="outline" size="sm" asChild>
              <a href={telHref}>
                <HugeiconsIcon icon={Call02Icon} size={16} strokeWidth={1.5} />
                <span>Ara</span>
              </a>
            </Button>
            <Button variant="ocean" size="sm" asChild>
              <a href={waHref} target="_blank" rel="noopener noreferrer">
                <HugeiconsIcon icon={WhatsappIcon} size={16} strokeWidth={1.5} />
                <span>WhatsApp</span>
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
