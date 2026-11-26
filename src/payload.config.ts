import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { en } from '@payloadcms/translations/languages/en'
import { tr } from '@payloadcms/translations/languages/tr'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Faqs } from './collections/Faqs'
import { HomeVideos } from './collections/HomeVideos'
import { Media } from './collections/Media'
import { Products } from './collections/Products'
import { QuoteRequests } from './collections/QuoteRequests'
import { References } from './collections/References'
import { Testimonials } from './collections/Testimonials'
import { Users } from './collections/Users'
import { SiteSettings } from './globals/SiteSettings'
import { ensureHomeVideos } from './migrations/ensureHomeVideos'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '— Aritman Yönetim Paneli',
    },
  },
  i18n: {
    fallbackLanguage: 'tr',
    supportedLanguages: { tr, en },
  },
  collections: [Products, References, Testimonials, Faqs, QuoteRequests, Media, HomeVideos, Users],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'aritman-dev-secret-change-in-production',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || 'file:./data/aritman.db',
    },
  }),
  onInit: async ({ db }) => {
    if (process.env.NODE_ENV === 'production') await ensureHomeVideos(db)
  },
  sharp,
  plugins: [],
})
