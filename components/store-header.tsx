'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react'
import { useCart } from '@/components/cart-provider'
import { useSession } from '@/lib/auth-client'

type NavItem = 'home' | 'categories' | 'shop' | 'about'

export function StoreHeader() {
  const { count } = useCart()
  const { data: session } = useSession()
  const pathname = usePathname()
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeItem, setActiveItem] = useState<NavItem>('home')

  useEffect(() => {
    if (pathname === '/products') {
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

      const categoriesTop = categoriesSection.offsetTop
      const homeBottom = topSection.offsetTop + topSection.offsetHeight

      if (window.scrollY < Math.max(0, categoriesTop - 120)) {
        setActiveItem('home')
        return
      }

      if (window.scrollY >= Math.max(0, categoriesTop - 120) && window.scrollY < homeBottom) {
        setActiveItem('categories')
        return
      }

      setActiveItem('categories')
    }

    updateActiveItem()
    window.addEventListener('scroll', updateActiveItem, { passive: true })
    window.addEventListener('hashchange', updateActiveItem)

    return () => {
      window.removeEventListener('scroll', updateActiveItem)
      window.removeEventListener('hashchange', updateActiveItem)
    }
  }, [pathname])

  const navLinkClass = (item: NavItem) => {
  const active = activeItem === item

  return `${
    active
      ? 'text-[#a86f00] after:scale-x-100'
      : 'text-[#35434d]'
  } relative px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-[#a86f00]
     after:absolute after:left-3 after:right-3 after:-bottom-0.5
     after:h-0.5 after:origin-left after:scale-x-0
     after:bg-[#f4bb20] after:transition-transform
     hover:after:scale-x-100`
}

  return (
    <>

      <header className="sticky top-0 z-50 border-b border-[#e9e4d9] bg-[#fbfaf6] px-2 lg:px-8">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-1 sm:gap-5 md:h-20">
          <Link href="/" className="flex shrink-0 items-center gap-2 sm:gap-3">
            <img
              src="/logo.png"
              alt="Indian Heritager Shop"
              width="48"
              height="48"
              className="size-12 shrink-0 rounded-full object-contain"
            />

            <span className="flex flex-col leading-tight">
              <strong className="block whitespace-nowrap font-display text-base font-bold text-[#183d38]">
                Indian Heritager
              </strong>

              <small className="block whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.18em] text-[#414b54]">
                Shop
              </small>
            </span>
          </Link>

          <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
            <Link href="/" className={navLinkClass('home')}>Home</Link>
            <Link href="/#categories" className={navLinkClass('categories')}>Categories</Link>
            <Link href="/products" className={navLinkClass('shop')}>Shop</Link>
            <Link href="/about" className={navLinkClass('about')}>About Us</Link>
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-0.5 sm:gap-3">
            {searchOpen && (
              <form action="/products" className="hidden items-center gap-2 rounded-full border border-[#e5dfd3] bg-white px-3 py-2 xl:flex">
                <Search size={17} aria-hidden="true" />
                <input autoFocus name="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products…" aria-label="Search products" className="w-full bg-transparent text-sm outline-none placeholder:text-[#858b8e] sm:w-40" />
              </form>
            )}
            <button
              type="button"
              onClick={() => {
                setSearchOpen(!searchOpen)
                setMenuOpen(false)
              }}
              aria-label={searchOpen ? 'Close product search' : 'Search products'}
              className="hidden size-10 place-items-center rounded-full hover:bg-[#f1eadb] xl:grid"
            >
              <Search size={20} aria-hidden="true" />
            </button>

            {session?.user ? (
              <Link href="/account" aria-label="My account" className="hidden items-center gap-2 rounded-full bg-[#f4bb20] px-4 py-2.5 text-sm font-semibold text-[#101e29] xl:inline-flex">
                <UserRound size={16} /> My account
              </Link>
            ) : (
              <Link href="/sign-in" aria-label="Sign in" className="hidden rounded-full bg-[#f4bb20] px-4 py-2.5 text-sm font-semibold text-[#101e29] xl:inline-flex">
                Sign in
              </Link>
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
                setMenuOpen(!menuOpen)
                setSearchOpen(false)
              }}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="grid size-9 place-items-center rounded-full hover:bg-[#f1eadb] sm:size-10 xl:hidden"
            >
              {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-[#e9e4d9] bg-[#fbfaf6] px-2 py-4 xl:hidden">
            <nav aria-label="Mobile navigation" className="flex flex-col gap-1 text-sm font-medium text-[#183d38]">
              <Link href="/" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-[#35434d] hover:bg-[#f1eadb] hover:text-[#a86f00]">
                Home
              </Link>
              <Link href="/#categories" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-[#35434d] hover:bg-[#f1eadb] hover:text-[#a86f00]">
                Categories
              </Link>
              <Link href="/products" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-[#35434d] hover:bg-[#f1eadb] hover:text-[#a86f00]">
                Shop
              </Link>
              <Link href="/about" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-[#35434d] hover:bg-[#f1eadb] hover:text-[#a86f00]">
                About Us
              </Link>
            </nav>

            <form action="/products" className="mt-3 flex h-11 items-center gap-2 border border-[#dcd3c2] bg-white px-3">
              <Search size={18} aria-hidden="true" />
              <label className="sr-only" htmlFor="mobile-products-search">Search products</label>
              <input id="mobile-products-search" name="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products…" className="min-w-0 flex-1 bg-transparent text-sm outline-none" />
              <button type="submit" aria-label="Submit product search" className="grid size-8 place-items-center">
                <Search size={17} />
              </button>
            </form>

            <Link href={session?.user ? '/account' : '/sign-in'} onClick={() => setMenuOpen(false)} className="mt-3 flex items-center gap-2 rounded bg-[#f4bb20] px-4 py-3 text-sm font-bold text-[#101e29]">
              <UserRound size={17} aria-hidden="true" /> {session?.user ? 'My account' : 'Sign in'}
            </Link>
          </div>
        )}
      </header>
    </>
  )
}
