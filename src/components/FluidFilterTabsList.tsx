'use client'

import { FluidHoverHighlight } from '@/components/fluid-hover-highlight'
import { TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  useFluidHover,
  useRegisterFluidHoverItem,
  type UseFluidHoverReturn,
} from '@/hooks/use-fluid-hover'
import { spring } from '@/lib/springs'
import { motion, MotionConfig } from 'motion/react'
import { useId, useRef, type ReactNode } from 'react'

type FilterTab = { value: string; label: ReactNode }

function FilterTrigger({
  tab,
  index,
  selected,
  indicator,
  registerItem,
}: {
  tab: FilterTab
  index: number
  selected: boolean
  indicator: string
  registerItem: UseFluidHoverReturn['registerItem']
}) {
  const ref = useRef<HTMLButtonElement>(null)
  useRegisterFluidHoverItem(registerItem, index, ref)

  return (
    <TabsTrigger ref={ref} value={tab.value}>
      {selected && (
        <motion.span
          layoutId={indicator}
          transition={spring.moderate}
          aria-hidden="true"
          className="fluid-filter-indicator"
        />
      )}
      <span className="fluid-filter-label">{tab.label}</span>
    </TabsTrigger>
  )
}

export function FluidFilterTabsList({
  label,
  tabs,
  value,
}: {
  label: string
  tabs: FilterTab[]
  value: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const indicator = useId()
  const hover = useFluidHover(ref, { axis: 'x', nearest: true, gapClick: { maxDistance: 6 } })

  return (
    <MotionConfig reducedMotion="user">
      <TabsList
        asChild
        ref={ref}
        {...hover.handlers}
        aria-label={label}
        className="filter-list fluid-filter-list"
      >
        <motion.div layoutScroll>
          <FluidHoverHighlight hover={hover} className="fluid-water-hover" />
          {tabs.map((tab, index) => (
            <FilterTrigger
              key={tab.value}
              tab={tab}
              index={index}
              selected={tab.value === value}
              indicator={indicator}
              registerItem={hover.registerItem}
            />
          ))}
        </motion.div>
      </TabsList>
    </MotionConfig>
  )
}
