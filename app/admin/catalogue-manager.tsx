'use client'

import { useState } from 'react'
import { productCategories } from '@/lib/categories'

type Product = { id: string; title: string; author: string; category: string; description: string; price: number; originalPrice: number | null; cover: string; badge: string | null; stock: number; isArchived: boolean }
const empty = { title: '', author: '', category: productCategories[0].value, description: '', price: '', originalPrice: '', cover: '', badge: '', stock: '0', isArchived: false }

export function CatalogueManager({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState(initialProducts)
  const [form, setForm] = useState(empty)
  const [editing, setEditing] = useState<string | null>(null)
  const [message, setMessage] = useState('')
  const [uploading, setUploading] = useState(false)
  const update = (key: string, value: string) => setForm((current) => ({ ...current, [key]: value }))

  async function uploadCover(file: File | undefined) {
    if (!file) return
    setUploading(true)
    setMessage('Uploading product image…')
    try {
      const image = new FormData()
      image.append('image', file)
      const response = await fetch('/api/admin/products/image', { method: 'POST', body: image })
      const data = await response.json()
      if (!response.ok) {
        setMessage(data.error ?? 'Could not upload image.')
        return
      }
      update('cover', data.url)
      setMessage('Image uploaded and saved.')
    } catch {
      setMessage('Could not upload image. Check your connection and try again.')
    } finally {
      setUploading(false)
    }
  }

  async function save(event: React.FormEvent) {
    event.preventDefault(); setMessage('Saving…')
    const response = await fetch('/api/admin/products', { method: editing ? 'PATCH' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, id: editing, price: Number(form.price), originalPrice: form.originalPrice ? Number(form.originalPrice) : null, stock: Number(form.stock), isArchived: form.isArchived }) })
    const data = await response.json()
    if (!response.ok) return setMessage(data.error ?? 'Could not save product.')
    setProducts((current) => editing ? current.map((product) => product.id === data.id ? data : product) : [data, ...current])
    setForm(empty); setEditing(null); setMessage('Product saved.')
  }

  function edit(product: Product) {
    setEditing(product.id)
    setForm({ title: product.title, author: product.author, category: product.category, description: product.description, price: String(product.price), originalPrice: product.originalPrice ? String(product.originalPrice) : '', cover: product.cover, badge: product.badge ?? '', stock: String(product.stock), isArchived: product.isArchived })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function remove(id: string) {
    if (!window.confirm('Delete this product from the catalogue?')) return
    const response = await fetch(`/api/admin/products?id=${id}`, { method: 'DELETE' })
    if (response.ok) setProducts((current) => current.filter((product) => product.id !== id))
    else setMessage('Could not delete product.')
  }

  const fields = [['title', 'Title'], ['author', 'Brand / maker'], ['price', 'Price (₹)'], ['originalPrice', 'Original price (₹)'], ['stock', 'Stock'], ['badge', 'Badge']] as const

  return <div className="space-y-8">
    <form onSubmit={save} className="border border-[#dfd2be] bg-[#fffdf8] p-4 sm:p-5 md:p-7">
      <div className="mb-5 flex items-center justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c26742]">Product editor</p><h2 className="mt-1 font-serif text-2xl text-[#071b2b]">{editing ? 'Edit product' : 'Add a product'}</h2></div>{editing && <button type="button" onClick={() => { setEditing(null); setForm(empty) }} className="text-sm font-bold text-[#c26742]">Cancel edit</button>}</div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{fields.map(([key, label]) => <label key={key} className="text-sm font-semibold text-[#071b2b]">{label}<input required={['title', 'author', 'price'].includes(key)} value={form[key]} onChange={(event) => update(key, event.target.value)} className="mt-1 w-full border border-[#d8cbb7] bg-white px-3 py-2 font-normal outline-none focus:border-[#c26742]" /></label>)}<label className="text-sm font-semibold text-[#071b2b]">Category<select required value={form.category} onChange={(event) => update('category', event.target.value)} className="mt-1 w-full border border-[#d8cbb7] bg-white px-3 py-2 font-normal outline-none focus:border-[#c26742]">{productCategories.map((category) => <option key={category.value} value={category.value}>{category.name}</option>)}</select></label></div>
      <div className="mt-4 grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <label className="block min-w-0 text-sm font-semibold text-[#071b2b]">Product image<input type="file" accept="image/jpeg,image/png,image/webp" disabled={uploading} onChange={(event) => { void uploadCover(event.target.files?.[0]); event.currentTarget.value = '' }} className="mt-1 block min-h-10 max-w-full min-w-0 text-sm font-normal file:mr-2 file:border-0 file:bg-[#e9dfc9] file:px-2 file:py-2 file:font-semibold file:text-[#071b2b] hover:file:bg-[#d9c9a8] disabled:opacity-50 sm:file:mr-3 sm:file:px-3" /><span className="mt-1 block text-xs font-normal text-[#6e7069]">JPEG, PNG, or WebP · maximum 5 MB</span></label>
        <div className="flex min-h-24 items-center gap-4 border border-[#d8cbb7] bg-white p-3">
          {form.cover ? <><img src={form.cover} alt="Product preview" className="h-24 w-16 object-cover" /><span className="min-w-0 break-all text-xs text-[#59645f]">Image uploaded and ready to save</span><button type="button" onClick={() => update('cover', '')} className="ml-auto shrink-0 text-sm font-bold text-[#c26742]">Remove</button></> : <span className="text-sm text-[#6e7069]">Image preview will appear here.</span>}
        </div>
      </div>
      <label className="mt-4 flex items-center gap-3 text-sm font-semibold text-[#071b2b]"><input type="checkbox" checked={form.isArchived} onChange={(event) => setForm((current) => ({ ...current, isArchived: event.target.checked }))} /> Archive this product (hide from shoppers)</label>
      <label className="mt-4 block text-sm font-semibold text-[#071b2b]">Description<textarea value={form.description} onChange={(event) => update('description', event.target.value)} rows={3} className="mt-1 w-full border border-[#d8cbb7] bg-white px-3 py-2 font-normal outline-none focus:border-[#c26742]" /></label>
      <div className="mt-5 flex flex-wrap items-center gap-4"><button disabled={uploading} className="bg-[#c26742] px-5 py-3 text-sm font-bold text-white hover:bg-[#a94f30] disabled:cursor-not-allowed disabled:opacity-60">{editing ? 'Update product' : 'Add product'}</button>{message && <span role="status" className="text-sm text-[#59645f]">{message}</span>}</div>
    </form>
    <section className="overflow-hidden border border-[#dfd2be] bg-white"><div className="border-b border-[#eadfce] p-4 sm:p-5"><h2 className="font-serif text-2xl text-[#071b2b]">Your products <span className="text-base font-sans text-[#59645f]">({products.length})</span></h2></div>{products.length === 0 ? <p className="p-5 text-[#59645f] sm:p-6">No products yet. Use the editor above to add your first item.</p> : <div className="divide-y divide-[#eadfce]">{products.map((product) => <div key={product.id} className="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5"><div className="min-w-0"><p className="break-words font-serif text-xl text-[#071b2b]">{product.title}</p><p className="break-words text-sm text-[#59645f]">{product.author} · {product.category} · ₹{product.price} · {product.stock} in stock {product.isArchived && <span className="font-bold text-[#a94f30]">· Archived</span>}</p></div><div className="flex gap-2"><button onClick={() => edit(product)} className="min-h-10 border border-[#c26742] px-4 py-2 text-sm font-bold text-[#a94f30]">Edit</button><button onClick={() => remove(product.id)} className="min-h-10 border border-[#b84c43] px-4 py-2 text-sm font-bold text-[#b84c43]">Delete</button></div></div>)}</div>}</section>
  </div>
}
