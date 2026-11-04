'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function VendorProductList({ products }: { products: { id: string; title: string; category: string; price: number; stock: number; sku: string; moderationStatus: string; isArchived: boolean }[] }) {
  const router = useRouter()
  const [busy, setBusy] = useState('')
  async function archive(id: string) {
    if (!confirm('Archive this product?')) return
    setBusy(id)
    await fetch(`/api/vendor/products?id=${encodeURIComponent(id)}`, { method: 'DELETE' })
    setBusy(''); router.refresh()
  }
  return <section className="mt-6 overflow-hidden rounded-[24px] bg-white">
    {products.length === 0 ? <p className="p-6">No products yet.</p> : products.map(product => <div key={product.id} className="flex flex-wrap items-center justify-between gap-4 border-b p-5"><div><strong>{product.title}</strong><p className="text-sm text-[#59645f]">{product.category} · ₹{product.price} · {product.stock} in stock · SKU {product.sku}</p></div><div className="flex items-center gap-3"><span className="text-sm font-bold capitalize">{product.isArchived ? 'archived' : product.moderationStatus}</span><Link href={`/vendor/products/${product.id}/edit`} className="rounded-full border px-3 py-2 text-sm font-bold">Edit</Link>{!product.isArchived && <button disabled={busy === product.id} onClick={() => void archive(product.id)} className="rounded-full border border-red-200 px-3 py-2 text-sm font-bold text-red-700">{busy === product.id ? 'Archiving…' : 'Archive'}</button>}</div></div>)}
  </section>
}
