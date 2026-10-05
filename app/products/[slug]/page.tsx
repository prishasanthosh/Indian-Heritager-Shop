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
    <main className="min-h-screen overflow-x-clip bg-[#f8f5ee] px-4 py-7 text-[#071b2b] sm:px-5 sm:py-10 md:px-10">
        <div className="mx-auto max-w-5xl">
          <Link href="/products" className="text-sm font-bold text-[#c26742]">← Back to catalogue</Link>
          <div className="mt-6 grid gap-6 sm:mt-10 sm:gap-10 md:grid-cols-[0.8fr_1.2fr]">
            <div className="flex aspect-[4/5] min-h-0 items-center justify-center overflow-hidden border border-[#dcd3c2] bg-[#eadfce] p-3 text-center sm:aspect-auto sm:min-h-[420px] sm:p-5">
              {product.cover
                ? <img src={product.cover} alt={`Product image for ${product.title}`} className="max-h-[620px] w-full object-contain" />
                : <span className="font-serif text-4xl font-bold text-[#071b2b]">{product.title}</span>}
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c26742]">{product.category}</p>
              <h1 className="mt-3 break-words font-serif text-[clamp(2rem,8vw,3rem)] leading-[0.98] sm:text-5xl">{product.title}</h1>
              <p className="mt-3 text-base text-[#59645f] sm:mt-4 sm:text-lg">{product.author || 'Curated product'}</p>
              <p className="mt-6 leading-7 text-[#59645f] sm:mt-8">{product.description || 'A thoughtfully selected product for everyday living.'}</p>
              <div className="mt-6 flex flex-wrap items-end gap-3 sm:mt-8">
                <span className="text-2xl font-bold sm:text-3xl">₹{product.price.toLocaleString('en-IN')}</span>
                {product.originalPrice && <span className="text-sm text-[#59645f] line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>}
              </div>
              <p className="mt-3 text-sm">{product.stock > 0 ? `${product.stock} available` : 'Out of Stock'}</p>
              <AddToCart id={product.id} stock={product.stock} />
            </div>
          </div>
        </div>
    </main>
  )
}
