import type { CollectionConfig } from 'payload'

export const QuoteRequests: CollectionConfig = {
  slug: 'quote-requests',
  labels: {
    singular: 'Keşif / Teklif Talebi',
    plural: 'Teklif & Keşif Talepleri',
  },
  admin: {
    useAsTitle: 'fullName',
    group: 'Müşteri Talepleri',
    defaultColumns: ['fullName', 'phone', 'district', 'serviceType', 'status', 'createdAt'],
    description: 'Web sitesindeki iletişim ve teklif formundan gelen müşteri talepleri.',
  },
  access: {
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'fullName',
          type: 'text',
          label: 'Ad Soyad',
          required: true,
          admin: { width: '50%' },
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Telefon Numarası',
          required: true,
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'district',
          type: 'text',
          label: 'İl / İlçe',
          admin: { width: '50%' },
        },
        {
          name: 'serviceType',
          type: 'text',
          label: 'İhtiyaç / Cihaz Tipi',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Müşteri Notu',
    },
    {
      name: 'status',
      type: 'select',
      label: 'Durum',
      defaultValue: 'yeni',
      options: [
        { label: 'Yeni Talep', value: 'yeni' },
        { label: 'Arandı', value: 'arandi' },
        { label: 'Keşif Planlandı', value: 'kesif-planlandi' },
        { label: 'Tamamlandı', value: 'tamamlandi' },
      ],
    },
  ],
}
