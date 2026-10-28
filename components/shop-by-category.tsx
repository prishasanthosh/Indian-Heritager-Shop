'use client'

import Image from 'next/image'
import Link from 'next/link'
import { CategoryArtwork } from '@/components/category-artwork'
export const categoryCardImages = {
  kids: undefined,
  women: undefined,
  men: undefined,
  handicrafts: '/hero-image-2.jpeg',
  'home-living': '/hero-image-3.jpeg',
  accessories: undefined,
  'art-collectibles': undefined,
  furniture: undefined,
  'gi-tagged': undefined,
} as const

const categories = [
  { name: 'Kids', slug: 'kids', href: '/products?category=clothing&subcategory=Kids' },
  { name: 'Women', slug: 'women', href: '/products?category=clothing&subcategory=Women' },
  { name: 'Men', slug: 'men', href: '/products?category=clothing&subcategory=Men' },
  { name: 'Handicrafts', slug: 'handicrafts', href: '/products?category=handicrafts' },
  { name: 'Home & Living', slug: 'home-living', href: '/products?category=home-decor' },
  { name: 'Accessories', slug: 'accessories', href: '/products?category=accessories' },
  { name: 'Art & Collectibles', slug: 'art-collectibles', href: '/products?category=art-collectibles' },
  { name: 'Furniture', slug: 'furniture', href: '/products?category=home-decor&subcategory=Furniture' },
  { name: 'GI Tagged', slug: 'gi-tagged', href: '/gi-tagged' },
]

export function ShopByCategory() {
  return (
    <section id="categories" className="px-4 py-8 sm:px-5 sm:py-10 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-[1360px]">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.26em] text-[#702d32]">Curated collections</p>
            <h2 className="mt-2 font-serif text-4xl leading-none text-[#1f1b18] sm:text-5xl">Shop by heritage category</h2>
          </div>
          <Link href="/products" className="hidden text-sm font-bold uppercase tracking-[0.18em] text-[#702d32] hover:text-[#b9563d] sm:inline-flex">
            View all
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative aspect-[0.86] overflow-hidden rounded-[24px] border border-[#e8dcc6] bg-[#fbf5ee] transition-colors hover:border-[#b9563d]"
            >
              <div className="absolute inset-0 overflow-hidden">
                {categoryCardImages[category.slug as keyof typeof categoryCardImages] ? (
                <Image
                  src={categoryCardImages[category.slug as keyof typeof categoryCardImages] as string}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                ) : (
                  <CategoryArtwork category={category.slug} className="size-full transition-transform duration-500 group-hover:scale-[1.02]" />
                )}
              </div>
              {categoryCardImages[category.slug as keyof typeof categoryCardImages] && <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,rgba(27,23,20,0.68)_100%)]" />}
              <div className="absolute inset-x-0 bottom-0 flex min-w-0 items-end justify-between gap-2 p-3 sm:p-4">
                <h3 className="min-w-0 font-serif text-[1.7rem] leading-[0.95] text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.45)] sm:text-3xl">{category.name}</h3>
                <span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-full border border-white/60 bg-black/15 text-lg text-white backdrop-blur-sm sm:size-10">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
