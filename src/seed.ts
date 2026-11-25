import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'
import config from './payload.config'

async function seed() {
  const payload = await getPayload({ config })

  console.log('Aritman CMS baslangic verileri yukleniyor...')

  // 1. Admin kullanici (yoksa olustur)
  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@aritman.com.tr'
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'Aritman2026!'
  const existingUsers = await payload.find({
    collection: 'users',
    limit: 1,
  })
  if (existingUsers.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: {
        email: adminEmail,
        password: adminPassword,
        name: 'Murat Bayram',
      },
    })
    console.log(`Yonetici olusturuldu: ${adminEmail}`)
  }

  // 2. Medya gorsellerini yukle (idempotent)
  async function ensureMedia(fileName: string, alt: string) {
    const existing = await payload.find({
      collection: 'media',
      where: { alt: { equals: alt } },
      limit: 1,
    })
    if (existing.docs[0]) return existing.docs[0].id

    const filePath = path.resolve(process.cwd(), 'public/images', fileName)
    if (!fs.existsSync(filePath)) return undefined

    const buffer = fs.readFileSync(filePath)
    const ext = path.extname(fileName).toLowerCase()
    const mimetype = ext === '.png' ? 'image/png' : 'image/jpeg'

    const created = await payload.create({
      collection: 'media',
      data: { alt },
      file: {
        data: buffer,
        mimetype,
        name: fileName,
        size: buffer.length,
      },
    })
    return created.id
  }

  const heroImgId = await ensureMedia(
    'hero-kitchen.jpg',
    'Modern mutfak tezgahında paslanmaz arıtma musluğundan akan temiz içme suyu',
  )
  const evselImgId = await ensureMedia(
    'evsel-ro.jpg',
    'Kapalı kasa 5 aşamalı evsel ters osmoz su arıtma cihazı ve krom musluk',
  )
  const kurumsalImgId = await ensureMedia(
    'kurumsal-ro.jpg',
    'Kafe, restoran ve ofisler için paslanmaz çelik yüksek kapasiteli RO su arıtma sistemi',
  )
  const yumusatmaImgId = await ensureMedia(
    'yumusatma.jpg',
    'Akıllı kontrol panelli reçineli su yumuşatma sistemi',
  )
  const filtreImgId = await ensureMedia(
    'filtre-seti.jpg',
    'NSF ve TSE onaylı 5 aşamalı inline yedek filtre ve membran seti',
  )
  const montajImgId = await ensureMedia(
    'montaj-tezgah-alti.jpg',
    'Mutfak evye altı dolap içine gizli ve temiz su arıtma cihazı montajı',
  )

  // 3. Site Ayarlari
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      companyName: 'Aritman Su Arıtma Sistemleri',
      phoneDisplay: '+90 536 554 71 80',
      whatsappNumber: '905365547180',
      email: 'muratbayram4101@gmail.com',
      address:
        'Dumlupınar Mahallesi, Ondokuz Mayıs Caddesi, 46. Sokak No:8 Kat:4, Gölcük / Kocaeli',
      serviceArea: 'Gölcük, Kocaeli ve İstanbul Geneli',
      workingHours: 'Hafta içi 09:00 – 18:00 • 7/24 Teknik Destek',
      mapsQuery:
        'Dumlupınar Mahallesi Ondokuz Mayıs Caddesi 46. Sokak No 8 Kat 4 Gölcük Kocaeli',
      heroEyebrow: 'Gölcük, Kocaeli ve İstanbul · 20 yıllık saha deneyimi',
      heroTitle: 'Eviniz ve işletmeniz için ölçülerek kurulan su arıtma sistemleri',
      heroSubtitle:
        'Kurulum öncesi yerinde su sertliği ve TDS ölçümü yapıyor, NSF ve TSE onaylı filtrelerle evinize veya işletmenize en doğru sistemi kuruyoruz. 2 yıl tam garanti ve düzenli bakım takibi ile yanınızdayız.',
      heroImage: heroImgId,
      stats: [
        { value: '5.000+', label: 'Tamamlanan ev ve kurum kurulumu' },
        { value: '20 yıl', label: 'Kesintisiz saha ve servis deneyimi' },
        { value: '%99,9', label: 'Ters osmoz arıtma verimi' },
        { value: '2 yıl', label: 'Tam kapsamlı garanti ve 7/24 destek' },
      ],
      founderName: 'Murat Bayram',
      founderRole: 'Kurucu ve Genel Müdür',
      aboutHeading: '20 yıldır tek işimiz: güvenle içilen, temiz ve dengeli su',
      aboutBody:
        "Aritman Su Arıtma Sistemleri, 20 yılı aşkın sektör deneyimiyle Gölcük, Kocaeli ve İstanbul genelinde 5.000'den fazla ev, kafe, restoran ve kamu kurumuna profesyonel su arıtma çözümleri sunmuştur. Her kurulumda şebeke suyunu yerinde analiz ediyor, NSF ve TSE onaylı membran ve filtre gruplarıyla uzun ömürlü, sessiz ve bakımı kolay sistemler teslim ediyoruz.",
      founderBio:
        '20 yıllık su arıtma sektörü tecrübesiyle Aritman’ı kuran Murat Bayram; satıştan ziyade doğru keşif, temiz montaj işçiliği ve kurulum sonrası düzenli filtre takibiyle kalıcı müşteri memnuniyeti oluşturmayı ilke edinir.',
    },
  })

  // 4. Urunler
  const existingProducts = await payload.find({ collection: 'products', limit: 1 })
  if (existingProducts.totalDocs === 0) {
    const productsData = [
      {
        title: 'Evsel 5 Aşamalı Kapalı Kasa RO Sistemi',
        slug: 'evsel-5-asamali-ro-sistemi',
        category: 'evsel' as const,
        badge: 'En Çok Tercih Edilen',
        image: evselImgId,
        summary:
          'Mutfak evye altına gizlenen, 5 aşamalı ters osmoz filtrasyonlu ve paslanmaz musluklu ev tipi içme suyu sistemi.',
        description:
          'Günlük ev kullanımı için tasarlanan kapalı kasa ters osmoz (RO) sistemimiz; pas, tortu, klor, kireç ve ağır metalleri %99,9 oranında giderir. Kompakt gövdesi sayesinde tezgâh altı dolapta minimum yer kaplar, kurulum öncesi su sertliği ve kurulum sonrası TDS testi yapılarak teslim edilir.',
        capacity: '60 – 240 L / gün',
        stages: '5 Aşamalı RO + Tat Düzenleyici',
        warranty: '2 Yıl Tam Garanti',
        priceNote: 'Ücretsiz keşif, montaj ve TDS testi dahil',
        features: [
          { text: '1. Aşama: 5 Mikron Sediment Ön Filtre (tortu, kum, pas tutucu)' },
          { text: '2. Aşama: Granül Aktif Karbon Filtre (klor ve organik koku giderimi)' },
          { text: '3. Aşama: Blok Karbon Filtre (ince partikül ve kimyasal koruma)' },
          { text: '4. Aşama: NSF Onaylı Ters Osmoz (RO) Membran' },
          { text: '5. Aşama: Hindistan Cevizi Kabuğu Post Karbon Tat Düzenleyici' },
          { text: 'Paslanmaz krom arıtma musluğu ve hijyenik basınçlı tank dahil' },
        ],
        featured: true,
        order: 1,
      },
      {
        title: 'Kurumsal İşletme, Kafe & Restoran RO Sistemi',
        slug: 'kurumsal-isletme-ro-sistemi',
        category: 'kurumsal' as const,
        badge: 'Ticari Yüksek Kapasite',
        image: kurumsalImgId,
        summary:
          'Restoran, kafe, çay ocağı, yemek fabrikası ve ofisler için kesintisiz yüksek debili paslanmaz RO çözümü.',
        description:
          'Espresso makineleri, çay kazanları, buz makineleri ve endüstriyel mutfak ekipmanlarını kireçten korurken içecek lezzetini standartlaştırır. TRT yayın merkezleri ve Kocaeli genelindeki onlarca kafe ve belediye biriminde aktif olarak çalışan yüksek verimli sistemlerdir.',
        capacity: '60 – 600 L / saat',
        stages: 'Endüstriyel Çoklu Membran RO',
        warranty: '2 Yıl Garanti + Periyodik Bakım',
        priceNote: 'İşletmenizin tüketimine özel yerinde projelendirme',
        features: [
          { text: 'Saatte 60 litreden 600 litreye kadar ihtiyaca özel kapasite' },
          { text: '304 kalite paslanmaz çelik şasi ve yüksek basınç pompası' },
          { text: 'Kahve, çay ve buz makinelerinde kireç kaynaklı arızaları önler' },
          { text: 'Harici depolama tankı ve kesintisiz hidrofor entegrasyonu' },
          { text: 'Planlı periyodik filtre değişimi ve öncelikli teknik servis' },
        ],
        featured: true,
        order: 2,
      },
      {
        title: 'Akıllı Kontrollü Reçineli Su Yumuşatma Sistemi',
        slug: 'recineli-su-yumusatma-sistemi',
        category: 'yumusatma' as const,
        badge: 'Bina & Villa Girişi',
        image: yumusatmaImgId,
        summary:
          'Daire veya bina girişinde şebeke suyundaki kireci tamamen gideren, akıllı valfli reçineli yumuşatma sistemi.',
        description:
          'Kombi, çamaşır/bulaşık makinesi, duş başlıkları ve tüm tesisatı kireç birikimine karşı korur. Kuvars destek katmanı, aktif karbon ve katyonik reçine yatağı sayesinde su sertliğini otomatik olarak düşürür; akıllı kontrol paneli ile rejenerasyon işlemini kendisi yönetir.',
        capacity: 'Daire, Villa & Tesis Girişi',
        stages: 'Kuvars + Karbon + Katyonik Reçine',
        warranty: '2 Yıl Tam Garanti',
        priceNote: 'Yerinde su sertlik ölçümü sonrası doğru kapasite seçimi',
        features: [
          { text: '1 mm – 5 mm kuvars destek yatağı ile homojen su dağılımı' },
          { text: 'Yüksek kapasiteli katyonik reçine ve aktif karbon katmanı' },
          { text: 'Zaman ve debi kontrollü akıllı dijital valf paneli' },
          { text: 'Kombi, beyaz eşya ve armatürlerin ömrünü uzatır, deterjan tasarrufu sağlar' },
          { text: 'Düşük tuz tüketimi ve otomatik ters yıkama' },
        ],
        featured: true,
        order: 3,
      },
      {
        title: 'Periyodik Filtre Değişim & Bakım Hizmeti',
        slug: 'periyodik-filtre-degisim-bakim',
        category: 'filtre' as const,
        badge: 'Tüm Markalara Uygun',
        image: filtreImgId,
        summary:
          'NSF ve TSE onaylı orijinal filtre setleriyle düzenli bakım, tank dezenfeksiyonu ve TDS performans kontrolü.',
        description:
          'Su arıtma cihazınızın ilk günkü saflıkta ve lezzette su üretmesi için filtrelerin kullanım yoğunluğuna göre 6–12 ayda bir yenilenmesi gerekir. Aritman teknik ekibi yalnızca kendi kurduğu cihazlara değil, piyasadaki tüm standart evsel ve ticari sistemlere yerinde bakım ve TDS ölçümü sağlar.',
        capacity: '6 – 12 Aylık Periyotlar',
        stages: 'TSE & NSF Onaylı Orijinal Set',
        warranty: 'İşçilik & Sızdırmazlık Garantisi',
        priceNote: 'Yerinde değişim, basınç kontrolü ve TDS ölçümü dahil',
        features: [
          { text: 'Orijinal NSF ve TSE onaylı sediment, karbon ve membran filtreler' },
          { text: 'Her bakımda giriş ve çıkış suyu TDS değer ölçümü' },
          { text: 'Tank hava basıncı ayarı ve bağlantı sızdırmazlık kontrolü' },
          { text: 'Müşteriye özel bakım takvimi hatırlatma takibi' },
          { text: 'Kocaeli ve Gölcük genelinde hızlı randevulu servis' },
        ],
        featured: true,
        order: 4,
      },
    ]

    for (const prod of productsData) {
      await payload.create({ collection: 'products', data: prod })
    }
    console.log(`${productsData.length} ürün eklendi.`)
  }

  // 5. Referanslar & Montajlar (Gerçek aritman.com.tr verileri)
  const existingRefs = await payload.find({ collection: 'references', limit: 1 })
  if (existingRefs.totalDocs === 0) {
    const referencesData = [
      {
        name: 'TRT Spor (Ayazağa)',
        sector: 'kamu-medya' as const,
        city: 'İstanbul',
        service: 'Kurumsal Su Arıtma Sistemi Kurulumu',
        description: 'TRT Spor yayın merkezi kafeteryası için profesyonel ters osmoz su arıtma sistemi kurulumu.',
        featured: true,
        order: 1,
      },
      {
        name: 'TRT World (Ulus Merkez)',
        sector: 'kamu-medya' as const,
        city: 'İstanbul',
        service: 'Yemekhane & Kafe Su Arıtma Sistemi',
        description: 'TRT World yayın merkezi yemekhane ve kafe bölümleri için yüksek kapasiteli arıtma çözümü.',
        featured: true,
        order: 2,
      },
      {
        name: 'TRT İstanbul Havalimanı',
        sector: 'kamu-medya' as const,
        city: 'İstanbul',
        service: 'Kurumsal Su Arıtma Sistemi Kurulumu',
        description: 'TRT İstanbul Havalimanı ofis ve kafe alanına profesyonel su arıtma sistemi kurulumu.',
        featured: true,
        order: 3,
      },
      {
        name: 'TRT Film Platoları (Çekmeköy)',
        sector: 'kamu-medya' as const,
        city: 'İstanbul',
        service: 'Hizmet Merkezi Yemekhane & Kafe Sistemi',
        description: 'TRT Çekmeköy hizmet merkezi yemekhane ve kafe alanı için yüksek debili arıtma sistemi.',
        featured: true,
        order: 4,
      },
      {
        name: 'TRT Çocuk (Ulus)',
        sector: 'kamu-medya' as const,
        city: 'İstanbul',
        service: 'Yayın Merkezi Su Arıtma Kurulumu',
        description: 'TRT Çocuk yayın merkezi için hijyenik içme suyu arıtma sistemi kurulumu.',
        featured: false,
        order: 5,
      },
      {
        name: 'Kocaeli Büyükşehir Belediyesi — Bilgi İşlem Dairesi',
        sector: 'belediye' as const,
        city: 'Kocaeli',
        service: 'Kurumsal Su Arıtma Sistemi Kurulumu',
        description: 'Bilgi İşlem Dairesi Başkanlığı personel kullanım alanları için su arıtma sistemi kurulumu.',
        featured: true,
        order: 6,
      },
      {
        name: 'Kocaeli Büyükşehir Belediyesi — Ulaşım Dairesi',
        sector: 'belediye' as const,
        city: 'Kocaeli',
        service: 'Kurumsal Su Arıtma Sistemi Kurulumu',
        description: 'Ulaşım Dairesi Başkanlığı binası için profesyonel arıtma ve periyodik bakım hizmeti.',
        featured: false,
        order: 7,
      },
      {
        name: 'Kocaeli Büyükşehir Belediyesi — Trafik Şube Müdürlüğü',
        sector: 'belediye' as const,
        city: 'Kocaeli',
        service: 'Kurumsal Su Arıtma Sistemi Kurulumu',
        description: 'Trafik Şube Hizmetleri Dairesi Müdürlüğü için profesyonel su arıtma sistemi kurulumu.',
        featured: false,
        order: 8,
      },
      {
        name: 'Kocaeli Büyükşehir — Belde A.Ş.',
        sector: 'belediye' as const,
        city: 'Kocaeli',
        service: 'Kurumsal Su Arıtma Sistemi Kurulumu',
        description: 'Belde A.Ş. işletme ve personel alanlarına yüksek kapasiteli su arıtma kurulumu.',
        featured: false,
        order: 9,
      },
      {
        name: 'Kocaeli Hızır 41 Yemek Fabrikası',
        sector: 'belediye' as const,
        city: 'Kocaeli',
        service: 'Endüstriyel Mutfak Su Arıtma Sistemi',
        description: 'Kocaeli Büyükşehir Belediyesi Hızır 41 Yemek Fabrikası için gıda üretimine uygun yüksek debili sistem.',
        featured: true,
        order: 10,
      },
      {
        name: 'Ali Baba Cafe (Başiskele)',
        sector: 'kafe-restoran' as const,
        city: 'Kocaeli / Başiskele',
        service: 'Kafe & Kahve Makinesi Su Arıtma',
        description: 'Çay, kahve ve mutfak kalitesini koruyan kireç önleyici profesyonel arıtma sistemi kurulumu.',
        featured: false,
        order: 11,
      },
      {
        name: 'Helvacı Ali',
        sector: 'kafe-restoran' as const,
        city: 'Kocaeli',
        service: 'Restoran & Kafe Su Arıtma Kurulumu',
        description: 'Gıda ve içecek hazırlama standartlarına uygun ticari su arıtma sistemi.',
        featured: false,
        order: 12,
      },
      {
        name: 'Değirmendere Lagoon Cafe',
        sector: 'kafe-restoran' as const,
        city: 'Kocaeli / Gölcük',
        service: 'Kafe Su Arıtma Sistemi',
        description: 'Değirmendere sahil işletmesi için yüksek kapasiteli kafe su arıtma çözümü.',
        featured: false,
        order: 13,
      },
      {
        name: 'Naila 1 & Naila 2 Cafe',
        sector: 'kafe-restoran' as const,
        city: 'Kocaeli',
        service: 'Çok Şubeli Kafe Arıtma Kurulumu',
        description: 'Her iki şube için standart su kalitesi sağlayan ticari RO kurulumları.',
        featured: false,
        order: 14,
      },
      {
        name: 'Tramvay Cafe',
        sector: 'kafe-restoran' as const,
        city: 'Kocaeli',
        service: 'Kafe Su Arıtma Sistemi',
        description: 'Sıcak içecek ve buz makineleri için kireç kontrollü arıtma sistemi kurulumu.',
        featured: false,
        order: 15,
      },
      {
        name: 'Packet Burger',
        sector: 'kafe-restoran' as const,
        city: 'Kocaeli',
        service: 'Restoran Su Arıtma Sistemi',
        description: 'Restoran mutfak ve içecek hattı için profesyonel su arıtma kurulumu.',
        featured: false,
        order: 16,
      },
      {
        name: 'Gölcük Evye Altı Kapalı Kasa Montajı',
        sector: 'evsel-montaj' as const,
        city: 'Kocaeli / Gölcük',
        service: 'Tezgâh Altı 5 Aşamalı RO Kurulumu',
        description:
          'Dar evye altı dolap alanında düzenli hortum yerleşimi, açılı kesme vanası ve paslanmaz krom musluk uygulaması.',
        image: montajImgId,
        featured: true,
        order: 17,
      },
      {
        name: 'Başiskele Villa Su Yumuşatma & İçme Suyu Kurulumu',
        sector: 'evsel-montaj' as const,
        city: 'Kocaeli / Başiskele',
        service: 'Bina Girişi Yumuşatma + Mutfak RO',
        description:
          'Bina girişinde akıllı valfli reçineli yumuşatma sistemi ve mutfakta 5 aşamalı içme suyu arıtma uygulaması.',
        image: yumusatmaImgId,
        featured: false,
        order: 18,
      },
    ]

    for (const ref of referencesData) {
      await payload.create({ collection: 'references', data: ref })
    }
    console.log(`${referencesData.length} referans eklendi.`)
  }

  // 6. Musteri Yorumlari
  const existingTestimonials = await payload.find({ collection: 'testimonials', limit: 1 })
  if (existingTestimonials.totalDocs === 0) {
    const testimonialsData = [
      {
        author: 'Selim Karaca',
        location: 'Gölcük / Kocaeli',
        productName: 'Evsel 5 Aşamalı Kapalı Kasa RO Sistemi',
        quote:
          'Önce evimizdeki şebeke suyunun TDS ölçümünü yaptılar, sonra dolap içine tertemiz yerleştirdiler. Tezgâhı çizmeden paslanmaz musluğu taktılar; çayın ve içme suyunun tadı ilk günden belirgin biçimde hafifledi.',
        rating: 5,
        verified: true,
        order: 1,
      },
      {
        author: 'Merve Aydın',
        location: 'Başiskele / Kocaeli',
        productName: 'Reçineli Su Yumuşatma + Mutfak RO',
        quote:
          'Bölgedeki yoğun kireç yüzünden duş camları ve kombimiz sürekli sorun çıkarıyordu. Murat Bey yerinde keşif yapıp doğru kapasitede yumuşatma sistemi kurdu; servis gerektiğinde telefonlarına her zaman ulaşabiliyoruz.',
        rating: 5,
        verified: true,
        order: 2,
      },
      {
        author: 'Kerem Yılmaz (İşletme Sahibi)',
        location: 'İzmit / Kocaeli',
        productName: 'Kurumsal Kafe RO Sistemi',
        quote:
          'Kafemizdeki espresso makinesi ve çay kazanı için kurdurduk. Hem kireç bakımı masrafından kurtulduk hem de filtre değişim zamanı gelmeden kendileri arayıp randevu oluşturuyorlar.',
        rating: 5,
        verified: true,
        order: 3,
      },
    ]

    for (const t of testimonialsData) {
      await payload.create({ collection: 'testimonials', data: t })
    }
    console.log(`${testimonialsData.length} müşteri yorumu eklendi.`)
  }

  // 7. SSS (Mevcut aritman.com.tr sorulari, yazim hatalari tamamen duzeltilmis)
  const existingFaqs = await payload.find({ collection: 'faqs', limit: 1 })
  if (existingFaqs.totalDocs === 0) {
    const faqsData = [
      {
        question: 'Ters Osmoz (RO) teknolojisi nedir, diğer sistemlerden farkı nedir?',
        answer:
          'Ters Osmoz (Reverse Osmosis), suyun yarı geçirgen bir membrandan geçirilerek moleküler düzeyde arıtılmasıdır. Pas, asbest, tortu, klor, kireç, nitrit, nitrat, ağır metal ve mikrobiyolojik kirlilikleri %99,9 oranında uzaklaştırarak yalnızca karbon filtreli sistemlere göre çok daha yüksek saflık sağlar.',
        order: 1,
      },
      {
        question: 'Su arıtma cihazının filtreleri ne sıklıkla değiştirilmelidir?',
        answer:
          'Filtre değişim periyodu şebeke suyunun kirlilik derecesine ve günlük kullanım yoğunluğuna bağlı olarak genellikle 6 ila 12 ay arasındadır. Aritman olarak her kurulum sonrası size özel bakım takvimi oluşturuyor ve düzenli filtre değişim hizmeti sunuyoruz.',
        order: 2,
      },
      {
        question: 'Su arıtma cihazı kurulumu ne kadar sürer?',
        answer:
          'Standart ev ve küçük işletme kurulumları ortalama 1–2 saat içinde tamamlanır. Kurulum sırasında suyun TDS değeri ölçülür, sızdırmazlık kontrolleri yapılır ve cihazın kullanımı ile bakım süreçleri hakkında detaylı bilgilendirme verilir.',
        order: 3,
      },
      {
        question: 'Cihaz ne kadar atık su üretir, çok su israf eder mi?',
        answer:
          'Modern ters osmoz sistemlerimiz yüksek verimli membranlarla 1:2 veya 1:3 oranında çalışır. Yani 1 litre temiz içme suyu üretilirken zararlı maddeler 2–3 litre atık su ile şebeke giderinden uzaklaştırılır. Düzenli filtre bakımı verimliliği her zaman en üst seviyede tutar.',
        order: 4,
      },
      {
        question: 'Arıtılmış su ne kadar süre saklanabilir?',
        answer:
          'Temiz, kapalı ve doğrudan güneş görmeyen cam kaplarda birkaç gün tazeliğini korur. Bununla birlikte Aritman sistemleri ihtiyacınız olduğu anda taze içme suyu ürettiği için suyu doğrudan musluktan taze tüketmeniz önerilir.',
        order: 5,
      },
      {
        question: 'Garanti süresi nedir, garanti kapsamında servis ücreti alınır mı?',
        answer:
          'Tüm Aritman cihazları 2 yıl tam kapsamlı garantiye sahiptir. Garanti süresi boyunca üretim veya cihaz kaynaklı arızalarda ücretsiz servis desteği sağlanır. 7/24 teknik destek hattımız her zaman ulaşılabilirdir; periyodik filtre değişimleri ise şeffaf ve uygun fiyatlarla sunulur.',
        order: 6,
      },
      {
        question: 'Bulunduğumuz bölgenin suyu çok kireçli veya bulanık; hangi sistemi seçmeliyiz?',
        answer:
          'Her bölgenin su karakteri farklıdır. Ücretsiz yerinde keşif hizmetimiz kapsamında uzman ekibimiz şebeke suyunuzun sertlik ve TDS değerini ölçerek eviniz veya işletmeniz için en doğru filtre konfigürasyonunu (RO veya bina girişi yumuşatma) belirler.',
        order: 7,
      },
      {
        question: 'Su arıtma cihazı fiyatları nasıl belirlenir?',
        answer:
          'Fiyatlandırma; sistemin kapasitesine (evsel veya ticari), filtre aşama yapısına, pompalı/pompasız tercihine ve tesisat ihtiyacına göre değişir. Ücretsiz keşif veya WhatsApp üzerinden birkaç kısa bilgi paylaşmanızın ardından kurulum dahil net fiyat teklifi sunuyoruz.',
        order: 8,
      },
    ]

    for (const faq of faqsData) {
      await payload.create({ collection: 'faqs', data: faq })
    }
    console.log(`${faqsData.length} SSS eklendi.`)
  }

  console.log('Seed islemi basariyla tamamlandi.')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed hatasi:', err)
  process.exit(1)
})
