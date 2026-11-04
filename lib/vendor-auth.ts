import { headers } from 'next/headers'
import { eq } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { vendorProfiles } from '@/lib/db/schema'

export async function currentUser() {
  return (await auth.api.getSession({ headers: await headers() }))?.user ?? null
}

export async function approvedVendorForCurrentUser() {
  const user = await currentUser()
  if (!user) return null
  const vendor = await db.query.vendorProfiles.findFirst({ where: eq(vendorProfiles.userId, user.id) })
  if (!vendor || vendor.status !== 'approved') return null
  return { user, vendor }
}

export function isAdministrator(email?: string | null) {
  if (!email) return false
  const admins = (process.env.ADMIN_EMAILS ?? '').split(',').map((value) => value.trim().toLowerCase()).filter(Boolean)
  return admins.includes(email.trim().toLowerCase())
}

export async function currentAdministrator() {
  const user = await currentUser()
  if (!user || !isAdministrator(user.email)) return null
  return user
}
