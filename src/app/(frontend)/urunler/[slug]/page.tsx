import { QuoteForm } from '@/components/QuoteForm'
import { Button } from '@/components/ui/button'
import {
  buildWhatsappUrl,
  CATEGORY_LABELS,
  getMediaUrl,
  getProductBySlug,
  getSiteSettings,
  PRODUCT_IMAGES,
} from '@/lib/cms'
import { ArrowLeft01Icon, Call02Icon, Tick02Icon, WhatsappIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Badge } from '@/components/ui/badge'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductBySlug((await params).slug)
  if (!product) return { title: 'Ürün bulunamadı' }
  return { title: product.title, description: product.summary }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const [product, settings] = await Promise.all([getProductBySlug(slug), getSiteSettings()])
  if (!product) notFound()

  const media = typeof product.image === 'object' ? product.image : null
  const waHref = buildWhatsappUrl(
    settings.whatsappNumber,
    `Merhaba, "${product.title}" için fiyat ve ücretsiz keşif randevusu almak istiyorum.`,
  )
  const telHref = `tel:${settings.phoneDisplay.replace(/\s+/g, '')}`
  const specs = [
    ['Kapasite', product.capacity],
    ['Filtrasyon', product.stages],
    ['Garanti', product.warranty],
  ].filter(([, value]) => value)

  return (
    <>
      <div className="shell detail-page">
        <Link href="/urunler" className="text-link back-link">
          <HugeiconsIcon icon={ArrowLeft01Icon} size={18} aria-hidden="true" /> Tüm ürünler
        </Link>
        <div className="detail-layout">
          <div className="detail-photo">
            <Image
              src={getMediaUrl(media, PRODUCT_IMAGES[product.category])}
              alt={media?.alt || product.title}
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1300px) 605px, (min-width: 960px) 48vw, calc(100vw - 36px)"
              className="object-cover"
            />
          </div>
          <section className="detail-copy">
            <div className="detail-chips">
              <Badge variant="secondary">{CATEGORY_LABELS[product.category]}</Badge>
              {product.badge && <Badge variant="outline">{product.badge}</Badge>}
            </div>
            <h1>{product.title}</h1>
            <p>{product.description || product.summary}</p>
            {!!specs.length && (
              <dl className="detail-specs">
                {specs.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            )}
            {product.priceNote && <p className="price-note">{product.priceNote}</p>}
            <div className="action-row">
              <Button variant="default" asChild>
                <a href={waHref} target="_blank" rel="noopener noreferrer">
                  <HugeiconsIcon icon={WhatsappIcon} size={19} aria-hidden="true" />{' '}
                  WhatsApp&apos;tan fiyat al
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href={telHref}>
                  <HugeiconsIcon icon={Call02Icon} size={18} aria-hidden="true" />{' '}
                  {settings.phoneDisplay}
                </a>
              </Button>
            </div>
          </section>
        </div>
      </div>

      <section className="detail-lower">
        <div className="shell detail-layout">
          <div className="detail-features">
            <h2>{product.features?.length ? 'Teknik özellikler' : 'Kurulum ve keşif'}</h2>
            {product.features?.length ? (
              <ul>
                {product.features.map((feature) => (
                  <li key={feature.id || feature.text}>
                    <HugeiconsIcon icon={Tick02Icon} size={19} aria-hidden="true" />
                    {feature.text}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Sistem seçimi ve kurulum için keşif talebi bırakabilirsiniz.</p>
            )}
          </div>
          <QuoteForm whatsappNumber={settings.whatsappNumber} defaultService={product.title} />
        </div>
      </section>
    </>
  )
}
