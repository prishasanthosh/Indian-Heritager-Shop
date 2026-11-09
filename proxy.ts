import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { BOOKSTORE_HOST, VENDOR_PORTAL_HOST } from '@/lib/site-urls'

function isVendorPath(pathname: string) {
  return pathname === '/vendor' || pathname.startsWith('/vendor/')
}

function withoutVendorPrefix(pathname: string) {
  return pathname.slice('/vendor'.length) || '/'
}

export function proxy(request: NextRequest) {
  const hostname = request.headers.get('host')?.split(':', 1)[0].toLowerCase() ?? request.nextUrl.hostname
  const { pathname } = request.nextUrl

  if (hostname === BOOKSTORE_HOST && isVendorPath(pathname)) {
    const destination = request.nextUrl.clone()
    destination.protocol = 'https:'
    destination.host = VENDOR_PORTAL_HOST
    destination.port = ''
    destination.pathname = withoutVendorPrefix(pathname)
    return NextResponse.redirect(destination, 308)
  }

  if (hostname !== VENDOR_PORTAL_HOST) return NextResponse.next()

  if (isVendorPath(pathname)) {
    const destination = request.nextUrl.clone()
    destination.pathname = withoutVendorPrefix(pathname)
    return NextResponse.redirect(destination, 308)
  }

  if (pathname === '/api' || pathname.startsWith('/api/')) return NextResponse.next()

  if (/\.[a-zA-Z0-9]{2,5}$/.test(pathname)) return NextResponse.next()

  const destination = request.nextUrl.clone()
  destination.pathname = pathname === '/' ? '/vendor' : `/vendor${pathname}`
  return NextResponse.rewrite(destination)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
