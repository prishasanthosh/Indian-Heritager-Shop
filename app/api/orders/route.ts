import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { and, eq, notIlike, sql } from 'drizzle-orm'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { products, orderItems, orders, formatAddress, makeOrderId, shippingFor } from '@/lib/db/schema'

const checkoutSchema = z.object({ fullName: z.string().trim().min(2), email: z.string().email(), phone: z.string().trim().min(7), address: z.string().trim().min(3), address2: z.string().optional().default(''), city: z.string().trim().min(2), state: z.string().trim().min(2), pincode: z.string().trim().min(4), country: z.string().trim().min(2), items: z.array(z.object({ id: z.string(), quantity: z.number().int().min(1).max(20) })).min(1) })
export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) return NextResponse.json({ error: 'Please sign in before placing an order.' }, { status: 401 })
  const parsed = checkoutSchema.safeParse(await request.json())
  if (!parsed.success) return NextResponse.json({ error: 'Please check your checkout details.' }, { status: 400 })
  try {
    const result = await db.transaction(async (tx) => {
      const ids = parsed.data.items.map((item) => item.id)
      const currentProducts = await tx.select().from(products).where(and(eq(products.isArchived, false), notIlike(products.category, 'books'), sql`${products.id} in ${ids}`))
      const byId = new Map(currentProducts.map((product) => [product.id, product]))
      if (byId.size !== ids.length) throw new Error('Some products are no longer available.')
      let subtotal = 0
      const snapshots = parsed.data.items.map((item) => { const product = byId.get(item.id)!; if (product.stock < item.quantity) throw new Error(`Only ${product.stock} of ${product.title} are currently available.`); subtotal += product.price * item.quantity; return { product, quantity: item.quantity } })
      const shipping = shippingFor(subtotal)
      const id = makeOrderId()
      await tx.insert(orders).values({ id, userId: session.user.id, status: 'pending', total: subtotal + shipping, subtotal, shipping, customerName: parsed.data.fullName, customerEmail: parsed.data.email, customerPhone: parsed.data.phone, shippingAddress: formatAddress(parsed.data), shippingAddress2: parsed.data.address2, city: parsed.data.city, state: parsed.data.state, pincode: parsed.data.pincode, country: parsed.data.country })
      for (const { product, quantity } of snapshots) { const updated = await tx.update(products).set({ stock: sql`${products.stock} - ${quantity}`, updatedAt: new Date() }).where(and(eq(products.id, product.id), eq(products.isArchived, false), notIlike(products.category, 'books'), sql`${products.stock} >= ${quantity}`)).returning({ id: products.id }); if (!updated.length) throw new Error('Some products in your cart are no longer available in the requested quantity.'); await tx.insert(orderItems).values({ id: crypto.randomUUID(), orderId: id, bookId: product.id, title: product.title, author: product.author, price: product.price, quantity }) }
      return id
    })
    return NextResponse.json({ id: result })
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to place order.' }, { status: 409 }) }
}
