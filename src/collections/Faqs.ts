import type { CollectionConfig } from 'payload'

export const Faqs: CollectionConfig = {
  slug: 'faqs',
  labels: {
    singular: 'Soru & Cevap',
    plural: 'Sık Sorulan Sorular',
  },
  admin: {
    useAsTitle: 'question',
    group: 'İçerik Yönetimi',
    defaultColumns: ['question', 'order'],
    description: 'Müşterilerin en sık sorduğu sorular ve yanıtları.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      label: 'Soru',
      required: true,
    },
    {
      name: 'answer',
      type: 'textarea',
      label: 'Cevap',
      required: true,
    },
    {
      name: 'order',
      type: 'number',
      label: 'Sıralama',
      defaultValue: 10,
    },
  ],
}
