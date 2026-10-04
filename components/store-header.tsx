'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react'
import { useCart } from '@/components/cart-provider'
import { useSession } from '@/lib/auth-client'
import { productCategories, productsHref } from '@/lib/categories'

type NavItem = 'home' | 'categories' | 'shop' | 'about'
type DrawerTab = 'menu' | 'account' | 'settings'

const menuCategories = [
  ...productCategories.map((category) => ({
    label: category.name,
    href: productsHref(category.slug),
  })),
  { label: 'GI Tagged', href: productsHref('handicrafts') },
  { label: 'ODOP', href: productsHref('traditional-products') },
]

export function StoreHeader() {
  const { count } = useCart()
  const { data: session } = useSession()
  const pathname = usePathname()
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeItem, setActiveItem] = useState<NavItem>('home')
  const [drawerTab, setDrawerTab] = useState<DrawerTab>('menu')

  useEffect(() => {
    setMenuOpen(false)
    setSearchOpen(false)

    if (pathname === '/products' || pathname.startsWith('/products/')) {
      setActiveItem('shop')
      return
    }

    if (pathname === '/about') {
      setActiveItem('about')
      return
    }

    const updateActiveItem = () => {
      const categoriesSection = document.getElementById('categories')
      const topSection = document.getElementById('top')
      if (!categoriesSection || !topSection) {
        setActiveItem('home')
        return
      }

      setActiveItem(window.scrollY < Math.max(0, categoriesSection.offsetTop - 120) ? 'home' : 'categories')
    }

    updateActiveItem()
    window.addEventListener('scroll', updateActiveItem, { passive: true })
    window.addEventListener('hashchange', updateActiveItem)

    return () => {
      window.removeEventListener('scroll', updateActiveItem)
      window.removeEventListener('hashchange', updateActiveItem)
    }
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
  const navLinkClass = (item: NavItem) => `${activeItem === item ? 'text-[#a86f00] after:scale-x-100' : 'text-[#35434d]'} relative rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-[#a86f00] after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-[#f4bb20] after:transition-transform hover:after:scale-x-100`

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[#e9e4d9] bg-[#fbfaf6] px-3 sm:px-5 lg:px-8">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-2 sm:h-16 sm:gap-5 xl:h-20">
          <Link href="/" onClick={closeMenu} className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-3" aria-label="Indian Heritager home">
            <img src="/logo.png" alt="" width="48" height="48" className="size-9 shrink-0 rounded-full object-contain sm:size-12" />
            <strong className="whitespace-nowrap font-display text-[15px] font-bold text-black sm:text-base lg:text-lg">Indian Heritager</strong>
          </Link>

          <nav aria-label="Main navigation" className="ml-4 hidden items-center gap-7 xl:ml-6 xl:flex">
            <Link href="/" className={navLinkClass('home')}>Home</Link>
            <Link href="/#categories" className={navLinkClass('categories')}>Categories</Link>
            <Link href="/products" className={navLinkClass('shop')}>Shop</Link>
            <Link href="/about" className={navLinkClass('about')}>About Us</Link>
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => {
                setSearchOpen((open) => !open)
                setMenuOpen(false)
              }}
              aria-label={searchOpen ? 'Close product search' : 'Search products'}
              aria-expanded={searchOpen}
              className="grid size-9 place-items-center rounded-full hover:bg-[#f1eadb] sm:size-10"
            >
              <Search size={20} aria-hidden="true" />
            </button>

            {session?.user ? (
              <Link href="/account" aria-label="My account" className="hidden items-center gap-2 rounded-full bg-[#f4bb20] px-4 py-2.5 text-sm font-semibold text-[#101e29] xl:inline-flex">
                <UserRound size={16} /> My account
              </Link>
            ) : (
              <Link href="/sign-in" aria-label="Sign in" className="hidden rounded-full bg-[#f4bb20] px-4 py-2.5 text-sm font-semibold text-[#101e29] xl:inline-flex">Sign in</Link>
            )}

            <Link href="/cart" aria-label={`${count} ${count === 1 ? 'item' : 'items'} in cart`} className="relative grid size-9 place-items-center rounded-full hover:bg-[#f1eadb] sm:size-10">
              <ShoppingBag size={20} aria-hidden="true" />
              <span aria-hidden="true" className="absolute -right-1 -top-1 grid min-h-5 min-w-5 place-items-center rounded-full bg-[#c26742] px-1 text-[11px] font-bold leading-none text-white">
                {count > 99 ? '99+' : count}
              </span>
            </Link>

            <button
              type="button"
              onClick={() => {
                setMenuOpen((open) => !open)
                setSearchOpen(false)
              }}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation-drawer"
              className="grid size-9 place-items-center rounded-full hover:bg-[#f1eadb] sm:size-10 xl:hidden"
            >
              {menuOpen ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
            </button>
          </div>
        </div>

        {searchOpen && (
          <form action="/products" className="mx-auto flex h-12 max-w-[1400px] items-center gap-2 border-t border-[#e9e4d9] px-1 sm:px-2">
            <Search size={18} aria-hidden="true" />
            <label className="sr-only" htmlFor="header-products-search">Search products</label>
            <input id="header-products-search" name="search" autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products…" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#858b8e]" />
            <button type="submit" className="rounded-full bg-[#f4bb20] px-4 py-2 text-sm font-semibold text-[#101e29]">Search</button>
          </form>
        )}
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[60] xl:hidden">
          <button type="button" aria-label="Close menu" onClick={closeMenu} className="absolute inset-0 bg-black/55" />
          <aside id="mobile-navigation-drawer" role="dialog" aria-modal="true" aria-label="Mobile navigation" className="absolute inset-y-0 right-0 flex w-[min(88vw,380px)] flex-col bg-[#fcebe2] text-[#84291e] shadow-2xl">
            <div className="grid grid-cols-[1fr_auto] border-b border-[#e9d2c6] text-center text-xs font-medium text-[#075985]">
              <div role="tablist" aria-label="Mobile navigation sections" className="grid grid-cols-3">
                {([
                  ['menu', 'Menu'],
                  ['account', 'Account'],
                  ['settings', 'Settings'],
                ] as const).map(([tab, label]) => (
                  <button key={tab} id={`mobile-navigation-tab-${tab}`} type="button" onClick={() => setDrawerTab(tab)} role="tab" aria-controls="mobile-navigation-panel" aria-selected={drawerTab === tab} className={`min-h-14 border-r border-[#e9d2c6] px-2 ${drawerTab === tab ? 'bg-[#fff5ef]' : 'bg-[#f7d9ca]'}`}>
                    {label}
                  </button>
                ))}
              </div>
              <button type="button" onClick={closeMenu} aria-label="Close menu" className="grid min-h-14 w-11 place-items-center text-[#84291e]">
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            <div id="mobile-navigation-panel" role="tabpanel" aria-labelledby={`mobile-navigation-tab-${drawerTab}`} className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
              {drawerTab === 'menu' && (
                <nav aria-label="Product categories">
                  {menuCategories.map((category) => (
                    <Link key={category.label} href={category.href} onClick={closeMenu} className="flex min-h-11 items-center border-b border-[#ead8cf] px-5 py-3 text-xs font-medium">
                      {category.label}
                    </Link>
                  ))}
                </nav>
              )}

              {drawerTab === 'account' && (
                <nav aria-label="Account menu" className="flex flex-col">
                  <p className="border-b border-[#ead8cf] px-5 py-4 text-sm font-semibold">{session?.user ? `Hello, ${session.user.name || 'shopper'}` : 'Welcome to Indian Heritager'}</p>
                  <Link href={session?.user ? '/account' : '/sign-in'} onClick={closeMenu} className="border-b border-[#ead8cf] px-5 py-4 text-sm">{session?.user ? 'My account & orders' : 'Sign in'}</Link>
                  {!session?.user && <Link href="/sign-up" onClick={closeMenu} className="border-b border-[#ead8cf] px-5 py-4 text-sm">Create an account</Link>}
                  <Link href="/cart" onClick={closeMenu} className="border-b border-[#ead8cf] px-5 py-4 text-sm">Shopping cart ({count})</Link>
                </nav>
              )}

              {drawerTab === 'settings' && (
                <div className="space-y-4 p-5 text-sm">
                  <h2 className="font-semibold">Shopping settings</h2>
                  <div className="border-b border-[#ead8cf] pb-4">
                    <p className="text-xs text-[#806e67]">Country / Region</p>
                    <p className="mt-1">India</p>
                  </div>
                  <div className="border-b border-[#ead8cf] pb-4">
                    <p className="text-xs text-[#806e67]">Currency</p>
                    <p className="mt-1">Indian Rupee (₹ INR)</p>
                  </div>
                  <a href="mailto:support@indianheritager.com" className="inline-block text-sm underline underline-offset-4">Contact customer care</a>
                </div>
              )}
            </div>

            <div className="border-t border-[#e9d2c6] p-4">
              <form action="/products" className="flex h-11 items-center gap-2 border border-[#d9bfb2] bg-white px-3">
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
