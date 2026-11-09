import { and, eq } from 'drizzle-orm'
import { notFound, redirect } from 'next/navigation'
import { approvedVendorForCurrentUser } from '@/lib/vendor-auth'
import { db } from '@/lib/db'
import { products } from '@/lib/db/schema'
import { VendorProductForm } from '../../new/vendor-product-form'

export default async function EditVendorProduct({ params }: { params: Promise<{ id: string }> }) {
  const access = await approvedVendorForCurrentUser()
  if (!access) redirect('/login')
  const { id } = await params
  const [product] = await db.select().from(products).where(and(eq(products.id, id), eq(products.vendorId, access.vendor.id)))
  if (!product) notFound()
  return <main className="px-4 py-8 sm:px-8"><div className="mx-auto max-w-5xl"><h1 className="font-serif text-4xl">Edit product</h1><p className="mt-2 text-[#59645f]">Changes return the product to pending moderation.</p><VendorProductForm product={{ ...product, price: String(product.price), originalPrice: product.originalPrice == null ? '' : String(product.originalPrice), stock: String(product.stock) }} /></div></main>
}
