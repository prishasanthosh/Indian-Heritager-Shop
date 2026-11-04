'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { authClient } from '@/lib/auth-client'

export default function VendorLoginPage() {
  const router = useRouter(); const [error,setError]=useState(''); const [busy,setBusy]=useState(false)
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError('')
    const data = new FormData(event.currentTarget)
    const result = await authClient.signIn.email({ email:String(data.get('email')), password:String(data.get('password')) })
    if (result.error) { setError('We could not sign you in. Check your email and password.'); setBusy(false); return }
    const statusResponse = await fetch('/api/vendor/status')
    const status = await statusResponse.json()
    if (!statusResponse.ok) { setError('This account does not have an approved vendor profile. You can apply at the vendor registration page.'); setBusy(false); return }
    router.push(status.status === 'approved' ? '/vendor/dashboard' : status.status === 'pending' ? '/vendor/pending' : status.status === 'rejected' ? '/vendor/rejected' : '/vendor/suspended')
    router.refresh()
  }
  return <main className="grid min-h-[70vh] place-items-center bg-[#f8f5ee] px-4 py-10"><form onSubmit={submit} className="w-full max-w-md rounded-[28px] border border-[#e7d9bb] bg-[#fffaf2] p-7"><Link href="/" className="text-sm font-bold text-[#702d32]">← Back to shopping</Link><p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-[#c26742]">Seller access</p><h1 className="mt-2 font-serif text-4xl">Vendor login</h1><label className="mt-7 block text-sm font-semibold">Email<input required type="email" name="email" className="mt-1 w-full border border-[#d8cbb7] bg-white px-3 py-3" /></label><label className="mt-4 block text-sm font-semibold">Password<input required type="password" name="password" className="mt-1 w-full border border-[#d8cbb7] bg-white px-3 py-3" /></label>{error && <p role="alert" className="mt-5 bg-[#fff0ec] p-3 text-sm text-[#9d3c30]">{error}</p>}<button disabled={busy} className="mt-6 w-full rounded-full bg-[#702d32] px-5 py-3 font-bold text-white disabled:opacity-60">{busy ? 'Signing in…' : 'Sign in to seller workspace'}</button><div className="mt-5 flex flex-wrap justify-between gap-3 text-sm"><Link href="/sign-in" className="font-bold">Forgot password</Link><Link href="/vendor/register" className="font-bold text-[#702d32]">Become a seller</Link></div></form></main>
}
