import { desc, eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { approvedVendorForCurrentUser } from '@/lib/vendor-auth'
import { db } from '@/lib/db'
import { products } from '@/lib/db/schema'
import { VendorInventoryList } from './vendor-inventory-list'

export default async function VendorInventoryPage() {
  const access = await approvedVendorForCurrentUser()
  if (!access) redirect('/login')
  const rows = await db.select({ id: products.id, title: products.title, sku: products.sku, stock: products.stock }).from(products).where(eq(products.vendorId, access.vendor.id)).orderBy(desc(products.updatedAt))
  return <main className="px-4 py-8 sm:px-8"><div className="mx-auto max-w-5xl"><h1 className="font-serif text-4xl">Inventory</h1><p className="mt-2 text-sm text-[#59645f]">Products with 5 or fewer units are marked low stock.</p><VendorInventoryList products={rows}/></div></main>
}