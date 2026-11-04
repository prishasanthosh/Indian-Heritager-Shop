'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { signOut } from '@/lib/auth-client'

const links = [
  ['Overview', '/vendor/dashboard'],
  ['Store', '/vendor/store'],
  ['Products', '/vendor/products'],
  ['Inventory', '/vendor/inventory'],
  ['Orders', '/vendor/orders'],
  ['Notifications', '/vendor/notifications'],
]

export function VendorShell({ storeName, children }: { storeName: string; children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  return <main className="min-h-screen bg-[#f8f5ee] text-[#1d1716] lg:grid lg:grid-cols-[260px_minmax(0,1fr)]">
    <aside className="border-b border-[#e4d8c4] bg-[#071b2b] px-5 py-5 text-white lg:min-h-screen lg:border-b-0 lg:border-r lg:px-6 lg:py-8">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e7ad86]">Seller workspace</p>
      <h1 className="mt-2 font-serif text-2xl">{storeName}</h1>
      <nav className="mt-6 flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
        {links.map(([label, href]) => <Link key={href} href={href} className={`whitespace-nowrap rounded-xl px-3 py-2 text-sm font-bold ${pathname === href ? 'bg-[#702d32] text-white' : 'text-[#d8dfdf] hover:bg-white/10'}`}>{label}</Link>)}
      </nav>
      <div className="mt-5 flex gap-3 border-t border-white/10 pt-5 lg:flex-col">
        <Link href="/" className="rounded-xl px-3 py-2 text-sm font-bold text-[#d8dfdf] hover:bg-white/10">Back to Shop</Link>
        <button onClick={async () => { await signOut(); router.replace('/'); router.refresh() }} className="rounded-xl px-3 py-2 text-left text-sm font-bold text-[#d8dfdf] hover:bg-white/10">Logout</button>
      </div>
    </aside>
    <div>{children}</div>
  </main>
}
