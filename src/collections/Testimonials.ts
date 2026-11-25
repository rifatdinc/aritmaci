import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: {
    singular: 'Müşteri Yorumu',
    plural: 'Müşteri Yorumları',
  },
  admin: {
    useAsTitle: 'author',
    group: 'İçerik Yönetimi',
    defaultColumns: ['author', 'location', 'productName', 'rating', 'order'],
    description: 'Ana sayfada ve referanslarda gösterilecek müşteri deneyimleri.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'author',
          type: 'text',
          label: 'Müşteri Adı / Unvan',
          required: true,
          admin: { width: '50%' },
        },
        {
          name: 'location',
          type: 'text',
          label: 'İlçe / Şehir',
          required: true,
          admin: { width: '50%', placeholder: 'Örn: Gölcük / Kocaeli' },
        },
      ],
    },
    {
      name: 'productName',
      type: 'text',
      label: 'Kurulan Sistem',
      required: true,
      admin: { placeholder: 'Örn: 5 Aşamalı Evsel RO Sistemi' },
    },
    {
      name: 'quote',
      type: 'textarea',
      label: 'Müşteri Yorumu',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'rating',
          type: 'number',
          label: 'Puan (1–5)',
          min: 1,
          max: 5,
          defaultValue: 5,
          admin: { width: '33%' },
        },
        {
          name: 'verified',
          type: 'checkbox',
          label: 'Doğrulanmış Kurulum',
          defaultValue: true,
          admin: { width: '33%' },
        },
        {
          name: 'order',
          type: 'number',
          label: 'Sıralama',
          defaultValue: 10,
          admin: { width: '34%' },
        },
      ],
    },
  ],
}
