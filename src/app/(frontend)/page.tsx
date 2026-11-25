import { ContactSection } from '@/components/ContactSection'
import { DeviceSelectorBar } from '@/components/DeviceSelectorBar'
import { FaqAccordion } from '@/components/FaqAccordion'
import { FilterCalculator } from '@/components/FilterCalculator'
import { FiltrationFlow } from '@/components/FiltrationFlow'
import { HeroSection } from '@/components/HeroSection'
import { InstallationGallery, ProductComparison, UsageScenarios } from '@/components/HomeSections'
import { ProductCatalog } from '@/components/ProductCatalog'
import { ReferenceGrid } from '@/components/ReferenceGrid'
import { Button } from '@/components/ui/button'
import {
  getFaqs,
  getMediaUrl,
  getProducts,
  getReferences,
  getSiteSettings,
  getTestimonials,
} from '@/lib/cms'
import { ArrowUpRight01Icon, CheckmarkCircle02Icon, StarIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Link from 'next/link'

const installationSteps = [
  {
    title: 'Yerinde su analizi',
    detail:
      'Şebeke suyunuzun sertliğini ve TDS değerini ölçer, tesisatınıza uygun kapasiteyi belirleriz.',
  },
  {
    title: 'Düzenli montaj',
    detail:
      'Musluğu bağlar, cihazı ve hortumları dolap içine yerleştiririz. Teslimden önce sızdırmazlığı kontrol ederiz.',
  },
  {
    title: 'Garanti ve bakım',
    detail:
      'Çıkış suyunu birlikte ölçer, filtre değişim aralıklarını paylaşırız. Cihazınız iki yıl garantilidir.',
  },
]

export default async function HomePage() {
  const [settings, products, references, testimonials, faqs] = await Promise.all([
    getSiteSettings(),
    getProducts(),
    getReferences(),
    getTestimonials(),
    getFaqs(),
  ])
  const homeProducts = products.slice(0, 4)
  const directory = references.filter(
    (ref) => !ref.image || typeof ref.image !== 'object' || !ref.image.url,
  )
  const featuredReferences = directory.filter((ref) => ref.featured)
  const homeReferences = (featuredReferences.length ? featuredReferences : directory).slice(0, 6)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: settings.companyName,
    telephone: settings.phoneDisplay,
    email: settings.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: settings.address,
      addressLocality: 'Gölcük',
      addressRegion: 'Kocaeli',
      addressCountry: 'TR',
    },
    areaServed: ['Kocaeli', 'Gölcük', 'Başiskele', 'İzmit', 'İstanbul'],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <HeroSection
        settings={settings}
        heroImageUrl={getMediaUrl(settings.heroImage, '/images/hero-kitchen.jpg')}
      />

      <UsageScenarios products={products} />
      <InstallationGallery references={references} />

      <section id="urunler" className="page-section" aria-labelledby="products-heading">
        <div className="shell">
          <div className="section-heading">
            <div>
              <h2 id="products-heading">Su arıtma sistemleri</h2>
              <p>İçme suyu, kireç önleme ve filtre bakımı için çözümler.</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/urunler">
                Tüm ürünler <HugeiconsIcon icon={ArrowUpRight01Icon} size={18} aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <ProductCatalog
            products={homeProducts}
            whatsappNumber={settings.whatsappNumber}
            showFilters={false}
          />
        </div>
      </section>

      <ProductComparison products={homeProducts} />

      <section id="nasil-calisir" className="page-section" aria-labelledby="process-heading">
        <div className="shell">
          <div className="centered-heading">
            <h2 id="process-heading">Keşiften montaja</h2>
            <p>İlk ölçümden filtre değişimine kadar süreç nasıl ilerliyor?</p>
          </div>
          <ol className="installation-steps">
            {installationSteps.map(({ title, detail }, index) => (
              <li key={title}>
                <span aria-hidden="true">{index + 1}</span>
                <h3>{title}</h3>
                <p>{detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {!!settings.stats?.length && (
        <section className="assurance-section" aria-labelledby="assurance-heading">
          <div className="shell assurance-layout">
            <h2 id="assurance-heading">Kurulum ve servis güvencesi</h2>
            <dl className="assurance-stats">
              {settings.stats.map(({ id, value, label }) => (
                <div key={id || label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      <div className="filtration-section">
        <div className="shell">
          <FiltrationFlow />
        </div>
      </div>

      <section
        id="cihaz-secimi"
        className="page-section chooser-section"
        aria-labelledby="chooser-heading"
      >
        <div className="shell">
          <div className="centered-heading">
            <h2 id="chooser-heading">Cihaz seçim rehberi</h2>
            <p>Kurulum yerini ve ihtiyacınızı seçip size uygun sistem önerisini görün.</p>
          </div>
          <DeviceSelectorBar products={products} whatsappNumber={settings.whatsappNumber} />
        </div>
      </section>

      <section className="page-section maintenance-section" aria-labelledby="maintenance-heading">
        <div className="shell maintenance-layout">
          <div className="maintenance-intro">
            <h2 id="maintenance-heading">Filtre bakımı ve servis</h2>
            <p>
              Cihazınızın bakım aralığını takip edin. Son filtre değişimi tarihinizle bir sonraki
              bakımı planlayabilirsiniz.
            </p>
            <Button variant="outline" asChild>
              <Link href="#iletisim">
                Bakım için bize ulaşın{' '}
                <HugeiconsIcon icon={ArrowUpRight01Icon} size={17} aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <FilterCalculator whatsappNumber={settings.whatsappNumber} />
        </div>
      </section>

      {!!homeReferences.length && (
        <section id="referanslar" className="page-section">
          <div className="shell">
            <div className="section-heading">
              <div>
                <h2>Kurumlar ve işletmeler</h2>
                <p>Kocaeli ve İstanbul’da çalıştığımız kurumlar ve işletmeler.</p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/referanslar">
                  Tüm referanslar{' '}
                  <HugeiconsIcon icon={ArrowUpRight01Icon} size={18} aria-hidden="true" />
                </Link>
              </Button>
            </div>
            <ReferenceGrid references={homeReferences} showFilters={false} />
          </div>
        </section>
      )}

      {testimonials.length > 0 && (
        <section className="reviews-section page-section">
          <div className="shell">
            <div className="section-heading">
              <h2>Müşterilerimiz ne diyor?</h2>
            </div>
            <div className="review-grid">
              {testimonials.map((review) => (
                <figure className="review-entry" key={review.id}>
                  <div
                    className="rating"
                    role="img"
                    aria-label={`5 üzerinden ${review.rating ?? 5} puan`}
                  >
                    {Array.from({ length: review.rating ?? 5 }, (_, index) => (
                      <HugeiconsIcon
                        key={index}
                        icon={StarIcon}
                        size={17}
                        fill="currentColor"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <blockquote>{review.quote}</blockquote>
                  <figcaption>
                    <strong>{review.author}</strong>
                    {review.verified && (
                      <HugeiconsIcon
                        icon={CheckmarkCircle02Icon}
                        size={16}
                        aria-label="Doğrulanmış kurulum"
                        role="img"
                      />
                    )}
                    <small>
                      {review.location} / {review.productName}
                    </small>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="hakkimizda" className="page-section about-section">
        <div className="shell about-layout">
          <div>
            <h2>{settings.aboutHeading}</h2>
            <p>{settings.aboutBody}</p>
          </div>
          {settings.founderName && (
            <aside>
              <h3>{settings.founderName}</h3>
              <p className="founder-role">{settings.founderRole}</p>
              <p>{settings.founderBio}</p>
            </aside>
          )}
        </div>
      </section>

      {faqs.length > 0 && (
        <section id="sss" className="page-section faq-section">
          <div className="shell faq-layout">
            <div>
              <h2>Sık sorulan sorular</h2>
              <Link href="/iletisim" className="text-link">
                Bize ulaşın <HugeiconsIcon icon={ArrowUpRight01Icon} size={17} aria-hidden="true" />
              </Link>
            </div>
            <FaqAccordion faqs={faqs} />
          </div>
        </section>
      )}

      <div className="home-contact">
        <ContactSection settings={settings} />
      </div>
    </>
  )
}
