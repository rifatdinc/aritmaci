import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Yönetici',
    plural: 'Yöneticiler',
  },
  admin: {
    useAsTitle: 'email',
    group: 'Sistem',
    description: 'Yönetim paneline giriş yapabilecek yetkili hesaplar.',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Ad Soyad',
    },
  ],
}
