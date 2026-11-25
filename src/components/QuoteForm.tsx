'use client'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { Textarea } from '@/components/ui/textarea'
import { buildWhatsappUrl } from '@/lib/types'
import { ArrowRight01Icon, CheckmarkCircle02Icon, WhatsappIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import React, { useState } from 'react'
import { ThinkingOrb } from 'thinking-orbs'

export function QuoteForm({
  whatsappNumber,
  defaultService = 'Yerinde Su Analizi & Keşif',
}: {
  whatsappNumber: string
  defaultService?: string
}) {
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [district, setDistrict] = useState('')
  const [serviceType, setServiceType] = useState(defaultService)
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setFeedback(null)

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, phone, district, serviceType, message }),
      })
      const data = (await res.json()) as { message?: string; error?: string }

      if (!res.ok) {
        setFeedback({
          type: 'error',
          text: data.error || 'Talep gönderilemedi. Lütfen tekrar deneyin.',
        })
      } else {
        setFeedback({
          type: 'success',
          text:
            data.message || 'Talebiniz yönetim panelimize ulaştı. Aynı gün içinde sizi arayacağız.',
        })
        setFullName('')
        setPhone('')
        setDistrict('')
        setMessage('')
      }
    } catch {
      setFeedback({
        type: 'error',
        text: 'Bağlantı hatası oluştu. Dilerseniz doğrudan WhatsApp üzerinden yazabilirsiniz.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  const directWaUrl = buildWhatsappUrl(
    whatsappNumber,
    `Merhaba, ${serviceType} için ücretsiz keşif ve fiyat bilgisi almak istiyorum.${
      district ? ` Bölge: ${district}.` : ''
    }`,
  )

  return (
    <Card id="kesif-formu" className="quote-panel">
      <CardHeader>
        <h2 id="quote-heading">Keşif talebi</h2>
        <CardDescription>Telefon numaranızı bırakın, randevu için sizi arayalım.</CardDescription>
      </CardHeader>
      <CardContent>
        {feedback && (
          <Alert
            className="mb-4"
            variant={feedback.type === 'error' ? 'destructive' : 'default'}
            role={feedback.type === 'error' ? 'alert' : 'status'}
          >
            {feedback.type === 'success' && (
              <HugeiconsIcon icon={CheckmarkCircle02Icon} size={20} aria-hidden="true" />
            )}
            <AlertDescription>{feedback.text}</AlertDescription>
          </Alert>
        )}

        <form
          onSubmit={handleSubmit}
          method="post"
          action="/api/quote"
          className="quote-fields"
          aria-labelledby="quote-heading"
        >
          <Field className="gap-1.5">
            <FieldLabel htmlFor="quote-name">
              Ad soyad <span aria-hidden="true">*</span>
            </FieldLabel>
            <Input
              id="quote-name"
              name="fullName"
              autoComplete="name"
              required
              className="field-control"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </Field>
          <Field className="gap-1.5">
            <FieldLabel htmlFor="quote-phone">
              Telefon <span aria-hidden="true">*</span>
            </FieldLabel>
            <Input
              id="quote-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              className="field-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Field>
          <Field className="gap-1.5">
            <FieldLabel htmlFor="quote-district">İl / ilçe</FieldLabel>
            <Input
              id="quote-district"
              name="district"
              placeholder="Gölcük / Kocaeli"
              className="field-control"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            />
          </Field>
          <Field className="gap-1.5">
            <FieldLabel htmlFor="quote-service">İlgilendiğiniz sistem</FieldLabel>
            <NativeSelect
              id="quote-service"
              name="serviceType"
              className="field-control"
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
            >
              {!services.some(([value]) => value === defaultService) && (
                <NativeSelectOption value={defaultService}>{defaultService}</NativeSelectOption>
              )}
              {services.map(([value, label]) => (
                <NativeSelectOption key={value} value={value}>
                  {label}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </Field>
          <Field className="form-wide gap-1.5">
            <FieldLabel htmlFor="quote-message">
              Eklemek istediğiniz not <span className="optional-label">(isteğe bağlı)</span>
            </FieldLabel>
            <Textarea
              id="quote-message"
              name="message"
              rows={3}
              className="field-control"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Field>
          <div className="action-row form-wide">
            <Button type="submit" variant="default" disabled={submitting}>
              {submitting ? 'Gönderiliyor…' : 'Keşif talebi gönder'}
              {submitting ? (
                <ThinkingOrb state="working" size={20} theme="dark" aria-hidden="true" />
              ) : (
                <HugeiconsIcon icon={ArrowRight01Icon} size={17} aria-hidden="true" />
              )}
            </Button>
            <Button variant="outline" asChild>
              <a href={directWaUrl} target="_blank" rel="noopener noreferrer">
                <HugeiconsIcon icon={WhatsappIcon} size={18} aria-hidden="true" /> WhatsApp&apos;tan
                yaz
              </a>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

const services = [
  ['Yerinde Su Analizi & Keşif', 'Yerinde su analizi ve keşif'],
  ['Evsel 5 Aşamalı RO Sistemi', 'Evsel su arıtma'],
  ['Kurumsal / Kafe / Ofis RO Sistemi', 'Kurumsal su arıtma'],
  ['Reçineli Su Yumuşatma Sistemi', 'Su yumuşatma'],
  ['Periyodik Filtre Değişimi / Bakım', 'Filtre değişimi ve bakım'],
]
