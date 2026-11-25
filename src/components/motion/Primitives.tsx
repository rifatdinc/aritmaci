'use client'

import { cn } from '@/lib/utils'
import React from 'react'

/**
 * Quiet layout wrapper (replaces heavy scroll-fly-in animations so sections read steadily).
 */
export function BlurFade({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  yOffset?: number
}) {
  return <div className={className}>{children}</div>
}

/**
 * Quiet raised card surface with hairline border — no mouse-tracking radial glow.
 */
export function SpotlightCard({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
  spotlightColor?: string
}) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] transition-colors duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[var(--border-strong)]',
        className,
      )}
    >
      {children}
    </div>
  )
}

/**
 * Tabular-nums metric block without distracting scroll counters.
 */
export function AnimatedStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-mono text-[28px] font-medium leading-none tabular-nums text-[var(--foreground)] sm:text-[32px]">
        {value}
      </div>
      <div className="mt-2 text-xs leading-4 text-[var(--muted-foreground)]">{label}</div>
    </div>
  )
}

/**
 * Static typographic reference roster — replaces infinite looping marquee pills.
 */
export function ReferenceMarquee({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[var(--text-secondary)]">
      {items.map((item) => (
        <li key={item} className="inline-flex items-center gap-2">
          <span className="h-1 w-1 rounded-full bg-[var(--border-strong)]" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
