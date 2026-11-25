import { DeviceSelectorBar } from '@/components/DeviceSelectorBar'
import { FaqAccordion } from '@/components/FaqAccordion'
import { FilterCalculator } from '@/components/FilterCalculator'
import { FiltrationFlow } from '@/components/FiltrationFlow'
import { HeroSection } from '@/components/HeroSection'
import { BlurFade, SpotlightCard } from '@/components/motion/Primitives'
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
  CheckmarkBadge01Icon,
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

      {/* Animated GSAP Parallax + Motion Hero + Marquee */}
      <HeroSection settings={settings} heroImageUrl={heroImageUrl} />

      {/* 21st.dev Spotlight Product Grid with Sliding Spring Tabs */}
      <section id="urunler" className="border-t border-slate-200/80 bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
          <BlurFade>
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="font-mono text-xs font-medium text-sky-600">
                  ÜRÜNLER &amp; SİSTEMLER
                </span>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
                  İhtiyaca özel arıtma çözümleri
                </h2>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/urunler">
                  <span>Tüm Ürünler</span>
                  <HugeiconsIcon icon={ArrowRight01Icon} size={14} strokeWidth={2} />
                </Link>
              </Button>
            </div>
          </BlurFade>

          <ProductCatalog products={products} whatsappNumber={settings.whatsappNumber} />
        </div>
      </section>

      {/* Interactive 5-Stage Water Filtration Flow Visualizer */}
      <FiltrationFlow />

      {/* Interactive Hugeicons Device Selector */}
      <DeviceSelectorBar products={products} whatsappNumber={settings.whatsappNumber} />

      {/* 3-Step Craftsmanship + Real Under-Sink Photo */}
      <section className="border-t border-slate-200/80 bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 px-5 sm:px-6 lg:grid-cols-12">
          <BlurFade className="lg:col-span-6">
            <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-100 shadow-[0_18px_45px_rgba(15,23,42,0.07)]">
              <img
                src="/images/montaj-tezgah-alti.jpg"
                alt="Mutfak evye altı dolap içine temiz ve düzenli su arıtma cihazı montajı"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
              <span>Evye altı kapalı kasa gizli yerleşim</span>
              <span className="rounded-full bg-sky-50 px-2.5 py-0.5 font-mono text-sky-700">
                1–2 saat montaj
              </span>
            </div>
          </BlurFade>

          <div className="lg:col-span-6">
            <BlurFade>
              <span className="font-mono text-xs font-medium text-sky-600">
                02 / KURULUM SÜRECİ
              </span>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
                Ölçerek seçiyor, iz bırakmadan kuruyoruz.
              </h2>
            </BlurFade>

            <div className="mt-8 space-y-4">
              {[
                {
                  num: '01',
                  icon: WaterEnergyIcon,
                  title: 'Yerinde TDS & Sertlik Ölçümü',
                  desc: 'Şebeke suyunuz analiz edilir; mutfak dolabı veya tesisat alanına göre en doğru kapasite belirlenir.',
                },
                {
                  num: '02',
                  icon: RulerIcon,
                  title: 'Temiz & İz Bırakmayan Montaj',
                  desc: 'Tezgâh çizilmeden paslanmaz musluk bağlantısı açılır, hortumlar ve vana dolap içine düzenli gizlenir.',
                },
                {
                  num: '03',
                  icon: Shield01Icon,
                  title: '2 Yıl Garanti & Periyodik Takip',
                  desc: 'Teslim anında çıkış suyu TDS değeri birlikte doğrulanır, filtre değişim zamanı geldiğinde düzenli bakım yapılır.',
                },
              ].map((step, i) => (
                <BlurFade key={step.num} delay={i * 0.08}>
                  <div className="flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 transition-colors hover:border-sky-200 hover:bg-sky-50/35">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-600 text-white">
                      <HugeiconsIcon icon={step.icon} size={18} strokeWidth={2} />
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-sky-600">{step.num}</span>
                        <h3 className="text-[15.5px] font-semibold text-zinc-950">{step.title}</h3>
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">{step.desc}</p>
                    </div>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filter Maintenance Calculator */}
      <section id="filtre-bakim" className="border-t border-slate-200/80 bg-slate-50/70 py-20">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
          <BlurFade>
            <FilterCalculator whatsappNumber={settings.whatsappNumber} />
          </BlurFade>
        </div>
      </section>

      {/* References Directory */}
      <section id="referanslar" className="border-t border-slate-200/80 bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
          <BlurFade>
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="font-mono text-xs font-medium text-sky-600">REFERANSLAR</span>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
                  Seçili kurumsal ve evsel kurulumlar
                </h2>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/referanslar">
                  <span>Tüm {references.length} Referans</span>
                  <HugeiconsIcon icon={ArrowRight01Icon} size={14} strokeWidth={2} />
                </Link>
              </Button>
            </div>
          </BlurFade>

          <ReferenceGrid references={homeReferences} showFilters={false} />
        </div>
      </section>

      {/* Customer Reviews with SpotlightCard & Hugeicons */}
      {testimonials.length > 0 && (
        <section className="border-t border-slate-200/80 bg-slate-50/70 py-20">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
            <BlurFade>
              <span className="font-mono text-xs font-medium text-sky-600">
                MÜŞTERİ DENEYİMLERİ
              </span>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
                Kurulum sonrası doğrulanmış geri bildirimler
              </h2>
            </BlurFade>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              {testimonials.map((t, idx) => (
                <BlurFade key={t.id} delay={idx * 0.08}>
                  <SpotlightCard className="flex h-full flex-col p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-0.5 text-amber-500">
                        {Array.from({ length: t.rating || 5 }).map((_, i) => (
                          <HugeiconsIcon
                            key={i}
                            icon={StarIcon}
                            size={15}
                            fill="currentColor"
                            strokeWidth={1.5}
                          />
                        ))}
                      </div>
                      {t.verified && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700">
                          <HugeiconsIcon icon={CheckmarkBadge01Icon} size={13} strokeWidth={2} />
                          <span>Doğrulanmış</span>
                        </span>
                      )}
                    </div>
                    <p className="flex-1 text-[14.5px] leading-relaxed text-slate-700">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="mt-6 border-t border-slate-100 pt-4">
                      <div className="text-sm font-semibold text-zinc-950">{t.author}</div>
                      <div className="mt-0.5 text-xs text-slate-500">
                        {t.location} • {t.productName}
                      </div>
                    </div>
                  </SpotlightCard>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About & Founder Murat Bayram */}
      <section id="hakkimizda" className="border-t border-slate-200/80 bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-5 sm:px-6 lg:grid-cols-12">
          <BlurFade className="lg:col-span-7">
            <span className="font-mono text-xs font-medium text-sky-600">HAKKIMIZDA</span>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
              {settings.aboutHeading}
            </h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-slate-600">
              {settings.aboutBody}
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                {
                  icon: Shield01Icon,
                  title: 'TSE & NSF Onaylı',
                  desc: 'Sertifikalı membran, karbon ve sediment filtre grupları.',
                },
                {
                  icon: DropletIcon,
                  title: 'TDS & Sertlik Analizi',
                  desc: 'Her kurulum öncesi ve sonrası canlı ölçüm kontrolü.',
                },
                {
                  icon: Award01Icon,
                  title: 'ISO Kalite Disiplini',
                  desc: 'Basınç regülatörü ve tam sızdırmazlık testi ile teslim.',
                },
                {
                  icon: Wrench01Icon,
                  title: '7/24 Teknik Destek',
                  desc: '2 yıl tam garanti ve düzenli filtre bakım takibi.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-100/80 text-sky-700">
                    <HugeiconsIcon icon={item.icon} size={18} strokeWidth={1.8} />
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-zinc-950">{item.title}</h4>
                    <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </BlurFade>

          <BlurFade delay={0.1} className="lg:col-span-5">
            <aside className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-slate-950 p-7 text-white sm:p-9">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-14 -top-14 h-52 w-52 rounded-full bg-sky-500/20 blur-3xl"
              />
              <div className="relative">
                <span className="font-mono text-xs text-sky-300">KURUCU &amp; YÖNETİM</span>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                  {settings.founderName || 'Murat Bayram'}
                </h3>
                <p className="mt-0.5 text-sm text-sky-200/80">
                  {settings.founderRole || 'Kurucu & Genel Müdür'}
                </p>
                <p className="mt-5 text-sm leading-relaxed text-slate-300">
                  {settings.founderBio}
                </p>
              </div>

              <div className="relative mt-8 border-t border-white/15 pt-5">
                <div className="text-xs text-slate-400">Doğrudan iletişim &amp; keşif hattı</div>
                <a
                  href={telHref}
                  className="mt-1.5 inline-flex items-center gap-2 font-mono text-lg font-semibold text-white hover:text-sky-300"
                >
                  <HugeiconsIcon icon={Call02Icon} size={18} strokeWidth={2} />
                  <span>{settings.phoneDisplay}</span>
                </a>
                <p className="mt-1 text-xs text-slate-400">{settings.workingHours}</p>
              </div>
            </aside>
          </BlurFade>
        </div>
      </section>

      {/* Hairline FAQ */}
      {faqs.length > 0 && (
        <section id="sss" className="border-t border-slate-200/80 bg-white py-20 sm:py-24">
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-5 sm:px-6 lg:grid-cols-12">
            <BlurFade className="lg:col-span-4">
              <span className="font-mono text-xs font-medium text-sky-600">SSS</span>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
                Sık sorulan sorular
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                Ters osmoz, filtre değişim süresi, kurulum ve garanti hakkında merak edilenler.
              </p>
            </BlurFade>
            <div className="lg:col-span-8">
              <FaqAccordion faqs={faqs} />
            </div>
          </div>
        </section>
      )}

      {/* Contact & Discovery */}
      <section
        id="iletisim"
        className="border-t border-slate-200/80 bg-gradient-to-b from-sky-50/50 to-white py-20 sm:py-24"
      >
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
          <BlurFade className="mb-10 max-w-xl">
            <span className="font-mono text-xs font-medium text-sky-600">İLETİŞİM</span>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
              Ücretsiz keşif ve teklif alın
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Telefon, WhatsApp veya form üzerinden ulaşın; aynı gün içinde dönüş yapalım.
            </p>
          </BlurFade>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-5">
              <div className="divide-y divide-slate-200/80 overflow-hidden rounded-3xl border border-slate-200/90 bg-white">
                <a
                  href={telHref}
                  className="flex items-start gap-3.5 p-5 transition-colors hover:bg-sky-50/40"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                    <HugeiconsIcon icon={Call02Icon} size={18} strokeWidth={2} />
                  </span>
                  <div>
                    <div className="text-xs text-slate-400">Telefon</div>
                    <div className="mt-0.5 font-mono text-base font-semibold text-zinc-950">
                      {settings.phoneDisplay}
                    </div>
                    <div className="text-xs text-slate-500">{settings.workingHours}</div>
                  </div>
                </a>

                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3.5 p-5 transition-colors hover:bg-emerald-50/40"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <HugeiconsIcon icon={WhatsappIcon} size={18} strokeWidth={2} />
                  </span>
                  <div>
                    <div className="text-xs text-slate-400">WhatsApp</div>
                    <div className="mt-0.5 text-base font-semibold text-zinc-950">
                      Hemen Mesaj Gönderin
                    </div>
                    <div className="text-xs text-slate-500">
                      Aynı gün dönüş ve hızlı fiyatlandırma
                    </div>
                  </div>
                </a>

                <div className="flex items-start gap-3.5 p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                    <HugeiconsIcon icon={Location01Icon} size={18} strokeWidth={2} />
                  </span>
                  <div>
                    <div className="text-xs text-slate-400">Adres</div>
                    <div className="mt-0.5 text-base font-semibold text-zinc-950">
                      Gölcük / Kocaeli
                    </div>
                    <div className="text-xs leading-relaxed text-slate-500">
                      {settings.address}
                    </div>
                  </div>
                </div>
              </div>

              <iframe
                title="Aritman Su Arıtma Sistemleri Konum"
                className="h-56 w-full rounded-3xl border border-slate-200/90 bg-white"
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
