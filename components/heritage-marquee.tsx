const highlights = [
  'Explore Indian craft traditions',
  'Textiles & decorative objects',
  'Gifts and everyday objects',
  'Browse by heritage category',
  'Discover the collection',
]

export function HeritageMarquee() {
  return (
    <div role="region" aria-label="Heritage collection highlights" className="overflow-hidden border-y border-[#e5cfad] bg-[#f7f1e6] py-3 text-[#702d32] sm:py-4">
      <div className="heritage-marquee-track flex w-full flex-wrap justify-center sm:w-max sm:flex-nowrap">
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className={`heritage-marquee-copy flex shrink-0 flex-wrap items-center justify-center sm:flex-nowrap ${copy === 1 ? 'hidden sm:flex sm:w-auto' : 'w-full sm:w-auto'}`}>
            {highlights.map((highlight) => (
              <span key={`${copy}-${highlight}`} className="flex items-center px-3 py-1 text-center font-serif text-sm leading-5 sm:whitespace-nowrap sm:px-8 sm:py-0 sm:text-lg">
                {highlight}
                <span aria-hidden="true" className="ml-3 text-[#a9874f] sm:ml-12">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
