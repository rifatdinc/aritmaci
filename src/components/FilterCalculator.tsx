'use client'

import { Button } from '@/components/ui/button'
import { buildWhatsappUrl } from '@/lib/types'
import { ArrowUpRight01Icon, WhatsappIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { motion } from 'motion/react'
import React, { useMemo, useState } from 'react'

const EASE = [0.22, 1, 0.36, 1] as const

export function FilterCalculator({ whatsappNumber }: { whatsappNumber: string }) {
  const [lastDate, setLastDate] = useState(() => {
    const d = new Date()
    d.setMonth(d.getMonth() - 5)
    return d.toISOString().slice(0, 10)
  })
  const [months, setMonths] = useState<number>(6)

  const calc = useMemo(() => {
    if (!lastDate) return null
    const base = new Date(`${lastDate}T00:00:00`)
    if (Number.isNaN(base.getTime())) return null

    const next = new Date(base)
    next.setMonth(next.getMonth() + months)

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const totalDays = Math.max(
      1,
      Math.round((next.getTime() - base.getTime()) / (1000 * 60 * 60 * 24)),
    )
    const diffDays = Math.round((next.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    const lifePercent = Math.max(0, Math.min(100, Math.round((diffDays / totalDays) * 100)))

    const formatted = next.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })

    if (diffDays < 0) {
      return {
        formatted,
        lifePercent: 4,
        barColor: 'bg-[var(--negative)]',
        dotColor: 'bg-[var(--negative)]',
        textColor: 'text-[var(--negative)]',
        label: `Bakım ${Math.abs(diffDays)} gün gecikmiş`,
      }
    }
    if (diffDays <= 30) {
      return {
        formatted,
        lifePercent: Math.max(12, lifePercent),
        barColor: 'bg-[var(--warning)]',
        dotColor: 'bg-[var(--warning)]',
        textColor: 'text-[var(--warning)]',
        label: `Bakım yaklaşıyor (${diffDays} gün kaldı)`,
      }
    }
    return {
      formatted,
      lifePercent,
      barColor: 'bg-[var(--primary)]',
      dotColor: 'bg-[var(--positive)]',
      textColor: 'text-[var(--positive)]',
      label: `Filtreniz güncel (${diffDays} gün kaldı)`,
    }
  }, [lastDate, months])

  const waHref = buildWhatsappUrl(
    whatsappNumber,
    `Merhaba, filtre bakım hesaplayıcıya göre sonraki bakım tarihim ${
      calc?.formatted || ''
    } görünüyor. Periyodik filtre değişimi ve TDS kontrolü için randevu almak istiyorum.`,
  )

  return (
    <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] lg:grid-cols-12">
      <div className="p-6 sm:p-8 lg:col-span-7">
        <span className="font-mono text-xs text-[var(--muted-foreground)]">
          Periyodik bakım takibi
        </span>
        <h2 className="mt-2 text-[28px] font-medium leading-[1.15] tracking-[-0.02em] text-[var(--foreground)] sm:text-[32px]">
          Filtre değişim tarihini hesaplayın
        </h2>
        <p className="mt-3 max-w-lg text-sm leading-6 text-[var(--text-secondary)]">
          Son filtre değişim tarihinizi ve kullanım periyodunuzu girin, kalan filtre ömrünü ve
          sonraki bakım zamanını görün.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="calc-last-date"
              className="mb-2 block text-xs font-medium text-[var(--text-secondary)]"
            >
              Son değişim tarihi
            </label>
            <input
              id="calc-last-date"
              type="date"
              value={lastDate}
              onChange={(e) => setLastDate(e.target.value)}
              className="h-10 w-full rounded-lg border border-[var(--input)] bg-[var(--background)] px-3 font-mono text-sm tabular-nums text-[var(--foreground)] transition-colors duration-150 focus:border-[var(--primary)] focus:bg-[var(--card)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/20"
            />
          </div>

          <div>
            <span className="mb-2 block text-xs font-medium text-[var(--text-secondary)]">
              Bakım aralığı
            </span>
            <div className="grid grid-cols-3 gap-2">
              {[6, 9, 12].map((m) => (
                <button
                  key={m}
                  type="button"
                  aria-pressed={months === m}
                  onClick={() => setMonths(m)}
                  className={`h-10 rounded-lg border font-mono text-sm tabular-nums transition-[background-color,border-color,color] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] ${
                    months === m
                      ? 'border-[var(--primary)] bg-[var(--primary)] font-medium text-[var(--primary-foreground)]'
                      : 'border-[var(--border-strong)] bg-[var(--card)] text-[var(--text-secondary)] hover:text-[var(--foreground)]'
                  }`}
                >
                  {m} ay
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-8 border-t border-[var(--border)] bg-[var(--surface-raised)] p-6 sm:p-8 lg:col-span-5 lg:border-l lg:border-t-0">
        {calc && (
          <div>
            <div className={`inline-flex items-center gap-2 text-xs font-medium ${calc.textColor}`}>
              <span className={`h-2 w-2 rounded-full ${calc.dotColor}`} aria-hidden="true" />
              <span className="tabular-nums">{calc.label}</span>
            </div>

            <div className="mt-6 text-xs text-[var(--muted-foreground)]">
              Önerilen sonraki bakım
            </div>
            <div className="mt-1 font-mono text-2xl font-medium tabular-nums text-[var(--foreground)]">
              {calc.formatted}
            </div>

            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-xs text-[var(--text-secondary)]">
                <span>Tahmini kalan filtre ömrü</span>
                <span className="font-mono font-medium tabular-nums text-[var(--foreground)]">
                  %{calc.lifePercent}
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-sm bg-[var(--card)]">
                <motion.div
                  initial={false}
                  animate={{ scaleX: calc.lifePercent / 100 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className={`h-full w-full origin-left ${calc.barColor}`}
                />
              </div>
            </div>
          </div>
        )}

        <div>
          <Button variant="ocean" size="md" asChild className="w-full">
            <a href={waHref} target="_blank" rel="noopener noreferrer">
              <HugeiconsIcon icon={WhatsappIcon} size={16} strokeWidth={1.5} />
              <span>WhatsApp&apos;tan bakım randevusu al</span>
              <HugeiconsIcon icon={ArrowUpRight01Icon} size={16} strokeWidth={1.5} />
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
