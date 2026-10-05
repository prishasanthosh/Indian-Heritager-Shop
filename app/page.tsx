import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Award, BadgeCheck, Crown, Heart, MapPin, PackageCheck, Sparkles, Star, Store, Truck, UserRoundCheck, WalletCards } from 'lucide-react'
import { FantasticFinds } from '@/components/fantastic-finds'
import { HeroCarousel } from '@/components/hero-carousel'
import { ShopByCategory } from '@/components/shop-by-category'
import { productsHref } from '@/lib/categories'

const celebrationTiles = [
  { name: 'Cushion Covers', image: '/hero-image-1.jpeg', className: 'col-span-2 row-span-2', category: 'home-decor' },
  { name: 'Home Decor', image: '/hero-image-3.jpeg', className: '', category: 'home-decor' },
  { name: 'Bedsheets', image: '/hero-image-1.jpeg', className: '', category: 'home-decor' },
  { name: 'Floor Coverings', image: '/hero-image-2.jpeg', className: 'col-span-2', category: 'traditional-products' },
]

const sellerCards = [
  {
    name: 'Craft Edge',
    location: 'Madhubani, Bihar',
    description: 'Where Madhubani heritage meets contemporary handmade artistry.',
    image: '/hero-image-2.jpeg',
    products: ['/hero-image-2.jpeg', '/hero-image-1.jpeg', '/hero-image-3.jpeg'],
  },
  {
    name: 'Handloom Plus',
    location: 'Bhagalpur, Bihar',
    description: 'Bhagalpur’s timeless silk heritage, woven into contemporary elegance.',
    image: '/hero-image-1.jpeg',
    products: ['/hero-image-1.jpeg', '/hero-image-3.jpeg', '/hero-image-2.jpeg'],
  },
  {
    name: 'Vidyashish Hathkargha',
    location: 'Anwa, Rajasthan',
    description: 'Preserving India’s handloom legacy and empowering artisan communities.',
    image: '/hero-image-3.jpeg',
    products: ['/hero-image-3.jpeg', '/hero-image-1.jpeg', '/hero-image-2.jpeg'],
  },
]

const communityNotes = [
  { title: 'Thoughtful finds', icon: '01' },
  { title: 'Craft with character', icon: '02' },
  { title: 'A closer connection to makers', icon: '03' },
]

export default function Page() {
  return (
    <main className="home-page min-h-screen overflow-x-clip bg-[#fffdf7] text-black">
      <section id="top" className="relative flex min-h-[440px] items-center overflow-hidden bg-[#fff1c2] px-4 py-12 text-black sm:min-h-[520px] sm:px-5 sm:py-16 lg:px-8">
        <HeroCarousel />
        <div className="absolute inset-0 bg-gradient-to-r from-[#fff1c2]/95 via-[#fff1c2]/80 to-[#fff1c2]/15" />
        <div className="relative mx-auto w-full max-w-[1280px]">
          <p className="mb-5 text-xs font-bold tracking-[0.24em]">THE INDIAN HERITAGER SHOP</p>
          <h1 className="max-w-3xl font-serif text-[clamp(2.5rem,10vw,4.5rem)] leading-[0.98] lg:text-[88px]">Shop thoughtfully.<br /><em>Celebrate craft.</em></h1>
          <p className="mt-6 max-w-xl text-sm leading-6 sm:mt-8 sm:text-lg sm:leading-7">Browse a diverse collection of handcrafted goods, traditional essentials, home finds, accessories, and keepsakes rooted in Indian heritage.</p>
          <div className="mt-7 flex flex-wrap gap-3 sm:mt-9">
            <Link href="/products" className="inline-flex items-center gap-2 bg-[#f4a900] px-4 py-3 text-sm font-bold text-black transition hover:bg-[#e99b00] sm:gap-3 sm:px-6 sm:py-3.5">Browse products <ArrowRight size={17} /></Link>
            <Link href="#about" className="border border-black/60 bg-white/50 px-4 py-3 text-sm font-bold text-black hover:bg-white sm:px-6 sm:py-3.5">Our story</Link>
          </div>
        </div>
      </section>

      <ShopByCategory />

      <section id="story">
        <div className="bg-[#fff1c2] px-4 py-12 text-black sm:px-5 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-[1280px] gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
            <div className="text-center">
              <h2 className="mx-auto max-w-2xl font-serif text-4xl leading-[1.08] sm:text-5xl lg:text-5xl">The Gateway to<br />India&apos;s Timeless Heritage</h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 sm:text-lg sm:leading-[1.7]">
                We aim to provide a platform to Indian Handloom Weavers and Handicraft Artisans to sell their traditional handicraft products online, paving the way for their financial and social empowerment. This will also help in promoting their skills while eliminating the intermediaries.
              </p>
              <p className="mx-auto mt-3 max-w-2xl text-base leading-7 sm:text-lg sm:leading-[1.7]">
                We hope to raise the dignity of the Indian artisans and kindle an interest for an unsurpassed legacy of craft that spans millennia and spreads across the length and breadth of India.
              </p>
              <Link href="#about" className="mt-6 inline-flex min-h-12 items-center bg-[#f4a900] px-8 text-sm font-semibold text-black transition-colors hover:bg-[#e99b00]">Know More</Link>
            </div>
            <div className="relative mx-auto aspect-[1.1] w-full max-w-[560px] overflow-hidden sm:aspect-[1.25]">
              <Image src="/hero-image-1.jpeg" alt="Indian handloom textiles and artisan-made home goods" fill sizes="(min-width: 1024px) 45vw, 90vw" className="object-cover object-center" />
            </div>
          </div>
        </div>
        <div aria-label="Shopping benefits" className="border-b border-[#e5cfad] bg-white px-4 py-6 text-black sm:px-5">
          <div className="mx-auto grid max-w-[1280px] gap-4 sm:grid-cols-3 sm:gap-0">
            {[
              { label: 'Authentic Sellers', Icon: UserRoundCheck },
              { label: 'Free Shipping', Icon: Truck },
              { label: 'Easy Returns', Icon: PackageCheck },
            ].map(({ label, Icon }) => (
              <div key={label} className="flex items-center justify-center gap-3 py-2 text-lg sm:border-r sm:border-[#e5cfad] sm:py-4 last:sm:border-r-0 sm:text-xl">
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#fff1c2] text-black"><Icon size={23} aria-hidden="true" /></span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-[1280px]">
          <h2 className="text-center font-serif text-3xl text-black sm:text-4xl">Celebrate The New Beginning</h2>
          <div className="mt-7 grid auto-rows-[170px] grid-cols-2 gap-3 sm:mt-8 sm:auto-rows-[230px] sm:gap-5 lg:auto-rows-[282px] lg:grid-cols-4">
            {celebrationTiles.map((tile) => (
              <Link key={tile.name} href={productsHref(tile.category)} className={`group relative overflow-hidden ${tile.className}`}>
                <Image src={tile.image} alt="" fill sizes="(min-width: 1024px) 40vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white/95 to-transparent px-4 pb-4 pt-12 text-black sm:px-5 sm:pb-5">
                  <h3 className="font-serif text-lg sm:text-2xl">{tile.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fff0c9] px-4 py-12 text-black sm:px-5 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-[1280px] gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div className="relative mx-auto aspect-[1.35] w-full max-w-[580px] overflow-hidden">
            <Image src="/hero-image-3.jpeg" alt="Artisans and families preserving Indian traditions" fill sizes="(min-width: 1024px) 45vw, 90vw" className="object-cover" />
          </div>
          <div className="text-center">
            <h2 className="font-serif text-3xl leading-tight sm:text-4xl">A True Reflection of Authenticity<br className="hidden sm:block" /> &amp; Tradition</h2>
            <div className="mt-7 grid grid-cols-3 gap-3 sm:gap-5">
              {[
                { label: 'Verified artisans and weavers', Icon: BadgeCheck },
                { label: 'Exquisite products', Icon: Award },
                { label: 'Intricate designs', Icon: PackageCheck },
              ].map(({ label, Icon }) => (
                <div key={label} className="flex flex-col items-center gap-2 text-xs leading-5 sm:flex-row sm:text-sm">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border border-black/50"><Icon size={19} aria-hidden="true" /></span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <Link href="/products" className="mt-8 inline-flex min-h-12 items-center bg-[#f4a900] px-8 text-sm font-semibold text-black transition-colors hover:bg-[#e99b00]">Shop Now</Link>
          </div>
        </div>
      </section>

      <FantasticFinds />

      <section aria-labelledby="customer-stories-heading" className="bg-[#fff8e8] px-4 py-12 text-black sm:px-5 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-[1280px]">
          <h2 id="customer-stories-heading" className="text-center font-serif text-3xl sm:text-4xl">Hear From Our Happy Customers</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-6 sm:text-base">We’re collecting stories from customers who bring Indian craftsmanship into their homes. Check back soon to hear from them.</p>
          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            {communityNotes.map((note) => (
              <div key={note.title} className="border border-[#e5cfad] bg-white p-5 text-center sm:p-6">
                <span className="mx-auto grid size-10 place-items-center rounded-full bg-[#fff1c2] text-sm font-bold">{note.icon}</span>
                <h3 className="mt-3 font-serif text-xl">{note.title}</h3>
                <p className="mt-2 text-sm text-black/70">Customer stories coming soon</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 text-black sm:px-5 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-[1280px]">
          <h2 className="flex items-center justify-center gap-3 text-center font-serif text-3xl text-black sm:gap-5 sm:text-4xl"><span aria-hidden="true">⭐</span> Sellers of the Month <span aria-hidden="true">⭐</span></h2>
          <div className="mt-8 grid gap-5 sm:mt-10 lg:grid-cols-3 lg:gap-6">
            {sellerCards.map((seller) => (
              <article key={seller.name} className="overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(60,40,20,0.12)]">
                <div className="relative aspect-[2.1] overflow-hidden bg-[#f6e9d2]">
                  <Image src={seller.image} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
                  <div className="absolute right-4 top-0 flex h-20 w-16 flex-col items-center bg-[#f4a900] px-2 pt-3 text-center text-xs font-bold uppercase leading-tight text-black [clip-path:polygon(0_0,100%_0,100%_85%,50%_100%,0_85%)]">
                    <Crown size={19} aria-hidden="true" />
                    <span className="mt-1">Seller of the month</span>
                  </div>
                </div>
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <span className="grid size-14 shrink-0 place-items-center rounded-full border border-[#d5b879] bg-[#fffaf0] text-black"><Award size={28} aria-hidden="true" /></span>
                    <div className="min-w-0">
                      <h3 className="font-serif text-xl font-bold sm:text-2xl">{seller.name}</h3>
                      <p className="mt-1 flex items-center gap-1 text-sm text-black/70"><MapPin size={14} aria-hidden="true" />{seller.location}</p>
                    </div>
                  </div>
                  <p className="mt-4 min-h-12 text-sm leading-6 text-black/75">{seller.description}</p>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {seller.products.map((image, index) => (
                      <div key={`${seller.name}-${image}-${index}`} className="relative aspect-[1.4] overflow-hidden rounded-xl border border-[#e9dfcf]">
                        <Image src={image} alt="" fill sizes="120px" className="object-cover" />
                      </div>
                    ))}
                  </div>
                  <Link href={productsHref('handicrafts')} className="mt-5 block text-center text-sm font-semibold text-black hover:underline">Explore Store <ArrowRight className="ml-1 inline" size={15} aria-hidden="true" /></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fff1c2] px-4 py-12 text-black sm:px-5 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-[1280px] gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div className="text-center">
            <h2 className="font-serif text-3xl leading-tight sm:text-4xl">Sell Hassle Free<br />Become an Indian Heritager Seller</h2>
            <div className="mt-7 grid grid-cols-3 gap-3 sm:gap-5">
              {[
                { label: 'Zero commission', Icon: BadgeCheck },
                { label: 'Easy pickup & delivery', Icon: Truck },
                { label: 'Direct payment to bank accounts', Icon: WalletCards },
              ].map(({ label, Icon }) => (
                <div key={label} className="flex flex-col items-center gap-2 text-xs leading-5 sm:flex-row sm:text-sm">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border border-black/60"><Icon size={20} aria-hidden="true" /></span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <a href="mailto:support@indianheritager.com?subject=Become%20a%20seller" className="mt-8 inline-flex min-h-12 items-center bg-[#f4a900] px-8 text-sm font-semibold text-black transition-colors hover:bg-[#e99b00]">Register Now</a>
          </div>
          <div className="relative mx-auto aspect-[1.4] w-full max-w-[600px] overflow-hidden">
            <Image src="/hero-image-3.jpeg" alt="Indian artisan community sharing their work" fill sizes="(min-width: 1024px) 48vw, 90vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section id="about" className="bg-white px-4 py-12 text-black sm:px-5 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-[1280px] gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-12">
          <div>
            <p className="text-xs font-bold tracking-[0.2em]">OUR STORY</p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">Thoughtful living, rooted in heritage.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 sm:text-base">Indian Heritager Foundation curates culturally rooted products that celebrate Indian craftsmanship, everyday utility, and meaningful gifting. Each collection reflects India’s diverse stories, artistry, and timeless traditions.</p>
            <p className="mt-3 max-w-2xl text-sm leading-7 sm:text-base">We partner with artisans, makers, and community-led initiatives to offer products chosen for their quality, authenticity, and value.</p>
            <Link href="/products" className="mt-6 inline-flex min-h-12 items-center gap-2 bg-[#f4a900] px-6 text-sm font-semibold text-black transition-colors hover:bg-[#e99b00]">Explore products <ArrowRight size={16} /></Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {[
              { title: 'Curated quality', description: 'Thoughtful products chosen for beauty, utility, and lasting value.', Icon: Sparkles },
              { title: 'Craft with purpose', description: 'Meaningful commerce supporting makers and heritage communities.', Icon: Star },
              { title: 'Community impact', description: 'Celebrating the people and traditions behind every creation.', Icon: Heart },
            ].map(({ title, description, Icon }) => (
              <article key={title} className="flex gap-4 border border-[#e5cfad] bg-[#fff8e8] p-4 sm:p-5">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#f4a900]"><Icon size={20} aria-hidden="true" /></span>
                <div><h3 className="font-serif text-lg font-semibold">{title}</h3><p className="mt-1 text-sm leading-5 text-black/75">{description}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="seller-stories-heading" className="bg-[#fff1c2] px-4 py-12 text-black sm:px-5 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-[1280px]">
          <div className="mx-auto max-w-2xl text-center">
            <span className="mx-auto grid size-12 place-items-center rounded-full bg-[#f4a900]"><Store size={22} aria-hidden="true" /></span>
            <h2 id="seller-stories-heading" className="mt-4 font-serif text-3xl sm:text-4xl">Hear From Our Happy Sellers</h2>
            <p className="mt-3 text-sm leading-6 sm:text-base">We’re building a platform for artisans and independent makers to share their work. Seller stories will be featured here soon.</p>
            <a href="mailto:support@indianheritager.com?subject=Share%20your%20seller%20story" className="mt-6 inline-flex min-h-12 items-center bg-[#f4a900] px-6 text-sm font-semibold text-black transition-colors hover:bg-[#e99b00]">Share your story</a>
          </div>
        </div>
      </section>
    </main>
  )
}
