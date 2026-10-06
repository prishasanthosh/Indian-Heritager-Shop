const highlights = [
  'Rooted in Indian heritage',
  'Made by skilled hands',
  'Crafted with care',
  'Stories in every detail',
  'Thoughtful finds for your home',
]

export function HeritageMarquee() {
  return (
    <div className="overflow-hidden border-y border-[#e5cfad] bg-[#fff1c2] py-4 text-[#601010] sm:py-5">
      <div className="heritage-marquee-track flex w-max" aria-label={highlights.join(' • ')}>
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
            {highlights.map((highlight) => (
              <span key={`${copy}-${highlight}`} className="flex items-center whitespace-nowrap px-5 font-serif text-base sm:px-8 sm:text-lg">
                {highlight}
                <span aria-hidden="true" className="ml-10 text-[#b06f00] sm:ml-16">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
