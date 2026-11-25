'use client'

import { Brand } from '@/components/Brand'
import { FluidHoverHighlight } from '@/components/fluid-hover-highlight'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  useFluidHover,
  useRegisterFluidHoverItem,
  type UseFluidHoverReturn,
} from '@/hooks/use-fluid-hover'
import { spring } from '@/lib/springs'
import type { SiteSettingsDoc } from '@/lib/types'
import { ArrowUpRight01Icon, Call02Icon, Menu01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState, type CSSProperties } from 'react'

const navigation = [
  { href: '/urunler', label: 'Ürünler' },
  { href: '/#cihaz-secimi', label: 'Cihaz seçimi' },
  { href: '/referanslar', label: 'Referanslar' },
  { href: '/#filtre-bakim', label: 'Filtre bakımı' },
  { href: '/iletisim', label: 'İletişim' },
]

function NavigationItem({
  item: { href, label },
  pathname,
  mobile,
  index,
  registerItem,
}: {
  item: (typeof navigation)[number]
  pathname: string
  mobile: boolean
  index: number
  registerItem: UseFluidHoverReturn['registerItem']
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  useRegisterFluidHoverItem(registerItem, index, ref)

  const link = (
    <Link
      ref={ref}
      href={href}
      aria-current={href === pathname ? 'page' : undefined}
      data-section={pathname.startsWith(`${href}/`) || undefined}
    >
      {label}
    </Link>
  )

  return <li>{mobile ? <SheetClose asChild>{link}</SheetClose> : link}</li>
}

function Navigation({ pathname, mobile = false }: { pathname: string; mobile?: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const hover = useFluidHover(ref, { axis: mobile ? 'y' : 'x', nearest: true })

  return (
    <nav
      ref={ref}
      {...hover.handlers}
      aria-label="Ana menü"
      className={mobile ? 'sheet-nav' : 'site-nav'}
    >
      <FluidHoverHighlight hover={hover} className="nav-hover-mark" />
      <ul>
        {navigation.map((item, index) => (
          <NavigationItem
            key={item.href}
            item={item}
            index={index}
            pathname={pathname}
            mobile={mobile}
            registerItem={hover.registerItem}
          />
        ))}
      </ul>
    </nav>
  )
}

export function SiteHeader({ settings }: { settings: SiteSettingsDoc }) {
  const pathname = usePathname()
  const scrollMarker = useRef<HTMLSpanElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const phoneHref = `tel:${settings.phoneDisplay.replace(/\s+/g, '')}`

  useEffect(() => {
    const marker = scrollMarker.current
    if (!marker) return

    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting))
    observer.observe(marker)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <span ref={scrollMarker} className="header-scroll-marker" aria-hidden="true" />
      <header
        className="site-header"
        data-scrolled={scrolled}
        style={{ '--header-transition': `${spring.slow.duration}s` } as CSSProperties}
      >
        <div className="shell header-inner">
          <Brand settings={settings} />
          <Navigation pathname={pathname} />
          <Button className="header-cta" asChild>
            <Link href="/iletisim#kesif-formu">
              Ücretsiz keşif{' '}
              <HugeiconsIcon icon={ArrowUpRight01Icon} data-icon="inline-end" aria-hidden="true" />
            </Link>
          </Button>
          <div className="mobile-menu">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon-lg" variant="outline" aria-label="Menüyü aç">
                  <HugeiconsIcon icon={Menu01Icon} aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent
                aria-describedby={undefined}
                className="w-[min(21rem,calc(100%-1rem))] overflow-y-auto"
              >
                <SheetHeader>
                  <SheetTitle>Menü</SheetTitle>
                </SheetHeader>
                <Navigation pathname={pathname} mobile />
                <SheetFooter>
                  <SheetClose asChild>
                    <Button asChild>
                      <Link href="/iletisim#kesif-formu">Ücretsiz keşif</Link>
                    </Button>
                  </SheetClose>
                  <Button variant="outline" asChild>
                    <a href={phoneHref}>
                      <HugeiconsIcon icon={Call02Icon} aria-hidden="true" /> {settings.phoneDisplay}
                    </a>
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  )
}
