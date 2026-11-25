export interface MediaItem {
  id: number | string
  url?: string | null
  alt?: string | null
  width?: number | null
  height?: number | null
}

export interface ProductDoc {
  id: number | string
  title: string
  slug: string
  category: 'evsel' | 'kurumsal' | 'yumusatma' | 'filtre'
  badge?: string | null
  image?: MediaItem | number | string | null
  summary: string
  description?: string | null
  capacity?: string | null
  stages?: string | null
  warranty?: string | null
  priceNote?: string | null
  features?: { id?: string | null; text: string }[] | null
  featured?: boolean | null
  order?: number | null
}

export interface ReferenceDoc {
  id: number | string
  name: string
  sector: 'kamu-medya' | 'belediye' | 'kafe-restoran' | 'evsel-montaj'
  city: string
  service: string
  description?: string | null
  image?: MediaItem | number | string | null
  featured?: boolean | null
  order?: number | null
}

export interface TestimonialDoc {
  id: number | string
  author: string
  location: string
  productName: string
  quote: string
  rating?: number | null
  verified?: boolean | null
  order?: number | null
}

export interface FaqDoc {
  id: number | string
  question: string
  answer: string
  order?: number | null
}

export interface SiteSettingsDoc {
  companyName: string
  logo?: MediaItem | number | string | null
  phoneDisplay: string
  whatsappNumber: string
  email?: string | null
  address?: string | null
  serviceArea?: string | null
  workingHours?: string | null
  mapsQuery?: string | null
  heroEyebrow?: string | null
  heroTitle: string
  heroSubtitle?: string | null
  heroImage?: MediaItem | number | string | null
  stats?: { id?: string | null; value: string; label: string }[] | null
  founderName?: string | null
  founderRole?: string | null
  aboutHeading?: string | null
  aboutBody?: string | null
  founderBio?: string | null
}

export const CATEGORY_LABELS: Record<ProductDoc['category'], string> = {
  evsel: 'Evsel Su Arıtma',
  kurumsal: 'Kurumsal & Kafe',
  yumusatma: 'Su Yumuşatma',
  filtre: 'Filtre & Bakım',
}

export const PRODUCT_IMAGES: Record<ProductDoc['category'], string> = {
  evsel: '/images/evsel-ro.jpg',
  kurumsal: '/images/kurumsal-ro.jpg',
  yumusatma: '/images/yumusatma.jpg',
  filtre: '/images/filtre-seti.jpg',
}

export const SECTOR_LABELS: Record<ReferenceDoc['sector'], string> = {
  'kamu-medya': 'Kamu & Medya',
  belediye: 'Belediye Kurumu',
  'kafe-restoran': 'Kafe & Restoran',
  'evsel-montaj': 'Evsel Montaj',
}

export function getMediaUrl(
  media: MediaItem | number | string | null | undefined,
  fallback?: string,
): string {
  if (media && typeof media === 'object' && media.url) {
    return media.url
  }
  return fallback || '/images/evsel-ro.jpg'
}

export function buildWhatsappUrl(whatsappNumber: string, text: string): string {
  const clean = (whatsappNumber || '905365547180').replace(/\D/g, '')
  return `https://wa.me/${clean}?text=${encodeURIComponent(text)}`
}
