'use client'

import { Tabs, TabsContent } from '@/components/ui/tabs'
import { FluidFilterTabsList } from '@/components/FluidFilterTabsList'
import { getMediaUrl, SECTOR_LABELS, type ReferenceDoc } from '@/lib/types'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Building03Icon, Location01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Image from 'next/image'
import { useState } from 'react'

const sectors = [
  { value: 'all', label: 'Tümü' },
  ...Object.entries(SECTOR_LABELS).map(([value, label]) => ({ value, label })),
]

const referenceLogos = [
  ['TRT Spor', 'trt-spor.png'],
  ['TRT World', 'trt-world.png'],
  ['TRT İstanbul Havalimanı', 'trt.png'],
  ['TRT Film Platoları', 'trt.png'],
  ['TRT Çocuk', 'trt-cocuk.png'],
  ['Kocaeli Büyükşehir Belediyesi', 'kocaeli-buyuksehir.webp'],
  ['Kocaeli Hızır 41', 'hizir-41.png'],
] as const

function hasPhoto(reference: ReferenceDoc) {
  return !!(reference.image && typeof reference.image === 'object' && reference.image.url)
}

function ReferenceList({ references }: { references: ReferenceDoc[] }) {
  if (!references.length) return <p className="empty-state">Bu sektörde henüz referans yok.</p>

  const photos = references.filter(hasPhoto)
  const listings = references.filter((reference) => !hasPhoto(reference))

  return (
    <div className="reference-list">
      {photos.length > 0 && (
        <div className="reference-photos">
          {photos.map((ref) => (
            <Card key={ref.id} className="reference-card gap-0 py-0">
              <div className="reference-photo">
                <Image
                  src={getMediaUrl(ref.image)}
                  alt={typeof ref.image === 'object' ? ref.image?.alt || ref.name : ref.name}
                  fill
                  sizes="(min-width: 1300px) 620px, (min-width: 660px) 47vw, calc(100vw - 36px)"
                  className="object-cover"
                />
              </div>
              <CardContent className="reference-copy">
                <Badge variant="secondary">{SECTOR_LABELS[ref.sector]}</Badge>
                <h3>{ref.name}</h3>
                <p>{ref.service}</p>
                <span className="location-line">
                  <HugeiconsIcon icon={Location01Icon} size={16} aria-hidden="true" />
                  {ref.city}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      {listings.length > 0 && (
        <ul className="reference-directory">
          {listings.map((ref) => {
            const logo = referenceLogos.find(
              ([name]) => ref.name === name || ref.name.startsWith(`${name} `),
            )?.[1]

            return (
              <li key={ref.id}>
                <span className="reference-mark" aria-hidden="true">
                  {logo ? (
                    <Image
                      src={`/images/references/${logo}`}
                      alt=""
                      width={88}
                      height={34}
                      className="reference-logo"
                      unoptimized
                    />
                  ) : (
                    <HugeiconsIcon icon={Building03Icon} size={21} strokeWidth={1.6} />
                  )}
                </span>
                <div>
                  <strong>{ref.name}</strong>
                  <p>{ref.service}</p>
                </div>
                <span className="reference-city">{ref.city}</span>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export function ReferenceGrid({
  references,
  showFilters = true,
}: {
  references: ReferenceDoc[]
  showFilters?: boolean
}) {
  const [value, setValue] = useState('all')
  if (!showFilters || !references.length) return <ReferenceList references={references} />

  const tabs = sectors.map(({ value, label }) => ({
    value,
    label: (
      <>
        {label}
        <span className="filter-count">
          {value === 'all'
            ? references.length
            : references.filter((ref) => ref.sector === value).length}
        </span>
      </>
    ),
  }))

  return (
    <Tabs value={value} onValueChange={setValue} activationMode="manual" className="gap-5">
      <FluidFilterTabsList label="Referans sektörleri" tabs={tabs} value={value} />
      {sectors.map(({ value }) => (
        <TabsContent key={value} value={value}>
          <ReferenceList
            references={
              value === 'all' ? references : references.filter((ref) => ref.sector === value)
            }
          />
        </TabsContent>
      ))}
    </Tabs>
  )
}
