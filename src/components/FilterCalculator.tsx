'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Field, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/field'
import { Card } from '@/components/ui/card'
import { FluidChoiceGroup } from '@/components/FluidChoiceGroup'
import { WaterOrb } from '@/components/WaterOrb'
import { buildWhatsappUrl } from '@/lib/types'
import { WhatsappIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useState } from 'react'

const dayInMs = 86_400_000
const dateFormat = new Intl.DateTimeFormat('tr-TR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
})

function calculateMaintenance(value: string, months: number) {
  if (!value) return null

  const base = new Date(`${value}T00:00:00Z`)
  if (Number.isNaN(base.getTime())) return null

  const next = new Date(base)
  next.setUTCDate(1)
  next.setUTCMonth(next.getUTCMonth() + months)
  const endOfMonth = new Date(next)
  endOfMonth.setUTCMonth(endOfMonth.getUTCMonth() + 1, 0)
  next.setUTCDate(Math.min(base.getUTCDate(), endOfMonth.getUTCDate()))

  const today = new Date()
  const todayStart = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())
  const days = Math.round((next.getTime() - todayStart) / dayInMs)
  const percent = Math.max(
    0,
    Math.min(
      100,
      Math.round((100 * (next.getTime() - todayStart)) / (next.getTime() - base.getTime())),
    ),
  )
  const status =
    days < 0
      ? `Bakım ${Math.abs(days)} gün gecikmiş`
      : days === 0
        ? 'Önerilen bakım günü bugün'
        : `Bakıma ${days} gün kaldı`

  return { date: dateFormat.format(next), days, percent, status }
}

export function FilterCalculator({ whatsappNumber }: { whatsappNumber: string }) {
  const [lastDate, setLastDate] = useState('')
  const [months, setMonths] = useState(6)
  const result = calculateMaintenance(lastDate, months)
  const waHref = buildWhatsappUrl(
    whatsappNumber,
    `Merhaba, filtre değişimi ve TDS kontrolü için randevu almak istiyorum.${result ? ` Önerilen bakım tarihim ${result.date}.` : ''}`,
  )

  return (
    <Card id="filtre-bakim" className="tool-panel gap-0 py-0">
      <div className="tool-inputs">
        <h2>Filtre bakım hesabı</h2>
        <p>Son değişim tarihini girin ve cihazınızın bakım aralığını seçin.</p>
        <div className="maintenance-fields">
          <Field className="gap-1.5">
            <FieldLabel htmlFor="calc-last-date">Son değişim tarihi</FieldLabel>
            <Input
              id="calc-last-date"
              className="field-control"
              type="date"
              value={lastDate}
              onChange={(event) => setLastDate(event.target.value)}
            />
          </Field>
          <FieldSet>
            <FieldLegend id="calc-interval" variant="label" className="mb-1.5">
              Bakım aralığı
            </FieldLegend>
            <FluidChoiceGroup
              labelledBy="calc-interval"
              value={String(months)}
              onValueChange={(value) => setMonths(Number(value))}
              options={[6, 9, 12].map((month) => ({ value: String(month), label: `${month} ay` }))}
            />
          </FieldSet>
        </div>
      </div>
      <div className="tool-output">
        <div aria-live="polite" aria-atomic="true">
          <span className="result-label">
            <WaterOrb state="breathing" cue={result?.date} /> Önerilen bakım tarihi
          </span>
          {result ? (
            <>
              <h3>{result.date}</h3>
              <p>{result.status}</p>
              <div className="maintenance-progress">
                <label htmlFor="maintenance-life">
                  Tahmini kalan filtre ömrü <strong>%{result.percent}</strong>
                </label>
                <progress id="maintenance-life" value={result.percent} max={100} />
              </div>
            </>
          ) : (
            <p className="maintenance-hint">
              Tarihi girdiğinizde bir sonraki bakım gününü burada görebilirsiniz.
            </p>
          )}
        </div>
        <Button variant="whatsapp" asChild>
          <a href={waHref} target="_blank" rel="noopener noreferrer">
            <HugeiconsIcon icon={WhatsappIcon} size={18} aria-hidden="true" /> Bakım randevusu al
          </a>
        </Button>
      </div>
    </Card>
  )
}
