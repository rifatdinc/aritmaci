'use client'

import { Tabs, TabsContent } from '@/components/ui/tabs'
import { FluidFilterTabsList } from '@/components/FluidFilterTabsList'
import {
  buildWhatsappUrl,
  CATEGORY_LABELS,
  getMediaUrl,
  PRODUCT_IMAGES,
  type ProductDoc,
} from '@/lib/types'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowUpRight01Icon, WhatsappIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const filters = [
  { value: 'all', label: 'Tümü' },
  ...Object.entries(CATEGORY_LABELS).map(([value, label]) => ({ value, label })),
]

function ProductCards({
  products,
  whatsappNumber,
}: {
  products: ProductDoc[]
  whatsappNumber: string
}) {
  if (!products.length) return <p className="empty-state">Bu kategoride henüz ürün yok.</p>

  return (
    <div className="product-grid">
      {products.map((product) => {
        const waHref = buildWhatsappUrl(
          whatsappNumber,
          `Merhaba, "${product.title}" için fiyat ve keşif bilgisi almak istiyorum.`,
        )
        const media = typeof product.image === 'object' ? product.image : null

        return (
          <Card key={product.id} className="group/product product-card h-full gap-0 py-0">
            <Link href={`/urunler/${product.slug}`} className="product-link">
              <div className="product-photo">
                <Image
                  src={getMediaUrl(media, PRODUCT_IMAGES[product.category])}
                  alt=""
                  fill
                  sizes="(min-width: 1300px) 300px, (min-width: 1080px) 24vw, (min-width: 540px) 46vw, calc(100vw - 36px)"
                  className="object-cover"
                />
                <span className="product-arrow">
                  <HugeiconsIcon icon={ArrowUpRight01Icon} size={19} aria-hidden="true" />
                </span>
              </div>
              <CardContent className="product-copy">
                <Badge variant="secondary">{CATEGORY_LABELS[product.category]}</Badge>
                <h3>{product.title}</h3>
              </CardContent>
            </Link>
            <CardFooter className="product-meta">
              <span>{product.capacity || product.stages || product.warranty}</span>
              <Button variant="ghost" size="sm" asChild>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${product.title} için teklif al`}
                >
                  <HugeiconsIcon icon={WhatsappIcon} size={17} aria-hidden="true" /> Teklif al
                </a>
              </Button>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}

export function ProductCatalog({
  products,
  whatsappNumber,
  showFilters = true,
}: {
  products: ProductDoc[]
  whatsappNumber: string
  showFilters?: boolean
}) {
  const [value, setValue] = useState('all')
  if (!showFilters || !products.length)
    return <ProductCards products={products} whatsappNumber={whatsappNumber} />

  return (
    <Tabs value={value} onValueChange={setValue} activationMode="manual" className="gap-5">
      <FluidFilterTabsList label="Ürün kategorileri" tabs={filters} value={value} />
      {filters.map(({ value }) => (
        <TabsContent key={value} value={value}>
          <ProductCards
            products={
              value === 'all' ? products : products.filter((product) => product.category === value)
            }
            whatsappNumber={whatsappNumber}
          />
        </TabsContent>
      ))}
    </Tabs>
  )
}
