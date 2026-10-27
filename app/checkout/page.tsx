'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useCart } from '@/components/cart-provider'

export default function CheckoutPage() {
  const { items, clear } = useCart()
  const router = useRouter()
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', address: '', address2: '', city: '', state: '', pincode: '', country: 'India' })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const update = (key: string, value: string) => setForm((current) => ({ ...current, [key]: value }))

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    setBusy(true)
    setError('')
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, items }),
    })
    const data = await response.json()
    if (!response.ok) {
      setError(data.error || 'Unable to place order.')
      setBusy(false)
      return
    }
    clear()
    router.push(`/orders/${data.id}`)
  }

  if (!items.length) {
    return (
      <main className="grid min-h-[60vh] place-items-center overflow-x-clip bg-[#f8f5ee] px-4 py-12 text-center text-[#1d1716]">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl">Your cart is empty</h1>
          <Link href="/products" className="mt-6 inline-flex rounded-full bg-[#702d32] px-5 py-3 text-sm font-bold text-[#fffaf2] transition-colors hover:bg-[#5a2227]">Browse products</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen overflow-x-clip bg-[#f8f5ee] px-4 py-8 text-[#1d1716] sm:px-5 sm:py-12 md:px-10">
      <div className="mx-auto max-w-[1180px]">
        <Link href="/cart" className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-[#702d32] hover:text-[#5a2227]">← Back to cart</Link>
        <h1 className="mt-4 font-serif text-4xl sm:text-5xl">Checkout</h1>

        <form onSubmit={submit} className="mt-7 grid gap-5 sm:mt-10 sm:gap-8 lg:grid-cols-[1fr_320px]">
          <section className="overflow-hidden rounded-[28px] border border-[#e7d9bb] bg-[#fffaf2] p-4 shadow-[0_18px_42px_rgba(40,38,33,0.04)] sm:p-6">
            <h2 className="font-serif text-2xl text-[#1d1716]">Customer information</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {Object.entries(form).map(([key, value]) => (
                <label key={key} className={key === 'address' || key === 'address2' ? 'sm:col-span-2' : ''}>
                  <span className="mb-1 block text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#5f5a56]">{key.replace(/[A-Z]/g, (letter) => ` ${letter}`).trim()}</span>
                  <input required={key !== 'address2'} value={value} onChange={(event) => update(key, event.target.value)} className="min-h-11 w-full min-w-0 rounded-full border border-[#d9cab0] bg-white px-3 py-3 text-[#1d1716] outline-none transition-colors focus:border-[#702d32]" />
                </label>
              ))}
            </div>
            {error && <p className="mt-5 rounded-2xl bg-[#fff0ec] p-3 text-sm text-[#a13d2d]">{error}</p>}
            <button disabled={busy} className="mt-6 min-h-11 w-full rounded-full bg-[#702d32] px-5 py-3 text-sm font-bold text-[#fffaf2] transition-colors hover:bg-[#5a2227] disabled:cursor-not-allowed disabled:opacity-60">{busy ? 'Recording order…' : 'Place order'}</button>
          </section>

          <aside className="h-fit rounded-[28px] border border-[#e7d9bb] bg-[#fffaf2] p-5 shadow-[0_18px_42px_rgba(40,38,33,0.04)] sm:p-6">
            <h2 className="font-serif text-2xl text-[#1d1716]">Order summary</h2>
            <p className="mt-4 text-sm text-[#5f5a56]">{items.reduce((sum, item) => sum + item.quantity, 0)} item(s) · Shipping calculated securely from the current product catalogue.</p>
            <p className="mt-5 text-sm text-[#5f5a56]">Orders are recorded now; no payment is required.</p>
          </aside>
        </form>
      </div>
    </main>
  )
}
