'use client'

import { cn } from '@/lib/utils'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, useMotionTemplate, useMotionValue } from 'motion/react'
import React, { useEffect, useRef, useState } from 'react'

/**
 * Bulletproof GSAP ScrollTrigger reveal:
 * SSR renders at full opacity: 1 (never blank/invisible if JS is delayed or in nested iframes).
 * On client mount, smoothly lifts elements into place as they scroll into view.
 */
export function BlurFade({
  children,
  className,
  delay = 0,
  yOffset = 20,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  yOffset?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    gsap.registerPlugin(ScrollTrigger)

    const rect = el.getBoundingClientRect()
    // If already visible above or inside viewport, animate subtly without hiding
    if (rect.top < window.innerHeight * 0.95) {
      const tween = gsap.from(el, {
        y: Math.min(12, yOffset),
        duration: 0.45,
        delay,
        ease: 'power3.out',
        clearProps: 'transform',
      })
      return () => {
        tween.kill()
      }
    }

    const ctx = gsap.context(() => {
      gsap.from(el, {
        y: yOffset,
        opacity: 0.01,
        duration: 0.55,
        delay,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: el,
          start: 'top 92%',
          once: true,
        },
      })
    }, ref)

    return () => ctx.revert()
  }, [delay, yOffset])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

export function SpotlightCard({
  children,
  className,
  spotlightColor = 'rgba(2, 132, 199, 0.11)',
}: {
  children: React.ReactNode
  className?: string
  spotlightColor?: string
}) {
  const mouseX = useMotionValue(-300)
  const mouseY = useMotionValue(-300)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  function handleMouseLeave() {
    mouseX.set(-300)
    mouseY.set(-300)
  }

  const background = useMotionTemplate`radial-gradient(380px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 75%)`

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white transition-all duration-300 hover:border-sky-300/80 hover:shadow-[0_14px_38px_rgba(2,132,199,0.09)]',
        className,
      )}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}

export function AnimatedStat({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    gsap.registerPlugin(ScrollTrigger)

    const match = value.match(/^([^0-9]*)([0-9]+(?:[.,][0-9]+)?)(.*)$/)
    if (!match) return

    const [, prefix, numRaw, suffix] = match
    const hasThousandDot = numRaw.includes('.') && numRaw.split('.')[1]?.length === 3
    const hasCommaDecimal = numRaw.includes(',')
    const target = hasThousandDot
      ? Number(numRaw.replace(/\./g, ''))
      : Number(numRaw.replace(',', '.'))

    if (Number.isNaN(target)) return

    const counter = { val: 0 }
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        val: target,
        duration: 1.25,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 95%',
          once: true,
        },
        onUpdate: () => {
          if (hasThousandDot) {
            setDisplay(`${prefix}${Math.round(counter.val).toLocaleString('tr-TR')}${suffix}`)
          } else if (hasCommaDecimal) {
            setDisplay(`${prefix}${counter.val.toFixed(1).replace('.', ',')}${suffix}`)
          } else {
            setDisplay(`${prefix}${Math.round(counter.val)}${suffix}`)
          }
        },
        onComplete: () => setDisplay(value),
      })
    }, ref)

    return () => ctx.revert()
  }, [value])

  return (
    <div ref={ref}>
      <div className="font-mono text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
        {display}
      </div>
      <div className="mt-1 text-xs text-slate-500">{label}</div>
    </div>
  )
}

export function ReferenceMarquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items]
  return (
    <div
      className="relative overflow-hidden py-2"
      style={{
        maskImage:
          'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
      }}
    >
      <div className="animate-marquee flex w-max items-center gap-3">
        {doubled.map((item, idx) => (
          <span
            key={`${item}-${idx}`}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-4 py-1.5 text-[13px] font-medium text-slate-700 shadow-2xs"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
            <span>{item}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
