import { Mail } from 'lucide-react'

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
  ['FAQs', 'mailto:support@indianheritager.com'],
]

const customerCareLinks = [
  ['Shipping & Delivery', 'mailto:support@indianheritager.com'],
  ['Returns & Refunds', 'mailto:support@indianheritager.com'],
  ['Track Your Order', '/account'],
  ['Privacy Policy', 'mailto:support@indianheritager.com'],
  ['Terms & Conditions', 'mailto:support@indianheritager.com'],
]

function FooterLinks({ title, links }: { title: string; links: string[][] }) {
  return (
    <nav aria-label={title}>
      <h2 className="text-[15px] font-bold text-[#601010]">{title}</h2>
      <ul className="mt-3 space-y-2.5 text-sm leading-5 text-black/75">
        {links.map(([label, href]) => (
          <li key={label}>
            <a className="hover:text-black" href={href}>{label}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function StoreFooter() {
  return (
    <footer className="store-footer bg-[#fff4d4] px-4 py-9 text-[#601010] sm:px-5 sm:py-12 lg:px-8 lg:py-14 xl:px-12">
      <div className="mx-auto grid max-w-[1800px] gap-7 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 xl:grid-cols-[1.3fr_0.7fr_0.8fr_0.9fr_1.3fr] xl:gap-8">
        <div>
          <a href="/" aria-label="Indian Heritager home" className="inline-flex min-w-0 items-center gap-3">
            <img src="/logo.png" alt="" width="56" height="56" className="size-11 shrink-0 rounded-full object-contain sm:size-12" />
            <span className="text-lg font-extrabold tracking-tight text-black sm:text-xl">Indian Heritager</span>
          </a>
          <h2 className="mt-5 text-[15px] font-bold leading-5 text-black">Bringing India&apos;s Heritage Closer to You</h2>
          <p className="mt-2.5 max-w-md text-sm leading-[1.6] text-black/75">
            Discover a thoughtfully curated collection of products inspired by India&apos;s rich heritage, traditions, craftsmanship, and cultural identity. Each product reflects the beauty of India&apos;s diverse stories, artistry, and timeless traditions.
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5" aria-label="Social media">
            <span role="img" title="Facebook" className="grid size-10 place-items-center rounded-full bg-black/10 text-lg font-bold text-black" aria-label="Facebook">f</span>
            <span role="img" title="Instagram" className="grid size-10 place-items-center rounded-full bg-black/10 text-black" aria-label="Instagram">
              <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="18" cy="6" r="1" fill="currentColor" stroke="none" />
              </svg>
            </span>
            <span role="img" title="X" className="grid size-10 place-items-center rounded-full bg-black/10 text-base text-black" aria-label="X">𝕏</span>
            <span role="img" title="YouTube" className="grid size-10 place-items-center rounded-full bg-black/10 text-black" aria-label="YouTube">
              <svg viewBox="0 0 24 24" className="size-[18px]" fill="currentColor" aria-hidden="true">
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.6 3.6 12 3.6 12 3.6s-7.6 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.8.5 9.4.5 9.4.5s7.6 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
              </svg>
            </span>
            <span role="img" title="LinkedIn" className="grid size-10 place-items-center rounded-full bg-black/10 text-sm font-bold text-black" aria-label="LinkedIn">in</span>
          </div>
        </div>

        <FooterLinks title="Shop" links={shopLinks} />
        <FooterLinks title="Indian Heritager" links={brandLinks} />
        <FooterLinks title="Customer Care" links={customerCareLinks} />

        <div>
          <h2 className="text-base font-bold text-black">Stay Connected</h2>
          <p className="mt-3 text-sm leading-[1.6] text-black/75">
            Follow Indian Heritager and discover stories, traditions, products, and inspiration from India&apos;s rich cultural heritage.
          </p>
          <p className="mt-4 inline-flex max-w-full items-start gap-2 text-sm leading-5 text-black/75">
            <Mail size={16} className="mt-0.5 shrink-0 text-black" aria-hidden="true" />
            <span><strong className="text-black">Email:</strong>{' '}
              <a className="break-all hover:text-black" href="mailto:support@indianheritager.com">support@indianheritager.com</a>
            </span>
          </p>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-[1800px] flex-col gap-2 border-t border-black/20 pt-5 text-xs leading-5 text-black/70 sm:mt-12 sm:flex-row sm:items-center sm:justify-between sm:text-sm">
        <p>© 2026 Indian Heritager. All Rights Reserved.</p>
        <p className="font-medium text-black">Celebrating India&apos;s Heritage, One Story at a Time.</p>
      </div>
    </footer>
  )
}
