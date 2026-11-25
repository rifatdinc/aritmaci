'use client'

import { FluidHoverHighlight } from '@/components/fluid-hover-highlight'
import { FieldLabel } from '@/components/ui/field'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  useFluidHover,
  useRegisterFluidHoverItem,
  type UseFluidHoverReturn,
} from '@/hooks/use-fluid-hover'
import { spring } from '@/lib/springs'
import { motion, MotionConfig } from 'motion/react'
import { useId, useRef, type ReactNode } from 'react'

type Choice = { value: string; label: string; icon?: ReactNode }

function ChoiceCard({
  choice,
  index,
  id,
  selected,
  indicator,
  registerItem,
}: {
  choice: Choice
  index: number
  id: string
  selected: boolean
  indicator: string
  registerItem: UseFluidHoverReturn['registerItem']
}) {
  const ref = useRef<HTMLLabelElement>(null)
  useRegisterFluidHoverItem(registerItem, index, ref)
  const radio = <RadioGroupItem id={id} value={choice.value} />

  return (
    <FieldLabel
      ref={ref}
      htmlFor={id}
      className={choice.icon ? 'tool-option' : 'tool-option compact-option'}
    >
      {selected && (
        <motion.span
          layoutId={indicator}
          transition={spring.moderate}
          className="fluid-choice-indicator"
          aria-hidden="true"
        />
      )}
      {choice.icon ? (
        <span className="option-icons">
          {choice.icon}
          {radio}
        </span>
      ) : (
        radio
      )}
      <span className="fluid-choice-label">{choice.label}</span>
    </FieldLabel>
  )
}

export function FluidChoiceGroup({
  labelledBy,
  options,
  value,
  onValueChange,
}: {
  labelledBy: string
  options: Choice[]
  value: string
  onValueChange: (value: string) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const indicator = useId()
  const hover = useFluidHover(ref, { axis: 'x', nearest: true, gapClick: { maxDistance: 5 } })

  return (
    <MotionConfig reducedMotion="user">
      <RadioGroup
        ref={ref}
        {...hover.handlers}
        aria-labelledby={labelledBy}
        value={value}
        onValueChange={onValueChange}
        className="option-group fluid-choice-group"
      >
        <FluidHoverHighlight hover={hover} className="fluid-water-hover" />
        {options.map((choice, index) => (
          <ChoiceCard
            key={choice.value}
            choice={choice}
            index={index}
            id={`${indicator}-${choice.value}`}
            selected={choice.value === value}
            indicator={indicator}
            registerItem={hover.registerItem}
          />
        ))}
      </RadioGroup>
    </MotionConfig>
  )
}
