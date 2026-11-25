import { cn } from '@/lib/utils'
import React from 'react'

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-zinc-200/80 bg-white text-zinc-950',
        className,
      )}
      {...props}
    />
  )
}

export function Badge({
  className,
  variant = 'neutral',
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & {
  variant?: 'neutral' | 'outline' | 'dark'
}) {
  const styles = {
    neutral: 'bg-zinc-100 text-zinc-700',
    outline: 'border border-zinc-200 bg-white text-zinc-700',
    dark: 'bg-zinc-950 text-white',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium tracking-tight',
        styles[variant],
        className,
      )}
      {...props}
    />
  )
}
