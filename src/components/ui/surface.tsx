import { cn } from '@/lib/utils'
import React from 'react'

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)]',
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
    neutral: 'bg-[var(--surface-raised)] text-[var(--text-secondary)]',
    outline: 'border border-[var(--border)] bg-[var(--card)] text-[var(--text-secondary)]',
    dark: 'bg-[var(--surface-dark)] text-[var(--dark-foreground)]',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-normal',
        styles[variant],
        className,
      )}
      {...props}
    />
  )
}
