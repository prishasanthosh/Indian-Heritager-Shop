import Link from 'next/link'
import { CategoryArtwork } from '@/components/category-artwork'

export default function GiTaggedPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fffdf7] px-4 py-10 text-[#1d1716] sm:px-5 lg:px-8 lg:py-16">
      <section className="mx-auto grid max-w-[1120px] overflow-hidden rounded-[32px] border border-[#e5d4b0] bg-[#f8f1e7] lg:grid-cols-[0.9fr_1.1fr]">
        <CategoryArtwork category="gi-tagged" className="min-h-[280px] lg:min-h-[520px]" />
        <div className="flex items-center p-6 sm:p-10 lg:p-14">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#702d32]">Region & provenance</p>
            <h1 className="mt-3 font-serif text-5xl leading-[0.92] text-[#1d1716] sm:text-6xl">GI Tagged Collection — Coming Soon</h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-[#4f4943]">
              We are preparing a collection of region-specific Indian products recognised for their geographical identity, distinctive skills and cultural provenance.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/" className="rounded-full bg-[#702d32] px-5 py-3 text-sm font-bold text-white hover:bg-[#5a2227]">Return home</Link>
              <Link href="/products" className="rounded-full border border-[#c8b592] bg-[#fffaf2] px-5 py-3 text-sm font-bold text-[#1d1716] hover:bg-[#f5ead8]">Explore the shop</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
