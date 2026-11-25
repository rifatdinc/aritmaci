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
  if (!product) return { title: 'Ürün bulunamadı' }
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
      <section className="bg-[var(--background)] py-12 sm:py-16">
        <div className="mx-auto max-w-[1200px] px-6">
          <Link
            href="/urunler"
            className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] transition-colors duration-150 hover:text-[var(--foreground)]"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={16} strokeWidth={1.5} />
            <span>Tüm cihazlar</span>
          </Link>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]">
                <img
                  src={imgUrl}
                  alt={product.title}
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6">
              <span className="font-mono text-xs text-[var(--muted-foreground)]">
                {CATEGORY_LABELS[product.category]}
              </span>
              <h1 className="mt-2 text-[28px] font-medium leading-[1.15] tracking-[-0.02em] text-[var(--foreground)] sm:text-[36px]">
                {product.title}
              </h1>
              <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">
                {product.description || product.summary}
              </p>

              <div className="mt-8 grid grid-cols-3 gap-4 border-y border-[var(--border)] py-5">
                <div>
                  <div className="text-xs text-[var(--muted-foreground)]">Kapasite</div>
                  <div className="mt-1 font-mono text-sm font-medium tabular-nums text-[var(--foreground)]">
                    {product.capacity || 'İhtiyaca özel'}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[var(--muted-foreground)]">Filtrasyon</div>
                  <div className="mt-1 text-sm font-medium text-[var(--foreground)]">
                    {product.stages || 'Çok aşamalı RO'}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[var(--muted-foreground)]">Garanti</div>
                  <div className="mt-1 text-sm font-medium text-[var(--foreground)]">
                    {product.warranty || '2 yıl'}
                  </div>
                </div>
              </div>

              {product.features && product.features.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-sm font-medium text-[var(--foreground)]">
                    Teknik özellikler
                  </h2>
                  <ul className="mt-3 space-y-3">
                    {product.features.map((feat, idx) => (
                      <li
                        key={feat.id || idx}
                        className="flex items-start gap-3 text-sm leading-6 text-[var(--text-secondary)]"
                      >
                        <span className="mt-1 flex w-4 shrink-0 justify-center text-[var(--primary)]">
                          <HugeiconsIcon icon={Tick02Icon} size={16} strokeWidth={1.5} />
                        </span>
                        <span>{feat.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="mt-6 text-xs text-[var(--muted-foreground)]">
                {product.priceNote || 'Ücretsiz yerinde keşif ve montaj dahil'}
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <Button variant="ocean" size="lg" asChild>
                  <a href={waHref} target="_blank" rel="noopener noreferrer">
                    <span>WhatsApp&apos;tan fiyat al</span>
                    <HugeiconsIcon icon={ArrowUpRight01Icon} size={16} strokeWidth={1.5} />
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href={telHref}>
                    <HugeiconsIcon icon={Call02Icon} size={16} strokeWidth={1.5} />
                    <span className="font-mono tabular-nums">{settings.phoneDisplay}</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--border)] bg-[var(--card)] py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-6">
          <QuoteForm whatsappNumber={settings.whatsappNumber} defaultService={product.title} />
        </div>
      </section>
    </>
  )
}
