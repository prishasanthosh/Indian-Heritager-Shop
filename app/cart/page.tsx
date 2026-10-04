'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useCart } from '@/components/cart-provider'

type Book = { id: string; title: string; author: string; price: number; cover: string; stock: number }

export default function CartPage() {
  const { items, setQuantity, remove } = useCart()
  const [books, setBooks] = useState<Book[]>([])

  useEffect(() => {
    if (items.length) {
      fetch(`/api/books?ids=${items.map((item) => item.id).join(',')}`)
        .then((response) => response.json())
        .then((data) => setBooks(data.books || []))
    }
  }, [items])

  const lines = items
    .map((item) => ({ ...item, book: books.find((book) => book.id === item.id) }))
    .filter((line): line is typeof line & { book: Book } => Boolean(line.book))
  const subtotal = lines.reduce((sum, line) => sum + line.book.price * line.quantity, 0)
  const shipping = subtotal >= 1000 ? 0 : 80

  return (
    <main className="min-h-screen overflow-x-clip bg-[#f8f5ee] px-4 py-8 text-[#183d38] sm:px-5 sm:py-12 md:px-10">
      <div className="mx-auto max-w-5xl">
        <Link href="/products" className="text-sm font-bold text-[#c26742]">← Continue shopping</Link>
        <h1 className="mt-4 font-serif text-4xl sm:text-5xl">Your cart</h1>
        {!items.length ? (
          <div className="mt-8 border border-[#dcd3c2] bg-white p-6 text-center sm:mt-12 sm:p-10">
            <p>Your cart is empty</p>
            <Link href="/products" className="mt-5 inline-flex bg-[#c26742] px-5 py-3 font-bold text-white">Browse products</Link>
          </div>
        ) : (
          <div className="mt-7 grid gap-6 sm:mt-10 sm:gap-8 md:grid-cols-[1fr_300px]">
            <div className="divide-y divide-[#dcd3c2] border-y border-[#dcd3c2]">
              {lines.map((line) => (
                <div key={line.id} className="flex gap-3 py-4 sm:gap-4 sm:py-5">
                  <div className="grid size-20 shrink-0 place-items-center bg-[#eadfce] p-2 text-center text-xs font-bold sm:size-24">{line.book.title}</div>
                  <div className="min-w-0 flex-1">
                    <h2 className="break-words font-serif text-lg sm:text-xl">{line.book.title}</h2>
                    <p className="break-words text-sm text-[#59645f]">{line.book.author}</p>
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center border border-[#dcd3c2] bg-white">
                        <button aria-label={`Decrease quantity of ${line.book.title}`} className="min-h-10 min-w-10 px-3 py-1" onClick={() => setQuantity(line.id, line.quantity - 1, line.book.stock)}>−</button>
                        <span className="px-2">{line.quantity}</span>
                        <button aria-label={`Increase quantity of ${line.book.title}`} disabled={line.quantity >= line.book.stock} className="min-h-10 min-w-10 px-3 py-1 disabled:cursor-not-allowed disabled:opacity-40" onClick={() => setQuantity(line.id, line.quantity + 1, line.book.stock)}>+</button>
                      </div>
                      {line.quantity > line.book.stock && <p className="w-full text-sm text-[#a13d2d]">Only {line.book.stock} available. Reduce quantity to continue.</p>}
                      <button onClick={() => remove(line.id)} className="text-sm text-[#c26742] underline">Remove</button>
                      <b>₹{(line.book.price * line.quantity).toLocaleString('en-IN')}</b>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <aside className="h-fit border border-[#dcd3c2] bg-white p-5 sm:p-6">
              <h2 className="font-serif text-2xl">Summary</h2>
              <div className="mt-5 flex justify-between gap-3 text-sm"><span>Subtotal</span><b>₹{subtotal.toLocaleString('en-IN')}</b></div>
              <div className="mt-2 flex justify-between gap-3 text-sm"><span>Shipping</span><b>₹{shipping.toLocaleString('en-IN')}</b></div>
              <div className="mt-5 flex justify-between gap-3 border-t border-[#dcd3c2] pt-4 text-lg"><span>Total</span><b>₹{(subtotal + shipping).toLocaleString('en-IN')}</b></div>
              <Link href="/checkout" className="mt-6 block bg-[#c26742] px-5 py-3 text-center font-bold text-white">Checkout</Link>
            </aside>
          </div>
        )}
      </div>
    </main>
  )
}
