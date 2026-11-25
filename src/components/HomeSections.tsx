import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { getMediaUrl, SECTOR_LABELS, type ProductDoc, type ReferenceDoc } from '@/lib/types'
import {
  ArrowRight01Icon,
  ArrowUpRight01Icon,
  Building03Icon,
  DashboardSpeed01Icon,
  FilterIcon,
  Home01Icon,
  Location01Icon,
  Settings02Icon,
  ShieldCheckIcon,
  WaterEnergyIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Image from 'next/image'
import Link from 'next/link'

const scenarios = [
  {
    category: 'evsel',
    title: 'Ev ve mutfak',
    detail: 'İçme suyu, çay ve yemek için tezgâh altına yerleşen ters osmoz sistemleri.',
    icon: Home01Icon,
  },
  {
    category: 'kurumsal',
    title: 'İşletme ve profesyonel mutfak',
    detail:
      'Kahve makineleri, yemekhaneler ve yoğun tüketim alanları için yüksek kapasiteli sistemler.',
    icon: Building03Icon,
  },
  {
    category: 'yumusatma',
    title: 'Bina ve tesisat',
    detail: 'Binanın su girişinde sertliği azaltmaya yönelik reçineli su yumuşatma sistemleri.',
    icon: WaterEnergyIcon,
  },
] as const

export function UsageScenarios({ products }: { products: ProductDoc[] }) {
  return (
    <section id="kullanim-alanlari" className="page-section" aria-labelledby="scenarios-heading">
      <div className="shell">
        <div className="centered-heading">
          <h2 id="scenarios-heading">Suyu nerede kullanıyorsunuz?</h2>
          <p>Su tüketiminize ve tesisatınıza uygun sistemi keşfedin.</p>
        </div>
        <div className="scenario-grid">
          {scenarios.map(({ category, title, detail, icon }) => {
            const product = products.find((item) => item.category === category)
            return (
              <Card key={category} className="scenario-card gap-5">
                <CardContent>
                  <HugeiconsIcon
                    icon={icon}
                    size={27}
                    strokeWidth={1.6}
                    className="scenario-icon"
                    aria-hidden="true"
                  />
                  <h3>{title}</h3>
                  <p>{detail}</p>
                </CardContent>
                <CardFooter>
                  <Link
                    href={product ? `/urunler/${product.slug}` : '#urunler'}
                    className="text-link"
                    aria-label={`${title} için sistemi incele`}
                  >
                    Sistemi incele{' '}
                    <HugeiconsIcon icon={ArrowRight01Icon} size={16} aria-hidden="true" />
                  </Link>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function InstallationGallery({ references }: { references: ReferenceDoc[] }) {
  const photos = references
    .flatMap((reference) => {
      const media = reference.image
      if (!media || typeof media !== 'object' || !media.url) return []
      return [
        {
          key: reference.id,
          src: getMediaUrl(media),
          alt: media.alt || reference.name,
          title: reference.name,
          detail: reference.service,
          city: reference.city,
          sector: SECTOR_LABELS[reference.sector],
        },
      ]
    })
    .slice(0, 2)

  const gallery =
    photos.length > 0
      ? photos
      : [
          {
            key: 'installation',
            src: '/images/montaj-tezgah-alti.jpg',
            alt: 'Evye altına monte edilmiş kapalı kasa su arıtma cihazı',
            title: 'Evye altı kapalı kasa montajı',
            detail: 'Tezgâh altı su arıtma sistemi',
            city: '',
            sector: 'Evsel montaj',
          },
        ]

  return (
    <section
      id="montaj-galerisi"
      className="page-section installation-gallery"
      aria-labelledby="gallery-heading"
    >
      <div className="shell">
        <div className="section-heading">
          <div>
            <h2 id="gallery-heading">Kurulumdan kareler</h2>
            <p>Mutfak dolabından bina girişine, sistemlerin nasıl yerleştiğini görün.</p>
          </div>
          <Button variant="explore" asChild>
            <Link href="/referanslar">
              Kurulumları gör{' '}
              <HugeiconsIcon icon={ArrowUpRight01Icon} size={17} aria-hidden="true" />
            </Link>
          </Button>
        </div>
        <div className="installation-gallery-grid" data-pair={gallery.length > 1}>
          {gallery.map(({ key, src, alt, title, detail, city, sector }) => (
            <figure key={key} className="installation-frame">
              <div className="installation-frame-image">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="(min-width: 1250px) 680px, (min-width: 760px) 58vw, calc(100vw - 32px)"
                  className="object-cover"
                />
              </div>
              <figcaption>
                <Badge variant="outline">{sector}</Badge>
                <h3>{title}</h3>
                <p>{detail}</p>
                {city && (
                  <span className="installation-location">
                    <HugeiconsIcon icon={Location01Icon} size={16} aria-hidden="true" /> {city}
                  </span>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

const comparisonColumns = [
  { label: 'Sistem', icon: Settings02Icon },
  { label: 'Kapasite / kullanım', icon: DashboardSpeed01Icon },
  { label: 'Filtre yapısı', icon: FilterIcon },
  { label: 'Garanti / destek', icon: ShieldCheckIcon },
] as const

export function ProductComparison({ products }: { products: ProductDoc[] }) {
  if (products.length < 2) return null

  return (
    <section
      id="karsilastirma"
      className="page-section comparison-section"
      aria-labelledby="comparison-heading"
    >
      <div className="shell">
        <div className="section-heading">
          <div>
            <h2 id="comparison-heading">Sistemleri karşılaştırın</h2>
            <p>Kapasiteyi, filtre yapısını ve garanti kapsamını yan yana görün.</p>
          </div>
          <Button variant="explore" asChild>
            <Link href="#cihaz-secimi">
              Cihaz seçim rehberi{' '}
              <HugeiconsIcon icon={ArrowUpRight01Icon} size={17} aria-hidden="true" />
            </Link>
          </Button>
        </div>
        <p className="comparison-scroll-hint">Diğer sütunlar için tabloyu yana kaydırın.</p>
        <div
          className="comparison-wrapper"
          role="region"
          tabIndex={0}
          aria-labelledby="comparison-caption"
        >
          <table className="comparison-table">
            <caption id="comparison-caption" className="sr-only">
              Arıtman ürünlerinin karşılaştırması
            </caption>
            <thead>
              <tr>
                {comparisonColumns.map(({ label, icon }) => (
                  <th key={label} scope="col">
                    <span className="comparison-column-label">
                      <HugeiconsIcon icon={icon} size={17} strokeWidth={1.7} aria-hidden="true" />
                      {label}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <th scope="row">
                    <Link href={`/urunler/${product.slug}`}>{product.title}</Link>
                  </th>
                  <td>{product.capacity || '—'}</td>
                  <td>{product.stages || '—'}</td>
                  <td>{product.warranty || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
