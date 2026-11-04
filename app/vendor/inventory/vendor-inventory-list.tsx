'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function VendorInventoryList({ products }: { products: { id: string; title: string; sku: string; stock: number }[] }) {
  const router = useRouter()
  const [busy, setBusy] = useState('')
  async function save(id: string, stock: string) {
    setBusy(id)
    await fetch('/api/vendor/inventory', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, stock: Number(stock) }) })
    setBusy(''); router.refresh()
  }
  return <section className="mt-6 overflow-hidden rounded-[24px] bg-white">{products.map(product => <form key={product.id} onSubmit={event => { event.preventDefault(); void save(product.id, new FormData(event.currentTarget).get('stock')?.toString() ?? '0') }} className="grid gap-4 border-b p-5 sm:grid-cols-[1fr_180px_auto] sm:items-center"><div><strong>{product.title}</strong><p className="text-sm text-[#59645f]">{product.sku}</p></div><div><label className="block text-xs font-bold">Stock quantity</label><input name="stock" type="number" min="0" defaultValue={product.stock} className="mt-1 w-full border border-[#d8cbb7] px-3 py-2"/></div><div className="flex items-center gap-3"><span className={`text-sm font-bold ${product.stock === 0 ? 'text-red-700' : product.stock <= 5 ? 'text-amber-700' : 'text-emerald-700'}`}>{product.stock === 0 ? 'Out of stock' : product.stock <= 5 ? 'Low stock' : 'In stock'}</span><button disabled={busy === product.id} className="rounded-full border px-3 py-2 text-sm font-bold">{busy === product.id ? 'Saving…' : 'Update'}</button></div></form>)}</section>
}
