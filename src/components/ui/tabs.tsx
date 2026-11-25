'use client'

import { cn } from '@/lib/utils'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import React from 'react'

export const Tabs = TabsPrimitive.Root

export function TabsList({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={cn(
        'inline-flex flex-wrap items-center gap-1 rounded-full bg-zinc-100 p-1',
        className,
      )}
      {...props}
    />
  )
}

export function TabsTrigger({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        'inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-1.5 text-[13.5px] font-medium text-zinc-500 transition-all cursor-pointer hover:text-zinc-950 data-[state=active]:bg-white data-[state=active]:text-zinc-950 data-[state=active]:shadow-[0_1px_2px_rgba(0,0,0,0.06)]',
        className,
      )}
      {...props}
    />
  )
}

export const TabsContent = TabsPrimitive.Content
