'use client'

import { SpotlightCard } from '@/components/motion/Primitives'
import { getMediaUrl, SECTOR_LABELS, type ReferenceDoc } from '@/lib/types'
import { Building03Icon, Home09Icon, Location01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { motion } from 'motion/react'
import React, { useMemo, useState } from 'react'

const EASE = [0.22, 1, 0.36, 1] as const

type SectorFilter = 'all' | ReferenceDoc['sector']

const SECTOR_TABS: { key: SectorFilter; label: string }[] = [
  { key: 'all', label: 'Tümü' },
  { key: 'kamu-medya', label: 'Kamu ve medya' },
  { key: 'belediye', label: 'Belediye' },
  { key: 'kafe-restoran', label: 'Kafe ve restoran' },
  { key: 'evsel-montaj', label: 'Evsel montaj' },
]

export function ReferenceGrid({
  references,
  maxItems,
  showFilters = true,
}: {
  references: ReferenceDoc[]
  maxItems?: number
  showFilters?: boolean
}) {
  const [sector, setSector] = useState<SectorFilter>('all')

  const visible = useMemo(() => {
    const list =
      sector === 'all' ? references : references.filter((item) => item.sector === sector)
    return maxItems ? list.slice(0, maxItems) : list
  }, [references, sector, maxItems])

  const photoRefs = visible.filter((r) => r.image && typeof r.image === 'object' && r.image.url)
  const textRefs = visible.filter((r) => !(r.image && typeof r.image === 'object' && r.image.url))

  return (
    <div>
      {showFilters && (
        <div
          className="mb-8 inline-flex flex-wrap items-center gap-1 rounded-xl border border-[var(--border)] bg-[var(--surface-raised)] p-1"
          role="tablist"
          aria-label="Referans sektörleri"
        >
          {SECTOR_TABS.map((tab) => {
            const count =
              tab.key === 'all'
                ? references.length
                : references.filter((r) => r.sector === tab.key).length
            const isActive = sector === tab.key
            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSector(tab.key)}
                className={`relative inline-flex h-8 items-center gap-2 rounded-lg px-3 text-sm font-medium transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] ${
                  isActive
                    ? 'text-[var(--primary-foreground)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--foreground)]'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="reference-sector-pill"
                    transition={{ duration: 0.22, ease: EASE }}
                    className="absolute inset-0 rounded-lg bg-[var(--primary)]"
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
                <span
                  className={`relative z-10 font-mono text-xs tabular-nums ${
                    isActive
                      ? 'text-[var(--primary-foreground)]/80'
                      : 'text-[var(--muted-foreground)]'
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      )}

      {photoRefs.length > 0 && (
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {photoRefs.map((ref) => (
            <SpotlightCard key={ref.id} className="p-2">
              <div className="aspect-[16/10] overflow-hidden rounded-lg bg-[var(--surface-raised)]">
                <img
                  src={getMediaUrl(ref.image)}
                  alt={ref.name}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex items-start justify-between gap-4 p-4">
                <div>
                  <h3 className="text-base font-medium text-[var(--foreground)]">{ref.name}</h3>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">{ref.service}</p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-xs text-[var(--muted-foreground)]">
                  <HugeiconsIcon icon={Location01Icon} size={16} strokeWidth={1.5} />
                  <span>{ref.city}</span>
                </span>
              </div>
            </SpotlightCard>
          ))}
        </div>
      )}

      {textRefs.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]">
          <div className="hidden grid-cols-12 items-center gap-4 border-b border-[var(--border)] bg-[var(--background)] px-6 py-3 font-mono text-xs text-[var(--muted-foreground)] sm:grid">
            <div className="col-span-5">Kurum veya işletme</div>
            <div className="col-span-4">Uygulama</div>
            <div className="col-span-2">Sektör</div>
            <div className="col-span-1 text-right">Şehir</div>
          </div>
          <div className="divide-y divide-[var(--border)]">
            {textRefs.map((ref) => (
              <div
                key={ref.id}
                className="grid grid-cols-1 gap-2 px-6 py-4 transition-colors duration-150 hover:bg-[var(--background)]/70 sm:grid-cols-12 sm:items-center sm:gap-4"
              >
                <div className="flex items-center gap-3 text-sm font-medium text-[var(--foreground)] sm:col-span-5">
                  <span className="flex w-4 shrink-0 justify-center text-[var(--muted-foreground)]">
                    <HugeiconsIcon
                      icon={ref.sector === 'evsel-montaj' ? Home09Icon : Building03Icon}
                      size={16}
                      strokeWidth={1.5}
                    />
                  </span>
                  <span>{ref.name}</span>
                </div>
                <div className="text-sm text-[var(--text-secondary)] sm:col-span-4">
                  {ref.service}
                </div>
                <div className="text-xs text-[var(--muted-foreground)] sm:col-span-2">
                  {SECTOR_LABELS[ref.sector]}
                </div>
                <div className="font-mono text-xs text-[var(--muted-foreground)] sm:col-span-1 sm:text-right">
                  {ref.city.split('/')[0].trim()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
