import config from '@/payload.config'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      fullName?: string
      phone?: string
      district?: string
      serviceType?: string
      message?: string
    }

    const fullName = (body.fullName || '').trim()
    const phone = (body.phone || '').trim()
    const district = (body.district || '').trim()
    const serviceType = (body.serviceType || '').trim()
    const message = (body.message || '').trim()

    if (!fullName || !phone) {
      return NextResponse.json(
        { error: 'Lütfen ad soyad ve telefon numaranızı girin.' },
        { status: 400 },
      )
    }

    const payload = await getPayload({ config })
    const created = await payload.create({
      collection: 'quote-requests',
      data: {
        fullName,
        phone,
        district,
        serviceType: serviceType || 'Genel Keşif / Bilgi Talebi',
        message,
        status: 'yeni',
      },
    })

    return NextResponse.json(
      {
        ok: true,
        id: created.id,
        message: 'Talebiniz başarıyla alındı. En kısa sürede sizi arayacağız.',
      },
      { status: 201 },
    )
  } catch (err) {
    console.error('Quote request API error:', err)
    return NextResponse.json(
      { error: 'Talep kaydedilirken bir sorun oluştu. Lütfen WhatsApp veya telefon ile ulaşın.' },
      { status: 500 },
    )
  }
}
