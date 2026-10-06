'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react'

export type VideoStory = {
  name: string
  description: string
  videoId?: string
  videoUrl?: string
  image: string
}

export function TestimonialCarousel({
  id,
  title,
  stories,
}: {
  id: string
  title: string
  stories: VideoStory[]
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeStory, setActiveStory] = useState<VideoStory | null>(null)

  useEffect(() => {
    if (!activeStory) return

    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveStory(null)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [activeStory])

  const scroll = (direction: 'left' | 'right') => {
    const track = trackRef.current
    const card = track?.firstElementChild
    if (!track || !(card instanceof HTMLElement)) return

    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0
    track.scrollBy({
      left: direction === 'left' ? -(card.offsetWidth + gap) : card.offsetWidth + gap,
      behavior: 'smooth',
    })
  }

  return (
    <>
      <section aria-labelledby={`${id}-heading`} className="bg-white px-4 py-10 text-[#601010] sm:px-5 sm:py-14 lg:px-8 lg:py-16">
        <div className="relative mx-auto mt-5 max-w-[1280px] border border-[#e5cfad] px-4 pb-6 pt-9 sm:px-8 sm:pb-9 sm:pt-11">
          <h2 id={`${id}-heading`} className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-white px-3 text-center font-serif text-xl sm:px-5 sm:text-3xl">
            {title}
          </h2>
          <div className="relative">
            <div
              ref={trackRef}
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-5"
            >
              {stories.map((story, index) => (
                <article key={story.videoId ?? story.name} className={`min-w-[88%] snap-start border border-[#e5cfad] p-4 sm:min-w-[calc((100%-2.5rem)/3)] sm:p-5 ${index % 2 === 0 ? 'bg-[#fff8e8]' : 'bg-white'}`}>
                  {story.videoUrl ? (
                    <a
                      href={story.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Watch ${story.name}'s artisan story on YouTube`}
                      className="group relative block aspect-video w-full overflow-hidden bg-[#f6e9d2]"
                    >
                      <img src={story.image} alt="" loading="lazy" className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
                      <span className="absolute inset-0 grid place-items-center bg-black/10 transition-colors group-hover:bg-black/25">
                        <span className="grid size-12 place-items-center rounded-lg border-2 border-white bg-black/20 text-white">
                          <Play size={23} fill="currentColor" aria-hidden="true" />
                        </span>
                      </span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActiveStory(story)}
                      aria-label={`Play video: ${story.name}`}
                      className="group relative block aspect-video w-full overflow-hidden bg-[#f6e9d2]"
                    >
                      <img src={story.image} alt="" loading="lazy" className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
                      <span className="absolute inset-0 grid place-items-center bg-black/10 transition-colors group-hover:bg-black/25">
                        <span className="grid size-12 place-items-center rounded-lg border-2 border-white bg-black/20 text-white">
                          <Play size={23} fill="currentColor" aria-hidden="true" />
                        </span>
                      </span>
                    </button>
                  )}
                  <h3 className="mt-4 font-serif text-lg font-semibold sm:text-xl">{story.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#071b2b]">{story.description}</p>
                  {story.videoUrl && (
                    <a href={story.videoUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-semibold text-[#601010] underline underline-offset-4 hover:text-[#b06f00]">
                      Watch artisan story on YouTube
                    </a>
                  )}
                </article>
              ))}
            </div>
            <button
              type="button"
              aria-label={`Show previous ${title.toLowerCase()}`}
              onClick={() => scroll('left')}
              className="absolute -left-4 top-1/3 grid size-8 -translate-y-1/2 place-items-center border border-[#601010] bg-[#fffdf7] text-[#601010] transition hover:bg-[#fff1c2] sm:-left-12 sm:size-10"
            >
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label={`Show more ${title.toLowerCase()}`}
              onClick={() => scroll('right')}
              className="absolute -right-4 top-1/3 grid size-8 -translate-y-1/2 place-items-center border border-[#601010] bg-[#fffdf7] text-[#601010] transition hover:bg-[#fff1c2] sm:-right-12 sm:size-10"
            >
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {activeStory?.videoId && (
        <div
          className="fixed inset-0 z-[80] grid place-items-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeStory.name} video`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveStory(null)
          }}
        >
          <div className="relative w-full max-w-4xl">
            <button
              type="button"
              aria-label="Close video"
              onClick={() => setActiveStory(null)}
              className="absolute -top-12 right-0 grid size-10 place-items-center rounded-full bg-white text-[#601010]"
            >
              <X size={22} aria-hidden="true" />
            </button>
            <div className="aspect-video overflow-hidden bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeStory.videoId}?autoplay=1&rel=0`}
                title={`${activeStory.name} video`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="size-full"
              />
            </div>
            <p className="mt-3 text-center text-sm font-semibold text-white">{activeStory.name}</p>
          </div>
        </div>
      )}
    </>
  )
}
