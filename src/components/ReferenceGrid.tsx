'use client'

import { SpotlightCard } from '@/components/motion/Primitives'
import { getMediaUrl, SECTOR_LABELS, type ReferenceDoc } from '@/lib/types'
import { Building03Icon, Home09Icon, Location01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { motion } from 'motion/react'
import React, { useMemo, useState } from 'react'

type SectorFilter = 'all' | ReferenceDoc['sector']

const SECTOR_TABS: { key: SectorFilter; label: string }[] = [
  { key: 'all', label: 'Tümü' },
  { key: 'kamu-medya', label: 'Kamu & Medya' },
  { key: 'belediye', label: 'Belediye' },
  { key: 'kafe-restoran', label: 'Kafe & Restoran' },
  { key: 'evsel-montaj', label: 'Evsel Montaj' },
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
          className="mb-10 inline-flex flex-wrap items-center gap-1 rounded-full border border-slate-200/80 bg-slate-100/80 p-1"
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
                className={`relative inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[13.5px] font-medium transition-colors cursor-pointer ${
                  isActive ? 'text-white' : 'text-slate-600 hover:text-zinc-950'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="reference-sector-pill"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-sky-600 shadow-xs"
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
                <span
                  className={`relative z-10 font-mono text-[11px] ${
                    isActive ? 'text-sky-100' : 'text-slate-400'
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
        <div className="mb-10 grid grid-cols-1 gap-7 sm:grid-cols-2">
          {photoRefs.map((ref) => (
            <SpotlightCard key={ref.id} className="p-3.5">
              <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-slate-100">
                <img
                  src={getMediaUrl(ref.image)}
                  alt={ref.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="px-1.5 pb-1 pt-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-[15.5px] font-semibold text-zinc-950">{ref.name}</h3>
                  <p className="mt-0.5 text-sm text-slate-500">{ref.service}</p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-sky-50 px-2.5 py-0.5 font-mono text-[11.5px] text-sky-700">
                  <HugeiconsIcon icon={Location01Icon} size={12} strokeWidth={2} />
                  <span>{ref.city}</span>
                </span>
              </div>
            </SpotlightCard>
          ))}
        </div>
      )}

      {textRefs.length > 0 && (
        <div className="divide-y divide-slate-200/80 overflow-hidden rounded-2xl border border-slate-200/80 bg-white">
          {textRefs.map((ref) => (
            <div
              key={ref.id}
              className="grid grid-cols-1 gap-1.5 px-5 py-4 transition-colors hover:bg-sky-50/45 sm:grid-cols-12 sm:items-center sm:gap-4"
            >
              <div className="flex items-center gap-2.5 text-[15px] font-medium text-zinc-950 sm:col-span-5">
                <HugeiconsIcon
                  icon={ref.sector === 'evsel-montaj' ? Home09Icon : Building03Icon}
                  size={16}
                  strokeWidth={1.8}
                  className="shrink-0 text-sky-600"
                />
                <span>{ref.name}</span>
              </div>
              <div className="text-sm text-slate-500 sm:col-span-4">{ref.service}</div>
              <div className="sm:col-span-2">
                <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-0.5 text-[11.5px] font-medium text-slate-600">
                  {SECTOR_LABELS[ref.sector]}
                </span>
              </div>
              <div className="font-mono text-xs text-slate-500 sm:col-span-1 sm:text-right">
                {ref.city.split('/')[0].trim()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
