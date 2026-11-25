'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { FaqDoc } from '@/lib/types'
import React from 'react'

export function FaqAccordion({ faqs }: { faqs: FaqDoc[] }) {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={faqs[0] ? String(faqs[0].id) : undefined}
      className="border-t border-zinc-200"
    >
      {faqs.map((faq) => (
        <AccordionItem key={faq.id} value={String(faq.id)}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
