'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react'
import { productCategories, getCategoryBySlug, productsHref } from '@/lib/categories'
import { useCart } from '@/components/cart-provider'

type Product = { id: string; title: string; author: string; category: string; price: number; originalPrice?: number | null; cover: string; badge?: string | null; rating: string | number; stock: number }
type ApiResponse = { products: Product[]; page: number; pageSize: number; hasMore: boolean; books?: Product[] }

const sortOptions = [
  { label: 'Relevance', value: 'featured' },
  { label: 'Newest', value: 'newest' },
  { label: 'Price: low to high', value: 'price-asc' },
  { label: 'Price: high to low', value: 'price-desc' },
  { label: 'Rating', value: 'rating' },
]

const productHref = (title: string, id: string) => `/products/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-${id}`

export default function ProductsPage() {
  const { add, items } = useCart()
  const [search, setSearch] = useState('')
  const [categorySlug, setCategorySlug] = useState('')
  const [price, setPrice] = useState('')
  const [rating, setRating] = useState('')
  const [inStock, setInStock] = useState(false)
  const [sort, setSort] = useState('featured')
  const [page, setPage] = useState(1)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [result, setResult] = useState<ApiResponse>({ products: [], page: 1, pageSize: 24, hasMore: false })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setSearch(params.get('search') ?? params.get('q') ?? '')
    setCategorySlug(params.get('category') ?? '')
    setSort(params.get('sort') ?? 'featured')
    setPage(Math.max(1, Number(params.get('page') ?? '1') || 1))
  }, [])

  const category = useMemo(() => getCategoryBySlug(categorySlug), [categorySlug])

  const updateUrl = (next: Record<string, string | number | boolean>) => {
    const params = new URLSearchParams()
    const values = { search, category: categorySlug, sort, page, ...next }
    if (values.search) params.set('search', values.search)
    if (values.category) params.set('category', values.category)
    if (values.sort && values.sort !== 'featured') params.set('sort', values.sort)
    if (values.page && values.page !== 1) params.set('page', String(values.page))
    window.history.pushState({}, '', `/products${params.toString() ? `?${params}` : ''}`)
  }

  useEffect(() => {
    const controller = new AbortController()
    const params = new URLSearchParams({ page: String(page), sort })
    if (search) params.set('q', search)
    if (category) params.set('category', category.value)
    if (price) params.set('price', price)
    if (rating) params.set('rating', rating)
    if (inStock) params.set('inStock', 'true')
    setLoading(true)
    fetch(`/api/products?${params}`, { signal: controller.signal })
      .then((response) => response.json())
      .then((data: ApiResponse) => setResult({ products: data.products ?? data.books ?? [], page: data.page ?? 1, pageSize: data.pageSize ?? 24, hasMore: Boolean(data.hasMore) }))
      .catch(() => setResult({ products: [], page, pageSize: 24, hasMore: false }))
      .finally(() => setLoading(false))
    return () => controller.abort()
  }, [page, search, category, sort, price, rating, inStock])

  const change = (next: Record<string, string | number | boolean>) => {
    if ('search' in next) setPage(1)
    if ('category' in next) setCategorySlug(String(next.category))
    if ('sort' in next) setSort(String(next.sort))
    if ('search' in next) setSearch(String(next.search))
    if ('page' in next) setPage(Number(next.page))
    if ('price' in next) setPrice(String(next.price))
    if ('rating' in next) setRating(String(next.rating))
    if ('inStock' in next) setInStock(Boolean(next.inStock))
    updateUrl({ page: 'search' in next || 'category' in next || 'sort' in next || 'price' in next || 'rating' in next || 'inStock' in next ? 1 : page, ...next })
  }

  const clearFilters = () => {
    setSearch('')
    setCategorySlug('')
    setPrice('')
    setRating('')
    setInStock(false)
    setSort('featured')
    setPage(1)
    window.history.pushState({}, '', '/products')
  }

  const title = category?.name ?? 'All products'
  const products = result.products

  return (
    <main className="min-h-screen overflow-x-clip bg-[#f8f5ee] text-[#071b2b]">
      <section className="mx-auto max-w-[1280px] px-4 py-8 sm:px-5 sm:py-12 lg:px-8 lg:py-16">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[#c26742]"><ArrowLeft size={16} /> Back to home</Link>
        <div className="mt-6 flex flex-col justify-between gap-4 border-b border-[#dcd3c2] pb-6 sm:mt-8 sm:pb-8 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-[#c26742]">THE COLLECTION</p>
            <h1 className="mt-2 break-words font-serif text-4xl tracking-[-0.04em] sm:text-5xl">{title}</h1>
            <p className="mt-3 text-sm text-[#6e7069]">{loading ? 'Finding products…' : `${products.length}${result.hasMore ? '+' : ''} products`}</p>
          </div>
          <select aria-label="Sort products" value={sort} onChange={(event) => change({ sort: event.target.value })} className="h-11 w-full border border-[#dcd3c2] bg-[#fbfaf6] px-3 text-sm sm:w-auto">
            <option value="featured">Relevance</option>
            {sortOptions.slice(1).map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
          </select>
        </div>

        <div className="mt-6 grid gap-5 sm:mt-8 sm:gap-8 lg:grid-cols-[240px_1fr]">
          <button type="button" onClick={() => setFiltersOpen((open) => !open)} aria-expanded={filtersOpen} className="flex h-11 items-center justify-between border border-[#dcd3c2] bg-[#fbfaf6] px-3 text-sm font-bold lg:hidden">
            Filters <span aria-hidden="true">{filtersOpen ? '−' : '+'}</span>
          </button>
          <aside className={`${filtersOpen ? 'block' : 'hidden'} space-y-5 border border-[#dcd3c2] bg-[#fbfaf6] p-4 lg:block lg:border-0 lg:bg-transparent lg:p-0`}>
            <label className="block text-xs font-bold uppercase tracking-wider">Search
              <input value={search} onChange={(event) => change({ search: event.target.value })} placeholder="Name, brand, keyword" className="mt-2 h-11 w-full border border-[#dcd3c2] bg-[#fbfaf6] px-3 text-sm outline-none focus:border-[#c26742]" />
            </label>

            <label className="block text-xs font-bold uppercase tracking-wider">Category
              <select value={categorySlug} onChange={(event) => change({ category: event.target.value })} className="mt-2 h-11 w-full border border-[#dcd3c2] bg-[#fbfaf6] px-3 text-sm">
                <option value="">All categories</option>
                {productCategories.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
              </select>
            </label>

            <label className="block text-xs font-bold uppercase tracking-wider">Price
              <select value={price} onChange={(event) => change({ price: event.target.value })} className="mt-2 h-11 w-full border border-[#dcd3c2] bg-[#fbfaf6] px-3 text-sm">
                <option value="">Any price</option>
                <option value="under-500">Under ₹500</option>
                <option value="500-1000">₹500 – ₹1,000</option>
                <option value="over-1000">Over ₹1,000</option>
              </select>
            </label>

            <label className="block text-xs font-bold uppercase tracking-wider">Rating
              <select value={rating} onChange={(event) => change({ rating: event.target.value })} className="mt-2 h-11 w-full border border-[#dcd3c2] bg-[#fbfaf6] px-3 text-sm">
                <option value="">Any rating</option>
                <option value="4">4+ stars</option>
                <option value="3">3+ stars</option>
              </select>
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={inStock} onChange={(event) => change({ inStock: event.target.checked })} className="accent-[#c26742]" />
              In stock only
            </label>

            <button onClick={clearFilters} className="text-sm font-bold text-[#c26742] underline underline-offset-4">Clear filters</button>
          </aside>

          <div>
            {loading ? (
              <p className="py-24 text-center font-serif text-2xl">Loading the collection…</p>
            ) : products.length === 0 ? (
              <div className="border border-[#dcd3c2] bg-[#fbfaf6] px-6 py-24 text-center">
                <BookOpen className="mx-auto mb-5 text-[#c26742]" size={34} />
                <h2 className="font-serif text-3xl">{category ? 'No products in this category yet' : 'No products match your search'}</h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#6e7069]">Try another category or explore the full collection.</p>
                <Link href={productsHref()} className="mt-7 inline-flex bg-[#c26742] px-5 py-3 text-sm font-bold text-white">Show all products</Link>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 sm:gap-x-4 sm:gap-y-10 lg:grid-cols-4">
                  {products.map((product) => {
                    const quantityInCart = items.find((item) => item.id === product.id)?.quantity ?? 0
                    const atStockLimit = quantityInCart >= product.stock

                    return (
                      <article key={product.id} className="flex flex-col">
                        <Link href={productHref(product.title || product.author || 'product', product.id)} className="group overflow-hidden border border-[#dfd2be] bg-white hover:border-[#c26742]">
                          <div className="flex aspect-[4/5] items-center justify-center bg-[#eadfce] p-2 text-center font-serif text-xl text-[#071b2b] sm:p-4 sm:text-3xl">
                            {product.cover ? <img src={product.cover} alt={product.title} className="h-full w-full object-cover" /> : (product.title || 'Product')}
                          </div>
                          <div className="p-2.5 sm:p-4">
                            <div className="flex items-center justify-between gap-2 text-[11px] font-bold uppercase tracking-wider text-[#59645f]">
                              <span className="min-w-0 truncate">{product.category}</span>
                              {product.badge && <span className="shrink-0 bg-[#f4ede0] px-1.5 py-1 text-[#c26742] sm:px-2">{product.badge}</span>}
                            </div>
                            <h3 className="mt-2 break-words font-serif text-lg leading-tight text-[#071b2b] sm:mt-3 sm:text-2xl">{product.title}</h3>
                            <p className="mt-1 text-xs text-[#59645f] sm:mt-2 sm:text-sm">{product.author || 'Curated product'}</p>
                            <div className="mt-3 flex flex-wrap items-end gap-x-2 gap-y-1 sm:mt-4">
                              <span className="text-lg font-bold sm:text-xl">₹{product.price.toLocaleString('en-IN')}</span>
                              {product.originalPrice ? <span className="text-xs text-[#59645f] line-through sm:text-sm">₹{product.originalPrice.toLocaleString('en-IN')}</span> : null}
                            </div>
                          </div>
                        </Link>

                        <div className="mt-2 flex flex-col items-stretch justify-between gap-2 sm:mt-3 sm:flex-row sm:items-center sm:gap-3">
                          <span className="text-[10px] font-bold uppercase tracking-wide text-[#59645f] sm:text-xs">{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</span>
                          <button onClick={() => add(product.id, 1, product.stock)} disabled={product.stock <= 0 || atStockLimit} className="min-h-9 bg-[#c26742] px-2 py-2 text-xs font-bold text-white disabled:cursor-not-allowed disabled:opacity-60 sm:px-3 sm:text-sm">Add to cart</button>
                        </div>
                      </article>
                    )
                  })}
                </div>

                <div className="mt-10 flex items-center justify-between gap-4">
                  <button disabled={page <= 1} onClick={() => change({ page: page - 1 })} className="inline-flex items-center gap-2 border border-[#dcd3c2] bg-white px-3 py-2 text-sm font-bold text-[#071b2b] disabled:cursor-not-allowed disabled:opacity-50">
                    <span className="inline-flex items-center gap-2">◀ Prev</span>
                  </button>
                  <span className="text-sm font-bold text-[#59645f]">Page {page}</span>
                  <button disabled={!result.hasMore} onClick={() => change({ page: page + 1 })} className="inline-flex items-center gap-2 border border-[#dcd3c2] bg-white px-3 py-2 text-sm font-bold text-[#071b2b] disabled:cursor-not-allowed disabled:opacity-50">
                    Next ▶
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
