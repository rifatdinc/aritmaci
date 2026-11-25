# Aritman Su Arıtma Sistemleri — Web Sitesi & Türkçe CMS

Next.js 16 + Payload CMS 3 + SQLite ile geliştirilmiş, dış servis bağımlılığı olmayan, tek Docker container üzerinde çalışabilen modern kurumsal web sitesi ve Türkçe yönetim paneli.

## Özellikler
- **Modern, hızlı kurumsal vitrin:** Ana sayfa, kategorili ürün kataloğu (`/urunler`), ürün detay sayfaları (`/urunler/[slug]`), sektör filtreli referanslar (`/referanslar`) ve iletişim/keşif sayfası (`/iletisim`).
- **İnteraktif araçlar:** 2 adımlı Cihaz Seçim Rehberi ve Filtre Bakım Tarihi Hesaplayıcı.
- **%100 Türkçe Yönetim Paneli (`/admin`):**
  - **Ürünler & Cihazlar:** Yeni cihaz ekleme, fotoğraf yükleme, teknik özellik ve kapasite güncelleme.
  - **Referanslar & Montajlar:** Kurumsal referans ve fotoğraflı montaj galerisi yönetimi.
  - **Müşteri Yorumları** & **Sık Sorulan Sorular (SSS)**.
  - **Teklif & Keşif Talepleri:** Sitedeki formdan gelen tüm müşteri talepleri panelde toplanır ve durum takibi (`Yeni Talep`, `Arandı`, `Keşif Planlandı`, `Tamamlandı`) yapılır.
  - **Site Ayarları:** Telefon, WhatsApp numarası, adres, çalışma saatleri, özel logo ve ana sayfa metinleri tek yerden güncellenir.

## Yerel Geliştirme

```bash
pnpm install
cp .env.example .env
pnpm seed        # Örnek veriler, görseller ve ilk yönetici hesabını oluşturur
pnpm dev         # http://localhost:3000 ve http://localhost:3000/admin
```

Varsayılan ilk yönetici (kurulum sonrası panelden şifreyi değiştirin):
- **E-posta:** `admin@aritman.com.tr`
- **Şifre:** `Aritman2026!`

## VPS / Docker ile Yayına Alma

1. Sunucuda `.env` dosyasını oluşturun:
   ```bash
   cp .env.example .env
   # PAYLOAD_SECRET için güçlü anahtar üretin:
   openssl rand -hex 32
   ```
2. Kalıcı veri klasörlerini oluşturup mevcut veritabanı/medya varsa kopyalayın:
   ```bash
   mkdir -p data media
   ```
3. Tek komutla derleyip başlatın:
   ```bash
   docker compose up -d --build
   ```
4. Caddy veya Nginx ile `aritman.com.tr` domainini `http://127.0.0.1:3000` adresine yönlendirin (otomatik HTTPS).
   Caddy örneği:
   ```caddy
   aritman.com.tr, www.aritman.com.tr {
       reverse_proxy 127.0.0.1:3000
   }
   ```

## Yedekleme
Tüm veritabanı ve yüklenen fotoğraflar yalnızca `data/` ve `media/` klasörlerindedir:
```bash
tar -czf aritman-yedek-$(date +%F).tar.gz data/ media/
```
