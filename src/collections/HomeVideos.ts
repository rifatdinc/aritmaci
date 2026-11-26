import path from 'node:path'
import { ValidationError, type CollectionConfig } from 'payload'
import { getYouTubeId } from '../lib/youtube'

export const HomeVideos: CollectionConfig = {
  slug: 'home-videos',
  labels: {
    singular: 'Ana Sayfa Videosu',
    plural: 'Ana Sayfa Videoları',
  },
  lockDocuments: false,
  admin: {
    group: 'Medya',
    useAsTitle: 'title',
    defaultColumns: ['title', 'published', 'updatedAt'],
    description: 'Yayındaki videolardan en son kaydedilen ana sayfada görünür.',
  },
  access: {
    read: ({ req }) => (req.user ? true : { published: { equals: true } }),
  },
  upload: {
    staticDir: path.resolve('media', 'home-videos'),
    mimeTypes: ['video/mp4', 'video/webm'],
    filesRequiredOnCreate: false,
  },
  hooks: {
    beforeValidate: [
      ({ data, originalDoc }) => {
        if (!data) return data

        const url = data.youtubeUrl === undefined ? originalDoc?.youtubeUrl : data.youtubeUrl
        const filename = data.filename === undefined ? originalDoc?.filename : data.filename
        if (!filename && !url?.trim()) {
          throw new ValidationError({
            errors: [
              {
                path: 'youtubeUrl',
                message: 'MP4 veya WebM dosyası yükleyin ya da bir YouTube bağlantısı girin.',
              },
            ],
          })
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Video başlığı',
      required: true,
      maxLength: 100,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Kısa açıklama',
      maxLength: 400,
    },
    {
      name: 'youtubeUrl',
      type: 'text',
      label: 'YouTube bağlantısı',
      admin: {
        description:
          'Bir YouTube bağlantısı yazarsanız oynatıcı bu bağlantıyı kullanır. Dosya yükleyecekseniz MP4 veya WebM seçin (en fazla 20 MB).',
      },
      validate: (value: string | null | undefined) =>
        !value?.trim() ||
        Boolean(getYouTubeId(value)) ||
        'Geçerli bir YouTube video bağlantısı girin.',
    },
    {
      name: 'poster',
      type: 'upload',
      relationTo: 'media',
      label: 'Kapak görseli',
      admin: { description: 'Yüklenen video oynatılmadan önce gösterilecek görsel.' },
    },
    {
      name: 'published',
      type: 'checkbox',
      label: 'Ana sayfada yayınla',
      defaultValue: false,
    },
  ],
}
