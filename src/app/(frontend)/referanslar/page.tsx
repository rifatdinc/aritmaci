import { ReferenceGrid } from '@/components/ReferenceGrid'
import { Button } from '@/components/ui/button'
import { getReferences } from '@/lib/cms'
import { ArrowUpRight01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Referanslar',
  description:
    'TRT yayın merkezleri, Kocaeli Büyükşehir Belediyesi birimleri, kafe, restoran ve ev tipi su arıtma kurulum referanslarımız.',
}

export default async function ReferencesPage() {
  const references = await getReferences()

  return (
    <>
      <div className="page-mast">
        <div className="shell">
          <h1>Referanslar</h1>
          <p>
            Kocaeli ve İstanbul’da evler, işletmeler ve kamu kurumları için tamamladığımız
            kurulumlar.
          </p>
        </div>
      </div>
      <section className="shell page-content" aria-label="Kurulumlar">
        <ReferenceGrid references={references} />
        <div className="inline-cta">
          <div>
            <h2>Sizin için de bir sistem seçelim</h2>
            <p>Şebeke suyunuzu yerinde ölçüp ihtiyacınıza uygun kapasiteyi önerelim.</p>
          </div>
          <Button variant="consultation" asChild>
            <Link href="/iletisim#kesif-formu">
              Ücretsiz keşif{' '}
              <HugeiconsIcon icon={ArrowUpRight01Icon} size={18} aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}
