'use client'

import { Button } from '@/components/ui/button'
import { PauseIcon, PlayIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { createContext, useContext, useState, type ReactNode } from 'react'
import { ThinkingOrb, type OrbState } from 'thinking-orbs'

const OrbMotion = createContext<{ paused: boolean; toggle: () => void } | null>(null)

export function WaterOrbMotion({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false)
  return (
    <OrbMotion.Provider value={{ paused, toggle: () => setPaused((current) => !current) }}>
      {children}
    </OrbMotion.Provider>
  )
}

export function WaterOrbMotionToggle() {
  const motion = useContext(OrbMotion)
  if (!motion) return null

  const label = motion.paused ? 'Küre animasyonlarını sürdür' : 'Küre animasyonlarını duraklat'

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      type="button"
      className="orb-motion-toggle"
      aria-label={label}
      title={label}
      onClick={motion.toggle}
    >
      <HugeiconsIcon icon={motion.paused ? PlayIcon : PauseIcon} aria-hidden="true" />
    </Button>
  )
}

export function WaterOrb({
  state,
  size = 20,
  speed,
  paused = false,
  className,
}: {
  state: OrbState
  size?: 20 | 32
  speed?: number
  paused?: boolean
  className?: string
}) {
  const motion = useContext(OrbMotion)

  return (
    <span aria-hidden="true" className={className}>
      <ThinkingOrb
        state={state}
        size={size}
        speed={speed}
        theme="light"
        color="#24718f"
        paused={paused || motion?.paused}
      />
    </span>
  )
}
