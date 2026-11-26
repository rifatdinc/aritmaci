'use client'

import { mountFiltrationAnimation, type FlowProfile } from '@/components/filtration-animation'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { WaterOrb } from '@/components/WaterOrb'
import { spring } from '@/lib/springs'
import {
  ArrowRight01Icon,
  CheckmarkCircle02Icon,
  DropletIcon,
  FilterIcon,
  PauseIcon,
  PlayIcon,
  Shield01Icon,
  WaterEnergyIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { motion, MotionConfig } from 'motion/react'
import { useEffect, useId, useRef, useState, type CSSProperties } from 'react'

const panelExit = { ...spring.slow.exit, ease: 'easeOut' } as const

const STAGES = [
  {
    step: '01',
    short: 'Sediment',
    title: '5 mikron sediment ön filtre',
    phase: 'Tortu ön filtrasyonu',
    icon: FilterIcon,
    effects: ['Kum ve tortu', 'Tesisat pası', 'Askıda katı maddeler'],
    description:
      'Şebeke suyunun ilk durağı. Filtre, borulardan gelen kum ve pas parçacıklarını tutarak suyu karbon filtrelerine hazırlar.',
    functionLabel: 'Tuttuğu parçacıklar',
    stream: { speed: 0.95, spread: 13, scale: 1.08, density: 0.88 },
  },
  {
    step: '02',
    short: 'Granül karbon',
    title: 'Granül aktif karbon (GAC)',
    phase: 'Klor ve koku kontrolü',
    icon: WaterEnergyIcon,
    effects: ['Serbest klor', 'Kokuya neden olan bileşikler', 'Bazı organik bileşikler'],
    description:
      'Su, geniş yüzeyli aktif karbon granüllerinin arasından geçer. Bu yüzey, suda kokuya ve tada etki eden bazı bileşikleri tutar.',
    functionLabel: 'Azaltmaya yardımcı olduğu',
    stream: { speed: 1.13, spread: 9, scale: 0.92, density: 0.62 },
  },
  {
    step: '03',
    short: 'Blok karbon',
    title: 'Sıkıştırılmış blok karbon (CTO)',
    phase: 'Membran öncesi filtrasyon',
    icon: Shield01Icon,
    effects: ['İnce parçacıklar', 'Klor kalıntısı', 'Membran koruması'],
    description:
      'Sıkıştırılmış karbon, suyu daha ince gözeneklerden geçirir. Kalan parçacıkları ve klorun bir bölümünü tutarak ters osmoz membranını korur.',
    functionLabel: 'Bu aşamanın görevi',
    stream: { speed: 0.9, spread: 6, scale: 0.82, density: 0.43 },
  },
  {
    step: '04',
    short: 'RO membran',
    title: 'NSF onaylı ters osmoz membran',
    phase: 'Ters osmoz',
    icon: DropletIcon,
    effects: ['Çözünmüş sertlik mineralleri', 'Bazı ağır metaller', 'Nitrat ve nitrit'],
    description:
      'Basınçlı su, yarı geçirgen membrana ulaşır. Membrandan geçen su bir sonraki filtreye ilerlerken ayrılan maddelerin yoğunlaştığı su atık hattına yönelir.',
    functionLabel: 'Azaltmaya yardımcı olduğu',
    stream: { speed: 0.72, spread: 3, scale: 0.73, density: 0.24 },
  },
  {
    step: '05',
    short: 'Tat düzenleyici',
    title: 'Hindistan cevizi post karbon ve mineral',
    phase: 'Son filtrasyon',
    icon: CheckmarkCircle02Icon,
    effects: ['Son karbon teması', 'Tat ve koku düzenlemesi', 'Musluğa giden su'],
    description:
      'Arıtılmış su, musluğa ulaşmadan önce hindistan cevizi bazlı son karbon filtresinden geçer. Bu aşama tat ve koku düzenlemesine yardımcı olur.',
    functionLabel: 'Çıkış suyunda',
    stream: { speed: 1.22, spread: 8, scale: 1.04, density: 0.12 },
  },
]

const STAGE_ADVANCE_DELAY = 4000

function WaterStream({
  profile,
  paused,
  rotationEnabled,
  onToggleRotation,
}: {
  profile: FlowProfile
  paused: boolean
  rotationEnabled: boolean
  onToggleRotation: () => void
}) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const membrane = useRef<HTMLSpanElement>(null)
  const scene = useRef<ReturnType<typeof mountFiltrationAnimation>>(undefined)
  const label = rotationEnabled ? 'Otomatik geçişi duraklat' : 'Otomatik geçişi başlat'

  useEffect(() => {
    if (!canvas.current || !membrane.current) return

    const animation = mountFiltrationAnimation(canvas.current, membrane.current, STAGES[0].stream)
    scene.current = animation
    return () => animation?.dispose()
  }, [])

  useEffect(() => {
    scene.current?.update(profile, !paused)
  }, [paused, profile])

  return (
    <div className="filtration-stream">
      <div
        className="filtration-stream-track"
        role="img"
        aria-label="Soldan gelen tortulu su filtreden geçer. Tortu filtrede kalır, sağdan berrak su çıkar."
      >
        <canvas ref={canvas} className="filtration-canvas" aria-hidden="true" />
        <div className="filtration-still-water" aria-hidden="true" />
        <div className="filtration-cartridge" aria-hidden="true">
          <span className="filtration-cartridge-glass" />
          <span className="filtration-cartridge-membrane" ref={membrane} />
        </div>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="filtration-stream-toggle"
        aria-label={label}
        title={label}
        onClick={onToggleRotation}
      >
        <HugeiconsIcon icon={rotationEnabled ? PauseIcon : PlayIcon} aria-hidden="true" />
      </Button>
      <div className="filtration-stream-labels">
        <span>
          <HugeiconsIcon icon={WaterEnergyIcon} size={17} aria-hidden="true" />
          Şebeke suyu
        </span>
        <span>Arıtma filtresi</span>
        <span>
          <WaterOrb className="filtration-outlet-orb" state="working" speed={0.7} paused={paused} />
          Arıtılmış su
        </span>
      </div>
    </div>
  )
}

export function FiltrationFlow() {
  const [stage, setStage] = useState(STAGES[0].step)
  const [rotation, setRotation] = useState<'auto' | 'playing' | 'manual' | 'paused'>('auto')
  const [hovered, setHovered] = useState(false)
  const [canAdvance, setCanAdvance] = useState(false)
  const [motionAllowed, setMotionAllowed] = useState(false)
  const stageIndicator = useId()
  const tabList = useRef<HTMLDivElement>(null)
  const activeStageIndex = STAGES.findIndex(({ step }) => step === stage)
  const nextStage = STAGES[(activeStageIndex + 1) % STAGES.length]
  const rotationEnabled = rotation === 'auto' || rotation === 'playing'
  const shouldAdvance = canAdvance && (rotation === 'playing' || (rotation === 'auto' && !hovered))

  useEffect(() => {
    const list = tabList.current
    if (!list) return

    let tabsInView = false
    const motionPreference = window.matchMedia('(prefers-reduced-motion: no-preference)')
    const updateAvailability = () => {
      setMotionAllowed(motionPreference.matches)
      setCanAdvance(tabsInView && !document.hidden && motionPreference.matches)
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        tabsInView = entry.intersectionRatio >= 0.5
        updateAvailability()
      },
      { threshold: 0.5 },
    )

    observer.observe(list)
    motionPreference.addEventListener('change', updateAvailability)
    document.addEventListener('visibilitychange', updateAvailability)
    return () => {
      observer.disconnect()
      motionPreference.removeEventListener('change', updateAvailability)
      document.removeEventListener('visibilitychange', updateAvailability)
    }
  }, [])

  useEffect(() => {
    if (!shouldAdvance) return

    const timer = window.setTimeout(() => setStage(nextStage.step), STAGE_ADVANCE_DELAY)
    return () => window.clearTimeout(timer)
  }, [nextStage.step, shouldAdvance])

  function pauseForInteraction() {
    setRotation((current) => (current === 'paused' ? current : 'manual'))
  }

  function selectStage(step: string) {
    pauseForInteraction()
    setStage(step)
  }

  useEffect(() => {
    const list = tabList.current
    const activeTab = list?.querySelector('[aria-selected="true"]')
    if (!list || !activeTab) return

    const revealActiveTab = (behavior: ScrollBehavior) => {
      const visible = list.getBoundingClientRect()
      const active = activeTab.getBoundingClientRect()
      const inset = parseFloat(getComputedStyle(list).paddingInlineStart)
      const startOverflow = Math.min(0, active.left - visible.left - inset)
      const endOverflow = Math.max(0, active.right - visible.right + inset)
      if (startOverflow || endOverflow) {
        list.scrollBy({ left: startOverflow + endOverflow, behavior })
      }
    }

    const canAnimate = window.matchMedia('(prefers-reduced-motion: no-preference)').matches
    revealActiveTab(canAnimate ? 'smooth' : 'instant')

    let width = list.clientWidth
    const observer = new ResizeObserver(() => {
      if (list.clientWidth === width) return
      width = list.clientWidth
      revealActiveTab('instant')
    })
    observer.observe(list)
    return () => observer.disconnect()
  }, [stage])

  return (
    <section className="filtration-panel" aria-labelledby="filtration-heading">
      <div className="filtration-intro">
        <h2 id="filtration-heading">Su nasıl arıtılır?</h2>
        <p>
          Şebekeden musluğa giden suyu takip edin. Her aşamayı seçerek filtrenin görevini görün.
        </p>
      </div>
      <MotionConfig reducedMotion="user">
        <Tabs
          value={stage}
          onValueChange={selectStage}
          onFocus={(event) => {
            if (event.target.matches(':focus-visible')) pauseForInteraction()
          }}
          onPointerEnter={(event) => {
            if (event.pointerType === 'mouse') setHovered(true)
          }}
          onPointerLeave={(event) => {
            if (event.pointerType !== 'mouse') return
            setHovered(false)
            setRotation((current) => (current === 'playing' ? 'auto' : current))
          }}
          className="filtration-explorer min-w-0 gap-0"
        >
          <TabsList
            asChild
            ref={tabList}
            aria-label="Arıtma aşamaları"
            className="filter-list stage-tabs"
          >
            <motion.div layoutScroll>
              {STAGES.map(({ step, short, icon }) => (
                <TabsTrigger key={step} value={step}>
                  <span className="stage-tab-marker">
                    <HugeiconsIcon icon={icon} size={20} strokeWidth={1.6} aria-hidden="true" />
                    <span className="stage-tab-number">{step}</span>
                  </span>
                  <span>{short}</span>
                  {step === stage && (
                    <motion.span
                      aria-hidden="true"
                      className="stage-tab-indicator"
                      layoutId={motionAllowed ? stageIndicator : undefined}
                      transition={spring.moderate}
                    />
                  )}
                </TabsTrigger>
              ))}
            </motion.div>
          </TabsList>
          <WaterStream
            profile={STAGES[activeStageIndex].stream}
            paused={rotation === 'paused'}
            rotationEnabled={rotationEnabled}
            onToggleRotation={() => setRotation(rotationEnabled ? 'paused' : 'playing')}
          />
          <div
            className="stage-panels"
            style={{ '--stage-panel-duration': `${spring.slow.duration}s` } as CSSProperties}
          >
            {STAGES.map(({ step, icon, title, phase, description, effects, functionLabel }) => {
              const selected = step === stage

              return (
                <TabsContent
                  key={step}
                  value={step}
                  forceMount
                  inert={!selected}
                  aria-hidden={!selected}
                  tabIndex={selected ? 0 : -1}
                  className="stage-content"
                >
                  <motion.div
                    className="stage-detail"
                    initial={false}
                    animate={{ opacity: selected ? 1 : 0 }}
                    transition={selected ? spring.slow : panelExit}
                  >
                    <div className="stage-summary">
                      <p className="stage-phase">{phase}</p>
                      <h3>{title}</h3>
                      <p className="stage-description">{description}</p>
                    </div>
                    <div className="stage-effects">
                      <div className="stage-effects-heading">
                        <HugeiconsIcon
                          icon={icon}
                          size={21}
                          strokeWidth={1.55}
                          aria-hidden="true"
                        />
                        <p>{functionLabel}</p>
                      </div>
                      <ul>
                        {effects.map((item) => (
                          <li key={item}>
                            <HugeiconsIcon
                              icon={CheckmarkCircle02Icon}
                              size={17}
                              aria-hidden="true"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </TabsContent>
              )
            })}
          </div>
          <div className="stage-navigation">
            <p className="stage-progress" aria-live={shouldAdvance ? 'off' : 'polite'}>
              Aşama {Number(stage)} / {STAGES.length}
            </p>
            <Button variant="outline" type="button" onClick={() => selectStage(nextStage.step)}>
              {nextStage.step === '01' ? 'İlk aşamaya dön' : 'Sonraki aşama'}
              <HugeiconsIcon icon={ArrowRight01Icon} size={17} aria-hidden="true" />
            </Button>
          </div>
        </Tabs>
      </MotionConfig>
    </section>
  )
}
