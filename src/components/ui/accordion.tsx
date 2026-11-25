'use client'

import { cn } from '@/lib/utils'
import { ArrowDown01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import React from 'react'

export const Accordion = AccordionPrimitive.Root

export function AccordionItem({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn('border-b border-[var(--border)]', className)}
      {...props}
    />
  )
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          'group flex flex-1 items-center justify-between gap-6 py-5 text-left text-base font-medium text-[var(--foreground)] transition-colors duration-150 hover:text-[var(--primary)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] rounded-md',
          className,
        )}
        {...props}
      >
        <span>{children}</span>
        <HugeiconsIcon
          icon={ArrowDown01Icon}
          size={16}
          strokeWidth={1.5}
          className="shrink-0 text-[var(--muted-foreground)] transition-transform duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[state=open]:rotate-180 group-data-[state=open]:text-[var(--foreground)]"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

export function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden text-sm leading-6 text-[var(--text-secondary)] data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn('pb-6 pr-8', className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}
