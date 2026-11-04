import { NextRequest, NextResponse } from 'next/server'
import { and, eq } from 'drizzle-orm'
import { z } from 'zod'
import { db } from '@/lib/db'
import { fulfilmentStatuses, orderItems, vendorNotifications } from '@/lib/db/schema'
import { approvedVendorForCurrentUser } from '@/lib/vendor-auth'

const schema = z.object({
  status: z.enum(fulfilmentStatuses),
  trackingNumber: z.string().trim().max(100).optional().default(''),
  carrier: z.string().trim().max(100).optional().default(''),
})

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const access = await approvedVendorForCurrentUser()
  if (!access) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const parsed = schema.safeParse(await request.json())
  if (!parsed.success) return NextResponse.json({ error: 'Invalid fulfilment status or tracking details.' }, { status: 400 })
  const { id } = await params
  const [owned] = await db.select({ id: orderItems.id }).from(orderItems).where(and(eq(orderItems.id, id), eq(orderItems.vendorId, access.vendor.id)))
  if (!owned) return NextResponse.json({ error: 'Order item not found' }, { status: 404 })
  await db.update(orderItems).set({
    fulfilmentStatus: parsed.data.status,
    trackingNumber: parsed.data.trackingNumber || null,
    carrier: parsed.data.carrier || null,
  }).where(eq(orderItems.id, id))
  await db.insert(vendorNotifications).values({
    id: crypto.randomUUID(), vendorId: access.vendor.id, type: 'order_status',
    title: 'Order status updated', message: `An order item is now ${parsed.data.status}.`,
  })
  return NextResponse.json({ ok: true })
}
