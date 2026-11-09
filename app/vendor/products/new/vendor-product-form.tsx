'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { productCategories } from '@/lib/categories'

type ProductFormData = { id?: string; title: string; description: string; category: string; author: string; price: string; originalPrice: string; stock: string; cover: string; sku: string; materials: string; dimensions: string; weight: string; origin: string; specifications: string; tags: string; craftType: string; artisanInfo: string; regionOfOrigin: string; giTagInfo: string }
const initial: ProductFormData = { title:'', description:'', category:'Handicrafts', author:'', price:'', originalPrice:'', stock:'', cover:'', sku:'', materials:'', dimensions:'', weight:'', origin:'', specifications:'', tags:'', craftType:'', artisanInfo:'', regionOfOrigin:'', giTagInfo:'' }

export function VendorProductForm({ product }: { product?: Partial<ProductFormData> }) {
  const router = useRouter()
  const [form, setForm] = useState<ProductFormData>({ ...initial, ...product, price: product?.price == null ? '' : String(product.price), originalPrice: product?.originalPrice == null ? '' : String(product.originalPrice), stock: product?.stock == null ? '' : String(product.stock) })
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)
  const [uploading, setUploading] = useState(false)
  const update = (key: keyof ProductFormData, value: string) => setForm(current => ({ ...current, [key]: value }))

  async function uploadImage(file: File) {
    setUploading(true); setMessage('')
    const data = new FormData(); data.append('image', file)
    const response = await fetch('/api/vendor/products/image', { method: 'POST', body: data })
    const result = await response.json()
    if (!response.ok) setMessage(result.error ?? 'Could not upload image.')
    else update('cover', result.url)
    setUploading(false)
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault(); setBusy(true); setMessage('')
    const body = { ...form, price: Number(form.price), originalPrice: form.originalPrice ? Number(form.originalPrice) : null, stock: Number(form.stock) }
    const response = await fetch('/api/vendor/products', { method: form.id ? 'PATCH' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    const result = await response.json()
    if (!response.ok) setMessage(result.error ?? 'Could not save product.')
    else router.push('/products')
    router.refresh(); setBusy(false)
  }

  const textFields = [['title','Product name'],['sku','SKU'],['author','Artisan / brand'],['price','Selling price (₹)'],['originalPrice','Sale price (₹)'],['stock','Available stock'],['materials','Materials'],['dimensions','Dimensions'],['weight','Weight'],['origin','Product origin'],['tags','Tags'],['craftType','Traditional craft type'],['artisanInfo','Artisan / maker information'],['regionOfOrigin','Region of origin'],['giTagInfo','GI tag information']] as const
  return <form onSubmit={submit} className="mt-6 grid gap-4 rounded-[24px] border border-[#e7d9bb] bg-white p-6 sm:grid-cols-2">
    {textFields.map(([key,label]) => <label key={key}><span className="mb-1 block text-sm font-semibold">{label}</span><input required={['title','sku','price','stock'].includes(key)} type={['price','originalPrice','stock'].includes(key) ? 'number' : 'text'} min={['price','originalPrice','stock'].includes(key) ? 0 : undefined} value={form[key]} onChange={event => update(key,event.target.value)} className="w-full border border-[#d8cbb7] px-3 py-3"/></label>)}
    <label><span className="mb-1 block text-sm font-semibold">Category</span><select value={form.category} onChange={event => update('category',event.target.value)} className="w-full border border-[#d8cbb7] bg-white px-3 py-3">{productCategories.map(category => <option key={category.value} value={category.value}>{category.name}</option>)}</select></label>
    <label className="sm:col-span-2"><span className="mb-1 block text-sm font-semibold">Product image</span><input type="file" accept="image/jpeg,image/png,image/webp" onChange={event => { const file = event.target.files?.[0]; if (file) void uploadImage(file) }} className="w-full border border-[#d8cbb7] p-3"/><input className="mt-2 w-full border border-[#d8cbb7] px-3 py-3" value={form.cover} onChange={event => update('cover',event.target.value)} placeholder="Or enter an image URL"/></label>
    <label className="sm:col-span-2"><span className="mb-1 block text-sm font-semibold">Product description</span><textarea required rows={4} value={form.description} onChange={event => update('description',event.target.value)} className="w-full border border-[#d8cbb7] p-3"/></label>
    <label className="sm:col-span-2"><span className="mb-1 block text-sm font-semibold">Specifications</span><textarea rows={4} value={form.specifications} onChange={event => update('specifications',event.target.value)} className="w-full border border-[#d8cbb7] p-3"/></label>
    <div className="sm:col-span-2"><button disabled={busy || uploading} className="rounded-full bg-[#702d32] px-5 py-3 font-bold text-white disabled:opacity-60">{uploading ? 'Uploading…' : busy ? 'Saving…' : form.id ? 'Save changes' : 'Submit for approval'}</button>{message && <p className="mt-3 text-sm text-red-700">{message}</p>}</div>
  </form>
}