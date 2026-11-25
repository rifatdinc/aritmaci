'use client'

import { Button } from '@/components/ui/button'
import { buildWhatsappUrl, type ProductDoc } from '@/lib/types'
import {
  ArrowRight01Icon,
  ArrowUpRight01Icon,
  Building03Icon,
  DropletIcon,
  Home09Icon,
  SparklesIcon,
  WaterEnergyIcon,
  WhatsappIcon,
  Wrench01Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import React, { useMemo, useState } from 'react'

type UsageKey = 'ev' | 'isletme' | 'bina'
type NeedKey = 'icme' | 'kirec' | 'bakim'

const USAGE_OPTIONS = [
  { key: 'ev' as const, label: 'Ev / Mutfak', icon: Home09Icon },
  { key: 'isletme' as const, label: 'Kafe / Ofis', icon: Building03Icon },
  { key: 'bina' as const, label: 'Villa / Bina', icon: DropletIcon },
]

const NEED_OPTIONS = [
  { key: 'icme' as const, label: 'İçme Suyu (RO)', icon: WaterEnergyIcon },
  { key: 'kirec' as const, label: 'Kireç Önleme', icon: SparklesIcon },
  { key: 'bakim' as const, label: 'Filtre Bakımı', icon: Wrench01Icon },
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
    let subtitle = 'Ev içi içme suyu • Tezgâh altı kapalı kasa'
    let detail =
      'Günlük 60–240 L kapasite, NSF/TSE onaylı 5 aşamalı membran ve paslanmaz krom musluk dahil.'

    if (need === 'bakim') {
      category = 'filtre'
      subtitle = 'Mevcut cihaz bakımı • Orijinal filtre seti'
      detail = 'Yerinde filtre yenileme, tank basıncı ayarı ve çıkış suyu TDS ölçümü.'
    } else if (usage === 'bina' || need === 'kirec') {
      category = 'yumusatma'
      subtitle = 'Daire, villa veya bina girişi • Kireç önleme'
      detail = 'Kombi, beyaz eşya ve tüm tesisatı kireçten koruyan akıllı valfli reçineli sistem.'
    } else if (usage === 'isletme') {
      category = 'kurumsal'
      subtitle = 'Kafe, restoran ve ofisler • 60–600 L/saat'
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
    <section
      id="cihaz-secimi"
      className="border-t border-slate-200/80 bg-slate-50/70 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-lg">
            <span className="font-mono text-xs font-medium text-sky-600">01 / CİHAZ SEÇİMİ</span>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
              İhtiyacınıza uygun sistemi iki tıkla bulun
            </h2>
          </div>
          <p className="max-w-sm text-sm text-slate-500">
            Kullanım alanınızı ve önceliğinizi seçin, önerilen Aritman sistemini anında görün.
          </p>
        </div>

        <div className="grid grid-cols-1 overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.05)] lg:grid-cols-12">
          {/* Interactive Visual Selector Left */}
          <div className="flex flex-col justify-between gap-6 p-6 sm:p-9 lg:col-span-6">
            <div className="space-y-6">
              <div>
                <div className="mb-2.5 text-xs font-medium text-slate-500">
                  1. Nerede kullanacaksınız?
                </div>
                <div className="grid grid-cols-3 gap-2.5">
                  {USAGE_OPTIONS.map((opt) => {
                    const active = usage === opt.key
                    return (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => setUsage(opt.key)}
                        className={`flex flex-col items-center gap-2 rounded-2xl border p-3.5 text-center transition-all cursor-pointer ${
                          active
                            ? 'border-sky-500 bg-sky-50/80 text-sky-900 shadow-2xs'
                            : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-zinc-950'
                        }`}
                      >
                        <HugeiconsIcon
                          icon={opt.icon}
                          size={20}
                          strokeWidth={1.8}
                          className={active ? 'text-sky-600' : 'text-slate-400'}
                        />
                        <span className="text-xs font-medium">{opt.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <div className="mb-2.5 text-xs font-medium text-slate-500">
                  2. Öncelikli ihtiyacınız nedir?
                </div>
                <div className="grid grid-cols-3 gap-2.5">
                  {NEED_OPTIONS.map((opt) => {
                    const active = need === opt.key
                    return (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => setNeed(opt.key)}
                        className={`flex flex-col items-center gap-2 rounded-2xl border p-3.5 text-center transition-all cursor-pointer ${
                          active
                            ? 'border-sky-500 bg-sky-50/80 text-sky-900 shadow-2xs'
                            : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-zinc-950'
                        }`}
                      >
                        <HugeiconsIcon
                          icon={opt.icon}
                          size={20}
                          strokeWidth={1.8}
                          className={active ? 'text-sky-600' : 'text-slate-400'}
                        />
                        <span className="text-xs font-medium">{opt.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5">
              <span className="text-xs text-slate-400">
                Ücretsiz su sertliği &amp; TDS analizi dahil
              </span>
              {result.matched && (
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/urunler/${result.matched.slug}`}>
                    <span>Ürünü İncele</span>
                    <HugeiconsIcon icon={ArrowRight01Icon} size={15} strokeWidth={2} />
                  </Link>
                </Button>
              )}
            </div>
          </div>

          {/* Animated Recommendation Right with Subtle Ocean Glow */}
          <div className="relative flex flex-col justify-between gap-6 overflow-hidden bg-slate-950 p-6 text-white sm:p-9 lg:col-span-6">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-sky-500/20 blur-3xl"
            />

            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={result.key}
                initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/25 bg-sky-500/15 px-3 py-1 font-mono text-[11px] font-medium text-sky-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                  <span>Önerilen Sistem</span>
                </span>
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  {result.matched?.title || 'Evsel 5 Aşamalı Kapalı Kasa RO Sistemi'}
                </h3>
                <p className="mt-1.5 text-sm text-sky-200/80">{result.subtitle}</p>
                <p className="mt-4 text-sm leading-relaxed text-slate-300">{result.detail}</p>
              </motion.div>
            </AnimatePresence>

            <div className="relative flex flex-wrap items-center gap-2.5">
              <Button variant="ocean" size="md" asChild>
                <a href={waHref} target="_blank" rel="noopener noreferrer">
                  <HugeiconsIcon icon={WhatsappIcon} size={16} strokeWidth={2} />
                  <span>WhatsApp Teklif İste</span>
                  <HugeiconsIcon icon={ArrowUpRight01Icon} size={15} strokeWidth={2} />
                </a>
              </Button>
              <Link
                href="/iletisim"
                className="inline-flex h-10 items-center rounded-full border border-white/15 bg-white/5 px-5 text-sm font-medium text-slate-200 transition-colors hover:bg-white/10 hover:text-white"
              >
                Keşif Formu
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
