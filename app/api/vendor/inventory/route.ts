import { NextRequest, NextResponse } from 'next/server'
import { and, eq } from 'drizzle-orm'
import { z } from 'zod'
import { db } from '@/lib/db'
import { products } from '@/lib/db/schema'
import { approvedVendorForCurrentUser } from '@/lib/vendor-auth'

const schema = z.object({ id: z.string().min(1), stock: z.number().int().nonnegative().max(100000) })

export async function PATCH(request: NextRequest) {
  const access = await approvedVendorForCurrentUser()
  if (!access) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const parsed = schema.safeParse(await request.json())
  if (!parsed.success) return NextResponse.json({ error: 'Invalid stock quantity.' }, { status: 400 })
  const owned = await db.select({ id: products.id }).from(products).where(and(eq(products.id, parsed.data.id), eq(products.vendorId, access.vendor.id)))
  if (!owned.length) return NextResponse.json({ error: 'Product not found.' }, { status: 404 })
  await db.update(products).set({ stock: parsed.data.stock, updatedAt: new Date() }).where(eq(products.id, parsed.data.id))
  return NextResponse.json({ ok: true })
}
