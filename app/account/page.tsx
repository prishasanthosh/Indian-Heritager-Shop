import Link from 'next/link'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { ClipboardList, UserRound } from 'lucide-react'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { orders } from '@/lib/db/schema'
import { desc, eq } from 'drizzle-orm'
import { SignOutButton } from './sign-out-button'

export default async function AccountPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect('/sign-in')
  const orderHistory = await db.select().from(orders).where(eq(orders.userId, session.user.id)).orderBy(desc(orders.createdAt))

  return (
    <main className="min-h-screen overflow-x-clip bg-[#fffdf7] text-black">
      <section className="mx-auto max-w-[1100px] px-4 py-9 sm:px-5 sm:py-14 lg:px-8 lg:py-20">
        <p className="text-xs font-bold tracking-[0.2em]">YOUR ACCOUNT</p>
        <h1 className="mt-3 break-words font-serif text-4xl tracking-[-0.04em] sm:text-5xl">Welcome back, {session.user.name || 'shopper'}.</h1>
        <div className="mt-7 grid gap-4 sm:mt-10 sm:gap-5 md:grid-cols-[0.8fr_1.2fr]">
          <div className="border border-[#dcd3c2] bg-[#fff8e8] p-5 sm:p-7">
            <div className="flex items-center gap-3"><UserRound className="text-black" /><h2 className="font-serif text-2xl">Profile</h2></div>
            <p className="mt-6 break-words text-sm text-black/70">{session.user.email}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link href="/products" className="inline-flex bg-[#f4a900] px-5 py-3 text-sm font-bold text-black hover:bg-[#e99b00]">Browse products</Link>
              <SignOutButton />
            </div>
          </div>
          <div className="border border-[#dcd3c2] bg-[#fff8e8] p-5 sm:p-7">
            <div className="flex items-center gap-3"><ClipboardList className="text-black" /><h2 className="font-serif text-2xl">Order history</h2></div>
            {orderHistory.length === 0 ? (
              <div className="py-8">
                <p className="text-sm leading-6 text-black/70">You haven&apos;t placed any orders yet.</p>
                <Link href="/products" className="mt-5 inline-flex bg-[#f4a900] px-5 py-3 text-sm font-bold text-black hover:bg-[#e99b00]">Browse products</Link>
              </div>
            ) : (
              <div className="mt-6 divide-y divide-[#e6dfd1]">
                {orderHistory.map((order) => (
                  <div key={order.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
                    <div className="min-w-0">
                      <Link href={`/orders/${order.id}`} className="font-bold text-black underline decoration-[#f4a900] decoration-2 underline-offset-2">Order #{order.id.slice(0, 8)}</Link>
                      <p className="mt-1 text-xs text-black/70">{order.createdAt.toLocaleDateString('en-IN')} · {order.status}</p>
                    </div>
                    <p className="shrink-0 font-bold">₹{order.total.toLocaleString('en-IN')}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

export function generateMetadata() { return { title: 'My account | Indian Heritager Shop', description: 'View your Indian Heritager account and order history.' } }

// The button is kept in a client boundary so the page remains server-authorized.
