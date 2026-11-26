import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { WaterOrb, WaterOrbMotionToggle } from '@/components/WaterOrb'
import type { SiteSettingsDoc } from '@/lib/types'
import { ArrowDown01Icon, ArrowUpRight01Icon, Location01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Image from 'next/image'
import Link from 'next/link'

export function HeroSection({
  settings,
  heroImageUrl,
}: {
  settings: SiteSettingsDoc
  heroImageUrl: string
}) {
  const image = typeof settings.heroImage === 'object' ? settings.heroImage : null

  return (
    <section className="home-hero" aria-labelledby="hero-title">
      <div className="shell">
        <div className="hero-copy">
          {(settings.heroEyebrow || settings.serviceArea) && (
            <Badge
              variant="outline"
              className="hero-area-badge h-auto gap-1.5 px-2.5 py-1 whitespace-normal"
            >
              <HugeiconsIcon icon={Location01Icon} aria-hidden="true" />
              {settings.heroEyebrow || settings.serviceArea}
            </Badge>
          )}
          <h1 id="hero-title">{settings.heroTitle}</h1>
          {settings.heroSubtitle && <p className="hero-description">{settings.heroSubtitle}</p>}
          <div className="action-row">
            <Button variant="consultation" size="lg" asChild>
              <a href="#iletisim">
                Ücretsiz keşif iste
                <HugeiconsIcon
                  icon={ArrowUpRight01Icon}
                  data-icon="inline-end"
                  aria-hidden="true"
                />
              </a>
            </Button>
            <Button variant="explore" size="lg" asChild>
              <Link href="#urunler">
                Cihazları incele
                <HugeiconsIcon icon={ArrowDown01Icon} data-icon="inline-end" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <figure className="hero-figure">
        <div className="hero-photo">
          <Image
            src={heroImageUrl}
            alt={image?.alt || 'Mutfak tezgâhındaki arıtma musluğundan bardağa akan su'}
            fill
            loading="eager"
            fetchPriority="high"
            quality={85}
            sizes="(min-width: 960px) 68vw, calc(100vw - 32px)"
            className="object-cover"
          />
        </div>
        <figcaption className="hero-caption">
          <WaterOrb state="searching" size={32} className="hero-analysis-orb" />
          <strong>Yerinde su analizi</strong>
          <span>Kurulum öncesi TDS ve sertlik ölçümü</span>
          <WaterOrbMotionToggle />
        </figcaption>
      </figure>
    </section>
  )
}
