'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { productsHref } from '@/lib/categories'

const finds = [
  { name: 'Ethnic Accessories', category: 'accessories', image: '/hero-image-1.jpeg' },
  { name: 'Furniture', category: 'home-decor', image: '/hero-image-3.jpeg' },
  { name: 'Art & Collectibles', category: 'art-collectibles', image: '/hero-image-2.jpeg' },
  { name: 'Handcrafted Gifts', category: 'gifts', image: '/hero-image-2.jpeg' },
  { name: 'Handloom Clothing', category: 'clothing', image: '/hero-image-1.jpeg' },
  { name: 'Home Decor', category: 'home-decor', image: '/hero-image-3.jpeg' },
  { name: 'Jewellery', category: 'jewellery', image: '/hero-image-1.jpeg' },
  { name: 'Traditional Crafts', category: 'traditional-products', image: '/hero-image-2.jpeg' },
]

export function FantasticFinds() {
  const trackRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({ left: direction === 'left' ? -track.clientWidth : track.clientWidth, behavior: 'smooth' })
  }

  return (
    <section className="bg-white px-4 py-12 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
      <div className="relative mx-auto mt-5 max-w-[1280px] border border-[#e5cfad] px-4 pb-8 pt-10 sm:px-8 sm:pb-10 sm:pt-12">
        <h2 className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-white px-3 font-serif text-2xl text-[#84211d] sm:px-5 sm:text-4xl">
          Fantastic Finds
        </h2>
        <div className="relative">
          <div ref={trackRef} className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-8">
            {finds.map((find) => (
              <Link key={find.name} href={productsHref(find.category)} className="group min-w-[78%] snap-start sm:min-w-[44%] lg:min-w-[calc((100%-6rem)/4)]">
                <div className="relative aspect-[0.82] overflow-hidden bg-[#fff1d6]">
                  <Image src={find.image} alt="" fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 44vw, 78vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <h3 className="mt-4 font-serif text-xl text-[#84211d] transition-colors group-hover:text-[#b34a36] sm:text-2xl">{find.name}</h3>
              </Link>
            ))}
          </div>
          <button type="button" aria-label="Show previous finds" onClick={() => scroll('left')} className="absolute -left-4 top-[42%] grid size-8 -translate-y-1/2 place-items-center border border-[#84211d] bg-[#fffaf2] text-[#84211d] hover:bg-[#f4c532] sm:-left-12 sm:size-10">
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <button type="button" aria-label="Show more finds" onClick={() => scroll('right')} className="absolute -right-4 top-[42%] grid size-8 -translate-y-1/2 place-items-center border border-[#84211d] bg-[#fffaf2] text-[#84211d] hover:bg-[#f4c532] sm:-right-12 sm:size-10">
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  )
}
