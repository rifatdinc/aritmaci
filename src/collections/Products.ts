import type { CollectionConfig } from 'payload'

function slugifyTurkish(input: string): string {
  const map: Record<string, string> = {
    ç: 'c',
    Ç: 'c',
    ğ: 'g',
    Ğ: 'g',
    ı: 'i',
    İ: 'i',
    ö: 'o',
    Ö: 'o',
    ş: 's',
    Ş: 's',
    ü: 'u',
    Ü: 'u',
  }
  return input
    .split('')
    .map((ch) => map[ch] ?? ch)
    .join('')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const Products: CollectionConfig = {
  slug: 'products',
  labels: {
    singular: 'Ürün / Cihaz',
    plural: 'Ürünler & Cihazlar',
  },
  admin: {
    useAsTitle: 'title',
    group: 'İçerik Yönetimi',
    defaultColumns: ['title', 'category', 'capacity', 'featured', 'order'],
    description: 'Sitede listelenen evsel, kurumsal su arıtma cihazları ve filtre sistemleri.',
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data && !data.slug && data.title) {
          data.slug = slugifyTurkish(String(data.title))
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Ürün Adı',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'URL Kısa Adı',
      unique: true,
      index: true,
      admin: {
        description: 'Boş bırakırsanız ürün adından otomatik oluşturulur (örn: evsel-ro-cihazi).',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'category',
          type: 'select',
          label: 'Kategori',
          required: true,
          defaultValue: 'evsel',
          options: [
            { label: 'Evsel Su Arıtma', value: 'evsel' },
            { label: 'Kurumsal & Kafe RO', value: 'kurumsal' },
            { label: 'Su Yumuşatma Sistemleri', value: 'yumusatma' },
            { label: 'Filtre & Bakım Setleri', value: 'filtre' },
          ],
          admin: { width: '50%' },
        },
        {
          name: 'badge',
          type: 'text',
          label: 'Öne Çıkan Etiket (Opsiyonel)',
          admin: {
            width: '50%',
            placeholder: 'Örn: En Çok Tercih Edilen',
          },
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Ürün Fotoğrafı',
    },
    {
      name: 'summary',
      type: 'textarea',
      label: 'Kısa Özet',
      required: true,
      admin: {
        description: 'Ürün kartında görünecek 1–2 cümlelik özet.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Detaylı Açıklama',
      admin: {
        description: 'Ürün detay sayfasında görünecek kapsamlı açıklama.',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'capacity',
          type: 'text',
          label: 'Kapasite',
          admin: {
            width: '33%',
            placeholder: 'Örn: 60 L / gün',
          },
        },
        {
          name: 'stages',
          type: 'text',
          label: 'Filtrasyon Yapısı',
          admin: {
            width: '33%',
            placeholder: 'Örn: 5 Aşamalı RO',
          },
        },
        {
          name: 'warranty',
          type: 'text',
          label: 'Garanti & Destek',
          defaultValue: '2 Yıl Tam Garanti',
          admin: { width: '34%' },
        },
      ],
    },
    {
      name: 'priceNote',
      type: 'text',
      label: 'Fiyat / Teklif Notu',
      defaultValue: 'Ücretsiz keşif ve montaj dahil — WhatsApp ile fiyat alın',
    },
    {
      name: 'features',
      type: 'array',
      label: 'Teknik Özellikler ve Filtre Aşamaları',
      labels: {
        singular: 'Özellik',
        plural: 'Özellikler',
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Madde',
          required: true,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'featured',
          type: 'checkbox',
          label: 'Ana Sayfada Göster',
          defaultValue: true,
          admin: { width: '50%' },
        },
        {
          name: 'order',
          type: 'number',
          label: 'Görüntüleme Sırası',
          defaultValue: 10,
          admin: { width: '50%' },
        },
      ],
    },
  ],
}
