import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, PackageCheck, Sparkles, Truck } from 'lucide-react'
import { CategoryArtwork } from '@/components/category-artwork'
import { FantasticFinds } from '@/components/fantastic-finds'
import { HeritageMarquee } from '@/components/heritage-marquee'
import { HeroCarousel } from '@/components/hero-carousel'
import { NewsletterSignup } from '@/components/newsletter-signup'
import { ShopByCategory } from '@/components/shop-by-category'
import { productsHref } from '@/lib/categories'

export default function Page() {
  return (
    <main className="home-page min-h-screen overflow-x-clip bg-[#fffdf7] text-black">
      <section id="top" className="relative px-4 py-5 sm:px-5 sm:py-7 lg:px-8 lg:py-8">
        <HeroCarousel />
      </section>

      <ShopByCategory />

      <section id="about" className="px-4 py-8 sm:px-5 sm:py-10 lg:px-8 lg:py-12">
        <span id="story" className="scroll-mt-24" />
        <div className="mx-auto max-w-[1360px] overflow-hidden rounded-[30px] border border-[#e5d4b0] bg-[#f8f1e7] shadow-[0_24px_60px_rgba(40,38,33,0.07)]">
          <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative min-h-[320px] overflow-hidden border-b border-[#e5d4b0] lg:min-h-[520px] lg:border-b-0 lg:border-r">
              <Image src="/hero-image-1.jpeg" alt="Indian textiles and decorative objects arranged in a home setting" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="flex items-center px-5 py-7 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#702d32]">Our story</p>
                <h2 className="mt-3 max-w-[560px] font-serif text-4xl leading-[0.9] text-[#1d1716] sm:text-5xl">Where Indian heritage becomes a lived, modern ritual.</h2>
                <p className="mt-5 max-w-[540px] text-sm leading-7 text-[#433e38] sm:text-base">
                  Our collection brings together products shaped by Indian craft traditions, cultural continuity and considered design.
                </p>
                <p className="mt-3 max-w-[540px] text-sm leading-7 text-[#433e38] sm:text-base">
                  From handloom textiles and decorative objects to meaningful gifts, explore pieces that bring heritage-inspired design into everyday life.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="#about" className="inline-flex items-center gap-2 rounded-full bg-[#702d32] px-5 py-3 text-sm font-bold text-[#fffaf2] transition-colors hover:bg-[#5a2227]">Know more</Link>
                  <Link href="/products" className="inline-flex items-center gap-2 rounded-full border border-[#c8b592] bg-[#fffaf2] px-5 py-3 text-sm font-bold text-[#1d1716] transition-colors hover:bg-[#f7efe1]">Explore products</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div aria-label="Shopping benefits" className="mx-auto mt-6 max-w-[1360px] rounded-[22px] border border-[#e5d4b0] bg-[#fffaf2] px-3 py-4 sm:px-6">
          <div className="grid gap-4 sm:grid-cols-3 sm:gap-0">
            {[
              { label: 'Craft-led collections', Icon: Sparkles },
              { label: 'Stock shown before checkout', Icon: PackageCheck },
              { label: 'Shipping shown in your cart', Icon: Truck },
            ].map(({ label, Icon }) => (
              <div key={label} className="flex items-center justify-center gap-3 py-2 text-sm font-semibold text-[#2b2723] sm:border-r sm:border-[#e7d9bb] sm:py-4 sm:text-base last:sm:border-r-0">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#f7eed8] text-[#702d32]"><Icon size={20} aria-hidden="true" /></span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FantasticFinds />

      <section aria-labelledby="maker-stories-heading" className="px-4 py-8 sm:px-5 sm:py-10 lg:px-8 lg:py-12">
        <div className="mx-auto grid max-w-[1360px] overflow-hidden rounded-[28px] border border-[#e7d9bb] bg-[#fffaf2] sm:grid-cols-[0.8fr_1.2fr]">
          <CategoryArtwork category="handicrafts" className="min-h-48 sm:min-h-64" />
          <div className="flex flex-col justify-center p-5 sm:p-8 lg:p-10">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.26em] text-[#702d32]">Maker stories</p>
            <h2 id="maker-stories-heading" className="mt-2 font-serif text-3xl leading-tight text-[#1d1716] sm:text-4xl">Stories from the people behind the craft.</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#5f5a56]">Verified seller profiles and artisan stories will be featured here when the details and media are available.</p>
            <Link href={productsHref('handicrafts')} className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-bold uppercase tracking-[0.15em] text-[#702d32] hover:text-[#b9563d]">Explore handicrafts <ArrowRight size={15} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 text-[#1d1716] sm:px-5 sm:py-10 lg:px-8 lg:py-12">
        <div className="mx-auto grid max-w-[1360px] gap-8 rounded-[32px] border border-[#e5d4b0] bg-[#f8f1e7] p-5 sm:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:p-10">
          <div className="flex items-center">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#702d32]">Become a seller</p>
              <h2 className="mt-3 font-serif text-4xl leading-[0.9] text-[#1d1716] sm:text-5xl">Bring your products to Indian Heritager.</h2>
              <p className="mt-5 max-w-xl text-sm leading-6 text-[#433e38]">Interested in listing heritage-inspired products? Contact our team to learn more about selling with Indian Heritager.</p>
              <a href="mailto:support@indianheritager.com?subject=Become%20a%20seller" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#702d32] px-5 py-3 text-sm font-bold text-[#fffaf2] transition-colors hover:bg-[#5a2227]">Register now</a>
            </div>
          </div>
          <div className="relative min-h-[240px] overflow-hidden rounded-[26px] border border-[#d4c1a8] lg:min-h-[300px]">
            <Image
              src="/Vendor.png"
              alt="Indian Heritager marketplace artisan and vendor"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <HeritageMarquee />
      <NewsletterSignup />
    </main>
  )
}
