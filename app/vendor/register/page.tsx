'use client'

import Link from 'next/link'
import { useState } from 'react'
import { authClient, useSession } from '@/lib/auth-client'

export default function VendorRegisterPage() {
  const { data: session } = useSession()
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [form, setForm] = useState({ name:'', email:'', phone:'', password:'', confirmPassword:'', storeName:'', description:'', businessType:'', businessAddress:'', city:'', state:'', pincode:'', country:'India', gstNumber:'', panNumber:'', bankHolder:'', bankAccount:'', ifsc:'' })
  const update = (key:string, value:string) => setForm(current => ({ ...current, [key]: value }))
  async function submitForm(event: React.FormEvent) {
    event.preventDefault(); setBusy(true); setError('')
    if (form.password !== form.confirmPassword) { setError('Passwords do not match.'); setBusy(false); return }
    try {
      if (!session?.user) {
        const result = await authClient.signUp.email({ email: form.email, password: form.password, name: form.name })
        if (result.error) throw new Error(result.error.message ?? 'Could not create your account.')
      }
      const { name,email,password,confirmPassword,...application } = form
      const response = await fetch('/api/vendor/apply', { method:'POST', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify(application) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error ?? 'Could not submit your application.')
      setSubmitted(true)
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Could not submit your application.') }
    finally { setBusy(false) }
  }
  if (submitted) return <main className="grid min-h-[70vh] place-items-center bg-[#f8f5ee] px-5 py-12"><div className="max-w-xl rounded-[28px] border border-[#e7d9bb] bg-white p-8 text-center"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c26742]">Application received</p><h1 className="mt-3 font-serif text-4xl text-[#1d1716]">Welcome to Indian Heritager</h1><p className="mt-5 text-[#59645f]">Your vendor application has been submitted successfully. Our team will review your application and notify you once your store is approved.</p><Link href="/vendor/login" className="mt-7 inline-flex rounded-full bg-[#702d32] px-5 py-3 font-bold text-white">Go to vendor login</Link></div></main>
  const required = [['name','Full name'],['email','Email address'],['phone','Phone number'],['password','Password'],['confirmPassword','Confirm password'],['storeName','Store / business name'],['description','Business description'],['businessType','Business type'],['businessAddress','Business address'],['city','City'],['state','State'],['pincode','PIN code'],['country','Country']] as const
  return <main className="min-h-screen bg-[#f8f5ee] px-4 py-10 text-[#1d1716] sm:px-6"><form onSubmit={submitForm} className="mx-auto max-w-4xl rounded-[28px] border border-[#e7d9bb] bg-[#fffaf2] p-5 sm:p-8"><Link href="/" className="text-sm font-bold text-[#702d32]">← Back to shopping</Link><p className="mt-6 text-xs font-bold uppercase tracking-[0.24em] text-[#c26742]">Become a seller</p><h1 className="mt-2 font-serif text-4xl">Vendor registration</h1><div className="mt-8 grid gap-4 sm:grid-cols-2">{required.map(([key,label]) => <label key={key} className={['description','businessAddress'].includes(key) ? 'sm:col-span-2' : ''}><span className="mb-1 block text-sm font-semibold">{label}</span>{key === 'description' || key === 'businessAddress' ? <textarea required value={form[key]} onChange={event => update(key,event.target.value)} rows={3} className="w-full border border-[#d8cbb7] bg-white p-3"/> : <input required minLength={key === 'password' || key === 'confirmPassword' ? 8 : undefined} type={key === 'email' ? 'email' : key === 'password' || key === 'confirmPassword' ? 'password' : 'text'} value={form[key]} onChange={event => update(key,event.target.value)} className="w-full border border-[#d8cbb7] bg-white px-3 py-3"/>}</label>)}</div><h2 className="mt-8 font-serif text-2xl">Verification details</h2><div className="mt-4 grid gap-4 sm:grid-cols-2">{[['gstNumber','GST number (optional)'],['panNumber','PAN number'],['bankHolder','Bank account holder name'],['bankAccount','Bank account number'],['ifsc','IFSC code']].map(([key,label]) => <label key={key}><span className="mb-1 block text-sm font-semibold">{label}</span><input value={form[key as keyof typeof form]} onChange={event => update(key,event.target.value)} className="w-full border border-[#d8cbb7] bg-white px-3 py-3"/></label>)}</div>{error && <p role="alert" className="mt-5 bg-[#fff0ec] p-3 text-sm text-[#9d3c30]">{error}</p>}<button disabled={busy} className="mt-7 w-full rounded-full bg-[#702d32] px-5 py-3 font-bold text-white disabled:opacity-60">{busy ? 'Submitting…' : 'Submit vendor application'}</button><p className="mt-5 text-center text-sm">Already have a vendor account? <Link href="/vendor/login" className="font-bold text-[#702d32]">Vendor login</Link></p></form></main>
}
