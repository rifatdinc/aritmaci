'use client'

import { SpotlightCard } from '@/components/motion/Primitives'
import {
  buildWhatsappUrl,
  CATEGORY_LABELS,
  getMediaUrl,
  type ProductDoc,
} from '@/lib/types'
import { ArrowUpRight01Icon, WhatsappIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { motion } from 'motion/react'
import Link from 'next/link'
import React, { useMemo, useState } from 'react'

const EASE = [0.22, 1, 0.36, 1] as const

type FilterKey = 'all' | ProductDoc['category']

const FILTER_OPTIONS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'Tümü' },
  { key: 'evsel', label: 'Evsel' },
  { key: 'kurumsal', label: 'Kurumsal ve kafe' },
  { key: 'yumusatma', label: 'Su yumuşatma' },
  { key: 'filtre', label: 'Filtre ve bakım' },
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
          className="mb-8 inline-flex flex-wrap items-center gap-1 rounded-xl border border-[var(--border)] bg-[var(--surface-raised)] p-1"
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
                className={`relative h-8 rounded-lg px-3 text-sm font-medium transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] ${
                  isActive
                    ? 'text-[var(--primary-foreground)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--foreground)]'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="product-category-pill"
                    transition={{ duration: 0.22, ease: EASE }}
                    className="absolute inset-0 rounded-lg bg-[var(--primary)]"
                  />
                )}
                <span className="relative z-10">{opt.label}</span>
              </button>
            )
          })}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {filtered.map((product) => {
          const imgUrl = getMediaUrl(product.image, FALLBACK_IMAGE_BY_CAT[product.category])
          const waHref = buildWhatsappUrl(
            whatsappNumber,
            `Merhaba, "${product.title}" ürünü hakkında fiyat ve ücretsiz keşif bilgisi almak istiyorum.`,
          )

          return (
            <SpotlightCard key={product.id} className="flex flex-col p-2">
              <Link
                href={`/urunler/${product.slug}`}
                className="relative block aspect-[4/3] overflow-hidden rounded-lg bg-[var(--surface-raised)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
              >
                <img
                  src={imgUrl}
                  alt={product.title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--card)]/95 text-[var(--foreground)] transition-colors duration-150 group-hover:border-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-[var(--primary-foreground)]">
                  <HugeiconsIcon icon={ArrowUpRight01Icon} size={16} strokeWidth={1.5} />
                </span>
              </Link>

              <div className="flex flex-1 flex-col justify-between p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <Link href={`/urunler/${product.slug}`}>
                      <h3 className="text-base font-medium leading-6 text-[var(--foreground)] transition-colors duration-150 group-hover:text-[var(--primary)]">
                        {product.title}
                      </h3>
                    </Link>
                    <p className="mt-1 text-sm text-[var(--text-secondary)]">
                      {product.stages || CATEGORY_LABELS[product.category]}
                    </p>
                  </div>
                  {product.capacity && (
                    <span className="shrink-0 font-mono text-xs tabular-nums text-[var(--primary)]">
                      {product.capacity}
                    </span>
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between gap-4 border-t border-[var(--border)] pt-4">
                  <span className="text-xs text-[var(--muted-foreground)]">
                    {product.warranty || '2 yıl tam garanti'}
                  </span>
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/urunler/${product.slug}`}
                      className="text-xs font-medium text-[var(--text-secondary)] transition-colors duration-150 hover:text-[var(--foreground)]"
                    >
                      İncele
                    </Link>
                    <span className="text-[var(--border-strong)]" aria-hidden="true">
                      /
                    </span>
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--primary)] transition-colors duration-150 hover:text-[var(--primary-hover)]"
                    >
                      <HugeiconsIcon icon={WhatsappIcon} size={16} strokeWidth={1.5} />
                      <span>Teklif al</span>
                    </a>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          )
        })}
      </div>
    </div>
  )
}
