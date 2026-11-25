'use client'

import {
  CheckmarkCircle02Icon,
  DropletIcon,
  FilterIcon,
  Shield01Icon,
  WaterEnergyIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { AnimatePresence, motion } from 'motion/react'
import React, { useState } from 'react'

const EASE = [0.22, 1, 0.36, 1] as const

const STAGES = [
  {
    step: '01',
    short: 'Sediment',
    title: '5 mikron sediment ön filtre',
    tds: 285,
    purity: 18,
    icon: FilterIcon,
    removes: ['Kum ve tortu', 'Tesisat pası', 'Askıda katı madde'],
    description:
      'Şebeke hattından gelen gözle görünür veya mikroskobik pas, kum ve çamur partiküllerini tutarak diğer filtreleri ve membranı korur.',
  },
  {
    step: '02',
    short: 'Granül karbon',
    title: 'Granül aktif karbon (GAC)',
    tds: 240,
    purity: 36,
    icon: WaterEnergyIcon,
    removes: ['Serbest klor', 'Kötü koku', 'Organik bileşikler'],
    description:
      'Yüksek yüzey alanlı aktif karbon yatağı sayesinde şebeke suyundaki kloru, bulanıklığı ve istenmeyen kimyasal kokuları giderir.',
  },
  {
    step: '03',
    short: 'Blok karbon',
    title: 'Sıkıştırılmış blok karbon (CTO)',
    tds: 195,
    purity: 54,
    icon: Shield01Icon,
    removes: ['İnce partikül', 'Klor kalıntısı', 'Kimyasal izler'],
    description:
      'Suyu ters osmoz membranına girmeden önce ince gözeneklerden geçirerek membranın ömrünü ve verimliliğini korur.',
  },
  {
    step: '04',
    short: 'RO membran',
    title: 'NSF onaylı ters osmoz membran',
    tds: 18,
    purity: 99,
    icon: DropletIcon,
    removes: ['Kireç ve sertlik', 'Ağır metaller', 'Nitrit, nitrat ve bakteri'],
    description:
      '0,0001 mikron yarı geçirgen membran teknolojisiyle sudaki zararlı maddeleri %99,9 oranında ayrıştırıp atık hattından uzaklaştırır.',
  },
  {
    step: '05',
    short: 'Tat düzenleyici',
    title: 'Hindistan cevizi post karbon ve mineral',
    tds: 26,
    purity: 100,
    icon: CheckmarkCircle02Icon,
    removes: ['Dengeli içim', 'Doğal tat', 'Taze ve yumuşak su'],
    description:
      'Arıtılmış suya doğal içim yumuşaklığı ve berraklık kazandırır; çay, kahve ve yemeklerin lezzetini dengeler.',
  },
]

export function FiltrationFlow() {
  const [activeIdx, setActiveIdx] = useState(3)
  const active = STAGES[activeIdx]

  return (
    <section className="border-t border-[var(--border)] bg-[var(--background)] py-20 sm:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <span className="font-mono text-xs text-[var(--muted-foreground)]">
              5 aşamalı ters osmoz
            </span>
            <h2 className="mt-2 text-[28px] font-medium leading-[1.15] tracking-[-0.02em] text-[var(--foreground)] sm:text-[32px]">
              Şebeke suyu bardağınıza ulaşana kadar nasıl arınır?
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-[var(--text-secondary)]">
            Her aşamayı seçerek filtrasyon adımını ve çıkış TDS değerindeki değişimi inceleyin.
          </p>
        </div>

        {/* Interactive Stage Track */}
        <div className="mb-6">
          <div className="mb-3 hidden h-px w-full bg-[var(--border)] md:block" aria-hidden="true">
            <div
              className="h-full origin-left bg-[var(--primary)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ transform: `scaleX(${(activeIdx + 1) / STAGES.length})` }}
            />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {STAGES.map((stage, idx) => {
              const isSelected = idx === activeIdx
              return (
                <button
                  key={stage.step}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  aria-pressed={isSelected}
                  className={`relative flex flex-col items-start rounded-xl border p-4 text-left transition-[background-color,border-color,color] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] ${
                    isSelected
                      ? 'border-[var(--primary)] bg-[var(--card)]'
                      : 'border-[var(--border)] bg-[var(--card)]/70 hover:border-[var(--border-strong)] hover:bg-[var(--card)]'
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <span
                      className={
                        isSelected ? 'text-[var(--primary)]' : 'text-[var(--muted-foreground)]'
                      }
                    >
                      <HugeiconsIcon icon={stage.icon} size={16} strokeWidth={1.5} />
                    </span>
                    <span className="font-mono text-xs tabular-nums text-[var(--muted-foreground)]">
                      {stage.step}
                    </span>
                  </div>
                  <div className="mt-4 text-sm font-medium text-[var(--foreground)]">
                    {stage.short}
                  </div>
                  <div
                    className={`mt-1 font-mono text-xs tabular-nums ${
                      isSelected ? 'text-[var(--primary)]' : 'text-[var(--muted-foreground)]'
                    }`}
                  >
                    ~{stage.tds} ppm
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Stage Detail + Precision TDS Readout */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={active.step}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: EASE }}
              className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12"
            >
              <div className="lg:col-span-7">
                <div className="font-mono text-xs tabular-nums text-[var(--primary)]">
                  Aşama {active.step} / 05
                </div>
                <h3 className="mt-2 text-2xl font-medium leading-[1.2] text-[var(--foreground)]">
                  {active.title}
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--text-secondary)]">
                  {active.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {active.removes.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-1.5 text-xs text-[var(--text-secondary)]"
                    >
                      <HugeiconsIcon
                        icon={CheckmarkCircle02Icon}
                        size={16}
                        strokeWidth={1.5}
                        className="text-[var(--muted-foreground)]"
                      />
                      <span>{item}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-6 lg:col-span-5">
                <div className="flex items-center justify-between font-mono text-xs tabular-nums text-[var(--muted-foreground)]">
                  <span>Giriş: 320 ppm</span>
                  <span>Bu aşama sonrası</span>
                </div>

                <div className="mt-4 flex items-baseline justify-between">
                  <div className="font-mono text-[32px] font-medium leading-none tabular-nums text-[var(--foreground)]">
                    {active.tds}{' '}
                    <span className="text-sm font-normal text-[var(--muted-foreground)]">ppm</span>
                  </div>
                  <span className="font-mono text-xs font-medium tabular-nums text-[var(--primary)]">
                    %{active.purity} arıtım
                  </span>
                </div>

                <div className="mt-5">
                  <div className="h-2 w-full overflow-hidden rounded-sm bg-[var(--surface-raised)]">
                    <motion.div
                      initial={false}
                      animate={{ scaleX: active.purity / 100 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="h-full w-full origin-left bg-[var(--primary)]"
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-between font-mono text-xs tabular-nums text-[var(--muted-foreground)]">
                    <span>%0</span>
                    <span>İdeal içim: 15–50 ppm</span>
                    <span>%100</span>
                  </div>
                </div>

                <p className="mt-4 border-t border-[var(--border)] pt-4 text-xs leading-5 text-[var(--text-secondary)]">
                  Her kurulumda dijital TDS ölçer ile giriş ve çıkış suyu değerleri yerinde test
                  edilir.
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
