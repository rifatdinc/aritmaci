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
  title: 'İletişim & Ücretsiz Keşif',
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
    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
        <div className="mb-3 flex items-center gap-2 font-mono text-xs text-zinc-400">
          <Link href="/" className="hover:text-zinc-950">
            Ana Sayfa
          </Link>
          <span>/</span>
          <span className="text-zinc-950">İletişim</span>
        </div>

        <div className="mb-12 max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-[-0.03em] text-zinc-950 sm:text-4xl">
            İletişim &amp; Ücretsiz Keşif
          </h1>
          <p className="mt-3 text-[15.5px] leading-relaxed text-zinc-500">
            Gölcük, Kocaeli ve İstanbul genelinde ücretsiz su analizi, cihaz keşfi, kurulum ve
            filtre bakım randevuları için bize doğrudan ulaşabilirsiniz.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-5">
            <div className="divide-y divide-zinc-200 overflow-hidden rounded-3xl border border-zinc-200/90 bg-white">
              <a
                href={telHref}
                className="flex items-start gap-3.5 p-5 transition-colors hover:bg-zinc-50"
              >
                <HugeiconsIcon
                  icon={Call02Icon}
                  size={18}
                  strokeWidth={1.8}
                  className="mt-0.5 text-zinc-500"
                />
                <div>
                  <div className="text-xs text-zinc-400">Telefon</div>
                  <div className="mt-0.5 font-mono text-base font-medium text-zinc-950">
                    {settings.phoneDisplay}
                  </div>
                </div>
              </a>

              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3.5 p-5 transition-colors hover:bg-zinc-50"
              >
                <HugeiconsIcon
                  icon={WhatsappIcon}
                  size={18}
                  strokeWidth={1.8}
                  className="mt-0.5 text-zinc-500"
                />
                <div>
                  <div className="text-xs text-zinc-400">WhatsApp</div>
                  <div className="mt-0.5 text-base font-medium text-zinc-950">
                    Hızlı Teklif &amp; Keşif
                  </div>
                  <div className="text-xs text-zinc-500">Aynı gün dönüş</div>
                </div>
              </a>

              {settings.email && (
                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-start gap-3.5 p-5 transition-colors hover:bg-zinc-50"
                >
                  <HugeiconsIcon
                    icon={Mail01Icon}
                    size={18}
                    strokeWidth={1.8}
                    className="mt-0.5 text-zinc-500"
                  />
                  <div>
                    <div className="text-xs text-zinc-400">E-posta</div>
                    <div className="mt-0.5 text-sm font-medium text-zinc-950">{settings.email}</div>
                  </div>
                </a>
              )}

              <div className="flex items-start gap-3.5 p-5">
                <HugeiconsIcon
                  icon={Clock01Icon}
                  size={18}
                  strokeWidth={1.8}
                  className="mt-0.5 text-zinc-500"
                />
                <div>
                  <div className="text-xs text-zinc-400">Çalışma Saatleri</div>
                  <div className="mt-0.5 text-sm font-medium text-zinc-950">
                    {settings.workingHours}
                  </div>
                  <div className="text-xs text-zinc-500">{settings.serviceArea}</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-5">
                <HugeiconsIcon
                  icon={Location01Icon}
                  size={18}
                  strokeWidth={1.8}
                  className="mt-0.5 shrink-0 text-zinc-500"
                />
                <div>
                  <div className="text-xs text-zinc-400">Merkez Adres</div>
                  <div className="mt-0.5 text-sm font-medium text-zinc-950">Gölcük / Kocaeli</div>
                  <div className="text-xs leading-relaxed text-zinc-500">{settings.address}</div>
                </div>
              </div>
            </div>

            <iframe
              title="Aritman Su Arıtma Sistemleri Harita"
              className="h-64 w-full rounded-3xl border border-zinc-200/90 bg-white grayscale contrast-95"
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
