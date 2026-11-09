import { redirect } from 'next/navigation'
import { approvedVendorForCurrentUser } from '@/lib/vendor-auth'
import { VendorProductForm } from './vendor-product-form'

export default async function NewVendorProduct() {
  const access = await approvedVendorForCurrentUser()
  if (!access) redirect('/login')

  return <main className="min-h-screen bg-[#f8f5ee] px-4 py-8"><div className="mx-auto max-w-5xl"><h1 className="font-serif text-4xl">Add new product</h1><p className="mt-2 text-[#59645f]">New products remain hidden until an administrator approves them.</p><VendorProductForm/></div></main>
}