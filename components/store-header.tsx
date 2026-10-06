'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ChevronDown, Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react'
import { useCart } from '@/components/cart-provider'
import { useSession } from '@/lib/auth-client'
import { productsHref } from '@/lib/categories'

type DrawerTab = 'menu' | 'account' | 'settings'

const menuCategories = [
  { label: 'Men', href: productsHref('clothing') },
  { label: 'Women', href: productsHref('clothing') },
  { label: 'Kids', href: productsHref('clothing') },
  { label: 'Handicrafts', href: productsHref('handicrafts') },
  { label: 'Home & Living', href: productsHref('home-decor') },
  { label: 'Jewelery', href: productsHref('jewellery') },
  { label: 'Art & Collectibles', href: productsHref('art-collectibles') },
  { label: 'Traditional Products', href: productsHref('traditional-products') },
  {
    label: 'Other Products',
    href: productsHref('other-products'),
    children: [
      { label: 'Accessories', href: productsHref('accessories') },
      { label: 'Gifts', href: productsHref('gifts') },
    ],
  },
  { label: 'GI Tagged', href: productsHref('handicrafts') },
  { label: 'ODOP', href: productsHref('traditional-products') },
]

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
      <header className="sticky top-0 z-50 border-b border-[#e9e4d9] bg-[#fbfaf6] px-3 sm:px-5 lg:px-8">
        <div className="mx-auto grid min-h-14 max-w-[1400px] grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 py-2 sm:min-h-16 sm:grid-cols-[minmax(0,1fr)_minmax(280px,560px)_minmax(0,1fr)] sm:gap-4 xl:min-h-20">
          <Link href="/" onClick={closeMenu} className="col-start-1 row-start-1 flex min-w-0 shrink-0 items-center gap-2 sm:gap-3" aria-label="Indian Heritager home">
            <img src="/logo.png" alt="" width="48" height="48" className="size-9 shrink-0 rounded-full object-contain sm:size-12" />
            <strong className="hidden whitespace-nowrap font-display text-[15px] font-bold text-black sm:block sm:text-base lg:text-lg">Indian Heritager</strong>
          </Link>

          <form action="/products" className="col-span-2 row-start-2 flex h-10 w-full min-w-0 items-center gap-2 border border-[#d7c9a5] bg-white px-3 sm:col-span-1 sm:col-start-2 sm:row-start-1 sm:h-11 sm:px-4">
            <label className="sr-only" htmlFor="header-products-search">Search products</label>
            <input id="header-products-search" name="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products…" className="min-w-0 flex-1 bg-transparent text-sm text-black outline-none placeholder:text-[#686868]" />
            <button type="submit" aria-label="Search products" className="grid size-8 shrink-0 place-items-center text-black"><Search size={18} aria-hidden="true" /></button>
          </form>

          <div className="col-start-2 row-start-1 flex shrink-0 items-center justify-self-end gap-1 sm:col-start-3 sm:gap-2">
            {session?.user ? (
              <Link href="/account" aria-label="My account" className="hidden items-center gap-2 rounded-full bg-[#f4a900] px-3 py-2.5 text-sm font-semibold text-black md:inline-flex">
                <UserRound size={16} /> My account
              </Link>
            ) : (
              <Link href="/sign-in" aria-label="Sign in" className="hidden rounded-full bg-[#f4a900] px-3 py-2.5 text-sm font-semibold text-black md:inline-flex">Sign in</Link>
            )}

            <Link href="/cart" aria-label={`${count} ${count === 1 ? 'item' : 'items'} in cart`} className="relative grid size-9 place-items-center rounded-full hover:bg-[#f1eadb] sm:size-10">
              <ShoppingBag size={20} aria-hidden="true" />
              <span aria-hidden="true" className="absolute -right-1 -top-1 grid min-h-5 min-w-5 place-items-center rounded-full bg-[#f4a900] px-1 text-[11px] font-bold leading-none text-black">
                {count > 99 ? '99+' : count}
              </span>
            </Link>

            <button
              type="button"
              onClick={() => {
                setMenuOpen((open) => !open)
              }}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation-drawer"
              className="grid size-9 place-items-center rounded-full hover:bg-[#f1eadb] sm:size-10 md:hidden"
            >
              {menuOpen ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
            </button>
          </div>
        </div>

        <nav aria-label="Product categories" className="mx-auto hidden min-h-10 max-w-[1400px] flex-wrap items-center justify-center gap-x-2 gap-y-1 border-t border-[#d78f00] bg-[#f4a900] px-2 py-2 md:flex lg:gap-x-4 xl:gap-x-6">
          {menuCategories.map((category) => category.children ? (
            <details key={category.label} className="group relative">
              <summary className="flex cursor-pointer list-none items-center gap-1 whitespace-nowrap text-[clamp(0.625rem,0.8vw,0.75rem)] font-semibold uppercase tracking-wide text-black">
                {category.label}<ChevronDown size={13} aria-hidden="true" />
              </summary>
              <div className="absolute left-0 top-full z-50 mt-2 min-w-40 border border-[#e1c77e] bg-[#fff5d9] py-1 shadow-lg">
                {category.children.map((child) => (
                  <Link key={child.label} href={child.href} className="block px-4 py-2 text-xs font-semibold text-black hover:bg-[#f4d66e]">{child.label}</Link>
                ))}
              </div>
            </details>
          ) : (
            <Link key={category.label} href={category.href} className="shrink-0 whitespace-nowrap text-[clamp(0.625rem,0.8vw,0.75rem)] font-semibold uppercase tracking-wide text-black transition-colors hover:underline">
              {category.label}
            </Link>
          ))}
        </nav>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <button type="button" aria-label="Close menu" onClick={closeMenu} className="absolute inset-0 bg-black/55" />
          <aside id="mobile-navigation-drawer" role="dialog" aria-modal="true" aria-label="Mobile navigation" className="absolute inset-y-0 right-0 flex w-[min(88vw,380px)] flex-col bg-[#fff5d9] text-black shadow-2xl">
            <div className="grid grid-cols-[1fr_auto] border-b border-[#ead7a8] text-center text-xs font-medium text-black">
              <div role="tablist" aria-label="Mobile navigation sections" className="grid grid-cols-3">
                {([
                  ['menu', 'Menu'],
                  ['account', 'Account'],
                  ['settings', 'Settings'],
                ] as const).map(([tab, label]) => (
                  <button key={tab} id={`mobile-navigation-tab-${tab}`} type="button" onClick={() => setDrawerTab(tab)} role="tab" aria-controls="mobile-navigation-panel" aria-selected={drawerTab === tab} className={`min-h-14 border-r border-[#ead7a8] px-2 ${drawerTab === tab ? 'bg-[#fffdf5]' : 'bg-[#ffedbd]'}`}>
                    {label}
                  </button>
                ))}
              </div>
              <button type="button" onClick={closeMenu} aria-label="Close menu" className="grid min-h-14 w-11 place-items-center text-black">
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            <div id="mobile-navigation-panel" role="tabpanel" aria-labelledby={`mobile-navigation-tab-${drawerTab}`} className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
              {drawerTab === 'menu' && (
                <nav aria-label="Product categories" className="flex flex-col">
                  {menuCategories.map((category) => (
                    category.children ? (
                      <details key={category.label} className="border-b border-[#eadfbe]">
                        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between px-5 py-3 text-xs font-semibold">
                          {category.label}<ChevronDown size={14} aria-hidden="true" />
                        </summary>
                        <div className="bg-[#ffedbd]">
                          {category.children.map((child) => (
                            <Link key={child.label} href={child.href} onClick={closeMenu} className="flex min-h-10 items-center border-t border-[#eadfbe] px-8 py-2 text-xs">{child.label}</Link>
                          ))}
                        </div>
                      </details>
                    ) : (
                      <Link key={category.label} href={category.href} onClick={closeMenu} className="flex min-h-11 items-center border-b border-[#eadfbe] px-5 py-3 text-xs font-medium">
                        {category.label}
                      </Link>
                    )
                  ))}
                </nav>
              )}

              {drawerTab === 'account' && (
                <nav aria-label="Account menu" className="flex flex-col">
                  <p className="border-b border-[#eadfbe] px-5 py-4 text-sm font-semibold">{session?.user ? `Hello, ${session.user.name || 'shopper'}` : 'Welcome to Indian Heritager'}</p>
                  <Link href={session?.user ? '/account' : '/sign-in'} onClick={closeMenu} className="border-b border-[#eadfbe] px-5 py-4 text-sm">{session?.user ? 'My account & orders' : 'Sign in'}</Link>
                  {!session?.user && <Link href="/sign-up" onClick={closeMenu} className="border-b border-[#eadfbe] px-5 py-4 text-sm">Create an account</Link>}
                  <Link href="/cart" onClick={closeMenu} className="border-b border-[#eadfbe] px-5 py-4 text-sm">Shopping cart ({count})</Link>
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
                  <a href="mailto:support@indianheritager.com" className="inline-block text-sm underline underline-offset-4">Contact customer care</a>
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
