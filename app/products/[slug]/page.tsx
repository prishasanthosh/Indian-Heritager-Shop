import Link from 'next/link'
import { notFound } from 'next/navigation'
import { db } from '@/lib/db'
import { products, idFromProductSlug } from '@/lib/db/schema'
import { and, eq, notIlike } from 'drizzle-orm'
import { AddToCart } from './add-to-cart'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const product = await db.select({ title: products.title, description: products.description }).from(products).where(and(eq(products.id, idFromProductSlug((await params).slug)), notIlike(products.category, 'books'))).limit(1)
  return product[0]
    ? { title: `${product[0].title} | Indian Heritager`, description: product[0].description }
    : { title: 'Product | Indian Heritager' }
}

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const product = (await db.select().from(products).where(and(eq(products.id, idFromProductSlug((await params).slug)), notIlike(products.category, 'books'))).limit(1))[0]
  if (!product || product.isArchived) notFound()

  return (
    <main className="min-h-screen overflow-x-clip bg-[#f8f5ee] px-4 py-7 text-[#1d1716] sm:px-5 sm:py-10 md:px-10">
      <div className="mx-auto max-w-[1200px]">
        <Link href="/products" className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-[#702d32] hover:text-[#5a2227]">← Back to catalogue</Link>

        <div className="mt-6 overflow-hidden rounded-[30px] border border-[#e7d9bb] bg-[#fffaf2] p-4 shadow-[0_20px_50px_rgba(40,38,33,0.05)] sm:p-6 lg:p-8">
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="flex aspect-[4/5] min-h-0 items-center justify-center overflow-hidden rounded-[26px] border border-[#e7d9bb] bg-[#e8dcc7] p-3 sm:min-h-[480px] sm:p-5">
              {product.cover
                ? <img src={product.cover} alt={`Product image for ${product.title}`} className="h-full w-full rounded-[18px] object-cover" />
                : <span className="font-serif text-4xl font-bold text-[#1d1716]">{product.title}</span>}
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#702d32]">{product.category}</p>
              <h1 className="mt-3 break-words font-serif text-[clamp(2.1rem,6vw,4rem)] leading-[0.96] text-[#1d1716]">{product.title}</h1>
              <p className="mt-3 text-base text-[#5f5a56] sm:text-lg">{product.author || 'Curated product'}</p>

              <div className="mt-6 flex flex-wrap items-end gap-3 rounded-full border border-[#ead7b1] bg-[#f7f1e6] px-4 py-3">
                <span className="text-2xl font-bold text-[#1d1716] sm:text-3xl">₹{product.price.toLocaleString('en-IN')}</span>
                {product.originalPrice && <span className="text-sm text-[#5f5a56] line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>}
              </div>

              <p className="mt-4 text-sm font-medium text-[#5f5a56]">{product.stock > 0 ? `${product.stock} available` : 'Out of Stock'}</p>
              <p className="mt-5 max-w-xl leading-7 text-[#433e38] sm:text-base">{product.description || 'A thoughtfully selected product for everyday living.'}</p>

              <AddToCart id={product.id} stock={product.stock} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
