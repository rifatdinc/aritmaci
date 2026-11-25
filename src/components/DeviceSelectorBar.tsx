'use client'

import { Button } from '@/components/ui/button'
import { buildWhatsappUrl, type ProductDoc } from '@/lib/types'
import {
  ArrowRight01Icon,
  ArrowUpRight01Icon,
  Building03Icon,
  DropletIcon,
  Home09Icon,
  Shield01Icon,
  WaterEnergyIcon,
  WhatsappIcon,
  Wrench01Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import React, { useMemo, useState } from 'react'

const EASE = [0.22, 1, 0.36, 1] as const

type UsageKey = 'ev' | 'isletme' | 'bina'
type NeedKey = 'icme' | 'kirec' | 'bakim'

const USAGE_OPTIONS = [
  { key: 'ev' as const, label: 'Ev ve mutfak', icon: Home09Icon },
  { key: 'isletme' as const, label: 'Kafe ve ofis', icon: Building03Icon },
  { key: 'bina' as const, label: 'Villa ve bina', icon: DropletIcon },
]

const NEED_OPTIONS = [
  { key: 'icme' as const, label: 'İçme suyu (RO)', icon: WaterEnergyIcon },
  { key: 'kirec' as const, label: 'Kireç önleme', icon: Shield01Icon },
  { key: 'bakim' as const, label: 'Filtre bakımı', icon: Wrench01Icon },
]

export function DeviceSelectorBar({
  products,
  whatsappNumber,
}: {
  products: ProductDoc[]
  whatsappNumber: string
}) {
  const [usage, setUsage] = useState<UsageKey>('ev')
  const [need, setNeed] = useState<NeedKey>('icme')

  const result = useMemo(() => {
    let category: ProductDoc['category'] = 'evsel'
    let subtitle = 'Ev içi içme suyu · Tezgâh altı kapalı kasa'
    let detail =
      'Günlük 60–240 L kapasite, NSF/TSE onaylı 5 aşamalı membran ve paslanmaz krom musluk dahil.'

    if (need === 'bakim') {
      category = 'filtre'
      subtitle = 'Mevcut cihaz bakımı · Orijinal filtre seti'
      detail = 'Yerinde filtre yenileme, tank basıncı ayarı ve çıkış suyu TDS ölçümü.'
    } else if (usage === 'bina' || need === 'kirec') {
      category = 'yumusatma'
      subtitle = 'Daire, villa veya bina girişi · Kireç önleme'
      detail = 'Kombi, beyaz eşya ve tüm tesisatı kireçten koruyan akıllı valfli reçineli sistem.'
    } else if (usage === 'isletme') {
      category = 'kurumsal'
      subtitle = 'Kafe, restoran ve ofisler · 60–600 L/saat'
      detail = 'Espresso makinesi, çay kazanı ve buz makineleri için kireçsiz yüksek debi.'
    }

    const matched = products.find((p) => p.category === category) || products[0] || null
    return { matched, subtitle, detail, key: `${usage}-${need}` }
  }, [usage, need, products])

  const waHref = buildWhatsappUrl(
    whatsappNumber,
    `Merhaba, cihaz seçim rehberinden yazıyorum. Önerilen sistem (${
      result.matched?.title || 'Su Arıtma Sistemi'
    }) hakkında fiyat ve keşif bilgisi almak istiyorum.`,
  )

  return (
    <section id="cihaz-secimi" className="border-t border-[var(--border)] bg-[var(--card)] py-20 sm:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-lg">
            <span className="font-mono text-xs text-[var(--muted-foreground)]">Cihaz seçimi</span>
            <h2 className="mt-2 text-[28px] font-medium leading-[1.15] tracking-[-0.02em] text-[var(--foreground)] sm:text-[32px]">
              İhtiyacınıza uygun sistemi iki adımda belirleyin
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-[var(--text-secondary)]">
            Kullanım alanınızı ve önceliğinizi seçin, önerilen Aritman sistemini görün.
          </p>
        </div>

        <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--background)] lg:grid-cols-12">
          {/* Selector Left */}
          <div className="flex flex-col justify-between gap-8 p-6 sm:p-8 lg:col-span-6">
            <div className="space-y-6">
              <div>
                <div className="mb-3 text-xs font-medium text-[var(--text-secondary)]">
                  1. Nerede kullanacaksınız?
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {USAGE_OPTIONS.map((opt) => {
                    const active = usage === opt.key
                    return (
                      <button
                        key={opt.key}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setUsage(opt.key)}
                        className={`flex flex-col items-start gap-3 rounded-lg border p-4 text-left transition-[background-color,border-color,color] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] ${
                          active
                            ? 'border-[var(--primary)] bg-[var(--card)] text-[var(--foreground)]'
                            : 'border-[var(--border)] bg-[var(--card)]/70 text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--foreground)]'
                        }`}
                      >
                        <HugeiconsIcon
                          icon={opt.icon}
                          size={16}
                          strokeWidth={1.5}
                          className={
                            active ? 'text-[var(--primary)]' : 'text-[var(--muted-foreground)]'
                          }
                        />
                        <span className="text-xs font-medium leading-4">{opt.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <div className="mb-3 text-xs font-medium text-[var(--text-secondary)]">
                  2. Öncelikli ihtiyacınız nedir?
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {NEED_OPTIONS.map((opt) => {
                    const active = need === opt.key
                    return (
                      <button
                        key={opt.key}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setNeed(opt.key)}
                        className={`flex flex-col items-start gap-3 rounded-lg border p-4 text-left transition-[background-color,border-color,color] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] ${
                          active
                            ? 'border-[var(--primary)] bg-[var(--card)] text-[var(--foreground)]'
                            : 'border-[var(--border)] bg-[var(--card)]/70 text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--foreground)]'
                        }`}
                      >
                        <HugeiconsIcon
                          icon={opt.icon}
                          size={16}
                          strokeWidth={1.5}
                          className={
                            active ? 'text-[var(--primary)]' : 'text-[var(--muted-foreground)]'
                          }
                        />
                        <span className="text-xs font-medium leading-4">{opt.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border)] pt-6">
              <span className="text-xs text-[var(--muted-foreground)]">
                Ücretsiz su sertliği ve TDS analizi dahil
              </span>
              {result.matched && (
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/urunler/${result.matched.slug}`}>
                    <span>Ürünü incele</span>
                    <HugeiconsIcon icon={ArrowRight01Icon} size={16} strokeWidth={1.5} />
                  </Link>
                </Button>
              )}
            </div>
          </div>

          {/* Recommendation Right (Warm Charcoal Surface, No Glow Blob) */}
          <div className="flex flex-col justify-between gap-8 border-t border-[var(--dark-border)] bg-[var(--surface-dark)] p-6 text-[var(--dark-foreground)] sm:p-8 lg:col-span-6 lg:border-l lg:border-t-0">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={result.key}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: EASE }}
              >
                <span className="font-mono text-xs text-[var(--dark-muted)]">Önerilen sistem</span>
                <h3 className="mt-3 text-2xl font-medium leading-[1.2] text-[var(--dark-foreground)]">
                  {result.matched?.title || 'Evsel 5 Aşamalı Kapalı Kasa RO Sistemi'}
                </h3>
                <p className="mt-2 font-mono text-xs tabular-nums text-[var(--dark-secondary)]">
                  {result.subtitle}
                </p>
                <p className="mt-4 text-sm leading-6 text-[var(--dark-secondary)]">
                  {result.detail}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-wrap items-center gap-4 border-t border-[var(--dark-border)] pt-6">
              <Button variant="inverted" size="md" asChild>
                <a href={waHref} target="_blank" rel="noopener noreferrer">
                  <HugeiconsIcon icon={WhatsappIcon} size={16} strokeWidth={1.5} />
                  <span>WhatsApp teklif iste</span>
                  <HugeiconsIcon icon={ArrowUpRight01Icon} size={16} strokeWidth={1.5} />
                </a>
              </Button>
              <Link
                href="/iletisim"
                className="inline-flex h-10 items-center rounded-lg px-2 text-sm text-[var(--dark-secondary)] transition-colors duration-150 hover:text-[var(--dark-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
              >
                Keşif formu
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
