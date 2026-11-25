'use client'

import {
  CheckmarkCircle02Icon,
  DropletIcon,
  FilterIcon,
  Shield01Icon,
  SparklesIcon,
  WaterEnergyIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { AnimatePresence, motion } from 'motion/react'
import React, { useState } from 'react'

const STAGES = [
  {
    step: '01',
    short: 'Sediment',
    title: '5 Mikron Sediment Ön Filtre',
    tds: 285,
    purity: 18,
    icon: FilterIcon,
    removes: ['Kum & Tortu', 'Tesisat Pası', 'Askıda Katı Madde'],
    description:
      'Şebeke hattından gelen gözle görünür veya mikroskobik pas, kum ve çamur partiküllerini tutarak diğer filtreleri ve membranı korur.',
  },
  {
    step: '02',
    short: 'Granül Karbon',
    title: 'Granül Aktif Karbon (GAC)',
    tds: 240,
    purity: 36,
    icon: WaterEnergyIcon,
    removes: ['Serbest Klor', 'Kötü Koku', 'Organik Bileşikler'],
    description:
      'Yüksek yüzey alanlı aktif karbon yatağı sayesinde şebeke suyundaki kloru, bulanıklığı ve istenmeyen kimyasal kokuları hızla giderir.',
  },
  {
    step: '03',
    short: 'Blok Karbon',
    title: 'Sıkıştırılmış Blok Karbon (CTO)',
    tds: 195,
    purity: 54,
    icon: Shield01Icon,
    removes: ['İnce Partikül', 'Klor Kalıntısı', 'Kimyasal İzler'],
    description:
      'Suyu ters osmoz membranına girmeden önce son kez ince gözeneklerden geçirerek membranın ömrünü ve verimliliğini maksimize eder.',
  },
  {
    step: '04',
    short: 'RO Membran',
    title: 'NSF Onaylı Ters Osmoz Membran',
    tds: 18,
    purity: 99,
    icon: DropletIcon,
    removes: ['Kireç & Sertlik', 'Ağır Metaller', 'Nitrit / Nitrat & Bakteri'],
    description:
      '0,0001 mikron yarı geçirgen membran teknolojisiyle sudaki zararlı maddeleri %99,9 oranında ayrıştırıp atık hattından uzaklaştırır.',
  },
  {
    step: '05',
    short: 'Tat Düzenleyici',
    title: 'Hindistan Cevizi Post Karbon & Mineral',
    tds: 26,
    purity: 100,
    icon: SparklesIcon,
    removes: ['Dengeli İçim', 'Doğal Tat', 'Taze & Yumuşak Su'],
    description:
      'Arıtılmış suya doğal içim yumuşaklığı ve berraklık kazandırır; çay, kahve ve yemeklerin lezzetini ilk bardaktan itibaren belirginleştirir.',
  },
]

export function FiltrationFlow() {
  const [activeIdx, setActiveIdx] = useState(3)
  const active = STAGES[activeIdx]

  return (
    <section className="relative overflow-hidden border-t border-slate-200/80 bg-gradient-to-b from-white via-sky-50/40 to-white py-20 sm:py-24">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-sky-600">
              <HugeiconsIcon icon={DropletIcon} size={14} strokeWidth={2} />
              <span>5 AŞAMALI TERS OSMOZ TEKNOLOJİSİ</span>
            </span>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
              Şebeke suyu bardağınıza ulaşana kadar nasıl arınır?
            </h2>
          </div>
          <p className="max-w-sm text-sm text-slate-500">
            Her aşamaya tıklayarak arıtma sürecini ve TDS değerindeki düşüşü canlı inceleyin.
          </p>
        </div>

        {/* Interactive Stage Track with Animated Flowing Water Beam */}
        <div className="relative mb-6">
          <div className="pointer-events-none absolute left-6 right-6 top-1/2 hidden h-0.5 -translate-y-1/2 overflow-hidden bg-slate-200 md:block">
            <div className="animate-flow-beam h-full w-1/3 bg-gradient-to-r from-transparent via-sky-500 to-cyan-400" />
          </div>

          <div className="relative grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-5">
            {STAGES.map((stage, idx) => {
              const isSelected = idx === activeIdx
              return (
                <button
                  key={stage.step}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className={`relative flex flex-col items-start rounded-2xl border p-4 text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-sky-500 bg-white shadow-[0_8px_26px_rgba(2,132,199,0.14)]'
                      : 'border-slate-200/80 bg-white/85 hover:border-sky-300 hover:bg-white'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="filtration-active-ring"
                      transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                      className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-sky-500/25"
                    />
                  )}
                  <div className="flex w-full items-center justify-between">
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors ${
                        isSelected
                          ? 'bg-sky-600 text-white'
                          : 'bg-sky-50 text-sky-700'
                      }`}
                    >
                      <HugeiconsIcon icon={stage.icon} size={18} strokeWidth={1.8} />
                    </span>
                    <span className="font-mono text-xs text-slate-400">{stage.step}</span>
                  </div>
                  <div className="mt-3 text-sm font-semibold text-zinc-950">{stage.short}</div>
                  <div className="mt-0.5 font-mono text-[11px] text-sky-600">
                    ~{stage.tds} ppm
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Animated Stage Detail + Live TDS Purity Meter */}
        <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_12px_36px_rgba(15,23,42,0.05)] sm:p-9">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={active.step}
              initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12"
            >
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 font-mono text-xs font-medium text-sky-700">
                  <span>Aşama {active.step} / 05</span>
                </div>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-950">
                  {active.title}
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-slate-600">
                  {active.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {active.removes.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700"
                    >
                      <HugeiconsIcon
                        icon={CheckmarkCircle02Icon}
                        size={14}
                        strokeWidth={2}
                        className="text-sky-600"
                      />
                      <span>{item}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50/80 to-white p-6 lg:col-span-5">
                <div className="flex items-center justify-between text-xs font-medium text-slate-500">
                  <span>Şebeke Giriş: 320 ppm</span>
                  <span className="font-mono text-sky-700">Bu Aşama Sonrası</span>
                </div>

                <div className="mt-3 flex items-baseline justify-between">
                  <div className="font-mono text-4xl font-semibold tracking-tight text-zinc-950">
                    {active.tds}{' '}
                    <span className="text-base font-normal text-slate-400">ppm</span>
                  </div>
                  <span className="rounded-full bg-sky-600 px-2.5 py-0.5 font-mono text-xs font-medium text-white">
                    %{active.purity} Saflık
                  </span>
                </div>

                <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-slate-200/80">
                  <motion.div
                    initial={false}
                    animate={{ width: `${active.purity}%` }}
                    transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                    className="h-full rounded-full bg-gradient-to-r from-sky-500 to-cyan-400"
                  />
                </div>

                <p className="mt-3 text-xs leading-relaxed text-slate-500">
                  İdeal içme suyu TDS aralığı genellikle 15–50 ppm seviyesindedir. Her kurulumda
                  dijital TDS ölçer ile canlı test yapılır.
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
