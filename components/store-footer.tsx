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
      <h2 className="text-base font-bold text-white">{title}</h2>
      <ul className="mt-4 space-y-3 text-[15px] text-[#c2d0da]">
        {links.map(([label, href]) => (
          <li key={label}>
            <a className="hover:text-white" href={href}>{label}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function StoreFooter() {
  return (
    <footer className="bg-[radial-gradient(ellipse_at_top_left,#1b271d_0%,#031321_32%)] px-4 py-10 text-[#dce5eb] sm:px-5 sm:py-14 lg:px-8 lg:py-16 xl:px-12">
      <div className="mx-auto grid max-w-[1800px] gap-8 sm:grid-cols-2 sm:gap-10 xl:grid-cols-[1.3fr_0.7fr_0.8fr_0.9fr_1.3fr] xl:gap-10">
        <div>
          <a href="/" aria-label="Indian Heritager home" className="inline-flex min-w-0 items-center gap-3 sm:gap-4">
            <img src="/logo.png" alt="" width="68" height="68" className="size-12 shrink-0 rounded-full object-contain sm:size-[68px]" />
            <span className="text-xl font-extrabold tracking-tight text-white sm:text-[26px]">Indian Heritager</span>
          </a>
          <h2 className="mt-7 text-base font-bold text-white">Bringing India&apos;s Heritage Closer to You</h2>
          <p className="mt-3 max-w-md text-[15px] leading-[1.65] text-[#c2d0da]">
            Discover a thoughtfully curated collection of products inspired by India&apos;s rich heritage, traditions, craftsmanship, and cultural identity. Each product reflects the beauty of India&apos;s diverse stories, artistry, and timeless traditions.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 sm:mt-7 sm:gap-3" aria-label="Social media">
            <span role="img" title="Facebook" className="grid size-10 place-items-center rounded-full bg-white/[0.055] text-xl font-bold text-white sm:size-[52px]" aria-label="Facebook">f</span>
            <span role="img" title="Instagram" className="grid size-10 place-items-center rounded-full bg-white/[0.055] text-white sm:size-[52px]" aria-label="Instagram">
              <svg viewBox="0 0 24 24" className="size-[22px]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="18" cy="6" r="1" fill="currentColor" stroke="none" />
              </svg>
            </span>
            <span role="img" title="X" className="grid size-10 place-items-center rounded-full bg-white/[0.055] text-lg text-white sm:size-[52px]" aria-label="X">𝕏</span>
            <span role="img" title="YouTube" className="grid size-10 place-items-center rounded-full bg-white/[0.055] text-white sm:size-[52px]" aria-label="YouTube">
              <svg viewBox="0 0 24 24" className="size-[22px]" fill="currentColor" aria-hidden="true">
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.6 3.6 12 3.6 12 3.6s-7.6 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.8.5 9.4.5 9.4.5s7.6 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
              </svg>
            </span>
            <span role="img" title="LinkedIn" className="grid size-10 place-items-center rounded-full bg-white/[0.055] text-base font-bold text-white sm:size-[52px]" aria-label="LinkedIn">in</span>
          </div>
        </div>

        <FooterLinks title="Shop" links={shopLinks} />
        <FooterLinks title="Indian Heritager" links={brandLinks} />
        <FooterLinks title="Customer Care" links={customerCareLinks} />

        <div>
          <h2 className="text-base font-bold text-white">Stay Connected</h2>
          <p className="mt-4 text-[15px] leading-6 text-[#c2d0da]">
            Follow Indian Heritager and discover stories, traditions, products, and inspiration from India&apos;s rich cultural heritage.
          </p>
          <p className="mt-5 inline-flex max-w-full items-start gap-2 text-sm text-[#c2d0da] sm:gap-3 sm:text-[15px]">
            <Mail size={19} className="mt-0.5 shrink-0 text-[#c26742]" aria-hidden="true" />
            <span><strong className="text-white">Email:</strong>{' '}
              <a className="break-all hover:text-white" href="mailto:support@indianheritager.com">support@indianheritager.com</a>
            </span>
          </p>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-[1800px] flex-col gap-3 border-t border-[#1e3240] pt-6 text-sm text-[#9aabb9] sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Indian Heritager. All Rights Reserved.</p>
        <p className="font-medium text-[#c2d0da]">Celebrating India&apos;s Heritage, One Story at a Time.</p>
      </div>
    </footer>
  )
}
