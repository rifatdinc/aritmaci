'use client'

import { SpotlightCard } from '@/components/motion/Primitives'
import {
  buildWhatsappUrl,
  CATEGORY_LABELS,
  getMediaUrl,
  type ProductDoc,
} from '@/lib/types'
import {
  ArrowUpRight01Icon,
  WhatsappIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import React, { useMemo, useState } from 'react'

type FilterKey = 'all' | ProductDoc['category']

const FILTER_OPTIONS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'Tümü' },
  { key: 'evsel', label: 'Evsel' },
  { key: 'kurumsal', label: 'Kurumsal & Kafe' },
  { key: 'yumusatma', label: 'Su Yumuşatma' },
  { key: 'filtre', label: 'Filtre & Bakım' },
]

const FALLBACK_IMAGE_BY_CAT: Record<ProductDoc['category'], string> = {
  evsel: '/images/evsel-ro.jpg',
  kurumsal: '/images/kurumsal-ro.jpg',
  yumusatma: '/images/yumusatma.jpg',
  filtre: '/images/filtre-seti.jpg',
}

export function ProductCatalog({
  products,
  whatsappNumber = '905365547180',
  showFilters = true,
}: {
  products: ProductDoc[]
  whatsappNumber?: string
  showFilters?: boolean
}) {
  const [selected, setSelected] = useState<FilterKey>('all')

  const filtered = useMemo(() => {
    if (selected === 'all') return products
    return products.filter((p) => p.category === selected)
  }, [products, selected])

  return (
    <div>
      {showFilters && (
        <div
          className="mb-10 inline-flex flex-wrap items-center gap-1 rounded-full border border-slate-200/80 bg-slate-100/80 p-1"
          role="tablist"
          aria-label="Ürün kategorileri"
        >
          {FILTER_OPTIONS.map((opt) => {
            const isActive = selected === opt.key
            return (
              <button
                key={opt.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelected(opt.key)}
                className={`relative rounded-full px-4 py-1.5 text-[13.5px] font-medium transition-colors cursor-pointer ${
                  isActive ? 'text-white' : 'text-slate-600 hover:text-zinc-950'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="product-category-pill"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-sky-600 shadow-xs"
                  />
                )}
                <span className="relative z-10">{opt.label}</span>
              </button>
            )
          })}
        </div>
      )}

      <motion.div layout className="grid grid-cols-1 gap-7 sm:grid-cols-2">
        <AnimatePresence initial={false} mode="popLayout">
          {filtered.map((product, idx) => {
            const imgUrl = getMediaUrl(product.image, FALLBACK_IMAGE_BY_CAT[product.category])
            const waHref = buildWhatsappUrl(
              whatsappNumber,
              `Merhaba, "${product.title}" ürünü hakkında fiyat ve ücretsiz keşif bilgisi almak istiyorum.`,
            )

            return (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.36, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <SpotlightCard className="p-3.5">
                  <Link
                    href={`/urunler/${product.slug}`}
                    className="relative block aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100"
                  >
                    <img
                      src={imgUrl}
                      alt={product.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    />
                    <span className="absolute right-3.5 top-3.5 flex h-9 w-9 items-center justify-center rounded-full bg-white/92 text-zinc-950 shadow-xs backdrop-blur-sm transition-all duration-200 group-hover:scale-105 group-hover:bg-sky-600 group-hover:text-white">
                      <HugeiconsIcon icon={ArrowUpRight01Icon} size={16} strokeWidth={2} />
                    </span>
                  </Link>

                  <div className="px-1.5 pb-1.5 pt-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <Link href={`/urunler/${product.slug}`}>
                          <h3 className="text-[16.5px] font-semibold tracking-tight text-zinc-950 transition-colors group-hover:text-sky-700">
                            {product.title}
                          </h3>
                        </Link>
                        <p className="mt-0.5 text-sm text-slate-500">
                          {product.stages || CATEGORY_LABELS[product.category]}
                        </p>
                      </div>
                      {product.capacity && (
                        <span className="shrink-0 rounded-full bg-sky-50 px-2.5 py-1 font-mono text-xs font-medium text-sky-700">
                          {product.capacity}
                        </span>
                      )}
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-3.5">
                      <span className="text-xs text-slate-400">
                        {product.warranty || '2 Yıl Tam Garanti'}
                      </span>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/urunler/${product.slug}`}
                          className="text-xs font-medium text-slate-600 transition-colors hover:text-zinc-950"
                        >
                          İncele
                        </Link>
                        <span className="text-slate-300">·</span>
                        <a
                          href={waHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 transition-colors hover:text-emerald-700"
                        >
                          <HugeiconsIcon icon={WhatsappIcon} size={14} strokeWidth={2} />
                          <span>Teklif Al</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
