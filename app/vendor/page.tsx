import { headers } from 'next/headers'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { vendorProfiles } from '@/lib/db/schema'

export default async function VendorHomePage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect('/login')

  const vendor = await db.query.vendorProfiles.findFirst({
    where: eq(vendorProfiles.userId, session.user.id),
  })

  if (!vendor) redirect('/register')
  if (vendor.status === 'approved') redirect('/dashboard')
  if (vendor.status === 'pending') redirect('/pending')
  if (vendor.status === 'rejected') redirect('/rejected')
  redirect('/suspended')
}
