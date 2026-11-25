import { ProductCatalog } from '@/components/ProductCatalog'
import { getProducts, getSiteSettings } from '@/lib/cms'
import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

export const metadata: Metadata = {
  title: 'Cihazlar ve Sistemler',
  description:
    'Evsel 5 aşamalı ters osmoz cihazları, kafe ve restoranlar için yüksek kapasiteli RO sistemleri, reçineli yumuşatma ve orijinal filtre bakım setleri.',
}

export const dynamic = 'force-dynamic'

export default async function ProductsPage() {
  const [products, settings] = await Promise.all([getProducts(), getSiteSettings()])

  return (
    <section className="bg-[var(--background)] py-16 sm:py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-4 flex items-center gap-2 font-mono text-xs text-[var(--muted-foreground)]">
          <Link href="/" className="transition-colors duration-150 hover:text-[var(--foreground)]">
            Ana sayfa
          </Link>
          <span>/</span>
          <span className="text-[var(--foreground)]">Cihazlar</span>
        </div>

        <div className="mb-12 max-w-2xl">
          <h1 className="text-[28px] font-medium leading-[1.15] tracking-[-0.02em] text-[var(--foreground)] sm:text-[36px]">
            Su arıtma cihazları ve sistemleri
          </h1>
          <p className="mt-3 text-base leading-7 text-[var(--text-secondary)]">
            Tüm sistemlerimiz yerinde su sertliği ve TDS ölçümü sonrasında evinizin veya
            işletmenizin ihtiyacına göre seçilir, 2 yıl tam garanti ile kurulur.
          </p>
        </div>

        <ProductCatalog products={products} whatsappNumber={settings.whatsappNumber} />
      </div>
    </section>
  )
}
