'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { productCategories, productsHref } from '@/lib/categories'

const categoryImages: Record<string, string> = {
  clothing: '/hero-image-1.jpeg',
  handicrafts: '/hero-image-2.jpeg',
  'home-decor': '/hero-image-3.jpeg',
  jewellery: '/hero-image-1.jpeg',
  accessories: '/hero-image-1.jpeg',
  gifts: '/hero-image-2.jpeg',
  'art-collectibles': '/hero-image-2.jpeg',
  'traditional-products': '/hero-image-1.jpeg',
  'other-products': '/hero-image-3.jpeg',
}

const categories = productCategories.map((category) => ({
  name: category.name,
  href: productsHref(category.slug),
  image: categoryImages[category.slug],
}))

export function ShopByCategory() {
  const trackRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    const track = trackRef.current
    if (!track) return

    track.scrollBy({
      left: direction === 'left' ? -track.clientWidth : track.clientWidth,
      behavior: 'smooth',
    })
  }

  return (
    <section id="categories" className="bg-white px-4 py-12 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
      <div className="relative mx-auto mt-5 max-w-[1280px] border border-[#e5cfad] px-4 pb-7 pt-10 sm:px-8 sm:pb-10 sm:pt-12">
        <h2 className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-white px-3 font-serif text-2xl text-black sm:px-5 sm:text-4xl">
          Shop by Category
        </h2>

        <div className="relative">
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-6"
          >
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="group min-w-[78%] snap-start sm:min-w-[44%] lg:min-w-[calc((100%-4.5rem)/4)]"
              >
                <div className="relative aspect-[0.82] overflow-hidden bg-[#f8f0e4]">
                  <Image
                    src={category.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 44vw, 78vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-4 font-serif text-xl text-black transition-colors group-hover:text-[#b06f00] sm:text-2xl">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>

          <button
            type="button"
            aria-label="Show previous categories"
            onClick={() => scroll('left')}
            className="absolute -left-4 top-[42%] grid size-8 -translate-y-1/2 place-items-center border border-black bg-[#fffaf2] text-black transition-colors hover:bg-[#f4a900] sm:-left-12 sm:size-10"
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Show more categories"
            onClick={() => scroll('right')}
            className="absolute -right-4 top-[42%] grid size-8 -translate-y-1/2 place-items-center border border-black bg-[#fffaf2] text-black transition-colors hover:bg-[#f4a900] sm:-right-12 sm:size-10"
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  )
}
