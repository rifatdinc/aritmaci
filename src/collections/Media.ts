import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Medya Dosyası',
    plural: 'Medya & Fotoğraflar',
  },
  admin: {
    group: 'Medya',
    description: 'Ürün fotoğrafları, montaj görselleri ve firma logosu.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Görsel Açıklaması (SEO)',
      required: true,
    },
  ],
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 900,
        height: 675,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1600,
        height: 900,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
  },
}
