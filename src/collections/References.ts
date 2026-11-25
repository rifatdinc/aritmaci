import type { CollectionConfig } from 'payload'

export const References: CollectionConfig = {
  slug: 'references',
  labels: {
    singular: 'Referans / Montaj',
    plural: 'Referanslar & Montajlar',
  },
  admin: {
    useAsTitle: 'name',
    group: 'İçerik Yönetimi',
    defaultColumns: ['name', 'sector', 'city', 'featured', 'order'],
    description: 'Kurumsal referanslar ve fotoğraflı montaj uygulamaları.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Kurum veya Proje Adı',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'sector',
          type: 'select',
          label: 'Sektör / Kategori',
          required: true,
          defaultValue: 'kafe-restoran',
          options: [
            { label: 'Kamu & Medya', value: 'kamu-medya' },
            { label: 'Belediye Kurumu', value: 'belediye' },
            { label: 'Kafe & Restoran', value: 'kafe-restoran' },
            { label: 'Evsel Montaj', value: 'evsel-montaj' },
          ],
          admin: { width: '50%' },
        },
        {
          name: 'city',
          type: 'text',
          label: 'Şehir / İlçe',
          required: true,
          admin: {
            width: '50%',
            placeholder: 'Örn: Kocaeli / Başiskele',
          },
        },
      ],
    },
    {
      name: 'service',
      type: 'text',
      label: 'Yapılan Uygulama',
      defaultValue: 'Profesyonel Su Arıtma Sistemi Kurulumu',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Kısa Açıklama',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Montaj Fotoğrafı (Opsiyonel)',
      admin: {
        description: 'Yüklediğiniz fotoğraf Referanslar sayfasında galeri kartı olarak görünür.',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'featured',
          type: 'checkbox',
          label: 'Ana Sayfada Öne Çıkar',
          defaultValue: false,
          admin: { width: '50%' },
        },
        {
          name: 'order',
          type: 'number',
          label: 'Sıralama',
          defaultValue: 10,
          admin: { width: '50%' },
        },
      ],
    },
  ],
}
