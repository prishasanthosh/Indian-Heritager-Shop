'use client'

import { useCallback, useEffect, useRef } from 'react'

export function useLoopingCarousel(itemCount: number) {
  const trackRef = useRef<HTMLDivElement>(null)
  const activeIndex = useRef(0)
  const resetTimeout = useRef<number | null>(null)

  const scroll = useCallback((direction: 'left' | 'right') => {
    const track = trackRef.current
    const firstItem = track?.firstElementChild
    if (!track || !(firstItem instanceof HTMLElement) || itemCount === 0) return

    if (resetTimeout.current !== null) {
      window.clearTimeout(resetTimeout.current)
      resetTimeout.current = null
    }

    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0
    const distance = firstItem.getBoundingClientRect().width + gap

    if (direction === 'left' && activeIndex.current === 0) {
      track.scrollTo({ left: distance * itemCount, behavior: 'instant' })
      activeIndex.current = itemCount
    } else if (direction === 'right' && activeIndex.current === itemCount) {
      track.scrollTo({ left: 0, behavior: 'instant' })
      activeIndex.current = 0
    }

    track.scrollBy({ left: direction === 'left' ? -distance : distance, behavior: 'smooth' })
    activeIndex.current += direction === 'left' ? -1 : 1

    if (activeIndex.current === itemCount) {
      resetTimeout.current = window.setTimeout(() => {
        trackRef.current?.scrollTo({ left: 0, behavior: 'instant' })
        activeIndex.current = 0
        resetTimeout.current = null
      }, 600)
    }
  }, [itemCount])

  useEffect(() => {
    const intervalId = window.setInterval(() => scroll('right'), 3000)
    return () => {
      window.clearInterval(intervalId)
      if (resetTimeout.current !== null) window.clearTimeout(resetTimeout.current)
    }
  }, [scroll])

  return { trackRef, scroll }
}
