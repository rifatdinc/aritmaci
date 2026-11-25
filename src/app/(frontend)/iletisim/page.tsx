import { ContactSection } from '@/components/ContactSection'
import { getSiteSettings } from '@/lib/cms'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'İletişim ve ücretsiz keşif',
  description: 'Aritman Su Arıtma Sistemleri iletişim bilgileri ve ücretsiz keşif talep formu.',
}

export default async function ContactPage() {
  return <ContactSection settings={await getSiteSettings()} showMap />
}
