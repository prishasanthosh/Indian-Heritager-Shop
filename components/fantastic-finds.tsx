'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { CategoryArtwork } from '@/components/category-artwork'
import { useCart } from '@/components/cart-provider'
import { productCategories } from '@/lib/categories'

type Product = {
  id: string
  title: string
  author: string
  category: string
  price: number
  cover: string
  stock: number
}

type ProductsResponse = { products: Product[] }

function getCategorySlug(category: string) {
  return productCategories.find((item) => item.value.toLowerCase() === category.toLowerCase())?.slug ?? 'other-products'
}

function ProductImage({ product, categorySlug }: { product: Product; categorySlug: string }) {
  const [failed, setFailed] = useState(false)

  if (!product.cover || failed) return <CategoryArtwork category={categorySlug} className="size-full" />

  return (
    <img
      src={product.cover}
      alt={product.title}
      loading="lazy"
      onError={() => setFailed(true)}
      className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
    />
  )
}

export function FantasticFinds() {
  const { add, items } = useCart()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    fetch('/api/products?featured=true', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load featured products.')
        return response.json() as Promise<ProductsResponse>
      })
      .then((data) => setProducts(data.products))
      .catch((cause: unknown) => {
        if (cause instanceof Error && cause.name === 'AbortError') return
        setError(cause instanceof Error ? cause.message : 'Unable to load featured products.')
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [])

  return (
    <section aria-labelledby="featured-products-heading" className="px-4 py-8 sm:px-5 sm:py-10 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-[1360px]">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.26em] text-[#702d32]">Selected from the catalogue</p>
            <h2 id="featured-products-heading" className="mt-2 font-serif text-4xl leading-none text-[#1d1716] sm:text-5xl">Featured products</h2>
          </div>
          <Link href="/products" className="inline-flex shrink-0 items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#702d32] hover:text-[#b9563d] sm:text-sm">
            View all <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>

        {loading ? (
          <p className="rounded-[24px] border border-[#e7d9bb] bg-[#fffaf2] px-5 py-12 text-center font-serif text-2xl text-[#5f5a56]" role="status">Loading featured products…</p>
        ) : error ? (
          <p className="rounded-[24px] border border-[#e7d9bb] bg-[#fffaf2] px-5 py-12 text-center text-sm text-[#702d32]" role="alert">{error}</p>
        ) : products.length === 0 ? (
          <p className="rounded-[24px] border border-[#e7d9bb] bg-[#fffaf2] px-5 py-12 text-center text-sm text-[#5f5a56]">
            No featured products are available right now. <Link href="/products" className="font-bold text-[#702d32] underline underline-offset-4">Browse the full catalogue</Link>.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
            {products.slice(0, 8).map((product) => {
              const quantityInCart = items.find((item) => item.id === product.id)?.quantity ?? 0
              const categorySlug = getCategorySlug(product.category)

              return (
                <article key={product.id} className="flex min-w-0 flex-col overflow-hidden rounded-[22px] border border-[#e7d9bb] bg-[#fffaf2]">
                  <Link href={`/products/${product.id}`} className="group min-w-0">
                    <div className="relative aspect-[4/5] overflow-hidden bg-[#eee2d0]">
                      <ProductImage product={product} categorySlug={categorySlug} />
                    </div>
                    <div className="p-3 sm:p-4">
                      <p className="truncate text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#702d32]">{product.category}</p>
                      <h3 className="mt-2 line-clamp-2 font-serif text-xl leading-tight text-[#1d1716] sm:text-2xl">{product.title}</h3>
                      {product.author && <p className="mt-1 truncate text-xs text-[#5f5a56] sm:text-sm">{product.author}</p>}
                      <p className="mt-3 text-base font-bold text-[#1d1716]">₹{product.price.toLocaleString('en-IN')}</p>
                    </div>
                  </Link>
                  <button
                    type="button"
                    onClick={() => add(product.id, 1, product.stock)}
                    disabled={product.stock <= 0 || quantityInCart >= product.stock}
                    className="mx-3 mb-3 min-h-10 rounded-full bg-[#702d32] px-3 py-2 text-xs font-bold text-[#fffaf2] transition-colors hover:bg-[#5a2227] disabled:cursor-not-allowed disabled:opacity-50 sm:mx-4 sm:mb-4"
                  >
                    {product.stock <= 0 ? 'Out of stock' : quantityInCart >= product.stock ? 'Stock limit reached' : 'Add to cart'}
                  </button>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
