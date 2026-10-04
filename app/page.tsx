import Link from 'next/link'
import { ArrowRight, Sparkles, Star } from 'lucide-react'
import { HeroCarousel } from '@/components/hero-carousel'
import { productCategories } from '@/lib/categories'

export default function Page() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#f8f5ee] text-[#000000]">
      <section id="top" className="relative flex min-h-[440px] items-center overflow-hidden bg-[#031321] px-4 py-12 text-[#fbfaf6] sm:min-h-[520px] sm:px-5 sm:py-16 lg:px-8">
        <HeroCarousel />
        <div className="absolute inset-0 bg-[#031321]/55" />
        <div className="relative mx-auto w-full max-w-[1280px]">
          <p className="mb-5 text-xs font-bold tracking-[0.24em] text-[#f4c532]">THE INDIAN HERITAGER SHOP</p>
          <h1 className="max-w-3xl font-serif text-[clamp(2.5rem,10vw,4.5rem)] leading-[0.98] lg:text-[88px]">Shop thoughtfully.<br /><em className="text-[#f4c532]">Celebrate craft.</em></h1>
          <p className="mt-6 max-w-xl text-sm leading-6 text-[#f3f1e9] sm:mt-8 sm:text-lg sm:leading-7">Browse a diverse collection of handcrafted goods, traditional essentials, home finds, accessories, and keepsakes rooted in Indian heritage.</p>
          <div className="mt-7 flex flex-wrap gap-3 sm:mt-9">
            <Link href="/products" className="inline-flex items-center gap-2 bg-[#c26742] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#d07750] sm:gap-3 sm:px-6 sm:py-3.5">Browse products <ArrowRight size={17} /></Link>
            <Link href="#story" className="border border-white/70 px-4 py-3 text-sm font-bold text-white hover:bg-white/10 sm:px-6 sm:py-3.5">Our story</Link>
          </div>
        </div>
      </section>

      <section id="categories" className="mx-auto max-w-[1280px] px-4 py-12 sm:px-5 sm:py-16 lg:px-8 lg:py-24">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-xs font-bold tracking-[0.2em] text-[#c26742]">EXPLORE</p>
            <h2 className="font-serif text-3xl tracking-[-0.03em] sm:text-5xl">Products for every lifestyle</h2>
          </div>
          <Link href="/products" className="text-sm font-bold text-[#c26742]">VIEW ALL PRODUCTS <ArrowRight className="ml-1 inline" size={16} /></Link>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-2.5 sm:mt-9 sm:gap-3 md:grid-cols-3 lg:grid-cols-5">
          {productCategories.map((item) => (
            <Link key={item.slug} href={`/products?category=${item.slug}`} className="group min-h-32 rounded-none bg-[#e9dfc9] p-3 text-left transition hover:-translate-y-1 hover:bg-[#d9c9a8] focus:outline-none focus:ring-2 focus:ring-[#c26742] sm:min-h-36 sm:p-5">
              <span className="inline-flex rounded-full bg-white/70 p-2 text-[#031321]"><Sparkles size={16} /></span>
              <h3 className="mt-3 break-words font-serif text-lg leading-tight text-[#031321] sm:mt-5 sm:text-2xl">{item.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section id="story" className="bg-[#031321] px-4 py-12 text-[#f8f5ee] sm:px-5 sm:py-16 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-[#f4c532]">OUR STORY</p>
            <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-5xl">Purposeful products with lasting value</h2>
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

      <section className="mx-auto max-w-[1280px] px-4 py-12 sm:px-5 sm:py-16 lg:px-8 lg:py-24">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-[#c26742]">FEATURED</p>
            <h2 className="mt-3 font-serif text-3xl sm:text-5xl">Popular picks</h2>
          </div>
          <Link href="/products" className="text-sm font-bold text-[#c26742]">SHOP MORE <ArrowRight className="ml-1 inline" size={16} /></Link>
        </div>

        <div className="mt-7 grid gap-4 sm:mt-8 sm:gap-6 md:grid-cols-3">
          {[
            ['Handcrafted Brass Lamp', 'Home Decor', '₹1,850', '₹2,200'],
            ['Cotton Heritage Saree', 'Clothing', '₹2,390', '₹2,990'],
            ['Botanical Wall Art', 'Art & Collectibles', '₹1,120', '₹1,450'],
          ].map(([name, category, price, originalPrice]) => (
            <article key={name} className="border border-[#dcd3c2] bg-[#fbfaf6] p-4">
              <div className="flex aspect-[4/3] items-center justify-center bg-[#eadfce] text-center font-serif text-2xl text-[#031321] sm:h-56 sm:aspect-auto sm:text-3xl">{name.split(' ')[0]}</div>
              <div className="mt-4 flex items-center justify-between text-[#59645f]"><span className="text-xs font-bold uppercase tracking-[0.14em]">{category}</span><span className="inline-flex items-center gap-1 text-sm"><Star size={14} className="fill-[#f4bb20] text-[#f4bb20]" /> 4.9</span></div>
              <h3 className="mt-3 font-serif text-2xl text-[#071b2b]">{name}</h3>
              <div className="mt-4 flex items-end gap-2"><span className="text-2xl font-bold">{price}</span><span className="text-sm line-through text-[#59645f]">{originalPrice}</span></div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
