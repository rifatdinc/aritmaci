import { ProductCatalog } from '@/components/ProductCatalog'
import { getProducts, getSiteSettings } from '@/lib/cms'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Su arıtma cihazları',
  description:
    'Evsel ters osmoz cihazları, kurumsal su arıtma, reçineli yumuşatma ve filtre bakım setleri.',
}

export default async function ProductsPage() {
  const [products, settings] = await Promise.all([getProducts(), getSiteSettings()])

  return (
    <>
      <div className="page-mast">
        <div className="shell">
          <h1>Su arıtma cihazları</h1>
          <p>Ev ve işletmeler için ters osmoz, su yumuşatma ve filtre bakım seçenekleri.</p>
        </div>
      </div>
      <section className="shell page-content" aria-label="Ürün kataloğu">
        <ProductCatalog products={products} whatsappNumber={settings.whatsappNumber} />
      </section>
    </>
  )
}
