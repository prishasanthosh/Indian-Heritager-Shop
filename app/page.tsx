'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, Search, ShoppingBag, Sparkles, Star, UserRound } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSession } from '@/lib/auth-client'
import { productCategories } from '@/lib/categories'

export default function Page() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [activeItem, setActiveItem] = useState<'home' | 'categories' | 'shop' | 'about'>('home')

  useEffect(() => {
    const updateActiveItem = () => {
      if (pathname === '/products') {
        setActiveItem('shop')
        return
      }

      if (pathname === '/about') {
        setActiveItem('about')
        return
      }

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

  const navClass = (item: 'home' | 'categories' | 'shop' | 'about') => `${activeItem === item ? 'border-b-2 border-[#f4bb20] text-[#183d38]' : 'text-[#000000] hover:text-[#a86f00]'} pb-2 transition-colors`

  return (
    <main className="min-h-screen bg-[#f8f5ee] text-[#000000]">
      

      <header className="sticky top-0 z-20 border-b border-[#e9e4d9] bg-[#fbfaf6]">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-5 px-5 md:h-20 lg:px-8">
          <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="Indian Heritager Foundation home">
            <img src="/logo.png" alt="Indian Heritager Foundation" width="48" height="48" className="size-12 shrink-0 rounded-full object-contain" />
            <span className="flex flex-col leading-tight">
              <strong className="block whitespace-nowrap font-sans text-[15px] font-bold text-[#183d38]">Indian Heritager</strong>
              <small className="mt-0.5 block whitespace-nowrap text-[9px] font-medium uppercase tracking-[0.18em] text-[#414b54] sm:text-[10px]">Foundation - Shop</small>
            </span>
          </Link>

          <nav aria-label="Main navigation" className="hidden items-center gap-7 text-sm font-medium text-[#000000] lg:flex">
            <Link href="/" className={navClass('home')}>Home</Link>
            <Link href="/#categories" className={navClass('categories')}>Categories</Link>
            <Link href="/products" className={navClass('shop')}>Shop</Link>
            <Link href="/about" className={navClass('about')}>About Us</Link>
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
            <Link href="/products" aria-label="Search products" className="hidden h-10 w-[190px] items-center gap-2 rounded-full border border-[#e5dfd3] bg-white px-3 text-[#071321] xl:flex">
              <Search size={18} aria-hidden="true" />
              <span className="text-sm text-[#676d6d]">Search products…</span>
            </Link>
            <Link href="/products" aria-label="Search products" className="grid size-10 place-items-center rounded-full hover:bg-[#f1eadb] xl:hidden"><Search size={20} /></Link>
            <Link href="/cart" className="relative grid size-10 place-items-center rounded-full hover:bg-[#f1eadb]" aria-label="Cart"><ShoppingBag size={21} /> <span className="sr-only">Open cart</span></Link>
            {session?.user ? (
              <Link href="/account" aria-label="My account" className="hidden items-center gap-2 rounded-full bg-[#f4bb20] px-4 py-2.5 text-sm font-bold text-[#101e29] transition hover:bg-[#ffd044] sm:inline-flex"><UserRound size={16} /> My account</Link>
            ) : (
              <Link href="/sign-in" aria-label="Sign in" className="hidden rounded-full bg-[#f4bb20] px-4 py-2.5 text-sm font-bold text-[#101e29] transition hover:bg-[#ffd044] sm:block">Sign in</Link>
            )}
          </div>
        </div>
      </header>

      <section id="top" className="relative flex min-h-[560px] items-center overflow-hidden bg-[#173d38] px-5 py-16 text-[#fbfaf6] sm:min-h-[620px] lg:min-h-[660px] lg:px-8">
        <img src="/hero-education.jpg" alt="Curated handcrafted and heritage products" className="absolute inset-0 size-full object-cover object-[58%_48%]" />
        <div className="absolute inset-0 bg-[#10251f]/55" />
        <div className="relative mx-auto w-full max-w-[1280px]">
          <p className="mb-5 text-xs font-bold tracking-[0.24em] text-[#f4c532]">THE INDIAN HERITAGER SHOP</p>
          <h1 className="max-w-3xl font-serif text-5xl leading-[0.96] sm:text-7xl lg:text-[88px]">Shop thoughtfully.<br /><em className="text-[#f4c532]">Celebrate craft.</em></h1>
          <p className="mt-8 max-w-xl text-base leading-7 text-[#f3f1e9] sm:text-lg">Browse a diverse collection of handcrafted goods, traditional essentials, home finds, accessories, and keepsakes rooted in Indian heritage.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/products" className="inline-flex items-center gap-3 bg-[#c26742] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#d07750]">Browse products <ArrowRight size={17} /></Link>
            <Link href="#story" className="border border-white/70 px-6 py-3.5 text-sm font-bold text-white hover:bg-white/10">Our story</Link>
          </div>
        </div>
      </section>

      <section id="categories" className="mx-auto max-w-[1280px] px-5 py-16 lg:px-8 lg:py-24">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-xs font-bold tracking-[0.2em] text-[#c26742]">EXPLORE</p>
            <h2 className="font-serif text-4xl tracking-[-0.03em] sm:text-5xl">Products for every lifestyle</h2>
          </div>
          <Link href="/products" className="text-sm font-bold text-[#c26742]">VIEW ALL PRODUCTS <ArrowRight className="ml-1 inline" size={16} /></Link>
        </div>

        <div className="mt-9 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
          {productCategories.map((item) => (
            <Link key={item.slug} href={`/products?category=${item.slug}`} className="group min-h-36 rounded-none bg-[#e9dfc9] p-5 text-left transition hover:-translate-y-1 hover:bg-[#d9c9a8] focus:outline-none focus:ring-2 focus:ring-[#c26742]">
              <span className="inline-flex rounded-full bg-white/70 p-2 text-[#173d38]"><Sparkles size={16} /></span>
              <h3 className="mt-5 font-serif text-2xl leading-tight text-[#173d38]">{item.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section id="story" className="bg-[#173d38] px-5 py-16 text-[#f8f5ee] lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-[#f4c532]">OUR STORY</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">Purposeful products with lasting value</h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-[#e8e1d5]">
              Every item in our collection is selected to support traditional craft, meaningful gifting, and everyday living rooted in heritage, quality, and ethical sourcing.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ['200+', 'handpicked products'],
              ['350+', 'artisan partners'],
              ['4.9/5', 'average rating'],
            ].map(([value, label]) => (
              <div key={label} className="border border-white/15 bg-white/5 p-5">
                <p className="font-serif text-4xl text-[#f4c532]">{value}</p>
                <p className="mt-2 text-sm text-[#e8e1d5]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 py-16 lg:px-8 lg:py-24">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-[#c26742]">FEATURED</p>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">Popular picks</h2>
          </div>
          <Link href="/products" className="text-sm font-bold text-[#c26742]">SHOP MORE <ArrowRight className="ml-1 inline" size={16} /></Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            ['Handcrafted Brass Lamp', 'Home Decor', '₹1,850', '₹2,200'],
            ['Cotton Heritage Saree', 'Clothing', '₹2,390', '₹2,990'],
            ['Botanical Wall Art', 'Art & Collectibles', '₹1,120', '₹1,450'],
          ].map(([name, category, price, originalPrice]) => (
            <article key={name} className="border border-[#dcd3c2] bg-[#fbfaf6] p-4">
              <div className="flex h-56 items-center justify-center bg-[#eadfce] text-center font-serif text-3xl text-[#173d38]">{name.split(' ')[0]}</div>
              <div className="mt-4 flex items-center justify-between text-[#59645f]"><span className="text-xs font-bold uppercase tracking-[0.14em]">{category}</span><span className="inline-flex items-center gap-1 text-sm"><Star size={14} className="fill-[#f4bb20] text-[#f4bb20]" /> 4.9</span></div>
              <h3 className="mt-3 font-serif text-2xl text-[#183d38]">{name}</h3>
              <div className="mt-4 flex items-end gap-2"><span className="text-2xl font-bold">{price}</span><span className="text-sm line-through text-[#59645f]">{originalPrice}</span></div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
