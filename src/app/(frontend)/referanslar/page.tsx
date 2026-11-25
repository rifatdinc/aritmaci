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
    <section className="bg-[var(--background)] py-16 sm:py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-4 flex items-center gap-2 font-mono text-xs text-[var(--muted-foreground)]">
          <Link href="/" className="transition-colors duration-150 hover:text-[var(--foreground)]">
            Ana sayfa
          </Link>
          <span>/</span>
          <span className="text-[var(--foreground)]">Referanslar</span>
        </div>

        <div className="mb-12 max-w-2xl">
          <h1 className="text-[28px] font-medium leading-[1.15] tracking-[-0.02em] text-[var(--foreground)] sm:text-[36px]">
            Referanslar ve tamamlanan kurulumlar
          </h1>
          <p className="mt-3 text-base leading-7 text-[var(--text-secondary)]">
            İstanbul ve Kocaeli genelinde kamu kurumları, belediye birimleri, kafe-restoranlar ve
            binlerce hanede güvenle çalışan sistemlerimiz.
          </p>
        </div>

        <ReferenceGrid references={references} showFilters />

        <div className="mt-16 flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-[var(--border)] bg-[var(--surface-raised)] p-6 sm:p-8">
          <div>
            <h2 className="text-xl font-medium text-[var(--foreground)] sm:text-2xl">
              İşletmeniz veya eviniz için ücretsiz keşif planlayalım
            </h2>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Şebeke suyunuzu yerinde analiz edip en doğru kapasitede sistem önerelim.
            </p>
          </div>
          <Button variant="ocean" size="md" asChild>
            <a href={waHref} target="_blank" rel="noopener noreferrer">
              <span>WhatsApp ile iletişime geç</span>
              <HugeiconsIcon icon={ArrowUpRight01Icon} size={16} strokeWidth={1.5} />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
