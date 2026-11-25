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
    'h-10 w-full rounded-lg border border-[var(--input)] bg-[var(--background)] px-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] transition-colors duration-150 focus:border-[var(--primary)] focus:bg-[var(--card)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/20'

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8">
      <h3 className="text-xl font-medium text-[var(--foreground)]">
        Ücretsiz keşif ve teklif formu
      </h3>
      <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
        Bilgilerinizi bırakın, aynı gün içinde sizi arayıp su analizi ve uygun sistem için bilgi
        verelim.
      </p>

      {feedback && (
        <div
          role="status"
          className={`mt-6 flex items-start gap-3 rounded-lg border px-4 py-3 text-sm ${
            feedback.type === 'success'
              ? 'border-[var(--positive)]/25 bg-[var(--positive-soft)] text-[var(--foreground)]'
              : 'border-[var(--negative)]/25 bg-[var(--negative-soft)] text-[var(--negative)]'
          }`}
        >
          {feedback.type === 'success' && (
            <HugeiconsIcon
              icon={CheckmarkCircle02Icon}
              size={16}
              strokeWidth={1.5}
              className="mt-0.5 shrink-0 text-[var(--positive)]"
            />
          )}
          <span>{feedback.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="quote-name"
              className="mb-2 block text-xs font-medium text-[var(--text-secondary)]"
            >
              Ad soyad *
            </label>
            <input
              id="quote-name"
              type="text"
              required
              placeholder="Ad soyad"
              className={inputCls}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="quote-phone"
              className="mb-2 block text-xs font-medium text-[var(--text-secondary)]"
            >
              Telefon *
            </label>
            <input
              id="quote-phone"
              type="tel"
              required
              placeholder="0536 000 00 00"
              className={`${inputCls} font-mono tabular-nums`}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="quote-district"
              className="mb-2 block text-xs font-medium text-[var(--text-secondary)]"
            >
              İl / ilçe
            </label>
            <input
              id="quote-district"
              type="text"
              placeholder="Gölcük / Kocaeli"
              className={inputCls}
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="quote-service"
              className="mb-2 block text-xs font-medium text-[var(--text-secondary)]"
            >
              İlgilendiğiniz sistem
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
              <option value="Yerinde Su Analizi & Keşif">Yerinde Su Analizi ve Keşif</option>
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="quote-message"
            className="mb-2 block text-xs font-medium text-[var(--text-secondary)]"
          >
            Kısa not (isteğe bağlı)
          </label>
          <textarea
            id="quote-message"
            rows={4}
            placeholder="Mutfak dolabı, işletme kapasitesi veya uygun olduğunuz saat aralığı"
            className="w-full rounded-lg border border-[var(--input)] bg-[var(--background)] p-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] transition-colors duration-150 focus:border-[var(--primary)] focus:bg-[var(--card)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/20"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button type="submit" variant="ocean" size="md" disabled={submitting}>
            {submitting ? 'Gönderiliyor' : 'Keşif talebi gönder'}
          </Button>
          <Button variant="outline" size="md" asChild>
            <a href={directWaUrl} target="_blank" rel="noopener noreferrer">
              <span>WhatsApp&apos;tan yaz</span>
              <HugeiconsIcon icon={ArrowUpRight01Icon} size={16} strokeWidth={1.5} />
            </a>
          </Button>
        </div>
      </form>
    </div>
  )
}
