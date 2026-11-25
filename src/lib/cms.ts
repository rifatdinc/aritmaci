import config from '@/payload.config'
import { getPayload } from 'payload'
import type {
  FaqDoc,
  ProductDoc,
  ReferenceDoc,
  SiteSettingsDoc,
  TestimonialDoc,
} from './types'

export * from './types'

export async function getSiteSettings(): Promise<SiteSettingsDoc> {
  const payload = await getPayload({ config })
  const data = (await payload.findGlobal({
    slug: 'site-settings',
    depth: 1,
  })) as unknown as SiteSettingsDoc

  return {
    companyName: data?.companyName || 'Aritman Su Arıtma Sistemleri',
    logo: data?.logo,
    phoneDisplay: data?.phoneDisplay || '+90 536 554 71 80',
    whatsappNumber: data?.whatsappNumber || '905365547180',
    email: data?.email || 'muratbayram4101@gmail.com',
    address:
      data?.address ||
      'Dumlupınar Mahallesi, Ondokuz Mayıs Caddesi, 46. Sokak No:8 Kat:4, Gölcük / Kocaeli',
    serviceArea: data?.serviceArea || 'Gölcük, Kocaeli ve İstanbul Geneli',
    workingHours: data?.workingHours || 'Hafta içi 09:00 – 18:00 • 7/24 Teknik Destek',
    mapsQuery:
      data?.mapsQuery ||
      'Dumlupınar Mahallesi Ondokuz Mayıs Caddesi 46. Sokak No 8 Kat 4 Gölcük Kocaeli',
    heroEyebrow: data?.heroEyebrow || 'GÖLCÜK / KOCAELİ & İSTANBUL • 20 YILLIK SAHA DENEYİMİ',
    heroTitle:
      data?.heroTitle || 'Eviniz ve işletmeniz için ölçülerek kurulan su arıtma sistemleri.',
    heroSubtitle:
      data?.heroSubtitle ||
      'Kurulum öncesi yerinde su sertliği ve TDS ölçümü yapıyor, NSF ve TSE onaylı filtrelerle evinize veya işletmenize en doğru sistemi kuruyoruz.',
    heroImage: data?.heroImage,
    stats:
      data?.stats && data.stats.length > 0
        ? data.stats
        : [
            { value: '5.000+', label: 'Tamamlanan Ev & Kurum Kurulumu' },
            { value: '20 Yıl', label: 'Kesintisiz Saha ve Servis Deneyimi' },
            { value: '%99,9', label: 'Ters Osmoz Arıtma Verimi' },
            { value: '2 Yıl', label: 'Tam Kapsamlı Garanti & 7/24 Destek' },
          ],
    founderName: data?.founderName || 'Murat Bayram',
    founderRole: data?.founderRole || 'Kurucu & Genel Müdür',
    aboutHeading:
      data?.aboutHeading || '20 yıldır tek işimiz: güvenle içilen, temiz ve dengeli su.',
    aboutBody:
      data?.aboutBody ||
      "Aritman Su Arıtma Sistemleri, 20 yılı aşkın sektör deneyimiyle Gölcük, Kocaeli ve İstanbul genelinde 5.000'den fazla ev, kafe, restoran ve kamu kurumuna profesyonel su arıtma çözümleri sunmuştur.",
    founderBio:
      data?.founderBio ||
      '20 yıllık saha tecrübesiyle doğru keşif, temiz montaj işçiliği ve düzenli filtre takibi.',
  }
}

export async function getProducts(): Promise<ProductDoc[]> {
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'products',
    sort: 'order',
    limit: 50,
    depth: 1,
  })
  return res.docs as unknown as ProductDoc[]
}

export async function getProductBySlug(slug: string): Promise<ProductDoc | null> {
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })
  return (res.docs[0] as unknown as ProductDoc) || null
}

export async function getReferences(): Promise<ReferenceDoc[]> {
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'references',
    sort: 'order',
    limit: 100,
    depth: 1,
  })
  return res.docs as unknown as ReferenceDoc[]
}

export async function getTestimonials(): Promise<TestimonialDoc[]> {
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'testimonials',
    sort: 'order',
    limit: 20,
    depth: 0,
  })
  return res.docs as unknown as TestimonialDoc[]
}

export async function getFaqs(): Promise<FaqDoc[]> {
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'faqs',
    sort: 'order',
    limit: 50,
    depth: 0,
  })
  return res.docs as unknown as FaqDoc[]
}
