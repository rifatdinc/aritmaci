import { getMediaUrl, type SiteSettingsDoc } from '@/lib/types'
import { DropletIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Image from 'next/image'
import Link from 'next/link'

export function Brand({ settings }: { settings: SiteSettingsDoc }) {
  const logo = settings.logo && typeof settings.logo === 'object' ? settings.logo : null

  return (
    <Link href="/" className="brand" aria-label={settings.companyName}>
      {logo?.url ? (
        <span className="brand-logo">
          <Image
            src={getMediaUrl(logo)}
            alt=""
            fill
            sizes="150px"
            className="object-contain object-left"
          />
        </span>
      ) : (
        <>
          <span className="brand-mark">
            <HugeiconsIcon icon={DropletIcon} size={22} strokeWidth={1.7} aria-hidden="true" />
          </span>
          <span className="brand-type">
            <strong>Aritman</strong>
            <small>Su Arıtma Sistemleri</small>
          </span>
        </>
      )}
    </Link>
  )
}
