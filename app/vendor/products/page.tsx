import Link from 'next/link'
import { desc, eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { approvedVendorForCurrentUser } from '@/lib/vendor-auth'
import { db } from '@/lib/db'
import { products } from '@/lib/db/schema'
import { VendorProductList } from './vendor-product-list'

export default async function VendorProductsPage() {
  const access = await approvedVendorForCurrentUser()
  if (!access) redirect('/vendor/login')
  const rows = await db.select({ id: products.id, title: products.title, category: products.category, price: products.price, stock: products.stock, sku: products.sku, moderationStatus: products.moderationStatus, isArchived: products.isArchived }).from(products).where(eq(products.vendorId, access.vendor.id)).orderBy(desc(products.createdAt))
  return <main className="px-4 py-8 sm:px-8"><div className="mx-auto max-w-5xl"><div className="flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase text-[#c26742]">Catalogue</p><h1 className="font-serif text-4xl">My products</h1></div><Link href="/vendor/products/new" className="rounded-full bg-[#702d32] px-5 py-3 font-bold text-white">Add product</Link></div><VendorProductList products={rows}/></div></main>
}