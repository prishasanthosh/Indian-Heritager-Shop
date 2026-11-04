import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { eq } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { vendorProfiles } from '@/lib/db/schema'

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const vendor = await db.query.vendorProfiles.findFirst({ where: eq(vendorProfiles.userId, session.user.id) })
  if (!vendor) return NextResponse.json({ error: 'Vendor profile not found' }, { status: 404 })
  return NextResponse.json({ status: vendor.status, storeName: vendor.storeName })
}
