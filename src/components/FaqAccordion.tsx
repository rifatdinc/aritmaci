'use client'

import { FluidHoverHighlight } from '@/components/fluid-hover-highlight'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  useFluidHover,
  useRegisterFluidHoverItem,
  type UseFluidHoverReturn,
} from '@/hooks/use-fluid-hover'
import { spring } from '@/lib/springs'
import type { FaqDoc } from '@/lib/types'
import { useRef, type CSSProperties } from 'react'

function FaqItem({
  faq,
  index,
  registerItem,
}: {
  faq: FaqDoc
  index: number
  registerItem: UseFluidHoverReturn['registerItem']
}) {
  const ref = useRef<HTMLButtonElement>(null)
  useRegisterFluidHoverItem(registerItem, index, ref)

  return (
    <AccordionItem value={String(faq.id)}>
      <AccordionTrigger ref={ref}>{faq.question}</AccordionTrigger>
      <AccordionContent>{faq.answer}</AccordionContent>
    </AccordionItem>
  )
}

export function FaqAccordion({ faqs }: { faqs: FaqDoc[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const hover = useFluidHover(ref, { axis: 'y', gapClick: false })

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={faqs[0] ? String(faqs[0].id) : undefined}
      ref={ref}
      {...hover.handlers}
      className="faq-list"
      style={{ '--faq-motion-duration': `${spring.moderate.duration}s` } as CSSProperties}
    >
      <FluidHoverHighlight hover={hover} className="fluid-water-hover" />
      {faqs.map((faq, index) => (
        <FaqItem faq={faq} index={index} registerItem={hover.registerItem} key={faq.id} />
      ))}
    </Accordion>
  )
}
