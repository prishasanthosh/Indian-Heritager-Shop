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
    <section aria-labelledby="newsletter-heading" className="border-y border-[#e5cfad] bg-[#fff1c2] px-4 py-7 text-[#601010] sm:px-6 sm:py-9 lg:px-8">
      <div className="mx-auto flex max-w-[1280px] flex-col items-stretch gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        <h2 id="newsletter-heading" className="max-w-md font-sans text-lg font-bold leading-snug sm:text-xl">
          Stay up to date with our latest stories and collections.
        </h2>
        <form onSubmit={subscribe} className="flex w-full flex-col gap-2 sm:w-auto sm:min-w-[min(100%,32rem)] sm:flex-row">
          <label htmlFor="newsletter-email" className="sr-only">Your email address</label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={254}
            required
            placeholder="Your email address"
            className="h-11 min-w-0 flex-1 border border-[#601010] bg-white px-4 text-sm text-[#601010] placeholder:text-[#806e67]"
          />
          <button type="submit" disabled={status === 'submitting'} className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#071b2b] px-5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60">
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
