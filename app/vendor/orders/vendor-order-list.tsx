'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const statuses = ['new', 'processing', 'shipped', 'delivered', 'cancelled']
type Row = { id: string; title: string; quantity: number; price: number; fulfilmentStatus: string; trackingNumber: string | null; carrier: string | null; orderId: string; customerName: string; customerPhone: string; address: string }

export function VendorOrderList({ rows }: { rows: Row[] }) {
  const router = useRouter()
  const [busy, setBusy] = useState('')
  async function update(id: string, status: string, trackingNumber: string, carrier: string) {
    setBusy(id)
    await fetch(`/api/vendor/orders/${encodeURIComponent(id)}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status, trackingNumber, carrier }) })
    setBusy(''); router.refresh()
  }
  if (!rows.length) return <p className="mt-6 rounded-[24px] bg-white p-5">No marketplace orders yet.</p>
  return <section className="mt-6 space-y-4">{rows.map(row => <article key={row.id} className="rounded-[24px] bg-white p-5"><div className="grid gap-4 lg:grid-cols-[1fr_1fr]"><div><strong>{row.title}</strong><p className="text-sm text-[#59645f]">Order {row.orderId} · Quantity {row.quantity} · ₹{row.price * row.quantity}</p></div><div><p className="text-sm font-semibold">{row.customerName}</p><p className="text-sm text-[#59645f]">{row.customerPhone}</p><p className="text-sm text-[#59645f]">{row.address}</p></div></div><form onSubmit={event => { event.preventDefault(); const data = new FormData(event.currentTarget); void update(row.id, String(data.get('status')), String(data.get('trackingNumber') ?? ''), String(data.get('carrier') ?? '')) }} className="mt-4 grid gap-3 border-t pt-4 sm:grid-cols-[180px_1fr_1fr_auto] sm:items-end"><label className="text-xs font-bold">Status<select name="status" defaultValue={row.fulfilmentStatus} className="mt-1 w-full border border-[#d8cbb7] bg-white px-3 py-2 capitalize">{statuses.map(status => <option key={status} value={status}>{status}</option>)}</select></label><label className="text-xs font-bold">Tracking number<input name="trackingNumber" defaultValue={row.trackingNumber ?? ''} className="mt-1 w-full border px-3 py-2"/></label><label className="text-xs font-bold">Courier<input name="carrier" defaultValue={row.carrier ?? ''} className="mt-1 w-full border px-3 py-2"/></label><button disabled={busy === row.id} className="rounded-full bg-[#702d32] px-4 py-2 font-bold text-white">{busy === row.id ? 'Saving…' : 'Update'}</button></form></article>)}</section>
}
