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
      className={cn('border-b border-zinc-200', className)}
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
          'group flex flex-1 items-center justify-between gap-6 py-5 text-left text-[15.5px] font-medium text-zinc-950 transition-colors hover:text-zinc-600 cursor-pointer',
          className,
        )}
        {...props}
      >
        <span>{children}</span>
        <HugeiconsIcon
          icon={ArrowDown01Icon}
          size={17}
          strokeWidth={1.75}
          className="shrink-0 text-zinc-400 transition-transform duration-200 group-data-[state=open]:rotate-180 group-data-[state=open]:text-zinc-950"
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
      className="overflow-hidden text-[14.5px] leading-relaxed text-zinc-500 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn('pb-6 pr-8', className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}
