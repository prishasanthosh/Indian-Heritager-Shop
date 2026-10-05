'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const heroImages = [
  { src: '/hero-image-1.jpeg', position: 'object-center' },
  { src: '/hero-image-2.jpeg', position: 'object-center' },
  { src: '/hero-image-3.jpeg', position: 'object-center' },
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
      <div aria-hidden="true" className="absolute inset-0 bg-[#fff1c2]">
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
      <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2 sm:bottom-6 sm:right-8" aria-label={`Hero image ${activeIndex + 1} of ${heroImages.length}`}>
        {heroImages.map((image, index) => (
          <button
            key={image.src}
            type="button"
            aria-label={`Show hero image ${index + 1} of ${heroImages.length}`}
            aria-current={activeIndex === index ? 'true' : undefined}
            onClick={() => setActiveIndex(index)}
            className={`h-2.5 rounded-full border border-black transition-all ${activeIndex === index ? 'w-8 bg-[#f4a900]' : 'w-2.5 bg-white/80'}`}
          />
        ))}
        <span className="ml-1 rounded bg-[#fff1c2]/90 px-2 py-1 text-xs font-bold text-black" aria-live="polite">{activeIndex + 1} / {heroImages.length}</span>
      </div>
    </>
  )
}
