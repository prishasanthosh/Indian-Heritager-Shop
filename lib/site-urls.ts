export const VENDOR_PORTAL_HOST = 'vendor.indianheritager.com'
export const BOOKSTORE_HOST = 'books.indianheritager.com'
export const VENDOR_PORTAL_ORIGIN = `https://${VENDOR_PORTAL_HOST}`
export const BOOKSTORE_ORIGIN = `https://${BOOKSTORE_HOST}`

export function vendorPortalHref(path: string) {
  return `${VENDOR_PORTAL_ORIGIN}${path.startsWith('/') ? path : `/${path}`}`
}

export function bookstoreHref(path: string) {
  return `${BOOKSTORE_ORIGIN}${path.startsWith('/') ? path : `/${path}`}`
}
