'use client'

import { useEffect, useRef, useState } from 'react'
import { ThinkingOrb, type OrbState } from 'thinking-orbs'

const ORB_MOTION_MS = 2800

export function WaterOrb({
  state,
  size = 20,
  cue,
  className,
}: {
  state: OrbState
  size?: 20 | 32
  cue?: string
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const anchor = ref.current
    if (!anchor) return

    let timeout: number | undefined
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      setPlaying(true)
      timeout = window.setTimeout(() => setPlaying(false), ORB_MOTION_MS)
    })
    observer.observe(anchor)

    return () => {
      observer.disconnect()
      window.clearTimeout(timeout)
    }
  }, [cue])

  return (
    <span ref={ref} aria-hidden="true" className={className}>
      <ThinkingOrb state={state} size={size} theme="light" color="#24718f" paused={!playing} />
    </span>
  )
}
