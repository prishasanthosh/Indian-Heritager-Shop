'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const heroImages = [
  { src: '/hero-education.jpg', position: 'object-[58%_48%]' },
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
    <div aria-hidden="true" className="absolute inset-0 bg-[#031321]">
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
  )
}
