'use client'

import { AnimatedStat, ReferenceMarquee } from '@/components/motion/Primitives'
import { Button } from '@/components/ui/button'
import { buildWhatsappUrl, type SiteSettingsDoc } from '@/lib/types'
import { ArrowRight01Icon, WhatsappIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Link from 'next/link'
import React from 'react'

const FEATURED_CLIENTS = [
  'TRT Spor (Ayazağa)',
  'TRT World (Ulus)',
  'TRT Çocuk',
  'TRT Film Platoları',
  'Kocaeli Büyükşehir Belediyesi',
  'Hızır 41 Yemek Fabrikası',
  'Belde A.Ş.',
  'Ali Baba Cafe',
  'Helvacı Ali',
  'Değirmendere Lagoon Cafe',
]

export function HeroSection({
  settings,
  heroImageUrl,
}: {
  settings: SiteSettingsDoc
  heroImageUrl: string
}) {
  const waHref = buildWhatsappUrl(
    settings.whatsappNumber,
    'Merhaba, ev/işletmem için ücretsiz su analizi ve arıtma sistemi keşfi hakkında bilgi almak istiyorum.',
  )

  return (
    <section className="bg-[var(--background)] pb-20 pt-12 sm:pb-24 sm:pt-20">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Editorial Asymmetric Top Block */}
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="hero-reveal font-mono text-xs text-[var(--muted-foreground)]">
              Gölcük, Kocaeli ve İstanbul · 20 yıllık saha deneyimi
            </p>
            <h1 className="hero-reveal-d1 mt-4 text-[36px] font-medium leading-[1.06] tracking-[-0.02em] text-[var(--foreground)] sm:text-[48px] lg:text-[56px] lg:tracking-[-0.03em]">
              Eviniz ve işletmeniz için ölçülerek kurulan su arıtma
            </h1>
          </div>

          <div className="hero-reveal-d2 lg:col-span-5 lg:pb-1">
            <p className="max-w-lg text-base leading-7 text-[var(--text-secondary)]">
              {settings.heroSubtitle}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button variant="ocean" size="lg" asChild>
                <Link href="/urunler">
                  <span>Cihazları incele</span>
                  <HugeiconsIcon icon={ArrowRight01Icon} size={16} strokeWidth={1.5} />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href={waHref} target="_blank" rel="noopener noreferrer">
                  <HugeiconsIcon icon={WhatsappIcon} size={16} strokeWidth={1.5} />
                  <span>WhatsApp ile yaz</span>
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Hero Visual + Signature Technical TDS Measurement Strip */}
        <div className="hero-reveal-d3 mt-10 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[0_8px_24px_rgba(28,27,24,0.06)]">
          <div className="aspect-[16/9] w-full overflow-hidden bg-[var(--surface-raised)] sm:aspect-[21/10]">
            <img
              src={heroImageUrl}
              alt="Doğal taş ve meşe mutfak tezgâhında paslanmaz arıtma musluğundan akan temiz içme suyu"
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 border-t border-[var(--border)] bg-[var(--card)] px-6 py-4 sm:grid-cols-12 sm:items-center">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[var(--text-secondary)] sm:col-span-7">
              <span>Kurulum öncesi ve sonrası dijital TDS ölçümü</span>
              <span className="hidden h-3 w-px bg-[var(--border-strong)] sm:inline-block" aria-hidden="true" />
              <span>NSF ve TSE onaylı filtreler</span>
              <span className="hidden h-3 w-px bg-[var(--border-strong)] sm:inline-block" aria-hidden="true" />
              <span>2 yıl garanti</span>
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-[var(--border)] pt-3 sm:col-span-5 sm:justify-end sm:border-t-0 sm:pt-0">
              <div className="flex items-center gap-2 font-mono text-xs tabular-nums">
                <span className="text-[var(--muted-foreground)]">Şebeke</span>
                <span className="text-[var(--text-secondary)] line-through">310 ppm</span>
                <span className="text-[var(--muted-foreground)]" aria-hidden="true">→</span>
                <span className="font-medium text-[var(--primary)]">18 ppm</span>
              </div>
              <div
                className="hidden h-1.5 w-20 overflow-hidden rounded-sm bg-[var(--surface-raised)] md:block"
                aria-hidden="true"
              >
                <div className="h-full w-[94%] bg-[var(--primary)]" />
              </div>
            </div>
          </div>
        </div>

        {/* Verified Metrics Row */}
        <div className="mt-12 grid grid-cols-2 gap-6 border-t border-[var(--border)] pt-8 sm:grid-cols-4">
          {(settings.stats || []).map((st, idx) => (
            <AnimatedStat key={st.id || idx} value={st.value} label={st.label} />
          ))}
        </div>

        {/* Static Client Roster */}
        <div className="mt-10 border-t border-[var(--border)] pt-8">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
            <span className="font-mono text-xs text-[var(--muted-foreground)]">
              Kurulum yapılan kurumlar ve işletmeler
            </span>
            <Link
              href="/referanslar"
              className="inline-flex items-center gap-1 text-xs font-medium text-[var(--primary)] transition-colors duration-150 hover:text-[var(--primary-hover)]"
            >
              <span>Tüm referanslar</span>
              <HugeiconsIcon icon={ArrowRight01Icon} size={16} strokeWidth={1.5} />
            </Link>
          </div>
          <ReferenceMarquee items={FEATURED_CLIENTS} />
        </div>
      </div>
    </section>
  )
}
