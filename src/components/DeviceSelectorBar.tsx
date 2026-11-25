'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FieldLegend, FieldSet } from '@/components/ui/field'
import { FluidChoiceGroup } from '@/components/FluidChoiceGroup'
import { WaterOrb } from '@/components/WaterOrb'
import { spring } from '@/lib/springs'
import { buildWhatsappUrl, type ProductDoc } from '@/lib/types'
import {
  ArrowRight01Icon,
  Building03Icon,
  DropletIcon,
  Home09Icon,
  Shield01Icon,
  WaterEnergyIcon,
  WhatsappIcon,
  Wrench01Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Link from 'next/link'
import { motion } from 'motion/react'
import { useState } from 'react'

type UsageKey = 'ev' | 'isletme' | 'bina'
type NeedKey = 'icme' | 'kirec' | 'bakim'

const USAGE_OPTIONS = [
  { key: 'ev' as const, label: 'Ev ve mutfak', icon: Home09Icon },
  { key: 'isletme' as const, label: 'Kafe ve ofis', icon: Building03Icon },
  { key: 'bina' as const, label: 'Villa ve bina', icon: DropletIcon },
]

const NEED_OPTIONS = [
  { key: 'icme' as const, label: 'İçme suyu (RO)', icon: WaterEnergyIcon },
  { key: 'kirec' as const, label: 'Kireç önleme', icon: Shield01Icon },
  { key: 'bakim' as const, label: 'Filtre bakımı', icon: Wrench01Icon },
]

export function DeviceSelectorBar({
  products,
  whatsappNumber,
}: {
  products: ProductDoc[]
  whatsappNumber: string
}) {
  const [usage, setUsage] = useState<UsageKey>('ev')
  const [need, setNeed] = useState<NeedKey>('icme')

  let category: ProductDoc['category'] = 'evsel'
  if (need === 'bakim') category = 'filtre'
  else if (usage === 'bina' || need === 'kirec') category = 'yumusatma'
  else if (usage === 'isletme') category = 'kurumsal'

  const product = products.find((candidate) => candidate.category === category)

  const waHref = buildWhatsappUrl(
    whatsappNumber,
    `Merhaba, cihaz seçim rehberinden yazıyorum. Önerilen sistem (${
      product?.title || 'Su Arıtma Sistemi'
    }) hakkında fiyat ve keşif bilgisi almak istiyorum.`,
  )

  return (
    <Card className="tool-panel gap-0 py-0">
      <div className="tool-inputs">
        <FieldSet>
          <FieldLegend id="device-usage" variant="label">
            1. Nerede kullanacaksınız?
          </FieldLegend>
          <FluidChoiceGroup
            labelledBy="device-usage"
            value={usage}
            onValueChange={(value) => setUsage(value as UsageKey)}
            options={USAGE_OPTIONS.map(({ key, label, icon }) => ({
              value: key,
              label,
              icon: <HugeiconsIcon icon={icon} size={18} strokeWidth={1.7} aria-hidden="true" />,
            }))}
          />
        </FieldSet>
        <FieldSet>
          <FieldLegend id="device-need" variant="label">
            2. Neye ihtiyacınız var?
          </FieldLegend>
          <FluidChoiceGroup
            labelledBy="device-need"
            value={need}
            onValueChange={(value) => setNeed(value as NeedKey)}
            options={NEED_OPTIONS.map(({ key, label, icon }) => ({
              value: key,
              label,
              icon: <HugeiconsIcon icon={icon} size={18} strokeWidth={1.7} aria-hidden="true" />,
            }))}
          />
        </FieldSet>
      </div>
      <div className="tool-output">
        <div aria-live="polite" aria-atomic="true">
          <span className="result-label">
            <WaterOrb state="connecting" cue={product?.slug} /> Önerilen sistem
          </span>
          <motion.div
            key={product?.slug ?? 'empty'}
            initial={{ opacity: 0.45 }}
            animate={{ opacity: 1 }}
            transition={spring.moderate}
          >
            <h3>{product?.title || 'Birlikte sistem seçelim'}</h3>
            <p>
              {product
                ? product.summary
                : 'Kullanım alanınıza uygun seçenekler için keşif talebi bırakın.'}
            </p>
          </motion.div>
        </div>
        <div className="action-row">
          {product && (
            <Button variant="explore" asChild>
              <Link href={`/urunler/${product.slug}`}>
                Ürünü incele <HugeiconsIcon icon={ArrowRight01Icon} size={17} aria-hidden="true" />
              </Link>
            </Button>
          )}
          <a className="tool-link" href={waHref} target="_blank" rel="noopener noreferrer">
            <HugeiconsIcon icon={WhatsappIcon} size={18} aria-hidden="true" /> WhatsApp&apos;tan sor
          </a>
          {!product && (
            <Link className="tool-link" href="/iletisim#kesif-formu">
              Keşif formu
            </Link>
          )}
        </div>
      </div>
    </Card>
  )
}
