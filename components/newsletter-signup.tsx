'use client'

import { type FormEvent, useState } from 'react'
import { ArrowRight } from 'lucide-react'

export function NewsletterSignup() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')

    const form = event.currentTarget
    const email = new FormData(form).get('email')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        setStatus('error')
        return
      }

      form.reset()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section aria-labelledby="newsletter-heading" className="border-y border-[#e5cfad] bg-[#f7f1e6] px-4 py-5 text-[#702d32] sm:px-6 sm:py-6 lg:px-8">
      <div className="mx-auto flex max-w-[1280px] flex-col items-stretch gap-5 md:flex-row md:items-center md:justify-between md:gap-8">
        <h2 id="newsletter-heading" className="max-w-md font-sans text-lg font-bold leading-snug sm:text-xl">
          Stay up to date with our latest stories and collections.
        </h2>
        <form onSubmit={subscribe} className="flex w-full flex-col gap-2 md:flex-1 md:flex-row md:justify-end">
          <label htmlFor="newsletter-email" className="sr-only">Your email address</label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={254}
            required
            placeholder="Your email address"
            className="h-11 min-w-0 flex-1 border border-[#d9cab0] bg-white px-4 text-sm text-[#1d1716] placeholder:text-[#806e67]"
          />
          <button type="submit" disabled={status === 'submitting'} className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 bg-[#702d32] px-5 text-sm font-semibold text-[#fffaf2] transition-colors hover:bg-[#5a2227] disabled:opacity-60">
            {status === 'submitting' ? 'Subscribing…' : 'Subscribe'}
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </form>
      </div>
      {status === 'error' && <p className="mx-auto mt-3 max-w-[1280px] text-sm" role="alert">We could not subscribe you just now. Please try again.</p>}
      {status === 'success' && <p className="mx-auto mt-3 max-w-[1280px] text-sm" role="status">Thank you for subscribing.</p>}
    </section>
  )
}
