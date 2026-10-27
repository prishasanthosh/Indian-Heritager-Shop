'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useCart } from '@/components/cart-provider'

type Product = { id: string; title: string; author: string; price: number; cover: string; stock: number }

export default function CartPage() {
  const { items, setQuantity, remove } = useCart()
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    if (items.length) {
      fetch(`/api/products?ids=${items.map((item) => item.id).join(',')}`)
        .then((response) => response.json())
        .then((data) => {
          const availableProducts: Product[] = data.products ?? []
          setProducts(availableProducts)
          const availableIds = new Set(availableProducts.map((product) => product.id))
          items.forEach((item) => {
            if (!availableIds.has(item.id)) remove(item.id)
          })
        })
    }
  }, [items, remove])

  const lines = items
    .map((item) => ({ ...item, product: products.find((product) => product.id === item.id) }))
    .filter((line): line is typeof line & { product: Product } => Boolean(line.product))
  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0)
  const shipping = subtotal >= 1000 ? 0 : 80

  return (
    <main className="min-h-screen overflow-x-clip bg-[#f8f5ee] px-4 py-8 text-[#1d1716] sm:px-5 sm:py-12 md:px-10">
      <div className="mx-auto max-w-[1180px]">
        <Link href="/products" className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-[#702d32] hover:text-[#5a2227]">← Continue shopping</Link>
        <h1 className="mt-4 font-serif text-4xl sm:text-5xl">Your cart</h1>

        {!items.length ? (
          <div className="mt-8 rounded-[26px] border border-[#e7d9bb] bg-[#fffaf2] p-6 text-center shadow-[0_18px_42px_rgba(40,38,33,0.04)] sm:mt-12 sm:p-10">
            <p className="font-serif text-2xl text-[#1d1716]">Your cart is empty</p>
            <Link href="/products" className="mt-6 inline-flex rounded-full bg-[#702d32] px-5 py-3 text-sm font-bold text-[#fffaf2] transition-colors hover:bg-[#5a2227]">Browse products</Link>
          </div>
        ) : (
          <div className="mt-7 grid gap-6 sm:mt-10 sm:gap-8 lg:grid-cols-[1fr_320px]">
            <div className="divide-y divide-[#e7d9bb] overflow-hidden rounded-[26px] border border-[#e7d9bb] bg-[#fffaf2]">
              {lines.map((line) => (
                <div key={line.id} className="flex gap-3 p-4 sm:gap-4 sm:p-5">
                  <div className="grid size-20 shrink-0 place-items-center overflow-hidden rounded-[18px] border border-[#e7d9bb] bg-[#eadfce] p-2 text-center text-[11px] font-bold text-[#1d1716] sm:size-24">
                    {line.product.cover ? <img src={line.product.cover} alt={line.product.title} className="h-full w-full object-cover" /> : line.product.title}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="break-words font-serif text-xl text-[#1d1716] sm:text-2xl">{line.product.title}</h2>
                    <p className="mt-1 break-words text-sm text-[#5f5a56]">{line.product.author}</p>
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center overflow-hidden rounded-full border border-[#d9cab0] bg-white">
                        <button aria-label={`Decrease quantity of ${line.product.title}`} className="min-h-10 min-w-10 px-3 py-1 text-lg font-bold text-[#1d1716] hover:bg-[#f7f1e6]" onClick={() => setQuantity(line.id, line.quantity - 1, line.product.stock)}>−</button>
                        <span className="min-w-10 text-center text-sm font-bold text-[#1d1716]">{line.quantity}</span>
                        <button aria-label={`Increase quantity of ${line.product.title}`} disabled={line.quantity >= line.product.stock} className="min-h-10 min-w-10 px-3 py-1 text-lg font-bold text-[#1d1716] hover:bg-[#f7f1e6] disabled:cursor-not-allowed disabled:opacity-40" onClick={() => setQuantity(line.id, line.quantity + 1, line.product.stock)}>+</button>
                      </div>
                      <button onClick={() => remove(line.id)} className="text-sm font-semibold text-[#702d32] underline-offset-4 hover:underline">Remove</button>
                      <b className="text-base text-[#1d1716]">₹{(line.product.price * line.quantity).toLocaleString('en-IN')}</b>
                    </div>
                    {line.quantity > line.product.stock && <p className="mt-2 text-sm text-[#a13d2d]">Only {line.product.stock} available. Reduce quantity to continue.</p>}
                  </div>
                </div>
              ))}
            </div>

            <aside className="h-fit rounded-[26px] border border-[#e7d9bb] bg-[#fffaf2] p-5 shadow-[0_18px_42px_rgba(40,38,33,0.04)] sm:p-6">
              <h2 className="font-serif text-2xl text-[#1d1716]">Summary</h2>
              <div className="mt-5 flex justify-between gap-3 text-sm text-[#433e38]"><span>Subtotal</span><b className="text-[#1d1716]">₹{subtotal.toLocaleString('en-IN')}</b></div>
              <div className="mt-2 flex justify-between gap-3 text-sm text-[#433e38]"><span>Shipping</span><b className="text-[#1d1716]">₹{shipping.toLocaleString('en-IN')}</b></div>
              <div className="mt-5 flex justify-between gap-3 border-t border-[#e7d9bb] pt-4 text-lg text-[#1d1716]"><span>Total</span><b>₹{(subtotal + shipping).toLocaleString('en-IN')}</b></div>
              <Link href="/checkout" className="mt-6 block rounded-full bg-[#702d32] px-5 py-3 text-center text-sm font-bold text-[#fffaf2] transition-colors hover:bg-[#5a2227]">Checkout</Link>
            </aside>
          </div>
        )}
      </div>
    </main>
  )
}
