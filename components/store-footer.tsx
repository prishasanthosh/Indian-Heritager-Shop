import { Mail } from 'lucide-react'
import Link from 'next/link'

const shopLinks = [
  ['Shop All', '/products'],
  ['Categories', '/#categories'],
  ['New Arrivals', '/products?sort=newest'],
  ['Featured Products', '/products'],
  ['Best Sellers', '/products'],
]

const brandLinks = [
  ['About Us', '/about'],
  ['Our Story', '/#story'],
  ['Our Heritage', '/about'],
  ['Contact Us', 'mailto:support@indianheritager.com'],
  ['Ask a question', 'mailto:support@indianheritager.com?subject=Customer%20question'],
]

const customerCareLinks = [
  ['Shipping & Delivery', 'mailto:support@indianheritager.com?subject=Shipping%20question'],
  ['Returns & Refunds', 'mailto:support@indianheritager.com?subject=Returns%20question'],
  ['Track Your Order', '/account'],
  ['Privacy questions', 'mailto:support@indianheritager.com?subject=Privacy%20question'],
  ['Terms questions', 'mailto:support@indianheritager.com?subject=Terms%20question'],
]

function FooterLinks({ title, links }: { title: string; links: string[][] }) {
  return (
    <nav aria-label={title}>
      <h2 className="text-[15px] font-bold text-[#f8ead7]">{title}</h2>
      <ul className="mt-3 space-y-2.5 text-sm leading-5 text-[#f7f1e6]/80">
        {links.map(([label, href]) => (
          <li key={label}>
            {href.startsWith('/') ? (
              <Link className="transition-colors hover:text-[#fffaf2]" href={href}>{label}</Link>
            ) : (
              <a className="transition-colors hover:text-[#fffaf2]" href={href}>{label}</a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function StoreFooter() {
  return (
    <footer className="store-footer relative overflow-hidden bg-[#20201d] px-4 py-9 text-[#f7f1e6] sm:px-5 sm:py-12 lg:px-8 lg:py-14 xl:px-12">
      <div className="relative mx-auto grid max-w-[1800px] gap-7 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 xl:grid-cols-[1.2fr_0.7fr_0.8fr_0.9fr_1.2fr] xl:gap-8">
        <div>
          <Link href="/" aria-label="Indian Heritager home" className="inline-flex min-w-0 items-center gap-3">
            <img src="/logo.png" alt="" width="56" height="56" className="size-11 shrink-0 rounded-full border border-[#e7d9bb] object-contain sm:size-12" />
            <span className="font-serif text-xl tracking-tight text-[#fffaf2] sm:text-2xl">Indian Heritager</span>
          </Link>
          <h2 className="mt-5 text-[15px] font-bold leading-5 text-[#f8ead7]">Bringing India&apos;s Heritage Closer to You</h2>
          <p className="mt-2.5 max-w-md text-sm leading-[1.6] text-[#f7f1e6]/78">
            Discover a thoughtfully curated collection of products inspired by India&apos;s rich heritage, traditions, craftsmanship, and cultural identity.
          </p>
        </div>

        <FooterLinks title="Shop" links={shopLinks} />
        <FooterLinks title="Indian Heritager" links={brandLinks} />
        <FooterLinks title="Customer Care" links={customerCareLinks} />

        <div>
          <h2 className="text-base font-bold text-[#f8ead7]">Contact us</h2>
          <p className="mt-3 text-sm leading-[1.6] text-[#f7f1e6]/78">
            Have a question about an order or the collection? Reach the Indian Heritager team by email.
          </p>
          <p className="mt-4 inline-flex max-w-full items-start gap-2 text-sm leading-5 text-[#f7f1e6]/78">
            <Mail size={16} className="mt-0.5 shrink-0 text-[#f8ead7]" aria-hidden="true" />
            <span><strong className="text-[#fffaf2]">Email:</strong>{' '}
              <a className="break-all transition-colors hover:text-[#fffaf2]" href="mailto:support@indianheritager.com">support@indianheritager.com</a>
            </span>
          </p>
        </div>
      </div>

      <div className="relative mx-auto mt-10 flex max-w-[1800px] flex-col gap-2 border-t border-white/12 pt-5 text-xs leading-5 text-[#f7f1e6]/70 sm:mt-12 sm:flex-row sm:items-center sm:justify-between sm:text-sm">
        <p>© 2026 Indian Heritager. All Rights Reserved.</p>
        <p className="font-medium text-[#fffaf2]">Celebrating India&apos;s Heritage, One Story at a Time.</p>
      </div>
    </footer>
  )
}
