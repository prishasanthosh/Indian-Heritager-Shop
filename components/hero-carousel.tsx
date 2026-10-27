'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Pause, Play } from 'lucide-react'
import { useEffect, useState } from 'react'

const heroImages = [
  {
    src: '/hero-image-1.jpeg',
    position: 'object-[center_48%]',
    eyebrow: 'Handwoven stories',
    catchline: ['A Heritage', 'Woven Through Generations.'],
    description: 'Discover textiles and handmade objects selected for everyday living.',
  },
  {
    src: '/hero-image-2.jpeg',
    position: 'object-[center_45%]',
    eyebrow: 'Crafted & curated',
    catchline: ['Rooted in region.', 'Made for today.'],
    description: 'Explore heritage-inspired objects, traditional art and decorative pieces.',
  },
  {
    src: '/hero-image-3.jpeg',
    position: 'object-[center_58%]',
    eyebrow: 'Living traditions',
    catchline: ['Bring the archive', 'into everyday life.'],
    description: 'Find considered home pieces and keepsakes for everyday life.',
  },
]

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const intervalId = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % heroImages.length)
    }, 4200)

    return () => window.clearInterval(intervalId)
  }, [activeIndex, paused])

  return (
    <div className="relative isolate mx-auto grid min-h-[540px] w-full max-w-[1360px] overflow-hidden rounded-[28px] border border-[#e8d7ba] bg-[#201a17] lg:min-h-[620px]">
      <div aria-hidden="true" className="absolute inset-0 bg-[#201a17]">
        {heroImages.map((image, index) => (
          <Image
            key={image.src}
            src={image.src}
            alt=""
            fill
            sizes="100vw"
            loading={index === 0 ? 'eager' : 'lazy'}
            className={`object-cover transition-opacity duration-1000 ease-out motion-reduce:transition-none ${image.position} ${
              activeIndex === index ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>

      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,14,13,0.78)_0%,rgba(18,14,13,0.42)_45%,rgba(18,14,13,0.24)_100%)]" />

      <div className="relative z-10 grid w-full gap-6 px-5 pb-24 pt-7 sm:px-8 sm:pt-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:px-12 lg:pb-20 lg:pt-12">
        <div className="flex flex-col justify-end text-[#fffaf2]">
          <p className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.28em] backdrop-blur-sm">
            {heroImages[activeIndex].eyebrow}
          </p>
          <h1 className="max-w-[620px] text-[clamp(3.2rem,6.8vw,7rem)] font-normal leading-[0.86] tracking-[-0.06em] text-[#fffaf2]">
            <span className="block">{heroImages[activeIndex].catchline[0]}</span>
            <span className="block italic text-[#f1d7ab]">{heroImages[activeIndex].catchline[1]}</span>
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-6 text-[#fffaf2] sm:text-lg sm:leading-8">
            {heroImages[activeIndex].description}
          </p>

          <div className="mt-7 flex flex-wrap gap-3 sm:gap-4">
            <Link href="/products" className="inline-flex items-center justify-center rounded-full bg-[#b9563d] px-5 py-3 text-sm font-bold text-[#fffaf2] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#c86949] sm:px-6">
              Explore collection
            </Link>
            <Link href="/#about" className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/8 px-5 py-3 text-sm font-bold text-[#fffaf2] backdrop-blur-sm transition-colors hover:bg-white/12 sm:px-6">
              Discover our heritage
            </Link>
          </div>
        </div>

        <div className="hidden items-end justify-end lg:flex">
          <div className="w-full rounded-[20px] border border-white/20 bg-[#f6f0e8]/90 p-4 text-[#1b1714] backdrop-blur-sm">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#702d32]">Heritage edit</p>
            <p className="mt-3 font-serif text-2xl leading-tight text-[#1d1716]">Craft for everyday rituals.</p>
            <p className="mt-2 text-sm leading-6 text-[#413d38]">
              Explore textiles, decorative objects and keepsakes from the collection.
            </p>
          </div>
        </div>
      </div>

      <div role="group" aria-label="Hero carousel controls" className="absolute bottom-4 right-4 z-20 flex items-center gap-2 sm:bottom-6 sm:right-7">
        {heroImages.map((image, index) => (
          <button
            key={image.src}
            type="button"
            aria-label={`Show hero image ${index + 1} of ${heroImages.length}`}
            aria-current={activeIndex === index ? 'true' : undefined}
            onClick={() => setActiveIndex(index)}
            className={`h-2.5 rounded-full border border-white/60 transition-all duration-300 motion-reduce:transition-none ${
              activeIndex === index ? 'w-8 bg-[#f3d39a]' : 'w-2.5 bg-white/50'
            }`}
          />
        ))}
        <span className="ml-1 rounded-full bg-black/35 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#fffaf2]" aria-label={`Slide ${activeIndex + 1} of ${heroImages.length}`}>
          {activeIndex + 1} / {heroImages.length}
        </span>
        <button
          type="button"
          aria-label={paused ? 'Resume hero carousel' : 'Pause hero carousel'}
          aria-pressed={paused}
          onClick={() => setPaused((value) => !value)}
          className="grid size-8 shrink-0 place-items-center rounded-full border border-white/60 bg-black/30 text-white hover:bg-black/50 motion-reduce:hidden"
        >
          {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
        </button>
      </div>
    </div>
  )
}
