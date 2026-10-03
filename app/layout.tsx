import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { CartProvider } from '@/components/cart-provider'
import { StoreFooter } from '@/components/store-footer'

export const metadata: Metadata = {
  title: 'Indian Heritager Shop | Curated products from heritage to everyday life.',
  description: 'Explore a diverse collection of products spanning home decor, crafts, accessories, gifts, and traditional essentials.',
  generator: 'v0.app',
  keywords: ['Indian heritage', 'heritage products', 'handicrafts', 'home decor', 'traditional products', 'gifts'],
  icons: {
    icon: [{ url: '/logo.png', type: 'image/png' }],
    apple: [{ url: '/logo.png', type: 'image/png' }],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#173d38',
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="light">
      <body className="antialiased">
        <CartProvider>
          {children}
          <StoreFooter />
        </CartProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
