'use client'

import { Button } from '@/components/ui/button'
import { buildWhatsappUrl } from '@/lib/types'
import { ArrowUpRight01Icon, CheckmarkCircle02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import React, { useState } from 'react'

export function QuoteForm({
  whatsappNumber,
  defaultService = 'Evsel 5 Aşamalı RO Sistemi',
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
            data.message ||
            'Talebiniz yönetim panelimize ulaştı. Aynı gün içinde sizi arayacağız.',
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

  const inputCls =
    'h-11 w-full rounded-xl border border-zinc-200 bg-white px-3.5 text-sm text-zinc-950 placeholder:text-zinc-400 transition-colors focus:border-zinc-950 focus:outline-none'

  return (
    <div className="rounded-3xl border border-zinc-200/90 bg-white p-6 sm:p-9">
      <h3 className="text-xl font-semibold tracking-tight text-zinc-950">
        Ücretsiz Keşif &amp; Teklif Formu
      </h3>
      <p className="mt-1.5 text-sm text-zinc-500">
        Bilgilerinizi bırakın, aynı gün içinde sizi arayıp su analizi ve uygun sistem için bilgi
        verelim.
      </p>

      {feedback && (
        <div
          role="status"
          className={`mt-5 flex items-start gap-2.5 rounded-xl border px-4 py-3 text-sm ${
            feedback.type === 'success'
              ? 'border-zinc-200 bg-zinc-50 text-zinc-950'
              : 'border-rose-200 bg-rose-50 text-rose-800'
          }`}
        >
          {feedback.type === 'success' && (
            <HugeiconsIcon icon={CheckmarkCircle02Icon} size={17} className="mt-0.5 shrink-0" />
          )}
          <span>{feedback.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="quote-name" className="mb-1.5 block text-xs font-medium text-zinc-500">
              Ad Soyad *
            </label>
            <input
              id="quote-name"
              type="text"
              required
              placeholder="Örn: Ahmet Yılmaz"
              className={inputCls}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="quote-phone" className="mb-1.5 block text-xs font-medium text-zinc-500">
              Telefon *
            </label>
            <input
              id="quote-phone"
              type="tel"
              required
              placeholder="05XX XXX XX XX"
              className={inputCls}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="quote-district"
              className="mb-1.5 block text-xs font-medium text-zinc-500"
            >
              İl / İlçe
            </label>
            <input
              id="quote-district"
              type="text"
              placeholder="Örn: Gölcük / Kocaeli"
              className={inputCls}
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="quote-service"
              className="mb-1.5 block text-xs font-medium text-zinc-500"
            >
              İlgilendiğiniz Sistem
            </label>
            <select
              id="quote-service"
              className={inputCls}
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
            >
              <option value="Evsel 5 Aşamalı RO Sistemi">Evsel 5 Aşamalı RO Sistemi</option>
              <option value="Kurumsal / Kafe / Ofis RO Sistemi">Kurumsal / Kafe / Ofis RO</option>
              <option value="Reçineli Su Yumuşatma Sistemi">Reçineli Su Yumuşatma</option>
              <option value="Periyodik Filtre Değişimi / Bakım">Periyodik Filtre Değişimi</option>
              <option value="Yerinde Su Analizi & Keşif">Yerinde Su Analizi &amp; Keşif</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="quote-message" className="mb-1.5 block text-xs font-medium text-zinc-500">
            Kısa Notunuz (Opsiyonel)
          </label>
          <textarea
            id="quote-message"
            rows={4}
            placeholder="Mutfak dolap yapınız, işletme kapasiteniz veya uygun olduğunuz saat aralığı..."
            className="w-full rounded-xl border border-zinc-200 bg-white p-3.5 text-sm text-zinc-950 placeholder:text-zinc-400 transition-colors focus:border-zinc-950 focus:outline-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 pt-2">
          <Button type="submit" variant="ocean" size="md" disabled={submitting}>
            {submitting ? 'Gönderiliyor...' : 'Keşif Talebi Gönder'}
          </Button>
          <Button variant="whatsapp" size="md" asChild>
            <a href={directWaUrl} target="_blank" rel="noopener noreferrer">
              <span>WhatsApp&apos;tan Yaz</span>
              <HugeiconsIcon icon={ArrowUpRight01Icon} size={15} strokeWidth={1.8} />
            </a>
          </Button>
        </div>
      </form>
    </div>
  )
}
