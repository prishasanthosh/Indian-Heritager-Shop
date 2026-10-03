import Link from 'next/link'
import { ArrowRight, Heart, Sparkles, Star } from 'lucide-react'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f8f5ee] text-[#183d38]">
      <section className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-[#c26742]">OUR STORY</p>
            <h1 className="mt-4 font-serif text-5xl tracking-[-0.04em] sm:text-6xl">Thoughtful living, rooted in heritage.</h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-[#47575b]">
              Indian Heritager Foundation curates a collection of culturally rooted products that celebrate Indian craftsmanship,
              everyday utility, and meaningful gifting. Every purchase helps support community programmes and families working to
              keep heritage traditions alive.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/products" className="inline-flex items-center gap-2 bg-[#c26742] px-6 py-3 text-sm font-bold text-white">
                Explore products <ArrowRight size={16} />
              </Link>
              <Link href="/" className="border border-[#dcd3c2] bg-white px-6 py-3 text-sm font-bold text-[#183d38]">
                Back home
              </Link>
            </div>
          </div>

          <div className="rounded-[32px] border border-[#e6dcc7] bg-[#f3ebdc] p-7 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-full bg-[#173d38] text-[#f4bb20]">
                <Heart size={22} />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6d6258]">Our mission</p>
                <h2 className="font-serif text-2xl text-[#173d38]">Support craft, community, and care.</h2>
              </div>
            </div>

            <div className="mt-6 space-y-4 text-sm leading-7 text-[#41545c]">
              <p>We partner with artisans, makers, and community-led initiatives to offer products that are beautiful, practical, and rooted in meaningful traditions.</p>
              <p>From home essentials and decorative pieces to curated gifts and everyday finds, each item is chosen to reflect quality, authenticity, and value.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#173d38] px-5 py-16 text-[#f8f5ee] lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold tracking-[0.2em] text-[#f4c532]">WHAT WE BELIEVE</p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { icon: Sparkles, title: 'Curated quality', text: 'Thoughtful products, chosen for beauty, utility, and lasting value.' },
              { icon: Star, title: 'Craft with purpose', text: 'Supporting makers and heritage communities through meaningful commerce.' },
              { icon: Heart, title: 'Community impact', text: 'A portion of each purchase supports programmes with lasting social value.' }
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <span className="mb-4 inline-flex rounded-full bg-[#f4bb20] p-3 text-[#173d38]">
                  <Icon size={18} />
                </span>
                <h3 className="font-serif text-2xl text-[#f8f5ee]">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#e8e1d5]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
