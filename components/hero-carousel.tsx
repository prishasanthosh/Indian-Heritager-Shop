'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const heroImages = [
  {
    src: '/hero-image-1.jpeg',
    position: 'object-center',
    catchline: ['Shop thoughtfully.', 'Celebrate craft.'],
    description: 'Discover handloom textiles and thoughtful essentials shaped by generations of Indian craftsmanship.',
  },
  {
    src: '/hero-image-2.jpeg',
    position: 'object-center',
    catchline: ['Discover timeless art.', 'Celebrate tradition.'],
    description: 'Explore one-of-a-kind creations that bring regional artistry and tradition into everyday life.',
  },
  {
    src: '/hero-image-3.jpeg',
    position: 'object-center',
    catchline: ['Bring heritage home.', 'Live beautifully.'],
    description: 'Find meaningful decor, gifts, and keepsakes made to celebrate India’s vibrant heritage.',
  },
]

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % heroImages.length)
    }, 3000)

    return () => window.clearInterval(intervalId)
  }, [])

  return (
    <>
      <div aria-hidden="true" className="absolute inset-0 bg-[#fffdf7]">
        {heroImages.map((image, index) => (
          <Image
            key={image.src}
            src={image.src}
            alt=""
            fill
            sizes="100vw"
            preload={index === 0}
            loading={index === 0 ? undefined : 'eager'}
            className={`object-cover ${image.position} transition-opacity duration-[900ms] ease-in-out ${
              activeIndex === index ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>
      <div className="relative z-10 mx-auto w-full max-w-[1280px] text-[#601010]">
        <p className="mb-5 text-xs font-bold tracking-[0.24em] sm:mb-6 sm:text-sm">THE INDIAN HERITAGER PRODUCTS</p>
        <h1 className="max-w-[1100px] font-serif text-[clamp(2.65rem,8vw,7.5rem)] font-normal leading-[0.9]">
          <span className="block">{heroImages[activeIndex].catchline[0]}</span>
          <span className="block italic">{heroImages[activeIndex].catchline[1]}</span>
        </h1>
        <p className="mt-6 max-w-3xl text-sm leading-6 sm:mt-8 sm:text-lg sm:leading-8" aria-live="polite">
          {heroImages[activeIndex].description}
        </p>
        <div className="mt-7 flex flex-wrap gap-3 sm:mt-9">
          <Link href="/products" className="inline-flex items-center gap-2 bg-[#f4a900] px-4 py-3 text-sm font-bold text-[#601010] transition hover:bg-[#e99b00] sm:gap-3 sm:px-6 sm:py-3.5">
            Browse products
          </Link>
          <Link href="/#about" className="border border-[#601010]/60 bg-white/70 px-4 py-3 text-sm font-bold text-[#601010] hover:bg-white sm:px-6 sm:py-3.5">
            Our story
          </Link>
        </div>
      </div>
      <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2 sm:bottom-6 sm:right-8" aria-label={`Hero image ${activeIndex + 1} of ${heroImages.length}`}>
        {heroImages.map((image, index) => (
          <button
            key={image.src}
            type="button"
            aria-label={`Show hero image ${index + 1} of ${heroImages.length}`}
            aria-current={activeIndex === index ? 'true' : undefined}
            onClick={() => setActiveIndex(index)}
            className={`h-2.5 rounded-full border border-[#601010] transition-all ${activeIndex === index ? 'w-8 bg-[#f4a900]' : 'w-2.5 bg-white/80'}`}
          />
        ))}
        <span className="ml-1 rounded bg-[#fffdf7]/90 px-2 py-1 text-xs font-bold text-[#601010]" aria-live="polite">{activeIndex + 1} / {heroImages.length}</span>
      </div>
    </>
  )
}
