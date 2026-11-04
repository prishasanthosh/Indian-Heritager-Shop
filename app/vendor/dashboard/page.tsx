import { desc, eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { approvedVendorForCurrentUser } from '@/lib/vendor-auth'
import { db } from '@/lib/db'
import { orderItems, orders, products } from '@/lib/db/schema'

export default async function VendorDashboard() {
  const access = await approvedVendorForCurrentUser()
  if (!access) redirect('/vendor/login')
  const vendorProducts = await db.select().from(products).where(eq(products.vendorId, access.vendor.id)).orderBy(desc(products.createdAt))
  const vendorItems = await db.select({ item: orderItems, order: orders }).from(orderItems).innerJoin(orders, eq(orderItems.orderId, orders.id)).where(eq(orderItems.vendorId, access.vendor.id)).orderBy(desc(orders.createdAt)).limit(8)
  const cards = [
    ['Total products', vendorProducts.length],
    ['Active products', vendorProducts.filter(product => product.active && !product.isArchived && product.moderationStatus === 'approved').length],
    ['Pending products', vendorProducts.filter(product => product.moderationStatus === 'pending').length],
    ['Rejected products', vendorProducts.filter(product => product.moderationStatus === 'rejected').length],
    ['Total orders', vendorItems.length],
    ['Pending orders', vendorItems.filter(({ item }) => item.fulfilmentStatus === 'new' || item.fulfilmentStatus === 'processing').length],
    ['Low stock', vendorProducts.filter(product => !product.isArchived && product.stock > 0 && product.stock <= 5).length],
    ['Out of stock', vendorProducts.filter(product => !product.isArchived && product.stock === 0).length],
  ]

  return <main className="px-4 py-8 sm:px-8">
    <div className="mx-auto max-w-6xl">
      <header><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c26742]">{access.vendor.storeName}</p><h1 className="mt-2 font-serif text-4xl">Seller overview</h1><p className="mt-2 text-sm font-semibold text-emerald-700">Approved vendor · {access.vendor.status}</p></header>
      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{cards.map(([label, value]) => <article key={String(label)} className="rounded-[22px] border border-[#e7d9bb] bg-white p-5"><p className="text-sm text-[#59645f]">{String(label)}</p><p className="mt-2 font-serif text-4xl">{String(value)}</p></article>)}</section>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-[24px] border border-[#e7d9bb] bg-white p-5"><div className="flex items-center justify-between"><h2 className="font-serif text-2xl">Recently added</h2><Link href="/vendor/products/new" className="text-sm font-bold text-[#702d32]">Add product</Link></div>{vendorProducts.length ? <div className="mt-4 divide-y">{vendorProducts.slice(0, 5).map(product => <Link key={product.id} href={`/vendor/products/${product.id}/edit`} className="block py-3"><strong>{product.title}</strong><span className="float-right text-sm capitalize text-[#59645f]">{product.moderationStatus}</span></Link>)}</div> : <p className="mt-4 text-sm text-[#59645f]">No products yet.</p>}</section>
        <section className="rounded-[24px] border border-[#e7d9bb] bg-white p-5"><div className="flex items-center justify-between"><h2 className="font-serif text-2xl">Recent orders</h2><Link href="/vendor/orders" className="text-sm font-bold text-[#702d32]">View all</Link></div>{vendorItems.length ? <div className="mt-4 divide-y">{vendorItems.slice(0, 5).map(({ item, order }) => <div key={item.id} className="py-3"><strong>{order.id}</strong><span className="float-right text-sm">{item.quantity} × {item.title}</span><p className="mt-1 text-xs capitalize text-[#59645f]">{item.fulfilmentStatus}</p></div>)}</div> : <p className="mt-4 text-sm text-[#59645f]">No orders yet.</p>}</section>
      </div>
    </div>
  </main>
}
