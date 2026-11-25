import { DeviceSelectorBar } from '@/components/DeviceSelectorBar'
import { FaqAccordion } from '@/components/FaqAccordion'
import { FilterCalculator } from '@/components/FilterCalculator'
import { FiltrationFlow } from '@/components/FiltrationFlow'
import { HeroSection } from '@/components/HeroSection'
import { SpotlightCard } from '@/components/motion/Primitives'
import { ProductCatalog } from '@/components/ProductCatalog'
import { QuoteForm } from '@/components/QuoteForm'
import { ReferenceGrid } from '@/components/ReferenceGrid'
import { Button } from '@/components/ui/button'
import {
  buildWhatsappUrl,
  getFaqs,
  getMediaUrl,
  getProducts,
  getReferences,
  getSiteSettings,
  getTestimonials,
} from '@/lib/cms'
import {
  ArrowRight01Icon,
  Award01Icon,
  Call02Icon,
  DropletIcon,
  Location01Icon,
  RulerIcon,
  Shield01Icon,
  StarIcon,
  WaterEnergyIcon,
  WhatsappIcon,
  Wrench01Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Link from 'next/link'
import React from 'react'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const [settings, products, references, testimonials, faqs] = await Promise.all([
    getSiteSettings(),
    getProducts(),
    getReferences(),
    getTestimonials(),
    getFaqs(),
  ])

  const heroImageUrl = getMediaUrl(settings.heroImage, '/images/hero-kitchen.jpg')
  const waHref = buildWhatsappUrl(
    settings.whatsappNumber,
    'Merhaba, ev/işletmem için ücretsiz su analizi ve arıtma sistemi keşfi hakkında bilgi almak istiyorum.',
  )
  const telHref = `tel:${settings.phoneDisplay.replace(/\s+/g, '')}`

  const homeReferences = references.slice(0, 8)
  const cleanAboutHeading = (settings.aboutHeading || '').replace(/\.$/, '')

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero + Verified Stats + Client Roster */}
      <HeroSection settings={settings} heroImageUrl={heroImageUrl} />

      {/* Product Catalog */}
      <section id="urunler" className="border-t border-[var(--border)] bg-[var(--card)] py-20 sm:py-24">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs text-[var(--muted-foreground)]">
                Ürünler ve sistemler
              </span>
              <h2 className="mt-2 text-[28px] font-medium leading-[1.15] tracking-[-0.02em] text-[var(--foreground)] sm:text-[32px]">
                İhtiyaca özel arıtma çözümleri
              </h2>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/urunler">
                <span>Tüm ürünler</span>
                <HugeiconsIcon icon={ArrowRight01Icon} size={16} strokeWidth={1.5} />
              </Link>
            </Button>
          </div>

          <ProductCatalog products={products} whatsappNumber={settings.whatsappNumber} />
        </div>
      </section>

      {/* Interactive 5-Stage Filtration Instrument */}
      <FiltrationFlow />

      {/* Interactive Device Selector */}
      <DeviceSelectorBar products={products} whatsappNumber={settings.whatsappNumber} />

      {/* 3-Step Installation Craftsmanship + Under-Sink Photo */}
      <section className="border-t border-[var(--border)] bg-[var(--background)] py-20 sm:py-24">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]">
              <img
                src="/images/montaj-tezgah-alti.jpg"
                alt="Mutfak evye altı dolap içine temiz ve düzenli su arıtma cihazı montajı"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="flex items-center justify-between border-t border-[var(--border)] px-6 py-4 text-xs">
                <span className="text-[var(--text-secondary)]">
                  Evye altı kapalı kasa gizli yerleşim
                </span>
                <span className="font-mono tabular-nums text-[var(--primary)]">
                  1–2 saat montaj
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <span className="font-mono text-xs text-[var(--muted-foreground)]">
              Kurulum süreci
            </span>
            <h2 className="mt-2 text-[28px] font-medium leading-[1.15] tracking-[-0.02em] text-[var(--foreground)] sm:text-[32px]">
              Ölçerek seçiyor, iz bırakmadan kuruyoruz
            </h2>

            <div className="mt-8 divide-y divide-[var(--border)] border-y border-[var(--border)]">
              {[
                {
                  num: '01',
                  icon: WaterEnergyIcon,
                  title: 'Yerinde TDS ve sertlik ölçümü',
                  desc: 'Şebeke suyunuz analiz edilir; mutfak dolabı veya tesisat alanına göre en doğru kapasite belirlenir.',
                },
                {
                  num: '02',
                  icon: RulerIcon,
                  title: 'Temiz ve iz bırakmayan montaj',
                  desc: 'Tezgâh çizilmeden paslanmaz musluk bağlantısı açılır, hortumlar ve vana dolap içine düzenli gizlenir.',
                },
                {
                  num: '03',
                  icon: Shield01Icon,
                  title: '2 yıl garanti ve periyodik takip',
                  desc: 'Teslim anında çıkış suyu TDS değeri birlikte doğrulanır, filtre değişim zamanı geldiğinde düzenli bakım yapılır.',
                },
              ].map((step) => (
                <div key={step.num} className="flex items-start gap-4 py-5">
                  <span className="mt-0.5 flex w-6 shrink-0 items-center justify-center font-mono text-xs tabular-nums text-[var(--primary)]">
                    {step.num}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <HugeiconsIcon
                        icon={step.icon}
                        size={16}
                        strokeWidth={1.5}
                        className="shrink-0 text-[var(--muted-foreground)]"
                      />
                      <h3 className="text-base font-medium text-[var(--foreground)]">
                        {step.title}
                      </h3>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filter Maintenance Calculator */}
      <section id="filtre-bakim" className="border-t border-[var(--border)] bg-[var(--card)] py-20 sm:py-24">
        <div className="mx-auto max-w-[1200px] px-6">
          <FilterCalculator whatsappNumber={settings.whatsappNumber} />
        </div>
      </section>

      {/* References Directory */}
      <section id="referanslar" className="border-t border-[var(--border)] bg-[var(--background)] py-20 sm:py-24">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs text-[var(--muted-foreground)]">Referanslar</span>
              <h2 className="mt-2 text-[28px] font-medium leading-[1.15] tracking-[-0.02em] text-[var(--foreground)] sm:text-[32px]">
                Seçili kurumsal ve evsel kurulumlar
              </h2>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/referanslar">
                <span className="tabular-nums">Tüm {references.length} referans</span>
                <HugeiconsIcon icon={ArrowRight01Icon} size={16} strokeWidth={1.5} />
              </Link>
            </Button>
          </div>

          <ReferenceGrid references={homeReferences} showFilters={false} />
        </div>
      </section>

      {/* Customer Reviews */}
      {testimonials.length > 0 && (
        <section className="border-t border-[var(--border)] bg-[var(--card)] py-20 sm:py-24">
          <div className="mx-auto max-w-[1200px] px-6">
            <span className="font-mono text-xs text-[var(--muted-foreground)]">
              Müşteri deneyimleri
            </span>
            <h2 className="mt-2 text-[28px] font-medium leading-[1.15] tracking-[-0.02em] text-[var(--foreground)] sm:text-[32px]">
              Kurulum sonrası geri bildirimler
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              {testimonials.map((t) => (
                <SpotlightCard key={t.id} className="flex h-full flex-col bg-[var(--background)] p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div
                      className="flex items-center gap-1 text-[var(--foreground)]"
                      aria-label={`${t.rating || 5} üzerinden 5 puan`}
                    >
                      {Array.from({ length: t.rating || 5 }).map((_, i) => (
                        <HugeiconsIcon
                          key={i}
                          icon={StarIcon}
                          size={16}
                          fill="currentColor"
                          strokeWidth={1.5}
                        />
                      ))}
                    </div>
                    {t.verified && (
                      <span className="font-mono text-xs text-[var(--muted-foreground)]">
                        Doğrulanmış kurulum
                      </span>
                    )}
                  </div>
                  <p className="flex-1 text-sm leading-6 text-[var(--text-secondary)]">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-6 border-t border-[var(--border)] pt-4">
                    <div className="text-sm font-medium text-[var(--foreground)]">{t.author}</div>
                    <div className="mt-1 text-xs text-[var(--muted-foreground)]">
                      {t.location} · {t.productName}
                    </div>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About & Founder Murat Bayram */}
      <section id="hakkimizda" className="border-t border-[var(--border)] bg-[var(--background)] py-20 sm:py-24">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 px-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="font-mono text-xs text-[var(--muted-foreground)]">Hakkımızda</span>
            <h2 className="mt-2 text-[28px] font-medium leading-[1.15] tracking-[-0.02em] text-[var(--foreground)] sm:text-[32px]">
              {cleanAboutHeading}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--text-secondary)]">
              {settings.aboutBody}
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                {
                  icon: Shield01Icon,
                  title: 'TSE ve NSF onaylı',
                  desc: 'Sertifikalı membran, karbon ve sediment filtre grupları.',
                },
                {
                  icon: DropletIcon,
                  title: 'TDS ve sertlik analizi',
                  desc: 'Her kurulum öncesi ve sonrası canlı ölçüm kontrolü.',
                },
                {
                  icon: Award01Icon,
                  title: 'ISO kalite disiplini',
                  desc: 'Basınç regülatörü ve tam sızdırmazlık testi ile teslim.',
                },
                {
                  icon: Wrench01Icon,
                  title: '7/24 teknik destek',
                  desc: '2 yıl tam garanti ve düzenli filtre bakım takibi.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-3 rounded-xl border border-[var(--border)] bg-[var(--card)] p-5"
                >
                  <span className="mt-0.5 flex w-5 shrink-0 justify-center text-[var(--muted-foreground)]">
                    <HugeiconsIcon icon={item.icon} size={16} strokeWidth={1.5} />
                  </span>
                  <div>
                    <h4 className="text-sm font-medium text-[var(--foreground)]">{item.title}</h4>
                    <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <aside className="flex h-full flex-col justify-between rounded-2xl border border-[var(--dark-border)] bg-[var(--surface-dark)] p-6 text-[var(--dark-foreground)] sm:p-8">
              <div>
                <span className="font-mono text-xs text-[var(--dark-muted)]">
                  Kurucu ve yönetim
                </span>
                <h3 className="mt-3 text-2xl font-medium text-[var(--dark-foreground)]">
                  {settings.founderName || 'Murat Bayram'}
                </h3>
                <p className="mt-1 text-sm text-[var(--dark-secondary)]">
                  {settings.founderRole || 'Kurucu ve Genel Müdür'}
                </p>
                <p className="mt-6 text-sm leading-6 text-[var(--dark-secondary)]">
                  {settings.founderBio}
                </p>
              </div>

              <div className="mt-8 border-t border-[var(--dark-border)] pt-6">
                <div className="text-xs text-[var(--dark-muted)]">
                  Doğrudan iletişim ve keşif hattı
                </div>
                <a
                  href={telHref}
                  className="mt-2 inline-flex items-center gap-2 font-mono text-lg font-medium tabular-nums text-[var(--dark-foreground)] transition-colors duration-150 hover:text-white"
                >
                  <HugeiconsIcon icon={Call02Icon} size={16} strokeWidth={1.5} />
                  <span>{settings.phoneDisplay}</span>
                </a>
                <p className="mt-1 text-xs text-[var(--dark-muted)]">{settings.workingHours}</p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Hairline FAQ */}
      {faqs.length > 0 && (
        <section id="sss" className="border-t border-[var(--border)] bg-[var(--card)] py-20 sm:py-24">
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-6 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="font-mono text-xs text-[var(--muted-foreground)]">Sorular</span>
              <h2 className="mt-2 text-[28px] font-medium leading-[1.15] tracking-[-0.02em] text-[var(--foreground)] sm:text-[32px]">
                Sık sorulan sorular
              </h2>
              <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                Ters osmoz, filtre değişim süresi, kurulum ve garanti hakkında merak edilenler.
              </p>
            </div>
            <div className="lg:col-span-8">
              <FaqAccordion faqs={faqs} />
            </div>
          </div>
        </section>
      )}

      {/* Contact & Discovery */}
      <section id="iletisim" className="border-t border-[var(--border)] bg-[var(--background)] py-20 sm:py-24">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="mb-10 max-w-xl">
            <span className="font-mono text-xs text-[var(--muted-foreground)]">İletişim</span>
            <h2 className="mt-2 text-[28px] font-medium leading-[1.15] tracking-[-0.02em] text-[var(--foreground)] sm:text-[32px]">
              Ücretsiz keşif ve teklif alın
            </h2>
            <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
              Telefon, WhatsApp veya form üzerinden ulaşın; aynı gün içinde dönüş yapalım.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-5">
              <div className="divide-y divide-[var(--border)] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]">
                <a
                  href={telHref}
                  className="flex items-start gap-3 p-5 transition-colors duration-150 hover:bg-[var(--background)]/70"
                >
                  <span className="mt-0.5 flex w-5 shrink-0 justify-center text-[var(--muted-foreground)]">
                    <HugeiconsIcon icon={Call02Icon} size={16} strokeWidth={1.5} />
                  </span>
                  <div>
                    <div className="text-xs text-[var(--muted-foreground)]">Telefon</div>
                    <div className="mt-1 font-mono text-base font-medium tabular-nums text-[var(--foreground)]">
                      {settings.phoneDisplay}
                    </div>
                    <div className="mt-0.5 text-xs text-[var(--text-secondary)]">
                      {settings.workingHours}
                    </div>
                  </div>
                </a>

                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-5 transition-colors duration-150 hover:bg-[var(--background)]/70"
                >
                  <span className="mt-0.5 flex w-5 shrink-0 justify-center text-[var(--muted-foreground)]">
                    <HugeiconsIcon icon={WhatsappIcon} size={16} strokeWidth={1.5} />
                  </span>
                  <div>
                    <div className="text-xs text-[var(--muted-foreground)]">WhatsApp</div>
                    <div className="mt-1 text-base font-medium text-[var(--foreground)]">
                      Hemen mesaj gönderin
                    </div>
                    <div className="mt-0.5 text-xs text-[var(--text-secondary)]">
                      Aynı gün dönüş ve hızlı fiyatlandırma
                    </div>
                  </div>
                </a>

                <div className="flex items-start gap-3 p-5">
                  <span className="mt-0.5 flex w-5 shrink-0 justify-center text-[var(--muted-foreground)]">
                    <HugeiconsIcon icon={Location01Icon} size={16} strokeWidth={1.5} />
                  </span>
                  <div>
                    <div className="text-xs text-[var(--muted-foreground)]">Adres</div>
                    <div className="mt-1 text-base font-medium text-[var(--foreground)]">
                      Gölcük / Kocaeli
                    </div>
                    <div className="mt-0.5 text-xs leading-5 text-[var(--text-secondary)]">
                      {settings.address}
                    </div>
                  </div>
                </div>
              </div>

              <iframe
                title="Aritman Su Arıtma Sistemleri Konum"
                className="h-56 w-full rounded-2xl border border-[var(--border)] bg-[var(--card)]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  settings.mapsQuery || 'Gölcük Kocaeli',
                )}&output=embed`}
              />
            </div>

            <div className="lg:col-span-7">
              <QuoteForm whatsappNumber={settings.whatsappNumber} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
