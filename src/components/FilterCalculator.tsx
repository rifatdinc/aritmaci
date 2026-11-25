'use client'

import { Button } from '@/components/ui/button'
import { buildWhatsappUrl } from '@/lib/types'
import {
  ArrowUpRight01Icon,
  Calendar03Icon,
  CheckmarkCircle02Icon,
  Clock01Icon,
  WhatsappIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { motion } from 'motion/react'
import React, { useMemo, useState } from 'react'

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
        barCls: 'bg-rose-500',
        pillCls: 'border-rose-200 bg-rose-50 text-rose-700',
        label: `Bakım ${Math.abs(diffDays)} gün gecikmiş`,
        isOk: false,
      }
    }
    if (diffDays <= 30) {
      return {
        formatted,
        lifePercent: Math.max(12, lifePercent),
        barCls: 'bg-amber-500',
        pillCls: 'border-amber-200 bg-amber-50 text-amber-800',
        label: `Bakım yaklaşıyor (${diffDays} gün kaldı)`,
        isOk: false,
      }
    }
    return {
      formatted,
      lifePercent,
      barCls: 'bg-sky-500',
      pillCls: 'border-emerald-200 bg-emerald-50 text-emerald-700',
      label: `Filtreniz güncel (${diffDays} gün kaldı)`,
      isOk: true,
    }
  }, [lastDate, months])

  const waHref = buildWhatsappUrl(
    whatsappNumber,
    `Merhaba, filtre bakım hesaplayıcıya göre sonraki bakım tarihim ${
      calc?.formatted || ''
    } görünüyor. Periyodik filtre değişimi ve TDS kontrolü için randevu almak istiyorum.`,
  )

  return (
    <div className="grid grid-cols-1 overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.05)] lg:grid-cols-12">
      <div className="p-6 sm:p-10 lg:col-span-7">
        <span className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-sky-600">
          <HugeiconsIcon icon={Calendar03Icon} size={14} strokeWidth={2} />
          <span>PERİYODİK BAKIM TAKİBİ</span>
        </span>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
          Filtre değişim tarihini hesaplayın
        </h2>
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-slate-500">
          Son filtre değişim tarihinizi ve kullanım periyodunuzu girin, kalan filtre ömrünü ve bir
          sonraki bakım zamanını anında görün.
        </p>

        <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="calc-last-date"
              className="mb-2 block text-xs font-medium text-slate-500"
            >
              Son değişim tarihi
            </label>
            <input
              id="calc-last-date"
              type="date"
              value={lastDate}
              onChange={(e) => setLastDate(e.target.value)}
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 font-mono text-sm text-zinc-950 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/15"
            />
          </div>

          <div>
            <span className="mb-2 block text-xs font-medium text-slate-500">Bakım aralığı</span>
            <div className="grid grid-cols-3 gap-2">
              {[6, 9, 12].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMonths(m)}
                  className={`h-11 rounded-xl border text-sm font-medium transition-all cursor-pointer ${
                    months === m
                      ? 'border-sky-600 bg-sky-600 text-white shadow-xs'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-sky-300 hover:text-zinc-950'
                  }`}
                >
                  {m} Ay
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-6 border-t border-slate-200/80 bg-gradient-to-br from-sky-50/70 via-white to-slate-50 p-6 sm:p-10 lg:col-span-5 lg:border-l lg:border-t-0">
        {calc && (
          <div>
            <div
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${calc.pillCls}`}
            >
              <HugeiconsIcon
                icon={calc.isOk ? CheckmarkCircle02Icon : Clock01Icon}
                size={14}
                strokeWidth={2}
              />
              <span>{calc.label}</span>
            </div>

            <div className="mt-5 text-xs text-slate-500">Önerilen sonraki bakım</div>
            <div className="mt-1 font-mono text-2xl font-semibold tracking-tight text-zinc-950">
              {calc.formatted}
            </div>

            <div className="mt-4">
              <div className="mb-1.5 flex items-center justify-between text-[11px] font-medium text-slate-500">
                <span>Tahmini kalan filtre ömrü</span>
                <span className="font-mono text-zinc-950">%{calc.lifePercent}</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200/80">
                <motion.div
                  initial={false}
                  animate={{ width: `${calc.lifePercent}%` }}
                  transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                  className={`h-full rounded-full ${calc.barCls}`}
                />
              </div>
            </div>
          </div>
        )}

        <div>
          <Button variant="whatsapp" size="md" asChild className="w-full">
            <a href={waHref} target="_blank" rel="noopener noreferrer">
              <HugeiconsIcon icon={WhatsappIcon} size={17} strokeWidth={2} />
              <span>WhatsApp&apos;tan Bakım Randevusu Al</span>
              <HugeiconsIcon icon={ArrowUpRight01Icon} size={15} strokeWidth={2} />
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
