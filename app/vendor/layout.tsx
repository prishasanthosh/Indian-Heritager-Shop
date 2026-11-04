import { headers } from 'next/headers'
import { eq } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { vendorProfiles } from '@/lib/db/schema'
import { VendorShell } from './vendor-shell'

export default async function VendorLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) return children
  const vendor = await db.query.vendorProfiles.findFirst({ where: eq(vendorProfiles.userId, session.user.id) })
  if (vendor?.status === 'approved') return <VendorShell storeName={vendor.storeName}>{children}</VendorShell>
  return children
}
