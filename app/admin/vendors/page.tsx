import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { desc } from 'drizzle-orm'
import Link from 'next/link'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { vendorProfiles } from '@/lib/db/schema'
import { VendorManager } from './vendor-manager'

export default async function AdminVendorsPage(){const session=await auth.api.getSession({headers:await headers()});const admins=(process.env.ADMIN_EMAILS??'').split(',').map(value=>value.trim().toLowerCase()).filter(Boolean);if(!session?.user||!admins.includes(session.user.email.toLowerCase()))redirect('/');const vendors=await db.select().from(vendorProfiles).orderBy(desc(vendorProfiles.createdAt));const safe=vendors.map(({gstNumberEncrypted,panNumberEncrypted,bankHolderEncrypted,bankAccountEncrypted,ifscEncrypted,...vendor})=>vendor);return <main className="min-h-screen bg-[#f8f5ee] p-4 sm:p-8"><div className="mx-auto max-w-6xl"><Link href="/admin" className="text-sm font-bold text-[#c26742]">← Product operations</Link><h1 className="mt-4 font-serif text-4xl text-[#071b2b]">Vendor management</h1><VendorManager initialVendors={safe}/></div></main>}
