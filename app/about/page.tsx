import Link from 'next/link'
import { ArrowRight, Heart, Sparkles, Star } from 'lucide-react'

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#fffdf7] text-black">
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-5 sm:py-16 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-black">OUR STORY</p>
            <h1 className="mt-4 font-serif text-4xl tracking-[-0.04em] sm:text-6xl">Thoughtful living, rooted in heritage.</h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-black/75 sm:mt-6">
              Indian Heritager Foundation curates a collection of culturally rooted products that celebrate Indian craftsmanship,
              everyday utility, and meaningful gifting. Every purchase helps support community programmes and families working to
              keep heritage traditions alive.
            </p>
            <div className="mt-7 flex flex-wrap gap-3 sm:mt-8">
              <Link href="/products" className="inline-flex items-center gap-2 bg-[#f4a900] px-4 py-3 text-sm font-bold text-black sm:px-6">
                Explore products <ArrowRight size={16} />
              </Link>
              <Link href="/" className="border border-[#dcd3c2] bg-white px-6 py-3 text-sm font-bold text-black">
                Back home
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-[#e6dcc7] bg-[#f3ebdc] p-5 shadow-sm sm:rounded-[32px] sm:p-7">
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-full bg-[#f4a900] text-black">
                <Heart size={22} />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/70">Our mission</p>
                <h2 className="font-serif text-2xl text-black">Support craft, community, and care.</h2>
              </div>
            </div>

            <div className="mt-6 space-y-4 text-sm leading-7 text-black/75">
              <p>We partner with artisans, makers, and community-led initiatives to offer products that are beautiful, practical, and rooted in meaningful traditions.</p>
              <p>From home essentials and decorative pieces to curated gifts and everyday finds, each item is chosen to reflect quality, authenticity, and value.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fff1c2] px-4 py-10 text-black sm:px-5 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold tracking-[0.2em] text-black">WHAT WE BELIEVE</p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { icon: Sparkles, title: 'Curated quality', text: 'Thoughtful products, chosen for beauty, utility, and lasting value.' },
              { icon: Star, title: 'Craft with purpose', text: 'Supporting makers and heritage communities through meaningful commerce.' },
              { icon: Heart, title: 'Community impact', text: 'A portion of each purchase supports programmes with lasting social value.' }
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-black/10 bg-white/50 p-5 sm:rounded-3xl sm:p-6">
                <span className="mb-4 inline-flex rounded-full bg-[#f4a900] p-3 text-black">
                  <Icon size={18} />
                </span>
                <h3 className="font-serif text-2xl text-black">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-black/75">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
