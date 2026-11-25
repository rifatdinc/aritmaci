import { ProductCatalog } from '@/components/ProductCatalog'
import { getProducts } from '@/lib/cms'
import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

export const metadata: Metadata = {
  title: 'Cihazlar & Sistemler',
  description:
    'Evsel 5 aşamalı ters osmoz cihazları, kafe ve restoranlar için yüksek kapasiteli RO sistemleri, reçineli yumuşatma ve orijinal filtre bakım setleri.',
}

export const dynamic = 'force-dynamic'

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
        <div className="mb-3 flex items-center gap-2 font-mono text-xs text-zinc-400">
          <Link href="/" className="hover:text-zinc-950">
            Ana Sayfa
          </Link>
          <span>/</span>
          <span className="text-zinc-950">Cihazlar</span>
        </div>

        <div className="mb-12 max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-[-0.03em] text-zinc-950 sm:text-4xl">
            Su Arıtma Cihazları &amp; Sistemleri
          </h1>
          <p className="mt-3 text-[15.5px] leading-relaxed text-zinc-500">
            Tüm sistemlerimiz yerinde su sertliği ve TDS ölçümü sonrasında evinizin veya
            işletmenizin ihtiyacına göre seçilir, 2 yıl tam garanti ile kurulur.
          </p>
        </div>

        <ProductCatalog products={products} />
      </div>
    </section>
  )
}
