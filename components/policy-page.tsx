import Link from 'next/link'
import type { ReactNode } from 'react'

type PolicyPageProps = {
  title: string
  introduction: ReactNode
  effectiveDate?: string
  children: ReactNode
}

export function PolicyPage({ title, introduction, effectiveDate = '7 November 2026', children }: PolicyPageProps) {
  return (
    <main className="min-h-screen bg-[#fffcf6] text-[#282621]">
      <section className="border-b border-[#702d32]/10 bg-[#f7f1e6]">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm text-[#282621]/65">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link className="hover:text-[#702d32]" href="/">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-medium text-[#702d32]">{title}</li>
            </ol>
          </nav>
          <h1 className="mt-7 max-w-4xl font-serif text-4xl leading-tight tracking-[-0.03em] text-[#702d32] sm:text-5xl lg:text-6xl">{title}</h1>
          <div className="mt-5 max-w-3xl text-base leading-8 text-[#282621]/75 sm:text-lg">{introduction}</div>
        </div>
      </section>

      <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <p className="mb-10 border-b border-[#702d32]/12 pb-6 text-sm font-semibold uppercase tracking-[0.16em] text-[#702d32]">
          Effective date: {effectiveDate}
        </p>
        {children}
      </article>
    </main>
  )
}

export function PolicySection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-[#702d32]/12 py-8 first:border-0 first:pt-0 sm:py-10">
      <h2 className="font-serif text-2xl leading-tight text-[#702d32] sm:text-3xl">{title}</h2>
      <div className="policy-copy mt-4 space-y-4 text-base leading-8 text-[#282621]/78 sm:text-[17px]">{children}</div>
    </section>
  )
}

export function PolicyContact({ registered = false }: { registered?: boolean }) {
  return (
    <address className="not-italic">
      <p className="font-bold text-[#282621]">Indian Heritager</p>
      <p className="mt-3">Marketplace: <a className="text-[#702d32] underline underline-offset-4" href="https://indianheritager.com/">https://indianheritager.com</a></p>
      <p className="mt-1">Foundation: <a className="text-[#702d32] underline underline-offset-4" href="https://indianheritager.org/">https://indianheritager.org</a></p>
      <p className="mt-1">Support email: <a className="text-[#702d32] underline underline-offset-4" href="mailto:support@indianheritager.org">support@indianheritager.org</a></p>
      <p className="mt-3 font-semibold">{registered ? 'Registered Office:' : 'Head Office:'}</p>
      <p>250, East Periyar Nagar,</p>
      <p>Ramanathapuram,</p>
      <p>Coimbatore,</p>
      <p>Tamil Nadu - 641045,</p>
      <p>India.</p>
    </address>
  )
}
