import Link from 'next/link'
import { notFound } from 'next/navigation'
import { db } from '@/lib/db'
import { books, idFromBookSlug } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { StoreHeader } from '@/components/store-header'
import { AddToCart } from './add-to-cart'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const product = await db.select({ title: books.title, description: books.description }).from(books).where(eq(books.id, idFromBookSlug((await params).slug))).limit(1)
  return product[0]
    ? { title: `${product[0].title} | Indian Heritager`, description: product[0].description }
    : { title: 'Product | Indian Heritager' }
}

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const product = (await db.select().from(books).where(eq(books.id, idFromBookSlug((await params).slug))).limit(1))[0]
  if (!product || product.isArchived) notFound()

  return (
    <>
      <StoreHeader />
      <main className="min-h-screen bg-[#f8f5ee] px-5 py-10 text-[#183d38] md:px-10">
        <div className="mx-auto max-w-5xl">
          <Link href="/products" className="text-sm font-bold text-[#c26742]">← Back to catalogue</Link>
          <div className="mt-10 grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
            <div className="flex min-h-[420px] items-center justify-center overflow-hidden border border-[#dcd3c2] bg-[#eadfce] p-5 text-center">
              {product.cover
                ? <img src={product.cover} alt={`Product image for ${product.title}`} className="max-h-[620px] w-full object-contain" />
                : <span className="font-serif text-4xl font-bold text-[#183d38]">{product.title}</span>}
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c26742]">{product.category}</p>
              <h1 className="mt-3 font-serif text-5xl leading-[0.95]">{product.title}</h1>
              <p className="mt-4 text-lg text-[#59645f]">{product.author || 'Curated product'}</p>
              <p className="mt-8 leading-7 text-[#59645f]">{product.description || 'A thoughtfully selected product for everyday living.'}</p>
              <div className="mt-8 flex items-end gap-3">
                <span className="text-3xl font-bold">₹{product.price.toLocaleString('en-IN')}</span>
                {product.originalPrice && <span className="text-sm text-[#59645f] line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>}
              </div>
              <p className="mt-3 text-sm">{product.stock > 0 ? `${product.stock} available` : 'Out of Stock'}</p>
              <AddToCart id={product.id} stock={product.stock} />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
