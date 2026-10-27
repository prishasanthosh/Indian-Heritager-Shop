'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useCart } from '@/components/cart-provider'

export function AddToCart({ id, stock }: { id: string; stock: number }) {
  const { add, items } = useCart()
  const router = useRouter()
  const quantityInCart = items.find((item) => item.id === id)?.quantity ?? 0
  const remainingStock = Math.max(0, stock - quantityInCart)
  const [quantity, setQuantity] = useState(1)
  const disabled = remainingStock < 1

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <div className="flex items-center overflow-hidden rounded-full border border-[#d9cab0] bg-[#fffaf2] shadow-[0_10px_24px_rgba(30,25,22,0.04)]">
        <button aria-label="Decrease quantity" className="min-h-12 min-w-12 px-3 text-lg font-bold text-[#1d1716] transition-colors hover:bg-[#f7f1e6]" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
        <span className="min-w-12 text-center text-sm font-bold text-[#1d1716]">{quantity}</span>
        <button aria-label="Increase quantity" disabled={quantity >= remainingStock} className="min-h-12 min-w-12 px-3 text-lg font-bold text-[#1d1716] transition-colors hover:bg-[#f7f1e6] disabled:cursor-not-allowed disabled:opacity-40" onClick={() => setQuantity(Math.min(remainingStock, quantity + 1))}>+</button>
      </div>
      <button disabled={disabled} onClick={() => add(id, quantity, stock)} className="min-h-12 rounded-full bg-[#702d32] px-6 py-3 text-sm font-bold text-[#fffaf2] transition-colors hover:bg-[#5a2227] disabled:cursor-not-allowed disabled:opacity-50">{disabled ? 'Stock limit reached' : 'Add to cart'}</button>
      <button disabled={disabled} onClick={() => { add(id, quantity, stock); router.push('/checkout') }} className="min-h-12 rounded-full border border-[#bda985] bg-[#fffaf2] px-6 py-3 text-sm font-bold text-[#1d1716] transition-colors hover:bg-[#f7efe2] disabled:cursor-not-allowed disabled:opacity-50">Buy now</button>
    </div>
  )
}
