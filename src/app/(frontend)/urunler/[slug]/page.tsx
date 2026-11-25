import { QuoteForm } from '@/components/QuoteForm'
import { Button } from '@/components/ui/button'
import {
  buildWhatsappUrl,
  CATEGORY_LABELS,
  getMediaUrl,
  getProductBySlug,
  getSiteSettings,
} from '@/lib/cms'
import {
  ArrowLeft01Icon,
  ArrowUpRight01Icon,
  Call02Icon,
  Tick02Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return { title: 'Ürün Bulunamadı' }
  return {
    title: product.title,
    description: product.summary,
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [product, settings] = await Promise.all([getProductBySlug(slug), getSiteSettings()])

  if (!product) notFound()

  const fallbackImg =
    product.category === 'kurumsal'
      ? '/images/kurumsal-ro.jpg'
      : product.category === 'yumusatma'
        ? '/images/yumusatma.jpg'
        : product.category === 'filtre'
          ? '/images/filtre-seti.jpg'
          : '/images/evsel-ro.jpg'

  const imgUrl = getMediaUrl(product.image, fallbackImg)
  const waHref = buildWhatsappUrl(
    settings.whatsappNumber,
    `Merhaba, "${product.title}" ürünü için fiyat ve ücretsiz keşif randevusu almak istiyorum.`,
  )
  const telHref = `tel:${settings.phoneDisplay.replace(/\s+/g, '')}`

  return (
    <>
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
          <Link
            href="/urunler"
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-950"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={15} strokeWidth={1.8} />
            <span>Tüm Cihazlar</span>
          </Link>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <div className="overflow-hidden rounded-3xl bg-zinc-100">
                <img
                  src={imgUrl}
                  alt={product.title}
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6">
              <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">
                {CATEGORY_LABELS[product.category]}
              </span>
              <h1 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-zinc-950 sm:text-4xl">
                {product.title}
              </h1>
              <p className="mt-4 text-[15.5px] leading-relaxed text-zinc-500">
                {product.description || product.summary}
              </p>

              <div className="mt-8 grid grid-cols-3 gap-4 border-y border-zinc-200 py-5">
                <div>
                  <div className="text-xs text-zinc-400">Kapasite</div>
                  <div className="mt-1 font-mono text-sm font-medium text-zinc-950">
                    {product.capacity || 'İhtiyaca Özel'}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-400">Filtrasyon</div>
                  <div className="mt-1 text-sm font-medium text-zinc-950">
                    {product.stages || 'Çok Aşamalı RO'}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-400">Garanti</div>
                  <div className="mt-1 text-sm font-medium text-zinc-950">
                    {product.warranty || '2 Yıl'}
                  </div>
                </div>
              </div>

              {product.features && product.features.length > 0 && (
                <div className="mt-7">
                  <h2 className="text-sm font-medium text-zinc-950">Teknik Özellikler</h2>
                  <ul className="mt-3 space-y-2.5">
                    {product.features.map((feat, idx) => (
                      <li key={feat.id || idx} className="flex items-start gap-2.5 text-sm text-zinc-600">
                        <HugeiconsIcon
                          icon={Tick02Icon}
                          size={15}
                          strokeWidth={2}
                          className="mt-0.5 shrink-0 text-zinc-950"
                        />
                        <span>{feat.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="mt-6 text-xs text-zinc-400">
                {product.priceNote || 'Ücretsiz yerinde keşif ve montaj dahil'}
              </p>

              <div className="mt-4 flex flex-wrap gap-2.5">
                <Button variant="primary" size="lg" asChild>
                  <a href={waHref} target="_blank" rel="noopener noreferrer">
                    <span>WhatsApp&apos;tan Fiyat Al</span>
                    <HugeiconsIcon icon={ArrowUpRight01Icon} size={15} strokeWidth={1.8} />
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href={telHref}>
                    <HugeiconsIcon icon={Call02Icon} size={15} strokeWidth={1.8} />
                    <span className="font-mono">{settings.phoneDisplay}</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200/80 bg-zinc-50/70 py-16">
        <div className="mx-auto max-w-2xl px-5 sm:px-6">
          <QuoteForm whatsappNumber={settings.whatsappNumber} defaultService={product.title} />
        </div>
      </section>
    </>
  )
}
