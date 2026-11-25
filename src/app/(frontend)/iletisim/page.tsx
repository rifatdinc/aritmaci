import { QuoteForm } from '@/components/QuoteForm'
import { buildWhatsappUrl, getSiteSettings } from '@/lib/cms'
import {
  Call02Icon,
  Clock01Icon,
  Location01Icon,
  Mail01Icon,
  WhatsappIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

export const metadata: Metadata = {
  title: 'İletişim ve Ücretsiz Keşif',
  description:
    'Gölcük / Kocaeli merkezli Aritman Su Arıtma Sistemleri iletişim, telefon, WhatsApp destek ve ücretsiz keşif talep formu.',
}

export const dynamic = 'force-dynamic'

export default async function ContactPage() {
  const settings = await getSiteSettings()
  const telHref = `tel:${settings.phoneDisplay.replace(/\s+/g, '')}`
  const waHref = buildWhatsappUrl(
    settings.whatsappNumber,
    'Merhaba, ücretsiz keşif ve su arıtma sistemleri hakkında bilgi almak istiyorum.',
  )

  return (
    <section className="bg-[var(--background)] py-16 sm:py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-4 flex items-center gap-2 font-mono text-xs text-[var(--muted-foreground)]">
          <Link href="/" className="transition-colors duration-150 hover:text-[var(--foreground)]">
            Ana sayfa
          </Link>
          <span>/</span>
          <span className="text-[var(--foreground)]">İletişim</span>
        </div>

        <div className="mb-12 max-w-2xl">
          <h1 className="text-[28px] font-medium leading-[1.15] tracking-[-0.02em] text-[var(--foreground)] sm:text-[36px]">
            İletişim ve ücretsiz keşif
          </h1>
          <p className="mt-3 text-base leading-7 text-[var(--text-secondary)]">
            Gölcük, Kocaeli ve İstanbul genelinde ücretsiz su analizi, cihaz keşfi, kurulum ve
            filtre bakım randevuları için bize doğrudan ulaşabilirsiniz.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-5">
            <div className="divide-y divide-[var(--border)] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]">
              <a
                href={telHref}
                className="flex items-start gap-3 p-5 transition-colors duration-150 hover:bg-[var(--background)]/70"
              >
                <span className="mt-0.5 flex w-5 shrink-0 justify-center text-[var(--muted-foreground)]">
                  <HugeiconsIcon icon={Call02Icon} size={16} strokeWidth={1.5} />
                </span>
                <div>
                  <div className="text-xs text-[var(--muted-foreground)]">Telefon</div>
                  <div className="mt-1 font-mono text-base font-medium tabular-nums text-[var(--foreground)]">
                    {settings.phoneDisplay}
                  </div>
                </div>
              </a>

              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-5 transition-colors duration-150 hover:bg-[var(--background)]/70"
              >
                <span className="mt-0.5 flex w-5 shrink-0 justify-center text-[var(--muted-foreground)]">
                  <HugeiconsIcon icon={WhatsappIcon} size={16} strokeWidth={1.5} />
                </span>
                <div>
                  <div className="text-xs text-[var(--muted-foreground)]">WhatsApp</div>
                  <div className="mt-1 text-base font-medium text-[var(--foreground)]">
                    Hızlı teklif ve keşif
                  </div>
                  <div className="mt-0.5 text-xs text-[var(--text-secondary)]">Aynı gün dönüş</div>
                </div>
              </a>

              {settings.email && (
                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-start gap-3 p-5 transition-colors duration-150 hover:bg-[var(--background)]/70"
                >
                  <span className="mt-0.5 flex w-5 shrink-0 justify-center text-[var(--muted-foreground)]">
                    <HugeiconsIcon icon={Mail01Icon} size={16} strokeWidth={1.5} />
                  </span>
                  <div>
                    <div className="text-xs text-[var(--muted-foreground)]">E-posta</div>
                    <div className="mt-1 text-sm font-medium text-[var(--foreground)]">
                      {settings.email}
                    </div>
                  </div>
                </a>
              )}

              <div className="flex items-start gap-3 p-5">
                <span className="mt-0.5 flex w-5 shrink-0 justify-center text-[var(--muted-foreground)]">
                  <HugeiconsIcon icon={Clock01Icon} size={16} strokeWidth={1.5} />
                </span>
                <div>
                  <div className="text-xs text-[var(--muted-foreground)]">Çalışma saatleri</div>
                  <div className="mt-1 text-sm font-medium text-[var(--foreground)]">
                    {settings.workingHours}
                  </div>
                  <div className="mt-0.5 text-xs text-[var(--text-secondary)]">
                    {settings.serviceArea}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-5">
                <span className="mt-0.5 flex w-5 shrink-0 justify-center text-[var(--muted-foreground)]">
                  <HugeiconsIcon icon={Location01Icon} size={16} strokeWidth={1.5} />
                </span>
                <div>
                  <div className="text-xs text-[var(--muted-foreground)]">Merkez adres</div>
                  <div className="mt-1 text-sm font-medium text-[var(--foreground)]">
                    Gölcük / Kocaeli
                  </div>
                  <div className="mt-0.5 text-xs leading-5 text-[var(--text-secondary)]">
                    {settings.address}
                  </div>
                </div>
              </div>
            </div>

            <iframe
              title="Aritman Su Arıtma Sistemleri Harita"
              className="h-64 w-full rounded-2xl border border-[var(--border)] bg-[var(--card)]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                settings.mapsQuery || 'Gölcük Kocaeli',
              )}&output=embed`}
            />
          </div>

          <div className="lg:col-span-7">
            <QuoteForm whatsappNumber={settings.whatsappNumber} />
          </div>
        </div>
      </div>
    </section>
  )
}
