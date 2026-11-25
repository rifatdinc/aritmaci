import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Ayarları',
  admin: {
    group: 'Ayarlar',
    description: 'İletişim bilgileri, ana sayfa başlıkları, firma bilgileri ve istatistikler.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Firma & İletişim',
          fields: [
            {
              name: 'companyName',
              type: 'text',
              label: 'Firma Adı',
              required: true,
              defaultValue: 'Aritman Su Arıtma Sistemleri',
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              label: 'Özel Logo (Opsiyonel)',
              admin: {
                description:
                  'Boş bırakırsanız modern Aritman tipografik logosu kullanılır. Kendi logonuzu yüklemek için seçebilirsiniz.',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'phoneDisplay',
                  type: 'text',
                  label: 'Görünen Telefon',
                  required: true,
                  defaultValue: '+90 536 554 71 80',
                  admin: { width: '33%' },
                },
                {
                  name: 'whatsappNumber',
                  type: 'text',
                  label: 'WhatsApp Numarası (Başında 90 ile)',
                  required: true,
                  defaultValue: '905365547180',
                  admin: { width: '33%' },
                },
                {
                  name: 'email',
                  type: 'email',
                  label: 'E-posta Adresi',
                  defaultValue: 'muratbayram4101@gmail.com',
                  admin: { width: '34%' },
                },
              ],
            },
            {
              name: 'address',
              type: 'textarea',
              label: 'Açık Adres',
              defaultValue:
                'Dumlupınar Mahallesi, Ondokuz Mayıs Caddesi, 46. Sokak No:8 Kat:4, Gölcük / Kocaeli',
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'serviceArea',
                  type: 'text',
                  label: 'Hizmet Bölgesi',
                  defaultValue: 'Gölcük, Kocaeli ve İstanbul Geneli',
                  admin: { width: '50%' },
                },
                {
                  name: 'workingHours',
                  type: 'text',
                  label: 'Çalışma Saatleri',
                  defaultValue: 'Hafta içi 09:00 – 18:00 • 7/24 Teknik Destek',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              name: 'mapsQuery',
              type: 'text',
              label: 'Google Haritalar Adres Sorgusu',
              defaultValue:
                'Dumlupınar Mahallesi Ondokuz Mayıs Caddesi 46. Sokak No 8 Kat 4 Gölcük Kocaeli',
            },
          ],
        },
        {
          label: 'Ana Sayfa Vitrin',
          fields: [
            {
              name: 'heroEyebrow',
              type: 'text',
              label: 'Üst Bilgi Satırı',
              defaultValue: 'KOCAELİ & İSTANBUL • 20 YILLIK SAHA DENEYİMİ',
            },
            {
              name: 'heroTitle',
              type: 'text',
              label: 'Ana Başlık',
              defaultValue: 'Eviniz ve işletmeniz için ölçülerek kurulan su arıtma sistemleri.',
            },
            {
              name: 'heroSubtitle',
              type: 'textarea',
              label: 'Alt Açıklama',
              defaultValue:
                'Kurulum öncesi yerinde su sertliği ve TDS ölçümü yapıyor, NSF ve TSE onaylı filtrelerle evinize veya işletmenize en doğru sistemi kuruyoruz. 2 yıl tam garanti ve düzenli bakım takibi ile yanınızdayız.',
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Ana Sayfa Vitrin Görseli',
            },
            {
              name: 'stats',
              type: 'array',
              label: 'Öne Çıkan Rakamlar',
              maxRows: 4,
              fields: [
                {
                  name: 'value',
                  type: 'text',
                  label: 'Değer',
                  required: true,
                },
                {
                  name: 'label',
                  type: 'text',
                  label: 'Açıklama',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Hakkımızda & Kurucu',
          fields: [
            {
              name: 'founderName',
              type: 'text',
              label: 'Kurucu Adı',
              defaultValue: 'Murat Bayram',
            },
            {
              name: 'founderRole',
              type: 'text',
              label: 'Unvan',
              defaultValue: 'Kurucu & Genel Müdür',
            },
            {
              name: 'aboutHeading',
              type: 'text',
              label: 'Hakkımızda Başlığı',
              defaultValue: '20 yıldır tek işimiz: güvenle içilen, temiz ve dengeli su.',
            },
            {
              name: 'aboutBody',
              type: 'textarea',
              label: 'Hakkımızda Metni',
              defaultValue:
                "Aritman Su Arıtma Sistemleri, 20 yılı aşkın sektör tecrübesiyle Gölcük, Kocaeli ve İstanbul genelinde 5.000'den fazla ev, kafe, restoran ve kamu kurumuna profesyonel su arıtma çözümleri sunmuştur. Her kurulumda şebeke suyunu önceden analiz ediyor, NSF ve TSE onaylı membran ve filtre gruplarıyla uzun ömürlü, sessiz ve bakımı kolay sistemler teslim ediyoruz.",
            },
            {
              name: 'founderBio',
              type: 'textarea',
              label: 'Kurucu Notu',
              defaultValue:
                '20 yıllık saha ve mühendislik tecrübesiyle kurulan Aritman; yalnızca cihaz satmayı değil, kurulum sonrası düzenli filtre bakımı ve 7/24 ulaşılabilir teknik destekle kalıcı müşteri güveni oluşturmayı ilke edinir.',
            },
          ],
        },
      ],
    },
  ],
}
