'use client'

import { AnimatedStat, ReferenceMarquee } from '@/components/motion/Primitives'
import { Button } from '@/components/ui/button'
import { buildWhatsappUrl, type SiteSettingsDoc } from '@/lib/types'
import {
  ArrowRight01Icon,
  CheckmarkCircle02Icon,
  DropletIcon,
  Shield01Icon,
  WaterEnergyIcon,
  WhatsappIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'

const MARQUEE_CLIENTS = [
  'TRT Spor (Ayazağa)',
  'TRT World (Ulus)',
  'TRT Çocuk',
  'TRT Film Platoları',
  'TRT İstanbul Havalimanı',
  'Kocaeli Büyükşehir Belediyesi',
  'Hızır 41 Yemek Fabrikası',
  'Belde A.Ş.',
  'Ali Baba Cafe',
  'Helvacı Ali',
  'Değirmendere Lagoon Cafe',
  'Packet Burger',
]

export function HeroSection({
  settings,
  heroImageUrl,
}: {
  settings: SiteSettingsDoc
  heroImageUrl: string
}) {
  const imageWrapRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (!imageWrapRef.current || !imageRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { scale: 1.06, yPercent: -2.5 },
        {
          scale: 1,
          yPercent: 2.5,
          ease: 'none',
          scrollTrigger: {
            trigger: imageWrapRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        },
      )
    }, imageWrapRef)

    return () => ctx.revert()
  }, [])

  const waHref = buildWhatsappUrl(
    settings.whatsappNumber,
    'Merhaba, ev/işletmem için ücretsiz su analizi ve arıtma sistemi keşfi hakkında bilgi almak istiyorum.',
  )

  return (
    <section className="relative overflow-hidden bg-white pb-16 pt-12 sm:pb-24 sm:pt-18">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[960px] -translate-x-1/2 rounded-full bg-gradient-to-b from-sky-100/80 via-cyan-50/50 to-transparent blur-3xl"
      />

      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-6">
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="hero-reveal inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-wider text-sky-700">
              <HugeiconsIcon icon={DropletIcon} size={14} strokeWidth={2} />
              <span>Gölcük, Kocaeli &amp; İstanbul — 20 Yıllık Deneyim</span>
            </div>

            <h1 className="hero-reveal-d1 mt-4 text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-zinc-950 sm:text-5xl lg:text-[58px]">
              Eviniz ve işletmeniz için{' '}
              <span className="text-sky-600">ölçülerek kurulan</span> su arıtma.
            </h1>
          </div>

          <div className="hero-reveal-d2 lg:col-span-4 lg:pb-1">
            <p className="text-[15.5px] leading-relaxed text-slate-600">{settings.heroSubtitle}</p>
            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              <Button variant="ocean" size="md" asChild>
                <Link href="/urunler">
                  <span>Cihazları İncele</span>
                  <HugeiconsIcon icon={ArrowRight01Icon} size={16} strokeWidth={2} />
                </Link>
              </Button>
              <Button variant="outline" size="md" asChild>
                <a href={waHref} target="_blank" rel="noopener noreferrer">
                  <HugeiconsIcon
                    icon={WhatsappIcon}
                    size={16}
                    strokeWidth={2}
                    className="text-emerald-600"
                  />
                  <span>WhatsApp</span>
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="hero-reveal-d2 mt-8 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-[13.5px] font-medium text-slate-600">
          <span className="inline-flex items-center gap-2">
            <HugeiconsIcon
              icon={WaterEnergyIcon}
              size={16}
              strokeWidth={2}
              className="text-sky-600"
            />
            <span>Kurulum öncesi &amp; sonrası TDS ölçümü</span>
          </span>
          <span className="inline-flex items-center gap-2">
            <HugeiconsIcon icon={Shield01Icon} size={16} strokeWidth={2} className="text-sky-600" />
            <span>NSF &amp; TSE onaylı orijinal filtreler</span>
          </span>
          <span className="inline-flex items-center gap-2">
            <HugeiconsIcon
              icon={CheckmarkCircle02Icon}
              size={16}
              strokeWidth={2}
              className="text-emerald-600"
            />
            <span>2 yıl tam garanti &amp; 7/24 teknik destek</span>
          </span>
        </div>

        {/* Parallax Hero Kitchen Photograph with Clean Live TDS Purity Pill */}
        <div
          ref={imageWrapRef}
          className="hero-reveal-d3 relative mt-9 overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-100 shadow-[0_24px_60px_rgba(2,132,199,0.09)]"
        >
          <img
            ref={imageRef}
            src={heroImageUrl}
            alt="Modern mutfak tezgâhında paslanmaz arıtma musluğundan akan temiz içme suyu"
            className="aspect-[16/9] w-full object-cover will-change-transform sm:aspect-[21/10]"
          />

          <div className="absolute bottom-4 left-4 hidden items-center gap-3 rounded-2xl border border-white/70 bg-white/90 px-4 py-2.5 shadow-lg backdrop-blur-md sm:flex">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-600 text-white">
              <HugeiconsIcon icon={DropletIcon} size={18} strokeWidth={2} />
            </span>
            <div>
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-zinc-950">
                <span className="text-slate-400 line-through">310 ppm</span>
                <span className="text-sky-600">→ 18 ppm</span>
              </div>
              <div className="text-[11.5px] text-slate-500">
                Canlı TDS doğrulamalı montaj teslimi
              </div>
            </div>
          </div>
        </div>

        {/* GSAP Animated Count-Up Metrics */}
        <div className="mt-12 grid grid-cols-2 gap-6 border-t border-slate-200/80 pt-8 sm:grid-cols-4">
          {(settings.stats || []).map((st, idx) => (
            <AnimatedStat key={st.id || idx} value={st.value} label={st.label} />
          ))}
        </div>

        {/* 21st.dev Infinite Marquee of Flagship Clients */}
        <div className="mt-10 border-t border-slate-200/70 pt-7">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-mono text-[11px] font-medium uppercase tracking-wider text-slate-400">
              Bizi Tercih Eden Kurumlar &amp; İşletmeler
            </span>
            <Link
              href="/referanslar"
              className="inline-flex items-center gap-1 text-xs font-medium text-sky-600 hover:text-sky-700"
            >
              <span>Tüm Referanslar</span>
              <HugeiconsIcon icon={ArrowRight01Icon} size={13} strokeWidth={2} />
            </Link>
          </div>
          <ReferenceMarquee items={MARQUEE_CLIENTS} />
        </div>
      </div>
    </section>
  )
}
