import { ReferenceGrid } from '@/components/ReferenceGrid'
import { Button } from '@/components/ui/button'
import { buildWhatsappUrl, getReferences, getSiteSettings } from '@/lib/cms'
import { ArrowUpRight01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

export const metadata: Metadata = {
  title: 'Referanslar',
  description:
    'TRT yayın merkezleri, Kocaeli Büyükşehir Belediyesi birimleri, kafe, restoran ve ev tipi su arıtma kurulum referanslarımız.',
}

export const dynamic = 'force-dynamic'

export default async function ReferencesPage() {
  const [settings, references] = await Promise.all([getSiteSettings(), getReferences()])
  const waHref = buildWhatsappUrl(
    settings.whatsappNumber,
    'Merhaba, kurumsal veya evsel su arıtma kurulumu için referanslarınızı inceledim; bilgi almak istiyorum.',
  )

  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
        <div className="mb-3 flex items-center gap-2 font-mono text-xs text-zinc-400">
          <Link href="/" className="hover:text-zinc-950">
            Ana Sayfa
          </Link>
          <span>/</span>
          <span className="text-zinc-950">Referanslar</span>
        </div>

        <div className="mb-12 max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-[-0.03em] text-zinc-950 sm:text-4xl">
            Referanslar &amp; Tamamlanan Kurulumlar
          </h1>
          <p className="mt-3 text-[15.5px] leading-relaxed text-zinc-500">
            İstanbul ve Kocaeli genelinde kamu kurumları, belediye birimleri, kafe-restoranlar ve
            binlerce hanede güvenle çalışan sistemlerimiz.
          </p>
        </div>

        <ReferenceGrid references={references} showFilters />

        <div className="mt-16 flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-zinc-200 bg-zinc-50 p-8 sm:p-10">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-zinc-950 sm:text-2xl">
              İşletmeniz veya eviniz için ücretsiz keşif planlayalım
            </h2>
            <p className="mt-1.5 text-sm text-zinc-500">
              Şebeke suyunuzu yerinde analiz edip en doğru kapasitede sistem önerelim.
            </p>
          </div>
          <Button variant="primary" size="md" asChild>
            <a href={waHref} target="_blank" rel="noopener noreferrer">
              <span>WhatsApp ile İletişime Geç</span>
              <HugeiconsIcon icon={ArrowUpRight01Icon} size={15} strokeWidth={1.8} />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
