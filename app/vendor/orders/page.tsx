import { desc, eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { approvedVendorForCurrentUser } from '@/lib/vendor-auth'
import { db } from '@/lib/db'
import { orderItems, orders } from '@/lib/db/schema'
import { VendorOrderList } from './vendor-order-list'

export default async function VendorOrdersPage() {
  const access = await approvedVendorForCurrentUser()
  if (!access) redirect('/vendor/login')
  const rows = await db.select({ item: orderItems, order: orders }).from(orderItems).innerJoin(orders, eq(orderItems.orderId, orders.id)).where(eq(orderItems.vendorId, access.vendor.id)).orderBy(desc(orders.createdAt))
  const orderRows = rows.map(({ item, order }) => ({ id: item.id, title: item.title, quantity: item.quantity, price: item.price, fulfilmentStatus: item.fulfilmentStatus, trackingNumber: item.trackingNumber, carrier: item.carrier, orderId: order.id, customerName: order.customerName, customerPhone: order.customerPhone, address: [order.shippingAddress, order.shippingAddress2, order.city, order.state, order.pincode].filter(Boolean).join(', ') }))
  return <main className="px-4 py-8 sm:px-8"><div className="mx-auto max-w-6xl"><h1 className="font-serif text-4xl">Orders</h1><p className="mt-2 text-sm text-[#59645f]">Update fulfilment and tracking for your assigned order items only.</p><VendorOrderList rows={orderRows}/></div></main>
}