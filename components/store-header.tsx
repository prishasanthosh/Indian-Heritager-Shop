'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ChevronDown, Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react'
import { useCart } from '@/components/cart-provider'
import { useSession } from '@/lib/auth-client'
import { navigationCategories, subcategoryHref } from '@/lib/navigation'

type DrawerTab = 'menu' | 'account' | 'settings'

const menuCategories = navigationCategories

export function StoreHeader() {
  const { count } = useCart()
  const { data: session } = useSession()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [drawerTab, setDrawerTab] = useState<DrawerTab>('menu')

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)')
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false)
    }

    desktop.addEventListener('change', closeOnDesktop)
    return () => desktop.removeEventListener('change', closeOnDesktop)
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[#e7d9bb] bg-[#f9f3ea]/90 backdrop-blur-sm">
        <div className="border-b border-[#dcc69d] bg-[#702d32] px-3 py-1.5 text-center text-[10px] font-extrabold uppercase tracking-[0.26em] text-[#f7f1e6] sm:px-5 lg:px-8">
          Living heritage • crafted for today
        </div>

        <div className="mx-auto grid max-w-[1400px] grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-3 px-3 py-3 sm:px-5 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-x-6 lg:px-8">
          <div className="col-start-1 row-start-1 flex min-w-0 items-center gap-2 sm:gap-3">
            <Link href="/" onClick={closeMenu} className="flex items-center gap-3" aria-label="Indian Heritager home">
              <img src="/logo.png" alt="" width="48" height="48" className="size-10 shrink-0 rounded-full border border-[#d5c7ae] bg-white object-contain sm:size-12" />
              <div className="min-w-0">
                <strong className="block whitespace-nowrap font-serif text-[1.1rem] leading-none text-[#1d1716] sm:text-[1.45rem]">Indian Heritager</strong>
                <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.28em] text-[#702d32]">heritage market</span>
              </div>
            </Link>
          </div>

          <form action="/products" className="col-span-2 row-start-2 flex w-full min-w-0 items-center gap-2 rounded-full border border-[#d9cab0] bg-white px-3 py-2 sm:mx-auto sm:max-w-[560px] sm:px-4 lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:w-full">
            <label className="sr-only" htmlFor="header-products-search">Search products</label>
            <Search size={16} className="shrink-0 text-[#702d32]" aria-hidden="true" />
            <input id="header-products-search" name="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products" className="min-w-0 flex-1 bg-transparent text-sm text-[#1d1716] outline-none placeholder:text-[#67615d]" />
            <button type="submit" aria-label="Submit product search" className="grid size-8 shrink-0 place-items-center rounded-full bg-[#f7f1e6] text-[#702d32] transition-colors hover:bg-[#ebddc3]">
              <Search size={15} aria-hidden="true" />
            </button>
          </form>

          <div className="col-start-2 row-start-1 flex shrink-0 items-center justify-self-end gap-2 sm:gap-3 lg:col-start-3">
            {session?.user ? (
              <Link href="/account" aria-label="My account" className="hidden items-center gap-2 rounded-full bg-[#702d32] px-3 py-2.5 text-sm font-semibold text-[#fffaf2] transition-colors hover:bg-[#5a2227] lg:inline-flex">
                <UserRound size={16} /> My account
              </Link>
            ) : (
              <Link href="/sign-in" aria-label="Sign in" className="hidden rounded-full bg-[#702d32] px-3 py-2.5 text-sm font-semibold text-[#fffaf2] transition-colors hover:bg-[#5a2227] lg:inline-flex">Sign in</Link>
            )}

            <Link href="/cart" aria-label={`${count} ${count === 1 ? 'item' : 'items'} in cart`} className="relative grid size-10 place-items-center rounded-full border border-[#d9cab0] bg-[#fffaf2] text-[#1d1716] transition-colors hover:bg-[#f5ebd8]">
              <ShoppingBag size={18} aria-hidden="true" />
              <span aria-hidden="true" className="absolute -right-1 -top-1 grid min-h-5 min-w-5 place-items-center rounded-full bg-[#b9563d] px-1 text-[10px] font-extrabold leading-none text-white">
                {count > 99 ? '99+' : count}
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation-drawer"
              className="grid size-10 place-items-center rounded-full border border-[#d9cab0] bg-[#fffaf2] text-[#1d1716] lg:hidden"
            >
              {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>

        <nav aria-label="Product categories" onKeyDown={(event) => { if (event.key === 'Escape') (event.target as HTMLElement).closest('details')?.removeAttribute('open') }} className="mx-auto hidden min-h-12 max-w-[1400px] items-center justify-start gap-4 border-t border-[#e7d9bb] bg-[#f2e7d8] px-4 py-2.5 lg:flex xl:justify-center xl:gap-5">
          {menuCategories.map((category) => {
            if (!category.megaMenu) {
              return (
                <Link key={category.label} href={category.href} className="whitespace-nowrap text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#3b2f2d] transition-colors hover:text-[#702d32] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#702d32] focus-visible:ring-offset-2">
                  {category.label}
                </Link>
              )
            }

            const categoryColumnCount = category.label === 'Kids' ? 3 : category.label === 'Women' ? 2 : category.label === 'Men' ? 2 : 3
            const alignment = category.label === 'Furniture' ? 'right-0' : category.label === 'Kids' ? 'left-[-52px]' : category.label === 'Women' ? 'left-[-170px]' : 'left-[-100px]'
            return (
              <details key={category.label} className="group relative">
                <summary className="flex cursor-pointer list-none items-center gap-1 whitespace-nowrap py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#3b2f2d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#702d32] focus-visible:ring-offset-2">
                  {category.label}<ChevronDown size={12} aria-hidden="true" className="transition-transform group-open:rotate-180" />
                </summary>
                <div className={`absolute top-full ${alignment} z-50 hidden w-[min(760px,calc(100vw-48px))] group-hover:block group-focus-within:block`}>
                  <div className="mt-2 rounded-none border border-[#dcc69d] bg-[#fffaf2] p-5 shadow-[0_22px_55px_rgba(40,38,33,0.16)] md:p-7">
                    <div className={`grid gap-x-8 gap-y-7 ${categoryColumnCount === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                      {category.megaMenu.columns.map((section) => (
                        <section key={section.label} className="min-w-0">
                          <h2 className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#702d32]">{section.label}</h2>
                          <ul className="space-y-1">
                            {section.items.map((item) => (
                              <li key={item}><Link href={subcategoryHref(category.megaMenu!.label === 'Furniture' ? 'home-decor' : 'clothing', item)} className="block py-1 text-sm leading-5 text-[#2f2925] hover:text-[#a83f35] focus-visible:outline-none focus-visible:text-[#a83f35] focus-visible:underline">{item}</Link></li>
                            ))}
                          </ul>
                        </section>
                      ))}
                    </div>
                  </div>
                </div>
              </details>
            )
          })}
        </nav>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button type="button" aria-label="Close menu" onClick={closeMenu} className="absolute inset-0 bg-[#1d1716]/55" />
          <aside id="mobile-navigation-drawer" role="dialog" aria-modal="true" aria-label="Mobile navigation" className="absolute inset-y-0 right-0 flex w-[min(88vw,380px)] flex-col bg-[#fffaf2] text-[#1d1716] shadow-2xl">
            <div className="grid grid-cols-[1fr_auto] border-b border-[#ead7b1] text-center text-xs font-medium text-[#1d1716]">
              <div role="tablist" aria-label="Mobile navigation sections" className="grid grid-cols-3">
                {([
                  ['menu', 'Menu'],
                  ['account', 'Account'],
                  ['settings', 'Settings'],
                ] as const).map(([tab, label]) => (
                  <button
                    key={tab}
                    id={`mobile-navigation-tab-${tab}`}
                    type="button"
                    onClick={() => setDrawerTab(tab)}
                    role="tab"
                    aria-controls="mobile-navigation-panel"
                    aria-selected={drawerTab === tab}
                    className={`min-h-14 border-r border-[#ead7b1] px-2 text-[10px] font-extrabold uppercase tracking-[0.24em] ${drawerTab === tab ? 'bg-[#f7f1e6]' : 'bg-[#fffaf2]'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <button type="button" onClick={closeMenu} className="grid size-14 place-items-center text-[#1d1716]" aria-label="Close menu">
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            <div id="mobile-navigation-panel" role="tabpanel" aria-labelledby={`mobile-navigation-tab-${drawerTab}`} className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
              {drawerTab === 'menu' && (
                <nav aria-label="Product categories" className="flex flex-col">
                  {menuCategories.map((category) =>
                    category.megaMenu ? (
                      <details key={category.label} className="border-b border-[#eadfbe]">
                        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between px-5 py-3 text-xs font-semibold">
                          {category.label}
                          <ChevronDown size={14} aria-hidden="true" />
                        </summary>
                        <div className="bg-[#f8efd8] px-3 py-2">
                          <Link href={category.href} onClick={closeMenu} className="block rounded px-5 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#702d32]">
                            All {category.label}
                          </Link>
                          {category.megaMenu.columns.map((section) => (
                            <details key={section.label} className="border-t border-[#eadfbe]">
                              <summary className="cursor-pointer list-none px-5 py-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#702d32]">{section.label}</summary>
                              <div>
                                {section.items.map((item) => (
                                  <Link key={item} href={subcategoryHref(category.label === 'Furniture' ? 'home-decor' : 'clothing', item)} onClick={closeMenu} className="block min-h-10 px-7 py-2 text-xs text-[#3b3632]">{item}</Link>
                                ))}
                              </div>
                            </details>
                          ))}
                        </div>
                      </details>
                    ) : (
                      <Link key={category.label} href={category.href} onClick={closeMenu} className="flex min-h-11 items-center border-b border-[#eadfbe] px-5 py-3 text-xs font-medium">
                        {category.label}
                      </Link>
                    ),
                  )}
                </nav>
              )}

              {drawerTab === 'account' && (
                <nav aria-label="Account menu" className="flex flex-col">
                  <p className="border-b border-[#eadfbe] px-5 py-4 text-sm font-semibold">
                    {session?.user ? `Hello, ${session.user.name || 'shopper'}` : 'Welcome to Indian Heritager'}
                  </p>
                  <Link href={session?.user ? '/account' : '/sign-in'} onClick={closeMenu} className="border-b border-[#eadfbe] px-5 py-4 text-sm">
                    {session?.user ? 'My account & orders' : 'Sign in'}
                  </Link>
                  {!session?.user && (
                    <Link href="/sign-up" onClick={closeMenu} className="border-b border-[#eadfbe] px-5 py-4 text-sm">
                      Create an account
                    </Link>
                  )}
                  <Link href="/cart" onClick={closeMenu} className="border-b border-[#eadfbe] px-5 py-4 text-sm">
                    Shopping cart ({count})
                  </Link>
                </nav>
              )}

              {drawerTab === 'settings' && (
                <div className="space-y-4 p-5 text-sm">
                  <h2 className="font-semibold">Shopping settings</h2>
                  <div className="border-b border-[#eadfbe] pb-4">
                    <p className="text-xs text-[#806e67]">Country / Region</p>
                    <p className="mt-1">India</p>
                  </div>
                  <div className="border-b border-[#eadfbe] pb-4">
                    <p className="text-xs text-[#806e67]">Currency</p>
                    <p className="mt-1">Indian Rupee (₹ INR)</p>
                  </div>
                  <a href="mailto:support@indianheritager.com" className="inline-block text-sm underline underline-offset-4">
                    Contact customer care
                  </a>
                </div>
              )}
            </div>

            <div className="border-t border-[#ead7a8] p-4">
              <form action="/products" className="flex h-11 items-center gap-2 border border-[#d8c78e] bg-white px-3">
                <Search size={17} aria-hidden="true" />
                <label className="sr-only" htmlFor="mobile-products-search">Search products</label>
                <input id="mobile-products-search" name="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products…" className="min-w-0 flex-1 bg-transparent text-sm outline-none" />
                <button type="submit" aria-label="Submit product search" className="grid size-8 place-items-center"><Search size={17} /></button>
              </form>
            </div>
          </aside>
        </div>
      )}
    </>
  )
}
